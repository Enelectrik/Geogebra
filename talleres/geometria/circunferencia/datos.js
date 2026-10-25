/* Taller: LA CIRCUNFERENCIA — contenido. */
(function () {
  const R = String.raw;
  const GA = window.GA;

  window.TALLER = {
    id: 'circunferencia',
    subtitulo: 'Centro, radio, ecuación canónica y general, completar cuadrados, posición relativa de puntos y rectas, y recta tangente.',

    objetivos: [
      'Identificar el centro y el radio a partir de la ecuación canónica o general.',
      'Pasar de la forma general a la canónica completando cuadrados.',
      'Determinar la posición de un punto o una recta respecto a la circunferencia y hallar una recta tangente.'
    ],

    previos: [
      { pregunta: R`¿Cuál es la distancia entre $(1,\,2)$ y $(4,\,6)$?`,
        opciones: ['5', '7', '√7', '25'], correcta: 0,
        explicacion: R`$d = \sqrt{(4-1)^2 + (6-2)^2} = \sqrt{9 + 16} = \sqrt{25} = 5$.` },
      { pregunta: R`Para completar el cuadrado en $x^2 + 6x$, ¿qué número debes sumar?`,
        opciones: ['9', '6', '3', '36'], correcta: 0,
        explicacion: R`Se suma $\left(\tfrac{6}{2}\right)^2 = 9$: $\;x^2 + 6x + 9 = (x + 3)^2$.` }
    ],

    exploracion: {
      intro: R`Mueve $\rojo{h}$, $\rojo{k}$ (centro) y $\naranja{r}$ (radio). Luego mueve $n$, que controla la recta horizontal $\verde{y = n}$, y observa cuándo es secante, tangente o exterior.`,
      applet: {
        vista: [-9, 9, -7, 9],
        comandos: [
          'h = Slider(-5, 5, 0.5)',
          'SetValue(h, 1)',
          'k = Slider(-5, 5, 0.5)',
          'SetValue(k, 1)',
          'r = Slider(0.5, 6, 0.5)',
          'SetValue(r, 3)',
          'n = Slider(-8, 8, 0.5)',
          'SetValue(n, 5)',
          'C = (h, k)',
          'circ: (x - h)^2 + (y - k)^2 = r^2',
          'R = (h + r, k)',
          'radio = Segment(C, R)',
          'recta: y = n',
          'D = (h, n)',
          'sd = Segment(C, D)'
        ],
        estilos: {
          circ: { color: 'tinta', grosor: 7 },
          C: { color: 'rojo', tamano: 6, etiqueta: 'C(h, k)' },
          R: { oculto: true },
          radio: { color: 'naranja', grosor: 6, etiqueta: 'r' },
          recta: { color: 'verde', grosor: 5 },
          D: { oculto: true },
          sd: { color: 'morado', grosor: 4, trazo: 1, etiqueta: 'd' }
        },
        auxiliares: ['R', 'D'],
        leyenda: [
          { color: 'rojo', texto: 'Centro C(h, k)' },
          { color: 'naranja', texto: 'Radio r' },
          { color: 'verde', texto: 'Recta y = n' },
          { color: 'morado', texto: 'Distancia centro–recta d' }
        ],
        lecturas: function (api) {
          const h = api.getValue('h'), k = api.getValue('k'), r = api.getValue('r'), n = api.getValue('n');
          const d = Math.abs(n - k);
          const pos = Math.abs(d - r) < 1e-6 ? 'TANGENTE (d = r)' : d < r ? 'SECANTE (d < r)' : 'EXTERIOR (d > r)';
          const D = -2 * h, E = -2 * k, F = h * h + k * k - r * r;
          return [
            { t: 'Centro', v: GA.punto(h, k), color: 'rojo' },
            { t: 'Radio', v: GA.fmt(r), color: 'naranja' },
            { t: 'Canónica', v: GA.cuad('x', h) + ' + ' + GA.cuad('y', k) + ' = ' + GA.fmt(r * r), ancho: true },
            { t: 'General', v: 'x² + y² ' + GA.sgn(D) + 'x ' + GA.sgn(E) + 'y ' + GA.sgn(F) + ' = 0', ancho: true },
            { t: 'd = |n − k|', v: GA.fmt(d), color: 'morado' },
            { t: 'La recta es', v: pos, color: 'verde' }
          ];
        }
      },
      preguntas: [
        { pregunta: R`¿Qué cambia en la gráfica al mover $h$ y $k$? ¿Y al mover $r$?`,
          respuesta: R`$h$ y $k$ <b>trasladan</b> la circunferencia sin cambiar su tamaño; $r$ cambia su tamaño sin moverla.` },
        { pregunta: R`Ubica la recta $y = n$ para que sea tangente. ¿Qué relación hay entre $d = |n - k|$ y $r$?`,
          respuesta: R`Es tangente cuando $d = r$. Si $d < r$ la corta en dos puntos (secante) y si $d > r$ no la toca (exterior).` },
        { pregunta: R`Con $h = 2$, $k = -1$, $r = 3$, escribe la ecuación canónica y compárala con el panel.`,
          respuesta: R`$(x - 2)^2 + (y + 1)^2 = 9$. Ojo con los signos: el centro $(2, -1)$ aparece como $x - 2$ y $y + 1$.` }
      ]
    },

    teoria: R`
      <div class="caja-def">
        <p><b>Definición.</b> La circunferencia es el conjunto de puntos del plano que están a la misma distancia $\naranja{r}$ (radio) de un punto fijo $\rojo{C(h,k)}$ (centro).</p>
      </div>
      <h3>Ecuaciones</h3>
      <div class="tabla-wrap"><table>
        <tr><th>Forma</th><th>Ecuación</th><th>Datos</th></tr>
        <tr><td>Canónica</td><td>$(x - \rojo{h})^2 + (y - \rojo{k})^2 = \naranja{r}^2$</td><td>Centro $(h,k)$, radio $r$</td></tr>
        <tr><td>Centro en el origen</td><td>$x^2 + y^2 = \naranja{r}^2$</td><td>Centro $(0,0)$</td></tr>
        <tr><td>General</td><td>$x^2 + y^2 + Dx + Ey + F = 0$</td><td>$\rojo{h} = -\dfrac{D}{2},\;\; \rojo{k} = -\dfrac{E}{2},\;\; \naranja{r} = \sqrt{h^2 + k^2 - F}$</td></tr>
      </table></div>
      <div class="caja-aviso">En la forma general, si $h^2 + k^2 - F > 0$ es una circunferencia; si $= 0$ es un solo punto; si $< 0$ no tiene puntos reales.</div>
      <h3>Posición relativa</h3>
      <p><b>Punto $P$:</b> compara $\overline{CP}$ con $r$ → interior ($<$), sobre la circunferencia ($=$), exterior ($>$).</p>
      <p><b>Recta:</b> calcula la distancia $\morado{d}$ del centro a la recta → <b>secante</b> si $d<r$, <b class="c-verde">tangente</b> si $d=r$, <b>exterior</b> si $d>r$.</p>
      <h3>Recta tangente en un punto $P$ de la circunferencia</h3>
      <p>Es <b>perpendicular al radio</b> $CP$: si el radio tiene pendiente $m_{CP}$, la tangente tiene pendiente $-\dfrac{1}{m_{CP}}$.</p>`,

    ejemplos: [
      { titulo: 'De la forma general a la canónica',
        enunciado: R`<p>Encuentra el centro y el radio de $x^2 + y^2 - 4x + 6y - 12 = 0$.</p>`,
        pasos: [
          R`Agrupa: $(x^2 - 4x) + (y^2 + 6y) = 12$.`,
          R`Completa cuadrados sumando $4$ y $9$ en ambos lados: $(x^2 - 4x + 4) + (y^2 + 6y + 9) = 12 + 4 + 9$.`,
          R`Factoriza: $(x - 2)^2 + (y + 3)^2 = 25$.`,
          R`Centro $C(2, -3)$ y radio $r = 5$. Comprobación con fórmulas: $h = -(-4)/2 = 2$, $k = -6/2 = -3$, $r = \sqrt{4 + 9 + 12} = 5$. ✓`
        ] },
      { titulo: 'Recta tangente en un punto',
        enunciado: R`<p>Halla la recta tangente a $x^2 + y^2 = 25$ en el punto $P(3,\,4)$.</p>`,
        pasos: [
          R`El punto está sobre la circunferencia: $9 + 16 = 25$. ✓`,
          R`Pendiente del radio $CP$ (desde el origen): $m_{CP} = \dfrac{4}{3}$.`,
          R`La tangente es perpendicular: $m_t = -\dfrac{3}{4}$.`,
          R`$y - 4 = -\tfrac34(x - 3) \Rightarrow 3x + 4y - 25 = 0$. Comprobación: distancia del centro $= \dfrac{|-25|}{5} = 5 = r$. ✓`
        ] }
    ],

    practica: [
      { nivel: 'Básico',
        enunciado: R`<p>Para $(x + 1)^2 + (y - 4)^2 = 7$, indica el centro $(h, k)$ y el radio.</p>`,
        campos: [
          { etiqueta: R`$h$`, respuesta: -1 },
          { etiqueta: R`$k$`, respuesta: 4 },
          { etiqueta: R`Radio $r$`, respuesta: Math.sqrt(7), ayuda: 'ej. raiz(7)' }
        ],
        pista: R`Compara con $(x - h)^2 + (y - k)^2 = r^2$: $x + 1 = x - (-1)$. El radio es la raíz del lado derecho.`,
        solucion: R`$h = -1$, $k = 4$, $r = \sqrt7 \approx 2.65$.` },
      { nivel: 'Intermedio',
        enunciado: R`<p>Encuentra el centro y el radio de $x^2 + y^2 + 8x - 2y + 8 = 0$.</p>`,
        campos: [
          { etiqueta: R`$h$`, respuesta: -4 },
          { etiqueta: R`$k$`, respuesta: 1 },
          { etiqueta: R`Radio $r$`, respuesta: 3 }
        ],
        pista: R`Completa cuadrados: $(x^2 + 8x + 16) + (y^2 - 2y + 1) = -8 + 16 + 1$.`,
        solucion: R`$(x + 4)^2 + (y - 1)^2 = 9$. Centro $(-4, 1)$, radio $3$.` },
      { nivel: 'Intermedio',
        enunciado: R`<p>Escribe la ecuación general $x^2 + y^2 + Dx + Ey + F = 0$ de la circunferencia con centro $(3,\,-2)$ que pasa por el punto $(6,\,2)$.</p>`,
        campos: [
          { etiqueta: R`$D$`, respuesta: -6 },
          { etiqueta: R`$E$`, respuesta: 4 },
          { etiqueta: R`$F$`, respuesta: -12 }
        ],
        pista: R`Primero calcula el radio como la distancia entre el centro y el punto. Luego desarrolla la forma canónica.`,
        solucion: R`$r = \sqrt{(6-3)^2 + (2+2)^2} = \sqrt{25} = 5$. $(x - 3)^2 + (y + 2)^2 = 25 \Rightarrow x^2 - 6x + 9 + y^2 + 4y + 4 - 25 = 0 \Rightarrow x^2 + y^2 - 6x + 4y - 12 = 0$.` },
      { nivel: 'Aplicación',
        enunciado: R`<p>Una antena de telefonía está en el punto $(2,\,3)$ (en km) y tiene cobertura en un radio de 5 km. ¿A qué distancia de la antena está una casa ubicada en $(7,\,5)$? ¿Tiene cobertura?</p>`,
        campos: [
          { etiqueta: 'Distancia (km)', respuesta: Math.sqrt(29), ayuda: 'ej. 5.39' },
          { etiqueta: '¿Tiene cobertura?', tipo: 'opcion', opciones: ['Sí', 'No'], respuesta: 'No' }
        ],
        pista: 'La zona de cobertura es el interior de una circunferencia de radio 5. Compara la distancia con el radio.',
        solucion: R`$d = \sqrt{(7-2)^2 + (5-3)^2} = \sqrt{29} \approx 5.39$ km. Como $5.39 > 5$, la casa es un punto <b>exterior</b>: no tiene cobertura.` }
    ],

    quiz: [
      { pregunta: R`El centro y el radio de $(x - 5)^2 + (y + 2)^2 = 16$ son:`,
        opciones: ['C(5, −2), r = 4', 'C(−5, 2), r = 4', 'C(5, −2), r = 16', 'C(−5, 2), r = 16'], correcta: 0,
        retro: [
          R`Los signos del centro son opuestos a los de la ecuación y $r = \sqrt{16} = 4$.`,
          R`Cuidado con los signos: $(x - 5)$ indica $h = 5$ y $(y + 2)$ indica $k = -2$.`,
          R`El lado derecho es $r^2$; el radio es $\sqrt{16} = 4$.`,
          R`Hay dos errores: los signos del centro y $r$ es la raíz de 16.`
        ] },
      { pregunta: R`La circunferencia $x^2 + y^2 - 10y = 0$ tiene:`,
        opciones: ['C(0, 5), r = 5', 'C(0, −5), r = 5', 'C(0, 5), r = √10', 'C(5, 0), r = 5'], correcta: 0,
        retro: [
          R`$x^2 + (y^2 - 10y + 25) = 25 \Rightarrow x^2 + (y - 5)^2 = 25$.`,
          R`$k = -E/2 = -(-10)/2 = 5$, no $-5$.`,
          R`Al completar el cuadrado se suma $25$: el radio es $\sqrt{25} = 5$.`,
          R`El término $-10y$ afecta a $y$, así que el centro está sobre el eje $y$.`
        ] },
      { pregunta: R`El punto $(3,\,1)$ respecto a $x^2 + y^2 = 9$ es:`,
        opciones: ['Interior', 'Está sobre la circunferencia', 'Exterior', 'El centro'], correcta: 2,
        retro: [
          R`$\sqrt{9 + 1} = \sqrt{10} \approx 3.16$, que es mayor que $r = 3$.`,
          R`Para estar sobre ella necesitaría $3^2 + 1^2 = 9$, pero da $10$.`,
          R`$d = \sqrt{10} > 3$: el punto queda fuera.`,
          R`El centro es $(0, 0)$.`
        ] },
      { pregunta: R`La recta $y = 4$ y la circunferencia $(x - 1)^2 + (y - 1)^2 = 9$ son:`,
        opciones: ['Secantes', 'Tangentes', 'Exteriores', 'Coincidentes'], correcta: 1,
        retro: [
          R`Para ser secantes la distancia al centro debería ser menor que el radio.`,
          R`$d = |4 - 1| = 3 = r$: la recta toca la circunferencia en un solo punto, $(1, 4)$.`,
          R`Serían exteriores si $d > 3$, pero $d = 3$.`,
          R`Una recta nunca coincide con una circunferencia.`
        ] },
      { pregunta: R`La ecuación $x^2 + y^2 + 2x - 4y + 10 = 0$ representa:`,
        opciones: ['Una circunferencia de radio √5', 'Un solo punto', 'Ningún punto real', 'Una circunferencia de radio 10'], correcta: 2,
        retro: [
          R`$r^2 = h^2 + k^2 - F = 1 + 4 - 10 = -5$, que es negativo.`,
          R`Sería un punto si $h^2 + k^2 - F = 0$, pero da $-5$.`,
          R`$r^2 = -5 < 0$: no existe ningún punto real que cumpla la ecuación.`,
          R`$F = 10$ no es el radio; calcula $h^2 + k^2 - F$.`
        ] }
    ],

    ficha: R`
      <div class="tabla-wrap"><table>
        <tr><th>Elemento</th><th>Fórmula / criterio</th></tr>
        <tr><td>Canónica</td><td>$(x - h)^2 + (y - k)^2 = r^2$</td></tr>
        <tr><td>General</td><td>$x^2 + y^2 + Dx + Ey + F = 0$</td></tr>
        <tr><td>Centro y radio desde la general</td><td>$h = -D/2,\;\; k = -E/2,\;\; r = \sqrt{h^2 + k^2 - F}$</td></tr>
        <tr><td>Completar cuadrados</td><td>$x^2 + px = \left(x + \tfrac p2\right)^2 - \left(\tfrac p2\right)^2$</td></tr>
        <tr><td>Posición de un punto</td><td>$\overline{CP} < r$ interior · $= r$ sobre · $> r$ exterior</td></tr>
        <tr><td>Posición de una recta</td><td>$d < r$ secante · $d = r$ tangente · $d > r$ exterior</td></tr>
        <tr><td>Tangente en $P$</td><td>Perpendicular al radio $CP$: $m_t = -1/m_{CP}$</td></tr>
      </table></div>`,

    reto: {
      enunciado: R`<p>Ajusta $h$, $k$ y $r$ para obtener la circunferencia que es <b>tangente a ambos ejes</b>, tiene su <b>centro en el segundo cuadrante</b> y <b>pasa por el punto $Q(-2,\,4)$</b>.</p>`,
      applet: {
        vista: [-8, 6, -4, 8],
        comandos: [
          'h = Slider(-5, 5, 0.5)',
          'SetValue(h, 1)',
          'k = Slider(-5, 5, 0.5)',
          'SetValue(k, 1)',
          'r = Slider(0.5, 6, 0.5)',
          'SetValue(r, 1.5)',
          'C = (h, k)',
          'circ: (x - h)^2 + (y - k)^2 = r^2',
          'Q = (-2, 4)'
        ],
        estilos: {
          circ: { color: 'tinta', grosor: 7 },
          C: { color: 'rojo', tamano: 6, etiqueta: 'C' },
          Q: { color: 'azul', tamano: 7, etiqueta: 'Q(−2, 4)', fijo: true }
        },
        leyenda: [
          { color: 'rojo', texto: 'Centro' },
          { color: 'azul', texto: 'Punto Q' }
        ],
        lecturas: function (api) {
          const h = api.getValue('h'), k = api.getValue('k'), r = api.getValue('r');
          return [
            { t: 'Centro', v: GA.punto(h, k), color: 'rojo' },
            { t: 'Radio', v: GA.fmt(r) },
            { t: 'Distancia C–Q', v: GA.fmt(Math.hypot(-2 - h, 4 - k)), color: 'azul' }
          ];
        }
      },
      comprobar: function (api) {
        const h = api.getValue('h'), k = api.getValue('k'), r = api.getValue('r');
        const msj = [];
        if (!(h < 0 && k > 0)) msj.push('El centro debe estar en el segundo cuadrante (h < 0 y k > 0).');
        if (Math.abs(Math.abs(h) - r) > 1e-6) msj.push('No es tangente al eje y: para eso |h| debe ser igual a r.');
        if (Math.abs(Math.abs(k) - r) > 1e-6) msj.push('No es tangente al eje x: para eso |k| debe ser igual a r.');
        if (Math.abs((-2 - h) ** 2 + (4 - k) ** 2 - r * r) > 1e-6) msj.push('La circunferencia no pasa por Q: la distancia C–Q debe ser igual al radio.');
        return msj.length ? { ok: false, mensajes: msj } : { ok: true, mensajes: ['(x + 2)² + (y − 2)² = 4.'] };
      },
      solucion: R`Tangente a ambos ejes con centro en el II cuadrante: $C(-r,\, r)$. Pasa por $Q$: $(-2 + r)^2 + (4 - r)^2 = r^2 \Rightarrow r^2 - 12r + 20 = 0 \Rightarrow r = 2$ o $r = 10$. En el rango del applet, $r = 2$: centro $(-2, 2)$ y ecuación $(x + 2)^2 + (y - 2)^2 = 4$.`
    }
  };
})();
