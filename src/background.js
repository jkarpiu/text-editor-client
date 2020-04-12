'use strict'

import {
  app,
  protocol,
  BrowserWindow,
  Menu,
  ipcMain, 
  dialog
} from 'electron'
import {
  createProtocol,
  installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib'
const isDevelopment = process.env.NODE_ENV !== 'production'
var fs = require('fs');
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{
  scheme: 'app',
  privileges: {
    secure: true,
    standard: true
  }
}])

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
  new Menu()
  const menu = require('./components/Menu.js')
  Menu.setApplicationMenu(menu(win))
  win.on('closed', () => {
    win = null
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installVueDevtools()
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }

  }

  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

ipcMain.on("FILE_NEW", () => {
  let content = "";

  // You can obviously give a direct path without use the dialog (C:/Program Files/path/myfileexample.txt)
  dialog.showSaveDialog((fileName) => {
    if (fileName === undefined) {
      console.log("You didn't save the file");
      return;
    }

    // fileName is a string that contains the path and filename created in the save file dialog.  
    fs.writeFile(fileName, content, (err) => {
      if (err) {
        console.log("An error ocurred creating the file " + err.message)
      }
    });
  });
})

ipcMain.on("STORE_FILE", (event, data) => {
  let options = {
    // See place holder 1 in above image
    title: "Zapisywanie pliku",

    // See place holder 2 in above image
    defaultPath: "~",

    // See place holder 3 in above image
    buttonLabel: "Zapisz",

    // See place holder 4 in above image
    filters: [{
            name: 'Pliki tekstowe(*.txt)',
            extensions: ['txt']
        },
        {
            name: 'Wszystkie pliki',
            extensions: ['*']
        }
    ],
    properties: ['saveFile']
}
console.log(data)
//Synchronous
let filePaths = dialog.showSaveDialog(win, options)
  fs.writeFile(filePaths, data.text, function (err) {
    if (err) return console.log("Błąd zapisywania") ;
        
    });
    
})
