# Estructura del proyecto

```
Fog_shader-Visual_Computing_2026-II/
├── README.md                        # Introducción general del proyecto
├── LICENSE                          # Licencia GNU AGPL v3
├── .gitignore                       # Ignora archivos de entorno
├── docs/                            # Documentación técnica (esta carpeta)
│   ├── README.md                    # Índice de la documentación
│   ├── instalacion.md               # Requisitos y ejecución
│   ├── estructura.md                # Este documento
│   ├── tecnica-shader-niebla.md     # Teoría e implementación del shader
│   ├── referencia-configuracion.md  # Referencia de parámetros
│   └── desarrollo.md                # Convenciones y guía de modificación
└── src/                             # Código fuente servido al navegador
    ├── index.html                   # Punto de entrada; carga los scripts y estilos del panel
    ├── main.js                      # Ciclo de p5.js (setup/draw), cámara y animación
    ├── shaders.js                   # Código GLSL del shader de niebla y funciones de soporte
    ├── config.js                    # Constantes de escena, niebla, cámara y textura
    ├── ui.js                        # Panel de control con sliders de fogNear / fogFar
    ├── assets/
    │   └── f-texture.png            # Textura aplicada a los cubos
    └── libraries/
        └── p5.min.js                # p5.js empaquetado (sin dependencias externas)
```

## Responsabilidad de cada archivo

| Archivo | Responsabilidad |
|---------|-----------------|
| [index.html](../src/index.html) | Define el lienzo, los estilos del panel `#fog-panel` y la carga ordenada de los scripts. |
| [main.js](../src/main.js) | `setup()` crea el canvas WEBGL y carga la textura; `draw()` actualiza la cámara, la rotación y dibuja los cubos. |
| [shaders.js](../src/shaders.js) | Contiene los shaders GLSL (`fogVert`, `fogFrag`) en plantilla de JavaScript, y las funciones [`initFog()`](../src/shaders.js:38) / [`applyFog()`](../src/shaders.js:42). |
| [config.js](../src/config.js) | Fuente única de verdad para todos los parámetros de la escena (constantes y `settings`). |
| [ui.js](../src/ui.js) | Crea dinámicamente el panel de niebla y conecta los sliders con `settings`. |
| [libraries/p5.min.js](../src/libraries/p5.min.js) | Librería p5.js vendida localmente; no se carga desde CDN. |

## Orden de carga

Los scripts se cargan en [index.html](../src/index.html:57) siguiendo su orden de dependencia:

```
p5.min.js  →  config.js  →  shaders.js  →  ui.js  →  main.js
```

- `config.js` no depende de nada: define las constantes que usan los demás módulos.
- `shaders.js` depende de `config.js` (lee `FOG_COLOR` y `settings`).
- `ui.js` depende de `config.js` (rangos de los sliders) y de `settings`.
- `main.js` depende de todo lo anterior: llama a [`initFog()`](../src/shaders.js:38) y [`initFogUI()`](../src/ui.js:4) dentro de `setup()`.

## Flujo de datos

```
config.js (constantes + settings)
        │
        ├──► shaders.js ──► uniforms GLSL (uFogColor, uFogNear, uFogFar)
        │
        ├──► ui.js ───────► settings.fogNear / settings.fogFar (editables en runtime)
        │
        └──► main.js ─────► geometría, cámara, animación y textura
```

Los valores de `settings` se leen en cada fotograma dentro de [`applyFog()`](../src/shaders.js:42), por lo que los cambios de los sliders se aplican de forma inmediata, sin reinicio.
