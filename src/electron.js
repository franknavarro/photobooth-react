const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
const exec = require('child_process').exec;

const path = require('path');
const isDev = require('electron-is-dev');

const printPath = path.join(app.getPath('home'), 'Pictures/print.jpg');
console.log(printPath);

require('electron-reload');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
    webPreferences: { nodeIntegration: true },
    fullscreen: true,
  });

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`,
  );

  // mainWindow.toggleDevTools();

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

ipcMain.on('get:strip', () => {
  const bitmap =
    'data:image/jpg;base64,' +
    fs.readFileSync(`${path.join(__dirname, '../photostrip.jpg')}`, 'base64');
  mainWindow.webContents.send('retrieved:strip', bitmap);
});

ipcMain.on('update:print', _event => {
  exec('lpstat', (_error, stdout, stderr) => {
    console.log('stdout: [' + stdout + ']');
    console.log('stderr: [' + stderr + ']');
    // Exucute command to get printer update
    mainWindow.webContents.send('updated:print', stdout);
  });
});

ipcMain.on('start:print', (_event, printString) => {
  // Execute commomand here to start printing process
  const base64Data = printString.split(',')[1];
  fs.writeFile(printPath, base64Data, 'base64', () => {
    exec(`lp ${printPath}`, (_error, stdout, stderr) => {
      console.log('Started Print');
      console.log('stdout: [' + stdout + ']');
      console.log('stderr: [' + stderr + ']');
      mainWindow.webContents.send('started:print');
    });
  });
});
