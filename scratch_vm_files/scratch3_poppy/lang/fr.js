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
        setMotorsGoto: 'mettre à la position [POS] le(s) moteur(s) [MOTORS] en [TIME] secondes | attendre ? [WAIT]',
        initRobot: 'robot [TEXT]',
        remove: 'supprimer [TEXT]',
        createRecordMove: 'créer et enregistrer le mouvement [MOVE] avec le(s) moteur(s) [MOTOR]',
        stopSaveMove: 'arrêter l\'enregistrement & sauvegarder le mouvement [MOVE]',
        playConcurrent: 'réaliser en même temps les mouvements [MOVE]',
        playSequentially: 'réaliser les mouvements les uns à la suite des autres [MOVE]',
        indexMotor: 'index du moteur [MOTOR]',
        getMotorRegister: 'récupérer [REGISTER] du moteur [MOTOR]',
        getMotorsInGroup: 'les moteurs dans le groupe [GROUP]',
        getPrimitives: 'récupérer [STATE] les comportements',
        getPropertiesMethods: 'récupérer [ATTRIBUTE] du comportement [BEHAVIOUR]',
        concurrent: 'concurrent [INFO1] [INFO2]',
        getSitemap: 'http:// [URL]',
        dataToString: 'transformer [TEXT] en chaîne de caractères',
        callAPI: 'appel de l\'API [TEXT]',
        getRESTAPI: 'appel de l\'API REST [REQUEST]',
        postRESTAPI: 'post [DATA] vers l\'API REST [URL]',
        detectMarker: 'la carte [TEXT] est détectée ?',
        sequence: 'sequence [INFO1] [INFO2]'
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
