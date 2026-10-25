"use strict";

let runner = null;
let runnerReady = false;
let pendingRun = null;
let initializationTimer = null;
let executionTimer = null;
let runningLessonId = null;

function writeTerminal(text, replace) {
  const output = document.getElementById("terminal-output");
  if (!output) return;
  if (replace) output.textContent = text;
  else output.textContent += text;
}

function setRunnerStatus(text) {
  const status = document.getElementById("runner-status");
  if (status) status.textContent = text;
}

function updateDownloadProgress(message) {
  const container = document.querySelector(".download-progress");
  const progress = document.getElementById("python-download");
  const caption = document.getElementById("download-caption");
  if (!container || !progress || !caption) return;
  container.hidden = false;
  const percent = message.total ? Math.min(100, Math.round(message.loaded / message.total * 100)) : null;
  if (percent === null) {
    progress.removeAttribute("value");
    caption.textContent = "Descargando " + message.name + "… " + formatBytes(message.loaded);
  } else {
    progress.value = percent;
    caption.textContent = "Descargando " + message.name + "… " + percent + "%";
  }
  setRunnerStatus("La primera descarga puede tardar un poco. Mantén esta ventana abierta.");
}

function formatBytes(bytes) {
  if (bytes < 1024 * 1024) return Math.round(bytes / 1024) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function stopRunnerTimer() {
  if (initializationTimer) window.clearTimeout(initializationTimer);
  if (executionTimer) window.clearTimeout(executionTimer);
  initializationTimer = null;
  executionTimer = null;
}

function finishRun(message, isError) {
  stopRunnerTimer();
  const button = document.getElementById("run-code");
  if (button) button.disabled = false;
  setRunnerStatus(message);
  if (isError) {
    const progress = document.querySelector(".download-progress");
    if (progress) progress.hidden = true;
  }
  announce(message);
  if (isError) {
    runningLessonId = null;
    return;
  }
  if (runningLessonId !== null) {
    if (!state.ran.includes(runningLessonId)) state.ran.push(runningLessonId);
    saveState();
    if (runningLessonId === activeLessonId()) refreshFinishButton();
    runningLessonId = null;
  }
}

function activeLessonId() {
  const match = window.location.hash.match(/^#mision-(\d+)$/);
  return match ? Number(match[1]) : 0;
}

function ensureRunner() {
  if (runner) return;
  runnerReady = false;
  runner = new Worker("python-worker.js");
  runner.onmessage = (event) => {
    const message = event.data;
    if (message.type === "ready") {
      runnerReady = true;
      if (initializationTimer) window.clearTimeout(initializationTimer);
      initializationTimer = null;
      const progress = document.querySelector(".download-progress");
      if (progress) progress.hidden = true;
      if (pendingRun) sendRun();
      else if (document.getElementById("run-code")?.disabled) startExecutionTimer();
      return;
    }
    if (message.type === "progress") {
      updateDownloadProgress(message);
      if (initializationTimer) {
        window.clearTimeout(initializationTimer);
        initializationTimer = window.setTimeout(() => failRunner(
          "La descarga lleva demasiado tiempo. Revisa tu conexión y pulsa «Ejecutar mi código» para volver a intentarlo."
        ), 180000);
      }
      return;
    }
    if (message.type === "status") setRunnerStatus(message.text);
    if (message.type === "output") writeTerminal(message.text, false);
    if (message.type === "done") finishRun("¡Programa terminado! Puedes cambiarlo y volver a ejecutar.", false);
    if (message.type === "error") {
      writeTerminal(message.message, false);
      if (message.stage === "ejecutar tu programa") {
        finishRun("Python encontró un error. Lee la pista en la consola y prueba otra vez.", true);
      } else {
        console.error("Falló la inicialización de Pyodide.", message.stage, message.message, message.details);
        failRunner("No pude " + message.stage + ". Detalle: " + message.message);
      }
    }
  };
  runner.onerror = (event) => {
    const reason = event.message || "El navegador no pudo abrir el trabajador de Python.";
    console.error("No se pudo iniciar el intérprete de Python.", reason, event.filename, event.lineno);
    failRunner("No pude iniciar la consola de Python. " + reason);
  };
}

function failRunner(message) {
  if (runner) runner.terminate();
  runner = null;
  runnerReady = false;
  pendingRun = null;
  runningLessonId = null;
  stopRunnerTimer();
  writeTerminal(message, true);
  finishRun("La consola no pudo preparar Python. " + message, true);
}

function sendRun() {
  if (!pendingRun || !runner) return;
  const request = pendingRun;
  runner.postMessage({ type: "run", code: pendingRun.code, input: pendingRun.input });
  pendingRun = null;
  runningLessonId = request.lessonId;
  if (runnerReady) {
    setRunnerStatus("Ejecutando…");
    startExecutionTimer();
  } else {
    setRunnerStatus("Descargando y preparando Python…");
  }
}

function startExecutionTimer() {
  if (executionTimer) window.clearTimeout(executionTimer);
  setRunnerStatus("Ejecutando…");
  executionTimer = window.setTimeout(() => {
    if (runner) runner.terminate();
    runner = null;
    runnerReady = false;
    writeTerminal("\n⏹ Python se detuvo después de unos segundos. Tal vez un ciclo no termina.", false);
    finishRun("El programa tardó demasiado. Revisa si hay un ciclo que se repite sin parar.", true);
  }, 15000);
}

function runCode(lesson) {
  const editor = document.getElementById("code-editor");
  const input = document.getElementById("input-values");
  const button = document.getElementById("run-code");
  if (!editor.value.trim()) {
    announce("Escribe una instrucción primero. ¡Puedes empezar con print(\"¡Hola!\")!");
    editor.focus();
    return;
  }
  saveDraft(lesson.id, editor.value);
  button.disabled = true;
  writeTerminal("", true);
  setRunnerStatus("Preparando Python… La primera vez puede tardar un poquito.");
  pendingRun = { code: editor.value, input: input.value, lessonId: lesson.id };
  ensureRunner();
  if (runnerReady) {
    sendRun();
  } else {
    initializationTimer = window.setTimeout(() => {
      if (!runnerReady && runner) {
        failRunner("La descarga lleva demasiado tiempo. Revisa tu conexión y vuelve a intentarlo.");
      }
    }, 180000);
    sendRun();
  }
}
