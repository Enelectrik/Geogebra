/* Taller: COMPOSICIÓN DE FUNCIONES — contenido. */
(function () {
  const R = String.raw;
  const GA = window.GA;

  window.TALLER = {
    id: 'composicion',
    subtitulo: 'Qué significa (f∘g)(x), cómo se calcula y se evalúa, su dominio, por qué el orden importa y cómo descomponer una función.',

    objetivos: [
      'Calcular (f∘g)(x) y (g∘f)(x) a partir de sus expresiones y evaluarlas en un punto.',
      'Determinar el dominio de una función compuesta.',
      'Reconocer que la composición no es conmutativa y descomponer una función en dos más simples.'
    ],

    previos: [
      { pregunta: R`Si $f(x) = 2x + 1$, ¿cuánto vale $f(3)$?`,
        opciones: ['7', '6', '5', '9'], correcta: 0,
        explicacion: R`$f(3) = 2(3) + 1 = 7$.` },
      { pregunta: R`Si $f(x) = x^2$, ¿a qué es igual $f(a + 1)$?`,
        opciones: ['a² + 1', 'a² + 2a + 1', '(a + 1)·2', 'a + 1²'], correcta: 1,
        explicacion: R`Se reemplaza <b>toda</b> la $x$ por $(a + 1)$: $f(a+1) = (a+1)^2 = a^2 + 2a + 1$. Esta es la idea central de la composición.` }
    ],

    exploracion: {
      intro: R`Trabajamos con $\naranja{f(x) = ax + b}$ y $\azul{g(x) = x^2 + c}$. Mueve $x_0$ y sigue la cadena: primero $g$ transforma $x_0$ y ese resultado entra en $f$. La curva $\verde{f \circ g}$ reúne todos esos resultados. Activa <b>verGoF</b> para comparar con $\morado{g \circ f}$.`,
      applet: {
        vista: [-6, 6, -6, 8],
        comandos: [
          'a = Slider(-3, 3, 0.5)',
          'SetValue(a, 2)',
          'b = Slider(-4, 4, 0.5)',
          'SetValue(b, -1)',
          'c = Slider(-4, 4, 0.5)',
          'SetValue(c, 0)',
          'x0 = Slider(-3, 3, 0.1)',
          'SetValue(x0, 1)',
          'verGoF = false',
          'f(x) = a*x + b',
          'g(x) = x^2 + c',
          'fog(x) = f(g(x))',
          'gof(x) = g(f(x))',
          'SetConditionToShowObject(gof, verGoF)',
          'X0 = (x0, 0)',
          'G0 = (x0, g(x0))',
          'U = (g(x0), 0)',
          'FU = (g(x0), f(g(x0)))',
          'R0 = (x0, f(g(x0)))',
          's1 = Segment(X0, G0)',
          's2 = Segment(U, FU)',
          's3 = Segment(FU, R0)'
        ],
        estilos: {
          f: { color: 'naranja', grosor: 5 },
          g: { color: 'azul', grosor: 5 },
          fog: { color: 'verde', grosor: 8 },
          gof: { color: 'morado', grosor: 6, trazo: 1 },
          X0: { color: 'tinta', tamano: 5, etiqueta: 'x₀' },
          G0: { color: 'azul', tamano: 5, etiqueta: 'g(x₀)' },
          U: { color: 'azul', tamano: 4, hueco: true, etiqueta: 'u = g(x₀)' },
          FU: { color: 'naranja', tamano: 5, etiqueta: 'f(u)' },
          R0: { color: 'verde', tamano: 7, etiqueta: '(f∘g)(x₀)' },
          s1: { color: 'azul', grosor: 2, trazo: 1 },
          s2: { color: 'naranja', grosor: 2, trazo: 1 },
          s3: { color: 'verde', grosor: 2, trazo: 1 }
        },
        leyenda: [
          { color: 'azul', texto: 'g(x) = x² + c (se aplica primero)' },
          { color: 'naranja', texto: 'f(x) = ax + b (se aplica después)' },
          { color: 'verde', texto: '(f∘g)(x) = f(g(x))' },
          { color: 'morado', texto: '(g∘f)(x) = g(f(x))' }
        ],
        lecturas: function (api) {
          const a = api.getValue('a'), b = api.getValue('b'), c = api.getValue('c'), x0 = api.getValue('x0');
          const g0 = x0 * x0 + c, f0 = a * g0 + b, gf0 = Math.pow(a * x0 + b, 2) + c;
          return [
            { t: 'Cadena f∘g', v: 'x₀ = ' + GA.fmt(x0) + '  →  g(x₀) = ' + GA.fmt(g0) + '  →  f(g(x₀)) = ' + GA.fmt(f0), color: 'verde', ancho: true },
            { t: '(f∘g)(x)', v: GA.fmt(a) + 'x² ' + GA.sgn(a * c + b), color: 'verde' },
            { t: '(g∘f)(x)', v: '(' + GA.fmt(a) + 'x ' + GA.sgn(b) + ')² ' + GA.sgn(c), color: 'morado' },
            { t: '(g∘f)(x₀)', v: GA.fmt(gf0), color: 'morado' },
            { t: '¿Iguales en x₀?', v: Math.abs(f0 - gf0) < 1e-9 ? 'sí' : 'no' }
          ];
        }
      },
      preguntas: [
        { pregunta: R`Mueve $x_0$. ¿Qué número recibe $f$ como entrada: $x_0$ o $g(x_0)$?`,
          respuesta: R`Recibe $g(x_0)$. La <b>salida</b> de $g$ es la <b>entrada</b> de $f$: por eso $(f \circ g)(x) = f(g(x))$ se lee "f de g de x" y se calcula de adentro hacia afuera.` },
        { pregunta: R`Activa <b>verGoF</b>. ¿Coinciden las curvas $f \circ g$ y $g \circ f$?`,
          respuesta: R`En general <b>no</b>. Con $f(x) = 2x - 1$ y $g(x) = x^2$: $f(g(x)) = 2x^2 - 1$, pero $g(f(x)) = (2x - 1)^2$. La composición <b>no es conmutativa</b>.` },
        { pregunta: R`Busca valores de $a$ y $b$ para los que $f \circ g$ y $g \circ f$ coincidan sin importar $c$.`,
          respuesta: R`$a = 1$ y $b = 0$, es decir $f(x) = x$ (la función identidad). Componer con la identidad no cambia nada: $f \circ g = g \circ f = g$.` }
      ]
    },

    teoria: R`
      <div class="caja-def">
        <p><b>Definición.</b> La composición de $f$ con $g$ es la función</p>
        $$(\verde{f \circ g})(x) = \naranja{f}\big(\azul{g(x)}\big)$$
        <p>Primero se aplica $\azul{g}$ a $x$ y luego se aplica $\naranja{f}$ al resultado: $\;x \xrightarrow{\;g\;} g(x) \xrightarrow{\;f\;} f(g(x))$.</p>
      </div>
      <h3>Cómo calcularla</h3>
      <p>En la expresión de $f$, reemplaza <b>cada</b> $x$ por la expresión completa de $g(x)$ (entre paréntesis) y simplifica.</p>
      <h3>Dominio de la compuesta</h3>
      <div class="caja-def">
        $$\text{Dom}(f \circ g) = \{\, x \in \text{Dom}(g) \;:\; g(x) \in \text{Dom}(f) \,\}$$
        <p>Es decir: $x$ debe poder entrar en $g$, y lo que sale de $g$ debe poder entrar en $f$.</p>
      </div>
      <h3>Propiedades</h3>
      <div class="tabla-wrap"><table>
        <tr><th>Propiedad</th><th>Enunciado</th></tr>
        <tr><td>No conmutativa</td><td>En general $f \circ g \ne g \circ f$</td></tr>
        <tr><td>Asociativa</td><td>$f \circ (g \circ h) = (f \circ g) \circ h$</td></tr>
        <tr><td>Identidad</td><td>Si $I(x) = x$: $\;f \circ I = I \circ f = f$</td></tr>
      </table></div>
      <h3>Descomponer una función</h3>
      <p>Identifica la operación "de adentro" ($g$) y la "de afuera" ($f$). Ejemplo: $h(x) = \sqrt{3x + 1} = f(g(x))$ con $g(x) = 3x + 1$ y $f(x) = \sqrt{x}$.</p>`,

    ejemplos: [
      { titulo: 'Calcular f∘g y g∘f',
        enunciado: R`<p>Sean $f(x) = x^2 - 3$ y $g(x) = 2x + 1$. Calcula $(f \circ g)(x)$, $(g \circ f)(x)$ y $(f \circ g)(1)$.</p>`,
        pasos: [
          R`$(f \circ g)(x) = f(2x + 1) = (2x + 1)^2 - 3 = 4x^2 + 4x + 1 - 3 = 4x^2 + 4x - 2$.`,
          R`$(g \circ f)(x) = g(x^2 - 3) = 2(x^2 - 3) + 1 = 2x^2 - 5$.`,
          R`Son distintas: la composición no es conmutativa.`,
          R`$(f \circ g)(1)$: primero $g(1) = 3$, luego $f(3) = 9 - 3 = 6$. (Con la fórmula: $4 + 4 - 2 = 6$ ✓)`
        ] },
      { titulo: 'Dominio de una compuesta',
        enunciado: R`<p>Sean $f(x) = \dfrac{1}{x - 2}$ y $g(x) = \sqrt{x}$. Halla $(f \circ g)(x)$ y su dominio.</p>`,
        pasos: [
          R`$(f \circ g)(x) = f(\sqrt{x}) = \dfrac{1}{\sqrt{x} - 2}$.`,
          R`$x$ debe estar en el dominio de $g$: $x \ge 0$.`,
          R`$g(x)$ debe estar en el dominio de $f$: $\sqrt{x} \ne 2 \Rightarrow x \ne 4$.`,
          R`$\text{Dom}(f \circ g) = [0,\, 4) \cup (4,\, \infty)$.`
        ] }
    ],

    practica: [
      { nivel: 'Básico',
        enunciado: R`<p>Sean $f(x) = 3x - 2$ y $g(x) = x^2 + 1$. Calcula $(f \circ g)(2)$ y $(g \circ f)(2)$.</p>`,
        campos: [
          { etiqueta: R`$(f \circ g)(2)$`, respuesta: 13 },
          { etiqueta: R`$(g \circ f)(2)$`, respuesta: 17 }
        ],
        pista: R`Trabaja de adentro hacia afuera: para $(f \circ g)(2)$ calcula primero $g(2)$.`,
        solucion: R`$g(2) = 5 \Rightarrow f(5) = 13$. $\;f(2) = 4 \Rightarrow g(4) = 17$.` },
      { nivel: 'Básico',
        enunciado: R`<p>Sean $f(x) = x + 5$ y $g(x) = x^2$. Escribe $(g \circ f)(x)$ en la forma $x^2 + Bx + C$.</p>`,
        campos: [
          { etiqueta: R`$B$`, respuesta: 10 },
          { etiqueta: R`$C$`, respuesta: 25 }
        ],
        pista: R`$(g \circ f)(x) = g(x + 5)$: eleva al cuadrado <b>todo</b> el binomio.`,
        solucion: R`$(g \circ f)(x) = (x + 5)^2 = x^2 + 10x + 25$. (En cambio $(f \circ g)(x) = x^2 + 5$.)` },
      { nivel: 'Intermedio',
        enunciado: R`<p>Sean $f(x) = \sqrt{x}$ y $g(x) = 6 - 2x$. Halla el dominio de $(f \circ g)(x)$.</p>`,
        campos: [
          { etiqueta: 'El dominio es', tipo: 'opcion', opciones: ['x ≤ 3', 'x ≥ 3', 'todos los reales', 'x ≥ 0'], respuesta: 'x ≤ 3' },
          { etiqueta: R`$(f \circ g)(1)$`, respuesta: 2 }
        ],
        pista: R`$(f \circ g)(x) = \sqrt{6 - 2x}$. Lo que está dentro de la raíz debe ser $\ge 0$.`,
        solucion: R`$6 - 2x \ge 0 \Rightarrow x \le 3$. Dominio $(-\infty,\, 3]$. $\;(f \circ g)(1) = \sqrt{4} = 2$.` },
      { nivel: 'Aplicación',
        enunciado: R`<p>Una tienda aplica un descuento del 20 %, $d(p) = 0.8p$, y luego cobra el IVA del 15 %, $i(p) = 1.15p$. El precio final es $(i \circ d)(p) = k\,p$. Halla $k$ y el precio final de un artículo de 50 dólares. ¿Cambia el resultado si primero se cobra el IVA?</p>`,
        campos: [
          { etiqueta: R`$k$`, respuesta: 0.92 },
          { etiqueta: 'Precio final (dólares)', respuesta: 46 },
          { etiqueta: '¿Cambia con el orden inverso?', tipo: 'opcion', opciones: ['Sí', 'No'], respuesta: 'No' }
        ],
        pista: R`$(i \circ d)(p) = i(0.8p) = 1.15(0.8p)$.`,
        solucion: R`$k = 1.15 \cdot 0.8 = 0.92$; precio final $0.92 \cdot 50 = 46$ dólares. Aquí el orden no importa porque ambas funciones solo multiplican: $(d \circ i)(p) = 0.8(1.15p) = 0.92p$. ¡Es un caso especial! Si el descuento fuera fijo (por ejemplo, 5 dólares menos), el orden sí cambiaría el precio.` }
    ],

    quiz: [
      { pregunta: R`Si $f(x) = x^2$ y $g(x) = x + 3$, entonces $(f \circ g)(x)$ es:`,
        opciones: [R`$(x + 3)^2$`, R`$x^2 + 3$`, R`$x^2 + 6$`, R`$2x + 3$`], correcta: 0,
        retro: [
          R`$f(g(x)) = f(x + 3) = (x + 3)^2$.`,
          R`Eso es $(g \circ f)(x) = g(x^2)$: aplicaste las funciones en el orden contrario.`,
          R`Se eleva al cuadrado todo $g(x)$; no se suman constantes.`,
          R`Componer no es sumar ni derivar: reemplaza $x$ por $g(x)$ dentro de $f$.`
        ] },
      { pregunta: R`$(f \circ g)(x)$ significa:`,
        opciones: ['Aplicar primero g y luego f', 'Aplicar primero f y luego g', 'Multiplicar f(x)·g(x)', 'Sumar f(x) + g(x)'], correcta: 0,
        retro: [
          R`Se lee de derecha a izquierda: $f(g(x))$, primero $g$.`,
          R`Eso sería $(g \circ f)(x) = g(f(x))$.`,
          R`El producto se escribe $(f \cdot g)(x)$, no $f \circ g$.`,
          R`La suma se escribe $(f + g)(x)$.`
        ] },
      { pregunta: R`Si $f(x) = 2x$ y $g(x) = x - 1$, ¿cuánto vale $(g \circ f)(4)$?`,
        opciones: ['7', '6', '8', '3'], correcta: 0,
        retro: [
          R`$f(4) = 8$ y luego $g(8) = 7$.`,
          R`$6 = (f \circ g)(4) = f(3)$: invertiste el orden.`,
          R`$8 = f(4)$; falta aplicar $g$.`,
          R`$3 = g(4)$; falta aplicar $f$ primero.`
        ] },
      { pregunta: R`$h(x) = \sqrt{x^2 + 1}$ se puede escribir como $f(g(x))$ con:`,
        opciones: [R`$f(x) = \sqrt{x},\; g(x) = x^2 + 1$`, R`$f(x) = x^2 + 1,\; g(x) = \sqrt{x}$`, R`$f(x) = x^2,\; g(x) = \sqrt{x + 1}$`, R`$f(x) = \sqrt{x} + 1,\; g(x) = x^2$`], correcta: 0,
        retro: [
          R`La operación de adentro es $x^2 + 1$ ($g$) y la de afuera es la raíz ($f$).`,
          R`Ese orden da $f(g(x)) = (\sqrt{x})^2 + 1 = x + 1$.`,
          R`Da $f(g(x)) = (\sqrt{x + 1})^2 = x + 1$.`,
          R`Da $f(g(x)) = \sqrt{x^2} + 1 = |x| + 1$.`
        ] },
      { pregunta: R`Si $f(x) = \dfrac{1}{x}$ y $g(x) = x - 3$, el dominio de $f \circ g$ es:`,
        opciones: ['x ≠ 3', 'x ≠ 0', 'Todos los reales', 'x > 3'], correcta: 0,
        retro: [
          R`$(f \circ g)(x) = \dfrac{1}{x - 3}$: solo se excluye $x = 3$.`,
          R`$x = 0$ sí funciona: $f(g(0)) = f(-3) = -\tfrac13$.`,
          R`En $x = 3$ se divide entre cero.`,
          R`No hay raíz: los valores menores que 3 también sirven.`
        ] }
    ],

    ficha: R`
      <div class="tabla-wrap"><table>
        <tr><th>Concepto</th><th>Resumen</th></tr>
        <tr><td>Definición</td><td>$(f \circ g)(x) = f(g(x))$ — primero $g$, luego $f$</td></tr>
        <tr><td>Cálculo</td><td>Reemplazar cada $x$ de $f$ por $(g(x))$ y simplificar</td></tr>
        <tr><td>Evaluar</td><td>De adentro hacia afuera: $g(x_0)$ y luego $f$ de ese valor</td></tr>
        <tr><td>Dominio</td><td>$x \in \text{Dom}(g)$ y $g(x) \in \text{Dom}(f)$</td></tr>
        <tr><td>Orden</td><td>En general $f \circ g \ne g \circ f$ (no conmutativa)</td></tr>
        <tr><td>Asociativa</td><td>$f \circ (g \circ h) = (f \circ g) \circ h$</td></tr>
        <tr><td>Descomponer</td><td>$g$ = operación de adentro; $f$ = operación de afuera</td></tr>
      </table></div>`,

    reto: {
      enunciado: R`<p>Ajusta $a$, $b$ y $c$ para que, al mismo tiempo, $\verde{f \circ g}$ coincida con la curva gris $h(x) = -x^2 + 3$ y $\morado{g \circ f}$ coincida con la curva rosa $k(x) = (x - 2)^2 - 1$.</p>`,
      applet: {
        vista: [-5, 7, -6, 7],
        comandos: [
          'a = Slider(-3, 3, 0.5)',
          'SetValue(a, 1)',
          'b = Slider(-4, 4, 0.5)',
          'SetValue(b, 0)',
          'c = Slider(-4, 4, 0.5)',
          'SetValue(c, 1)',
          'f(x) = a*x + b',
          'g(x) = x^2 + c',
          'fog(x) = f(g(x))',
          'gof(x) = g(f(x))',
          'hObj(x) = -x^2 + 3',
          'kObj(x) = (x - 2)^2 - 1'
        ],
        estilos: {
          f: { oculto: true }, g: { oculto: true },
          fog: { color: 'verde', grosor: 7 },
          gof: { color: 'morado', grosor: 7 },
          hObj: { color: 'gris', grosor: 4, trazo: 2 },
          kObj: { color: '#E879A6', grosor: 4, trazo: 2 }
        },
        leyenda: [
          { color: 'verde', texto: 'Tu f∘g' }, { color: 'gris', texto: 'Objetivo h(x)' },
          { color: 'morado', texto: 'Tu g∘f' }, { color: '#E879A6', texto: 'Objetivo k(x)' }
        ],
        lecturas: function (api) {
          const a = api.getValue('a'), b = api.getValue('b'), c = api.getValue('c');
          return [
            { t: 'f(x)', v: GA.fmt(a) + 'x ' + GA.sgn(b) },
            { t: 'g(x)', v: 'x² ' + GA.sgn(c) },
            { t: '(f∘g)(x)', v: GA.fmt(a) + 'x² ' + GA.sgn(a * c + b), color: 'verde' }
          ];
        }
      },
      comprobar: function (api) {
        const a = api.getValue('a'), b = api.getValue('b'), c = api.getValue('c');
        const fog = x => a * (x * x + c) + b, gof = x => Math.pow(a * x + b, 2) + c;
        const h = x => -x * x + 3, k = x => (x - 2) * (x - 2) - 1;
        const xs = [-2, -1, 0, 1, 2, 3];
        const msj = [];
        if (xs.some(x => Math.abs(fog(x) - h(x)) > 1e-6)) msj.push('f∘g todavía no coincide con h(x) = −x² + 3.');
        if (xs.some(x => Math.abs(gof(x) - k(x)) > 1e-6)) msj.push('g∘f todavía no coincide con k(x) = (x − 2)² − 1.');
        return msj.length ? { ok: false, mensajes: msj } : { ok: true, mensajes: ['f(x) = −x + 2 y g(x) = x² − 1.'] };
      },
      solucion: R`$(g \circ f)(x) = (ax + b)^2 + c$ debe ser $(x - 2)^2 - 1$, así que $c = -1$ y $ax + b = \pm(x - 2)$. Con $a = 1, b = -2$: $(f \circ g)(x) = x^2 - 3$ ✗. Con $a = -1, b = 2$: $(f \circ g)(x) = -(x^2 - 1) + 2 = -x^2 + 3$ ✓. Solución: $a = -1$, $b = 2$, $c = -1$.`
    }
  };
})();
