#!/bin/bash

##############################################################
# Script Name	: Uninstall Scratch Files
# Description	: Removes scratch-vm and scratch-gui from your
#               installation folder. It can be used to make a
#               clean reinstallation of scratch-poppy.
##############################################################

GREEN="\033[92m"
CLEAR="\033[0m"

read -p "Do you want to delete all scratch repositories ? (y/n) " -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
	echo -ne "removing scratch-vm scratch-gui folders..."
	# Change installation path here. No installation_folder variable is used, just to make sure you never run a command
	# like sudo rm -rf / unintentionally...
    rm -rvf ../scratch-vm ../scratch-gui
    echo -e " ${GREEN}Done!${CLEAR}"
fi
