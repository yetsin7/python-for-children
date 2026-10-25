"use strict";

let python = null;
let inputLines = [];
let inputIndex = 0;
let preparationStage = "inicio";

const pyodideBase = "https://cdn.jsdelivr.net/pyodide/v0.27.7/full/";
const browserFetch = self.fetch.bind(self);

function resourceName(url) {
  const pathname = new URL(url).pathname;
  return decodeURIComponent(pathname.slice(pathname.lastIndexOf("/") + 1));
}

function reportDownload(name, loaded, total) {
  self.postMessage({ type: "progress", name, loaded, total });
}

self.fetch = async (input, init) => {
  const rawUrl = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
  const requestUrl = rawUrl ? new URL(rawUrl, self.location.href).href : "";
  const response = await browserFetch(input, init);
  if (!requestUrl.startsWith(pyodideBase) || !response.ok || !response.body) return response;

  const name = resourceName(requestUrl);
  const compressed = Boolean(response.headers.get("content-encoding"));
  const contentLength = Number(response.headers.get("content-length")) || null;
  const total = compressed ? null : contentLength;
  const reader = response.body.getReader();
  const chunks = [];
  let loaded = 0;
  reportDownload(name, loaded, total && loaded <= total ? total : null);
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    loaded += value.byteLength;
    reportDownload(name, loaded, total && loaded <= total ? total : null);
  }

  const downloaded = new Uint8Array(loaded);
  let offset = 0;
  for (const chunk of chunks) {
    downloaded.set(chunk, offset);
    offset += chunk.byteLength;
  }
  const completed = new Response(downloaded, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers
  });
  reportDownload(name, loaded, total && loaded <= total ? total : loaded);
  return completed;
};

async function preparePython() {
  if (python) return;
  preparationStage = "descargar el cargador de Python";
  self.postMessage({ type: "status", text: "Preparando el cargador de Python…" });
  importScripts(pyodideBase + "pyodide.js");
  preparationStage = "descargar los archivos de Python";
  self.postMessage({ type: "status", text: "Preparando la descarga de Python…" });
  python = await loadPyodide({ indexURL: pyodideBase });
  preparationStage = "listo";
  self.postMessage({ type: "ready" });
}

self.onmessage = async (event) => {
  if (event.data.type !== "run") return;
  try {
    await preparePython();
    preparationStage = "ejecutar tu programa";
    inputLines = event.data.input.split(/\r?\n/);
    inputIndex = 0;
    python.setStdout({ batched: (text) => self.postMessage({ type: "output", text: text + "\n" }) });
    python.setStderr({ batched: (text) => self.postMessage({ type: "output", text: text + "\n" }) });
    python.setStdin({
      stdin: () => inputIndex < inputLines.length ? inputLines[inputIndex++] : null
    });
    await python.runPythonAsync(event.data.code);
    self.postMessage({ type: "done" });
  } catch (error) {
    self.postMessage({
      type: "error",
      stage: preparationStage,
      message: error.message || String(error),
      details: error.stack || ""
    });
  }
};
