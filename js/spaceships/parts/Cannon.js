/**
 * StarBlast, jogo de naves espaciais.
 *
 * Este projecto é um projecto da cadeira de computação gráfica
 * como requisito parcial de avaliação do 4º ano de engenharia
 * informática (ISPTEC - Luanda, Angola).
 *
 * @link   https://github.com/hlucheses/starblast/
 * @file   Classe que representa os canhões das naves.
 * @author Andreia Vanessa Graça de Brito
 * @author Helder Lucheses Gonçalves da Costa
 * @author Miguel Gamboa Francisco Domingos
 * @since  27.12.2021
 * 
 * @contact {20180296@isptec.co.ao, helder@lucheses.com, miguel@indiouz.com}
 */

 class Cannon {

    /**
     * Inicia com o design do canhão
     * @param {{THREE.Mesh, array}} design 
     */
    constructor (design) {
        this.design = design;
        this.bullets = {};     
    }

    /**
     * Muda a cor do canhão
     * @param {hexadecimal number} color 
     */
    setColor(color) {
        for (let i = 0; i < this.design.materialArray.length; i++) {
            this.design.materialArray[i].color.set(color);
        }
    }

    /**
     * Disparar uma bala
     * O tipo ajuda a determinar o sentido da bala
     * @param {number}
     */
    shoot(type) {
        var worldPosition = new THREE.Vector3();
        this.design.mesh.getWorldPosition(worldPosition);
        return new Bullet(worldPosition.x, worldPosition.y, worldPosition.z, type);
    }
}