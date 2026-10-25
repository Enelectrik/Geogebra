/* =====================================================================
   comun.js — Utilidades compartidas por la página de inicio y los talleres
   - Lista de talleres y secciones (tiempos)
   - Enlaces de la viñeta "Cómo usar GeoGebra" (definidos en UN solo lugar)
   - Progreso en localStorage
   - Renderizado de fórmulas con KaTeX
   - Evaluador seguro de respuestas numéricas (fracciones, raíces, π)
   ===================================================================== */
(function () {
  'use strict';

  const GA = (window.GA = {});

  /* ---------- Grupos (pestañas superiores) y talleres ----------
     Cada taller vive en talleres/<grupo>/<id>/index.html          */
  GA.GRUPOS = [
    { id: 'geometria', titulo: 'Geometría analítica',
      descripcion: 'La recta y las cónicas: todas sus características, explorando con GeoGebra.' },
    { id: 'funciones', titulo: 'Gráfica de funciones',
      descripcion: 'Composición, cuadráticas, inversas, exponenciales y logarítmicas: cómo se ven y cómo se transforman.' }
  ];
  GA.TALLERES = [
    { grupo: 'geometria', id: 'recta', titulo: 'La recta', color: '#2563EB',
      resumen: 'Pendiente, ángulo de inclinación, formas de la ecuación, paralelas, perpendiculares y distancia punto–recta.' },
    { grupo: 'geometria', id: 'circunferencia', titulo: 'La circunferencia', color: '#0E9F6E',
      resumen: 'Centro, radio, formas canónica y general, completar cuadrados, posición relativa y recta tangente.' },
    { grupo: 'geometria', id: 'parabola', titulo: 'La parábola', color: '#D97706',
      resumen: 'Vértice, foco, directriz, eje, lado recto, parámetro p y orientación.' },
    { grupo: 'geometria', id: 'elipse', titulo: 'La elipse', color: '#7C3AED',
      resumen: 'Centro, vértices, covértices, focos, semiejes, excentricidad y lado recto.' },
    { grupo: 'geometria', id: 'hiperbola', titulo: 'La hipérbola', color: '#DB2777',
      resumen: 'Vértices, focos, semiejes, asíntotas, ejes transverso y conjugado, excentricidad.' },

    { grupo: 'funciones', id: 'composicion', titulo: 'Composición de funciones', color: '#0891B2',
      resumen: 'Qué es (f∘g)(x), cómo se calcula, su dominio y por qué en general f∘g ≠ g∘f.' },
    { grupo: 'funciones', id: 'cuadratica', titulo: 'Funciones cuadráticas', color: '#EA580C',
      resumen: 'Formas general, canónica y factorizada; vértice, eje, raíces, discriminante, concavidad y rango.' },
    { grupo: 'funciones', id: 'inversa', titulo: 'Funciones inversas', color: '#4F46E5',
      resumen: 'Función inyectiva, prueba de la recta horizontal, cálculo de f⁻¹, simetría con y = x, dominio y rango.' },
    { grupo: 'funciones', id: 'exponencial', titulo: 'Funciones exponenciales', color: '#16A34A',
      resumen: 'Base, crecimiento y decrecimiento, asíntota horizontal, transformaciones y modelos de crecimiento.' },
    { grupo: 'funciones', id: 'logaritmica', titulo: 'Funciones logarítmicas', color: '#C026D3',
      resumen: 'Logaritmo como inversa de la exponencial, propiedades, asíntota vertical, dominio y transformaciones.' }
  ];
  GA.talleresDe = g => GA.TALLERES.filter(t => t.grupo === g);
  GA.grupo = id => GA.GRUPOS.find(g => g.id === id);
  /* Barra de pestañas superior. raiz = ruta relativa a la carpeta del sitio. */
  GA.pestanas = function (activo, raiz, enlaces) {
    return `
      <nav class="pestanas" aria-label="Grupos de talleres" role="tablist">
        <a class="marca-sitio" href="${raiz}index.html">GeoGebra <b>Talleres</b></a>
        <div class="pestanas-lista">
          ${GA.GRUPOS.map(g => `
            <a role="tab" href="${raiz}index.html#${g.id}" data-grupo="${g.id}"
               class="pestana ${g.id === activo ? 'activa' : ''}"
               aria-selected="${g.id === activo ? 'true' : 'false'}">${g.titulo}</a>`).join('')}
        </div>
      </nav>`;
  };

  /* ---------- Secciones de cada taller (suman 30 min) ---------- */
  GA.SECCIONES = [
    { id: 'objetivos',      titulo: 'Objetivos de aprendizaje',  min: 1 },
    { id: 'previos',        titulo: 'Conocimientos previos',     min: 2 },
    { id: 'exploracion',    titulo: 'Exploración con GeoGebra',  min: 6 },
    { id: 'teoria',         titulo: 'Definición y fórmulas',     min: 4 },
    { id: 'ejemplos',       titulo: 'Ejemplos resueltos',        min: 5 },
    { id: 'practica',       titulo: 'Práctica autónoma',         min: 7 },
    { id: 'autoevaluacion', titulo: 'Autoevaluación',            min: 4 },
    { id: 'ficha',          titulo: 'Ficha de síntesis',         min: 1 }
  ];
  GA.DURACION = GA.SECCIONES.reduce((s, x) => s + x.min, 0); // 30

  /* ---------- Viñeta GeoGebra: edita aquí los enlaces ---------- */
  GA.VIDEOS_GEOGEBRA = [
    { titulo: 'Usar GeoGebra Básico',
      url: 'https://youtu.be/TzTjA9i8VQc?si=obym1aS8VRSUEQHY' },
    { titulo: 'Usar GeoGebra para graficar funciones',
      url: 'https://youtu.be/-uwDhkBm6CI?si=yq_YKejeffu9btIc' }
  ];
  GA.TIPS_GEOGEBRA = [
    '<b>Deslizadores:</b> arrastra el punto del deslizador (o tócalo y usa las flechas ← →) para cambiar su valor.',
    '<b>Zoom y desplazamiento:</b> usa la rueda del ratón o pellizca en el celular; arrastra el fondo para mover la vista.',
    '<b>Barra de entrada:</b> escribe una ecuación, por ejemplo <code>y = 2x + 1</code>, y presiona Enter para graficarla.',
    '<b>Restablecer:</b> si se desordena la vista, usa el botón «Restablecer applet» que está debajo de cada gráfico.'
  ];

  GA.vinetaGeogebra = function (abierta) {
    const videos = GA.VIDEOS_GEOGEBRA.map(v =>
      `<a class="video-link" href="${v.url}" target="_blank" rel="noopener noreferrer">
         <span class="video-icono" aria-hidden="true">▶</span>
         <span>${v.titulo}</span>
       </a>`).join('');
    const tips = GA.TIPS_GEOGEBRA.map(t => `<li>${t}</li>`).join('');
    return `
      <details class="vineta-ggb" ${abierta ? 'open' : ''}>
        <summary>
          <span class="vineta-etiqueta">Antes de empezar</span>
          <span class="vineta-titulo">Cómo usar GeoGebra</span>
          <span class="vineta-nota">Opcional · no cuenta en los ${GA.DURACION} min</span>
        </summary>
        <div class="vineta-cuerpo">
          <p>Si es tu primera vez con GeoGebra, mira uno de estos videos cortos (se abren en una pestaña nueva):</p>
          <div class="video-links">${videos}</div>
          <p class="vineta-sub">Tips rápidos</p>
          <ul class="tips">${tips}</ul>
        </div>
      </details>`;
  };

  /* ---------- Colores de los elementos (iguales en fórmulas y applets) ---------- */
  GA.COLORES = {
    rojo: '#D62839', azul: '#1D6FD6', verde: '#1F9D55', naranja: '#E07A10',
    morado: '#7B3FBF', gris: '#6B7280', tinta: '#1F2A44'
  };

  /* ---------- Progreso (localStorage) ---------- */
  const CLAVE = 'ga-talleres-v1';
  GA.leerProgreso = function () {
    try { return JSON.parse(localStorage.getItem(CLAVE)) || {}; } catch (e) { return {}; }
  };
  GA.guardarProgreso = function (p) {
    try { localStorage.setItem(CLAVE, JSON.stringify(p)); } catch (e) { /* almacenamiento no disponible */ }
  };
  GA.vacio = () => ({ secciones: {}, practica: {}, quiz: null, reto: false });
  GA.progresoTaller = function (id) {
    return Object.assign(GA.vacio(), GA.leerProgreso()[id] || {});
  };
  GA.actualizarTaller = function (id, fn) {
    const p = GA.leerProgreso();
    const t = Object.assign(GA.vacio(), p[id] || {});
    fn(t);
    p[id] = t;
    GA.guardarProgreso(p);
    return t;
  };
  GA.porcentaje = function (t) {
    const hechas = GA.SECCIONES.filter(s => t.secciones && t.secciones[s.id]).length;
    return Math.round((100 * hechas) / GA.SECCIONES.length);
  };
  GA.reiniciarProgreso = function () {
    try { localStorage.removeItem(CLAVE); } catch (e) { /* nada */ }
  };

  /* ---------- KaTeX ---------- */
  GA.MACROS = {
    '\\rojo': '\\textcolor{##D62839}{#1}',
    '\\azul': '\\textcolor{##1D6FD6}{#1}',
    '\\verde': '\\textcolor{##1F9D55}{#1}',
    '\\naranja': '\\textcolor{##E07A10}{#1}',
    '\\morado': '\\textcolor{##7B3FBF}{#1}',
    '\\gris': '\\textcolor{##6B7280}{#1}'
  };
  GA.renderMath = function (el) {
    if (!el || typeof window.renderMathInElement !== 'function') return;
    window.renderMathInElement(el, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false }
      ],
      macros: GA.MACROS,
      throwOnError: false,
      ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code', 'option', 'input']
    });
  };

  /* ---------- Formato de números y expresiones ---------- */
  GA.fmt = function (n, dec) {
    if (typeof n !== 'number' || !isFinite(n)) return '—';
    const d = dec == null ? 2 : dec;
    const f = Math.pow(10, d);
    let r = Math.round(n * f) / f;
    if (Object.is(r, -0) || Math.abs(r) < 1e-12) r = 0;
    return String(r).replace('-', '−');
  };
  /* "+ 3" / "− 3" (para escribir ecuaciones) */
  GA.sgn = function (n) {
    return (n < 0 ? '− ' : '+ ') + GA.fmt(Math.abs(n));
  };
  /* (x − h)² con signo correcto; si h = 0 devuelve x² */
  GA.cuad = function (variable, c) {
    if (Math.abs(c) < 1e-9) return variable + '²';
    return '(' + variable + ' ' + (c > 0 ? '− ' : '+ ') + GA.fmt(Math.abs(c)) + ')²';
  };
  /* (x − h) sin cuadrado; si h = 0 devuelve x */
  GA.lin = function (variable, c) {
    if (Math.abs(c) < 1e-9) return variable;
    return '(' + variable + ' ' + (c > 0 ? '− ' : '+ ') + GA.fmt(Math.abs(c)) + ')';
  };
  GA.punto = (x, y) => '(' + GA.fmt(x) + ', ' + GA.fmt(y) + ')';
  GA.cerca = (a, b, tol) => Math.abs(a - b) <= (tol == null ? 1e-6 : tol);

  /* ---------- Escape HTML ---------- */
  GA.esc = s => String(s).replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ---------- Evaluador de respuestas numéricas ----------
     Acepta: 2.5  2,5  -3/4  raiz(7)  √7  2√5  sqrt(13)  pi  π  2^3  (1+√5)/2
     No usa eval(): es un analizador recursivo pequeño. Devuelve NaN si no entiende. */
  GA.evaluarExpresion = function (texto) {
    if (texto == null) return NaN;
    let s = String(texto).trim().toLowerCase()
      .replace(/\s+/g, '')
      .replace(/[−–—]/g, '-')
      .replace(/[×·]/g, '*')
      .replace(/÷/g, '/')
      .replace(/raíz|raiz|sqrt|rc/g, '√')
      .replace(/pi|π/g, 'π')
      .replace(/[°º]/g, '');
    s = s.replace(/(\d),(\d)/g, '$1.$2'); // coma decimal
    if (!s) return NaN;
    let i = 0;
    const ver = () => s[i];
    function expr() {
      let v = termino();
      while (ver() === '+' || ver() === '-') {
        const op = s[i++];
        const r = termino();
        v = op === '+' ? v + r : v - r;
      }
      return v;
    }
    function termino() {
      let v = factor();
      for (;;) {
        const c = ver();
        if (c === '*' || c === '/') {
          i++;
          const r = factor();
          v = c === '*' ? v * r : v / r;
        } else if (c && /[\d.(√π]/.test(c)) {
          v *= factor(); // multiplicación implícita: 2√5, 3π, 2(4)
        } else break;
      }
      return v;
    }
    function factor() {
      if (ver() === '-') { i++; return -factor(); }
      if (ver() === '+') { i++; return factor(); }
      let base = primario();
      if (ver() === '^') { i++; base = Math.pow(base, factor()); }
      return base;
    }
    function primario() {
      const c = ver();
      if (c === '(') {
        i++;
        const v = expr();
        if (ver() !== ')') throw new Error('paréntesis');
        i++;
        return v;
      }
      if (c === '√') { i++; return Math.sqrt(primario()); }
      if (c === 'π') { i++; return Math.PI; }
      const m = /^(\d+\.?\d*|\.\d+)/.exec(s.slice(i));
      if (!m) throw new Error('número');
      i += m[0].length;
      return parseFloat(m[0]);
    }
    try {
      const v = expr();
      if (i !== s.length) return NaN;
      return v;
    } catch (e) {
      return NaN;
    }
  };

  /* ---------- Íconos SVG de cada lugar geométrico ---------- */
  GA.icono = function (id) {
    const t = 'stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round"';
    const ejes = '<path d="M8 40h64M40 8v64" stroke="currentColor" stroke-opacity=".25" stroke-width="1.5"/>';
    const fig = {
      recta: `<path d="M12 66 68 14" ${t}/><circle cx="40" cy="40" r="3.5" fill="currentColor"/>`,
      circunferencia: `<circle cx="40" cy="40" r="22" ${t}/><path d="M40 40 62 40" stroke="currentColor" stroke-width="2" stroke-dasharray="3 3"/><circle cx="40" cy="40" r="3" fill="currentColor"/>`,
      parabola: `<path d="M14 12Q40 92 66 12" ${t}/><circle cx="40" cy="38" r="3" fill="currentColor"/>`,
      elipse: `<ellipse cx="40" cy="40" rx="28" ry="16" ${t}/><circle cx="25" cy="40" r="2.6" fill="currentColor"/><circle cx="55" cy="40" r="2.6" fill="currentColor"/>`,
      hiperbola: `<path d="M10 14Q36 40 10 66M70 14Q44 40 70 66" ${t}/><path d="M14 18 66 62M14 62 66 18" stroke="currentColor" stroke-opacity=".45" stroke-width="1.5" stroke-dasharray="4 4"/>`,
      composicion: `<circle cx="18" cy="40" r="7" ${t}/><circle cx="40" cy="40" r="7" ${t}/><circle cx="62" cy="40" r="7" ${t}/><path d="M26 34q7-8 7 0M48 34q7-8 7 0" stroke="currentColor" stroke-width="2" fill="none"/><path d="M18 52q22 18 44 0" stroke="currentColor" stroke-width="2.5" fill="none" stroke-dasharray="4 3"/>`,
      cuadratica: `<path d="M16 14Q40 100 64 14" ${t}/><path d="M40 10v62" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 3"/><circle cx="40" cy="57" r="3" fill="currentColor"/>`,
      inversa: `<path d="M10 70 70 10" stroke="currentColor" stroke-opacity=".45" stroke-width="1.5" stroke-dasharray="4 4"/><path d="M14 68Q30 66 40 50T60 10" ${t}/><path d="M12 66Q14 50 30 40T70 20" stroke="currentColor" stroke-width="3" fill="none" stroke-opacity=".55"/>`,
      exponencial: `<path d="M8 66H72" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 3"/><path d="M8 62Q40 60 52 40T64 8" ${t}/>`,
      logaritmica: `<path d="M14 8V72" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 3"/><path d="M17 72Q19 40 40 28T74 18" ${t}/>`
    }[id] || '';
    return `<svg viewBox="0 0 80 80" aria-hidden="true">${ejes}${fig}</svg>`;
  };
})();
