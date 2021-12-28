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

            this.PLAYER_SPACESHIP.checkCannon(event.code);

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
        Collision.checkAmongSpaceships([this.PLAYER_SPACESHIP, ...(this.ENEMIES)]);
    }

    /**
     * Faz os inimigos darem tiro aleatoriamente
     */
    static shoot() {
        for (var i = 0; i < this.ENEMIES.length; i++) {
            var bullet = this.ENEMIES[i].shootRandomly();

            if (bullet != null) {
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
        }
    }
}