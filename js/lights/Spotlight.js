/**
 * StarBlast, jogo de naves espaciais.
 *
 * Este projecto é um projecto da cadeira de computação gráfica
 * como requisito parcial de avaliação do 4º ano de engenharia
 * informática (ISPTEC - Luanda, Angola).
 *
 * @link   https://github.com/hlucheses/starblast/
 * @file   Classe que representa os holofotes da cena.
 * @author Andreia Vanessa Graça de Brito
 * @author Helder Lucheses Gonçalves da Costa
 * @author Miguel Gamboa Francisco Domingos
 * @since  27.12.2021
 * 
 * @contact {20180296@isptec.co.ao, helder@lucheses.com, miguel@indiouz.com}
 */

class Spotlight extends SpotlightDesign {
    
    /**
     * Posiciona o holofote na cena
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     * @param {number} rY 
     */
    constructor(x, y, z, rY) {
        super(x, y, z, rY);
        this.mass = Constants.MASS.spotlight;

        this.light = this.createLight(x, y, z);
    }

    createLight(x, y, z){
        const distance = 0;
        const penumbra = 0.5;
        const decay = 1.0;

        const light = new THREE.SpotLight(0xffffff, 0, distance, Math.PI/2, penumbra, decay);
        light.position.set(x, y, z);
        
        return light;
    }
}