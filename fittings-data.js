// ══════════════════════════════════════════════════════════════
//  SMJ — Shared Fittings & Valve K-value Database (fittings-data.js)
//  Central source of truth for resistance coefficients used in
//  the Pipeline Pressure Drop calculator.
//  Edit via the Fittings Reference tool (/fittings-reference/).
//  Changes are persisted in localStorage and apply to all tools.
// ══════════════════════════════════════════════════════════════

(function (global) {
  'use strict';

  const STORAGE_KEY = 'smj_fittings_data_v1';

  // ── Default K-value database ──────────────────────────────────
  function buildDefaultFittings() {
    return [

      // ── Elbows & Bends ───────────────────────────────────────
      {
        id: 'elbow90s',
        group: 'Elbows & Bends',
        name: '90° Elbow — Standard',
        icon: '↩',
        K: 0.90,
        notes: 'Screwed or welded standard-radius elbow. Crane TP-410.',
        ref: 'Crane TP-410 / ASHRAE'
      },
      {
        id: 'elbow90lr',
        group: 'Elbows & Bends',
        name: '90° Elbow — Long Radius (R = 1.5D)',
        icon: '↩',
        K: 0.50,
        notes: 'Long-radius elbow, smoother flow path. Common in piped aquaculture systems.',
        ref: 'Crane TP-410'
      },
      {
        id: 'elbow45',
        group: 'Elbows & Bends',
        name: '45° Elbow',
        icon: '↪',
        K: 0.40,
        notes: 'Standard 45° elbow.',
        ref: 'Crane TP-410'
      },
      {
        id: 'bend180',
        group: 'Elbows & Bends',
        name: '180° U-Bend (return bend)',
        icon: '↺',
        K: 2.20,
        notes: 'Full U-turn return bend. Conservative estimate.',
        ref: 'Crane TP-410'
      },

      // ── Tees ─────────────────────────────────────────────────
      {
        id: 'tee_run',
        group: 'Tees',
        name: 'Tee — Flow Through (run)',
        icon: '⊢',
        K: 0.50,
        notes: 'Flow passes straight through the tee body without branching.',
        ref: 'Crane TP-410'
      },
      {
        id: 'tee_br',
        group: 'Tees',
        name: 'Tee — Branch Flow',
        icon: '⊣',
        K: 1.50,
        notes: 'Flow diverts 90° into or from the branch. Higher loss than run-through.',
        ref: 'Crane TP-410'
      },

      // ── Strainers & Misc Fittings ─────────────────────────────
      {
        id: 'strainer',
        group: 'Strainers & Misc',
        name: 'Basket Strainer',
        icon: '⬡',
        K: 5.00,
        notes: 'Clean basket strainer. K increases significantly when fouled — check manufacturer data.',
        ref: 'Industry typical'
      },
      {
        id: 'y_strainer',
        group: 'Strainers & Misc',
        name: 'Y-Strainer',
        icon: '⬡',
        K: 3.00,
        notes: 'Clean Y-type strainer. Lower loss than basket strainer.',
        ref: 'Industry typical'
      },
      {
        id: 'inlet',
        group: 'Strainers & Misc',
        name: 'Sharp-Edge Pipe Inlet',
        icon: '▶',
        K: 0.50,
        notes: 'Abrupt flush inlet from reservoir into pipe.',
        ref: 'Idelchik'
      },
      {
        id: 'outlet',
        group: 'Strainers & Misc',
        name: 'Pipe Exit (flush discharge)',
        icon: '▷',
        K: 1.00,
        notes: 'Discharge into a reservoir — all kinetic energy is lost.',
        ref: 'Idelchik'
      },

      // ── Valves ───────────────────────────────────────────────
      {
        id: 'gate_v',
        group: 'Valves',
        name: 'Gate Valve — Fully Open',
        icon: '⬛',
        K: 0.20,
        notes: 'Cast steel gate valve fully open. Very low resistance.',
        ref: 'Crane TP-410'
      },
      {
        id: 'ball_v',
        group: 'Valves',
        name: 'Ball Valve — Fully Open',
        icon: '⚫',
        K: 0.10,
        notes: 'Full-bore ball valve fully open. Lowest resistance of common valves.',
        ref: 'Crane TP-410'
      },
      {
        id: 'butterfly_v',
        group: 'Valves',
        name: 'Butterfly Valve — Fully Open',
        icon: '🔵',
        K: 0.80,
        notes: 'Wafer-type butterfly valve, fully open. K varies significantly with disc design.',
        ref: 'Crane TP-410 / manufacturer'
      },
      {
        id: 'check_v',
        group: 'Valves',
        name: 'Check Valve — Swing Type',
        icon: '✔',
        K: 2.50,
        notes: 'Swing check valve. K is highly design-dependent — verify with manufacturer data.',
        ref: 'Crane TP-410'
      },
      {
        id: 'globe_v',
        group: 'Valves',
        name: 'Globe Valve — Fully Open',
        icon: '🌐',
        K: 7.00,
        notes: 'Globe valve fully open. High resistance; used for flow regulation.',
        ref: 'Crane TP-410'
      }
    ];
  }

  // ── localStorage helpers ──────────────────────────────────────
  function loadFittings() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge: start from defaults, overlay any saved K-values by id
        const defaults = buildDefaultFittings();
        const savedMap = {};
        parsed.forEach(f => { savedMap[f.id] = f; });
        return defaults.map(d => savedMap[d.id]
          ? Object.assign({}, d, { K: savedMap[d.id].K, notes: savedMap[d.id].notes })
          : d
        );
      }
    } catch (e) {
      console.warn('SMJFittingsDB: could not load localStorage data', e);
    }
    return buildDefaultFittings();
  }

  function saveFittings(fittings) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fittings));
      global.FITTINGS = fittings;
    } catch (e) {
      console.warn('SMJFittingsDB: could not save to localStorage', e);
    }
  }

  function resetFittings() {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
    const def = buildDefaultFittings();
    global.FITTINGS = def;
    return def;
  }

  function isModified() {
    try { return localStorage.getItem(STORAGE_KEY) !== null; } catch (e) { return false; }
  }

  // ── Helper: get K by id ───────────────────────────────────────
  function getK(id) {
    const f = (global.FITTINGS || []).find(x => x.id === id);
    return f ? f.K : null;
  }

  // ── Expose globals ────────────────────────────────────────────
  global.FITTINGS = loadFittings();

  global.SMJFittingsDB = {
    STORAGE_KEY:          STORAGE_KEY,
    buildDefaultFittings: buildDefaultFittings,
    loadFittings:         loadFittings,
    save:                 saveFittings,
    reset:                resetFittings,
    isModified:           isModified,
    getK:                 getK,
  };

})(window);
