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
  function loadSongs() { return LS.get("stemless.songs", []); }
  function saveSongs(arr) { LS.set("stemless.songs", arr); }
  function loadLicensing() { return LS.get("stemless.licensing.done", []); }
  function saveLicensing(arr) { LS.set("stemless.licensing.done", arr); }

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
    var inits = { tools: initTools, songs: initSongs, licensing: initLicensing };
    if (inits[route]) inits[route]();
    window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", navigate);

  /* ================= Progress ================= */
  function doneSet() { return new Set(loadDone()); }
  function lessonCount() { return D.lessons.length; }
  function doneCount() { return loadDone().length; }
  function updateSidebar() {
    var total = lessonCount(), done = doneCount();
    var pct = total ? Math.round(done / total * 100) : 0;
    var el = document.getElementById("sidePct"); if (el) el.textContent = pct + "%";
    var m = document.getElementById("sideMeter"); if (m) m.style.width = pct + "%";
  }

  function phaseProgress(phaseId) {
    var ls = D.lessons.filter(function (l) { return l.phase === phaseId; });
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

    return pageHead("Dashboard", "Build your own backing tracks", "DIY the whole rhythm section so a cover only needs the mechanical — no master-use, no stems to clear. You own the recording.")
      + '<div class="grid cols-3">'
      + '<div class="card stat"><div class="value">' + pct + '%</div><div class="label">of the Method complete</div></div>'
      + '<div class="card stat"><div class="value">' + songs.length + '</div><div class="label">songs on the board</div></div>'
      + '<div class="card stat"><div class="value">' + total + '</div><div class="label">lessons, ~2h total</div></div>'
      + "</div>"
      + '<div class="grid cols-2">'
      + '<div class="card"><h3>Your path</h3>' + phases + '<a class="btn primary" style="margin-top:14px" href="#/method">Continue the Method</a></div>'
      + '<div class="card"><h3>EP songs</h3>' + songList + '<a class="btn" style="margin-top:14px" href="#/songs">Manage songs</a></div>'
      + "</div>"
      + '<div class="card"><h3>Quick tools</h3><div class="tool-tabs">'
      + '<a class="tool-tab" href="#/tools" onclick="window.setTool(\'drum\')">Drum Machine</a>'
      + '<a class="tool-tab" href="#/tools" onclick="window.setTool(\'numbers\')">Numbers &amp; Chords</a>'
      + '<a class="tool-tab" href="#/tools" onclick="window.setTool(\'transpose\')">Transpose</a>'
      + '<a class="tool-tab" href="#/tools" onclick="window.setTool(\'tap\')">Tap Tempo</a>'
      + '<a class="tool-tab" href="#/cheats">Printable Cheat Sheets</a>'
      + "</div></div>";
  }

  /* ================= Method ================= */
  function renderMethod() {
    var done = doneSet();
    var byPhase = {};
    D.phases.forEach(function (p) { byPhase[p.id] = []; });
    D.lessons.forEach(function (l) { byPhase[l.phase].push(l); });

    var html = pageHead("The Method", "Six phases, in order", "Drums → bass → keys → guitars, then arrange, mix, and ship. Check off lessons as you go — your progress saves automatically.")
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
  var openSongs = new Set();
  function songStepCount(s) { return s.steps.filter(function (x) { return x.done; }).length; }

  function renderSongs() {
    var songs = loadSongs();
    var html = pageHead("Your Songs", "One board per cover", "Every song gets the full build checklist. Add the EP, work top to bottom, and the dashboard tracks it.")
      + '<div class="card"><h3>Add a song</h3>'
      + '<div class="row">'
      + '<div class="field"><label>Song title</label><input type="text" id="ns-title" placeholder="e.g. Dreams"></div>'
      + '<div class="field"><label>Artist</label><input type="text" id="ns-artist" placeholder="Fleetwood Mac"></div>'
      + '<div class="field"><label>Key</label><select id="ns-key">' + keyOptions("C") + "</select></div>"
      + '<div class="field"><label>BPM</label><input type="number" id="ns-bpm" value="120" min="40" max="240"></div>'
      + '<div class="field"><label>Feel</label><select id="ns-feel"><option>Straight</option><option>Swing</option><option>Half-time</option></select></div>'
      + '<div class="field" style="flex:0 0 auto"><button class="btn primary" id="ns-add">+ Add song</button></div>'
      + "</div></div>";

    if (!songs.length) {
      html += '<div class="empty">No songs yet. Add your first cover above and the build checklist appears here.</div>';
      return html;
    }

    songs.forEach(function (s) {
      var c = songStepCount(s), tot = s.steps.length;
      var pct = tot ? Math.round(c / tot * 100) : 0;
      var open = openSongs.has(s.id);
      html += '<div class="song-card"><div class="song-head" data-toggle="' + esc(s.id) + '" style="cursor:pointer">'
        + '<div><div class="s-title">' + esc(s.title) + '</div><div class="s-sub">' + esc(s.artist) + "</div></div>"
        + '<div class="spacer"></div>'
        + '<div class="song-tags">'
        + '<span class="tag">key <b>' + esc(s.key) + "</b></span>"
        + '<span class="tag"><b>' + esc(s.bpm) + "</b> BPM</span>"
        + '<span class="tag">' + esc(s.feel) + "</span>"
        + '<span class="tag song-progress" id="song-prog-' + esc(s.id) + '">' + c + "/" + tot + " (" + pct + "%)</span>"
        + "</div>"
        + '<span class="chev" style="color:var(--faint);margin-left:10px">▶</span>'
        + "</div>";
      if (open) {
        html += '<div class="song-body">'
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
          + "</div></div>";
      }
      html += "</div>";
    });
    return html;
  }

  function keyOptions(sel) {
    return D.keyNames.map(function (k) { return '<option' + (k === sel ? " selected" : "") + ">" + k + "</option>"; }).join("");
  }
  function feelOptions(sel) {
    return ["Straight", "Swing", "Half-time"].map(function (f) { return '<option' + (f === sel ? " selected" : "") + ">" + f + "</option>"; }).join("");
  }

  function initSongs() {
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
    var html = pageHead("Tools", "The workbench", "Audition drum patterns, find your tempo, build the section map, and convert chords between keys.")
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
  loadPattern("rock");

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
          document.getElementById("tap-bpm").textContent = Math.round(bpm) + " BPM";
        }
      }
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(reset, 2500);
    }
    document.getElementById("tap-btn").addEventListener("click", tap);
    window.addEventListener("keydown", function (e) {
      if (e.key === "t" || e.key === "T") tap();
    });
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
    var html = pageHead("Cheat Sheets", "Print & keep by the rig", "Condensed references for the studio and the road. Hit print for a clean copy.")
      + '<div class="print-bar"><button class="btn primary" onclick="window.print()">⎙ Print all</button></div>';
    D.cheatSheets.forEach(function (s) {
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

  /* ================= Global: lesson checkboxes ================= */
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

  if (!location.hash) location.hash = "#/dashboard";
  navigate();
})();
