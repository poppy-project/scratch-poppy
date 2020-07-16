# scratch-poppy
### Scratch-poppy is a Scratch 3 extension for Poppy robots

## Getting started

### Scratch VM and Scratch GUI installation

This requires you to have **Git** and **Node.js** installed.
First, you will have to clone **scratch-vm** and **scratch-gui** and to link both. For this, open a Command Prompt or Terminal in your development environment and follow the next steps:

    git clone https://github.com/LLK/scratch-gui
    git clone https://github.com/LLK/scratch-vm
    cd scratch-vm
    npm install
    npm link
    cd ../scratch-gui
    npm install
    npm link scratch-vm


### Scratch Poppy installation

Now, you can clone this repository. In the `scratch_vm_files` folder, copy `scratch3_poppy` and paste it in `scratch-vm/src/extensions`. Now you can copy and replace `extension-manager.js` from `scratch_vm_files` into `scratch-vm/src/extension-support`.

For files in `scratch_gui_files`, copy them and paste them in `scratch-gui/src/lib/libraries/extensions`. The `index.jsx` poppy file should replace the previous one in `scratch-gui`.

To finish, in a Terminal, go to `scratch-vm` and install `axios`

    cd scratch-vm
    npm install axios


### Launching and editing

Now it is possible to launch scratch in the repository **scratch-gui** with: 
    
    cd scratch-gui
    npm start

Then go to http://localhost:8601/ in your web browser.
Select the **Poppy extension** in the extension menu (with the button at the bottom left corner).

If you want to edit blocks, the code are now situated  at this path: `scratch-vm/src/extensions/scratch3_poppy/index.js`. You can find more informations to create a block here: https://github.com/LLK/scratch-vm/blob/develop/docs/extensions.md