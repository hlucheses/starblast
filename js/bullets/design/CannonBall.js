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

class CannonBall extends StarBlastObject {

    /**
     * Define posição da bala
     * Inicializa o design
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     */
     constructor() {
        super(0, 0, 0);
        this.designParts = {};
        this.design = new THREE.Object3D();
        this.mass = .1;
        this.init();
    }

    /**
     * Adicionar os componentes ao objecto principal
     */
    init() {
        this.designParts.body = this.addBody(0, 0, 0);
    }

    /**
     * Retorna a mesh que representa o corpo da bala
     * @returns {{THREE.Mesh, array}}
     */
    addBody(x, y, z) {
        const geometry = new THREE.SphereGeometry(.7, 64, 64);
        const materialArray = this.newMaterialArray(0x333333);

        const mesh = new THREE.Mesh(geometry, materialArray[Constants.MESH_TYPE.default]);

        mesh.position.set(x, y, z);
        this.design.add(mesh);
        return {mesh, materialArray};
    }
}