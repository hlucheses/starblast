/**
 * StarBlast, jogo de naves espaciais.
 *
 * Este projecto é um projecto da cadeira de computação gráfica
 * como requisito parcial de avaliação do 4º ano de engenharia
 * informática (ISPTEC - Luanda, Angola).
 *
 * @link   https://github.com/hlucheses/starblast/
 * @file   Classe que representa o design da munição de um canhão.
 * @author Andreia Vanessa Graça de Brito
 * @author Helder Lucheses Gonçalves da Costa
 * @author Miguel Gamboa Francisco Domingos
 * @since  27.12.2021
 * 
 * @contact {20180296@isptec.co.ao, helder@lucheses.com, miguel@indiouz.com}
 */

 class BulletDesign extends StarBlastObject {

    /**
     * Define posição da bala
     * Inicializa o design
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     */
    constructor(x, y, z) {
        super(x, y, z);
        this.initialDesign();
    }

    /**
     * Adicionar os componentes ao objecto principal
     */
    initialDesign() {
        this.body = this.addBody(0, 0, 0);
    }

    /**
     * Retorna a mesh que representa o corpo da bala
     * @returns {Three.mesh}
     */
    addBody(x, y, z) {
        var mesh = new THREE.Mesh(new THREE.SphereGeometry(.6, 64, 64), new THREE.MeshBasicMaterial({ color: "#0000ff" }));
        mesh.position.set(x, y, z);
        this.design.add(mesh);
        return mesh;
    }
}