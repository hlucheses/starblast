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

 class Missile extends StarBlastObject {

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
        this.mass = .5;
        this.init();
    }

    /**
     * Adicionar os componentes ao objecto principal
     */
    init() {
        this.designParts.body = this.addBody(0, 0, 0);
        this.designParts.tip = this.addTip(0, 0, -1);
        this.designParts.verticalWing = this.addWing(0, 0, .15, 0);
        this.designParts.horizontalWing = this.addWing(0, 0, .15, Math.PI / 2);
    }

    /**
     * Retorna a mesh que representa o corpo da bala
     * @returns {{THREE.Mesh, array}}
     */
    addBody(x, y, z) {
        const geometry = new THREE.CylinderGeometry(1, 1, 1, 64);
        const materialArray = this.newMaterialArray(0x3b4545);

        const mesh = new THREE.Mesh(geometry, materialArray[Constants.MESH_TYPE.default]);

        geometry.scale(.3, 1.562, .3);
        mesh.rotation.set(Math.PI / 2, Math.PI / 2, 0);
        mesh.position.set(x, y, z);
        this.design.add(mesh);
        return {mesh, materialArray};
    }

    addTip(x, y, z) {
        const points = [];
        points.push(new THREE.Vector2(.5, .5));
        points.push(new THREE.Vector2(.5, 0));
        points.push(new THREE.Vector2(0, -.2));

        const geometry = new THREE.LatheGeometry(points, 30, 0, 2 * Math.PI);
        const materialArray = this.newMaterialArray(0x850000);
        const mesh = new THREE.Mesh(geometry, materialArray[Constants.MESH_TYPE.default]);

        geometry.scale(.6, 1.953, .6);

        mesh.position.set(x, y, z);
        mesh.rotation.set(Math.PI / 2, 0, 0);
        this.design.add(mesh);
        return {mesh, materialArray};
    }

    addWing(x, y, z, rY) {
        const points = [];
        points.push(new THREE.Vector2(0, .7));
        points.push(new THREE.Vector2(.44, .44));
        points.push(new THREE.Vector2(0, -.5));

        const geometry = new THREE.LatheGeometry(points, 12, 0, 2 * Math.PI);
        const materialArray = this.newMaterialArray(0x850000);
        const mesh = new THREE.Mesh(geometry, materialArray[Constants.MESH_TYPE.default]);

        geometry.scale(.169, .879, 1.497);

        mesh.position.set(x, y, z);
        mesh.rotation.set(Math.PI / 2, rY, 0);
        this.design.add(mesh);
        return {mesh, materialArray};
    }
}