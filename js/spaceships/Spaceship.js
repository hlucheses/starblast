/**
 * StarBlast, jogo de naves espaciais.
 *
 * Este projecto é um projecto da cadeira de computação gráfica
 * como requisito parcial de avaliação do 4º ano de engenharia
 * informática (ISPTEC - Luanda, Angola).
 *
 * @link   https://github.com/hlucheses/starblast/
 * @file   Classe que representa qualquer nave no jogo.
 * @author Andreia Vanessa Graça de Brito
 * @author Helder Lucheses Gonçalves da Costa
 * @author Miguel Gamboa Francisco Domingos
 * @since  27.12.2021
 * 
 * @contact {20180296@isptec.co.ao, helder@lucheses.com, miguel@indiouz.com}
 */

class Spaceship extends StarBlastObject {

    /**
     * Define posição inicial da nave
     * Inicializa o design
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     */
    constructor(x, y, z) {

        super(x, y, z);
        /* Atributos definidos nos filhos */

        // Determina o tipo de spaceship (1 para player, 2 para inimigo)
        this.type = null;

        this.cannons = {};

        // inicia o hovering com 0
        this.hoveringStep = 0;

        /* FIXME: Permitir com que funcione vindo de constants */
        // Variação da aceleração (1, 1, 1)
        this.ACCELERATION = Constants.metersToPixels(1);
        this.BRAKING = Constants.metersToPixels(1);

        // Velocidade máxima 80 m/s
        this.MAX_SPEED = Constants.metersToPixels(80);

        // Número inicial de vidas
        this.lives = Constants.STARTING_LIVES;
    }

    /**
     * Método responsável pelo movimento das naves
     */
    move() {
        this.brake(); // travar caso não se esteja a acelerar
        this.hover(); // hover

        // À posicão são adicionados (velocidade) metros a cada frame
        this.design.position.add(this.speed);
        // Verificar se atingiu um limite
        this.checkZLimits();

        // Se a velocidade for menor que a máxima acelerar no sentido em questão

        if (Math.abs(this.speed.x) <= this.MAX_SPEED) {
            this.speed.x += this.acceleration.x;
        } else {
            this.speed.x = Constants.getSignal(this.speed.x) * this.MAX_SPEED;
        }

        if (Math.abs(this.speed.z) <= this.MAX_SPEED) {
            this.speed.z += this.acceleration.z;
        } else {
            this.speed.z = Constants.getSignal(this.speed.z) * this.MAX_SPEED;
        }

        // Inclinação
        this.tilt();

        // Actualiza a posição das bounding boxes
        this.updateBoundingBox();

        // Verifica se colidiu com a parede
        Collision.checkAgainstWalls(this);
    }

    /**
     * Método que faz com que as naves façam hovering no eixo y
     */
    hover() {
        this.hoveringStep += Constants.randomNumber(10, 30) / 1000;
        this.design.position.setY(2 * (Math.cos(this.hoveringStep)));
    }

    /**
     * Método que faz as naves se inclinarem ao se moverem
     */
    tilt() {

        // Inclinação no eixo Z
        var inclination = ((this.speed.x / this.MAX_SPEED) * (Math.PI / 8));
        this.design.rotation.z = ((this.type == 1) ? -1 : 1) * inclination;

        // Inclinação no eixo X (Só para a frente)
        if (this.speed.z <= 0) {
            this.design.rotation.x = ((this.speed.z / this.MAX_SPEED) * (Math.PI / 32));
        }
    }

    /**
     * Método que possibilita a travagem das naves
     */
    brake() {
        if (this.moving.x == 0) { // Se moving estiver em 0 trava-se
            if (this.speed.x > 0) {
                this.speed.x -= this.BRAKING;

                if (this.speed.x < 0) {
                    this.speed.x = 0;
                }
            } else if (this.speed.x < 0) {
                this.speed.x += this.BRAKING;

                if (this.speed.x > 0) {
                    this.speed.x = 0;
                }
            }
        }

        if (this.moving.z == 0) { // Se moving estiver em 0 trava-se
            if (this.speed.z > 0) {
                this.speed.z -= this.BRAKING;

                if (this.speed.z < 0) {
                    this.speed.z = 0;
                }
            } else if (this.speed.z < 0) {
                this.speed.z += this.BRAKING;

                if (this.speed.z > 0) {
                    this.speed.z = 0;
                }
            }
        }
    }

    getParts() {
        let arr = [];
        
        for (let [key, part] of Object.entries(this.designParts)) {
            arr.push(new SpaceshipPart(
                this.design.position,
                this.design.rotation,
                part.mesh,
                part.materialArray
            ));
        }

        return arr;
    }
}