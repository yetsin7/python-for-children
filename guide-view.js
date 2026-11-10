"use strict";

/** Render the beginner guide: vocabulary, line-by-line reading, expected output and setup page. */
const CHILD_GUIDE = [...window.CHILD_GUIDE_BASICS, ...window.CHILD_GUIDE_ADVANCED];

/**
 * Decide how many example lines a mission reveals to the child.
 * Hidden lines become part of the challenge; revealed lines get a line-by-line explanation.
 * Must return a whole number between 1 and totalLines.
 */
function visibleLineCount(missionId, totalLines) {
  // TODO(human): choose the reveal policy. The line below keeps the previous behaviour
  // (always hide at least the last line, never show more than three).
  return Math.max(1, Math.min(3, totalLines - 1));
}

/** Render new words as a friendly list of term and meaning. */
function wordsMarkup(words) {
  return '<dl class="word-list">' + words.map(([word, meaning]) =>
    "<div><dt>" + escapeHtml(word) + "</dt><dd>" + escapeHtml(meaning) + "</dd></div>").join("") + "</dl>";
}

/** Render the revealed example lines, each followed by its plain-language explanation. */
function codeWalkMarkup(lesson) {
  const guide = CHILD_GUIDE[lesson.id - 1];
  const codeLines = lesson.example.split("\n").filter((line) => line.trim());
  const requested = Math.round(Number(visibleLineCount(lesson.id, codeLines.length)));
  const shown = Math.max(1, Math.min(codeLines.length, Number.isFinite(requested) ? requested : 1));
  const hidden = codeLines.length - shown;
  let markup = '<pre class="source-code"><code>' + escapeHtml(codeLines.slice(0, shown).join("\n")) +
    (hidden ? "\n# ... " + (hidden === 1 ? CHILD_UI.guide.hiddenLine : CHILD_UI.guide.hiddenLinesPrefix + " " +
      hidden + " " + CHILD_UI.guide.hiddenLinesSuffix) + " " + CHILD_UI.guide.challengeSuffix : "") +
    '</code></pre><ol class="line-walk">';
  for (let index = 0; index < shown; index += 1) {
    markup += '<li><code>' + escapeHtml(codeLines[index].trim()) + "</code><p>" +
      escapeHtml(guide.lines[index]) + "</p></li>";
  }
  markup += "</ol>";
  if (guide.output) {
    markup += "<h3>🖥️ " + escapeHtml(hidden ? CHILD_UI.guide.completedOutput : CHILD_UI.guide.output) +
      '</h3><pre class="screen-output"><code>' + escapeHtml(guide.output) + "</code></pre>";
  }
  if (guide.note) markup += '<p class="output-note">' + escapeHtml(guide.note) + "</p>";
  return markup;
}

/** Remind the child of the write, save, run and look routine for every challenge. */
function howToMarkup() {
  return '<details class="how-to"><summary>' + escapeHtml(CHILD_UI.guide.howToTitle) + '</summary><ol>' +
    CHILD_UI.guide.steps.map((step) => '<li>' + escapeHtml(step) + '</li>').join('') +
    '</ol><p>' + escapeHtml(CHILD_UI.guide.setupPrompt) + ' <a href="#preparar">' +
    escapeHtml(CHILD_UI.guide.setupDestination) + '</a>.</p></details>';
}

/** Render the preparation guide for children who have never used the computer to program. */
function setupPageMarkup() {
  const setup = window.CHILD_SETUP;
  let markup = '<article class="lesson-page"><a class="back-home" href="#inicio">← ' + escapeHtml(CHILD_UI.guide.map) + '</a>' +
    '<header class="lesson-heading"><span class="lesson-emoji" aria-hidden="true">🧰</span><div>' +
    '<p class="eyebrow">' + escapeHtml(CHILD_UI.guide.beforeFirstMission) + '</p><h1 tabindex="-1">' + escapeHtml(setup.title) +
    '</h1></div></header><p class="story">' + escapeHtml(setup.intro) + "</p>";
  for (const section of setup.sections) {
    markup += '<section class="idea-card setup-card"><h2>' + section.emoji + " " + escapeHtml(section.title) +
      "</h2><p>" + escapeHtml(section.text) + "</p><ol>" +
      section.items.map((item) => "<li>" + escapeHtml(item) + "</li>").join("") + "</ol></section>";
  }
  return markup + '<aside class="grownup-note">' + escapeHtml(setup.grownups) + "</aside>" +
    '<section class="finish-card"><h2>🚀 ' + escapeHtml(CHILD_UI.guide.readyTitle) + '</h2><p>' +
    escapeHtml(CHILD_UI.guide.readyBody) + '</p><a class="button button-main" href="#mision-1">' +
    escapeHtml(CHILD_UI.guide.firstMission) + ' →</a></section></article>';
}
