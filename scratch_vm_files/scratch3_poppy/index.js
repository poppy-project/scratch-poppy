const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const axios = require('axios').default;
const formatMessage = require('format-message');


class Scratch3Poppy {

	static get DEFAULT_LANG() {
		return 'en';
	}

	motorsStatusUrl(motors, status, value) {
		let url = '';
		for (let i = 0; i < motors.length; i++) {
			if (motors.substring(i, i + 1) === ' ' || motors.substring(i, i + 1) === '/' || motors.substring(i, i + 1) === ',' || motors.substring(i, i + 1) === ';' || motors.substring(i, i + 1) === '\n') {
				url += ':' + status + ':' + value + ';';
			} else {
				url += motors.substring(i, i + 1);
			}
		}
		url += ':' + status + ':' + value;
		return url;
	}

	toArray(val){
		let res = [];
		let result = '';
		let text = Cast.toString(val);
		for(let i= 0; i < text.length; i++){
			if(text.substring(i,i+1) == ' ' || text.substring(i,i+1) == '/' || text.substring(i,i+1) == ',' || text.substring(i,i+1) == ';'){
				res.push(result);
				result = '';
			}
			else{
				result += text.substring(i,i+1);
			}
				
		}
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


	constructor(runtime) {
		this.runtime = runtime;
		this._robotUrl = '';
		this._robotIp = '';
		this._robotPort = '6969';
	}

	getInfo() {
		const messages = this.getMessagesForLocale();

		return {
			id: 'poppy',
			name: 'Poppy',
			blocks: [
				{
					opcode: 'setHost',
					blockType: BlockType.COMMAND,
					text: messages.blocks.setHost,
					arguments: {
						URL: {
							type: ArgumentType.STRING,
							defaultValue: "poppy.local"
						}
					}
				},

				{
					opcode: 'poppyUrl',
					blockType: BlockType.REPORTER,
					text: messages.blocks.poppyUrl
				},

				{
					opcode: 'testConnection',
					blockType: BlockType.REPORTER,
					text: messages.blocks.testConnection
				},

				{
					opcode: 'getMotorsPositions',
					blockType: BlockType.REPORTER,
					text: messages.blocks.getMotorsPositions
				},

				{
					opcode: 'getMotors',
					blockType: BlockType.REPORTER,
					text: messages.blocks.getMotors
				},

				{
					opcode: 'getRobotAliases',
					blockType: BlockType.REPORTER,
					text: messages.blocks.getRobotAliases
				},

				{
					opcode: 'getAvailableRecords',
					blockType: BlockType.REPORTER,
					text: messages.blocks.getAvailableRecords
				},

				{
					opcode: 'actionPrimitives',
					blockType: BlockType.COMMAND,
					text: messages.blocks.actionPrimitives,
					arguments: {
						ACTION: {
							type: ArgumentType.STRING,
							defaultValue: 'start',
							menu: 'actionBehaviours'
						},
						TEXT: {
							type: ArgumentType.STRING,
							defaultValue: 'behaviour_name'
						}
					}
				},

				{
					opcode: 'stopMovePlayer',
					blockType: BlockType.COMMAND,
					text: messages.blocks.stopMovePlayer,
					arguments: {
						TEXT: {
							type: ArgumentType.STRING,
							defaultValue: 'move_name'
						}
					}
				},

				{
					opcode: 'setCompliant',
					blockType: BlockType.COMMAND,
					text: messages.blocks.setCompliant,
					arguments: {
						MOTORS: {
							type: ArgumentType.STRING,
							defaultValue: 'motor_name'
						},
						STATUS: {
							type: ArgumentType.STRING,
							defaultValue: 'compliant',
							menu: 'compliant'
						}
					}
				},

				{
					opcode: 'setValue',
					blockType: BlockType.COMMAND,
					text: messages.blocks.setValue,
					arguments: {
						MOTORS: {
							type: ArgumentType.STRING,
							defaultValue: 'motor_name'
						},
						STATUS: {
							type: ArgumentType.STRING,
							defaultValue: 'my_variable',
							menu: 'variable'
						},
						VALUE: {
							type: ArgumentType.STRING,
							defaultValue: 'value'
						}
					}
				},

				{
					opcode: 'setLed',
					blockType: BlockType.COMMAND,
					text: messages.blocks.setLed,
					arguments: {
						MOTORS: {
							type: ArgumentType.STRING,
							defaultValue: 'motor_name'
						},
						STATUS: {
							type: ArgumentType.STRING,
							defaultValue: 'off',
							menu: 'color'
						}
					}
				},

				{
					opcode: 'popup',
					blockType: BlockType.COMMAND,
					text: messages.blocks.popup,
					arguments: {
						TEXT: {
							type: ArgumentType.STRING,
							defaultValue: ' '
						}
					}
				},

				{
					opcode: 'startMovePlayerWithSpeed',
					blockType: BlockType.COMMAND,
					text: messages.blocks.startMovePlayerWithSpeed,
					arguments: {
						MOVE: {
							type: ArgumentType.STRING,
							defaultValue: 'move_name'
						},
						SPEED: {
							type: ArgumentType.NUMBER,
							defaultValue: 1
						}
					}
				},

				{
					opcode: 'startMovePlayer',
					blockType: BlockType.REPORTER,
					text: messages.blocks.startMovePlayer,
					arguments: {
						MOVE: {
							type: ArgumentType.STRING,
							defaultValue: 'move_name'
						},
						SPEED: {
							type: ArgumentType.NUMBER,
							defaultValue: 1
						}
					}
				},

				{
					opcode: 'startMovePlayerBackwards',
					blockType: BlockType.REPORTER,
					text: messages.blocks.startMovePlayerBackwards,
					arguments: {
						MOVE: {
							type: ArgumentType.STRING,
							defaultValue: 'move_name'
						},
						SPEED: {
							type: ArgumentType.NUMBER,
							defaultValue: 1
						}
					}
				},

				{
					opcode: 'startMovePlayerBackwardsWithSpeed',
					blockType: BlockType.COMMAND,
					text: messages.blocks.startMovePlayerBackwardsWithSpeed,
					arguments: {
						MOVE: {
							type: ArgumentType.STRING,
							defaultValue: 'move_name'
						},
						SPEED: {
							type: ArgumentType.NUMBER,
							defaultValue: 1
						}
					}
				},

				{
					opcode: 'setMotorsGoto',
					blockType: BlockType.COMMAND,
					text: messages.blocks.setMotorsGoto,
					arguments: {
						MOTORS: {
							type: ArgumentType.STRING,
							defaultValue: 'motor_name'
						},
						POS: {
							type: ArgumentType.NUMBER,
							defaultValue: 0
						},
						TIME: {
							type: ArgumentType.NUMBER,
							defaultValue: 2
						},
						WAIT: {
							type: ArgumentType.STRING,
							defaultValue: 'false',
							menu: 'wait'
						}
					}
				},

				{
					opcode: 'initRobot',
					blockType: BlockType.COMMAND,
					text: messages.blocks.initRobot,
					arguments: {
						TEXT: {
							type: ArgumentType.STRING,
							defaultValue: 'start',
							menu: 'init'
						}
					}
				},

				{
					opcode: 'remove',
					blockType: BlockType.COMMAND,
					text: messages.blocks.remove,
					arguments: {
						TEXT: {
							type: ArgumentType.STRING,
							defaultValue: 'move_name'
						}
					}
				},

				{
					opcode: 'createRecordMove',
					BlockType: BlockType.COMMAND,
					text: messages.blocks.createRecordMove,
					arguments: {
						MOVE: {
							type: ArgumentType.STRING,
							defaultValue: 'move_name'
						},
						MOTOR: {
							type: ArgumentType.STRING,
							defaultValue: 'motor_name'
						}
					}
				},

				{
					opcode: 'stopSaveMove',
					BlockType: BlockType.COMMAND,
					text: messages.blocks.stopSaveMove,
					arguments: {
						MOVE: {
							type: ArgumentType.STRING,
							defaultValue: 'move_name'
						}
					}
				},

				{
					opcode: 'playConcurrent',
					blockType: BlockType.REPORTER,
					text: messages.blocks.playConcurrent,
					arguments: {
						MOVE: {
							type: ArgumentType.STRING,
							defaultValue: 'move_1 move_2'
						}
					}
				},

				//TODO: implement the "play sequentially" button
				{
					opcode: 'playSequentially',
					blockType: BlockType.REPORTER,
					text: messages.blocks.playSequentially,
					arguments: {
						MOVE: {
							type: ArgumentType.STRING,
							defaultValue: 'move_1 move_2'
						}
					},
					//hide the button on Scratch
					hideFromPalette: true
				},


				{
					opcode: 'indexMotor',
					blockType: BlockType.REPORTER,
					text: messages.blocks.indexMotor,
					arguments: {
						TEXT: {
							type: ArgumentType.STRING,
							defaultValue: 'motor_name'
						}
					}
				},

				{
					opcode: 'getMotorRegister',
					blockType: BlockType.REPORTER,
					text: messages.blocks.getMotorRegister,
					arguments: {
						REG: {
							type: ArgumentType.STRING,
							defaultValue: 'my_variable_set',
							menu: 'register'
						},
						MOTOR: {
							type: ArgumentType.STRING,
							defaultValue: 'motor_name'
						}
					}
				},

				{
					opcode: 'getMotorsInGroup',
					blockType: BlockType.REPORTER,
					text: messages.blocks.getMotorsInGroup,
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
					text: messages.blocks.getPrimitives,
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
					text: messages.blocks.getPropertiesMethodes,
					arguments: {
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
					text: messages.blocks.concurrent,
					arguments: {
						INFO1: {
							type: ArgumentType.STRING,
							defaultValue: ' '
						},
						INFO2: {
							type: ArgumentType.STRING,
							defaultValue: ' '
						}
					}
				},

				{
					opcode: 'sequence',
					blockType: BlockType.REPORTER,
					text: messages.blocks.sequence,
					arguments: {
						INFO1: {
							type: ArgumentType.STRING,
							defaultValue: ' '
						},
						INFO2: {
							type: ArgumentType.STRING,
							defaultValue: ' '
						}
					},
					//hide the button on Scratch
					hideFromPalette: true
				},

				{
					opcode: 'getSitemap',
					blockType: BlockType.REPORTER,
					text: messages.blocks.getSitemap,
					arguments: {
						URL: {
							type: ArgumentType.STRING,
							defaultValue: ' '
						}
					}
				},

				{
					opcode: 'dataToString',
					blockType: BlockType.REPORTER,
					text: messages.blocks.dataToString,
					arguments: {
						TEXT: {
							type: ArgumentType.STRING,
							defaultValue: 'get_button_data'
						}
					}
				},

				{
					opcode: 'callAPI',
					blockType: BlockType.REPORTER,
					text: messages.blocks.callAPI,
					arguments: {
						TEXT: {
							type: ArgumentType.STRING,
							defaultValue: '/motors/motors'
						}
					}
				},

				{
					opcode: 'detectMarker',
					blockType: BlockType.BOOLEAN,
					text: messages.blocks.detectMarker,
					arguments: {
						TEXT: {
							type: ArgumentType.STRING,
							defaultValue: "caribou",
							menu: "marker"
						}
					}
				}

			],

			menus: {
				marker: {
					acceptReporters: true,
					items: [
						{text: messages.menus.marker.caribou, value: 'caribou'},
						{text: messages.menus.marker.tetris, value: 'tetris'},
						{text: messages.menus.marker.lapin, value: 'lapin'}
					]
				},
				getBehaviours: {
					acceptReporters: true,
					items: [
						{text: messages.menus.getBehaviours.all, value: 'all'},
						{text: messages.menus.getBehaviours.running, value: 'running'}
					]
				},
				getPropBehaviours: {
					acceptReporters: true,
					items: [
						{text: messages.menus.getPropBehaviours.methodes, value: 'methodes'},
						{text: messages.menus.getPropBehaviours.properties, value: 'properties'}
					]
				},
				actionBehaviours: {
					acceptReporters: true,
					items: [
						{text: messages.menus.actionBehaviours.start, value: 'start'},
						{text: messages.menus.actionBehaviours.stop, value: 'stop'},
						{text: messages.menus.actionBehaviours.pause, value: 'pause'},
						{text: messages.menus.actionBehaviours.resume, value: 'resume'}
					]
				},
				compliant: {
					acceptReporters: true,
					items: [
						{text: messages.menus.compliant.compliant, value: 'compliant'},
						{text: messages.menus.compliant.stiff, value: 'stiff'}
					]
				},
				color: {
					acceptReporters: true,
					items: [
						{text: messages.menus.color.off, value: 'off'},
						{text: messages.menus.color.red, value: 'red'},
						{text: messages.menus.color.green, value: 'green'},
						{text: messages.menus.color.yellow, value: 'yellow'},
						{text: messages.menus.color.blue, value: 'blue'},
						{text: messages.menus.color.pink, value: 'pink'},
						{text: messages.menus.color.cyan, value: 'cyan'},
						{text: messages.menus.color.white, value: 'white'}
					]
				},
				wait: {
					acceptReporters: true,
					items: [
						{text: messages.menus.wait.false, value: 'false'},
						{text: messages.menus.wait.true, value: 'true'}
					]
				},
				init: {
					acceptReporters: true,
					items: [
						{text: messages.menus.init.start, value: 'start'},
						{text: messages.menus.init.stop, value: 'stop'},
						{text: messages.menus.init.reset, value: 'reset'}
					]
				},
				variable: {
					acceptReporters: true,
					items: [
						{text: messages.menus.variable.goal_position, value: 'goal_position'},
						{text: messages.menus.variable.moving_speed, value: 'moving_speed'},
						{text: messages.menus.variable.torque_limit, value: 'torque_limit'},
						{text: messages.menus.variable.compliant, value: 'compliant'}
					]
				},
				register: {
					acceptReporters: true,
					items: [
						{text: messages.menus.register.present_position, value: 'present_position'},
						{text: messages.menus.register.present_speed, value: 'present_speed'},
						{text: messages.menus.register.present_load, value: 'present_load'},
						{text: messages.menus.register.present_temperature, value: 'present_temperature'},
						{text: messages.menus.register.present_voltage, value: 'present_voltage'},
						{text: messages.menus.register.goal_position, value: 'goal_position'},
						{text: messages.menus.register.moving_speed, value: 'moving_speed'},
						{text: messages.menus.register.torque_limit, value: 'torque_limit'},
						{text: messages.menus.register.compliant, value: 'compliant'}
					]
				}
			}
		};
	}


	getMotorsPositions() {
		let url = this._robotUrl + '/motors/get/positions';
		const resultat = axios.get(url)
			.then(resp => {
				let pos = resp.data;
				let motorsPos = this.toArray(pos);
				return motorsPos;
			})
			.catch(err => {
				console.log(err);
				alert('Error with the connection')
			});
		return resultat;
	}

	getRobotAliases() {
		let url = this._robotUrl + '/motors/alias';
		const resultat = axios.get(url)
			.then(resp => {
				let name = resp.data;
				let groupMotorsName = this.toArray(name);
				return groupMotorsName;
			})
			.catch(err => {
				console.log(err);
				alert('Error with the connection')
			});
		return resultat;
	}

	detectMarker(args) {
		let argtext = Cast.toString(args.TEXT);
		let url = this._robotUrl + '/detect/' + argtext;
		axios.get(url)
			.then(resp => resp.data)
			.catch(err => {
				console.log(err);
				alert('Error with parameters or connection')
			});
	}

	getMotorsInGroup(args) {
		let argtext = Cast.toString(args.TEXT);
		let url = this._robotUrl + '/motors/' + argtext;
		const resultat = axios.get(url)
			.then(resp => {
				let group = resp.data;
				let motorsInGroup = this.toArray(group);
				return motorsInGroup;
			})
			.catch(() => alert('Group <' + argtext + '> is not in the available groups of your robot. See "all motors groups" button for the available groups'));
		return resultat;
	}

	getMotors() {
		let url = this._robotUrl + '/motors/motors';
		const resultat = axios.get(url)
			.then(resp => {
				let name = resp.data;
				console.log(name);
				let motorsName = this.toArray(name);
				return motorsName;
			})
			.catch(err => {
				console.log(err);
				alert('Error with the connection')
			});
		return resultat;
	}

	getPrimitives(args) {
		let argtext = Cast.toString(args.TEXT);
		let url = this._robotUrl + '/primitives';
		if (argtext === 'running')
			url += '/running';
		const resultat = axios.get(url)
			.then(resp => {
				let name = resp.data;
				let behaviorsName = this.toArray(name);
				return behaviorsName;
			})
			.catch(err => {
				console.log(err);
				alert('Error with parameters or connection')
			});
		return resultat;
	}

	getPropertiesMethodes(args) {
		let argtext = Cast.toString(args.TEXT);
		let argprop = Cast.toString(args.PROP);
		let url = this._robotUrl + '/primitive/' + argtext + '/' + argprop;
		const resultat = axios.get(url)
			.then(resp => {
				let prop = resp.data;
				let methodesName = this.toArray(prop);
				return methodesName;
			})
			.catch(() => alert('Primitive <' + argtext + '> is not available primitives of your robot. See "get all behaviours" button for the available primitives'));
		return resultat;
	}

	actionPrimitives(args) {
		let argtext = Cast.toString(args.TEXT);
		let argaction = Cast.toString(args.ACTION);
		let url = this._robotUrl + '/primitive/' + argtext + '/' + argaction;
		axios.get(url)
			.catch(() => alert('Primitive <' + args.TEXT + '> is not available primitives of your robot. See "get all behaviours" button for the available primitives'));
	}

	testConnection() {
		let url = this._robotUrl + '/';
		const resultat = axios.get(url)
			.then(() => {
				return 'Connection ok !'
			})
			.catch(() => alert('You may have connection troubles. Check the host variable'));
		return resultat;
	}

	getAvailableRecords() {
		let url = this._robotUrl + '/primitive/MovePlayer';
		const resultat = axios.get(url)
			.then(resp => {
				let record = resp.data;
				let recordsName = this.toArray(record);
				return recordsName;
			})
			.catch(err => {
				console.log(err);
				alert('Error with the connection')
			});
		return resultat;
	}

	stopMovePlayer(args) {
		let argtext = Cast.toString(args.TEXT);
		let url = this._robotUrl + '/primitive/MovePlayer/' + argtext + '/stop';
		axios.get(url)
			.catch(() => alert('Move <' + args.TEXT + '> is not available.'));
	}

	getSitemap(args) {
		let argurl = Cast.toString(args.URL);
		let url = 'http://' + argurl + '/';
		const resultat = axios.get(url)
			.then(resp => resp.data)
			.catch(() => alert('Robot is not connected to ' + url));
		return resultat;
	}

	setCompliant(args) {
		let argmotors = Cast.toString(args.MOTORS);
		let compliant;
		if (args.STATUS === 'compliant')
			compliant = 1;
		else
			compliant = 0;
		let url = this._robotUrl + '/motors/set/registers/' + this.motorsStatusUrl(argmotors, 'compliant', compliant);
		axios.get(url)
			.catch(err => {
				console.log(err);
				alert('Error with parameters or connection')
			});
	}

	setValue(args) {
		let argmotors = Cast.toString(args.MOTORS);
		let argvalue = Cast.toString(args.VALUE);
		let argstatus = Cast.toString(args.STATUS);
		let url = this._robotUrl + '/motors/set/registers/' + this.motorsStatusUrl(argmotors, argstatus, argvalue);
		axios.get(url)
			.catch(err => {
				console.log(err);
				alert('Error with parameters or connection')
			});
	}

	setLed(args) {
		let argmotors = Cast.toString(args.MOTORS);
		let argvalue = Cast.toString(args.STATUS);
		let url = this._robotUrl + '/motors/set/registers/' + this.motorsStatusUrl(argmotors, 'led', argvalue);
		axios.get(url)
			.catch(err => {
				console.log(err);
				alert('Error with parameters or connection')
			});
	}

	popup(args) {
		let argtext = Cast.toString(args.TEXT);
		return alert(argtext);
	}

	startMovePlayerWithSpeed(args) {
		let argmove = Cast.toString(args.MOVE);
		let argspeed = Cast.toString(args.SPEED);
		let url = this._robotUrl + '/primitive/MovePlayer/' + argmove + '/start/' + argspeed;
		axios.get(url)
			.catch(err => {
				console.log(err);
				alert('Error with parameters or connection')
			});
	}

	startMovePlayerBackwardsWithSpeed(args) {
		let argmove = Cast.toString(args.MOVE);
		let argspeed = Cast.toString(args.SPEED);
		let url = this._robotUrl + '/primitive/MovePlayer/' + argmove + '/start/' + argspeed + '/backwards';
		axios.get(url)
			.catch(err => {
				console.log(err);
				alert('Error with parameters or connection')
			});
	}

	startMovePlayer(args) {
		let argmove = Cast.toString(args.MOVE);
		let argspeed = Cast.toString(args.SPEED);
		let url = this._robotUrl + '/primitive/MovePlayer/' + argmove + '/start/' + argspeed;
		axios.get(url)
			.catch(err => {
				console.log(err);
				alert('Error with parameters or connection')
			});
	}

	startMovePlayerBackwards(args) {
		let argmove = Cast.toString(args.MOVE);
		let argspeed = Cast.toString(args.SPEED);
		let url = this._robotUrl + '/primitive/MovePlayer/' + argmove + '/start/' + argspeed + '/backwards';
		axios.get(url)
			.catch(err => {
				console.log(err);
				alert('Error with parameters or connection')
			});
	}

	setHost(args) {
		let argurl = Cast.toString(args.URL);
		this._robotUrl = 'http://' + argurl + ':' + this._robotPort;
		let url = this._robotUrl + '/ip/';
		const resultat = axios.get(url)
			.then(resp => {
				this._robotIp = resp.data;
				this._robotUrl = 'http://' + this._robotIp + ':' + this._robotPort;
				console.log(this._robotIp);
				console.log(this._robotUrl);
				return 'Connection ok !';
			})
			.catch(() => alert('Your robot host is unreachable'));
		return resultat;
	}

	poppyUrl() {
		return this._robotIp + ':' + this._robotPort;
	}

	initRobot(args) {
		let argtext = Cast.toString(args.TEXT);
		let url = 'http://poppy.local/api/' + argtext;
		axios.get(url)
			.catch(err => {
				console.log(err);
				alert('Error with parameters or connection')
			});
	}

	remove(args) {
		let argtext = Cast.toString(args.TEXT);
		let listMove = [];
		let move = '';
		for (let i = 0; i < argtext.length; i++) {
			if (argtext.substring(i, i + 1) === ' ' || argtext.substring(i, i + 1) === '/' || argtext.substring(i, i + 1) === ',' || argtext.substring(i, i + 1) === ';') {
				listMove.push(move);
				move = '';
			} else {
				move += argtext.substring(i, i + 1);
			}
		}
		listMove.push(move);
		for (let i = 0; i < listMove.length; i++) {
			let url = this._robotUrl + '/primitive/MoveRecorder/' + listMove[i] + '/remove';
			axios.get(url)
				.catch(err => {
					console.log(err);
					alert('Error with parameters or connection')
				});
		}
	}

	indexMotor(args) {
		let argtext = Cast.toString(args.TEXT);
		let url = this._robotUrl + '/motors/motors';
		const resultat = axios.get(url)
			.then(resp => {
				let index = -1;
				let motors = resp.data;
				let motorsName = this.toArray(motors);
				for (let i = 0; i < motorsName.length; i++) {
					if (argtext === motorsName[i]) {
						index = i + 1;
					}
				}
				if (index === -1) {
					return alert('This motor does not exist');
				} else {
					return index;
				}
			})
			.catch(err => {
				console.log(err);
				alert('Error with the connection')
			});
		return resultat;
	}

	callAPI(args) {
		let argtext = Cast.toString(args.TEXT);
		let url = this._robotUrl + argtext;
		console.log(url);
		const resultat = axios.get(url)
			.then(resp => resp.data)
			.catch(err => {
				console.log(err);
				alert('Error with parameters or connection')
			});
		console.log("API:", resultat);
		return resultat;
	}

	//TODO: Add the "wait" option to wait until the move is finished
	setMotorsGoto(args) {
		let argmotors = Cast.toString(args.MOTORS);
		let argpos = Cast.toString(args.POS);
		let argtime = Cast.toString(args.TIME);
		let url = this._robotUrl + '/motors/set/goto/' + this.motorsStatusUrl(argmotors, argpos, argtime);
		axios.get(url)
			.catch(err => {
				console.log(err);
				alert('Error with parameters or connection')
			});
	}

	getMotorRegister(args) {
		let argmotor = Cast.toString(args.MOTOR);
		let argreg = Cast.toString(args.REG);
		let url = this._robotUrl + '/motors/';
		let motors = this.toMotorsListApiFormat(argmotor);
		url += motors + '/get/' + argreg;
		const resultat = axios.get(url)
			.then(resp => {
				let value = resp.data;
				let res = this.toArray(value);
				return res;
			})
			.catch(err => {
				console.log(err);
				alert('Error with parameters or connection')
			});
		return resultat;
	}

	createRecordMove(args) {
		let argmotor = Cast.toString(args.MOTOR);
		let argmove = Cast.toString(args.MOVE);
		let urlMotors = this._robotUrl + '/motors/motors';
		if (argmotor === ' ' || argmotor === '') {
			axios.get(urlMotors)
				.then(resp => {
					let value = resp.data;
					let motorList = this.toMotorsListApiFormat(value);
					let urlCompliant = this._robotUrl + '/motors/set/registers/' + this.motorsStatusUrl(motorList, 'compliant', '1');
					axios.get(urlCompliant)
						.catch(err => {
							console.log(err);
							alert('Error with the connection')
						});
					let url = this._robotUrl + '/primitive/MoveRecorder/' + argmove + '/start/' + motorList;
					axios.get(url)
						.catch(err => {
							console.log(err);
							alert('Error with parameters or connection')
						});
				})
				.catch(err => {
					console.log(err);
					alert('Error with the connection')
				});
		} else {
			let motors = this.toMotorsListApiFormat(argmotor);
			let urlCompliant = this._robotUrl + '/motors/set/registers/' + this.motorsStatusUrl(motors, 'compliant', '1');
			axios.get(urlCompliant)
				.catch(err => {
					console.log(err);
					alert('Error with the connection')
				});
			let url = this._robotUrl + '/primitive/MoveRecorder/' + argmove + '/start/' + motors;
			axios.get(url)
				.catch(err => {
					console.log(err);
					alert('Error with parameters or connection')
				});
		}
	}

	stopSaveMove(args) {
		let argmove = Cast.toString(args.MOVE);
		let urlMotorsUsed = this._robotUrl + '/primitive/MoveRecorder/' + argmove + '/get_motors';
		axios.get(urlMotorsUsed)
			.then(resp => {
				let motors = resp.data;
				console.log(motors);
				let urlCompliant = this._robotUrl + '/motors/set/registers/' + this.motorsStatusUrl(motors, 'compliant', '0');
				console.log(urlCompliant);
				axios.get(urlCompliant)
					.catch(err => {
						console.log(err);
						alert('Error with parameters or connection')
					});
			})
			.catch(err => {
				console.log(err);
				alert('Error with the connection')
			});
		let url = this._robotUrl + '/primitive/MoveRecorder/' + argmove + '/stop';
		axios.get(url)
			.catch(err => {
				console.log(err);
				alert('Error with parameters or connection')
			});
	}

	concurrent(args) {
		let arginfo1 = Cast.toString(args.INFO1);
		let arginfo2 = Cast.toString(args.INFO2);
		let resultat = arginfo1 + '/' + arginfo2;
		return resultat;
	}

	playConcurrent(args) {
		let argmove = Cast.toString(args.MOVE);
		let listMove = [];
		let move = '';
		for (let i = 0; i < argmove.length; i++) {
			if (argmove.substring(i, i + 1) === ' ') {
				listMove.push(move);
				move = '';
			} else {
				move += argmove.substring(i, i + 1);
			}
		}
		listMove.push(move);
		for (let i = 0; i < listMove.length; i++) {
			let url = this._robotUrl + '/primitive/MovePlayer/' + listMove[i] + '/start/1';
			axios.get(url)
				.catch(err => {
					console.log(err);
					alert('Error with parameters or connection. See <move> in all recorded moves')
				});
		}

	}

	dataToString(args) {
		return Cast.toString(args.TEXT);
	}

	//TODO: implement the button "play sequentially" & "sequence"
	//one idea which does not work for the moment in the following lines
	/*
	playSequentially(args){
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
			sequentially(listMove)
			.catch(err=>{console.log(err); alert('Error with parameters or connection. See <move> in all recorded moves')});
	}

	async function sequentially(move) {
			for(let i = 0; i<move.length;i++){
					let url = this._robotUrl + '/primitive/MovePlayer/' + move[i] + '/start/1';
					await axios.get(url);
			}
	}

	sequence(args):{

	}
	*/

	getMessagesForLocale() {
		const locale = formatMessage.setup().locale;

		let messages;
		try {
			messages = require(`./lang/${locale}`);
		} catch (ex) {
			log.warn(`Locale "${locale}" is not supported.`);
			messages = require(`./lang/${Scratch3Poppy.DEFAULT_LANG}`);
		}
		return messages;
	}
}


module.exports = Scratch3Poppy;


