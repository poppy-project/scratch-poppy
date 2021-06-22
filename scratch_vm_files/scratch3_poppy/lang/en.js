module.exports = {
    blocks: {
        setHost: 'set host to [URL]',
        poppyUrl: 'robot URL',
        testConnection: 'test connection',
        getMotorsPositions: 'get all motors positions',
        getMotors: 'all motors',
        getRobotAliases: 'all motors groups',
        getAvailableRecords: 'all recorded moves',
        actionPrimitives: '[ACTION] behaviour [PRIMITIVE]',
        stopMovePlayer: 'stop move [TEXT]',
        setCompliant: 'set motor(s) [MOTORS] [STATUS]',
        setValue: 'set [REGISTER] motor(s) [MOTORS] to [VALUE]',
        setLed: 'set color leds of motor(s) [MOTORS] in [STATUS]',
        popup: 'popup [TEXT]',
        startMovePlayerWithSpeed: 'play move [MOVE] | speed x [SPEED]',
        startMovePlayerBackwardsWithSpeed: 'play move [MOVE] in reverse | speed x [SPEED]',
        startMovePlayerWith: 'play move [MOVE] | speed x [SPEED]',
        startMovePlayerBackwards: 'play move [MOVE] in reverse | speed x [SPEED]',
        setMotorsGoto: 'set position [POS] of motor(s) [MOTORS] in [TIME] seconds | wait ? [WAIT]',
        initRobot: 'robot [TEXT]',
        remove: 'remove [TEXT]',
        createRecordMove: 'create & start record move [MOVE] with motor(s) [MOTOR]',
        stopSaveMove: 'stop record & save move [MOVE]',
        playConcurrent: 'play concurrently moves [MOVE]',
        playSequentially: 'play sequentially moves [MOVE]',
        indexMotor: 'index of motor [MOTOR]',
        getMotorRegister: 'get [REGISTER] of motor [MOTOR]',
        getMotorsInGroup: 'motors in group [GROUP]',
        getPrimitives: 'get [TEXT] behaviours',
        getPropertiesMethods: 'get [ATTRIBUTE] of behaviour [BEHAVIOUR]',
        concurrent: 'concurrent [INFO1] [INFO2]',
        getSitemap: 'http:// [URL]',
        dataToString: 'transform [TEXT] to string',
        callAPI: 'call the API [TEXT]',
        getRESTAPI: 'call the REST API [REQUEST]',
        postRESTAPI: 'post [DATA] to the REST API [URL]',
        detectMarker: 'card [TEXT] is detected ?',
        sequence: 'sequence [INFO1] [INFO2]'
    },
    menus: {
        marker: {
            caribou: 'caribou',
            tetris: 'tetris',
            lapin: 'lapin'
        },
        getBehaviours: {
            all: 'all',
            running: 'running'
        },
        getPropBehaviours: {
            method: 'methods',
            property: 'properties'
        },
        actionBehaviours: {
            start: 'start',
            stop: 'stop',
            pause: 'pause',
            resume: 'resume'
        },
        compliant: {
            compliant: 'compliant',
            stiff: 'stiff'
        },
        color: {
            off: 'off',
            red: 'red',
            green: 'green',
            yellow: 'yellow',
            blue: 'blue',
            pink: 'pink',
            cyan: 'cyan',
            white: 'white'
        },
        wait: {
            false: 'false',
            true: 'true'
        },
        init: {
            start: 'start',
            stop: 'stop',
            reset: 'reset'
        },
        variable: {
            goal_position: 'goal_position',
            moving_speed: 'moving_speed',
            torque_limit: 'torque_limit',
            compliant: 'compliant'
        },
        register: {
            present_position: 'present_position',
            present_speed: 'present_speed',
            present_load: 'present_load',
            present_temperature: 'present_temperature',
            present_voltage: 'present_voltage',
            goal_position: 'goal_position',
            moving_speed: 'moving_speed',
            torque_limit: 'torque_limit',
            compliant: 'compliant'
        }
    }
};
