"use strict";

const lessons = [...window.CHILD_LESSONS, ...window.ADVANCED_CHILD_LESSONS];
const storageKey = "club-python-progress-v1";
const main = document.getElementById("main-content");
const navigation = document.getElementById("mission-nav");
const progressBar = document.getElementById("course-progress");
const progressLabel = document.getElementById("progress-label");
const liveMessage = document.getElementById("live-message");
let state = readState();

/** Create an independent progress record for a learner. */
function emptyState() {
  return { completed: [], quizzes: {}, quizAnswers: {} };
}

/** Read compatible learner progress and discard unknown or malformed fields. */
function readState() {
  try {
    const saved = localStorage.getItem(storageKey);
    if (!saved) return emptyState();
    const candidate = JSON.parse(saved);
    if (!candidate || !Array.isArray(candidate.completed)) {
      throw new Error("Stored progress has an invalid format.");
    }
    const validIds = new Set(lessons.map((lesson) => lesson.id));
    const next = emptyState();
    for (const id of candidate.completed) if (validIds.has(id) && !next.completed.includes(id)) next.completed.push(id);
    if (candidate.quizzes && typeof candidate.quizzes === "object" && !Array.isArray(candidate.quizzes)) {
      for (const [id, passed] of Object.entries(candidate.quizzes)) {
        if (validIds.has(Number(id)) && passed === true) next.quizzes[id] = true;
      }
    }
    if (candidate.quizAnswers && typeof candidate.quizAnswers === "object" && !Array.isArray(candidate.quizAnswers)) {
      for (const [id, answer] of Object.entries(candidate.quizAnswers)) {
        if (validIds.has(Number(id)) && Number.isInteger(answer) && answer >= 0 && answer <= 2) {
          next.quizAnswers[id] = answer;
        }
      }
    }
    return next;
  } catch (error) {
    console.warn("Course progress could not be read.", error);
    return emptyState();
  }
}

/** Persist the latest validated learner progress in the browser. */
function saveState() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(state));
  } catch (error) {
    console.warn("Course progress could not be saved.", error);
    announce("No pude guardar tu avance en este navegador. Puedes seguir practicando.");
  }
}

/** Escape learner-facing content before inserting it into HTML markup. */
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;"
  })[character]);
}

/** Announce an interaction result without changing the learner's position. */
function announce(message) {
  liveMessage.textContent = message;
}

/** Refresh the course progress meter from completed missions. */
function updateProgress() {
  progressBar.max = lessons.length;
  progressBar.value = state.completed.length;
  progressLabel.textContent = state.completed.length === lessons.length
    ? "¡Todas las misiones completas!"
    : state.completed.length + " de " + lessons.length + " misiones";
}

/** Render the mission map and identify the active mission. */
function renderNavigation(activeId) {
  navigation.innerHTML = '<a class="map-home" href="#inicio">🏠 Inicio</a><h2>Mapa de misiones</h2>' +
    lessons.map((lesson) => {
      const done = state.completed.includes(lesson.id);
      const stage = lesson.id === 1 ? '<h2>Etapa 1 · Primeros pasos</h2>' :
        lesson.id === 13 ? '<h2>Etapa 2 · Taller de inventos</h2>' :
        lesson.id === 23 ? '<h2>Etapa 3 · Laboratorio de proyectos</h2>' : "";
      return stage + '<a class="map-link' + (lesson.id === activeId ? " active" : "") + '" href="#mision-' +
        lesson.id + '"' + (lesson.id === activeId ? ' aria-current="step"' : "") + '><span>' +
        lesson.emoji + '</span><span class="map-title">' + lesson.id + ". " + escapeHtml(lesson.title) +
        '</span><span class="map-check" aria-label="' + (done ? "completada" : "pendiente") + '">' +
        (done ? "⭐" : "") + "</span></a>";
    }).join("");
}

/** Render the child-friendly course landing page. */
function renderHome() {
  renderNavigation(null);
  main.innerHTML = '<section class="welcome"><span class="welcome-art" aria-hidden="true">🤖✨</span>' +
    '<p class="eyebrow">¡Hola, explorador!</p><h1>Tu aventura para aprender Python empieza aquí</h1>' +
    '<p class="welcome-copy">Ayuda al robot Pipo en 32 misiones: empieza con lo básico y descubre, poco a poco, cómo crear proyectos cada vez más grandes.</p>' +
    '<a class="button button-main" href="#mision-1">🚀 ' + (state.completed.length ? "Continuar aventura" : "Empezar aventura") + "</a>" +
    '<div class="welcome-facts"><span>🐍 32 misiones por etapas</span><span>⌨️ ¡Tú escribes el código!</span>' +
    '<span>⭐ Tu avance queda guardado</span></div></section>' +
    '<section class="mission-preview"><h2>El mapa de la aventura</h2><div class="preview-grid">' +
    '<a class="preview-card" href="#mision-1"><span>👋</span><strong>Etapa 1 · Primeros pasos <small>12 misiones para aprender las bases y crear tu primer juego.</small></strong></a>' +
    '<a class="preview-card" href="#mision-13"><span>🧰</span><strong>Etapa 2 · Taller de inventos <small>10 ideas nuevas: archivos, pruebas, datos y personajes.</small></strong></a>' +
    '<a class="preview-card" href="#mision-23"><span>🚀</span><strong>Etapa 3 · Laboratorio de proyectos <small>10 retos para diseñar, probar y compartir tus ideas.</small></strong></a>' +
    "</div></section><aside class=\"grownup-note\"><strong>Para quien acompaña:</strong> las primeras 12 misiones empiezan desde cero. " +
    "Las etapas 2 y 3 son retos opcionales para descubrir después, con ayuda cuando haga falta. Para practicar, copia cada ejemplo en VS Code o cualquier editor y ejecútalo desde la terminal del editor, PowerShell o CMD.</aside>";
}

/** Render one mission with an external-editor exercise and self-assessment. */
function renderLesson(id) {
  const lesson = lessons.find((item) => item.id === id);
  if (!lesson) {
    window.location.hash = "inicio";
    return;
  }
  renderNavigation(id);
  const passed = state.quizzes[id] === true;
  const selectedAnswer = state.quizAnswers[id];
  const completed = state.completed.includes(id);
  const canComplete = passed;
  const nextLink = id < lessons.length
    ? '<a class="button button-main" href="#mision-' + (id + 1) + '">Siguiente misión →</a>'
    : '<a class="button button-main" href="#inicio">Volver al mapa 🏆</a>';
  main.innerHTML = '<article class="lesson-page"><a class="back-home" href="#inicio">← Mapa de misiones</a>' +
    '<header class="lesson-heading"><span class="lesson-emoji" aria-hidden="true">' + lesson.emoji +
    '</span><div><p class="eyebrow">MISIÓN ' + String(id).padStart(2, "0") + " DE " + lessons.length +
    '</p><h1 tabindex="-1">' + escapeHtml(lesson.title) + '</h1></div></header>' +
    '<p class="story">' + escapeHtml(lesson.story) + '</p>' +
    '<section class="idea-card"><h2>💡 La idea de hoy</h2><p>' + escapeHtml(lesson.idea) + '</p></section>' +
    '<section class="editor-section"><div class="section-title"><h2>⌨️ ¡A probar!</h2></div>' +
    '<p class="challenge"><strong>🎯 Tu reto:</strong> ' + escapeHtml(lesson.challenge) +
    ' <details class="hint"><summary>¿Una pista?</summary><p>' + escapeHtml(lesson.hint) + '</p></details></p>' +
    '<h3>Ejemplo</h3><pre class="source-code"><code>' + escapeHtml(lesson.example) + '</code></pre>' +
    '<h3>Inicio del reto</h3><pre class="source-code"><code>' + escapeHtml(lesson.starter) + '</code></pre>' +
    '<aside class="editor-help"><strong>Abre tu herramienta favorita:</strong> copia el código en un archivo <code>.py</code> con VS Code o cualquier editor. Ejecútalo desde la terminal del editor, PowerShell o CMD.</aside></section>' +
    '<form id="quiz-form" class="quiz-card"><h2>🧠 Pausa para pensar</h2><fieldset><legend>' +
    escapeHtml(lesson.question) + "</legend>" + lesson.options.map((option, index) =>
      '<label class="quiz-option"><input type="radio" name="answer" value="' + index + '"' +
      (selectedAnswer === index ? " checked" : "") + '><span>' +
      escapeHtml(option) + "</span></label>").join("") +
    '</fieldset><button class="button button-small" type="submit">Comprobar respuesta</button>' +
    (Number.isInteger(selectedAnswer) ? '<p class="quiz-feedback' + (passed ? "" : " incorrect") +
      '" role="status">' + (passed ? "¡Muy bien! " + escapeHtml(lesson.why) :
      "¡Casi! Revisa la idea de hoy y vuelve a intentarlo.") + "</p>" : "") +
    '</form><section class="finish-card"><h2>⭐ ¿Listo para la siguiente misión?</h2><p>' +
    (completed ? "¡Esta misión ya es tuya! Puedes volver a practicar cuando quieras." :
      "Practica el código en tu editor y responde correctamente la pregunta para continuar.") +
    '</p><button id="complete-lesson" class="button button-main" type="button" ' +
    (!completed && !canComplete ? "disabled" : "") + ">" +
    (completed ? "✅ Misión completada" : "Marcar misión como completada") + "</button>" +
    (completed ? nextLink : "") + "</section></article>";
  bindLessonControls(lesson);
  main.querySelector("h1").focus();
}

/** Enable mission completion after the learner answers correctly. */
function refreshFinishButton(lessonId) {
  const button = document.getElementById("complete-lesson");
  if (!button) return;
  const completed = state.completed.includes(lessonId);
  button.disabled = !completed && state.quizzes[lessonId] !== true;
}

/** Bind mission assessment and completion controls. */
function bindLessonControls(lesson) {
  document.getElementById("quiz-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const selected = main.querySelector('input[name="answer"]:checked');
    if (!selected) {
      announce("Elige una respuesta para comprobarla.");
      return;
    }
    state.quizAnswers[lesson.id] = Number(selected.value);
    state.quizzes[lesson.id] = state.quizAnswers[lesson.id] === lesson.answer;
    saveState();
    const previousFeedback = event.target.querySelector(".quiz-feedback");
    if (previousFeedback) previousFeedback.remove();
    event.target.insertAdjacentHTML("beforeend", '<p class="quiz-feedback' +
      (state.quizzes[lesson.id] ? "" : " incorrect") + '" role="status">' +
      (state.quizzes[lesson.id] ? "¡Muy bien! " + escapeHtml(lesson.why) :
        "¡Casi! Revisa la idea de hoy y vuelve a intentarlo.") + "</p>");
    refreshFinishButton(lesson.id);
    announce(state.quizzes[lesson.id] ? "¡Respuesta correcta! " + lesson.why : "Casi. Lee las opciones y prueba otra vez.");
  });
  document.getElementById("complete-lesson").addEventListener("click", () => {
    if (!state.completed.includes(lesson.id)) state.completed.push(lesson.id);
    state.completed.sort((left, right) => left - right);
    saveState();
    updateProgress();
    renderLesson(lesson.id);
    announce("¡Misión completada! Ganaste una estrella.");
  });
}

/** Render the page selected by the current URL fragment. */
function renderRoute() {
  updateProgress();
  const match = window.location.hash.match(/^#mision-(\d+)$/);
  if (match) renderLesson(Number(match[1]));
  else renderHome();
}

window.addEventListener("hashchange", renderRoute);
renderRoute();
