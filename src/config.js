const FOG_COLOR = [0.8, 0.9, 1.0, 1.0];

const settings = {
    fogNear: 10.0,
    fogFar: 500.0,
};

// ---- Cubos ---
const NUM_CUBES = 40;
const CUBE_SIZE = 100;

const X_OFF = 1.1 * (CUBE_SIZE);
const Z_OFF = 1.4 * (CUBE_SIZE);

const CUBE_X_BASE = -2 * (CUBE_SIZE);

const CUBE_PHASE = 0.1;

const ROT_X_SPEED = -0.4;
const ROT_Y_SPEED = -0.7;

// ---- Camara / proyeccion ---

const FOV_DEG = 60;

const NEAR_PLANE = 1 * (CUBE_SIZE);
const FAR_PLANE = 40 * (CUBE_SIZE);

const CAM_POS = [0, 0, 2 * (CUBE_SIZE)];
const CAM_TARGET = [0, 0, 0];
const CAM_UP = [0, 1, 0];

// ---- Textura ---
const TEXTURE_PATH = 'assets/f-texture.png';

// Sliders
const FOG_MIN = 0;
const FOG_MAX = FAR_PLANE;
const FOG_STEP = 1;
