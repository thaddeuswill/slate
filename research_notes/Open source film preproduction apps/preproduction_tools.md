# Open-source film pre-production and production-management tools comparable to Slate

Status checked 2026-11-03. Star counts, licenses and last-push dates come from the GitHub REST API (`api.github.com/search/repositories` and `/repos/{r}`) on that date, unless noted. "NOASSERTION" means GitHub could not auto-detect the license file. In those cases the README badge is given instead. Code-level details come from shallow clones of FilmOrganizer, Open Gate, OpenShotDesigner and ScriptBreak, read on that date.

## What open-source alternatives exist to Movie Magic Scheduling/Budgeting, StudioBinder, Celtx, Gorilla, Yamdu?

### Takeaway
In 2026 a wave of small, local-first, account-free open-source suites appeared. They are the closest matches to Slate's breakdown, stripboard, call sheet, contacts and reports feature set. The most complete are OpenShotDesigner (GPL-3.0), Open Gate (GPL-3.0, a fork-and-merge of CineSched), FilmOrganizer (MIT) and Call Sheet Tool (MIT). All are very young (1–36 stars), so maturity is low. The large studio trackers (Kitsu, AYON) are VFX/animation pipeline tools with almost no overlap with stripboard or call-sheet work. I found no mature open-source Movie Magic Budgeting equivalent; budgeting exists only as modules inside the suites.

### Cited Findings

**Full suites (closest to Slate)**
- **OpenShotDesigner** (koosoli/OpenShotDesigner): 36 stars, TypeScript/React, created 2026-08-17, pushed 2026-11-02, v1.5.1. README badge says GPLv3; GitHub API says NOASSERTION. It runs in the browser with "no account, no backend". Features: lined script, floor plan, shot list, storyboard, equipment, stripboard scheduling, call sheets, crew/cast, budget, locations, task board, continuity log and DaVinci Resolve metadata export. Highest feature overlap with Slate, plus camera/floor-plan extras. — [GitHub](https://github.com/koosoli/OpenShotDesigner)
  - Stripboard: shooting days, an unscheduled pool, meal and company-move banners, day totals and conflict warnings. It also produces a one-liner with page totals at every day break, a Day Out of Days (SW/W/WF codes), and a performer time report. — [README](https://github.com/koosoli/OpenShotDesigner)
  - Script handling:
    - Scene numbers come from production sluglines, Fountain `#8A#` forced numbers, or FDX attributes.
    - A deleted scene becomes "SCENE 12 — OMITTED" rather than vanishing.
    - Pages are US Letter at 54 lines or A4 at 58, with (MORE)/(CONT'D) handling.
    - Characters are detected from the script automatically.
    - Source: [README](https://github.com/koosoli/OpenShotDesigner)
  - The budget prices crew rate cards, gear and schedule days automatically ("the budget prices itself from the schedule"). — [README](https://github.com/koosoli/OpenShotDesigner)
  - The code has `ScheduleHealth`/`health.ts` with issue codes `cast_split_across_locations`, `cast_unavailable`, `company_moves`, `day_overruns`, `distant_locations` and `short_turnaround`. A `WhatIfPanel` shows "what dropping it there would do to the two days' pages and time, and to the cast's paid and hold days" while a strip is dragged. It also has `ProductionReportView.tsx` and `StandingCallSheetEditor.tsx`. — [src/domain/scheduling](https://github.com/koosoli/OpenShotDesigner/tree/main/src/domain/scheduling)
- **Open Gate** (opengateapp/opengate): GPL-3.0, TypeScript (React + Zustand + ProseMirror + jsPDF), created 2026-10-17, pushed 2026-11-03, 1 star. The README calls it "Built on CineSched", the alucardGonza fork, and Inwood Park Productions' free tools. — [GitHub](https://github.com/opengateapp/opengate)
  - Covers script writing, breakdown "tag into 21 categories, breakdown sheets, element manager", shot lists, stripboard, DOOD, calendar with .ics export, budget, expenses, call sheets, festivals and a press kit. It is a PWA that works offline. — [README](https://github.com/opengateapp/opengate)
  - Data model ideas:
    - Breakdown tags are "marks on the script text — they move with the words as you edit".
    - Re-importing a revised draft "keeps scene ids for headings that didn't change, so tags, shots and schedule placement survive".
    - Budget "Update from breakdown" builds linked budget lines from DOOD work/hold days, location days and tagged elements.
    - Source: [README](https://github.com/opengateapp/opengate)
  - Code layout: `src/schedule/` holds the "stripboard engine (cascade, conflicts, lock, moves), call sheets, Day Out of Days, iCalendar export", ported from CineSched's ConflictScanner and ScheduleLockScanner. Legacy `.slateline` files still open. — [src/schedule/engine.ts](https://github.com/opengateapp/opengate/blob/main/src/schedule/engine.ts)
- **FilmOrganizer** (nachobust/FilmOrganizer): MIT, TypeScript, desktop installers for Windows .msi/.exe, macOS and Linux (`src-tauri` is not present; the README lists installers). Created 2026-10-19, pushed 2026-11-03, 0 stars. — [GitHub](https://github.com/nachobust/FilmOrganizer)
  - Breakdown table: one row per scene (sheet, scene, I/E, set, D/N, pages in eighths, synopsis, script day, location) with one column per category.
  - Imports PDF, DOCX, FDX, Fountain and TXT.
  - Has an offline rule-based breakdown, an optional AI breakdown (Claude/ChatGPT/Gemini/Ollama/LM Studio), a stripboard and a calendar.
  - Source: [README](https://github.com/nachobust/FilmOrganizer)
- **CineSched** (ChrisTempel/CineSched): Swift/SwiftUI, macOS only. README badge says GPL-v3; API says NOASSERTION. Pushed 2026-10-11, 11 stars. — [GitHub](https://github.com/ChrisTempel/CineSched)
  - Calendar and stripboard scheduling, FDX import, actor unavailable-date ranges "flagged red on the calendar", and auto-meals. — [README](https://github.com/ChrisTempel/CineSched)
  - Per-day call sheets with auto-pulled cast. Renaming an actor or crew member ripples through every call sheet. Projects are portable `.json` files. — [README](https://github.com/ChrisTempel/CineSched)
  - Lineage: Tempel's original → alucardGonza fork (CineSched_D.G.D), which added the stripboard and the "Plan de Rodaje" one-line PDF → this version. — [README](https://github.com/ChrisTempel/CineSched)
- **Call Sheet Tool** (sthielmann/Call-Sheet-Tool): MIT, vanilla JavaScript plus a local Node server. Data lives in plain JSON files (`data/people.json`, `projects.json`, `schedules.json`). Pushed 2026-08-31, 1 star. — [GitHub](https://github.com/sthielmann/Call-Sheet-Tool)
  - Its stack is the most similar to Slate's.
  - Main feature: "you never type clock times". Each shot has a duration, each day has one start time, and every time is computed from the top.
  - Banner rows cover setup, lunch, company move and wrap. "Push to next day" moves the tail of an over-long day.
  - A People Library has tags, "+ Add everyone with tag", and "Shift all times".
  - Revision colours rotate white → blue → pink → yellow → green → goldenrod → buff → salmon → cherry.
  - Weather and sunrise lookups use Open-Meteo and Nominatim, only on click.
  - It has a Live Day on-set mode with a take log, and a Cast Day Summary in HMU order.
  - Source: [README](https://github.com/sthielmann/Call-Sheet-Tool)
- **indieFilmer** (josh-pearman/indiefilmer): MIT, TypeScript, self-hosted Node with SQLite or Postgres. Pushed 2026-04-09, 0 stars. — [GitHub](https://github.com/josh-pearman/indiefilmer)
  - Schedule calendar, PDF call sheets, locations, gear, catering, cast/crew/contacts, and a budget with buckets (Locations, Food, Gear, Talent, Crew, Transport, Post, Misc) plus expenses. — [README](https://github.com/josh-pearman/indiefilmer)
- **OSFPM, Open Source Film Production Manager** (McGoose/OSFPM): README badge says MIT; API shows no license file. React 18/Vite plus Express/SQLite/Drizzle, with JWT auth. Pushed 2026-10-23, 1 star. — [GitHub](https://github.com/McGoose/OSFPM)
  - Script versions with DGA revision colours, breakdown, call sheet PDF, budget with invoices, and reports: sound report (MixPre CSV import), camera report, and daily progress report. — [README](https://github.com/McGoose/OSFPM)

**Breakdown-focused**
- **ScriptBreak** (wassermanproductions/scriptbreak): Apache-2.0, Tauri desktop app (`src/index.html` plus `src-tauri`), pushed 2026-08-05, 59 stars. It is the most-starred of the breakdown tools. — [GitHub](https://github.com/wassermanproductions/scriptbreak)
  - Auto-breakdown on import is "tagged from word lists *and* from the CAPS the writer used in action lines".
  - Starter shot lists come from called shots (CLOSE ON, INSERT, POV).
  - A stripboard view colours by location, D/N, INT/EXT or character.
  - It has an MCP server.
  - Source: [README](https://github.com/wassermanproductions/scriptbreak)
- **Film Breakdown Assistant** (ggvfx/film-breakdown-assistant): MIT, Python/PySide6 with a local LLM, beta, 10 stars, pushed 2026-04-05. — [GitHub](https://github.com/ggvfx/film-breakdown-assistant)
  - A "7-Pass Agentic Pipeline": 4 harvester passes (core, set/vehicles, props/SFX, tech gear), 2 continuity passes (entity reconciliation, state tracking), and 1 risk/safety pass that produces AD Alerts with severity 1–3.
  - Planned `.sex` export to Movie Magic.
  - Source: [README](https://github.com/ggvfx/film-breakdown-assistant)
- **Coda** (kinetik-gg/coda): MIT, TypeScript, self-hosted Docker. Collaborative screenplay plus breakdown "Spaces". It explicitly says it is "not ... an end-to-end production management suite". Pushed 2026-11-03. — [GitHub](https://github.com/kinetik-gg/coda)
- **survos/screenplay-parser** (PHP, no license, last push 2017): extracts scenes, characters and "capitalized action elements" from FDX, Celtx, Adobe Story, Fountain and FadeIn. Abandoned in favour of ScreenJSON. — [GitHub](https://github.com/survos/screenplay-parser)

**Call sheets only**
- **create-call-sheet** (evillollive): AGPL-3.0, Python plus a static browser app. Outputs .xlsx with one tab per shoot day. Optional address autocomplete uses Photon/OpenStreetMap. Pushed 2026-10-25. — [GitHub](https://github.com/evillollive/create-call-sheet)
- Smaller or stale: jjcxdev/callsheet (Next.js, no license, 2025-02), jfbarboza/CallSheetMaster (iOS, 2015). — GitHub search results for "call sheet film" ([jjcxdev](https://github.com/jjcxdev/callsheet), [jfbarboza](https://github.com/jfbarboza/CallSheetMaster))

**Movie Magic interoperability and standards**
- **Stripboard Studio** (nebelwerfer41/stripboard-studio): MIT, browser JavaScript, README mostly in Italian, pushed 2026-11-03. — [GitHub](https://github.com/nebelwerfer41/stripboard-studio)
  - Views and edits Movie Magic Scheduling stripboards with local MSD/MMSX import and export.
  - Has Stripboard, Breakdown, Calendar, DooD and Red Flags views.
  - The README notes "Day breaks are generated by the layout and have no record of their own".
  - Export suite v1 "was rejected by MMS6/MMS10"; later versions are still awaiting manual verification.
  - Source: [README](https://github.com/nebelwerfer41/stripboard-studio)
- **open-movie-schedule** (sfingali): MIT, Python. Generates files that MMS imports. — [GitHub](https://github.com/sfingali/open-movie-schedule)
  - Claims MMS 10 imports Movie Magic Screenwriter XML (`.mmx`/`.MMS10`), and also legacy text `.sex` and `.fdx`, although FDX tags are lost. — [README](https://github.com/sfingali/open-movie-schedule)
  - Companion toolkit: [open-moviemagic-toolkit](https://github.com/sfingali/open-moviemagic-toolkit).
- **Universal Schedule Standard (USS)**: a JSON format for schedules and breakdowns, CC BY-ND 4.0, pushed 2026-06-13, 19 stars. Its example includes `schedColor`/`scriptColor` fields and a `categories` array. — [GitHub](https://github.com/UniversalScheduleStandard/UniversalScheduleStandard)
- **Universal Category Identification (UCI)**: CC BY-NC-ND 4.0, last push 2023. — [GitHub](https://github.com/UniversalScheduleStandard/UniversalCategoryIdentification)
  - Fixed numeric IDs. Scene categories: 0 Set, 1 INT/EXT, 2 Day/Night, 3 Script Day, 4 Unit, 5 Sequence, 6 Location.
  - Action categories start at 100 Cast Members. Users may rename categories while the ID keeps the meaning.

**Studio pipeline trackers (ShotGrid/ftrack alternatives)**
- **Kitsu/Zou (CGWire)**: AGPL-3.0, confirmed from the LICENSE file. A web app for "Animation, VFX, and Video Game Studios", used by "More than 300 studios". It tracks production tasks and deliveries, not stripboards or call sheets. — [Kitsu README](https://github.com/cgwire/kitsu); [CGChannel 2019](https://www.cgchannel.com/2019/02/check-out-open-source-production-tracking-tool-kitsu) says Zou is AGPL and the Gazu client is LGPL.
  - Conflict: a 2019 article said GPL-3. — [CGPress](https://cgpress.org/archives/kitsu-new-production-tracking-software.html)
- **AYON (Ynput, successor to OpenPype)**: an open-source VFX/animation pipeline platform. The ayon-ftrack and ayon-shotgrid addons are Apache-2.0. — [80.lv](https://80.lv/articles/ynput-launched-early-access-to-animation-pipeline-platform-ayon); [ecosyste.ms ayon-shotgrid](https://awesome.ecosyste.ms/projects/github.com%2Fynput%2Fayon-shotgrid)

**Proprietary references (not open source)**
- FilmSchedule (pay once, proprietary), StudioBinder and Filmustage are all closed. — [AlternativeTo](https://alternativeto.net/software/filmschedule/about/), [StudioBinder](https://www.studiobinder.com/blog/film-scheduling-software/)
- Filmustage advertises 17+ tag categories. — [G2](https://www.g2.com/products/filmustage/reviews)

**Adjacent tools**
- Storyboarder (wonderunit, 3,904 stars, no license detected, last push 2024-03). — [GitHub](https://github.com/wonderunit/storyboarder)
- Obsidian film scene manager plugin (MIT, 2026-10). — [GitHub](https://github.com/phidahussain66/obsidian-film-scene-manager)

### Inferences
- Slate's single-file vanilla-JS, offline approach is mainstream among 2026 projects. OpenShotDesigner, Open Gate, FilmOrganizer and Call Sheet Tool all use local storage with no account. The nearest architectural sibling is Call Sheet Tool (vanilla JS with JSON files). The nearest feature sibling is OpenShotDesigner.
- Almost every project is under 6 months old with 0–60 stars, so treat them as idea sources rather than dependencies. None appears battle-tested on real features.
- Open Gate's mention of legacy `.slateline` files hints at a prior project name close to "Slate". This is worth checking for naming collisions if Slate is ever published.

### Gaps
- I found no open-source equivalent of Movie Magic Budgeting (a fringe-, globals- and chart-of-accounts-based budget). Only embedded budget modules exist (OpenShotDesigner, Open Gate, OSFPM, indieFilmer).
- I did not verify AYON core's license or current Kitsu star counts (the GitHub API rate limit was hit).
- I did not research Celtx open-source forks or Trelby and KIT Scenarist/Starc in depth. These are mainly screenwriting tools, not breakdown or scheduling tools.

## Are there open-source or research projects doing automatic script breakdown / NER from screenplays? Datasets or browser-usable models?

### Takeaway
Open-source auto-breakdown in practice means deterministic keyword dictionaries plus screenplay conventions: CAPS in action lines, character intros with an age, and character cues. FilmOrganizer and ScriptBreak both do this offline, and FilmOrganizer's MIT `rules.ts`/`rules-dictionary.ts` (about 430 lines) is directly portable to vanilla JS. LLM pipelines (Film Breakdown Assistant, FilmOrganizer's optional AI) are the other branch. I found no public annotated dataset for prop, wardrobe or vehicle breakdown tags. Academic work focuses on characters, relations and knowledge graphs.

### Cited Findings
- **FilmOrganizer rule-based breakdown** (MIT): "finds characters (including ones introduced in capitals with an age), props, vehicles, animals, wardrobe, makeup, effects, sound, music and camera needs from keyword lists in English and Spanish; flags production risks (night exteriors, dawn/dusk light, minors, water, weapons, crowds, long scenes); estimates story days; and spreads any element you confirm to every other scene that mentions it". It is deterministic, so the same script always gives the same result. — [README](https://github.com/nachobust/FilmOrganizer)
  - Implementation in [src/rules.ts](https://github.com/nachobust/FilmOrganizer/blob/main/src/rules.ts):
    - One regex per category, longest terms first, with an optional `(?:es|s)?` plural and Unicode word boundaries `(?<![\p{L}\p{N}])…(?![\p{L}\p{N}])`.
    - It scans only descriptive paragraphs (Action, General, Shot, Scene Heading), not dialogue.
    - Each suggestion carries `{sheetId, categoryId, name, quote, by}`: the source sentence and the rule that produced it.
    - Character intros use `INTRO_RE`, which matches "MARTA (60s)" and "TOMÁS, 30".
    - Cast names also match without a title prefix (Mr., Dr., …).
    - V.O./NARRATOR cues are skipped.
  - [src/rules-dictionary.ts](https://github.com/nachobust/FilmOrganizer/blob/main/src/rules-dictionary.ts) holds the category term lists (EN/ES), `RISK_TERMS`, `CAPS_STOPWORDS` and `NAME_TITLES`. Entries with a `label` map concepts, for example several words to "Fight". Words that are ambiguous across languages are left out on purpose.
- **ScriptBreak**: elements are "tagged from word lists *and* from the CAPS the writer used in action lines". Character and location bibles are seeded from intro descriptions. Shot lists come from explicit shot calls (CLOSE ON, INSERT, POV). — [README](https://github.com/wassermanproductions/scriptbreak)
- **survos/screenplay-parser** used the same CAPS heuristic (`parse_capitalized()`) back in 2017. — [README](https://github.com/survos/screenplay-parser)
- **Film Breakdown Assistant**: a multi-pass local-LLM pipeline with an explicit entity-reconciliation pass (the "Continuity Agent") and Pydantic-validated models. — [README](https://github.com/ggvfx/film-breakdown-assistant)
- **STAGE** (arXiv 2601.08510) builds screenplay knowledge graphs with staged extraction: events first, then locations, characters and objects. The schema includes objects. It merges entities with embedding similarity plus lexical overlap and an LLM judge. The authors report that single-pass extraction "exhibits omissions, duplicates, and invalid relations". — [arXiv](https://arxiv.org/html/2601.08510v1)
- **CREFT** (arXiv 2505.24553): a multi-agent LLM pipeline for character relation extraction from scripts. — [arXiv](https://arxiv.org/html/2505.24553)
- A US patent describes neural-network script breakdown that identifies props per scene. Do not reimplement it without legal review. — [USPTO 10896294](https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/10896294)
- Datasets:
  - [SummScreen](https://github.com/mingdachen/SummScreen) (ACL 2022, summarisation, no license detected).
  - [PROSE](https://github.com/creDreams/PROSE) (screenplays paired with director storyboards, NOASSERTION, 2026-07).
  - [Original-Screenplay-Movies-Dataset](https://github.com/ripa01/Original-Screenplay-Movies-Dataset) (8,158 movies, metadata).
  - [Named-Entity-Extraction-from-Movie-Screenplays](https://github.com/vaibhavj07/Named-Entity-Extraction-from-Movie-Screenplays-and-Scripts) (2021 notebook, character names only).
  - None has breakdown-category labels.
- **Browser-runnable NER**: Xenova/bert-base-NER is an ONNX conversion of dslim/bert-base-NER for Transformers.js (`token-classification` pipeline). Its labels are generic PER/ORG/LOC/MISC. — [Hugging Face](https://huggingface.co/Xenova/bert-base-NER)
  - A third-party tool reports about 170 MB downloaded on first use, then offline. That is a vendor claim. — [teamzlab](https://tool.teamzlab.com/tools/ai-named-entity-extractor/)
- **Fountain parsers usable in the browser**:
  - [mattdaly/Fountain.js](https://github.com/mattdaly/Fountain.js) (MIT, 271 stars, last push 2024-03).
  - [jonnygreenwald/fountain-js](https://github.com/jonnygreenwald/fountain-js) (MIT, TS, 2025-11).
  - [wildwinter/screenplay-tools](https://github.com/wildwinter/screenplay-tools) (MIT, multi-language, 2026-10).

### Inferences
- For Slate, the best value is to port or adapt FilmOrganizer's dictionary-plus-regex approach (MIT, zero dependencies). Two ideas stand out: "confirm once → propagate to every scene that mentions it", and storing the quote and rule on each suggestion so users can audit auto-tags.
- Generic BERT NER (PER/LOC) adds little over cue-based character detection and costs about 170 MB. Prop, wardrobe and vehicle tagging is better served by dictionaries plus CAPS heuristics. An optional LLM hook (Ollama/local) is the 2026 norm for deeper extraction.
- Multi-pass extraction with a reconciliation step (STAGE, Film Breakdown Assistant) is the documented fix for duplicate elements such as "gun" and "pistol". A lightweight version would be alias merging in Slate's element manager.

### Gaps
- I found no labelled screenplay breakdown corpus with props, wardrobe and so on, and no small (<50 MB) browser model trained for breakdown categories.
- I did not evaluate compromise.js for in-browser noun-phrase extraction.

## What scheduling optimisation approaches appear in open-source code?

### Takeaway
None of the open-source production apps I inspected ships an automatic schedule optimiser. They rely on manual drag-and-drop plus computed feedback: time cascades, conflict scans, schedule-health warnings, and live what-if deltas. Formal optimisation exists only in academic code for the "talent scheduling problem" (CSPLib prob039), which minimises cast idle/hold cost over scene orderings.

### Cited Findings
- **Open Gate `schedule/engine.ts`** (ported from CineSched), at [engine.ts](https://github.com/opengateapp/opengate/blob/main/src/schedule/engine.ts):
  - `cascade()` computes strip times where "Fixed start times reset the clock".
  - `dayTotals()` computes day totals.
  - `scanConflicts()` finds duplicate scene numbers and cast availability conflicts.
  - `lockReport()`/`workingDays()` diff a locked schedule.
  - Strip moves include `moveScenes`, `moveBanner`, `swapDays` and `unschedule`.
- **OpenShotDesigner `domain/scheduling/health.ts`**: issue codes `cast_split_across_locations`, `cast_unavailable`, `company_moves`, `day_overruns`, `distant_locations`, `short_turnaround`. `WhatIfPanel` previews the page/time and cast paid/hold-day impact of a drop before it happens. — [src](https://github.com/koosoli/OpenShotDesigner/tree/main/src/domain/scheduling)
- **Call Sheet Tool**: duration-based auto-timing ("you never type clock times"), linked shot blocks, "Push to next day" for over-long days, and an automatic "PU" suffix for pickups when a scene is split. — [README](https://github.com/sthielmann/Call-Sheet-Tool)
- **CineSched**: actor unavailable dates are auto-scanned and flagged red. It also has auto-meals. — [README](https://github.com/ChrisTempel/CineSched)
- **FilmBase** (license unknown) advertises an "AI optimize" stripboard feature. — [filmbase docs](https://filmbase-website.pages.dev/docs)
- **Talent scheduling problem**:
  - Origin: Cheng, Diamond & Lin (1993). Formal description: de la Banda et al. (2011). — [CSPLib prob039 refs](https://www.csplib.org/Problems/prob039/references/)
  - Benchmark instances Film1 and Film2 have known optimal costs of 14,600 and 8,700. — [CSPLib results](https://www.csplib.org/Problems/prob039/results)
  - Zhang et al. (EJOR 2016) solve it with an enhanced branch-and-bound. — [PDF](https://github.com/zhangzizhen/Resume/blob/master/publication/EJOR2016-An%20enhanced%20branch-and-bound%20algorithm%20for%20the%20talent%20scheduling%20problem.pdf?raw=true)
  - A parallel CP approach is in [IFIP 2019](https://dl.ifip.org/IFIP-WG/hal-02331320v1).
  - Code: a [MiniZinc model](https://github.com/JasonZhangjc/The-Talent-Scheduling-Problem) (no license) and a [Python DP](https://github.com/PavithraElumalai/TalentScheduling) (MIT, 2019, README is one line).

### Inferences
- An achievable optimiser for Slate is greedy, not exact. Sort or cluster unscheduled strips by location (then set, then INT/EXT, then D/N), pack each cluster into days up to a page-eighths or time cap, then use a local-search pass (pairwise swaps) that minimises a cost. Suitable cost terms: company moves, cast work-span (first to last day, which drives hold days in the DOOD), and night-to-day turnaround violations. These are exactly the terms OpenShotDesigner's health checks already flag.
- The talent-scheduling DP or branch-and-bound is exponential and only practical for ordering scenes within small blocks of about 20 scenes or fewer. It is mainly useful for minimising cast hold days inside a location block.
- Health warnings plus a drag-time what-if preview give high value for little code, and fit Slate's manual stripboard better than a black-box auto-schedule.

### Gaps
- I found no open-source project implementing location-clustering auto-scheduling for film stripboards. I did not verify the FilmBase "AI optimize" algorithm or its license.

## Which are reusable for a personal offline app given license?

### Takeaway
Permissive (MIT/Apache) sources can be copied into Slate with attribution: FilmOrganizer, Call Sheet Tool, ScriptBreak, Stripboard Studio, open-movie-schedule, indieFilmer and the Fountain.js parsers. GPL-3.0 (OpenShotDesigner, Open Gate, CineSched) and AGPL (Kitsu, create-call-sheet) code would force Slate to be GPL/AGPL if code is copied and distributed. Their ideas, layouts and conventions can be reused freely. USS and UCI are CC BY-ND or BY-NC-ND specifications: implementing the format is reasonable, but redistributing modified spec text is not allowed.

### Cited Findings
- **MIT**:
  - FilmOrganizer — [LICENSE section](https://github.com/nachobust/FilmOrganizer)
  - Call Sheet Tool — [README](https://github.com/sthielmann/Call-Sheet-Tool)
  - Stripboard Studio — [README](https://github.com/nebelwerfer41/stripboard-studio)
  - open-movie-schedule — [GitHub](https://github.com/sfingali/open-movie-schedule)
  - indieFilmer — [README](https://github.com/josh-pearman/indiefilmer)
  - Film Breakdown Assistant — [GitHub](https://github.com/ggvfx/film-breakdown-assistant)
  - Fountain.js — [GitHub](https://github.com/mattdaly/Fountain.js)
  - OSFPM claims MIT in a badge, but GitHub detects no license file. — [GitHub](https://github.com/McGoose/OSFPM)
- **Apache-2.0**: ScriptBreak — [README](https://github.com/wassermanproductions/scriptbreak)
- **GPL-3.0**:
  - Open Gate — [README](https://github.com/opengateapp/opengate)
  - OpenShotDesigner (badge) — [README](https://github.com/koosoli/OpenShotDesigner)
  - CineSched (badge) — [README](https://github.com/ChrisTempel/CineSched)
- **AGPL-3.0**:
  - Kitsu — [LICENSE](https://github.com/cgwire/kitsu)
  - create-call-sheet — [GitHub](https://github.com/evillollive/create-call-sheet)
- **USS**: CC BY-ND 4.0 — [GitHub](https://github.com/UniversalScheduleStandard/UniversalScheduleStandard)
- **UCI**: CC BY-NC-ND 4.0 — [GitHub](https://github.com/UniversalScheduleStandard/UniversalCategoryIdentification)

**Concrete things worth borrowing**
- **Strip colour conventions disagree between projects. Make them configurable.**
  - OpenShotDesigner calls its palette "the classic stripboard code": INT/day white `#ffffff`, EXT/day yellow `#fef3c7`, INT/night blue `#dbeafe`, EXT/night green `#d1fae5`. Meal banners are green `#059669`, company-move banners purple `#7c3aed`, other banners slate `#334155`. — [stripboardPrint.ts](https://github.com/koosoli/OpenShotDesigner/blob/main/src/domain/scheduling/stripboardPrint.ts)
  - Open Gate/CineSched swap the night colours: INT·Night green `#86EFAC`, EXT·Night blue `#93C5FD`. They also add Dawn, Dusk and Afternoon slots (10 combinations plus custom) and reserve red for flagged strips. — [defaults.ts](https://github.com/opengateapp/opengate/blob/main/src/model/defaults.ts); [CineSched README](https://github.com/ChrisTempel/CineSched)
- **Breakdown category set and highlight colours** (Open Gate, 21 categories):
  - Cast `#ef4444`, Extras `#22c55e`, Stunts `#f97316`, Vehicles `#ec4899`, Props `#a855f7`, Camera, SFX `#3b82f6`, Wardrobe `#06b6d4`, Makeup/Hair `#f472b6`, Animals `#84cc16`, Music `#eab308`, Sound.
  - Also Set Dressing, Greenery, Special Equipment, Security, Additional Labor, VFX `#8b5cf6`, Mechanical FX, Misc, Notes `#facc15`.
  - Source: [defaults.ts](https://github.com/opengateapp/opengate/blob/main/src/model/defaults.ts)
  - OpenShotDesigner orders breakdown-sheet categories prop, wardrobe, vehicle, sfx, vfx, makeup, animal, stunt, sound, music, extras, special_equipment, other. — [breakdown.ts](https://github.com/koosoli/OpenShotDesigner/blob/main/src/domain/reports/breakdown.ts)
- **Stable category IDs** (UCI): scene categories 0–6 and action categories from 100, with renaming allowed. This is a portable way to key Slate's tag categories. — [UCI](https://github.com/UniversalScheduleStandard/UniversalCategoryIdentification)
- **Shot-list vocabularies** (shot types EWS…AER, angles, lenses, moves, equipment, lighting, sound MOS/ADR, …) are ready-made dropdown lists. — [defaults.ts](https://github.com/opengateapp/opengate/blob/main/src/model/defaults.ts)
- **Call sheet layout and behaviour** (Call Sheet Tool, MIT):
  - Section order can be changed and carries to print.
  - Revision-colour page tint follows the industry rotation.
  - Logo per project, "Shift all times", and "Add everyone with tag".
  - Sunrise/sunset/weather are fetched only on demand.
  - "Send to call sheet" pushes a schedule day non-destructively, snapshotting first.
  - Source: [README](https://github.com/sthielmann/Call-Sheet-Tool)
  - OpenShotDesigner adds per-person pick-ups, a next-day look-ahead and readiness warnings on its call sheet preview. — [README](https://github.com/koosoli/OpenShotDesigner)
- **Production reports**:
  - OSFPM: sound report (MixPre CSV), camera report, daily progress report — [README](https://github.com/McGoose/OSFPM)
  - OpenShotDesigner: production report, performer time report, one-liner, DOOD — [src](https://github.com/koosoli/OpenShotDesigner/tree/main/src/components/schedule)
- **Interchange**:
  - Movie Magic import via Screenwriter XML `.mmx` or legacy `.sex`. — [open-movie-schedule](https://github.com/sfingali/open-movie-schedule)
  - .ics calendar export. — [Open Gate](https://github.com/opengateapp/opengate)

### Inferences
- If Slate stays permissively licensed or private, the safest direct code reuse is FilmOrganizer's `rules.ts` and `rules-dictionary.ts`, plus Call Sheet Tool's vanilla-JS patterns. For GPL projects, reimplement ideas (health checks, what-if delta, omitted-scene handling, tag anchoring to text) from their documentation rather than copying code.
- For purely personal use with no distribution, GPL obligations are not triggered. Slate is, however, packaged as an .exe, and sharing that .exe would count as distribution.

### Gaps
- I did not read the full LICENSE files for OpenShotDesigner or CineSched (GitHub API says NOASSERTION). Their GPL-3.0 status rests on README badges.
- I did not verify whether the USS/UCI no-derivatives terms restrict software that implements the schema. That needs a legal reading.
