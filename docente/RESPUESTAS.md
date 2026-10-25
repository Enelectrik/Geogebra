# Banco de respuestas para el docente

> Este archivo **no está enlazado** desde el sitio. Se genera a partir de los `datos.js` de cada taller.
> Si GitHub Pages está activo, sigue siendo accesible por URL directa: si no quieres que los estudiantes lo encuentren,
> quítalo del repositorio público y guárdalo aparte.


---

# Geometría analítica

## Taller 1. La recta

### Conocimientos previos

1. Si $A(1,\,2)$ y $B(4,\,8)$, ¿cuánto vale $\dfrac{\Delta y}{\Delta x}$? → **2**
2. ¿Cuánto vale $\tan 45^\circ$? → **1**

### Preguntas guía (exploración)

1. Lleva $m$ a $0$. ¿Cómo queda la recta y cuánto vale el ángulo $\theta$?
   - La recta es horizontal ($y = b$) y $\theta = 0^\circ$. Una recta vertical ($x = k$) tendría pendiente no definida y $\theta = 90^\circ$.
2. Con $m$ negativa, ¿la recta sube o baja al recorrerla de izquierda a derecha? ¿Entre qué valores queda $\theta$?
   - Baja (es decreciente) y $90^\circ < \theta < 180^\circ$. Con $m>0$ sube y $0^\circ < \theta < 90^\circ$.
3. Activa mostrarPerp y pon $m = 2$. ¿Qué pendiente tiene la perpendicular? Multiplica ambas pendientes.
   - La perpendicular tiene $m_\perp = -\tfrac{1}{2}$ y $2 \cdot \left(-\tfrac12\right) = -1$. Siempre $m_1 \cdot m_2 = -1$ para rectas perpendiculares (no verticales).

### Práctica autónoma

**1. (Básico)** Calcula la pendiente y el ángulo de inclinación de la recta que pasa por $(-1,\,3)$ y $(3,\,-5)$.

- Pendiente $m$: **-2**
- Ángulo $\theta$ (grados): **116.565** (tolerancia ±0.06)

*Solución:* $m = \dfrac{-5-3}{3-(-1)} = \dfrac{-8}{4} = -2$. $\;\arctan(-2) \approx -63.43^\circ$, así que $\theta = 180^\circ - 63.43^\circ \approx 116.57^\circ$.

**2. (Básico)** Para la recta $4x - 2y + 6 = 0$, encuentra la pendiente, el intercepto con el eje $y$ y el intercepto con el eje $x$.

- Pendiente $m$: **2**
- Intercepto $b$ (eje $y$): **3**
- Intercepto $a$ (eje $x$): **-1.5**

*Solución:* $-2y = -4x - 6 \Rightarrow y = 2x + 3$. Así $m = 2$, $b = 3$. Con $y = 0$: $4x + 6 = 0 \Rightarrow x = -\tfrac32$.

**3. (Intermedio)** Halla la recta perpendicular a $y = 3x - 1$ que pasa por el punto $(3,\,2)$. Exprésala como $y = mx + b$.

- Pendiente $m$: **-0.3333**
- Intercepto $b$: **3**

*Solución:* $m_\perp = -\tfrac13$. $\;2 = -\tfrac13(3) + b \Rightarrow 2 = -1 + b \Rightarrow b = 3$. Recta: $y = -\tfrac13 x + 3$.

**4. (Aplicación)** Un taxi cobra 1.50 dólares de arranque más 0.40 dólares por cada kilómetro recorrido. Modela el costo $y$ en función de los kilómetros $x$ como una recta $y = mx + b$ y calcula cuánto cuesta un viaje de 12 km.

- Pendiente $m$: **0.4**
- Intercepto $b$: **1.5**
- Costo de 12 km (dólares): **6.3**

*Solución:* $y = 0.40x + 1.50$. Para $x = 12$: $y = 0.40(12) + 1.50 = 4.80 + 1.50 = 6.30$ dólares.

### Autoevaluación

| # | Respuesta correcta |
|---|---|
| 1 | −2 |
| 2 | Perpendiculares |
| 3 | 2 |
| 4 | $\dfrac{x}{4} - \dfrac{y}{2} = 1$ |
| 5 | −1 |

### Reto GeoGebra

La recta dada tiene $m = 2$, así que la perpendicular tiene $m = -\tfrac12$. Pasa por $(-2, 1)$: $1 = -\tfrac12(-2) + b \Rightarrow b = 0$. Por lo tanto $m = -0.5$ y $b = 0$.

## Taller 2. La circunferencia

### Conocimientos previos

1. ¿Cuál es la distancia entre $(1,\,2)$ y $(4,\,6)$? → **5**
2. Para completar el cuadrado en $x^2 + 6x$, ¿qué número debes sumar? → **9**

### Preguntas guía (exploración)

1. ¿Qué cambia en la gráfica al mover $h$ y $k$? ¿Y al mover $r$?
   - $h$ y $k$ trasladan la circunferencia sin cambiar su tamaño; $r$ cambia su tamaño sin moverla.
2. Ubica la recta $y = n$ para que sea tangente. ¿Qué relación hay entre $d = |n - k|$ y $r$?
   - Es tangente cuando $d = r$. Si $d < r$ la corta en dos puntos (secante) y si $d > r$ no la toca (exterior).
3. Con $h = 2$, $k = -1$, $r = 3$, escribe la ecuación canónica y compárala con el panel.
   - $(x - 2)^2 + (y + 1)^2 = 9$. Ojo con los signos: el centro $(2, -1)$ aparece como $x - 2$ y $y + 1$.

### Práctica autónoma

**1. (Básico)** Para $(x + 1)^2 + (y - 4)^2 = 7$, indica el centro $(h, k)$ y el radio.

- $h$: **-1**
- $k$: **4**
- Radio $r$: **2.6458**

*Solución:* $h = -1$, $k = 4$, $r = \sqrt7 \approx 2.65$.

**2. (Intermedio)** Encuentra el centro y el radio de $x^2 + y^2 + 8x - 2y + 8 = 0$.

- $h$: **-4**
- $k$: **1**
- Radio $r$: **3**

*Solución:* $(x + 4)^2 + (y - 1)^2 = 9$. Centro $(-4, 1)$, radio $3$.

**3. (Intermedio)** Escribe la ecuación general $x^2 + y^2 + Dx + Ey + F = 0$ de la circunferencia con centro $(3,\,-2)$ que pasa por el punto $(6,\,2)$.

- $D$: **-6**
- $E$: **4**
- $F$: **-12**

*Solución:* $r = \sqrt{(6-3)^2 + (2+2)^2} = \sqrt{25} = 5$. $(x - 3)^2 + (y + 2)^2 = 25 \Rightarrow x^2 - 6x + 9 + y^2 + 4y + 4 - 25 = 0 \Rightarrow x^2 + y^2 - 6x + 4y - 12 = 0$.

**4. (Aplicación)** Una antena de telefonía está en el punto $(2,\,3)$ (en km) y tiene cobertura en un radio de 5 km. ¿A qué distancia de la antena está una casa ubicada en $(7,\,5)$? ¿Tiene cobertura?

- Distancia (km): **5.3852**
- ¿Tiene cobertura?: **No**

*Solución:* $d = \sqrt{(7-2)^2 + (5-3)^2} = \sqrt{29} \approx 5.39$ km. Como $5.39 > 5$, la casa es un punto exterior: no tiene cobertura.

### Autoevaluación

| # | Respuesta correcta |
|---|---|
| 1 | C(5, −2), r = 4 |
| 2 | C(0, 5), r = 5 |
| 3 | Exterior |
| 4 | Tangentes |
| 5 | Ningún punto real |

### Reto GeoGebra

Tangente a ambos ejes con centro en el II cuadrante: $C(-r,\, r)$. Pasa por $Q$: $(-2 + r)^2 + (4 - r)^2 = r^2 \Rightarrow r^2 - 12r + 20 = 0 \Rightarrow r = 2$ o $r = 10$. En el rango del applet, $r = 2$: centro $(-2, 2)$ y ecuación $(x + 2)^2 + (y - 2)^2 = 4$.

## Taller 3. La parábola

### Conocimientos previos

1. ¿Cómo es la gráfica de $y = x^2$? → **Una parábola que abre hacia arriba con vértice en el origen**
2. Al desarrollar $(x - 3)^2$ se obtiene: → **x² − 6x + 9**

### Preguntas guía (exploración)

1. Arrastra $P$ sobre la parábola. ¿Qué observas en las distancias de $P$ al foco y de $P$ a la directriz?
   - Son siempre iguales. Esa es la definición de parábola: puntos que equidistan del foco y de la directriz.
2. Cambia el signo de $p$ con vertical activado y luego desactivado. ¿Hacia dónde abre en cada caso?
   - Vertical: $p > 0$ arriba, $p < 0$ abajo. Horizontal: $p > 0$ derecha, $p < 0$ izquierda. El foco siempre queda "dentro" de la parábola.
3. ¿Qué le pasa a la abertura cuando $|p|$ aumenta? ¿Cuánto mide el lado recto?
   - La parábola se abre más y el foco se aleja del vértice. El lado recto mide $|4p|$.

### Práctica autónoma

**1. (Básico)** Para $(x + 3)^2 = 12(y - 1)$, encuentra el foco, la directriz y el lado recto.

- Foco: coordenada $x$: **-3**
- Foco: coordenada $y$: **4**
- Directriz: $y =$: **-2**
- Lado recto: **12**

*Solución:* $p = 3$, $V(-3, 1)$. Foco $(-3,\, 4)$, directriz $y = 1 - 3 = -2$, lado recto $12$.

**2. (Básico)** Una parábola tiene vértice en $(0,\,0)$ y foco en $(0,\,-2)$. Su ecuación es $x^2 = 4p\,y$. ¿Cuánto vale $4p$? ¿Hacia dónde abre?

- $4p$: **-8**
- Abre hacia: **abajo**

*Solución:* $p = -2$, entonces $x^2 = -8y$. Abre hacia abajo.

**3. (Intermedio)** Lleva a forma canónica $y^2 - 6y - 4x + 17 = 0$ y halla el vértice, $p$ y la coordenada $x$ del foco.

- Vértice: $h$: **2**
- Vértice: $k$: **3**
- $p$: **1**
- Foco: coordenada $x$: **3**

*Solución:* $y^2 - 6y + 9 = 4x - 8 \Rightarrow (y - 3)^2 = 4(x - 2)$. $V(2, 3)$, $4p = 4 \Rightarrow p = 1$, foco $(3, 3)$, directriz $x = 1$.

**4. (Aplicación)** Una antena parabólica mide 1.2 m de diámetro y 0.15 m de profundidad. Si su vértice está en el origen y abre hacia arriba ($x^2 = 4py$), ¿a qué distancia del vértice debe ubicarse el receptor (en el foco)?

- $p$ (metros): **0.6**

*Solución:* $(0.6)^2 = 4p(0.15) \Rightarrow 0.36 = 0.6p \Rightarrow p = 0.6$ m. El receptor va a 60 cm del vértice.

### Autoevaluación

| # | Respuesta correcta |
|---|---|
| 1 | (4, 0) |
| 2 | y = 3 |
| 3 | 6 |
| 4 | $(y + 1)^2 = -8(x - 2)$ |
| 5 | Equidistan de un foco y una directriz |

### Reto GeoGebra

El vértice está en el punto medio entre el foco y la directriz: $V(1,\, 1)$. La distancia vértice–foco es $p = 2$ y la parábola es vertical (abre hacia arriba): $(x - 1)^2 = 8(y - 1)$. Valores: $h = 1$, $k = 1$, $p = 2$, vertical activado.

## Taller 4. La elipse

### Conocimientos previos

1. Si $a^2 = 25$ y $b^2 = 9$, ¿cuánto vale $\sqrt{a^2 - b^2}$? → **4**
2. En la circunferencia $\dfrac{x^2}{9} + \dfrac{y^2}{9} = 1$, ¿cuál es el radio? → **3**

### Preguntas guía (exploración)

1. Arrastra $P$ por toda la elipse. ¿Qué le pasa a $PF_1 + PF_2$?
   - Se mantiene constante e igual a $2a$, la longitud del eje mayor. Esa es la definición de elipse.
2. Haz que sx y sy sean iguales. ¿Qué figura obtienes? ¿Dónde quedan los focos y cuánto vale $e$?
   - Obtienes una circunferencia: $c = 0$, ambos focos coinciden con el centro y $e = 0$.
3. Aumenta la diferencia entre los semiejes. ¿Qué pasa con la excentricidad?
   - $e$ crece y se acerca a $1$: la elipse se vuelve más alargada. Siempre $0 \le e < 1$.

### Práctica autónoma

**1. (Básico)** Para $\dfrac{(x - 1)^2}{16} + \dfrac{(y + 2)^2}{7} = 1$, encuentra $c$, la coordenada $x$ del foco de la derecha y la excentricidad.

- $c$: **3**
- Foco derecho: $x$: **4**
- Excentricidad $e$: **0.75**

*Solución:* $c = \sqrt{16 - 7} = 3$. Focos $(1 \pm 3,\, -2)$: el derecho es $(4, -2)$. $e = \tfrac34 = 0.75$.

**2. (Básico)** Una elipse tiene centro en el origen, vértices en $(0,\,\pm 10)$ y focos en $(0,\,\pm 6)$. Escribe su ecuación como $\dfrac{x^2}{\square} + \dfrac{y^2}{\square} = 1$.

- Denominador de $x^2$: **64**
- Denominador de $y^2$: **100**

*Solución:* $b^2 = 100 - 36 = 64$. Como el eje mayor es vertical: $\dfrac{x^2}{64} + \dfrac{y^2}{100} = 1$.

**3. (Intermedio)** Lleva a forma canónica $16x^2 + 9y^2 + 64x - 18y - 71 = 0$ y halla el centro y los semiejes.

- $h$: **-2**
- $k$: **1**
- $a$ (semieje mayor): **4**
- $b$ (semieje menor): **3**

*Solución:* $16(x + 2)^2 + 9(y - 1)^2 = 71 + 64 + 9 = 144 \Rightarrow \dfrac{(x + 2)^2}{9} + \dfrac{(y - 1)^2}{16} = 1$. Centro $(-2, 1)$, $a = 4$ (vertical), $b = 3$.

**4. (Aplicación)** La entrada de un túnel tiene forma de semielipse de 10 m de ancho y 4 m de altura máxima. ¿Qué altura tiene el túnel a 3 m del centro?

- Altura (m): **3.2**

*Solución:* $\dfrac{9}{25} + \dfrac{y^2}{16} = 1 \Rightarrow y^2 = 16 \cdot \dfrac{16}{25} \Rightarrow y = \dfrac{16}{5} = 3.2$ m.

### Autoevaluación

| # | Respuesta correcta |
|---|---|
| 1 | Vertical, con a = 5 |
| 2 | (±8, 0) |
| 3 | 0.6 |
| 4 | 6.4 |
| 5 | Una circunferencia |

### Reto GeoGebra

Centro: punto medio de los focos, $(1,\,-1)$. $2c = 6 \Rightarrow c = 3$. Eje menor $2b = 8 \Rightarrow b = 4$. $a = \sqrt{16 + 9} = 5$, eje vertical: $\dfrac{(x-1)^2}{16} + \dfrac{(y+1)^2}{25} = 1$. Valores: $h = 1$, $k = -1$, sx $= 4$, sy $= 5$.

## Taller 5. La hipérbola

### Conocimientos previos

1. Si $a = 4$ y $b = 3$, ¿cuánto vale $\sqrt{a^2 + b^2}$? → **5**
2. ¿Qué diferencia hay entre $\dfrac{x^2}{9} + \dfrac{y^2}{4} = 1$ y $\dfrac{x^2}{9} - \dfrac{y^2}{4} = 1$? → **La primera es una elipse y la segunda una hipérbola**

### Preguntas guía (exploración)

1. Arrastra $P$ por ambas ramas. ¿Qué se mantiene constante?
   - La diferencia de distancias a los focos: $|PF_1 - PF_2| = 2a$. Esa es la definición de hipérbola.
2. Observa el rectángulo auxiliar. ¿Qué relación tienen sus diagonales con la hipérbola?
   - Las diagonales, prolongadas, son las asíntotas: la hipérbola se acerca cada vez más a ellas sin tocarlas.
3. Haz $a = b$. ¿Qué pendiente tienen las asíntotas y cuánto vale $e$?
   - Pendientes $\pm 1$ (son perpendiculares) y $e = \sqrt2 \approx 1.414$. Se llama hipérbola equilátera.

### Práctica autónoma

**1. (Básico)** Para $\dfrac{x^2}{9} - \dfrac{y^2}{16} = 1$, calcula $c$, la excentricidad y la pendiente positiva de las asíntotas.

- $c$: **5**
- Excentricidad $e$: **1.6667**
- Pendiente positiva de la asíntota: **1.3333**

*Solución:* $c = \sqrt{9 + 16} = 5$; $e = 5/3 \approx 1.67$; asíntotas $y = \pm \tfrac43 x$.

**2. (Intermedio)** Para $\dfrac{(y + 1)^2}{25} - \dfrac{(x - 2)^2}{144} = 1$, halla $c$, la coordenada $y$ del foco superior y el lado recto.

- $c$: **13**
- Foco superior: $y$: **12**
- Lado recto: **57.6**

*Solución:* $c = \sqrt{25 + 144} = 13$. Focos $(2,\, -1 \pm 13)$: el superior es $(2, 12)$. Lado recto $= \dfrac{2(144)}{5} = 57.6$.

**3. (Intermedio)** Una hipérbola con centro en el origen tiene vértices en $(\pm 3,\, 0)$ y asíntotas $y = \pm 2x$. Escribe su ecuación como $\dfrac{x^2}{a^2} - \dfrac{y^2}{b^2} = 1$.

- $a^2$: **9**
- $b^2$: **36**

*Solución:* $b = 2a = 6$, así que $\dfrac{x^2}{9} - \dfrac{y^2}{36} = 1$.

**4. (Aplicación)** Dos estaciones de radio están en $(-5,\,0)$ y $(5,\,0)$ (km). Un barco recibe sus señales y calcula que está 6 km más cerca de una que de la otra. El barco está sobre la hipérbola $\dfrac{x^2}{a^2} - \dfrac{y^2}{b^2} = 1$. Halla $a$ y $b^2$.

- $a$: **3**
- $b^2$: **16**

*Solución:* $a = 3$, $c = 5$, $b^2 = 25 - 9 = 16$: $\dfrac{x^2}{9} - \dfrac{y^2}{16} = 1$. Así funcionaban los sistemas de navegación LORAN.

### Autoevaluación

| # | Respuesta correcta |
|---|---|
| 1 | $y = \pm \tfrac52 x$ |
| 2 | (0, ±5) |
| 3 | Mayor que 1 |
| 4 | 12 |
| 5 | Hipérbola horizontal con a = 3, b = 2 |

### Reto GeoGebra

Centro: punto medio de los vértices, $(1,\, 1)$. $2a = 6 \Rightarrow a = 3$, eje horizontal. Pendiente $\dfrac{b}{a} = \dfrac23 \Rightarrow b = 2$. Ecuación $\dfrac{(x-1)^2}{9} - \dfrac{(y-1)^2}{4} = 1$. Valores: $h = 1$, $k = 1$, $a = 3$, $b = 2$, vertical desactivado.

---

# Gráfica de funciones

## Taller 1. Composición de funciones

### Conocimientos previos

1. Si $f(x) = 2x + 1$, ¿cuánto vale $f(3)$? → **7**
2. Si $f(x) = x^2$, ¿a qué es igual $f(a + 1)$? → **a² + 2a + 1**

### Preguntas guía (exploración)

1. Mueve $x_0$. ¿Qué número recibe $f$ como entrada: $x_0$ o $g(x_0)$?
   - Recibe $g(x_0)$. La salida de $g$ es la entrada de $f$: por eso $(f \circ g)(x) = f(g(x))$ se lee "f de g de x" y se calcula de adentro hacia afuera.
2. Activa verGoF. ¿Coinciden las curvas $f \circ g$ y $g \circ f$?
   - En general no. Con $f(x) = 2x - 1$ y $g(x) = x^2$: $f(g(x)) = 2x^2 - 1$, pero $g(f(x)) = (2x - 1)^2$. La composición no es conmutativa.
3. Busca valores de $a$ y $b$ para los que $f \circ g$ y $g \circ f$ coincidan sin importar $c$.
   - $a = 1$ y $b = 0$, es decir $f(x) = x$ (la función identidad). Componer con la identidad no cambia nada: $f \circ g = g \circ f = g$.

### Práctica autónoma

**1. (Básico)** Sean $f(x) = 3x - 2$ y $g(x) = x^2 + 1$. Calcula $(f \circ g)(2)$ y $(g \circ f)(2)$.

- $(f \circ g)(2)$: **13**
- $(g \circ f)(2)$: **17**

*Solución:* $g(2) = 5 \Rightarrow f(5) = 13$. $\;f(2) = 4 \Rightarrow g(4) = 17$.

**2. (Básico)** Sean $f(x) = x + 5$ y $g(x) = x^2$. Escribe $(g \circ f)(x)$ en la forma $x^2 + Bx + C$.

- $B$: **10**
- $C$: **25**

*Solución:* $(g \circ f)(x) = (x + 5)^2 = x^2 + 10x + 25$. (En cambio $(f \circ g)(x) = x^2 + 5$.)

**3. (Intermedio)** Sean $f(x) = \sqrt{x}$ y $g(x) = 6 - 2x$. Halla el dominio de $(f \circ g)(x)$.

- El dominio es: **x ≤ 3**
- $(f \circ g)(1)$: **2**

*Solución:* $6 - 2x \ge 0 \Rightarrow x \le 3$. Dominio $(-\infty,\, 3]$. $\;(f \circ g)(1) = \sqrt{4} = 2$.

**4. (Aplicación)** Una tienda aplica un descuento del 20 %, $d(p) = 0.8p$, y luego cobra el IVA del 15 %, $i(p) = 1.15p$. El precio final es $(i \circ d)(p) = k\,p$. Halla $k$ y el precio final de un artículo de 50 dólares. ¿Cambia el resultado si primero se cobra el IVA?

- $k$: **0.92**
- Precio final (dólares): **46**
- ¿Cambia con el orden inverso?: **No**

*Solución:* $k = 1.15 \cdot 0.8 = 0.92$; precio final $0.92 \cdot 50 = 46$ dólares. Aquí el orden no importa porque ambas funciones solo multiplican: $(d \circ i)(p) = 0.8(1.15p) = 0.92p$. ¡Es un caso especial! Si el descuento fuera fijo (por ejemplo, 5 dólares menos), el orden sí cambiaría el precio.

### Autoevaluación

| # | Respuesta correcta |
|---|---|
| 1 | $(x + 3)^2$ |
| 2 | Aplicar primero g y luego f |
| 3 | 7 |
| 4 | $f(x) = \sqrt{x},\; g(x) = x^2 + 1$ |
| 5 | x ≠ 3 |

### Reto GeoGebra

$(g \circ f)(x) = (ax + b)^2 + c$ debe ser $(x - 2)^2 - 1$, así que $c = -1$ y $ax + b = \pm(x - 2)$. Con $a = 1, b = -2$: $(f \circ g)(x) = x^2 - 3$ ✗. Con $a = -1, b = 2$: $(f \circ g)(x) = -(x^2 - 1) + 2 = -x^2 + 3$ ✓. Solución: $a = -1$, $b = 2$, $c = -1$.

## Taller 2. Funciones cuadráticas

### Conocimientos previos

1. Al factorizar $x^2 - 5x + 6$ se obtiene: → **(x − 2)(x − 3)**
2. Si $f(x) = x^2 - 4$, ¿cuánto vale $f(-2)$? → **0**

### Preguntas guía (exploración)

1. ¿Qué efecto tiene el signo de $a$? ¿Y su valor absoluto?
   - $a > 0$: abre hacia arriba y el vértice es un mínimo; $a < 0$: abre hacia abajo y el vértice es un máximo. Cuanto mayor es $|a|$, más cerrada (estrecha) es la parábola.
2. Mueve $c$ hasta que la parábola toque el eje $x$ en un solo punto. ¿Cuánto vale $\Delta$?
   - $\Delta = 0$: hay una raíz doble y el vértice está sobre el eje $x$.
3. Si $\Delta < 0$, ¿cuántas raíces reales hay? ¿Qué se ve en la gráfica?
   - Ninguna: la parábola no corta al eje $x$ (queda toda por encima o toda por debajo).

### Práctica autónoma

**1. (Básico)** Para $f(x) = x^2 + 6x + 5$, halla el vértice y las raíces.

- Vértice: $h$: **-3**
- Vértice: $k$: **-4**
- Raíz menor: **-5**
- Raíz mayor: **-1**

*Solución:* $h = -3$, $k = 9 - 18 + 5 = -4$. $f(x) = (x + 1)(x + 5)$: raíces $-5$ y $-1$.

**2. (Básico)** Para $f(x) = 2x^2 - 4x + 7$, calcula el discriminante, el valor mínimo de la función y cuántas raíces reales tiene.

- $\Delta$: **-40**
- Valor mínimo: **5**
- Raíces reales: **Ninguna**

*Solución:* $\Delta = 16 - 56 = -40 < 0$: ninguna raíz real. $h = 1$, $k = 2 - 4 + 7 = 5$: mínimo $5$.

**3. (Intermedio)** Una función cuadrática tiene vértice en $(1,\, -8)$ y pasa por el punto $(3,\, 0)$. Escríbela en forma general $ax^2 + bx + c$.

- $a$: **2**
- $b$: **-4**
- $c$: **-6**

*Solución:* $0 = a(2)^2 - 8 \Rightarrow a = 2$. $f(x) = 2(x - 1)^2 - 8 = 2x^2 - 4x + 2 - 8 = 2x^2 - 4x - 6$.

**4. (Aplicación)** Se lanza una pelota hacia arriba y su altura (en metros) es $h(t) = -5t^2 + 20t + 1.5$, con $t$ en segundos. ¿En qué instante alcanza la altura máxima y cuál es esa altura?

- Tiempo $t$ (s): **2**
- Altura máxima (m): **21.5**

*Solución:* $t = -\dfrac{20}{2(-5)} = 2$ s. $h(2) = -20 + 40 + 1.5 = 21.5$ m.

### Autoevaluación

| # | Respuesta correcta |
|---|---|
| 1 | (3, −5) |
| 2 | Abre hacia abajo y tiene un máximo |
| 3 | No tiene raíces reales |
| 4 | (−∞, 4] |
| 5 | $(x - 2)(x + 3)$ |

### Reto GeoGebra

Las raíces son $-1$ y $3$, así que $f(x) = a(x + 1)(x - 3)$. Con $C$: $-4 = a(2)(-2) \Rightarrow a = 1$. $f(x) = x^2 - 2x - 3$: $a = 1$, $b = -2$, $c = -3$. (Observa que $C$ es el vértice.)

## Taller 3. Funciones inversas

### Conocimientos previos

1. Si despejas $x$ en $y = 3x - 6$, obtienes: → **x = (y + 6)/3**
2. El punto simétrico de $(2,\, 5)$ respecto a la recta $y = x$ es: → **(5, 2)**

### Preguntas guía (exploración)

1. Arrastra $P$. ¿Qué relación hay entre las coordenadas de $P$ y de $P'$? ¿Dónde está el "espejo"?
   - Las coordenadas se intercambian: si $P = (a, b)$, entonces $P' = (b, a)$. Son simétricos respecto a la recta $y = x$.
2. Pon $m = 0$. ¿Existe la inversa? ¿Por qué?
   - No. $f(x) = n$ es constante: la recta horizontal $y = n$ la corta en infinitos puntos, así que no es inyectiva y no se puede "deshacer".
3. Activa verCuadratica y mueve $q$. ¿Por qué $g(x) = x^2 - 2$ no tiene inversa en todo $\mathbb{R}$? ¿Cómo se soluciona?
   - Para $q > -2$ la recta horizontal corta a $g$ en dos puntos (por ejemplo $g(-2) = g(2) = 2$). Si se restringe el dominio a $x \ge 0$, sí es inyectiva y su inversa es $g^{-1}(x) = \sqrt{x + 2}$ (curva verde).

### Práctica autónoma

**1. (Básico)** Para $f(x) = 4x - 7$, calcula $f^{-1}(1)$, $f^{-1}(9)$ y la pendiente de la recta $f^{-1}$.

- $f^{-1}(1)$: **2**
- $f^{-1}(9)$: **4**
- Pendiente de $f^{-1}$: **0.25**

*Solución:* $f^{-1}(x) = \dfrac{x + 7}{4} = \tfrac14 x + \tfrac74$. $f^{-1}(1) = 2$, $f^{-1}(9) = 4$, pendiente $\tfrac14$ (la recíproca de 4).

**2. (Intermedio)** Halla la inversa de $f(x) = \dfrac{x + 1}{x - 2}$. Calcula $f^{-1}(3)$ y el valor que no pertenece al dominio de $f^{-1}$.

- $f^{-1}(3)$: **3.5**
- Valor excluido del dominio de $f^{-1}$: **1**

*Solución:* $x(y - 2) = y + 1 \Rightarrow xy - y = 2x + 1 \Rightarrow y = \dfrac{2x + 1}{x - 1}$. $f^{-1}(3) = \dfrac{7}{2} = 3.5$. Se excluye $x = 1$ (que es justamente el valor que $f$ nunca toma).

**3. (Intermedio)** Para $f(x) = x^3 - 1$, halla $f^{-1}(7)$ y $f^{-1}(-9)$.

- $f^{-1}(7)$: **2**
- $f^{-1}(-9)$: **-2**

*Solución:* $f^{-1}(7) = \sqrt[3]{8} = 2$; $\;f^{-1}(-9) = \sqrt[3]{-8} = -2$. Comprobación: $f(2) = 7$ y $f(-2) = -9$. ✓

**4. (Aplicación)** La temperatura en grados Fahrenheit se obtiene con $F(C) = 1.8C + 32$. Encuentra la función inversa $C(F)$: ¿cuál es su pendiente? ¿Cuántos grados Celsius son 98.6 °F?

- Pendiente de la inversa: **0.5556** (tolerancia ±0.002)
- Grados Celsius: **37**

*Solución:* $C(F) = \dfrac{F - 32}{1.8}$, pendiente $\dfrac{1}{1.8} \approx 0.556$. $C(98.6) = \dfrac{66.6}{1.8} = 37$ °C (temperatura corporal normal).

### Autoevaluación

| # | Respuesta correcta |
|---|---|
| 1 | $\dfrac{x - 6}{2}$ |
| 2 | (−4, 3) |
| 3 | $f(x) = x^2$ |
| 4 | [0, ∞) |
| 5 | La función que deshace lo que hace f |

### Reto GeoGebra

Si $f^{-1}$ pasa por $(-1, 2)$ y $(5, 0)$, entonces $f$ pasa por $(2, -1)$ y $(0, 5)$. Así $n = 5$ y $m = \dfrac{5 - (-1)}{0 - 2} = -3$: $f(x) = -3x + 5$.

## Taller 4. Funciones exponenciales

### Conocimientos previos

1. ¿Cuánto vale $2^0$? → **1**
2. ¿Cuánto vale $2^{-2}$? → **1/4**

### Preguntas guía (exploración)

1. Con $a = 1$, $h = 0$, $k = 0$, mueve $b$. ¿Qué punto comparten todas las curvas? ¿Qué pasa si $b > 1$, si $0 < b < 1$ y si $b = 1$?
   - Todas pasan por $(0, 1)$. Si $b > 1$ es creciente; si $0 < b < 1$ es decreciente; si $b = 1$ es la recta $y = 1$ (por eso se exige $b \ne 1$).
2. Mueve $k$. ¿Qué le pasa a la asíntota y al rango?
   - La asíntota es $y = k$: la curva se acerca a ella pero nunca la toca. Con $a > 0$ el rango es $(k, \infty)$.
3. Pon $a$ negativo. ¿Qué cambia?
   - La curva se refleja respecto a la asíntota: queda por debajo de $y = k$ y el rango pasa a ser $(-\infty, k)$. También se invierte el comportamiento (creciente ↔ decreciente).

### Práctica autónoma

**1. (Básico)** Para $f(x) = \left(\tfrac12\right)^x - 4$, indica la asíntota, los interceptos y el comportamiento.

- Asíntota: $y =$: **-4**
- Intercepto $y$: **-3**
- Intercepto $x$: **-2**
- Comportamiento: **Decreciente**

*Solución:* Asíntota $y = -4$. $f(0) = 1 - 4 = -3$. $\left(\tfrac12\right)^x = 4 = \left(\tfrac12\right)^{-2} \Rightarrow x = -2$. Base $\tfrac12 < 1$: decreciente.

**2. (Intermedio)** Resuelve: (a) $3^{\,x + 1} = 81$ (b) $2^{\,2x} = \dfrac18$.

- (a) $x$: **3**
- (b) $x$: **-1.5**

*Solución:* (a) $3^{x + 1} = 3^4 \Rightarrow x = 3$. (b) $2^{2x} = 2^{-3} \Rightarrow 2x = -3 \Rightarrow x = -1.5$.

**3. (Intermedio)** La función $f(x) = b^x + k$ tiene asíntota $y = 1$ y pasa por el punto $(2,\, 10)$. Halla $b$ y $k$.

- $b$: **3**
- $k$: **1**

*Solución:* $k = 1$. $10 = b^2 + 1 \Rightarrow b^2 = 9 \Rightarrow b = 3$ (la base debe ser positiva).

**4. (Aplicación)** Un auto de 20 000 dólares pierde el 15 % de su valor cada año: $V(t) = 20000 \cdot b^t$. ¿Cuál es la base $b$? ¿Cuánto vale el auto a los 3 años?

- Base $b$: **0.85**
- Valor a los 3 años (dólares): **12282.5** (tolerancia ±1)

*Solución:* $b = 1 - 0.15 = 0.85$. $V(3) = 20000 \cdot 0.85^3 = 20000 \cdot 0.614125 = 12\,282.50$ dólares.

### Autoevaluación

| # | Respuesta correcta |
|---|---|
| 1 | y = 2 |
| 2 | Decreciente |
| 3 | (0, 1) |
| 4 | (−∞, 3) |
| 5 | x = 2 |

### Reto GeoGebra

Asíntota: $k = -2$. Con $a = 1$ y $h = 0$: $f(0) = 1 - 2 = -1$ ✓ y $f(2) = b^2 - 2 = 7 \Rightarrow b = 3$. Solución: $f(x) = 3^x - 2$ ($b = 3$, $a = 1$, $h = 0$, $k = -2$). También vale $a = 3$, $h = 1$, porque $3 \cdot 3^{x-1} = 3^x$.

## Taller 5. Funciones logarítmicas

### Conocimientos previos

1. ¿A qué exponente hay que elevar $2$ para obtener $8$? → **3**
2. La gráfica de la inversa de $f(x) = 2^x$ se obtiene reflejando la de $f$ respecto a: → **La recta y = x**

### Preguntas guía (exploración)

1. Con $a = 1$, $h = 0$, $k = 0$, mueve $b$. ¿Qué punto comparten todas las curvas? ¿Por qué también pasan por $(b, 1)$?
   - Todas pasan por $(1, 0)$ porque $\log_b 1 = 0$ (ya que $b^0 = 1$). Y pasan por $(b, 1)$ porque $\log_b b = 1$. Si $b > 1$ es creciente; si $0 < b < 1$, decreciente.
2. Activa verExp. ¿Qué relación hay entre $y = \log_b x$ y $y = b^x$?
   - Son inversas: sus gráficas son simétricas respecto a $y = x$. Por eso el $(0, 1)$ de la exponencial se convierte en el $(1, 0)$ del logaritmo, y la asíntota horizontal $y = 0$ en la asíntota vertical $x = 0$.
3. Mueve $h$. ¿Qué pasa con la asíntota y con el dominio? ¿Se puede calcular $\log_b$ de un número negativo?
   - La asíntota es $x = h$ y el dominio es $(h, \infty)$: el argumento $x - h$ debe ser positivo. No existe el logaritmo de un número negativo ni de cero.

### Práctica autónoma

**1. (Básico)** Calcula sin calculadora: (a) $\log_2 32$ (b) $\log_5 \tfrac{1}{25}$ (c) $\ln(e^4)$.

- (a): **5**
- (b): **-2**
- (c): **4**

*Solución:* (a) $2^5 = 32 \Rightarrow 5$. (b) $5^{-2} = \tfrac1{25} \Rightarrow -2$. (c) $\ln(e^4) = 4$.

**2. (Intermedio)** Para $f(x) = \log_3(x + 2) - 1$, halla la asíntota vertical y los interceptos.

- Asíntota: $x =$: **-2**
- Intercepto $x$: **1**
- Intercepto $y$ (2 decimales): **-0.3691** (tolerancia ±0.01)

*Solución:* Asíntota $x = -2$. $\log_3(x + 2) = 1 \Rightarrow x + 2 = 3 \Rightarrow x = 1$. $f(0) = \log_3 2 - 1 \approx 0.631 - 1 = -0.369$.

**3. (Intermedio)** Resuelve: (a) $\log_2 x + \log_2(x - 2) = 3$ (b) $2^x = 10$ (con 2 decimales).

- (a) $x$: **4**
- (b) $x$: **3.3219** (tolerancia ±0.01)

*Solución:* (a) $x(x - 2) = 8 \Rightarrow x^2 - 2x - 8 = 0 \Rightarrow x = 4$ o $x = -2$; solo $x = 4$ está en el dominio. (b) $x = \log_2 10 \approx 3.32$.

**4. (Aplicación)** El pH de una solución es $\text{pH} = -\log[\text{H}^+]$. Calcula el pH de un jugo con $[\text{H}^+] = 3.2 \times 10^{-4}$. ¿Cuántas veces más ácida es una solución de pH 3 que una de pH 5?

- pH (2 decimales): **3.4949** (tolerancia ±0.01)
- Veces más ácida: **100**

*Solución:* $\text{pH} = -(\log 3.2 - 4) = 4 - 0.505 \approx 3.49$. Entre pH 3 y pH 5 hay 2 unidades: $10^2 = 100$ veces más ácida.

### Autoevaluación

| # | Respuesta correcta |
|---|---|
| 1 | 3 |
| 2 | (5, ∞) |
| 3 | Inversas, simétricas respecto a y = x |
| 4 | 5 |
| 5 | x = −3 |

### Reto GeoGebra

Asíntota: $h = -1$. $f(0) = a\log_b 1 + k = k = 2$. $f(8) = a \log_b 9 + 2 = 4 \Rightarrow a \log_b 9 = 2$, que se cumple con $a = 1$ y $b = 3$. Solución: $f(x) = \log_3(x + 1) + 2$.
