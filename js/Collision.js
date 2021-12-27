class Collision {

    /**
     * Trata das colisões entre naves. Recebe um vetor de naves
     * @param {array} spaceshipArray 
     */

    static checkLimits(spaceshipArray) {
        for (var i = 0; i < spaceshipArray.length; i++) {
            /*if (spaceshipArray[i].design.position.x < Constants.LEFT_LIMIT) {
                spaceshipArray[i].design.position.x = Constants.LEFT_LIMIT;
            }

            if (spaceshipArray[i].design.position.x > Constants.RIGHT_LIMIT) {
                spaceshipArray[i].design.position.x = Constants.RIGHT_LIMIT;
            }*/
        }
    }

    // FIX: As naves de vez em quando se sobrepõem
    static checkAmongSpaceships(spaceshipArray) {

        for (var i = 0; i < spaceshipArray.length; i++) {

            for (var j = 0; j < spaceshipArray.length; j++) {

                if (i != j) {


                    if (this.hasColided(spaceshipArray[i].boundingBox, spaceshipArray[j].boundingBox)) {

                        const xSpeedDiff = spaceshipArray[i].speed.x - spaceshipArray[j].speed.x;
                        const zSpeedDiff = spaceshipArray[i].speed.z - spaceshipArray[j].speed.z;

                        const xDist = spaceshipArray[j].design.position.x - spaceshipArray[i].design.position.x;
                        const zDist = spaceshipArray[j].design.position.z - spaceshipArray[i].design.position.z;

                        if (xSpeedDiff + zSpeedDiff + zDist + xDist >= 0) {
                            var temp = { speed: new THREE.Vector3() };
                            temp.speed.copy(spaceshipArray[i].speed);

                            spaceshipArray[i].speed.copy(spaceshipArray[j].speed);
                            //spaceshipArray[i].acceleration.set(0, 0, 0);

                            spaceshipArray[j].speed.copy(temp.speed);
                            //spaceshipArray[j].acceleration.set(0, 0, 0);

                            /* Se for uma nave inimiga (2) procura um novo sítio para ir */
                            if (spaceshipArray[i].type == Constants.ENEMY) {
                                spaceshipArray[i].newTarget();
                            }

                        }
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
        return (a.min.x < b.max.x && a.max.x > b.min.x) &&
            (a.min.y < b.max.y && a.max.y > b.min.y) &&
            (a.min.z < b.max.z && a.max.z > b.min.z);
    }
}