"use strict";

/** Validate that every mission has complete lesson, practice and beginner-guide content. */
const path = require("node:path");

global.window = {};
for (const file of ["lessons", "advanced-lessons", "learning-content", "guide-basics", "guide-advanced", "setup-guide", "keyboard-symbols", "invention-ideas"]) {
  require(path.join(__dirname, file + ".js"));
}

const lessons = [...window.CHILD_LESSONS, ...window.ADVANCED_CHILD_LESSONS];
const guides = [...window.CHILD_GUIDE_BASICS, ...window.CHILD_GUIDE_ADVANCED];
const problems = [];

/** Record a problem instead of stopping, so one run reports everything that needs fixing. */
function expect(condition, message) {
  if (!condition) problems.push(message);
}

expect(lessons.length === 32, "Expected 32 missions, found " + lessons.length);
expect(guides.length === lessons.length, "Expected one guide per mission, found " + guides.length);
expect(window.CHILD_PRACTICE.length === lessons.length, "Expected one practice entry per mission.");

lessons.forEach((lesson, index) => {
  const label = "Mission " + (index + 1) + ": ";
  const guide = guides[index] || {};
  const codeLines = lesson.example.split("\n").filter((line) => line.trim());
  expect(lesson.id === index + 1, label + "identifiers must be consecutive.");
  expect(lesson.options.length === 3 && lesson.answer >= 0 && lesson.answer < 3, label + "quiz needs three options.");
  expect(Array.isArray(guide.words) && guide.words.length >= 3, label + "needs at least three new words.");
  expect(Array.isArray(guide.lines) && guide.lines.length === codeLines.length,
    label + "needs one explanation per code line (" + codeLines.length + " lines, " +
    (guide.lines || []).length + " explanations).");
  expect(typeof guide.output === "string" && (guide.output || guide.note), label + "needs an output or a note.");
  expect(typeof guide.oops === "string" && guide.oops.length > 40, label + "needs a troubleshooting tip.");
  for (const text of [lesson.idea, lesson.hint, lesson.challenge]) {
    expect(!/cajita de entrada|Respuesta para input|la consola está abierta/.test(text),
      label + "mentions the removed in-browser console.");
  }
});

expect(window.CHILD_SETUP.sections.length >= 5, "The setup guide needs its preparation sections.");
for (const section of window.CHILD_SETUP.sections) {
  expect(section.title && section.items.length >= 3, "Setup section is too thin: " + section.title);
}

const keySymbols = window.CHILD_KEYS.map((entry) => entry[0]);
expect(keySymbols.length === new Set(keySymbols).size, "Keyboard symbols must not repeat.");
for (const entry of window.CHILD_KEYS) {
  expect(entry.length === 4 && Number.isInteger(entry[2]), "Keyboard entry needs symbol, name, Alt code and keys: " + entry[0]);
}
expect(window.CHILD_IDEAS.recipe.length >= 5, "The ideas page needs its step-by-step recipe.");
for (const group of window.CHILD_IDEAS.groups) {
  expect(group.ideas.length >= 3 && group.ideas.every((idea) => idea.length === 4), "Idea group is incomplete: " + group.title);
}

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}
console.log("Checked " + lessons.length + " missions with complete beginner guides.");
