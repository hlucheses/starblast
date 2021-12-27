/**
 * Classe que representa uma nave inimiga
 */

class EnemySpaceship extends EnemySpaceshipDesign {
    
    /**
     * Inicializa nave na posição (x, y, z) e as configurações iniciais
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     */
     constructor(x, y, z) {
        super(x, y, z);

        // Tipo de nave 2 = nave inimiga
        this.type = Constants.ENEMY;

        // Variável que verifica se a nave já atingiu o destino em cada eixo
        this.targetBool = {x: false, y: true, z: false};

        this.boundingBox = this.createBoundingBox();

        // Destino do movimento
        this.target = new THREE.Vector3();
        this.target.copy(this.design.position);

        // Verifica em que posição a nave está em relação ao destino
        this.status = this.getStatus();

        this.frontLimit = Constants.ENEMY_FRONT_LIMIT;
        this.backLimit = Constants.ENEMY_BACK_LIMIT;
        this.id;
    }

    /**
     * Põe inimigos em posições aleatórias na cena
     * Retorna as referências aos inimigos (num vetor)
     * @param {number} numberOfEnemies > 0
     * @returns {array}
     */
    static generateRandom(numberOfEnemies) {

        if (numberOfEnemies < 1) {
            throw "Number of enemies must be > 0";
        }

        var enemiesArray = [];

        for (var i = 0; i < numberOfEnemies; i++) {
            var posicao = {x: Constants.randomNumber(Constants.LEFT_LIMIT, Constants.RIGHT_LIMIT),
                            y: -1,
                            z: Constants.randomNumber(Constants.ENEMY_BACK_LIMIT, Constants.ENEMY_FRONT_LIMIT)}
            enemiesArray.push(new EnemySpaceship(posicao.x, posicao.y, posicao.z));

            /* Evita que sejam geradas duas naves que se interceptam */
            for (var j = i - 1; j >= 0; j--) {
                if (Collision.hasColided(
                    enemiesArray[i].boundingBox,
                    enemiesArray[j].boundingBox
                )) {
                    i--;
                    enemiesArray.pop();
                }
            }
        }

        return enemiesArray;
    }

    /**
     * Movimenta as naves aleatoriamente pela cena
     */
    moveRandomly() {

        if (this.checkTarget()) {
            this.newTarget();
        } else {

            if (this.design.position.x <= this.target.x && !this.targetBool.x) {
                if (this.status.x > 0) {
                    this.targetBool.x = true;
                    this.acceleration.setX(0);
                    this.moving.setX(0);
                } else {
                    this.acceleration.setX(this.ACCELERATION);
                    this.moving.setX(1);
                }
            } else if (this.design.position.x >= this.target.x && !this.targetBool.x) {
                if (this.status.x < 0) {
                    this.targetBool.x = true;
                    this.acceleration.setX(0);
                    this.moving.setX(0);
                } else {
                    this.acceleration.setX(-this.ACCELERATION);
                    this.moving.setX(-1);
                }
            }

            if (this.design.position.z <= this.target.z && !this.targetBool.z) {
                if (this.status.z > 0) {
                    this.targetBool.z = true;
                    this.acceleration.setZ(0);
                    this.moving.setZ(0);
                } else {
                    this.acceleration.setZ(this.ACCELERATION);
                    this.moving.setZ(1);
                }
            } else if (this.design.position.z >= this.target.z && !this.targetBool.z) {
                if (this.status.z < 0) {
                    this.targetBool.z = true;
                    this.acceleration.setZ(0);
                    this.moving.setZ(0);
                } else {
                    this.acceleration.setZ(-this.ACCELERATION);
                    this.moving.setZ(-1);
                }
            }
        }

        this.move();
    }

    /**
     * Procura um novo destino para o movimento
     */
    newTarget() {
        this.targetBool.x = false;
        this.targetBool.z = false;
        this.target.x = Constants.randomNumber(Constants.LEFT_LIMIT, Constants.RIGHT_LIMIT);
        this.target.y = 0;
        this.target.z = Constants.randomNumber(Constants.ENEMY_BACK_LIMIT, Constants.ENEMY_FRONT_LIMIT);
        this.status = this.getStatus();
    }

    /**
     * Dá em que estado a nave está em relação à posição destino
     * @returns {THREE.Vector3}
     */
    getStatus() {
        return new THREE.Vector3(
            (this.design.position.x < this.target.x) ? -1 : 1,
            (this.design.position.y < this.target.y) ? -1 : 1,
            (this.design.position.z < this.target.z) ? -1 : 1
        );
    }

    /**
     * Verifica se a nave já atingiu o destino pré-definido
     * @returns {boolean}
     */
    checkTarget() {
        return this.targetBool.x && this.targetBool.y && this.targetBool.z;
    }

    checkZLimits() {
        if (this.design.position.z < this.backLimit) {
            this.design.position.z = this.backLimit;
            this.speed.z = 0;
        }

        if (this.design.position.z > this.frontLimit) {
            this.design.position.z = this.frontLimit;
            this.speed.z = 0;
        }
    }
}