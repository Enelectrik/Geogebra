/* Taller: FUNCIONES CUADRÁTICAS — contenido. */
(function () {
  const R = String.raw;
  const GA = window.GA;

  const BASE = [
    'f(x) = a*x^2 + b*x + c',
    'xv = -b / (2*a)',
    'V = (xv, f(xv))',
    'eje: x = xv',
    'Y = (0, c)',
    'disc = b^2 - 4*a*c',
    'R1 = ((-b - sqrt(disc)) / (2*a), 0)',
    'R2 = ((-b + sqrt(disc)) / (2*a), 0)'
  ];
  const ESTILOS = {
    f: { color: 'tinta', grosor: 7 },
    V: { color: 'rojo', tamano: 6, etiqueta: 'V' },
    eje: { color: 'gris', grosor: 2, trazo: 3 },
    Y: { color: 'verde', tamano: 5 },
    R1: { color: 'azul', tamano: 6 },
    R2: { color: 'azul', tamano: 6 }
  };

  function factorizada(a, r1, r2) {
    return GA.fmt(a) + '·' + GA.lin('x', r1) + '·' + GA.lin('x', r2);
  }

  window.TALLER = {
    id: 'cuadratica',
    subtitulo: 'Formas general, canónica y factorizada; vértice, eje de simetría, concavidad, raíces, discriminante, interceptos, dominio y rango.',

    objetivos: [
      'Identificar vértice, eje de simetría, concavidad, raíces e intercepto de una función cuadrática.',
      'Pasar entre las formas general, canónica (de vértice) y factorizada.',
      'Usar el discriminante para predecir cuántas raíces reales hay y determinar el rango.'
    ],

    previos: [
      { pregunta: R`Al factorizar $x^2 - 5x + 6$ se obtiene:`,
        opciones: ['(x − 2)(x − 3)', '(x + 2)(x + 3)', '(x − 1)(x − 6)', '(x + 1)(x − 6)'], correcta: 0,
        explicacion: R`Buscamos dos números que multiplicados den $6$ y sumados den $-5$: $-2$ y $-3$.` },
      { pregunta: R`Si $f(x) = x^2 - 4$, ¿cuánto vale $f(-2)$?`,
        opciones: ['0', '−8', '8', '−4'], correcta: 0,
        explicacion: R`$(-2)^2 - 4 = 4 - 4 = 0$. Por eso $x = -2$ es una <b>raíz</b> de $f$.` }
    ],

    exploracion: {
      intro: R`Mueve los coeficientes $a$, $b$ y $c$ de $f(x) = ax^2 + bx + c$. Observa el $\rojo{\text{vértice}}$, el eje de simetría, las $\azul{\text{raíces}}$ (cortes con el eje $x$) y el $\verde{\text{intercepto}}$ con el eje $y$.`,
      applet: {
        vista: [-8, 8, -8, 8],
        comandos: [
          'a = Slider(-3, 3, 0.25)',
          'SetValue(a, 1)',
          'b = Slider(-6, 6, 0.5)',
          'SetValue(b, 2)',
          'c = Slider(-6, 6, 0.5)',
          'SetValue(c, -3)'
        ].concat(BASE),
        estilos: ESTILOS,
        auxiliares: ['xv', 'disc'],
        leyenda: [
          { color: 'rojo', texto: 'Vértice V(h, k)' },
          { color: 'gris', texto: 'Eje de simetría x = h' },
          { color: 'azul', texto: 'Raíces (ceros)' },
          { color: 'verde', texto: 'Intercepto (0, c)' }
        ],
        lecturas: function (api) {
          const a = api.getValue('a'), b = api.getValue('b'), c = api.getValue('c');
          if (Math.abs(a) < 1e-9) return [{ t: 'Atención', v: 'Con a = 0 no es cuadrática: es la recta y = ' + GA.fmt(b) + 'x ' + GA.sgn(c), ancho: true }];
          const h = -b / (2 * a), k = a * h * h + b * h + c, D = b * b - 4 * a * c;
          let raices, fact;
          if (D > 1e-9) {
            const r1 = (-b - Math.sqrt(D)) / (2 * a), r2 = (-b + Math.sqrt(D)) / (2 * a);
            const [m, M] = r1 < r2 ? [r1, r2] : [r2, r1];
            raices = 'dos: x = ' + GA.fmt(m) + ' y x = ' + GA.fmt(M); fact = factorizada(a, m, M);
          } else if (D > -1e-9) {
            raices = 'una (doble): x = ' + GA.fmt(h); fact = GA.fmt(a) + '·' + GA.lin('x', h) + '²';
          } else { raices = 'ninguna real'; fact = 'no se factoriza en ℝ'; }
          return [
            { t: 'General', v: 'f(x) = ' + GA.fmt(a) + 'x² ' + GA.sgn(b) + 'x ' + GA.sgn(c) },
            { t: 'Canónica', v: GA.fmt(a) + '·' + GA.cuad('x', h) + ' ' + GA.sgn(k) },
            { t: 'Factorizada', v: fact },
            { t: 'Vértice', v: GA.punto(h, k), color: 'rojo' },
            { t: 'Concavidad', v: a > 0 ? 'hacia arriba (mínimo)' : 'hacia abajo (máximo)' },
            { t: 'Discriminante Δ', v: GA.fmt(D) },
            { t: 'Raíces', v: raices, color: 'azul', ancho: true },
            { t: 'Rango', v: a > 0 ? '[' + GA.fmt(k) + ', ∞)' : '(−∞, ' + GA.fmt(k) + ']' },
            { t: 'Intercepto y', v: GA.punto(0, c), color: 'verde' }
          ];
        }
      },
      preguntas: [
        { pregunta: R`¿Qué efecto tiene el <b>signo</b> de $a$? ¿Y su <b>valor absoluto</b>?`,
          respuesta: R`$a > 0$: abre hacia arriba y el vértice es un <b>mínimo</b>; $a < 0$: abre hacia abajo y el vértice es un <b>máximo</b>. Cuanto mayor es $|a|$, más cerrada (estrecha) es la parábola.` },
        { pregunta: R`Mueve $c$ hasta que la parábola toque el eje $x$ en un solo punto. ¿Cuánto vale $\Delta$?`,
          respuesta: R`$\Delta = 0$: hay una raíz doble y el vértice está sobre el eje $x$.` },
        { pregunta: R`Si $\Delta < 0$, ¿cuántas raíces reales hay? ¿Qué se ve en la gráfica?`,
          respuesta: R`Ninguna: la parábola no corta al eje $x$ (queda toda por encima o toda por debajo).` }
      ]
    },

    teoria: R`
      <div class="caja-def">
        <p><b>Definición.</b> Una función cuadrática es $f(x) = ax^2 + bx + c$ con $a \ne 0$. Su gráfica es una parábola de eje vertical.</p>
      </div>
      <h3>Tres formas de escribirla</h3>
      <div class="tabla-wrap"><table>
        <tr><th>Forma</th><th>Expresión</th><th>Qué muestra a simple vista</th></tr>
        <tr><td>General</td><td>$f(x) = ax^2 + bx + c$</td><td>Intercepto $\verde{(0,\, c)}$ y concavidad</td></tr>
        <tr><td>Canónica (de vértice)</td><td>$f(x) = a(x - \rojo{h})^2 + \rojo{k}$</td><td>Vértice $\rojo{(h,\, k)}$</td></tr>
        <tr><td>Factorizada</td><td>$f(x) = a(x - \azul{x_1})(x - \azul{x_2})$</td><td>Raíces $\azul{x_1}$ y $\azul{x_2}$</td></tr>
      </table></div>
      <h3>Elementos</h3>
      <div class="tabla-wrap"><table>
        <tr><th>Elemento</th><th>Fórmula / criterio</th></tr>
        <tr><td>Vértice</td><td>$\rojo{h = -\dfrac{b}{2a}}, \quad \rojo{k = f(h)}$</td></tr>
        <tr><td>Eje de simetría</td><td>$x = h$</td></tr>
        <tr><td>Concavidad</td><td>$a > 0$: hacia arriba (mínimo) · $a < 0$: hacia abajo (máximo)</td></tr>
        <tr><td>Discriminante</td><td>$\Delta = b^2 - 4ac$: $\;\Delta>0$ dos raíces · $\Delta=0$ una · $\Delta<0$ ninguna real</td></tr>
        <tr><td>Raíces</td><td>$\azul{x = \dfrac{-b \pm \sqrt{\Delta}}{2a}}$</td></tr>
        <tr><td>Dominio / rango</td><td>Dominio $\mathbb{R}$ · Rango $[k,\, \infty)$ si $a>0$; $(-\infty,\, k]$ si $a<0$</td></tr>
      </table></div>`,

    ejemplos: [
      { titulo: 'Todos los elementos de una cuadrática',
        enunciado: R`<p>Analiza $f(x) = x^2 - 4x - 5$.</p>`,
        pasos: [
          R`$a = 1 > 0$: abre hacia arriba. Intercepto $(0,\, -5)$.`,
          R`Vértice: $h = -\dfrac{-4}{2} = 2$, $k = f(2) = 4 - 8 - 5 = -9$. $V(2,\, -9)$, eje $x = 2$.`,
          R`$\Delta = 16 + 20 = 36 > 0$: dos raíces, $x = \dfrac{4 \pm 6}{2} \Rightarrow x_1 = -1,\; x_2 = 5$.`,
          R`Formas: $f(x) = (x - 2)^2 - 9 = (x + 1)(x - 5)$. Rango $[-9,\, \infty)$.`
        ] },
      { titulo: 'De general a canónica completando el cuadrado',
        enunciado: R`<p>Escribe $f(x) = -2x^2 + 8x - 5$ en forma canónica y halla su valor máximo.</p>`,
        pasos: [
          R`Factoriza $a$ en los términos con $x$: $f(x) = -2(x^2 - 4x) - 5$.`,
          R`Completa el cuadrado: $-2(x^2 - 4x + 4) + 8 - 5 = -2(x - 2)^2 + 3$.`,
          R`Vértice $(2,\, 3)$; como $a < 0$, el valor máximo es $3$ y el rango es $(-\infty,\, 3]$.`,
          R`$\Delta = 64 - 40 = 24 > 0$: dos raíces, $x = 2 \pm \tfrac{\sqrt6}{2} \approx 0.78$ y $3.22$.`
        ] }
    ],

    practica: [
      { nivel: 'Básico',
        enunciado: R`<p>Para $f(x) = x^2 + 6x + 5$, halla el vértice y las raíces.</p>`,
        campos: [
          { etiqueta: R`Vértice: $h$`, respuesta: -3 },
          { etiqueta: R`Vértice: $k$`, respuesta: -4 },
          { etiqueta: 'Raíz menor', respuesta: -5 },
          { etiqueta: 'Raíz mayor', respuesta: -1 }
        ],
        pista: R`$h = -b/(2a)$ y $k = f(h)$. Para las raíces, factoriza: dos números que sumen 6 y multipliquen 5.`,
        solucion: R`$h = -3$, $k = 9 - 18 + 5 = -4$. $f(x) = (x + 1)(x + 5)$: raíces $-5$ y $-1$.` },
      { nivel: 'Básico',
        enunciado: R`<p>Para $f(x) = 2x^2 - 4x + 7$, calcula el discriminante, el valor mínimo de la función y cuántas raíces reales tiene.</p>`,
        campos: [
          { etiqueta: R`$\Delta$`, respuesta: -40 },
          { etiqueta: 'Valor mínimo', respuesta: 5 },
          { etiqueta: 'Raíces reales', tipo: 'opcion', opciones: ['Ninguna', 'Una', 'Dos'], respuesta: 'Ninguna' }
        ],
        pista: R`$\Delta = b^2 - 4ac$. El valor mínimo es la $k$ del vértice, con $h = 1$.`,
        solucion: R`$\Delta = 16 - 56 = -40 < 0$: ninguna raíz real. $h = 1$, $k = 2 - 4 + 7 = 5$: mínimo $5$.` },
      { nivel: 'Intermedio',
        enunciado: R`<p>Una función cuadrática tiene vértice en $(1,\, -8)$ y pasa por el punto $(3,\, 0)$. Escríbela en forma general $ax^2 + bx + c$.</p>`,
        campos: [
          { etiqueta: R`$a$`, respuesta: 2 },
          { etiqueta: R`$b$`, respuesta: -4 },
          { etiqueta: R`$c$`, respuesta: -6 }
        ],
        pista: R`Empieza con la forma canónica $f(x) = a(x - 1)^2 - 8$ y usa el punto $(3, 0)$ para hallar $a$.`,
        solucion: R`$0 = a(2)^2 - 8 \Rightarrow a = 2$. $f(x) = 2(x - 1)^2 - 8 = 2x^2 - 4x + 2 - 8 = 2x^2 - 4x - 6$.` },
      { nivel: 'Aplicación',
        enunciado: R`<p>Se lanza una pelota hacia arriba y su altura (en metros) es $h(t) = -5t^2 + 20t + 1.5$, con $t$ en segundos. ¿En qué instante alcanza la altura máxima y cuál es esa altura?</p>`,
        campos: [
          { etiqueta: R`Tiempo $t$ (s)`, respuesta: 2 },
          { etiqueta: 'Altura máxima (m)', respuesta: 21.5 }
        ],
        pista: 'La altura máxima está en el vértice: t = −b/(2a).',
        solucion: R`$t = -\dfrac{20}{2(-5)} = 2$ s. $h(2) = -20 + 40 + 1.5 = 21.5$ m.` }
    ],

    quiz: [
      { pregunta: R`El vértice de $f(x) = x^2 - 6x + 4$ es:`,
        opciones: ['(3, −5)', '(−3, −5)', '(3, 4)', '(6, 4)'], correcta: 0,
        retro: [
          R`$h = 6/2 = 3$ y $k = 9 - 18 + 4 = -5$.`,
          R`$h = -b/(2a) = -(-6)/2 = +3$.`,
          R`$4$ es el intercepto con el eje $y$; $k = f(3)$.`,
          R`$h = -b/(2a)$: no olvides dividir entre $2a$.`
        ] },
      { pregunta: R`Si $a < 0$ en $f(x) = ax^2 + bx + c$, la parábola:`,
        opciones: ['Abre hacia abajo y tiene un máximo', 'Abre hacia arriba y tiene un mínimo', 'Abre hacia abajo y tiene un mínimo', 'No tiene vértice'], correcta: 0,
        retro: [
          R`Con $a < 0$ la parábola es cóncava hacia abajo: el vértice es el punto más alto.`,
          R`Eso ocurre cuando $a > 0$.`,
          R`Si abre hacia abajo, el vértice es el punto más alto (máximo).`,
          R`Toda parábola tiene vértice.`
        ] },
      { pregunta: R`El discriminante de $x^2 + 2x + 5$ indica que la función:`,
        opciones: ['No tiene raíces reales', 'Tiene una raíz doble', 'Tiene dos raíces reales', 'Tiene tres raíces'], correcta: 0,
        retro: [
          R`$\Delta = 4 - 20 = -16 < 0$.`,
          R`Una raíz doble requiere $\Delta = 0$.`,
          R`Dos raíces requieren $\Delta > 0$; aquí $\Delta = -16$.`,
          R`Una cuadrática tiene como máximo dos raíces.`
        ] },
      { pregunta: R`El rango de $f(x) = -(x - 1)^2 + 4$ es:`,
        opciones: ['(−∞, 4]', '[4, ∞)', 'ℝ', '(−∞, 1]'], correcta: 0,
        retro: [
          R`$a = -1 < 0$: el máximo es $k = 4$, así que $y \le 4$.`,
          R`Sería así si $a > 0$, pero aquí $a = -1$.`,
          R`Las cuadráticas nunca tienen rango $\mathbb{R}$: están limitadas por el vértice.`,
          R`El rango usa la $k$ del vértice (4), no la $h$ (1).`
        ] },
      { pregunta: R`La forma factorizada de la cuadrática con raíces $2$ y $-3$ y $a = 1$ es:`,
        opciones: [R`$(x - 2)(x + 3)$`, R`$(x + 2)(x - 3)$`, R`$(x - 2)(x - 3)$`, R`$x^2 - 6$`], correcta: 0,
        retro: [
          R`$a(x - x_1)(x - x_2) = (x - 2)(x - (-3)) = (x - 2)(x + 3)$.`,
          R`Signos invertidos: esas raíces serían $-2$ y $3$.`,
          R`Las raíces serían $2$ y $3$.`,
          R`$x^2 - 6$ no se anula en $x = 2$.`
        ] }
    ],

    ficha: R`
      <div class="tabla-wrap"><table>
        <tr><th>Concepto</th><th>Resumen</th></tr>
        <tr><td>Formas</td><td>General $ax^2 + bx + c$ · Canónica $a(x - h)^2 + k$ · Factorizada $a(x - x_1)(x - x_2)$</td></tr>
        <tr><td>Vértice</td><td>$h = -b/(2a)$, $\;k = f(h)$</td></tr>
        <tr><td>Eje de simetría</td><td>$x = h$</td></tr>
        <tr><td>Concavidad</td><td>$a > 0$ arriba (mínimo) · $a < 0$ abajo (máximo)</td></tr>
        <tr><td>Discriminante</td><td>$\Delta = b^2 - 4ac$ → $>0$ dos · $=0$ una · $<0$ ninguna</td></tr>
        <tr><td>Raíces</td><td>$x = \dfrac{-b \pm \sqrt{\Delta}}{2a}$</td></tr>
        <tr><td>Intercepto $y$</td><td>$(0,\, c)$</td></tr>
        <tr><td>Dominio / rango</td><td>$\mathbb{R}$ · $[k, \infty)$ si $a>0$, $(-\infty, k]$ si $a<0$</td></tr>
      </table></div>`,

    reto: {
      enunciado: R`<p>Ajusta $a$, $b$ y $c$ para que la parábola pase por los tres puntos huecos: $A(-1,\, 0)$, $B(3,\, 0)$ y $C(1,\, -4)$.</p>`,
      applet: {
        vista: [-6, 7, -7, 6],
        comandos: [
          'a = Slider(-3, 3, 0.25)',
          'SetValue(a, 0.5)',
          'b = Slider(-6, 6, 0.5)',
          'SetValue(b, 1)',
          'c = Slider(-6, 6, 0.5)',
          'SetValue(c, 1)'
        ].concat(BASE, [
          'A = (-1, 0)',
          'B = (3, 0)',
          'C = (1, -4)'
        ]),
        estilos: Object.assign({}, ESTILOS, {
          A: { color: 'naranja', tamano: 8, hueco: true, fijo: true, etiqueta: 'A' },
          B: { color: 'naranja', tamano: 8, hueco: true, fijo: true, etiqueta: 'B' },
          C: { color: 'naranja', tamano: 8, hueco: true, fijo: true, etiqueta: 'C' }
        }),
        auxiliares: ['xv', 'disc'],
        leyenda: [{ color: 'naranja', texto: 'Puntos por los que debe pasar' }, { color: 'rojo', texto: 'Tu vértice' }],
        lecturas: function (api) {
          const a = api.getValue('a'), b = api.getValue('b'), c = api.getValue('c');
          const f = x => a * x * x + b * x + c;
          return [
            { t: 'f(x)', v: GA.fmt(a) + 'x² ' + GA.sgn(b) + 'x ' + GA.sgn(c), ancho: true },
            { t: 'f(−1)', v: GA.fmt(f(-1)) }, { t: 'f(3)', v: GA.fmt(f(3)) }, { t: 'f(1)', v: GA.fmt(f(1)) }
          ];
        }
      },
      comprobar: function (api) {
        const a = api.getValue('a'), b = api.getValue('b'), c = api.getValue('c');
        const f = x => a * x * x + b * x + c;
        const msj = [];
        [[-1, 0, 'A'], [3, 0, 'B'], [1, -4, 'C']].forEach(([x, y, n]) => {
          if (Math.abs(f(x) - y) > 1e-6) msj.push('No pasa por ' + n + ': f(' + GA.fmt(x) + ') = ' + GA.fmt(f(x)) + ' y debería ser ' + GA.fmt(y) + '.');
        });
        return msj.length ? { ok: false, mensajes: msj } : { ok: true, mensajes: ['f(x) = x² − 2x − 3 = (x + 1)(x − 3).'] };
      },
      solucion: R`Las raíces son $-1$ y $3$, así que $f(x) = a(x + 1)(x - 3)$. Con $C$: $-4 = a(2)(-2) \Rightarrow a = 1$. $f(x) = x^2 - 2x - 3$: $a = 1$, $b = -2$, $c = -3$. (Observa que $C$ es el vértice.)`
    }
  };
})();
