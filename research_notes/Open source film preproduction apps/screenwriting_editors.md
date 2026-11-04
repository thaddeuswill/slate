# Open-Source Screenwriting Editors Comparable to Slate (status as of Nov 2026)

Method note: repo stats (stars, license SPDX id, primary language, last push date, archived flag) were pulled from the public GitHub REST API on 2026-11-03 (`api.github.com/repos/{owner}/{repo}`). "Last push" means the last commit to any branch, not a release. The API then rate-limited, so latest release tags and dates were NOT collected (see Gaps). Feature claims come from each project's README or website as cited.

## Which open-source screenwriting editors exist and what is their status?

### Takeaway
The field is small. The actively maintained full editors are Beat (macOS/iOS, GPL-3), Story Architect / Starc (C++/Qt, GPL-3), Scrite (C++/Qt, GPL-3), Trelby (Python, GPL-2), OpenDraft (React/TipTap/Tauri, MIT, new in 2026) and Better Fountain (VS Code extension, MIT). JS-reusable, permissively licensed code is concentrated in afterwriting (MIT), Better Fountain (MIT, a TypeScript port of afterwriting's pagination), Fountain.js / fountain-js (MIT parsers), screenplay-tools (MIT, JS FDX reader/writer) and OpenDraft (MIT). KIT Scenarist is archived; it has been replaced by Starc.

### Cited Findings

Catalog. Stars and dates are from the GitHub API as of 2026-11-03.

| Project | Repo | License | Stack | Last push | Stars | Notes |
|---|---|---|---|---|---|---|
| Beat | https://github.com/lmparppei/Beat | GPL-3.0 (SPDX shows NOASSERTION; LICENSE.md is GPLv3 text) | Objective-C/Swift, macOS + iOS | 2026-11-02 | 364 | Very active |
| Story Architect (Starc) | https://github.com/story-apps/starc | GPL-3.0 | C++/Qt | 2026-11-03 | 406 | Very active; successor of KIT Scenarist |
| KIT Scenarist | https://github.com/dimkanovikov/KITScenarist | GPL-3.0 | C++/Qt | 2023-08-01 | 352 | **Archived** |
| Scrite | https://github.com/teriflix/scrite | GPL-3.0 for the source (multi-section LICENSE.txt; SPDX NOASSERTION) | C++/Qt/QML | 2026-11-02 | 375 | Very active |
| Trelby | https://github.com/trelby/trelby | GPL-2.0 | Python 3 / wxPython | 2025-10-21 | 351 | Maintained, slow cadence |
| Better Fountain (VS Code) | https://github.com/piersdeseilligny/betterfountain | MIT | TypeScript | 2026-09-11 | 455 | Active |
| afterwriting labs | https://github.com/ifrost/afterwriting-labs | MIT (README; no LICENSE file detected by API) | JavaScript (RequireJS, jsPDF, pdf.js) | 2026-01-28 | 280 | Low activity; v1.17.3 in package.json |
| OpenDraft | https://github.com/Proteus-Technologies-Private-Limited/OpenDraft | MIT | React 19 + TS + TipTap; FastAPI backend; Tauri 2 desktop | created 2026-03-28; pushed 2026-11-03 | 80 | New, very active; v2.8.2 download filenames |
| Screenplain | https://github.com/vilcans/screenplain | MIT | Python | 2026-04-28 | 187 | Fountain to PDF/FDX/HTML converter, not an editor |
| Fountain (ref. impl.) | https://github.com/nyousefi/Fountain | MIT | Objective-C | 2023-06-10 | 688 | Historically important reference parser |
| Fountain.js | https://github.com/mattdaly/Fountain.js | MIT | JavaScript | 2024-03-30 | 271 | Classic JS regex parser |
| fountain-js | https://github.com/jonnygreenwald/fountain-js | MIT | TypeScript | 2025-11-18 | 50 | Maintained successor parser (npm) |
| screenplay-tools | https://github.com/wildwinter/screenplay-tools | MIT | C++, JS, Python, C# | 2026-10-20 | 29 | Fountain + FDX parse/write libraries |
| fountain-mode (Emacs) | https://github.com/rnkn/fountain-mode | GPL-3.0 | Emacs Lisp | 2024-11-06 | 444 | Editor mode with export |
| Wrap | https://github.com/eprovst/wrap | GPL-3.0 | Go | 2026-08-03 | 67 | Fountain-superset export to HTML/PDF (not the commercial "Wrap") |
| scripttool | https://github.com/rsdoiel/scripttool | AGPL-3.0 | Go | 2026-10-30 | 46 | Converts between FDX, Fountain, OSF and FadeIn |
| fdx (Go) | https://github.com/rsdoiel/fdx | AGPL-3.0 | Go | 2026-10-20 | 29 | Experimental FDX package |
| Meander | https://github.com/lichendust/meander | GPL-3.0 | Go | 2026-02-21 | 20 | "Production screenplays and manuscripts" utility |
| screenwriter | https://github.com/ProLoser/screenwriter | MIT | JavaScript | 2026-06-12 | 71 | Simple online Final Draft clone |
| obsidian-fountain | https://github.com/bgrundmann/obsidian-fountain | MIT | TypeScript | 2026-08-29 | 34 | Obsidian plugin |
| fountain-screenwriter (Obsidian) | https://github.com/tlorien/fountain-screenwriter | GPL-3.0 | TypeScript | 2025-08-29 | 21 | Built on fountain-js |
| Jouvence | https://github.com/ludovicchabant/Jouvence | (NOASSERTION, unverified) | Python | 2020-09-03 | 12 | Dormant |
| Scenarly | https://github.com/Lycoon/scenarly | **Proprietary, "All rights reserved"** | TypeScript | 2026-10-22 | 55 | Public source but NOT open source. Do not copy. |

- Source for every row above: the GitHub REST API (`api.github.com/repos/...`) queried 2026-11-03. The topic list came from the [GitHub topic:screenwriting search](https://github.com/topics/screenwriting).
- Beat describes itself as "fully open source under GPL" and "licensed under GPL (v3)". It runs on macOS and iOS; the iOS version "supports a limited set of features" and plugins "remain macOS-exclusive". No Windows build is mentioned — [Beat README](https://github.com/lmparppei/Beat)
- Starc's README says it is distributed under GPL v3 and that "Third-party components and optional modules may have their own license terms". The community build uses pdfhummus and pdftextextraction submodules — [starc README](https://github.com/story-apps/starc). Its website lists Mac, Windows and iPhone, a free version with no project limit, and paid Personal/Educational licenses plus an AI assistant — [starc.app](https://starc.app/)
- Scrite's LICENSE.txt has four sections. The first is "GNU General Public License v3 (GPLv3) - Governs the Scrite source code" — [Scrite LICENSE.txt](https://github.com/teriflix/scrite)
- Trelby's README says the project was "recently updated by merging the fork" limburgher/trelby. The merge brought a Python 3 conversion and Windows packaging ("still in progress"). Trelby installs via dnf, Chocolatey, Flatpak and PyPI — [Trelby README](https://github.com/trelby/trelby)
- OpenDraft calls itself a "Free, open-source screenwriting software — a modern alternative to Final Draft". Stack: React 19, TypeScript, Vite, TipTap; Python 3.12 FastAPI backend; Tauri 2 desktop; Yjs/Hocuspocus collaboration; per-project Git version control — [OpenDraft README](https://github.com/Proteus-Technologies-Private-Limited/OpenDraft)
- Scenarly's LICENSE reads "Copyright © 2026 Scenarly. All rights reserved. No part of this software… may be reproduced" — [Scenarly repo](https://github.com/Lycoon/scenarly)
- The GitHub topic also returns many 2026 AI "short-drama" skill packs (for example zenstory-ai/drama-skills). These are not editors and are out of scope — [GitHub topic search](https://github.com/topics/screenwriting)
- A few tiny in-browser editors from 2026 have 0–2 stars and are unvetted: nanashi86/DraftLine (MIT), unsubbed/script (AGPL-3.0), and pauyon/tabula (no license; "PDF export, Fountain/FDX interop, and revision tracking") — GitHub repository search for "screenplay editor fdx", 2026-11-03.

### Inferences
- OpenDraft is the closest open-source analogue to Slate: a web-tech Final Draft clone with autocomplete, table read, FDX/PDF import and a desktop wrapper. It is also MIT-licensed, so its code can legally be copied into Slate.
- Beat is the most feature-complete open-source editor for revisions and FDX, but it is GPL-3 and Objective-C. Treat it as an idea and reference source only.
- No serious open-source Windows or web editor exposes FDX revision colors, locked pages and A-pages together with a permissive license.

### Gaps
- Latest release tags and dates were not collected: the GitHub API returned "rate limit exceeded" after about 60 calls. OpenDraft 2.8.2 is inferred from download filenames.
- Highland is proprietary, so it is out of scope. Fade In and the commercial Wrap are also closed, and no open-source "Fade In alternative" beyond those listed was identified.
- The fountain.io apps list was not fetched.

## Which handle FDX import/export, PDF import, revision marks and locked pages, and how?

### Takeaway
FDX import/export is common: Beat, Trelby, Starc, Scrite, OpenDraft, Screenplain (export only), screenplay-tools, scripttool and Better Fountain (no FDX found in its README). PDF import is rare; only OpenDraft and Starc claim it. Among open-source tools, only Beat claims revision generations carried through FDX. No surveyed project documents locked pages or A-page numbering.

### Cited Findings
- Beat offers "Final Draft import / export, including revisions, outline items and soon tags". It also lists "Revision generation management", automatic scene numbering, a title page editor, a JavaScript plugin API, and "Version control (contained inside file metadata)" — [Beat README](https://github.com/lmparppei/Beat)
- Trelby imports text, FDX, Celtx, Fountain, Adobe Story (.astx) and Fade In (.fadein). It exports PDF, text, HTML, RTF, FDX and Fountain. It also has script comparison, a 200,000-name database, auto-completion, and a configurable PDF generator with font embedding and watermarks — [trelby.org](https://www.trelby.org/)
- Starc lists "Final Draft, Fountain, DOCX, ODT, PDF, Celtx, Trelby, and KIT Scenarist formats", with "availability varies by document type and direction". It bundles pdfhummus (PDF writing) and pdftextextraction (PDF reading) — [starc README](https://github.com/story-apps/starc)
- Scrite can "Import screenplays from FinalDraft and HTML formats" and "Export screenplays to PDF, FinalDraft, Text and HTML formats" — [Scrite README](https://github.com/teriflix/scrite)
- OpenDraft says: "Import from Final Draft (.fdx), Fountain, or PDF. Export anytime". Its comparison table claims PDF import, watermarked/password PDF and production reports, and says the PDF import row is "as of October 2026". It also has autocomplete for character names, scene headings and transitions, search & replace, and a table read "using your device's own voices, free on-device AI voices, or an AI provider". Its README does not mention revision colors, locked pages, dual dialogue or MORE/CONT'D — [OpenDraft README](https://github.com/Proteus-Technologies-Private-Limited/OpenDraft)
- Screenplain outputs FDX, HTML and PDF from Fountain, and has a visual PDF regression test that uses diff-pdf — [Screenplain README](https://github.com/vilcans/screenplain)
- screenplay-tools ships `FDX.Parser` (FDX XML to a format-agnostic `Script` object) and `FDX.Writer` (`Script` to FDX), plus a Fountain parser and writer, in C++, JS, Python and C#, under MIT — [screenplay-tools README](https://github.com/wildwinter/screenplay-tools)
- scripttool has CLI conversions fdx2fountain, fountain2fdx, fadein2fountain and osf2fountain, among others — [scripttool README](https://github.com/rsdoiel/scripttool)
- Better Fountain highlights "Industry-standard PDF generation" with scene and section PDF bookmarks and character highlighting. It has an exact PDF preview plus a live HTML approximation that "doesn't include page breaks". Its src tree includes `Completion.ts` (autocomplete) and `scenenumbering.ts` — [Better Fountain README](https://github.com/piersdeseilligny/betterfountain), with the source tree from the GitHub API.
- afterwriting bundles jsPDF (`js/libs/jspdf.js`) for PDF output and pdf.js for preview (`js/utils/pdfmaker.js`, `js/utils/pdfjsviewer.js`) — [afterwriting repo tree](https://github.com/ifrost/afterwriting-labs)

### Inferences
- For FDX in Slate, the lowest-effort legal route is the MIT screenplay-tools JS module, or OpenDraft's MIT importer as a reference. screenplay-tools may not round-trip revision attributes; check that before relying on it.
- For revision colors and locked pages, the only open-source reference is Beat, which is GPL-3. Study its FDX revision handling for ideas only. FDX stores revisions as a `Revisions` element and per-`Text` `RevisionID` attributes; this is from general FDX knowledge and was not verified against Beat's code in this session.
- PDF import is usually done by extracting positioned text and classifying elements by x-indent. Starc uses pdftextextraction. In JS, pdf.js `getTextContent()` gives the same coordinates. This is an inference; neither implementation was read.

### Gaps
- I did not read Beat's or Starc's source to confirm how revisions, locked pages or A-pages are modelled. GitHub code search was rate-limited.
- I could not tell from its README whether OpenDraft supports revision colors, locked pages or dual dialogue. Its full feature list and manual were not fetched.
- I found no open-source project that documents locked pages or A-page numbering.

## How do they paginate screenplays, and which implementations are reusable in JS?

### Takeaway
afterwriting's `liner.js` is the canonical reusable JS pagination engine. It is MIT, about 300 lines, and handles line wrapping, widow and orphan rules, MORE/CONT'D, and splitting dual dialogue across pages. Better Fountain carries a TypeScript port of it (`src/pdf/liner.ts`, also MIT). Neither handles A-pages or locked pages.

### Cited Findings
- afterwriting print profiles: A4 uses `lines_per_page: 57`; US Letter uses `lines_per_page = 55` on an 8.5×11 page. Font 12pt, `font_width 0.1in`, `font_height 0.1667in` (6 lines per inch), top margin 1.0in, left margin 1.5in, right margin 1in. Characters per line by element: action, scene heading and transition 61 on Letter (58 on A4); character 33; parenthetical 26; dialogue 36. Left "feed" in inches: action 1.5, character 3.5, parenthetical 3, dialogue 2.5. `dual_max_factor: 0.75`. Title page starts at 3.5in, with notes and copyright on the left and draft date and contact on the right — [afterwriting js/utils/print-profiles.js](https://github.com/ifrost/afterwriting-labs/blob/master/js/utils/print-profiles.js)
- afterwriting `liner.js` word wrap (`split_text`): if the text exceeds `max` characters, it breaks at the last space within `max+1`. With no space it hard-breaks at `max-1`. Each line records start and end character indexes so the editor can map a line back to its source — [afterwriting js/utils/liner.js](https://github.com/ifrost/afterwriting-labs/blob/master/js/utils/liner.js)
- afterwriting `default_breaker` rules, which decide whether a page may break after a line:
  - never after a scene heading;
  - never right before a transition;
  - action blocks of 1–3 lines break only after the last line;
  - action blocks of 4 or more lines never break after the first or the second-to-last line;
  - dialogue split mid-speech (when `split_dialogue` is set and the line is not dual) inserts `(MORE)` as a parenthetical, then repeats the character cue with `(CONT'D)` on the next page (and avoids a double CONT'D);
  - in dual dialogue, the right column is sliced to match and also gets MORE and CONT'D;
  - never between a character cue or parenthetical and the dialogue that follows.

  `break_lines` honours explicit `page_break` tokens and walks back from `lines_per_page` to the nearest allowed break. Both texts are configurable via `cfg.text_more` and `cfg.text_contd` — [afterwriting js/utils/liner.js](https://github.com/ifrost/afterwriting-labs/blob/master/js/utils/liner.js)
- Better Fountain's `src/pdf/` contains `liner.ts`, `pdfmaker.ts`, `pdf.ts` and `print.ts`, plus `src/afterwriting-parser.ts`, showing it is built on afterwriting's parser and pager. It bundles the Courier Prime TTFs. MIT — [Better Fountain repo tree](https://github.com/piersdeseilligny/betterfountain)
- Trelby: "The editor enforces correct script format and pagination" — [trelby.org](https://www.trelby.org/)
- Beat lists "Page numbers and separators"; the README does not detail its pagination algorithm — [Beat README](https://github.com/lmparppei/Beat)

### Inferences
- Slate can lift afterwriting's `liner.js` breaker rules and the US Letter profile (55 lines, 61/33/26/36 characters) nearly verbatim, keeping the MIT notice. The 55-line Letter figure is a conservative Courier 12 approximation; Final Draft-exact page counts may differ by a few lines.
- A-pages and locked pages are not in any permissive JS pager. Slate would need to add them: freeze page-break positions at lock time, then number overflow pages 12A, 12B and so on. Beat (GPL) is the place to study that, if it implements it at all (unverified).
- The character-count approach (monospace grid) is simpler and more deterministic than measuring the DOM. It is the right fit for a single-file vanilla JS app.

### Gaps
- I did not read Trelby's pagination source (Python, GPL-2) or Beat's (Objective-C, GPL-3), so their rules are not compared here.
- I did not verify whether Better Fountain's `liner.ts` diverges from the original (for example, bug fixes).

## Which licenses allow copying code into a personal app vs only borrowing ideas?

### Takeaway
Code can be copied freely, with the copyright and license notice kept, from the MIT projects: afterwriting, Better Fountain, OpenDraft, Fountain.js, fountain-js, screenplay-tools, Screenplain, nyousefi/Fountain, ProLoser/screenwriter and obsidian-fountain. GPL projects (Beat, Starc, Scrite, Trelby, KIT Scenarist, fountain-mode, Wrap, Meander) and AGPL ones (scripttool, fdx) would make Slate a GPL or AGPL derivative if it is distributed, so for those borrow ideas only. Scenarly is proprietary despite having public source.

### Cited Findings
- afterwriting: "License: MIT. Copyright (c) 2015-2020 Piotr Jamróz" — [afterwriting README](https://github.com/ifrost/afterwriting-labs)
- OpenDraft: "Free forever under the MIT license"; LICENSE "Copyright (c) 2026 Proteus Technologies" — [OpenDraft repo](https://github.com/Proteus-Technologies-Private-Limited/OpenDraft)
- screenplay-tools: "available under the MIT license" — [screenplay-tools README](https://github.com/wildwinter/screenplay-tools)
- Screenplain: "released under the MIT license" — [Screenplain README](https://github.com/vilcans/screenplain)
- Beat GPLv3; Starc GPLv3; Scrite GPLv3 (source section); Trelby GPL-2.0; scripttool and rsdoiel/fdx AGPL-3.0 — see the catalog sources above ([Beat](https://github.com/lmparppei/Beat), [starc](https://github.com/story-apps/starc), [Scrite](https://github.com/teriflix/scrite), [Trelby](https://github.com/trelby/trelby), [scripttool](https://github.com/rsdoiel/scripttool))
- Scenarly: "All rights reserved" — [Scenarly](https://github.com/Lycoon/scenarly)

### Inferences
- GPL obligations apply on distribution. A purely personal copy that is never shared could legally include GPL code. But Slate is packaged as an .exe, and if it is ever shared or published, the whole app would have to be GPL-compatible. The safe rule is MIT code only.
- Bundled third-party assets keep their own licenses. Courier Prime is under the SIL Open Font License (general knowledge, not verified here), jsPDF is MIT, and pdf.js is Apache-2.0. Check each before vendoring.

### Gaps
- afterwriting has no LICENSE file that the GitHub API detects (its license field is null); the MIT grant is only in the README. That is legally sufficient, but worth noting.
- Jouvence's license was not verified (the API returned NOASSERTION).
