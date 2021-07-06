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
echo -ne "${YELLOW}Renaming ${ITALIC}build${CLEAR}${YELLOW} folder to ${ITALIC}${archive_name}${CLEAR}..."
mv build $archive_name
echo -e "${GREEN}Done!${CLEAR}\n"

# zipping folder
echo -e "${YELLOW}Zipping built application to ${ITALIC}${archive_name}.zip${CLEAR}..."
zip -r "$archive_name.zip" "$archive_name"
cd - || exit 2
cp "$installation_folder/scratch-gui/$archive_name.zip" .
echo -e "${GREEN}Application successfully zipped!${CLEAR}\n"
