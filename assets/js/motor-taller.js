/* =====================================================================
   motor-taller.js — Construye un taller a partir de window.TALLER (datos.js)
   Secciones: objetivos, previos, exploración (GeoGebra), teoría, ejemplos,
   práctica, autoevaluación, ficha + reto GeoGebra opcional.
   ===================================================================== */
(function () {
  'use strict';

  const GA = window.GA;
  const T = window.TALLER;
  const app = document.getElementById('app');
  if (!GA || !T || !app) return;

  const RAIZ = '../../../';                       // talleres/<grupo>/<id>/ → raíz del sitio
  const meta = GA.TALLERES.find(t => t.id === T.id);
  const grupo = GA.grupo(meta.grupo);
  const hermanos = GA.talleresDe(meta.grupo);
  const pos = hermanos.findIndex(t => t.id === T.id);
  document.documentElement.style.setProperty('--acento', meta.color);
  document.title = meta.titulo + ' · ' + grupo.titulo;

  let estado = GA.progresoTaller(T.id);
  const guardar = fn => { estado = GA.actualizarTaller(T.id, fn); refrescarProgreso(); };

  /* =================== Plantillas =================== */

  function cabecera() {
    return `
      ${GA.pestanas(meta.grupo, RAIZ)}
      <header class="cabecera">
        <div class="cabecera-barra">
          <a class="volver" href="${RAIZ}index.html#${meta.grupo}">← Talleres de ${grupo.titulo.toLowerCase()}</a>
          <div class="cronometro" id="crono">
            <span class="crono-valor" id="crono-valor">00:00 / ${GA.DURACION}:00</span>
            <button type="button" class="btn-mini" id="crono-btn">Iniciar cronómetro</button>
          </div>
        </div>
        <div class="cabecera-titulo">
          <div class="cabecera-icono">${GA.icono(T.id)}</div>
          <div>
            <p class="eyebrow">Taller ${pos + 1} de ${hermanos.length} · ${grupo.titulo}</p>
            <h1>${meta.titulo}</h1>
            <p class="subtitulo">${T.subtitulo}</p>
            <div class="meta">
              <span class="chip">⏱ ${GA.DURACION} minutos</span>
              <span class="chip">${GA.SECCIONES.length} secciones</span>
              <span class="chip">Trabajo autónomo</span>
            </div>
          </div>
        </div>
        <div class="progreso" aria-live="polite">
          <div class="progreso-barra"><span id="progreso-relleno"></span></div>
          <span id="progreso-texto"></span>
        </div>
      </header>`;
  }

  function indice() {
    const items = GA.SECCIONES.map((s, i) => `
      <li><a href="#sec-${s.id}" data-ir="${s.id}">
        <span class="ind-num">${i + 1}</span>
        <span class="ind-tit">${s.titulo}</span>
        <span class="ind-min">${s.min}′</span>
      </a></li>`).join('');
    return `
      <nav class="indice" aria-label="Secciones del taller">
        <p class="indice-tit">Secciones</p>
        <ol>${items}
          <li class="ind-extra"><a href="#sec-reto" data-ir="reto">
            <span class="ind-num">★</span><span class="ind-tit">Reto GeoGebra</span><span class="ind-min">extra</span>
          </a></li>
        </ol>
      </nav>`;
  }

  function seccion(id, cuerpo, extra) {
    const i = GA.SECCIONES.findIndex(s => s.id === id);
    const s = GA.SECCIONES[i];
    return `
      <section class="seccion" id="sec-${id}" data-seccion="${id}">
        <header class="seccion-cab">
          <span class="seccion-num">${i + 1}</span>
          <h2>${s.titulo}</h2>
          <span class="pill-tiempo">⏱ ${s.min} min</span>
        </header>
        <div class="seccion-cuerpo">${cuerpo}</div>
        <footer class="seccion-pie">
          ${extra || ''}
          <button type="button" class="btn-completar" data-completar="${id}">Marcar como completada</button>
        </footer>
      </section>`;
  }

  /* ---------- 1. Objetivos ---------- */
  function secObjetivos() {
    const li = T.objetivos.map(o => `<li>${o}</li>`).join('');
    return seccion('objetivos', `<p>Al terminar este taller podrás:</p><ul class="lista-objetivos">${li}</ul>`);
  }

  /* ---------- 2. Conocimientos previos ---------- */
  function secPrevios() {
    const preg = T.previos.map((q, qi) => `
      <fieldset class="pregunta-rapida" data-previo="${qi}">
        <legend>${qi + 1}. ${q.pregunta}</legend>
        <div class="opciones-rapidas">
          ${q.opciones.map((o, oi) => `<button type="button" class="opcion-rapida" data-op="${oi}">${o}</button>`).join('')}
        </div>
        <p class="retro" hidden></p>
      </fieldset>`).join('');
    return seccion('previos', `<p>Responde rápido: solo es para activar lo que ya sabes.</p>${preg}`);
  }

  /* ---------- 3. Exploración ---------- */
  function leyenda(items) {
    return `<ul class="leyenda">${items.map(l =>
      `<li><span class="punto-color" style="background:${GA.COLORES[l.color] || l.color}"></span>${l.texto}</li>`).join('')}</ul>`;
  }
  function bloqueApplet(clave, cfg) {
    const comandos = cfg.comandos.join('\n');
    return `
      ${leyenda(cfg.leyenda || [])}
      <div class="applet-marco">
        <div class="ggb-contenedor" id="ggb-${clave}" data-applet="${clave}">
          <div class="ggb-cargando">Cargando GeoGebra…</div>
        </div>
      </div>
      ${cfg.lecturas ? `<div class="lecturas" id="lect-${clave}" aria-live="polite"></div>` : ''}
      <div class="applet-acciones">
        <button type="button" class="btn-secundario" data-restablecer="${clave}">↺ Restablecer applet</button>
        <a class="btn-secundario" href="https://www.geogebra.org/graphing" target="_blank" rel="noopener">Abrir GeoGebra en otra pestaña</a>
      </div>
      <details class="comandos">
        <summary>Comandos GeoGebra de este applet (para el docente)</summary>
        <p>Pégalos uno por línea en la barra de entrada de <a href="https://www.geogebra.org/graphing" target="_blank" rel="noopener">GeoGebra Calculadora Gráfica</a> para reproducir o modificar el applet. Los comandos están en sintaxis inglesa, que GeoGebra acepta en cualquier idioma.</p>
        <pre><code>${GA.esc(comandos)}</code></pre>
        <button type="button" class="btn-mini" data-copiar="${clave}">Copiar comandos</button>
      </details>`;
  }
  function secExploracion() {
    const ex = T.exploracion;
    const preguntas = ex.preguntas.map((q, i) => `
      <li class="pregunta-guia">
        <p>${q.pregunta}</p>
        <details><summary>Ver respuesta</summary><div class="respuesta">${q.respuesta}</div></details>
      </li>`).join('');
    return seccion('exploracion', `
      <p>${ex.intro}</p>
      ${bloqueApplet('explora', ex.applet)}
      <h3 class="subtit">Preguntas guía</h3>
      <p class="nota">Primero intenta responder moviendo los deslizadores; luego compara con la respuesta.</p>
      <ol class="preguntas-guia">${preguntas}</ol>`);
  }

  /* ---------- 4. Teoría ---------- */
  function secTeoria() {
    return seccion('teoria', `<div class="teoria">${T.teoria}</div>`);
  }

  /* ---------- 5. Ejemplos ---------- */
  function secEjemplos() {
    const ej = T.ejemplos.map((e, i) => `
      <article class="ejemplo">
        <h3>Ejemplo ${i + 1}. ${e.titulo}</h3>
        <div class="enunciado">${e.enunciado}</div>
        <details class="solucion">
          <summary>Ver solución paso a paso</summary>
          <ol class="pasos">${e.pasos.map(p => `<li>${p}</li>`).join('')}</ol>
        </details>
      </article>`).join('');
    return seccion('ejemplos', `<p>Intenta resolver cada ejemplo antes de abrir la solución.</p>${ej}`);
  }

  /* ---------- 6. Práctica ---------- */
  function campo(ei, ci, c) {
    const id = `p${ei}-c${ci}`;
    if (c.tipo === 'opcion') {
      return `
        <div class="campo" data-campo="${ci}">
          <label for="${id}">${c.etiqueta}</label>
          <select id="${id}">
            <option value="">— elige —</option>
            ${c.opciones.map(o => `<option value="${GA.esc(o)}">${GA.esc(o)}</option>`).join('')}
          </select>
          <span class="marca" aria-hidden="true"></span>
        </div>`;
    }
    return `
      <div class="campo" data-campo="${ci}">
        <label for="${id}">${c.etiqueta}</label>
        <input id="${id}" type="text" inputmode="decimal" autocomplete="off" spellcheck="false" placeholder="${c.ayuda || 'tu respuesta'}">
        <span class="marca" aria-hidden="true"></span>
      </div>`;
  }
  function secPractica() {
    const ej = T.practica.map((e, ei) => `
      <article class="ejercicio" data-ejercicio="${ei}">
        <header>
          <span class="ej-num">${ei + 1}</span>
          <span class="nivel nivel-${e.nivel.toLowerCase().replace(/[^a-z]/g, '')}">${e.nivel}</span>
          <span class="ej-estado" aria-live="polite"></span>
        </header>
        <div class="enunciado">${e.enunciado}</div>
        <div class="campos">${e.campos.map((c, ci) => campo(ei, ci, c)).join('')}</div>
        <div class="ej-acciones">
          <button type="button" class="btn-primario" data-comprobar="${ei}">Comprobar</button>
          <button type="button" class="btn-secundario" data-pista="${ei}">💡 Pista</button>
        </div>
        <p class="pista" hidden>${e.pista}</p>
        <p class="retro-ej" hidden></p>
        <details class="solucion" data-sol="${ei}">
          <summary>Ver solución</summary>
          <div>${e.solucion}</div>
        </details>
      </article>`).join('');
    return seccion('practica', `
      <p class="nota">Escribe números como <code>2.5</code> o <code>2,5</code>, fracciones como <code>-3/4</code>, raíces como <code>raiz(7)</code> o <code>√7</code>. Si el resultado no es exacto, usa al menos 2 decimales.</p>
      ${ej}`);
  }

  /* ---------- 7. Autoevaluación ---------- */
  function secQuiz() {
    const preg = T.quiz.map((q, qi) => `
      <fieldset class="pregunta-quiz" data-quiz="${qi}">
        <legend><span class="q-num">${qi + 1}</span> ${q.pregunta}</legend>
        ${q.opciones.map((o, oi) => `
          <label class="opcion-quiz">
            <input type="radio" name="q${qi}" value="${oi}">
            <span>${o}</span>
          </label>`).join('')}
        <div class="retro-quiz" hidden></div>
      </fieldset>`).join('');
    return seccion('autoevaluacion', `
      <p>${T.quiz.length} preguntas. Al calificar verás qué respondiste bien y, si te equivocaste, por qué.</p>
      <form id="quiz" novalidate>${preg}
        <div class="quiz-acciones">
          <button type="submit" class="btn-primario">Calificar</button>
          <button type="button" class="btn-secundario" id="quiz-reintentar" hidden>Intentar de nuevo</button>
        </div>
        <div class="quiz-resultado" id="quiz-resultado" hidden></div>
      </form>`);
  }

  /* ---------- 8. Ficha ---------- */
  function secFicha() {
    return seccion('ficha', `
      <div class="ficha" id="ficha">
        <div class="ficha-cab">
          <span>${GA.icono(T.id)}</span>
          <div><p class="eyebrow">Ficha de síntesis</p><h3>${meta.titulo}</h3></div>
        </div>
        ${T.ficha}
      </div>`,
      `<button type="button" class="btn-secundario" id="imprimir-ficha">🖨 Imprimir / guardar como PDF</button>`);
  }

  /* ---------- Reto (opcional) ---------- */
  function secReto() {
    const r = T.reto;
    return `
      <section class="seccion seccion-reto" id="sec-reto">
        <header class="seccion-cab">
          <span class="seccion-num">★</span>
          <h2>Reto GeoGebra</h2>
          <span class="pill-tiempo pill-extra">Extra · opcional</span>
        </header>
        <div class="seccion-cuerpo">
          <div class="reto-enunciado">${r.enunciado}</div>
          ${bloqueApplet('reto', r.applet)}
          <div class="ej-acciones">
            <button type="button" class="btn-primario" id="reto-comprobar">Comprobar reto</button>
          </div>
          <div class="reto-retro" id="reto-retro" hidden></div>
          <details class="solucion"><summary>Ver solución del reto</summary><div>${r.solucion}</div></details>
        </div>
      </section>`;
  }

  function navTalleres() {
    const ant = hermanos[pos - 1];
    const sig = hermanos[pos + 1];
    return `
      <nav class="nav-talleres" aria-label="Otros talleres">
        ${ant ? `<a href="../${ant.id}/index.html" class="nav-t ant"><small>← Taller anterior</small>${ant.titulo}</a>` : '<span></span>'}
        ${sig ? `<a href="../${sig.id}/index.html" class="nav-t sig"><small>Siguiente taller →</small>${sig.titulo}</a>`
              : `<a href="${RAIZ}index.html#${meta.grupo}" class="nav-t sig"><small>¡Terminaste el grupo! →</small>Volver a ${grupo.titulo}</a>`}
      </nav>`;
  }

  /* =================== Montaje =================== */
  app.innerHTML = `
    ${cabecera()}
    <div class="layout">
      ${indice()}
      <main id="contenido">
        ${GA.vinetaGeogebra(false)}
        ${secObjetivos()}
        ${secPrevios()}
        ${secExploracion()}
        ${secTeoria()}
        ${secEjemplos()}
        ${secPractica()}
        ${secQuiz()}
        ${secFicha()}
        ${secReto()}
        ${navTalleres()}
      </main>
    </div>
    <footer class="pie">Talleres autónomos de matemática con GeoGebra · 3.º de Bachillerato · Tu progreso se guarda solo en este navegador.</footer>`;

  GA.renderMath(app);

  /* =================== Progreso =================== */
  function refrescarProgreso() {
    const pct = GA.porcentaje(estado);
    const rel = document.getElementById('progreso-relleno');
    const txt = document.getElementById('progreso-texto');
    if (rel) rel.style.width = pct + '%';
    if (txt) {
      const q = estado.quiz ? ` · Autoevaluación: ${estado.quiz.nota}/${estado.quiz.total}` : '';
      txt.textContent = `${pct}% completado${q}${estado.reto ? ' · ★ Reto logrado' : ''}`;
    }
    GA.SECCIONES.forEach(s => {
      const hecho = !!estado.secciones[s.id];
      const sec = document.getElementById('sec-' + s.id);
      if (sec) sec.classList.toggle('hecha', hecho);
      const btn = document.querySelector(`[data-completar="${s.id}"]`);
      if (btn) {
        btn.textContent = hecho ? '✓ Completada' : 'Marcar como completada';
        btn.setAttribute('aria-pressed', hecho ? 'true' : 'false');
      }
      const a = document.querySelector(`.indice a[data-ir="${s.id}"]`);
      if (a) a.classList.toggle('hecha', hecho);
    });
    const ar = document.querySelector('.indice a[data-ir="reto"]');
    if (ar) ar.classList.toggle('hecha', !!estado.reto);
  }
  function completar(id, valor) {
    guardar(t => { t.secciones[id] = valor === undefined ? true : valor; });
  }
  document.querySelectorAll('[data-completar]').forEach(b =>
    b.addEventListener('click', () => {
      const id = b.dataset.completar;
      completar(id, !estado.secciones[id]);
    }));

  /* Índice: resaltar la sección visible */
  if ('IntersectionObserver' in window) {
    const enlaces = {};
    document.querySelectorAll('.indice a[data-ir]').forEach(a => { enlaces[a.dataset.ir] = a; });
    const obs = new IntersectionObserver(entradas => {
      entradas.forEach(e => {
        if (e.isIntersecting) {
          const id = e.target.id.replace('sec-', '');
          Object.values(enlaces).forEach(a => a.classList.remove('activa'));
          if (enlaces[id]) {
            enlaces[id].classList.add('activa');
            enlaces[id].scrollIntoView({ block: 'nearest', inline: 'nearest' });
          }
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    document.querySelectorAll('.seccion').forEach(s => obs.observe(s));
  }

  /* =================== Cronómetro =================== */
  (function () {
    const btn = document.getElementById('crono-btn');
    const val = document.getElementById('crono-valor');
    const caja = document.getElementById('crono');
    let inicio = null, acumulado = 0, timer = null;
    const pintar = () => {
      const ms = acumulado + (inicio ? Date.now() - inicio : 0);
      const s = Math.floor(ms / 1000);
      const mm = String(Math.floor(s / 60)).padStart(2, '0');
      const ss = String(s % 60).padStart(2, '0');
      val.textContent = `${mm}:${ss} / ${GA.DURACION}:00`;
      caja.classList.toggle('excedido', s >= GA.DURACION * 60);
    };
    btn.addEventListener('click', () => {
      if (inicio) {
        acumulado += Date.now() - inicio; inicio = null;
        clearInterval(timer); btn.textContent = 'Continuar';
      } else {
        inicio = Date.now(); timer = setInterval(pintar, 1000);
        btn.textContent = 'Pausar';
      }
      pintar();
    });
  })();

  /* =================== Previos =================== */
  document.querySelectorAll('[data-previo]').forEach(fs => {
    const q = T.previos[+fs.dataset.previo];
    const retro = fs.querySelector('.retro');
    fs.querySelectorAll('.opcion-rapida').forEach(b => b.addEventListener('click', () => {
      const oi = +b.dataset.op;
      const ok = oi === q.correcta;
      fs.querySelectorAll('.opcion-rapida').forEach(x => x.classList.remove('ok', 'mal'));
      b.classList.add(ok ? 'ok' : 'mal');
      if (!ok) fs.querySelectorAll('.opcion-rapida')[q.correcta].classList.add('ok');
      fs.dataset.respondida = '1';
      retro.hidden = false;
      retro.className = 'retro ' + (ok ? 'retro-ok' : 'retro-mal');
      retro.innerHTML = (ok ? '<b>¡Correcto!</b> ' : '<b>Repasa:</b> ') + q.explicacion;
      GA.renderMath(retro);
      const todas = [...document.querySelectorAll('[data-previo]')].every(f => f.dataset.respondida);
      if (todas && !estado.secciones.previos) completar('previos');
    }));
  });

  /* =================== Práctica =================== */
  function evaluarCampo(c, valor) {
    if (c.tipo === 'opcion') return valor === c.respuesta;
    const v = GA.evaluarExpresion(valor);
    if (!isFinite(v)) return null; // no se entendió
    return Math.abs(v - c.respuesta) <= (c.tol == null ? 0.011 : c.tol);
  }
  function revisarPracticaCompleta() {
    const total = T.practica.length;
    const listos = Object.keys(estado.practica || {}).length;
    if (listos >= total && !estado.secciones.practica) completar('practica');
  }
  document.querySelectorAll('[data-ejercicio]').forEach(art => {
    const ei = +art.dataset.ejercicio;
    const e = T.practica[ei];
    const retro = art.querySelector('.retro-ej');
    const est = art.querySelector('.ej-estado');
    const marcar = tipo => {
      art.classList.remove('resuelto', 'visto');
      if (tipo === 'ok') { art.classList.add('resuelto'); est.textContent = '✓ Resuelto'; }
      if (tipo === 'visto') { art.classList.add('visto'); est.textContent = 'Solución vista'; }
    };
    if (estado.practica[ei]) marcar(estado.practica[ei]);

    art.querySelector('[data-comprobar]').addEventListener('click', () => {
      let bien = 0, vacios = 0, raros = 0;
      e.campos.forEach((c, ci) => {
        const caja = art.querySelector(`[data-campo="${ci}"]`);
        const inp = caja.querySelector('input,select');
        const marca = caja.querySelector('.marca');
        caja.classList.remove('ok', 'mal');
        if (!inp.value.trim()) { vacios++; marca.textContent = ''; return; }
        const r = evaluarCampo(c, inp.value);
        if (r === null) { raros++; caja.classList.add('mal'); marca.textContent = '?'; return; }
        caja.classList.add(r ? 'ok' : 'mal');
        marca.textContent = r ? '✓' : '✗';
        if (r) bien++;
      });
      retro.hidden = false;
      if (bien === e.campos.length) {
        retro.className = 'retro-ej retro-ok';
        retro.textContent = '¡Excelente! Todas las respuestas son correctas.';
        if (estado.practica[ei] !== 'ok') guardar(t => { t.practica[ei] = 'ok'; });
        marcar('ok');
        revisarPracticaCompleta();
      } else {
        retro.className = 'retro-ej retro-mal';
        const partes = [];
        if (bien) partes.push(`${bien} de ${e.campos.length} correctas.`);
        if (vacios) partes.push(`Te faltan ${vacios} respuesta(s).`);
        if (raros) partes.push('Hay una respuesta que no se entiende: revisa el formato (ej. 2.5, -3/4, raiz(7)).');
        partes.push('Revisa la pista o vuelve a intentarlo.');
        retro.textContent = partes.join(' ');
      }
    });
    art.querySelector('[data-pista]').addEventListener('click', () => {
      const p = art.querySelector('.pista');
      p.hidden = !p.hidden;
    });
    art.querySelector('[data-sol]').addEventListener('toggle', ev => {
      if (ev.target.open && !estado.practica[ei]) {
        guardar(t => { t.practica[ei] = 'visto'; });
        marcar('visto');
        revisarPracticaCompleta();
      }
    });
  });

  /* =================== Autoevaluación =================== */
  (function () {
    const form = document.getElementById('quiz');
    const res = document.getElementById('quiz-resultado');
    const reintentar = document.getElementById('quiz-reintentar');
    form.addEventListener('submit', ev => {
      ev.preventDefault();
      let nota = 0, sinResp = 0;
      T.quiz.forEach((q, qi) => {
        const fs = form.querySelector(`[data-quiz="${qi}"]`);
        const sel = fs.querySelector('input:checked');
        const retro = fs.querySelector('.retro-quiz');
        fs.querySelectorAll('.opcion-quiz').forEach((l, oi) => {
          l.classList.remove('ok', 'mal');
          if (oi === q.correcta) l.classList.add('ok');
        });
        retro.hidden = false;
        if (!sel) {
          sinResp++;
          retro.className = 'retro-quiz retro-mal';
          retro.innerHTML = `<b>Sin respuesta.</b> ${q.retro[q.correcta]}`;
        } else {
          const oi = +sel.value;
          const ok = oi === q.correcta;
          if (ok) nota++;
          else sel.closest('.opcion-quiz').classList.add('mal');
          retro.className = 'retro-quiz ' + (ok ? 'retro-ok' : 'retro-mal');
          retro.innerHTML = ok
            ? `<b>¡Correcto!</b> ${q.retro[oi]}`
            : `<b>Incorrecto.</b> ${q.retro[oi]}<br><span class="correcta-era">Respuesta correcta: ${q.opciones[q.correcta]}.</span> ${q.retro[q.correcta]}`;
        }
        GA.renderMath(retro);
        fs.querySelectorAll('input').forEach(i => { i.disabled = true; });
      });
      const total = T.quiz.length;
      const pct = Math.round((100 * nota) / total);
      const msj = pct >= 80 ? '¡Muy bien! Dominas este tema.' :
                  pct >= 60 ? 'Bien, pero repasa las preguntas que fallaste.' :
                  'Te conviene repasar la teoría y los ejemplos antes de reintentar.';
      res.hidden = false;
      res.className = 'quiz-resultado ' + (pct >= 60 ? 'retro-ok' : 'retro-mal');
      res.innerHTML = `<span class="nota-grande">${nota}/${total}</span><span>${msj}${sinResp ? ` (${sinResp} sin responder)` : ''}</span>`;
      form.querySelector('[type=submit]').hidden = true;
      reintentar.hidden = false;
      guardar(t => {
        t.quiz = { nota, total, fecha: new Date().toISOString() };
        t.secciones.autoevaluacion = true;
      });
    });
    reintentar.addEventListener('click', () => {
      form.reset();
      form.querySelectorAll('input').forEach(i => { i.disabled = false; });
      form.querySelectorAll('.opcion-quiz').forEach(l => l.classList.remove('ok', 'mal'));
      form.querySelectorAll('.retro-quiz').forEach(r => { r.hidden = true; });
      res.hidden = true;
      reintentar.hidden = true;
      form.querySelector('[type=submit]').hidden = false;
      form.querySelector('[data-quiz="0"]').scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  })();

  /* =================== Ficha =================== */
  document.getElementById('imprimir-ficha').addEventListener('click', () => {
    document.body.classList.add('imprimiendo-ficha');
    const fin = () => { document.body.classList.remove('imprimiendo-ficha'); window.removeEventListener('afterprint', fin); };
    window.addEventListener('afterprint', fin);
    window.print();
    setTimeout(fin, 1500);
    if (!estado.secciones.ficha) completar('ficha');
  });

  /* =================== GeoGebra =================== */
  const APIS = {};
  const CONFIGS = { explora: T.exploracion.applet, reto: T.reto.applet };

  function hexRgb(hex) {
    const h = hex.replace('#', '');
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  }

  function configurar(api, cfg) {
    cfg.comandos.forEach(c => api.evalCommand(c));
    // Todas las etiquetas apagadas; luego se encienden las definidas
    api.getAllObjectNames().forEach(n => { try { api.setLabelVisible(n, false); } catch (e) { /* */ } });
    Object.entries(cfg.estilos || {}).forEach(([n, s]) => {
      if (!api.exists(n)) return;
      if (s.color) { const [r, g, b] = hexRgb(GA.COLORES[s.color] || s.color); api.setColor(n, r, g, b); }
      if (s.grosor) api.setLineThickness(n, s.grosor);
      if (s.trazo != null) api.setLineStyle(n, s.trazo);
      if (s.tamano) api.setPointSize(n, s.tamano);
      if (s.hueco) api.setPointStyle(n, 2);
      if (s.relleno != null) api.setFilling(n, s.relleno);
      if (s.etiqueta) {
        api.setCaption(n, s.etiqueta);
        api.setLabelStyle(n, 3);
        api.setLabelVisible(n, true);
      }
      if (s.fijo) api.setFixed(n, true, false);
      if (s.oculto) api.setVisible(n, false);
    });
    (cfg.auxiliares || []).forEach(n => { if (api.exists(n)) api.setAuxiliary(n, true); });
    const v = cfg.vista || [-10, 10, -7, 7];
    api.setCoordSystem(v[0], v[1], v[2], v[3]);
  }

  function pintarLecturas(clave) {
    const cfg = CONFIGS[clave];
    const api = APIS[clave];
    const caja = document.getElementById('lect-' + clave);
    if (!cfg.lecturas || !caja || !api) return;
    let filas;
    try { filas = cfg.lecturas(api); } catch (e) { filas = []; }
    caja.innerHTML = filas.map(f => `
      <div class="lectura ${f.ancho ? 'ancha' : ''}">
        <span class="lect-etq">${f.color ? `<span class="punto-color" style="background:${GA.COLORES[f.color] || f.color}"></span>` : ''}${f.t}</span>
        <span class="lect-val">${f.v}</span>
      </div>`).join('');
  }

  function crearApplet(clave) {
    const cont = document.getElementById('ggb-' + clave);
    if (!cont || cont.dataset.creado) return;
    cont.dataset.creado = '1';
    if (typeof window.GGBApplet !== 'function') {
      cont.innerHTML = `<div class="ggb-error">No se pudo cargar GeoGebra (¿sin conexión a internet?).
        Abre <a href="https://www.geogebra.org/graphing" target="_blank" rel="noopener">GeoGebra Calculadora Gráfica</a>
        y pega los comandos que aparecen debajo.</div>`;
      return;
    }
    const ancho = Math.max(300, Math.min(cont.clientWidth || 800, 980));
    const alto = ancho < 600 ? Math.round(ancho * 1.25) : Math.round(Math.min(560, ancho * 0.62));
    cont.style.minHeight = alto + 'px';
    let pendiente = false;
    const params = {
      id: 'ggbApplet_' + clave,
      appName: 'graphing',
      width: ancho,
      height: alto,
      language: 'es',
      showToolBar: false,
      showMenuBar: false,
      showAlgebraInput: true,
      showResetIcon: false,
      enableRightClick: false,
      enableShiftDragZoom: true,
      enableLabelDrags: false,
      showZoomButtons: true,
      showFullscreenButton: true,
      borderColor: '#FFFFFF',
      appletOnLoad: function (api) {
        APIS[clave] = api;
        const cfg = CONFIGS[clave];
        configurar(api, cfg);
        if (cfg.lecturas) {
          api.registerUpdateListener(function () {
            if (pendiente) return;
            pendiente = true;
            requestAnimationFrame(() => { pendiente = false; pintarLecturas(clave); });
          });
          pintarLecturas(clave);
        }
      }
    };
    cont.innerHTML = '';
    new window.GGBApplet(params, true).inject('ggb-' + clave);
  }

  // Carga diferida: cada applet se crea cuando su sección se acerca a la pantalla
  const contenedores = document.querySelectorAll('[data-applet]');
  if ('IntersectionObserver' in window) {
    const obsGgb = new IntersectionObserver(ents => {
      ents.forEach(e => {
        if (e.isIntersecting) { crearApplet(e.target.dataset.applet); obsGgb.unobserve(e.target); }
      });
    }, { rootMargin: '400px 0px' });
    contenedores.forEach(c => obsGgb.observe(c));
  } else {
    contenedores.forEach(c => crearApplet(c.dataset.applet));
  }

  document.querySelectorAll('[data-restablecer]').forEach(b => b.addEventListener('click', () => {
    const clave = b.dataset.restablecer;
    const api = APIS[clave];
    if (!api) return;
    api.newConstruction();
    configurar(api, CONFIGS[clave]);
    pintarLecturas(clave);
    if (clave === 'reto') document.getElementById('reto-retro').hidden = true;
  }));

  document.querySelectorAll('[data-copiar]').forEach(b => b.addEventListener('click', () => {
    const txt = CONFIGS[b.dataset.copiar].comandos.join('\n');
    const ok = () => { b.textContent = '✓ Copiado'; setTimeout(() => { b.textContent = 'Copiar comandos'; }, 1800); };
    if (navigator.clipboard) navigator.clipboard.writeText(txt).then(ok, () => {});
  }));

  /* Reto */
  document.getElementById('reto-comprobar').addEventListener('click', () => {
    const caja = document.getElementById('reto-retro');
    const api = APIS.reto;
    caja.hidden = false;
    if (!api) {
      caja.className = 'reto-retro retro-mal';
      caja.textContent = 'El applet todavía no ha cargado. Espera unos segundos e inténtalo otra vez.';
      return;
    }
    const r = T.reto.comprobar(api);
    caja.className = 'reto-retro ' + (r.ok ? 'retro-ok' : 'retro-mal');
    caja.innerHTML = r.ok
      ? '<b>★ ¡Reto superado!</b> ' + (r.mensajes || []).join(' ')
      : '<b>Aún no.</b><ul>' + r.mensajes.map(m => `<li>${m}</li>`).join('') + '</ul>';
    GA.renderMath(caja);
    if (r.ok && !estado.reto) guardar(t => { t.reto = true; });
  });

  refrescarProgreso();
})();
