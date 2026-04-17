const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
  const win = new BrowserWindow({
    width: 600,
    height: 500,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadFile('index.html');
}

ipcMain.handle('submit-survey', async (_event, data) => {
  const { name, age, language } = data;
  const timestamp = new Date().toLocaleString();
  const entry = `--- Survey Entry (${timestamp}) ---\nName: ${name}\nAge: ${age}\nFavorite Language: ${language}\n\n`;
  const filePath = path.join(__dirname, 'survey_answers.txt');

  fs.appendFileSync(filePath, entry, 'utf-8');
  return { success: true };
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
