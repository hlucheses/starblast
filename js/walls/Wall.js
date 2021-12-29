/**
 * StarBlast, jogo de naves espaciais.
 *
 * Este projecto é um projecto da cadeira de computação gráfica
 * como requisito parcial de avaliação do 4º ano de engenharia
 * informática (ISPTEC - Luanda, Angola).
 *
 * @link   https://github.com/hlucheses/starblast/
 * @file   Classe que representa as paredes da cena.
 * @author Andreia Vanessa Graça de Brito
 * @author Helder Lucheses Gonçalves da Costa
 * @author Miguel Gamboa Francisco Domingos
 * @since  27.12.2021
 * 
 * @contact {20180296@isptec.co.ao, helder@lucheses.com, miguel@indiouz.com}
 */


class Wall extends WallDesign {

    /**
     * Define posição da parede
     * Inicializa o design
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     * @param {number} rY
     */
    constructor(x, y, z, rY = 0) {
        super(x, y, z, rY);

        // Cria a boundingBox
        /*
            FIXME: Não se consegui fazer colisões com as paredes usando bounding boxes
        */
        this.boundingBox = this.createBoundingBox();

        // Massa da parede
        this.mass = Constants.MASS.wall;
    }
}