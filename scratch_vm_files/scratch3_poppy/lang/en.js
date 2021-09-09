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
        startMovePlayer: 'play move [MOVE] x speed [SPEED]',
        motorGotoPosition: 'set position(s) [POSITIONS] of motor(s) [MOTORS] in [DURATION] seconds, wait ? [WAIT]',
        deleteRecord: 'remove [MOVE]',
        recordMove: 'create & start record move [MOVE] with motor(s) [MOTORS]',
        saveMove: 'stop record & save move [MOVE]',
        indexMotor: 'index of motor [MOTOR]',
        getMotorRegister: 'get [REGISTER] of motor [MOTOR]',
        getMotorsInGroup: 'motors in group [GROUP]',
        getPrimitives: 'get [STATE] behaviours',
        getPropertiesMethods: 'get [ATTRIBUTE] of behaviour [BEHAVIOUR]',
        getRESTAPI: 'call the REST API [REQUEST]',
        postRESTAPI: 'post [DATA] to the REST API [URL]',
        detectMarker: 'card [CODE] is detected ?',
        listVisibleMarkers: 'list visible markers',
        getIKpose: 'get [CHAIN] IK coordinates',
        gotoIK: '[CHAIN] goto [X][Y][Z] in [DURATION] sec, wait ? [WAIT]',
        gotoIKorientation: "[CHAIN] goto [X][Y][Z] with orientation [ROLL][PITCH][YAW] in [DURATION] sec, wait ? [WAIT]",
    },
    menus: {
        marker: {
            caribou: 'caribou',
            tetris: 'tetris',
            lapin: 'lapin'
        },
        IKchains: {
            chain: 'chain',
            r_arm_chain: 'r_arm_chain',
            l_arm_chain: 'l_arm_chain'
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
