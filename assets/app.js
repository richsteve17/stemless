/* Stemless — Backing Track Studio · app */
(function () {
  "use strict";

  var D = window.STUDIO;

  /* ================= State ================= */
  var LS = {
    get: function (k, d) {
      try { var v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); }
      catch (e) { return d; }
    },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  function loadDone() { return LS.get("stemless.lessons.done", []); }
  function saveDone(arr) { LS.set("stemless.lessons.done", arr); }
  function saveSongs(arr) { LS.set("stemless.songs", arr); }
  function loadSongs() {
    var songs = LS.get("stemless.songs", null);
    if (!Array.isArray(songs)) songs = [];

    /* One-time, non-destructive migration: add the five requested EP boards.
       Existing custom songs and progress are never replaced. */
    if (!LS.get("stemless.ep.recipes.v1", false) && D.epSongs) {
      D.epSongs.forEach(function (seed) {
        var exists = songs.some(function (s) { return s.recipeId === seed.recipeId; });
        if (!exists) songs.push(JSON.parse(JSON.stringify(seed)));
      });
      saveSongs(songs);
      LS.set("stemless.ep.recipes.v1", true);
    }
    return songs;
  }
  function loadLicensing() { return LS.get("stemless.licensing.done", []); }
  function saveLicensing(arr) { LS.set("stemless.licensing.done", arr); }

  /* DAW picker — HP/Windows runs BandLab, Mac/iPhone runs GarageBand. */
  function loadDaw() {
    var d = LS.get("stemless.daw", null);
    return d === "bandlab" ? "bandlab" : "garageband";
  }
  function saveDaw(d) { LS.set("stemless.daw", d); }
  function dawName() { return loadDaw() === "bandlab" ? "BandLab" : "GarageBand"; }
  function updateDawBadge() {
    var el = document.getElementById("sideDaw");
    if (!el) return;
    el.textContent = dawName();
    var holder = el.closest(".daw-locked");
    if (holder) {
      holder.classList.remove("bandlab", "garageband");
      holder.classList.add(loadDaw());
    }
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  var uid = (function () { var n = 0; return function () { n++; return Date.now().toString(36) + "-" + n.toString(36); }; })();

  /* ================= Router ================= */
  var routes = ["dashboard", "method", "songs", "tools", "cheats", "licensing"];
  function currentRoute() {
    var h = (location.hash || "").replace(/^#\/?/, "");
    if (routes.indexOf(h) === -1) return "dashboard";
    return h;
  }

  function navigate() {
    stopDrum();
    var route = currentRoute();
    document.querySelectorAll(".nav a").forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("data-route") === route);
    });
    updateSidebar();
    var views = {
      dashboard: renderDashboard, method: renderMethod, songs: renderSongs,
      tools: renderTools, cheats: renderCheats, licensing: renderLicensing
    };
    document.getElementById("app").innerHTML = views[route]();
    var inits = { dashboard: initDashboard, tools: initTools, songs: initSongs, licensing: initLicensing };
    if (inits[route]) inits[route]();
    updateDawBadge();
    window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", navigate);

  /* ================= Progress ================= */
  function doneSet() { return new Set(loadDone()); }
  function visibleLessons() {
    var daw = loadDaw();
    return D.lessons.filter(function (l) { return l.tool === daw || l.tool === "both"; });
  }
  function lessonCount() { return visibleLessons().length; }
  function doneCount() {
    var ids = new Set(visibleLessons().map(function (l) { return l.id; }));
    return loadDone().filter(function (id) { return ids.has(id); }).length;
  }
  function updateSidebar() {
    var total = lessonCount(), done = doneCount();
    var pct = total ? Math.round(done / total * 100) : 0;
    var el = document.getElementById("sidePct"); if (el) el.textContent = pct + "%";
    var m = document.getElementById("sideMeter"); if (m) m.style.width = pct + "%";
  }

  function phaseProgress(phaseId) {
    var ls = visibleLessons().filter(function (l) { return l.phase === phaseId; });
    var done = doneSet();
    var c = ls.filter(function (l) { return done.has(l.id); }).length;
    return { total: ls.length, done: c, pct: ls.length ? Math.round(c / ls.length * 100) : 0 };
  }

  /* ================= Shared bits ================= */
  function toolBadge(tool) {
    var label = tool === "bandlab" ? "BandLab" : tool === "garageband" ? "GarageBand" : "Both";
    return '<span class="badge ' + tool + '"><span class="dot"></span>' + label + "</span>";
  }
  function pageHead(eyebrow, title, sub) {
    return '<div class="page-head"><p class="eyebrow">' + esc(eyebrow) + "</p><h1>" + esc(title) + "</h1><p>" + (sub || "") + "</p></div>";
  }

  /* ================= Dashboard ================= */
  function renderDashboard() {
    var done = doneCount(), total = lessonCount(), pct = total ? Math.round(done / total * 100) : 0;
    var songs = loadSongs();
    var phases = D.phases.map(function (p) {
      var pp = phaseProgress(p.id);
      return '<div class="phase-row"><div class="pname">' + esc(p.name) + '</div><div class="meter"><div class="meter-fill" style="width:' + pp.pct + '%"></div></div><div class="pcount">' + pp.done + " / " + pp.total + "</div></div>";
    }).join("");

    var songList = songs.length
      ? songs.map(function (s) {
          var c = s.steps.filter(function (x) { return x.done; }).length;
          return '<div class="phase-row"><div class="pname">♪ ' + esc(s.title) + '</div><div class="meter"><div class="meter-fill" style="width:' + (s.steps.length ? Math.round(c / s.steps.length * 100) : 0) + '%"></div></div><div class="pcount">' + c + " / " + s.steps.length + "</div></div>";
        }).join("")
      : '<p class="empty" style="padding:16px">No songs yet — add your first cover in <a href="#/songs">Your Songs</a>.</p>';

    var daw = loadDaw();
    return pageHead("Dashboard", "You can build the band without playing an instrument", "You are producing with labeled blocks: copy a punk drum grid, draw the supplied bass roots and guitar-note stacks, then sing over the loop. Your DJ timing, finger-drumming feel, and front-person instincts are the skills that matter here.")
      + '<div class="card daw-picker"><div class="daw-picker-head"><p class="eyebrow">Step 0 · Pick your studio</p><h2>Where are you building the EP?</h2><p>HP / Windows → BandLab. Mac / iPhone → GarageBand. Lessons, click-by-click steps, and cheat sheets follow this pick.</p></div>'
      + '<div class="daw-options">'
      + '<button class="daw-opt bandlab' + (daw === "bandlab" ? " selected" : "") + '" data-daw="bandlab"><b>BandLab</b><span>HP / Windows · free at bandlab.com → Create → Mix Editor</span></button>'
      + '<button class="daw-opt garageband' + (daw === "garageband" ? " selected" : "") + '" data-daw="garageband"><b>GarageBand</b><span>Mac / iPhone · already on your Apple gear</span></button>'
      + '</div></div>'
      + '<div class="card start-card"><div><p class="eyebrow">Your first session</p><h2>Start with an 8-bar Sloop John B loop</h2><p>Do not build all five songs. Open the loaded recipe, set 93 BPM, and make only drums + C/F/G bass roots + C/F/G power blocks in <b>' + dawName() + '</b>. When you can sing over that loop, the system is working.</p></div><button class="btn primary" onclick="window.openSong(\'ep-sloop\')">Open the first build →</button></div>'
      + '<div class="grid cols-3">'
      + '<div class="card stat"><div class="value">' + pct + '%</div><div class="label">of the guided method complete</div></div>'
      + '<div class="card stat"><div class="value">5</div><div class="label">requested EP recipes loaded</div></div>'
      + '<div class="card stat"><div class="value">0</div><div class="label">instruments you must know how to play</div></div>'
      + "</div>"
      + '<div class="card"><h3>The whole job in four moves</h3><div class="mini-path">'
      + '<div><b>1</b><span>Copy one section map</span></div><div><b>2</b><span>Copy the drum squares</span></div><div><b>3</b><span>Draw supplied bass + guitar blocks</span></div><div><b>4</b><span>Loop it and sing; adjust by ear</span></div>'
      + '</div></div>'
      + '<div class="grid cols-2">'
      + '<div class="card"><h3>Your learning path</h3>' + phases + '<a class="btn primary" style="margin-top:14px" href="#/method">Start the zero-instrument method</a></div>'
      + '<div class="card"><h3>Your five-song EP</h3>' + songList + '<a class="btn" style="margin-top:14px" href="#/songs">Open song recipes</a></div>'
      + "</div>"
      + '<div class="card"><h3>Quick tools</h3><div class="tool-tabs">'
      + '<a class="tool-tab" href="#/tools" onclick="window.setTool(\'drum\')">Drum Machine</a>'
      + '<a class="tool-tab" href="#/tools" onclick="window.setTool(\'numbers\')">Numbers &amp; Chords</a>'
      + '<a class="tool-tab" href="#/tools" onclick="window.setTool(\'transpose\')">Transpose</a>'
      + '<a class="tool-tab" href="#/tools" onclick="window.setTool(\'tap\')">Tap Tempo</a>'
      + '<a class="tool-tab" href="#/cheats">Printable Cheat Sheets</a>'
      + "</div></div>";
  }

  function initDashboard() {
    document.querySelectorAll(".daw-opt").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var picked = btn.getAttribute("data-daw");
        var changed = picked !== loadDaw();
        saveDaw(picked);
        document.getElementById("app").innerHTML = renderDashboard();
        initDashboard();
        updateSidebar();
        updateDawBadge();
        if (changed) toast("Studio locked to " + dawName() + ". Lessons and steps updated.");
      });
    });
  }

  /* ================= Method ================= */
  function renderMethod() {
    var done = doneSet();
    var byPhase = {};
    D.phases.forEach(function (p) { byPhase[p.id] = []; });
    visibleLessons().forEach(function (l) { byPhase[l.phase].push(l); });

    var html = pageHead("The Method", "Zero-instrument, block-by-block · " + dawName(), "You are not being sent away to learn guitar or piano. Learn the grid, copy one punk beat, draw supplied roots and power blocks, then make arrangement decisions with your voice and ears. Showing steps for " + dawName() + " — change the pick on Start Here.")
      + '<div class="card"><div class="grid cols-2">';
    D.phases.forEach(function (p, i) {
      var pp = phaseProgress(p.id);
      html += '<div style="display:flex;gap:10px;align-items:baseline;padding:4px 0"><span class="chip">' + (i + 1) + "</span><strong>" + esc(p.name) + "</strong><span style='color:var(--faint);font-size:12px'>" + esc(p.tag) + "</span><span class='chip' style='margin-left:auto'>" + pp.done + "/" + pp.total + "</span></div>";
    });
    html += "</div></div>";

    D.phases.forEach(function (p, i) {
      var ls = byPhase[p.id];
      if (!ls.length) return;
      html += '<div class="phase"><div class="phase-head"><span class="num">PHASE ' + (i + 1) + "</span><h2>" + esc(p.name) + "</h2><span class='count'>" + ls.length + " lessons</span></div>";
      ls.forEach(function (l, j) {
        var isDone = done.has(l.id);
        var num = String(ls.length === 1 ? "" : j + 1);
        html += '<div class="lesson" id="lesson-' + esc(l.id) + '">'
          + '<div class="lesson-head" data-lesson="' + esc(l.id) + '">'
          + '<span class="lesson-num">' + num + "</span>"
          + '<div class="lesson-title">' + esc(l.title) + "</div>"
          + '<div class="lesson-meta">' + toolBadge(l.tool) + '<span class="minutes">' + l.minutes + " min</span>"
          + '<span class="chev">▶</span></div></div>'
          + '<div class="lesson-body">'
          + '<div class="intro">' + esc(l.intro) + "</div>";
        l.steps.forEach(function (s, k) {
          html += '<div class="step"><div class="step-n">' + (k + 1) + '</div><div><div class="step-title">' + esc(s.t) + '</div><p>' + esc(s.d) + "</p></div></div>";
        });
        if (l.tips && l.tips.length) {
          html += '<div class="tips"><h4>Pro tips</h4><ul>' + l.tips.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul></div>";
        }
        if (l.watchout) html += '<div class="watchout"><strong>Watch out:</strong> ' + esc(l.watchout) + "</div>";
        html += '<div style="margin-top:16px"><label class="check"><input type="checkbox" data-done="' + esc(l.id) + '" ' + (isDone ? "checked" : "") + '><span class="box"></span><span class="check-label">Mark this lesson complete</span></label></div>';
        html += "</div></div>";
      });
      html += "</div>";
    });
    return html;
  }

  /* ================= Songs ================= */
  var openSongs = new Set(["ep-sloop"]);
  function songStepCount(s) { return s.steps.filter(function (x) { return x.done; }).length; }
  function recipeForSong(s) {
    if (!s || !s.recipeId || !D.epRecipes) return null;
    return D.epRecipes.find(function (r) { return r.id === s.recipeId; }) || null;
  }

  function recipeHTML(r) {
    var sections = r.sections.map(function (sec, i) {
      return '<div class="recipe-section">'
        + '<div class="recipe-section-num">' + String(i + 1).padStart(2, "0") + '</div>'
        + '<div><strong>' + esc(sec.name) + '</strong><span>' + esc(sec.bars) + ' bar' + (sec.bars === 1 ? '' : 's') + '</span></div>'
        + '<div class="recipe-chords">' + esc(sec.chords) + '</div>'
        + '<div class="recipe-energy">' + esc(sec.energy) + '</div>'
        + '</div>';
    }).join("");
    var chords = r.chords.map(function (c) {
      return '<button class="chord-audition" data-hear="' + esc(c) + '" title="Hear ' + esc(c) + '">▶ ' + esc(c) + '</button>';
    }).join("");
    var firstPass = r.firstPass.map(function (s, i) {
      return '<div class="build-step"><b>' + (i + 1) + '</b><span>' + esc(s) + '</span></div>';
    }).join("");

    /* Show only the picked DAW's click-by-click list. */
    var daw = loadDaw();
    var clickSteps = daw === "bandlab"
      ? '<details class="recipe-detail" open><summary>3 · Click-by-click in BandLab</summary><ol class="click-list">'
      + '<li><b>Create → New Project.</b> Click the tempo at the top and type <b>' + esc(r.bpm) + '</b>. Set 4/4, turn on metronome and count-in.</li>'
      + '<li><b>Add Track → Virtual Instrument → drum kit.</b> Create a one-bar MIDI region, open its piano roll, set Snap/Quantize to 1/16.</li>'
      + '<li>Open this app’s <b>' + esc((D.drumPatterns.find(function (p) { return p.id === r.drumPreset; }) || {}).name || "punk") + '</b> preset beside BandLab. Copy kick to C1, snare to D1, closed hats to F#1, open hats to A#1. Loop the bar.</li>'
      + '<li><b>Add Track → Virtual Instrument → electric bass.</b> Draw the low note sequence printed in Bass above. Use one long note per chord first.</li>'
      + '<li><b>Add Track → Virtual Instrument → guitar.</b> Draw every supplied power stack. Duplicate it into 8th-note blocks only after the chord changes work under your voice.</li>'
      + '<li>Duplicate regions across the section map, remove parts where the energy note says to drop, then record a scratch vocal and adjust boundaries.</li>'
      + '</ol></details>'
      : '<details class="recipe-detail" open><summary>3 · Click-by-click in GarageBand</summary><ol class="click-list">'
      + '<li><b>New Project → Empty Project.</b> Set tempo to <b>' + esc(r.bpm) + '</b>, key to <b>' + esc(r.key) + '</b>, 4/4, count-in on.</li>'
      + '<li>Add a <b>Drummer</b> track and choose the hardest Rock player available, or add a Software Instrument drum kit for exact control. Make separate regions for quiet, full, and breakdown sections.</li>'
      + '<li>Add <b>Software Instrument → Bass</b>. Open Piano Roll and draw the printed roots. If using Drummer, set Follow to the bass after the part exists.</li>'
      + '<li>iPhone/iPad: use <b>Touch Instrument → Smart Guitar</b> and record the named chord strips. Mac: use a Software Instrument guitar and draw the printed power stacks in Piano Roll.</li>'
      + '<li>Select each performance and apply 1/16 Quantize. Shorten verse guitar notes; leave chorus notes more open. Copy repeated sections instead of replaying them.</li>'
      + '<li>Record a scratch vocal, fix section lengths, then mute that vocal before exporting the clean show backing track.</li>'
      + '</ol></details>';

    return '<div class="recipe-wrap">'
      + '<div class="recipe-hero"><div><span class="recipe-status">' + esc(r.status) + '</span><h3>Your build recipe</h3><p>' + esc(r.concept) + '</p></div>'
      + '<div class="recipe-facts"><span><small>KEY</small>' + esc(r.key) + '</span><span><small>PROJECT</small>' + esc(r.bpm) + ' BPM</span><span><small>FEEL</small>' + esc(r.feel) + '</span></div></div>'
      + '<div class="plain-note"><strong>Start here, not with the whole song.</strong><div class="build-steps">' + firstPass + '</div></div>'
      + '<div class="card inset"><h3>Vocal key check</h3><p>Click a chord, sing a section, and listen for strain. These sounds are only a pitch guide — they are not part of your export.</p><div class="chord-row">' + chords + '</div><p class="micro">' + esc(r.tempoNote) + '</p></div>'
      + '<details class="recipe-detail" open><summary>1 · Copy this section map</summary><div class="recipe-sections">' + sections + '</div><p class="micro">Each dot separates bars unless the chart says “2 beats each” or × a repeat count. This is a practical starter arrangement; extend a block if your exact vocal phrasing needs it.</p></details>'
      + '<details class="recipe-detail" open><summary>2 · Draw the three band parts</summary><div class="track-plan">'
      + '<div><span class="track-icon">DR</span><h4>Drums</h4><p>Copy <b>' + esc((D.drumPatterns.find(function (p) { return p.id === r.drumPreset; }) || {}).name || "Punk pattern") + '</b> into the DAW. Use the section energy notes to remove hats or switch to half-time.</p><button class="btn sm track-action" onclick="window.openDrumPreset(\'' + esc(r.drumPreset) + '\')">Open &amp; play this beat →</button></div>'
      + '<div><span class="track-icon">BA</span><h4>Bass</h4><p>' + esc(r.bass) + '</p></div>'
      + '<div><span class="track-icon">GT</span><h4>Virtual guitar</h4><p>' + esc(r.guitar) + '</p></div>'
      + '<div><span class="track-icon">+</span><h4>Optional texture</h4><p>' + esc(r.extra) + '</p></div>'
      + '</div><div class="vocal-hole"><strong>Your live-vocal space:</strong> ' + esc(r.vocalSpace) + '</div></details>'
      + clickSteps
      + '<div class="recipe-disclaimer">Arrangement recipe, not a note-for-note transcription. No lyrics or original audio are included; verify the map against the exact recording you are covering.</div>'
      + '</div>';
  }

  function renderSongs() {
    var songs = loadSongs();
    var html = pageHead("Your Songs", "Your five punk builds are loaded", "Open one board for the supplied key, BPM, section map, bass notes, virtual-guitar stacks, and the exact " + dawName() + " click order. No instrument performance is assumed.")
      + '<div class="card no-play-card"><div><h3>Read the recipe like a DJ timeline</h3><p><b>Bars</b> are four counts. <b>Chord dots</b> move left to right in time. <b>×2</b> means duplicate. Build one loop, sing over it, then copy it — that is the entire operating system.</p></div><button class="btn" id="restore-ep">Restore missing EP boards</button></div>'
      + '<details class="add-song"><summary>+ Add another song later</summary><div class="card"><div class="row">'
      + '<div class="field"><label>Song title</label><input type="text" id="ns-title" placeholder="e.g. Dreams"></div>'
      + '<div class="field"><label>Artist</label><input type="text" id="ns-artist" placeholder="Fleetwood Mac"></div>'
      + '<div class="field"><label>Key</label><select id="ns-key">' + keyOptions("C") + "</select></div>"
      + '<div class="field"><label>BPM</label><input type="number" id="ns-bpm" value="120" min="40" max="240"></div>'
      + '<div class="field"><label>Feel</label><select id="ns-feel"><option>Straight</option><option>Swing</option><option>Half-time</option></select></div>'
      + '<div class="field" style="flex:0 0 auto"><button class="btn primary" id="ns-add">+ Add song</button></div>'
      + "</div></div></details>";

    if (!songs.length) {
      html += '<div class="empty">No songs yet. Add your first cover above and the build checklist appears here.</div>';
      return html;
    }

    songs.forEach(function (s) {
      var c = songStepCount(s), tot = s.steps.length;
      var pct = tot ? Math.round(c / tot * 100) : 0;
      var open = openSongs.has(s.id);
      var recipe = recipeForSong(s);
      html += '<div class="song-card"><div class="song-head" data-toggle="' + esc(s.id) + '" style="cursor:pointer">'
        + '<div><div class="s-title">' + esc(s.title) + '</div><div class="s-sub">' + esc(s.artist) + "</div></div>"
        + '<div class="spacer"></div>'
        + '<div class="song-tags">'
        + (recipe ? '<span class="tag recipe-tag">GUIDED BUILD</span>' : '')
        + '<span class="tag">key <b>' + esc(s.key) + "</b></span>"
        + '<span class="tag"><b>' + esc(s.bpm) + "</b> BPM</span>"
        + '<span class="tag">' + esc(s.feel) + "</span>"
        + '<span class="tag song-progress" id="song-prog-' + esc(s.id) + '">' + c + "/" + tot + " (" + pct + "%)</span>"
        + "</div>"
        + '<span class="chev" style="color:var(--faint);margin-left:10px">▶</span>'
        + "</div>";
      if (open) {
        html += '<div class="song-body">'
          + (recipe ? recipeHTML(recipe) : '')
          + '<details class="project-admin"' + (recipe ? '' : ' open') + '><summary>' + (recipe ? 'Progress checklist & project settings' : 'Song settings & checklist') + '</summary><div class="project-admin-body">'
          + '<div class="row">'
          + '<div class="field"><label>Title</label><input type="text" data-field="title" data-id="' + esc(s.id) + '" value="' + esc(s.title) + '"></div>'
          + '<div class="field"><label>Artist</label><input type="text" data-field="artist" data-id="' + esc(s.id) + '" value="' + esc(s.artist) + '"></div>'
          + '<div class="field"><label>Key</label><select data-field="key" data-id="' + esc(s.id) + '">' + keyOptions(s.key) + "</select></div>"
          + '<div class="field"><label>BPM</label><input type="number" data-field="bpm" data-id="' + esc(s.id) + '" value="' + esc(s.bpm) + '" min="40" max="240"></div>'
          + '<div class="field"><label>Feel</label><select data-field="feel" data-id="' + esc(s.id) + '">' + feelOptions(s.feel) + "</select></div>"
          + "</div>"
          + '<div class="field" style="margin-top:8px"><label>Notes (references, decisions, signature moments)</label><textarea data-field="notes" data-id="' + esc(s.id) + '" rows="2">' + esc(s.notes) + "</textarea></div>"
          + '<div class="song-steps">' + s.steps.map(function (st, i) {
              return '<label class="check"><input type="checkbox" data-step="' + esc(s.id) + '" data-i="' + i + '" ' + (st.done ? "checked" : "") + '><span class="box"></span><span class="check-label">' + esc(st.label) + "</span></label>";
            }).join("") + "</div>"
          + '<div style="margin-top:14px;display:flex;gap:10px">'
          + '<button class="btn sm danger" data-del="' + esc(s.id) + '">Delete song</button>'
          + '<button class="btn sm" data-addstep="' + esc(s.id) + '">+ Add custom step</button>'
          + "</div></div></details></div>";
      }
      html += "</div>";
    });
    return html;
  }

  function keyOptions(sel) {
    return D.keyNames.map(function (k) { return '<option' + (k === sel ? " selected" : "") + ">" + k + "</option>"; }).join("");
  }
  function feelOptions(sel) {
    var opts = ["Straight", "Double-time", "Swing", "Half-time"];
    if (sel && opts.indexOf(sel) === -1) opts.unshift(sel);
    return opts.map(function (f) { return '<option' + (f === sel ? " selected" : "") + ">" + esc(f) + "</option>"; }).join("");
  }

  function initSongs() {
    var restore = document.getElementById("restore-ep");
    if (restore) restore.addEventListener("click", function () {
      var songs = loadSongs(), added = 0;
      (D.epSongs || []).forEach(function (seed) {
        if (!songs.some(function (s) { return s.recipeId === seed.recipeId; })) {
          songs.push(JSON.parse(JSON.stringify(seed))); added++;
        }
      });
      saveSongs(songs);
      openSongs.add("ep-sloop");
      document.getElementById("app").innerHTML = renderSongs(); initSongs();
      toast(added ? "Restored " + added + " EP board" + (added === 1 ? "." : "s.") : "All five EP boards are already here.");
    });

    document.querySelectorAll("[data-hear]").forEach(function (el) {
      el.addEventListener("click", function () {
        playGuideChord(el.getAttribute("data-hear"));
        el.classList.add("sounding");
        setTimeout(function () { el.classList.remove("sounding"); }, 550);
      });
    });

    var addBtn = document.getElementById("ns-add");
    if (addBtn) addBtn.addEventListener("click", function () {
      var title = (document.getElementById("ns-title").value || "").trim();
      if (!title) { toast("Give the song a title first."); return; }
      var song = {
        id: uid(), title: title,
        artist: (document.getElementById("ns-artist").value || "").trim() || "Unknown",
        key: document.getElementById("ns-key").value,
        bpm: parseInt(document.getElementById("ns-bpm").value, 10) || 120,
        feel: document.getElementById("ns-feel").value,
        notes: "",
        steps: D.songSteps.map(function (l) { return { label: l, done: false }; })
      };
      var songs = loadSongs(); songs.push(song); saveSongs(songs);
      openSongs.add(song.id);
      document.getElementById("app").innerHTML = renderSongs(); initSongs();
      toast("Added " + title);
    });

    document.querySelectorAll("[data-toggle]").forEach(function (el) {
      el.addEventListener("click", function () {
        var id = el.getAttribute("data-toggle");
        if (openSongs.has(id)) openSongs.delete(id); else openSongs.add(id);
        document.getElementById("app").innerHTML = renderSongs(); initSongs();
      });
    });

    document.querySelectorAll("[data-del]").forEach(function (el) {
      el.addEventListener("click", function () {
        var id = el.getAttribute("data-del");
        if (!confirm("Delete this song and its checklist?")) return;
        saveSongs(loadSongs().filter(function (s) { return s.id !== id; }));
        openSongs.delete(id);
        document.getElementById("app").innerHTML = renderSongs(); initSongs();
        toast("Song deleted.");
      });
    });

    document.querySelectorAll("[data-addstep]").forEach(function (el) {
      el.addEventListener("click", function () {
        var id = el.getAttribute("data-addstep");
        var label = prompt("Custom step:");
        if (!label) return;
        var songs = loadSongs();
        var s = songs.find(function (x) { return x.id === id; });
        if (s) { s.steps.push({ label: label, done: false }); saveSongs(songs); }
        document.getElementById("app").innerHTML = renderSongs(); initSongs();
      });
    });

    document.querySelectorAll("[data-step]").forEach(function (el) {
      el.addEventListener("change", function () {
        var id = el.getAttribute("data-step"), i = parseInt(el.getAttribute("data-i"), 10);
        var songs = loadSongs();
        var s = songs.find(function (x) { return x.id === id; });
        if (s && s.steps[i]) { s.steps[i].done = el.checked; saveSongs(songs); }
        var c = songStepCount(s), tot = s.steps.length;
        var p = document.getElementById("song-prog-" + id);
        if (p) p.textContent = c + "/" + tot + " (" + (tot ? Math.round(c / tot * 100) : 0) + "%)";
      });
    });

    document.querySelectorAll("[data-field]").forEach(function (el) {
      var id = el.getAttribute("data-id"), field = el.getAttribute("data-field");
      el.addEventListener(field === "notes" ? "input" : "change", function () {
        var songs = loadSongs();
        var s = songs.find(function (x) { return x.id === id; });
        if (!s) return;
        if (field === "bpm") s[field] = parseInt(el.value, 10) || 120;
        else s[field] = el.value;
        saveSongs(songs);
        if (field !== "notes") { // refresh the card header tags
          document.getElementById("app").innerHTML = renderSongs(); initSongs();
        }
      });
    });
  }

  /* ================= Tools ================= */
  var activeTool = "drum";
  function renderTools() {
    var tabs = [["drum", "Drum Machine"], ["tap", "Tap Tempo"], ["structure", "Song Structure"], ["numbers", "Numbers & Chords"], ["transpose", "Transpose"]];
    var html = pageHead("Tools", "Hear it before you draw it", "Play the punk drum grids, tap the exact reference tempo, lay out bars, hear key chords, and transpose every supplied block together.")
      + '<div class="tool-tabs">'
      + tabs.map(function (t) { return '<button class="tool-tab' + (activeTool === t[0] ? " active" : "") + '" data-tool="' + t[0] + '">' + t[1] + "</button>"; }).join("")
      + '</div><div id="tool-body"></div>';
    return html;
  }
  function initTools() {
    document.querySelectorAll("[data-tool]").forEach(function (el) {
      el.addEventListener("click", function () { activeTool = el.getAttribute("data-tool"); renderToolBody(); });
    });
    renderToolBody();
  }
  function renderToolBody() {
    stopDrum();
    var body = document.getElementById("tool-body");
    var views = { drum: drumHTML, tap: tapHTML, structure: structureHTML, numbers: numbersHTML, transpose: transposeHTML };
    body.innerHTML = views[activeTool]();
    var inits = { drum: initDrum, tap: initTap, structure: initStructure, numbers: initNumbers, transpose: initTranspose };
    inits[activeTool]();
    document.querySelectorAll("[data-tool]").forEach(function (el) {
      el.classList.toggle("active", el.getAttribute("data-tool") === activeTool);
    });
  }

  /* ---------- Drum Machine ---------- */
  var drumRows = [
    { key: "kick", label: "Kick" },
    { key: "snare", label: "Snare" },
    { key: "chat", label: "Closed Hat" },
    { key: "ohat", label: "Open Hat" }
  ];
  var drumState = { bpm: 120, playing: false, step: 0, pattern: "rock", grid: { kick: [], snare: [], chat: [], ohat: [] } };
  function clone16(a) { return a.slice(); }
  function loadPattern(id) {
    var p = D.drumPatterns.find(function (x) { return x.id === id; }) || D.drumPatterns[0];
    drumState.grid = { kick: clone16(p.kick), snare: clone16(p.snare), chat: clone16(p.chat), ohat: clone16(p.ohat) };
    drumState.bpm = p.bpm[0] + Math.round((p.bpm[1] - p.bpm[0]) / 2);
    drumState.pattern = p.id;
  }
  loadPattern("punkstraight");

  function drumHTML() {
    var opts = D.drumPatterns.map(function (p) {
      return '<option value="' + p.id + '"' + (p.id === drumState.pattern ? " selected" : "") + ">" + p.name + " (" + p.genre + ")</option>";
    }).join("");
    var html = '<div class="card"><div class="row" style="margin-bottom:14px">'
      + '<div class="field"><label>Pattern</label><select id="dm-preset">' + opts + "</select></div>"
      + '<div class="field" style="max-width:130px"><label>BPM</label><input type="number" id="dm-bpm" value="' + drumState.bpm + '" min="50" max="200"></div>'
      + '<div class="field" style="flex:0 0 auto"><button class="btn primary" id="dm-play">▶ Play</button> <button class="btn" id="dm-clear">Clear</button></div>'
      + "</div>"
      + '<p class="drum-hint" id="dm-desc" style="color:var(--muted);margin:0 0 16px"></p>'
      + '<div class="drum-wrap"><div class="drum-grid">';
    drumRows.forEach(function (r) {
      html += '<span class="drum-row-label">' + r.label + "</span>";
      for (var i = 0; i < 16; i++) {
        var on = drumState.grid[r.key][i] ? " on" : "";
        var beat = i % 4 === 0 ? " beat" : "";
        html += '<button class="drum-step' + on + beat + '" data-row="' + r.key + '" data-step="' + i + '"></button>';
      }
    });
    html += "</div>";
    html += '<div class="drum-cols"><span></span>';
    for (var c = 0; c < 16; c++) html += '<span class="drum-col-num">' + (c % 4 === 0 ? (c / 4 + 1) : "") + "</span>";
    html += "</div></div></div>";
    return html;
  }

  /* --- Web Audio --- */
  var audioCtx = null, noiseBuf = null, schedTimer = null, nextNoteTime = 0, current16th = 0, secondsPer16th = 0;
  function ensureAudio() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      noiseBuf = audioCtx.createBuffer(1, audioCtx.sampleRate, audioCtx.sampleRate);
      var data = noiseBuf.getChannelData(0);
      for (var i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    }
  }
  function playGuideChord(symbol) {
    var parsed = parseChord(symbol);
    if (!parsed) return;
    ensureAudio();
    if (audioCtx.state === "suspended") audioCtx.resume();
    var quality = parsed.quality || "";
    var intervals = /^m(?!aj)/i.test(quality) ? [0, 3, 7] : /dim/i.test(quality) ? [0, 3, 6] : [0, 4, 7];
    var now = audioCtx.currentTime + 0.02;
    intervals.forEach(function (interval, i) {
      var osc = audioCtx.createOscillator(), gain = audioCtx.createGain();
      var midi = 48 + parsed.pc + interval;
      osc.type = i === 0 ? "triangle" : "sine";
      osc.frequency.value = 440 * Math.pow(2, (midi - 69) / 12);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
      osc.connect(gain); gain.connect(audioCtx.destination);
      osc.start(now); osc.stop(now + 0.85);
    });
  }
  function env(gain, t, peak, dur) {
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.linearRampToValueAtTime(peak, t + 0.002);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  }
  function playKick(t) {
    var o = audioCtx.createOscillator(), g = audioCtx.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(150, t);
    o.frequency.exponentialRampToValueAtTime(45, t + 0.12);
    env(g, t, 1.0, 0.2);
    o.connect(g); g.connect(audioCtx.destination);
    o.start(t); o.stop(t + 0.25);
  }
  function playSnare(t) {
    var n = audioCtx.createBufferSource(); n.buffer = noiseBuf;
    var f = audioCtx.createBiquadFilter(); f.type = "bandpass"; f.frequency.value = 1800;
    var g = audioCtx.createGain(); env(g, t, 0.5, 0.18);
    n.connect(f); f.connect(g); g.connect(audioCtx.destination);
    n.start(t); n.stop(t + 0.2);
    var o = audioCtx.createOscillator(), g2 = audioCtx.createGain();
    o.type = "triangle"; o.frequency.value = 190;
    env(g2, t, 0.4, 0.1);
    o.connect(g2); g2.connect(audioCtx.destination);
    o.start(t); o.stop(t + 0.12);
  }
  function playChat(t) {
    var n = audioCtx.createBufferSource(); n.buffer = noiseBuf;
    var f = audioCtx.createBiquadFilter(); f.type = "highpass"; f.frequency.value = 7000;
    var g = audioCtx.createGain(); env(g, t, 0.22, 0.05);
    n.connect(f); f.connect(g); g.connect(audioCtx.destination);
    n.start(t); n.stop(t + 0.06);
  }
  function playOhat(t) {
    var n = audioCtx.createBufferSource(); n.buffer = noiseBuf;
    var f = audioCtx.createBiquadFilter(); f.type = "highpass"; f.frequency.value = 7000;
    var g = audioCtx.createGain(); env(g, t, 0.22, 0.22);
    n.connect(f); f.connect(g); g.connect(audioCtx.destination);
    n.start(t); n.stop(t + 0.25);
  }
  function playSound(row, t) {
    if (row === "kick") playKick(t);
    else if (row === "snare") playSnare(t);
    else if (row === "chat") playChat(t);
    else if (row === "ohat") playOhat(t);
  }
  function scheduleStep(step, t) {
    drumRows.forEach(function (r) {
      if (drumState.grid[r.key][step]) playSound(r.key, t);
    });
    (function (s, t) {
      var delay = Math.max(0, (t - audioCtx.currentTime) * 1000);
      setTimeout(function () { highlightStep(s); }, delay);
    })(step, t);
  }
  function advance() {
    secondsPer16th = 60 / drumState.bpm / 4;
    nextNoteTime += secondsPer16th;
    current16th = (current16th + 1) % 16;
  }
  function scheduler() {
    while (nextNoteTime < audioCtx.currentTime + 0.12) {
      scheduleStep(current16th, nextNoteTime);
      advance();
    }
    schedTimer = setTimeout(scheduler, 25);
  }
  function startDrum() {
    ensureAudio();
    if (audioCtx.state === "suspended") audioCtx.resume();
    drumState.playing = true;
    current16th = 0;
    nextNoteTime = audioCtx.currentTime + 0.05;
    secondsPer16th = 60 / drumState.bpm / 4;
    schedTimer = setTimeout(scheduler, 25);
  }
  function stopDrum() {
    drumState.playing = false;
    if (schedTimer) { clearTimeout(schedTimer); schedTimer = null; }
    clearHighlight();
    var b = document.getElementById("dm-play"); if (b) b.textContent = "▶ Play";
  }
  function resumeDrum() {
    startDrum();
    var b = document.getElementById("dm-play"); if (b) b.textContent = "■ Stop";
  }
  function highlightStep(step) {
    clearHighlight();
    drumRows.forEach(function (r) {
      var el = document.querySelector('.drum-step[data-row="' + r.key + '"][data-step="' + step + '"]');
      if (el) el.classList.add("playing");
    });
  }
  function clearHighlight() {
    document.querySelectorAll(".drum-step.playing").forEach(function (el) { el.classList.remove("playing"); });
  }

  function initDrum() {
    var desc = document.getElementById("dm-desc");
    var showDesc = function () {
      var p = D.drumPatterns.find(function (x) { return x.id === drumState.pattern; });
      if (desc && p) desc.textContent = p.name + " — " + p.desc + " (typical " + p.bpm[0] + "–" + p.bpm[1] + " BPM). Tap a step to edit, then Play.";
    };
    showDesc();

    var preset = document.getElementById("dm-preset");
    preset.addEventListener("change", function () {
      var wasPlaying = drumState.playing;
      stopDrum();
      loadPattern(preset.value);
      document.getElementById("tool-body").innerHTML = drumHTML(); initDrum();
      if (wasPlaying) resumeDrum();
    });

    document.getElementById("dm-bpm").addEventListener("change", function () {
      drumState.bpm = parseInt(this.value, 10) || 120;
      secondsPer16th = 60 / drumState.bpm / 4;
    });

    document.getElementById("dm-play").addEventListener("click", function () {
      if (drumState.playing) { stopDrum(); }
      else { startDrum(); this.textContent = "■ Stop"; }
    });

    document.getElementById("dm-clear").addEventListener("click", function () {
      var wasPlaying = drumState.playing;
      stopDrum();
      drumRows.forEach(function (r) { drumState.grid[r.key] = drumState.grid[r.key].map(function () { return 0; }); });
      document.getElementById("tool-body").innerHTML = drumHTML(); initDrum();
      if (wasPlaying) resumeDrum();
    });

    document.querySelectorAll(".drum-step").forEach(function (el) {
      el.addEventListener("click", function () {
        var row = el.getAttribute("data-row"), step = parseInt(el.getAttribute("data-step"), 10);
        drumState.grid[row][step] = drumState.grid[row][step] ? 0 : 1;
        el.classList.toggle("on", !!drumState.grid[row][step]);
      });
    });
  }

  /* ---------- Tap Tempo ---------- */
  function tapHTML() {
    return '<div class="card"><div class="tap-btn" id="tap-btn"><span class="tap-readout" id="tap-bpm">—</span><span class="tap-hint">Tap the beat (keyboard: press T). Tap at least 4 times.</span></div></div>'
      + '<div class="card"><h3>Why it matters</h3><p>Match the BPM to your reference so the backing track grooves with the original feel. Round to a whole number before you lock it into the project.</p></div>';
  }
  var tapKeyHandler = null;
  function initTap() {
    var taps = [], idleTimer = null;
    function reset() {
      taps = [];
      var b = document.getElementById("tap-bpm"); if (b) b.textContent = "—";
    }
    function tap() {
      var now = performance.now();
      taps.push(now);
      if (taps.length > 1) {
        while (taps.length && now - taps[0] > 2500) taps.shift();
        if (taps.length > 1) {
          var bpm = 60000 * (taps.length - 1) / (taps[taps.length - 1] - taps[0]);
          var out = document.getElementById("tap-bpm");
          if (out) out.textContent = Math.round(bpm) + " BPM";
        }
      }
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(reset, 2500);
    }
    document.getElementById("tap-btn").addEventListener("click", tap);
    if (tapKeyHandler) window.removeEventListener("keydown", tapKeyHandler);
    tapKeyHandler = function (e) {
      if ((e.key === "t" || e.key === "T") && currentRoute() === "tools" && activeTool === "tap") tap();
    };
    window.addEventListener("keydown", tapKeyHandler);
  }

  /* ---------- Structure Builder ---------- */
  var structSections = [
    { name: "Intro", bars: 4 }, { name: "Verse", bars: 8 }, { name: "Pre-Chorus", bars: 4 },
    { name: "Chorus", bars: 8 }, { name: "Verse", bars: 8 }, { name: "Pre-Chorus", bars: 4 },
    { name: "Chorus", bars: 8 }, { name: "Bridge", bars: 8 }, { name: "Chorus", bars: 8 }, { name: "Outro", bars: 4 }
  ];
  var structBpm = 120;

  function structureHTML() {
    var rows = structSections.map(function (s, i) {
      return '<div class="section-row">'
        + '<input type="text" class="sec-name" data-i="' + i + '" value="' + esc(s.name) + '">'
        + '<input type="number" class="sec-bars" data-i="' + i + '" value="' + s.bars + '" min="1" max="32">'
        + '<button class="btn sm" data-up="' + i + '">↑</button>'
        + '<button class="btn sm" data-down="' + i + '">↓</button>'
        + '<button class="btn sm danger" data-rm="' + i + '">✕</button>'
        + "</div>";
    }).join("");
    return '<div class="grid cols-2">'
      + '<div class="card"><h3>Section map</h3>' + rows
      + '<button class="btn sm" id="st-add" style="margin-top:8px">+ Add section</button></div>'
      + '<div class="card"><h3>Summary</h3>'
      + '<div class="field"><label>BPM</label><input type="number" id="st-bpm" value="' + structBpm + '" min="40" max="240"></div>'
      + '<div class="summary-box" id="st-summary"></div>'
      + '<button class="btn sm" id="st-copy" style="margin-top:10px">Copy summary</button></div>'
      + "</div>";
  }
  function initStructure() {
    function summary() {
      var totalBars = structSections.reduce(function (a, s) { return a + (parseInt(s.bars, 10) || 0); }, 0);
      var beats = totalBars * 4;
      var secs = beats / (structBpm || 120) * 60;
      var mm = Math.floor(secs / 60), ss = Math.round(secs % 60);
      var line = structSections.map(function (s) { return s.name + " ×" + s.bars; }).join(" · ");
      var el = document.getElementById("st-summary");
      if (el) el.textContent = line + "\n\n" + totalBars + " bars · " + beats + " beats · ≈ " + mm + ":" + (ss < 10 ? "0" : "") + ss + " at " + structBpm + " BPM";
      return el ? el.textContent : "";
    }
    summary();
    document.getElementById("st-bpm").addEventListener("change", function () { structBpm = parseInt(this.value, 10) || 120; summary(); });
    document.getElementById("st-add").addEventListener("click", function () {
      structSections.push({ name: "Section", bars: 4 });
      document.getElementById("tool-body").innerHTML = structureHTML(); initStructure();
    });
    document.getElementById("st-copy").addEventListener("click", function () {
      var t = summary();
      if (navigator.clipboard) navigator.clipboard.writeText(t).then(function () { toast("Summary copied."); });
      else toast("Copy failed — select and copy manually.");
    });
    document.querySelectorAll("[data-up]").forEach(function (el) {
      el.addEventListener("click", function () {
        var i = parseInt(el.getAttribute("data-up"), 10);
        if (i > 0) { var t = structSections[i]; structSections[i] = structSections[i - 1]; structSections[i - 1] = t; }
        document.getElementById("tool-body").innerHTML = structureHTML(); initStructure();
      });
    });
    document.querySelectorAll("[data-down]").forEach(function (el) {
      el.addEventListener("click", function () {
        var i = parseInt(el.getAttribute("data-down"), 10);
        if (i < structSections.length - 1) { var t = structSections[i]; structSections[i] = structSections[i + 1]; structSections[i + 1] = t; }
        document.getElementById("tool-body").innerHTML = structureHTML(); initStructure();
      });
    });
    document.querySelectorAll("[data-rm]").forEach(function (el) {
      el.addEventListener("click", function () {
        structSections.splice(parseInt(el.getAttribute("data-rm"), 10), 1);
        document.getElementById("tool-body").innerHTML = structureHTML(); initStructure();
      });
    });
    document.querySelectorAll(".sec-name").forEach(function (el) {
      el.addEventListener("change", function () { structSections[parseInt(el.getAttribute("data-i"), 10)].name = el.value; });
    });
    document.querySelectorAll(".sec-bars").forEach(function (el) {
      el.addEventListener("change", function () { structSections[parseInt(el.getAttribute("data-i"), 10)].bars = parseInt(el.value, 10) || 4; summary(); });
    });
  }

  /* ---------- Numbers & Chords ---------- */
  var numKey = "C";
  function numbersHTML() {
    var key = D.keys.find(function (k) { return k.name === numKey; }) || D.keys[0];
    var rows = key.chords.map(function (c) {
      return "<tr><td class='mono'>" + c.num + "</td><td class='mono'>" + c.roman + "</td><td class='mono' style='font-weight:700'>" + c.symbol + "</td></tr>";
    }).join("");
    var prog = D.progressions.map(function (p) {
      var syms = p.nums.split("·").map(function (t) {
        var idx = { "1": 0, "2-": 1, "3-": 2, "4": 3, "5": 4, "6-": 5, "7°": 6 }[t.trim()];
        return idx !== undefined ? key.chords[idx].symbol : t.trim();
      }).join(" · ");
      return '<div style="padding:10px 0;border-bottom:1px solid var(--line)"><strong>' + esc(p.name) + '</strong><div class="chip" style="margin:4px 0">' + esc(p.nums) + "</div><div>" + esc(syms) + "</div><div style='color:var(--faint);font-size:12.5px'>" + esc(p.note) + "</div></div>";
    }).join("");
    return '<div class="grid cols-2">'
      + '<div class="card"><h3>Diatonic chords</h3><div class="field"><label>Key</label><select id="num-key">' + keyOptions(numKey) + "</select></div>"
      + '<table class="ref"><thead><tr><th>Nashville</th><th>Roman</th><th>Chord</th></tr></thead><tbody>' + rows + "</tbody></table></div>"
      + '<div class="card"><h3>Common progressions</h3><p style="color:var(--muted)">Shown in ' + esc(numKey) + ".</p>" + prog + "</div>"
      + "</div>";
  }
  function initNumbers() {
    document.getElementById("num-key").addEventListener("change", function () {
      numKey = this.value;
      document.getElementById("tool-body").innerHTML = numbersHTML(); initNumbers();
    });
  }

  /* ---------- Transpose ---------- */
  var transposeState = { from: "C", to: "G", text: "C  G  Am  F" };
  function transposeHTML() {
    return '<div class="card"><h3>Transpose a progression</h3>'
      + '<div class="row">'
      + '<div class="field"><label>From key</label><select id="tr-from">' + keyOptions(transposeState.from) + "</select></div>"
      + '<div class="field"><label>To key</label><select id="tr-to">' + keyOptions(transposeState.to) + "</select></div>"
      + "</div>"
      + '<div class="field" style="margin-top:10px"><label>Chords (space-separated)</label><input type="text" id="tr-text" value="' + esc(transposeState.text) + '"></div>'
      + '<div class="summary-box" id="tr-out" style="margin-top:10px"></div></div>';
  }
  var NOTE_PC = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
  var SHARP_N = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  var FLAT_N = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
  function parseChord(tok) {
    var m = tok.match(/^([A-Ga-g])([#b]?)(.*)$/);
    if (!m) return null;
    var pc = (NOTE_PC[m[1].toUpperCase()] + (m[2] === "#" ? 1 : m[2] === "b" ? -1 : 0) + 12) % 12;
    var rest = m[3];
    var bass = null;
    if (rest.indexOf("/") !== -1) {
      var parts = rest.split("/");
      rest = parts[0];
      var bm = parts[1].match(/^([A-Ga-g])([#b]?)$/);
      if (bm) bass = (NOTE_PC[bm[1].toUpperCase()] + (bm[2] === "#" ? 1 : bm[2] === "b" ? -1 : 0) + 12) % 12;
    }
    return { pc: pc, quality: rest, bass: bass };
  }
  function initTranspose() {
    function compute() {
      var from = D.keys.find(function (k) { return k.name === transposeState.from; }) || D.keys[0];
      var to = D.keys.find(function (k) { return k.name === transposeState.to; }) || D.keys[0];
      var fromRoot = from.root;
      var toRoot = to.root;
      var semis = (toRoot - fromRoot + 12) % 12;
      var out = transposeState.text.split(/[\s,]+/).filter(Boolean).map(function (tok) {
        var c = parseChord(tok);
        if (!c) return tok;
        var npc = (c.pc + semis) % 12;
        var name = to.flats ? FLAT_N[npc] : SHARP_N[npc];
        var s = name + c.quality;
        if (c.bass !== null) s += "/" + (to.flats ? FLAT_N[(c.bass + semis) % 12] : SHARP_N[(c.bass + semis) % 12]);
        return s;
      }).join("  ");
      var el = document.getElementById("tr-out");
      if (el) el.textContent = "(" + transposeState.from + " → " + transposeState.to + ", +" + semis + " semitones)\n\n" + out;
    }
    compute();
    ["tr-from", "tr-to"].forEach(function (id) {
      document.getElementById(id).addEventListener("change", function () {
        transposeState[id === "tr-from" ? "from" : "to"] = this.value;
        compute();
      });
    });
    document.getElementById("tr-text").addEventListener("input", function () {
      transposeState.text = this.value;
      compute();
    });
  }

  /* ================= Cheat Sheets ================= */
  function renderCheats() {
    var daw = loadDaw();
    var html = pageHead("Cheat Sheets", "Print & keep by the rig", "Condensed references for the studio and the road, matched to " + dawName() + ". Hit print for a clean copy.")
      + '<div class="print-bar"><button class="btn primary" onclick="window.print()">⎙ Print all</button></div>';
    D.cheatSheets.forEach(function (s) {
      if (s.tool && s.tool !== "both" && s.tool !== daw) return;
      html += '<div class="card sheet"><h3>' + esc(s.title) + "</h3><ul class='tips' style='margin:0;background:transparent;padding:0 0 0 4px'>"
        + s.body.map(function (b) { return "<li>" + esc(b) + "</li>"; }).join("") + "</ul></div>";
    });
    return html;
  }

  /* ================= Licensing ================= */
  function renderLicensing() {
    var done = loadLicensing();
    var recap = D.licensing.recap.map(function (r) {
      return "<dt>" + esc(r.term) + "</dt><dd>" + esc(r.def) + "</dd>";
    }).join("");
    var checks = D.licensing.checklist.map(function (c, i) {
      return '<label class="check"><input type="checkbox" data-lic="' + i + '" ' + (done.indexOf(i) !== -1 ? "checked" : "") + '><span class="box"></span><span class="check-label">' + esc(c) + "</span></label>";
    }).join("");
    return pageHead("Licensing", "Quick reference", "You've got this handled (MLC + BMI, mechanicals approved). These are the reminders that keep the paperwork airtight on a DIY-backed release.")
      + '<div class="card"><h3>The two licenses that matter here</h3><dl class="kv">' + recap + "</dl></div>"
      + '<div class="card"><h3>Per-song paperwork checklist</h3>' + checks + "</div>";
  }
  function initLicensing() {
    document.querySelectorAll("[data-lic]").forEach(function (el) {
      el.addEventListener("change", function () {
        var i = parseInt(el.getAttribute("data-lic"), 10);
        var arr = loadLicensing();
        if (el.checked && arr.indexOf(i) === -1) arr.push(i);
        else if (!el.checked) arr = arr.filter(function (x) { return x !== i; });
        saveLicensing(arr);
      });
    });
  }

  /* ================= Toast ================= */
  var toastTimer = null;
  function toast(msg) {
    var el = document.getElementById("toast");
    if (!el) { el = document.createElement("div"); el.id = "toast"; el.className = "toast"; document.body.appendChild(el); }
    el.textContent = msg;
    el.classList.add("show");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove("show"); }, 2200);
  }

  /* ================= Global lesson interactions ================= */
  document.addEventListener("click", function (e) {
    var head = e.target && e.target.closest ? e.target.closest("[data-lesson]") : null;
    if (!head) return;
    var lesson = head.closest(".lesson");
    if (lesson) lesson.classList.toggle("open");
  });
  document.addEventListener("change", function (e) {
    var t = e.target;
    if (t && t.hasAttribute && t.hasAttribute("data-done")) {
      var id = t.getAttribute("data-done");
      var arr = loadDone();
      if (t.checked && arr.indexOf(id) === -1) arr.push(id);
      else if (!t.checked) arr = arr.filter(function (x) { return x !== id; });
      saveDone(arr);
      updateSidebar();
      var num = t.closest(".lesson").querySelector(".lesson-num");
      var txt = t.closest(".lesson").querySelector(".lesson-title");
      toast(t.checked ? "Completed: " + txt.textContent : "Marked incomplete: " + txt.textContent);
    }
  });

  /* ================= Boot ================= */
  window.setTool = function (t) {
    if (["drum", "tap", "structure", "numbers", "transpose"].indexOf(t) !== -1) activeTool = t;
    if (currentRoute() !== "tools") location.hash = "#/tools";
    else renderToolBody();
  };
  window.openDrumPreset = function (id) {
    loadPattern(id);
    activeTool = "drum";
    if (currentRoute() !== "tools") location.hash = "#/tools";
    else renderToolBody();
  };
  window.openSong = function (id) {
    openSongs.add(id);
    if (currentRoute() !== "songs") location.hash = "#/songs";
    else { document.getElementById("app").innerHTML = renderSongs(); initSongs(); }
    setTimeout(function () {
      var el = document.querySelector('[data-toggle="' + id + '"]');
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  if (!location.hash) location.hash = "#/dashboard";
  navigate();
  window.__STEMLESS_BOOTED = true;
})();
