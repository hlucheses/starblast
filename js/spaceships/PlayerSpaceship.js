/**
 * Classe que representa a nave heroína
 */

class PlayerSpaceship extends PlayerSpaceshipDesign {

    /**
     * Inicializa nave na posição (x, y, z) e as configurações iniciais
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     */
    constructor(x, y, z) {
        super(x, y, z);

        
        this.type = Constants.PLAYER; // Tipo 1 é nave do herói
        this.boundingBox = this.createBoundingBox();

        this.frontLimit = Constants.PLAYER_FRONT_LIMIT;
        this.backLimit = Constants.PLAYER_BACK_LIMIT;
    }

    /**
     * Movimenta as naves com base na tecla apertada
     * @param {array} keyStates 
     */
    checkMovement(keyStates) {
        if (keyStates['ArrowUp'] == true) {
            this.acceleration.setZ(-this.ACCELERATION);
            this.moving.setZ(-1);
        } else if (keyStates['ArrowDown'] == true) {
            this.acceleration.setZ(this.ACCELERATION);
            this.moving.setZ(1);
        } else {
            this.acceleration.setZ(0);
            this.moving.setZ(0);
        }

        if (keyStates['ArrowLeft'] == true) {
            this.acceleration.setX(-this.ACCELERATION);
            this.moving.setX(-1);
        } else if (keyStates['ArrowRight'] == true) {
            this.acceleration.setX(this.ACCELERATION);
            this.moving.setX(1);
        } else {
            this.acceleration.setX(0);
            this.moving.setX(0);
        }
        this.move();
        
    }

    checkZLimits() {
        if (this.design.position.z > this.backLimit) {
            this.design.position.z = this.backLimit;
            this.speed.z = 0;
        }

        if (this.design.position.z < this.frontLimit) {
            this.design.position.z = this.frontLimit;
            this.speed.z = 0;
        }
    }
}