/**
 * 
 * Grupo 2:
 * -Andreia de Brito
 * -Hélder da Costa
 *- Miguel Gamboa
 * 
 */

function createCenario() {
    var geometry = new THREE.PlaneGeometry(800, 800);
    var material = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        color: '#0B0A13'

    });
    var leftPlane = new THREE.Mesh(geometry, material);
    var topPlane = new THREE.Mesh(geometry, material);
    var rightPlane = new THREE.Mesh(geometry, material);
    var bottomPlane = new THREE.Mesh(geometry, material);
    var backPlane = new THREE.Mesh(geometry, material);

    var frontPlane = new THREE.Mesh(geometry, material);

    setPlanosPosition(leftPlane, topPlane, rightPlane, bottomPlane, backPlane, frontPlane);
    setStars();


}

function createStars() {
    var aux = 0;
    var starsGroup = new THREE.Group();
    for (i = 1; i <= 3000; i++) {

        x = Math.floor(Math.random() * (-600 - 600) + 600);
        y = Math.floor(Math.random() * (-600 - 600) + 600);
        z = Math.floor(Math.random() * (-600 - 600) + 600);

        if (aux % 2 == 0) {
            var estrela = new THREE.Mesh(new THREE.OctahedronGeometry(1, 0), new THREE.MeshBasicMaterial({
                color: '#FFCB0C'
            }));
        } else {
            var estrela = new THREE.Mesh(new THREE.OctahedronGeometry(1, 0), new THREE.MeshBasicMaterial({
                color: '#E4E7E7'
            }));
        }
        aux++;
        estrela.position.set(x, y, z);
        starsGroup.add(estrela);
    }
    return starsGroup;
}

//Adicionar aos 3 planos vistos pelas 3 diferentes cameras
function setStars() {

    var sideCam = createStars();
    var frontCam = createStars();
    var topCam = createStars();

    //posicionar as estrelas nos planos
    sideCam.position.set(0, 0, -350);
    frontCam.position.set(350, 0, 0);
    topCam.position.set(0, -350, 0);

    frontCam.rotateY(1.6);
    topCam.rotateX(1.6);

    //adicionar à cena

    scene.add(sideCam);
    scene.add(frontCam);
    scene.add(topCam);
}


function setPlanosPosition(left, top, right, bottom, back, front) {
    back.position.set(0, 0, -350);
    right.position.set(350, 0, 0);
    left.position.set(-350, 0, 0);
    top.position.set(0, 350, 0);
    bottom.position.set(0, -350, 0);
    front.position.set(0, 0, 350);

    right.rotation.set(0, 1.57079633, 0);
    left.rotation.set(0, 1.57079633, 0);
    top.rotation.set(1.57079633, 0, 0);
    bottom.rotation.set(1.57079633, 0, 0);

    scene.add(back);
    scene.add(right);
    scene.add(left);
    scene.add(top);
    scene.add(bottom);
    scene.add(front);

}