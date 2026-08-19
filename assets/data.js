/* Stemless — Backing Track Studio · content data */
window.STUDIO = (function () {

  /* ============ PHASES ============ */
  var phases = [
    { id: "prep",    name: "Prep",    tag: "Know the song cold & decide the plan" },
    { id: "map",     name: "Map",     tag: "Section map, key, tempo, feel" },
    { id: "build",   name: "Build",   tag: "Drums → bass → keys/pads → guitars" },
    { id: "arrange", name: "Arrange", tag: "Dynamics, fills, transitions, space" },
    { id: "mix",     name: "Mix",     tag: "Leave a hole for you, mono-safe" },
    { id: "ship",    name: "Ship",    tag: "Export, stems, road rig, redundancy" }
  ];

  /* ============ LESSONS ============ */
  var lessons = [
    /* -------- PREP -------- */
    {
      id: "why-diy", phase: "prep", tool: "both", minutes: 4,
      title: "Why DIY backing tracks actually saves you money",
      intro: "You already know the split: a cover needs a mechanical license for the composition, and using a recording (stems, karaoke, the original master) needs a master-use license on top. When you perform and program every part yourself, there is no master to clear — you own the new recording, and the mechanical you already hold is the only clearance. That's the whole game.",
      steps: [
        { t: "Confirm the clearance per song", d: "Mechanical = approved (you've got this). Master = yours, because you performed and programmed every part. No third party to clear." },
        { t: "Watch your sources", d: "BandLab and GarageBand's built-in loops are licensed for use in new recordings — fine to use, keep the pack documented. A commercial stem pack or any sample of the original recording is a master-use situation again — avoid it." },
        { t: "Define the deliverable", d: "A full-band live-feel backing track: drums, bass, keys/pads, and only the guitar you're NOT playing live. Your voice and main instrument stay out." }
      ],
      tips: [
        "Samples of the original recording are the fastest way to accidentally owe a master license — don't reach for them.",
        "Keep a per-song folder: license/approval letter + your session + your stems, all in one place."
      ],
      watchout: "A 'free' stem or karaoke file from a download site is usually a master-use problem in disguise. Build it yourself and the problem disappears."
    },
    {
      id: "decision-sheet", phase: "prep", tool: "both", minutes: 5,
      title: "Know the song cold — your decision sheet",
      intro: "Speed comes from deciding before you record. For each cover, make a one-page decision sheet so the session is execution, not exploration.",
      steps: [
        { t: "Pick ONE reference", d: "One definitive recording as the arrangement reference. Note any live-version changes you prefer." },
        { t: "Decide tempo & key", d: "Original vs. yours. If you're changing key for your range, decide now — chart in numbers so a key move later is one click." },
        { t: "Declare the holes", d: "Which parts YOU play live vs. what's tracked. Typical: you play guitar and sing live; everything else is tracked." },
        { t: "List the signature moments", d: "Intro riff, stop hits, instrumental breaks, the one fill the audience waits for. These are non-negotiable in the arrangement." }
      ],
      tips: [
        "Chart it in Nashville numbers so a key change is one move later.",
        "Write the decision sheet, not the demo. Don't program anything until it exists."
      ],
      watchout: "Don't start programming before the section map exists — re-arranging after drums are in is painful."
    },

    /* -------- MAP -------- */
    {
      id: "section-map", phase: "map", tool: "both", minutes: 6,
      title: "Section mapping: chart the song bar-by-bar",
      intro: "Chart the song into sections with bar counts. This is your blueprint, your arrangement skeleton, and your markers in the DAW.",
      steps: [
        { t: "Label every section", d: "Intro, verse, pre-chorus, chorus, bridge, solo, breakdown, outro — each with a bar count from your reference." },
        { t: "Mark the peaks", d: "Where is energy max? Usually the final chorus or outro. Everything else builds toward it." },
        { t: "Note the odd stuff", d: "Stops, hits, a 3-bar turnaround, a 2-beat drop, a half-time bridge. These are what make it feel like the song." },
        { t: "Total it up", d: "Sum the bars × 4 beats for a first length check against the original. If you're way longer, decide where to trim." }
      ],
      tips: [
        "A two-bar intro beats an eight-bar intro for set flow — trim where the original dawdles.",
        "Copy the section map into the DAW as markers/regions so the whole session is pre-blocked before you touch a note."
      ],
      watchout: "Counting wrong here compounds: a wrong bar count in verse 1 makes the pre-chorus land early every time."
    },
    {
      id: "key-tempo", phase: "map", tool: "both", minutes: 5,
      title: "Key, tempo & feel: lock the foundation",
      intro: "Lock tempo and key before a single note. Use the Tools page — tap tempo against your reference — and decide the feel (straight vs. swing vs. half-time).",
      steps: [
        { t: "Tempo", d: "Tap along to the reference (or use your DAW's tempo detection) and round to a sensible whole BPM. Don't keep a 120.7 BPM file." },
        { t: "Feel", d: "Straight 8ths/16ths, swing/shuffle, or half-time? Decide per section, not globally." },
        { t: "Key", d: "Confirm the original, then your performance key for your range. Transpose now if needed — chart in numbers so it's trivial." },
        { t: "Grid setup", d: "Set click/count-in, time signature (almost always 4/4 — flag any odd meters), and your BPM in the project." }
      ],
      tips: [
        "Half-time vs. double-time is a feel choice, not a math error — decide it deliberately.",
        "Round BPM to whole numbers; a fractional tempo is a pain to line up on a road rig."
      ],
      watchout: "A swing/shuffle feel programmed as straight 16ths will sound wrong no matter how good the parts are."
    },

    /* -------- BUILD — DRUMS -------- */
    {
      id: "bandlab-drums", phase: "build", tool: "bandlab", minutes: 7,
      title: "Programming drums in BandLab's MIDI roll",
      intro: "BandLab's piano roll is a proper drum programmer. General MIDI mapping: C1 = kick, D1 = snare, F#1 = closed hat, A#1 = open hat. Memorize those four and you'll fly.",
      steps: [
        { t: "Create the track", d: "Click + → MIDI Instrument track → choose a drum kit (acoustic for rock/pop, electronic/hip-hop kit for modern)." },
        { t: "Make a region", d: "Click in the timeline to create a 1–2 bar region, double-click it to open the piano roll, set snap/quantize to 1/16." },
        { t: "Program in layers", d: "Kick first (beats 1 & 3), snare (2 & 4), then hats (8ths). Audition patterns in the Drum Machine tool before committing." },
        { t: "Velocity for realism", d: "Downbeats 100–127, offbeats 40–80. Flat-velocity drums sound fake instantly. Draw the velocity lane." },
        { t: "Loop it out", d: "Loop the region across the section. Leave fills for the arrange pass, once structure is final." }
      ],
      tips: [
        "Memorize C1/D1/F#1/A#1 and you'll program twice as fast.",
        "Quantize 1/16 for drums, but nudge hats or add swing if it feels robotic.",
        "Name tracks and color-code (drums red, bass blue, keys green) from bar one."
      ],
      watchout: "Programming a full beat in one giant region makes edits painful — work in 1–2 bar cells."
    },
    {
      id: "garageband-drummer", phase: "build", tool: "garageband", minutes: 7,
      title: "GarageBand's Drummer: human feel, fast",
      intro: "Drummer is GarageBand's AI drummer — pick a player, set an XY pad (simple↔complex, soft↔loud), and get a human-feel part instantly. Then convert to MIDI to fine-tune.",
      steps: [
        { t: "Add Drummer", d: "Add track → Drummer → pick a genre/player. A region auto-generates." },
        { t: "Set the XY pad per section", d: "Verse = lower-left (simple, soft). Chorus = upper-right (complex, loud). Each region can hold its own settings." },
        { t: "Use Follow", d: "Point Follow at your bass once it exists, and the kick locks to the bass — low end tightens immediately." },
        { t: "Convert to MIDI", d: "Right-click a region → Convert to MIDI Region. Now hand-edit hits, ghost notes, and fills in the piano roll." },
        { t: "Full control option", d: "If you want total control, skip Drummer and hand-program a Software Instrument drum kit instead." }
      ],
      tips: [
        "Convert to MIDI is the power move: Drummer for the groove, MIDI for the details.",
        "Make separate Drummer regions for verse and chorus so sections actually feel different."
      ],
      watchout: "Drummer sounds great immediately — don't trust the first take at a tempo it wasn't meant for. Always audition at your locked BPM."
    },

    /* -------- BUILD — BASS -------- */
    {
      id: "bass", phase: "build", tool: "both", minutes: 5,
      title: "Bass: lock the kick, play the roots",
      intro: "The bass is the glue between drums and chords. Root notes on the kick's rhythm, passing tones for motion — and restraint is the whole skill.",
      steps: [
        { t: "Follow the chart", d: "Root on beat 1 of every chord, minimum. That alone carries the song." },
        { t: "Lock with the kick", d: "Bass and kick hit together = solid low end. Anywhere they diverge, make it a deliberate choice." },
        { t: "Choose length", d: "Short stabs vs. sustained. Match the song's pocket — note length is articulation." },
        { t: "Pick the sound", d: "BandLab: fingered electric or 808/sub bass preset. GarageBand: Software Instrument bass, or record a real bass DI." }
      ],
      tips: [
        "Don't play more notes than the drummer plays on kick — bass busy-ness kills the pocket.",
        "Keep bass in the C1–C2 range so it sits under the keys and leaves the midrange open.",
        "In GarageBand, lock the kick with Drummer's Follow — instant tightness."
      ],
      watchout: "A bass part with independent rhythm from the kick is where backing tracks fall apart — that's the foundation of the whole thing."
    },

    /* -------- BUILD — KEYS -------- */
    {
      id: "keys-pads", phase: "build", tool: "both", minutes: 5,
      title: "Keys & pads: pad, not puddle",
      intro: "Keys and pads fill the harmonic space, but they're the #1 source of mud and the #1 thing that fights a live vocal. Think small, sustained, and out of the way.",
      steps: [
        { t: "Pads", d: "Sustained triads (3 notes, root position is fine) with a slow attack. Close voicings get muddy — spread them if it turns to soup." },
        { t: "Comping", d: "Short rhythmic stabs (like a guitar would play) if the arrangement needs motion instead of wash." },
        { t: "Register discipline", d: "Keep keys above the bass (C2 and up) and out of the vocal's sweet spot." },
        { t: "Pick the sound", d: "BandLab: piano/EP/synth-pad presets. GarageBand: Software Instrument keys. Dial attack up for pads, down for comping." }
      ],
      tips: [
        "Two-note pads (root + 3rd, or root + 5th) often beat full triads in a mix.",
        "High-pass pads around 150–200 Hz to keep the low end for bass and kick.",
        "Pads go wide in the stereo field — your vocal stays center. That's the space you're buying."
      ],
      watchout: "A loud pad in the vocal register is the classic 'my voice is buried' mistake — pan it wide, HPF it, and turn it down."
    },

    /* -------- BUILD — GUITARS -------- */
    {
      id: "garageband-guitars", phase: "build", tool: "garageband", minutes: 6,
      title: "Guitars in GarageBand: DI, Amp Designer, doubles",
      intro: "For guitar in GarageBand, record a clean DI and tone-shape with Amp Designer (or mic a real amp). Double-track rhythm parts for width and pan them apart.",
      steps: [
        { t: "Track setup", d: "Audio track → pick an amp sim (Amp Designer) or set input to mic your amp. Set input in Preferences." },
        { t: "Record to the click", d: "Use count-in, loop a section, and comp takes until the pocket's right." },
        { t: "Double-track", d: "Play the part twice (two real performances, not copy-paste) and pan hard L/R for width on rhythm parts." },
        { t: "MIDI alternative", d: "Software Instrument with a guitar patch works for sketches, but expect less realism than a real DI." }
      ],
      tips: [
        "Double-tracking = two separate performances, not a duplicated region — that's what gives width.",
        "Record DI and re-amp / tone-shape later so you're never stuck with one tone.",
        "If you're the one playing guitar live on this song, this whole lesson applies to the parts you are NOT playing."
      ],
      watchout: "Copy-pasting a take and nudging it a few ms is fake doubling — it collapses to mono and sounds like phasing, not width."
    },
    {
      id: "leave-it-out", phase: "build", tool: "both", minutes: 4,
      title: "What to leave out (you play it live)",
      intro: "A backing track that already contains your live parts fights you on stage. Decide the holes deliberately — this is what makes it a backing track, not a karaoke of yourself.",
      steps: [
        { t: "Define your live role per song", d: "Lead vocal, rhythm guitar, etc. Don't double those parts in the track — or keep only a thin pad underneath for support." },
        { t: "Leave a frequency hole", d: "If you sing, don't stack a loud pad or piano in the vocal range." },
        { t: "Cue yourself", d: "Keep signature intro riffs in the track only if you are NOT playing them live. Otherwise you're racing yourself." },
        { t: "One-guitarist plan", d: "If you might be the only guitarist, keep a rhythm guitar bed in the track but leave all leads out." }
      ],
      tips: [
        "The track supports you; it shouldn't already contain a better version of your part.",
        "Your live guitar + a track guitar in the same register = mud. Pick one lane per register."
      ],
      watchout: "Every part you leave in the track is a part you can't vary live — leave yourself room to breathe."
    },

    /* -------- ARRANGE -------- */
    {
      id: "arrange-dynamics", phase: "arrange", tool: "both", minutes: 6,
      title: "Arrangement dynamics: make every section move",
      intro: "Covers die when every section has the same energy. Build the arrangement in steps — and remember contrast is about subtraction, not just addition.",
      steps: [
        { t: "Density by section", d: "Verse = drums + bass + thin keys. Chorus = add pads, open hats, fuller drums." },
        { t: "Plan with markers", d: "Lay out sections first, then remove parts (not just add) to create contrast." },
        { t: "Create breathing room", d: "Half-time sections, dropped drums, or a keys-only bridge give the ear a rest and make the chorus land." },
        { t: "Peak at the end", d: "Final chorus/outro = most layers, or a lift (modulate up) if it suits the song." }
      ],
      tips: [
        "The verse feels smaller when the chorus is actually bigger — subtraction is the tool.",
        "Program fills and variations once structure is final, not before.",
        "A keys-only bridge with no drums is often the biggest moment in a full set."
      ],
      watchout: "Adding a layer to every section until they're all the same height flattens the whole song."
    },
    {
      id: "fills-transitions", phase: "arrange", tool: "both", minutes: 5,
      title: "Fills, transitions & stop hits",
      intro: "Transitions are what make a programmed track feel like a band. A few well-placed fills and hits at section boundaries do more than any number of layers.",
      steps: [
        { t: "Section pickup fills", d: "A 1-beat snare/tom fill at the end of every 4 or 8 bars signals the change coming." },
        { t: "Stop hits", d: "Cut all instruments on a hit (say, beat 1 of the chorus) then re-enter — huge live energy, costs nothing." },
        { t: "Crashes at the top", d: "Cymbal crash at section tops; drop the crash when you want it to feel intimate." },
        { t: "Coordinate with live you", d: "If you play guitar live, leave the space where YOU take the fill — not the track." }
      ],
      tips: [
        "Automate a quick drum fill by nudging MIDI notes, not by adding a new loop.",
        "One good stop-hit per song beats ten fills."
      ],
      watchout: "Fills at the end of EVERY bar become wallpaper — reserve them for actual section changes."
    },

    /* -------- MIX -------- */
    {
      id: "mix-hole", phase: "mix", tool: "both", minutes: 6,
      title: "Mixing a backing track: leave a hole for you",
      intro: "A backing track is mixed to support, not to be a finished record. Leave space, headroom, and a hole in the center for your live voice and instrument.",
      steps: [
        { t: "Balance first", d: "Drums and bass are the bed; keys/pads/guitars support; your live vocal/guitar sits on top. Mix toward that hierarchy." },
        { t: "High-pass everything", d: "Everything that isn't bass or kick gets a HPF around 80–150 Hz. Kills mud instantly." },
        { t: "Pan for space", d: "Kick/bass center, pads wide, rhythm guitars L/R. Leave the center for you." },
        { t: "Leave headroom", d: "Keep master peaking around −6 dB. The FOH or your rig adds the rest." }
      ],
      tips: [
        "If it sounds like a complete record, it's probably too full to play over.",
        "Mix at low volume — if you can hear every part quietly, it'll translate."
      ],
      watchout: "Mastering-loud backing tracks clip the moment a live vocal adds up top — keep the headroom."
    },
    {
      id: "mono-check", phase: "mix", tool: "both", minutes: 4,
      title: "Mono & reference checks",
      intro: "Live playback is often mono or imperfect. Make sure the track survives the worst-case room.",
      steps: [
        { t: "Collapse to mono", d: "Sum to mono and check nothing disappears (wide pads and side-effects are the usual casualties)." },
        { t: "Test on real speakers", d: "Phone, earbuds, a PA wedge — the audience won't hear your monitors." },
        { t: "A/B against your reference", d: "Match level first, then compare balance and feel." },
        { t: "Check the intro and quiet section", d: "That's the first thing the audience hears — it has to read instantly." }
      ],
      tips: [
        "A track that's mono-safe is road-safe.",
        "Match reference loudness with your ears at first, not a number."
      ],
      watchout: "Stereo-widened pads can vanish in mono and take the whole harmony with them."
    },

    /* -------- SHIP -------- */
    {
      id: "export-stems", phase: "ship", tool: "both", minutes: 5,
      title: "Export: full mix + stems, named right",
      intro: "Export a full mix for easy playback AND stems so you can adjust balances on the road. Naming discipline here saves you at soundcheck.",
      steps: [
        { t: "Full mix", d: "WAV or high-bitrate MP3/AAC at 44.1 kHz+. AIFF is fine (GarageBand's default)." },
        { t: "Stems", d: "Export each instrument group (drums, bass, keys, guitars) as separate files from the SAME start point so they line up." },
        { t: "Name everything", d: "SongTitle_120bpm_Full.wav, SongTitle_120bpm_Drums.wav — consistent across the whole EP." },
        { t: "Click/cue track", d: "Include one if your rig needs it (many artists run click on a separate channel to the monitor only)." },
        { t: "Master folder per song", d: "Full mix + stems + the session file + the license doc, in one folder." }
      ],
      tips: [
        "Export stems at the same start point or they'll never line up on stage.",
        "Bounce a 'rehearsal' version with a louder click for learning, and a clean 'show' version."
      ],
      watchout: "Stems that don't share a common start point are useless live — always bounce from bar 1."
    },
    {
      id: "road-rig", phase: "ship", tool: "both", minutes: 4,
      title: "On the road: playback, cues, redundancy",
      intro: "The track is only as good as the rig that plays it. This is where DIY backing tracks live or die.",
      steps: [
        { t: "Playback device", d: "A phone/tablet with a reliable player into a DI — test it. Don't wing it." },
        { t: "Redundancy", d: "Two devices with the same files, plus a cloud backup. You will need it eventually." },
        { t: "Cues", d: "Run click to your monitor only (never the house) — or count in without one." },
        { t: "Full-set rehearsal", d: "Rehearse the whole set with tracks, including transitions between songs, before the show." }
      ],
      tips: [
        "Name show files with set-order numbers so the player runs top to bottom.",
        "Test every song's tempo and key on the playback rig the day before, not at soundcheck."
      ],
      watchout: "A dead phone with no backup at a gig is a self-inflicted disaster — redundancy is cheap insurance."
    }
  ];

  /* ============ DRUM PATTERNS (16-step, 16th notes) ============ */
  var drumPatterns = [
    {
      id: "rock", name: "Backbeat Rock", genre: "Rock / Pop", bpm: [90, 140],
      desc: "The universal backbeat. Kick on 1 & 3, snare on 2 & 4, hats on 8ths. The default starting point for covers.",
      kick:  [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
      snare: [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
      chat:  [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
      ohat:  [0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0]
    },
    {
      id: "fourfloor", name: "Four-on-the-Floor", genre: "Disco / Pop / EDM", bpm: [100, 128],
      desc: "Kick every beat, snare on 2 & 4, open hats on the offbeats. Instant drive for uptempo pop.",
      kick:  [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
      snare: [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
      chat:  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      ohat:  [0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0]
    },
    {
      id: "poppush", name: "Pop Push", genre: "Modern Pop", bpm: [90, 120],
      desc: "Backbeat with a kick pushed to the 'and of 2' — the modern pop lilt.",
      kick:  [1,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0],
      snare: [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
      chat:  [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
      ohat:  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0]
    },
    {
      id: "halftime", name: "Half-Time Ballad", genre: "Ballad / Slow", bpm: [60, 80],
      desc: "Snare only on beat 3 — the 'big slow' feel. Kick on 1 and the 'and of 2'.",
      kick:  [1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
      snare: [0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
      chat:  [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
      ohat:  [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0]
    },
    {
      id: "motown", name: "Motown / Soul", genre: "Soul / R&B", bpm: [90, 120],
      desc: "Kick on 1 & 3 with a full snare on 2 & 4 — the classic '60s soul pocket.",
      kick:  [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
      snare: [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
      chat:  [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
      ohat:  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0]
    },
    {
      id: "funk", name: "Funk 16ths", genre: "Funk / Pop", bpm: [90, 110],
      desc: "16th-note hats with syncopated kicks — the strut. Great for groove-heavy covers.",
      kick:  [1,0,0,0,0,0,0,0,1,0,1,0,0,0,1,0],
      snare: [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
      chat:  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      ohat:  [0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0]
    },
    {
      id: "reggae", name: "Reggae One-Drop", genre: "Reggae", bpm: [70, 90],
      desc: "Kick and rim on beat 3, hats on the offbeats (the 'skank' pulse).",
      kick:  [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
      snare: [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
      chat:  [0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0],
      ohat:  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    },
    {
      id: "train", name: "Train Beat", genre: "Country / Folk", bpm: [100, 130],
      desc: "Snare on every 8th (accent 2 & 4) with kick on 1 & 3 — the rolling country groove.",
      kick:  [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
      snare: [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
      chat:  [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
      ohat:  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    }
  ];

  /* ============ KEYS (generated) ============ */
  var SHARP = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
  var FLAT  = ["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"];
  var keyDefs = [
    { name: "C",  flats: false, root: 0 },
    { name: "G",  flats: false, root: 7 },
    { name: "D",  flats: false, root: 2 },
    { name: "A",  flats: false, root: 9 },
    { name: "E",  flats: false, root: 4 },
    { name: "B",  flats: false, root: 11 },
    { name: "F#", flats: false, root: 6 },
    { name: "Db", flats: true,  root: 1 },
    { name: "Ab", flats: true,  root: 8 },
    { name: "Eb", flats: true,  root: 3 },
    { name: "Bb", flats: true,  root: 10 },
    { name: "F",  flats: true,  root: 5 }
  ];
  var SCALE_STEPS = [0, 2, 4, 5, 7, 9, 11];
  var DEGREES = [
    { num: "1",  roman: "I",   chordType: "maj" },
    { num: "2-", roman: "ii",  chordType: "min" },
    { num: "3-", roman: "iii", chordType: "min" },
    { num: "4",  roman: "IV",  chordType: "maj" },
    { num: "5",  roman: "V",   chordType: "maj" },
    { num: "6-", roman: "vi",  chordType: "min" },
    { num: "7°", roman: "vii°", chordType: "dim" }
  ];

  function noteName(pc, flats) { return flats ? FLAT[pc] : SHARP[pc]; }
  function chordSymbol(rootPc, type, flats) {
    var r = noteName(rootPc, flats);
    if (type === "min") return r + "m";
    if (type === "dim") return r + "dim";
    return r;
  }
  function buildKey(def) {
    var chords = SCALE_STEPS.map(function (st, i) {
      var root = (def.root + st) % 12;
      return {
        symbol: chordSymbol(root, DEGREES[i].chordType, def.flats),
        num: DEGREES[i].num,
        roman: DEGREES[i].roman
      };
    });
    return { name: def.name, root: def.root, flats: def.flats, chords: chords };
  }
  var keys = keyDefs.map(buildKey);

  var progressions = [
    { name: "The Pop Axis", nums: "1 · 5 · 6- · 4", note: "I–V–vi–IV — the most used progression in modern pop." },
    { name: "The Sadder Flip", nums: "6- · 4 · 1 · 5", note: "vi–IV–I–V — the emotional mirror of the pop axis." },
    { name: "Classic 1–4–5", nums: "1 · 4 · 5", note: "I–IV–V — roots rock and blues-adjacent songs." },
    { name: "The 50s Doo-Wop", nums: "1 · 6- · 4 · 5", note: "I–vi–IV–V — the doo-wop / 50s ballad move." },
    { name: "Jazz / R&B Turnaround", nums: "2- · 5 · 1", note: "ii–V–I — classic turnaround, great for intros/outros." },
    { name: "12-Bar Blues", nums: "1 · 4 · 1 · 1 · 4 · 4 · 1 · 1 · 5 · 4 · 1 · 5", note: "I–IV–I · IV–IV–I · V–IV–I–V — four bars each line." }
  ];

  /* ============ GM DRUM MAP ============ */
  var gmDrumMap = [
    { key: "C1 (36)", sound: "Kick" },
    { key: "D1 (38)", sound: "Snare" },
    { key: "E1 (40)", sound: "Snare (rim)" },
    { key: "F1 (41)", sound: "Low Tom" },
    { key: "F#1 (42)", sound: "Closed Hi-Hat" },
    { key: "A#1 (46)", sound: "Open Hi-Hat" },
    { key: "C#2 (49)", sound: "Crash" },
    { key: "A2 (57)", sound: "Crash 2" },
    { key: "D2 (50)", sound: "High Tom" },
    { key: "E2 (52)", sound: "Ride" }
  ];

  /* ============ CHEAT SHEETS ============ */
  var cheatSheets = [
    {
      id: "method", title: "The 6-Phase Method",
      body: [
        "1. PREP — pick one reference, decide tempo/key, declare your live holes, list signature moments.",
        "2. MAP — chart every section with bar counts, mark peaks and stops, lock BPM/key/feel.",
        "3. BUILD — drums → bass → keys/pads → guitars. Always in that order.",
        "4. ARRANGE — dynamics by density, fills at section changes, one good stop-hit.",
        "5. MIX — balance for support, HPF everything non-bass, pan wide but leave center for you, −6 dB headroom.",
        "6. SHIP — export full mix + same-start-point stems, name them, back them up twice."
      ]
    },
    {
      id: "gm-map", title: "General MIDI Drum Map",
      body: gmDrumMap.map(function (d) { return d.key + " → " + d.sound; })
    },
    {
      id: "bandlab-flow", title: "BandLab Quick Workflow",
      body: [
        "1. bandlab.com → Create → Mix Editor.",
        "2. Set tempo (click BPM) and metronome.",
        "3. + → MIDI Instrument → drum kit. Draw a 1–2 bar region.",
        "4. Double-click region → piano roll → snap 1/16. Kick C1, snare D1, hat F#1, open hat A#1.",
        "5. Velocity lane: 100–127 downbeats, 40–80 offbeats.",
        "6. + → MIDI Instrument → bass preset. Root on beat 1, lock to kick.",
        "7. + → MIDI Instrument → keys/pad preset. Triads, wide pan, HPF.",
        "8. Loop regions across sections; vary for verse/chorus.",
        "9. Name + color-code tracks as you go.",
        "10. Export full mix + stems (same start point)."
      ]
    },
    {
      id: "garageband-flow", title: "GarageBand Quick Workflow",
      body: [
        "1. New project → set tempo, key, count-in.",
        "2. Add track → Drummer → pick a player. XY pad: verse low-left, chorus up-right.",
        "3. Right-click region → Convert to MIDI Region to hand-edit fills.",
        "4. Software Instrument → bass. Follow Drummer to lock kick.",
        "5. Software Instrument → keys/pads. Wide pan, HPF 150 Hz.",
        "6. Audio track → Amp Designer for real guitar DI; double-track, pan L/R.",
        "7. Region per section; markers for the song map.",
        "8. Mix: balance, HPF, −6 dB headroom, mono check.",
        "9. Share → Export Song to Disk: full mix + stems.",
        "10. Name files SongTitle_BPM_Part; back up twice."
      ]
    },
    {
      id: "mix-checklist", title: "Backing-Track Mix Checklist",
      body: [
        "□ Balance: drums/bass = bed, keys/pads support, your live part on top.",
        "□ HPF everything non-bass/non-kick (80–150 Hz).",
        "□ Pan: kick/bass center, pads wide, rhythm guitars L/R. Center = you.",
        "□ Master peaking ≈ −6 dB (leave headroom).",
        "□ Mono check: nothing disappears.",
        "□ A/B vs reference at matched volume.",
        "□ Intro + quietest section read instantly."
      ]
    },
    {
      id: "export", title: "Export & Naming Convention",
      body: [
        "Full mix: WAV / AIFF / 320 MP3 @ 44.1 kHz.",
        "Stems: every instrument group, SAME start point (bar 1).",
        "Click/cue track on its own channel (monitor only).",
        "Naming: SongTitle_120bpm_Full · _Drums · _Bass · _Keys · _Guitars · _Click.",
        "Rehearsal version (loud click) + clean show version.",
        "Per-song folder: full mix + stems + session + license doc."
      ]
    },
    {
      id: "numbers", title: "Number System & Common Progressions",
      body: [
        "1 = I = major · 2- = ii = minor · 3- = iii · 4 = IV · 5 = V · 6- = vi · 7° = vii°.",
        "Pop Axis: 1 · 5 · 6- · 4",
        "Sadder flip: 6- · 4 · 1 · 5",
        "1–4–5: 1 · 4 · 5",
        "Doo-wop: 1 · 6- · 4 · 5",
        "Turnaround: 2- · 5 · 1",
        "12-bar blues: 1 · 4 · 1 · 1 · 4 · 4 · 1 · 1 · 5 · 4 · 1 · 5"
      ]
    },
    {
      id: "decision", title: "Song Decision Sheet (per cover)",
      body: [
        "Song: ______________ · Artist: ______________",
        "Reference recording: ______________",
        "Key (original): __ → Key (mine): __",
        "Tempo: ___ BPM · Feel: straight / swing / half-time",
        "My live part(s): ______________",
        "Tracked: drums / bass / keys / pads / guitars: ______________",
        "Signature moments (intro riff, stops, fills): ______________",
        "Sections & bars: ______________",
        "Mechanical: approved ✓ · Master: mine (self-recorded) ✓"
      ]
    }
  ];

  /* ============ LICENSING (quick reference) ============ */
  var licensing = {
    recap: [
      { term: "Mechanical license", def: "The right to reproduce & distribute a COVER of a composition. You hold approvals — keep the letters on file per song." },
      { term: "Master-use license", def: "The right to use someone else's RECORDING. This is what you avoid entirely by performing/programming every part yourself." },
      { term: "Your master", def: "You performed and programmed it → you own the new recording. No label, no clearance, no split." },
      { term: "MLC (mechanicals)", def: "US interactive-streaming & download mechanicals on your covers flow through The MLC — confirm each cover is registered/claimed in your MLC account." },
      { term: "BMI (performance)", def: "Public performance (live + streaming performance side) through your PRO — setlists and streaming royalties." }
    ],
    checklist: [
      "Mechanical approval letter saved in the song folder.",
      "Cover registered/claimed with The MLC.",
      "PRO (BMI) info attached to the release for the performance side.",
      "Master is 100% self-recorded — no third-party samples of the original.",
      "Any BandLab/GarageBand loops documented (licensed for new recordings).",
      "Release credit line: 'Written by [writers] · Recorded & performed by [you].'"
    ]
  };

  /* ============ SONG STEP TEMPLATE ============ */
  var songSteps = [
    "Chart sections with bar counts",
    "Lock key & tempo",
    "Reference track loaded & matched",
    "Drums laid down",
    "Bass locked to kick",
    "Keys / pads in place",
    "Guitars done (or left out live)",
    "Arrangement dynamics & fills",
    "Rough mix + mono check",
    "Exported: full mix + labeled stems",
    "Mechanical filed & on record",
    "Tested on the playback rig"
  ];

  return {
    phases: phases,
    lessons: lessons,
    drumPatterns: drumPatterns,
    keys: keys,
    keyNames: keyDefs.map(function (k) { return k.name; }),
    progressions: progressions,
    gmDrumMap: gmDrumMap,
    cheatSheets: cheatSheets,
    licensing: licensing,
    songSteps: songSteps
  };
})();
