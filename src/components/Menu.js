
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
                    
                            let options = {
                                title: "Otwieranie pliku",
                                defaultPath: "~",
                                buttonLabel: "Otwórz",
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
                    
                            let filePaths = dialog.showOpenDialog(win, options)
                            fs.readFile(filePaths[0], (err, data) => {
                                if (err) throw err;
                                console.log(data);
                                win.webContents.send('DOCUMENT_NEEDS_TO_OPEN', {file: data, path: filePaths});
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
