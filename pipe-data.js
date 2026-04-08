// ══════════════════════════════════════════════════════════════
//  SMJ — Shared Pipe Database  (pipe-data.js)
//  Central source of truth for all SMJ calculation tools.
//  Edit via the Pipe Reference tool (/pipe-reference/).
//  Changes are persisted in localStorage and apply to all tools.
// ══════════════════════════════════════════════════════════════

(function (global) {
  'use strict';

  const STORAGE_KEY = 'smj_pipe_data_v1';

  // ── PE availability lookup ────────────────────────────────────
  // 2 = very common ★★, 1 = common ★, 0 = special order ○
  const PE_AVAIL_DEFAULT = {
    16:1,  20:2,  25:2,  32:2,  40:2,  50:2,  63:2,  75:2,  90:2,
    110:2, 125:2, 140:1, 160:2, 180:1, 200:2, 225:1, 250:2,
    280:1, 315:2, 355:1, 400:2, 450:1, 500:2, 560:1, 630:1,
    710:0, 800:0, 900:0, 1000:0, 1200:0, 1400:0, 1600:0
  };

  function peSizes(ods, sdr, pn) {
    return ods.map(od => ({
      n:  'Ø' + od,
      od: od,
      di: parseFloat((od * (1 - 2 / sdr)).toFixed(4)),
      c:  PE_AVAIL_DEFAULT[od] != null ? PE_AVAIL_DEFAULT[od] : 0,
      pn: pn
    }));
  }

  // ── Default pipe database ─────────────────────────────────────
  function buildDefaultPipes() {
    return {
      'PE100 · PN6.3 · SDR26': {
        rough: 0.05, std: 'EN 12201-2 · PE100 · SDR 26 · PN 6.3 bar',
        sizes: peSizes([32,40,50,63,75,90,110,125,140,160,180,200,225,250,280,315,355,400,450,500,560,630,710,800,900,1000,1200,1400,1600], 26, 6.3)
      },
      'PE100 · PN8 · SDR21': {
        rough: 0.05, std: 'EN 12201-2 · PE100 · SDR 21 · PN 8 bar',
        sizes: peSizes([25,32,40,50,63,75,90,110,125,140,160,180,200,225,250,280,315,355,400,450,500,560,630,710,800,900,1000], 21, 8)
      },
      'PE100 · PN10 · SDR17': {
        rough: 0.05, std: 'EN 12201-2 · PE100 · SDR 17 · PN 10 bar',
        sizes: peSizes([20,25,32,40,50,63,75,90,110,125,140,160,180,200,225,250,280,315,355,400,450,500,560,630,710,800,900,1000,1200,1400,1600], 17, 10)
      },
      'PE100 · PN12.5 · SDR13.6': {
        rough: 0.05, std: 'EN 12201-2 · PE100 · SDR 13.6 · PN 12.5 bar',
        sizes: peSizes([20,25,32,40,50,63,75,90,110,125,140,160,180,200,225,250,280,315,355,400,450,500,560,630,710,800,900,1000], 13.6, 12.5)
      },
      'PE100 · PN16 · SDR11': {
        rough: 0.05, std: 'EN 12201-2 · PE100 · SDR 11 · PN 16 bar',
        sizes: peSizes([16,20,25,32,40,50,63,75,90,110,125,140,160,180,200,225,250,280,315,355,400,450,500,560,630,710,800], 11, 16)
      },
      'PE100 · PN20 · SDR9': {
        rough: 0.05, std: 'EN 12201-2 · PE100 · SDR 9 · PN 20 bar',
        sizes: peSizes([16,20,25,32,40,50,63,75,90,110,125,140,160,180,200,225,250,280,315,355,400], 9, 20)
      },
      'PE100 · PN25 · SDR7.4': {
        rough: 0.05, std: 'EN 12201-2 · PE100 · SDR 7.4 · PN 25 bar',
        sizes: peSizes([16,20,25,32,40,50,63,75,90,110,125,140,160,180,200,225,250], 7.4, 25)
      },
      'Steel (medium wall)': {
        rough: 0.046, std: 'EN 10255 · medium series',
        sizes: [
          {n:'DN15',od:21.3,di:18.7,c:2},{n:'DN20',od:26.9,di:24.3,c:2},
          {n:'DN25',od:33.7,di:31.1,c:2},{n:'DN32',od:42.4,di:39.8,c:2},
          {n:'DN40',od:48.3,di:45.7,c:2},{n:'DN50',od:60.3,di:57.4,c:2},
          {n:'DN65',od:76.1,di:73.2,c:2},{n:'DN80',od:88.9,di:85.7,c:2},
          {n:'DN100',od:114.3,di:110.7,c:2},{n:'DN125',od:139.7,di:135.7,c:2},
          {n:'DN150',od:168.3,di:163.8,c:2},{n:'DN200',od:219.1,di:212.8,c:1},
          {n:'DN250',od:273.0,di:266.7,c:1},{n:'DN300',od:323.9,di:316.8,c:1},
          {n:'DN350',od:355.6,di:347.6,c:0},{n:'DN400',od:406.4,di:397.6,c:0},
          {n:'DN450',od:457.0,di:447.0,c:0},{n:'DN500',od:508.0,di:498.0,c:0},
          {n:'DN550',od:559.0,di:549.0,c:0},{n:'DN600',od:610.0,di:600.0,c:0}
        ]
      },
      'Steel (light wall)': {
        rough: 0.046, std: 'EN 10255 · light series',
        sizes: [
          {n:'DN6',od:10.287,di:6.833,c:1},{n:'DN8',od:13.716,di:9.246,c:1},
          {n:'DN10',od:17.145,di:12.522,c:1},{n:'DN15',od:21.336,di:15.799,c:2},
          {n:'DN20',od:26.670,di:20.930,c:2},{n:'DN25',od:33.401,di:26.645,c:2},
          {n:'DN32',od:42.164,di:35.052,c:2},{n:'DN40',od:48.260,di:40.894,c:2},
          {n:'DN50',od:60.325,di:52.502,c:2},{n:'DN65',od:73.025,di:62.713,c:2},
          {n:'DN80',od:88.900,di:77.927,c:2},{n:'DN90',od:101.60,di:90.119,c:1},
          {n:'DN100',od:114.30,di:102.26,c:1},{n:'DN125',od:141.30,di:128.19,c:1},
          {n:'DN150',od:168.28,di:154.05,c:1},{n:'DN200',od:219.08,di:202.72,c:1},
          {n:'DN250',od:273.05,di:254.51,c:0},{n:'DN300',od:323.85,di:304.80,c:0},
          {n:'DN350',od:355.60,di:336.55,c:0},{n:'DN400',od:406.40,di:387.35,c:0},
          {n:'DN450',od:457.20,di:438.15,c:0},{n:'DN500',od:508.00,di:488.95,c:0}
        ]
      },
      'Steel (heavy wall)': {
        rough: 0.046, std: 'EN 10255 · heavy series',
        sizes: [
          {n:'DN15',od:21.3,di:18.1,c:2},{n:'DN20',od:26.9,di:23.7,c:2},
          {n:'DN25',od:33.7,di:29.7,c:2},{n:'DN32',od:42.4,di:38.4,c:2},
          {n:'DN40',od:48.3,di:44.3,c:2},{n:'DN50',od:60.3,di:56.3,c:2},
          {n:'DN65',od:76.1,di:70.5,c:2},{n:'DN80',od:88.9,di:83.3,c:2},
          {n:'DN100',od:114.3,di:108.0,c:2},{n:'DN125',od:139.7,di:133.4,c:1},
          {n:'DN150',od:168.3,di:161.2,c:1},{n:'DN200',od:219.1,di:211.1,c:1},
          {n:'DN250',od:273.0,di:263.0,c:0},{n:'DN300',od:323.9,di:313.9,c:0},
          {n:'DN350',od:355.6,di:343.1,c:0},{n:'DN400',od:406.4,di:393.9,c:0},
          {n:'DN450',od:457.0,di:444.5,c:0},{n:'DN500',od:508.0,di:495.5,c:0}
        ]
      },
      'Stainless 316L': {
        rough: 0.015, std: 'EN 10217-7 / Sch 10S · 1.4404',
        sizes: [
          {n:'DN15',od:21.3,di:18.0,c:1},{n:'DN20',od:26.9,di:23.6,c:1},
          {n:'DN25',od:33.7,di:30.4,c:2},{n:'DN32',od:42.4,di:39.1,c:2},
          {n:'DN40',od:48.3,di:45.0,c:2},{n:'DN50',od:60.3,di:57.0,c:2},
          {n:'DN65',od:76.1,di:71.9,c:2},{n:'DN80',od:88.9,di:84.7,c:2},
          {n:'DN100',od:114.3,di:108.8,c:2},{n:'DN125',od:141.3,di:134.5,c:1},
          {n:'DN150',od:168.3,di:162.7,c:1},{n:'DN200',od:219.1,di:213.5,c:1},
          {n:'DN250',od:273.0,di:266.2,c:0},{n:'DN300',od:323.9,di:315.9,c:0},
          {n:'DN350',od:355.6,di:346.0,c:0},{n:'DN400',od:406.4,di:396.8,c:0}
        ]
      },
      'Ductile iron K9': {
        rough: 0.1, std: 'EN 545 / ISO 2531 · K9 cement-lined',
        sizes: [
          {n:'DN80',od:98.0,di:86.0,c:1},{n:'DN100',od:118.0,di:106.0,c:1},
          {n:'DN125',od:144.0,di:132.0,c:1},{n:'DN150',od:170.0,di:158.0,c:1},
          {n:'DN200',od:222.0,di:209.4,c:1},{n:'DN250',od:274.0,di:260.4,c:0},
          {n:'DN300',od:326.0,di:311.6,c:0},{n:'DN350',od:378.0,di:362.6,c:0},
          {n:'DN400',od:429.0,di:412.8,c:0},{n:'DN450',od:480.0,di:462.9,c:0},
          {n:'DN500',od:532.0,di:514.0,c:0},{n:'DN600',od:635.0,di:615.2,c:0},
          {n:'DN700',od:738.0,di:716.4,c:0},{n:'DN800',od:842.0,di:818.6,c:0},
          {n:'DN900',od:945.0,di:919.8,c:0},{n:'DN1000',od:1048.0,di:1021.0,c:0}
        ]
      },
      'District heating': {
        rough: 0.05, std: 'EN 253 · pre-insulated',
        sizes: [
          {n:'DN20',od:26.9,di:21.7,c:1},{n:'DN25',od:33.7,di:28.5,c:1},
          {n:'DN32',od:42.4,di:37.2,c:1},{n:'DN40',od:48.3,di:43.1,c:1},
          {n:'DN50',od:60.3,di:54.5,c:2},{n:'DN65',od:76.1,di:70.3,c:2},
          {n:'DN80',od:88.9,di:82.5,c:2},{n:'DN100',od:114.3,di:107.1,c:2},
          {n:'DN125',od:139.7,di:132.5,c:2},{n:'DN150',od:168.3,di:160.3,c:2},
          {n:'DN200',od:219.1,di:210.1,c:1},{n:'DN250',od:273.0,di:263.0,c:1},
          {n:'DN300',od:323.9,di:312.7,c:1},{n:'DN350',od:355.6,di:344.4,c:0},
          {n:'DN400',od:406.4,di:393.8,c:0},{n:'DN450',od:457.0,di:444.4,c:0},
          {n:'DN500',od:508.0,di:495.4,c:0},{n:'DN600',od:610.0,di:595.8,c:0}
        ]
      },
      'Copper': {
        rough: 0.002, std: 'EN 1057 · metric tube',
        sizes: [
          {n:'6×0.8',od:6,di:4.4,c:1},{n:'8×0.8',od:8,di:6.4,c:1},
          {n:'10×0.8',od:10,di:8.4,c:1},{n:'12×1.0',od:12,di:10.0,c:1},
          {n:'15×1.0',od:15,di:13.0,c:2},{n:'18×1.0',od:18,di:16.0,c:2},
          {n:'22×1.2',od:22,di:19.6,c:2},{n:'28×1.2',od:28,di:25.6,c:2},
          {n:'35×1.5',od:35,di:32.0,c:2},{n:'45×1.5',od:45,di:42.0,c:1},
          {n:'54×1.5',od:54,di:51.0,c:1},{n:'67×2.0',od:67,di:63.0,c:1},
          {n:'76×2.0',od:76,di:72.0,c:1},{n:'108×2.0',od:108,di:104.0,c:1}
        ]
      },
      'PVC SN8': {
        rough: 0.05, std: 'EN 1401 · SN8',
        sizes: [
          {n:'Ø110',od:110,di:103.6,c:2},{n:'Ø160',od:160,di:152.0,c:2},
          {n:'Ø200',od:200,di:190.2,c:2},{n:'Ø250',od:250,di:237.6,c:2},
          {n:'Ø315',od:315,di:299.6,c:2},{n:'Ø400',od:400,di:380.4,c:1},
          {n:'Ø500',od:500,di:475.4,c:1},{n:'Ø630',od:630,di:599.2,c:0}
        ]
      },
      'PP SN8': {
        rough: 0.05, std: 'EN 1852 · SN8',
        sizes: [
          {n:'Ø32',od:32,di:28.4,c:2},{n:'Ø40',od:40,di:36.4,c:2},
          {n:'Ø50',od:50,di:46.4,c:2},{n:'Ø75',od:75,di:69.8,c:2},
          {n:'Ø110',od:110,di:102.4,c:2},{n:'Ø125',od:125,di:118.0,c:1},
          {n:'Ø160',od:160,di:152.0,c:1},{n:'Ø200',od:200,di:190.2,c:1},
          {n:'Ø250',od:250,di:237.6,c:0},{n:'Ø315',od:315,di:299.6,c:0},
          {n:'Ø400',od:400,di:380.4,c:0},{n:'Ø500',od:500,di:475.4,c:0}
        ]
      },
      'PVC-U PN10': {
        rough: 0.0015, std: 'EN 1452 · SDR 21 · PN 10 bar',
        sizes: [
          {n:'Ø32',od:32,di:28.9,c:1},{n:'Ø40',od:40,di:36.2,c:1},
          {n:'Ø50',od:50,di:45.2,c:2},{n:'Ø63',od:63,di:57.0,c:2},
          {n:'Ø75',od:75,di:67.8,c:2},{n:'Ø90',od:90,di:81.4,c:2},
          {n:'Ø110',od:110,di:99.4,c:2},{n:'Ø125',od:125,di:113.0,c:2},
          {n:'Ø140',od:140,di:126.7,c:1},{n:'Ø160',od:160,di:144.7,c:2},
          {n:'Ø200',od:200,di:180.8,c:1},{n:'Ø250',od:250,di:226.0,c:1},
          {n:'Ø315',od:315,di:284.8,c:0},{n:'Ø400',od:400,di:361.6,c:0},
          {n:'Ø500',od:500,di:452.0,c:0}
        ]
      },
      'PP-R PN20': {
        rough: 0.007, std: 'EN ISO 15874 · SDR 5 · PN 20 bar',
        sizes: [
          {n:'Ø20',od:20,di:12.0,c:2},{n:'Ø25',od:25,di:15.0,c:2},
          {n:'Ø32',od:32,di:19.2,c:2},{n:'Ø40',od:40,di:24.0,c:2},
          {n:'Ø50',od:50,di:30.0,c:2},{n:'Ø63',od:63,di:37.8,c:2},
          {n:'Ø75',od:75,di:45.0,c:1},{n:'Ø90',od:90,di:54.0,c:1},
          {n:'Ø110',od:110,di:66.0,c:1},{n:'Ø125',od:125,di:75.0,c:1},
          {n:'Ø160',od:160,di:96.0,c:0},{n:'Ø200',od:200,di:120.0,c:0}
        ]
      },
      'PEX': {
        rough: 0.007, std: 'EN ISO 15875',
        sizes: [
          {n:'Ø16',od:16,di:12.0,c:2},{n:'Ø20',od:20,di:15.5,c:2},
          {n:'Ø25',od:25,di:20.0,c:2},{n:'Ø32',od:32,di:26.0,c:2},
          {n:'Ø40',od:40,di:32.0,c:2},{n:'Ø50',od:50,di:41.0,c:2},
          {n:'Ø63',od:63,di:51.0,c:2}
        ]
      },
      'PEX-FLEX': {
        rough: 0.007, std: 'EN ISO 15875 · flexible',
        sizes: [
          {n:'Ø25',od:25,di:20.0,c:2},{n:'Ø32',od:32,di:26.0,c:2},
          {n:'Ø40',od:40,di:32.0,c:2},{n:'Ø50',od:50,di:41.0,c:2},
          {n:'Ø63',od:63,di:51.0,c:2},{n:'Ø75',od:75,di:61.0,c:1},
          {n:'Ø90',od:90,di:73.0,c:1},{n:'Ø110',od:110,di:90.0,c:1}
        ]
      }
    };
  }

  // ── localStorage helpers ──────────────────────────────────────
  function loadPipes() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge: use saved data for any key present, defaults for missing keys
        const defaults = buildDefaultPipes();
        const merged = Object.assign({}, defaults);
        for (const key of Object.keys(parsed)) {
          merged[key] = parsed[key];
        }
        return merged;
      }
    } catch (e) {
      console.warn('SMJPipeDB: could not load localStorage data', e);
    }
    return buildDefaultPipes();
  }

  function savePipes(pipes) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pipes));
      global.PIPES = pipes;
    } catch (e) {
      console.warn('SMJPipeDB: could not save to localStorage', e);
    }
  }

  function resetPipes() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
    const def = buildDefaultPipes();
    global.PIPES = def;
    return def;
  }

  function isModified() {
    try {
      return localStorage.getItem(STORAGE_KEY) !== null;
    } catch (e) { return false; }
  }

  // ── Expose globals ────────────────────────────────────────────
  global.PIPES    = loadPipes();
  global.PE_AVAIL = PE_AVAIL_DEFAULT;

  global.SMJPipeDB = {
    STORAGE_KEY:       STORAGE_KEY,
    buildDefaultPipes: buildDefaultPipes,
    loadPipes:         loadPipes,
    save:              savePipes,
    reset:             resetPipes,
    isModified:        isModified
  };

})(window);
