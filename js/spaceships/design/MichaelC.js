class MichaelC extends StarBlastObject {
    constructor() {
        super(0, 0, 0);
        this.cannons = {};
        this.designParts = {};
        this.design = new THREE.Object3D();
        this.defaultCannonColor = 0x111f22;

        this.mass = 100;
        this.init();

        const SCALE_CONSTANT = 2;
        this.design.scale.x = SCALE_CONSTANT;
        this.design.scale.y = SCALE_CONSTANT;
        this.design.scale.z = SCALE_CONSTANT;
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

        this.designParts.leftBigCannon = this.addBigCannon(2.889, 1.328, -2.514);
        this.designParts.rightBigCannon = this.addBigCannon(-2.889, 1.328, -2.514);

        this.cannons.right = new Cannon(this.designParts.rightCannonPipe, Constants.BULLET_TYPE.missile);
        this.cannons.left = new Cannon(this.designParts.leftCannonPipe, Constants.BULLET_TYPE.missile);

        this.cannons.bigLeft = new Cannon(this.designParts.leftBigCannon, Constants.BULLET_TYPE.missile);
        this.cannons.bigRight = new Cannon(this.designParts.rightBigCannon, Constants.BULLET_TYPE.missile);

        this.designParts.leftCannonWing1 = this.addCannonWing(-2.378, 1.451, -3.031, 0, Math.PI / 4.5, Math.PI / 2);
        this.designParts.rightCannonWing1 = this.addCannonWing(-3.401, 1.451, -3.031, 0, - Math.PI / 4.5, Math.PI / 2);
        this.designParts.topCannonWing1 = this.addCannonWing(-2.903, 1.897, -3.031, Math.PI / 4.5, 0, 0);
        this.designParts.bottomCannonWing1 = this.addCannonWing(-2.890, 0.809, -3.031, Math.PI / 4.5, 0, Math.PI);
        
        this.designParts.leftCannonWing2 = this.addCannonWing(2.378, 1.451, -3.031, 0, Math.PI / 4.5, Math.PI / 2);
        this.designParts.rightCannonWing2 = this.addCannonWing(3.401, 1.451, -3.031, 0, - Math.PI / 4.5, Math.PI / 2);
        this.designParts.topCannonWing2 = this.addCannonWing(2.903, 1.897, -3.031, Math.PI / 4.5, 0, 0);
        this.designParts.bottomCannonWing2 = this.addCannonWing(2.890, 0.809, -3.031, Math.PI / 4.5, 0, Math.PI);

        this.designParts.leftCannonHolder = this.addSideCannonHolder(-3.239, -.224, -.477, -1);
        this.designParts.rightCannonHolder = this.addSideCannonHolder(3.239, -.224, -.477, 1);

        this.designParts.leftBigCannonHolder = this.addBigCanonHolder(2.264, .738, -1.836, -1);
        this.designParts.rightBigCannonHolder = this.addBigCanonHolder(-2.264, .738, -1.836, 1);

        this.designParts.spike1 = this.addSpike(-1.694, 0.838, 2.467, 173 * (Math.PI / 180), -50 * (Math.PI / 180), 69 * (Math.PI / 180));
        this.designParts.spike2 = this.addSpike(-1, 0.875, 3.123, 172 * (Math.PI / 180), -66 * (Math.PI / 180), 67 * (Math.PI / 180));
        this.designParts.spike3 = this.addSpike(0, 0.895, 3.260, 108 * (Math.PI / 180), 90 * (Math.PI / 180), 0 * (Math.PI / 180));
        this.designParts.spike4 = this.addSpike(1, 0.875, 3.123, 172 * (Math.PI / 180), 66 * (Math.PI / 180), -67 * (Math.PI / 180));
        this.designParts.spike5 = this.addSpike(1.694, 0.838, 2.467, 173 * (Math.PI / 180), 50 * (Math.PI / 180), -69 * (Math.PI / 180));
    
        this.designParts.machineGunCannonTop = this.addMachineGunCannon(0, -2.292, .724);
        this.designParts.machineGunCannonBottom = this.addMachineGunCannon(0, -3.194, .724);
        this.designParts.machineGunCannonLeft = this.addMachineGunCannon(.46, -2.774, .724);
        this.designParts.machineGunCannonRight = this.addMachineGunCannon( -.46, -2.774, .724,);

        this.cannons.machineLeft = new Cannon(this.designParts.machineGunCannonLeft, Constants.BULLET_TYPE.cannonBall);
        this.cannons.machineRight = new Cannon(this.designParts.machineGunCannonRight, Constants.BULLET_TYPE.cannonBall);
        this.cannons.machineTop = new Cannon(this.designParts.machineGunCannonTop, Constants.BULLET_TYPE.cannonBall);
        this.cannons.machineBottom = new Cannon(this.designParts.machineGunCannonBottom, Constants.BULLET_TYPE.cannonBall);

        this.designParts.topBody = this.addTopBody(0, 0.719, -0.153);
        this.designParts.body = this.addBody(0, 0, 0);

        this.designParts.machineGun = this.addMachineGun(0, -2.770, .599);

        this.designParts.verticalStick = this.addVerticalStick(0, -1.980, -.477);
        this.designParts.verticalStick = this.addHorizontalStick(0, -2.774, 0.045);
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

    addCannonWing(x, y, z, rX, rY, rZ) {
        const geometry = new THREE.CylinderGeometry(1, 1, 1, 64);
        const materialArray = this.newMaterialArray(0xffffff);
        const mesh = new THREE.Mesh(geometry, materialArray[Constants.MESH_TYPE.default]);

        geometry.scale(.114, 1, .426);
        mesh.position.set(x, y, z);
        mesh.rotation.set(rX, rY, rZ);
        this.design.add(mesh);
        return {mesh, materialArray};
    }

    addBigCanonHolder(x, y, z, rZ) {
        const geometry = new THREE.CylinderGeometry(1, 1, 1, 64);
        const materialArray = this.newMaterialArray(0xffffff);
        const mesh = new THREE.Mesh(geometry, materialArray[Constants.MESH_TYPE.default]);

        geometry.scale(.151, 1.245, .151);
        mesh.position.set(x, y, z);
        mesh.rotation.set(-Math.PI / 9, -Math.PI / 18, rZ * Math.PI / 4.5);
        this.design.add(mesh);
        return {mesh, materialArray};
    }

    addBigCannon(x, y, z) {
        const points = [];
        points.push(new THREE.Vector2(.44, .5));
        points.push(new THREE.Vector2(.44, -.9));
        points.push(new THREE.Vector2(0, -.5));
        const geometry = new THREE.LatheGeometry(points);
        const materialArray = this.newMaterialArray(0x34ad00);
        const mesh = new THREE.Mesh(geometry, materialArray[Constants.MESH_TYPE.default]);

        geometry.scale(1.071, 1.394, 1.071);
        geometry.rotateX(-Math.PI / 2);
        mesh.position.set(x, y, z);
        this.design.add(mesh);
        return { mesh, materialArray };
    }

    addTopBody(x, y, z) {
        const geometry = new THREE.SphereGeometry(1, 64, 32);
        const materialArray = this.newMaterialArray(0x000000);
        const mesh = new THREE.Mesh(geometry, materialArray[Constants.MESH_TYPE.default]);

        geometry.scale(2.314, 1.398, 3.980);
        mesh.position.set(x, y, z);
        this.design.add(mesh);
        return {mesh, materialArray};
    }

    addVerticalStick(x, y, z) {
        const geometry = new THREE.CylinderGeometry(1, 1, 1, 64);
        const materialArray = this.newMaterialArray(0x34ad00);
        const mesh = new THREE.Mesh(geometry, materialArray[Constants.MESH_TYPE.default]);

        geometry.scale(.151, 1.737, .151);
        mesh.position.set(x, y, z);
        this.design.add(mesh);
        return {mesh, materialArray};
    }

    addHorizontalStick(x, y, z) {
        const geometry = new THREE.CylinderGeometry(1, 1, 1, 64);
        const materialArray = this.newMaterialArray(0x34ad00);
        const mesh = new THREE.Mesh(geometry, materialArray[Constants.MESH_TYPE.default]);

        geometry.scale(.151, 1.341, .151);
        mesh.rotateX(Math.PI / 2);
        mesh.position.set(x, y, z);
        this.design.add(mesh);
        return {mesh, materialArray};
    }

    addMachineGun(x, y, z) {
        const geometry = new THREE.CylinderGeometry(1, 1, 1, 64);
        const materialArray = this.newMaterialArray(0x34ad00);
        const mesh = new THREE.Mesh(geometry, materialArray[Constants.MESH_TYPE.default]);

        geometry.scale(.8, .335, .8);
        mesh.rotateX(Math.PI / 2);
        mesh.position.set(x, y, z);
        this.design.add(mesh);
        return {mesh, materialArray};
    }

    addMachineGunCannon(x, y, z) {
        const points = [];
        points.push(new THREE.Vector2(.44, -4.06));
        points.push(new THREE.Vector2(.5, -.9));
        points.push(new THREE.Vector2(0, -.5));
        const geometry = new THREE.LatheGeometry(points);
        const materialArray = this.newMaterialArray(0x000000);
        const mesh = new THREE.Mesh(geometry, materialArray[Constants.MESH_TYPE.default]);

        geometry.scale(.4, .079, .4);
        mesh.rotateX(-Math.PI / 2);
        mesh.position.set(x, y, z);
        this.design.add(mesh);
        return {mesh, materialArray};
    }

    addBody(x, y, z) {
        const geometry = new THREE.SphereGeometry(1, 64, 32);
        const materialArray = this.newMaterialArray(0x34ad00);
        const mesh = new THREE.Mesh(geometry, materialArray[Constants.MESH_TYPE.default]);

        geometry.scale(3.045, 1.315, 4.519);
        mesh.position.set(x, y, z);
        this.design.add(mesh);
        return {mesh, materialArray};
    }
}