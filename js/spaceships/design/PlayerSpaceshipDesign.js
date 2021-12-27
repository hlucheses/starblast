/**
 * StarBlast, jogo de naves espaciais.
 *
 * Este projecto é um projecto da cadeira de computação gráfica
 * como requisito parcial de avaliação do 4º ano de engenharia
 * informática (ISPTEC - Luanda, Angola).
 *
 * @link   https://github.com/hlucheses/starblast/
 * @file   Classe que representa o desenho da nave do player.
 * @author Andreia Vanessa Graça de Brito
 * @author Helder Lucheses Gonçalves da Costa
 * @author Miguel Gamboa Francisco Domingos
 * @since  27.12.2021
 * 
 * @contact {20180296@isptec.co.ao, helder@lucheses.com, miguel@indiouz.com}
 */

class PlayerSpaceshipDesign extends Spaceship {

    /**
     * Inicializa nave na posição (x, y, z) e as configurações iniciais
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     */
    constructor(x, y, z) {
        super(x, y, z);
        this.initialDesign();
    }

    /**
     * Adicionar os componentes ao objecto principal (partes da nave)
     */
    initialDesign() {
        // Canhões usados para fazer os disparos
        this.cannons.left = new Cannon(this.addSideCannonHolder(4.224, -.685, 2.055, -40.25));
        this.cannons.right = new Cannon(this.addSideCannonHolder(-4.224, -.685, 2.055, 40.25));
        this.cannons.middle = new Cannon(this.addCentralCannonRing(0, -1.565, .685));

        this.cockpit = this.addCockpit(0, .774, 1.467);
        this.body = this.addBody(0, 0, 0);
        this.leftWing = this.addWing(-2.911, 0, 0.333, -Math.PI / 12);
        this.rightWing = this.addWing(2.911, 0, 0.333, Math.PI / 12);
        this.bigPropellant = this.addBigPropellant(0, 0, 6.776);
        this.leftSmallPropellant = this.addSmallPropellant(-1.246, 0, 6.776);
        this.rightSmallPropellant = this.addSmallPropellant(1.246, 0, 6.776);
        this.centralPropellant = this.addCentralCannonHolder(0, -.6, 0);
    }

    /**
     * Canhão central
     * Recebe posição relativa à nave (x, y, z)
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     * @returns {THREE.Mesh} mesh
     */
    addCentralCannon(x, y, z) {
        const points = [];
        points.push(new THREE.Vector2(.78, .05));
        points.push(new THREE.Vector2(1.2, -.92));
        points.push(new THREE.Vector2(0, -.5));
        const geometry = new THREE.LatheGeometry(points);
        const material = new THREE.MeshBasicMaterial({ color: 0x3b4545 });
        const mesh = new THREE.Mesh(geometry, material);

        geometry.scale(.55, 2.98, .55);
        geometry.rotateX(-Math.PI / 2);
        mesh.position.set(x, y, z);
        this.design.add(mesh);
        return mesh;
    }

    /**
     * Canhão lateral
     * Recebe posição relativa à nave (x, y, z)
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     * @returns {THREE.Mesh} mesh
     */
    addSideCannon(x, y, z) {
        const points = [];
        points.push(new THREE.Vector2(.78, .05));
        points.push(new THREE.Vector2(-.76, -.92));
        points.push(new THREE.Vector2(0, -.5));
        const geometry = new THREE.LatheGeometry(points);
        const material = new THREE.MeshBasicMaterial({ color: 0x3b4545 });
        const mesh = new THREE.Mesh(geometry, material);

        geometry.scale(.55, 5.753, .55);
        geometry.rotateX(-Math.PI / 2);
        mesh.position.set(x, y, z);
        this.design.add(mesh);
        return mesh;
    }

    /**
     * Anel do canhão central
     * Recebe posição relativa à nave (x, y, z)
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     * @returns {THREE.Mesh} mesh
     */
    addCentralCannonRing(x, y, z) {
        const geometry = new THREE.CylinderGeometry(1, 1, 1, 64);
        const material = new THREE.MeshBasicMaterial({ color: 0x00d5ff });
        const mesh = new THREE.Mesh(geometry, material);

        geometry.scale(.71, .621, .71);
        mesh.position.set(x, y, z);
        mesh.rotation.set(Math.PI / 2, Math.PI / 2, 0);
        this.design.add(mesh);
        return mesh;
    }

    /**
     * Suporte do canhão lateral
     * Recebe posição relativa à nave (x, y, z)
     * Recebe rotação no eixo Y
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     * @param {number} rY
     * @returns {THREE.Mesh} mesh
     */
    addSideCannonHolder(x, y, z, rY) {
        const geometry = new THREE.CylinderGeometry(1, 1, 1, 64);
        const material = new THREE.MeshBasicMaterial({ color: 0x00d5ff });
        const mesh = new THREE.Mesh(geometry, material);

        geometry.scale(.3, 3.232, .3);
        mesh.position.set(x, y, z);
        mesh.rotation.set(Math.PI / 2, rY * Math.PI / 180, -Math.PI / 2);
        this.design.add(mesh);
        return mesh;
    }

    /**
     * Suporte do canhão central
     * Recebe posição relativa à nave (x, y, z)
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     * @returns {THREE.Mesh} mesh
     */
    addCentralCannonHolder(x, y, z) {
        const geometry = new THREE.CylinderGeometry(1, 1, 1, 64);
        const material = new THREE.MeshBasicMaterial({ color: 0x00d5ff });
        const mesh = new THREE.Mesh(geometry, material);

        geometry.scale(.165, 1.721, .163);
        geometry.rotateY(Math.PI / 2);
        mesh.position.set(x, y, z);
        this.design.add(mesh);
        return mesh;
    }

    /**
     * Cockpit
     * Recebe posição relativa à nave (x, y, z)
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     * @returns {THREE.Mesh} mesh
     */
    addCockpit(x, y, z) {
        const geometry = new THREE.SphereGeometry(1, 64, 32);
        const material = new THREE.MeshBasicMaterial({ color: 0x00e3e6 });
        const mesh = new THREE.Mesh(geometry, material);

        geometry.scale(2.839, 0.837, 1.381);
        geometry.rotateY(-Math.PI / 2);
        mesh.position.set(x, y, z);
        this.design.add(mesh);
        return mesh;
    }

    /**
     * Corpo da nave
     * Recebe posição relativa à nave (x, y, z)
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     * @returns {THREE.Mesh} mesh
     */
    addBody(x, y, z) {
        const geometry = new THREE.SphereGeometry(1, 64, 32);
        const material = new THREE.MeshBasicMaterial({ color: 0x214f4f });
        const mesh = new THREE.Mesh(geometry, material);

        geometry.scale(7.894, 1.042, 3.524);
        geometry.rotateY(-Math.PI / 2);
        mesh.position.set(x, y, z);
        this.design.add(mesh);
        return mesh;
    }

    /**
     * Asa da nave
     * Recebe posição relativa à nave (x, y, z)
     * Recebe rotação em torno do eixo Y
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     * @param {number} rY
     * @returns {THREE.Mesh} mesh
     */
    addWing(x, y, z, rY) {
        const geometry = new THREE.SphereGeometry(1, 64, 32);
        const material = new THREE.MeshBasicMaterial({ color: 0x214f4f });
        const mesh = new THREE.Mesh(geometry, material);

        geometry.scale(1.729, 0.522, 8.096);
        geometry.rotateY(rY);
        mesh.position.set(x, y, z);
        this.design.add(mesh);
        return mesh;
    }

    /**
     * Propulsor maior
     * Recebe posição relativa à nave (x, y, z)
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     * @returns {THREE.Mesh} mesh
     */
    addBigPropellant(x, y, z) {
        const points = [];
        points.push(new THREE.Vector2(.26, .94));
        points.push(new THREE.Vector2(.82, -2.38));
        points.push(new THREE.Vector2(0, -1.96));
        const geometry = new THREE.LatheGeometry(points);
        const material = new THREE.MeshBasicMaterial({ color: 0x00e3e6 });
        const mesh = new THREE.Mesh(geometry, material);

        geometry.scale(1, 0.609, 1);
        geometry.rotateX(-Math.PI / 2);
        mesh.position.set(x, y, z);
        this.design.add(mesh);
        return mesh;
    }

    /**
     * Propulsor menor
     * Recebe posição relativa à nave (x, y, z)
     * @param {number} x 
     * @param {number} y 
     * @param {number} z
     * @returns {THREE.Mesh} mesh
     */
    addSmallPropellant(x, y, z) {
        const points = [];
        points.push(new THREE.Vector2(.26, .94));
        points.push(new THREE.Vector2(.82, -2.38));
        points.push(new THREE.Vector2(0, -1.96));
        const geometry = new THREE.LatheGeometry(points);
        const material = new THREE.MeshBasicMaterial({ color: 0x00e3e6 });
        const mesh = new THREE.Mesh(geometry, material);

        geometry.scale(.5, 0.519, .5);
        geometry.rotateX(-Math.PI / 2);
        mesh.position.set(x, y, z);
        this.design.add(mesh);
        return mesh;
    }
}