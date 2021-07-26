#!/bin/bash

#################################################################
# Script Name	: Export Scratch
# Description	: Builds the scratch application with the
#               Poppy extension and exports it as a zip archive.
#################################################################

ITALIC="\033[3m"
GREEN="\033[92m"
YELLOW="\033[93m"
CLEAR="\033[0m"

installation_folder=".."
archive_name="scratch-application"

# building application
echo -e "${YELLOW}Building Scratch application (needs permissions)${CLEAR}"
cd "$installation_folder/scratch-gui" || exit 2
sudo npm run build
echo -e "${GREEN}Build done!${CLEAR}\n"

# renaming folder
echo -e "${YELLOW}Renaming ${ITALIC}build${CLEAR}${YELLOW} folder to ${ITALIC}${archive_name} ...${CLEAR}"
echo -e "Removing previous build folder ${ITALIC}$archive_name${CLEAR}"
sudo rm -r $archive_name
sudo mv -v build $archive_name
echo -e "${GREEN}Done!${CLEAR}\n"

# adding date in build folder
echo "Scratch application built on $(date '+%F at %H:%M (%Z)')" > "build-version.txt"
sudo mv "build-version.txt" $archive_name

# zipping folder
echo -e "${YELLOW}Zipping built application to ${ITALIC}${archive_name}.zip ...${CLEAR}"
zip -qr "$archive_name.zip" "$archive_name"
cd - || exit 2
mv -v "$installation_folder/scratch-gui/$archive_name.zip" .
echo -e "${GREEN}Application successfully zipped!${CLEAR}\n"
