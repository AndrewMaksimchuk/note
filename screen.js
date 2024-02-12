const { app, BrowserWindow } = require('electron');
const fs = require('node:fs');
const path = require('node:path');

const pathToPage = process.argv[2] ?? process.argv[1];

if(!pathToPage) app.quit();

async function takeScreen(win) {
  const screenshot = await win.webContents.capturePage();
  const scrrenshotBuffer = screenshot.toPNG();
  fs.writeFile('image_of_page.png', scrrenshotBuffer, () => {});
  app.quit();
}

const startApp = async () => {
  const win = new BrowserWindow({
    center: true,
    autoHideMenuBar: true,
    fullscreen: true,
    fullscreenable: true,
    frame: false,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'screen_preload.js')
    },
  });

  await win.loadFile(pathToPage);  
  setTimeout(() => takeScreen(win), 2000);
}

app.whenReady().then(() => {
  startApp()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
