/**
 * Classe que representa o desenho da nave.
 */

class EnemySpaceshipDesign extends Spaceship {
    /**
     * Inicializa nave na posição (x, y, z) e as configurações iniciais
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     */
    
    constructor(x, y, z) {
        super(x, y, z);
        this.initialDesign();
        // Gira em relação à cena
        this.design.rotation.y = Math.PI;
    }

    initialDesign() {

        /*
            HACK: Tem de haver naves diferentes, as cores são usadas enquanto não há
        */
        var colors = [0x75e30d, 0x850000];
        //console.log(this.colors);
        this.cor = colors[Constants.randomNumber(0, 1)];


        this.leftCannon = this.addCannon(-2.422, -0.112, 2.793);
        this.rightCannon = this.addCannon(2.422, -0.112, 2.793);

        this.leftWing = this.addWing(-1.805, -0.013, 3.062, 1.1772245805);
        this.rightWing = this.addWing(1.805, -.013, 3.062, -1.1772245805);
        
        this.leftCannonBall = this.addCannonBall(-2.425, -.104, 1.405);
        this.rightCannonBall = this.addCannonBall(2.425, -.104, 1.405);

        this.triangle = this.addTriangle(0, .641, 3.423);

        this.leftBody = this.addBody(-.2, 0, 0, Math.PI / 2, -3.10319541);
        this.rightBody = this.addBody(.2, 0, 0, -Math.PI / 2, 0.038397243544);

        this.cockpit = this.addCockpit(0, .227, -1.698);

        this.leftPropellant = this.addPropellant(-.515, .006, 5);
        this.rightPropellant = this.addPropellant(.515, .006, 5);
    }
    
    addWing(x, y, z, rZ) {
        const points = [];
        points.push(new THREE.Vector2(0, 2.34));
        points.push(new THREE.Vector2(3.82, -1.4));
        points.push(new THREE.Vector2(.06, -1.74));
        const geometry = new THREE.LatheGeometry(points);
        const material = new THREE.MeshBasicMaterial({ color: this.cor });
        const mesh = new THREE.Mesh(geometry, material);
    
        geometry.scale(.553, 0.997, .052);
    
        mesh.position.set(x, y, z);
        mesh.rotation.set(1.5730652548, -0.028797932658, rZ);
        this.design.add(mesh);
        return mesh;
    }
    
    addCannon(x, y, z) {
        const geometry = new THREE.CylinderGeometry(1, 1, 1, 64);
        const material = new THREE.MeshBasicMaterial(
            { color: Constants.COLORS.enemySpaceship.secondary }
        );
        const mesh = new THREE.Mesh(geometry, material);
    
        geometry.scale(.3, 2.741, .3);
        geometry.rotateX(Math.PI / 2)
        mesh.position.set(x, y, z);
        this.design.add(mesh);
        return mesh;
    }
    
    addCannonBall(x, y, z) {
        const geometry = new THREE.SphereGeometry(1, 64, 32);
        const material = new THREE.MeshBasicMaterial(
            { color: Constants.COLORS.enemySpaceship.third }
        );
        const mesh = new THREE.Mesh(geometry, material);
    
        geometry.scale(.23, .236, .359);
        geometry.rotateX(Math.PI);
        geometry.rotateY(0.019547687622);
        geometry.rotateZ(-Math.PI);
        mesh.position.set(x, y, z);
        this.design.add(mesh);
        return mesh;
    }
    
    addTriangle(x, y, z) {
        const points = [];
        points.push(new THREE.Vector2(0, 2.34));
        points.push(new THREE.Vector2(3.82, -1.4));
        points.push(new THREE.Vector2(.06, -1.74));
        const geometry = new THREE.LatheGeometry(points);
        const material = new THREE.MeshBasicMaterial(
            { color: Constants.COLORS.enemySpaceship.fourth }
        );
        const mesh = new THREE.Mesh(geometry, material);
    
        geometry.scale(.192, 0.348, .067);
    
        mesh.position.set(x, y, z);
        mesh.rotation.set(-1.712517062, -1.554390231, -2.106088808);
        this.design.add(mesh);
        return mesh;
    }
    
    addBody(x, y, z, rX, rZ) {
        const points = [];
        points.push(new THREE.Vector2(0, 1.74));
        points.push(new THREE.Vector2(.92, -1.4));
        points.push(new THREE.Vector2(0, -1.96));
        const geometry = new THREE.LatheGeometry(points);
        const material = new THREE.MeshBasicMaterial({ color: this.cor });
        const mesh = new THREE.Mesh(geometry, material);
    
        geometry.scale(2.020, 3.021, .62);
        mesh.position.set(x, y, z);
        mesh.rotation.set(rX, 0, rZ);
        this.design.add(mesh);
        return mesh;
    }
    
    addCockpit(x, y, z) {
        const geometry = new THREE.SphereGeometry(1, 64, 32);
        const material = new THREE.MeshBasicMaterial(
            { color: Constants.COLORS.enemySpaceship.third }
        );
        const mesh = new THREE.Mesh(geometry, material);
    
        geometry.scale(.6, 0.124, 1.487);
        mesh.position.set(x, y, z);
        mesh.rotation.set(3.0930725004, 0.019547687622, -Math.PI);
        this.design.add(mesh);
        return mesh;
    }
    
    addPropellant(x, y, z) {
        const points = [];
        points.push(new THREE.Vector2(.26, 3.46));
        points.push(new THREE.Vector2(.82, -2.36));
        points.push(new THREE.Vector2(.58, -4.96));
        const geometry = new THREE.LatheGeometry(points);
        const material = new THREE.MeshBasicMaterial(
            { color: Constants.COLORS.enemySpaceship.secondary }
        );
        const mesh = new THREE.Mesh(geometry, material);
    
        geometry.scale(.5, .317, .5);
        geometry.rotateX(-Math.PI / 2);
        mesh.position.set(x, y, z);
        this.design.add(mesh);
        return mesh;
    }
}