# Técnica: shader de niebla por profundidad

## Idea general

La niebla clásica por profundidad atenúa el color de cada fragmento según la distancia del punto que representa respecto a la cámara. Los pasos del pipeline son:

1. **Vertex shader**: calcula la posición en espacio de vista y extrae la profundidad.
2. **Fragment shader**: muestrea la textura, calcula la cantidad de niebla con `smoothstep` y mezcla el color de la textura con el color de la niebla.

Toda la implementación vive en [shaders.js](../src/shaders.js).

## Vertex shader

```glsl
attribute vec3 aPosition;
attribute vec2 aTexCoord;

uniform mat4 uProjectionMatrix;
uniform mat4 uModelViewMatrix;

varying vec2  vTexcoord;
varying float vFogDepth;

void main() {
  vTexcoord  = aTexCoord;
  vec4 viewPos = uModelViewMatrix * vec4(aPosition, 1.0);
  vFogDepth   = -viewPos.z;                    // profundidad positiva hacia adelante
  gl_Position = uProjectionMatrix * viewPos;
}
```

Detalles:

- `uProjectionMatrix` y `uModelViewMatrix` son uniforms que p5.js asigna automáticamente; no se configuran manualmente.
- En espacio de vista la cámara mira hacia `−Z`, por lo que la profundidad se obtiene negando `viewPos.z`: puntos más lejanos producen un `vFogDepth` mayor.
- `vFogDepth` se interpola por el rasterizador entre vértices, así cada fragmento recibe la profundidad estimada de su punto.

## Fragment shader

```glsl
precision mediump float;

varying vec2  vTexcoord;
varying float vFogDepth;

uniform sampler2D uTexture;
uniform vec4  uFogColor;
uniform float uFogNear;
uniform float uFogFar;

void main() {
  vec4  color       = texture2D(uTexture, vTexcoord);
  float fogAmount   = smoothstep(uFogNear, uFogFar, vFogDepth);
  gl_FragColor      = mix(color, uFogColor, fogAmount);
}
```

### Cálculo de la niebla

- `smoothstep(uFogNear, uFogFar, d)` devuelve:
  - `0` cuando `d ≤ uFogNear` → sin niebla, se ve la textura completa.
  - `1` cuando `d ≥ uFogFar` → niebla total, se ve solo `uFogColor`.
  - Una transición suave (hermite) en medio.
- `mix(color, uFogColor, fogAmount)` interpina el color final entre la textura y el color de la niebla.

Usar `smoothstep` en lugar de una interpolación lineal (`mix(0,1,(d−near)/(far−near))`) evita el aspecto "a pasos" y produce un degradado más natural.

### Valores por defecto

| Parámetro | Valor | Efecto |
|-----------|-------|--------|
| `fogNear` | `10` | La niebla apenas empieza a actuar cerca de la cámara |
| `fogFar` | `500` | A partir de esta distancia el objeto está completamente envuelto |
| `FOG_COLOR` | `[0.8, 0.9, 1.0, 1.0]` | Niebla azulada clara (RGBA normalizado 0–1) |

Con 41 cubos que se alejan por `Z`, los primeros cubos se ven nítidos y los lejanos se disuelven en el color de fondo (que es el mismo `FOG_COLOR` aplicado en [background()](../src/main.js:18)), logrando una integración perfecta entre escena y niebla.

## Uniforms del shader

| Uniform | Tipo | Origen | Descripción |
|---------|------|--------|-------------|
| `uProjectionMatrix` | `mat4` | p5.js | Matriz de proyección en perspectiva |
| `uModelViewMatrix` | `mat4` | p5.js | Matriz modelo-vista (posición de cámara y transformaciones) |
| `uTexture` | `sampler2D` | [main.js](../src/main.js:34) | Textura de los cubos, asignada en cada iteración del bucle |
| `uFogColor` | `vec4` | [config.js](../src/config.js:1) | Color de la niebla |
| `uFogNear` | `float` | [settings.fogNear](../src/config.js:3) | Distancia de inicio (slider) |
| `uFogFar` | `float` | [settings.fogFar](../src/config.js:4) | Distancia de saturación (slider) |

## Integración con p5.js

```js
function initFog() {
  fogShader = createShader(fogVert, fogFrag);   // compila el par vert/frag
}

function applyFog() {
  if (!fogShader) return;
  shader(fogShader);                             // activa el shader en el pipeline
  fogShader.setUniform('uFogColor', FOG_COLOR);
  fogShader.setUniform('uFogNear', settings.fogNear);
  fogShader.setUniform('uFogFar',  settings.fogFar);
}
```

- [`initFog()`](../src/shaders.js:38) se llama una sola vez en [`setup()`](../src/main.js:6).
- [`applyFog()`](../src/shaders.js:42) se llama en cada fotograma, antes de dibujar los cubos, para que los valores editados desde el panel se reflejen de inmediato.
