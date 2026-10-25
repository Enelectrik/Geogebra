# Talleres de matemática con GeoGebra

Sitio web estático con **10 talleres autónomos de 30 minutos** para estudiantes de 3.º de Bachillerato, organizados en dos pestañas:

| Geometría analítica | Gráfica de funciones |
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
| ★ | Reto GeoGebra (comprobación automática) | extra |

El progreso de cada estudiante (secciones, nota, reto) se guarda en su navegador (`localStorage`). No hay servidor ni base de datos.

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
4. **Activa Pages**: **Settings → Pages**. En *Build and deployment*, *Source*: **Deploy from a branch**; *Branch*: **main** y carpeta **/ (root)** → **Save**.
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

HTML + CSS + JavaScript sin dependencias de compilación · [GeoGebra Apps API](https://geogebra.github.io/docs/reference/en/GeoGebra_Apps_API/) (`deployggb.js`) · [KaTeX](https://katex.org) para las fórmulas · Google Fonts (Bricolage Grotesque, Atkinson Hyperlegible, JetBrains Mono).

Requiere conexión a internet (GeoGebra, KaTeX y las fuentes se cargan desde sus servidores). Si GeoGebra no carga, el taller muestra un enlace para abrirlo aparte y los comandos para reproducir el applet.
