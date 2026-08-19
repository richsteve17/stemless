# Stemless — handoff for the next Arena session

**Date:** 2026-08-19 (updated after the picker push)

**Repo:** https://github.com/richsteve17/stemless

**User:** richsteve17 — professional touring singer/rapper/DJ, MLC + BMI, 13 original
albums. Does **not** play guitar/piano/bass. Can sing, rap, DJ, and finger-drum (not
pro). Lives on **Mac + iPhone**; works on an **HP / Windows** PC too.

## Current state

- GitHub `main` now contains the full app **with** the BandLab/GarageBand picker
  (pushed via the `arena/01a01b47-stemless` branch + PR). Code → Download ZIP is the
  real app again.
- The Start Here page shows the picker; verify it if anything looks stale.

## Files that must exist and be current

`index.html`, `assets/app.js`, `assets/data.js`, `assets/styles.css`, `server.py`,
`start.bat` (Windows), `start.command` (Mac), `README.md`, this `HANDOFF.md`.

## Who this is for (do not re-litigate)

- Front person, not an instrumentalist. Teach **drawing blocks** in a DAW, not
  chords-as-theory or "learn guitar first."
- **Do not lecture on licensing.** Mechanicals are already approved for all covers.
  Licensing page = short paperwork checklist only.
- EP is **covers**, rebuilt as **punk**, full band (drums, bass, virtual guitars;
  keys only if a recipe says so).
- Live hole = **his voice**. No lead vocal in the show bounce.

## Product

Static SPA. No build, no npm, no CDN (preview iframe has no network). Hash router.
Progress in `localStorage`.

### Routes

`#/dashboard` Start Here · `#/method` Guided Method · `#/songs` 5 EP builds ·
`#/tools` · `#/cheats` · `#/licensing`

### DAW picker

- `localStorage` key: `stemless.daw` → `"bandlab"` | `"garageband"`
- `loadDaw()` defaults to `garageband`
- On the HP he must click **BandLab**. On Mac he uses **GarageBand**.
- Picker copy: “HP / Windows → BandLab. Mac / iPhone → GarageBand.”
- Filters: lessons (`tool: bandlab|garageband|both`), recipe click-by-click (shows
  only the picked DAW), cheat-sheet workflow sheets (`bandlab-flow` /
  `garageband-flow` tagged with `tool`).
- Sidebar `#sideDaw` shows the locked program; progress meters count only the
  lessons visible for the picked DAW.
- `index.html` shows a visible “CSS/JS failed to load — extract the zip first”
  banner if the scripts 404 (e.g. opened from inside an un-extracted zip).

## EP songs (seeded once)

`localStorage` `stemless.songs` + flag `stemless.ep.recipes.v1`. Non-destructive;
“Restore missing EP boards” does not duplicate.

| id | Song | Approach | Key | BPM | First-pass tempo | Drum preset |
|---|---|---|---|---|---|---|
| `sloop` | Sloop John B | Me First and the Gimme Gimmes | C | 185 | **93** | `punkstraight` |
| `dirtbag` | Teenage Dirtbag | punk rebuild | E | 94 | 94 double-time drums | `punkdouble` |
| `myway` | My Way | Sid Vicious lounge → blast | E | 150 | 150 (sparse then full) | `punkstraight` |
| `blister` | Blister in the Sun | punk rebuild + drop | G | 194 | **97** | `punkstraight` |
| `american` | American Girl | Humble Gods + original BF-style breakdown | D | 176 | 176 | `punkdouble` |

American Girl breakdown (new arrangement, **not** sampled): `D · C · D · C · D · C · Bb · C`

Recipes are **starter arrangements**, not transcriptions. No lyrics. User verifies
against their reference + vocal.

**Assigned first job:** Sloop, 8 bars, drums + C/F/G only, at 93 BPM, then raise to 185.

## Other localStorage

- `stemless.lessons.done` — lesson ids
- `stemless.licensing.done` — checklist indices

## Tools

16-step Web Audio drum machine (punk / double-time / hardcore + other presets), tap
tempo, structure builder, Nashville numbers, transposer (semitones via key `root`,
not array index). Chord audition buttons on recipes.

## Server

`python3 server.py [port]` binds `0.0.0.0`, `Cache-Control: no-store`, `.js` →
`text/javascript`. Preview needs `0.0.0.0` not localhost. Launchers: `start.command`
(Mac) and `start.bat` (Windows) run the server and open the browser.

## Known context

- He already learned: do **not** open `index.html` from inside the zip (Temp path,
  no CSS/JS). Extract All first.
- On HP: BandLab Mix Editor on a **computer**, not phone Beatmaker.
- On Mac later: GarageBand Empty Project + Drummer; iPhone Smart Guitar optional for
  tapping named chords.

## What the next agent should do

Priority order:

1. Stay with him on the **Sloop 8-bar BandLab loop** (93 BPM, drums + C/F/G) until it
   sings; then raise to 185.
2. Optional: enable GitHub Pages so it runs on iPhone without local files.
3. Keep pushing updates via branch + PR so Code → Download ZIP stays current.

Do **not** rebuild the whole app. Do **not** add licensing lectures. Do **not**
assume he can play.

## Architecture notes / past bugs already fixed

- Transposer must use `key.root` semitones, not `keyNames.indexOf`.
- Drum machine: don’t reload pattern on every render; `stopDrum()` before re-render;
  `resumeDrum()` after preset/clear.
- Lesson accordion: click `.lesson-head[data-lesson]` toggles `.open`.
- Tap tempo: one keydown handler; only while tools/tap is active.
- EP seed is one-time and must not wipe custom songs.
- DAW pick must survive re-renders: `loadDaw()` reads localStorage every render;
  after a pick change, re-render the current view + sidebar badge.

## How to talk to him

Direct. Production-focused. Short next action. He is a working artist, not a
beginner musician — he is a beginner **at drawing MIDI**. “Bar = 1-2-3-4. Draw the
letters we give you.”
