const fogVert = `
attribute vec3 aPosition;
attribute vec2 aTexCoord;

uniform mat4 uProjectionMatrix;
uniform mat4 uModelViewMatrix;

varying vec2 vTexcoord;
varying float vFogDepth;

void main() {
  vTexcoord = aTexCoord;
  vec4 viewPos = uModelViewMatrix * vec4(aPosition, 1.0);
  vFogDepth = -viewPos.z;
  gl_Position = uProjectionMatrix * viewPos;
}
`;

const fogFrag = `
precision mediump float;

varying vec2 vTexcoord;
varying float vFogDepth;

uniform sampler2D uTexture;
uniform vec4  uFogColor;
uniform float uFogNear;
uniform float uFogFar;

void main() {
  vec4 color = texture2D(uTexture, vTexcoord);
  float fogAmount = smoothstep(uFogNear, uFogFar, vFogDepth);
  gl_FragColor = mix(color, uFogColor, fogAmount);
}
`;
let fogShader = null;

function initFog() {
  fogShader = createShader(fogVert, fogFrag);
}

function applyFog() {
  if (!fogShader) return;
  shader(fogShader);

  fogShader.setUniform('uFogColor', FOG_COLOR);
  fogShader.setUniform('uFogNear', settings.fogNear);
  fogShader.setUniform('uFogFar', settings.fogFar);
}
