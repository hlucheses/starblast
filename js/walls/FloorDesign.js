/**
 * StarBlast, jogo de naves espaciais.
 *
 * Este projecto é um projecto da cadeira de computação gráfica
 * como requisito parcial de avaliação do 4º ano de engenharia
 * informática (ISPTEC - Luanda, Angola).
 *
 * @link   https://github.com/hlucheses/starblast/
 * @file   Classe que representa o design do chão.
 * @author Andreia Vanessa Graça de Brito
 * @author Helder Lucheses Gonçalves da Costa
 * @author Miguel Gamboa Francisco Domingos
 * @since  27.12.2021
 * 
 * @contact {20180296@isptec.co.ao, helder@lucheses.com, miguel@indiouz.com}
 */

class FloorDesign extends StarBlastObject {
    /**
     * Define posição do chão
     * Inicializa o design
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     */
    constructor(x, y, z) {
        super(x, y, z);

        this.initialDesign();
        this.prepareShadowingRecieve();
    }

    /**
     * Adicionar os componentes ao objecto principal
     */
    initialDesign() {
        this.designParts.body = this.addBody(0, 0, 0);
    }

    /**
     * Retorna a mesh que representa o corpo do chão
     * @returns {{THREE.Mesh, array}}
     */
    addBody(x, y, z) {
        const WIDTH = Constants.WALL_WIDTH;

        const geometry = new THREE.BoxGeometry(WIDTH, Constants.WALL_THICKNESS, WIDTH);

        const materialArray = this.newMaterialArray();

        const texture = new THREE.TextureLoader().load("http://localhost/starblast/img/textures/floor.jpg");
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(4, 4);

        for (let i = 0; i < materialArray.length; i++) {
            //materialArray[i].side = THREE.DoubleSide;
            materialArray[i].transparent = true;
            materialArray[i].opacity = 0.36;
            materialArray[i].bumpMap = texture;
            materialArray[i].bumpScale = 1;
        }
        const mesh = new THREE.Mesh(geometry, materialArray[Constants.MESH_TYPE.default]);

        mesh.position.set(x, y, z);
        this.design.add(mesh);
        return { mesh, materialArray };
    }
}