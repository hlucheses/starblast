/**
 * StarBlast, jogo de naves espaciais.
 *
 * Este projecto é um projecto da cadeira de computação gráfica
 * como requisito parcial de avaliação do 4º ano de engenharia
 * informática (ISPTEC - Luanda, Angola).
 *
 * @link   https://github.com/hlucheses/starblast/
 * @file   Classe que representa os as luzes de cartaz da cena.
 * @author Andreia Vanessa Graça de Brito
 * @author Helder Lucheses Gonçalves da Costa
 * @author Miguel Gamboa Francisco Domingos
 * @since  27.12.2021
 * 
 * @contact {20180296@isptec.co.ao, helder@lucheses.com, miguel@indiouz.com}
 */

 class BillboardLight extends BillboardLightDesign {

    /**
     * Posiciona a luz de cartaz na cena
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     * @param {number} rY 
     */
    constructor(x, y, z, rY) {
        super(x, y, z, rY);
        this.mass = Constants.MASS.spotlight;

        this.light = this.createLight();
    }

    createLight() {
        const light = new THREE.PointLight( 0xffffff, 1, 100 );

        light.position.set(
            this.design.position.x - 7 * (this.design.position.x / Math.abs(this.design.position.x)),
            this.design.position.y - (.15 * 7 *.75),
            this.design.position.z
        );

        return light;
    }
}