const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const Database = require("better-sqlite3");

let db;

function createWindow() {
  const win = new BrowserWindow({
    width: 1366,
    height: 768,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  if (process.env.NODE_ENV === "development") {
    win.loadURL("http://localhost:5173");
  } else {
    win.loadFile(path.join(__dirname, "../../dist/index.html"));
  }
}

app.whenReady().then(() => {
  // 📌 Get a safe per-user folder for storing DB
  const userDataPath = app.getPath("userData");
  const dbPath = path.join(userDataPath, "demo.db");

  // Open or create the DB
  db = new Database(dbPath);

  // Create tables if missing
  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `
  ).run();

  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS bills (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      month TEXT,
      amount REAL,
      status TEXT CHECK(status IN ('Paid','Pending')) DEFAULT 'Pending',
      FOREIGN KEY(user_id) REFERENCES users(id)
    )
  `
  ).run();

  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS problems (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      description TEXT,
      status TEXT CHECK(status IN ('Open','Resolved')) DEFAULT 'Open',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )
  `
  ).run();

  // === IPC handlers (same as before) ===
  ipcMain.handle("get-users", () => {
    return db.prepare("SELECT id, name, email FROM users").all();
  });

  ipcMain.handle("add-user", (e, { name, email, password }) => {
    return db
      .prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)")
      .run(name, email, password).lastInsertRowid;
  });

  ipcMain.handle("change-password", (e, { id, newPassword }) => {
    return db
      .prepare("UPDATE users SET password = ? WHERE id = ?")
      .run(newPassword, id).changes;
  });

  ipcMain.handle("get-bills", (e, userId) => {
    return db.prepare("SELECT * FROM bills WHERE user_id = ?").all(userId);
  });

  ipcMain.handle("add-bill", (e, { userId, month, amount, status }) => {
    return db
      .prepare(
        "INSERT INTO bills (user_id, month, amount, status) VALUES (?, ?, ?, ?)"
      )
      .run(userId, month, amount, status).lastInsertRowid;
  });

  ipcMain.handle("get-problems", () => {
    return db
      .prepare(
        `
      SELECT p.id, p.description, p.status, p.created_at, u.name AS user_name
      FROM problems p
      LEFT JOIN users u ON p.user_id = u.id
    `
      )
      .all();
  });

  ipcMain.handle("report-problem", (e, { userId, description }) => {
    return db
      .prepare("INSERT INTO problems (user_id, description) VALUES (?, ?)")
      .run(userId, description).lastInsertRowid;
  });

  // Create the browser window
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
