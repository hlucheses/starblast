/**
 * StarBlast, jogo de naves espaciais.
 *
 * Este projecto é um projecto da cadeira de computação gráfica
 * como requisito parcial de avaliação do 4º ano de engenharia
 * informática (ISPTEC - Luanda, Angola).
 *
 * @link   https://github.com/hlucheses/starblast/
 * @file   Classe que representa o design dos holofotes.
 * @author Andreia Vanessa Graça de Brito
 * @author Helder Lucheses Gonçalves da Costa
 * @author Miguel Gamboa Francisco Domingos
 * @since  27.12.2021
 * 
 * @contact {20180296@isptec.co.ao, helder@lucheses.com, miguel@indiouz.com}
 */


class SpotlightDesign extends StarBlastObject {
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
        this.design.rotation.z = Math.PI / 1.9;
        this.design.rotation.y = rY;

        // Redimensionar o holofote
        const SCALE_CONSTANT = 1.2;
        this.design.scale.x = SCALE_CONSTANT;
        this.design.scale.y = SCALE_CONSTANT;
        this.design.scale.z = SCALE_CONSTANT;

        this.setStartPosition(x, y, z);
    }

    /**
     * Adicionar os componentes ao objecto principal (partes do Spotlight)
     */
    initialDesign() {
        this.designParts.body = this.addBody(0, 0, 0);
        this.designParts.bulb = this.addBulb(0, 3, 0);
    }

    /**
     * Cria o corpo do holofote em (x, y, z)
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     * @returns {{THREE.Mesh, array}}
     */
    addBody(x, y, z) {
        const points = [];

        for (let i = 0; i < 10; i++) {
            points.push(new THREE.Vector2(Math.sin(i * 0.2) * 10 + 5, (i - 5) * 2));
        }

        const geometry = new THREE.LatheGeometry(points);
        const materialArray = this.newMaterialArray(0x888888);
        const mesh = new THREE.Mesh(geometry, materialArray[Constants.MESH_TYPE.default]);

        geometry.scale(.5, .5, .5);
        mesh.position.set(x, y, z);
        this.design.add(mesh);
        return {mesh, materialArray};
    }

    /**
     * Cria o bulbo do holofote em (x, y, z)
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     * @returns {{THREE.Mesh, array}}
     */
    addBulb(x, y, z) {
        const geometry = new THREE.SphereGeometry(1.5, 64, 64);
        const materialArray = this.newMaterialArray(0xeeeeee);

        const mesh = new THREE.Mesh(geometry, materialArray[Constants.MESH_TYPE.default]);

        for (let i = 0; i < materialArray.length; i++) {
            materialArray[i].transparent = true;
        }

        geometry.scale(3, 3, 3);
        mesh.position.set(x, y, z);
        this.design.add(mesh);
        return {mesh, materialArray};
    }
}