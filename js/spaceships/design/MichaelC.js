class MichaelC extends StarBlastObject {
    constructor() {
        super(0, 0, 0);
        this.cannons = {};
        this.designParts = {};
        this.design = new THREE.Object3D();
        this.defaultCannonColor = 0x111f22;
        this.mass = 100;
        this.init();
    }

    /**
     * Adicionar os componentes ao objecto principal (partes da nave)
     */
    init() {
        this.designParts.triangle = this.addTriangle(0, 2.246, -.698);

        this.designParts.tail = this.addTail(0, 0.056, -4.144);

        this.designParts.leftCannonHead = this.addCannonHead(-3.888, -.5, .843);
        this.designParts.rightCannonHead = this.addCannonHead(3.888, -.5, .843);

        this.designParts.leftCannonPipe = this.addCannonPipe(-3.890, -.496, -.673);
        this.designParts.rightCannonPipe = this.addCannonPipe(3.890, -.496, -.673);
        this.designParts.leftBigCannon = this.addBigCannon(-2.889, 1.328, -2.514);
        this.designParts.rightBigCannon = this.addBigCannon(2.889, 1.328, -2.514);

        this.cannons.right = new Cannon(this.designParts.rightCannonPipe, Constants.BULLET_TYPE.missile);
        this.cannons.left = new Cannon(this.designParts.leftCannonPipe, Constants.BULLET_TYPE.missile);
        //this.cannons.bigLeft = new Cannon(this.designParts.leftBigCannon, Constants.BULLET_TYPE.missile);
        //this.cannons.bigRight = new Cannon(this.designParts.rightBigCannon, Constants.BULLET_TYPE.missile);

        this.cannons.leftCannonWing1 = this.addCannonWing();
        this.cannons.rightCannonWing1 = this.addCannonWing();
        this.cannons.topCannonWing1 = this.addCannonWing();
        this.cannons.bottomCannonWing1 = this.addCannonWing();
        this.cannons.leftCannonWing2 = this.addCannonWing();
        this.cannons.rightCannonWing2 = this.addCannonWing();
        this.cannons.topCannonWing2 = this.addCannonWing();
        this.cannons.bottomCannonWing2 = this.addCannonWing();

        this.designParts.leftCannonHolder = this.addSideCannonHolder(-3.239, -.224, -.477, -1);
        this.designParts.rightCannonHolder = this.addSideCannonHolder(3.239, -.224, -.477, 1);

        this.designParts.spike1 = this.addSpike(-1.694, 0.838, 2.467, 173 * (Math.PI / 180), -50 * (Math.PI / 180), 69 * (Math.PI / 180));
        this.designParts.spike2 = this.addSpike(-1, 0.875, 3.123, 172 * (Math.PI / 180), -66 * (Math.PI / 180), 67 * (Math.PI / 180));
        this.designParts.spike3 = this.addSpike(0, 0.895, 3.260, 108 * (Math.PI / 180), 90 * (Math.PI / 180), 0 * (Math.PI / 180));
        this.designParts.spike4 = this.addSpike(1, 0.875, 3.123, 172 * (Math.PI / 180), 66 * (Math.PI / 180), -67 * (Math.PI / 180));
        this.designParts.spike5 = this.addSpike(1.694, 0.838, 2.467, 173 * (Math.PI / 180), 50 * (Math.PI / 180), -69 * (Math.PI / 180));
    }

    addTriangle(x, y, z) {
        const geometry = new THREE.CylinderGeometry(1, 1, 1, 64);
        const materialArray = this.newMaterialArray(0xffffff);
        const mesh = new THREE.Mesh(geometry, materialArray[Constants.MESH_TYPE.default]);

        geometry.scale(.114, 1.698, .743);
        mesh.rotation.set(-34 * (Math.PI / 180), 0, 0);
        mesh.position.set(x, y, z);
        this.design.add(mesh);
        return { mesh, materialArray };
    }

    /**
     * Asa da nave
     * Recebe posição relativa à nave (x, y, z)
     * Recebe rotação em torno do eixo Y
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     * @param {number} rY
     * @returns {{THREE.Mesh, array}} mesh
     */
    addWing(x, y, z, rY) {
        const points = [];
        points.push(new THREE.Vector2(0, 2.34));
        points.push(new THREE.Vector2(3.82, -1.4));
        points.push(new THREE.Vector2(.06, -1.74));
        const geometry = new THREE.LatheGeometry(points, 20, 0, 2 * Math.PI);
        const materialArray = this.newMaterialArray(0x1f0000);
        const mesh = new THREE.Mesh(geometry, materialArray[Constants.MESH_TYPE.default]);

        geometry.scale(.343, .997, .085);
        mesh.rotation.set(rY * Math.PI / 2, 0, - Math.PI / (4 / 3));
        mesh.position.set(x, y, z);
        this.design.add(mesh);
        return { mesh, materialArray };
    }

    addBigWindow(x, y, z) {
        const geometry = new THREE.SphereGeometry(1, 64, 32);
        const materialArray = this.newMaterialArray(0xcd6666);
        const mesh = new THREE.Mesh(geometry, materialArray[Constants.MESH_TYPE.default]);

        geometry.scale(0.925, 0.273, 0.193);
        mesh.position.set(x, y, z);
        this.design.add(mesh);
        return { mesh, materialArray };
    }

    addSmallWindow(x, y, z) {
        const geometry = new THREE.SphereGeometry(1, 64, 32);
        const materialArray = this.newMaterialArray(0xcd6666);
        const mesh = new THREE.Mesh(geometry, materialArray[Constants.MESH_TYPE.default]);

        geometry.scale(.571, 0.272, .193);
        mesh.position.set(x, y, z);
        this.design.add(mesh);
        return { mesh, materialArray };
    }

    /**
     * Corpo da nave
     * Recebe posição relativa à nave (x, y, z)
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     * @returns {{THREE.Mesh, array}} mesh
     */
    addRearBody(x, y, z) {
        const geometry = new THREE.BoxGeometry(3.670, .534, 4.242);

        const materialArray = this.newMaterialArray(0x1f0000);
        const mesh = new THREE.Mesh(geometry, materialArray[Constants.MESH_TYPE.default]);

        mesh.position.set(x, y, z);
        this.design.add(mesh);
        return { mesh, materialArray };
    }

    /**
     * Corpo da nave
     * Recebe posição relativa à nave (x, y, z)
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     * @returns {{THREE.Mesh, array}} mesh
     */
    addBody(x, y, z) {
        const geometry = new THREE.SphereGeometry(1, 64, 32);
        const materialArray = this.newMaterialArray(0x1f0000);
        const mesh = new THREE.Mesh(geometry, materialArray[Constants.MESH_TYPE.default]);

        geometry.scale(1.920, 1.176, 3.007);
        mesh.position.set(x, y, z);
        this.design.add(mesh);
        return { mesh, materialArray };
    }


    addWingPipe(x, y, z) {
        const points = [];
        points.push(new THREE.Vector2(0.9, 1.74));
        points.push(new THREE.Vector2(.44, -4.32));
        points.push(new THREE.Vector2(0, -1.96));
        const geometry = new THREE.LatheGeometry(points, 21, Math.PI / 120, 2 * Math.PI);
        const materialArray = this.newMaterialArray(0x850000);
        const mesh = new THREE.Mesh(geometry, materialArray[Constants.MESH_TYPE.default]);

        geometry.scale(.987, .749, 1.021);
        mesh.rotation.set(-Math.PI / 2, 0, Math.PI);
        mesh.position.set(x, y, z);
        this.design.add(mesh);
        return { mesh, materialArray }
    }

    /**
     * Propulsor
     * Recebe posição relativa à nave (x, y, z)
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     * @returns {{THREE.Mesh, array}} mesh
     */
    addPropellant(x, y, z) {
        const points = [];
        points.push(new THREE.Vector2(.26, 3.46));
        points.push(new THREE.Vector2(.82, -2.36));
        points.push(new THREE.Vector2(.58, -4.96));
        const geometry = new THREE.LatheGeometry(points);
        const materialArray = this.newMaterialArray(0x666666);
        const mesh = new THREE.Mesh(geometry, materialArray[Constants.MESH_TYPE.default]);

        geometry.scale(.687, 0.285, .696);
        geometry.rotateX(-Math.PI / 2);
        mesh.position.set(x, y, z);
        this.design.add(mesh);
        return { mesh, materialArray };
    }

    addCannonHead(x, y, z) {
        const points = [];
        points.push(new THREE.Vector2(.34, .46));
        points.push(new THREE.Vector2(0, -.9));
        points.push(new THREE.Vector2(.26, -.26));
        const geometry = new THREE.LatheGeometry(points);
        const materialArray = this.newMaterialArray(0x34ad00);
        const mesh = new THREE.Mesh(geometry, materialArray[Constants.MESH_TYPE.default]);

        geometry.scale(1.071, 1.394, 1.071);
        geometry.rotateX(-Math.PI / 2);
        mesh.position.set(x, y, z);
        this.design.add(mesh);
        return { mesh, materialArray };
    }

    addCannonPipe(x, y, z) {
        const geometry = new THREE.CylinderGeometry(1, 1, 1, 64);
        const materialArray = this.newMaterialArray(0xffffff);
        const mesh = new THREE.Mesh(geometry, materialArray[Constants.MESH_TYPE.default]);

        geometry.scale(.240, 2.708, .240);
        geometry.rotateX(Math.PI / 2)
        mesh.position.set(x, y, z);
        this.design.add(mesh);
        return {mesh, materialArray};
    }

    addSideCannonHolder(x, y, z, rZ) {
        const geometry = new THREE.CylinderGeometry(1, 1, 1, 64);
        const materialArray = this.newMaterialArray(0x34ad00);
        const mesh = new THREE.Mesh(geometry, materialArray[Constants.MESH_TYPE.default]);

        geometry.scale(.151, 1.245, .151);
        mesh.position.set(x, y, z);
        mesh.rotation.set(0, 0, rZ * Math.PI / 1.5);
        this.design.add(mesh);
        return {mesh, materialArray};
    }

    addSpike(x, y, z, rX, rY, rZ) {
        const geometry = new THREE.CylinderGeometry(1, 1, 1, 64);
        const materialArray = this.newMaterialArray(0xffffff);
        const mesh = new THREE.Mesh(geometry, materialArray[Constants.MESH_TYPE.default]);

        geometry.scale(.114, 1.484, .348);
        mesh.position.set(x, y, z);
        mesh.rotation.set(rX, rY, rZ);
        this.design.add(mesh);
        return {mesh, materialArray};
    }

    addTail(x, y, z) {
        const points = [];
        points.push(new THREE.Vector2(.7, -.32));
        points.push(new THREE.Vector2(.4, .32));
        points.push(new THREE.Vector2(0, -.5));
        const geometry = new THREE.LatheGeometry(points);
        const materialArray = this.newMaterialArray(0x2c9400);
        const mesh = new THREE.Mesh(geometry, materialArray[Constants.MESH_TYPE.default]);

        geometry.scale(2.703, 2.514, 1.123);
        geometry.rotateX(-Math.PI / 2);
        mesh.position.set(x, y, z);
        this.design.add(mesh);
        return { mesh, materialArray };
    }

    addCannonWing(x = 0, y = 0, z = 0) {

    }

    addBigCannon(x, y, z) {
        
    }
}