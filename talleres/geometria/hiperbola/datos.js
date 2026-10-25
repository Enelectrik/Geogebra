/* Taller: LA HIPÉRBOLA — contenido. */
(function () {
  const R = String.raw;
  const GA = window.GA;

  /* v = 1: eje transverso vertical; v = 0: horizontal. Una sola cónica para ambos casos. */
  const BASE = [
    'v = If(vertical, 1, 0)',
    'c = sqrt(a^2 + b^2)',
    'hip: (v*(y - k)^2 + (1 - v)*(x - h)^2) / a^2 - (v*(x - h)^2 + (1 - v)*(y - k)^2) / b^2 = 1',
    'O = (h, k)',
    'V1 = (h - (1 - v)*a, k - v*a)',
    'V2 = (h + (1 - v)*a, k + v*a)',
    'F1 = (h - (1 - v)*c, k - v*c)',
    'F2 = (h + (1 - v)*c, k + v*c)',
    'mA = v*a/b + (1 - v)*b/a',
    'as1: y = k + mA*(x - h)',
    'as2: y = k - mA*(x - h)'
  ];

  window.TALLER = {
    id: 'hiperbola',
    subtitulo: 'Centro, vértices, focos, semiejes a y b, c² = a² + b², excentricidad, asíntotas, lado recto y ejes transverso y conjugado.',

    objetivos: [
      'Identificar centro, vértices, focos y ejes de una hipérbola a partir de su ecuación.',
      'Calcular c, la excentricidad, el lado recto y las ecuaciones de las asíntotas.',
      'Pasar de la forma general a la canónica y reconocer la orientación del eje transverso.'
    ],

    previos: [
      { pregunta: R`Si $a = 4$ y $b = 3$, ¿cuánto vale $\sqrt{a^2 + b^2}$?`,
        opciones: ['5', '7', '√7', '25'], correcta: 0,
        explicacion: R`$\sqrt{16 + 9} = \sqrt{25} = 5$.` },
      { pregunta: R`¿Qué diferencia hay entre $\dfrac{x^2}{9} + \dfrac{y^2}{4} = 1$ y $\dfrac{x^2}{9} - \dfrac{y^2}{4} = 1$?`,
        opciones: ['La primera es una elipse y la segunda una hipérbola', 'Ambas son elipses', 'Ambas son hipérbolas', 'La primera es una parábola'], correcta: 0,
        explicacion: R`El signo entre los términos cuadráticos decide: <b>suma</b> → elipse; <b>resta</b> → hipérbola.` }
    ],

    exploracion: {
      intro: R`Mueve $h$, $k$, $\naranja{a}$ y $\morado{b}$, y activa <b>vertical</b> para girar el eje transverso. Observa el rectángulo auxiliar: sus diagonales son las $\verde{\text{asíntotas}}$. Arrastra $P$ por cualquiera de las dos ramas.`,
      applet: {
        vista: [-9, 9, -7, 7],
        comandos: [
          'h = Slider(-4, 4, 0.5)',
          'SetValue(h, 0)',
          'k = Slider(-4, 4, 0.5)',
          'SetValue(k, 0)',
          'a = Slider(0.5, 5, 0.5)',
          'SetValue(a, 2)',
          'b = Slider(0.5, 5, 0.5)',
          'SetValue(b, 1.5)',
          'vertical = false'
        ].concat(BASE, [
          'wx = v*b + (1 - v)*a',
          'wy = v*a + (1 - v)*b',
          'rect = Polyline((h - wx, k - wy), (h + wx, k - wy), (h + wx, k + wy), (h - wx, k + wy), (h - wx, k - wy))',
          'P = Point(hip)',
          'PF1 = Segment(P, F1)',
          'PF2 = Segment(P, F2)'
        ]),
        estilos: {
          hip: { color: 'tinta', grosor: 7 },
          O: { color: 'tinta', tamano: 4, etiqueta: 'C' },
          V1: { color: 'rojo', tamano: 6, etiqueta: 'V₁' },
          V2: { color: 'rojo', tamano: 6, etiqueta: 'V₂' },
          F1: { color: 'azul', tamano: 6, etiqueta: 'F₁' },
          F2: { color: 'azul', tamano: 6, etiqueta: 'F₂' },
          as1: { color: 'verde', grosor: 4, trazo: 1 },
          as2: { color: 'verde', grosor: 4, trazo: 1 },
          rect: { color: 'gris', grosor: 2, trazo: 2 },
          P: { color: 'naranja', tamano: 6, etiqueta: 'P' },
          PF1: { color: 'naranja', grosor: 4 },
          PF2: { color: 'naranja', grosor: 4, trazo: 1 }
        },
        auxiliares: ['v', 'c', 'mA', 'wx', 'wy'],
        leyenda: [
          { color: 'rojo', texto: 'Vértices (eje transverso 2a)' },
          { color: 'azul', texto: 'Focos' },
          { color: 'verde', texto: 'Asíntotas' },
          { color: 'gris', texto: 'Rectángulo auxiliar 2a × 2b' },
          { color: 'naranja', texto: 'Punto P: |PF₁ − PF₂|' }
        ],
        lecturas: function (api) {
          const h = api.getValue('h'), k = api.getValue('k'), a = api.getValue('a'), b = api.getValue('b'), v = api.getValue('v');
          const c = Math.hypot(a, b), mA = v ? a / b : b / a;
          const f1 = v ? [h, k - c] : [h - c, k], f2 = v ? [h, k + c] : [h + c, k];
          const px = api.getXcoord('P'), py = api.getYcoord('P');
          const dif = Math.abs(Math.hypot(px - f1[0], py - f1[1]) - Math.hypot(px - f2[0], py - f2[1]));
          const ec = v ? GA.cuad('y', k) + '/' + GA.fmt(a * a) + ' − ' + GA.cuad('x', h) + '/' + GA.fmt(b * b) + ' = 1'
                       : GA.cuad('x', h) + '/' + GA.fmt(a * a) + ' − ' + GA.cuad('y', k) + '/' + GA.fmt(b * b) + ' = 1';
          return [
            { t: 'Ecuación', v: ec, ancho: true },
            { t: 'Eje transverso', v: v ? 'VERTICAL' : 'HORIZONTAL' },
            { t: 'Vértices', v: v ? GA.punto(h, k - a) + ' y ' + GA.punto(h, k + a) : GA.punto(h - a, k) + ' y ' + GA.punto(h + a, k), color: 'rojo' },
            { t: 'c = √(a² + b²)', v: GA.fmt(c), color: 'azul' },
            { t: 'Focos', v: GA.punto(f1[0], f1[1]) + ' y ' + GA.punto(f2[0], f2[1]), color: 'azul' },
            { t: 'Asíntotas', v: GA.lin('y', k) + ' = ±' + GA.fmt(mA) + '·' + GA.lin('x', h), color: 'verde' },
            { t: 'Excentricidad e = c/a', v: GA.fmt(c / a, 3) },
            { t: 'Lado recto 2b²/a', v: GA.fmt(2 * b * b / a) },
            { t: '|PF₁ − PF₂|  vs  2a', v: GA.fmt(dif) + '  vs  ' + GA.fmt(2 * a), color: 'naranja' }
          ];
        }
      },
      preguntas: [
        { pregunta: R`Arrastra $P$ por ambas ramas. ¿Qué se mantiene constante?`,
          respuesta: R`La <b>diferencia</b> de distancias a los focos: $|PF_1 - PF_2| = 2a$. Esa es la definición de hipérbola.` },
        { pregunta: R`Observa el rectángulo auxiliar. ¿Qué relación tienen sus diagonales con la hipérbola?`,
          respuesta: R`Las diagonales, prolongadas, son las <b>asíntotas</b>: la hipérbola se acerca cada vez más a ellas sin tocarlas.` },
        { pregunta: R`Haz $a = b$. ¿Qué pendiente tienen las asíntotas y cuánto vale $e$?`,
          respuesta: R`Pendientes $\pm 1$ (son perpendiculares) y $e = \sqrt2 \approx 1.414$. Se llama <b>hipérbola equilátera</b>.` }
      ]
    },

    teoria: R`
      <div class="caja-def">
        <p><b>Definición.</b> La hipérbola es el conjunto de puntos del plano cuya <b>diferencia de distancias</b> (en valor absoluto) a dos puntos fijos, los $\azul{\text{focos}}$, es constante e igual a $2\naranja{a}$.</p>
        $$\azul{c}^2 = \naranja{a}^2 + \morado{b}^2 \qquad (c > a)$$
      </div>
      <h3>Ecuaciones canónicas (centro $C(h,k)$)</h3>
      <div class="tabla-wrap"><table>
        <tr><th></th><th>Eje transverso horizontal</th><th>Eje transverso vertical</th></tr>
        <tr><td>Ecuación</td><td>$\dfrac{(x-h)^2}{\naranja{a}^2} - \dfrac{(y-k)^2}{\morado{b}^2} = 1$</td><td>$\dfrac{(y-k)^2}{\naranja{a}^2} - \dfrac{(x-h)^2}{\morado{b}^2} = 1$</td></tr>
        <tr><td>Vértices</td><td>$\rojo{(h \pm a,\; k)}$</td><td>$\rojo{(h,\; k \pm a)}$</td></tr>
        <tr><td>Focos</td><td>$\azul{(h \pm c,\; k)}$</td><td>$\azul{(h,\; k \pm c)}$</td></tr>
        <tr><td>Asíntotas</td><td>$\verde{y - k = \pm \dfrac{b}{a}(x - h)}$</td><td>$\verde{y - k = \pm \dfrac{a}{b}(x - h)}$</td></tr>
      </table></div>
      <div class="caja-aviso"><b>Truco:</b> en la hipérbola $a^2$ es el denominador del término <b>positivo</b> (no necesariamente el mayor). Ese término indica la dirección del eje transverso.</div>
      <h3>Otras características</h3>
      <p>Eje transverso (entre vértices) $= 2a$ · eje conjugado $= 2b$ · distancia focal $= 2c$ · excentricidad $e = \dfrac{c}{a} > 1$ · lado recto $= \dfrac{2b^2}{a}$.</p>
      <p><b>Forma general:</b> $Ax^2 + Cy^2 + Dx + Ey + F = 0$ con $A$ y $C$ de <b>signos opuestos</b>.</p>`,

    ejemplos: [
      { titulo: 'Elementos de una hipérbola centrada en el origen',
        enunciado: R`<p>Halla todos los elementos de $\dfrac{x^2}{16} - \dfrac{y^2}{9} = 1$.</p>`,
        pasos: [
          R`Término positivo en $x$: eje transverso horizontal. $a = 4$, $b = 3$, $c = \sqrt{16 + 9} = 5$.`,
          R`Vértices $(\pm 4,\, 0)$; focos $(\pm 5,\, 0)$.`,
          R`Asíntotas: $y = \pm \tfrac34 x$.`,
          R`$e = \tfrac54 = 1.25$; lado recto $= \dfrac{2(9)}{4} = 4.5$; eje transverso $8$, eje conjugado $6$.`
        ] },
      { titulo: 'De la forma general a la canónica',
        enunciado: R`<p>Lleva a forma canónica $9y^2 - 4x^2 - 36y - 8x - 4 = 0$ e indica centro, vértices, focos y asíntotas.</p>`,
        pasos: [
          R`Agrupa: $9(y^2 - 4y) - 4(x^2 + 2x) = 4$.`,
          R`Completa cuadrados: $9(y^2 - 4y + 4) - 4(x^2 + 2x + 1) = 4 + 36 - 4 = 36$.`,
          R`Divide entre 36: $\dfrac{(y - 2)^2}{4} - \dfrac{(x + 1)^2}{9} = 1$. Eje transverso vertical, $a = 2$, $b = 3$, $c = \sqrt{13}$.`,
          R`Centro $(-1,\, 2)$; vértices $(-1,\, 4)$ y $(-1,\, 0)$; focos $(-1,\, 2 \pm \sqrt{13})$; asíntotas $y - 2 = \pm \tfrac23 (x + 1)$.`
        ] }
    ],

    practica: [
      { nivel: 'Básico',
        enunciado: R`<p>Para $\dfrac{x^2}{9} - \dfrac{y^2}{16} = 1$, calcula $c$, la excentricidad y la pendiente positiva de las asíntotas.</p>`,
        campos: [
          { etiqueta: R`$c$`, respuesta: 5 },
          { etiqueta: R`Excentricidad $e$`, respuesta: 5 / 3, ayuda: 'ej. 5/3' },
          { etiqueta: 'Pendiente positiva de la asíntota', respuesta: 4 / 3, ayuda: 'ej. 4/3' }
        ],
        pista: R`$a = 3$, $b = 4$. En la hipérbola $c^2 = a^2 + b^2$. Eje horizontal: pendientes $\pm b/a$.`,
        solucion: R`$c = \sqrt{9 + 16} = 5$; $e = 5/3 \approx 1.67$; asíntotas $y = \pm \tfrac43 x$.` },
      { nivel: 'Intermedio',
        enunciado: R`<p>Para $\dfrac{(y + 1)^2}{25} - \dfrac{(x - 2)^2}{144} = 1$, halla $c$, la coordenada $y$ del foco superior y el lado recto.</p>`,
        campos: [
          { etiqueta: R`$c$`, respuesta: 13 },
          { etiqueta: R`Foco superior: $y$`, respuesta: 12 },
          { etiqueta: 'Lado recto', respuesta: 57.6 }
        ],
        pista: R`Eje vertical, centro $(2, -1)$, $a = 5$, $b = 12$. Los focos son $(h,\, k \pm c)$.`,
        solucion: R`$c = \sqrt{25 + 144} = 13$. Focos $(2,\, -1 \pm 13)$: el superior es $(2, 12)$. Lado recto $= \dfrac{2(144)}{5} = 57.6$.` },
      { nivel: 'Intermedio',
        enunciado: R`<p>Una hipérbola con centro en el origen tiene vértices en $(\pm 3,\, 0)$ y asíntotas $y = \pm 2x$. Escribe su ecuación como $\dfrac{x^2}{a^2} - \dfrac{y^2}{b^2} = 1$.</p>`,
        campos: [
          { etiqueta: R`$a^2$`, respuesta: 9 },
          { etiqueta: R`$b^2$`, respuesta: 36 }
        ],
        pista: R`$a = 3$. La pendiente de las asíntotas es $b/a = 2$.`,
        solucion: R`$b = 2a = 6$, así que $\dfrac{x^2}{9} - \dfrac{y^2}{36} = 1$.` },
      { nivel: 'Aplicación',
        enunciado: R`<p>Dos estaciones de radio están en $(-5,\,0)$ y $(5,\,0)$ (km). Un barco recibe sus señales y calcula que está 6 km más cerca de una que de la otra. El barco está sobre la hipérbola $\dfrac{x^2}{a^2} - \dfrac{y^2}{b^2} = 1$. Halla $a$ y $b^2$.</p>`,
        campos: [
          { etiqueta: R`$a$`, respuesta: 3 },
          { etiqueta: R`$b^2$`, respuesta: 16 }
        ],
        pista: R`Las estaciones son los focos ($c = 5$) y la diferencia de distancias es $2a = 6$.`,
        solucion: R`$a = 3$, $c = 5$, $b^2 = 25 - 9 = 16$: $\dfrac{x^2}{9} - \dfrac{y^2}{16} = 1$. Así funcionaban los sistemas de navegación LORAN.` }
    ],

    quiz: [
      { pregunta: R`Las asíntotas de $\dfrac{x^2}{4} - \dfrac{y^2}{25} = 1$ son:`,
        opciones: [R`$y = \pm \tfrac52 x$`, R`$y = \pm \tfrac25 x$`, R`$y = \pm \tfrac{25}{4} x$`, R`$y = \pm \tfrac{4}{25} x$`], correcta: 0,
        retro: [
          R`Eje horizontal: $\pm \dfrac{b}{a} = \pm \dfrac52$.`,
          R`Invertiste: en eje horizontal la pendiente es $b/a$.`,
          R`Usa $a$ y $b$, no $a^2$ y $b^2$.`,
          R`Usa $b/a$ con $a = 2$, $b = 5$ (sin cuadrados).`
        ] },
      { pregunta: R`Los focos de $\dfrac{y^2}{16} - \dfrac{x^2}{9} = 1$ son:`,
        opciones: ['(0, ±5)', '(±5, 0)', '(0, ±√7)', '(0, ±4)'], correcta: 0,
        retro: [
          R`Eje vertical (término positivo en $y$), $c = \sqrt{16 + 9} = 5$.`,
          R`El término positivo es el de $y$: el eje transverso es vertical.`,
          R`En la hipérbola se <b>suma</b>: $c^2 = a^2 + b^2$.`,
          R`$(0, \pm 4)$ son los vértices.`
        ] },
      { pregunta: 'La excentricidad de cualquier hipérbola es:',
        opciones: ['Mayor que 1', 'Igual a 1', 'Entre 0 y 1', 'Igual a 0'], correcta: 0,
        retro: [
          R`Como $c > a$, $e = c/a > 1$.`,
          R`$e = 1$ corresponde a la parábola.`,
          R`$0 < e < 1$ corresponde a la elipse.`,
          R`$e = 0$ corresponde a la circunferencia.`
        ] },
      { pregunta: R`En $\dfrac{x^2}{36} - \dfrac{y^2}{64} = 1$, la longitud del eje transverso es:`,
        opciones: ['12', '16', '20', '6'], correcta: 0,
        retro: [
          R`Eje transverso $= 2a = 2(6) = 12$.`,
          R`$16 = 2b$ es el eje conjugado.`,
          R`$20 = 2c$ es la distancia focal.`,
          R`$6$ es $a$; el eje transverso es $2a$.`
        ] },
      { pregunta: R`La ecuación $4x^2 - 9y^2 = 36$ representa:`,
        opciones: ['Hipérbola horizontal con a = 3, b = 2', 'Hipérbola vertical con a = 2, b = 3', 'Una elipse', 'Hipérbola horizontal con a = 2, b = 3'], correcta: 0,
        retro: [
          R`Dividiendo entre 36: $\dfrac{x^2}{9} - \dfrac{y^2}{4} = 1$, así que $a = 3$, $b = 2$.`,
          R`El término positivo es el de $x$: eje horizontal.`,
          R`Hay una <b>resta</b> entre los cuadrados: es hipérbola.`,
          R`Divide entre 36: el denominador de $x^2$ es 9, entonces $a = 3$.`
        ] }
    ],

    ficha: R`
      <div class="tabla-wrap"><table>
        <tr><th></th><th>Eje transverso horizontal</th><th>Eje transverso vertical</th></tr>
        <tr><td>Canónica</td><td>$\dfrac{(x-h)^2}{a^2} - \dfrac{(y-k)^2}{b^2} = 1$</td><td>$\dfrac{(y-k)^2}{a^2} - \dfrac{(x-h)^2}{b^2} = 1$</td></tr>
        <tr><td>Vértices</td><td>$(h \pm a,\, k)$</td><td>$(h,\, k \pm a)$</td></tr>
        <tr><td>Focos</td><td>$(h \pm c,\, k)$</td><td>$(h,\, k \pm c)$</td></tr>
        <tr><td>Asíntotas</td><td>$y - k = \pm \frac{b}{a}(x - h)$</td><td>$y - k = \pm \frac{a}{b}(x - h)$</td></tr>
        <tr><td>Relación</td><td colspan="2">$c^2 = a^2 + b^2$</td></tr>
        <tr><td>Ejes</td><td colspan="2">Transverso $2a$ · conjugado $2b$ · focal $2c$</td></tr>
        <tr><td>Excentricidad / lado recto</td><td colspan="2">$e = c/a > 1$ · $LR = 2b^2/a$</td></tr>
        <tr><td>Definición</td><td colspan="2">$|PF_1 - PF_2| = 2a$</td></tr>
      </table></div>`,

    reto: {
      enunciado: R`<p>Ajusta los parámetros para obtener la hipérbola con <b>vértices en $(-2,\,1)$ y $(4,\,1)$</b> (puntos huecos) y <b>asíntotas de pendiente $\pm\tfrac23$</b>.</p>`,
      applet: {
        vista: [-7, 9, -6, 7],
        comandos: [
          'h = Slider(-4, 4, 0.5)',
          'SetValue(h, 0)',
          'k = Slider(-4, 4, 0.5)',
          'SetValue(k, 0)',
          'a = Slider(0.5, 5, 0.5)',
          'SetValue(a, 1)',
          'b = Slider(0.5, 5, 0.5)',
          'SetValue(b, 1)',
          'vertical = true'
        ].concat(BASE, [
          'G1 = (-2, 1)',
          'G2 = (4, 1)'
        ]),
        estilos: {
          hip: { color: 'tinta', grosor: 7 },
          O: { color: 'tinta', tamano: 4 },
          V1: { color: 'rojo', tamano: 5 }, V2: { color: 'rojo', tamano: 5 },
          F1: { color: 'azul', tamano: 4 }, F2: { color: 'azul', tamano: 4 },
          as1: { color: 'verde', grosor: 3, trazo: 1 },
          as2: { color: 'verde', grosor: 3, trazo: 1 },
          G1: { color: 'rojo', tamano: 8, hueco: true, fijo: true, etiqueta: '(−2, 1)' },
          G2: { color: 'rojo', tamano: 8, hueco: true, fijo: true, etiqueta: '(4, 1)' }
        },
        auxiliares: ['v', 'c', 'mA'],
        leyenda: [
          { color: 'rojo', texto: 'Tus vértices (rellenos) / vértices objetivo (huecos)' },
          { color: 'verde', texto: 'Asíntotas' }
        ],
        lecturas: function (api) {
          const h = api.getValue('h'), k = api.getValue('k'), a = api.getValue('a'), b = api.getValue('b'), v = api.getValue('v');
          return [
            { t: 'Tus vértices', v: v ? GA.punto(h, k - a) + ' y ' + GA.punto(h, k + a) : GA.punto(h - a, k) + ' y ' + GA.punto(h + a, k), color: 'rojo', ancho: true },
            { t: 'Pendiente asíntotas', v: '±' + GA.fmt(v ? a / b : b / a, 3), color: 'verde' }
          ];
        }
      },
      comprobar: function (api) {
        const h = api.getValue('h'), k = api.getValue('k'), a = api.getValue('a'), b = api.getValue('b'), v = api.getValue('v');
        const msj = [];
        if (v) msj.push('Los vértices objetivo están a la misma altura: el eje transverso debe ser horizontal (desactiva «vertical»).');
        if (Math.abs(h - 1) > 1e-6 || Math.abs(k - 1) > 1e-6) msj.push('El centro es el punto medio de los vértices; el tuyo está en ' + GA.punto(h, k) + '.');
        if (Math.abs(a - 3) > 1e-6) msj.push('La distancia entre vértices es 2a = 6: revisa a.');
        if (!v && Math.abs(b / a - 2 / 3) > 1e-6) msj.push('La pendiente de las asíntotas es ' + GA.fmt(b / a, 3) + '; debe ser 2/3 ≈ 0.667.');
        return msj.length ? { ok: false, mensajes: msj } : { ok: true, mensajes: ['(x − 1)²/9 − (y − 1)²/4 = 1.'] };
      },
      solucion: R`Centro: punto medio de los vértices, $(1,\, 1)$. $2a = 6 \Rightarrow a = 3$, eje horizontal. Pendiente $\dfrac{b}{a} = \dfrac23 \Rightarrow b = 2$. Ecuación $\dfrac{(x-1)^2}{9} - \dfrac{(y-1)^2}{4} = 1$. Valores: $h = 1$, $k = 1$, $a = 3$, $b = 2$, vertical desactivado.`
    }
  };
})();
