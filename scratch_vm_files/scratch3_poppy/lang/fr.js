module.exports = {
    blocks: {
        setHost: 'se connecter à [URL]',
        poppyUrl: 'robot URL',
        testConnection: 'test de la connection',
        getMotorsPositions: 'récupérer la position de chaque moteur',
        getMotors: 'tous les moteurs',
        getRobotAliases: 'tous les groupes de moteurs',
        getAvailableRecords: 'tous les mouvements enregistrés',
        actionPrimitives: '[ACTION] le comportement [PRIMITIVE]',
        stopMovePlayer: 'arrêter le mouvement [TEXT]',
        setCompliant: 'rendre le(s) moteur(s) [MOTORS] [STATUS]',
        setValue: 'mettre [REGISTER] pour le(s) moteur(s) [MOTORS] à [VALUE]',
        popup: 'popup [TEXT]',
        startMovePlayer: 'réaliser le mouvement [MOVE] | vitesse x [SPEED]',
        motorGotoPosition: 'mettre à la position [POSITIONS] le(s) moteur(s) [MOTORS] en [DURATION] secondes, attendre ? [WAIT]',
        initRobot: 'robot [TEXT]',
        deleteRecord: 'supprimer [MOVE]',
        recordMove: 'créer et enregistrer le mouvement [MOVE] avec le(s) moteur(s) [MOTORS]',
        saveMove: 'arrêter l\'enregistrement & sauvegarder le mouvement [MOVE]',
        indexMotor: 'index du moteur [MOTOR]',
        getMotorRegister: 'récupérer [REGISTER] du moteur [MOTOR]',
        getMotorsInGroup: 'les moteurs dans le groupe [GROUP]',
        getPrimitives: 'récupérer [STATE] les comportements',
        getPropertiesMethods: 'récupérer [ATTRIBUTE] du comportement [BEHAVIOUR]',
        getRESTAPI: 'appel de l\'API REST [REQUEST]',
        postRESTAPI: 'post [DATA] vers l\'API REST [URL]',
        detectMarker: 'la carte [TEXT] est détectée ?',
    },
    menus: {
        marker: {
            caribou: 'caribou',
            tetris: 'tetris',
            lapin: 'lapin'
        },
        getBehaviours: {
            all: 'tous',
            running: 'en cours'
        },
        getPropBehaviours: {
            method: 'méthodes',
            property: 'propriétés'
        },
        actionBehaviours: {
            start: 'démarrer',
            stop: 'stop',
            pause: 'pause',
            resume: 'reprendre'
        },
        compliant: {
            compliant: 'flexible',
            stiff: 'rigide'
        },
        color: {
            off: 'off',
            red: 'rouge',
            green: 'vert',
            yellow: 'jaune',
            blue: 'bleu',
            pink: 'rose',
            cyan: 'cyan',
            white: 'blanc'
        },
        wait: {
            false: 'faux',
            true: 'vrai'
        },
        init: {
            start: 'démarrer',
            stop: 'stop',
            reset: 'réinitialisation'
        },
        variable: {
            goal_position: 'position_désirée',
            moving_speed: 'vitesse_de_rotation',
            torque_limit: 'limite_de_couple',
            compliant: 'flexible'
        },
        register: {
            present_position: 'position_actuelle',
            present_speed: 'vitesse_actuelle',
            present_load: 'chargement_actuel',
            present_temperature: 'température_actuelle',
            present_voltage: 'voltage_actuel',
            goal_position: 'position_désirée',
            moving_speed: 'vitesse_de_rotation',
            torque_limit: 'limite_de_couple',
            compliant: 'flexible'
        }
    }
};
