let fTexture;

let modelX = 0;
let modelY = 0;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  fTexture = loadImage(TEXTURE_PATH)

  initFog();
  initFogUI();

  noStroke();
}

function draw() {
  background(FOG_COLOR[0] * 255, FOG_COLOR[1] * 255, FOG_COLOR[2] * 255);

  camera(
    CAM_POS[0], CAM_POS[1], CAM_POS[2],
    CAM_TARGET[0], CAM_TARGET[1], CAM_TARGET[2],
    CAM_UP[0], CAM_UP[1], CAM_UP[2]
  );
  perspective(radians(FOV_DEG), width / height, NEAR_PLANE, FAR_PLANE);

  modelX += ROT_X_SPEED * deltaTime / 1000;
  modelY += ROT_Y_SPEED * deltaTime / 1000;

  applyFog();

  for (let i = 0; i <= NUM_CUBES; i++) {
    push();
    fogShader.setUniform('uTexture', fTexture);

    translate(CUBE_X_BASE + i * X_OFF, 0, -i * Z_OFF);
    rotateX(modelX + i * CUBE_PHASE);
    rotateY(modelY + i * CUBE_PHASE);
    box(CUBE_SIZE);
    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

