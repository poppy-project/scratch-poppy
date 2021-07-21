# scratch-poppy
Scratch-poppy is a Scratch 3 extension for [Poppy robots](https://github.com/poppy-project).  

You may want to install this repository if you want to add your own blocks or if you want to improve existing ones.

## :inbox_tray: Installation

### :page_facing_up: Scripted installation

Requirements : [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git "sudo apt install git-all"), [node](https://nodejs.org/en/download/package-manager/ "sudo apt install nodejs"), [zip](https://linux.die.net/man/1/zip "sudo apt install zip"),

#### Install scratch files & poppy's extension
We need [scratch-vm](https://github.com/LLK/scratch-vm "GitHub scratch-vm repository") and [scratch-gui](https://github.com/LLK/scratch-gui "GitHub scratch-gui repository") repositories to create our application, we download and install them with **install-scratch-files.sh** script. Then, we install our Poppy extension with **install-extension.sh** script.
```bash
bash install-scratch-files.sh
bash install-extension.sh
```

#### Exporting application
To use scratch with Poppy without having to use node on the raspberry, we export static files we just built as an archive. The archive will be uploaded as a release of poppy-scratch repository, and can be downloaded if the user wants to use Scratch.
```bash
bash export-scratch.sh
```

### :keyboard: Manual installation

#### Scratch VM and Scratch GUI installation

First, you will have to clone **scratch-vm** and **scratch-gui** and to link both. For this, open a Command Prompt or Terminal in your development environment and follow the next steps:
```bash
git clone https://github.com/LLK/scratch-gui
git clone https://github.com/LLK/scratch-vm
cd scratch-vm
curl -sL https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh -o install_nvm.sh
bash install_nvm.sh
source ~/.profile
rm install_nvm.sh
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # loads nvm without reopening a terminal
nvm install 10.21.0
nvm use 10.21.0
npm install
npm link
cd ../scratch-gui
npm install
npm link scratch-vm
```

Then you will need to install Poppy's extension in Scratch files. In **scratch-poppy** run:
```bash
bash install-extension.sh
```

#### Building application
To build the application, go to **scratch-gui** folder and run :
```bash
sudo npm run build
```

#### Exporting application
To use scratch with Poppy without having to use node on the raspberry, we export static files we just built as an archive. The archive will be uploaded as a release of poppy-scratch repository, and can be downloaded if the user wants to use Scratch.
To export the application as a zip archive, we need to rename the build folder as **scratch-application** in **scratch-gui**.
```bash
mv build scratch-application
```
Then zip it:
```bash
zip -r scratch-application.zip scratch-application
```

## :memo: Edit Poppy's Extension

You can add more blocks by modifying **scratch_vm_files/scratch3_poppy** files.
You can find information to create a block here: https://github.com/LLK/scratch-vm/blob/develop/docs/extensions.md

To see and test your blocks run the script install_extension.sh and then go to **scratch-gui** folder. You can either:
- run a server that will auto reload Scratch server each time you run the install_extension.sh script.
For this, run:
  ```bash
  sudo npm start
  ```
  Then go to http://localhost:8601/ in your web browser.
  Make sure to install the **Poppy extension** in the extension menu (button in the bottom left corner).
  

- build the static files and open index.html with your browser. You will have to run those steps each time you run  install_extention.sh script.
  ```bash
  sudo npm run build
  cd build
  firefox index.html  # Or google-chrome, chromium-browser, ...
  ```

## :scroll: Todo

* Implement the button "sequentially" and "play sequentially". These buttons allow playing different actions, for the first one, and moves, for the second, one after the other.
