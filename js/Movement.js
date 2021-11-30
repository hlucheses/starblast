/**
 * 
 * Grupo 2:
 * -Andreia de Brito
 * -Hélder da Costa
 *- Miguel Gamboa
 * 
 */
function updatePlayer(deltaTime) {

    let damping = Math.exp(-4 * deltaTime) - 1;

    playerVelocity.addScaledVector(playerVelocity, damping);

    const deltaPosition = playerVelocity.clone().multiplyScalar(deltaTime);
    playerSpaceship.position.x += deltaPosition.x;
    playerSpaceship.position.y += deltaPosition.y;
    playerSpaceship.position.z += deltaPosition.z;
}

/**
 * 
 * @returns 
 * 
 */
function getForwardVector() {

    cameras.current.getWorldDirection(playerDirection);

    playerDirection.y = 0;
    playerDirection.normalize();

    return playerDirection;
}

function getSideVector() {

    cameras.current.getWorldDirection(playerDirection);

    playerDirection.y = 0;
    playerDirection.normalize();
    playerDirection.cross(cameras.current.up);

    return playerDirection;
}

/*calculo da velocidade*/
var v0 = 0;
var v = { up: 0, down: 0, left: 0, right: 0 };
var a = .008;
var stoppingAcceleration = .035;

function controls(deltaTime) {

    const speedDelta = deltaTime * 25;
    const tiltSpeed = .1;
    const MAX_SPEED = 5;

    if (keyStates['ArrowUp']) {

        if ((v.up < MAX_SPEED) ) {
            if (playerSpaceship.position.z > 45){
                v.up += a;
            }else{
                v.up = 0;
            }
           
        }

        playerVelocity.add(getForwardVector().multiplyScalar(v.up * speedDelta));
        
    } else {
        if (v.up > 0) {
            v.up -= stoppingAcceleration;

            if (v.up < 0) {
                v.up = 0;
            }

            playerVelocity.add(getForwardVector().multiplyScalar(v.up * speedDelta));
        }
    }

    if (keyStates['ArrowDown']) {

        if (v.down < MAX_SPEED) {
            if(playerSpaceship.position.z < 78){
                v.down += a;
            }else{
                v.down = 0;
            }
            
        }

        playerVelocity.add(getForwardVector().multiplyScalar(v.down * -speedDelta));
        
    } else {
        if (v.down > 0) {
            v.down -= stoppingAcceleration;

            if (v.down < 0) {
                v.down = 0;
            }

            playerVelocity.add(getForwardVector().multiplyScalar(v.down * -speedDelta));
        }
    }

    if (keyStates['ArrowLeft']) {

        if (v.left < MAX_SPEED) {
            if(playerSpaceship.position.x > -89){
                v.left += a;
            }else{
                v.left = 0;

            }
           
        }

        playerVelocity.add(getSideVector().multiplyScalar(v.left * -speedDelta));

        if (playerSpaceship.userData.tiltLeft < 1 && cameras.current != cameras.side) {
            playerSpaceship.userData.tiltLeft += tiltSpeed;
            playerSpaceship.rotation.z = playerSpaceship.userData.tiltLeft * (Math.PI / 8);
        }
        console.log(playerSpaceship.position.x);
    } else {
        if (playerSpaceship.userData.tiltLeft > 0 && cameras.current != cameras.side) {
            playerSpaceship.userData.tiltLeft -= tiltSpeed;
            playerSpaceship.rotation.z = playerSpaceship.userData.tiltLeft * (Math.PI / 8);
        }

        if (v.left > 0) {
            if(playerSpaceship.position.x > -89){
                v.left -= stoppingAcceleration;
            }else{
                v.left = 0;
            }
            

            if (v.left < 0) {
                v.left = 0;
            }

            playerVelocity.add(getSideVector().multiplyScalar(v.left * -speedDelta));
        }
    }

    if (keyStates['ArrowRight']) {

        if (v.right < MAX_SPEED) {
            if(playerSpaceship.position.x < 89){
                v.right += a;
            }else{
                v.right = 0;
            }
            
        }

        playerVelocity.add(getSideVector().multiplyScalar(v.right * speedDelta));

        if (playerSpaceship.userData.tiltRight < 1 && cameras.current != cameras.side) {
            playerSpaceship.userData.tiltRight += tiltSpeed;
            playerSpaceship.rotation.z = -playerSpaceship.userData.tiltRight * (Math.PI / 8);
        }
    } else {
        if (playerSpaceship.userData.tiltRight > 0 && cameras.current != cameras.side) {
            playerSpaceship.userData.tiltRight -= tiltSpeed;
            playerSpaceship.rotation.z = -playerSpaceship.userData.tiltRight * (Math.PI / 8);
        }

        if (v.right > 0) {
            if(playerSpaceship.position.x < 89){
                v.right -= stoppingAcceleration;
            }else{
                v.right = 0;
            }
            

            if (v.right < 0) {
                v.right = 0;
            }

            playerVelocity.add(getSideVector().multiplyScalar(v.right * speedDelta));
        }
    }
}