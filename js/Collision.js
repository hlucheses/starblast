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


                if (this.hasColided(spaceshipArray[i].boundingBox, spaceshipArray[j].boundingBox)) {

                    /* A colisão só é calculada nos eixos de movimento (x e z) */
                    var vCollision = {
                        x: spaceshipArray[j].design.position.x - spaceshipArray[i].design.position.x,
                        z: spaceshipArray[j].design.position.z - spaceshipArray[i].design.position.z
                    };

                    // Calcula a distância entre as duas naves
                    var distance = Math.sqrt(
                        (spaceshipArray[j].design.position.x - spaceshipArray[i].design.position.x)
                        * (spaceshipArray[j].design.position.x - spaceshipArray[i].design.position.x)
                        + (spaceshipArray[j].design.position.z - spaceshipArray[i].design.position.z)
                        * (spaceshipArray[j].design.position.z - spaceshipArray[i].design.position.z)
                    );

                    // Norma dos vectores de colisão
                    let vCollisionNorm = { x: vCollision.x / distance, z: vCollision.z / distance };

                    // Velocidade relativa
                    let vRelativeVelocity = {
                        x: spaceshipArray[i].speed.x - spaceshipArray[j].speed.x,
                        z: spaceshipArray[i].speed.z - spaceshipArray[j].speed.z
                    };

                    // Velocidade calculada
                    let speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.z * vCollisionNorm.z;

                    if (speed < 0) {
                        break;
                    }

                    spaceshipArray[i].speed.x -= (speed * vCollisionNorm.x);
                    spaceshipArray[i].speed.z -= (speed * vCollisionNorm.z);
                    spaceshipArray[j].speed.x += (speed * vCollisionNorm.x);
                    spaceshipArray[j].speed.z += (speed * vCollisionNorm.z);

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
     * Verifica a colisão AABB entre 2 boundingBoxes
     * @param {THREE.Box3} a 
     * @param {THREE.Box3} b 
     * @returns 
     */
    static hasColided(a, b) {
        return (a.min.x <= b.max.x && a.max.x >= b.min.x) &&
            (a.min.y <= b.max.y && a.max.y >= b.min.y) &&
            (a.min.z <= b.max.z && a.max.z >= b.min.z);
    }
}