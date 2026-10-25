/* Taller: LA PARÁBOLA — contenido. */
(function () {
  const R = String.raw;
  const GA = window.GA;

  /* Comandos comunes: v = 1 vertical, v = 0 horizontal (una sola cónica para ambos casos) */
  const BASE = [
    'v = If(vertical, 1, 0)',
    'par: v*(x - h)^2 + (1 - v)*(y - k)^2 = 4*p*(v*(y - k) + (1 - v)*(x - h))',
    'V = (h, k)',
    'F = (h + (1 - v)*p, k + v*p)',
    'dir: v*y + (1 - v)*x = v*(k - p) + (1 - v)*(h - p)',
    'eje: v*x + (1 - v)*y = v*h + (1 - v)*k'
  ];
  const orient = (v, p) => v ? (p > 0 ? 'vertical, abre hacia ARRIBA' : p < 0 ? 'vertical, abre hacia ABAJO' : 'degenerada (p = 0)')
                              : (p > 0 ? 'horizontal, abre a la DERECHA' : p < 0 ? 'horizontal, abre a la IZQUIERDA' : 'degenerada (p = 0)');

  window.TALLER = {
    id: 'parabola',
    subtitulo: 'Vértice, foco, directriz, eje de simetría, lado recto, parámetro p, orientación y ecuaciones canónica y general.',

    objetivos: [
      'Identificar vértice, foco, directriz, eje y lado recto a partir de la ecuación canónica.',
      'Determinar hacia dónde abre la parábola según el signo de p y la variable al cuadrado.',
      'Obtener la ecuación canónica y general a partir de sus elementos, y viceversa.'
    ],

    previos: [
      { pregunta: R`¿Cómo es la gráfica de $y = x^2$?`,
        opciones: ['Una parábola que abre hacia arriba con vértice en el origen', 'Una recta que pasa por el origen', 'Una parábola que abre hacia la derecha', 'Una circunferencia de radio 1'], correcta: 0,
        explicacion: R`$y = x^2$ nunca es negativa y es simétrica respecto al eje $y$: abre hacia arriba con vértice $(0, 0)$.` },
      { pregunta: R`Al desarrollar $(x - 3)^2$ se obtiene:`,
        opciones: ['x² − 9', 'x² − 6x + 9', 'x² + 9', 'x² − 3x + 9'], correcta: 1,
        explicacion: R`$(a - b)^2 = a^2 - 2ab + b^2$: $\;x^2 - 6x + 9$.` }
    ],

    exploracion: {
      intro: R`Mueve $\rojo{h}$, $\rojo{k}$ (vértice) y $p$; activa o desactiva <b>vertical</b> para cambiar la orientación. Arrastra el punto naranja $P$ sobre la parábola y compara sus distancias al $\azul{\text{foco}}$ y a la $\verde{\text{directriz}}$.`,
      applet: {
        vista: [-8, 8, -7, 7],
        comandos: [
          'h = Slider(-4, 4, 0.5)',
          'SetValue(h, 0)',
          'k = Slider(-4, 4, 0.5)',
          'SetValue(k, -1)',
          'p = Slider(-3, 3, 0.25)',
          'SetValue(p, 1)',
          'vertical = true'
        ].concat(BASE, [
          'E1 = F - 2*p*(v, 1 - v)',
          'E2 = F + 2*p*(v, 1 - v)',
          'lr = Segment(E1, E2)',
          'P = Point(par)',
          'Q = ClosestPoint(dir, P)',
          'PF = Segment(P, F)',
          'PQ = Segment(P, Q)'
        ]),
        estilos: {
          par: { color: 'tinta', grosor: 7 },
          V: { color: 'rojo', tamano: 6, etiqueta: 'V' },
          F: { color: 'azul', tamano: 6, etiqueta: 'F' },
          dir: { color: 'verde', grosor: 5, trazo: 1, etiqueta: 'directriz' },
          eje: { color: 'gris', grosor: 2, trazo: 3 },
          E1: { oculto: true }, E2: { oculto: true },
          lr: { color: 'morado', grosor: 5, etiqueta: 'lado recto' },
          P: { color: 'naranja', tamano: 6, etiqueta: 'P' },
          Q: { color: 'naranja', tamano: 3 },
          PF: { color: 'naranja', grosor: 4 },
          PQ: { color: 'naranja', grosor: 4, trazo: 1 }
        },
        auxiliares: ['v', 'E1', 'E2', 'Q'],
        leyenda: [
          { color: 'rojo', texto: 'Vértice V(h, k)' },
          { color: 'azul', texto: 'Foco F' },
          { color: 'verde', texto: 'Directriz' },
          { color: 'morado', texto: 'Lado recto (|4p|)' },
          { color: 'gris', texto: 'Eje de simetría' },
          { color: 'naranja', texto: 'Punto P y sus distancias' }
        ],
        lecturas: function (api) {
          const h = api.getValue('h'), k = api.getValue('k'), p = api.getValue('p'), v = api.getValue('v');
          const F = v ? [h, k + p] : [h + p, k];
          const px = api.getXcoord('P'), py = api.getYcoord('P');
          const dPF = Math.hypot(px - F[0], py - F[1]);
          const dPd = v ? Math.abs(py - (k - p)) : Math.abs(px - (h - p));
          const canon = v ? GA.cuad('x', h) + ' = ' + GA.fmt(4 * p) + '·' + GA.lin('y', k)
                          : GA.cuad('y', k) + ' = ' + GA.fmt(4 * p) + '·' + GA.lin('x', h);
          return [
            { t: 'Orientación', v: orient(v, p), ancho: true },
            { t: 'Ecuación canónica', v: canon, ancho: true },
            { t: 'Vértice', v: GA.punto(h, k), color: 'rojo' },
            { t: 'Foco', v: GA.punto(F[0], F[1]), color: 'azul' },
            { t: 'Directriz', v: (v ? 'y = ' : 'x = ') + GA.fmt(v ? k - p : h - p), color: 'verde' },
            { t: 'Eje', v: (v ? 'x = ' : 'y = ') + GA.fmt(v ? h : k), color: 'gris' },
            { t: 'Lado recto |4p|', v: GA.fmt(Math.abs(4 * p)), color: 'morado' },
            { t: 'PF  vs  P–directriz', v: GA.fmt(dPF) + '  vs  ' + GA.fmt(dPd), color: 'naranja' }
          ];
        }
      },
      preguntas: [
        { pregunta: R`Arrastra $P$ sobre la parábola. ¿Qué observas en las distancias de $P$ al foco y de $P$ a la directriz?`,
          respuesta: R`Son <b>siempre iguales</b>. Esa es la definición de parábola: puntos que equidistan del foco y de la directriz.` },
        { pregunta: R`Cambia el signo de $p$ con <b>vertical</b> activado y luego desactivado. ¿Hacia dónde abre en cada caso?`,
          respuesta: R`Vertical: $p > 0$ arriba, $p < 0$ abajo. Horizontal: $p > 0$ derecha, $p < 0$ izquierda. El foco siempre queda "dentro" de la parábola.` },
        { pregunta: R`¿Qué le pasa a la abertura cuando $|p|$ aumenta? ¿Cuánto mide el lado recto?`,
          respuesta: R`La parábola se abre más y el foco se aleja del vértice. El lado recto mide $|4p|$.` }
      ]
    },

    teoria: R`
      <div class="caja-def">
        <p><b>Definición.</b> La parábola es el conjunto de puntos del plano que están a la <b>misma distancia</b> de un punto fijo, el $\azul{\text{foco}}$, y de una recta fija, la $\verde{\text{directriz}}$.</p>
        <p>$|p|$ es la distancia del $\rojo{\text{vértice}}$ al foco (y del vértice a la directriz).</p>
      </div>
      <h3>Ecuaciones canónicas (vértice $V(h, k)$)</h3>
      <div class="tabla-wrap"><table>
        <tr><th></th><th>Eje vertical</th><th>Eje horizontal</th></tr>
        <tr><td>Ecuación</td><td>$(x - \rojo{h})^2 = 4p\,(y - \rojo{k})$</td><td>$(y - \rojo{k})^2 = 4p\,(x - \rojo{h})$</td></tr>
        <tr><td>Abre hacia</td><td>arriba si $p>0$, abajo si $p<0$</td><td>derecha si $p>0$, izquierda si $p<0$</td></tr>
        <tr><td>Foco</td><td>$\azul{(h,\; k + p)}$</td><td>$\azul{(h + p,\; k)}$</td></tr>
        <tr><td>Directriz</td><td>$\verde{y = k - p}$</td><td>$\verde{x = h - p}$</td></tr>
        <tr><td>Eje de simetría</td><td>$x = h$</td><td>$y = k$</td></tr>
        <tr><td>Lado recto</td><td colspan="2">$\morado{|4p|}$ (cuerda que pasa por el foco, perpendicular al eje)</td></tr>
        <tr><td>Forma general</td><td>$x^2 + Dx + Ey + F = 0$</td><td>$y^2 + Dx + Ey + F = 0$</td></tr>
      </table></div>
      <div class="caja-aviso"><b>Truco:</b> la variable que está al cuadrado te dice el eje: $x^2 \to$ eje vertical; $y^2 \to$ eje horizontal.</div>`,

    ejemplos: [
      { titulo: 'Elementos desde la ecuación canónica',
        enunciado: R`<p>Halla todos los elementos de $(y - 2)^2 = -8(x + 1)$.</p>`,
        pasos: [
          R`La $y$ está al cuadrado: eje horizontal. Vértice $V(-1,\, 2)$.`,
          R`$4p = -8 \Rightarrow p = -2$: abre hacia la <b>izquierda</b>.`,
          R`Foco: $(h + p,\, k) = (-3,\, 2)$. Directriz: $x = h - p = 1$.`,
          R`Eje: $y = 2$. Lado recto: $|4p| = 8$.`
        ] },
      { titulo: 'De la forma general a la canónica',
        enunciado: R`<p>Escribe en forma canónica $x^2 - 4x - 8y + 12 = 0$ e indica vértice, foco y directriz.</p>`,
        pasos: [
          R`Deja la $x$ a un lado: $x^2 - 4x = 8y - 12$.`,
          R`Completa el cuadrado: $x^2 - 4x + 4 = 8y - 12 + 4 = 8y - 8$.`,
          R`Factoriza: $(x - 2)^2 = 8(y - 1)$. Vértice $V(2,\, 1)$, $4p = 8 \Rightarrow p = 2$ (abre hacia arriba).`,
          R`Foco $(2,\, 3)$, directriz $y = -1$, lado recto $8$.`
        ] }
    ],

    practica: [
      { nivel: 'Básico',
        enunciado: R`<p>Para $(x + 3)^2 = 12(y - 1)$, encuentra el foco, la directriz y el lado recto.</p>`,
        campos: [
          { etiqueta: R`Foco: coordenada $x$`, respuesta: -3 },
          { etiqueta: R`Foco: coordenada $y$`, respuesta: 4 },
          { etiqueta: R`Directriz: $y =$`, respuesta: -2 },
          { etiqueta: 'Lado recto', respuesta: 12 }
        ],
        pista: R`Vértice $(-3, 1)$ y $4p = 12$. Como la $x$ está al cuadrado, el foco es $(h, k + p)$.`,
        solucion: R`$p = 3$, $V(-3, 1)$. Foco $(-3,\, 4)$, directriz $y = 1 - 3 = -2$, lado recto $12$.` },
      { nivel: 'Básico',
        enunciado: R`<p>Una parábola tiene vértice en $(0,\,0)$ y foco en $(0,\,-2)$. Su ecuación es $x^2 = 4p\,y$. ¿Cuánto vale $4p$? ¿Hacia dónde abre?</p>`,
        campos: [
          { etiqueta: R`$4p$`, respuesta: -8 },
          { etiqueta: 'Abre hacia', tipo: 'opcion', opciones: ['arriba', 'abajo', 'la derecha', 'la izquierda'], respuesta: 'abajo' }
        ],
        pista: R`$p$ es la distancia con signo del vértice al foco: el foco está 2 unidades por debajo.`,
        solucion: R`$p = -2$, entonces $x^2 = -8y$. Abre hacia abajo.` },
      { nivel: 'Intermedio',
        enunciado: R`<p>Lleva a forma canónica $y^2 - 6y - 4x + 17 = 0$ y halla el vértice, $p$ y la coordenada $x$ del foco.</p>`,
        campos: [
          { etiqueta: R`Vértice: $h$`, respuesta: 2 },
          { etiqueta: R`Vértice: $k$`, respuesta: 3 },
          { etiqueta: R`$p$`, respuesta: 1 },
          { etiqueta: R`Foco: coordenada $x$`, respuesta: 3 }
        ],
        pista: R`$y^2 - 6y = 4x - 17$. Suma $9$ en ambos lados y factoriza el lado derecho.`,
        solucion: R`$y^2 - 6y + 9 = 4x - 8 \Rightarrow (y - 3)^2 = 4(x - 2)$. $V(2, 3)$, $4p = 4 \Rightarrow p = 1$, foco $(3, 3)$, directriz $x = 1$.` },
      { nivel: 'Aplicación',
        enunciado: R`<p>Una antena parabólica mide 1.2 m de diámetro y 0.15 m de profundidad. Si su vértice está en el origen y abre hacia arriba ($x^2 = 4py$), ¿a qué distancia del vértice debe ubicarse el receptor (en el foco)?</p>`,
        campos: [
          { etiqueta: R`$p$ (metros)`, respuesta: 0.6 }
        ],
        pista: R`El borde de la antena es el punto $(0.6,\; 0.15)$: la mitad del diámetro y la profundidad. Sustitúyelo en $x^2 = 4py$.`,
        solucion: R`$(0.6)^2 = 4p(0.15) \Rightarrow 0.36 = 0.6p \Rightarrow p = 0.6$ m. El receptor va a 60 cm del vértice.` }
    ],

    quiz: [
      { pregunta: R`El foco de $y^2 = 16x$ es:`,
        opciones: ['(4, 0)', '(0, 4)', '(16, 0)', '(−4, 0)'], correcta: 0,
        retro: [
          R`$4p = 16 \Rightarrow p = 4$; eje horizontal, foco $(p, 0) = (4, 0)$.`,
          R`La $y$ está al cuadrado: el eje es horizontal, así que el foco está sobre el eje $x$.`,
          R`$16$ es $4p$, no $p$.`,
          R`$p = 4 > 0$: abre a la derecha, el foco tiene $x$ positiva.`
        ] },
      { pregunta: R`La directriz de $x^2 = -12y$ es:`,
        opciones: ['y = 3', 'y = −3', 'x = 3', 'y = 12'], correcta: 0,
        retro: [
          R`$4p = -12 \Rightarrow p = -3$; directriz $y = -p = 3$.`,
          R`$y = -3$ contiene al foco $(0,-3)$; la directriz está al lado opuesto.`,
          R`Con $x^2$ el eje es vertical, así que la directriz es horizontal ($y = \ldots$).`,
          R`$-12$ es $4p$; divide entre 4.`
        ] },
      { pregunta: R`El lado recto de $(x - 1)^2 = 6(y + 2)$ mide:`,
        opciones: ['6', '1.5', '24', '3'], correcta: 0,
        retro: [
          R`El lado recto es $|4p|$ y aquí $4p = 6$.`,
          R`$1.5$ es $p$, no el lado recto.`,
          R`No multipliques otra vez por 4: el $6$ ya es $4p$.`,
          R`$3$ es la mitad del lado recto.`
        ] },
      { pregunta: 'La parábola con vértice (2, −1) y p = −2 que abre hacia la izquierda es:',
        opciones: [R`$(y + 1)^2 = -8(x - 2)$`, R`$(x - 2)^2 = -8(y + 1)$`, R`$(y - 1)^2 = -8(x + 2)$`, R`$(y + 1)^2 = 8(x - 2)$`], correcta: 0,
        retro: [
          R`Eje horizontal ($y^2$), $4p = -8$, y signos opuestos a los del vértice.`,
          R`Esa abre hacia abajo: la $x$ al cuadrado da eje vertical.`,
          R`Signos del vértice invertidos: debe ser $(y + 1)$ y $(x - 2)$.`,
          R`$4p = +8$ abriría hacia la derecha.`
        ] },
      { pregunta: 'La parábola es el conjunto de puntos del plano que:',
        opciones: ['Equidistan de un foco y una directriz', 'Cuya suma de distancias a dos focos es constante', 'Cuya diferencia de distancias a dos focos es constante', 'Están a distancia constante de un centro'], correcta: 0,
        retro: [
          R`Exacto: $\overline{PF} = d(P, \text{directriz})$.`,
          R`Esa es la definición de la elipse.`,
          R`Esa es la definición de la hipérbola.`,
          R`Esa es la definición de la circunferencia.`
        ] }
    ],

    ficha: R`
      <div class="tabla-wrap"><table>
        <tr><th></th><th>Eje vertical</th><th>Eje horizontal</th></tr>
        <tr><td>Canónica</td><td>$(x - h)^2 = 4p(y - k)$</td><td>$(y - k)^2 = 4p(x - h)$</td></tr>
        <tr><td>Foco</td><td>$(h,\; k + p)$</td><td>$(h + p,\; k)$</td></tr>
        <tr><td>Directriz</td><td>$y = k - p$</td><td>$x = h - p$</td></tr>
        <tr><td>Eje</td><td>$x = h$</td><td>$y = k$</td></tr>
        <tr><td>Abertura</td><td>$p>0$ arriba · $p<0$ abajo</td><td>$p>0$ derecha · $p<0$ izquierda</td></tr>
        <tr><td>Lado recto</td><td colspan="2">$|4p|$</td></tr>
        <tr><td>General</td><td>$x^2 + Dx + Ey + F = 0$</td><td>$y^2 + Dx + Ey + F = 0$</td></tr>
        <tr><td>Definición</td><td colspan="2">$\overline{PF} = d(P,\ \text{directriz})$</td></tr>
      </table></div>`,

    reto: {
      enunciado: R`<p>Ajusta $h$, $k$, $p$ y <b>vertical</b> para que tu parábola tenga el <b>foco en $(1,\,3)$</b> (punto azul hueco) y la <b>directriz $y = -1$</b> (recta gris punteada).</p>`,
      applet: {
        vista: [-6, 7, -4, 7],
        comandos: [
          'h = Slider(-4, 4, 0.5)',
          'SetValue(h, 0)',
          'k = Slider(-4, 4, 0.5)',
          'SetValue(k, 0)',
          'p = Slider(-3, 3, 0.25)',
          'SetValue(p, 1)',
          'vertical = false'
        ].concat(BASE, [
          'Fo = (1, 3)',
          'dObj: y = -1'
        ]),
        estilos: {
          par: { color: 'tinta', grosor: 7 },
          V: { color: 'rojo', tamano: 5 },
          F: { color: 'azul', tamano: 5 },
          dir: { color: 'verde', grosor: 4, trazo: 1 },
          eje: { color: 'gris', grosor: 2, trazo: 3 },
          Fo: { color: 'azul', tamano: 8, hueco: true, etiqueta: 'foco objetivo', fijo: true },
          dObj: { color: 'gris', grosor: 3, trazo: 2, etiqueta: 'directriz objetivo' }
        },
        auxiliares: ['v'],
        leyenda: [
          { color: 'azul', texto: 'Tu foco (relleno) / foco objetivo (hueco)' },
          { color: 'verde', texto: 'Tu directriz' },
          { color: 'gris', texto: 'Directriz objetivo' }
        ],
        lecturas: function (api) {
          const h = api.getValue('h'), k = api.getValue('k'), p = api.getValue('p'), v = api.getValue('v');
          return [
            { t: 'Tu foco', v: v ? GA.punto(h, k + p) : GA.punto(h + p, k), color: 'azul' },
            { t: 'Tu directriz', v: (v ? 'y = ' : 'x = ') + GA.fmt(v ? k - p : h - p), color: 'verde' }
          ];
        }
      },
      comprobar: function (api) {
        const h = api.getValue('h'), k = api.getValue('k'), p = api.getValue('p'), v = api.getValue('v');
        const msj = [];
        if (!v) { msj.push('La directriz objetivo es horizontal (y = −1), así que la parábola debe ser vertical: activa «vertical».'); }
        else {
          if (Math.abs(h - 1) > 1e-6 || Math.abs(k + p - 3) > 1e-6) msj.push('El foco está en ' + GA.punto(h, k + p) + '; debe estar en (1, 3).');
          if (Math.abs(k - p + 1) > 1e-6) msj.push('La directriz es y = ' + GA.fmt(k - p) + '; debe ser y = −1.');
        }
        return msj.length ? { ok: false, mensajes: msj } : { ok: true, mensajes: ['(x − 1)² = 8(y − 1): vértice (1, 1) y p = 2.'] };
      },
      solucion: R`El vértice está en el punto medio entre el foco y la directriz: $V(1,\, 1)$. La distancia vértice–foco es $p = 2$ y la parábola es vertical (abre hacia arriba): $(x - 1)^2 = 8(y - 1)$. Valores: $h = 1$, $k = 1$, $p = 2$, vertical activado.`
    }
  };
})();
