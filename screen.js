/**
 * @description
 * Accept 2 argument:
 * 1 - path to application directory where save image
 * 2 - path to html page
 */

const fs = require('node:fs');
const path = require('node:path');
const { app, BrowserWindow } = require('electron');

const pathToAppDirectory = process.argv[process.argv.length - 2];

if(!pathToAppDirectory) {
  console.log("[ERROR] Need add absolute path to note application directory as first argument!");
  app.quit();
}

const pathToPage = process.argv[process.argv.length - 1];

if(!pathToPage) {
  console.log("[ERROR] Need add absolute path to html page as second argument!");
  app.quit();
}

async function takeScreen(win) {
  const screenshot = await win.webContents.capturePage();
  const scrrenshotBuffer = screenshot.toPNG();
  const pathSaveImageTo = path.join(pathToAppDirectory, 'image_of_page.png');
  fs.writeFile(pathSaveImageTo, scrrenshotBuffer, () => {});
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
