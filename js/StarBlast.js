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