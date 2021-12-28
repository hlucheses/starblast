/**
 * StarBlast, jogo de naves espaciais.
 *
 * Este projecto é um projecto da cadeira de computação gráfica
 * como requisito parcial de avaliação do 4º ano de engenharia
 * informática (ISPTEC - Luanda, Angola).
 *
 * @link   https://github.com/hlucheses/starblast/
 * @file   Classe que representa a munição de um canhão.
 * @author Andreia Vanessa Graça de Brito
 * @author Helder Lucheses Gonçalves da Costa
 * @author Miguel Gamboa Francisco Domingos
 * @since  27.12.2021
 * 
 * @contact {20180296@isptec.co.ao, helder@lucheses.com, miguel@indiouz.com}
 */

 class Bullet extends BulletDesign {

    

    /**
     * Define posição da bala
     * Inicializa o design
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     */
    constructor(x, y, z, type) {
        super(x, y, z);
        

        this.type = type;

        this.speed = new THREE.Vector3(0, 0, 1);

        if (this.type == Constants.PLAYER) {
            this.speed.z = -1;
        }

        this.alive = true;
        this.peaked = true;

        // FIXME: Não consigo tornar isto em atributos estáticos
        this.MAX_SPEED = 4 *  Constants.metersToPixels(80);
        this.ACCELERATION = 2 * Constants.metersToPixels(1);
        this.BRAKING = .5 *  Constants.metersToPixels(1);

        // Cria a boundingBox
        this.boundingBox = this.createBoundingBox();
    }

    /**
     * Move as balas
     * TODO: Considerar que a bala abranda e que quando bate numa parede cai
     */
    move() {

        if (this.type == Constants.ENEMY) {

            // Nave inimiga move-se num sentido
            if (this.speed.z < this.MAX_SPEED) {
                this.speed.z += this.ACCELERATION;
            } else {
                this.peaked = true;
            }

            if (this.peaked) {
                this.speed.z -= this.BRAKING;
            }
        } else {
            // Nave do player move-se num sentido
            if (this.speed.z < this.MAX_SPEED) {
                this.speed.z -= this.ACCELERATION;
            } else {
                this.peaked = true;
            }

            if (this.peaked) {
                this.speed.z += this.BRAKING;
            }
        }

        this.design.position.z += this.speed.z;

        this.updateBoundingBox();
    }
}