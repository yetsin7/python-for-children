"use strict";

/** Typing drill, keyboard help, practice streak and ideas page for the children's course. */

/** Select the revealed example lines worth typing: real code, not comments or notes. */
function typingLines(lesson) {
  return visibleCodeLines(lesson).filter((line) => {
    const text = line.trim();
    return !text.startsWith("#") && !text.startsWith('"""');
  });
}

/** Reduce a line to what must match: indentation and symbols, ignoring accents, emojis and inner spacing. */
function typingKey(line) {
  const text = line.replace(/\t/g, "    ").normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^\x20-\x7E]/g, "").replace(/\s+$/, "");
  const indent = text.length - text.trimStart().length;
  return { indent, body: text.trim().replace(/\s+/g, "") };
}

/** Compare typed lines with the example and describe the state of each expected line. */
function evaluateTyping(targets, typedText) {
  const typed = typedText.split("\n").filter((line) => line.trim());
  const states = [];
  let complete = typed.length === targets.length;
  for (let index = 0; index < targets.length; index += 1) {
    if (index >= typed.length) { states.push({ state: "pending" }); complete = false; continue; }
    const expected = typingKey(targets[index]);
    const actual = typingKey(typed[index]);
    if (expected.indent === actual.indent && expected.body === actual.body) { states.push({ state: "done" }); continue; }
    complete = false;
    const lastTyped = index === typed.length - 1;
    if (expected.indent !== actual.indent && !(lastTyped && !actual.body)) {
      states.push({ state: "wrong", hint: CHILD_UI.typing.indent(expected.indent) });
    } else if (lastTyped && expected.body.startsWith(actual.body)) {
      states.push({ state: "typing" });
    } else {
      let position = 0;
      while (position < actual.body.length && actual.body[position] === expected.body[position]) position += 1;
      states.push({ state: "wrong", hint: CHILD_UI.typing.near(expected.body.slice(position, position + 6)) });
    }
  }
  return { states, complete, extra: typed.length > targets.length };
}

/** List only the special symbols used by this mission's code, with two ways to type each one. */
function symbolHelpMarkup(code) {
  let rows = "";
  for (const [symbol, name, altCode, keys] of window.CHILD_KEYS) {
    if (!code.includes(symbol)) continue;
    rows += '<div><dt><kbd class="symbol-key">' + escapeHtml(symbol) + "</kbd> " + escapeHtml(name) +
      "</dt><dd><strong>Alt + " + altCode + "</strong> · " + escapeHtml(keys) + "</dd></div>";
  }
  if (/^ +\S/m.test(code)) {
    rows += "<div><dt>" + escapeHtml(CHILD_UI.typing.indentName) + "</dt><dd>" + inlineMarkup(CHILD_UI.typing.indentHelp) + "</dd></div>";
  }
  if (!rows) return "";
  return '<details class="symbol-help" open><summary>⌨️ ' + escapeHtml(CHILD_UI.typing.symbolsTitle) +
    '</summary><dl class="word-list">' + rows + '</dl><p class="output-note">' + inlineMarkup(CHILD_UI.typing.altHelp) + "</p></details>";
}

/** Render the drill with one status row per expected line and a paste-proof writing area. */
function typingMarkup(lesson) {
  const targets = typingLines(lesson);
  if (!targets.length) return "";
  const done = state.typed[lesson.id] === true;
  return '<section class="editor-section typing-card"><div class="section-title"><h2>✍️ ' + escapeHtml(CHILD_UI.typing.title) +
    "</h2></div><p>" + escapeHtml(CHILD_UI.typing.intro) + "</p>" + symbolHelpMarkup(targets.join("\n")) +
    '<ol class="typing-lines">' + targets.map((line) => '<li data-state="pending"><code>' + escapeHtml(line) +
      '</code><span class="typing-status"></span></li>').join("") + '</ol><label for="typing-input">' +
    escapeHtml(CHILD_UI.typing.label) + '</label><textarea id="typing-input" class="typing-input" rows="' +
    (targets.length + 1) + '" spellcheck="false" autocomplete="off" autocapitalize="off" autocorrect="off" placeholder="' +
    escapeHtml(CHILD_UI.typing.placeholder) + '"></textarea><p id="typing-result" class="typing-result' +
    (done ? " is-done" : "") + '" role="status">' + escapeHtml(done ? CHILD_UI.typing.done : CHILD_UI.typing.start) + "</p></section>";
}

/** Refresh every status row and reward the drill the first time it is completed. */
function refreshTyping(lesson) {
  const input = document.getElementById("typing-input");
  if (!input) return;
  const result = evaluateTyping(typingLines(lesson), input.value);
  const rows = main.querySelectorAll(".typing-lines li");
  result.states.forEach((entry, index) => {
    rows[index].dataset.state = entry.state;
    rows[index].querySelector(".typing-status").textContent =
      entry.state === "wrong" ? entry.hint : CHILD_UI.typing.states[entry.state];
  });
  const alreadyDone = state.typed[lesson.id] === true;
  const message = document.getElementById("typing-result");
  message.textContent = result.complete || alreadyDone ? CHILD_UI.typing.done :
    result.extra ? CHILD_UI.typing.extra : CHILD_UI.typing.start;
  message.classList.toggle("is-done", result.complete || alreadyDone);
  if (result.complete && !alreadyDone) {
    state.typed[lesson.id] = true;
    recordPracticeDay();
    saveState();
    updateProgress();
    refreshFinishButton(lesson.id);
    showToast(CHILD_UI.typing.reward);
  }
}

/** Format a local calendar day so streaks follow the child's own clock. */
function dayStamp(date) {
  return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0");
}

/** Remember that the child practised today. */
function recordPracticeDay() {
  const today = dayStamp(new Date());
  if (!state.days.includes(today)) state.days.push(today);
}

/** Count the consecutive practice days that are still alive. */
function practiceStreak() {
  const days = new Set(state.days);
  const cursor = new Date();
  if (!days.has(dayStamp(cursor))) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  while (days.has(dayStamp(cursor))) { streak += 1; cursor.setDate(cursor.getDate() - 1); }
  return streak;
}

/** Show a short celebratory message that disappears on its own. */
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.setAttribute("role", "status");
  toast.textContent = message;
  document.body.append(toast);
  setTimeout(() => toast.remove(), 4200);
}

/** Insert four spaces for Tab, refuse pasting, and refuse copying code out of the missions. */
function bindTypingControls() {
  main.addEventListener("input", (event) => {
    const lesson = lessons.find((item) => item.id === state.lastLesson);
    if (event.target.id === "typing-input" && lesson) refreshTyping(lesson);
  });
  main.addEventListener("keydown", (event) => {
    if (event.target.id !== "typing-input" || event.key !== "Tab" || event.shiftKey) return;
    event.preventDefault();
    const input = event.target;
    const start = input.selectionStart;
    input.value = input.value.slice(0, start) + "    " + input.value.slice(input.selectionEnd);
    input.selectionStart = input.selectionEnd = start + 4;
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });
  for (const type of ["paste", "drop"]) {
    main.addEventListener(type, (event) => {
      if (event.target.id !== "typing-input") return;
      event.preventDefault();
      showToast(CHILD_UI.typing.noPaste);
    });
  }
  for (const type of ["copy", "cut", "contextmenu", "dragstart"]) {
    main.addEventListener(type, (event) => {
      const selection = document.getSelection();
      const anchor = selection && selection.anchorNode ? selection.anchorNode.parentElement : null;
      const insideCode = (node) => Boolean(node && node.closest && node.closest("pre, code, .typing-lines"));
      if (event.target.id === "typing-input" || (!insideCode(event.target) && !insideCode(anchor))) return;
      event.preventDefault();
      if (type === "copy" || type === "cut") showToast(CHILD_UI.typing.noCopy);
    });
  }
}

/** Render the recipe and the staged list of inventions a child can build alone. */
function ideasPageMarkup() {
  const ideas = window.CHILD_IDEAS;
  let markup = '<article class="lesson-page"><a class="back-home" href="#inicio">← ' + escapeHtml(CHILD_UI.guide.map) +
    '</a><header class="lesson-heading"><span class="lesson-emoji" aria-hidden="true">💡</span><div><p class="eyebrow">' +
    escapeHtml(CHILD_UI.ideas.eyebrow) + '</p><h1 tabindex="-1">' + escapeHtml(ideas.title) + '</h1></div></header><p class="story">' +
    inlineMarkup(ideas.intro) + '</p><section class="idea-card setup-card"><h2>🧪 ' + escapeHtml(ideas.recipeTitle) + "</h2><ol>" +
    ideas.recipe.map((step) => "<li>" + inlineMarkup(step) + "</li>").join("") + "</ol></section>";
  for (const group of ideas.groups) {
    markup += '<section class="mission-preview"><h2>' + escapeHtml(group.title) + '</h2><div class="invention-grid">' +
      group.ideas.map(([emoji, title, what, tools]) => '<article class="invention"><span aria-hidden="true">' + emoji +
        "</span><h3>" + escapeHtml(title) + "</h3><p>" + inlineMarkup(what) + '</p><p class="invention-tools">' +
        escapeHtml(CHILD_UI.ideas.tools) + " " + inlineMarkup(tools) + "</p></article>").join("") + "</div></section>";
  }
  return markup + '<aside class="grownup-note">' + inlineMarkup(ideas.closing) + "</aside></article>";
}
