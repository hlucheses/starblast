class Spotlight extends SpotlightDesign {
    constructor(x, y, z, rY) {
        super(x, y, z, rY);
    }

    static createLight(angle){
        const distance = 800;
        const penumbra = 0.5;
        const decay = 1.0;

        const light = new THREE.SpotLight(0xffffff, 0, distance, angle, penumbra, decay);
        
        return light;
    }
}