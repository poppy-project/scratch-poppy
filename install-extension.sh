#!/bin/bash

##############################################################
# Script Name	: Install Extension
# Description	: Installs the Poppy Extension to Scratch files
##############################################################

ITALIC="\033[3m"
GREEN="\033[92m"
YELLOW="\033[93m"
CLEAR="\033[0m"


##############################################################
# Function add_require()
# Adds a require line to a js file, if line does not already exist.
# It first scans the 'file' for 'search' arg. If 'search' is not found,
# it replaces 'where' arg by 'replace' arg.
#
# ARGUMENTS:
#   $1: search = line(s) to add, to check if it already exists
#   $2: where = where to put it ?
#   $3: replace = where "+" search
#   $4: file
#
# OUTPUTS:
#   Some echos of the progress of the script
##############################################################

add_require () {
    echo -e "Adding a require to ${ITALIC}$4${CLEAR}"
    if grep -q "$1" "$4"
    then
        # code if found
        echo -e "${GREEN}Require already satisfied!${CLEAR}"
    else
        # code if not found
        echo -e "${YELLOW}Require not satisfied!${CLEAR}"
        sed -i "s/$2/$3/" "$4"
        echo -e "${GREEN}Require has been added!${CLEAR}"
    fi
}


find="poppy: () => require('..\/extensions\/scratch3_poppy'),"
where="boost: () => require('..\/extensions\/scratch3_boost'),"
replace="$where\n    $find"
file="../scratch-vm/src/extension-support/extension-manager.js"
add_require "$find" "$where" "$replace" "$file"


find="import poppyInsetIconURL from '.\/poppy\/poppy-small.png';"
where="import boostConnectionTipIconURL from '.\/boost\/boost-button-illustration.svg';"
replace="$where\n\nimport poppyIconURL from '.\/poppy\/poppy.png';\n$find"
file="../scratch-gui/src/lib/libraries/extensions/index.jsx"
add_require "$find" "$where" "$replace" "$file"

find='extensionId: "poppy",'
where="export default \["
replace='export default [\n    {\n        name: "Poppy",\n        extensionId: "poppy",\n        collaborator: "Poppy-Station",\n        iconURL: poppyIconURL,\n        insetIconURL: poppyInsetIconURL,\n        description: (\n            <FormattedMessage\n                defaultMessage="Control your Poppy robot"\n                description="Poppy controller extension"\n                id="gui.extension.poppy.description"\n            \/>\n        ),\n        featured: true,\n        disabled: false,\n        internetConnectionRequired: true,\n        bluetoothRequired: false,\n    },'
file="../scratch-gui/src/lib/libraries/extensions/index.jsx"
add_require "$find" "$where" "$replace" "$file"

echo -e "\nCopying Poppy extension code to ${ITALIC}scratch-vm${CLEAR}... \c"
cp -r ./scratch_vm_files/scratch3_poppy ../scratch-vm/src/extensions
echo -e "${GREEN}DONE!${CLEAR}"
echo -e "Copying Poppy images to ${ITALIC}scratch-gui${CLEAR}... \c"
cp -r ./scratch_gui_files/poppy ../scratch-gui/src/lib/libraries/extensions
echo -e "${GREEN}DONE!${CLEAR}"
