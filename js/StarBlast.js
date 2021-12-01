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
const limiteHorizontal = 89;
var scene, renderer, clock, rotationSpeed;
var playerSpaceship, arrEnemySpaceship = [];
var playerVelocity, playerDirection;
var requestID, jump = 0;
var bullets = [];
var bulletsEnemy = [];
var enemyBoxes = [];
var bulletsBoxes = [];
var bulletsBoxesHelpers = [];
var stepBullet = 2;
var legenda = document.getElementById("info");
var bulletMax;
var opcao = { esquerda: false, meio: false, direita: false };


function render() {
    renderer.render(scene, cameras.current);
}

function createBoxes(){
    for (var i = 0; i < arrEnemySpaceship.length; i++){
        var aabb = new THREE.Box3();
        enemyBoxes.push(aabb);
           
    }
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
    createBoxes();
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


/*q: canhão da esquerda
  w: canhão do meio
  e: canhao da direita
*/
function onKeyDown() {
    if (keyStates['Digit1']) {
        stopAnimation();
        cameras.current = cameras.top;
        render();
    } else if (keyStates['Digit2']) {
        stopAnimation();
        cameras.current = cameras.front;
        render();
    } else if (keyStates['Digit3']) {
        stopAnimation();
        cameras.current = cameras.bulletCam;
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

    } else if (keyStates["KeyQ"]) {
        opcao.esquerda = true;
        opcao.meio = false;
        opcao.direita = false;
        changeCentralCannonRingColor(0x00d5ff);
        changeLeftCannonHolderColor(0x00d5ff);
        changeRightCannonHolderColor(0xfc0fc0);


    } else if (keyStates["KeyW"]) {
        opcao.esquerda = false;
        opcao.meio = true;
        opcao.direita = false;
        changeCentralCannonRingColor(0xfc0fc0);
        changeLeftCannonHolderColor(0x00d5ff);
        changeRightCannonHolderColor(0x00d5ff);


    } else if (keyStates["KeyE"]) {
        opcao.esquerda = false;
        opcao.meio = false;
        opcao.direita = true;
        changeCentralCannonRingColor(0x00d5ff);
        changeLeftCannonHolderColor(0xfc0fc0);
        changeRightCannonHolderColor(0x00d5ff);
    

    } else if (keyStates["Space"]) {
        if (opcao.esquerda == true) {
            disparar(playerSpaceship.position.x -  5.355, playerSpaceship.position.y - 1.574);
        } else if (opcao.meio == true) {
            disparar(playerSpaceship.position.x, playerSpaceship.position.y - 1.574);
        } else if (opcao.direita == true) {
            disparar(playerSpaceship.position.x + 5.355, playerSpaceship.position.y - 1.574);
        }

    }
}

function adicionarLegenda(legenda) {
    switch (legenda) {
        case "KeyQ":
            {
                legenda.innerText = "Canhão Esquerdo Activo";
                break;
            }
        case "KeyW":
            {
                legenda.innerText = "Canhão Central Activo";
                break;
            }
        case "KeyE":
            {
                legenda.innerText = "Canhão Direito Activo";
                break;
            }
    }
}

function disparar(x, y) {

    var bullet = {colidiu: false, time_alive: 180};
    bullet  = new THREE.Mesh(new THREE.SphereGeometry(0.7, 64, 64), new THREE.MeshBasicMaterial({ color: "#d3d3d3" }));
    bullet.position.set(playerSpaceship.position.x,
        playerSpaceship.position.y,
        playerSpaceship.position.z);
    bullet.position.x = x;
    bullet.position.y = y;
    bullets.push(bullet);

    var aabb = new THREE.Box3();
    bulletsBoxes.push(aabb);
    
    bullet.velocity = new THREE.Vector3(-Math.sin(cameras.current.rotation.y),
        0,
        Math.sin(cameras.current.rotation.y)
    );

                
    scene.add(bullet);
}

function enemyBulltes() {
    for (var i = 0; i < arrEnemySpaceship.length; i++) {
        var bullet = new THREE.Mesh(new THREE.SphereGeometry(0.7, 74, 74), new THREE.MeshBasicMaterial({ color: "#d3d3d3" }));
        bullet.position.set(arrEnemySpaceship[i].position.x,
            arrEnemySpaceship[i].position.y,
            arrEnemySpaceship[i].position.z);
        bullet.position.x = arrEnemySpaceship[i].position.x + stepBullet + 1;
        bulletsEnemy.push(bullet);
        bullet.velocity = new THREE.Vector3(
            Math.sin(cameras.current.rotation.y),
            0,
            Math.sin(cameras.current.rotation.y)
        );
        scene.add(bullet);
    }
}

function animateCamera() {
    render();
    requestAnimationFrame(animateCamera);
    camera_rotation();
}

function colide(box1, box2){
    if((box1.min.x >= box2.min.x && box1.min.x <= box2.max.x ||
        box1.max.x >= box2.min.x && box1.max.x <= box2.max.x) &&
    (box1.min.y >= box2.min.y && box1.min.y <= box2.max.y ||
        box1.max.y >= box2.min.y && box1.max.y <= box2.max.y) &&
    (box1.min.z >= box2.min.z && box1.min.z <= box2.max.z ||
        box1.max.z >= box2.min.z && box1.max.z <= box2.max.z)){
        return true;
    }else{ return false ;}
}
function detectCollision(i){
        for (var j = 0; j <  arrEnemySpaceship.length; j++){
            if(j != i){
                if(colide(enemyBoxes[i],enemyBoxes[j])){
                    scene.remove(arrEnemySpaceship[i]);
                    arrEnemySpaceship.splice(i);
                    scene.remove(arrEnemySpaceship[j]);
                    arrEnemySpaceship.splice(j);
                 } 
            }     
        }     
}


function detectCollisionBallSpaceship(i){
    for( var j = 0; j < enemyBoxes.length; j++){
        if(i != j){
            if(colide(bulletsBoxes[i], enemyBoxes[j])){
                bullets[i].colidiu = true;
               do{
                   bullets[i].time_alive -= 1;
               }while(bullets[i].time_alive > 0);
               scene.remove(bullets[i]);
            }
        }
    }
}

function addBoxToBullet(i){
    bulletsBoxes[i].setFromObject(bullets[i]);
}
function animate() {

    var aux;
    const STEPS_PER_FRAME = .1;
    const deltaTime = Math.min(0.05, clock.getDelta()) / STEPS_PER_FRAME;
    
    for (let i = 0; i < STEPS_PER_FRAME; i++) {
        controls(deltaTime);
        updatePlayer(deltaTime);
    }

    var increment = 0.025;

    if (bullets.length > 0) {
        for (var j = 0; j < bullets.length; j++) {
            bullets[j].position.add(bullets[j].velocity);
            bullets[j].position.z -= stepBullet;
            aux = j;
            addBoxToBullet(j);
            detectCollisionBallSpaceship(j);


        }
        cameras.bulletCam.lookAt(bullets[aux].position.x, bullets[aux].position.y, bullets[aux].position.z);
        cameras.bulletCam.position.set(bullets[aux].position.x, bullets[aux].position.y, bullets[aux].position.z);
    }


    for (var i = 0; i < arrEnemySpaceship.length; i++) {
        enemyBoxes[i].setFromObject(arrEnemySpaceship[i]);
        if (arrEnemySpaceship[i].userData.moving) {
            if((arrEnemySpaceship[i].position.x > -(limiteHorizontal)) && (arrEnemySpaceship[i].position.x < limiteHorizontal)){

                arrEnemySpaceship[i].userData.step += increment;
                arrEnemySpaceship[i].position.x += 1 * (Math.cos(arrEnemySpaceship[i].userData.step));
               detectCollision(i);
            }else{
                arrEnemySpaceship[i].position.x -= 1 * (Math.cos(arrEnemySpaceship[i].userData.step));
            }
            
            
        }
    }

    for (var i = 0; i < bulletsEnemy.length; i++) {
        if (bulletsEnemy.length > 0) {
            bulletsEnemy[i].position.add(bulletsEnemy[i].velocity);
            bulletsEnemy[i].position.z += stepBullet;
        }
    }

    if (jump % 100 == 0) { enemyBulltes(); }
    jump++;
    playerSpaceship.userData.step += increment;
    playerSpaceship.position.y = .5 * (Math.cos(playerSpaceship.userData.step));

    rotationSpeed = .007;
    render();
    requestAnimationFrame(animate);

}

function createScene() {
    scene = new THREE.Scene();
    scene.add(new THREE.AxesHelper(40));
    createCenario();
    createSpaceship(0, 16, 80);


    arrEnemySpaceship.push(createEnemy(0, -1, -60, 0x75e30d));
    arrEnemySpaceship.push(createEnemy(40, -1, -30, 0x75e30d));
    arrEnemySpaceship.push(createEnemy(-40, -1, -30));
    arrEnemySpaceship.push(createEnemy(80, -1, -60, 0x75e30d));
    arrEnemySpaceship.push(createEnemy(-80, -1, -60, 0x75e30d));
    arrEnemySpaceship.push(createEnemy(-120, -1, -30));
    arrEnemySpaceship.push(createEnemy(120, -1, -30));


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