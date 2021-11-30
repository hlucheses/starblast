/**
 * 
 * Grupo 2:
 * -Andreia de Brito
 * -Hélder da Costa
 *- Miguel Gamboa
 * 
 */
var cameras = createCameras();
var keyStates = {};
var scene, renderer, clock, rotationSpeed;
var playerSpaceship, arrEnemySpaceship = [];
var playerVelocity, playerDirection;
var requestID;
var stepBullet = 0;


function render() {
    renderer.render(scene, cameras.current);
}

function init() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    document.addEventListener('keydown', (event) => {
        keyStates[event.code] = true;
        onKeyDown();
    });

    document.addEventListener('keyup', (event) => {
        keyStates[event.code] = false;
    });

    window.addEventListener("resize", onResize);

    clock = new THREE.Clock();

    playerVelocity = new THREE.Vector3();
    playerDirection = new THREE.Vector3();

    createScene();
    render();
}


function onResize() {
    'use strict'
    renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerHeight > 0 && window.innerWidth > 0) {

        cameras.current.aspect = renderer.getSize().width / renderer.getSize().height;
        cameras.current.updateProjectionMatrix();
    }
}

function onKeyDown() {
    if (keyStates['Digit1']) {
        stopAnimation();
        cameras.current = cameras.top;
        render();
    } else if (keyStates['Digit2']) {
        stopAnimation();
        cameras.current = cameras.side;
        render();
    } else if (keyStates['Digit3']) {
        stopAnimation();
        cameras.current = cameras.front;
        render();
    } else if (keyStates['Digit4']) {

        scene.traverse(function(node) {

            if (node instanceof THREE.Mesh) {
                node.material.wireframe = !node.material.wireframe;
            }
        });
        render();
    } else if (keyStates['Digit5']) {
        cameras.current = cameras.dynamic;
        render();
        animateCamera();

    } else if (keyStates["Space"]) {

        var bullet = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 8), new THREE.MeshBasicMaterial({ color: "black" }));
        bullet.position.set(playerSpaceship.position.x,
            playerSpaceship.position.y,
            playerSpaceship.position.z);
        bullet.position.x -= stepBullet;
        bullet.alive = true;
        setTimeout(function() {
            bullet.alive = false;
            scene.remove(bullet)
        }, 1000);
        scene.add(bullet);


    }
}

function animateCamera() {
    render();
    requestAnimationFrame(animateCamera);
    camera_rotation();
}

function animate() {
    const STEPS_PER_FRAME = .1;
    const deltaTime = Math.min(0.05, clock.getDelta()) / STEPS_PER_FRAME;

    for (let i = 0; i < STEPS_PER_FRAME; i++) {
        controls(deltaTime);
        updatePlayer(deltaTime);
    }

    var increment = 0.025;

    for (var i = 0; i < arrEnemySpaceship.length; i++) {
        if (arrEnemySpaceship[i].userData.moving) {

            arrEnemySpaceship[i].userData.step += increment;
            arrEnemySpaceship[i].position.x += 1 * (Math.cos(arrEnemySpaceship[i].userData.step));
            //arrEnemySpaceship[i].rotation.z = (Math.PI / 8) * arrEnemySpaceship[i].position.x;
        }
    }


    playerSpaceship.userData.step += increment;
    playerSpaceship.position.y = .5 * (Math.cos(playerSpaceship.userData.step));

    rotationSpeed = .002;
    render();
    requestAnimationFrame(animate);

}

function createScene() {
    scene = new THREE.Scene();
    scene.add(new THREE.AxesHelper(40));
    createCenario();
    createSpaceship(0, 0, 80);


    arrEnemySpaceship.push(createEnemy(0, 0, -60));
    arrEnemySpaceship.push(createEnemy(40, 0, -30));
    arrEnemySpaceship.push(createEnemy(-40, 0, -30));
    arrEnemySpaceship.push(createEnemy(80, 0, -60));
    arrEnemySpaceship.push(createEnemy(-80, 0, -60));
    arrEnemySpaceship.push(createEnemy(-120, 0, -30));
    arrEnemySpaceship.push(createEnemy(120, 0, -30));


}

function camera_rotation() {

    var x = cameras.current.position.x,
        y = cameras.current.position.y,
        z = cameras.current.position.z;


    cameras.current.position.x = x * Math.cos(rotationSpeed) + z * Math.sin(rotationSpeed);
    cameras.current.position.z = z * Math.cos(rotationSpeed) - x * Math.sin(rotationSpeed);

    cameras.current.lookAt(scene.position);

}

function stopAnimation() {
    cancelAnimationFrame(requestID);
}

function animateCamera() {
    render();
    requestID = requestAnimationFrame(animateCamera);
    camera_rotation();
}