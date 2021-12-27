/**
 * 
 * Grupo 2:
 * -Andreia de Brito
 * -Hélder da Costa
 *- Miguel Gamboa
 * 
 */

/**
 * Classe abstracta que representa os elementos do cenário
*/

class Scenary {

    // TODO: tornar as estrelas em pontos luminosos
    // static stars = [];
    static planes = {
        left: null,
        right: null,
        top: null,
        bottom: null,
        back: null,
        front: null
    }


    static staticConstructor() {
        this.initializeWalls();
        this.setWalls();
    }

    static initializeWalls() {
        var geometry = new THREE.PlaneGeometry(Constants.WALL_SIZE.width, Constants.WALL_SIZE.height);
        var material = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            color: Constants.COLORS.world
        });

        this.planes.left = new THREE.Mesh(geometry, material);
        this.planes.right = new THREE.Mesh(geometry, material);
        this.planes.top = new THREE.Mesh(geometry, material);
        this.planes.bottom = new THREE.Mesh(geometry, material);
        this.planes.back = new THREE.Mesh(geometry, material);
        this.planes.front = new THREE.Mesh(geometry, material);
    }

    static setWalls() {
        this.planes.left.position.set(-Constants.SPACE.width / 2, 0, 0);
        this.planes.left.rotation.set(0, Math.PI / 2, 0);

        this.planes.right.position.set(Constants.SPACE.width / 2, 0, 0);
        this.planes.right.rotation.set(0, Math.PI / 2, 0);

        this.planes.top.position.set(0, Constants.SPACE.height / 2, 0);
        this.planes.top.rotation.set(Math.PI / 2, 0, 0);

        this.planes.bottom.position.set(0, -Constants.SPACE.height / 2, 0);
        this.planes.bottom.rotation.set(Math.PI / 2, 0, 0);

        this.planes.back.position.set(0, 0, -Constants.SPACE.depth / 2);

        this.planes.front.position.set(0, 0, Constants.SPACE.depth / 2);
    }

    static getStars() {
        var starsGroup = new THREE.Group();

        for (var i = 0; i < Constants.NUMBER_OF_STARS; i++) {
            var geometry = new THREE.OctahedronGeometry(1, 0);
            var material = new THREE.MeshBasicMaterial({
                color: Constants.COLORS.stars[Constants.randomNumber(0, Constants.COLORS.stars.length - 1)]
            });

            // O plano onde será colocada a estrela
            var planoAtual = Constants.randomNumber(1, 3);

            /* 
                Representa em que lado a estrela será colocada
                -1: esquerda, baixo, atrás
                1: direita, cima, à frente
                {(esquerda, direita), (cima, baixo), (à frente, atrás)}
            */
            var extremidade;

            do {
                extremidade = Constants.randomNumber(-1, 1);
            } while (extremidade == 0);

            var x = Constants.randomNumber(-Constants.SPACE.width / 2, Constants.SPACE.width / 2);
            var y = Constants.randomNumber(-Constants.SPACE.height / 2, Constants.SPACE.height / 2);
            var z = Constants.randomNumber(-Constants.SPACE.depth / 2, Constants.SPACE.depth / 2);

            switch (planoAtual) {
                case 1: // Largura
                    x = Constants.randomNumber(
                        extremidade * Constants.SPACE.width / 2,
                        extremidade * Constants.LIMITE_ESTRELAS * Constants.SPACE.width / 2
                    );
                    break;
                case 2: // Altura
                    y = Constants.randomNumber(
                        extremidade * Constants.SPACE.width / 2,
                        extremidade * Constants.LIMITE_ESTRELAS * Constants.SPACE.width / 2
                    );
                    break;
                case 3: // Profundidade
                    z = Constants.randomNumber(
                        extremidade * Constants.SPACE.width / 2,
                        extremidade * Constants.LIMITE_ESTRELAS * Constants.SPACE.width / 2
                    );
                    break;
            }

            var estrela = new THREE.Mesh(geometry, material);
            estrela.position.set(x, y, z);
            starsGroup.add(estrela);
        }
        return starsGroup;
    }
}

Scenary.staticConstructor();