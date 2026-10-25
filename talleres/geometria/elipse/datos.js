/* Taller: LA ELIPSE — contenido. */
(function () {
  const R = String.raw;
  const GA = window.GA;

  /* sx, sy = semiejes en x y en y. a = mayor, b = menor. u = 1 si el eje mayor es horizontal */
  const BASE = [
    'a = Max(sx, sy)',
    'b = Min(sx, sy)',
    'c = sqrt(a^2 - b^2)',
    'u = If(sx >= sy, 1, 0)',
    'elip: (x - h)^2 / sx^2 + (y - k)^2 / sy^2 = 1',
    'O = (h, k)',
    'F1 = (h - u*c, k - (1 - u)*c)',
    'F2 = (h + u*c, k + (1 - u)*c)'
  ];

  window.TALLER = {
    id: 'elipse',
    subtitulo: 'Centro, vértices, covértices, focos, semiejes a y b, distancia focal c, excentricidad, lado recto y ecuaciones.',

    objetivos: [
      'Identificar centro, vértices, covértices y focos de una elipse a partir de su ecuación.',
      'Usar la relación a² = b² + c² para calcular excentricidad y lado recto.',
      'Pasar de la forma general a la canónica y reconocer si el eje mayor es horizontal o vertical.'
    ],

    previos: [
      { pregunta: R`Si $a^2 = 25$ y $b^2 = 9$, ¿cuánto vale $\sqrt{a^2 - b^2}$?`,
        opciones: ['4', '16', '√34', '2'], correcta: 0,
        explicacion: R`$\sqrt{25 - 9} = \sqrt{16} = 4$.` },
      { pregunta: R`En la circunferencia $\dfrac{x^2}{9} + \dfrac{y^2}{9} = 1$, ¿cuál es el radio?`,
        opciones: ['9', '3', '81', '1/3'], correcta: 1,
        explicacion: R`Multiplicando por 9: $x^2 + y^2 = 9$, radio $3$. La elipse generaliza esta idea con dos denominadores distintos.` }
    ],

    exploracion: {
      intro: R`Mueve el centro ($h$, $k$) y los semiejes <b>sx</b> (horizontal) y <b>sy</b> (vertical). El mayor de ellos es $\naranja{a}$ y el menor es $\morado{b}$. Arrastra el punto verde $P$ y observa la suma de sus distancias a los $\azul{\text{focos}}$.`,
      applet: {
        vista: [-8, 8, -7, 7],
        comandos: [
          'h = Slider(-4, 4, 0.5)',
          'SetValue(h, 0)',
          'k = Slider(-4, 4, 0.5)',
          'SetValue(k, 0)',
          'sx = Slider(1, 6, 0.5)',
          'SetValue(sx, 5)',
          'sy = Slider(1, 6, 0.5)',
          'SetValue(sy, 3)'
        ].concat(BASE, [
          'V1 = (h - u*a, k - (1 - u)*a)',
          'V2 = (h + u*a, k + (1 - u)*a)',
          'W1 = (h - (1 - u)*b, k - u*b)',
          'W2 = (h + (1 - u)*b, k + u*b)',
          'ejeMayor = Segment(V1, V2)',
          'ejeMenor = Segment(W1, W2)',
          'P = Point(elip)',
          'PF1 = Segment(P, F1)',
          'PF2 = Segment(P, F2)'
        ]),
        estilos: {
          elip: { color: 'tinta', grosor: 7 },
          O: { color: 'tinta', tamano: 4, etiqueta: 'C' },
          V1: { color: 'rojo', tamano: 6, etiqueta: 'V₁' },
          V2: { color: 'rojo', tamano: 6, etiqueta: 'V₂' },
          W1: { color: 'morado', tamano: 5, etiqueta: 'B₁' },
          W2: { color: 'morado', tamano: 5, etiqueta: 'B₂' },
          F1: { color: 'azul', tamano: 6, etiqueta: 'F₁' },
          F2: { color: 'azul', tamano: 6, etiqueta: 'F₂' },
          ejeMayor: { color: 'naranja', grosor: 4 },
          ejeMenor: { color: 'morado', grosor: 3, trazo: 1 },
          P: { color: 'verde', tamano: 6, etiqueta: 'P' },
          PF1: { color: 'verde', grosor: 4 },
          PF2: { color: 'verde', grosor: 4, trazo: 1 }
        },
        auxiliares: ['a', 'b', 'c', 'u'],
        leyenda: [
          { color: 'rojo', texto: 'Vértices V₁, V₂' },
          { color: 'morado', texto: 'Covértices B₁, B₂ (eje menor 2b)' },
          { color: 'azul', texto: 'Focos F₁, F₂' },
          { color: 'naranja', texto: 'Eje mayor 2a' },
          { color: 'verde', texto: 'Punto P: PF₁ + PF₂' }
        ],
        lecturas: function (api) {
          const h = api.getValue('h'), k = api.getValue('k'), sx = api.getValue('sx'), sy = api.getValue('sy');
          const a = Math.max(sx, sy), b = Math.min(sx, sy), c = Math.sqrt(a * a - b * b);
          const hor = sx >= sy;
          const px = api.getXcoord('P'), py = api.getYcoord('P');
          const f1 = hor ? [h - c, k] : [h, k - c], f2 = hor ? [h + c, k] : [h, k + c];
          const suma = Math.hypot(px - f1[0], py - f1[1]) + Math.hypot(px - f2[0], py - f2[1]);
          return [
            { t: 'Ecuación', v: GA.cuad('x', h) + '/' + GA.fmt(sx * sx) + ' + ' + GA.cuad('y', k) + '/' + GA.fmt(sy * sy) + ' = 1', ancho: true },
            { t: 'Eje mayor', v: sx === sy ? 'ninguno: ¡es una circunferencia!' : hor ? 'HORIZONTAL' : 'VERTICAL', color: 'naranja' },
            { t: 'Centro', v: GA.punto(h, k) },
            { t: 'a (semieje mayor)', v: GA.fmt(a), color: 'naranja' },
            { t: 'b (semieje menor)', v: GA.fmt(b), color: 'morado' },
            { t: 'c = √(a² − b²)', v: GA.fmt(c), color: 'azul' },
            { t: 'Focos', v: GA.punto(f1[0], f1[1]) + ' y ' + GA.punto(f2[0], f2[1]), color: 'azul' },
            { t: 'Excentricidad e = c/a', v: GA.fmt(c / a, 3) },
            { t: 'Lado recto 2b²/a', v: GA.fmt(2 * b * b / a) },
            { t: 'PF₁ + PF₂  vs  2a', v: GA.fmt(suma) + '  vs  ' + GA.fmt(2 * a), color: 'verde' }
          ];
        }
      },
      preguntas: [
        { pregunta: R`Arrastra $P$ por toda la elipse. ¿Qué le pasa a $PF_1 + PF_2$?`,
          respuesta: R`Se mantiene <b>constante</b> e igual a $2a$, la longitud del eje mayor. Esa es la definición de elipse.` },
        { pregunta: R`Haz que <b>sx</b> y <b>sy</b> sean iguales. ¿Qué figura obtienes? ¿Dónde quedan los focos y cuánto vale $e$?`,
          respuesta: R`Obtienes una circunferencia: $c = 0$, ambos focos coinciden con el centro y $e = 0$.` },
        { pregunta: R`Aumenta la diferencia entre los semiejes. ¿Qué pasa con la excentricidad?`,
          respuesta: R`$e$ crece y se acerca a $1$: la elipse se vuelve más alargada. Siempre $0 \le e < 1$.` }
      ]
    },

    teoria: R`
      <div class="caja-def">
        <p><b>Definición.</b> La elipse es el conjunto de puntos del plano cuya <b>suma de distancias</b> a dos puntos fijos, los $\azul{\text{focos}}$, es constante e igual a $2\naranja{a}$.</p>
        $$\naranja{a}^2 = \morado{b}^2 + \azul{c}^2 \qquad (a > b,\; a > c)$$
        <p>$\naranja{a}$: semieje mayor · $\morado{b}$: semieje menor · $\azul{c}$: distancia del centro a cada foco.</p>
      </div>
      <h3>Ecuaciones canónicas (centro $C(h,k)$)</h3>
      <div class="tabla-wrap"><table>
        <tr><th></th><th>Eje mayor horizontal</th><th>Eje mayor vertical</th></tr>
        <tr><td>Ecuación</td><td>$\dfrac{(x-h)^2}{\naranja{a}^2} + \dfrac{(y-k)^2}{\morado{b}^2} = 1$</td><td>$\dfrac{(x-h)^2}{\morado{b}^2} + \dfrac{(y-k)^2}{\naranja{a}^2} = 1$</td></tr>
        <tr><td>Vértices</td><td>$\rojo{(h \pm a,\; k)}$</td><td>$\rojo{(h,\; k \pm a)}$</td></tr>
        <tr><td>Covértices</td><td>$\morado{(h,\; k \pm b)}$</td><td>$\morado{(h \pm b,\; k)}$</td></tr>
        <tr><td>Focos</td><td>$\azul{(h \pm c,\; k)}$</td><td>$\azul{(h,\; k \pm c)}$</td></tr>
      </table></div>
      <div class="caja-aviso"><b>Truco:</b> el denominador <b>mayor</b> es $a^2$ y está bajo la variable del eje mayor.</div>
      <h3>Otras características</h3>
      <p>Eje mayor $= 2a$ · eje menor $= 2b$ · distancia focal $= 2c$ · excentricidad $e = \dfrac{c}{a}$ ($0 < e < 1$) · lado recto $= \dfrac{2b^2}{a}$.</p>
      <p><b>Forma general:</b> $Ax^2 + Cy^2 + Dx + Ey + F = 0$ con $A$ y $C$ del mismo signo y $A \ne C$.</p>`,

    ejemplos: [
      { titulo: 'Elementos de una elipse centrada en el origen',
        enunciado: R`<p>Halla todos los elementos de $\dfrac{x^2}{25} + \dfrac{y^2}{9} = 1$.</p>`,
        pasos: [
          R`El denominador mayor está bajo $x$: eje mayor horizontal. $a^2 = 25 \Rightarrow a = 5$; $b^2 = 9 \Rightarrow b = 3$.`,
          R`$c = \sqrt{25 - 9} = 4$.`,
          R`Vértices $(\pm 5,\, 0)$, covértices $(0,\, \pm 3)$, focos $(\pm 4,\, 0)$.`,
          R`$e = \tfrac45 = 0.8$; lado recto $= \dfrac{2(9)}{5} = 3.6$; eje mayor $10$, eje menor $6$.`
        ] },
      { titulo: 'De la forma general a la canónica',
        enunciado: R`<p>Lleva a forma canónica $9x^2 + 4y^2 - 36x + 8y + 4 = 0$ y halla centro, vértices y focos.</p>`,
        pasos: [
          R`Agrupa y factoriza: $9(x^2 - 4x) + 4(y^2 + 2y) = -4$.`,
          R`Completa cuadrados: $9(x^2 - 4x + 4) + 4(y^2 + 2y + 1) = -4 + 36 + 4 = 36$.`,
          R`Divide entre 36: $\dfrac{(x - 2)^2}{4} + \dfrac{(y + 1)^2}{9} = 1$.`,
          R`Eje mayor vertical, $a = 3$, $b = 2$, $c = \sqrt5$. Centro $(2, -1)$, vértices $(2,\, 2)$ y $(2,\, -4)$, focos $(2,\, -1 \pm \sqrt5)$, $e = \tfrac{\sqrt5}{3} \approx 0.745$.`
        ] }
    ],

    practica: [
      { nivel: 'Básico',
        enunciado: R`<p>Para $\dfrac{(x - 1)^2}{16} + \dfrac{(y + 2)^2}{7} = 1$, encuentra $c$, la coordenada $x$ del foco de la derecha y la excentricidad.</p>`,
        campos: [
          { etiqueta: R`$c$`, respuesta: 3 },
          { etiqueta: R`Foco derecho: $x$`, respuesta: 4 },
          { etiqueta: R`Excentricidad $e$`, respuesta: 0.75 }
        ],
        pista: R`$a^2 = 16$ (bajo la $x$) y $b^2 = 7$. Usa $c^2 = a^2 - b^2$ y focos $(h \pm c,\, k)$.`,
        solucion: R`$c = \sqrt{16 - 7} = 3$. Focos $(1 \pm 3,\, -2)$: el derecho es $(4, -2)$. $e = \tfrac34 = 0.75$.` },
      { nivel: 'Básico',
        enunciado: R`<p>Una elipse tiene centro en el origen, vértices en $(0,\,\pm 10)$ y focos en $(0,\,\pm 6)$. Escribe su ecuación como $\dfrac{x^2}{\square} + \dfrac{y^2}{\square} = 1$.</p>`,
        campos: [
          { etiqueta: R`Denominador de $x^2$`, respuesta: 64 },
          { etiqueta: R`Denominador de $y^2$`, respuesta: 100 }
        ],
        pista: R`$a = 10$ y $c = 6$. Calcula $b^2 = a^2 - c^2$. El eje mayor es vertical.`,
        solucion: R`$b^2 = 100 - 36 = 64$. Como el eje mayor es vertical: $\dfrac{x^2}{64} + \dfrac{y^2}{100} = 1$.` },
      { nivel: 'Intermedio',
        enunciado: R`<p>Lleva a forma canónica $16x^2 + 9y^2 + 64x - 18y - 71 = 0$ y halla el centro y los semiejes.</p>`,
        campos: [
          { etiqueta: R`$h$`, respuesta: -2 },
          { etiqueta: R`$k$`, respuesta: 1 },
          { etiqueta: R`$a$ (semieje mayor)`, respuesta: 4 },
          { etiqueta: R`$b$ (semieje menor)`, respuesta: 3 }
        ],
        pista: R`$16(x^2 + 4x) + 9(y^2 - 2y) = 71$. Al completar cuadrados suma $16 \cdot 4$ y $9 \cdot 1$ al lado derecho.`,
        solucion: R`$16(x + 2)^2 + 9(y - 1)^2 = 71 + 64 + 9 = 144 \Rightarrow \dfrac{(x + 2)^2}{9} + \dfrac{(y - 1)^2}{16} = 1$. Centro $(-2, 1)$, $a = 4$ (vertical), $b = 3$.` },
      { nivel: 'Aplicación',
        enunciado: R`<p>La entrada de un túnel tiene forma de semielipse de 10 m de ancho y 4 m de altura máxima. ¿Qué altura tiene el túnel a 3 m del centro?</p>`,
        campos: [
          { etiqueta: 'Altura (m)', respuesta: 3.2 }
        ],
        pista: R`Ecuación: $\dfrac{x^2}{25} + \dfrac{y^2}{16} = 1$ (semiancho 5, altura 4). Sustituye $x = 3$ y despeja $y$.`,
        solucion: R`$\dfrac{9}{25} + \dfrac{y^2}{16} = 1 \Rightarrow y^2 = 16 \cdot \dfrac{16}{25} \Rightarrow y = \dfrac{16}{5} = 3.2$ m.` }
    ],

    quiz: [
      { pregunta: R`En $\dfrac{x^2}{9} + \dfrac{y^2}{25} = 1$, el eje mayor es:`,
        opciones: ['Vertical, con a = 5', 'Horizontal, con a = 3', 'Vertical, con a = 25', 'Horizontal, con a = 5'], correcta: 0,
        retro: [
          R`El denominador mayor ($25$) está bajo $y$: eje vertical, $a = \sqrt{25} = 5$.`,
          R`$a$ es el semieje <b>mayor</b>; $3$ es $b$.`,
          R`$25$ es $a^2$; $a = 5$.`,
          R`El 25 está bajo la $y$, por eso el eje mayor es vertical.`
        ] },
      { pregunta: R`Los focos de $\dfrac{x^2}{100} + \dfrac{y^2}{36} = 1$ son:`,
        opciones: ['(±8, 0)', '(0, ±8)', '(±√136, 0)', '(±6, 0)'], correcta: 0,
        retro: [
          R`$c = \sqrt{100 - 36} = 8$; eje horizontal → $(\pm 8,\, 0)$.`,
          R`El eje mayor es horizontal (100 bajo $x$): los focos están en el eje $x$.`,
          R`En la elipse se <b>resta</b>: $c^2 = a^2 - b^2$.`,
          R`$(\pm 6,\, 0)$ no son focos; $6 = b$ es el semieje menor.`
        ] },
      { pregunta: R`Una elipse con $a = 10$ y $c = 6$ tiene excentricidad:`,
        opciones: ['0.6', '0.8', '1.67', '0.36'], correcta: 0,
        retro: [
          R`$e = c/a = 6/10 = 0.6$.`,
          R`$0.8 = b/a$; la excentricidad usa $c$.`,
          R`Invertiste la fracción; en la elipse $e < 1$.`,
          R`No se elevan al cuadrado: $e = c/a$.`
        ] },
      { pregunta: R`El lado recto de $\dfrac{x^2}{25} + \dfrac{y^2}{16} = 1$ mide:`,
        opciones: ['6.4', '3.2', '10', '8'], correcta: 0,
        retro: [
          R`$\dfrac{2b^2}{a} = \dfrac{2(16)}{5} = 6.4$.`,
          R`Te faltó multiplicar por 2: $\dfrac{2b^2}{a}$.`,
          R`$10$ es el eje mayor $2a$.`,
          R`$8$ es el eje menor $2b$.`
        ] },
      { pregunta: R`Si la excentricidad de una elipse se acerca a $0$, la elipse se parece cada vez más a:`,
        opciones: ['Una circunferencia', 'Una recta', 'Una parábola', 'Una hipérbola'], correcta: 0,
        retro: [
          R`Con $e \to 0$, $c \to 0$: los focos se juntan en el centro y $a \approx b$.`,
          R`Se aplana hacia un segmento cuando $e \to 1$, no cuando $e \to 0$.`,
          R`La parábola tiene $e = 1$.`,
          R`La hipérbola tiene $e > 1$.`
        ] }
    ],

    ficha: R`
      <div class="tabla-wrap"><table>
        <tr><th></th><th>Eje mayor horizontal</th><th>Eje mayor vertical</th></tr>
        <tr><td>Canónica</td><td>$\dfrac{(x-h)^2}{a^2} + \dfrac{(y-k)^2}{b^2} = 1$</td><td>$\dfrac{(x-h)^2}{b^2} + \dfrac{(y-k)^2}{a^2} = 1$</td></tr>
        <tr><td>Vértices</td><td>$(h \pm a,\, k)$</td><td>$(h,\, k \pm a)$</td></tr>
        <tr><td>Covértices</td><td>$(h,\, k \pm b)$</td><td>$(h \pm b,\, k)$</td></tr>
        <tr><td>Focos</td><td>$(h \pm c,\, k)$</td><td>$(h,\, k \pm c)$</td></tr>
        <tr><td>Relación</td><td colspan="2">$a^2 = b^2 + c^2$, &nbsp; $a > b$</td></tr>
        <tr><td>Excentricidad / lado recto</td><td colspan="2">$e = c/a$ ($0<e<1$) · $LR = 2b^2/a$</td></tr>
        <tr><td>Definición</td><td colspan="2">$PF_1 + PF_2 = 2a$</td></tr>
        <tr><td>General</td><td colspan="2">$Ax^2 + Cy^2 + Dx + Ey + F = 0$, $A$ y $C$ mismo signo, $A \ne C$</td></tr>
      </table></div>`,

    reto: {
      enunciado: R`<p>Ajusta $h$, $k$, <b>sx</b> y <b>sy</b> para obtener la elipse con <b>focos en $(1,\,-4)$ y $(1,\,2)$</b> (puntos huecos) y <b>eje menor de longitud 8</b>.</p>`,
      applet: {
        vista: [-7, 9, -8, 6],
        comandos: [
          'h = Slider(-4, 4, 0.5)',
          'SetValue(h, 0)',
          'k = Slider(-4, 4, 0.5)',
          'SetValue(k, 0)',
          'sx = Slider(1, 6, 0.5)',
          'SetValue(sx, 3)',
          'sy = Slider(1, 6, 0.5)',
          'SetValue(sy, 2)'
        ].concat(BASE, [
          'G1 = (1, -4)',
          'G2 = (1, 2)'
        ]),
        estilos: {
          elip: { color: 'tinta', grosor: 7 },
          O: { color: 'tinta', tamano: 4 },
          F1: { color: 'azul', tamano: 5 },
          F2: { color: 'azul', tamano: 5 },
          G1: { color: 'azul', tamano: 8, hueco: true, fijo: true, etiqueta: '(1, −4)' },
          G2: { color: 'azul', tamano: 8, hueco: true, fijo: true, etiqueta: '(1, 2)' }
        },
        auxiliares: ['a', 'b', 'c', 'u'],
        leyenda: [
          { color: 'azul', texto: 'Tus focos (rellenos) / focos objetivo (huecos)' }
        ],
        lecturas: function (api) {
          const h = api.getValue('h'), k = api.getValue('k'), sx = api.getValue('sx'), sy = api.getValue('sy');
          const a = Math.max(sx, sy), b = Math.min(sx, sy), c = Math.sqrt(a * a - b * b);
          const hor = sx >= sy;
          return [
            { t: 'Tus focos', v: hor ? GA.punto(h - c, k) + ' y ' + GA.punto(h + c, k) : GA.punto(h, k - c) + ' y ' + GA.punto(h, k + c), color: 'azul', ancho: true },
            { t: 'Eje menor 2b', v: GA.fmt(2 * b) }
          ];
        }
      },
      comprobar: function (api) {
        const h = api.getValue('h'), k = api.getValue('k'), sx = api.getValue('sx'), sy = api.getValue('sy');
        const msj = [];
        if (Math.abs(h - 1) > 1e-6 || Math.abs(k + 1) > 1e-6) msj.push('El centro es el punto medio de los focos; el tuyo está en ' + GA.punto(h, k) + '.');
        if (!(sy > sx)) msj.push('Los focos objetivo están uno encima del otro: el eje mayor debe ser vertical (sy > sx).');
        if (Math.abs(Math.min(sx, sy) - 4) > 1e-6) msj.push('El eje menor mide ' + GA.fmt(2 * Math.min(sx, sy)) + '; debe medir 8.');
        if (Math.abs(Math.max(sx, sy) - 5) > 1e-6) msj.push('Revisa a: con c = 3 y b = 4, a² = b² + c².');
        return msj.length ? { ok: false, mensajes: msj } : { ok: true, mensajes: ['(x − 1)²/16 + (y + 1)²/25 = 1.'] };
      },
      solucion: R`Centro: punto medio de los focos, $(1,\,-1)$. $2c = 6 \Rightarrow c = 3$. Eje menor $2b = 8 \Rightarrow b = 4$. $a = \sqrt{16 + 9} = 5$, eje vertical: $\dfrac{(x-1)^2}{16} + \dfrac{(y+1)^2}{25} = 1$. Valores: $h = 1$, $k = -1$, sx $= 4$, sy $= 5$.`
    }
  };
})();
