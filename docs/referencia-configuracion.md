# Referencia de configuración

Todos los parámetros de la escena están centralizados en [config.js](../src/config.js). No hay configuración dispersa en otros archivos.

## Niebla

| Constante / campo | Valor por defecto | Descripción |
|-------------------|-------------------|-------------|
| `FOG_COLOR` | `[0.8, 0.9, 1.0, 1.0]` | Color de la niebla RGBA normalizado (0–1). También es el color de fondo de la escena. |
| `settings.fogNear` | `10.0` | Distancia (unidades de escena) a la que empieza la niebla. **Editable en runtime** desde el panel. |
| `settings.fogFar` | `500.0` | Distancia a la que la niebla es total. **Editable en runtime** desde el panel. |
| `FOG_MIN` | `0` | Límite inferior de los sliders. |
| `FOG_MAX` | `4000` (`FAR_PLANE`) | Límite superior de los sliders, igual al plano lejano de la cámara. |
| `FOG_STEP` | `1` | Paso de los sliders. |

## Cubos

| Constante | Valor | Descripción |
|-----------|-------|-------------|
| `NUM_CUBES` | `40` | Número de espaciados; el bucle de [draw()](../src/main.js:32) dibuja `NUM_CUBES + 1` = **41 cubos**. |
| `CUBE_SIZE` | `100` | Tamaño de arista de cada cubo (unidad base de la escena). |
| `X_OFF` | `110` (`1.1 * CUBE_SIZE`) | Separación horizontal entre cubos consecutivos. |
| `Z_OFF` | `140` (`1.4 * CUBE_SIZE`) | Separación en profundidad entre cubos consecutivos. |
| `CUBE_X_BASE` | `-200` (`-2 * CUBE_SIZE`) | Posición X del primer cubo; desplaza la hilera hacia la izquierda. |
| `CUBE_PHASE` | `0.1` | Diferencia de fase de rotación entre cubos consecutivos (rad/índice). |
| `ROT_X_SPEED` | `-0.4` | Velocidad de rotación sobre X (rad/s). |
| `ROT_Y_SPEED` | `-0.7` | Velocidad de rotación sobre Y (rad/s). |

Posición del cubo `i`:

```
x(i) = CUBE_X_BASE + i * X_OFF
y(i) = 0
z(i) = -i * Z_OFF
```

Esto traza una diagonal que avanza hacia el fondo a la derecha, ideal para exponer el efecto de niebla con profundidad.

## Cámara y proyección

| Constante | Valor | Descripción |
|-----------|-------|-------------|
| `FOV_DEG` | `60` | Campo de visión vertical en grados. |
| `NEAR_PLANE` | `100` (`1 * CUBE_SIZE`) | Plano de cercanía del recorte (clipping). |
| `FAR_PLANE` | `4000` (`40 * CUBE_SIZE`) | Plano de lejanía del recorte. |
| `CAM_POS` | `[0, 0, 200]` | Posición de la cámara: frente al origen, a 2 cubos de distancia. |
| `CAM_TARGET` | `[0, 0, 0]` | Punto que la cámara observa. |
| `CAM_UP` | `[0, 1, 0]` | Vector "arriba" de la cámara. |

## Textura

| Constante | Valor | Descripción |
|-----------|-------|-------------|
| `TEXTURE_PATH` | `assets/f-texture.png` | Ruta relativa a `src/` de la textura aplicada a los cubos. |

## Panel de control (UI)

Definido en [ui.js](../src/ui.js) y estilizado en [index.html](../src/index.html:17):

- Panel fijo en la esquina superior izquierda (`#fog-panel`), semi-transparente.
- Dos sliders (`fogNear`, `fogFar`) con valor numérico visible.
- Al mover un slider se actualiza `settings` y la etiqueta; el efecto se ve al fotograma siguiente.
- Responsive: en pantallas ≤ 480 px el panel ocupa casi todo el ancho.

## Guía rápida de ajuste

| Objetivo | Qué cambiar |
|----------|-------------|
| Niebla más densa / cercana | Bajar `settings.fogFar` o subir `settings.fogNear` |
| Color de niebla distinto | `FOG_COLOR` (también cambia el fondo) |
| Más / menos cubos | `NUM_CUBES` |
| Hilera más larga en Z | `Z_OFF` y/o `NUM_CUBES` (verificar que `FAR_PLANE` sea suficiente) |
| Giro más rápido | `ROT_X_SPEED`, `ROT_Y_SPEED` |
| Campo de visión más amplio | `FOV_DEG` |
