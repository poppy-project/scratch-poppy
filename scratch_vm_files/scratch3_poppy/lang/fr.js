module.exports = {
    blocks: {
        setHost: 'se connecter à [URL]',
        poppyUrl: 'robot URL',
        testConnection: 'test de la connection',
        getMotorsPositions: 'récupérer la position de chaque moteur',
        getMotors: 'tous les moteurs',
        getRobotAliases: 'tous les groupes de moteurs',
        getAvailableRecords: 'tous les mouvements enregistrés',
        actionPrimitives: '[ACTION] le comportement [TEXT]',
        stopMovePlayer: 'arrêter le mouvement [TEXT]',
        setCompliant: 'rendre le(s) moteur(s) [MOTORS] [STATUS]',
        setValue: 'mettre [STATUS] pour le(s) moteur(s) [MOTORS] à [VALUE]',
        setLed: 'mettre la couleur des leds du moteur(s) [MOTORS] en [STATUS]',
        popup: 'popup [TEXT]',
        startMovePlayerWithSpeed: 'réaliser le mouvement [MOVE] | vitesse x [SPEED]',
        startMovePlayerBackwardsWithSpeed: 'réaliser le mouvement [MOVE] à l\'envers | vitesse x [SPEED]',
        setMotorsGoto: 'mettre à la position [POS] le(s) moteur(s) [MOTORS] en [TIME] secondes | attendre ? [WAIT]',
        initRobot: 'robot [TEXT]',
        remove: 'supprimer [TEXT]',
        createRecordMove: 'créer et enregistrer le mouvement [MOVE] avec le(s) moteur(s) [MOTOR]',
        stopSaveMove: 'arrêter l\'enregistrement & sauvegarder le mouvement [MOVE]',
        playConcurrent: 'réaliser en même temps les mouvements [MOVE]',
        //TODO:
        //playSequentially: 'réaliser les mouvements les uns à la suite des autres [MOVE]',
        indexMotor: 'index du moteur [TEXT]',
        getMotorRegister: 'récupérer [REG] du moteur(s) [MOTOR]',
        getMotorsInGroup: 'les moteurs dans le groupe [TEXT]',
        getPrimitives: 'récupérer [TEXT] les comportements',
        getPropertiesMethodes: 'récupérer [PROP] du comportement [TEXT]',
        concurrent: 'concurrent [INFO1] [INFO2]',
        getSitemap: 'http:// [URL]',
        dataToString: 'transformer [TEXT] en chaîne de caractères',
        callAPI: 'appel de l\'API [TEXT]',
        detectMarker: 'la carte [TEXT] est détectée ?'
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
            methodes: 'méthodes',
            properties: 'propriétés'
        },
        actionBehaviours: {
            start: 'start',
            stop: 'stop',
            pause: 'pause',
            resume: 'resume'
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
            start: 'start',
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