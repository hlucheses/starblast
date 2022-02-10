/**
 * StarBlast, jogo de naves espaciais.
 *
 * Este projecto é um projecto da cadeira de computação gráfica
 * como requisito parcial de avaliação do 4º ano de engenharia
 * informática (ISPTEC - Luanda, Angola).
 *
 * @link   https://github.com/hlucheses/starblast/
 * @file   Classe estática que representa o ficheiro principal do programa.
 * @author Andreia Vanessa Graça de Brito
 * @author Helder Lucheses Gonçalves da Costa
 * @author Miguel Gamboa Francisco Domingos
 * @since  27.12.2021
 * 
 * @contact {20180296@isptec.co.ao, helder@lucheses.com, miguel@indiouz.com}
 */


/**
 * São definidas as animações do programa
 * FIX: É suposto as animações também pertencerem à classe StarBlast
 */
function animate() {

    if (!isPlay) {
        return;
    }

    StarBlast.moveSpaceships();
    StarBlast.shoot();
    StarBlast.moveBullets();
    StarBlast.checkDead();
    StarBlast.moveDestructedParts();
    StarBlast.updateCamera();
    Cameras.HEROCAM.position.set(StarBlast.PLAYER_SPACESHIP.design.position.x,
        StarBlast.PLAYER_SPACESHIP.design.position.y,
        StarBlast.PLAYER_SPACESHIP.design.position.z);
    Cameras.FRONTAL.position.set(StarBlast.PLAYER_SPACESHIP.design.position.x,
        StarBlast.PLAYER_SPACESHIP.design.position.y + 5,
        StarBlast.PLAYER_SPACESHIP.design.position.z + 30);
    Cameras.CANONCAM.position.set(StarBlast.PLAYER_SPACESHIP.design.position.x,
        StarBlast.PLAYER_SPACESHIP.design.position.y,
        StarBlast.PLAYER_SPACESHIP.design.position.z);
    StarBlast.updateDOM();
    StarBlast.render();
    requestAnimationFrame(animate);
}

class StarBlast {
    // Cena
    static SCENE = new THREE.Scene();
    static RENDERER = new THREE.WebGLRenderer({ antialias: true });
    static shadowing = Constants.MESH_TYPE.default;
    static ambientalLight = Scenary.setAmbientalLight();
    // Elementos da cena
    static PLAYER_SPACESHIP = new PlayerSpaceship(0, 0, 160);
    static PLAYER_STARTING_LIVES = this.PLAYER_SPACESHIP.lives;
    static ENEMIES;
    static BULLETS;
    static DESINTEGRATING_PARTS;
    static LEVEL;
    static POINTS;
    static GAME_OVER;
    static TIMESTAMP;

    // Estado das teclas
    static keyStates = {};

    static staticConstructor() {
        this.RENDERER.setSize(window.innerWidth, window.innerHeight);
        this.RENDERER.shadowMap.enabled = false;
        this.RENDERER.shadowMap.type = THREE.PCFSoftShadowMap;

        document.body.appendChild(this.RENDERER.domElement);

        // Redimensionar o projecto ao redimensionar a janela
        window.addEventListener("resize", () => {

            if (started) {
                // TODO: Ao redimensionar, o aspect ratio muda drasticamente. Resolver problema
                if (window.innerHeight > 0) {
                    Cameras.CURRENT.aspect = window.innerWidth / window.innerHeight;
                    Cameras.CURRENT.updateProjectionMatrix();
                }

                this.RENDERER.setSize(window.innerWidth, window.innerHeight);
            }
        });

        // Eventos ao pressionar a tecla
        document.addEventListener('keydown', (event) => {
            if (started) {
                this.keyStates[event.code] = true;

                if (this.GAME_OVER == false) {
                    Cameras.changeCurrent(event.code);
                }

                if (Cameras.CURRENT == Cameras.BULLET) {
                    Cameras.updateBulletCam(this.PLAYER_SPACESHIP.lastBullet);
                }

                this.PLAYER_SPACESHIP.checkCannon(event.code);

                // TODO: arranjar um lugar melhor para este código
                // Este código é igual ao que está em inimigo
                if (event.code == "Space") {
                    this.PLAYER_SPACESHIP.shootingPressed = true;
                }

                if (event.code == "KeyN") {
                    this.toggleWireframe();
                }

                this.checkLight(event.code);
            }
        });

        document.addEventListener('keyup', (event) => {
            if (started) {
                this.keyStates[event.code] = false;

                if (event.code == "Space" && this.PLAYER_SPACESHIP.shootingPressed) {
                    var bullet = this.PLAYER_SPACESHIP.shoot();

                    this.POINTS--;
                    if (bullet != null) {
                        this.BULLETS.push(bullet);
                        this.SCENE.add(bullet.design);

                        if (Constants.SHOW_BOUNDING_BOX_HELPERS) {
                            this.SCENE.add(bullet.boxHelper);
                        }
                    }
                }
            }
        });
    }

    /**
     * Inicia o fluxo do programa
     */
    static init() {

        this.TIMESTAMP = Date.now();
        this.GAME_OVER = false;
        this.LEVEL = 1;
        this.POINTS = 0;
        this.ENEMIES = [];
        this.BULLETS = [];
        this.DESINTEGRATING_PARTS = [];
        this.PLAYER_SPACESHIP.design.position.set(0, 0, 160);
        this.PLAYER_SPACESHIP.lives = this.PLAYER_STARTING_LIVES;

        Scenary.changeWallsColor(this.LEVEL);
        this.createScene();
        this.render();
    }

    /**
     * Cria a cena (elementos físicos)
     */
    static createScene() {

        this.addPlanesToScene();
        this.addWallsToScene();
        this.addQuadros();
        this.SCENE.add(this.PLAYER_SPACESHIP.getDesign());

        if (Constants.SHOW_BOUNDING_BOX_HELPERS) {
            this.SCENE.add(this.PLAYER_SPACESHIP.boxHelper);
        }

        this.addEnemiesToScene();

        //this.SCENE.add(Scenary.getStars());
        //this.SCENE.add(Scenary.getPlanets());

        this.addSpotlights();
        this.addBillboardLights();
        this.SCENE.add(this.ambientalLight);
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
        if (Constants.GAME_MODE == Constants.TESTING) {
            this.ENEMIES = EnemySpaceship.generateRandom(Constants.NUMBER_OF_ENEMIES)
        } else {
            this.ENEMIES = Level.generateEnemies(this.LEVEL);
        }

        for (var i = 0; i < this.ENEMIES.length; i++) {
            this.SCENE.add(this.ENEMIES[i].design);

            if (Constants.SHOW_BOUNDING_BOX_HELPERS) {
                this.SCENE.add(this.ENEMIES[i].boxHelper);
            }
        }
    }

    /**
     * Adiciona as paredes à cena
     */
    static addPlanesToScene() {
        for (let [key, plane] of Object.entries(Scenary.planes)) {
            this.SCENE.add(plane);
        }
    }

    /**
     * Adicionar a caixa à cena
     */
    static addWallsToScene() {
        for (let [key, wall] of Object.entries(Scenary.walls)) {
            this.SCENE.add(wall.design);

            if (Constants.SHOW_BOUNDING_BOX_HELPERS) {
                this.SCENE.add(wall.boxHelper);
            }
        }

        this.SCENE.add(Scenary.floor.design);

        if (Constants.SHOW_BOUNDING_BOX_HELPERS) {
            this.SCENE.add(Scenary.floor.boxHelper);
        }
    }

    /**Adicionar quadros a cena */
    static addQuadros() {
        
        for (let i = 0; i < Scenary.quadros.leftMaterialArray.length; i++) {
            if (this.LEVEL < 19) {
                Scenary.quadros.leftMaterialArray[i].map = Scenary.paintings[this.LEVEL - 1][0];
                Scenary.quadros.rightMaterialArray[i].map = Scenary.paintings[this.LEVEL - 1][1];
            }
        }

        this.SCENE.add(Scenary.quadros.leftWall);
        this.SCENE.add(Scenary.quadros.rightWall);
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
        Collision.checkAmongSpaceships([this.PLAYER_SPACESHIP, ...(this.ENEMIES)]);
    }

    /**
     * Faz os inimigos darem tiro aleatoriamente
     */
    static shoot() {
        for (var i = 0; i < this.ENEMIES.length; i++) {
            var bullets = this.ENEMIES[i].shootRandomly();

            for (let j = 0; j < bullets.length; j++) {
                if (Constants.SHOW_BOUNDING_BOX_HELPERS) {
                    this.SCENE.add(bullets[j].boxHelper);
                }

                this.SCENE.add(bullets[j].design);
                this.BULLETS.push(bullets[j]);
            }
        }
    }

    /**
     * Move as balas pela cena
     */
    static moveBullets() {
        for (var i = 0; i < this.BULLETS.length; i++) {
            this.BULLETS[i].move();

            // Se a bola ja saiu da do espaço deve ser eliminada
            if (this.BULLETS[i].design.position.y < - Constants.SPACE.height / 2
                || this.BULLETS[i].design.position.y > Constants.SPACE.height / 2) {

                // Remover a câmara se a bala fugir
                if (this.BULLETS[i] == this.PLAYER_SPACESHIP.lastBullet
                    && Cameras.CURRENT == Cameras.BULLET) {
                    Cameras.CURRENT = Cameras.FRONTAL;
                    this.PLAYER_SPACESHIP.lastBullet = null;
                }

                this.SCENE.remove(this.BULLETS[i].boxHelper);
                this.SCENE.remove(this.BULLETS[i].design);

                this.BULLETS.splice(i, 1);
                i--;
            }
        }

        // Se a câmara for bullet deve seguir a bala
        if (Cameras.CURRENT == Cameras.BULLET) {
            Cameras.updateBulletCam(this.PLAYER_SPACESHIP.lastBullet);
        }

        // Verificar colisões
        if (this.GAME_OVER == false) {
            Collision.checkBulletsSpaceships(this.BULLETS, [...(this.ENEMIES), this.PLAYER_SPACESHIP]);
        }

        Collision.checkAmongBullets(this.BULLETS);
    }

    /**
     * Actualiza a câmara a cada frame caso seja dinâmica
     */
    static updateCamera() {
        if (Cameras.CURRENT == Cameras.DYNAMIC) {
            Cameras.rotate(this.SCENE);
        }
    }

    /**
     * Verifica se os inimigos estão mortos, remove se estiverem
     * TODO: fazer com que haja uma animação de morte
     */
    static checkDead() {
        for (var i = 0; i < this.ENEMIES.length; i++) {
            if (this.ENEMIES[i].lives <= 0) {

                /*
                    Cálculo de pontos (Revisar)
                */

                let totalSeconds = Math.floor(((Date.now() - this.TIMESTAMP) / 1000));

                this.POINTS += this.ENEMIES[i].typeOfEnemy * (Constants.GAME_TIME - totalSeconds) + 50 * this.PLAYER_SPACESHIP.lives;

                if (Constants.SHOW_BOUNDING_BOX_HELPERS) {
                    this.SCENE.remove(this.ENEMIES[i].boxHelper);
                }

                this.SCENE.remove(this.ENEMIES[i].design);

                let partsArray = this.ENEMIES[i].getParts();

                for (let j = 0; j < partsArray.length; j++) {
                    this.SCENE.add(partsArray[j].design);
                }

                /* Inicializar as partes desintegradas */
                this.DESINTEGRATING_PARTS = this.DESINTEGRATING_PARTS.concat(partsArray);

                this.ENEMIES.splice(i, 1);
                i--;
            }
        }

        /* Verifica nível */
        if (Constants.GAME_MODE == Constants.RELEASE && this.GAME_OVER == false) {
            if (this.ENEMIES.length == 0) {
                this.LEVEL++;

                if (this.LEVEL > 18) {
                    alert("Terminou o jogo! Está de parabéns!");
                    exit();
                }

                this.updateScenary();
                this.addEnemiesToScene();
                Scenary.changeWallsColor(this.LEVEL);

                for (let i = 0; i < Scenary.quadros.leftMaterialArray.length; i++) {
                    if (this.LEVEL < 19) {
                        Scenary.quadros.leftMaterialArray[i].map = Scenary.paintings[this.LEVEL - 1][0];
                        Scenary.quadros.rightMaterialArray[i].map = Scenary.paintings[this.LEVEL - 1][1];
                    }
                }

                this.TIMESTAMP += (Constants.GAME_TIME / 5) * 1000;
                if (this.PLAYER_SPACESHIP.lives == this.PLAYER_STARTING_LIVES) {
                    this.POINTS += Constants.GAME_TIME;
                } else {
                    this.PLAYER_SPACESHIP.lives++;
                }
            }
        }
    }

    static updateScenary() {
        for (let [key, wall] of Object.entries(Scenary.walls)) {
            for (let [key, wallPart] of Object.entries(wall.designParts)) {
                for (let i = 0; i < wallPart.materialArray.length; i++) {
                    if (this.LEVEL == 4) {
                        wallPart.materialArray[i].color.set(Constants.COLORS.walls.scenary2);
                    } else if (this.LEVEL == 9) {
                        wallPart.materialArray[i].color.set(Constants.COLORS.walls.scenary3);
                    } else if (this.LEVEL == 18) {
                        wallPart.materialArray[i].color.set(Constants.COLORS.walls.boss);
                    } else {
                        wallPart.materialArray[i].color.set(Constants.COLORS.walls.default);
                    }

                }

            }
        }
    }
    /**
     * 
     */
    static addSpotlights() {
        for (let [key, spotlight] of Object.entries(Scenary.spotlights)) {
            this.SCENE.add(spotlight.design);
            this.SCENE.add(spotlight.light);
            const spotLightHelper = new THREE.SpotLightHelper(spotlight.light, 0xCA8508);

            if (Constants.SHOW_BOUNDING_BOX_HELPERS) {
                this.SCENE.add(spotLightHelper);
            }
        }

    }

    static addBillboardLights() {
        for (let i = 0; i < Scenary.billboardLights.left.length; i++) {
            this.SCENE.add(Scenary.billboardLights.left[i].design);
            this.SCENE.add(Scenary.billboardLights.right[i].design);

            this.SCENE.add(Scenary.billboardLights.left[i].light);
            this.SCENE.add(Scenary.billboardLights.right[i].light);
        }
    }

    /**
     * Altera a iluminação da cena com base a uma tecla
     * @param {string} eventCode 
     */
    static checkLight(eventCode) {

        switch (eventCode) {
            case "KeyQ":
                this.ambientalLight.intensity ^= 1;
                break;
            case "KeyM":
                // Ativar cálculo de sombreamento
                if (this.shadowing == Constants.MESH_TYPE.basic) {
                    this.changeShadowing(Constants.MESH_TYPE.lambert);
                } else {
                    this.changeShadowing(Constants.MESH_TYPE.basic);
                }
                break;
            case "KeyE":
                // Alternar entre phong e lambert
                if (this.shadowing != Constants.MESH_TYPE.basic) {
                    if (this.shadowing == Constants.MESH_TYPE.lambert) {
                        this.changeShadowing(Constants.MESH_TYPE.phong);
                    } else {
                        this.changeShadowing(Constants.MESH_TYPE.lambert);
                    }
                }
                break;
            case "KeyK":
                if (Scenary.spotlights.bottomLeft.light.intensity == 0) {
                    Scenary.spotlights.bottomLeft.light.intensity = Constants.INTENSIDADE;
                } else {
                    Scenary.spotlights.bottomLeft.light.intensity = 0;
                }
                break;
            case "KeyL":
                if (Scenary.spotlights.bottomRight.light.intensity == 0) {
                    Scenary.spotlights.bottomRight.light.intensity = Constants.INTENSIDADE;
                } else {
                    Scenary.spotlights.bottomRight.light.intensity = 0;
                }
                break;
            case "KeyI":
                if (Scenary.spotlights.topLeft.light.intensity == 0) {
                    Scenary.spotlights.topLeft.light.intensity = Constants.INTENSIDADE;
                } else {
                    Scenary.spotlights.topLeft.light.intensity = 0;
                }
                break;
            case "KeyO":
                if (Scenary.spotlights.topRight.light.intensity == 0) {
                    Scenary.spotlights.topRight.light.intensity = Constants.INTENSIDADE;
                } else {
                    Scenary.spotlights.topRight.light.intensity = 0;
                }
                break;
            case "KeyD":
                for (let i = 0; i < Scenary.billboardLights.left.length; i++) {
                    if (Scenary.billboardLights.left[i].light.intensity == 0) {
                        Scenary.billboardLights.left[i].light.intensity = 1;
                    } else {
                        Scenary.billboardLights.left[i].light.intensity = 0;
                    }
                }
                break;
            case "KeyP":
                for (let i = 0; i < Scenary.billboardLights.right.length; i++) {
                    if (Scenary.billboardLights.right[i].light.intensity == 0) {
                        Scenary.billboardLights.right[i].light.intensity = 1;
                    } else {
                        Scenary.billboardLights.right[i].light.intensity = 0;
                    }
                }
                break;
        }
    }

    static changeShadowing(type) {

        for (let [key, billboardLight] of Object.entries(Scenary.billboardLights)) {
            
            for (let i = 0; i < billboardLight[0].length; i++) {
                console.log(billboardLight[0]);
                for (let [key, billboardPart] of Object.entries(billboardLight[0].designParts)) {
                    billboardPart.mesh.material = billboardPart.materialArray[type];
                }
            }
        }

        for (let [key, floorPart] of Object.entries(Scenary.floor.designParts)) {
            floorPart.mesh.material = floorPart.materialArray[type];
        }

        for (let [key, spotlight] of Object.entries(Scenary.spotlights)) {
            for (let [key, spotlightPart] of Object.entries(spotlight.designParts)) {
                spotlightPart.mesh.material = spotlightPart.materialArray[type];
            }
        }

        for (let [key, wall] of Object.entries(Scenary.walls)) {
            for (let [key, wallPart] of Object.entries(wall.designParts)) {
                wallPart.mesh.material = wallPart.materialArray[type];
            }
        }

        for (var i = 0; i < this.BULLETS.length; i++) {
            for (let [key, bulletPart] of Object.entries(this.BULLETS[i].designParts)) {
                bulletPart.mesh.material = bulletPart.materialArray[type];
            }
        }

        for (var i = 0; i < this.ENEMIES.length; i++) {
            for (let [key, enemyPart] of Object.entries(this.ENEMIES[i].designParts)) {
                enemyPart.mesh.material = enemyPart.materialArray[type];
            }
        }

        Scenary.quadros.leftWall.material = Scenary.quadros.leftMaterialArray[type];
        Scenary.quadros.rightWall.material = Scenary.quadros.rightMaterialArray[type];

        Constants.MESH_TYPE.default = type;
        this.shadowing = type;

        // A nave do player é apenas lambert
        if (type == Constants.MESH_TYPE.phong) {
            type = Constants.MESH_TYPE.lambert;
        }

        for (let [key, playerPart] of Object.entries(this.PLAYER_SPACESHIP.designParts)) {
            playerPart.mesh.material = playerPart.materialArray[type];
        }
    }

    static moveDestructedParts() {
        for (let i = 0; i < this.DESINTEGRATING_PARTS.length; i++) {
            this.DESINTEGRATING_PARTS[i].move();

            if (this.DESINTEGRATING_PARTS[i].design.position.y < -Constants.SPACE.height / 2) {
                this.SCENE.remove(this.DESINTEGRATING_PARTS[i].design);

                this.DESINTEGRATING_PARTS.splice(i, 1);
                i--;
            }
        }
    }

    static updateDOM() {
        const topItems = document.getElementById("topItems");

        if (!this.GAME_OVER) {

            const points = document.getElementById("noPoints");
            const enemies = document.getElementById("noEnemies");
            const timeAvailable = document.getElementById("timeAvailable");
            const hearts = document.getElementById("hearts");
            const level = document.getElementById("level");

            let totalSeconds = Math.floor(((Date.now() - this.TIMESTAMP) / 1000));
            let remainingSeconds = (Constants.GAME_TIME - totalSeconds);

            if (remainingSeconds < 0) {
                this.GAME_OVER = true;
                this.gameOver();
            }

            if (this.PLAYER_SPACESHIP.lives < 1) {
                this.GAME_OVER = true;
                this.gameOver();
            }

            let saida = "";
            for (let i = 0; i < this.PLAYER_STARTING_LIVES; i++) {
                if (this.PLAYER_SPACESHIP.lives > i) {
                    saida += '<i class="fas fa-heart"></i>';
                } else {
                    saida += '<i class="far fa-heart"></i>'
                }
            }

            points.innerHTML = this.POINTS;
            enemies.innerHTML = this.ENEMIES.length;
            timeAvailable.innerHTML = remainingSeconds + " seconds";
            hearts.innerHTML = saida;
            level.innerHTML = "LEVEL " + this.LEVEL + " - " + Level.arrayOfLevels[this.LEVEL - 1].name;
        } else {
            topItems.innerHTML = "<span color='red'>LEVEL " + this.LEVEL + " - " + Level.arrayOfLevels[this.LEVEL - 1].name + "</span>";
        }
    }

    static pause() {
        this.PAUSE_TIMESTAMP = Date.now();

        isPlay = false;
        const startDiv = document.getElementById('start');
        const topItems = document.getElementById('topItems');
        startDiv.setAttribute('style', startedStyle);
        topItems.setAttribute('style', 'display: none');
    }

    static finish() {
        const topItemsContent = '<span id="level"></span><span>POINTS: <span id="noPoints"></span></span><span>REMAINING ENEMIES: <span id="noEnemies"></span></span><span>REMAINING TIME: <span id="timeAvailable"></span></span><span><span id="hearts"></span></span>'

        this.GAME_OVER = false;

        const topItems = document.getElementById("topItems");
        topItems.innerHTML = topItemsContent;

        Cameras.CURRENT = Cameras.FRONTAL;

        while (this.SCENE.children.length > 0) {
            this.SCENE.remove(this.SCENE.children[0]);
        }

        gameOverDiv.setAttribute('style', 'display: none');
    }

    static gameOver() {
        Cameras.CURRENT = Cameras.DYNAMIC;
        gameOverDiv.setAttribute('style', gameOverStyle);
    }

    static play() {
        this.TIMESTAMP += (Date.now() - this.PAUSE_TIMESTAMP);
        isPlay = true;
        animate();
    }
}


StarBlast.staticConstructor();