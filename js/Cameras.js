/**
 * 
 * Grupo 2:
 * -Andreia de Brito
 * -Hélder da Costa
 *- Miguel Gamboa
 * 
 */

/**
 * Classe estática que representa as câmaras
 */

class Cameras {
    static FRONTAL = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 2000);
    static SIDE = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.6, 2000);
    static TOP = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 15, 2000);
    static DYNAMIC = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 2000);
    static BULLET = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 2000);

    /**
     * Posicionamento e configuração das câmaras
     */
    static staticConstructor() {

        /* Câmara frontal */
        this.FRONTAL.position.set(0, 5, 200);
        this.FRONTAL.lookAt(0, 0, 0);

        /* Câmara lateral */
        this.SIDE.position.set(270, 5, 30);
        this.SIDE.rotation.set(0, -Math.PI / 2, 0);
        this.SIDE.scale.set(4.592, 4.741, 6.062);
        this.SIDE.lookAt(0, 0, 0);

        /* Câmara de topo */
        this.TOP.position.set(0, 150, 5);
        //this.TOP.zoom = (window.innerWidth * window.innerHeight) / 300000;
        this.TOP.rotation.set(Math.PI / 2, 0, 0);
        this.TOP.updateProjectionMatrix();
        this.TOP.lookAt(0, 0, 0);

        /* Câmara dinâmica */
        this.DYNAMIC.position.set(0, 5, 200);
        this.DYNAMIC.lookAt(0, 0, 0);

        /* Câmara da bala */
        this.BULLET.position.set(0, 5, 200);
        this.BULLET.zoom = 50;
        this.BULLET.lookAt(0, 0, 0);

        // Definição da câmara inicial padrão
        this.CURRENT = this.FRONTAL;
    }

    static changeCurrent(camera) {

        if (typeof camera == "string") {

            switch (camera) {
                case "Digit1":
                    this.CURRENT = this.TOP;
                    break;
                case "Digit2":
                    this.CURRENT = this.FRONTAL;
                    break;
                case "Digit3":
                    this.CURRENT = this.BULLET;
                    break;
                case "Digit5":
                    this.CURRENT = this.DYNAMIC;
                    break;
            }
        } else {
            this.CURRENT = camera;
        }
    }
}

// Inicializa a classe
Cameras.staticConstructor();