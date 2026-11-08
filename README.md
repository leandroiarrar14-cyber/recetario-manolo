# Recetario Churros Manolo

PWA (aplicación web instalable) para relevar recetas y procedimientos de elaboración desde el celular. Funciona sin internet y guarda todo en el propio teléfono (IndexedDB).

**App publicada:** <https://leandroiarrar14-cyber.github.io/recetario-manolo/>

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | Toda la app (HTML + CSS + JS). El código está dividido en secciones numeradas y comentadas. |
| `sw.js` | Service worker: guarda la app en caché para usarla offline. |
| `manifest.json` | Nombre, colores e íconos para instalarla. |
| `icons/` | Íconos de la app con la M de Manolo (192, 512, maskable para Android, 180 para iPhone) y el logo en rojo y en blanco. |

> ⚠️ **El service worker solo funciona con HTTPS** (o en `localhost`). Si abrís `index.html` con doble clic (`file://`) la app anda, pero no se puede instalar ni funciona offline. Netlify y GitHub Pages ya dan HTTPS gratis.

## Publicarla (elegí una)

### Opción A: Netlify Drop (la más rápida, sin cuenta de GitHub)
1. Entrá a <https://app.netlify.com/drop> desde la compu.
2. Arrastrá la carpeta `recetario-manolo` entera.
3. Te da una dirección tipo `https://nombre-raro.netlify.app`. Creá una cuenta gratis para que no se borre y, si querés, cambiale el nombre (Site settings → Change site name).
4. Para actualizar: en el sitio, pestaña **Deploys**, arrastrás la carpeta de nuevo.

### Opción B: GitHub Pages
1. Creá un repositorio en GitHub (puede ser público) y subí el **contenido** de la carpeta: `index.html` tiene que quedar en la raíz.
2. En el repo: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, rama `main`, carpeta `/ (root)` → Save.
3. Al minuto queda en `https://TU-USUARIO.github.io/NOMBRE-REPO/`.

## Instalarla en el celular

**Android (Chrome):** abrí la dirección → menú ⋮ → **Instalar app** (o "Agregar a pantalla principal"). Queda como una app más.

**iPhone (Safari, tiene que ser Safari):** abrí la dirección → botón **Compartir** (cuadrado con flecha) → **Agregar a pantalla de inicio** → Agregar.

Instalala siempre: así el sistema no borra los datos por falta de uso (en iPhone, Safari puede borrar datos de sitios **no instalados** después de 7 días sin abrirlos).

## Probar sin internet (modo avión)
1. Abrí la app instalada **una vez con internet** (ahí se guarda en caché).
2. Cerrala del todo, poné el **modo avión** y abrila de nuevo.
3. Creá una receta, sacá una foto, cerrá y volvé a abrir: tiene que estar todo.
4. Probá **Respaldar ahora** en modo avión: se tiene que poder compartir o guardar el archivo.

## Actualizar la app después de cambiar el código
1. Editá `index.html` (u otro archivo).
2. En `sw.js` subí la versión: `const CACHE = 'recetario-v3';` (v4, v5…). **Si no la subís, los celulares siguen con la versión vieja.**
3. Volvé a publicar. Al abrir la app aparece el aviso "Hay una versión nueva" → **Actualizar**. Los datos no se tocan.

## Revisarla con Lighthouse
En la compu, Chrome → abrí la dirección publicada → F12 → pestaña **Lighthouse** → modo *Navigation*, dispositivo *Mobile* → **Analyze page load**. Mirá *Performance*, *Accessibility*, *Best Practices* y *SEO*. La parte "instalable" se ve en F12 → **Application → Manifest** (que no tenga errores) y **Service workers** (que figure *activated*).

## Cosas para saber
- **Dictado por voz:** en Android Chrome y en Safari el reconocimiento de voz del navegador **usa internet**. Sin señal, usá el micrófono del teclado (Gboard o el teclado del iPhone), que suele funcionar offline si tenés descargado el idioma español.
- **Respaldos:** los datos viven solo en ese celular. Respaldá seguido: el botón 💾 genera un archivo con todo (incluidas las fotos) y abre el menú de compartir (Drive, WhatsApp, mail). Chrome en Android no deja compartir archivos `.json` ni `.zip`: el JSON se comparte como `.json.txt` (se restaura igual) y el ZIP se descarga a la carpeta Descargas.
- **CSV:** usa `;` como separador y coma decimal, así abre directo en Excel o Google Sheets configurados en español.
- **Markdown:** "Copiar recetario" lo deja en el portapapeles para pegárselo a un asistente de IA. Distingue lo **OBSERVADO** de lo **DECLARADO** y omite los campos vacíos.

## Preparado para más adelante
- **Costeo:** cada ingrediente tiene lugar para `precio`/`insumoId` y ya existe el store `insumos` en la base. Falta la pantalla y la función `costoReceta()` (sección 11 del código).
- **Otro módulo (POES, limpieza…):** agregá un store en `STORES` (sección 1), subí `DB_VERSION`, sumá el módulo a `MODULOS` y creá su vista y su ruta en `RUTAS` (sección 7).
