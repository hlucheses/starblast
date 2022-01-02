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

    createLight(x, y, z) {
        const distance = 2000;
        const penumbra = 0.5;
        const decay = 1.0;

        const light = new THREE.SpotLight(0xffffff, 0, distance, Math.PI / 4, penumbra, decay);

        light.target.position.set(-this.design.position.x, 0, -this.design.position.z);
        //light.target.updateMatrixWorld();
        light.castShadow = true;
        light.shadow.bias = -0.0001;
        light.shadow.mapSize.width = 512;
        light.shadow.mapSize.height = 512;
        light.shadow.camera.near = 1;
        light.shadow.camera.far = 2000;
        light.intensity = 1;
        
        const xSignal = Constants.getSignal(this.design.position.x);
        const zSignal = Constants.getSignal(this.design.position.z);

        light.position.set(x - xSignal * 8, y, z + zSignal * 9);

        return light;
    }
}