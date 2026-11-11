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
  return { completed: [], quizzes: {}, quizAnswers: {}, extraAnswers: {}, typed: {}, days: [], lastLesson: null };
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
    if (candidate.typed && typeof candidate.typed === "object" && !Array.isArray(candidate.typed)) {
      for (const [id, value] of Object.entries(candidate.typed)) if (validIds.has(Number(id)) && value === true) next.typed[id] = true;
    }
    for (const day of Array.isArray(candidate.days) ? candidate.days : []) {
      if (typeof day === "string" && /^\d{4}-\d{2}-\d{2}$/.test(day) && !next.days.includes(day)) next.days.push(day);
    }
    next.days = next.days.sort().slice(-730);
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
    announce(CHILD_UI.progressSaveFailure);
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
  const points = state.completed.length * 100 + Object.keys(state.typed).length * 20;
  const level = Math.floor(state.completed.length / 4) + 1;
  document.getElementById("reward-label").textContent = CHILD_UI.reward(level, points, practiceStreak());
  progressBar.max = lessons.length;
  progressBar.value = state.completed.length;
  progressLabel.textContent = state.completed.length === lessons.length
    ? CHILD_UI.progressComplete
    : CHILD_UI.progress(state.completed.length, lessons.length);
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
  navigation.innerHTML = '<a class="map-home" href="#inicio">🏠 ' + escapeHtml(CHILD_UI.navigation.home) + '</a>' +
    '<a class="map-home map-prep" href="#preparar"' + (activeId === "preparar" ? ' aria-current="page"' : "") +
    '>🧰 ' + escapeHtml(CHILD_UI.navigation.setup) + '</a><a class="map-home map-ideas" href="#inventos"' +
    (activeId === "inventos" ? ' aria-current="page"' : "") + '>💡 ' + escapeHtml(CHILD_UI.navigation.ideas) + '</a><h2>' + escapeHtml(CHILD_UI.navigation.title) + '</h2>' +
    lessons.map((lesson) => {
      const done = state.completed.includes(lesson.id);
      const locked = !canVisitLesson(lesson.id);
      const stage = lesson.id === 1 ? '<h2>' + escapeHtml(CHILD_UI.navigation.stageOne) + '</h2>' :
        lesson.id === 13 ? '<h2>' + escapeHtml(CHILD_UI.navigation.stageTwo) + '</h2>' :
        lesson.id === 23 ? '<h2>' + escapeHtml(CHILD_UI.navigation.stageThree) + '</h2>' : "";
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
    '<p class="eyebrow">' + escapeHtml(CHILD_UI.home.greeting) + '</p><h1>' + escapeHtml(CHILD_UI.home.title) + '</h1>' +
    '<p class="welcome-copy">' + escapeHtml(CHILD_UI.home.introduction) + '</p>' +
    '<a class="button button-main" href="#mision-' + (state.lastLesson || 1) + '">🚀 ' +
    escapeHtml(state.lastLesson || state.completed.length ? CHILD_UI.home.continue : CHILD_UI.home.start) + "</a>" +
    (state.completed.length ? "" : ' <a class="button" href="#preparar">🧰 ' + escapeHtml(CHILD_UI.home.setupFirst) + '</a>') +
    '<p class="reward-explanation">' + escapeHtml(CHILD_UI.rewardExplanation) + '</p>' +
    '<div class="welcome-facts"><span>🐍 ' + escapeHtml(CHILD_UI.home.facts[0]) + '</span><span>⌨️ ' +
    escapeHtml(CHILD_UI.home.facts[1]) + '</span><span>⭐ ' + escapeHtml(CHILD_UI.home.facts[2]) + '</span></div></section>' +
    '<section class="mission-preview"><h2>' + escapeHtml(CHILD_UI.home.mapTitle) + '</h2><div class="preview-grid">' +
    CHILD_UI.home.stages.map((stage, index) => '<a class="preview-card" href="#mision-' + ([1, 13, 23][index]) +
      '"><span>' + (["👋", "🧰", "🚀"][index]) + '</span><strong>' + escapeHtml(stage[0]) +
      ' <small>' + escapeHtml(stage[1]) + '</small></strong></a>').join('') +
    '</div></section><aside class="grownup-note"><strong>' + escapeHtml(CHILD_UI.home.grownupLabel) + '</strong> ' +
    escapeHtml(CHILD_UI.home.grownupNote) + '</aside>';
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
  const guide = CHILD_GUIDE[id - 1];
  const quizShift = (id * 2 + 1) % lesson.options.length;
  const quizOrder = lesson.options.map((_, position) => (position + quizShift) % lesson.options.length);
  const completed = state.completed.includes(id);
  const canComplete = passed && (state.typed[id] === true || typingLines(lesson).length === 0);
  const nextLink = id < lessons.length
    ? '<a class="button button-main" href="#mision-' + (id + 1) + '">' + escapeHtml(CHILD_UI.lesson.next) + ' →</a>'
    : '<a class="button button-main" href="#inicio">' + escapeHtml(CHILD_UI.lesson.backToMap) + ' 🏆</a>';
  main.innerHTML = '<article class="lesson-page"><a class="back-home" href="#inicio">← ' + escapeHtml(CHILD_UI.lesson.map) + '</a>' +
    '<header class="lesson-heading"><span class="lesson-emoji" aria-hidden="true">' + lesson.emoji +
    '</span><div><p class="eyebrow">' + escapeHtml(CHILD_UI.lesson.mission) + ' ' + String(id).padStart(2, "0") +
    ' ' + escapeHtml(CHILD_UI.lesson.of) + ' ' + lessons.length +
    '</p><h1 tabindex="-1">' + escapeHtml(lesson.title) + '</h1></div></header>' +
    '<p class="story">' + inlineMarkup(lesson.story) + '</p>' +
    '<section class="idea-card"><h2>💡 ' + escapeHtml(CHILD_UI.lesson.idea) + '</h2><p>' + inlineMarkup(lesson.idea) + '</p></section>' +
    '<section class="idea-card words-card"><h2>📖 ' + escapeHtml(CHILD_UI.lesson.words) + '</h2>' + wordsMarkup(guide.words) + '</section>' +
    '<section class="editor-section"><div class="section-title"><h2>🔍 ' + escapeHtml(CHILD_UI.lesson.readCode) + '</h2></div>' +
    '<p>' + escapeHtml(CHILD_UI.lesson.readCodeHelp) + '</p>' + codeWalkMarkup(lesson) + '</section>' + typingMarkup(lesson) +
    '<section class="editor-section"><div class="section-title"><h2>⌨️ ' + escapeHtml(CHILD_UI.lesson.tryCode) + '</h2></div>' +
    '<p class="challenge"><strong>🎯 ' + escapeHtml(CHILD_UI.lesson.challenge) + '</strong> ' + inlineMarkup(lesson.challenge) +
    ' <details class="hint"><summary>' + escapeHtml(CHILD_UI.lesson.hint) + '</summary><p>' + inlineMarkup(lesson.hint) + '</p></details></p>' +
    howToMarkup() + '</section>' +
    '<section class="idea-card oops-card"><h2>🧯 ' + escapeHtml(CHILD_UI.lesson.troubleshooting) + '</h2><p>' + inlineMarkup(guide.oops) + '</p></section>' +
    '<section class="idea-card"><h2>' + escapeHtml(CHILD_UI.extraPractice) + '</h2><p>' + inlineMarkup(practice.exercise) + '</p></section>' +
    '<form id="quiz-form" class="quiz-card"><h2>🧠 ' + escapeHtml(CHILD_UI.lesson.reflection) + '</h2><fieldset><legend>' +
    inlineMarkup(lesson.question) + "</legend>" + quizOrder.map((index) =>
      '<label class="quiz-option"><input type="radio" name="answer" value="' + index + '"' +
      (selectedAnswer === index ? " checked" : "") + '><span>' +
      inlineMarkup(lesson.options[index]) + "</span></label>").join("") +
    '</fieldset><fieldset><legend>' + escapeHtml(CHILD_UI.extraQuestion) + ': ' + inlineMarkup(practice.question) + '</legend>' +
    extraOptions.map((option, index) => '<label class="quiz-option"><input type="radio" name="extra-answer" value="' + index + '"' +
      (state.extraAnswers[id] === index ? ' checked' : '') + '><span>' + inlineMarkup(option) + '</span></label>').join('') +
    '</fieldset><button class="button button-small" type="submit">' + escapeHtml(CHILD_UI.checkAnswers) + '</button>' +
    (Number.isInteger(selectedAnswer) && Number.isInteger(state.extraAnswers[id]) ? '<p class="quiz-feedback' + (passed ? "" : " incorrect") +
      '" role="status">' + (passed ? escapeHtml(CHILD_UI.lesson.correct) + ' ' + inlineMarkup(lesson.why) :
      escapeHtml(CHILD_UI.retry)) + "</p>" : "") +
    '</form><section class="finish-card"><h2>⭐ ' + escapeHtml(CHILD_UI.lesson.ready) + '</h2><p>' +
    (completed ? escapeHtml(CHILD_UI.lesson.alreadyCompleted) :
      escapeHtml(CHILD_UI.completionHelp)) +
    '</p><button id="complete-lesson" class="button button-main" type="button" ' +
    (completed || !canComplete ? "disabled" : "") + ">" +
    (completed ? '✅ ' + escapeHtml(CHILD_UI.lesson.completedButton) : escapeHtml(CHILD_UI.lesson.completeButton)) + "</button>" +
    (completed ? nextLink : "") + "</section></article>";
  bindLessonControls(lesson);
  refreshTyping(lesson);
}

/** Require both correct answers and the hand-typed code before a mission can be completed. */
function missionReady(lessonId) {
  const lesson = lessons.find((item) => item.id === lessonId);
  return state.quizzes[lessonId] === true &&
    state.extraAnswers[lessonId] === lessonId % window.CHILD_PRACTICE[lessonId - 1].options.length &&
    (state.typed[lessonId] === true || typingLines(lesson).length === 0);
}

/** Enable mission completion after the learner answers correctly. */
function refreshFinishButton(lessonId) {
  const button = document.getElementById("complete-lesson");
  if (!button) return;
  const completed = state.completed.includes(lessonId);
  button.disabled = completed || !missionReady(lessonId);
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
      (state.quizzes[lesson.id] ? escapeHtml(CHILD_UI.lesson.correct) + ' ' + inlineMarkup(lesson.why) :
        escapeHtml(CHILD_UI.retry)) + "</p>");
    refreshFinishButton(lesson.id);
    announce(state.quizzes[lesson.id] ? CHILD_UI.lesson.correctAnnouncement + " " + lesson.why : CHILD_UI.retry);
  });
  document.getElementById("complete-lesson").addEventListener("click", () => {
    if (!missionReady(lesson.id)) return;
    if (!state.completed.includes(lesson.id)) state.completed.push(lesson.id);
    recordPracticeDay();
    showToast(CHILD_UI.completed);
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
  } else if (window.location.hash === "#preparar") {
    renderNavigation("preparar");
    main.innerHTML = setupPageMarkup();
  } else if (window.location.hash === "#inventos") {
    renderNavigation("inventos");
    main.innerHTML = ideasPageMarkup();
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

/** Apply the Spanish localization catalog to the persistent document shell. */
function initializeInterfaceText() {
  document.title = CHILD_UI.documentTitle;
  document.getElementById("brand-link").setAttribute("aria-label", CHILD_UI.brandAriaLabel);
  document.getElementById("brand-title").textContent = CHILD_UI.brandTitle;
  document.getElementById("brand-tagline").textContent = CHILD_UI.brandTagline;
  progressLabel.textContent = CHILD_UI.initialProgress;
  progressBar.setAttribute("aria-label", CHILD_UI.progressAriaLabel);
  navigation.setAttribute("aria-label", CHILD_UI.navigationAriaLabel);
  document.getElementById("footer-message").textContent = CHILD_UI.footerMessage;
  document.getElementById("setup-link").textContent = CHILD_UI.setupLink;
}

const menuButton = document.getElementById("menu-toggle");
initializeInterfaceText();
menuButton.setAttribute("aria-expanded", "false");
if (window.matchMedia("(min-width: 1101px)").matches) toggleMissionNavigation();
else menuButton.textContent = CHILD_UI.openMenu;
menuButton.addEventListener("click", toggleMissionNavigation);
navigation.addEventListener("click", (event) => {
  if (event.target.closest("a") && window.matchMedia("(max-width: 1100px)").matches) toggleMissionNavigation();
});
bindTypingControls();
courseSession.prepare();
window.addEventListener("hashchange", handleRouteChange);
renderRoute();
courseSession.restore();
