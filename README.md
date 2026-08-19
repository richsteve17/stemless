# stemless

**Backing Track Studio** — a personal tool for building your own full-band backing
tracks for a covers EP, so a cover only needs the *mechanical* license (which you
already hold) and never a *master-use* license on someone else's recording.

Built for the workflow: chart the song → lock key/tempo → program drums, bass,
keys/pads, guitars in **BandLab** or **GarageBand** → arrange, mix (leave a hole
for you), export stems, hit the road.

## What's inside

- **Dashboard** — your progress across the six-phase method + your EP board.
- **The Method** — 16 lessons, tagged BandLab / GarageBand / both, with steps,
  pro tips, and "watch out" pitfalls. Progress saves to your browser.
- **Your Songs** — one checklist per cover (key, BPM, feel, notes, steps).
- **Tools** — a playable 16-step drum machine with genre presets, tap tempo,
  a song-structure builder, the Nashville/roman number system per key, and a
  chord transposer.
- **Cheat Sheets** — printable references (GM drum map, quick workflows, mix
  checklist, export naming, number system, decision sheet).
- **Licensing** — a short paperwork reference + per-song checklist.

## Run it

```bash
python3 server.py          # http://localhost:8000
```

Or any static file server pointing at this directory. No build step, no
dependencies — everything (including your progress and song boards) lives in
your browser's local storage.
