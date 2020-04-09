
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
                        label: 'Otwórz',
                        accelerator: 'ctrl+O',
                        click: () => {
                            dialog.showOpenDialog((fileNames) => {
                                // fileNames is an array that contains all the selected
                                if(fileNames === undefined){
                                    console.log("No file selected");
                                    return;
                                }
                            
                                fs.readFile(filepath, 'utf-8', (err, data) => {
                                    if(err){
                                        alert("An error ocurred reading the file :" + err.message);
                                        return;
                                    }
                            
                                    // Change how to handle the file content
                                    console.log("The file content is : " + data);
                                });
                            });
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
