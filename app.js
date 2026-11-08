"use strict";

const lessons = [...window.CHILD_LESSONS, ...window.ADVANCED_CHILD_LESSONS];
const storageKey = "club-python-progress-v1";
const main = document.getElementById("main-content");
const navigation = document.getElementById("mission-nav");
const progressBar = document.getElementById("course-progress");
const progressLabel = document.getElementById("progress-label");
const liveMessage = document.getElementById("live-message");
let state = readState();
const courseSession = createCourseSession("child-course-session", (hash) =>
  lessons.some((lesson) => hash === "#mision-" + lesson.id));

/** Create an independent progress record for a learner. */
function emptyState() {
  return { completed: [], quizzes: {}, quizAnswers: {}, extraAnswers: {}, lastLesson: null };
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
    if (candidate.extraAnswers && typeof candidate.extraAnswers === "object" && !Array.isArray(candidate.extraAnswers)) {
      for (const [id, answer] of Object.entries(candidate.extraAnswers)) {
        if (validIds.has(Number(id)) && Number.isInteger(answer) && answer >= 0 && answer <= 2) next.extraAnswers[id] = answer;
      }
    }
    if (validIds.has(candidate.lastLesson)) next.lastLesson = candidate.lastLesson;
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

/** Show a short teaching excerpt, never the complete mission program. */
function teachingSnippet(source) {
  const lines = source.trim().split("\n");
  const excerptLength = Math.max(1, Math.min(3, lines.length - 1));
  return lines.slice(0, excerptLength).join("\n") + "\n# ... (fragmento; falta el resto)";
}

/** Announce an interaction result without changing the learner's position. */
function announce(message) {
  liveMessage.textContent = message;
}

/** Refresh the course progress meter from completed missions. */
function updateProgress() {
  const points = state.completed.length * 100;
  const level = Math.floor(state.completed.length / 4) + 1;
  document.getElementById("reward-label").textContent = CHILD_UI.reward(level, points);
  progressBar.max = lessons.length;
  progressBar.value = state.completed.length;
  progressLabel.textContent = state.completed.length === lessons.length
    ? "¡Todas las misiones completas!"
    : state.completed.length + " de " + lessons.length + " misiones";
}

/** Allow completed missions and the first unfinished mission to be visited. */
function canVisitLesson(id) {
  const firstUnfinished = lessons.find((lesson) => !state.completed.includes(lesson.id));
  return state.completed.includes(id) || !firstUnfinished || id <= firstUnfinished.id;
}

/** Keep the current or last mission visible without moving the lesson itself. */
function revealCurrentMission() {
  const target = navigation.querySelector('.map-link.active') ||
    (state.lastLesson && navigation.querySelector('[href="#mision-' + state.lastLesson + '"]'));
  if (!target || navigation.clientHeight === 0) return;
  const navigationBounds = navigation.getBoundingClientRect();
  const targetBounds = target.getBoundingClientRect();
  navigation.scrollTop += (targetBounds.top + targetBounds.bottom - navigationBounds.top - navigationBounds.bottom) / 2;
}

/** Render the mission map and identify the active mission. */
function renderNavigation(activeId) {
  navigation.innerHTML = '<a class="map-home" href="#inicio">🏠 Inicio</a><h2>Mapa de misiones</h2>' +
    lessons.map((lesson) => {
      const done = state.completed.includes(lesson.id);
      const locked = !canVisitLesson(lesson.id);
      const stage = lesson.id === 1 ? '<h2>Etapa 1 · Primeros pasos</h2>' :
        lesson.id === 13 ? '<h2>Etapa 2 · Taller de inventos</h2>' :
        lesson.id === 23 ? '<h2>Etapa 3 · Laboratorio de proyectos</h2>' : "";
      return stage + '<a class="map-link' + (lesson.id === activeId ? " active" : "") + '" href="#mision-' +
        lesson.id + '"' + (lesson.id === activeId ? ' aria-current="step"' : "") + '><span>' +
        lesson.emoji + '</span><span class="map-title">' + lesson.id + ". " + escapeHtml(lesson.title) +
        '</span><span class="map-check" aria-label="' + (done ? CHILD_UI.done : locked ? CHILD_UI.locked : CHILD_UI.pending) + '">' +
        (done ? "⭐" : locked ? "🔒" : "") + "</span></a>";
    }).join("");
  requestAnimationFrame(revealCurrentMission);
}

/** Render the child-friendly course landing page. */
function renderHome() {
  renderNavigation(null);
  main.innerHTML = '<section class="welcome"><span class="welcome-art" aria-hidden="true">🤖✨</span>' +
    '<p class="eyebrow">¡Hola, explorador!</p><h1>Tu aventura para aprender Python empieza aquí</h1>' +
    '<p class="welcome-copy">Ayuda al robot Pipo en 32 misiones: empieza con lo básico y descubre, poco a poco, cómo crear proyectos cada vez más grandes.</p>' +
    '<a class="button button-main" href="#mision-' + (state.lastLesson || 1) + '">🚀 ' + (state.lastLesson || state.completed.length ? "Continuar aventura" : "Empezar aventura") + "</a>" +
    '<p class="reward-explanation">' + escapeHtml(CHILD_UI.rewardExplanation) + '</p>' +
    '<div class="welcome-facts"><span>🐍 32 misiones por etapas</span><span>⌨️ ¡Tú escribes el código!</span>' +
    '<span>⭐ Tu avance queda guardado</span></div></section>' +
    '<section class="mission-preview"><h2>El mapa de la aventura</h2><div class="preview-grid">' +
    '<a class="preview-card" href="#mision-1"><span>👋</span><strong>Etapa 1 · Primeros pasos <small>12 misiones para aprender las bases y crear tu primer juego.</small></strong></a>' +
    '<a class="preview-card" href="#mision-13"><span>🧰</span><strong>Etapa 2 · Taller de inventos <small>10 ideas nuevas: archivos, pruebas, datos y personajes.</small></strong></a>' +
    '<a class="preview-card" href="#mision-23"><span>🚀</span><strong>Etapa 3 · Laboratorio de proyectos <small>10 retos para diseñar, probar y compartir tus ideas.</small></strong></a>' +
    "</div></section><aside class=\"grownup-note\"><strong>Para quien acompaña:</strong> las primeras 12 misiones empiezan desde cero. " +
    "Las etapas 2 y 3 son retos opcionales para descubrir después, con ayuda cuando haga falta. Para practicar, explica el fragmento con tus palabras, escribe tu propia solución en VS Code o cualquier editor y ejecútala desde la terminal del editor, PowerShell o CMD.</aside>";
}

/** Render one mission with an external-editor exercise and self-assessment. */
function renderLesson(id) {
  const lesson = lessons.find((item) => item.id === id);
  if (!lesson) {
    window.location.hash = "inicio";
    return;
  }
  renderNavigation(id);
  const practice = window.CHILD_PRACTICE[id - 1];
  const extraCorrect = id % practice.options.length;
  const extraOptions = practice.options.map((_, index) => practice.options[(index - extraCorrect + practice.options.length) % practice.options.length]);
  const passed = state.quizzes[id] === true && state.extraAnswers[id] === extraCorrect;
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
    '<h3>Fragmento para estudiar</h3><pre class="source-code"><code>' + escapeHtml(teachingSnippet(lesson.example)) + '</code></pre>' +
    '<aside class="editor-help"><strong>Ahora escribe tú:</strong> este fragmento enseña una idea, no es un programa para copiar. Explica cada línea con tus palabras, resuelve el reto en un archivo <code>.py</code> propio y ejecútalo desde VS Code, PowerShell o CMD.</aside></section>' +
    '<section class="idea-card"><h2>' + escapeHtml(CHILD_UI.extraPractice) + '</h2><p>' + escapeHtml(practice.exercise) + '</p></section>' +
    '<form id="quiz-form" class="quiz-card"><h2>🧠 Pausa para pensar</h2><fieldset><legend>' +
    escapeHtml(lesson.question) + "</legend>" + lesson.options.map((option, index) =>
      '<label class="quiz-option"><input type="radio" name="answer" value="' + index + '"' +
      (selectedAnswer === index ? " checked" : "") + '><span>' +
      escapeHtml(option) + "</span></label>").join("") +
    '</fieldset><fieldset><legend>' + escapeHtml(CHILD_UI.extraQuestion) + ': ' + escapeHtml(practice.question) + '</legend>' +
    extraOptions.map((option, index) => '<label class="quiz-option"><input type="radio" name="extra-answer" value="' + index + '"' +
      (state.extraAnswers[id] === index ? ' checked' : '') + '><span>' + escapeHtml(option) + '</span></label>').join('') +
    '</fieldset><button class="button button-small" type="submit">' + escapeHtml(CHILD_UI.checkAnswers) + '</button>' +
    (Number.isInteger(selectedAnswer) && Number.isInteger(state.extraAnswers[id]) ? '<p class="quiz-feedback' + (passed ? "" : " incorrect") +
      '" role="status">' + (passed ? "¡Muy bien! " + escapeHtml(lesson.why) :
      escapeHtml(CHILD_UI.retry)) + "</p>" : "") +
    '</form><section class="finish-card"><h2>⭐ ¿Listo para la siguiente misión?</h2><p>' +
    (completed ? "¡Esta misión ya es tuya! Puedes volver a practicar cuando quieras." :
      escapeHtml(CHILD_UI.completionHelp)) +
    '</p><button id="complete-lesson" class="button button-main" type="button" ' +
    (completed || !canComplete ? "disabled" : "") + ">" +
    (completed ? "✅ Misión completada" : "Marcar misión como completada") + "</button>" +
    (completed ? nextLink : "") + "</section></article>";
  bindLessonControls(lesson);
}

/** Enable mission completion after the learner answers correctly. */
function refreshFinishButton(lessonId) {
  const button = document.getElementById("complete-lesson");
  if (!button) return;
  const completed = state.completed.includes(lessonId);
  button.disabled = completed || state.quizzes[lessonId] !== true ||
    state.extraAnswers[lessonId] !== lessonId % window.CHILD_PRACTICE[lessonId - 1].options.length;
}

/** Bind mission assessment and completion controls. */
function bindLessonControls(lesson) {
  document.getElementById("quiz-form").addEventListener("change", () => {
    if (!state.completed.includes(lesson.id)) {
      state.quizzes[lesson.id] = false;
      saveState();
      refreshFinishButton(lesson.id);
    }
  });
  document.getElementById("quiz-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const selected = main.querySelector('input[name="answer"]:checked');
    const extraSelected = main.querySelector('input[name="extra-answer"]:checked');
    if (!selected || !extraSelected) {
      announce(CHILD_UI.chooseBoth);
      return;
    }
    state.quizAnswers[lesson.id] = Number(selected.value);
    state.extraAnswers[lesson.id] = Number(extraSelected.value);
    state.quizzes[lesson.id] = state.quizAnswers[lesson.id] === lesson.answer &&
      state.extraAnswers[lesson.id] === lesson.id % window.CHILD_PRACTICE[lesson.id - 1].options.length;
    saveState();
    const previousFeedback = event.target.querySelector(".quiz-feedback");
    if (previousFeedback) previousFeedback.remove();
    event.target.insertAdjacentHTML("beforeend", '<p class="quiz-feedback' +
      (state.quizzes[lesson.id] ? "" : " incorrect") + '" role="status">' +
      (state.quizzes[lesson.id] ? "¡Muy bien! " + escapeHtml(lesson.why) :
        escapeHtml(CHILD_UI.retry)) + "</p>");
    refreshFinishButton(lesson.id);
    announce(state.quizzes[lesson.id] ? "¡Respuesta correcta! " + lesson.why : CHILD_UI.retry);
  });
  document.getElementById("complete-lesson").addEventListener("click", () => {
    if (state.quizzes[lesson.id] !== true ||
        state.extraAnswers[lesson.id] !== lesson.id % window.CHILD_PRACTICE[lesson.id - 1].options.length) return;
    if (!state.completed.includes(lesson.id)) state.completed.push(lesson.id);
    state.completed.sort((left, right) => left - right);
    saveState();
    updateProgress();
    const readingPosition = window.scrollY;
    renderLesson(lesson.id);
    window.scrollTo(0, readingPosition);
    main.querySelector(".finish-card a").focus({ preventScroll: true });
    announce(CHILD_UI.completed);
  });
}

/** Render the page selected by the current URL fragment. */
function renderRoute() {
  updateProgress();
  const match = window.location.hash.match(/^#mision-(\d+)$/);
  if (match && lessons.some((lesson) => lesson.id === Number(match[1]))) {
    const requestedId = Number(match[1]);
    if (!canVisitLesson(requestedId)) {
      const firstUnfinished = lessons.find((lesson) => !state.completed.includes(lesson.id));
      history.replaceState(null, "", "#mision-" + firstUnfinished.id);
      announce(CHILD_UI.locked);
      state.lastLesson = firstUnfinished.id;
    } else state.lastLesson = requestedId;
    saveState();
    renderLesson(state.lastLesson);
  } else renderHome();
}

/** Move to a newly selected mission and save its initial position. */
function handleRouteChange() {
  renderRoute();
  window.scrollTo(0, 0);
  const heading = main.querySelector("h1");
  if (heading) heading.focus({ preventScroll: true });
  courseSession.record();
}

/** Switch the mission map between visible and hidden states. */
function toggleMissionNavigation() {
  const button = document.getElementById("menu-toggle");
  const open = button.getAttribute("aria-expanded") !== "true";
  document.body.classList.toggle("menu-open", open);
  button.setAttribute("aria-expanded", String(open));
  button.textContent = open ? CHILD_UI.closeMenu : CHILD_UI.openMenu;
  if (open) requestAnimationFrame(revealCurrentMission);
}

const menuButton = document.getElementById("menu-toggle");
menuButton.setAttribute("aria-expanded", "false");
if (window.matchMedia("(min-width: 781px)").matches) toggleMissionNavigation();
else menuButton.textContent = CHILD_UI.openMenu;
menuButton.addEventListener("click", toggleMissionNavigation);
navigation.addEventListener("click", (event) => {
  if (event.target.closest("a") && window.matchMedia("(max-width: 780px)").matches) toggleMissionNavigation();
});
courseSession.prepare();
window.addEventListener("hashchange", handleRouteChange);
renderRoute();
courseSession.restore();
