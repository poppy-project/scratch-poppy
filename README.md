# scratch-poppy
### Scratch-poppy is a Scratch 3 extension for Poppy robots

## Getting started

### Scratch VM and Scratch GUI installation

This requires you to have **Git** and **Node.js** installed.
First, you will have to clone **scratch-vm** and **scratch-gui** and to link both. For this, open a Command Prompt or Terminal in your development environment and follow the next steps:

    git clone https://github.com/LLK/scratch-gui
    git clone https://github.com/LLK/scratch-vm
    cd scratch-vm
    curl -sL https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh -o install_nvm.sh
    bash install_nvm.sh
    source ~/.profile
    rm install_nvm.sh
    nvm install 10.21.0
    nvm use 10.21.0
    npm install
    npm link
    cd ../scratch-gui
    npm install
    npm link scratch-vm


### Scratch Poppy installation

Now, you can clone this repository in the same development environment. For the installation you just have to execute the following lines to copy folders and some extension's additions at the right place:

    git clone https://github.com/poppy-project/scratch-poppy
    cd scratch-poppy
    bash install.sh



### Launching and editing

Now it is possible to launch scratch in the repository **scratch-gui** with: 
    
    cd scratch-gui
    npm start

Then go to http://localhost:8601/ in your web browser.
Select the **Poppy extension** in the extension menu (with the button at the bottom left corner).

If you want to edit blocks, the code are now situated  at this path: `scratch-vm/src/extensions/scratch3_poppy/index.js`. You can find more informations to create a block here: https://github.com/LLK/scratch-vm/blob/develop/docs/extensions.md

### TODO:

* To implement the button "sequentially" and "play senquentially". These buttons allow to play different actions, for the first one, and moves, for the second, one after the other.

* To implement the "wait" option in the "setMotorsGoTo" button to wait until a motor reaches its position before moving a second motor.

* To add the different lists ("all motors", "all motors position", "all recorded moves" ...) directly in scratch (in the index.js file or in the scratch project)

See the `Advanced.sb3` scratch project to see the last two points.