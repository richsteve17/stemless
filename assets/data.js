/* Stemless — Backing Track Studio · content data */
window.STUDIO = (function () {

  /* ============ PHASES ============ */
  var phases = [
    { id: "prep",    name: "Start",   tag: "Producer mindset — no instrument skills required" },
    { id: "map",     name: "Lay Out", tag: "Copy the supplied section and chord blocks" },
    { id: "build",   name: "Build",   tag: "Drums → bass roots → virtual guitar blocks" },
    { id: "arrange", name: "Arrange", tag: "Dynamics, fills, transitions, space" },
    { id: "mix",     name: "Mix",     tag: "Leave a hole for you, mono-safe" },
    { id: "ship",    name: "Ship",    tag: "Export, stems, road rig, redundancy" }
  ];

  /* ============ LESSONS ============ */
  var lessons = [
    /* -------- PREP -------- */
    {
      id: "producer-not-player", phase: "prep", tool: "both", minutes: 6,
      title: "Start here: you are the producer, not the guitar player",
      intro: "You do not need to know an instrument or read music. You already understand pulse, phrasing, drops, and crowd energy from singing, rapping, DJing, and finger drumming. In this app you will place labeled blocks on a grid, listen, and move them until your vocal feels right.",
      steps: [
        { t: "A bar is four counts", d: "Count 1-2-3-4 with the click. One rectangle from one bar line to the next lasts those four counts. That is enough theory to start." },
        { t: "A chord block is several notes stacked", d: "You never have to work out the notes. Each EP recipe gives the exact stack, such as C3 + G3 + C4. Draw those notes directly above each other so they start and stop together." },
        { t: "A bass root is one low note", d: "If the chord says C, draw a low C. If it says F, draw a low F. The recipe gives the octave and the order." },
        { t: "Your ears make the final call", d: "Loop four or eight bars, sing over them, and move a chord boundary if it lands before or after your phrase. That is producing — not failing a music test." },
        { t: "Build in tiny loops", d: "Never attack a whole song. Make one verse and one chorus work, then duplicate them and change the few sections that differ." }
      ],
      tips: [
        "Use your finger-drumming instinct for groove, then quantize the performance so the DAW cleans up timing.",
        "Your first pass only needs drums, bass roots, and virtual-guitar power blocks. Skip keys and detail until you can sing the song over it."
      ],
      watchout: "Do not stop to learn piano or guitar first. The piano roll is a visual sequencer; drawing the supplied blocks is the job."
    },
    {
      id: "why-diy", phase: "prep", tool: "both", minutes: 4,
      title: "Why DIY backing tracks actually saves you money",
      intro: "You already know the split: a cover needs a mechanical license for the composition, and using a recording (stems, karaoke, the original master) needs a master-use license on top. When you perform and program every part yourself, there is no master to clear — you own the new recording, and the mechanical you already hold is the only clearance. That's the whole game.",
      steps: [
        { t: "Confirm the clearance per song", d: "Mechanical = approved (you've got this). Master = yours, because you performed and programmed every part. No third party to clear." },
        { t: "Watch your sources", d: "BandLab and GarageBand's built-in loops are licensed for use in new recordings — fine to use, keep the pack documented. A commercial stem pack or any sample of the original recording is a master-use situation again — avoid it." },
        { t: "Define the deliverable", d: "A full-band punk backing track: drums, bass, virtual guitars, and only the extra texture a song truly needs. Your lead vocal stays out so you can perform it live." }
      ],
      tips: [
        "Samples of the original recording are the fastest way to accidentally owe a master license — don't reach for them.",
        "Keep a per-song folder: license/approval letter + your session + your stems, all in one place."
      ],
      watchout: "A 'free' stem or karaoke file from a download site is usually a master-use problem in disguise. Build it yourself and the problem disappears."
    },
    {
      id: "decision-sheet", phase: "prep", tool: "both", minutes: 5,
      title: "Choose the target before you touch the DAW",
      intro: "The five EP boards already contain starter keys, tempos, chords, and punk section maps. Your job here is to confirm the vocal range and choose what you are borrowing as inspiration — never to reverse-engineer the whole song alone.",
      steps: [
        { t: "Pick ONE exact reference file", d: "Use the specific version named on the EP board. Put a legal streaming link in your notes; do not import that recording into the released master." },
        { t: "Do a vocal range test", d: "Play the recipe's chord buttons and sing the highest chorus. Comfortable means keep the supplied key. Strained means use the Transpose tool before building." },
        { t: "Your live hole is simple", d: "You sing and/or rap live. Do not put a lead vocal, vocal melody, or constant center-pad in the show backing track." },
        { t: "Choose the signature moments", d: "Keep the moments you named: Me First energy on Sloop, the Sid Vicious lounge-to-punk turn, Blister's drop, and the Black Flag-style breakdown in American Girl." }
      ],
      tips: [
        "A phone voice memo over a four-bar chord loop is enough to approve the key.",
        "The supplied charts are starter arrangements. Moving a boundary to fit your phrasing is the correct move."
      ],
      watchout: "Do not build all five at once. Finish the Sloop John B eight-bar test loop before opening the next song."
    },

    /* -------- MAP -------- */
    {
      id: "section-map", phase: "map", tool: "both", minutes: 6,
      title: "Copy the supplied section map into the timeline",
      intro: "A section is just a named span of bars: Intro, Verse, Chorus, Breakdown, Outro. Each EP recipe gives you a starter map. You will create empty colored regions first, before drawing any notes.",
      steps: [
        { t: "Turn the click on and count", d: "Most of these songs are in 4/4: every bar is 1-2-3-4. The heavier line on the DAW grid is the next bar." },
        { t: "Create empty blocks", d: "For every recipe row, drag an empty region for the stated number of bars. Rename or color it with the section name." },
        { t: "Add the energy note", d: "Write 'quiet,' 'full,' 'half-time,' or 'STOP' in the region name. Those instructions matter more than fancy playing." },
        { t: "Check with a scratch vocal", d: "Loop the section and sing it. If your phrase needs another bar, extend the block now. The recipe is a starting map, not a cage." }
      ],
      tips: [
        "Duplicate repeated verses and choruses instead of counting them again.",
        "Different colors for verse, chorus, and breakdown make the whole song readable from across the room."
      ],
      watchout: "Do not start detailed drums before the empty section blocks fit your vocal — structure changes are easiest while the project is still empty."
    },
    {
      id: "key-tempo", phase: "map", tool: "both", minutes: 5,
      title: "Set BPM and test the supplied key with your voice",
      intro: "You do not have to identify key or tempo by ear. Start with the number on the song board, use Tap Tempo to verify the exact recording, and use your voice to approve the key.",
      steps: [
        { t: "Type the recipe BPM", d: "Click the tempo number in the DAW and type the whole number shown on the board. For Sloop and Blister, build at the half-speed number first." },
        { t: "Understand feel without theory", d: "Straight means evenly spaced hits. Double-time means the drums act twice as busy while the vocal keeps its pace. Half-time means the snare feels slow and heavy." },
        { t: "Test the key", d: "Click the board's Hear chord buttons, loop the verse, and sing. If the highest section is comfortable, keep the key. If not, move every chord together with Transpose." },
        { t: "Grid setup", d: "Choose 4/4, enable count-in and metronome, and set Snap/Quantize to 1/16 for drums. You can change note length later." }
      ],
      tips: [
        "Half-time vs. double-time is a feel choice, not a math error — decide it deliberately.",
        "Round BPM to whole numbers; a fractional tempo is a pain to line up on a road rig."
      ],
      watchout: "A swing/shuffle feel programmed as straight 16ths will sound wrong no matter how good the parts are."
    },

    {
      id: "piano-roll-zero", phase: "map", tool: "both", minutes: 7,
      title: "Piano roll from zero: rectangles, rows, and the grid",
      intro: "The piano roll looks like a spreadsheet turned sideways. Time runs left to right. Pitch runs low to high. A rectangle means 'play this row from here to here.' You will use the supplied letters instead of playing a keyboard.",
      steps: [
        { t: "Find the bar lines", d: "The darkest vertical lines divide bars; lighter lines divide beats and 16th-notes. Turn Snap on so rectangles land exactly on them." },
        { t: "Find a note row", d: "The keyboard labels C notes. From C, the white rows rise C-D-E-F-G-A-B. Black rows are sharps/flats. Zoom vertically until labels are readable." },
        { t: "Draw and resize", d: "Double-click or use the pencil to add a note. Drag its left edge to move the start and right edge to change duration. Delete with Backspace/Delete." },
        { t: "Stack a chord", d: "Draw the first supplied note, then draw the second and third directly above it at the same time. Drag-select all three so they move as one block." },
        { t: "Duplicate instead of replaying", d: "Copy/paste or Option/Alt-drag a correct bar. Change only the rows needed for the next chord. This is the main workflow for the whole EP." }
      ],
      tips: [
        "If the DAW calls middle C C3 instead of C4, that is normal. Match the letter and relative low/middle/high position.",
        "Solo one track while drawing, then turn the full band back on to judge it."
      ],
      watchout: "A rectangle one thin grid line late will sound sloppy. Keep Snap on and Quantize to 1/16 until you intentionally humanize a part."
    },

    /* -------- BUILD — DRUMS -------- */
    {
      id: "bandlab-drums", phase: "build", tool: "bandlab", minutes: 7,
      title: "BandLab drums: copy the lit squares",
      intro: "No drumming theory is required. Open this app's Drum Machine beside BandLab and copy each lit square into the matching row: kick C1, snare D1, closed hat F#1, open hat A#1.",
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

    {
      id: "finger-drums", phase: "build", tool: "both", minutes: 6,
      title: "Use your finger drumming — then let quantize clean it",
      intro: "Your finger-drumming experience is an advantage even if it is not session-player level. Capture the energy first; the DAW can pull each hit onto the grid.",
      steps: [
        { t: "Record one sound at a time", d: "Loop one bar. Finger-drum only kick, stop, then record snare, then hats. Layering is much easier than performing the whole kit at once." },
        { t: "Use a slow practice tempo", d: "For 185–194 BPM songs, record at the half-speed number shown on the board. The pattern stays usable when tempo changes." },
        { t: "Quantize", d: "Select the recorded notes and choose 1/16 Quantize at roughly 85–100% strength. Fix obvious misses by dragging or deleting them." },
        { t: "Keep the best human part", d: "If the hats feel stiff after full quantize, keep your recorded hats and use perfectly drawn kick/snare. Hybrid is often better." },
        { t: "Make fills separately", d: "Duplicate the final bar of a section, record one finger-drummed fill there, quantize it, and reuse only at real transitions." }
      ],
      tips: [
        "Velocity is how hard a hit lands. Keep main snare hits louder than little pickup hits.",
        "The Drum Machine preset gives you a safety net: copy it first, then replace one row with your performance."
      ],
      watchout: "Do not stack several unquantized takes because one feels weak. Edit one clean take or use the drawn preset."
    },

    /* -------- BUILD — BASS -------- */
    {
      id: "bass", phase: "build", tool: "both", minutes: 5,
      title: "Bass without playing: draw the chord-name note",
      intro: "Bass is the easiest instrument to fake convincingly. If the recipe says C for one bar, draw one low C rectangle for that bar. The board supplies every note in order.",
      steps: [
        { t: "Add a virtual bass", d: "BandLab: + → Virtual Instrument → electric/fingered bass. GarageBand: Software Instrument → Bass. Open the piano roll editor." },
        { t: "Draw one long root", d: "Use the low letter named by the chord: C chord gets C2, F chord gets F2. Stretch it to the next chord boundary. Ignore all other notes for pass one." },
        { t: "Copy the whole section", d: "Read the recipe left to right and duplicate repeated bars. Solo bass + drums and check that every new root lands with the section chart." },
        { t: "Make it punk after it works", d: "Split each long note into eight equal 8th-note blocks, or copy the kick rhythm. Keep long notes in quiet/drop sections." }
      ],
      tips: [
        "Some DAWs disagree about octave numbers; if C2 sounds too high or low, move it exactly one octave while keeping the letter C.",
        "Velocity around 90–105 is enough. Identical maximum-velocity notes sound like a machine gun."
      ],
      watchout: "Do not invent fills yet. A correct one-note root part is more useful than a clever wrong bass line."
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
      id: "garageband-guitars", phase: "build", tool: "both", minutes: 8,
      title: "Punk guitar without a guitarist: draw power blocks",
      intro: "A power chord is only a supplied stack of two or three notes. The EP boards spell out each stack, so virtual guitar becomes drag, duplicate, and change the note letters — no fretting or keyboard playing.",
      steps: [
        { t: "Choose a virtual guitar", d: "BandLab: add a Virtual Instrument guitar and choose the driest rock patch available. GarageBand iPhone/iPad: Touch Instrument → Smart Guitar. GarageBand Mac: Software Instrument → guitar patch." },
        { t: "Draw the supplied stack", d: "Example: C power block is C3 + G3 + C4. Put the three notes directly above one another with identical start and end points." },
        { t: "Make the rhythm", d: "For fast punk, duplicate that stack eight times across a bar. In verses shorten every block so there is a tiny gap; in choruses make them nearly touch." },
        { t: "Humanize just enough", d: "Offset the top note a few milliseconds later than the bottom note to imitate a strum. Vary velocity about 5–10 points, never random enough to lose the beat." },
        { t: "Create width", d: "Duplicate to a second guitar track, change its amp tone, move it 10–20 ms later, and pan the two tracks left/right. Check mono for phase problems." }
      ],
      tips: [
        "Smart Guitar's chord strips are easiest on iPhone/iPad; tap the named chord and record, then quantize.",
        "Virtual guitar will sound most convincing when the notes are short, the amp has gain, and the part is not exposed alone.",
        "If a later budget allows one guest guitarist to replace these tracks, your MIDI blocks become a perfect guide."
      ],
      watchout: "Do not use a ripped guitar stem. A deliberately synthetic guitar you created is legally and creatively yours; someone else's stem is not."
    },
    {
      id: "leave-it-out", phase: "build", tool: "both", minutes: 4,
      title: "Leave the singer-shaped hole",
      intro: "Your track is the band; you are the front person. Build everything around the fact that the lead vocal, ad-libs, rap phrasing, and crowd work happen live.",
      steps: [
        { t: "No lead vocal in the show bounce", d: "A temporary scratch vocal is useful while arranging. Mute it before the clean show export." },
        { t: "Keep the center open", d: "Kick and bass can stay center, but move guitars apart and keep pads quiet. Avoid a loud synth playing the vocal melody." },
        { t: "Make a separate cue version", d: "If you need a spoken section name or count-in, put it on a cue/click stem for your monitor, not in the house mix." },
        { t: "Use backing shouts on purpose", d: "Gang vocals can be part of a punk arrangement, but record your own and place them only where the recipe calls for impact." }
      ],
      tips: [
        "A rough vocal recorded while building is a measuring tool, not a final performance.",
        "Turn the full backing track down and sing at show volume; if every word still feels easy, the hole is working."
      ],
      watchout: "Do not solve a buried vocal by mastering the backing louder. Remove or pan competing midrange parts first."
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
      id: "punkstraight", name: "Straight Punk Drive", genre: "Punk", bpm: [160, 200],
      desc: "Fast 8th-note drive: kick pushes the bar, snare stays on 2 and 4, hats never let up. Use this for Sloop John B, My Way, and Blister.",
      kick:  [1,0,1,0,0,0,1,0,1,0,1,0,0,0,1,0],
      snare: [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
      chat:  [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
      ohat:  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0]
    },
    {
      id: "punkdouble", name: "Pop-Punk Double-Time", genre: "Pop-punk", bpm: [90, 180],
      desc: "A busier kick under a clean 2-and-4 snare. At 90–100 BPM it reads as double-time; at 170+ it becomes a hardcore sprint.",
      kick:  [1,0,0,1,0,0,1,0,1,0,0,1,0,0,1,0],
      snare: [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
      chat:  [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
      ohat:  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0]
    },
    {
      id: "hardcorehalf", name: "Hardcore Half-Time", genre: "Breakdown", bpm: [140, 190],
      desc: "Kick on 1, snare on 3, open space between hits. Drop this into the American Girl / Black Flag-style breakdown.",
      kick:  [1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0],
      snare: [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
      chat:  [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
      ohat:  [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0]
    },
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
      id: "no-player", title: "No-Instrument Piano-Roll Dictionary",
      body: [
        "BAR = four counts (1-2-3-4) in these songs.",
        "PIANO ROLL = time left-to-right, low notes at bottom, high notes at top.",
        "NOTE BLOCK = one rectangle; its row is pitch and its width is duration.",
        "CHORD BLOCK = 2–3 note rectangles stacked with the same start/end.",
        "ROOT = the chord-name note used by the bass (C chord → low C).",
        "POWER BLOCK = root + fifth + root octave; each song board supplies all three notes.",
        "QUANTIZE 1/16 = pull recorded hits to the nearest 16th-note grid line.",
        "VELOCITY = how hard/loud a MIDI note is hit — not its speed.",
        "Pass one: drums + bass roots + power blocks. Sing over it before adding anything else."
      ]
    },
    {
      id: "ep-map", title: "Five-Song EP Starting Points",
      body: [
        "Sloop John B (Me First version) — C · 185 BPM (build at 93) · first project.",
        "Teenage Dirtbag — E · 94 BPM with double-time drums.",
        "My Way (Sid Vicious approach) — E · 150 BPM · sparse lounge opening into punk.",
        "Blister in the Sun — G · 194 BPM (build at 97) · G/C motion, quiet drop.",
        "American Girl — D · 176 BPM production target · D-C-D-C-D-C-Bb-C breakdown.",
        "These are starter arrangements: vocal-test the key and tap your exact reference before final tracking."
      ]
    },
    {
      id: "method", title: "The 6-Phase Method",
      body: [
        "1. START — open one EP recipe, vocal-test its supplied key, choose the exact reference.",
        "2. LAY OUT — copy the supplied section/bar map as empty colored timeline regions.",
        "3. BUILD — copy drums → draw bass roots → draw virtual-guitar power blocks. No playing required.",
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
      id: "bandlab-flow", tool: "bandlab", title: "BandLab Quick Workflow",
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
      id: "garageband-flow", tool: "garageband", title: "GarageBand Quick Workflow",
      body: [
        "1. New project → set tempo, key, count-in.",
        "2. Add track → Drummer → pick a player. XY pad: verse low-left, chorus up-right.",
        "3. Right-click region → Convert to MIDI Region to hand-edit fills.",
        "4. Software Instrument → bass. Follow Drummer to lock kick.",
        "5. Software Instrument → keys/pads. Wide pan, HPF 150 Hz.",
        "6. No guitar player: iOS Smart Guitar chord strips, or Mac Software Instrument guitar; draw the board's supplied power blocks.",
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

  /* ============ THE FIVE-SONG EP ============ */
  /* These are intentionally buildable starter arrangements, not claims of a
     note-for-note transcription. The singer can make them theirs and adjust
     bar counts against the exact reference recording they use. */
  var epRecipes = [
    {
      id: "sloop", title: "Sloop John B", artist: "Me First and the Gimme Gimmes version",
      key: "C", bpm: 185, feel: "Fast straight punk", status: "Best first build",
      tempoNote: "Reference starting point: C major, 185 BPM. Work at 93 BPM while learning, then switch to 185.",
      concept: "A bright three-chord punk sprint. This is the easiest place to learn the system because almost everything is C, F, or G.",
      chords: ["C", "F", "G"], drumPreset: "punkstraight",
      sections: [
        { name: "Count-in", bars: 1, chords: "C (silent guide only)", energy: "Click only — four counts" },
        { name: "Intro", bars: 16, chords: "C · C · F · G  ×4", energy: "Full band; crash every 4 bars" },
        { name: "Verse 1", bars: 16, chords: "C×4 · G×2 · C×2 · F×2 · G×2 · C×2 · G · C", energy: "Palm-muted guitar; closed hats" },
        { name: "Chorus", bars: 16, chords: "C×4 · G×2 · C×2 · F×2 · G×2 · C×2 · G · C", energy: "Open guitar; crash; backing shouts later" },
        { name: "Instrumental turn", bars: 8, chords: "C · G · C · F · C · G · C · C", energy: "No lead vocal; one simple octave hook if wanted" },
        { name: "Verse 2", bars: 16, chords: "Same as Verse 1", energy: "First 4 bars drums + bass, then guitars enter" },
        { name: "Final chorus", bars: 16, chords: "Same as Chorus", energy: "Everything on; extra open hat" },
        { name: "Outro", bars: 8, chords: "F · G · F · G · F · G · C · C (STOP)", energy: "Hit the last C together and leave silence" }
      ],
      bass: "For every chord block, draw one low root: C→C2, F→F2, G→G2. Start with one long note per bar; later change to eight short 8th-notes per bar for the fast punk drive.",
      guitar: "Use power blocks, not a melody: C = C3+G3+C4; F = F2+C3+F3; G = G2+D3+G3. Draw 8 short blocks per bar. Make verse blocks quieter/shorter and chorus blocks louder/longer.",
      extra: "Skip keys. Add a very quiet organ holding C, F, and G only if the chorus feels empty.",
      vocalSpace: "No guide vocal, doubles, or melody in the show track. Your voice owns the center.",
      firstPass: [
        "Set the project to 93 BPM first. You are building at half speed, not changing the song.",
        "Build only 8 intro bars with drums, three bass roots, and three guitar power blocks.",
        "Loop those 8 bars and sing over them. If the key feels right, duplicate into the section map.",
        "When the whole arrangement works, change the project to 185 BPM and tighten the note lengths."
      ]
    },
    {
      id: "dirtbag", title: "Teenage Dirtbag", artist: "Wheatus — rebuilt as punk",
      key: "E", bpm: 94, feel: "Double-time punk at 94", status: "Second build",
      tempoNote: "Keep the project at 94 BPM and make the drums feel double-time. That keeps the vocal phrasing familiar while the band sounds fast.",
      concept: "Preserve the recognizable E-major harmony and turn the rhythm section into a fast pop-punk band. The contrast between smaller verses and huge choruses is the record.",
      chords: ["E", "A", "B", "C#m", "G#m"], drumPreset: "punkdouble",
      sections: [
        { name: "Intro", bars: 4, chords: "E · B · E · A", energy: "Filtered/quiet guitar, then a one-beat drum pickup" },
        { name: "Verse 1", bars: 16, chords: "E · B · E · A  ×3  |  C#m · A · B · B", energy: "Muted 8ths; drums light but fast" },
        { name: "Chorus", bars: 8, chords: "E · A · B · C#m  |  E · A · B · B", energy: "Open power chords; full cymbals" },
        { name: "Turnaround", bars: 4, chords: "E · B · E · A", energy: "Keep moving; short fill in bar 4" },
        { name: "Verse 2", bars: 16, chords: "Same as Verse 1", energy: "Add a second guitar octave or thin pad" },
        { name: "Chorus 2", bars: 8, chords: "Same as Chorus", energy: "Bigger than chorus 1" },
        { name: "Dirtbag chant", bars: 8, chords: "E · A · E · A  ×2", energy: "Half-time kick; room for the vocal moment" },
        { name: "Final verse/chorus", bars: 24, chords: "Verse pattern once, then Chorus pattern", energy: "Build from nearly empty to full blast" },
        { name: "Outro", bars: 4, chords: "E · B · A · E (STOP)", energy: "One final E hit" }
      ],
      bass: "Draw the chord-name root as one bar notes: E2, A2, B2, C#2, G#2. When that follows the vocal correctly, split each note into steady 8ths in choruses only.",
      guitar: "Power blocks: E2+B2+E3, A2+E3+A3, B2+F#3+B3, C#3+G#3+C#4, G#2+D#3+G#3. Verses are short muted blocks; choruses are open 8th-note blocks.",
      extra: "A thin high synth playing only the root an octave up can replace a second guitar. Do not add a busy keyboard part.",
      vocalSpace: "The vocal carries the story and dynamic. Pull guitars down 2–3 dB in every verse, then automate them up for choruses.",
      firstPass: [
        "Build the four-bar E · B · E · A loop first.",
        "Sing the opening verse over that loop. Do not continue until the chord changes feel aligned to your phrasing.",
        "Create one verse and one chorus; use duplication for the rest.",
        "Add the double-time drum energy last — the project tempo stays 94."
      ]
    },
    {
      id: "myway", title: "My Way", artist: "Sid Vicious version",
      key: "E", bpm: 150, feel: "Mock-ballad into punk blast", status: "Contrast song",
      tempoNote: "Production target: 150 BPM. The opening can feel like 75 BPM without changing tempo — just use long notes and sparse drums.",
      concept: "Keep the joke and the drama: a fake classy opening that gets destroyed by the punk band. The tempo stays fixed; density creates the gear change.",
      chords: ["E", "E7", "C#7", "F#m", "B", "A", "Am"], drumPreset: "punkstraight",
      sections: [
        { name: "Count-in", bars: 1, chords: "E guide", energy: "Click to your monitor only" },
        { name: "Fake lounge intro", bars: 16, chords: "E · E · E7 · C#7 | F#m · F#m · B · B | E · E7 · A · Am | E · B · E · E", energy: "No drums; held piano/organ; let the vocal lead" },
        { name: "Pick-slide / pickup", bars: 1, chords: "E", energy: "Snare fill into the explosion" },
        { name: "Punk verse", bars: 16, chords: "E · E · E · C# | F# · F# · B · B | E · E · A · A | E · B · E · E", energy: "Full straight punk beat" },
        { name: "Punk verse 2", bars: 16, chords: "Same as Punk verse", energy: "Add second guitar or octave layer" },
        { name: "Breakdown", bars: 8, chords: "A×2 · E×2 · F#×2 · B×2", energy: "Half-time drums; vocal in front" },
        { name: "Final verse", bars: 16, chords: "Same as Punk verse", energy: "Fullest section" },
        { name: "Outro", bars: 4, chords: "A · B · E · E (STOP)", energy: "Messy fill, clean final hit" }
      ],
      bass: "Opening: one long root per bar. Punk half: 8th-note roots. Use E2, C#2, F#2, B1/B2, A1/A2. The app's piano may label the same pitch one octave differently; trust the letter and use the low register.",
      guitar: "Punk-half power blocks: E=E2+B2+E3; C#=C#3+G#3+C#4; F#=F#2+C#3+F#3; B=B2+F#3+B3; A=A2+E3+A3. The piano/organ keeps E7, C#7, F#m, and Am in the lounge opening; distorted guitar does not need those color notes.",
      extra: "Opening piano/organ stacks: E=E3+G#3+B3; E7=E3+G#3+B3+D4; C#7=C#3+F3+G#3+B3; F#m=F#3+A3+C#4; B=B2+D#3+F#3; A=A2+C#3+E3; Am=A2+C3+E3. Hold one stack per displayed bar, freeze the last E, then cut it when the band enters.",
      vocalSpace: "The opening belongs almost entirely to your performance. Keep the backing deliberately bare and do not quantize the vocal.",
      firstPass: [
        "Build the 16-bar lounge chord lane with one held chord per bar.",
        "Record a rough vocal against it and move chord boundaries where your phrasing demands.",
        "Duplicate the harmony as power-chord roots for the punk half.",
        "Add the one-bar pickup and full drums only after both halves work separately."
      ]
    },
    {
      id: "blister", title: "Blister in the Sun", artist: "Violent Femmes — rebuilt as punk",
      key: "G", bpm: 194, feel: "Fast straight punk with a drop", status: "Riff song",
      tempoNote: "Reference neighborhood: about 192–195 BPM in G. Start at 97 BPM while drawing; switch to 194 for the finished punk version.",
      concept: "The G-to-C motion makes the song recognizable. You do not need to perform the original guitar riff: turn that motion into blunt power chords and preserve the quiet breakdown.",
      chords: ["G", "C", "Em", "D"], drumPreset: "punkstraight",
      sections: [
        { name: "Intro", bars: 16, chords: "G/C (2 beats each) for 16 bars", energy: "Guitar + bass first 8; full drums second 8" },
        { name: "Verse 1", bars: 8, chords: "G/C (2 beats each) for 8 bars", energy: "Short power blocks; tight closed hats" },
        { name: "Chorus", bars: 8, chords: "Em×2 · C×2 · Em×2 · C · D", energy: "Open chords; crash at the top" },
        { name: "Verse 2", bars: 8, chords: "Same as Verse 1", energy: "Add a higher guitar octave" },
        { name: "Chorus 2", bars: 8, chords: "Same as Chorus", energy: "Full band" },
        { name: "Instrumental", bars: 16, chords: "G/C (2 beats each) for 16 bars", energy: "Finger-drum a fill in bars 8 and 16, then quantize" },
        { name: "Whisper/drop", bars: 32, chords: "G/C (2 beats each) throughout", energy: "Repeat the verse material quietly; kick + muted bass only; no cymbals" },
        { name: "Final chorus", bars: 8, chords: "Same as Chorus", energy: "Biggest entry in the song" },
        { name: "Outro", bars: 16, chords: "G/C pattern ×15 bars · G (STOP)", energy: "Hard final G" }
      ],
      bass: "For every G/C bar, draw G2 for beats 1–2 and C3 for beats 3–4. Chorus roots are E2, C3, E2, C3, D2 following the displayed bar lengths.",
      guitar: "Power blocks: G2+D3+G3, C3+G3+C4, E2+B2+E3, D2+A2+D3. Use two blocks per bar for the G/C sections; use eight short blocks per bar in the chorus.",
      extra: "No keys required. A one-note noise riser into the final chorus is enough if you want a modern production touch.",
      vocalSpace: "The whisper/drop only works if the backing gets genuinely small. Remove guitars and hats instead of just turning them down.",
      firstPass: [
        "At 97 BPM, build one bar: G for two beats, C for two beats.",
        "Duplicate it eight times and sing a verse over it.",
        "Build the Em · C · Em · C · D chorus as a separate block.",
        "Only then switch to 194 BPM and add the fast punk drum pattern."
      ]
    },
    {
      id: "american", title: "American Girl", artist: "Humble Gods version + Black Flag-style breakdown",
      key: "D", bpm: 176, feel: "West Coast punk / hardcore breakdown", status: "EP centerpiece",
      tempoNote: "Production target: D major, 176 BPM. Tap the exact Humble Gods reference before final vocals and adjust the project if needed.",
      concept: "Use the Tom Petty harmony with Humble Gods aggression, then interrupt it with a transposed Gimme Gimme Gimme-style D–C–B♭ breakdown. That breakdown is your new arrangement, not sampled audio.",
      chords: ["D", "E", "G", "A", "Em", "Bm", "C", "Bb"], drumPreset: "punkdouble",
      sections: [
        { name: "Intro", bars: 8, chords: "D · E · G · A  ×2", energy: "Full guitar riff made from chord blocks" },
        { name: "Verse 1", bars: 8, chords: "D · E · G · A  ×2", energy: "Driving hats; guitar slightly muted" },
        { name: "Pre-chorus", bars: 8, chords: "D×2 · G · Em · A×4", energy: "Snare build through the last two A bars" },
        { name: "Chorus", bars: 8, chords: "G · A · D · Bm · G · A · D · D", energy: "Open cymbals and widest guitars" },
        { name: "Verse 2", bars: 8, chords: "Same as Verse 1", energy: "Bass + drums first two bars, guitar returns on bar 3" },
        { name: "Chorus 2", bars: 8, chords: "Same as Chorus", energy: "Full band" },
        { name: "Instrumental drive", bars: 16, chords: "D · E · G · A  ×4", energy: "No lead vocal; build fills toward the breakdown" },
        { name: "Black Flag breakdown", bars: 8, chords: "D · C · D · C · D · C · Bb · C", energy: "Half-time first 4 bars; shouted count; full-speed last 4" },
        { name: "Final chorus ×2", bars: 16, chords: "G · A · D · Bm · G · A · D · D  ×2", energy: "Crash and backing shouts; peak" },
        { name: "Outro", bars: 8, chords: "D · E · G · A  ×2; stop on D after the last A", energy: "Fast fill into final D" }
      ],
      bass: "Draw one-bar roots for the main song: D2, E2, G2, A2, plus B1/B2 and E2. Breakdown roots are D2, C2, D2, C2, D2, C2, Bb1, C2. Split into 8ths after the structure is solid.",
      guitar: "Main power blocks: D=D2+A2+D3; E=E2+B2+E3; G=G2+D3+G3; A=A2+E3+A3; B=B2+F#3+B3. Breakdown adds C=C3+G3+C4 and B♭=Bb2+F3+Bb3; sequence D, C, D, C, D, C, B♭, C — one blunt bar each.",
      extra: "Skip pads during the breakdown. If the chorus needs lift, add a quiet high organ holding G, A, D, and Bm roots.",
      vocalSpace: "Treat the breakdown as a live call-and-response space. Leave any shout/cue track out of the house mix unless it is intentionally part of the record.",
      firstPass: [
        "Build D · E · G · A as a four-bar loop and confirm the verse vocal against it.",
        "Build G · A · D · Bm · G · A · D · D as the chorus loop.",
        "Create the D · C · D · C · D · C · B♭ · C breakdown in its own region color.",
        "Join the three blocks, then add the pre-chorus and transitions. Do not start with the entire song."
      ]
    }
  ];

  var epSongs = epRecipes.map(function (r) {
    return {
      id: "ep-" + r.id,
      recipeId: r.id,
      title: r.title,
      artist: r.artist,
      key: r.key,
      bpm: r.bpm,
      feel: r.feel,
      notes: "Starter arrangement loaded. Adjust the key after a vocal range test and verify bar counts against your exact reference.",
      steps: [
        { label: "Open the recipe and read the four-step first pass", done: false },
        { label: "Create the DAW project at the recipe BPM and key", done: false },
        { label: "Add section markers / arrangement blocks", done: false },
        { label: "Build one working verse + chorus loop", done: false },
        { label: "Program or finger-drum, then quantize", done: false },
        { label: "Draw bass root blocks from the recipe", done: false },
        { label: "Draw virtual-guitar power blocks", done: false },
        { label: "Duplicate sections and add transitions", done: false },
        { label: "Sing a rough full pass and fix chord boundaries", done: false },
        { label: "Mix with the vocal center left open", done: false },
        { label: "Export full mix + same-start stems", done: false },
        { label: "Test the show file on the playback rig", done: false }
      ]
    };
  });

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
    songSteps: songSteps,
    epRecipes: epRecipes,
    epSongs: epSongs
  };
})();
