const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const axios = require('axios').default;
const Cast = require('../../util/cast');
const log = require('../../util/log');
const Timer = require('../../util/timer');

class Scratch3Poppy {

	motorsStatusUrl(motors,status,value){
		var url = '';
		for(let i=0;i<motors.length;i++){
			if(motors.substring(i,i+1) == ' ' || motors.substring(i,i+1) == ','){
				url += ':' + status + ':' + value + ';';
			}
			else{
				url += motors.substring(i,i+1);
			}
		}
		url += ':' + status + ':' + value;
		return url;	
	}

	//Problem to display results
	display(text){
		/*let num = 1;
		let resultat = '1: ';*/
		let res = [];
		let result = '';
		for(let i= 0; i < text.length; i++){
			if(text.substring(i,i+1) == ';' || text.substring(i,i+1) == '/'){
				/*num++;
				resultat += '\n' + num + ': ';*/
				res.push(result);
			}
			else{
				//resultat += text.substring(i,i+1); 
				result += text.substring(i,i+1);
			}
				
		}
		//return resultat;
		return result;
	}

    constructor (runtime) {
		this.runtime = runtime;
		this._robotUrl = '';
		this._robotIp = '';
		this._robotPort = '6969';
    }

    getInfo () {
		return {
			id: 'poppy',
			name: 'Poppy blocks',
			blocks: [
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
				},

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
					opcode: 'getSitemap',
					blockType: BlockType.REPORTER,
					text: 'http:// [URL]',
					arguments:{
						URL:{
							type: ArgumentType.STRING,
							defaultValue: ' '
						}
					}
				},

				{
					opcode: 'setCompliant',
					blockType: BlockType.COMMAND,
					text: 'set motor(s) [MOTORS] [STATUS]',
					arguments:{
						MOTORS:{
							type: ArgumentType.STRING,
							defaultValue: 'motor_name'
						},
						STATUS:{
							type: ArgumentType.STRING,
							defaultValue: 'compliant',
							menu: 'compliant'
						}
					}
				},

				{
					opcode: 'setValue',
					blockType: BlockType.COMMAND,
					text: 'set [STATUS] motor(s) [MOTORS] to [VALUE]',
					arguments:{
						MOTORS:{
							type: ArgumentType.STRING,
							defaultValue: 'motor_name'
						},
						STATUS:{
							type: ArgumentType.STRING,
							defaultValue: 'my_variable'
						},
						VALUE:{
							type: ArgumentType.STRING,
							defaultValue: 'value'
						}
					}
				},

				{
					opcode: 'setLed',
					blockType: BlockType.COMMAND,
					text: 'set color leds of motor(s) [MOTORS] in [STATUS]',
					arguments:{
						MOTORS:{
							type: ArgumentType.STRING,
							defaultValue: 'motor_name'
						},
						STATUS:{
							type: ArgumentType.STRING,
							defaultValue: 'off',
							menu: 'color'
						}
					}
				},

				{
					opcode: 'popup',
					blockType: BlockType.COMMAND,
					text: 'popup [TEXT]',
					arguments:{
						TEXT:{
							type: ArgumentType.STRING,
							defaultValue: ' '
						}
					}
				},

				{
					opcode: 'startMovePlayerWithSpeed',
					blockType: BlockType.COMMAND,
					text: 'play move [MOVE] | speed x [SPEED]',
					arguments:{
						MOVE:{
							type: ArgumentType.STRING,
							defaultValue: 'move_name'
						},
						SPEED:{
							type: ArgumentType.NUMBER,
							defaultValue: 1
						}
					}
				},

				{
					opcode: 'startMovePlayerBackwardsWithSpeed',
					blockType: BlockType.COMMAND,
					text: 'play move [MOVE] in reverse | speed x [SPEED]',
					arguments:{
						MOVE:{
							type: ArgumentType.STRING,
							defaultValue: 'move_name'
						},
						SPEED:{
							type: ArgumentType.NUMBER,
							defaultValue: 1
						}
					}
				},

				{
					opcode: 'setMotorsGoto',
					blockType: BlockType.COMMAND,
					text: 'set position [POS] of motor(s) [MOTORS] in [TIME] seconds | wait ? [WAIT]',
					arguments:{
						MOTORS:{
							type: ArgumentType.STRING,
							defaultValue: 'motor_name'
						},
						POS:{
							type: ArgumentType.NUMBER,
							defaultValue: 0
						},
						TIME:{
							type: ArgumentType.NUMBER,
							defaultValue: 2
						},
						WAIT:{
							type: ArgumentType.STRING,
							defaultValue: 'false',
							menu: 'wait'
						}
					}
				},

				{
					opcode: 'reset',
					blockType: BlockType.COMMAND,
					text: 'reset [TEXT]',
					arguments:{
						TEXT:{
							type: ArgumentType.STRING,
							defaultValue: 'simulation',
							menu: 'reset'
						}
					}
				},

				{
					opcode: 'remove',
					blockType: BlockType.COMMAND,
					text: 'remove [TEXT]',
					arguments:{
						TEXT:{
							type: ArgumentType.STRING,
							defaultValue: 'move_name'
						}
					}
				},

				{
					opcode: 'indexMotor',
					blockType: BlockType.REPORTER,
					text: 'Index of motor [TEXT]',
					arguments:{
						TEXT:{
							type: ArgumentType.STRING,
							defaultValue: 'motor_name'
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
				},
				compliant:{
					acceptReporters: false,
					items:['compliant', 'stiff']
				},
				color:{
					acceptReporters: false,
					items:['off', 'red', 'green', 'yellow', 'blue', 'pink', 'cyan', 'white']
				},
				wait:{
					acceptReporters: false,
					items:['false','true']
				},
				reset:{
					acceptReporters: false,
					items:['simulation', 'robot']
				}
			}
		};
    }
  
	
	getMotorsPositions(){
		let url = this._robotUrl + '/motors/get/positions';
		const resultat = axios.get(url)
		.then(resp=>{
			let pos = resp.data;
			let motorsPos = this.display(pos);
			return motorsPos;
		})
		.catch(err=>{console.log(err); alert('Error with the connection')});
		return resultat;
	}

	getRobotAliases(){
		let url = this._robotUrl + '/motors/alias';
		const resultat = axios.get(url)
		.then(resp=>{
			let name = resp.data;
			let groupMotorsName = this.display(name);
			return groupMotorsName;
		})
		.catch(err=>{console.log(err); alert('Error with the connection')});
		return resultat;
	}

	detectMarker(args){
		let url = this._robotUrl + '/detect/' + args.TEXT;
		axios.get(url)
		.then(resp=>resp.data)
		.catch(err=>{console.log(err); alert('Error with parameters or connection')});
	}

	getMotorsInGroup(args){
		let url = this._robotUrl + '/motors/' + args.TEXT;
		const resultat = axios.get(url)
		.then(resp=>{
			let group = resp.data;
			let motorsInGroup = this.display(group);
			return motorsInGroup;
		})
		.catch(()=>alert('Group <' + args.TEXT + '> is not in the available groups of your robot. See "all motors groups" button for the available groups'));
		return resultat;
	}

	getMotors(){
		let url = this._robotUrl + '/motors/motors';
		const resultat = axios.get(url)
		.then(resp=>{
			let name = resp.data;
			let motorsName = this.display(name);
			return motorsName;
		})
		.catch(err=>{console.log(err); alert('Error with the connection')});
		return resultat;
	}

	getPrimitives(args){
		let url = this._robotUrl + '/primitives';
		if(args.TEXT == 'running')
			url += '/running';
		const resultat = axios.get(url)
		.then(resp=>{
			let name = resp.data;
			let behaviorsName = this.display(name);
			return behaviorsName;
		})
		.catch(err=>{console.log(err); alert('Error with parameters or connection')});
		return resultat;
	}

	getPropertiesMethodes(args){
		let url = this._robotUrl + '/primitive/' + args.TEXT + '/' + args.PROP;
		const resultat = axios.get(url)
		.then(resp=>{
			let prop = resp.data;
			let methodesName = this.display(prop);
			return methodesName;
		})
		.catch(()=>alert('Primitive <' + args.TEXT + '> is not available primitives of your robot. See "get all behaviours" button for the available primitives'));
		return resultat;
	}

	actionPrimitives(args){
		let url = this._robotUrl + '/primitive/' + args.TEXT + '/' + args.ACTION;
		axios.get(url)
		.catch(()=>alert('Primitive <' + args.TEXT + '> is not available primitives of your robot. See "get all behaviours" button for the available primitives'));
	}

	testConnection(){
		let url = this._robotUrl + '/';
		const resultat = axios.get(url)
		.then(()=>{ return 'Connection ok !' })
		.catch(()=>alert('You may have connection troubles. Check the host variable'));
		return resultat;
	}

	getAvailableRecords(){
		let url = this._robotUrl + '/primitive/MovePlayer';
		const resultat = axios.get(url)
		.then(resp=>{
			let record = resp.data;
			let recordsName = this.display(record);
			return recordsName;
		})
		.catch(err=>{console.log(err); alert('Error with the connection')});
		return resultat;
	}

	stopMovePlayer(args){
		let url = this._robotUrl + '/primitive/MovePlayer/' + args.TEXT + '/stop';
		axios.get(url)
		.catch(()=>alert('Move <' + args.TEXT + '> is not available.'));
	}
	
	getSitemap(args){
		let url = 'http://' + args.URL + '/';
		const resultat = axios.get(url)
		.then(resp=>resp.data)
		.catch(()=>alert('Robot is not connected to ' + url));
		return resultat;
	}

	setCompliant(args){
		let compliant;
		if(args.STATUS == 'compliant')
			compliant = 1;
		else
			compliant = 0;
		let url = this._robotUrl + '/motors/set/registers/' + this.motorsStatusUrl(args.MOTORS,'compliant',compliant);
		axios.get(url)
		.catch(err=>{console.log(err); alert('Error with parameters or connection')});
	}

	setValue(args){
		let url = this._robotUrl + '/motors/set/registers/' + this.motorsStatusUrl(args.MOTORS,args.STATUS,args.VALUE);
		axios.get(url)
		.catch(err=>{console.log(err); alert('Error with parameters or connection')});
	}

	setLed(args){
		let url = this._robotUrl + '/motors/set/registers/' + this.motorsStatusUrl(args.MOTORS,'led',args.VALUE);
		axios.get(url)
		.catch(err=>{console.log(err); alert('Error with parameters or connection')});
	}

	popup(args){
		return alert(args.TEXT);
	}

	startMovePlayerWithSpeed(args){
		let url = this._robotUrl + '/primitive/MovePlayer/' + args.MOVE + '/start/' + args.SPEED;
		axios.get(url)
		.catch(err=>{console.log(err); alert('Error with parameters or connection')});
	}

	startMovePlayerBackwardsWithSpeed(args){
		let url = this._robotUrl + '/primitive/MovePlayer/' + args.MOVE + '/start/' + args.SPEED + '/backwards';
		axios.get(url)
		.catch(err=>{console.log(err); alert('Error with parameters or connection')});
	}

	setHost(args){
		this._robotUrl = 'http://' + args.URL + ':' + this._robotPort;
		let url = this._robotUrl + '/ip/';
		const resultat = axios.get(url)
		.then(resp=>{
			this._robotIp = resp.data;
			this._robotUrl = 'http://' + this._robotIp + ':' + this._robotPort;
			console.log(this._robotIp);
			console.log(this._robotUrl);
			return 'Connection ok !';
		})
		.catch(()=>alert('Your robot host is unreachable'));
		return resultat;
	}

	poppyUrl(){
		return this._robotIp + ':' + this._robotPort;
	}

	// Reset robot not implemented (call not working: http://169.254.224.95/services.php?python=restart + http://169.254.224.95/reset)
	reset(args){
		let url = this._robotUrl;
		if(args.TEXT == 'simulation'){
			url +=  '/reset-simulation';
		}
		let url = this._robotUrl + '/primitive/MovePlayer/' + args.MOVE + '/start/' + args.SPEED + '/backwards';
		axios.get(url)
		.catch(err=>{console.log(err); alert('Error with parameters or connection')});
	}

	remove(args){
		let url = this._robotUrl + '/primitive/MoveRecorder/' + args.TEXT + '/remove';
		axios.get(url)
		.catch(err=>{console.log(err); alert('Error with parameters or connection')});
	}

	indexMotor(args){
		let url = this._robotUrl + '/motors/motors';
		const resultat = axios.get(url)
		.then(resp=>{
			let index = -1;
			let motors = resp.data;
			let motorsName = this.display(motors);
			for(let i =0;i<motorsName.length;i++){
				if(args.TEXT == motorsName[i]){
					index = i+1;
				}
			}
			if(index == -1){
				return alert('This motor does not exist');
			}
			else{
				return index;
			}
		})
		.catch(err=>{console.log(err); alert('Error with the connection')});
		return resultat;
	}

	/*--------------------------------------------------*/
	/*              Button still not working            */
	/*--------------------------------------------------*/


	//Connection 

	test1(){
		/*axios.get('http://poppy.local:6969/ip/')
		.then(res=>{
			this._robotIp = res.data;
			this._robotUrl = 'http://' + this._robotIp + ':' + this._robotPort;
			console.log(this._robotIp);
		})
		.catch(()=>alert('Your robot host is unreachable'));*/
		return this._robotUrl;
	}

	//Retrieve the IP adress
	test2(){
		const resultat = axios.get('http://poppy.local:6969/ip/')
		.then(res=>{
			let essai = res.data;
			console.log(essai);
			let reponse = 'http://' + essai;
			console.log(reponse);
			this._robotUrl = essai;
			return 'Connection ok !';
		})
		.catch(()=>alert('Your robot host is unreachable'));
		return resultat;
	}


	// Problem with wait function
	setMotorsGoto(args){
		let url = this._robotUrl + '/motors/set/goto/' + this.motorsStatusUrl(args.MOTORS,args.POS,args.TIME);
		axios.get(url)
		.catch(err=>{console.log(err); alert('Error with parameters or connection')});
		if(args.WAIT == 'true'){
			sleep(args.TIME * 1000);
		}
	}
	
}

module.exports = Scratch3Poppy;

	  
