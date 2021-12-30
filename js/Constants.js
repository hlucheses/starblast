/**
 * StarBlast, jogo de naves espaciais.
 *
 * Este projecto é um projecto da cadeira de computação gráfica
 * como requisito parcial de avaliação do 4º ano de engenharia
 * informática (ISPTEC - Luanda, Angola).
 *
 * @link   https://github.com/hlucheses/starblast/
 * @file   Classe estática que define constantes importantes do programa.
 * @author Andreia Vanessa Graça de Brito
 * @author Helder Lucheses Gonçalves da Costa
 * @author Miguel Gamboa Francisco Domingos
 * @since  27.12.2021
 * 
 * @contact {20180296@isptec.co.ao, helder@lucheses.com, miguel@indiouz.com}
 */

 class Constants {

    /* FIXME: Estas constantes NÃO FUNCIONAM EM spaceships/Spaceship.js */

    /*static SPACESHIP_ACCELERATION;
    static SPACESHIP_BRAKING;
    static SPACESHIP_MAX_SPEED;

    static staticConstructor() {
        SPACESHIP_ACCELERATION = this.metersToPixels(1);
        SPACESHIP_BRAKING = this.metersToPixels(1);
        SPACESHIP_MAX_SPEED = this.metersToPixels(80);
    }*/

    // 1 pixel equivale a PIXELS_TO_METERS metros
    static PIXELS_TO_METERS = 40;

    // Cores utilizadas no programa
    static COLORS = {
        world: '#0B0A13',
        stars: ['#FFCB0C', '#E4E7E7'],
        enemySpaceship: {
            main: 0x850000,
            secondary: 0x750000,
            third: 0x0c0c0d,
            fourth: 0x201313
        },
        cannons: {
            default: 0x00d5ff,
            selected: 0xff0000,
        },
        walls: '#FFFFFF',
    }

    // Número de inimigos
    static NUMBER_OF_ENEMIES = 7;

    /* Cenário */

    // Tamanho dos planos
    static PLANES = {height: 1200, width: 1200};

    //Intensidade da luz
    static INTENSIDADE = 1;
    // Tamanho do espaço da cena
    static SPACE = {height: 1200, width: 1200, depth: 1200};

    // Número de estrelas
    static NUMBER_OF_STARS = 5000;
    // Define a distância mínima das estrelas ao centro da cena em %
    static LIMITE_ESTRELAS = 0.6;

    // Mostrar bounding boxes
    static SHOW_BOUNDING_BOX_HELPERS = false;

    //Mostrar Helpers Lights
    static SHOW_LIGHTS_HELPERS =  false;
    // Constantes que determinam o tipo de spaceship
    static PLAYER = 1;
    static ENEMY = 2;

    //X e Y das paredes internas
    static WALL_WIDTH = 500;
    static WALL_HEIGHT = 100;
    static WALL_THICKNESS = 20;

    // Limite lateral das naves
    static LEFT_LIMIT = -120;
    static RIGHT_LIMIT = 120;

    // Limite longitudenal das naves inimigas
    static ENEMY_FRONT_LIMIT = -30;
    static ENEMY_BACK_LIMIT = -60;  
    
    // Limite longitudenal da nave do player
    static PLAYER_FRONT_LIMIT = 20;
    static PLAYER_BACK_LIMIT = 180;

    // Número inicial de vidas
    static STARTING_LIVES = 2;

    // Aceleração gravítica (fazer em relação a metros)
    static GRAVITY = .013;

    // Constantes referentes aos tipos de meshes
    static MESH_TYPE = {
        basic: 0,
        lambert: 1,
        phong: 2,
        default: 0
    };

    static DEFAULT_SHADOWING = Constants.MESH_TYPE.basic;

    // Constantes referentes à massa dos objectos
    static MASS = {
        player: 1,
        enemy: 1,
        bullet: .1,
        spotlight: .1,
        wall: 100000
    }

    /**
     * Gera um número aleatório de start a end
     * @param {number} start 
     * @param {number} end 
     * @returns {number}
     */
    static randomNumber(start, end) {
        return start + Math.floor(Math.random() * (end - start + 1));
    }

    /**
     * Converte um número de pixels para metros
     * @param {number} number 
     * @returns {number}
     */
    static pixelsToMeters(number) {
        return number * this.PIXELS_TO_METERS;
    }

    /**
     * Converte um numero de metros para pixels
     * @param {number} number 
     * @returns {number}
     */
    static metersToPixels(number) {
        return number / this.PIXELS_TO_METERS;
    }

    /**
     * Calcula pelo teorema de Pitágoras o módulo de um vector tridimensional
     * @param {THREE.Vector3} vector 
     * @returns {number}
     */
    static vectorLength(vector) {
        return Math.sqrt(vector.x * vector.x + vector.y * vector.y + vector.z * vector.z);
    }

    /**
     * Compara dois vectores e diz se são iguais (true) ou não (false)
     * @param {THREE.Vector3} vector1 
     * @param {THREE.Vector3} vector2 
     * @returns {boolean}
     */
    static compareVectors(vector1, vector2) {
        return vector1.x == vector2.x && vector1.y == vector2.y && vector1.z == vector2.z;
    }

    /**
     * Retorna o sinal de um numero, -1 se for negativo 1 se for positivo e
     * 0 se for 0
     * @param {number} number 
     * @returns {number}
     */
    static getSignal(number) {
        if (number == 0) {
            return 0;
        }

        return number / Math.abs(number);
    }
}

// inicializa o construtor estático
//Constants.staticConstructor();