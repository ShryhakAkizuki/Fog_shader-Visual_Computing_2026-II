# Instalación y ejecución

## Requisitos

| Requisito | Detalle |
|-----------|---------|
| Navegador | Cualquiera moderno con soporte de WebGL (Chrome, Firefox, Edge, Safari) |
| Servidor estático | Python 3 (opcional; cualquier servidor estático sirve) |
| Dependencias externas | Ninguna. La librería [p5.min.js](../src/libraries/p5.min.js) ya está incluida en el repositorio |

No hay paso de instalación ni de compilación: el proyecto es JavaScript puro servido de forma estática.

## Ejecución

Desde la raíz del repositorio:

```bash
python -m http.server 8080 -d src
```

Luego abrir en el navegador:

```
http://localhost:8080
```

La terminal mostrará los pedidos HTTP a medida que el navegador carga los recursos:

```
::1 - - "GET / HTTP/1.1" 200 -
::1 - - "GET /shaders.js?v=2 HTTP/1.1" 200 -
::1 - - "GET /config.js?v=2 HTTP/1.1" 200 -
::1 - - "GET /ui.js?v=2 HTTP/1.1" 200 -
::1 - - "GET /main.js?v=2 HTTP/1.1" 200 -
```

### Alternativas al servidor de Python

```bash
# Node.js
npx serve src

# O bien: usar la extensión "Live Server" de VS Code
# (clic derecho sobre src/index.html → "Open with Live Server")
```

## ¿Por qué no abrir `index.html` directamente?

Abrir el archivo con el protocolo `file://` puede fallar: la textura [f-texture.png](../src/assets/f-texture.png) se carga con [loadImage()](../src/main.js:9) a través de una petición XHR/Fetch, y muchos navegadores la bloquean bajo `file://`. Usar un servidor local evita este problema de CORS.

## Resolución de problemas

| Síntoma | Causa probable | Solución |
|---------|----------------|----------|
| El puerto 8080 está ocupado | Otro proceso lo ocupa | Usar otro puerto: `python -m http.server 8081 -d src` |
| Pantalla en negro | Sin soporte WebGL o GPU | Verificar `chrome://gpu` o activar la aceleración por hardware |
| Cambios en los shaders no se reflejan | Caché del navegador | Incrementar el parámetro `?v=N` en [index.html](../src/index.html:57) |
| Textura sin cargar (cubos planos) | `file://` o ruta incorrecta | Servir con un servidor local y revisar la consola |
| El sitio no aparece en Pages | Fuente no activada | En **Settings → Pages → Source**, seleccionar **“GitHub Actions”** |
| El workflow no se ejecuta | El push se hizo a otra rama que no es `main` | Push a `main`, o ejecutarlo a mano: **Actions → “Deploy to GitHub Pages” → Run workflow** |
| La URL publicada no existe todavía | El despliegue es asíncrono | Esperar 1–2 min tras el check verde y recargar la URL del entorno `github-pages` |

## Despliegue en GitHub Pages

El sitio se publica con el workflow de GitHub Actions [`.github/workflows/deploy-pages.yml`](../.github/workflows/deploy-pages.yml), sin paso de compilación: se sube el contenido de la carpeta `src/` tal cual.

### Cómo funciona

1. Se dispara con cada `push` a la rama `main` (o a mano desde la pestaña **Actions**).
2. [`actions/checkout`](../.github/workflows/deploy-pages.yml) descarga el repositorio.
3. [`actions/configure-pages`](../.github/workflows/deploy-pages.yml) prepara la configuración del sitio.
4. [`actions/upload-pages-artifact`](../.github/workflows/deploy-pages.yml) sube la carpeta [`src/`](../src/) como artefacto: [`src/index.html`](../src/index.html) queda en la raíz, así la URL del sitio lo sirve directamente.
5. [`actions/deploy-pages`](../.github/workflows/deploy-pages.yml) publica el artefacto en GitHub Pages.

Como las rutas del sitio son todas relativas (scripts, [p5.min.js](../src/libraries/p5.min.js) y [f-texture.png](../src/assets/f-texture.png) vía `TEXTURE_PATH` en [config.js:34](../src/config.js#L34)), funciona en el subdirectorio del proyecto sin ajustes de base path.

### URL resultante

```
https://shryhakakizuki.github.io/Fog_shader-Visual_Computing_2026-II/
```

