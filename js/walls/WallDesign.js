/**
 * StarBlast, jogo de naves espaciais.
 *
 * Este projecto é um projecto da cadeira de computação gráfica
 * como requisito parcial de avaliação do 4º ano de engenharia
 * informática (ISPTEC - Luanda, Angola).
 *
 * @link   https://github.com/hlucheses/starblast/
 * @file   Classe que representa o design de uma parede.
 * @author Andreia Vanessa Graça de Brito
 * @author Helder Lucheses Gonçalves da Costa
 * @author Miguel Gamboa Francisco Domingos
 * @since  27.12.2021
 * 
 * @contact {20180296@isptec.co.ao, helder@lucheses.com, miguel@indiouz.com}
 */

class WallDesign extends StarBlastObject {
    /**
     * Define posição da parede
     * Inicializa o design
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     * @param {number} rY
     */
    constructor(x, y, z, rY) {
        super(x, y, z, rY);

        this.design.rotation.y = rY;

        this.initialDesign();
    }

    /**
     * Adicionar os componentes ao objecto principal
     */
     initialDesign() {
        this.designParts.body = this.addBody(0, 0, 0);
    }

    /**
     * Retorna a mesh que representa o corpo da parede
     * @returns {{THREE.Mesh, array}}
     */
     addBody(x, y, z) {
        const geometry = new THREE.BoxGeometry(Constants.WALL_WIDTH, Constants.WALL_HEIGHT, Constants.WALL_THICKNESS);

        const materialArray = this.newMaterialArray(Constants.COLORS.walls);

        for (let i = 0; i < materialArray.length; i++) {
            //materialArray[i].side = THREE.DoubleSide;
            materialArray[i].transparent = true;
            materialArray[i].opacity = 0.36;
        }
        const mesh = new THREE.Mesh(geometry, materialArray[Constants.MESH_TYPE.default]);

        mesh.position.set(x, y, z);
        this.design.add(mesh);
        return {mesh, materialArray};
    }
}