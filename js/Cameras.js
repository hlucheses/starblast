/**
 * StarBlast, jogo de naves espaciais.
 *
 * Este projecto é um projecto da cadeira de computação gráfica
 * como requisito parcial de avaliação do 4º ano de engenharia
 * informática (ISPTEC - Luanda, Angola).
 *
 * @link   https://github.com/hlucheses/starblast/
 * @file   Classe estática que representa as câmaras.
 * @author Andreia Vanessa Graça de Brito
 * @author Helder Lucheses Gonçalves da Costa
 * @author Miguel Gamboa Francisco Domingos
 * @since  27.12.2021
 * 
 * @contact {20180296@isptec.co.ao, helder@lucheses.com, miguel@indiouz.com}
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

        // Velocidade de rotação da câmara dinâmica
        this.ROTATION_SPEED = .007;
    }

    /**
     * Muda a câmara com base na tecla apertada ou com base na câmara passada
     * nos parâmetros
     * @param {string|THREE.PerspectiveCamera|THREE.OrthographicCamera} camera 
     */
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

    /**
     * Faz a câmara seguir o objecto
     * @param {object} object 
     */
    static updateBulletCam(object) {
        if (object != null) {
            var offset = new THREE.Vector3(object.design.position.x + 20, object.design.position.y + 6, object.design.position.z);
            this.BULLET.position.lerp(offset, 0.2);
            this.BULLET.lookAt(object.design.position);
        } else {
            this.CURRENT = this.FRONTAL;
        }
    }

    /**
     * Roda a câmara em relação a uma cena
     * @param {THREE.Scene}
     */
    static rotate(scene) {
        var x = this.CURRENT.position.x,
            z = this.CURRENT.position.z;
        var rotationSpeed = this.ROTATION_SPEED;

        this.CURRENT.position.x = x * Math.cos(rotationSpeed) + z * Math.sin(rotationSpeed);
        this.CURRENT.position.z = z * Math.cos(rotationSpeed) - x * Math.sin(rotationSpeed);

        this.CURRENT.lookAt(scene.position);
    }
}

// Inicializa a classe
Cameras.staticConstructor();