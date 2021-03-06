/**
 * StarBlast, jogo de naves espaciais.
 *
 * Este projecto é um projecto da cadeira de computação gráfica
 * como requisito parcial de avaliação do 4º ano de engenharia
 * informática (ISPTEC - Luanda, Angola).
 *
 * @link   https://github.com/hlucheses/starblast/
 * @file   Classe que representa a nave do player.
 * @author Andreia Vanessa Graça de Brito
 * @author Helder Lucheses Gonçalves da Costa
 * @author Miguel Gamboa Francisco Domingos
 * @since  27.12.2021
 * 
 * @contact {20180296@isptec.co.ao, helder@lucheses.com, miguel@indiouz.com}
 */

class PlayerSpaceship extends Spaceship {

    /**
     * Inicializa nave na posição (x, y, z) e as configurações iniciais
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     */
    constructor(x, y, z) {
        super(x, y, z);

        this.type = Constants.PLAYER; // Tipo de nave

        // Design inicial
        this.initialDesign(x, y, z);

        // Cria a boundingBox
        this.boundingBox = this.createBoundingBox();

        // Estabelece os limites longitudenais do player
        this.frontLimit = Constants.PLAYER_FRONT_LIMIT;
        this.backLimit = Constants.PLAYER_BACK_LIMIT;
        this.cannons.current = null;

        this.shootingPressed = true;
        this.shootingHeight = .2;
        this.shootingStep = .2;


        this.lastBullet = null;

        // Massa da nave
        this.mass = Constants.MASS.player;
        this.lives = 7;
        
        this.prepareShadowing();
    }

    initialDesign(x, y, z) {
        var design = new NeilA();
        this.mass = design.mass;
        this.design = design.design;
        this.defaultCannonColor = design.defaultCannonColor;
        this.designParts = design.designParts;
        this.cannons = design.cannons;
        this.design.position.set(x, y, z);
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

    /**
     * Verifica os limites no eixo de Z
     */
    checkZLimits() {
        if (this.design.position.z < this.frontLimit) {
            this.design.position.z = this.frontLimit;
            this.speed.z = 0;
        }
    }

    /**
     * Verifica que canhão foi seleccionado e muda 
     * a sua cor com base no código da tecla clicada
     * @param {string}
     */
    checkCannon(keyCode) {

        if (keyCode == "KeyZ" || keyCode == "KeyX" || keyCode == "KeyC") {
            this.cannons.left.setColor(this.defaultCannonColor);
            this.cannons.right.setColor(this.defaultCannonColor);
            this.cannons.middle.setColor(this.defaultCannonColor);
        } else {
            return;
        }

        switch (keyCode) {
            case "KeyZ":
                this.cannons.current = this.cannons.left;
                break;
            case "KeyX":
                this.cannons.current = this.cannons.middle;
                break;
            case "KeyC":
                this.cannons.current = this.cannons.right;
                break;

        }

        this.cannons.current.setColor(Constants.COLORS.cannons.selected);
    }

    /**
     * Dá um tiro usando um canhão
     * @returns {Bullet}
     */
    shoot() {
        if (this.cannons.current == null) {
            return;
        }

        this.lastBullet = this.cannons.current.shoot(Constants.PLAYER);

        return this.lastBullet;
    }
}