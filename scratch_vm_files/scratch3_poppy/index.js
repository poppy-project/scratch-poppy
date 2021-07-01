const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const axios = require('axios').default;
const formatMessage = require('format-message');

const de = false;  // true when debugging

/**
 * write de&&bug(*your arguments*) in your code to make debug logging.
 * this function will only be called if `de` is set to true.
 * @param args an infinite number of arguments
 */
function bug(...args) {
	args.forEach(arg => {
		console.log(arg);
	});
}

class Scratch3Poppy {

	static get DEFAULT_LANG() {
		return 'en';
	}

	constructor(runtime) {
		this.runtime = runtime;
		this._robotUrl = 'Undefined';
		this._robotIp = '';
		this._robotPort = '8080';
	}

	poppyErrorManager(status, err) {
		let error = err.error;
		let tip = err.tip;
		let details = err.details;
		let msg = "Error " + status + " : " + error + "\n\nTip : " + tip + "\n\nDetails : " + details;
		alert(msg)
		throw new Error("Error " + status);
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
						PRIMITIVE: {
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
							defaultValue: 'head_z'
						},
						REGISTER: {
							type: ArgumentType.STRING,
							menu: 'variable'
						},
						VALUE: {
							type: ArgumentType.STRING,
							defaultValue: '0'
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
					opcode: 'startMovePlayer',
					blockType: BlockType.COMMAND,
					text: messages.blocks.startMovePlayer,
					arguments: {
						MOVE: {
							type: ArgumentType.STRING,
							defaultValue: 'move_name'
						},
						SPEED: {
							type: ArgumentType.NUMBER,
							defaultValue: -1.0
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
					opcode: 'recordMove',
					BlockType: BlockType.COMMAND,
					text: messages.blocks.recordMove,
					arguments: {
						MOVE: {
							type: ArgumentType.STRING,
							defaultValue: 'move_name'
						},
						MOTORS: {
							type: ArgumentType.STRING,
							defaultValue: 'motor_name'
						}
					}
				},

				{
					opcode: 'saveMove',
					BlockType: BlockType.COMMAND,
					text: messages.blocks.saveMove,
					arguments: {
						MOVE: {
							type: ArgumentType.STRING,
							defaultValue: 'move_name'
						}
					}
				},

				{
					opcode: 'indexMotor',
					blockType: BlockType.REPORTER,
					text: messages.blocks.indexMotor,
					arguments: {
						MOTOR: {
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
						REGISTER: {
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
						GROUP: {
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
						STATE: {
							type: ArgumentType.STRING,
							defaultValue: 'all',
							menu: 'getBehaviours'
						}
					}
				},

				{
					opcode: 'getPropertiesMethods',
					blockType: BlockType.REPORTER,
					text: messages.blocks.getPropertiesMethods,
					arguments: {
						ATTRIBUTE: {
							type: ArgumentType.STRING,
							menu: 'getPropBehaviours'
						},
						BEHAVIOUR: {
							type: ArgumentType.STRING,
							defaultValue: 'behaviour_name'
						}
					}
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
					opcode: 'getRESTAPI',
					blockType: BlockType.REPORTER,
					text: messages.blocks.getRESTAPI,
					arguments: {
						REQUEST: {
							type: ArgumentType.STRING,
							defaultValue: '/motor/list.json'
						}
					}
				},

				{
					opcode: 'postRESTAPI',
					blockType: BlockType.REPORTER,
					text: messages.blocks.postRESTAPI,
					arguments: {
						DATA: {
							type: ArgumentType.STRING,
							defaultValue: 'true'
						},
						URL: {
							type: ArgumentType.STRING,
							defaultValue: '/motor/m1/register/compliant/value.json'
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
						{text: messages.menus.getPropBehaviours.method, value: 'methods'},
						{text: messages.menus.getPropBehaviours.property, value: 'properties'}
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
						{text: messages.menus.compliant.compliant, value: 'true'},
						{text: messages.menus.compliant.stiff, value: 'false'}
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


	/**
	 * Gets the values all present_positions of the motors.
	 * @returns {Promise<any[] | string>} an array containing all motor positions.
	 */
	getMotorsPositions() {
		return this.getRESTAPI({REQUEST: '/motors/registers/present_position/list.json'})
			.then(resp => {
				let positions = Object.values(JSON.parse(resp).present_position);
				de && bug(positions); // array containing all motor positions.
				return positions;
			})
			.catch(() => {
				return 'Error with the connection';
			});
	}

	/**
	 * Makes a GET request to the REST API using getRESTAPI() to have
	 * a list of all motor groups available.
	 * The answer is then formatted for the user.
	 * @returns {Promise<*>} the motor aliases separated by a colon.
	 */
	getRobotAliases() {
		return this.getRESTAPI({REQUEST: "/motors/aliases/list.json"})
			.then(motors => JSON.parse(motors).aliases.toString())
			.catch();
	}


	detectMarker(args) {
		// TODO: try on snap how QR code reader works
		let argtext = Cast.toString(args.TEXT);
		let url = this._robotUrl + '/detect/' + argtext;
		axios.get(url)
			.then(resp => resp.data)
			.catch(err => {
				console.log(err);
				alert('Error with parameters or connection')
			});
	}

	/**
	 * Gives a list of all motors of a group
	 * @param args the group is stored in args.GROUP
	 * @returns {Promise<* | string>}
	 */
	getMotorsInGroup(args) {
		let group = args.GROUP.toString();
		return this.getRESTAPI({REQUEST: '/motors/' + group + '/list.json'})
			.then(motors => JSON.parse(motors)[group].toString())
			.catch(() => {
				return 'No motor found in group "' + group + '"';
			});
	}


	/**
	 * Makes a GET request to the REST API using getRESTAPI() to have
	 * a list of all motors available.
	 * The answer is then formatted for the user.
	 * @returns {Promise<*>} containing the motor names separated by a colon.
	 */
	getMotors() {
		return this.getRESTAPI({REQUEST: "/motors/list.json"})
			// getRESTAPI answer will look like '{"motors":["m1","m2","m3","m4","m5","m6"]}'
			// From this example, the process below will return "m1,m2,m3,m4,m5,m6"
			.then(motors => JSON.parse(motors).motors.toString())
			.catch(() => {
				return 'No motor found.'
			});
	}

	/**
	 * Gets all or running primitives
	 * @param args either 'all' or 'running' is stored in args.STATE
	 * @returns {Promise<* | string>} a list of primitives
	 */
	getPrimitives(args) {
		let state = args.STATE.toString();
		let uri = (state === 'all') ? '/primitives/list.json' : '/primitives/running/list.json' + ''
		return this.getRESTAPI({REQUEST: uri})
			.then(primitives => {
				let primitiveId = (state === 'all')? 'primitives' : 'running_primitives';
				return JSON.parse(primitives)[primitiveId].toString()
			})
			.catch(() => {
				return 'Error on connection.'
			});
	}

	/**
	 * Gives the properties and the methods of a motor
	 * @param args
	 * @returns {Promise<* | string>}
	 */
	getPropertiesMethods(args) {
		let attribute = args.ATTRIBUTE.toString();
		let behaviour = args.BEHAVIOUR.toString();
		let url = '/primitives/' + behaviour + '/' + attribute + '/list.json';

		return this.getRESTAPI({REQUEST: url})
			.then(value => JSON.parse(value)[attribute].toString())
			.catch(() => {
				return 'Attribute <' + attribute + '> is not available.'
			});
	}

	/**
	 * Starts / Stops / Pauses / Resumes a primitive
	 * @param args the action of the primitive to launch
	 * @returns {Promise<string | string>} Done! on success, else an error message
	 */
	actionPrimitives(args) {
		let primitive = args.PRIMITIVE.toString();
		let action = args.ACTION.toString();

		return this.getRESTAPI({REQUEST: "/primitives/" + primitive + "/" + action + ".json"})
			.then(() => {
				return "Done!"
			})
			.catch(() => {
				return 'Primitive <' + primitive + '> is not available.'
			});
	}

	/**
	 * Gives the state of the connection with a get request
	 * @returns {Promise<string>} OK on success, else an error message
	 */
	testConnection() {
		let url = this._robotUrl + '/';
		return axios.get(url)
			.then(() => {
				return 'Connection ok!'
			})
			.catch(() => {
				return 'Error on connection!'
			});
	}


	getSitemap(args) {
		let argurl = Cast.toString(args.URL);
		let url = 'http://' + argurl + '/';
		const resultat = axios.get(url)
			.then(resp => resp.data)
			.catch(() => alert('Robot is not connected to ' + url));
		return resultat;
	}

	/**
	 * Sets a motor (or motors) either compliant or stiff
	 * @param args the motors
	 */
	setCompliant(args) {
		let motors = args.MOTORS.toString().split(',');
		let compliant = args.STATUS.toString();
		for (let m = 0; m < motors.length; m++) {
			let url = '/motors/' + motors[m] + '/registers/compliant/value.json';
			let postArgs = {
				URL: url,
				DATA: compliant
			};
			this.postRESTAPI(postArgs)
				.catch(err => console.log(err));
		}
	}

	/**
	 * Changes the value of a register.
	 * @param args
	 */
	setValue(args) {
		let motors = args.MOTORS.toString().split(',');
		let value =  args.VALUE.toString();
		let register = args.REGISTER.toString();

		for (let m = 0; m < motors.length; m++) {
			let url = '/motors/' + motors[m] + '/registers/' + register + '/value.json';
			let postArgs = {
				URL: url,
				DATA: value
			};
			this.postRESTAPI(postArgs)
				.catch(err => console.log(err));
		}
	}

	popup(args) {
		let argtext = Cast.toString(args.TEXT);
		return alert(argtext);
	}

	getAvailableRecords() {
		return this.getRESTAPI({REQUEST: "/records/list.json"})
			.then(motors => JSON.parse(motors).moves.toString())
			.catch(() => {
				return "Error"
			});
	}

	/**
	 * Plays a recorded move. You can choose the speed of the replay and you can play the move backwards
	 * @param args
	 */
	startMovePlayer(args) {
		let moveName = args.MOVE;
		let speed = args.SPEED;
		let url = '/records/' + moveName + '/play.json';
		let postArgs = {
			URL: url,
			DATA: '{"speed": "' + speed + '"}'
		};
		return this.postRESTAPI(postArgs)
			.then(status => JSON.parse(status)[moveName].toString())
			.catch(() => {
				return 'Error with parameters.';
			});
	}

	/**
	 * Stops a played move
	 * @param args
	 */
	stopMovePlayer(args) {
		let moveName = args.MOVE;
		let url = '/records/' + moveName + '/stop.json';
		let postArgs = {
			URL: url,
			DATA: '{}'
		};
		return this.postRESTAPI(postArgs)
			.then(status => JSON.parse(status)[moveName].toString())
			.catch(() => {
				return 'Error with parameters.';
			});
	}

	/**
	 * Tries to connect to a robot from the address given by the user.
	 * It will get the ip of the robot through a GET /ip.
	 * On success, the ip of the robot is saved for future GET & POST requests.
	 *
	 * @param args the ip of the robot the user wants to access is stored in args.URL
	 * @returns {Promise<string | void>} the ip of the robot on success, else an error message.
	 */
	setHost(args) {
		let robotUrl = "http://" + args.URL.toString() + ":" + this._robotPort + "/ip";
		return axios.get(robotUrl)
			.then(resp => {
				return JSON.stringify(resp.data)
			})
			.then(data => {
				return JSON.parse(data).ip.toString();
			})
			.then(ip => {
				this._robotIp = ip;
				this._robotUrl = "http://" + this._robotIp + ":" + this._robotPort;
				de && bug('Robot url:', this._robotUrl);
				return ip;
			})
			.catch(() => {
				return 'Your robot host is unreachable'
			});
	}

	/**
	 * @returns {string} url of Poppy Robot
	 */
	poppyUrl() {
		if (this._robotUrl !== 'Undefined')
			return this._robotUrl;
		return 'Define the address of the robot before requesting its URL'
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

	/**
	 * Gives the index of a motor, in the list of all motors.
	 * @param args the motor, stored in args.MOTOR
	 * @returns {Promise<*>} index of the motor given
	 */
	indexMotor(args) {
		let motor = args.MOTOR.toString();
		de && bug("motor:", motor);
		return this.getMotors()
			.then(function (motors) {
				de && bug("motors:", motors);
				for (const [index, element] of motors.split(",").entries())
					if (motor === element)
						return index;
				return -1;
			})
			.then(index => {
				de && bug("index found: ", index);
				if (index !== -1)
					return (index + 1).toString();
				return "This motor does not exists";
			})
			.catch(err => console.log(err));
	}


	/**
	 * Performs a GET method to poppyUrl + URL given. It then returns the promise received.
	 * @param args the url of the request is stored in args.REQUEST
	 * @returns {Promise<string>} the answer given by the REST API
	 */
	getRESTAPI(args) {
		de && bug("GET API-REST args: ", args);
		let url = this._robotUrl + args.REQUEST.toString();
		return axios.get(url)
			.then(resp => {
				return JSON.stringify(resp.data)
			})
			.catch(function (error) {
				de && bug('Error on getRESTAPI:', JSON.stringify(error));
				console.log('Error:', error)
				if (error.response) {
					de && bug("status of error:", error.response.status);
					de && bug(error.response.headers);
					de && bug(error.response.data);
				}
			});
	}


	/**
	 * Performs a POST method to poppyUrl + URL, using the data given. It then returns the promise received.
	 * @param args the url of the request is stored in args.REQUEST, the data is stored in args.DATA
	 * @returns {Promise<string>} the answer given by the REST API
	 */
	postRESTAPI(args) {
		de && bug("POST API-REST args: ", args);
		let url = this._robotUrl + decodeURI(args.URL);  // url given in the block
		let dataString = decodeURIComponent(args.DATA);  // data given in the block

		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}
		de && bug("URL post API-REST: ", url);
		de && bug("config post API-REST: ", config);
		de && bug("data post API-REST: ", dataString);
		return axios.post(url, dataString, config)
			.then(resp => {
				de && bug("POST API-REST answer: ", resp.data);
				return JSON.stringify(resp.data)
			})
			.catch(err => {
				de && bug(err);
			});
	}

	// TODO: Add the "wait" option to wait until the move is finished
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


	/**
	 * Get the register value of a motor.
	 * @param args the motor is stored in args.MOTOR
	 * and the register requested is in args.REGISTER
	 * @returns {Promise<AxiosResponse<any>>} the value of the register
	 */
	getMotorRegister(args) {
		let motor = args.MOTOR.toString();
		let register = args.REGISTER.toString();
		let url = '/motors/' + motor + '/registers/' + register;

		return this.getRESTAPI({REQUEST: url})
			.then(value => JSON.parse(value)[register].toString())
			.catch(() => {
				return 'Register not found.'
			});
	}

	/**
	 * Starts to record a move. If the move does not exist yet, it is created. If a move with the same name has already
	 * been defined, it will be erased.
	 * @param args
	 * @return {Promise<* | string>}
	 */
	recordMove(args) {
		let moveName = Cast.toString(args.MOVE);
		let motors = Cast.toString(args.MOTORS);
		let url = '/records/' + moveName + '/record.json';
		let postArgs = {
			URL: url,
			DATA: '{"motors": "' + motors + '"}'
		};
		return this.postRESTAPI(postArgs)
			.then(status => JSON.parse(status)[moveName].toString())
			.catch(() => {
				return 'Error with parameters.';
			});
	}

	saveMove(args) {
		let moveName = Cast.toString(args.MOVE);
		let url = '/records/' + moveName + '/save.json';
		let postArgs = {
			URL: url,
			DATA: '{}'
		};
		return this.postRESTAPI(postArgs)
			.then(status => JSON.parse(status)[moveName].toString())
			.catch(() => {
				return 'Error with parameters.';
			});
	}



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


