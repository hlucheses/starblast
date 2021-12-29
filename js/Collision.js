/**
 * StarBlast, jogo de naves espaciais.
 *
 * Este projecto é um projecto da cadeira de computação gráfica
 * como requisito parcial de avaliação do 4º ano de engenharia
 * informática (ISPTEC - Luanda, Angola).
 *
 * @link   https://github.com/hlucheses/starblast/
 * @file   Classe estática responsável pela colisão dos elementos de StarBlast.
 * @author Andreia Vanessa Graça de Brito
 * @author Helder Lucheses Gonçalves da Costa
 * @author Miguel Gamboa Francisco Domingos
 * @since  27.12.2021
 * 
 * @contact {20180296@isptec.co.ao, helder@lucheses.com, miguel@indiouz.com}
 */

class Collision {

    /**
     * Trata das colisões entre naves. Recebe um vetor de naves
     * @param {array} spaceshipArray 
     */
    static checkAmongSpaceships(spaceshipArray) {

        for (var i = 0; i < spaceshipArray.length - 1; i++) {

            for (var j = i + 1; j < spaceshipArray.length; j++) {

                if (this.hasCollided(spaceshipArray[i].boundingBox, spaceshipArray[j].boundingBox)) {

                    this.treatCollision(spaceshipArray[i], spaceshipArray[j]);

                    // Impedir que as naves se movimentem no eixo vertical
                    spaceshipArray[i].speed.y = 0;
                    spaceshipArray[j].speed.y = 0;

                    // Se for uma nave inimiga (2) procura um novo sítio para ir
                    if (spaceshipArray[i].type == Constants.ENEMY) {
                        spaceshipArray[i].newTarget();
                    }

                    if (spaceshipArray[j].type == Constants.ENEMY) {
                        spaceshipArray[j].newTarget();
                    }
                }
            }
        }
    }

    /**
     * Verifica colisões entre as balas e as naves
     * @param {array} bulletsArray 
     * @param {array} spaceshipArray 
     */
    static checkBulletsSpaceships(bulletsArray, spaceshipArray) {
        for (var i = 0; i < spaceshipArray.length; i++) {

            for (var j = 0; j < bulletsArray.length; j++) {

                if (bulletsArray[j].type != spaceshipArray[i].type
                    && this.hasCollided(spaceshipArray[i].boundingBox, bulletsArray[j].boundingBox)) {

                    this.treatCollision(spaceshipArray[i], bulletsArray[j]);

                    // Impedir que as naves se movimentem no eixo vertical
                    spaceshipArray[i].speed.y = 0;
                    spaceshipArray[i].lives--;

                    bulletsArray[j].collided = true;
                }
            }
        }
    }

    /**
     * Verifica colisões entre um objecto e uma parede
     * HACK: O jogo não consegui interpretar a parede como
     * um objecto então foi feito esse workaround.
     * Posteriormente analisar de forma mais detalhada estas
     * colisões
     * @param {StarBlastObject} object 
     */
    static checkAgainstWalls(object) {

        const restitution = .5; // Restituição da velocidade
        let canvasSize = Constants.WALL_WIDTH / 2;

        const posObj = object.design.position;
        const yBoundaries = posObj.y >= -Constants.WALL_HEIGHT / 2 && posObj.y <= Constants.WALL_HEIGHT / 2;

        const xBoundaries = posObj.x >= (-canvasSize - Constants.WALL_THICKNESS)
            && posObj.x <= (canvasSize + Constants.WALL_THICKNESS);

        const zBoundaries = posObj.z >= (-canvasSize - Constants.WALL_THICKNESS)
            && posObj.z <= (canvasSize + Constants.WALL_THICKNESS);

        const checkBoundaries = xBoundaries && yBoundaries && zBoundaries;

        if (checkBoundaries) {

            canvasSize -= Constants.WALL_THICKNESS / 2;
            let bounced = false;
            const obj = object;
            let boxSize = new THREE.Vector3();
            boxSize = object.boundingBox.getSize(boxSize);
            const xBoxRadius = boxSize.x / 2;
            const zBoxRadius = boxSize.z / 2;

            // Check for left and right
            if (posObj.x < -canvasSize + xBoxRadius) {
                obj.speed.x = Math.abs(obj.speed.x) * restitution;
                posObj.x = -canvasSize + xBoxRadius;
                bounced = true;
            } else if (posObj.x > canvasSize - xBoxRadius) {
                obj.speed.x = -Math.abs(obj.speed.x) * restitution;
                posObj.x = canvasSize - xBoxRadius;
                bounced = true;
            }

            // Check for front and back
            if (posObj.z < -canvasSize + zBoxRadius) {
                obj.speed.z = Math.abs(obj.speed.z) * restitution;
                posObj.z = -canvasSize + zBoxRadius;
                bounced = true;
            } else if (posObj.z > canvasSize - zBoxRadius) {
                obj.speed.z = -Math.abs(obj.speed.z) * restitution;
                posObj.z = canvasSize - zBoxRadius;
                bounced = true;
            }

            if (bounced && object.name == "enemy") {
                object.moveRandomly();
            }
        }

    }

    /**
     * Verifica colisão entre as balas
     * @param {array}
     */
    static checkAmongBullets(bulletsArray) {
        for (var i = 0; i < bulletsArray.length - 1; i++) {
            for (var j = i + 1; j < bulletsArray.length; j++) {
                if (this.hasCollidedSphere(
                    bulletsArray[i].boundingSphere,
                    bulletsArray[j].boundingSphere)) {

                    this.treatCollision(bulletsArray[i], bulletsArray[j]);
                }
            }
        }
    }

    /**
     * Verifica a colisão AABB entre 2 boundingBoxes
     * @param {THREE.Box3} a 
     * @param {THREE.Box3} b 
     * @returns {boolean}
     */
    static hasCollided(a, b) {
        return (a.min.x <= b.max.x && a.max.x >= b.min.x) &&
            (a.min.y <= b.max.y && a.max.y >= b.min.y) &&
            (a.min.z <= b.max.z && a.max.z >= b.min.z);
    }

    /**
     * Verifica se há colisão de esferas
     * @param {THREE.Sphere} a 
     * @param {THREE.Sphere} b 
     * @returns {boolean}
     */
    static hasCollidedSphere(a, b) {
        var squareDistance = (a.center.x - b.center.x) * (a.center.x - b.center.x)
            + (a.center.y - b.center.y) * (a.center.y - b.center.y)
            + (a.center.z - b.center.z) * (a.center.z - b.center.z);
        return squareDistance <= ((a.radius + b.radius) * (a.radius + b.radius));
    }

    /**
     * Trata entre 2 objectos
     * @param {StarBlastObject} objA 
     * @param {StarBlastObject} objB 
     */
    static treatCollision(objA, objB) {
        let vCollision = {
            x: objB.design.position.x - objA.design.position.x,
            y: objB.design.position.y - objA.design.position.y,
            z: objB.design.position.z - objA.design.position.z
        };

        let distance = Math.sqrt(
            (objB.design.position.x - objA.design.position.x)
            * (objB.design.position.x - objA.design.position.x)

            + (objB.design.position.y - objA.design.position.y)
            * (objB.design.position.y - objA.design.position.y)

            + (objB.design.position.z - objA.design.position.z)
            * (objB.design.position.z - objA.design.position.z)
        );

        let vCollisionNorm = {
            x: vCollision.x / distance,
            y: vCollision.y / distance,
            z: vCollision.z / distance
        };

        let vRelativeVelocity = {
            x: objA.speed.x - objB.speed.x,
            y: objA.speed.y - objB.speed.y,
            z: objA.speed.z - objB.speed.z
        };

        let speed = vRelativeVelocity.x * vCollisionNorm.x
            + vRelativeVelocity.y * vCollisionNorm.y
            + vRelativeVelocity.z * vCollisionNorm.z;

        if (speed < 0) {
            return;
        }

        let impulse = 2 * speed / (objA.mass + objB.mass);

        objA.speed.x -= (impulse * objB.mass * vCollisionNorm.x);
        objA.speed.y -= (impulse * objB.mass * vCollisionNorm.y);
        objA.speed.z -= (impulse * objB.mass * vCollisionNorm.z);

        objB.speed.x += (impulse * objA.mass * vCollisionNorm.x);
        objB.speed.y += (impulse * objA.mass * vCollisionNorm.y);
        objB.speed.z += (impulse * objA.mass * vCollisionNorm.z);
    }
}