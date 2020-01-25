const { app, BrowserWindow, ipcMain } = require('electron');

const path = require('path');
const isDev = require('electron-is-dev');

require('electron-reload');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
    webPreferences: { nodeIntegration: true },
  });

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`,
  );

  mainWindow.toggleDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('update:print', (_event, tempREMOVE) => {
  // Exucute command to get printer update
  const newStatus = tempREMOVE + 10;
  console.log(`updated in electron: ${newStatus}`);
  mainWindow.webContents.send('updated:print', newStatus);
});

ipcMain.on('start:print', _event => {
  // Execute commomand here to start printing process
  console.log('Starting Print');
  mainWindow.webContents.send('started:print');
});
