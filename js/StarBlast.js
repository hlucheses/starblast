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
    static ENEMIES = EnemySpaceship.generateRandom(Constants.NUMBER_OF_ENEMIES);
    static BULLETS = [];
    static DESINTEGRATING_PARTS = [];
    static POINTS = 0;
    static GAME_OVER = false;
    static TIMESTAMP = Date.now();

    // Estado das teclas
    static keyStates = {};

    /**
     * Inicia o fluxo do programa
     */
    static init() {

        this.RENDERER.setSize(window.innerWidth, window.innerHeight);
        this.RENDERER.shadowMap.enabled = true;
        this.RENDERER.shadowMap.type = THREE.PCFSoftShadowMap;
        
        document.body.appendChild(this.RENDERER.domElement);

        // Eventos ao pressionar a tecla
        document.addEventListener('keydown', (event) => {
            this.keyStates[event.code] = true;

            Cameras.changeCurrent(event.code);

            if (Cameras.CURRENT == Cameras.BULLET) {
                Cameras.updateBulletCam(this.PLAYER_SPACESHIP.lastBullet);
            }

            this.PLAYER_SPACESHIP.checkCannon(event.code);

            // TODO: arranjar um lugar melhor para este código
            // Este código é igual ao que está em inimigo
            if (event.code == "Space") {

                this.PLAYER_SPACESHIP.shootingPressed = true;
                this.PLAYER_SPACESHIP.shootingHeight += this.PLAYER_SPACESHIP.shootingStep;
            }

            if (event.code == "Digit4") {
                this.toggleWireframe();
            }

            this.checkLight(event.code);
        });

        document.addEventListener('keyup', (event) => {
            this.keyStates[event.code] = false;

            if (event.code == "Space" && this.PLAYER_SPACESHIP.shootingPressed) {

                this.PLAYER_SPACESHIP.shootingPressed = false;

                var bullet = this.PLAYER_SPACESHIP.shoot(this.PLAYER_SPACESHIP.shootingHeight);


                this.PLAYER_SPACESHIP.shootingHeight = 0;


                if (bullet != null) {
                    this.BULLETS.push(bullet);
                    this.SCENE.add(bullet.design);

                    if (Constants.SHOW_BOUNDING_BOX_HELPERS) {
                        this.SCENE.add(bullet.boxHelper);
                    }
                }
            }
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
        this.SCENE.add(this.ambientalLight);
    }

    /**
     * Cria a cena (elementos físicos)
     */
    static createScene() {

        this.addPlanesToScene();
        this.addWallsToScene();

        this.SCENE.add(this.PLAYER_SPACESHIP.getDesign());

        if (Constants.SHOW_BOUNDING_BOX_HELPERS) {
            this.SCENE.add(this.PLAYER_SPACESHIP.boxHelper);
        }

        this.addEnemiesToScene();
        this.SCENE.add(Scenary.getStars());

        this.addSpotlights();
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
            var bullet = this.ENEMIES[i].shootRandomly();

            if (bullet != null) {

                if (Constants.SHOW_BOUNDING_BOX_HELPERS) {
                    this.SCENE.add(bullet.boxHelper);
                }

                this.SCENE.add(bullet.design);
                this.BULLETS.push(bullet);
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
        Collision.checkBulletsSpaceships(this.BULLETS, [...(this.ENEMIES), this.PLAYER_SPACESHIP]);
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

                this.POINTS += this.ENEMIES[i].typeOfEnemy * (300 - totalSeconds);

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

    /**
     * Altera a iluminação da cena com base a uma tecla
     * @param {string} eventCode 
     */
    static checkLight(eventCode) {

        switch (eventCode) {
            case "KeyQ":
                this.ambientalLight.intensity ^= 1;
                break;
            case "KeyW":
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
            case "Numpad1":
                if (Scenary.spotlights.bottomLeft.light.intensity == 0) {
                    Scenary.spotlights.bottomLeft.light.intensity = Constants.INTENSIDADE;
                } else {
                    Scenary.spotlights.bottomLeft.light.intensity = 0;
                }
                break;
            case "Numpad2":
                if (Scenary.spotlights.bottomRight.light.intensity == 0) {
                    Scenary.spotlights.bottomRight.light.intensity = Constants.INTENSIDADE;
                } else {
                    Scenary.spotlights.bottomRight.light.intensity = 0;
                }
                break;
            case "Numpad4":
                if (Scenary.spotlights.topLeft.light.intensity == 0) {
                    Scenary.spotlights.topLeft.light.intensity = Constants.INTENSIDADE;
                } else {
                    Scenary.spotlights.topLeft.light.intensity = 0;
                }
                break;
            case "Numpad5":
                if (Scenary.spotlights.topRight.light.intensity == 0) {
                    Scenary.spotlights.topRight.light.intensity = Constants.INTENSIDADE;
                } else {
                    Scenary.spotlights.topRight.light.intensity = 0;
                }
                break;
        }
    }

    static changeShadowing(type) {

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

        for (var i = 0; i < this.DESINTEGRATING_PARTS.length; i++) {
            this.DESINTEGRATING_PARTS[i].mesh.material = this.DESINTEGRATING_PARTS[i].materialArray[type];
        }

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

            let totalSeconds = Math.floor(((Date.now() - this.TIMESTAMP) / 1000));
            let remainingSeconds = (300 - totalSeconds);

            if (remainingSeconds < 0) {
                this.GAME_OVER = true;
            }

            let saida = "";
            for (let i = 0; i < this.PLAYER_STARTING_LIVES; i++) {
                if (this.PLAYER_SPACESHIP.lives > i) {
                    saida += '<i class="fas fa-heart"></i>';
                } else {
                    saida += '<i class="far fa-heart"></i>'
                }
            }

            if (this.PLAYER_SPACESHIP.lives < 1) {
                this.GAME_OVER = true;
            }

            points.innerHTML = this.POINTS;
            enemies.innerHTML = this.ENEMIES.length;
            timeAvailable.innerHTML = remainingSeconds + " seconds";
            hearts.innerHTML = saida;
        } else {
            topItems.innerHTML = "<span color='red'>GAME OVER</span>";
        }
    }
}
