class Level {
    static arrayOfLevels = [];

    static staticConstructor() {
        this.createLevels();
    }

    static createLevels() {
        // Level 1
        this.arrayOfLevels.push({
            noBuzz: 1, noAlan: 0, noNeil: 0, noBoss: 0,
            name: "Buzz Aldrin"
        });

        // Level 2
        this.arrayOfLevels.push({
            noBuzz: 3, noAlan: 0, noNeil: 0, noBoss: 0,
            name: "Andreia de Brito"
        });

        // Level 3
        this.arrayOfLevels.push({
            noBuzz: 7, noAlan: 0, noNeil: 0, noBoss: 0,
            name: "Astronaldo"
        });

        // Level 4
        this.arrayOfLevels.push({
            noBuzz: 0, noAlan: 1, noNeil: 0, noBoss: 0,
            name: "Alan Bean"
        });

        // Level 5
        this.arrayOfLevels.push({
            noBuzz: 4, noAlan: 1, noNeil: 0, noBoss: 0,
            name: "RafaNgu da Sapu"
        });

        // Level 6
        this.arrayOfLevels.push({
            noBuzz: 3, noAlan: 3, noNeil: 0, noBoss: 0,
            name: "Migo Domingo"
        });

        // Level 7
        this.arrayOfLevels.push({
            noBuzz: 2, noAlan: 5, noNeil: 0, noBoss: 0,
            name: "INDIOUZ"
        });

        // Level 8
        this.arrayOfLevels.push({
            noBuzz: 0, noAlan: 7, noNeil: 0, noBoss: 0,
            name: "Laika"
        });

        // Level 9
        this.arrayOfLevels.push({
            noBuzz: 0, noAlan: 0, noNeil: 1, noBoss: 0,
            name: "Neil Armstrong"
        });

        // Level 10
        this.arrayOfLevels.push({
            noBuzz: 2, noAlan: 0, noNeil: 1, noBoss: 0,
            name: "Yuri Gagarin"
        });

        // Level 11
        this.arrayOfLevels.push({
            noBuzz: 2, noAlan: 2, noNeil: 1, noBoss: 0,
            name: "Dids"
        });

        // Level 12
        this.arrayOfLevels.push({
            noBuzz: 3, noAlan: 2, noNeil: 2, noBoss: 0,
            name: "Siddharta Gautama (Buda)"
        });

        // Level 13
        this.arrayOfLevels.push({
            noBuzz: 1, noAlan: 2, noNeil: 4, noBoss: 0,
            name: "Lucheses"
        });

        // Level 14
        this.arrayOfLevels.push({
            noBuzz: 0, noAlan: 3, noNeil: 3, noBoss: 0,
            name: "Chita"
        });

        // Level 15
        this.arrayOfLevels.push({
            noBuzz: 0, noAlan: 2, noNeil: 5, noBoss: 0,
            name: "Esto(caos)tico"
        });

        // Level 16
        this.arrayOfLevels.push({
            noBuzz: 0, noAlan: 0, noNeil: 7, noBoss: 0,
            name: "Snoop"
        });

        // Level 17
        this.arrayOfLevels.push({
            noBuzz: 4, noAlan: 4, noNeil: 4, noBoss: 0,
            name: "Pete Conrad"
        });

        // Level 18
        this.arrayOfLevels.push({
            noBuzz: 0, noAlan: 0, noNeil: 0, noBoss: 1,
            name: "Lirio Ramalheira"
        });
    }

    static generateEnemies(systemLevel) {

        var level = this.arrayOfLevels[systemLevel - 1];

        var enemiesArray = [];

        if (systemLevel > 0 && systemLevel <= this.arrayOfLevels.length) {

            for (let i = 0; i < level.noBuzz; i++) {
                enemiesArray.push(this.generateSpaceship(Constants.SPACESHIP_TYPE.buzz));
            }

            for (let i = 0; i < level.noAlan; i++) {
                enemiesArray.push(this.generateSpaceship(Constants.SPACESHIP_TYPE.alanB));
            }

            for (let i = 0; i < level.noNeil; i++) {
                enemiesArray.push(this.generateSpaceship(Constants.SPACESHIP_TYPE.neilAII));
            }

            for (let i = 0; i < level.noBoss; i++) {
                enemiesArray.push(this.generateSpaceship(Constants.SPACESHIP_TYPE.michaelC));
            }
        }

        return enemiesArray;
    }

    static generateSpaceship(type) {

        var newEnemy = new EnemySpaceship(type);
        let dimensions = newEnemy.getDimensions();

        var posicao = {
            x: Constants.randomNumber(-Constants.WALL_WIDTH / 2 + dimensions.x / 2 + 10,
                Constants.WALL_WIDTH / 2 - dimensions.x / 2 - 10),
            y: -1,
            z: Constants.randomNumber(-Constants.WALL_WIDTH / 2 + 10 + dimensions.z / 2, Constants.ENEMY_FRONT_LIMIT)
        };

        newEnemy.design.position.set(posicao.x, posicao.y, posicao.z);

        return newEnemy;
    } 

    static getLevels() {
        return this.arrayOfLevels;
    }
}

Level.staticConstructor();