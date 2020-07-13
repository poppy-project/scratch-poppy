const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const axios = require('axios').default;
const Cast = require('../../util/cast');
const log = require('../../util/log');

class Scratch3Poppy {

	 makeARequest (url) {
		return axios.get(url)
		.then(res => {return res.data});
	}

    constructor (runtime) {
		this.runtime = runtime;
		this._robotUrl = 'http://';
		this._robotHostname = '';
		this._robotPort = '';
		
    }

    getInfo () {
	return {
	    id: 'poppy',
	    name: 'Poppy blocks',
	    blocks: [
		{
		    opcode: 'getMotorsPositions',
		    blockType: BlockType.REPORTER,
		    text: 'get all motors positions',
		},

		{
			opcode: 'allMotorsGroups',
			blockType: BlockType.REPORTER,
			text: 'all motors groups'
		},

		{
			opcode: 'setHost',
			blockType: BlockType.COMMAND,
			text: 'set host to [URL]',
			argument:{
				URL: {
					type: ArgumentType.STRING,
					defaultValue: ""
				}
			}
		}

	    ]
	};
    }

    
	
	getMotorsPositions(){
		const resultat = this.makeARequest('http://169.254.224.95:6969/motors/get/positions')
		.then(data=>data)
		.catch(err=>console.log(err));
		/*let numMotor = 1;
		let motorsPosition = '1: ';
		let result = toString(resultat);
		for(let i= 0; i < result.length; i++){
			if(result.substring(i,1) == ';'){
				numMotor++;
				motorsPosition += '\n' + numMotor + ': ';
			}
			else
				motorsPosition += result.substring(i,1); 
		}
		return motorsPosition;*/
		//let res = JSON.stringify(resultat);
		//res += ';666';
		return resultat;
	}

	allMotorsGroups(){
		const resultat = this.makeARequest('http://169.254.224.95:6969/motors/alias')
		.then(data=>data)
		.catch(err=>console.log(err));
		return resultat;
	}

	setHost(){
		
	}
}

module.exports = Scratch3Poppy;

	  
