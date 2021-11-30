/**
 * 
 * Grupo 2:
 * -Andreia de Brito
 * -Hélder da Costa
 *- Miguel Gamboa
 * 
 */
function createSpaceship(x, y, z) {
    playerSpaceship = new THREE.Object3D();
    playerSpaceship.userData = { moving: true, step: 0, tiltLeft: 0, tiltRight: 0 };

    addCockpit(playerSpaceship, 0, .774, 1.467);
    addBody(playerSpaceship, 0, 0, 0);
    addWing(playerSpaceship, -2.911, 0, 0.333, -Math.PI / 12);
    addWing(playerSpaceship, 2.911, 0, 0.333, Math.PI / 12);
    addBigPropellant(playerSpaceship, 0, 0, 6.776);
    addSmallPropellant(playerSpaceship, -1.246, 0, 6.776);
    addSmallPropellant(playerSpaceship, 1.246, 0, 6.776);
    scene.add(playerSpaceship);
    playerSpaceship.position.x = x;
    playerSpaceship.position.y = y;
    playerSpaceship.position.z = z;
    return playerSpaceship;
}

function addCockpit(obj, x, y, z) {
    const geometry = new THREE.SphereGeometry(1, 64, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0x00e3e6 });
    const mesh = new THREE.Mesh(geometry, material);

    geometry.scale(2.839, 0.837, 1.381);
    geometry.rotateY(-Math.PI / 2);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addBody(obj, x, y, z) {
    const geometry = new THREE.SphereGeometry(1, 64, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0x214f4f });
    const mesh = new THREE.Mesh(geometry, material);

    geometry.scale(7.894, 1.042, 3.524);
    geometry.rotateY(-Math.PI / 2);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addWing(obj, x, y, z, rY) {
    const geometry = new THREE.SphereGeometry(1, 64, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0x214f4f });
    const mesh = new THREE.Mesh(geometry, material);

    geometry.scale(1.729, 0.522, 8.096);
    geometry.rotateY(rY);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addBigPropellant(obj, x, y, z) {
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
    obj.add(mesh);
}

function addSmallPropellant(obj, x, y, z) {
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
    obj.add(mesh);
}

function createEnemy(x, y, z) {
    var enemySpaceship = new THREE.Object3D();
    enemySpaceship.userData = { moving: true, step: 0 };
    addEnemyWing(enemySpaceship, -1.805, -0.013, 3.062, 1.1772245805);
    addEnemyWing(enemySpaceship, 1.805, -.013, 3.062, -1.1772245805);
    addCannon(enemySpaceship, -2.422, -0.112, 2.793);
    addCannon(enemySpaceship, 2.422, -0.112, 2.793);
    addCannonBall(enemySpaceship, -2.425, -.104, 1.405);
    addCannonBall(enemySpaceship, 2.425, -.104, 1.405);
    addTriangle(enemySpaceship, 0, .641, 3.423);
    addEnemyBody(enemySpaceship, -.2, 0, 0, Math.PI / 2, -3.10319541);
    addEnemyBody(enemySpaceship, .2, 0, 0, -Math.PI / 2, 0.038397243544);
    addEnemyCockpit(enemySpaceship, 0, .227, -1.698);
    addEnemyPropellant(enemySpaceship, -.515, .006, 5);
    addEnemyPropellant(enemySpaceship, .515, .006, 5);
    scene.add(enemySpaceship);
    enemySpaceship.rotation.y = Math.PI;
    enemySpaceship.position.x = x;
    enemySpaceship.position.y = y;
    enemySpaceship.position.z = z;

    return enemySpaceship;
}

function addEnemyWing(obj, x, y, z, rZ) {
    const points = [];
    points.push(new THREE.Vector2(0, 2.34));
    points.push(new THREE.Vector2(3.82, -1.4));
    points.push(new THREE.Vector2(.06, -1.74));
    const geometry = new THREE.LatheGeometry(points);
    const material = new THREE.MeshBasicMaterial({ color: 0x850000 });
    const mesh = new THREE.Mesh(geometry, material);

    geometry.scale(.553, 0.997, .052);

    mesh.position.set(x, y, z);
    mesh.rotation.set(1.5730652548, -0.028797932658, rZ);
    obj.add(mesh);
}

function addCannon(obj, x, y, z) {
    const geometry = new THREE.CylinderGeometry(1, 1, 1, 64);
    const material = new THREE.MeshBasicMaterial({ color: 0x750000 });
    const mesh = new THREE.Mesh(geometry, material);

    geometry.scale(.3, 2.741, .3);
    geometry.rotateX(Math.PI / 2)
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addCannonBall(obj, x, y, z) {
    const geometry = new THREE.SphereGeometry(1, 64, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0x0c0c0d });
    const mesh = new THREE.Mesh(geometry, material);

    geometry.scale(.23, .236, .359);
    geometry.rotateX(Math.PI);
    geometry.rotateY(0.019547687622);
    geometry.rotateZ(-Math.PI);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addTriangle(obj, x, y, z) {
    const points = [];
    points.push(new THREE.Vector2(0, 2.34));
    points.push(new THREE.Vector2(3.82, -1.4));
    points.push(new THREE.Vector2(.06, -1.74));
    const geometry = new THREE.LatheGeometry(points);
    const material = new THREE.MeshBasicMaterial({ color: 0x201313 });
    const mesh = new THREE.Mesh(geometry, material);

    geometry.scale(.192, 0.348, .067);

    mesh.position.set(x, y, z);
    mesh.rotation.set(-1.712517062, -1.554390231, -2.106088808);
    obj.add(mesh);
}

function addEnemyBody(obj, x, y, z, rX, rZ) {
    const points = [];
    points.push(new THREE.Vector2(0, 1.74));
    points.push(new THREE.Vector2(.92, -1.4));
    points.push(new THREE.Vector2(0, -1.96));
    const geometry = new THREE.LatheGeometry(points);
    const material = new THREE.MeshBasicMaterial({ color: 0x850000 });
    const mesh = new THREE.Mesh(geometry, material);

    geometry.scale(2.020, 3.021, .62);
    mesh.position.set(x, y, z);
    mesh.rotation.set(rX, 0, rZ);
    obj.add(mesh);
}

function addEnemyCockpit(obj, x, y, z) {
    const geometry = new THREE.SphereGeometry(1, 64, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0x0c0c0d });
    const mesh = new THREE.Mesh(geometry, material);

    geometry.scale(.6, 0.124, 1.487);
    mesh.position.set(x, y, z);
    mesh.rotation.set(3.0930725004, 0.019547687622, -Math.PI);
    obj.add(mesh);
}

function addEnemyPropellant(obj, x, y, z) {
    const points = [];
    points.push(new THREE.Vector2(.26, 3.46));
    points.push(new THREE.Vector2(.82, -2.36));
    points.push(new THREE.Vector2(.58, -4.96));
    const geometry = new THREE.LatheGeometry(points);
    const material = new THREE.MeshBasicMaterial({ color: 0x750000 });
    const mesh = new THREE.Mesh(geometry, material);

    geometry.scale(.5, .317, .5);
    geometry.rotateX(-Math.PI / 2);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}