# Open-source storyboarding, story-structure, script-analytics and offline TTS tools relevant to Slate (status as of Nov 2026)

Context: Slate is a single-file vanilla-JS web app, also packaged as an Electron .exe. It has shot lists with storyboard frames, index cards, a story map (intensity and character presence over time, act guides), script insights, and a table read that uses browser speechSynthesis voices. Research covered about 16 search/fetch calls. Where release dates or licenses could not be confirmed from primary sources, this is stated.

## Which open-source storyboard/shot-planning tools are maintained as of late 2026, and which parts could inspire Slate?

### Takeaway
Wonder Unit Storyboarder is still the reference open-source storyboard app. A v3.0.0 release was reportedly sighted in Sep 2026, but this is unconfirmed. It is Electron/JS, like Slate. The ideas most worth borrowing are its simple drawing canvas with framing guides, Fountain import, the configurable PDF sheet, animated-GIF animatic export and timeline XML export for Premiere/FCP. There are few other maintained OSS shot planners; OpenFrame, a browser-based storyboard + shot list with PDF/JSON export, is the closest small analogue.

### Cited Findings
- **Wonder Unit Storyboarder**: repo github.com/wonderunit/storyboarder, about 3.9k stars, 403 forks, 8,056 commits on master. The toolchain is JS/Node (package.json, .babelrc). — [GitHub](https://github.com/wonderunit/storyboarder)
  - Drawing: four brushes (light pencil, pencil, pen, brush), three sizes and a five-color palette per brush, undo/redo, shift-for-straight-lines, move/scale. Guides: grid, center, thirds, angles, onion skin. Also reference layer, Wacom support, printable worksheets, "Open in Photoshop", Fountain support, track changes. — [GitHub](https://github.com/wonderunit/storyboarder)
  - Exports to Premiere, Final Cut, Avid, PDF and Animated GIF. The Premiere route exports the timeline as .xml. The GIF includes active captions and per-shot durations. The PDF sheet shows each shot with captions and stage directions. The v2 plan proposed configurable PDF columns/rows/fields. — [Wonder Unit site](https://www.wonderunit.com/storyboarder); [v2 plan](https://wonderunit.com/plan-for-storyboarder-v2/); [cgchannel 2.0](https://www.cgchannel.com/2020/06/download-free-storyboarding-tool-storyboarder-2-0/)
  - Shot Generator is a 3D posing/camera tool: "type a description ... press return, and generate as many shots as you'd like". — [Wonder Unit site](https://www.wonderunit.com/storyboarder)
  - Latest version: mirrors list v3.0.0 as the top release, after v2.1.0. A community tracker saw v3.0.0 on 8 Sep 2026 and claimed it is a native Apple Silicon build. This is unverified, and the GitHub Releases section did not render on fetch. — [newreleases.io](https://newreleases.io/project/github/wonderunit/storyboarder/release/v1.17.0); [rosettacheck](https://rosettacheck.com/apps/5ms4qe3b)
  - License: the README links to "Notes on Open Source License" without naming it on the page. Linux Magazine (2018) said it is MIT with exceptions that stop commercial resale of the code, so not OSI-compliant. — [GitHub](https://github.com/wonderunit/storyboarder); [Linux Magazine 2018](https://www.linux-magazine.com/Issues/2018/206/FOSSPicks/(offset)/12)
- **OpenFrame** (github.com/kazim-45/openframe): a browser-based pre-production suite with a panel-based storyboard editor, shot list, and PDF + JSON export. It runs locally via npm. Collaboration and cloud save are only planned. License and activity were not confirmed. — [GitHub](https://github.com/kazim-45/openframe)
- **GitHub topic "shot-list"**: lists a Python "open-source AI director / pre-production workflow for validated shot plans, continuity, and model-ready prompts", updated Aug 2026. The project name and details were not captured. — [GitHub topic](https://github.com/topics/shot-list?l=python)
- **Blender Storypencil**: an add-on bundled with Blender (Video Sequencer). It adds buttons to add/edit/render linked scene strips. The base scene can hold Grease Pencil objects, cameras and backgrounds, so it supports a draw-in-sequencer storyboard/animatic workflow. Blender itself is GPL. The add-on license was not stated on the manual page. — [Blender manual](https://www.blender.org/manual/en/addons/sequencer/storypencil.html)

### Inferences
- Borrowing that fits a single-file vanilla app (no dependencies needed):
  - Rule-of-thirds, center and onion-skin overlays on the existing frame canvas.
  - A "worksheet" print mode (empty frames + caption lines) through `window.print()` CSS.
  - An animatic player: frames timed by per-shot duration, plus optional TTS dialogue. A GIF/WebM export could use `MediaRecorder` over a canvas, which is built into Chromium/Electron.
  - FCP7-XML / Premiere XML timeline export, which is plain text generation.
- Storyboarder's license caveat matters if Slate copies code rather than ideas. Re-implement concepts and don't copy source.
- Storyboarder's Shot Generator (3D posed mannequins) is heavy (three.js). A lighter "blocking diagram" (2D top-down camera/actor markers on canvas) is the realistic analogue for Slate.

### Gaps
- No primary confirmation of the Storyboarder v3.0.0 date or changelog, or of its current exact license text.
- No maintained open-source equivalent was found of Hollywood Camera Work "Shot Designer" (top-down camera/blocking planner). Searches only returned commercial apps (Shot Lister, Previs Shot).
- OpenFrame's maturity and license are unknown.
- No dedicated OSS animatic tool was found beyond Storyboarder GIF/XML export and Blender Storypencil/VSE.

## What open-source script-analysis/visualisation projects exist (character co-occurrence networks, sentiment/intensity arcs), and what methods do they use?

### Takeaway
Open-source work here is mostly notebooks and research code, not maintained apps. The common methods: parse the screenplay into scenes and speakers, build a co-occurrence graph (characters sharing a scene, or one speaking right after another), and compute lexicon-based sentiment/emotion per line, smoothed over the script's timeline. These are cheap to port to JS for Slate's Insights and Story Map.

### Cited Findings
- **AdeboyeML/Film_Script_Analysis** (2020, unmaintained): segments scripts into scenes, builds character interaction networks from scene dialogue, and tracks sentiment and emotion arcs for the whole film and per character. — [relatedrepos](https://relatedrepos.com/gh/AdeboyeML/Film_Script_Analysis); [notebook](https://nbviewer.org/format/script/github/AdeboyeML/Film_Script_Analysis/blob/e2fec93a9fa163b49893788b46cecac29c51078a/American-Pie_Movie_Analysis.ipynb)
- **hzjken/character-network**: NER to find characters, sentence-level sentiment, co-occurrence matrix, and NetworkX graph with edges weighted by co-occurrence and colored by sentiment. Built for novels (Harry Potter). — [GitHub](https://github.com/hzjken/character-network)
- **gastonstat/StarWars** (R): text mining of Star Wars scripts to build character networks and arc diagrams. No sentiment analysis. — [GitHub](https://github.com/gastonstat/StarWars)
- **"Emotion Dynamics in Movie Dialogues"** (arXiv 2103.01345): models per-character emotion arcs (valence/arousal/dominance lexicon-based "utterance emotion dynamics") from film dialogue. Code is in the R package github.com/whipson/edyn. — [arXiv](https://arxiv.org/pdf/2103.01345v5.pdf); [ar5iv](https://ar5iv.arxiv.org/html/2103.01345)
- **jon-chun/multisentimentarcs**: diachronic (over-time) sentiment arcs for long-form film narratives. Multimodal, not only script text. — [search summary of GitHub](https://github.com/jon-chun/multisentimentarcs)
- Frontiers in Computer Science (2024) has a related study on narrative/character analysis of films (details not extracted). — [Frontiers](https://www.frontiersin.org/articles/10.3389/fcomp.2024.1444549/full)

### Inferences
- Portable methods for Slate, all doable in vanilla JS without libraries:
  1. A scene × character presence matrix, which Slate likely already has for the story map. Turn it into an adjacency matrix: an edge weight is the number of scenes shared, optionally plus count of consecutive speaker turns. Draw it as a force-directed SVG/canvas graph or a chord/adjacency heatmap.
  2. Lexicon sentiment per dialogue line, averaged per scene with a rolling window. This gives an automatic "intensity/valence arc" to overlay on the hand-set intensity curve. Lexicons such as NRC VAD/EmoLex (used by the edyn paper) give valence/arousal/dominance. Arousal is a good proxy for "intensity". Check the lexicon license before bundling. NRC lexicons are free for research, with commercial terms restricted.
  3. Per-character stats: line count, word count, screen-time share by scene count, first/last appearance, and longest absence. These are the standard "dialogue stats" seen in these notebooks.
- Arc diagrams (StarWars repo) are a compact alternative to a full network for a single-file app.

### Gaps
- No maintained, app-quality OSS screenplay analytics tool was found. The projects are notebooks or research code.
- Did not open the smaller screenplay-parser and "emotional arc of movie scripts" repos surfaced in search, so their names, licenses and activity are not recorded.
- Licenses for Film_Script_Analysis, character-network and edyn were not verified.

## What offline neural TTS engines can run in-browser (WASM/ONNX) or inside Electron, with sizes, quality, voice counts and licenses?

### Takeaway
Three practical options for multi-voice table reads with no cloud:
1. **Kokoro-82M via kokoro-js**: Apache-2.0 code and weights, 86–326 MB, 28 English voices (US/UK, M/F) in the v1.0 ONNX repo. Runs on WASM or WebGPU through Transformers.js, so it works directly in Slate's renderer.
2. **Piper voices**: small per-voice VITS models (tens of MB), many voices/languages, browser ports exist. Engine moved to GPL-3.0 (piper1-gpl), and each voice has its own dataset license.
3. **sherpa-onnx**: Apache-2.0. One runtime for VITS/Piper, Matcha, Kokoro and others, with WASM builds and Node bindings, so it is the best Electron-main-process option.

Kitten TTS is a tiny (~25 MB) Apache-2.0 option, but it is a developer preview.

### Cited Findings
- **Kokoro-82M ONNX** (onnx-community/Kokoro-82M-v1.0-ONNX): license Apache-2.0. — [HF model card](https://huggingface.co/onnx-community/Kokoro-82M-v1.0-ONNX)
  - Variant sizes: fp32 326 MB, fp16 163 MB, q8 (quantized) 92.4 MB, q8f16 86 MB, uint8 177 MB, uint8f16 114 MB, q4 305 MB, q4f16 154 MB.
  - 28 voices, all English: American 11 F + 9 M, British 4 F + 4 M. Names follow a pattern, e.g. af_heart, af_bella, am_adam, bf_emma, bm_george.
  - Usage: `KokoroTTS.from_pretrained(id, {dtype:"q8"})`, then `tts.generate(text,{voice})`.
- **kokoro-js** v1.2.0 (npm, Apache-2.0) runs "100% locally in the browser" via Transformers.js. It takes `device: "wasm" | "webgpu"`, and fp32 dtype is recommended with WebGPU. — [kokoro-js README](https://cdn.jsdelivr.net/npm/kokoro-js@1.2.0/README.md); [npm](https://npmjs.com/package/kokoro-js)
  - Third-party demo sites claim 54 voices / 9 languages. That likely refers to the full PyTorch Kokoro v1.0 voice set, not the 28-voice ONNX repo above. Unconfirmed. — [OfflineTTS](https://offlinetts.com/app/kokoro/)
- **Piper**: rhasspy/piper was archived on 6 Oct 2025, and development moved to OHF-Voice/piper1-gpl (Open Home Foundation). — [rhasspy/piper](https://github.com/rhasspy/piper)
  - A Debian packaging request lists piper1-gpl 1.3.0 under GPL-3.0. — [Debian WNPP](https://www.mail-archive.com/debian-wnpp@lists.debian.org/msg274337.html)
  - Secondary sources say the old code was MIT, and the change to GPL is likely linked to bundling espeak-ng (GPL-3.0). Voices remain at HF rhasspy/piper-voices (secondary claim). — [promptquorum review](https://www.promptquorum.com/de/power-local-llm/piper-tts-review)
- **Piper in the browser**:
  - Mintplex-Labs/piper-tts-web, a fork of @diffusion-studio/vits-web, runs Piper on ONNX Runtime Web and caches models in the browser. — [GitHub](https://github.com/Mintplex-Labs/piper-tts-web)
  - piper-plus (npm 0.6.0) offers VITS via WASM + ONNX Runtime Web with no backend. — [piper-plus README](https://cdn.jsdelivr.net/npm/piper-plus@0.6.0/README.npm.md)
  - A third-party demo cites about 75 MB for a Piper model. — [offlinetts Piper](https://offlinetts.com/app/piper/)
- **sherpa-onnx** (k2-fsa): Apache-2.0, about 15.7k stars. — [GitHub](https://github.com/k2-fsa/sherpa-onnx)
  - TTS families: VITS, Piper, Matcha, Kokoro, Supertonic, ZipVoice (voice cloning), Pocket TTS.
  - Platforms: Windows/macOS/Linux/Android/iOS, plus WebAssembly (HF Spaces browser demos) and Node.js. The npm package sherpa-onnx-node is used in third-party apps, including an Electron app.
  - The WASM TTS build docs use Emscripten and offer HF Spaces demos for English and German. — [sherpa WASM docs](https://k2-fsa.github.io/sherpa/onnx/tts/wasm/index.html)
- **js-tts-wrapper** has a SherpaOnnx-WASM engine that dynamically loads Kokoro, Matcha and VITS models in the browser. — [unpkg source](https://app.unpkg.com/js-tts-wrapper@0.1.36/files/esm/engines/sherpaonnx-wasm.js)
- **Kitten TTS** (KittenML): Apache-2.0, ONNX, CPU-only. The nano int8 model is 25 MB (15M params). The project is a "developer preview" and some users report issues with nano int8. Third parties cite 56 MB for full-precision nano and 80 MB for mini. — [GitHub](https://github.com/KittenML/KittenTTS); [NYU Shanghai RITS](https://rits.shanghai.nyu.edu/ai/kittentts-state-of-the-art-voice-synthesis-in-under-25-mb/)

### Inferences
- **Best fit for Slate's table read**: kokoro-js q8/q8f16 (~86–92 MB, one model for all 28 voices).
  - Assign a voice ID per character, keeping the existing speechSynthesis path as a zero-download fallback.
  - One model file serving many voices suits multi-character reads better than Piper's one-file-per-voice.
  - Apache-2.0 for both code and weights makes bundling in the .exe clean.
  - Lazy download/cache on first use keeps the single-file app small. In Electron the model could ship in resources/.
- **Piper**: use the archived MIT code or an Apache runtime (sherpa-onnx) to run Piper .onnx voices if GPL is a concern. Check each voice's MODEL_CARD, because dataset licenses vary (some are non-commercial).
- **sherpa-onnx-node in the Electron main process**: native speed and the widest model choice. The cost is a native addon, which breaks the "single file" purity for the web build.
- Quality ordering (subjective, widely reported but not verified here): Kokoro > Piper medium/high > Kitten nano > browser OS voices on many systems. Windows "Natural" voices via Edge are online-only.

### Gaps
- No verified MOS/quality benchmarks or real-time factors on typical CPUs were collected.
- Coqui TTS/XTTS was not researched. Coqui the company shut down in early 2024 (from memory, not sourced here), and XTTS weights use the non-commercial Coqui Public Model License. Verify before considering.
- Did not verify the piper1-gpl LICENSE file directly, or the current piper-voices count.
- Latest sherpa-onnx release version/date was not captured (Releases section did not render).

## Any automatic storyboard generation approaches that are open source and run locally?

### Takeaway
Yes, but all need a local GPU and a Python diffusion stack, which is far outside a single-file JS app. StoryDiffusion (consistent-character image sequences, SD1.5/SDXL) with its ComfyUI node is the main open option. Slate could integrate optionally by sending shot descriptions as prompts to a user-run local ComfyUI/Gradio server and dropping the results into storyboard frames.

### Cited Findings
- **StoryDiffusion** (HVision-NKU, NeurIPS 2024): "consistent self-attention" for character-consistent long image sequences, hot-pluggable into SD1.5/SDXL models. It has a local Gradio demo, and the low-VRAM version was tested on a 24 GB GPU. The repo is described as suitable for comics and storyboards (secondary). Apache-2.0 per a third-party listing, unverified. — [GitHub](https://github.com/hvision-nku/storydiffusion); [repohot listing](https://repohot.pages.dev/en/tools/story-diffusion/)
- **smthemex/ComfyUI_StoryDiffusion**: community ComfyUI node. It includes "story-maker" (img2img, up to two characters per image) and optional Flux/PuLID-Flux support (needs insightface). Marketing pages that claim "motion prediction" overstate it. — [RunComfy node page](https://www.runcomfy.com/comfyui-nodes/ComfyUI_StoryDiffusion)
- A Politecnico di Torino thesis describes an open-source interactive storyboard system using personalized text-to-image generation with identity-consistent characters and inpainting refinement. — [PoliTo thesis PDF](https://webthesis.biblio.polito.it/35375/1/tesi.pdf)
- Storyboarder's Shot Generator is a non-AI alternative: 3D mannequin/camera posing from text descriptions. — [Wonder Unit](https://www.wonderunit.com/storyboarder)

### Inferences
- For Slate, the realistic path is an optional "Generate frame" button that POSTs the shot's description, shot size and angle to a localhost ComfyUI API. Off by default, with no bundled model.
- Shot metadata Slate already stores (shot size, angle, movement, characters) maps well to prompt templates. Character-consistency methods (StoryDiffusion, PuLID) need a per-character reference image, which could be stored on Slate's character records.

### Gaps
- Did not verify StoryDiffusion's license file or the ComfyUI node's maintenance status in 2026.
- Did not survey newer 2025–2026 local models (e.g. Flux Kontext-style editing, open video models for animatics), because no sourced data was collected in this pass.

### Plot/beat-board apps (Plottr alternatives), supplementary to question 1
- **Manuskript**: GPL-3.0-or-later. Hierarchical outliner, character management, plot development, Snowflake method. One listing tags it "Discontinued", which conflicts with other reviews. — [GitHub](https://github.com/obw/manuskript); [AlternativeTo](https://www.alternativeto.net/software/manuskript/)
- **novelWriter**: GPLv3 (per a mirror). Markdown-like editor for large projects of many small plain-text documents. Releases come from the release branch. — [GitHub](https://github.com/vkbo/novelwriter); [mirror](https://github.com/kkeenee/vkbo-novelWriter)
- **bibisco**: license conflicting. LinuxLinks says GPL-3.0, AlternativeTo says "Freemium and Open Source". — [LinuxLinks](https://www.linuxlinks.com/bibisco/); [AlternativeTo](https://alternativeto.net/software/bibisco)
- **oStorybook**: free open-source novel planner. **Kindling**: imports outlines from Plottr/yWriter/Obsidian. Plottr itself is proprietary. — [AlternativeTo Plottr](https://alternativeto.net/software/plottr)
- Ideas to borrow: Snowflake-method expansion (one-line logline, then paragraph, then scene cards), Plottr-style timeline grid (rows = plotlines/characters, columns = scenes), and outline import/export interchange. Latest release dates for these apps were not captured (gap).
