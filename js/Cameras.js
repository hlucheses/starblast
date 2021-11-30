/**
 * 
 * Grupo 2:
 * -Andreia de Brito
 * -Hélder da Costa
 *- Miguel Gamboa
 * 
 */
function createCameras() {
    //camera frontal
    var cameraFrontal = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 2000);
    cameraFrontal.position.set(0, 5, 200);
    cameraFrontal.lookAt(0, 0, 0);

    //camera lateral
    var cameraLateral = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, 0.6, 2000);
    cameraLateral.position.set(270, 5, 30);
    cameraLateral.rotation.set(0, -Math.PI / 2, 0);
    cameraLateral.scale.set(4.592, 4.741, 6.062);
    cameraLateral.lookAt(0, 0, 0);

    //camera de topo
    var cameraTopo = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
    cameraTopo.position.set(0, 160, 5);
    cameraTopo.rotation.set(Math.PI / 2, 0, 0);
    cameraTopo.lookAt(0, 0, 0);

    var dynamicCamera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 2000);
    dynamicCamera.position.set(0, 5, 150);
    dynamicCamera.lookAt(0, 0, 0);


    return { current: cameraFrontal, side: cameraLateral, front: cameraFrontal, top: cameraTopo, dynamic: dynamicCamera };
}