/* Taller: LA RECTA — contenido. Edita textos, ejercicios y applets aquí. */
(function () {
  const R = String.raw;
  const GA = window.GA;

  window.TALLER = {
    id: 'recta',
    subtitulo: 'Pendiente, ángulo de inclinación, formas de la ecuación, paralelismo, perpendicularidad y distancia de un punto a una recta.',

    objetivos: [
      'Calcular la pendiente, el ángulo de inclinación y los interceptos de una recta.',
      'Escribir una recta en sus formas punto-pendiente, pendiente-intercepto, general y segmentaria.',
      'Reconocer rectas paralelas y perpendiculares y calcular la distancia de un punto a una recta.'
    ],

    previos: [
      { pregunta: R`Si $A(1,\,2)$ y $B(4,\,8)$, ¿cuánto vale $\dfrac{\Delta y}{\Delta x}$?`,
        opciones: ['2', '1/2', '6', '3'], correcta: 0,
        explicacion: R`$\Delta y = 8-2 = 6$ y $\Delta x = 4-1 = 3$, así que $6/3 = 2$.` },
      { pregunta: R`¿Cuánto vale $\tan 45^\circ$?`,
        opciones: ['0', '1', '√2/2', 'No existe'], correcta: 1,
        explicacion: R`En un triángulo rectángulo isósceles los catetos son iguales: $\tan 45^\circ = 1$.` }
    ],

    exploracion: {
      intro: R`Mueve los deslizadores $\naranja{m}$ y $\rojo{b}$ de la recta $y = \naranja{m}x + \rojo{b}$. Observa el triángulo de pendiente (avanza 1 en $x$ y sube $m$ en $y$) y activa <b>mostrarPerp</b> para ver la recta perpendicular.`,
      applet: {
        vista: [-8, 8, -6, 6],
        comandos: [
          'm = Slider(-5, 5, 0.1)',
          'SetValue(m, 1)',
          'b = Slider(-5, 5, 0.5)',
          'SetValue(b, 1)',
          'mostrarPerp = false',
          'L: y = m*x + b',
          'B = (0, b)',
          'A = (-b/m, 0)',
          'T2 = (1, b)',
          'T3 = (1, m + b)',
          'dx = Segment(B, T2)',
          'dy = Segment(T2, T3)',
          'perp = PerpendicularLine(B, L)',
          'SetConditionToShowObject(perp, mostrarPerp)'
        ],
        estilos: {
          L: { color: 'azul', grosor: 7 },
          B: { color: 'rojo', tamano: 6, etiqueta: '(0, b)' },
          A: { color: 'tinta', tamano: 5, etiqueta: 'Intercepto x' },
          T2: { oculto: true }, T3: { oculto: true },
          dx: { color: 'gris', grosor: 4, trazo: 1, etiqueta: 'Δx = 1' },
          dy: { color: 'naranja', grosor: 6, etiqueta: 'Δy = m' },
          perp: { color: 'verde', grosor: 5, trazo: 1 }
        },
        auxiliares: ['T2', 'T3'],
        leyenda: [
          { color: 'azul', texto: 'Recta y = mx + b' },
          { color: 'naranja', texto: 'Pendiente m (Δy)' },
          { color: 'rojo', texto: 'Intercepto b en el eje y' },
          { color: 'verde', texto: 'Recta perpendicular' }
        ],
        lecturas: function (api) {
          const m = api.getValue('m'), b = api.getValue('b');
          const horizontal = Math.abs(m) < 1e-9;
          let th = Math.atan(m) * 180 / Math.PI;
          if (th < 0) th += 180;
          return [
            { t: 'Ecuación', v: 'y = ' + GA.fmt(m) + 'x ' + GA.sgn(b), color: 'azul' },
            { t: 'Pendiente m', v: GA.fmt(m), color: 'naranja' },
            { t: 'Ángulo θ', v: GA.fmt(th) + '°', color: 'morado' },
            { t: 'Intercepto y', v: GA.punto(0, b), color: 'rojo' },
            { t: 'Intercepto x', v: horizontal ? (Math.abs(b) < 1e-9 ? 'toda la recta' : 'no existe') : GA.punto(-b / m, 0) },
            { t: 'Pendiente ⊥', v: horizontal ? 'no definida (vertical)' : GA.fmt(-1 / m), color: 'verde' },
            { t: 'm · m⊥', v: horizontal ? '—' : '−1' }
          ];
        }
      },
      preguntas: [
        { pregunta: R`Lleva $m$ a $0$. ¿Cómo queda la recta y cuánto vale el ángulo $\theta$?`,
          respuesta: R`La recta es horizontal ($y = b$) y $\theta = 0^\circ$. Una recta vertical ($x = k$) tendría pendiente <b>no definida</b> y $\theta = 90^\circ$.` },
        { pregunta: R`Con $m$ negativa, ¿la recta sube o baja al recorrerla de izquierda a derecha? ¿Entre qué valores queda $\theta$?`,
          respuesta: R`Baja (es decreciente) y $90^\circ < \theta < 180^\circ$. Con $m>0$ sube y $0^\circ < \theta < 90^\circ$.` },
        { pregunta: R`Activa <b>mostrarPerp</b> y pon $m = 2$. ¿Qué pendiente tiene la perpendicular? Multiplica ambas pendientes.`,
          respuesta: R`La perpendicular tiene $m_\perp = -\tfrac{1}{2}$ y $2 \cdot \left(-\tfrac12\right) = -1$. Siempre $m_1 \cdot m_2 = -1$ para rectas perpendiculares (no verticales).` }
      ]
    },

    teoria: R`
      <h3>Pendiente y ángulo de inclinación</h3>
      <div class="caja-def">
        <p>Para dos puntos $P_1(x_1, y_1)$ y $P_2(x_2, y_2)$ con $x_1 \neq x_2$:</p>
        $$\naranja{m} = \frac{y_2 - y_1}{x_2 - x_1} = \tan \theta, \qquad 0^\circ \le \theta < 180^\circ$$
        <p>$m>0$: creciente · $m<0$: decreciente · $m=0$: horizontal · vertical ($x = k$): pendiente no definida.</p>
      </div>
      <h3>Formas de la ecuación</h3>
      <div class="tabla-wrap"><table>
        <tr><th>Forma</th><th>Ecuación</th><th>Qué muestra</th></tr>
        <tr><td>Punto-pendiente</td><td>$y - y_1 = \naranja{m}(x - x_1)$</td><td>Un punto y la pendiente</td></tr>
        <tr><td>Pendiente-intercepto</td><td>$y = \naranja{m}x + \rojo{b}$</td><td>Pendiente e intercepto con el eje $y$</td></tr>
        <tr><td>General</td><td>$Ax + By + C = 0$</td><td>$\naranja{m} = -\dfrac{A}{B}$, $\;\rojo{b} = -\dfrac{C}{B}$</td></tr>
        <tr><td>Segmentaria</td><td>$\dfrac{x}{a} + \dfrac{y}{\rojo{b}} = 1$</td><td>Interceptos $(a, 0)$ y $(0, b)$</td></tr>
      </table></div>
      <h3>Posición relativa de dos rectas</h3>
      <p><b>Paralelas:</b> $m_1 = m_2$. &nbsp; <b class="c-verde">Perpendiculares:</b> $m_1 \cdot m_2 = -1$, es decir $m_2 = -\dfrac{1}{m_1}$.</p>
      <h3>Distancia de un punto a una recta</h3>
      <div class="caja-def">
        <p>Distancia de $P(x_0, y_0)$ a la recta $Ax + By + C = 0$:</p>
        $$d = \frac{|Ax_0 + By_0 + C|}{\sqrt{A^2 + B^2}}$$
      </div>`,

    ejemplos: [
      { titulo: 'Recta que pasa por dos puntos',
        enunciado: R`<p>Halla la pendiente, el ángulo de inclinación y las cuatro formas de la ecuación de la recta que pasa por $A(2,\,1)$ y $B(5,\,7)$.</p>`,
        pasos: [
          R`Pendiente: $m = \dfrac{7-1}{5-2} = \dfrac{6}{3} = 2$. Ángulo: $\theta = \arctan 2 \approx 63.43^\circ$.`,
          R`Punto-pendiente (con $A$): $y - 1 = 2(x - 2)$.`,
          R`Pendiente-intercepto: $y = 2x - 4 + 1 \Rightarrow y = 2x - 3$ (intercepto $b = -3$).`,
          R`General: $2x - y - 3 = 0$.`,
          R`Intercepto en $x$: $0 = 2x - 3 \Rightarrow x = \tfrac32$. Segmentaria: $\dfrac{x}{3/2} + \dfrac{y}{-3} = 1$.`
        ] },
      { titulo: 'Distancia y recta perpendicular',
        enunciado: R`<p>Calcula la distancia de $P(1,\,4)$ a la recta $3x + 4y - 9 = 0$ y la ecuación de la perpendicular a ella que pasa por $P$.</p>`,
        pasos: [
          R`$d = \dfrac{|3(1) + 4(4) - 9|}{\sqrt{3^2 + 4^2}} = \dfrac{|10|}{5} = 2$.`,
          R`Pendiente de la recta dada: $m = -\dfrac{A}{B} = -\dfrac34$.`,
          R`Pendiente perpendicular: $m_\perp = \dfrac43$ (porque $-\tfrac34 \cdot \tfrac43 = -1$).`,
          R`Ecuación: $y - 4 = \tfrac43(x - 1) \Rightarrow 4x - 3y + 8 = 0$.`
        ] }
    ],

    practica: [
      { nivel: 'Básico',
        enunciado: R`<p>Calcula la pendiente y el ángulo de inclinación de la recta que pasa por $(-1,\,3)$ y $(3,\,-5)$.</p>`,
        campos: [
          { etiqueta: R`Pendiente $m$`, respuesta: -2 },
          { etiqueta: R`Ángulo $\theta$ (grados)`, respuesta: 116.565, tol: 0.06, ayuda: 'ej. 116.57' }
        ],
        pista: R`Si $m<0$, el ángulo está entre $90^\circ$ y $180^\circ$: $\theta = 180^\circ + \arctan(m)$.`,
        solucion: R`$m = \dfrac{-5-3}{3-(-1)} = \dfrac{-8}{4} = -2$. $\;\arctan(-2) \approx -63.43^\circ$, así que $\theta = 180^\circ - 63.43^\circ \approx 116.57^\circ$.` },
      { nivel: 'Básico',
        enunciado: R`<p>Para la recta $4x - 2y + 6 = 0$, encuentra la pendiente, el intercepto con el eje $y$ y el intercepto con el eje $x$.</p>`,
        campos: [
          { etiqueta: R`Pendiente $m$`, respuesta: 2 },
          { etiqueta: R`Intercepto $b$ (eje $y$)`, respuesta: 3 },
          { etiqueta: R`Intercepto $a$ (eje $x$)`, respuesta: -1.5 }
        ],
        pista: R`Despeja $y$: deja la ecuación en la forma $y = mx + b$. Para el intercepto en $x$ haz $y = 0$.`,
        solucion: R`$-2y = -4x - 6 \Rightarrow y = 2x + 3$. Así $m = 2$, $b = 3$. Con $y = 0$: $4x + 6 = 0 \Rightarrow x = -\tfrac32$.` },
      { nivel: 'Intermedio',
        enunciado: R`<p>Halla la recta perpendicular a $y = 3x - 1$ que pasa por el punto $(3,\,2)$. Exprésala como $y = mx + b$.</p>`,
        campos: [
          { etiqueta: R`Pendiente $m$`, respuesta: -1 / 3 },
          { etiqueta: R`Intercepto $b$`, respuesta: 3 }
        ],
        pista: R`La pendiente perpendicular es $-\dfrac{1}{3}$. Sustituye el punto en $y = mx + b$ para hallar $b$.`,
        solucion: R`$m_\perp = -\tfrac13$. $\;2 = -\tfrac13(3) + b \Rightarrow 2 = -1 + b \Rightarrow b = 3$. Recta: $y = -\tfrac13 x + 3$.` },
      { nivel: 'Aplicación',
        enunciado: R`<p>Un taxi cobra 1.50 dólares de arranque más 0.40 dólares por cada kilómetro recorrido. Modela el costo $y$ en función de los kilómetros $x$ como una recta $y = mx + b$ y calcula cuánto cuesta un viaje de 12 km.</p>`,
        campos: [
          { etiqueta: R`Pendiente $m$`, respuesta: 0.4 },
          { etiqueta: R`Intercepto $b$`, respuesta: 1.5 },
          { etiqueta: 'Costo de 12 km (dólares)', respuesta: 6.3 }
        ],
        pista: 'La pendiente es lo que aumenta el costo por cada kilómetro; el intercepto es lo que pagas con 0 km.',
        solucion: R`$y = 0.40x + 1.50$. Para $x = 12$: $y = 0.40(12) + 1.50 = 4.80 + 1.50 = 6.30$ dólares.` }
    ],

    quiz: [
      { pregunta: R`La pendiente de la recta $6x + 3y - 9 = 0$ es:`,
        opciones: ['−2', '2', '−1/2', '3'], correcta: 0,
        retro: [
          R`$m = -A/B = -6/3 = -2$.`,
          R`Olvidaste el signo: $m = -\dfrac{A}{B}$, no $\dfrac{A}{B}$.`,
          R`Invertiste la fracción: es $-A/B$, no $-B/A$.`,
          R`$3$ es el intercepto $b = -C/B = 9/3$, no la pendiente.`
        ] },
      { pregunta: R`Las rectas $y = \tfrac23 x + 1$ y $y = -\tfrac32 x + 4$ son:`,
        opciones: ['Paralelas', 'Perpendiculares', 'Coincidentes', 'Ni paralelas ni perpendiculares'], correcta: 1,
        retro: [
          R`Para ser paralelas las pendientes deberían ser iguales y no lo son.`,
          R`$\tfrac23 \cdot \left(-\tfrac32\right) = -1$, por lo tanto son perpendiculares.`,
          R`Coincidentes tendrían la misma pendiente y el mismo intercepto.`,
          R`Revisa el producto de pendientes: da exactamente $-1$.`
        ] },
      { pregunta: R`La distancia del origen a la recta $5x + 12y - 26 = 0$ es:`,
        opciones: ['2', '26', '26/17', '1/2'], correcta: 0,
        retro: [
          R`$d = \dfrac{|0 + 0 - 26|}{\sqrt{25 + 144}} = \dfrac{26}{13} = 2$.`,
          R`Falta dividir entre $\sqrt{A^2 + B^2} = 13$.`,
          R`El denominador es $\sqrt{A^2 + B^2}$, no $A + B$.`,
          R`Invertiste la fracción: es $\dfrac{|C|}{\sqrt{A^2+B^2}}$.`
        ] },
      { pregunta: R`La forma segmentaria de la recta que corta los ejes en $(4,\,0)$ y $(0,\,-2)$ es:`,
        opciones: [R`$\dfrac{x}{4} - \dfrac{y}{2} = 1$`, R`$\dfrac{x}{4} + \dfrac{y}{2} = 1$`, R`$4x - 2y = 1$`, R`$\dfrac{x}{-2} + \dfrac{y}{4} = 1$`], correcta: 0,
        retro: [
          R`Con $a = 4$ y $b = -2$: $\dfrac{x}{4} + \dfrac{y}{-2} = 1$, que es lo mismo.`,
          R`Esa recta corta el eje $y$ en $(0, 2)$, no en $(0,-2)$.`,
          R`En la forma segmentaria los interceptos van en los denominadores.`,
          R`Intercambiaste los interceptos: $a$ (eje $x$) va bajo la $x$.`
        ] },
      { pregunta: R`Una recta con ángulo de inclinación $135^\circ$ tiene pendiente:`,
        opciones: ['1', '−1', '0', 'No definida'], correcta: 1,
        retro: [
          R`$\tan 135^\circ = -1$; una pendiente $1$ corresponde a $45^\circ$.`,
          R`$m = \tan 135^\circ = -1$: la recta es decreciente.`,
          R`Pendiente $0$ corresponde a $\theta = 0^\circ$ (horizontal).`,
          R`La pendiente no está definida solo para $\theta = 90^\circ$ (recta vertical).`
        ] }
    ],

    ficha: R`
      <div class="tabla-wrap"><table>
        <tr><th>Elemento</th><th>Fórmula / criterio</th></tr>
        <tr><td>Pendiente</td><td>$m = \dfrac{y_2 - y_1}{x_2 - x_1} = \tan\theta$</td></tr>
        <tr><td>Punto-pendiente</td><td>$y - y_1 = m(x - x_1)$</td></tr>
        <tr><td>Pendiente-intercepto</td><td>$y = mx + b$</td></tr>
        <tr><td>General</td><td>$Ax + By + C = 0,\;\; m = -A/B,\;\; b = -C/B$</td></tr>
        <tr><td>Segmentaria</td><td>$\dfrac{x}{a} + \dfrac{y}{b} = 1$</td></tr>
        <tr><td>Paralelas / perpendiculares</td><td>$m_1 = m_2$ &nbsp;/&nbsp; $m_1 m_2 = -1$</td></tr>
        <tr><td>Distancia punto–recta</td><td>$d = \dfrac{|Ax_0 + By_0 + C|}{\sqrt{A^2 + B^2}}$</td></tr>
        <tr><td>Rectas especiales</td><td>Horizontal $y = k$ ($m = 0$) · Vertical $x = k$ ($m$ no definida)</td></tr>
      </table></div>`,

    reto: {
      enunciado: R`<p>Ajusta $m$ y $b$ para que la recta azul <b>pase por el punto $P(-2,\,1)$</b> y sea <b>perpendicular a la recta verde</b> $2x - y + 4 = 0$.</p>`,
      applet: {
        vista: [-7, 7, -5, 6],
        comandos: [
          'm = Slider(-3, 3, 0.1)',
          'SetValue(m, 1)',
          'b = Slider(-4, 4, 0.5)',
          'SetValue(b, 2)',
          'L: y = m*x + b',
          'G: 2x - y + 4 = 0',
          'P = (-2, 1)'
        ],
        estilos: {
          L: { color: 'azul', grosor: 7 },
          G: { color: 'verde', grosor: 6, etiqueta: '2x − y + 4 = 0' },
          P: { color: 'rojo', tamano: 7, etiqueta: 'P(−2, 1)', fijo: true }
        },
        leyenda: [
          { color: 'azul', texto: 'Tu recta y = mx + b' },
          { color: 'verde', texto: 'Recta dada' },
          { color: 'rojo', texto: 'Punto P' }
        ],
        lecturas: function (api) {
          const m = api.getValue('m'), b = api.getValue('b');
          return [
            { t: 'Tu recta', v: 'y = ' + GA.fmt(m) + 'x ' + GA.sgn(b), color: 'azul' },
            { t: 'm · 2', v: GA.fmt(2 * m) },
            { t: 'y en x = −2', v: GA.fmt(-2 * m + b) }
          ];
        }
      },
      comprobar: function (api) {
        const m = api.getValue('m'), b = api.getValue('b');
        const msj = [];
        if (Math.abs(2 * m + 1) > 0.02) msj.push('Aún no es perpendicular: m · 2 = ' + GA.fmt(2 * m) + ' y debería ser −1.');
        if (Math.abs(-2 * m + b - 1) > 0.02) msj.push('La recta no pasa por P: con x = −2 obtienes y = ' + GA.fmt(-2 * m + b) + ', y necesitas y = 1.');
        return msj.length ? { ok: false, mensajes: msj } : { ok: true, mensajes: ['Tu recta es y = −0.5x, perpendicular a la verde y pasa por P.'] };
      },
      solucion: R`La recta dada tiene $m = 2$, así que la perpendicular tiene $m = -\tfrac12$. Pasa por $(-2, 1)$: $1 = -\tfrac12(-2) + b \Rightarrow b = 0$. Por lo tanto $m = -0.5$ y $b = 0$.`
    }
  };
})();
