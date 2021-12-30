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
function animateFora() {
    StarBlast.moveSpaceships();
    StarBlast.shoot();
    StarBlast.moveBullets();
    StarBlast.checkDead();
    StarBlast.updateCamera();
    Cameras.HEROCAM.position.set(StarBlast.PLAYER_SPACESHIP.design.position.x,
        StarBlast.PLAYER_SPACESHIP.design.position.y,
        StarBlast.PLAYER_SPACESHIP.design.position.z);
    StarBlast.render();
    requestAnimationFrame(animateFora);
}

class StarBlast {
    // Cena
    static SCENE = new THREE.Scene();
    static RENDERER = new THREE.WebGLRenderer({ antialias: true });
    //Luz Ambiente
    static ambientalLight =  Scenary.setAmbientalLight();
  
    //Spotlights
    static spotlights = {
        bottomRight: null,
        bottomLeft: null,
        topRight: null,
        topLeft: null
    };

    // Elementos da cena
    static PLAYER_SPACESHIP = new PlayerSpaceship(0, 16, 160);
    static ENEMIES = EnemySpaceship.generateRandom(Constants.NUMBER_OF_ENEMIES);
    static BULLETS = [];

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

            if (Cameras.CURRENT == Cameras.BULLET) {
                Cameras.updateBulletCam(this.PLAYER_SPACESHIP.lastBullet);
            }

            this.PLAYER_SPACESHIP.checkCannon(event.code);

            // TODO: arranjar um lugar melhor para este código
            // Este código é igual ao que está em inimigo
            if (event.code == "Space") {

                var bullet = this.PLAYER_SPACESHIP.shoot();

                if (bullet != null) {
                    this.BULLETS.push(bullet);
                    this.SCENE.add(bullet.design);

                    if (Constants.SHOW_BOUNDING_BOX_HELPERS) {
                        this.SCENE.add(bullet.boxHelper);
                    }
                }
            }

            if (event.code == "Digit4") {
                this.toggleWireframe();
            }

            if (event.code == "KeyQ"){
                if(this.ambientalLight.intensity == 1){
                    this.ambientalLight.intensity = 0;
                }else{
                    this.ambientalLight.intensity = 1;
                }
            }
            if (event.code == "Numpad1") {
                //Bottom Left Light
                if(Scenary.spotlights.bottomLeft.light.intensity == 0) {
                    Scenary.spotlights.bottomLeft.light.intensity = 20;
                } else {
                    Scenary.spotlights.bottomLeft.light.intensity = 0;
                }
                console.log(Scenary.spotlights.bottomLeft.light.intensity);
            }
            if (event.code == "Numpad2") {
                //Bottom Right Light
                if(Scenary.spotlights.bottomRight.light.intensity == 0) {
                    Scenary.spotlights.bottomRight.light.intensity = 20;
                } else {
                    Scenary.spotlights.bottomRight.light.intensity = 0;
                }
            }
            if (event.code == "Numpad4") {
                if(Scenary.spotlights.topLeft.light.intensity == 0) {
                    Scenary.spotlights.topLeft.light.intensity = 20;
                } else {
                    Scenary.spotlights.topLeft.light.intensity = 0;
                }
            }
            if (event.code == "Numpad5") {
                //Top Right Light
                if(Scenary.spotlights.topRight.light.intensity == 0) {
                    Scenary.spotlights.topRight.light.intensity = 20;
                } else {
                    Scenary.spotlights.topRight.light.intensity = 0;
                }
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
        this.SCENE.add(this.ambientalLight);
    }

    /**
     * Cria a cena (elementos físicos)
     */
    static createScene() {
        this.addWallsToScene();
        this.addBoxToScene();

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
    static addWallsToScene() {
        for (let [key, plane] of Object.entries(Scenary.planes)) {
            this.SCENE.add(plane);
        }
    }

    /**
     * Adicionar a caixa à cena
     */
    static addBoxToScene() {
        for (let[key, wall] of Object.entries(Scenary.walls)) {
            this.SCENE.add(wall);
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

                if (Constants.SHOW_BOUNDING_BOX_HELPERS)  {
                    this.SCENE.remove(this.ENEMIES[i].boxHelper);
                }

                this.SCENE.remove(this.ENEMIES[i].design);
                
                this.ENEMIES.splice(i, 1);
            }
        }
    }

    static addSpotlights() {
        for (let[key, spotlight] of Object.entries(Scenary.spotlights)) {
            this.SCENE.add(spotlight.design);
            this.SCENE.add(spotlight.target);
        }

    }
}
