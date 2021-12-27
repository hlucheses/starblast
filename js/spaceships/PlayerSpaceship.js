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

class PlayerSpaceship extends PlayerSpaceshipDesign {

    /**
     * Inicializa nave na posição (x, y, z) e as configurações iniciais
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     */
    constructor(x, y, z) {
        super(x, y, z);

        this.type = Constants.PLAYER; // Tipo de nave

        // Cria a boundingBox
        this.boundingBox = this.createBoundingBox();

        // Estabelece os limites longitudenais do player
        this.frontLimit = Constants.PLAYER_FRONT_LIMIT;
        this.backLimit = Constants.PLAYER_BACK_LIMIT;
        this.cannons.current = null;
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
        if (this.design.position.z > this.backLimit) {
            this.design.position.z = this.backLimit;
            this.speed.z = 0;
        }

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

        if (keyCode == "KeyQ" || keyCode == "KeyW" || keyCode == "KeyE") {
            this.cannons.left.setColor(Constants.COLORS.cannons.default);
            this.cannons.right.setColor(Constants.COLORS.cannons.default);
            this.cannons.middle.setColor(Constants.COLORS.cannons.default);
        } else {
            return;
        }

        switch (keyCode) {
            case "KeyQ":
                this.cannons.current = this.cannons.left;
                break;
            case "KeyW":
                this.cannons.current = this.cannons.middle;
                break;
            case "KeyE":
                this.cannons.current = this.cannons.right;
                break;

        }

        this.cannons.current.setColor(Constants.COLORS.cannons.selected);
    }
}