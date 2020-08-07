const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
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
					opcode: 'getMotorsPositions',
					blockType: BlockType.REPORTER,
					text: 'get all motors positions',
				},

				{
					opcode: 'getMotors',
					blockType: BlockType.REPORTER,
					text: 'all motors'
				},

				{
					opcode: 'getRobotAliases',
					blockType: BlockType.REPORTER,
					text: 'all motors groups'
				},

				{
					opcode: 'getAvailableRecords',
					blockType: BlockType.REPORTER,
					text: 'all recorded moves'
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
							defaultValue: 'behaviour_name'
						}
					}
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
							defaultValue: 'my_variable',
							menu: 'variable'
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
							defaultValue: 'motor_name'
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
					opcode: 'playConcurrent',
					blockType: BlockType.COMMAND,
					text: 'play concurrently moves [MOVE]',
					arguments:{
						MOVE:{
							type: ArgumentType.STRING,
							defaultValue: 'move_1 move_2'
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
					opcode: 'getMotorRegister',
					blockType: BlockType.REPORTER,
					text: 'get [REG] of motor(s) [MOTOR]',
					arguments:{
						REG:{
							type: ArgumentType.STRING,
							defaultValue: 'my_variable_set',
							menu: 'register'
						},
						MOTOR:{
							type: ArgumentType.STRING,
							defaultValue: 'motor_name'
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
							defaultValue: 'behaviour_name'
						}
					}
				},

				{
					opcode: 'concurrent',
					blockType: BlockType.REPORTER,
					text: 'concurrent [INFO1] [INFO2]',
					arguments:{
						INFO1:{
							type: ArgumentType.STRING,
							defaultValue: ' '
						},
						INFO2:{
							type: ArgumentType.STRING,
							defaultValue: ' '
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
				},
				variable:{
					acceptReporters: true,
					items: ['goal_position', 'moving_speed', 'torque_limit', 'compliant']
				},
				register:{
					acceptReporters: true,
					items:['present_position', 'present_speed', 'present_load', 'present_temperature', 'present_voltage', 'goal_position', 'moving_speed', 'torque_limit', 'compliant']
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
		let argtext = Cast.toString(args.TEXT);
		let url = this._robotUrl + '/detect/' + argtext;
		axios.get(url)
		.then(resp=>resp.data)
		.catch(err=>{console.log(err); alert('Error with parameters or connection')});
	}

	getMotorsInGroup(args){
		let argtext = Cast.toString(args.TEXT);
		let url = this._robotUrl + '/motors/' + argtext;
		const resultat = axios.get(url)
		.then(resp=>{
			let group = resp.data;
			let motorsInGroup = this.toArray(group);
			return motorsInGroup;
		})
		.catch(()=>alert('Group <' + argtext + '> is not in the available groups of your robot. See "all motors groups" button for the available groups'));
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
		let argtext = Cast.toString(args.TEXT);
		let url = this._robotUrl + '/primitives';
		if(argtext == 'running')
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
		let argtext = Cast.toString(args.TEXT);
		let argprop = Cast.toString(args.PROP);
		let url = this._robotUrl + '/primitive/' + argtext + '/' + argprop;
		const resultat = axios.get(url)
		.then(resp=>{
			let prop = resp.data;
			let methodesName = this.toArray(prop);
			return methodesName;
		})
		.catch(()=>alert('Primitive <' + argtext + '> is not available primitives of your robot. See "get all behaviours" button for the available primitives'));
		return resultat;
	}

	actionPrimitives(args){
		let argtext = Cast.toString(args.TEXT);
		let argaction = Cast.toString(args.ACTION);
		let url = this._robotUrl + '/primitive/' + argtext + '/' + argaction;
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
		let argtext = Cast.toString(args.TEXT);
		let url = this._robotUrl + '/primitive/MovePlayer/' + argtext + '/stop';
		axios.get(url)
		.catch(()=>alert('Move <' + args.TEXT + '> is not available.'));
	}
	
	getSitemap(args){
		let argurl = Cast.toString(args.URL);
		let url = 'http://' + argurl + '/';
		const resultat = axios.get(url)
		.then(resp=>resp.data)
		.catch(()=>alert('Robot is not connected to ' + url));
		return resultat;
	}

	setCompliant(args){
		let argmotors = Cast.toString(args.MOTORS);
		let compliant;
		if(args.STATUS == 'compliant')
			compliant = 1;
		else
			compliant = 0;
		let url = this._robotUrl + '/motors/set/registers/' + this.motorsStatusUrl(argmotors,'compliant',compliant);
		axios.get(url)
		.catch(err=>{console.log(err); alert('Error with parameters or connection')});
	}

	setValue(args){
		let argmotors = Cast.toString(args.MOTORS);
		let argvalue = Cast.toString(args.VALUE);
		let argstatus = Cast.toString(args.STATUS);
		let url = this._robotUrl + '/motors/set/registers/' + this.motorsStatusUrl(argmotors,argstatus,argvalue);
		axios.get(url)
		.catch(err=>{console.log(err); alert('Error with parameters or connection')});
	}

	setLed(args){
		let argmotors = Cast.toString(args.MOTORS);
		let argvalue = Cast.toString(args.VALUE);
		let url = this._robotUrl + '/motors/set/registers/' + this.motorsStatusUrl(argmotors,'led',argvalue);
		axios.get(url)
		.catch(err=>{console.log(err); alert('Error with parameters or connection')});
	}

	popup(args){
		let argtext = Cast.toString(args.TEXT);
		return alert(argtext);
	}

	startMovePlayerWithSpeed(args){
		let argmove = Cast.toString(args.MOVE);
		let argspeed = Cast.toString(args.SPEED);
		let url = this._robotUrl + '/primitive/MovePlayer/' + argmove + '/start/' + argspeed;
		axios.get(url)
		.catch(err=>{console.log(err); alert('Error with parameters or connection')});
	}

	startMovePlayerBackwardsWithSpeed(args){
		let argmove = Cast.toString(args.MOVE);
		let argspeed = Cast.toString(args.SPEED);
		let url = this._robotUrl + '/primitive/MovePlayer/' + argmove + '/start/' + argspeed + '/backwards';
		axios.get(url)
		.catch(err=>{console.log(err); alert('Error with parameters or connection')});
	}

	setHost(args){
		let argurl = Cast.toString(args.URL);
		this._robotUrl = 'http://' + argurl + ':' + this._robotPort;
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
		let argtext = Cast.toString(args.TEXT);
		let url = 'http://poppy.local/api/' + argtext;
		axios.get(url)
		.catch(err=>{console.log(err); alert('Error with parameters or connection')});
	}

	remove(args){
		let argtext = Cast.toString(args.TEXT);
		let url = this._robotUrl + '/primitive/MoveRecorder/' + argtext + '/remove';
		axios.get(url)
		.catch(err=>{console.log(err); alert('Error with parameters or connection')});
	}

	indexMotor(args){
		let argtext = Cast.toString(args.TEXT);
		let url = this._robotUrl + '/motors/motors';
		const resultat = axios.get(url)
		.then(resp=>{
			let index = -1;
			let motors = resp.data;
			let motorsName = this.toArray(motors);
			for(let i =0;i<motorsName.length;i++){
				if(argtext == motorsName[i]){
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
		let argtext = Cast.toString(args.TEXT);
		let url = this._robotUrl + argtext;
		const resultat = axios.get(url)
		.then(resp=>resp.data)
		.catch(err=>{console.log(err); alert('Error with parameters or connection')});
		return resultat;
	}

	setMotorsGoto(args){
		let argmotors = Cast.toString(args.MOTORS);
		let argpos = Cast.toString(args.POS);
		let argtime = Cast.toString(args.TIME);
		let url = this._robotUrl + '/motors/set/goto/' + this.motorsStatusUrl(argmotors,argpos,argtime);
		axios.get(url)
		.catch(err=>{console.log(err); alert('Error with parameters or connection')});
	}

	getMotorRegister(args){
		let argmotor = Cast.toString(args.MOTOR);
		let argreg = Cast.toString(args.REG);
		let url = this._robotUrl + '/motors/';
		let motors = this.toMotorsListApiFormat(argmotor);
		url += motors + '/get/' + argreg;
		const resultat = axios.get(url)
		.then(resp=>{
			let value = resp.data;
			let res = this.toArray(value);
			return res;
		})
		.catch(err=>{console.log(err); alert('Error with parameters or connection')});
		return resultat;
	}

	createRecordMove(args){
		let argmotor = Cast.toString(args.MOTOR);
		let argmove = Cast.toString(args.MOVE);
		let urlMotors = this._robotUrl + '/motors/motors';
		if(argmotor == ' ' || argmotor == ''){
			axios.get(urlMotors)
			.then(resp=>{
				let value = resp.data;
				let motorList = this.toMotorsListApiFormat(value);
				let urlCompliant = this._robotUrl + '/motors/set/registers/' + this.motorsStatusUrl(motorList,'compliant','1');
				axios.get(urlCompliant)
				.catch(err=>{console.log(err); alert('Error with the connection')});
				let url = this._robotUrl + '/primitive/MoveRecorder/' + argmove + '/start/' + motorList;
				axios.get(url)
				.catch(err=>{console.log(err); alert('Error with parameters or connection')});
			})
			.catch(err=>{console.log(err); alert('Error with the connection')});
		}
		else{
			let motors = this.toMotorsListApiFormat(argmotor);
			let urlCompliant = this._robotUrl + '/motors/set/registers/' + this.motorsStatusUrl(motors,'compliant','1');
			axios.get(urlCompliant)
			.catch(err=>{console.log(err); alert('Error with the connection')});
			let url = this._robotUrl + '/primitive/MoveRecorder/' + argmove + '/start/' + motors;
			axios.get(url)
			.catch(err=>{console.log(err); alert('Error with parameters or connection')});
		}	
	}

	stopSaveMove(args){
		let argmove = Cast.toString(args.MOVE);
		let urlMotorsUsed = this._robotUrl + '/primitive/MoveRecorder/' + argmove + '/get_motors';
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
		let url = this._robotUrl + '/primitive/MoveRecorder/' + argmove + '/stop';
		axios.get(url)
		.catch(err=>{console.log(err); alert('Error with parameters or connection')});
	}

	concurrent(args){
		let arginfo1 = Cast.toString(args.INFO1);
		let arginfo2 = Cast.toString(args.INFO2);
		let resultat = arginfo1 + '/' + arginfo2;
		return resultat;
	}

	playConcurrent(args){
		let argmove = Cast.toString(args.MOVE);
		let listMove = [];
		let move = '';
		for(let i = 0;i<argmove.length;i++){
			if(argmove.substring(i,i+1) == ' '){
				listMove.push(move);
				move = '';
			}
			else{
				move += argmove.substring(i,i+1);
			}
		}
		listMove.push(move);
		for(let i = 0; i<listMove.length;i++){
			let url = this._robotUrl + '/primitive/MovePlayer/' + listMove[i] + '/start/1';
			axios.get(url)
			.catch(err=>{console.log(err); alert('Error with parameters or connection. See <move> in all recorded moves')});
		}
		
	}	
	
}

module.exports = Scratch3Poppy;

	  
