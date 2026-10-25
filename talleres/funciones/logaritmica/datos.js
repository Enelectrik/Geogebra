/* Taller: FUNCIONES LOGARÍTMICAS — contenido. */
(function () {
  const R = String.raw;
  const GA = window.GA;

  const BASE = [
    'f(x) = a*log(b, x - h) + k',
    'asv: x = h'
  ];
  const logb = (b, x) => Math.log(x) / Math.log(b);

  window.TALLER = {
    id: 'logaritmica',
    subtitulo: 'El logaritmo como inversa de la exponencial, propiedades, dominio, rango, asíntota vertical, interceptos, transformaciones y ecuaciones.',

    objetivos: [
      'Entender el logaritmo como inversa de la exponencial y pasar de una forma a otra.',
      'Identificar dominio, rango, asíntota vertical e interceptos de funciones logarítmicas transformadas.',
      'Aplicar las propiedades de los logaritmos para resolver ecuaciones y problemas.'
    ],

    previos: [
      { pregunta: R`¿A qué exponente hay que elevar $2$ para obtener $8$?`,
        opciones: ['3', '4', '6', '16'], correcta: 0,
        explicacion: R`$2^3 = 8$. Esa pregunta es exactamente lo que calcula un logaritmo: $\log_2 8 = 3$.` },
      { pregunta: R`La gráfica de la inversa de $f(x) = 2^x$ se obtiene reflejando la de $f$ respecto a:`,
        opciones: ['La recta y = x', 'El eje x', 'El eje y', 'El origen'], correcta: 0,
        explicacion: R`Toda función inversa es simétrica a la original respecto a $y = x$. La inversa de $2^x$ es $\log_2 x$.` }
    ],

    exploracion: {
      intro: R`Explora $f(x) = a \cdot \log_b(x - h) + k$. Mueve primero la base $b$; luego $h$, $k$ y $a$. Observa la $\verde{\text{asíntota vertical}}$ $x = h$ y los puntos clave. Activa <b>verExp</b> para ver la exponencial $y = b^x$ y la recta $y = x$.`,
      applet: {
        vista: [-6, 9, -6, 6],
        comandos: [
          'b = Slider(0.1, 5, 0.1)',
          'SetValue(b, 2)',
          'a = Slider(-3, 3, 0.5)',
          'SetValue(a, 1)',
          'h = Slider(-4, 4, 0.5)',
          'SetValue(h, 0)',
          'k = Slider(-4, 4, 0.5)',
          'SetValue(k, 0)',
          'verExp = false'
        ].concat(BASE, [
          'P1 = (h + 1, k)',
          'Pb = (h + b, a + k)',
          'g(x) = b^x',
          'id: y = x',
          'SetConditionToShowObject(g, verExp)',
          'SetConditionToShowObject(id, verExp)'
        ]),
        estilos: {
          f: { color: 'tinta', grosor: 7 },
          asv: { color: 'verde', grosor: 4, trazo: 1 },
          P1: { color: 'rojo', tamano: 6, etiqueta: '(h + 1, k)' },
          Pb: { color: 'naranja', tamano: 6, etiqueta: '(h + b, a + k)' },
          g: { color: 'morado', grosor: 5, trazo: 1 },
          id: { color: 'gris', grosor: 2, trazo: 2 }
        },
        leyenda: [
          { color: 'verde', texto: 'Asíntota vertical x = h' },
          { color: 'rojo', texto: 'El punto (1, 0) trasladado' },
          { color: 'naranja', texto: 'El punto (b, 1) transformado' },
          { color: 'morado', texto: 'Exponencial y = bˣ' },
          { color: 'gris', texto: 'y = x' }
        ],
        lecturas: function (api) {
          const b = api.getValue('b'), a = api.getValue('a'), h = api.getValue('h'), k = api.getValue('k');
          if (Math.abs(b - 1) < 1e-9) return [{ t: 'Atención', v: 'La base b = 1 no es válida: 1 elevado a cualquier número es 1.', ancho: true }];
          let comp;
          if (Math.abs(a) < 1e-9) comp = 'constante (a = 0)';
          else comp = ((b > 1) === (a > 0)) ? 'CRECIENTE' : 'DECRECIENTE';
          const corteX = Math.abs(a) < 1e-9 ? '—' : 'x = ' + GA.fmt(h + Math.pow(b, -k / a));
          const corteY = h < 0 ? GA.punto(0, a * logb(b, -h) + k) : 'no existe (0 no está en el dominio)';
          return [
            { t: 'f(x)', v: GA.fmt(a) + '·log_' + GA.fmt(b) + GA.lin('x', h) + ' ' + GA.sgn(k), ancho: true },
            { t: 'Comportamiento', v: comp },
            { t: 'Dominio', v: '(' + GA.fmt(h) + ', ∞)' },
            { t: 'Rango', v: 'ℝ' },
            { t: 'Asíntota vertical', v: 'x = ' + GA.fmt(h), color: 'verde' },
            { t: 'Intercepto x', v: corteX },
            { t: 'Intercepto y', v: corteY }
          ];
        }
      },
      preguntas: [
        { pregunta: R`Con $a = 1$, $h = 0$, $k = 0$, mueve $b$. ¿Qué punto comparten todas las curvas? ¿Por qué también pasan por $(b, 1)$?`,
          respuesta: R`Todas pasan por $(1, 0)$ porque $\log_b 1 = 0$ (ya que $b^0 = 1$). Y pasan por $(b, 1)$ porque $\log_b b = 1$. Si $b > 1$ es creciente; si $0 < b < 1$, decreciente.` },
        { pregunta: R`Activa <b>verExp</b>. ¿Qué relación hay entre $y = \log_b x$ y $y = b^x$?`,
          respuesta: R`Son <b>inversas</b>: sus gráficas son simétricas respecto a $y = x$. Por eso el $(0, 1)$ de la exponencial se convierte en el $(1, 0)$ del logaritmo, y la asíntota horizontal $y = 0$ en la asíntota vertical $x = 0$.` },
        { pregunta: R`Mueve $h$. ¿Qué pasa con la asíntota y con el dominio? ¿Se puede calcular $\log_b$ de un número negativo?`,
          respuesta: R`La asíntota es $x = h$ y el dominio es $(h, \infty)$: el argumento $x - h$ debe ser <b>positivo</b>. No existe el logaritmo de un número negativo ni de cero.` }
      ]
    },

    teoria: R`
      <div class="caja-def">
        <p><b>Definición.</b> Para $b > 0$, $b \ne 1$ y $x > 0$:</p>
        $$y = \log_b x \quad \Longleftrightarrow \quad b^{\,y} = x$$
        <p>El logaritmo es el <b>exponente</b> al que hay que elevar la base para obtener $x$. Es la función inversa de $b^x$.</p>
      </div>
      <h3>Características de $y = \log_b x$</h3>
      <div class="tabla-wrap"><table>
        <tr><th></th><th>$b > 1$</th><th>$0 < b < 1$</th></tr>
        <tr><td>Comportamiento</td><td>Creciente</td><td>Decreciente</td></tr>
        <tr><td>Dominio</td><td colspan="2">$(0,\, \infty)$</td></tr>
        <tr><td>Rango</td><td colspan="2">$\mathbb{R}$</td></tr>
        <tr><td>Asíntota vertical</td><td colspan="2">$\verde{x = 0}$</td></tr>
        <tr><td>Puntos clave</td><td colspan="2">$\rojo{(1,\, 0)}$ y $\naranja{(b,\, 1)}$ · no corta al eje $y$</td></tr>
      </table></div>
      <h3>Propiedades</h3>
      <div class="tabla-wrap"><table>
        <tr><td>$\log_b 1 = 0$ · $\log_b b = 1$</td><td>$\log_b (b^x) = x$ · $b^{\log_b x} = x$</td></tr>
        <tr><td>Producto: $\log_b (MN) = \log_b M + \log_b N$</td><td>Cociente: $\log_b \dfrac{M}{N} = \log_b M - \log_b N$</td></tr>
        <tr><td>Potencia: $\log_b (M^p) = p \log_b M$</td><td>Cambio de base: $\log_b x = \dfrac{\ln x}{\ln b}$</td></tr>
      </table></div>
      <p>Notación: $\log x = \log_{10} x$ (decimal) y $\ln x = \log_e x$ (natural).</p>
      <h3>Transformaciones: $f(x) = a \log_b(x - h) + k$</h3>
      <p>Dominio $x > h$ · asíntota $\verde{x = h}$ · rango $\mathbb{R}$. Al resolver ecuaciones, <b>verifica</b> que las soluciones estén en el dominio.</p>`,

    ejemplos: [
      { titulo: 'Análisis de una logarítmica trasladada',
        enunciado: R`<p>Analiza $f(x) = \log_2(x - 3) + 1$.</p>`,
        pasos: [
          R`Argumento positivo: $x - 3 > 0 \Rightarrow$ dominio $(3,\, \infty)$; asíntota $x = 3$; rango $\mathbb{R}$.`,
          R`Base $2 > 1$: creciente.`,
          R`Intercepto $x$: $\log_2(x - 3) = -1 \Rightarrow x - 3 = 2^{-1} \Rightarrow x = 3.5$.`,
          R`No hay intercepto $y$ ($0$ no está en el dominio). El punto $(1, 0)$ se traslada a $(4,\, 1)$.`
        ] },
      { titulo: 'Ecuación logarítmica',
        enunciado: R`<p>Resuelve $\log_3(x + 1) + \log_3(x - 1) = 1$.</p>`,
        pasos: [
          R`Propiedad del producto: $\log_3\big[(x + 1)(x - 1)\big] = 1$.`,
          R`Forma exponencial: $x^2 - 1 = 3^1 \Rightarrow x^2 = 4 \Rightarrow x = \pm 2$.`,
          R`Verifica el dominio: se necesita $x - 1 > 0$. $x = -2$ no sirve.`,
          R`Solución única: $x = 2$.`
        ] }
    ],

    practica: [
      { nivel: 'Básico',
        enunciado: R`<p>Calcula sin calculadora: (a) $\log_2 32$ &nbsp; (b) $\log_5 \tfrac{1}{25}$ &nbsp; (c) $\ln(e^4)$.</p>`,
        campos: [
          { etiqueta: '(a)', respuesta: 5 },
          { etiqueta: '(b)', respuesta: -2 },
          { etiqueta: '(c)', respuesta: 4 }
        ],
        pista: R`Pregúntate: ¿a qué exponente elevo la base para obtener el número? $\tfrac1{25} = 5^{-2}$.`,
        solucion: R`(a) $2^5 = 32 \Rightarrow 5$. (b) $5^{-2} = \tfrac1{25} \Rightarrow -2$. (c) $\ln(e^4) = 4$.` },
      { nivel: 'Intermedio',
        enunciado: R`<p>Para $f(x) = \log_3(x + 2) - 1$, halla la asíntota vertical y los interceptos.</p>`,
        campos: [
          { etiqueta: R`Asíntota: $x =$`, respuesta: -2 },
          { etiqueta: R`Intercepto $x$`, respuesta: 1 },
          { etiqueta: R`Intercepto $y$ (2 decimales)`, respuesta: logb(3, 2) - 1, tol: 0.01, ayuda: 'ej. -0.37' }
        ],
        pista: R`Intercepto $x$: $\log_3(x + 2) = 1$. Intercepto $y$: $f(0) = \log_3 2 - 1$; usa $\log_3 2 = \dfrac{\ln 2}{\ln 3}$.`,
        solucion: R`Asíntota $x = -2$. $\log_3(x + 2) = 1 \Rightarrow x + 2 = 3 \Rightarrow x = 1$. $f(0) = \log_3 2 - 1 \approx 0.631 - 1 = -0.369$.` },
      { nivel: 'Intermedio',
        enunciado: R`<p>Resuelve: (a) $\log_2 x + \log_2(x - 2) = 3$ &nbsp; (b) $2^x = 10$ (con 2 decimales).</p>`,
        campos: [
          { etiqueta: R`(a) $x$`, respuesta: 4 },
          { etiqueta: R`(b) $x$`, respuesta: Math.log(10) / Math.log(2), tol: 0.01, ayuda: 'ej. 3.32' }
        ],
        pista: R`(a) Une los logaritmos y pasa a forma exponencial; revisa el dominio. (b) $x = \log_2 10 = \dfrac{\ln 10}{\ln 2}$.`,
        solucion: R`(a) $x(x - 2) = 8 \Rightarrow x^2 - 2x - 8 = 0 \Rightarrow x = 4$ o $x = -2$; solo $x = 4$ está en el dominio. (b) $x = \log_2 10 \approx 3.32$.` },
      { nivel: 'Aplicación',
        enunciado: R`<p>El pH de una solución es $\text{pH} = -\log[\text{H}^+]$. Calcula el pH de un jugo con $[\text{H}^+] = 3.2 \times 10^{-4}$. ¿Cuántas veces más ácida es una solución de pH 3 que una de pH 5?</p>`,
        campos: [
          { etiqueta: 'pH (2 decimales)', respuesta: -Math.log10(3.2e-4), tol: 0.01, ayuda: 'ej. 3.49' },
          { etiqueta: 'Veces más ácida', respuesta: 100 }
        ],
        pista: R`$\log(3.2 \times 10^{-4}) = \log 3.2 + \log 10^{-4}$. Cada unidad de pH equivale a multiplicar por 10 la concentración.`,
        solucion: R`$\text{pH} = -(\log 3.2 - 4) = 4 - 0.505 \approx 3.49$. Entre pH 3 y pH 5 hay 2 unidades: $10^2 = 100$ veces más ácida.` }
    ],

    quiz: [
      { pregunta: R`$\log_4 64$ es igual a:`,
        opciones: ['3', '16', '4', '2'], correcta: 0,
        retro: [
          R`$4^3 = 64$.`,
          R`El logaritmo es un exponente, no un cociente ($64/4 = 16$).`,
          R`$4^4 = 256$, no $64$.`,
          R`$4^2 = 16$, no $64$.`
        ] },
      { pregunta: R`El dominio de $f(x) = \log(x - 5)$ es:`,
        opciones: ['(5, ∞)', '[5, ∞)', 'ℝ', '(0, ∞)'], correcta: 0,
        retro: [
          R`El argumento debe ser positivo: $x - 5 > 0$.`,
          R`$x = 5$ da $\log 0$, que no existe: el intervalo es abierto.`,
          R`No existe el logaritmo de números negativos ni de cero.`,
          R`Ese es el dominio de $\log x$ sin trasladar.`
        ] },
      { pregunta: R`Las funciones $y = \log_b x$ y $y = b^x$ son:`,
        opciones: ['Inversas, simétricas respecto a y = x', 'Iguales', 'Simétricas respecto al eje y', 'Recíprocas: una es 1 sobre la otra'], correcta: 0,
        retro: [
          R`Una deshace a la otra: $\log_b(b^x) = x$.`,
          R`Tienen gráficas distintas: una tiene asíntota horizontal y la otra vertical.`,
          R`La simetría es respecto a la recta $y = x$.`,
          R`Inversa no significa recíproca.`
        ] },
      { pregunta: R`$\log_2 8 + \log_2 4$ es igual a:`,
        opciones: ['5', '12', 'log₂ 12', '6'], correcta: 0,
        retro: [
          R`$\log_2(8 \cdot 4) = \log_2 32 = 5$ (o bien $3 + 2$).`,
          R`La suma de logaritmos es el logaritmo de un <b>producto</b>, no de una suma.`,
          R`$\log M + \log N = \log(MN)$, no $\log(M + N)$.`,
          R`$\log_2 8 = 3$ y $\log_2 4 = 2$: la suma es $5$.`
        ] },
      { pregunta: R`La asíntota de $f(x) = \ln(x + 3)$ es:`,
        opciones: ['x = −3', 'x = 3', 'y = −3', 'x = 0'], correcta: 0,
        retro: [
          R`$x + 3 = 0 \Rightarrow x = -3$: la gráfica se traslada 3 unidades a la izquierda.`,
          R`$(x + 3)$ traslada a la izquierda, no a la derecha.`,
          R`La asíntota de un logaritmo es vertical ($x = \ldots$).`,
          R`$x = 0$ es la asíntota de $\ln x$ sin trasladar.`
        ] }
    ],

    ficha: R`
      <div class="tabla-wrap"><table>
        <tr><th>Concepto</th><th>Resumen</th></tr>
        <tr><td>Definición</td><td>$y = \log_b x \iff b^y = x$ ($b > 0$, $b \ne 1$, $x > 0$)</td></tr>
        <tr><td>Inversa</td><td>$\log_b x$ es la inversa de $b^x$ (simetría con $y = x$)</td></tr>
        <tr><td>Dominio / rango</td><td>$(0, \infty)$ · $\mathbb{R}$</td></tr>
        <tr><td>Asíntota</td><td>$x = 0$ (con traslación: $x = h$, dominio $x > h$)</td></tr>
        <tr><td>Puntos clave</td><td>$(1, 0)$ y $(b, 1)$</td></tr>
        <tr><td>Crecimiento</td><td>$b > 1$ creciente · $0 < b < 1$ decreciente</td></tr>
        <tr><td>Propiedades</td><td>$\log(MN) = \log M + \log N$ · $\log\frac MN = \log M - \log N$ · $\log M^p = p\log M$</td></tr>
        <tr><td>Cambio de base</td><td>$\log_b x = \dfrac{\ln x}{\ln b}$</td></tr>
      </table></div>`,

    reto: {
      enunciado: R`<p>Ajusta $b$, $a$, $h$ y $k$ para que la curva tenga <b>asíntota vertical $x = -1$</b> (recta gris) y pase por los puntos huecos $(0,\, 2)$ y $(8,\, 4)$.</p>`,
      applet: {
        vista: [-4, 11, -4, 7],
        comandos: [
          'b = Slider(0.1, 5, 0.1)',
          'SetValue(b, 2)',
          'a = Slider(-3, 3, 0.5)',
          'SetValue(a, 1)',
          'h = Slider(-4, 4, 0.5)',
          'SetValue(h, 0)',
          'k = Slider(-4, 4, 0.5)',
          'SetValue(k, 0)'
        ].concat(BASE, [
          'objV: x = -1',
          'A = (0, 2)',
          'B = (8, 4)'
        ]),
        estilos: {
          f: { color: 'tinta', grosor: 7 },
          asv: { color: 'verde', grosor: 3, trazo: 1 },
          objV: { color: 'gris', grosor: 4, trazo: 2, etiqueta: 'x = −1' },
          A: { color: 'naranja', tamano: 8, hueco: true, fijo: true, etiqueta: '(0, 2)' },
          B: { color: 'naranja', tamano: 8, hueco: true, fijo: true, etiqueta: '(8, 4)' }
        },
        leyenda: [{ color: 'verde', texto: 'Tu asíntota' }, { color: 'gris', texto: 'Asíntota objetivo' }, { color: 'naranja', texto: 'Puntos objetivo' }],
        lecturas: function (api) {
          const b = api.getValue('b'), a = api.getValue('a'), h = api.getValue('h'), k = api.getValue('k');
          const f = x => (x - h > 0 && Math.abs(b - 1) > 1e-9) ? a * logb(b, x - h) + k : NaN;
          return [
            { t: 'Tu asíntota', v: 'x = ' + GA.fmt(h), color: 'verde' },
            { t: 'f(0)', v: GA.fmt(f(0)) },
            { t: 'f(8)', v: GA.fmt(f(8)) }
          ];
        }
      },
      comprobar: function (api) {
        const b = api.getValue('b'), a = api.getValue('a'), h = api.getValue('h'), k = api.getValue('k');
        if (Math.abs(b - 1) < 1e-9) return { ok: false, mensajes: ['La base no puede ser 1.'] };
        const f = x => (x - h > 0) ? a * logb(b, x - h) + k : NaN;
        const msj = [];
        if (Math.abs(h + 1) > 1e-6) msj.push('La asíntota es x = ' + GA.fmt(h) + '; debe ser x = −1.');
        if (!(Math.abs(f(0) - 2) <= 0.01)) msj.push('f(0) = ' + GA.fmt(f(0)) + '; debe ser 2.');
        if (!(Math.abs(f(8) - 4) <= 0.01)) msj.push('f(8) = ' + GA.fmt(f(8)) + '; debe ser 4.');
        return msj.length ? { ok: false, mensajes: msj } : { ok: true, mensajes: ['f(x) = log₃(x + 1) + 2.'] };
      },
      solucion: R`Asíntota: $h = -1$. $f(0) = a\log_b 1 + k = k = 2$. $f(8) = a \log_b 9 + 2 = 4 \Rightarrow a \log_b 9 = 2$, que se cumple con $a = 1$ y $b = 3$. Solución: $f(x) = \log_3(x + 1) + 2$.`
    }
  };
})();
