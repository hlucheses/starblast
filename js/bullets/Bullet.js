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

    static MAX_SPEED = 4 * Constants.SPACESHIP_MAX_SPEED;
    static ACCELERATION = 2 * Constants.SPACESHIP_ACCELERATION;
    static BRAKING = 1.5 * Constants.SPACESHIP_BRAKING;

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
    }

    move() {
        
    }
}