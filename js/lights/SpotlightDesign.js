class SpotlightDesign {
    /**
     * Inicializa o spotlight (x, y, z) e as configurações iniciais
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     */

    static LIGHT;
    constructor(x, y, z, rY) {
        this.design = new THREE.Object3D();
        
        this.initialDesign();
        this.design.rotation.z = Math.PI / 1.9;
        this.design.rotation.y = rY;

        const SCALE_CONSTANT = 1.2;
        this.design.scale.x = SCALE_CONSTANT;
        this.design.scale.y = SCALE_CONSTANT;
        this.design.scale.z = SCALE_CONSTANT;

        this.light = this.createLight(x, y, z, rY);
        this.design.add(this.light);

        this.setStartPosition(x, y, z);
    }

    /**
     * Adicionar os componentes ao objecto principal (partes do Spotlight)
     */
    initialDesign() {
        this.body = this.addBody(0, 0, 0);
        this.bulb = this.addBulb(0, 3, 0);
    }

    addBody(x, y, z) {
        const points = [];
        for (let i = 0; i < 10; i++) {
            points.push(new THREE.Vector2(Math.sin(i * 0.2) * 10 + 5, (i - 5) * 2));
        }
        const geometry = new THREE.LatheGeometry(points);
        const material = new THREE.MeshPhongMaterial({ color: 0x888888});
        const mesh = new THREE.Mesh(geometry, material);

        geometry.scale(.5, .5, .5);
        mesh.position.set(x, y, z);
        this.design.add(mesh);
        return mesh;
    }

    addBulb(x, y, z) {
        const geometry = new THREE.SphereGeometry(1.5, 64, 64);
        const material = new THREE.MeshPhongMaterial({ color: 0xeeeeee,
            transparent: true,
           opacity: 1});
        const mesh = new THREE.Mesh(geometry, material);
        geometry.scale(3, 3, 3);
        mesh.position.set(x, y, z);
        this.design.add(mesh);
        return mesh;
    }
    

    setStartPosition(x, y, z) {
        this.design.position.x = x;
        this.design.position.y = y;
        this.design.position.z = z;
    }

    createLight(x, y, z, angle){
        const distance = 800;
        const penumbra = 0.5;
        const decay = 1.0;

        const light = new THREE.SpotLight(0xffffff, 0, distance, Math.PI, penumbra, decay);
        light.position.set(x, y, z);
        light.rotation.set(0, 16, 0);
        
        return light;
    }
}