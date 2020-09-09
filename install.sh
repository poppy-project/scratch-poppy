#!/bin/bash

search="boost: () => require('..\/extensions\/scratch3_boost'),"
replace="boost: () => require('..\/extensions\/scratch3_boost'),\n    poppy: () => require('..\/extensions\/scratch3_poppy'),"
sed -i "s/$search/$replace/" ../scratch-vm/src/extension-support/extension-manager.js

search1="import boostConnectionTipIconURL from '.\/boost\/boost-button-illustration.svg';"
replace1="import boostConnectionTipIconURL from '.\/boost\/boost-button-illustration.svg';\n\nimport poppyIconURL from '.\/poppy\/poppy.png';\nimport poppyInsetIconURL from '.\/poppy\/poppy-small.png';"
sed -i "s/$search1/$replace1/" ../scratch-gui/src/lib/libraries/extensions/index.jsx

search2="helpLink: 'https:\/\/scratch.mit.edu\/wedo'"
replace2="helpLink: 'https:\/\/scratch.mit.edu\/wedo'\n    },\n    {\n        name: 'Poppy',\n        extensionId: 'poppy',\n        collaborator: 'rrandriamana',\n        iconURL: poppyIconURL,\n        insetIconURL: poppyInsetIconURL,\n        description: (\n            <FormattedMessage\n                defaultMessage='Control your Poppy robot'\n                description='Poppy controller extension'\n                id='gui.extension.poppy.description'\n            \/>\n        ),\n        featured: true,\n        disabled: false,\n        internetConnectionRequired: true,\n        bluetoothRequired: false,"
sed -i "s/$search2/$replace2/" ../scratch-gui/src/lib/libraries/extensions/index.jsx

cp -r ./scratch_vm_files/scratch3_poppy ../scratch-vm/src/extensions
cp -r ./scratch_gui_files/poppy ../scratch-gui/src/lib/libraries/extensions

cd ../scratch-vm
npm install axios