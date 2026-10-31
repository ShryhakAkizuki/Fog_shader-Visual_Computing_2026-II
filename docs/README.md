# Documentación — Fog Shader (Visual Computing 2026-II)

Esta carpeta contiene la documentación técnica completa del proyecto **Fog Shader**, una escena WebGL en p5.js que implementa un shader de niebla basado en profundidad sobre una hilera de cubos texturizados.

## Índice

| Documento | Contenido |
|-----------|-----------|
| [instalacion.md](instalacion.md) | Requisitos, ejecución del proyecto y resolución de problemas |
| [estructura.md](estructura.md) | Estructura de carpetas y responsabilidad de cada archivo |
| [tecnica-shader-niebla.md](tecnica-shader-niebla.md) | Teoría e implementación del shader de niebla (GLSL) |
| [referencia-configuracion.md](referencia-configuracion.md) | Referencia de todas las constantes y parámetros configurables |

## Resumen del proyecto

- **Motor**: [p5.js](../src/libraries/p5.min.js) en modo `WEBGL` (incluido de forma local en `src/libraries/`).
- **Escena**: `NUM_CUBES + 1` = 41 cubos texturizados que se extienden en diagonal hacia el fondo de la escena, rotando a velocidad constante.
- **Efecto**: niebla lineal suavizada (`smoothstep`) calculada por píxel según la profundidad de cada vértice en espacio de vista.
- **Interactividad**: panel de control con dos sliders que ajustan en tiempo real `fogNear` y `fogFar`.

Para una introducción general y la ejecución rápida, ver el [README principal](../README.md).
