const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const axios = require('axios').default;


class Scratch3Poppy {

	motorsStatusUrl(motors,status,value){
		let url = '';
		for(let i=0;i<motors.length;i++){
			if(motors.substring(i,i+1) == ' ' || motors.substring(i,i+1) == '/' || motors.substring(i,i+1) == ',' || motors.substring(i,i+1) == ';'){
				url += ':' + status + ':' + value + ';';
			}
			else{
				url += motors.substring(i,i+1);
			}
		}
		url += ':' + status + ':' + value;
		return url;	
	}

	toArray(text){
		let res = [];
		let result = '';
		for(let i= 0; i < text.length; i++){
			if(text.substring(i,i+1) == ' ' || text.substring(i,i+1) == '/' || text.substring(i,i+1) == ',' || text.substring(i,i+1) == ';'){
				res.push(result);
				result = '';
			}
			else{
				result += text.substring(i,i+1);
			}
				
		}
		res.push(result);
		return res;
	}

	toMotorsListApiFormat(motors){
		let motorApiFormat = '';
		for(let i=0;i<motors.length;i++){
			if(motors.substring(i,i+1) == ' ' || motors.substring(i,i+1) == '/' || motors.substring(i,i+1) == ',' || motors.substring(i,i+1) == ';'){
				motorApiFormat += ';';
			}
			else{
				motorApiFormat += motors.substring(i,i+1);
			}
		}
		return motorApiFormat;
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
					opcode: 'initRobot',
					blockType: BlockType.COMMAND,
					text: 'robot [TEXT]',
					arguments:{
						TEXT:{
							type: ArgumentType.STRING,
							defaultValue: 'start',
							menu: 'init'
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
					opcode: 'createRecordMove',
					BlockType: BlockType.COMMAND,
					text: 'create & start record move [MOVE] with motor(s) [MOTOR]',
					arguments:{
						MOVE:{
							type: ArgumentType.STRING,
							defaultValue: 'move_name'
						},
						MOTOR:{
							type: ArgumentType.STRING,
							defaultValue: ' '
						}
					}
				},

				{
					opcode: 'stopSaveMove',
					BlockType: BlockType.COMMAND,
					text: 'stop record & save move [MOVE]',
					arguments:{
						MOVE:{
							type: ArgumentType.STRING,
							defaultValue: 'move_name'
						}
					}
				},

				{
					opcode: 'getMotorRegister',
					blockType: BlockType.REPORTER,
					text: 'get [REG] of motor(s) [MOTOR]',
					arguments:{
						REG:{
							type: ArgumentType.STRING,
							defaultValue: 'present_position'
						},
						MOTOR:{
							type: ArgumentType.STRING,
							defaultValue: 'motor_name'
						}
					}
				},

				{
					opcode: 'callAPI',
					blockType: BlockType.REPORTER,
					text: 'call the API [TEXT]',
					arguments:{
						TEXT:{
							type: ArgumentType.STRING,
							defaultValue: '/motors/motors'
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
					opcode: 'getAvailableRecords',
					blockType: BlockType.REPORTER,
					text: 'all recorded moves'
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
					acceptReporters: true,
					items:['caribou', 'tetris', 'lapin']
				},
				getBehaviours:{
					acceptReporters: true,
					items:['all', 'running']
				},
				getPropBehaviours:{
					acceptReporters: true,
					items:['methodes', 'properties']
				},
				actionBehaviours:{
					acceptReporters: true,
					items:['start', 'stop', 'pause', 'resume']
				},
				compliant:{
					acceptReporters: true,
					items:['compliant', 'stiff']
				},
				color:{
					acceptReporters: true,
					items:['off', 'red', 'green', 'yellow', 'blue', 'pink', 'cyan', 'white']
				},
				wait:{
					acceptReporters: true,
					items:['false','true']
				},
				init:{
					acceptReporters: true,
					items:['start', 'stop', 'reset']
				}
			}
		};
    }
  
	
	getMotorsPositions(){
		let url = this._robotUrl + '/motors/get/positions';
		const resultat = axios.get(url)
		.then(resp=>{
			let pos = resp.data;
			let motorsPos = this.toArray(pos);
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
			let groupMotorsName = this.toArray(name);
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
			let motorsInGroup = this.toArray(group);
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
			let motorsName = this.toArray(name);
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
			let behaviorsName = this.toArray(name);
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
			let methodesName = this.toArray(prop);
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
			let recordsName = this.toArray(record);
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

	initRobot(args){
		let url = 'http://poppy.local/api/' + args.TEXT;
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
			let motorsName = this.toArray(motors);
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

	callAPI(args){
		let url = this._robotUrl + args.TEXT;
		const resultat = axios.get(url)
		.then(resp=>resp.data)
		.catch(err=>{console.log(err); alert('Error with parameters or connection')});
		return resultat;
	}

	setMotorsGoto(args){
		let url = this._robotUrl + '/motors/set/goto/' + this.motorsStatusUrl(args.MOTORS,args.POS,args.TIME);
		axios.get(url)
		.catch(err=>{console.log(err); alert('Error with parameters or connection')});
	}

	getMotorRegister(args){
		let url = this._robotUrl + '/motors/';
		let motors = this.toMotorsListApiFormat(args.MOTOR);
		url += motors + '/get/' + args.REG;
		const resultat = axios.get(url)
		.then(resp=>{
			let value = resp.data;
			let res = this.toArray(value);
			return res;
		})
		.catch(err=>{console.log(err); alert('Error with parameters or connection. See <variable> in the register and infos list or <motor_name> does not exist')});
		return resultat;
	}

	createRecordMove(args){
		let urlMotors = this._robotUrl + '/motors/motors';
		if(args.MOTOR == ' ' || args.MOTOR == ''){
			axios.get(urlMotors)
			.then(resp=>{
				let value = resp.data;
				let motorList = this.toMotorsListApiFormat(value);
				let urlCompliant = this._robotUrl + '/motors/set/registers/' + this.motorsStatusUrl(motorList,'compliant','1');
				axios.get(urlCompliant)
				.catch(err=>{console.log(err); alert('Error with the connection')});
				let url = this._robotUrl + '/primitive/MoveRecorder/' + args.MOVE + '/start/' + motorList;
				axios.get(url)
				.catch(err=>{console.log(err); alert('Error with parameters or connection')});
			})
			.catch(err=>{console.log(err); alert('Error with the connection')});
		}
		else{
			let motors = this.toMotorsListApiFormat(args.MOTOR);
			let urlCompliant = this._robotUrl + '/motors/set/registers/' + this.motorsStatusUrl(motors,'compliant','1');
			axios.get(urlCompliant)
			.catch(err=>{console.log(err); alert('Error with the connection')});
			let url = this._robotUrl + '/primitive/MoveRecorder/' + args.MOVE + '/start/' + motors;
			axios.get(url)
			.catch(err=>{console.log(err); alert('Error with parameters or connection')});
		}	
	}

	stopSaveMove(args){
		let urlMotorsUsed = this._robotUrl + '/primitive/MoveRecorder/' + args.MOVE + '/get_motors';
		axios.get(urlMotorsUsed)
		.then(resp=>{
			let motors = resp.data;
			console.log(motors);
			let urlCompliant = this._robotUrl + '/motors/set/registers/' + this.motorsStatusUrl(motors,'compliant','0');
			console.log(urlCompliant);
			axios.get(urlCompliant)
			.catch(err=>{console.log(err); alert('Error with parameters or connection')});
		})
		.catch(err=>{console.log(err); alert('Error with the connection')});
		let url = this._robotUrl + '/primitive/MoveRecorder/' + args.MOVE + '/stop';
		axios.get(url)
		.catch(err=>{console.log(err); alert('Error with parameters or connection')});
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

	
	
}

module.exports = Scratch3Poppy;

	  
