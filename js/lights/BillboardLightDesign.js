/**
 * StarBlast, jogo de naves espaciais.
 *
 * Este projecto é um projecto da cadeira de computação gráfica
 * como requisito parcial de avaliação do 4º ano de engenharia
 * informática (ISPTEC - Luanda, Angola).
 *
 * @link   https://github.com/hlucheses/starblast/
 * @file   Classe que representa o design das luzes de cartaz.
 * @author Andreia Vanessa Graça de Brito
 * @author Helder Lucheses Gonçalves da Costa
 * @author Miguel Gamboa Francisco Domingos
 * @since  27.12.2021
 * 
 * @contact {20180296@isptec.co.ao, helder@lucheses.com, miguel@indiouz.com}
 */


 class BillboardLightDesign extends StarBlastObject {
    /**
     * Inicializa o spotlight (x, y, z) e as configurações iniciais
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     */

    static LIGHT;
    constructor(x, y, z, rY) {
        super(x, y, z);
        this.design = new THREE.Object3D();
        
        this.initialDesign();

        // Definir a rotação do holofote
        this.design.rotation.y = rY;

        // Redimensionar o holofote
        const SCALE_CONSTANT = 7;
        this.design.scale.x = SCALE_CONSTANT;
        this.design.scale.y = SCALE_CONSTANT;
        this.design.scale.z = SCALE_CONSTANT;

        this.setStartPosition(x, y, z);
    }

    /**
     * Adicionar os componentes ao objecto principal (partes do Spotlight)
     */
    initialDesign() {
        this.designParts.leftStick = this.addStick(-.150, 0, -0.02);
        this.designParts.rightStick = this.addStick(.150, 0, -0.02);
        this.designParts.body = this.addBody(0, 0.05, .940);
        this.designParts.bulb = this.addBulb(0, -.15, .940);
    }

    /**
     * Cria o corpo da lampada em (x, y, z)
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     * @returns {{THREE.Mesh, array}}
     */
    addBody(x, y, z) {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const materialArray = this.newMaterialArray(0x111111);
        const mesh = new THREE.Mesh(geometry, materialArray[Constants.MESH_TYPE.default]);

        geometry.scale(.5, .2, .5);
        mesh.position.set(x, y, z);
        mesh.rotation.set(Math.PI / 12, 0, 0);
        this.design.add(mesh);
        return {mesh, materialArray};
    }

    /**
     * Cria o stick da lampada em (x, y, z)
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     * @returns {{THREE.Mesh, array}}
     */
    addStick(x, y, z) {
        const geometry = new THREE.CylinderGeometry(1, 1, 1, 64);
        const materialArray = this.newMaterialArray(0x333333);
        const mesh = new THREE.Mesh(geometry, materialArray[Constants.MESH_TYPE.default]);

        geometry.scale(.1, 1.5, .1);
        mesh.rotation.set(Math.PI / 2, 0, 0);
        mesh.position.set(x, y, z);
        this.design.add(mesh);
        return { mesh, materialArray };
    }

    /**
     * Cria o bulbo da lampada em (x, y, z)
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     * @returns {{THREE.Mesh, array}}
     */
     addBulb(x, y, z) {
        const geometry = new THREE.SphereGeometry(1, 64, 64);
        const materialArray = this.newMaterialArray(0xeeeeee);

        const mesh = new THREE.Mesh(geometry, materialArray[Constants.MESH_TYPE.default]);

        for (let i = 0; i < materialArray.length; i++) {
            materialArray[i].transparent = true;
        }

        geometry.scale(.180, .1, .180);
        mesh.rotation.set(Math.PI / 12, 0, 0);
        mesh.position.set(x, y, z);
        this.design.add(mesh);
        return {mesh, materialArray};
    }
}