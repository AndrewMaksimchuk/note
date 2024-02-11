const { app, BrowserWindow } = require('electron');
const fs = require('node:fs');
const path = require('node:path');
const childProcess = require('node:child_process');

const pathToPage = process.argv[2] ?? process.argv[1];

if(!pathToPage) app.quit();

function setWallpaper() {
  const imagePath = path.join(__dirname, 'image_of_page.png');
  childProcess.execFile('gsettings', [
		'set',
		'org.gnome.desktop.background',
		'picture-uri',
		`file://${imagePath}`,
	]);
}

async function takeScreen(win) {
  const screenshot = await win.webContents.capturePage();
  const scrrenshotBuffer = screenshot.toPNG();
  fs.writeFile('image_of_page.png', scrrenshotBuffer, () => {
    setWallpaper();
  });
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
