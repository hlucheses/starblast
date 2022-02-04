/**
 * StarBlast, jogo de naves espaciais.
 *
 * Este projecto é um projecto da cadeira de computação gráfica
 * como requisito parcial de avaliação do 4º ano de engenharia
 * informática (ISPTEC - Luanda, Angola).
 *
 * @link   https://github.com/hlucheses/starblast/
 * @file   Classe que representa o chão da cena.
 * @author Andreia Vanessa Graça de Brito
 * @author Helder Lucheses Gonçalves da Costa
 * @author Miguel Gamboa Francisco Domingos
 * @since  27.12.2021
 * 
 * @contact {20180296@isptec.co.ao, helder@lucheses.com, miguel@indiouz.com}
 */


class Floor extends FloorDesign {

    /**
     * Define posição da parede
     * Inicializa o design
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     * @param {number} rY
     */
    constructor(x, y, z) {
        super(x, y, z);

        // Cria a boundingBox
        /*
            FIXME: Não se consegui fazer colisões com as paredes usando bounding boxes
        */
        this.boundingBox = this.createBoundingBox();

        // Massa do chão
        this.mass = Constants.MASS.wall;
    }
}