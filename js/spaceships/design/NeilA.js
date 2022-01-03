class NeilA extends StarBlastObject {
     constructor() {
        super(0, 0, 0);
        this.cannons = {};
        this.designParts = {};
        this.design = new THREE.Object3D();
        this.defaultCannonColor = 0x111f22;
        this.mass = 1;
        this.init();
    }

    /**
     * Adicionar os componentes ao objecto principal (partes da nave)
     */
    init() {
        this.designParts.cannonLeft = this.addSideCannon(-5.318, -1.575, -0.607, Math.PI / 36);
        this.designParts.cannonRight = this.addSideCannon(5.318, -1.575, -0.607, -Math.PI / 36);
        this.designParts.cannonMiddle = this.addCentralCannon(0, -1.955, -.743);

        // Canhões usados para fazer os disparos
        this.cannons.right = new Cannon(this.designParts.cannonRight, Constants.BULLET_TYPE.missile);
        this.cannons.left = new Cannon(this.designParts.cannonLeft, Constants.BULLET_TYPE.missile);
        this.cannons.middle = new Cannon(this.designParts.cannonMiddle, Constants.BULLET_TYPE.cannonBall);

        this.designParts.leftCannonHolder = this.addSideCannonHolder(-4.224, -.752, 2.055, 1);
        this.designParts.rightCannonHolder = this.addSideCannonHolder(4.224, -.685, 2.055, -1);

        this.designParts.centralCannonRing = this.addCentralCannonRing(0, -1.565, 0);
        this.designParts.centralCannonHolder = this.addCentralCannonHolder(0, -.6, 0);

        this.designParts.leftSideCannonBigRing = this.addCannonBigRing(-5.351, -1.565, -1.543);
        this.designParts.leftSideCannonSmallRing = this.addCannonSmallRing(-5.351, -1.565, -0.652);
        this.designParts.rightSideCannonBigRing = this.addCannonBigRing(5.351, -1.565, -1.543);
        this.designParts.rightSideCannonSmallRing = this.addCannonSmallRing(5.351, -1.565, -0.652);

        this.designParts.cockpit = this.addCockpit(0, .774, 1.467);
        this.designParts.body = this.addBody(0, 0, 0);

        this.designParts.leftWing = this.addWing(-2.911, 0, 0.333, -Math.PI / 12);
        this.designParts.rightWing = this.addWing(2.911, 0, 0.333, Math.PI / 12);

        this.designParts.bigPropellant = this.addBigPropellant(0, 0, 6.776);
        this.designParts.leftSmallPropellant = this.addSmallPropellant(-1.246, 0, 6.776);
        this.designParts.rightSmallPropellant = this.addSmallPropellant(1.246, 0, 6.776);
    }

    /**
     * Canhão central
     * Recebe posição relativa à nave (x, y, z)
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     * @returns {{THREE.Mesh, array}} mesh
     */
     addCentralCannon(x, y, z) {
        const points = [];
        points.push(new THREE.Vector2(.48, .5));
        points.push(new THREE.Vector2(.92, -.82));
        points.push(new THREE.Vector2(0, -.42));
        const geometry = new THREE.LatheGeometry(points, 30, 0,  2 * Math.PI);
        const materialArray = this.newMaterialArray(0x3b4545);
        const mesh = new THREE.Mesh(geometry, materialArray[Constants.MESH_TYPE.default]);

        geometry.scale(.8, 2.189, .8);
        geometry.rotateX(-Math.PI / 2);
        mesh.position.set(x, y, z);
        this.design.add(mesh);
        return {mesh, materialArray};
    }

    /**
     * Canhão lateral
     * Recebe posição relativa à nave (x, y, z)
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     * @returns {{THREE.Mesh, array}} mesh
     */
     addSideCannon(x, y, z, rZ) {
        const points = [];
        points.push(new THREE.Vector2(.5, 1));
        points.push(new THREE.Vector2(.5, -.7));
        points.push(new THREE.Vector2(0, 0));
        const geometry = new THREE.LatheGeometry(points, 30, 0, 2 * Math.PI);
        const materialArray = this.newMaterialArray(0x111f22);
        const mesh = new THREE.Mesh(geometry, materialArray[Constants.MESH_TYPE.default]);

        geometry.scale(1, 4.59, 1);
        mesh.rotation.set(Math.PI / 2, 0, rZ);
        mesh.position.set(x, y, z);
        this.design.add(mesh);
        return {mesh, materialArray};
    }

    /**
     * Anel do canhão central
     * Recebe posição relativa à nave (x, y, z)
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     * @returns {{THREE.Mesh, array}} mesh
     */
     addCentralCannonRing(x, y, z) {
        const geometry = new THREE.CylinderGeometry(1, 1, 1, 64);
        const materialArray = this.newMaterialArray(0x00d5ff);
        const mesh = new THREE.Mesh(geometry, materialArray[Constants.MESH_TYPE.default]);

        geometry.scale(.71, .621, .71);
        mesh.position.set(x, y, z);
        mesh.rotation.set(Math.PI / 2, Math.PI / 2, 0);
        this.design.add(mesh);
        return {mesh, materialArray};
    }

    /**
     * Suporte do canhão lateral
     * Recebe posição relativa à nave (x, y, z)
     * Recebe rotação no eixo Y
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     * @param {number} rY
     * @returns {{THREE.Mesh, array}} mesh
     */
     addSideCannonHolder(x, y, z, rY) {
        const geometry = new THREE.CylinderGeometry(1, 1, 1, 64);
        const materialArray = this.newMaterialArray(0x00d5ff);
        const mesh = new THREE.Mesh(geometry, materialArray[Constants.MESH_TYPE.default]);

        geometry.scale(.3, 3.232, .3);
        mesh.position.set(x, y, z);
        mesh.rotation.set(Math.PI / 2, rY * Math.PI / 4.8, -Math.PI / 2);
        this.design.add(mesh);
        return {mesh, materialArray};
    }

    /**
     * Suporte do canhão central
     * Recebe posição relativa à nave (x, y, z)
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     * @returns {{THREE.Mesh, array}} mesh
     */
     addCentralCannonHolder(x, y, z) {
        const geometry = new THREE.CylinderGeometry(1, 1, 1, 64);
        const materialArray = this.newMaterialArray(0x00d5ff);
        const mesh = new THREE.Mesh(geometry, materialArray[Constants.MESH_TYPE.default]);

        geometry.scale(.165, 1.721, .163);
        geometry.rotateY(Math.PI / 2);
        mesh.position.set(x, y, z);
        this.design.add(mesh);
        return {mesh, materialArray};
    }

    /**
     * Cockpit
     * Recebe posição relativa à nave (x, y, z)
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     * @returns {{THREE.Mesh, array}} mesh
     */
     addCockpit(x, y, z) {
        const geometry = new THREE.SphereGeometry(1, 64, 32);
        const materialArray = this.newMaterialArray(0x00e3e6);
        const mesh = new THREE.Mesh(geometry, materialArray[Constants.MESH_TYPE.default]);

        for (let i = 0; i < materialArray.length; i++) {
            materialArray[i].transparent = true;
            materialArray[i].opacity = 0.5;
        }

        geometry.scale(2.839, 0.837, 1.381);
        geometry.rotateY(-Math.PI / 2);
        mesh.position.set(x, y, z);
        this.design.add(mesh);
        return {mesh, materialArray};
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
        const materialArray = this.newMaterialArray(0x214f4f);
        const mesh = new THREE.Mesh(geometry, materialArray[Constants.MESH_TYPE.default]);

        geometry.scale(7.894, 1.042, 3.524);
        geometry.rotateY(-Math.PI / 2);
        mesh.position.set(x, y, z);
        this.design.add(mesh);
        return {mesh, materialArray};
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
        const geometry = new THREE.SphereGeometry(1, 64, 32);
        const materialArray = this.newMaterialArray(0x214f4f);
        const mesh = new THREE.Mesh(geometry, materialArray[Constants.MESH_TYPE.default]);

        geometry.scale(1.729, 0.522, 8.096);
        geometry.rotateY(rY);
        mesh.position.set(x, y, z);
        this.design.add(mesh);
        return {mesh, materialArray};
    }

    /**
     * Propulsor maior
     * Recebe posição relativa à nave (x, y, z)
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     * @returns {{THREE.Mesh, array}} mesh
     */
     addBigPropellant(x, y, z) {
        const points = [];
        points.push(new THREE.Vector2(.26, .94));
        points.push(new THREE.Vector2(.82, -2.38));
        points.push(new THREE.Vector2(0, -1.96));
        const geometry = new THREE.LatheGeometry(points);
        const materialArray = this.newMaterialArray(0x00e3e6);
        const mesh = new THREE.Mesh(geometry, materialArray[Constants.MESH_TYPE.default]);

        geometry.scale(1, 0.609, 1);
        geometry.rotateX(-Math.PI / 2);
        mesh.position.set(x, y, z);
        this.design.add(mesh);
        return {mesh, materialArray};
    }

    /**
     * Propulsor menor
     * Recebe posição relativa à nave (x, y, z)
     * @param {number} x 
     * @param {number} y 
     * @param {number} z
     * @returns {{THREE.Mesh, array}} mesh
     */
     addSmallPropellant(x, y, z) {
        const points = [];
        points.push(new THREE.Vector2(.26, .94));
        points.push(new THREE.Vector2(.82, -2.38));
        points.push(new THREE.Vector2(0, -1.96));
        const geometry = new THREE.LatheGeometry(points);
        const materialArray = this.newMaterialArray(0x00e3e6);
        const mesh = new THREE.Mesh(geometry, materialArray[Constants.MESH_TYPE.default]);

        geometry.scale(.5, 0.519, .5);
        geometry.rotateX(-Math.PI / 2);
        mesh.position.set(x, y, z);
        this.design.add(mesh);
        return {mesh, materialArray};
    }

    addCannonBigRing(x, y, z) {
        const geometry = new THREE.CylinderGeometry(1, 1, 1, 64);
        const materialArray = this.newMaterialArray(0x00e3e6);
        const mesh = new THREE.Mesh(geometry, materialArray[Constants.MESH_TYPE.default]);

        geometry.scale(.71, .621, .71);
        mesh.position.set(x, y, z);
        mesh.rotation.set(Math.PI / 2, Math.PI / 2, 0);
        this.design.add(mesh);
        return { mesh, materialArray };
    }

    addCannonSmallRing(x, y, z) {
        const geometry = new THREE.CylinderGeometry(1, 1, 1, 64);
        const materialArray = this.newMaterialArray(0x00e3e6);
        const mesh = new THREE.Mesh(geometry, materialArray[Constants.MESH_TYPE.default]);

        geometry.scale(.55, .621, .55);
        mesh.position.set(x, y, z);
        mesh.rotation.set(Math.PI / 2, Math.PI / 2, 0);
        this.design.add(mesh);
        return { mesh, materialArray };
    }
}