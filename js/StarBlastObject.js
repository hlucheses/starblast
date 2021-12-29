/**
 * StarBlast, jogo de naves espaciais.
 *
 * Este projecto é um projecto da cadeira de computação gráfica
 * como requisito parcial de avaliação do 4º ano de engenharia
 * informática (ISPTEC - Luanda, Angola).
 *
 * @link   https://github.com/hlucheses/starblast/
 * @file   Classe que todos os objectos do jogo.
 * @author Andreia Vanessa Graça de Brito
 * @author Helder Lucheses Gonçalves da Costa
 * @author Miguel Gamboa Francisco Domingos
 * @since  27.12.2021
 * 
 * @contact {20180296@isptec.co.ao, helder@lucheses.com, miguel@indiouz.com}
 */

class StarBlastObject {

    /**
     * Define posição inicial do objecto
     * Inicializa o design
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     */
    constructor(x, y, z) {
        this.design = new THREE.Object3D();

        // Define a posição inicial do objecto
        this.setStartPosition(x, y, z);

        // Variáveis de movimento

        /*
            Se moving = -1 => a nave está a se mover no sentido negativo
            do eixo em questão
            Se moving = 0 => a nave está parada no eixo em questão
            Se moving = 1 => a nave está a se mover no sentido positivo
            do eixo em questão
        */
        this.moving = new THREE.Vector3(0, 0, 0);

        this.speed = new THREE.Vector3(0, 0, 0);
        this.acceleration = new THREE.Vector3(0, 0, 0);

        this.designParts = {};
    }

    /**
     * Retorna o design do objecto (estrutra "física")
     * @returns {THREE.Object3D}
     */
    getDesign() {
        return this.design;
    }

    /**
     * Define posição inicial do objecto
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     */
    setStartPosition(x, y, z) {
        this.design.position.x = x;
        this.design.position.y = y;
        this.design.position.z = z;
    }

    /**
     * Retorna uma bounding box em volta do objecto
     * @returns {THREE.Box3}
     */
    createBoundingBox() { 
        var aabb = new THREE.Box3();
        aabb.setFromObject(this.design);
        this.boxHelper = new THREE.Box3Helper(aabb, "white");
        return aabb;
    }

    /**
     * Actualiza a posição da bounding box em cada frame
     */
    updateBoundingBox() {
        this.boundingBox.setFromObject(this.design);
    }

    /**
     * Retorna um array com os três materiais necessários para a mesh
     * @param {color} meshColor 
     * @returns {array}
     */
    newMaterialArray(meshColor) {
        return [
            new THREE.MeshBasicMaterial({ color: meshColor }),
            new THREE.MeshLambertMaterial({ color: meshColor }),
            new THREE.MeshPhongMaterial({ color: meshColor })
        ];
    }
}
