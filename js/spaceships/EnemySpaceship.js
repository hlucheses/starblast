/**
 * StarBlast, jogo de naves espaciais.
 *
 * Este projecto é um projecto da cadeira de computação gráfica
 * como requisito parcial de avaliação do 4º ano de engenharia
 * informática (ISPTEC - Luanda, Angola).
 *
 * @link   https://github.com/hlucheses/starblast/
 * @file   Classe que representa uma nave inimiga.
 * @author Andreia Vanessa Graça de Brito
 * @author Helder Lucheses Gonçalves da Costa
 * @author Miguel Gamboa Francisco Domingos
 * @since  27.12.2021
 * 
 * @contact {20180296@isptec.co.ao, helder@lucheses.com, miguel@indiouz.com}
 */

class EnemySpaceship extends Spaceship {

    /**
     * Inicializa nave na posição (x, y, z) e as configurações iniciais
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     */
    constructor(type, x, y, z) {
        super(x, y, z);

        this.initialDesign(type, x = 0, y = 0, z = 0);

        // Tipo de nave 2 = nave inimiga
        this.type = Constants.ENEMY;

        // Variável que verifica se a nave já atingiu o destino em cada eixo
        this.targetBool = { x: false, y: true, z: false };

        this.boundingBox = this.createBoundingBox();

        // Destino do movimento
        this.target = new THREE.Vector3();
        this.target.copy(this.design.position);

        // Verifica em que posição a nave está em relação ao destino
        this.status = this.getStatus();

        // Limites da nave
        this.frontLimit = Constants.ENEMY_FRONT_LIMIT;
        this.backLimit = Constants.ENEMY_BACK_LIMIT;

        // Massa da nave
        this.mass = Constants.MASS.enemy;
        this.randomMovement = 0;

        this.eCannons = [];

        for (let [key, cannon] of Object.entries(this.cannons)) {
            this.eCannons.push(cannon);
        }

        this.prepareShadowing();
    }

    initialDesign(type, x, y, z) {
        var design = null;

        switch (type) {
            case Constants.SPACESHIP_TYPE.neilAII:
                design = new NeilAII();
                this.lives = 15;
                break;
            case Constants.SPACESHIP_TYPE.buzz:
                design = new Buzz();
                break;
            case Constants.SPACESHIP_TYPE.alanB:
                design = new AlanB();
                this.lives = 5;
                break;
            case Constants.SPACESHIP_TYPE.michaelC:
                design = new MichaelC();
                this.lives = 40;
                break;
            default:
                design = new Buzz();
                break;
        }

        this.typeOfEnemy = type;

        this.mass = design.mass;
        this.design = design.design;

        // Gira em relação à cena
        this.design.rotation.y = (type == Constants.SPACESHIP_TYPE.michaelC) ? 0 : Math.PI;
        
        this.defaultCannonColor = design.defaultCannonColor;
        this.designParts = design.designParts;
        this.cannons = design.cannons;
        this.design.position.set(x, y, z);
    }

    /**
     * Põe inimigos em posições aleatórias na cena
     * Retorna as referências aos inimigos (num vetor)
     * FIXME: A verificação das intercepções da loop infinito
     * @param {number} numberOfEnemies > 0
     * @returns {array}
     */
    static generateRandom(numberOfEnemies) {

        if (numberOfEnemies < 0) {
            throw "Number of enemies must be >= 0";
        }

        var enemiesArray = [];

        for (var i = 0; i < numberOfEnemies; i++) {

            var enemyKind = Constants.randomNumber(1, 3);
            var newEnemy = new EnemySpaceship(enemyKind);

            enemiesArray.push(newEnemy);

            let dimensions = newEnemy.getDimensions();

            var posicao = {
                x: Constants.randomNumber(-Constants.WALL_WIDTH / 2 + dimensions.x / 2 + 10,
                    Constants.WALL_WIDTH / 2 - dimensions.x / 2 - 10),
                y: -1,
                z: Constants.randomNumber(-Constants.WALL_WIDTH / 2 + 10 + dimensions.z / 2, Constants.ENEMY_FRONT_LIMIT)
            };

            newEnemy.design.position.set(posicao.x, posicao.y, posicao.z);
        }

        return enemiesArray;
    }

    /**
     * Movimenta as naves aleatoriamente pela cena
     * FIXME: Às vezes espera se coliderem para se mexer
     * TODO: O movimento está muito caótico. Adicionar inteligência
     */
    moveRandomly() {

        // Se já chegou ao destino, computa um novo
        if (this.checkTarget() || this.randomMovement == 100) {
            this.newTarget();
            this.randomMovement = 0;
        } else {

            // Se a posição está antes do destino e ainda não chegou ao alvo em X
            if (this.design.position.x <= this.target.x && !this.targetBool.x) {
                if (this.status.x > 0) { // Se está depois do destino
                    // Informa que já chegou ao alvo em X e para
                    this.targetBool.x = true;
                    this.acceleration.setX(0);
                    this.moving.setX(0);
                } else { // Se está antes do destino
                    this.acceleration.setX(this.ACCELERATION);
                    this.moving.setX(1);
                }
                // Se a posição está depois do destino e ainda não chegou ao alvo em X
            } else if (this.design.position.x >= this.target.x && !this.targetBool.x) {
                if (this.status.x < 0) { // Se está antes do destino
                    // Informa que já chegou ao alvo em X e para
                    this.targetBool.x = true;
                    this.acceleration.setX(0);
                    this.moving.setX(0);
                } else { // Se está depois do destino
                    this.acceleration.setX(-this.ACCELERATION);
                    this.moving.setX(-1);
                }
            }

            // Se a posição está antes do destino e ainda não chegou ao alvo em Z
            if (this.design.position.z <= this.target.z && !this.targetBool.z) {
                if (this.status.z > 0) { // Se está depois do destino
                    // Informa que já chegou ao alvo em X e para
                    this.targetBool.z = true;
                    this.acceleration.setZ(0);
                    this.moving.setZ(0);
                } else { // Se está antes do destino
                    this.acceleration.setZ(this.ACCELERATION);
                    this.moving.setZ(1);
                }
                // Se a posição está depois do destino e ainda não chegou ao alvo em X
            } else if (this.design.position.z >= this.target.z && !this.targetBool.z) {
                if (this.status.z < 0) {// Se está antes do destino
                    // Informa que já chegou ao alvo em X e para
                    this.targetBool.z = true;
                    this.acceleration.setZ(0);
                    this.moving.setZ(0);
                } else { // Se está depois do destino
                    this.acceleration.setZ(-this.ACCELERATION);
                    this.moving.setZ(-1);
                }
            }
        }

        this.randomMovement++;
        this.move();
    }

    /**
     * Dispara balas aleatoriamente
     * @returns {Bullet} bala disparada
     */
    shootRandomly() {

        /*if (this.eCannons.length < 1) {
            throw "Exception: All enemies must have cannons!";
        }*/

        

        if (this.eCannons.length > 0) {

            var numero = Constants.randomNumber(1, 100);
            let bullets = [];

            if (numero == 1) {
                

                for (let i = 0; i < this.eCannons.length; i++) {
                    numero = Constants.randomNumber(1, 2);

                    if (numero == 1) {
                        bullets.push(this.eCannons[i].shoot(this.type));
                    }
                }
            }

            return bullets;
        }
    }

    /**
     * Procura um novo destino para o movimento
     */
    newTarget() {

        let dimensions = this.getDimensions();

        // Define que ainda não chegou ao destino
        this.targetBool.x = false;
        this.targetBool.z = false;

        // Calcula um novo destino aleatório dentro dos limites estabelecidos
        this.target.x = Constants.randomNumber(-Constants.WALL_WIDTH / 2 + dimensions.x / 2,
            Constants.WALL_WIDTH / 2 - dimensions.x / 2);
        this.target.y = 0;
        this.target.z = Constants.randomNumber(-Constants.WALL_WIDTH / 2 + dimensions.z / 2, Constants.ENEMY_FRONT_LIMIT);

        // Dá em que estado a nave está em relação à posição destino
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

    /**
     * Verifica os limites no eixo de Z
     */
    checkZLimits() {
        if (this.design.position.z > this.frontLimit) {
            this.design.position.z = this.frontLimit;
            this.speed.z = 0;
            this.moveRandomly();
        }
    }
}