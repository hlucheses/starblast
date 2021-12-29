/**
 * StarBlast, jogo de naves espaciais.
 *
 * Este projecto é um projecto da cadeira de computação gráfica
 * como requisito parcial de avaliação do 4º ano de engenharia
 * informática (ISPTEC - Luanda, Angola).
 *
 * @link   https://github.com/hlucheses/starblast/
 * @file   Classe que representa a munição de um canhão.
 * @author Andreia Vanessa Graça de Brito
 * @author Helder Lucheses Gonçalves da Costa
 * @author Miguel Gamboa Francisco Domingos
 * @since  27.12.2021
 * 
 * @contact {20180296@isptec.co.ao, helder@lucheses.com, miguel@indiouz.com}
 */

class Bullet extends BulletDesign {
    /**
     * Define posição da bala
     * Inicializa o design
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     */
    constructor(x, y, z, type) {
        super(x, y, z);

        // Define a origem da bala (Player ou Enemy)
        this.type = type;

        // FIXME: Não consigo tornar isto em atributos estáticos
        this.MAX_SPEED = 4 * Constants.metersToPixels(80);
        this.ACCELERATION = 2 * Constants.metersToPixels(1);
        this.BRAKING = .5 * Constants.metersToPixels(1);

        this.mass = Constants.MASS.bullet;

        this.speed = new THREE.Vector3(0, .2, this.MAX_SPEED);

        if (this.type == Constants.PLAYER) {
            this.speed.z *= -1;
        }

        this.peaked = false;

        // Cria a boundingBox
        this.boundingBox = this.createBoundingBox();

        // Cria a esfera envolvente
        this.boundingSphere = this.createBoundingSphere();

        this.spinStep = 0;
        this.collided = false;
    }

    /**
     * Move as balas
     * TODO: Considerar que a bala abranda e que quando bate numa parede cai
     * FIXME: As balas não estão a abrandar
     */
    move() {
        if (!this.collided) {
            if (this.type == Constants.ENEMY) {

                // Nave inimiga move-se num sentido
                if (!this.peaked) {
                    if (this.speed.z < this.MAX_SPEED) {
                        this.speed.z += this.ACCELERATION;
                    } else {
                        this.peaked = true;
                    }
                }

                if (this.peaked) {
                    this.speed.z -= this.BRAKING;
                }

            } else {
                // Nave do player move-se num sentido
                if (!this.peaked) {
                    if (this.speed.z < this.MAX_SPEED) {
                        this.speed.z -= this.ACCELERATION;
                    } else {
                        this.peaked = true;
                    }
                }

                if (this.peaked) {
                    this.speed.z += this.BRAKING;
                }
            }
        }

        this.speed.y -= Constants.GRAVITY;

        this.design.position.add(this.speed);

        this.spin();
        this.updateBoundingBox();
        this.updateBoundingSphere();
        Collision.checkAgainstWalls(this);
    }

    /**
     * Faz as balas girarem em relação ao eixo do movimento
     * como pedido em enunciado
     */
    spin() {
        this.spinStep += .1;
        var inclination = (Math.cos(this.spinStep) * (2 * Math.PI));
        this.design.rotation.z = ((this.type == 1) ? -1 : 1) * inclination;
    }

    /**
     * Cria uma esfera envolvente para o objecto
     * @returns {THREE.Sphere}
     */
    createBoundingSphere() {
        const center = new THREE.Vector3();
        this.boundingBox.getCenter(center);
        
        var bsphere = new THREE.Sphere(center);
        bsphere = this.boundingBox.getBoundingSphere(bsphere);
        return bsphere;
    }

    /**
     * Actualiza a posição esfera envolvente
     * TODO: É possível que em verões futuras a bala aumente
     * com base num evento, nesse caso deve-se monitorar não
     * só o centro mas também o tamanho.
     */
    updateBoundingSphere() {
        const center = new THREE.Vector3();
        this.boundingBox.getCenter(center);
        this.boundingSphere.center.copy(center);
    }
}