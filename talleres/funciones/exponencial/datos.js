/* Taller: FUNCIONES EXPONENCIALES — contenido. */
(function () {
  const R = String.raw;
  const GA = window.GA;

  const BASE = [
    'f(x) = a*b^(x - h) + k',
    'asint: y = k',
    'Y = (0, f(0))'
  ];

  window.TALLER = {
    id: 'exponencial',
    subtitulo: 'Base, crecimiento y decrecimiento, asíntota horizontal, dominio y rango, interceptos, transformaciones, el número e y modelos de crecimiento.',

    objetivos: [
      'Distinguir crecimiento (b > 1) y decrecimiento (0 < b < 1) en funciones exponenciales.',
      'Identificar dominio, rango, asíntota horizontal e interceptos, incluso con transformaciones.',
      'Resolver ecuaciones exponenciales sencillas y modelar crecimiento o decaimiento.'
    ],

    previos: [
      { pregunta: R`¿Cuánto vale $2^0$?`,
        opciones: ['1', '0', '2', 'No existe'], correcta: 0,
        explicacion: R`Todo número distinto de cero elevado a la $0$ vale $1$. Por eso toda $y = b^x$ pasa por $(0, 1)$.` },
      { pregunta: R`¿Cuánto vale $2^{-2}$?`,
        opciones: ['1/4', '−4', '−1/4', '4'], correcta: 0,
        explicacion: R`$2^{-2} = \dfrac{1}{2^2} = \dfrac14$. Un exponente negativo da un número positivo pequeño, nunca negativo.` }
    ],

    exploracion: {
      intro: R`Explora $f(x) = a \cdot b^{\,x - h} + k$. Empieza moviendo solo la base $b$; luego mueve $h$, $k$ y $a$. Observa la $\verde{\text{asíntota}}$ horizontal $y = k$ y el $\azul{\text{intercepto}}$ con el eje $y$. Activa <b>verE</b> para comparar con $y = e^x$.`,
      applet: {
        vista: [-7, 7, -6, 9],
        comandos: [
          'b = Slider(0.1, 4, 0.1)',
          'SetValue(b, 2)',
          'a = Slider(-3, 3, 0.5)',
          'SetValue(a, 1)',
          'h = Slider(-4, 4, 0.5)',
          'SetValue(h, 0)',
          'k = Slider(-4, 4, 0.5)',
          'SetValue(k, 0)',
          'verE = false',
          'fe(x) = exp(x)',
          'SetConditionToShowObject(fe, verE)'
        ].concat(BASE, [
          'P0 = (h, a + k)',
          'P1 = (h + 1, a*b + k)'
        ]),
        estilos: {
          f: { color: 'tinta', grosor: 7 },
          asint: { color: 'verde', grosor: 4, trazo: 1 },
          Y: { color: 'azul', tamano: 6 },
          P0: { color: 'rojo', tamano: 5 },
          P1: { color: 'naranja', tamano: 5 },
          fe: { color: 'morado', grosor: 4, trazo: 2 }
        },
        leyenda: [
          { color: 'verde', texto: 'Asíntota horizontal y = k' },
          { color: 'azul', texto: 'Intercepto con el eje y' },
          { color: 'rojo', texto: 'Punto (h, a + k): el "(0, 1)" trasladado' },
          { color: 'naranja', texto: 'Un paso más: (h + 1, ab + k)' },
          { color: 'morado', texto: 'y = eˣ' }
        ],
        lecturas: function (api) {
          const b = api.getValue('b'), a = api.getValue('a'), h = api.getValue('h'), k = api.getValue('k');
          const f = x => a * Math.pow(b, x - h) + k;
          let comp;
          if (Math.abs(b - 1) < 1e-9 || Math.abs(a) < 1e-9) comp = 'constante: ¡no es exponencial!';
          else comp = ((b > 1) === (a > 0)) ? 'CRECIENTE' : 'DECRECIENTE';
          const r = -k / a;
          const corteX = (Math.abs(a) > 1e-9 && r > 0 && Math.abs(b - 1) > 1e-9) ? 'x = ' + GA.fmt(h + Math.log(r) / Math.log(b)) : 'no corta al eje x';
          const rango = Math.abs(a) < 1e-9 ? '{' + GA.fmt(k) + '}' : a > 0 ? '(' + GA.fmt(k) + ', ∞)' : '(−∞, ' + GA.fmt(k) + ')';
          return [
            { t: 'f(x)', v: GA.fmt(a) + '·' + GA.fmt(b) + '^' + GA.lin('x', h) + ' ' + GA.sgn(k), ancho: true },
            { t: 'Comportamiento', v: comp },
            { t: 'Asíntota', v: 'y = ' + GA.fmt(k), color: 'verde' },
            { t: 'Dominio', v: 'ℝ' },
            { t: 'Rango', v: rango },
            { t: 'Intercepto y', v: GA.punto(0, f(0)), color: 'azul' },
            { t: 'Intercepto x', v: corteX }
          ];
        }
      },
      preguntas: [
        { pregunta: R`Con $a = 1$, $h = 0$, $k = 0$, mueve $b$. ¿Qué punto comparten todas las curvas? ¿Qué pasa si $b > 1$, si $0 < b < 1$ y si $b = 1$?`,
          respuesta: R`Todas pasan por $(0, 1)$. Si $b > 1$ es <b>creciente</b>; si $0 < b < 1$ es <b>decreciente</b>; si $b = 1$ es la recta $y = 1$ (por eso se exige $b \ne 1$).` },
        { pregunta: R`Mueve $k$. ¿Qué le pasa a la asíntota y al rango?`,
          respuesta: R`La asíntota es $y = k$: la curva se acerca a ella pero nunca la toca. Con $a > 0$ el rango es $(k, \infty)$.` },
        { pregunta: R`Pon $a$ negativo. ¿Qué cambia?`,
          respuesta: R`La curva se refleja respecto a la asíntota: queda por debajo de $y = k$ y el rango pasa a ser $(-\infty, k)$. También se invierte el comportamiento (creciente ↔ decreciente).` }
      ]
    },

    teoria: R`
      <div class="caja-def">
        <p><b>Definición.</b> Una función exponencial es $f(x) = b^x$ con base $b > 0$ y $b \ne 1$. La variable está en el <b>exponente</b>.</p>
      </div>
      <h3>Características de $y = b^x$</h3>
      <div class="tabla-wrap"><table>
        <tr><th></th><th>$b > 1$</th><th>$0 < b < 1$</th></tr>
        <tr><td>Comportamiento</td><td>Creciente</td><td>Decreciente</td></tr>
        <tr><td>Dominio</td><td colspan="2">$\mathbb{R}$</td></tr>
        <tr><td>Rango</td><td colspan="2">$(0,\, \infty)$</td></tr>
        <tr><td>Asíntota horizontal</td><td colspan="2">$\verde{y = 0}$ (por la izquierda si $b>1$, por la derecha si $0<b<1$)</td></tr>
        <tr><td>Intercepto $y$</td><td colspan="2">$\azul{(0,\, 1)}$ · no corta al eje $x$</td></tr>
        <tr><td>Otro punto clave</td><td colspan="2">$(1,\, b)$</td></tr>
      </table></div>
      <h3>Transformaciones: $f(x) = a \cdot b^{\,x - h} + k$</h3>
      <p>$h$ traslada horizontalmente · $k$ traslada verticalmente y la asíntota pasa a ser $\verde{y = k}$ · $|a|$ estira o comprime · $a < 0$ refleja (rango $(-\infty, k)$).</p>
      <h3>El número $e$</h3>
      <p>$e \approx 2.71828$ es la base "natural"; $y = e^x$ aparece en interés continuo, poblaciones y física.</p>
      <h3>Ecuaciones y modelos</h3>
      <p><b>Misma base:</b> si $b^{u} = b^{v}$, entonces $u = v$. &nbsp; <b>Crecimiento / decaimiento:</b> $P(t) = P_0\,(1 + r)^t$ (crece si $r > 0$, decae si $r < 0$).</p>`,

    ejemplos: [
      { titulo: 'Análisis de una exponencial trasladada',
        enunciado: R`<p>Analiza $f(x) = 2^{\,x - 1} + 3$.</p>`,
        pasos: [
          R`Base $2 > 1$ y $a = 1 > 0$: creciente.`,
          R`Asíntota $y = 3$; dominio $\mathbb{R}$; rango $(3,\, \infty)$.`,
          R`Intercepto $y$: $f(0) = 2^{-1} + 3 = 3.5$. No corta al eje $x$ (siempre $f(x) > 3$).`,
          R`El punto $(0, 1)$ de $2^x$ se traslada a $(1,\, 4)$.`
        ] },
      { titulo: 'Modelo de crecimiento',
        enunciado: R`<p>Una población de 5000 bacterias crece 3 % cada hora. Escribe el modelo y calcula la población después de 10 horas.</p>`,
        pasos: [
          R`$P_0 = 5000$ y $r = 0.03$: $P(t) = 5000\,(1.03)^t$.`,
          R`$P(10) = 5000 \cdot (1.03)^{10} \approx 5000 \cdot 1.3439 \approx 6720$ bacterias.`,
          R`Observa: no aumenta $30\% $ en 10 horas sino $\approx 34\%$, porque cada hora el 3 % se calcula sobre una cantidad mayor.`
        ] }
    ],

    practica: [
      { nivel: 'Básico',
        enunciado: R`<p>Para $f(x) = \left(\tfrac12\right)^x - 4$, indica la asíntota, los interceptos y el comportamiento.</p>`,
        campos: [
          { etiqueta: R`Asíntota: $y =$`, respuesta: -4 },
          { etiqueta: R`Intercepto $y$`, respuesta: -3 },
          { etiqueta: R`Intercepto $x$`, respuesta: -2 },
          { etiqueta: 'Comportamiento', tipo: 'opcion', opciones: ['Creciente', 'Decreciente'], respuesta: 'Decreciente' }
        ],
        pista: R`Para el intercepto $x$ resuelve $\left(\tfrac12\right)^x = 4$. Recuerda que $\left(\tfrac12\right)^{-2} = 4$.`,
        solucion: R`Asíntota $y = -4$. $f(0) = 1 - 4 = -3$. $\left(\tfrac12\right)^x = 4 = \left(\tfrac12\right)^{-2} \Rightarrow x = -2$. Base $\tfrac12 < 1$: decreciente.` },
      { nivel: 'Intermedio',
        enunciado: R`<p>Resuelve: (a) $3^{\,x + 1} = 81$ &nbsp; (b) $2^{\,2x} = \dfrac18$.</p>`,
        campos: [
          { etiqueta: R`(a) $x$`, respuesta: 3 },
          { etiqueta: R`(b) $x$`, respuesta: -1.5 }
        ],
        pista: R`Escribe ambos lados con la misma base: $81 = 3^4$ y $\dfrac18 = 2^{-3}$.`,
        solucion: R`(a) $3^{x + 1} = 3^4 \Rightarrow x = 3$. (b) $2^{2x} = 2^{-3} \Rightarrow 2x = -3 \Rightarrow x = -1.5$.` },
      { nivel: 'Intermedio',
        enunciado: R`<p>La función $f(x) = b^x + k$ tiene asíntota $y = 1$ y pasa por el punto $(2,\, 10)$. Halla $b$ y $k$.</p>`,
        campos: [
          { etiqueta: R`$b$`, respuesta: 3 },
          { etiqueta: R`$k$`, respuesta: 1 }
        ],
        pista: R`La asíntota da $k$ directamente. Luego sustituye el punto.`,
        solucion: R`$k = 1$. $10 = b^2 + 1 \Rightarrow b^2 = 9 \Rightarrow b = 3$ (la base debe ser positiva).` },
      { nivel: 'Aplicación',
        enunciado: R`<p>Un auto de 20 000 dólares pierde el 15 % de su valor cada año: $V(t) = 20000 \cdot b^t$. ¿Cuál es la base $b$? ¿Cuánto vale el auto a los 3 años?</p>`,
        campos: [
          { etiqueta: R`Base $b$`, respuesta: 0.85 },
          { etiqueta: 'Valor a los 3 años (dólares)', respuesta: 12282.5, tol: 1, ayuda: 'ej. 12282.50' }
        ],
        pista: R`Si pierde el 15 %, conserva el 85 % cada año.`,
        solucion: R`$b = 1 - 0.15 = 0.85$. $V(3) = 20000 \cdot 0.85^3 = 20000 \cdot 0.614125 = 12\,282.50$ dólares.` }
    ],

    quiz: [
      { pregunta: R`La asíntota de $f(x) = 5^x + 2$ es:`,
        opciones: ['y = 2', 'y = 0', 'x = 2', 'y = 5'], correcta: 0,
        retro: [
          R`La constante sumada traslada la asíntota de $y = 0$ a $y = 2$.`,
          R`$y = 0$ es la asíntota de $5^x$ sin trasladar.`,
          R`La asíntota de una exponencial es horizontal ($y = \ldots$).`,
          R`La base no determina la asíntota.`
        ] },
      { pregunta: R`La función $f(x) = (0.3)^x$ es:`,
        opciones: ['Decreciente', 'Creciente', 'Constante', 'Creciente y luego decreciente'], correcta: 0,
        retro: [
          R`Base $0 < 0.3 < 1$: decreciente.`,
          R`Solo es creciente si la base es mayor que 1.`,
          R`Sería constante con base 1.`,
          R`Las exponenciales son siempre crecientes o siempre decrecientes.`
        ] },
      { pregunta: R`Todas las funciones $y = b^x$ (con $b > 0$, $b \ne 1$) pasan por el punto:`,
        opciones: ['(0, 1)', '(1, 0)', '(0, 0)', '(1, 1)'], correcta: 0,
        retro: [
          R`$b^0 = 1$ para cualquier base.`,
          R`$(1, 0)$ es el punto común de las <b>logarítmicas</b>.`,
          R`$b^x$ nunca vale 0.`,
          R`$b^1 = b$, no $1$.`
        ] },
      { pregunta: R`El rango de $f(x) = -2^x + 3$ es:`,
        opciones: ['(−∞, 3)', '(3, ∞)', 'ℝ', '(−∞, −3)'], correcta: 0,
        retro: [
          R`$a = -1 < 0$ refleja la curva bajo la asíntota $y = 3$.`,
          R`Sería así si $a > 0$; aquí el signo menos la refleja.`,
          R`Las exponenciales siempre están limitadas por su asíntota.`,
          R`La asíntota es $y = 3$, no $y = -3$.`
        ] },
      { pregunta: R`La solución de $5^{\,2x - 1} = 125$ es:`,
        opciones: ['x = 2', 'x = 3', 'x = 1', 'x = 62'], correcta: 0,
        retro: [
          R`$125 = 5^3 \Rightarrow 2x - 1 = 3 \Rightarrow x = 2$.`,
          R`$3$ es el valor de $2x - 1$, no de $x$.`,
          R`Comprueba: $5^{1} = 5 \ne 125$.`,
          R`No se puede "dividir" 125 entre 5 y despejar; iguala exponentes.`
        ] }
    ],

    ficha: R`
      <div class="tabla-wrap"><table>
        <tr><th>Concepto</th><th>Resumen</th></tr>
        <tr><td>Definición</td><td>$f(x) = b^x$, $\;b > 0$, $b \ne 1$</td></tr>
        <tr><td>Crecimiento</td><td>$b > 1$ creciente · $0 < b < 1$ decreciente</td></tr>
        <tr><td>Dominio / rango</td><td>$\mathbb{R}$ · $(0, \infty)$</td></tr>
        <tr><td>Asíntota</td><td>$y = 0$ (con traslación: $y = k$)</td></tr>
        <tr><td>Puntos clave</td><td>$(0, 1)$ y $(1, b)$</td></tr>
        <tr><td>Transformada</td><td>$a\,b^{x - h} + k$: rango $(k, \infty)$ si $a > 0$; $(-\infty, k)$ si $a < 0$</td></tr>
        <tr><td>Ecuaciones</td><td>$b^u = b^v \Rightarrow u = v$</td></tr>
        <tr><td>Modelo</td><td>$P(t) = P_0 (1 + r)^t$</td></tr>
      </table></div>`,

    reto: {
      enunciado: R`<p>Ajusta $b$, $a$, $h$ y $k$ para que la curva tenga <b>asíntota $y = -2$</b> (recta gris) y pase por los puntos huecos $(0,\, -1)$ y $(2,\, 7)$.</p>`,
      applet: {
        vista: [-5, 5, -5, 9],
        comandos: [
          'b = Slider(0.1, 4, 0.1)',
          'SetValue(b, 2)',
          'a = Slider(-3, 3, 0.5)',
          'SetValue(a, 1)',
          'h = Slider(-4, 4, 0.5)',
          'SetValue(h, 0)',
          'k = Slider(-4, 4, 0.5)',
          'SetValue(k, 0)'
        ].concat(BASE, [
          'objA: y = -2',
          'A = (0, -1)',
          'B = (2, 7)'
        ]),
        estilos: {
          f: { color: 'tinta', grosor: 7 },
          asint: { color: 'verde', grosor: 3, trazo: 1 },
          Y: { color: 'azul', tamano: 4 },
          objA: { color: 'gris', grosor: 4, trazo: 2, etiqueta: 'y = −2' },
          A: { color: 'naranja', tamano: 8, hueco: true, fijo: true, etiqueta: '(0, −1)' },
          B: { color: 'naranja', tamano: 8, hueco: true, fijo: true, etiqueta: '(2, 7)' }
        },
        leyenda: [{ color: 'verde', texto: 'Tu asíntota' }, { color: 'gris', texto: 'Asíntota objetivo' }, { color: 'naranja', texto: 'Puntos objetivo' }],
        lecturas: function (api) {
          const b = api.getValue('b'), a = api.getValue('a'), h = api.getValue('h'), k = api.getValue('k');
          const f = x => a * Math.pow(b, x - h) + k;
          return [
            { t: 'Tu asíntota', v: 'y = ' + GA.fmt(k), color: 'verde' },
            { t: 'f(0)', v: GA.fmt(f(0)) },
            { t: 'f(2)', v: GA.fmt(f(2)) }
          ];
        }
      },
      comprobar: function (api) {
        const b = api.getValue('b'), a = api.getValue('a'), h = api.getValue('h'), k = api.getValue('k');
        const f = x => a * Math.pow(b, x - h) + k;
        const msj = [];
        if (Math.abs(k + 2) > 1e-6) msj.push('La asíntota es y = ' + GA.fmt(k) + '; debe ser y = −2.');
        if (Math.abs(f(0) + 1) > 0.01) msj.push('f(0) = ' + GA.fmt(f(0)) + '; debe ser −1.');
        if (Math.abs(f(2) - 7) > 0.01) msj.push('f(2) = ' + GA.fmt(f(2)) + '; debe ser 7.');
        return msj.length ? { ok: false, mensajes: msj } : { ok: true, mensajes: ['La función es f(x) = 3ˣ − 2 (o una forma equivalente como 3·3^(x − 1) − 2).'] };
      },
      solucion: R`Asíntota: $k = -2$. Con $a = 1$ y $h = 0$: $f(0) = 1 - 2 = -1$ ✓ y $f(2) = b^2 - 2 = 7 \Rightarrow b = 3$. Solución: $f(x) = 3^x - 2$ ($b = 3$, $a = 1$, $h = 0$, $k = -2$). También vale $a = 3$, $h = 1$, porque $3 \cdot 3^{x-1} = 3^x$.`
    }
  };
})();
