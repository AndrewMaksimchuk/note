const { app, BrowserWindow } = require('electron');
const fs = require('node:fs');
const path = require('node:path');

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

  console.log('ARGV: ', process.argv[2])
  await win.loadFile(process.argv[2]);  
  setTimeout(() => takeScreen(win), 2000);
}

app.whenReady().then(() => {
  if(!process.argv[2]) app.quit();
  startApp()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
