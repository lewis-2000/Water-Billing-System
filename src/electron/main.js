// main.js
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const Database = require("better-sqlite3");

let db;

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // we’ll expose db APIs via preload
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  if (process.env.NODE_ENV === "development") {
    win.loadURL("http://localhost:5173");
    // win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, "../../dist/index.html"));
  }
}

app.whenReady().then(() => {
  // ✅ Database path (safe & writable)
  const dbPath = path.join(app.getPath("userData"), "water_billing.db");
  db = new Database(dbPath);

  // ✅ Run migrations (create tables if missing)
  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'user', -- can be 'user' or 'admin'
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `
  ).run();

  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS payments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      amount REAL NOT NULL,
      status TEXT NOT NULL, -- e.g. 'paid', 'pending'
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )
  `
  ).run();

  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS meters (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      reading REAL NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )
  `
  ).run();

  // ✅ Example IPC handler
  ipcMain.handle("get-users", () => {
    return db
      .prepare("SELECT id, name, email, role, created_at FROM users")
      .all();
  });

  ipcMain.handle("add-user", (event, { name, email, password, role }) => {
    const stmt = db.prepare(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)"
    );
    const result = stmt.run(name, email, password, role || "user");
    return result.lastInsertRowid;
  });

  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
