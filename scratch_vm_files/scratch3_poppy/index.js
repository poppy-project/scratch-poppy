const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const axios = require('axios').default;
const Cast = require('../../util/cast');
const log = require('../../util/log');

class Scratch3Poppy {

	 makeARequest (url) {
		return axios.get(url)
		.then(res =>res.data);
	}

    constructor (runtime) {
		this.runtime = runtime;
		this._robotUrl = '';
		this._robotIp;
		this._robotPort = '6969';


		this._robotIpTmp = '169.254.224.95';
		this._robotUrlTmp = 'http://poppy.local:6969';
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
			opcode: 'getRobotAliases',
			blockType: BlockType.REPORTER,
			text: 'all motors groups'
		},

		{
			opcode: 'detectMarker',
			blockType: BlockType.BOOLEAN,
			text: 'card [TEXT] is detected ?',
			arguments: {
				TEXT: {
					type: ArgumentType.STRING,
					defaultValue: "caribou",
					menu: "marker"
				}
			}
		},

		{
			opcode: 'getMotorsInGroup',
			blockType: BlockType.REPORTER,
			text:  'motors in group [TEXT]',
			arguments: {
				TEXT: {
					type: ArgumentType.STRING,
					defaultValue: 'group_name'
				}
			}
		},

		{
			opcode: 'getMotors',
			blockType: BlockType.REPORTER,
			text: 'all motors'
		},

		{
			opcode: 'getPrimitives',
			blockType: BlockType.REPORTER,
			text: 'get [TEXT] behaviours',
			arguments: {
				TEXT: {
					type: ArgumentType.STRING,
					defaultValue: 'all',
					menu: 'getBehaviours'
				}
			}
		},

		{
			opcode: 'getPropertiesMethodes',
			blockType: BlockType.REPORTER,
			text: 'get [PROP] of behaviour [TEXT]',
			arguments:{
				PROP: {
					type: ArgumentType.STRING,
					defaultValue: 'methodes',
					menu: 'getPropBehaviours'
				},
				TEXT: {
					type: ArgumentType.STRING,
					defaultValue: ' '
				}
			}
		},

		{
			opcode: 'actionPrimitives',
			blockType: BlockType.COMMAND,
			text: '[ACTION] behaviours [TEXT]',
			arguments:{
				ACTION:{
					type: ArgumentType.STRING,
					defaultValue: 'start',
					menu: 'actionBehaviours'
				},
				TEXT:{
					type: ArgumentType.STRING,
					defaultValue: ' '
				}
			}
		},

		{
			opcode: 'poppyUrl',
			blockType: BlockType.REPORTER,
			text: 'robot URL'
		},

		{
			opcode: 'testConnection',
			blockType: BlockType.REPORTER,
			text: 'test connection'
		},

		{
			opcode: 'getAvailableRecords',
			blockType: BlockType.REPORTER,
			text: 'all recorded moves'
		},

		{
			opcode: 'stopMovePlayer',
			blockType: BlockType.COMMAND,
			text: 'stop move [TEXT]',
			arguments:{
				TEXT:{
					type: ArgumentType.STRING,
					defaultValue: 'move_name'
				}
			}
		},

		{
			opcode: 'test1',
			blockType: BlockType.REPORTER,
			text: 'test1'
		},
		{
			opcode: 'test2',
			blockType: BlockType.REPORTER,
			text: 'test2'
		},
		{
			opcode: 'setHost',
			blockType: BlockType.COMMAND,
			text: 'set host to [URL]',
			arguments:{
				URL: {
					type: ArgumentType.STRING,
					defaultValue: "poppy.local"
				}
			}
		}

		],

		menus:{
			marker:{
				acceptReporters: false,
				items:['caribou', 'tetris', 'lapin']
			},
			getBehaviours:{
				acceptReporters: false,
				items:['all', 'running']
			},
			getPropBehaviours:{
				acceptReporters: false,
				items:['methodes', 'properties']
			},
			actionBehaviours:{
				acceptReporters: false,
				items:['start', 'stop', 'pause', 'resume']
			}
		}
	};
    }

    
	
	getMotorsPositions(){
		var url = this._robotUrlTmp + '/motors/get/positions';
		const resultat = this.makeARequest(url)
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

	getRobotAliases(){
		var url = this._robotUrlTmp + '/motors/alias';
		const resultat = this.makeARequest(url)
		.then(data=>data)
		.catch(err=>console.log(err));
		return resultat;
	}

	detectMarker(args){
		var url = this._robotUrlTmp + '/detect/' + args.TEXT;
		const resultat = this.makeARequest(url)
		.then(data=>data)
		.catch(err=>console.log(err));
		return resultat;
	}

	getMotorsInGroup(args){
		var url = this._robotUrlTmp + '/motors/' + args.TEXT;
		const resultat = this.makeARequest(url)
		.then(data=>data)
		.catch(()=>alert('Group <' + args.TEXT + '> is not in the available groups of your robot. See "all motors groups" button for the available groups'));
		return resultat;
	}

	getMotors(){
		var url = this._robotUrlTmp + '/motors/motors';
		const resultat = this.makeARequest(url)
		.then(data=>data)
		.catch(err=>console.log(err));
		return resultat;
	}

	getPrimitives(args){
		var url = this._robotUrlTmp + '/primitives';
		if(args.TEXT == 'running')
			url += '/running';
		const resultat = this.makeARequest(url)
		.then(data=>data)
		.catch(err=>console.log(err));
		return resultat;
	}

	getPropertiesMethodes(args){
		var url = this._robotUrlTmp + '/primitive/' + args.TEXT + '/' + args.PROP;
		const resultat = this.makeARequest(url)
		.then(data=>data)
		.catch(()=>alert('Primitive <' + args.TEXT + '> is not available primitives of your robot. See "get all behaviours" button for the available primitives'));
		return resultat;
	}

	actionPrimitives(args){
		var url = this._robotUrlTmp + '/primitive/' + args.TEXT + '/' + args.ACTION;
		const resultat = this.makeARequest(url)
		.then(data=>data)
		.catch(()=>alert('Primitive <' + args.TEXT + '> is not available primitives of your robot. See "get all behaviours" button for the available primitives'));
		return resultat;
		
	}

	testConnection(){
		var url = this._robotUrlTmp + '/';
		const resultat = this.makeARequest(url)
		.then(data=>{return 'Connection ok !' })
		.catch(()=>alert('You may have connection troubles. Check the host variable'));
		return resultat;
	}

	getAvailableRecords(){
		var url = this._robotUrlTmp + '/primitive/MovePlayer';
		const resultat = this.makeARequest(url)
		.then(data=>data)
		.catch(err=>console.log(err));
		return resultat;
	}

	stopMovePlayer(args){
		var url = this._robotUrlTmp + '/primitive/MovePlayer/' + args.TEXT + '/stop';
		const resultat = this.makeARequest(url)
		.then(data=>data)
		.catch(()=>alert('Move <' + args.TEXT + '> is not available.'));
		return resultat;
	}
	

	/*--------------------------------------------------*/
	/*              Button code not working             */
	/*--------------------------------------------------*/


	//Connection 

	test1(){
		var test;
		const resultat = this.makeARequest('http://poppy.local:6969/ip/')
		.then(data=>{ test = data;})
		.catch(err=>alert('Your robot host is unreachable'));
		return test;
	}

	//Retrieve the IP adress
	test2(){
		const resultat = this.makeARequest('http://poppy.local:6969/')
		.then(data=>data)
		.catch(err=>alert('Your robot host is unreachable'));
		return resultat;
	}

	setHost(args){
		this._robotUrl = 'http://' + args.URL + ':' + this._robotPort;
		var robotUrl = this._robotUrl + '/ip/';
		const resultat = this.makeARequest(robotUrl)
		.then(data=>data)
		.catch(()=>alert('Your robot host is unreachable'));
		this._robotIp = String(this.test2());
		this._robotUrl = 'http://' + this._robotIp + ':' + this._robotPort;
		return this._robotUrl;
	}

	//Port missing
	poppyUrl(){
		var url = this._robotUrlTmp + '/';
		const resultat = this.makeARequest(url)
		.then(data=>data)
		.catch(err=>console.log(err));
		return resultat;
	}
}

module.exports = Scratch3Poppy;

	  
