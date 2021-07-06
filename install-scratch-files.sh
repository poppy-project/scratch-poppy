#!/bin/bash

##############################################################
# Script Name	: Install Scratch Files
# Description	: Clones the Scratch-VM and Scratch-GUI
#               repositories to the parent folder, if they do
#               not already exist. The script also takes care
#               of the installation of the different repos.
##############################################################

ITALIC="\033[3m"
GREEN="\033[92m"
YELLOW="\033[93m"
CLEAR="\033[0m"

installation_folder=".."


##############################################################
# Function clone_repository()
# Clones a github repository in a given folder if the repo is
# not already cloned.
#
# ARGUMENTS:
#   $1: repo link
#   $2: folder
#
# OUTPUTS:
#   Some echos of the progress of the script
##############################################################

clone_repository() {
    repo_name=$(basename -s .git "$1")
    echo -e "Cloning ${ITALIC}${YELLOW}$repo_name${CLEAR}"

    if [ -d "$2/$repo_name" ]; then
        # code if found
        echo -e "${GREEN}Repository already installed!${CLEAR}\n"
    else
        # code if not found
        echo -e "${YELLOW}Repository not installed!${CLEAR}"
        git clone "$1" "$2/$repo_name"
        echo -e "${GREEN}Repository has been installed!${CLEAR}\n"
    fi
}

# Cloning vm & gui repos
# if VM:
#   if GUI:
#     nothing to do, exit script
#   else:
#     install GUI
# else:
#   if GUI
#     install VM
#   else:
#     install VM & GUI

if [ -d "$installation_folder/scratch-vm" ]
then
    if [ -d "$installation_folder/scratch-gui" ]
    then
        echo -e "${GREEN}Nothing to do${CLEAR}"
        echo -e "Script found scratch-vm & scratch-gui repositories in ${installation_folder}/ folder."
        echo -e "If you have not installed these folders using the Poppy script, you have three choices to continue the installation:"
        echo -e "- Delete the existing folders to get a fresh start and then re-run this script (install-scratch-files)."
        echo -e "- Change the installation folder to reclone the Scratch folders elsewhere"
        echo -e "- Install the folders by hand, following the steps described in the README, in the manual installation section."
        exit 0
    else
        echo -e "${YELLOW}> Installing GUI${CLEAR}"
        clone_repository "https://github.com/LLK/scratch-gui.git" $installation_folder
    fi
else
    if [ -d "$installation_folder/scratch-gui" ]
    then
        echo -e "${YELLOW}> Installing VM${CLEAR}"
        clone_repository "https://github.com/LLK/scratch-vm.git" $installation_folder
    else
        echo -e "${YELLOW}> Installing VM & GUI${CLEAR}"
        clone_repository "https://github.com/LLK/scratch-vm.git" $installation_folder
        clone_repository "https://github.com/LLK/scratch-gui.git" $installation_folder
    fi
fi
echo -e "\n${GREEN}All repositories are downloaded!${CLEAR}\n"


# Installing nvm
echo -e "${YELLOW}Installing nvm...${CLEAR}"
cd "$installation_folder/scratch-vm" || exit 2
curl -sL https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh -o install_nvm.sh
bash install_nvm.sh
source ~/.profile
rm install_nvm.sh
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
nvm install 10.21.0
nvm use 10.21.0
echo -e "${GREEN}NVM installed!${CLEAR}\n"


# Installing scratch-vm node modules
echo -e "${YELLOW}Installing scratch-vm node modules...${CLEAR}"
npm install
echo -e "${GREEN}scratch-vm node modules installed!${CLEAR}\n"


# Linking scratch-vm
echo -e "${YELLOW}Linking scratch-vm...${CLEAR}"
npm link
echo -e "${GREEN}scratch-vm linked!${CLEAR}\n"


# Changing directory to scratch-gui
cd ../scratch-gui || exit 2


# Installing scratch-gui node modules
echo -e "${YELLOW}Installing scratch-gui node modules...${CLEAR}"
npm install
echo -e "${GREEN}scratch-gui node modules installed!${CLEAR}\n"


# Installing scratch-vm node modules
echo -e "${YELLOW}Linking scratch-gui to scratch-vm...${CLEAR}"
npm link scratch-vm
echo -e "${GREEN}scratch-gui linked to scratch-vm!${CLEAR}\n"


# Success message
echo -e "${GREEN}Installation of scratch files complete!${CLEAR}"

