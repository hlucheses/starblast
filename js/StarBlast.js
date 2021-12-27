/**
 * 
 * Grupo 2:
 * -Andreia de Brito
 * -Hélder da Costa
 *- Miguel Gamboa
 * 
 */

/**
     * São definidas as animações do programa
     */
function animateFora() {
    StarBlast.moveSpaceships();
    
    StarBlast.render();
    requestAnimationFrame(animateFora);
}

class StarBlast {
    // Cena
    static SCENE = new THREE.Scene();
    static RENDERER = new THREE.WebGLRenderer({ antialias: true });

    // Elementos da cena
    static PLAYER_SPACESHIP = new PlayerSpaceship(0, 16, 160);
    static ENEMIES = EnemySpaceship.generateRandom(Constants.NUMBER_OF_ENEMIES);

    // Estado das teclas
    static keyStates = {};

    /**
     * Inicia o fluxo do programa
     */
    static init() {
        this.RENDERER.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.RENDERER.domElement);

        // Eventos ao pressionar a tecla
        document.addEventListener('keydown', (event) => {
            this.keyStates[event.code] = true;
            Cameras.changeCurrent(event.code);

            if (event.code == "Digit4") {
                this.toggleWireframe();
            }
        });

        document.addEventListener('keyup', (event) => {
            this.keyStates[event.code] = false;
        });

        // Redimensionar o projecto ao redimensionar a janela
        window.addEventListener("resize", () => {
            
            // TODO: Ao redimensionar, o aspect ratio muda drasticamente. Resolver problema
            if (window.innerHeight > 0) {
                Cameras.CURRENT.aspect = window.innerWidth / window.innerHeight;
                Cameras.CURRENT.updateProjectionMatrix();
            }

            this.RENDERER.setSize(window.innerWidth, window.innerHeight);
        });

        this.createScene();
        this.render();
    }

    /**
     * Cria a cena (elementos físicos)
     */
    static createScene() {
        this.addWallsToScene();

        this.SCENE.add(this.PLAYER_SPACESHIP.getDesign());
        if (Constants.SHOW_BOUNDING_BOX_HELPERS) {
            this.SCENE.add(this.PLAYER_SPACESHIP.boxHelper);
        }

        this.addEnemiesToScene();
        this.SCENE.add(Scenary.getStars());
    }

    /**
     * Renderiza a cena para a câmara actual
     */
    static render() {
        this.RENDERER.render(this.SCENE, Cameras.CURRENT);
    }

    /**
     * Adiciona os inimigos à cena
     */
    static addEnemiesToScene() {
        for (var i = 0; i < this.ENEMIES.length; i++) {
            this.ENEMIES.id = i;
            this.SCENE.add(this.ENEMIES[i].design);

            if (Constants.SHOW_BOUNDING_BOX_HELPERS) {
                this.SCENE.add(this.ENEMIES[i].boxHelper);
            }
        }
    }

    /**
     * Adiciona as paredes à cena
     */
    static addWallsToScene() {
        for (let [key, plane] of Object.entries(Scenary.planes)) {
            this.SCENE.add(plane);
        }
    }

    /**
     * Mostra a cena em wireframes
     */
    static toggleWireframe() {
        this.SCENE.traverse(function (node) {
            if (node instanceof THREE.Mesh) {
                node.material.wireframe = !node.material.wireframe;
            }
        });
    }

    /**
     * Move as naves do player e dos inimigos
     */
    static moveSpaceships() {
        // Player
        StarBlast.PLAYER_SPACESHIP.checkMovement(StarBlast.keyStates);

        // Enemies
        for (var i = 0; i < this.ENEMIES.length; i++) {
            this.ENEMIES[i].moveRandomly();
        }

        // Verificar colisões

        // Entre as naves
        Collision.checkLimits([this.PLAYER_SPACESHIP, ...(this.ENEMIES)]);
        Collision.checkAmongSpaceships([this.PLAYER_SPACESHIP, ...(this.ENEMIES)]);
    }
}


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
var bulletsEnemyBoxes = [];
var stepBullet = 2;
var legenda = document.getElementById("info");
var bulletMax;
var opcao = { esquerda: false, meio: false, direita: false };
var cameras = createCameras();


function render() {
    renderer.render(scene, cameras.current);
}

function createBoxes() {
    for (var i = 0; i < arrEnemySpaceship.length; i++) {
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

        scene.traverse(function (node) {

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
            disparar(playerSpaceship.position.x - 5.355, playerSpaceship.position.y - 1.574);
        } else if (opcao.meio == true) {
            disparar(playerSpaceship.position.x, playerSpaceship.position.y - 1.574);
        } else if (opcao.direita == true) {
            disparar(playerSpaceship.position.x + 5.355, playerSpaceship.position.y - 1.574);
        }

    }
}

function disparar(x, y) {

    var bullet;
    bullet = new THREE.Mesh(new THREE.SphereGeometry(0.7, 64, 64), new THREE.MeshBasicMaterial({ color: "#d3d3d3" }));
    bullet.position.set(playerSpaceship.position.x,
        playerSpaceship.position.y,
        playerSpaceship.position.z);
    bullet.position.x = x;
    bullet.position.y = y;
    bullet.alive = true;
    bullet.matou = true;
    bullet.time_alive = 3;
    bullets.push(bullet);

    var aabb = new THREE.Box3();

    bulletsBoxes.push(aabb);

    bullet.velocity = new THREE.Vector3(-Math.sin(cameras.current.rotation.y),
        0,
        Math.sin(cameras.current.rotation.y)
    );


    scene.add(bullet);
}

function enemyBullets() {
    for (var i = 0; i < arrEnemySpaceship.length; i++) {
        if (arrEnemySpaceship[i].userData.colidida < 3) {
            var bullet = new THREE.Mesh(new THREE.SphereGeometry(0.7, 74, 74), new THREE.MeshBasicMaterial({ color: "#d3d3d3" }));
            bullet.alive = true;
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
            //addBoxEnemyBullet(bulletsEnemy.length - 1);
            scene.add(bullet);
        }
    }
}

function animateCamera() {
    render();
    requestAnimationFrame(animateCamera);
    camera_rotation();
}

function colide(box1, box2) {
    if ((box1.min.x >= box2.min.x && box1.min.x <= box2.max.x ||
        box1.max.x >= box2.min.x && box1.max.x <= box2.max.x) &&
        (box1.min.y >= box2.min.y && box1.min.y <= box2.max.y ||
            box1.max.y >= box2.min.y && box1.max.y <= box2.max.y) &&
        (box1.min.z >= box2.min.z && box1.min.z <= box2.max.z ||
            box1.max.z >= box2.min.z && box1.max.z <= box2.max.z)) {
        return true;
    } else { return false; }
}

function detectCollision(i) {
    for (var j = 0; j < arrEnemySpaceship.length; j++) {
        if (j != i) {
            if (colide(enemyBoxes[i], enemyBoxes[j])) {
                /*temp = arrEnemySpaceship[i].userData.step;
                arrEnemySpaceship[i].userData.step = arrEnemySpaceship[j].userData.step;
                arrEnemySpaceship[j].userData.step = temp;*/

                arrEnemySpaceship[i].userData.padrao = !arrEnemySpaceship[i].userData.padrao;
                arrEnemySpaceship[j].userData.padrao = !arrEnemySpaceship[j].userData.padrao;

            }
        }
    }
}

function detectCollisionBallSpaceship(i) {
    for (var j = 0; j < enemyBoxes.length; j++) {
        if (i != j) {
            if (colide(bulletsBoxes[i], enemyBoxes[j])) {
                bullets[i].colidiu = true;
                if (bullets[i].alive == true) {
                    arrEnemySpaceship[j].userData.colidida++;
                }
                bullets[i].alive = false;
                if (arrEnemySpaceship[j].userData.colidida > 3) {
                    arrEnemySpaceship[j].position.y = 1000;
                    scene.remove(arrEnemySpaceship[j]);
                    //arrEnemySpaceship.splice(j, 1);
                    //j--;
                    //e--;
                } else {
                    bullets[i].matou = false;
                }
            }
        }
    }
}

function detectCollisionBallBall(i) {
    for (var j = 0; j < bulletsEnemy.length; j++) {
        if (i != j) {
            if (colide(bulletsBoxes[i], bulletsEnemyBoxes[j])) {
                bulletsEnemy[j].alive = false;
                bullets[i].alive = false;
            }
        }
    }
}

function addBoxToBullet(i) {
    bulletsBoxes[i].setFromObject(bullets[i]);
}

function addBoxEnemyBullet(i) {
    bulletsEnemyBoxes[i].setFromObject(bulletsEnemy[i]);
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
            if (bullets[j].alive || bullets.matou) {
                bullets[j].position.z -= stepBullet;
            } else {
                bullets[j].position.z += stepBullet;
            }

            aux = j;
            addBoxToBullet(j);
            detectCollisionBallSpaceship(j);
            //detectCollisionBallBall(j);

            if (!bullets[j].alive) {
                bullets[j].time_alive -= 1 / 60;

                if (bullets.time_alive <= 0) {
                    scene.remove(bullets[i]);
                }
            }


        }
        cameras.bulletCam.lookAt(bullets[aux].position.x, bullets[aux].position.y, bullets[aux].position.z);
        cameras.bulletCam.position.set(bullets[aux].position.x, bullets[aux].position.y, bullets[aux].position.z);
    }


    for (var i = 0; i < arrEnemySpaceship.length; i++) {
        enemyBoxes[i].setFromObject(arrEnemySpaceship[i]);
        //helpersArray[i].material.color.setHex("white");
        if (arrEnemySpaceship[i].userData.moving) {

            if ((arrEnemySpaceship[i].position.x > -(limiteHorizontal)) && (arrEnemySpaceship[i].position.x < limiteHorizontal)) {
                detectCollision(i);
            } else {
                arrEnemySpaceship[i].userData.padrao = !arrEnemySpaceship[i].userData.padrao;
            }

            arrEnemySpaceship[i].position.x += 1 * (Math.cos((
                arrEnemySpaceship[i].userData.padrao == true ?
                    arrEnemySpaceship[i].userData.step :
                    Math.PI - arrEnemySpaceship[i].userData.step
            )));

            arrEnemySpaceship[i].userData.step += (Math.random() * 10 + 1) / 200;
            arrEnemySpaceship[i].position.x += 1 * (Math.cos(arrEnemySpaceship[i].userData.step));

        }
    }

    for (var i = 0; i < bulletsEnemy.length; i++) {
        //bulletsEnemyBoxes[i].setFromObject(bulletsEnemy[i]);
        if (bulletsEnemy.length > 0) {
            bulletsEnemy[i].position.add(bulletsEnemy[i].velocity);
            if (bulletsEnemy[i].alive) {
                bulletsEnemy[i].position.z += stepBullet;
            } else {
                bulletsEnemy[i].position.z -= stepBullet;
            }
        }
    }

    if (jump % 100 == 0) {
        enemyBullets();
    }
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