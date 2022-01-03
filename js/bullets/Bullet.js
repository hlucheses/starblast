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

class Bullet extends StarBlastObject {
    /**
     * Define posição da bala
     * Inicializa o design
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     */
    constructor(x, y, z, type, ySpeed, typeOfBullet) {
        super(x, y, z);

        this.typeOfBullet = typeOfBullet;

        this.impact = 0;

        // Define a origem da bala (Player ou Enemy)
        this.type = type;

        // FIXME: Não consigo tornar isto em atributos estáticos
        this.MAX_SPEED = 4 * Constants.metersToPixels(80);
        this.ACCELERATION = 2 * Constants.metersToPixels(1);
        this.BRAKING = .5 * Constants.metersToPixels(1);

        this.mass = Constants.MASS.bullet;

        if (ySpeed > .6) {
            ySpeed = .6;
        }

        this.speed = new THREE.Vector3(0, ySpeed, this.MAX_SPEED);

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
        this.isBullet = true;

        this.initialDesign(typeOfBullet, x, y, z);
        
        this.prepareShadowing();
    }

    initialDesign(type, x, y, z) {
        var design = null;

        switch (type) {
            case Constants.BULLET_TYPE.cannonBall:
                design = new CannonBall();
                this.impact = 1;
                break;
            case Constants.BULLET_TYPE.missile:
                design = new Missile();
                this.impact = 2;
                break;
            default:
                design = new CannonBall();
                break;
        }

        
        this.mass = design.mass;
        this.design = design.design;
        
        if (this.type != Constants.ENEMY) {
            this.design.rotation.y = Math.PI;
        }

        this.designParts = design.designParts;
        this.design.position.set(x, y, z);
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

        if (this.typeOfBullet == Constants.BULLET_TYPE.missile) {
            this.rotateMissile();
        }

        this.updateBoundingBox();
        this.updateBoundingSphere();

        
        this.spin();

        Collision.checkAgainstWalls(this);
    }

    /**
     * Faz as balas girarem em relação ao eixo do movimento
     * como pedido em enunciado
     */
    spin() {
        switch (this.typeOfBullet) {
            case Constants.BULLET_TYPE.cannonBall:
                if (!this.collided) {
                    this.design.rotateX(Math.PI / 12);
                }
                break;
            case Constants.BULLET_TYPE.missile:
                if (!this.collided) {
                    this.design.rotateZ(Math.PI / 12);
                } else {
                    this.design.rotateX(Math.PI / 12);
                }
                break;
            default:
                this.design.rotateX(Math.PI / 12);
                break;
        }

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

    rotateMissile() {
        // Vetor i: (1, 0, 0)
        // Vetor j: (0, 1, 0)
        // Vetor k: (0, 0, 1)

        // Rotacao em X é o ângulo de speed.y com j
        let magnitudeSpeed = Constants.vectorLength(this.speed);
        let cosArgument = this.speed.y / magnitudeSpeed;
        let defaultAngle = -Math.PI / 2;

        if (this.type == Constants.ENEMY) {
            defaultAngle *= -1;
        }

        this.design.rotation.x = defaultAngle + Math.acos(cosArgument);
    }
}