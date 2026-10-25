/* Taller: FUNCIONES INVERSAS — contenido. */
(function () {
  const R = String.raw;
  const GA = window.GA;

  window.TALLER = {
    id: 'inversa',
    subtitulo: 'Función inyectiva, prueba de la recta horizontal, cálculo de f⁻¹, verificación, simetría con y = x e intercambio de dominio y rango.',

    objetivos: [
      'Reconocer funciones inyectivas con la prueba de la recta horizontal.',
      'Calcular algebraicamente la inversa f⁻¹ y verificar que f(f⁻¹(x)) = x.',
      'Relacionar las gráficas de f y f⁻¹ por simetría con y = x e intercambiar dominio y rango.'
    ],

    previos: [
      { pregunta: R`Si despejas $x$ en $y = 3x - 6$, obtienes:`,
        opciones: ['x = (y + 6)/3', 'x = 3y + 6', 'x = (y − 6)/3', 'x = y/3 − 6'], correcta: 0,
        explicacion: R`$y + 6 = 3x \Rightarrow x = \dfrac{y + 6}{3}$. Despejar es "deshacer" las operaciones en orden inverso.` },
      { pregunta: R`El punto simétrico de $(2,\, 5)$ respecto a la recta $y = x$ es:`,
        opciones: ['(5, 2)', '(−2, −5)', '(2, −5)', '(−5, −2)'], correcta: 0,
        explicacion: R`Reflejar en $y = x$ intercambia las coordenadas: $(a, b) \to (b, a)$.` }
    ],

    exploracion: {
      intro: R`Mueve $m$ y $n$ de la recta $\naranja{f(x) = mx + n}$ y observa su inversa $\morado{f^{-1}}$. Arrastra el punto $P$ sobre $f$: su reflejo $P'$ cae sobre $f^{-1}$. Luego activa <b>verCuadratica</b> y mueve $q$ para hacer la prueba de la recta horizontal con $g(x) = x^2 - 2$.`,
      applet: {
        vista: [-7, 7, -6, 7],
        comandos: [
          'm = Slider(-3, 3, 0.5)',
          'SetValue(m, 2)',
          'n = Slider(-6, 6, 0.5)',
          'SetValue(n, 1)',
          'f(x) = m*x + n',
          'finv(x) = (x - n) / m',
          'id: y = x',
          'P = Point(f)',
          'Pp = (y(P), x(P))',
          'sim = Segment(P, Pp)',
          'verCuadratica = false',
          'q = Slider(-4, 6, 0.5)',
          'SetValue(q, 2)',
          'g(x) = x^2 - 2',
          'ginv(x) = If(x >= -2, sqrt(x + 2))',
          'hq: y = q',
          'SetConditionToShowObject(g, verCuadratica)',
          'SetConditionToShowObject(ginv, verCuadratica)',
          'SetConditionToShowObject(hq, verCuadratica)'
        ],
        estilos: {
          f: { color: 'naranja', grosor: 7 },
          finv: { color: 'morado', grosor: 7 },
          id: { color: 'gris', grosor: 3, trazo: 2, etiqueta: 'y = x' },
          P: { color: 'naranja', tamano: 6, etiqueta: 'P' },
          Pp: { color: 'morado', tamano: 6, etiqueta: "P'" },
          sim: { color: 'gris', grosor: 2, trazo: 1 },
          g: { color: 'azul', grosor: 6 },
          ginv: { color: 'verde', grosor: 6, trazo: 1 },
          hq: { color: 'rojo', grosor: 4 }
        },
        auxiliares: ['Pp'],
        leyenda: [
          { color: 'naranja', texto: 'f(x) = mx + n' },
          { color: 'morado', texto: 'f⁻¹(x)' },
          { color: 'gris', texto: 'Recta y = x (espejo)' },
          { color: 'azul', texto: 'g(x) = x² − 2' },
          { color: 'verde', texto: 'Inversa de g con x ≥ 0' },
          { color: 'rojo', texto: 'Recta horizontal y = q' }
        ],
        lecturas: function (api) {
          const m = api.getValue('m'), n = api.getValue('n'), q = api.getValue('q');
          const px = api.getXcoord('P'), py = api.getYcoord('P');
          const cortes = q > -2 + 1e-9 ? 2 : Math.abs(q + 2) < 1e-9 ? 1 : 0;
          const filas = [
            { t: 'f(x)', v: GA.fmt(m) + 'x ' + GA.sgn(n), color: 'naranja' },
            { t: 'f⁻¹(x)', v: Math.abs(m) < 1e-9 ? 'no existe (f constante)' : '(x ' + GA.sgn(-n) + ') / ' + GA.fmt(m), color: 'morado' },
            { t: 'P en f', v: GA.punto(px, py), color: 'naranja' },
            { t: "P' en f⁻¹", v: GA.punto(py, px), color: 'morado' }
          ];
          if (api.getValue('verCuadratica')) {
            filas.push({ t: 'y = q corta a g en', v: cortes + (cortes === 1 ? ' punto' : ' puntos') + (cortes === 2 ? ' → g NO es inyectiva en ℝ' : ''), color: 'rojo', ancho: true });
          }
          return filas;
        }
      },
      preguntas: [
        { pregunta: R`Arrastra $P$. ¿Qué relación hay entre las coordenadas de $P$ y de $P'$? ¿Dónde está el "espejo"?`,
          respuesta: R`Las coordenadas se <b>intercambian</b>: si $P = (a, b)$, entonces $P' = (b, a)$. Son simétricos respecto a la recta $y = x$.` },
        { pregunta: R`Pon $m = 0$. ¿Existe la inversa? ¿Por qué?`,
          respuesta: R`No. $f(x) = n$ es constante: la recta horizontal $y = n$ la corta en infinitos puntos, así que no es inyectiva y no se puede "deshacer".` },
        { pregunta: R`Activa <b>verCuadratica</b> y mueve $q$. ¿Por qué $g(x) = x^2 - 2$ no tiene inversa en todo $\mathbb{R}$? ¿Cómo se soluciona?`,
          respuesta: R`Para $q > -2$ la recta horizontal corta a $g$ en dos puntos (por ejemplo $g(-2) = g(2) = 2$). Si se <b>restringe el dominio</b> a $x \ge 0$, sí es inyectiva y su inversa es $g^{-1}(x) = \sqrt{x + 2}$ (curva verde).` }
      ]
    },

    teoria: R`
      <div class="caja-def">
        <p><b>Función inyectiva.</b> $f$ es inyectiva (uno a uno) si valores distintos de $x$ dan valores distintos de $y$: $\;f(x_1) = f(x_2) \Rightarrow x_1 = x_2$.</p>
        <p><b>Prueba de la recta horizontal:</b> $f$ es inyectiva si ninguna recta horizontal corta su gráfica más de una vez.</p>
      </div>
      <div class="caja-def">
        <p><b>Función inversa.</b> Si $f$ es inyectiva, su inversa $\morado{f^{-1}}$ "deshace" lo que hace $f$:</p>
        $$f\big(f^{-1}(x)\big) = x \qquad \text{y} \qquad f^{-1}\big(f(x)\big) = x$$
      </div>
      <div class="caja-aviso"><b>¡Cuidado!</b> $f^{-1}(x)$ <b>no</b> significa $\dfrac{1}{f(x)}$. El $-1$ indica función inversa, no exponente.</div>
      <h3>Cómo calcular $f^{-1}$</h3>
      <ol>
        <li>Escribe $y = f(x)$.</li>
        <li>Intercambia $x$ y $y$.</li>
        <li>Despeja $y$: esa es $f^{-1}(x)$.</li>
        <li>Verifica que $f(f^{-1}(x)) = x$.</li>
      </ol>
      <h3>Propiedades</h3>
      <div class="tabla-wrap"><table>
        <tr><th>Propiedad</th><th>Enunciado</th></tr>
        <tr><td>Dominio y rango</td><td>$\text{Dom}(f^{-1}) = \text{Rango}(f)$ y $\text{Rango}(f^{-1}) = \text{Dom}(f)$</td></tr>
        <tr><td>Puntos</td><td>Si $(a, b)$ está en $f$, entonces $(b, a)$ está en $f^{-1}$</td></tr>
        <tr><td>Gráfica</td><td>Simétrica a la de $f$ respecto a la recta $y = x$</td></tr>
        <tr><td>Restricción</td><td>Si $f$ no es inyectiva, se restringe su dominio (ej. $x^2$ con $x \ge 0$)</td></tr>
      </table></div>`,

    ejemplos: [
      { titulo: 'Inversa de una función lineal',
        enunciado: R`<p>Halla la inversa de $f(x) = \dfrac{2x - 3}{5}$ y verifícala.</p>`,
        pasos: [
          R`$y = \dfrac{2x - 3}{5}$. Intercambia: $x = \dfrac{2y - 3}{5}$.`,
          R`Despeja: $5x = 2y - 3 \Rightarrow 2y = 5x + 3 \Rightarrow y = \dfrac{5x + 3}{2}$.`,
          R`$f^{-1}(x) = \dfrac{5x + 3}{2}$.`,
          R`Verificación: $f(f^{-1}(x)) = \dfrac{2 \cdot \frac{5x + 3}{2} - 3}{5} = \dfrac{5x + 3 - 3}{5} = x$. ✓`
        ] },
      { titulo: 'Inversa con dominio restringido',
        enunciado: R`<p>Halla la inversa de $f(x) = x^2 + 1$ con $x \ge 0$, e indica su dominio y rango.</p>`,
        pasos: [
          R`Con $x \ge 0$, $f$ es inyectiva. Su rango es $[1,\, \infty)$.`,
          R`$y = x^2 + 1$. Intercambia: $x = y^2 + 1 \Rightarrow y^2 = x - 1$.`,
          R`Como el rango de $f^{-1}$ es el dominio de $f$ ($y \ge 0$), tomamos la raíz positiva: $f^{-1}(x) = \sqrt{x - 1}$.`,
          R`$\text{Dom}(f^{-1}) = [1,\, \infty)$ y $\text{Rango}(f^{-1}) = [0,\, \infty)$.`
        ] }
    ],

    practica: [
      { nivel: 'Básico',
        enunciado: R`<p>Para $f(x) = 4x - 7$, calcula $f^{-1}(1)$, $f^{-1}(9)$ y la pendiente de la recta $f^{-1}$.</p>`,
        campos: [
          { etiqueta: R`$f^{-1}(1)$`, respuesta: 2 },
          { etiqueta: R`$f^{-1}(9)$`, respuesta: 4 },
          { etiqueta: R`Pendiente de $f^{-1}$`, respuesta: 0.25, ayuda: 'ej. 1/4' }
        ],
        pista: R`$f^{-1}(x) = \dfrac{x + 7}{4}$. También puedes pensar: ¿qué $x$ hace que $4x - 7 = 1$?`,
        solucion: R`$f^{-1}(x) = \dfrac{x + 7}{4} = \tfrac14 x + \tfrac74$. $f^{-1}(1) = 2$, $f^{-1}(9) = 4$, pendiente $\tfrac14$ (la recíproca de 4).` },
      { nivel: 'Intermedio',
        enunciado: R`<p>Halla la inversa de $f(x) = \dfrac{x + 1}{x - 2}$. Calcula $f^{-1}(3)$ y el valor que <b>no</b> pertenece al dominio de $f^{-1}$.</p>`,
        campos: [
          { etiqueta: R`$f^{-1}(3)$`, respuesta: 3.5 },
          { etiqueta: R`Valor excluido del dominio de $f^{-1}$`, respuesta: 1 }
        ],
        pista: R`Intercambia: $x = \dfrac{y + 1}{y - 2}$. Multiplica en cruz, agrupa los términos con $y$ y factoriza $y$.`,
        solucion: R`$x(y - 2) = y + 1 \Rightarrow xy - y = 2x + 1 \Rightarrow y = \dfrac{2x + 1}{x - 1}$. $f^{-1}(3) = \dfrac{7}{2} = 3.5$. Se excluye $x = 1$ (que es justamente el valor que $f$ nunca toma).` },
      { nivel: 'Intermedio',
        enunciado: R`<p>Para $f(x) = x^3 - 1$, halla $f^{-1}(7)$ y $f^{-1}(-9)$.</p>`,
        campos: [
          { etiqueta: R`$f^{-1}(7)$`, respuesta: 2 },
          { etiqueta: R`$f^{-1}(-9)$`, respuesta: -2 }
        ],
        pista: R`$f^{-1}(x) = \sqrt[3]{x + 1}$. La raíz cúbica de un número negativo existe.`,
        solucion: R`$f^{-1}(7) = \sqrt[3]{8} = 2$; $\;f^{-1}(-9) = \sqrt[3]{-8} = -2$. Comprobación: $f(2) = 7$ y $f(-2) = -9$. ✓` },
      { nivel: 'Aplicación',
        enunciado: R`<p>La temperatura en grados Fahrenheit se obtiene con $F(C) = 1.8C + 32$. Encuentra la función inversa $C(F)$: ¿cuál es su pendiente? ¿Cuántos grados Celsius son 98.6 °F?</p>`,
        campos: [
          { etiqueta: 'Pendiente de la inversa', respuesta: 1 / 1.8, tol: 0.002, ayuda: 'ej. 1/1.8' },
          { etiqueta: 'Grados Celsius', respuesta: 37 }
        ],
        pista: R`Despeja $C$: $C = \dfrac{F - 32}{1.8}$.`,
        solucion: R`$C(F) = \dfrac{F - 32}{1.8}$, pendiente $\dfrac{1}{1.8} \approx 0.556$. $C(98.6) = \dfrac{66.6}{1.8} = 37$ °C (temperatura corporal normal).` }
    ],

    quiz: [
      { pregunta: R`La inversa de $f(x) = 2x + 6$ es:`,
        opciones: [R`$\dfrac{x - 6}{2}$`, R`$\dfrac{1}{2x + 6}$`, R`$2x - 6$`, R`$\dfrac{x + 6}{2}$`], correcta: 0,
        retro: [
          R`$x = 2y + 6 \Rightarrow y = \dfrac{x - 6}{2}$.`,
          R`$f^{-1}$ no es el recíproco $\dfrac{1}{f(x)}$.`,
          R`Hay que deshacer también la multiplicación por 2.`,
          R`Para deshacer "$+6$" hay que restar 6.`
        ] },
      { pregunta: R`Si el punto $(3,\, -4)$ está en la gráfica de $f$, entonces en $f^{-1}$ está:`,
        opciones: ['(−4, 3)', '(3, 4)', '(−3, 4)', '(4, −3)'], correcta: 0,
        retro: [
          R`Se intercambian las coordenadas: $(a, b) \to (b, a)$.`,
          R`No se cambian signos: se intercambian las coordenadas.`,
          R`Eso es reflejar respecto al origen, no respecto a $y = x$.`,
          R`Intercambiaste, pero cambiaste los signos.`
        ] },
      { pregunta: R`¿Cuál de estas funciones <b>no</b> tiene inversa en todo $\mathbb{R}$?`,
        opciones: [R`$f(x) = x^2$`, R`$f(x) = x^3$`, R`$f(x) = 2x + 1$`, R`$f(x) = 2^x$`], correcta: 0,
        retro: [
          R`$f(-2) = f(2) = 4$: no es inyectiva (falla la prueba de la recta horizontal).`,
          R`$x^3$ es inyectiva; su inversa es $\sqrt[3]{x}$.`,
          R`Toda recta no horizontal es inyectiva.`,
          R`$2^x$ es creciente, por tanto inyectiva; su inversa es $\log_2 x$.`
        ] },
      { pregunta: R`Si $f(x) = \sqrt{x - 2}$ tiene rango $[0,\, \infty)$, el dominio de $f^{-1}$ es:`,
        opciones: ['[0, ∞)', '[2, ∞)', 'ℝ', '(−∞, 2]'], correcta: 0,
        retro: [
          R`$\text{Dom}(f^{-1}) = \text{Rango}(f) = [0, \infty)$.`,
          R`$[2, \infty)$ es el dominio de $f$, que pasa a ser el rango de $f^{-1}$.`,
          R`El dominio de la inversa es el rango de $f$.`,
          R`Revisa: se intercambian dominio y rango.`
        ] },
      { pregunta: R`La notación $f^{-1}(x)$ significa:`,
        opciones: ['La función que deshace lo que hace f', '1 / f(x)', '−f(x)', 'f(−x)'], correcta: 0,
        retro: [
          R`$f^{-1}$ cumple $f^{-1}(f(x)) = x$.`,
          R`Ese es el recíproco $[f(x)]^{-1}$, que en general es distinto.`,
          R`$-f(x)$ es la reflexión respecto al eje $x$.`,
          R`$f(-x)$ es la reflexión respecto al eje $y$.`
        ] }
    ],

    ficha: R`
      <div class="tabla-wrap"><table>
        <tr><th>Concepto</th><th>Resumen</th></tr>
        <tr><td>Inyectiva</td><td>$f(x_1) = f(x_2) \Rightarrow x_1 = x_2$ · prueba de la recta horizontal</td></tr>
        <tr><td>Inversa</td><td>$f(f^{-1}(x)) = x$ y $f^{-1}(f(x)) = x$</td></tr>
        <tr><td>Pasos</td><td>$y = f(x)$ → intercambiar $x \leftrightarrow y$ → despejar $y$ → verificar</td></tr>
        <tr><td>Dominio y rango</td><td>$\text{Dom}(f^{-1}) = \text{Rango}(f)$ · $\text{Rango}(f^{-1}) = \text{Dom}(f)$</td></tr>
        <tr><td>Gráfica</td><td>Simétrica respecto a $y = x$; $(a, b) \to (b, a)$</td></tr>
        <tr><td>Ojo</td><td>$f^{-1}(x) \ne \dfrac{1}{f(x)}$</td></tr>
        <tr><td>Restricción</td><td>Si no es inyectiva, restringir el dominio (ej. $x^2$ con $x \ge 0 \to \sqrt{x}$)</td></tr>
      </table></div>`,

    reto: {
      enunciado: R`<p>Ajusta $m$ y $n$ para que la <b>inversa</b> $\morado{f^{-1}}$ pase por los puntos huecos $(-1,\, 2)$ y $(5,\, 0)$.</p>`,
      applet: {
        vista: [-6, 8, -5, 7],
        comandos: [
          'm = Slider(-3, 3, 0.5)',
          'SetValue(m, 1)',
          'n = Slider(-6, 6, 0.5)',
          'SetValue(n, 0)',
          'f(x) = m*x + n',
          'finv(x) = (x - n) / m',
          'id: y = x',
          'A = (-1, 2)',
          'B = (5, 0)'
        ],
        estilos: {
          f: { color: 'naranja', grosor: 5 },
          finv: { color: 'morado', grosor: 7 },
          id: { color: 'gris', grosor: 3, trazo: 2 },
          A: { color: 'morado', tamano: 8, hueco: true, fijo: true, etiqueta: '(−1, 2)' },
          B: { color: 'morado', tamano: 8, hueco: true, fijo: true, etiqueta: '(5, 0)' }
        },
        leyenda: [{ color: 'naranja', texto: 'f' }, { color: 'morado', texto: 'f⁻¹ y puntos objetivo' }],
        lecturas: function (api) {
          const m = api.getValue('m'), n = api.getValue('n');
          const inv = x => (x - n) / m;
          return [
            { t: 'f(x)', v: GA.fmt(m) + 'x ' + GA.sgn(n), color: 'naranja' },
            { t: 'f⁻¹(−1)', v: Math.abs(m) < 1e-9 ? '—' : GA.fmt(inv(-1)), color: 'morado' },
            { t: 'f⁻¹(5)', v: Math.abs(m) < 1e-9 ? '—' : GA.fmt(inv(5)), color: 'morado' }
          ];
        }
      },
      comprobar: function (api) {
        const m = api.getValue('m'), n = api.getValue('n');
        if (Math.abs(m) < 1e-9) return { ok: false, mensajes: ['Con m = 0 la función no tiene inversa.'] };
        const inv = x => (x - n) / m;
        const msj = [];
        if (Math.abs(inv(-1) - 2) > 1e-6) msj.push('f⁻¹(−1) = ' + GA.fmt(inv(-1)) + '; debe ser 2.');
        if (Math.abs(inv(5)) > 1e-6) msj.push('f⁻¹(5) = ' + GA.fmt(inv(5)) + '; debe ser 0.');
        return msj.length ? { ok: false, mensajes: msj } : { ok: true, mensajes: ['f(x) = −3x + 5 y f⁻¹(x) = (x − 5)/(−3).'] };
      },
      solucion: R`Si $f^{-1}$ pasa por $(-1, 2)$ y $(5, 0)$, entonces $f$ pasa por $(2, -1)$ y $(0, 5)$. Así $n = 5$ y $m = \dfrac{5 - (-1)}{0 - 2} = -3$: $f(x) = -3x + 5$.`
    }
  };
})();
