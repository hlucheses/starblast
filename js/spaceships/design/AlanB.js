class AlanB extends StarBlastObject {
    constructor() {
        super(0, 0, 0);
        this.cannons = {};
        this.designParts = {};
        this.design = new THREE.Object3D();
        this.defaultCannonColor = 0x111f22;
        this.mass = 1;
        this.init();

        const SCALE_CONSTANT = 1.5;
        this.design.scale.x = SCALE_CONSTANT;
        this.design.scale.y = SCALE_CONSTANT;
        this.design.scale.z = SCALE_CONSTANT;
    }

    /**
     * Adicionar os componentes ao objecto principal (partes da nave)
     */
    init() {
        this.designParts.triangle = this.addTriangle(0, .534, 3.148);

        this.designParts.leftWing = this.addWing(-3.444, 0, 3.062, -1);
        this.designParts.rightWing = this.addWing(3.444, 0, 3.062, 1);

        this.designParts.bigWindow = this.addBigWindow(0.024, 0.932, -1.302);
        this.designParts.smallWindow = this.addSmallWindow(0.024, .757, -2);

        this.designParts.rearBody = this.addRearBody(0, 0, 1.595);
        this.designParts.body = this.addBody(0, 0.073, 0.023);

        this.designParts.leftWingPipe = this.addWingPipe(-2.299, -.104, 3.423);
        this.designParts.RightWingPipe = this.addWingPipe(2.299, -.104, 3.423);

        this.cannons.right = new Cannon(this.designParts.RightWingPipe, Constants.BULLET_TYPE.missile);
        this.cannons.left = new Cannon(this.designParts.leftWingPipe, Constants.BULLET_TYPE.missile);

        this.designParts.leftPropellant = this.addPropellant(-.656, 0, 4.485);
        this.designParts.rightPropellant = this.addPropellant(.656, 0, 4.485);
    }

    addTriangle(x, y, z) {
        const points = [];
        points.push(new THREE.Vector2(0, 2.34));
        points.push(new THREE.Vector2(3.82, -1.4));
        points.push(new THREE.Vector2(.06, -1.74));
        const geometry = new THREE.LatheGeometry(points, 20, 0, 2 * Math.PI);
        const materialArray = this.newMaterialArray(0x666666);
        const mesh = new THREE.Mesh(geometry, materialArray[Constants.MESH_TYPE.default]);

        geometry.scale(.355, .604, .067);
        mesh.rotation.set(-Math.PI / 2, -Math.PI / 2, - Math.PI / 1.5);
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
}