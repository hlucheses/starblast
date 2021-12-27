/**
 * Classe que representa qualquer nave no jogo
 */

class Spaceship {

    /**
     * Define posição inicial da nave
     * Inicializa o design
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     */
    constructor(x, y, z) {
        /* Atributos definidos nos filhos */

        // Determina o tipo de spaceship (1 para player, 2 para inimigo)
        this.type = null;
        this.boundingBox = null
        this.design = new THREE.Object3D();
        this.cannons = {};

        /* Atributos definidos nesta classe mãe */

        // Variação da aceleração (1, 1, 1)
        this.ACCELERATION = Constants.metersToPixels(1);
        this.BRAKING = Constants.metersToPixels(.6);

        // Velocidade máxima 80 m/s
        this.MAX_SPEED = Constants.metersToPixels(80);

        // Variáveis de movimento
        this.moving = new THREE.Vector3(0, 0, 0);
        this.speed = new THREE.Vector3(0, 0, 0);
        this.acceleration = new THREE.Vector3(0, 0, 0);

        // inicia o hovering com 0
        this.hoveringStep = 0;

        this.setStartPosition(x, y, z);
        this.frontLimit;
        this.backLimit;
    }

    /**
     * 
     * @returns Object3D component from spaceship
     */
    getDesign() {
        return this.design;
    }

    /**
     * Define posição inicial da nave
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     */
    setStartPosition(x, y, z) {
        this.design.position.x = x;
        this.design.position.y = y;
        this.design.position.z = z;
    }

    /**
     * Método responsável pelo movimento das naves
     */
    move() {
        this.brake(); // travar caso não se esteja a acelerar
        this.hover(); // hover

        // À posicão são adicionados (velocidade) metros a cada frame
        this.design.position.add(this.speed);

        // Se a velocidade for menor que a máxima acelerar

        if (Math.abs(this.speed.x) <= this.MAX_SPEED) {
            this.speed.x += this.acceleration.x;
        } else {
            this.speed.x = Constants.getSignal(this.speed.x) * this.MAX_SPEED;
        }

        if (Math.abs(this.speed.z) <= this.MAX_SPEED) {
            this.speed.z += this.acceleration.z;
        } else {
            this.speed.z = Constants.getSignal(this.speed.z) * this.MAX_SPEED;
        }

        // Verificar se atingiu um limite
        this.checkXLimits();
        this.checkZLimits();

        // Inclinação
        this.tilt();

        // Actualiza a posição das bounding boxes
        this.updateBoundingBox();
    }

    /**
     * Método que faz com que as naves façam hovering no eixo y
     */
    hover() {
        this.hoveringStep += Constants.randomNumber(10, 30) / 1000;
        this.design.position.setY(.5 * (Math.cos(this.hoveringStep)));
    }

    /**
     * Método que faz as naves se inclinarem ao se moverem
     */
    tilt() {

        // Inclinação no eixo Z
        var inclination = ((this.speed.x / this.MAX_SPEED) * (Math.PI / 8));
        this.design.rotation.z = ((this.type == 1) ? -1 : 1) * inclination;

        // Inclinação no eixo X (Só para a frente)
        if (this.speed.z <= 0) {
            this.design.rotation.x = ((this.speed.z / this.MAX_SPEED) * (Math.PI / 32));
        }
    }

    /**
     * Método que possibilita a travagem das naves
     */
    brake() {
        if (this.moving.x == 0) { // Se moving estiver em 0 trava-se
            if (this.speed.x > 0) {
                this.speed.x -= this.BRAKING;

                if (this.speed.x < 0) {
                    this.speed.x = 0;
                }
            } else if (this.speed.x < 0) {
                this.speed.x += this.BRAKING;

                if (this.speed.x > 0) {
                    this.speed.x = 0;
                }
            }
        }

        if (this.moving.z == 0) { // Se moving estiver em 0 trava-se
            if (this.speed.z > 0) {
                this.speed.z -= this.BRAKING;

                if (this.speed.z < 0) {
                    this.speed.z = 0;
                }
            } else if (this.speed.z < 0) {
                this.speed.z += this.BRAKING;

                if (this.speed.z > 0) {
                    this.speed.z = 0;
                }
            }
        }
    }

    /**
     * Retorna uma bounding box em volta da nave
     * @returns {THREE.Box3}
     */
    createBoundingBox() {
        var aabb = new THREE.Box3();
        aabb.setFromObject(this.design);
        this.boxHelper = new THREE.Box3Helper(aabb, "white");

        return aabb;
    }

    /**
     * Actualiza a posição da bounding box em cada frame
     */
    updateBoundingBox() {
        this.boundingBox.setFromObject(this.design);
    }

    /**
     * Verifica os limites no eixo de X
     */
    checkXLimits() {
        if (this.design.position.x < Constants.LEFT_LIMIT) {
            this.design.position.x = Constants.LEFT_LIMIT;
            this.speed.x = 0;
        }

        if (this.design.position.x > Constants.RIGHT_LIMIT) {
            this.design.position.x = Constants.RIGHT_LIMIT;
            this.speed.x = 0;
        }
    } 
}