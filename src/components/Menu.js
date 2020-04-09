const {app, Menu } = require('electron')
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
