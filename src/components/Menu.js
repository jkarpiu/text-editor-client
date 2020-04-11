
const {app, Menu, dialog , BrowserWindow, ipcMain} = require('electron')
var fs = require('fs')
module.exports = function(win){
    return Menu.buildFromTemplate([
        {
 label: `Plik`, submenu: [
                    {
                        label: 'Nowy',
                        accelerator: 'ctrl+N',
                        click: () => {
                            win.webContents.send('NEW_DOCUMENT_NEEDED', 'Create new document')
                        }
                    },
                    {
                        label: 'Otwórz',
                        accelerator: 'ctrl+O',
                        click: () => {
                            const {
                                dialog
                            } = require('electron')
                    
                            /*
                            //renderer.js - a renderer process
                            const {remote} = require('electron'),
                            dialog = remote.dialog,
                            WIN = remote.getCurrentWindow();
                            */
                    
                            let options = {
                                // See place holder 1 in above image
                                title: "Otwieranie pliku",
                    
                                // See place holder 2 in above image
                                defaultPath: "~",
                    
                                // See place holder 3 in above image
                                buttonLabel: "Otwórz",
                    
                                // See place holder 4 in above image
                                filters: [{
                                        name: 'Pliki tekstowe',
                                        extensions: ['txt']
                                    },
                                    {
                                        name: 'Wszystkie pliki',
                                        extensions: ['*']
                                    }
                                ],
                                properties: ['openFile']
                            }
                    
                            //Synchronous
                            let filePaths = dialog.showOpenDialog(win, options)
                            fs.readFile(filePaths[0], (err, data) => {
                                if (err) throw err;
                                console.log(data);
                                win.webContents.send('DOCUMENT_NEEDS_TO_OPEN', {file: data});
                            })
                            
                        }
                    },
                    {
                        label: 'Zapisz',
                        accelerator: 'ctrl+S',
                        click: () => {
                            win.webContents.send('SAVE_REQUIRED', 'Save my document')
                        }
                    }
                ] }
            
        ,
        {
            label: 'Edycja',
            submenu: [
                {label: 'Cofnij', role: 'undo'  },
                {label: 'Przywróc', role: 'redo'  },
                {label: 'Wytnij', role: 'cut'  },
                {label: 'Kopiuj', role: 'copy'  },
                {label: 'Wklej', role:'paste'  },
            ]
        },
     

    ])    
}
