# Talleres de matemática con GeoGebra

Sitio web estático con **10 talleres autónomos de 30 minutos**, organizados en dos pestañas:

| Geometría analítica — 3.º de Bachillerato | Gráfica de funciones — 2.º de Bachillerato |
|---|---|
| 1. La recta | 1. Composición de funciones |
| 2. La circunferencia | 2. Funciones cuadráticas |
| 3. La parábola | 3. Funciones inversas |
| 4. La elipse | 4. Funciones exponenciales |
| 5. La hipérbola | 5. Funciones logarítmicas |

Cada taller tiene la misma estructura (los minutos aparecen en pantalla y suman 30):

| # | Sección | Tiempo |
|---|---|---|
| 0 | Viñeta «Cómo usar GeoGebra» con 2 videos y tips | opcional |
| 1 | Objetivos de aprendizaje | 1 min |
| 2 | Conocimientos previos (2 preguntas rápidas) | 2 min |
| 3 | Exploración con GeoGebra (applet con deslizadores + lecturas en vivo + preguntas guía) | 6 min |
| 4 | Definición y fórmulas (con los mismos colores que el applet) | 4 min |
| 5 | Ejemplos resueltos (desplegables) | 5 min |
| 6 | Práctica autónoma (4 ejercicios con corrección automática y pistas) | 7 min |
| 7 | Autoevaluación (5 preguntas con retroalimentación por opción) | 4 min |
| 8 | Ficha de síntesis imprimible | 1 min |
| ★ | Reto GeoGebra (comprobación automática; la solución se habilita solo después de pulsar «Comprobar reto») | extra |
| ⤓ | Entrega: botón **«Crear PDF»** | — |

El progreso de cada estudiante (respuestas, intentos, nota, reto y tiempo) se guarda en su navegador (`localStorage`). No hay servidor ni base de datos.

### Entrega en PDF

Al final de cada taller, el botón **«Crear PDF»** pide el **nombre completo** y el **curso/paralelo** del estudiante (se recuerdan para los demás talleres) y descarga un archivo `Taller_<tema>_<Nombre>.pdf` con:

- Datos del estudiante, taller, nivel y fecha de entrega.
- Resumen: secciones completadas, ejercicios resueltos, nota de la autoevaluación y estado del reto.
- **Conocimientos previos:** la primera respuesta elegida, con ✓ o ✗.
- **Práctica:** lo que escribió en cada casilla con ✓/✗, número de intentos y si usó la pista o consultó la solución.
- **Autoevaluación:** la respuesta de cada pregunta, la nota del último intento y el historial de intentos.
- **Reto:** si lo superó, cuántas veces lo comprobó, los valores finales de los deslizadores y si vio la solución antes de lograrlo.
- Al final, el **tiempo activo** dedicado al taller.

**Tiempo activo:** se cuenta solo con la pestaña del taller visible **y** con actividad (mover el ratón, tocar, escribir o desplazarse) en el último minuto. Si el estudiante cambia de pestaña o deja la página sin tocarla más de 1 minuto, el contador se pausa (en la cabecera se ve «en pausa»). Se acumula entre sesiones en el mismo navegador.

El PDF se genera en el navegador con [html2pdf.js](https://github.com/eKoopmans/html2pdf.js). Si no carga, el taller abre el diálogo de impresión con el reporte para que el estudiante elija «Guardar como PDF».

> El progreso vive en el navegador del estudiante: si cambia de dispositivo o borra los datos del navegador, empieza de cero. Los datos del PDF los genera el propio navegador del estudiante, así que deben tomarse como un registro de trabajo, no como un control a prueba de manipulaciones.

---

## Publicar en GitHub Pages (paso a paso)

1. **Crea una cuenta** en [github.com](https://github.com) si no tienes una.
2. **Crea un repositorio nuevo**: botón **New** → nombre, por ejemplo `talleres-geogebra` → **Public** → **Create repository**.
3. **Sube los archivos**: en el repositorio vacío, clic en **uploading an existing file**. Arrastra **el contenido** de esta carpeta (no la carpeta en sí): `index.html`, `.nojekyll`, `README.md` y las carpetas `assets`, `talleres` (y `docente` si decides publicarla, ver nota abajo). Clic en **Commit changes**.
   > Si el navegador no sube carpetas arrastrándolas, usa [GitHub Desktop](https://desktop.github.com) o, desde la terminal:
   > ```bash
   > git init && git add . && git commit -m "Talleres GeoGebra"
   > git branch -M main
   > git remote add origin https://github.com/TU-USUARIO/talleres-geogebra.git
   > git push -u origin main
   > ```
4. **Activa Pages** (gratis si el repositorio es **público**; para repositorios privados GitHub pide un plan de pago): **Settings → Pages**. En *Build and deployment*, *Source*: **Deploy from a branch**; *Branch*: **main** y carpeta **/ (root)** → **Save**.
5. Espera 1–2 minutos y recarga la página de Settings → Pages. Aparecerá la dirección:
   `https://TU-USUARIO.github.io/talleres-geogebra/`
6. Comparte esa dirección con tus estudiantes. Para enlazar directo a un grupo: `.../index.html#funciones` o `.../index.html#geometria`.

**Probar en tu computadora antes de publicar:** abre una terminal en esta carpeta y ejecuta `python -m http.server 8000`; luego entra a `http://localhost:8000`. (Abrir `index.html` con doble clic también funciona, pero algunos navegadores limitan ciertas funciones con `file://`.)

> **Nota sobre el banco de respuestas:** `docente/RESPUESTAS.md` no está enlazado en el sitio, pero si lo subes a un repositorio público cualquiera puede verlo en GitHub. Lo recomendable es **no subir la carpeta `docente/`** y guardarla aparte.

---

## Estructura

```
talleres-geogebra/
├── index.html                    ← inicio con las dos pestañas
├── .nojekyll                     ← evita que GitHub procese el sitio con Jekyll
├── assets/
│   ├── css/estilos.css           ← diseño compartido (incluye estilos de impresión)
│   └── js/
│       ├── comun.js              ← grupos, talleres, enlaces de videos, progreso, KaTeX, evaluador
│       └── motor-taller.js       ← construye cada taller a partir de su datos.js
├── talleres/
│   ├── geometria/{recta,circunferencia,parabola,elipse,hiperbola}/
│   │   ├── index.html            ← página (igual en todos)
│   │   └── datos.js              ← TODO el contenido del taller
│   └── funciones/{composicion,cuadratica,inversa,exponencial,logaritmica}/
│       ├── index.html
│       └── datos.js
└── docente/RESPUESTAS.md         ← banco de respuestas (no enlazado)
```

## Cómo editar el contenido

Todo el contenido de un taller está en su `datos.js`:

- `objetivos`, `previos`, `exploracion`, `teoria`, `ejemplos`, `practica`, `quiz`, `ficha`, `reto`.
- Las fórmulas se escriben en LaTeX entre `$…$` (en línea) o `$$…$$` (centradas). Los textos usan `` R`…` `` (String.raw) para que las barras invertidas de LaTeX funcionen sin duplicarlas.
- Colores de elementos en fórmulas: `\rojo{…}`, `\azul{…}`, `\verde{…}`, `\naranja{…}`, `\morado{…}`, `\gris{…}` (son los mismos colores del applet).
- **Ejercicios de práctica**: cada campo tiene `respuesta` (número) y opcionalmente `tol` (tolerancia; por defecto ±0.011). Los estudiantes pueden escribir `2.5`, `2,5`, `-3/4`, `raiz(7)`, `√7`, `2√5`, `pi`. Para opciones: `{ tipo: 'opcion', opciones: [...], respuesta: '...' }`.
- **Autoevaluación**: `correcta` es el índice (desde 0) de la opción correcta; `retro` tiene una explicación por cada opción.

### Applets de GeoGebra

Cada applet se define con una lista de `comandos` de GeoGebra (sintaxis en inglés, válida en cualquier idioma). Debajo de cada applet, en el sitio, hay un desplegable **«Comandos GeoGebra de este applet (para el docente)»** con un botón para copiarlos y pegarlos en [GeoGebra Calculadora Gráfica](https://www.geogebra.org/graphing).

- `estilos`: color, grosor, trazo (0 continuo, 1 discontinuo, 2 corto, 3 punteado), etiqueta, punto hueco, fijo, oculto.
- `lecturas`: función que calcula los valores que se muestran en vivo debajo del applet.
- `reto.comprobar`: función que revisa los valores de los deslizadores y devuelve mensajes de ayuda.

### Videos de la viñeta «Cómo usar GeoGebra»

Se definen **una sola vez** en `assets/js/comun.js` → `GA.VIDEOS_GEOGEBRA`. Cambiarlos ahí los actualiza en los 10 talleres y en la página de inicio.

### Agregar un taller nuevo

1. Agrega una entrada en `GA.TALLERES` (`assets/js/comun.js`) con su `grupo`, `id`, `titulo`, `color` y `resumen`.
2. Crea `talleres/<grupo>/<id>/` copiando el `index.html` de otro taller (cambia solo el `<title>`) y escribe su `datos.js`.
3. Para un **grupo nuevo** (nueva pestaña), agrégalo a `GA.GRUPOS`.

## Tecnologías

HTML + CSS + JavaScript sin dependencias de compilación · [GeoGebra Apps API](https://geogebra.github.io/docs/reference/en/GeoGebra_Apps_API/) (`deployggb.js`) · [KaTeX](https://katex.org) para las fórmulas · [html2pdf.js](https://github.com/eKoopmans/html2pdf.js) para el PDF de entrega · Google Fonts (Bricolage Grotesque, Atkinson Hyperlegible, JetBrains Mono).

Requiere conexión a internet (GeoGebra, KaTeX, html2pdf.js y las fuentes se cargan desde sus servidores). Si GeoGebra no carga, el taller muestra un enlace para abrirlo aparte y los comandos para reproducir el applet.
