"use strict";

/**
 * Inline code for the children's course: fragments that are code (keywords, calls, file names)
 * or keys are shown differently from the surrounding prose. `Text` between backticks is always code.
 */
const INLINE_ACCENTS = "áéíóúñÁÉÍÓÚÑ";
const INLINE_KEYWORDS = "print|input|if|elif|else|for|while|def|return|import|from|range|append|open|with|try|except|" +
  "assert|class|self|True|False|int|str|float|len|enumerate|copy|isdigit|Decimal|datetime|csv|math|ValueError|SyntaxError|" +
  "NameError|TypeError|IndentationError|KeyError|AssertionError";
const INLINE_PATTERN = new RegExp([
  // Keys: Shift + 2, Alt Gr + º, Ctrl + S, F5, Enter, Tab...
  "(?<key>(?<![\\w" + INLINE_ACCENTS + "])(?:Ctrl|Shift|Alt Gr|Alt|Enter|Tab|F5|Fn|Bloq Num)(?![\\w" + INLINE_ACCENTS +
    "])(?: \\+ (?:[A-Za-z0-9]|º|[a-z]+ [a-z]+ del [0-9])(?![\\w" + INLINE_ACCENTS + "]))*)",
  // Interface labels and menu paths from IDLE and the installer.
  "(?<ui>«(?:File|New File|Save As|Run Module|Run|Install Now|Download Python)»)",
  "(?<code>>>>|python -m idlelib|python\\.org/downloads|(?<![\\w/-])[\\w-]+\\.(?:py|txt|csv|json)(?![\\w])|" +
    "mis-misiones|mision-\\d+|\\bPath\\b|" +
    "(?<![\\w" + INLINE_ACCENTS + "])[A-Za-z_][A-Za-z0-9_.]*\\([^()]*\\)|" +
    "\\b[a-z]+(?:_[a-z0-9]+)+\\b|" +
    "(?<![\\w" + INLINE_ACCENTS + "`])(?:" + INLINE_KEYWORDS + ")(?![\\w" + INLINE_ACCENTS + "]))",
].join("|"), "g");

/** Escape text and show code fragments and keys with their own look. */
function inlineMarkup(value) {
  const parts = String(value).split("`");
  if (parts.length % 2 === 0) return escapeHtml(String(value).replace(/`/g, ""));
  let markup = "";
  parts.forEach((part, index) => {
    if (index % 2) { markup += '<code class="inline-code">' + escapeHtml(part) + "</code>"; return; }
    let last = 0;
    for (const match of part.matchAll(INLINE_PATTERN)) {
      markup += escapeHtml(part.slice(last, match.index));
      const kind = match.groups.key ? "key" : "code";
      const text = match.groups.ui ? match[0].slice(1, -1) : match[0];
      markup += kind === "key" ? '<kbd class="inline-key">' + escapeHtml(text) + "</kbd>" :
        '<code class="inline-code">' + escapeHtml(text) + "</code>";
      last = match.index + match[0].length;
    }
    markup += escapeHtml(part.slice(last));
  });
  return markup;
}
