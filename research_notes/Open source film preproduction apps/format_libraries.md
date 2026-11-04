# Open-source screenplay format libraries and infrastructure for Slate (status as of 2026-11-03)

Method: npm registry metadata (latest version, publish date, license, unpacked size, dependencies) was pulled directly from registry.npmjs.org on 2026-11-03. GitHub stars and push dates come from the GitHub REST API, which hit its rate limit partway through, so some repos lack those numbers. README claims were checked with page fetches. "Unpacked size" is the npm tarball size on disk, not a minified browser bundle.

## Fountain parsers/renderers in JS: which are maintained and spec-complete?

### Takeaway
The only JS Fountain parser with real, current use is **fountain-js** (TypeScript, MIT, no dependencies, about 42k downloads a month). **screenplay-tools** (wildwinter, MIT) is the most feature-complete newcomer: it parses and writes both Fountain and FDX, and has a JS ESM build. Everything else is either a stale Fountain.js fork or a parser locked inside an app (Afterwriting, BetterFountain). Slate's hand-written parser is probably not worth replacing, but fountain-js and screenplay-tools are both good test oracles and sources of edge cases.

### Cited Findings
- **fountain-js** (jonnygreenwald): v1.2.4, published 2023-11-14, MIT, 110 KB unpacked, zero runtime dependencies; repo pushed 2025-11-18, 50 stars, TypeScript — [npm](https://www.npmjs.com/package/fountain-js), [GitHub](https://github.com/jonnygreenwald/fountain-js). 42,163 downloads from 2026-10-04 to 2026-11-02 — [npm downloads API](https://api.npmjs.org/downloads/point/last-month/fountain-js).
  - Claims support "up to v 1.1 of the Fountain syntax". It emits tokens for dual dialogue (`dual_dialogue_begin/end`, `dual: 'left'|'right'`), centered text, page breaks and title page. `parse(text, true)` returns `{title, html:{title_page, script}, tokens}`. Tokens carry `type, text, scene_number, dual, depth`. Since v1.1.2, inline markup is preserved in token text, and `InlineLexer` can be subclassed — [README](https://github.com/jonnygreenwald/fountain-js).
  - The older **Fountain.ts** package (v1.0.2, 2022) is deprecated in favor of fountain-js — [README](https://github.com/jonnygreenwald/fountain-js).
- **screenplay-tools** (wildwinter / Ian Thomas): MIT, © 2024. Implementations in JS (ES module plus minified browser build), Python, C# and C++. Parses and writes Fountain covering title page, scene headings with scene numbers, action, centered text, characters with extensions and dual-dialogue markers, parentheticals, lyrics, transitions, page breaks, sections (up to 6 levels), synopses, notes and boneyard. Adds an optional tag extension (`useTags`), a `CallbackParser` and a `FormatHelper` that turns bold, italic and underline into HTML. Has an FDX Parser and Writer, though the README API section documents them only for C# — [GitHub README](https://github.com/wildwinter/screenplay-tools). Repo pushed 2026-10-20, 29 stars, root package.json v0.0.10 — [GitHub API](https://api.github.com/repos/wildwinter/screenplay-tools), [package.json](https://raw.githubusercontent.com/wildwinter/screenplay-tools/main/package.json). I found no npm package under `screenplay-tools` or `@wildwinter/screenplay-tools`, so it is distributed through GitHub releases — [npm registry](https://registry.npmjs.org/screenplay-tools).
- **Afterwriting** (ifrost/afterwriting-labs): npm `afterwriting` v1.17.3, last published 2020-12-28, though the repo was pushed 2026-01-28. 280 stars, 79 open issues, 19 open PRs. README states MIT, © Piotr Jamróz 2015–2020 (GitHub's API detects no license file). Features include Fountain-to-PDF conversion, .fdx import and a Node CLI — [GitHub](https://github.com/ifrost/afterwriting-labs), [npm](https://www.npmjs.com/package/afterwriting). Its npm dependencies include `aw-parser` 0.1.1, `aw-liner` 0.0.2, `pdfkit` ^0.11.0, jQuery, d3 v3, handlebars and protoplast, so the parser and the pagination "liner" are published as separate packages — [npm registry](https://registry.npmjs.org/afterwriting/latest). It had 3,249 downloads in the last month — [npm downloads](https://api.npmjs.org/downloads/point/last-month/afterwriting).
- **BetterFountain** (VS Code extension): MIT, 455 stars, pushed 2026-09-11. Parsing and PDF generation are "based on" Afterwriting. It advertises "industry-standard PDF generation" with scene and section bookmarks. PDF import is listed as a TODO — [GitHub](https://github.com/piersdeseilligny/betterfountain).
- **Fountain.js** (mattdaly): MIT, 271 stars, last push 2024-03-30. This is the original JS port — [GitHub](https://github.com/mattdaly/Fountain.js). Forks: **js-fountain** v3.0.1 (2021-04-05) and **ftnbuild** v0.2.0 (2021-10-24), both by mgmarlow, both MIT and both dormant — [npm js-fountain](https://www.npmjs.com/package/js-fountain), [npm ftnbuild](https://www.npmjs.com/package/ftnbuild). **@thombruce/fountainjs** v2.2.2 was published 2025-11-04, MIT — [npm](https://www.npmjs.com/package/@thombruce/fountainjs).
- **screenplay-js** (Guernsey-Creative): v0.0.18, 2022-01-26, MIT, 2 stars, 477 downloads a month. Describes itself as a TypeScript Fountain parser plus an FDX-to-Fountain converter, based on fountain-js and Afterwriting. Its only dependency is uuid — [npm](https://www.npmjs.com/package/screenplay-js), [GitHub](https://github.com/Guernsey-Creative/screenplay-js).
- **fountain-parser** (oparaskos): v1.1.2, 2023-11-22. npm lists MIT but GitHub detects MPL-2.0, a conflict worth noting. 0 stars, 53 downloads a month — [npm](https://www.npmjs.com/package/fountain-parser), [GitHub](https://github.com/oparaskos/fountain-parser).
- **jouvence**: npm v1.0.1, 2015-03-29, BSD; the GitHub repo now returns 404 — [npm](https://www.npmjs.com/package/jouvence). The npm package `fountain` (v0.3.4, 2013) is abandoned — [npm](https://www.npmjs.com/package/fountain).
- **nyousefi/Fountain** is the Objective-C reference implementation from the spec authors: MIT, 688 stars, last push 2023-06-10 — [GitHub](https://github.com/nyousefi/Fountain).

### Inferences
- For spec completeness, screenplay-tools is the only JS option whose README explicitly lists all of boneyard, notes, sections, synopses, lyrics and dual dialogue. The fountain-js README does not document boneyard, notes, sections or synopses, though it may handle them.
- Recommendation: **study, don't adopt**. Slate is single-file vanilla JS, so pulling in a parser means vendoring a build. The best use of fountain-js or screenplay-tools is as a differential-testing oracle: run both parsers over a corpus and diff the element types. screenplay-tools' 6-level sections and tag extension are ideas worth copying.
- Afterwriting's `aw-parser` and `aw-liner` are worth reading for pagination logic, but they are 2020-era packages with old dependencies.

### Gaps
- I did not run any parser against a conformance corpus, so spec-completeness claims come from READMEs. Fountain has no official test suite that I found.
- I could not confirm the fountain-js changelog contents, the Fountain 1.1 vs 2.0 spec status on fountain.io, or minified bundle sizes.
- **Wrap** (Wraparound/wrap, a Go Fountain-to-PDF tool) returned "Moved Permanently" from the GitHub API and I could not verify its new location or status.

## FDX readers/writers and other-format converters

### Takeaway
No standalone, maintained JS FDX library exists on npm. The usable JS-adjacent options are screenplay-tools (FDX parse and write), screenplay-js (FDX to Fountain only), Afterwriting (FDX import) and Featherweight (FDX output from PDFs). Slate's own FDX code is on par with or ahead of most of these, and FDX is simple XML (DOMParser and XMLSerializer are enough). For other formats, Python and desktop tools dominate.

### Cited Findings
- screenplay-tools: `FDX.Parser` reads Final Draft XML into a `Script` and `FDX.Writer` writes it out. The README documents this API only for C#, so JS parity is unverified — [GitHub](https://github.com/wildwinter/screenplay-tools).
- screenplay-js: converts Final Draft (.fdx) to Fountain, then Fountain to HTML — [npm](https://www.npmjs.com/package/screenplay-js).
- Afterwriting: imports .fdx; export is not mentioned — [GitHub](https://github.com/ifrost/afterwriting-labs).
- **screenplain** (vilcans): Python, MIT, 187 stars, pushed 2026-04-28. Takes Fountain input and outputs FDX, HTML or PDF. Online version at screenplain.com — [GitHub](https://github.com/vilcans/screenplain), [GitHub API](https://api.github.com/repos/vilcans/screenplain).
- **Trelby**: Python desktop screenwriting app, GPL-2.0, 351 stars, pushed 2025-10-21 — [GitHub](https://github.com/trelby/trelby). Its GPL license makes copying code into Slate a licensing concern.
- **ftn2xml** (C/C++): Fountain to XML, HTML or FDX, with PDF via PoDoFo — [GitHub](https://github.com/xiota/ftn2xml). **fountain-py**: Python, renders Fountain to HTML, FDX, text or PDF — [PyPI](https://pypi.org/project/fountain-py/).
- npm searches for `fdx2fountain`, `fdx-to-fountain`, `fdx-parser` and `fountain-to-fdx` returned no packages — [npm registry](https://registry.npmjs.org/fdx2fountain).

### Inferences
- Recommendation: **keep Slate's own FDX code**. Use screenplay-tools' FDX writer and screenplain's FDX output as reference outputs to check which tags and attributes real files use (for example dual dialogue and scene numbers).

### Gaps
- I found no maintained open-source JS converters for Highland (.highland), Celtx, WriterDuet or Fade In formats, and did not verify those formats' internal structure. This is not researched; any claim about them would be from memory.
- I did not verify Trelby's import and export format list.

## Screenplay PDF generation: exact industry pagination vs. browser print

### Takeaway
The proven JS route to industry pagination is the Afterwriting approach: a "liner" that breaks elements into fixed-width Courier lines and paginates them by rule (with MORE/CONT'D handling), then draws them with **pdfkit**. BetterFountain inherits this. Browser print cannot guarantee page breaks that match Final Draft. If Slate needs exact pagination, the right move is to write its own line-based paginator (Courier 12pt has fixed metrics) and either keep print/CSS output with explicit page breaks or render through pdfkit or jsPDF.

### Cited Findings
- Afterwriting depends on `pdfkit` ^0.11.0 plus `aw-liner` for pagination — [npm registry](https://registry.npmjs.org/afterwriting/latest). BetterFountain's PDF generation is based on Afterwriting, with scene and section PDF bookmarks, and its PDF preview matches the exported PDF including page breaks — [GitHub](https://github.com/piersdeseilligny/betterfountain).
- **pdfkit**: v0.20.2, 2026-08-30, MIT, 10.5 MB unpacked, dependencies fontkit, linebreak, fflate, png-js and @noble/* — [npm](https://www.npmjs.com/package/pdfkit). It needs a stream-to-Blob shim in browsers; `blob-stream` was last published in 2014 — [npm](https://www.npmjs.com/package/blob-stream).
- **pdfmake**: v0.3.13, 2026-10-25, MIT, 12 MB, built on pdfkit — [npm](https://www.npmjs.com/package/pdfmake).
- **jsPDF**: v4.2.1, 2026-03-17, MIT, 30 MB unpacked (multiple dist builds), includes standard Courier font — [npm](https://www.npmjs.com/package/jspdf).
- **pdf-lib**: v1.17.1, last published 2021-11-06, MIT, effectively unmaintained — [npm](https://www.npmjs.com/package/pdf-lib).
- Non-JS references: screenplain outputs PDF (Python) — [GitHub](https://github.com/vilcans/screenplain); ftn2xml uses PoDoFo — [GitHub](https://github.com/xiota/ftn2xml); NFountain is .NET with experimental PDF output — [GitHub](https://github.com/mrdrbob/NFountain); Scenewriter is a Fountain-to-PDF CLI — [GitHub](https://github.com/Joeboy/scenewriter).

### Inferences
- Recommendation: **study aw-liner** (pagination rules) and **consider jsPDF** if Slate wants a direct PDF download without a print dialog. jsPDF works in the browser without stream shims and has built-in Courier, so no font embedding is needed for standard scripts. The pagination logic, not the PDF library, is the hard part, and none of these libraries provide it.
- Electron also offers `webContents.printToPDF`, which would make print-based output deterministic within one Chromium version. It still does not solve MORE/CONT'D splits.

### Gaps
- I did not read aw-liner's source to list its exact rules (orphan and widow handling, dialogue splits, scene heading keep-with-next), and found no benchmark comparing Afterwriting page counts with Final Draft.

## PDF-to-screenplay import: projects and accuracy techniques

### Takeaway
Two serious open-source projects exist. **Featherweight** (2026, MIT, Node) outputs Fountain, FDX or JSON, but relies on a native Rust binary, so it cannot run in the browser part of Slate. **screenplay-pdf-to-json** (Python, MIT) uses pdfminer and spaCy. Slate's own pdf.js approach (classifying lines by x-position) matches the standard technique. The useful lessons are around title-page/front-matter skipping, dual dialogue and OCR detection.

### Cited Findings
- **Featherweight** (bantamhq): npm `@bantam-hq/featherweight` v0.1.3 (created 2026-08-06, latest 2026-08-08), MIT, © 2026. Converts screenplay PDFs to Fountain, FDX or JSON; recognizes title page, scene headings, action, characters, parentheticals, dialogue, transitions and dual dialogue; preserves scene numbers. Requires Node ≥ 24. Claims a 120-page feature converts in about 177 ms, with no LLM or external service. No accuracy figures are given, and its classification method is not documented — [GitHub](https://github.com/bantamhq/featherweight), [npm registry](https://registry.npmjs.org/@bantam-hq/featherweight).
  - Its only dependency is `@firecrawl/pdf-inspector`. That package (v1.25.2, 2026-09-28, MIT) ships as napi native binaries per platform, including win32-x64-msvc. It is not WASM, so it is usable in Electron's main process but not in a renderer or a plain browser — [npm registry](https://registry.npmjs.org/@firecrawl/pdf-inspector/latest). Featherweight's README also says its inspection step reports pages that need OCR — [search summary of the README](https://github.com/bantamhq/featherweight).
- **screenplay-pdf-to-json** (SMASH-CUT): Python, MIT. Uses pdfminer.six for extraction and spaCy to detect character snippets. Outputs per-page JSON with scene region, location and time; ACTION and TRANSITION entries with x/y positions; CHARACTER modifiers (V.O., O.S., CONT'D); parentheticals as separate entries; a DUAL_DIALOGUE type with two characters; and front matter grouped as FIRST_PAGES. Its README says it "works well for 'clean' PDF screenplays, not OCR PDFs". The user must give a start page (`--start`), and detecting the screenplay's end is still a TODO — [GitHub](https://github.com/SMASH-CUT/screenplay-pdf-to-json).
- An LLM-based alternative exists (`screenplay-to-json-openai`, uses OpenAI vision and needs a paid API key) — [PyPI](https://pypi.org/project/screenplay-to-json-openai).
- OpenDraft also lists PDF import, but its method is not documented — [GitHub](https://github.com/Proteus-Technologies-Private-Limited/OpenDraft).
- **pdfjs-dist**: v6.5.438, published 2026-11-01, Apache-2.0, actively maintained — [npm](https://www.npmjs.com/package/pdfjs-dist). **unpdf** (v2.1.0, 2026-10-30, MIT) wraps pdf.js for serverless and Node — [npm](https://www.npmjs.com/package/unpdf).

### Inferences
- Recommendation: **keep pdf.js; study Featherweight's source** for its classification rules, since it is MIT and the newest effort. Featherweight is only an adoption candidate if Slate adds a Node-side import path in Electron; it would not work in the web build.
- Techniques worth borrowing: an explicit start-page and front-matter detection step (SMASH-CUT), dual dialogue detection as two character cues on the same y-position at different x-positions (implied by both tools' DUAL_DIALOGUE output), and an "is this page scanned?" check that warns the user before attempting classification.

### Gaps
- Neither project publishes accuracy benchmarks. I did not read their source for specific x-coordinate thresholds or revision-asterisk and page-header handling.

## Editor frameworks and collaboration/CRDT layers

### Takeaway
No reusable "screenplay mode" package exists for ProseMirror, TipTap, Lexical or CodeMirror on npm. Screenplay apps build their own node schemas. The clearest open-source reference is **OpenDraft** (MIT): TipTap plus Yjs over a Hocuspocus server, with FDX, Fountain and PDF import/export, packaged with Tauri. For a future Slate collaboration feature, **Yjs** is the practical CRDT: it has a 2.3 MB package, bindings for ProseMirror and CodeMirror 6, and IndexedDB persistence. Moving off contenteditable is a rewrite, so it is only worth it if collaboration becomes a real goal.

### Cited Findings
- **ProseMirror**: prosemirror-model v1.25.12 (2026-09-21), MIT; prosemirror-view is 0.9 MB unpacked — [npm](https://www.npmjs.com/package/prosemirror-model). **TipTap**: @tiptap/core v3.32.2 (2026-10-30), MIT core, with some paid "pro" extensions — [npm](https://www.npmjs.com/package/@tiptap/core), [Liveblocks comparison](https://liveblocks.io/blog/which-rich-text-editor-framework-should-you-choose-in-2025.md). **Lexical**: v0.53.0 (2026-10-28), MIT, still pre-1.0 and React-first but framework-agnostic — [npm](https://www.npmjs.com/package/lexical). **CodeMirror 6**: @codemirror/state v6.7.6 (2026-09-22), MIT — [npm](https://www.npmjs.com/package/@codemirror/state).
- npm searches for `prosemirror-fountain`, `codemirror-lang-fountain`, `lezer-fountain` and `@codemirror/lang-fountain` returned no packages — [npm registry](https://registry.npmjs.org/codemirror-lang-fountain).
- **Yjs**: v13.6.33 (2026-09-23), MIT, its only dependency is lib0 — [npm](https://www.npmjs.com/package/yjs). Bindings: y-prosemirror v1.3.7 (2025-07-03) — [npm](https://www.npmjs.com/package/y-prosemirror); y-codemirror.next v0.3.6 (2026-08-18) — [npm](https://www.npmjs.com/package/y-codemirror.next); y-indexeddb v9.0.12 (2023-11-02, stable but quiet) — [npm](https://www.npmjs.com/package/y-indexeddb).
- **Automerge**: @automerge/automerge v3.5.0 (2026-09-16), MIT, 47.5 MB unpacked (WASM builds) — [npm](https://www.npmjs.com/package/@automerge/automerge).
- **OpenDraft**: MIT, React 19, TypeScript, Vite, TipTap; Hocuspocus plus Yjs for collaboration; FastAPI backend; per-project Git version control; FDX, Fountain and PDF import/export; Tauri 2 desktop builds; 80 stars, 835 commits, release 2.8.2 — [GitHub](https://github.com/Proteus-Technologies-Private-Limited/OpenDraft).
- **Bulwriter**: AGPL, ProseMirror frontend with a Go Yjs WebSocket relay — [GitHub](https://github.com/somunaexe/Bulwriter). **ProLoser/screenwriter**: MIT, simple online app with realtime collaboration (sync library not verified) — [GitHub](https://github.com/ProLoser/screenwriter). An Editor.js collaborative screenplay prototype also exists — [GitHub](https://github.com/AlexVFX20032/EditorJS-Realtime-Collaborative-Screenplay-editor). **OpenScript** is mostly a specification, with Yjs plus Hocuspocus planned — [GitHub](https://github.com/Gouravsiddoju/OpenScript).

### Inferences
- Recommendation: **study OpenDraft** (MIT, closest analog: screenplay schema in TipTap, FDX/Fountain/PDF, desktop packaging). **Defer adopting an editor framework.** If collaboration is pursued, the lowest-change route is CodeMirror 6 with Fountain text as the source of truth (Slate already parses Fountain) plus y-codemirror.next. A ProseMirror or TipTap node-per-element rewrite is the higher-effort alternative. Yjs is preferred over Automerge on size and editor bindings. Yjs's UndoManager would replace Slate's custom undo/redo in either case.
- Automerge's 47.5 MB package (WASM) is heavy for a single-file app.

### Gaps
- I did not inspect OpenDraft's source for its TipTap schema or its PDF pagination method. Bulwriter and ProLoser/screenwriter were verified only from search snippets.
- I found no maintained Fountain grammar for CodeMirror 6 (Lezer). BetterFountain's VS Code TextMate grammar may be portable but was not checked.
