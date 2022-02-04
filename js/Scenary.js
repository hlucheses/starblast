/**
 * StarBlast, jogo de naves espaciais.
 *
 * Este projecto é um projecto da cadeira de computação gráfica
 * como requisito parcial de avaliação do 4º ano de engenharia
 * informática (ISPTEC - Luanda, Angola).
 *
 * @link   https://github.com/hlucheses/starblast/
 * @file   Classe estática que representa os elementos do cenário.
 * @author Andreia Vanessa Graça de Brito
 * @author Helder Lucheses Gonçalves da Costa
 * @author Miguel Gamboa Francisco Domingos
 * @since  27.12.2021
 * 
 * @contact {20180296@isptec.co.ao, helder@lucheses.com, miguel@indiouz.com}
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

    static walls = {
        left: null,
        right: null,
        top: null,
        bottom: null
    }

    static spotlights = {
        topLeft: null,
        topRight: null,
        bottomLeft: null,
        bottomRight: null
    }
    
    static floor = null;

    static l = null;
    /**
     * Constutor estático, declarado abaixo da classe
     */
    static staticConstructor() {
        this.initializePlanes();
        this.setPlanes();
        this.initializeWalls();
        this.setAmbientalLight();
        this.setSpotlights();
    }
    /**
     * Inicializa 6 planos (formar uma caixa)
     */
    static initializePlanes() {
        var geometry = new THREE.PlaneGeometry(Constants.SPACE.width, Constants.SPACE.height);
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

    /**
     * Coloca as paredes internas
     */
    static initializeWalls() {
        this.walls.left = new Wall(-Constants.WALL_WIDTH / 2, 0, 0, Math.PI / 2);
        this.walls.right = new Wall(Constants.WALL_WIDTH / 2, 0, 0, Math.PI / 2);
        this.walls.top = new Wall(0, 0, -Constants.WALL_WIDTH / 2);
        this.walls.bottom = new Wall(0, 0, Constants.WALL_WIDTH / 2); 
        this.floor = new Floor(0, -Constants.WALL_HEIGHT / 1.2, 0);
    }

    /**
     * Coloca os planos nas extremidades do espaço
     */
    static setPlanes() {
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

    /**
     * Calcula uma posição aleatória para cada estrela e as coloca no campo
     * @returns {THREE.Group}
     */
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

            // Escolhe aleatória mente 1 ou -1
            do {
                extremidade = Constants.randomNumber(-1, 1);
            } while (extremidade == 0);

            // Gera a posição da estrela aleatoriamente
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

    static getPlanets() {
        var planetGroup = new THREE.Group();
        var raio, planetColor;
        for (var i = 1; i <= Constants.NUMBER_OF_PLANETS; i++) {
            var x = Constants.randomNumber(-Constants.SPACE.width / 2, Constants.SPACE.width / 2);
            var y = Constants.randomNumber(-Constants.SPACE.height / 2, Constants.SPACE.height / 2);
            var z = Constants.randomNumber(-Constants.SPACE.depth / 2, Constants.SPACE.depth / 2);
            raio = Math.floor(Math.random() * 6);
            planetColor = Constants.COLORS.planets[Constants.randomNumber(0, Constants.COLORS.planets.length - 1)];
    
             // O plano onde será colocada o planeta
             var planoAtual = Constants.randomNumber(1, 3);

             /* 
                 Representa em que lado o planeta será colocado
                 -1: esquerda, baixo, atrás
                 1: direita, cima, à frente
                 {(esquerda, direita), (cima, baixo), (à frente, atrás)}
             */
             var extremidade;
 
             // Escolhe aleatoriamente 1 ou -1
             do {
                 extremidade = Constants.randomNumber(-1, 1);
             } while (extremidade == 0);
             
 
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

            var planet = new THREE.Mesh(new THREE.SphereGeometry(raio, 20, 20), new THREE.MeshBasicMaterial({
                color: planetColor
            }));
            planet.position.set(x, y, z);
            planetGroup.add(planet);
        }
        return planetGroup;
    
    }
    static setAmbientalLight() {
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0);
        return directionalLight;
    }

    
    static setSpotlights() {
        this.spotlights.topLeft = new Spotlight(
            -Constants.WALL_WIDTH / 2,
            Constants.WALL_HEIGHT / 2,
            -Constants.WALL_WIDTH / 2,
            Math.PI / 1.5
        );

        this.spotlights.bottomLeft = new Spotlight(
            -Constants.WALL_WIDTH / 2,
            Constants.WALL_HEIGHT / 2,
            Constants.WALL_WIDTH / 2,
            -Math.PI / 1.5
        );

        this.spotlights.bottomRight = new Spotlight(
            Constants.WALL_WIDTH / 2,
            Constants.WALL_HEIGHT / 2,
            Constants.WALL_WIDTH / 2,
            -Math.PI / 4
        );

        this.spotlights.topRight = new Spotlight(
            Constants.WALL_WIDTH / 2,
            Constants.WALL_HEIGHT / 2,
            -Constants.WALL_WIDTH / 2,
            Math.PI / 4
        );
    }

    static changeWallsColor(level) {

        let wallColor = null;

        if (level > 0 && level < 4){
            wallColor = Constants.COLORS.walls.default;
        } else if ( level >= 4 && level <= 8){
            wallColor = Constants.COLORS.walls.scenary2;
        } else if ( level >= 9 && level <= 17){
            wallColor = Constants.COLORS.walls.scenary2;
        } else if ( level == 18 ){
            wallColor = Constants.COLORS.walls.scenary3;
        } else {
            wallColor = Constants.COLORS.walls.default;
        }

        console.log(wallColor);

        for (let [key, wall] of Object.entries(Scenary.walls)) {
            for (let [key, wallPart] of Object.entries(wall.designParts)) {
                wallPart.mesh.material.color.set(wallColor);
            }
        }
    }
}

// Inicializa a classe
Scenary.staticConstructor();