// preload.js
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  // Users
  getUsers: () => ipcRenderer.invoke("get-users"),
  addUser: (data) => ipcRenderer.invoke("add-user", data),
  changePassword: (data) => ipcRenderer.invoke("change-password", data),

  // Bills
  getBills: (userId) => ipcRenderer.invoke("get-bills", userId),
  addBill: (data) => ipcRenderer.invoke("add-bill", data),

  // Problems
  getProblems: () => ipcRenderer.invoke("get-problems"),
  reportProblem: (data) => ipcRenderer.invoke("report-problem", data),
});
