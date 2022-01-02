class SpaceshipPart extends StarBlastObject {
    constructor(position, rotation, mesh, materialArray) {
        super(position.x, position.y, position.z);
        this.mesh = mesh;
        this.materialArray = materialArray;
        this.design.add(mesh);
        this.design.rotation.copy(rotation);
        this.mass = .5;
    }

    move() {
        if (Constants.vectorLength(this.speed) == 0) {
            this.speed.set(
                Constants.randomNumber(-2000, 2000) / 1000,
                Constants.randomNumber(-2000, 2000) / 1000,
                Constants.randomNumber(-2000, 2000) / 1000
            );
        } else {
            this.design.position.add(this.speed);
            this.speed.y -= Constants.GRAVITY;
        }
    }
}