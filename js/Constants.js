/**
 * Classe que define constantes importantes do programa
 */

class Constants {

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
        }
    }

    // Número de inimigos
    static NUMBER_OF_ENEMIES = 7;

    /* Cenário */

    // Tamanho das paredes
    static WALL_SIZE = {height: 800, width: 800};

    // Tamanho do espaço da cena
    static SPACE = {height: 700, width: 700, depth: 700};

    // Número de estrelas
    static NUMBER_OF_STARS = 5000;
    // Define a distância mínima das estrelas ao centro da cena em %
    static LIMITE_ESTRELAS = 0.6;

    static SHOW_BOUNDING_BOX_HELPERS = true;

    static PLAYER = 1;
    static ENEMY = 2;


    // Limite lateral das naves
    static LEFT_LIMIT = -120;
    static RIGHT_LIMIT = 120;

    // Limite longitudenal das naves inimigas
    static ENEMY_FRONT_LIMIT = -30;
    static ENEMY_BACK_LIMIT = -60;  
    
    static PLAYER_FRONT_LIMIT = 20;
    static PLAYER_BACK_LIMIT = 180;

    /**
     * Gera um número aleatório de start a end
     * @param {number} start 
     * @param {number} end 
     * @returns {number}
     */
    static randomNumber(start, end) {
        return start + Math.floor(Math.random() * (end - start + 1));
    }

    static pixelsToMeters(number) {
        return number * this.PIXELS_TO_METERS;
    }

    static metersToPixels(number) {
        return number / this.PIXELS_TO_METERS;
    }

    static vectorLength(vector) {
        return Math.sqrt(vector.x * vector.x + vector.y * vector.y + vector.z * vector.z);
    }

    static compareVectors(vector1, vector2) {
        return vector1.x == vector2.x && vector1.y == vector2.y && vector1.z == vector2.z;
    }

    static getSignal(number) {
        return number / Math.abs(number);
    }
}