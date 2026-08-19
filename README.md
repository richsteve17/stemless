# Stemless

**Backing Track Studio** — a zero-instrument, visual workflow for producing original
full-band punk backing tracks for a five-song covers EP in **BandLab** or
**GarageBand**.

The user is the singer/rapper/front person and producer. The app does **not** assume
guitar, piano, bass, notation, or theory skills. It turns each build into labeled
timeline blocks: copy a drum grid, draw the supplied bass roots, stack the supplied
virtual-guitar notes, loop a section, and sing over it.

Because every backing part is newly programmed/recorded, the release uses the
mechanical approvals already held rather than somebody else's master recording.

## Five guided punk builds

The browser is seeded, non-destructively, with editable boards for:

1. **Sloop John B** — Me First and the Gimme Gimmes version; C, 185 BPM; the first/easiest build.
2. **Teenage Dirtbag** — rebuilt as double-time pop-punk in E at 94 BPM.
3. **My Way** — Sid Vicious approach; fake lounge opening into a 150 BPM punk blast.
4. **Blister in the Sun** — G, 194 BPM; power-chord version with the quiet drop preserved.
5. **American Girl** — Humble Gods-inspired punk build in D with an original,
   transposed Black Flag-style `D–C–D–C–D–C–B♭–C` breakdown.

Each board includes:

- a four-step first pass so the user never starts with the whole song;
- a starter key, tempo, feel, bar-counted section map, chord lane, and energy notes;
- clickable chord auditions for vocal-range checks;
- literal bass-note and virtual-guitar power-block instructions;
- a playable matching punk drum preset;
- click-by-click BandLab and GarageBand workflows;
- a saved per-song progress checklist.

These are practical starter arrangements, not note-for-note transcriptions. The app
explicitly asks the user to tap the exact chosen reference, sing-test the key, and
adjust section boundaries to their phrasing before final tracking.

## What's inside

- **Start Here** — a single first assignment: build an eight-bar Sloop John B loop
  at half speed before attempting the EP.
- **Guided Method** — expandable zero-instrument lessons covering the piano roll,
  section blocks, copied drum grids, layered/quantized finger drumming, bass roots,
  virtual punk-guitar blocks, arranging around a live singer, mixing, and export.
- **Your 5 EP Builds** — the five complete song recipes above; missing starter
  boards can be restored without duplicating or overwriting existing work.
- **Tools** — playable punk/double-time/hardcore drum grids, tap tempo, a section
  builder, chord/key reference, and a corrected semitone transposer.
- **Cheat Sheets** — a no-instrument piano-roll dictionary, EP starting points,
  DAW workflows, mix/export references, and printable decision sheets.
- **Licensing** — a short paperwork reference only; progress is stored in the browser.

## Pick your studio

On first open, the **Start Here** page asks which DAW you build in:

- **HP / Windows → BandLab** (free, bandlab.com → Create → Mix Editor)
- **Mac / iPhone → GarageBand**

Lessons, recipe click-by-click steps, and cheat sheets follow the pick. It is stored
in `localStorage` (`stemless.daw`) and can be changed any time; the sidebar shows the
locked program.

## Run it

**From a GitHub zip:** Code → Download ZIP → **Extract All** first, then double-click
`start.command` (Mac) or `start.bat` (Windows). Opening `index.html` straight from
inside the zip will not load the app.

```bash
python3 server.py          # http://localhost:8000
```

Or use any static file server pointed at this directory. There is no build step and
no dependency. Song boards, checklist state, lesson progress, and the DAW pick are
stored in browser `localStorage`.
