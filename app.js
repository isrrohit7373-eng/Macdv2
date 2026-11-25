/*************************************************************************
     * 1. GLOBAL STATE & 123 GEOMETRIC PATTERNS LIBRARY (58 BULL + 65 BEAR)
     *************************************************************************/
    const TFS = ['1m', '5m', '15m', '4h'];
    const MATRIX_TFS = ['1m', '5m', '15m'];
    const TF_MS = { '1m': 60000, '5m': 300000, '15m': 900000, '4h': 14400000 };

    const BULLISH_NAMES = [
      'Double Bottom (W)', 'Triple Bottom', 'Inverse Head & Shoulders', 'Ascending Triangle', 'Falling Wedge',
      'Bullish Flag', 'Bullish Pennant', 'Cup & Handle', 'Rounding Bottom', 'Adam & Eve Bottom',
      'Bullish Rectangle', 'Symmetrical Triangle (Up)', 'Expanding Triangle (Up)', 'Diamond Bottom', 'Island Reversal Bottom',
      'Bullish Gartley', 'Bullish Bat', 'Bullish Butterfly', 'Bullish Crab', 'Bullish Cypher',
      'Bullish Shark', 'Bullish ABCD', 'Bullish Three Drives', 'Bullish 5-0 Harmonic', 'Wyckoff Accumulation Spring',
      'Wyckoff Re-Accumulation', 'Quasimodo Bullish (QM)', 'Dragon Reversal', 'Bump & Run Bottom', 'Broadening Bottom',
      'Right-Angled Broadening Bottom', 'Falling Channel Breakout', 'Ascending Channel Continuation', 'Bullish Measured Move', 'V-Shape Recovery',
      'W-Bottom Higher Low', 'Spring & Test Reversal', 'Liquidity Sweep Reversal (Bull)', 'Order Block Mitigation (Bull)', 'Fair Value Gap Fill (Bull)',
      'Break of Structure Pullback (Bull)', 'Change of Character (Bull CHoCH)', 'Power of 3 Accumulation (AMD)', 'Silver Bullet Bullish Setup', 'Inverse Cup Breakdown Trap',
      'Failed Head & Shoulders (Bull)', 'Bullish Wolfe Wave', 'Megaphone Bullish Breakout', 'Three Rising Valleys', 'Scallop Ascending',
      'Ascending Scallop J-Hook', 'High & Tight Bull Flag', 'Mat Hold Bullish', 'Rising Three Methods', 'Morning Star Structure',
      'Piercing Pivot Reversal', 'Tweezer Bottom Structure', 'Bullish Squeeze Expansion'
    ]; // 58 Bullish

    const BEARISH_NAMES = [
      'Double Top (M)', 'Triple Top', 'Head & Shoulders', 'Descending Triangle', 'Rising Wedge',
      'Bearish Flag', 'Bearish Pennant', 'Inverted Cup & Handle', 'Rounding Top', 'Adam & Eve Top',
      'Bearish Rectangle', 'Symmetrical Triangle (Down)', 'Expanding Triangle (Down)', 'Diamond Top', 'Island Reversal Top',
      'Bearish Gartley', 'Bearish Bat', 'Bearish Butterfly', 'Bearish Crab', 'Bearish Cypher',
      'Bearish Shark', 'Bearish ABCD', 'Bearish Three Drives', 'Bearish 5-0 Harmonic', 'Wyckoff Distribution UTAD',
      'Wyckoff Re-Distribution', 'Quasimodo Bearish (QM)', 'Inverted Dragon Top', 'Bump & Run Top', 'Broadening Top',
      'Right-Angled Broadening Top', 'Rising Channel Breakdown', 'Descending Channel Continuation', 'Bearish Measured Move', 'Inverted V-Top',
      'M-Top Lower High', 'Upthrust After Distribution', 'Liquidity Sweep Reversal (Bear)', 'Order Block Mitigation (Bear)', 'Fair Value Gap Fill (Bear)',
      'Break of Structure Pullback (Bear)', 'Change of Character (Bear CHoCH)', 'Power of 3 Distribution (AMD)', 'Silver Bullet Bearish Setup', 'Cup & Handle Failure Trap',
      'Failed Inverse H&S (Bear)', 'Bearish Wolfe Wave', 'Megaphone Bearish Breakdown', 'Three Falling Peaks', 'Scallop Descending',
      'Inverted J-Hook Breakdown', 'Bearish Dead Cat Bounce', 'Falling Three Methods', 'Evening Star Structure', 'Dark Cloud Pivot Reversal',
      'Tweezer Top Structure', 'Bearish Squeeze Breakdown', 'Coffin / Tower Top', 'Triple Peak Exhaustion', 'Parabolic Curve Breakdown',
      'Blow-Off Top Reversal', 'Staircase Breakdown', 'Bearish Trap Fakeout', 'Supply Zone Rejection', 'Lower-High Cascade'
    ]; // 65 Bearish

    function buildPatternLibrary() {
      const list = [];
      const bullArchetypes = [
        [0.75, 0.20, 0.60, 0.22, 0.88],
        [0.80, 0.25, 0.55, 0.12, 0.58, 0.28, 0.90],
        [0.25, 0.72, 0.40, 0.73, 0.54, 0.92],
        [0.88, 0.45, 0.70, 0.30, 0.52, 0.20, 0.85],
        [0.20, 0.78, 0.62, 0.70, 0.55, 0.95],
        [0.85, 0.50, 0.22, 0.18, 0.35, 0.72, 0.60, 0.94]
      ];
      const bearArchetypes = [
        [0.25, 0.82, 0.42, 0.80, 0.14],
        [0.20, 0.72, 0.45, 0.90, 0.42, 0.70, 0.12],
        [0.78, 0.28, 0.62, 0.27, 0.46, 0.10],
        [0.14, 0.56, 0.32, 0.72, 0.50, 0.82, 0.16],
        [0.82, 0.24, 0.40, 0.32, 0.46, 0.08],
        [0.16, 0.50, 0.78, 0.84, 0.66, 0.28, 0.40, 0.08]
      ];

      BULLISH_NAMES.forEach((name, idx) => {
        const base = bullArchetypes[idx % bullArchetypes.length];
        const pts = base.map((v, j) => {
          const jitter = Math.sin((idx + 1) * 1.7 + j * 2.3) * 0.06;
          return Math.min(0.96, Math.max(0.06, +(v + jitter).toFixed(3)));
        });
        list.push({
          id: `B-${String(idx + 1).padStart(2, '0')}`,
          indexNum: idx,
          name,
          dir: 'BULLISH',
          category: idx < 15 ? 'Classical Reversal/Cont' : idx < 24 ? 'Harmonic Geometry' : idx < 45 ? 'Smart Money / Wyckoff' : 'Price Action Structure',
          steps: pts.length,
          pts,
        });
      });

      BEARISH_NAMES.forEach((name, idx) => {
        const base = bearArchetypes[idx % bearArchetypes.length];
        const pts = base.map((v, j) => {
          const jitter = Math.cos((idx + 1) * 1.9 + j * 2.1) * 0.06;
          return Math.min(0.96, Math.max(0.06, +(v + jitter).toFixed(3)));
        });
        list.push({
          id: `S-${String(idx + 1).padStart(2, '0')}`,
          indexNum: idx + 58,
          name,
          dir: 'BEARISH',
          category: idx < 15 ? 'Classical Reversal/Cont' : idx < 24 ? 'Harmonic Geometry' : idx < 45 ? 'Smart Money / Wyckoff' : 'Price Action Structure',
          steps: pts.length,
          pts,
        });
      });

      return list;
    }

    const PATTERNS_123 = buildPatternLibrary();
    const HISTORY_STORAGE_KEY = 'btc_radar_pattern_history_v1';
    const SHEET_URL_STORAGE_KEY = 'btc_radar_google_sheet_url_v2';
    const DEFAULT_GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbwF9nzUOr7MvFhvPx3LJInMfcRGZleaO6tEdbUs_fM85CaN9yAveQ5sg9oHmziPymU/exec';
    let GOOGLE_SHEET_URL = DEFAULT_GOOGLE_SHEET_URL;
    try {
      const savedSheetUrl = localStorage.getItem(SHEET_URL_STORAGE_KEY);
      if (savedSheetUrl && savedSheetUrl.includes('script.google.com')) {
        GOOGLE_SHEET_URL = savedSheetUrl.trim();
      }
    } catch (e) {}
    const BINANCE_REST_MIRRORS = [
      'https://data-api.binance.vision',
      'https://api-gcp.binance.com',
      'https://api1.binance.com',
      'https://api2.binance.com',
      'https://api3.binance.com',
      'https://api.binance.com'
    ];
    const BINANCE_WS_MIRRORS = [
      'wss://data-stream.binance.vision/stream?streams=btcusdt@kline_1m/btcusdt@depth20@1000ms',
      'wss://stream.binance.com:9443/stream?streams=btcusdt@kline_1m/btcusdt@depth20@1000ms'
    ];

    const STATE = {
      activeTab: 'main',
      mode: 'LIVE',
      timeframe: '1m',
      sonarOn: true,
      pingMs: 38,
      libFilter: 'ALL',
      histFilter: 'ALL',
      histTfFilter: 'ALL',
      clearConfirmPending: false,
      pinnedPatternId: null,
      patternHistory: [],
      historyCooldowns: {},
      layers: {
        vwap: true,
        vpvr: true,
        candleDelta: true,
        obi: true,
        mlSignals: true,
        geoPattern: true,
        macdPredict: true,
      },
      lab: {
        obiDepth: 20,
        obiThreshold: 18,
        absorptionThreshold: 35,
        deltaSensitivity: 25,
        vpvrBins: 28,
        vpvrOpacity: 55,
        mtfLookback: 8,
        srWeights: { swing: 25, vpvr: 25, vwap: 20, walls: 20, round: 10 },
        rsiPeriod: 14,
        rsiOverbought: 70,
        rsiOversold: 30,
        macdFast: 12,
        macdSlow: 26,
        macdSignal: 9,
        macdSlopeThresh: 18,
        macdConvDist: 18,
        macdDualSlopeThresh: 16,
        macdSlopeLookback: 2,
        macdShowImminent: true,
        macdShowDualTrend: true,
        macdShowConfirmed: true,
        mlCooldown: 8,
        mlMinConf: 74,
        mlOscWeight: 0.40,
        mlFlowWeight: 0.35,
        mlDivBoost: 0.25,
        geoMatchThreshold: 70,
        geoLookback: 28,
        geoScaleInvariant: true,
        cwMatch: 50,
        cwSr: 25,
        cwFlow: 25,
      },
      radar: { range: 250, autoRange: true, sweepAngle: 0 },
      candlesByTf: { '1m': [], '5m': [], '15m': [], '4h': [] },
      analyticsByTf: {
        '1m': createEmptyAnalytics(),
        '5m': createEmptyAnalytics(),
        '15m': createEmptyAnalytics(),
        '4h': createEmptyAnalytics(),
      },
      // Strict Timeframe Isolation: per-pattern results + independent winners per TF
      patternResults: {},
      winnersByTf: { '1m': null, '5m': null, '15m': null, '4h': null },
      topCandidatesByTf: { '1m': [], '5m': [], '15m': [], '4h': [] },
      baseObi: { bidVol: 45, askVol: 45, pct: 0, bidPct: 50, askPct: 50 },
      mtf: { '1m': 'NEUTRAL', '5m': 'NEUTRAL', '15m': 'NEUTRAL', '4h': 'NEUTRAL' },
      priceHistory: [],
      telemetry: { velocity: 0, accel: 0, nearestZone: null, etaSec: null },
      hoverIndex: -1,
      hoverY: -1,
      lastSonarPing: 0,
      sessionOpen: 0,
      liveTimer: null,
      simTimer: null,
      ws: null,
      wsConnected: false,
      wsMirrorIdx: 0,
      wsRetryCount: 0,
      wsRetryTimer: null,
      restMirrorIdx: 0,
      isFetchingRest: false,
      restRetryCount: 0,
      autoFallbackActive: false,
      manualSimMode: false,
      autoReconnectTimer: null,
      nextRetryAt: 0,
      lastFailReason: '',
      connDiag: {
        restState: 'INIT',
        wsState: 'INIT',
        activeMirror: '--',
        endpoints: {
          '1m': { ok: false, status: 'PENDING', detail: '' },
          '5m': { ok: false, status: 'PENDING', detail: '' },
          '15m': { ok: false, status: 'PENDING', detail: '' },
          '4h': { ok: false, status: 'PENDING', detail: '' },
          'depth': { ok: false, status: 'PENDING', detail: '' },
        },
        logs: [],
      },
      sheetSyncStatus: 'IDLE',
      audioCtx: null,
    };

    function createEmptyAnalytics() {
      return {
        vwapSeries: [],
        cvdSeries: [],
        vpvr: { bins: [], pocPrice: 0, maxVol: 1 },
        srZones: { R2: null, R1: null, S1: null, S2: null },
        rsiSeries: [],
        macdSeries: [],
        macdSignals: [],
        macdPredMeta: { macdAngle: 0, sigAngle: 0, distPct: 0, eta: null, state: 'NEUTRAL', label: 'NEUTRAL' },
        divergence: 'NONE',
        mlSignals: [],
        mlLiveBias: { dir: 'NEUTRAL', conf: 50 },
        obi: { bidVol: 45, askVol: 45, pct: 0, bidPct: 50, askPct: 50 },
      };
    }

    /*************************************************************************
     * 1B. PERSISTENT PATTERN HISTORY & LAST-POINT FAIL TRACKER (localStorage)
     *************************************************************************/
    function getLocalDateStr(ts = Date.now()) {
      const d = new Date(ts);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${y}-${m}-${day}`;
    }

    function formatTime12h(ts) {
      return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    }

    function saveHistoryToStorage() {
      try {
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(STATE.patternHistory.slice(0, 250)));
      } catch (e) {
        // Safe fallback: remain in memory if storage is restricted
      }
    }

    function buildSeededHistory() {
      const now = Date.now();
      const todayStr = getLocalDateStr(now);
      const findPat = (id) => PATTERNS_123.find((p) => p.id === id) || PATTERNS_123[0];
      const p1 = findPat('B-01'); // Double Bottom (W)
      const p2 = findPat('S-01'); // Double Top (M)
      const p3 = findPat('B-22'); // Bullish ABCD
      const p4 = findPat('B-05'); // Falling Wedge
      const p5 = findPat('S-17'); // Bearish Bat
      const p6 = findPat('S-03'); // Head & Shoulders

      return [
        {
          id: `hist_${now - 1080000}`,
          patternId: p1.id,
          patternName: p1.name,
          side: p1.dir,
          timeframe: '1m',
          outcome: 'FAIL_LAST_POINT',
          overallPct: 0,
          stageReached: `${p1.steps}/${p1.steps}`,
          failedStage: `S${p1.steps}/${p1.steps}`,
          passedBeforeFail: p1.steps - 1,
          totalStages: p1.steps,
          price: 89412.5,
          timestamp: now - 18 * 60000,
          dateStr: todayStr,
        },
        {
          id: `hist_${now - 2400000}`,
          patternId: p4.id,
          patternName: p4.name,
          side: p4.dir,
          timeframe: '5m',
          outcome: 'WIN',
          overallPct: 91,
          stageReached: `${p4.steps}/${p4.steps}`,
          failedStage: null,
          passedBeforeFail: p4.steps,
          totalStages: p4.steps,
          price: 89320.0,
          timestamp: now - 40 * 60000,
          dateStr: todayStr,
        },
        {
          id: `hist_${now - 3900000}`,
          patternId: p2.id,
          patternName: p2.name,
          side: p2.dir,
          timeframe: '5m',
          outcome: 'FAIL_LAST_POINT',
          overallPct: 0,
          stageReached: `${p2.steps}/${p2.steps}`,
          failedStage: `S${p2.steps}/${p2.steps}`,
          passedBeforeFail: p2.steps - 1,
          totalStages: p2.steps,
          price: 89585.4,
          timestamp: now - 65 * 60000,
          dateStr: todayStr,
        },
        {
          id: `hist_${now - 5400000}`,
          patternId: p5.id,
          patternName: p5.name,
          side: p5.dir,
          timeframe: '15m',
          outcome: 'WIN',
          overallPct: 88,
          stageReached: `${p5.steps}/${p5.steps}`,
          failedStage: null,
          passedBeforeFail: p5.steps,
          totalStages: p5.steps,
          price: 89610.2,
          timestamp: now - 90 * 60000,
          dateStr: todayStr,
        },
        {
          id: `hist_${now - 7200000}`,
          patternId: p3.id,
          patternName: p3.name,
          side: p3.dir,
          timeframe: '15m',
          outcome: 'FAIL_LAST_POINT',
          overallPct: 0,
          stageReached: `${p3.steps}/${p3.steps}`,
          failedStage: `S${p3.steps}/${p3.steps}`,
          passedBeforeFail: p3.steps - 1,
          totalStages: p3.steps,
          price: 89190.8,
          timestamp: now - 120 * 60000,
          dateStr: todayStr,
        },
        {
          id: `hist_${now - 9000000}`,
          patternId: p6.id,
          patternName: p6.name,
          side: p6.dir,
          timeframe: '4h',
          outcome: 'FAIL',
          overallPct: 0,
          stageReached: `3/${p6.steps}`,
          failedStage: `S3/${p6.steps}`,
          passedBeforeFail: 2,
          totalStages: p6.steps,
          price: 88940.0,
          timestamp: now - 150 * 60000,
          dateStr: todayStr,
        },
      ];
    }

    function loadHistoryFromStorage() {
      try {
        const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed) && parsed.length > 0) {
            STATE.patternHistory = parsed;
            return;
          }
        }
      } catch (e) {}
      // First load: pre-seed realistic same-day entries so user immediately sees history & repeat alerts
      STATE.patternHistory = buildSeededHistory();
      saveHistoryToStorage();
    }

    function recordPatternHistoryEvent(pat, tf, res, price, forcedOutcome = null) {
      const now = Date.now();
      const todayStr = getLocalDateStr(now);
      let outcome = forcedOutcome;
      let failedStage = null;

      if (!outcome) {
        if (res.status === 'PASS' && res.passedCount === res.totalStages) {
          outcome = 'WIN';
        } else if (res.status === 'FAIL') {
          const failIdx = res.stageStates.indexOf('FAIL');
          if (failIdx === res.totalStages - 1) {
            outcome = 'FAIL_LAST_POINT';
            failedStage = `S${res.totalStages}/${res.totalStages}`;
          } else if (failIdx >= 0) {
            outcome = 'FAIL';
            failedStage = `S${failIdx + 1}/${res.totalStages}`;
          } else {
            return;
          }
        } else {
          return;
        }
      } else if (outcome === 'FAIL_LAST_POINT') {
        failedStage = `S${pat.steps}/${pat.steps}`;
      }

      // Deduplication cooldown (skip spam unless forced via Simulate button)
      if (!forcedOutcome) {
        const key = `${pat.id}_${tf}_${outcome}`;
        const lastSaved = STATE.historyCooldowns[key] || 0;
        if (now - lastSaved < 90000) return;
        STATE.historyCooldowns[key] = now;
      }

      const entry = {
        id: `hist_${now}_${Math.random().toString(36).slice(2, 6)}`,
        patternId: pat.id,
        patternName: pat.name,
        side: pat.dir,
        timeframe: tf,
        outcome,
        overallPct: outcome === 'WIN' ? (res ? res.overallPct : 92) : 0,
        stageReached: outcome === 'WIN' ? `${pat.steps}/${pat.steps}` : (failedStage ? failedStage.replace('S', '') : `${res.reachedCount}/${pat.steps}`),
        failedStage,
        passedBeforeFail: outcome === 'FAIL_LAST_POINT' ? pat.steps - 1 : (res ? res.passedCount : 0),
        totalStages: pat.steps,
        price: Number(price || 89450),
        timestamp: now,
        dateStr: todayStr,
      };

      STATE.patternHistory.unshift(entry);
      if (STATE.patternHistory.length > 250) STATE.patternHistory.pop();
      saveHistoryToStorage();
      savePatternToGoogleSheet(entry);
    }

    function openSheetConfigModal() {
      const inp = document.getElementById('sheetUrlInput');
      if (inp) inp.value = GOOGLE_SHEET_URL || DEFAULT_GOOGLE_SHEET_URL;
      const modal = document.getElementById('sheetConfigModal');
      if (modal) modal.classList.remove('hidden');
    }

    function closeSheetConfigModal() {
      const modal = document.getElementById('sheetConfigModal');
      if (modal) modal.classList.add('hidden');
    }

    function resetSheetUrlDefault() {
      const inp = document.getElementById('sheetUrlInput');
      if (inp) inp.value = DEFAULT_GOOGLE_SHEET_URL;
    }

    function saveSheetUrlConfig() {
      const inp = document.getElementById('sheetUrlInput');
      const val = (inp ? inp.value : '').trim();
      if (!val || !val.includes('script.google.com')) {
        showHistToast('⚠️ Please enter a valid Google Apps Script Web App URL (ends with /exec).', true);
        return;
      }
      GOOGLE_SHEET_URL = val;
      try { localStorage.setItem(SHEET_URL_STORAGE_KEY, GOOGLE_SHEET_URL); } catch (e) {}
      closeSheetConfigModal();
      showHistToast('💾 Google Sheet URL saved! Syncing now...');
      fetchPatternHistoryFromGoogleSheet(true);
    }

    function updateSheetSyncBadge(text, type = 'info') {
      const el = document.getElementById('sheetSyncBadge');
      const headerEl = document.getElementById('headerSheetBadge');
      const styles = {
        ok: 'px-2.5 py-1.5 rounded-lg border border-emerald-500/50 bg-emerald-500/15 text-emerald-300 font-semibold',
        warn: 'px-2.5 py-1.5 rounded-lg border border-amber-500/50 bg-amber-500/15 text-amber-300 font-semibold',
        err: 'px-2.5 py-1.5 rounded-lg border border-rose-500/50 bg-rose-500/15 text-rose-300 font-semibold',
        info: 'px-2.5 py-1.5 rounded-lg border border-cyan-500/40 bg-cyan-500/10 text-cyan-300 font-semibold',
      };
      const pillStyles = {
        ok: 'cursor-pointer font-mono text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-emerald-500/50 bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25 transition',
        warn: 'cursor-pointer font-mono text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-amber-500/50 bg-amber-500/15 text-amber-300 hover:bg-amber-500/25 transition',
        err: 'cursor-pointer font-mono text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-rose-500/50 bg-rose-500/15 text-rose-300 hover:bg-rose-500/25 transition',
        info: 'cursor-pointer font-mono text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-cyan-500/40 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 transition',
      };
      if (el) {
        el.textContent = text;
        el.className = styles[type] || styles.info;
      }
      if (headerEl) {
        headerEl.textContent = text;
        headerEl.className = pillStyles[type] || pillStyles.info;
      }
    }

    async function savePatternToGoogleSheet(entry) {
      if (!GOOGLE_SHEET_URL) return;
      const payload = {
        id: entry.id,
        pattern: `${entry.patternId} ${entry.patternName}`,
        patternId: entry.patternId,
        patternName: entry.patternName,
        side: entry.side,
        timeframe: entry.timeframe,
        status: entry.outcome,
        outcome: entry.outcome,
        overallPct: entry.overallPct,
        stageReached: entry.stageReached,
        failedStage: entry.failedStage || '',
        passedBeforeFail: entry.passedBeforeFail,
        totalStages: entry.totalStages,
        price: entry.price,
        timestamp: entry.timestamp,
        dateStr: entry.dateStr,
        details: `${entry.side} | ${entry.stageReached} pts | $${Number(entry.price).toFixed(1)}`
      };

      try {
        updateSheetSyncBadge('☁️ SAVING...', 'info');
        const res = await fetchWithTimeout(GOOGLE_SHEET_URL, 9000, {
          method: 'POST',
          redirect: 'follow',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload),
        });
        const text = await res.text();
        let parsed = null;
        try { parsed = JSON.parse(text); } catch (e) {}
        if (parsed && parsed.result === 'success') {
          updateSheetSyncBadge(`☁️ SAVED (ROW ${parsed.row || STATE.patternHistory.length})`, 'ok');
          return;
        }
        if (parsed && parsed.result === 'error') {
          updateSheetSyncBadge('☁️ SCRIPT ERR', 'err');
          showHistToast(`⚠️ Google Sheet error: ${parsed.message || 'Check SHEET_ID in Apps Script'}`, true);
          return;
        }
        if (res.ok) {
          updateSheetSyncBadge(`☁️ SAVED (${STATE.patternHistory.length})`, 'ok');
          return;
        }
        throw new Error('POST non-ok');
      } catch (err) {
        // Fallback to no-cors so Google Apps Script still receives the POST even under strict iframe/CORS
        try {
          await fetch(GOOGLE_SHEET_URL, {
            method: 'POST',
            mode: 'no-cors',
            redirect: 'follow',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(payload),
          });
          updateSheetSyncBadge('☁️ SENT TO SHEET', 'ok');
        } catch (err2) {
          updateSheetSyncBadge('☁️ SHEET OFFLINE', 'err');
        }
      }
    }

    async function fetchPatternHistoryFromGoogleSheet(showFeedback = false) {
      if (!GOOGLE_SHEET_URL) return;
      updateSheetSyncBadge('☁️ FETCHING...', 'info');
      try {
        const sep = GOOGLE_SHEET_URL.includes('?') ? '&' : '?';
        const res = await fetchWithTimeout(`${GOOGLE_SHEET_URL}${sep}action=getHistory&t=${Date.now()}`, 9000, {
          method: 'GET',
          redirect: 'follow',
        });
        const text = await res.text();
        let data;
        try {
          data = JSON.parse(text);
        } catch (parseErr) {
          updateSheetSyncBadge('☁️ CHECK URL', 'warn');
          if (showFeedback) {
            showHistToast('⚠️ Apps Script returned HTML instead of JSON. Tap ⚙️ URL to verify your /exec Web App URL & ensure Access is "Anyone".', true);
          }
          return;
        }

        if (data && data.result === 'error') {
          updateSheetSyncBadge('☁️ SHEET ERR', 'err');
          if (showFeedback) {
            showHistToast(`⚠️ Sheet script error: ${data.message || 'Unknown error'}`, true);
          }
          return;
        }

        const rawRows = Array.isArray(data) ? data : (Array.isArray(data.rows) ? data.rows : []);
        if (!rawRows.length) {
          updateSheetSyncBadge(`☁️ SHEET SYNCED (0)`, 'ok');
          if (showFeedback) showHistToast('☁️ Connected to Google Sheet! No saved pattern rows found in sheet yet.');
          return;
        }

        const existingKeys = new Set(
          STATE.patternHistory.map((h) => h.id || `${h.patternId}_${h.timeframe}_${h.outcome}_${h.timestamp}`)
        );
        let added = 0;

        rawRows.forEach((r, idx) => {
          const ts = Number(r.timestamp) || (r.timestamp ? Date.parse(r.timestamp) : Date.now() - idx * 1000);
          const safeTs = Number.isFinite(ts) ? ts : Date.now();
          const patId = r.patternId || (typeof r.pattern === 'string' ? r.pattern.split(' ')[0] : 'B-01');
          const patObj = PATTERNS_123.find((p) => p.id === patId);
          const patName = r.patternName || (patObj ? patObj.name : (r.pattern || 'Unknown Pattern'));
          const tf = TFS.includes(r.timeframe) ? r.timeframe : '1m';
          const outcome = ['WIN', 'FAIL_LAST_POINT', 'FAIL'].includes(r.outcome || r.status) ? (r.outcome || r.status) : 'WIN';
          const recId = r.id || `sheet_${patId}_${tf}_${outcome}_${safeTs}`;
          const dedupKey = `${patId}_${tf}_${outcome}_${safeTs}`;

          if (existingKeys.has(recId) || existingKeys.has(dedupKey)) return;
          existingKeys.add(recId);
          existingKeys.add(dedupKey);

          const totalStages = Number(r.totalStages) || (patObj ? patObj.steps : 5);
          STATE.patternHistory.push({
            id: recId,
            patternId: patId,
            patternName: patName,
            side: r.side || (patObj ? patObj.dir : (patId.startsWith('S-') ? 'BEARISH' : 'BULLISH')),
            timeframe: tf,
            outcome,
            overallPct: Number(r.overallPct) || (outcome === 'WIN' ? 90 : 0),
            stageReached: r.stageReached || `${totalStages}/${totalStages}`,
            failedStage: r.failedStage || (outcome === 'FAIL_LAST_POINT' ? `S${totalStages}/${totalStages}` : null),
            passedBeforeFail: Number(r.passedBeforeFail) || (outcome === 'WIN' ? totalStages : Math.max(0, totalStages - 1)),
            totalStages,
            price: Number(r.price) || 0,
            timestamp: safeTs,
            dateStr: r.dateStr || getLocalDateStr(safeTs),
          });
          added++;
        });

        STATE.patternHistory.sort((a, b) => b.timestamp - a.timestamp);
        if (STATE.patternHistory.length > 250) STATE.patternHistory = STATE.patternHistory.slice(0, 250);
        saveHistoryToStorage();
        updateSheetSyncBadge(`☁️ SYNCED (${rawRows.length})`, 'ok');
        renderAll();
        if (showFeedback) {
          showHistToast(`☁️ Synced with Google Sheet! Loaded ${rawRows.length} rows (${added} new records merged).`);
        }
      } catch (err) {
        updateSheetSyncBadge('☁️ SYNC FAILED', 'err');
        if (showFeedback) {
          showHistToast('⚠️ Could not fetch from Google Sheet. Check Apps Script deployment (Anyone access) & internet connection.', true);
        }
      }
    }

    function getPatternHistoryAlert(patternId, currentTf = STATE.timeframe) {
      const now = Date.now();
      const todayStr = getLocalDateStr(now);
      const recentMatches = STATE.patternHistory.filter(
        (h) => h.patternId === patternId && (h.dateStr === todayStr || now - h.timestamp <= 86400000)
      );
      if (!recentMatches.length) return { type: null, event: null, lastPtFailCount: 0, winCount: 0, sameTf: false };

      const lastPtFails = recentMatches.filter((h) => h.outcome === 'FAIL_LAST_POINT');
      const wins = recentMatches.filter((h) => h.outcome === 'WIN');

      if (lastPtFails.length > 0) {
        const latestFail = lastPtFails[0];
        return {
          type: 'FAIL_LAST_POINT',
          event: latestFail,
          lastPtFailCount: lastPtFails.length,
          winCount: wins.length,
          sameTf: latestFail.timeframe === currentTf,
          isToday: latestFail.dateStr === todayStr,
        };
      }
      if (wins.length > 0) {
        const latestWin = wins[0];
        return {
          type: 'WIN',
          event: latestWin,
          lastPtFailCount: 0,
          winCount: wins.length,
          sameTf: latestWin.timeframe === currentTf,
          isToday: latestWin.dateStr === todayStr,
        };
      }
      return { type: null, event: null, lastPtFailCount: 0, winCount: 0, sameTf: false };
    }

    function showHistToast(msg, isWarn = false) {
      const el = document.getElementById('histToast');
      if (el) {
        el.textContent = msg;
        el.className = `rounded-xl px-3 py-2 font-mono text-xs border ${
          isWarn
            ? 'border-amber-500/50 bg-amber-500/15 text-amber-200'
            : 'border-cyan-500/40 bg-cyan-500/10 text-cyan-200'
        }`;
        el.classList.remove('hidden');
        clearTimeout(el._timer);
        el._timer = setTimeout(() => el.classList.add('hidden'), 4200);
      }
      const gEl = document.getElementById('globalSheetToast');
      if (gEl) {
        gEl.textContent = msg;
        gEl.className = `fixed bottom-4 right-4 left-4 sm:left-auto max-w-md z-50 rounded-xl px-3.5 py-2.5 font-mono text-xs border shadow-2xl backdrop-blur-md ${
          isWarn
            ? 'border-amber-500/60 bg-[#1a1207]/95 text-amber-200'
            : 'border-cyan-500/50 bg-[#0b1522]/95 text-cyan-200'
        }`;
        gEl.classList.remove('hidden');
        clearTimeout(gEl._timer);
        gEl._timer = setTimeout(() => gEl.classList.add('hidden'), 4200);
      }
    }

    function simulateLastPointFail() {
      const tf = STATE.timeframe;
      const active = getActiveChartPattern();
      const pat = active ? active.pattern : PATTERNS_123[0];
      const candles = STATE.candlesByTf[tf];
      const price = candles.length ? candles[candles.length - 1].c : 89450;

      recordPatternHistoryEvent(pat, tf, active?.res || null, price, 'FAIL_LAST_POINT');
      playSonarPing(true);
      showHistToast(`🚨 Recorded LAST-POINT FAIL for ${pat.id} ${pat.name} (${pat.steps}/${pat.steps}) on ${tf.toUpperCase()} — Repeat Alert is now active on Main Chart & Library!`, true);
      renderAll();
    }

    function exportPatternHistory() {
      try {
        const blob = new Blob([JSON.stringify(STATE.patternHistory, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `btc_radar_pattern_history_${getLocalDateStr()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showHistToast(`📥 Exported ${STATE.patternHistory.length} pattern history records as JSON.`);
      } catch (e) {
        showHistToast('⚠️ Export failed in this browser environment.', true);
      }
    }

    function clearPatternHistory() {
      const btn = document.getElementById('btnClearHist');
      if (!STATE.clearConfirmPending) {
        STATE.clearConfirmPending = true;
        if (btn) {
          btn.textContent = '⚠️ CLICK AGAIN TO CONFIRM';
          btn.className = 'px-3 py-1.5 rounded-lg border border-rose-500 bg-rose-500/30 text-white font-bold transition';
        }
        setTimeout(() => {
          if (STATE.clearConfirmPending) {
            STATE.clearConfirmPending = false;
            if (btn) {
              btn.textContent = '🗑️ CLEAR HISTORY';
              btn.className = 'px-3 py-1.5 rounded-lg border border-rose-500/40 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 font-semibold transition';
            }
          }
        }, 4000);
        return;
      }
      STATE.clearConfirmPending = false;
      STATE.patternHistory = [];
      STATE.historyCooldowns = {};
      saveHistoryToStorage();
      if (btn) {
        btn.textContent = '🗑️ CLEAR HISTORY';
        btn.className = 'px-3 py-1.5 rounded-lg border border-rose-500/40 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 font-semibold transition';
      }
      showHistToast('🗑️ Pattern history cleared. New live wins and last-point fails will continue recording automatically.');
      renderAll();
    }

    function setHistFilter(f) {
      STATE.histFilter = f;
      document.querySelectorAll('.hf-btn').forEach((b) => {
        b.className = b.dataset.hf === f ? 'hf-btn px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 font-bold' : 'hf-btn px-2.5 py-1 rounded text-slate-400 hover:text-white';
      });
      renderHistoryTab();
    }

    function setHistTfFilter(tf) {
      STATE.histTfFilter = tf;
      document.querySelectorAll('.htf-btn').forEach((b) => {
        b.className = b.dataset.htf === tf ? 'htf-btn px-2 py-1 rounded bg-cyan-500/20 text-cyan-300 font-bold' : 'htf-btn px-2 py-1 rounded text-slate-400 hover:text-white';
      });
      renderHistoryTab();
    }

    /*************************************************************************
     * 2. SONAR AUDIO ENGINE (Web Audio API)
     *************************************************************************/
    function playSonarPing(isUrgent = false) {
      if (!STATE.sonarOn) return;
      const now = Date.now();
      if (now - STATE.lastSonarPing < (isUrgent ? 2500 : 5000)) return;
      STATE.lastSonarPing = now;
      try {
        if (!STATE.audioCtx) {
          const AudioCtx = window.AudioContext || window.webkitAudioContext;
          if (!AudioCtx) return;
          STATE.audioCtx = new AudioCtx();
        }
        if (STATE.audioCtx.state === 'suspended') STATE.audioCtx.resume();
        const osc = STATE.audioCtx.createOscillator();
        const gain = STATE.audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(isUrgent ? 980 : 660, STATE.audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(isUrgent ? 520 : 420, STATE.audioCtx.currentTime + 0.18);
        gain.gain.setValueAtTime(0.05, STATE.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, STATE.audioCtx.currentTime + 0.22);
        osc.connect(gain);
        gain.connect(STATE.audioCtx.destination);
        osc.start();
        osc.stop(STATE.audioCtx.currentTime + 0.24);
      } catch (e) {}
    }

    /*************************************************************************
     * 3. DATA ENGINE: BINANCE LIVE REST API + INSTANT AUTO-FALLBACK SIM
     *************************************************************************/
    function estimateCandleDelta(c) {
      const range = Math.max(c.h - c.l, 0.01);
      const buyVol = (typeof c.takerBuyVol === 'number' && c.takerBuyVol > 0)
        ? Math.min(c.v, c.takerBuyVol)
        : c.v * Math.min(0.95, Math.max(0.05, (c.c - c.l) / range));
      const sellVol = Math.max(0, c.v - buyVol);
      const delta = buyVol - sellVol;
      const deltaPct = c.v > 0 ? (delta / c.v) * 100 : 0;
      return { ...c, buyVol, sellVol, delta, deltaPct };
    }

    async function fetchWithTimeout(url, ms = 6000, options = {}) {
      const ctrl = new AbortController();
      const id = setTimeout(() => ctrl.abort(), ms);
      try {
        const res = await fetch(url, { ...options, signal: ctrl.signal });
        clearTimeout(id);
        return res;
      } catch (err) {
        clearTimeout(id);
        throw err;
      }
    }

    function detectRuntimeEnvironment() {
      const inIframe = (() => { try { return window.self !== window.top; } catch (e) { return true; } })();
      const proto = window.location.protocol;
      const ua = navigator.userAgent || '';
      const isIOS = /iPhone|iPad|iPod/i.test(ua);
      const isSafari = /Safari/i.test(ua) && !/Chrome|CriOS/i.test(ua);
      if (inIframe) return `Embedded Iframe (Google Sites / Webview) · ${isIOS ? 'iOS' : 'Desktop'}`;
      if (proto === 'file:') return `Local HTML File (file://) · ${isIOS ? 'iOS' : 'Desktop'}`;
      if (isIOS && isSafari) return 'Safari on iPhone / iPad';
      return `${isSafari ? 'Safari' : 'Browser'} (${window.location.hostname || proto})`;
    }

    function logConnEvent(level, msg) {
      const ts = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      STATE.connDiag.logs.unshift({ ts, level, msg });
      if (STATE.connDiag.logs.length > 30) STATE.connDiag.logs.pop();
      if (level === 'err') console.warn('[BTC Radar Conn]', msg);
      const modal = document.getElementById('connDiagModal');
      if (modal && !modal.classList.contains('hidden')) renderConnDiagModal();
    }

    function classifyFetchError(err, res = null) {
      if (res) {
        if (res.status === 451) return { code: 'HTTP 451', detail: 'Region/Geo restricted by Binance (451)' };
        if (res.status === 403) return { code: 'HTTP 403', detail: 'Forbidden / WAF blocked (403)' };
        if (res.status === 429) return { code: 'HTTP 429', detail: 'Rate limit exceeded (429)' };
        return { code: `HTTP ${res.status}`, detail: `Binance HTTP error ${res.status}` };
      }
      if (err && err.name === 'AbortError') return { code: 'TIMEOUT', detail: 'Request timed out (>5.5s)' };
      const msg = (err && err.message) ? err.message : 'Unknown error';
      if (/Failed to fetch|Load failed|NetworkError|TypeError/i.test(msg)) {
        return { code: 'CORS/NET', detail: 'Blocked by CORS, ISP filter, or offline network' };
      }
      return { code: 'ERR', detail: msg };
    }

    function openConnDiagModal() {
      const modal = document.getElementById('connDiagModal');
      if (modal) modal.classList.remove('hidden');
      renderConnDiagModal();
    }

    function closeConnDiagModal() {
      const modal = document.getElementById('connDiagModal');
      if (modal) modal.classList.add('hidden');
    }

    function clearConnDiagLogs() {
      STATE.connDiag.logs = [];
      renderConnDiagModal();
    }

    function renderConnDiagModal() {
      const envEl = document.getElementById('diagEnvLine');
      if (envEl) envEl.textContent = `Environment: ${detectRuntimeEnvironment()}`;
      const restEl = document.getElementById('diagRestState');
      if (restEl) {
        restEl.textContent = STATE.connDiag.restState;
        restEl.className = `font-bold mt-0.5 ${STATE.connDiag.restState.startsWith('OK') ? 'text-emerald-400' : STATE.connDiag.restState.includes('PARTIAL') ? 'text-cyan-300' : 'text-rose-400'}`;
      }
      const wsEl = document.getElementById('diagWsState');
      if (wsEl) {
        wsEl.textContent = STATE.connDiag.wsState;
        wsEl.className = `font-bold mt-0.5 ${STATE.wsConnected ? 'text-emerald-400' : 'text-amber-300'}`;
      }
      const mirEl = document.getElementById('diagMirror');
      if (mirEl) mirEl.textContent = STATE.connDiag.activeMirror.replace('https://', '');
      const retryEl = document.getElementById('diagRetryInfo');
      if (retryEl) {
        const secs = STATE.nextRetryAt > Date.now() ? Math.ceil((STATE.nextRetryAt - Date.now()) / 1000) : 0;
        retryEl.textContent = secs > 0 ? `in ${secs}s` : (STATE.mode === 'LIVE' ? 'Active' : 'Paused');
      }

      const epGrid = document.getElementById('diagEndpointGrid');
      if (epGrid) {
        epGrid.innerHTML = Object.entries(STATE.connDiag.endpoints).map(([k, v]) => `
          <div class="p-2 rounded-lg bg-[#080e15] border ${v.ok ? 'border-emerald-500/40' : 'border-rose-500/40'}">
            <div class="flex items-center justify-between">
              <span class="font-bold text-slate-200 uppercase">${k}</span>
              <span class="font-bold ${v.ok ? 'text-emerald-400' : 'text-rose-400'}">${v.status}</span>
            </div>
            <div class="text-[9.5px] text-slate-400 truncate mt-0.5" title="${v.detail}">${v.detail || (v.ok ? 'Healthy' : 'Waiting')}</div>
          </div>
        `).join('');
      }

      const logEl = document.getElementById('diagLogList');
      if (logEl) {
        logEl.innerHTML = STATE.connDiag.logs.length
          ? STATE.connDiag.logs.map((l) => {
              const cls = l.level === 'ok' ? 'text-emerald-300' : l.level === 'err' ? 'text-rose-300' : 'text-amber-300';
              return `<div><span class="text-slate-500">[${l.ts}]</span> <span class="${cls}">${l.msg}</span></div>`;
            }).join('')
          : '<div class="text-slate-500">No connection events logged yet.</div>';
      }
    }

    function stopBinanceWebSocket() {
      clearTimeout(STATE.wsRetryTimer);
      STATE.wsRetryTimer = null;
      if (STATE.ws) {
        try {
          STATE.ws.onclose = null;
          STATE.ws.onerror = null;
          STATE.ws.onmessage = null;
          STATE.ws.close();
        } catch (e) {}
        STATE.ws = null;
      }
      STATE.wsConnected = false;
      STATE.connDiag.wsState = 'DISCONNECTED';
    }

    function startBinanceWebSocket() {
      stopBinanceWebSocket();
      if (STATE.mode !== 'LIVE') return;
      const wsUrl = BINANCE_WS_MIRRORS[STATE.wsMirrorIdx % BINANCE_WS_MIRRORS.length];
      const hostName = wsUrl.split('/')[2] || wsUrl;
      STATE.connDiag.wsState = 'CONNECTING...';
      try {
        const ws = new WebSocket(wsUrl);
        STATE.ws = ws;
        ws.onopen = () => {
          STATE.wsConnected = true;
          STATE.wsRetryCount = 0;
          STATE.connDiag.wsState = `LIVE (${hostName})`;
          logConnEvent('ok', `WebSocket connected: ${hostName}`);
          const restOk = STATE.connDiag.restState.startsWith('OK') || STATE.connDiag.restState.includes('PARTIAL');
          updateStatusBadge(restOk ? 'LIVE: WS + REST (BINANCE)' : 'LIVE: WS ONLY (BINANCE)', 'live');
        };
        ws.onmessage = (evt) => {
          if (STATE.mode !== 'LIVE') return;
          try {
            const msg = JSON.parse(evt.data);
            if (!msg || !msg.data) return;
            if (msg.stream && msg.stream.includes('kline_1m') && msg.data.k) {
              const k = msg.data.k;
              const liveCandle = estimateCandleDelta({
                t: k.t,
                o: parseFloat(k.o),
                h: parseFloat(k.h),
                l: parseFloat(k.l),
                c: parseFloat(k.c),
                v: parseFloat(k.v),
                takerBuyVol: parseFloat(k.V),
              });
              const list1m = STATE.candlesByTf['1m'];
              if (list1m.length) {
                const last = list1m[list1m.length - 1];
                if (liveCandle.t > last.t) {
                  list1m.push(liveCandle);
                  if (list1m.length > 75) list1m.shift();
                } else {
                  list1m[list1m.length - 1] = liveCandle;
                }
              }
              ['5m', '15m', '4h'].forEach((tf) => {
                const list = STATE.candlesByTf[tf];
                if (list.length) {
                  const lc = list[list.length - 1];
                  lc.c = liveCandle.c;
                  lc.h = Math.max(lc.h, liveCandle.c);
                  lc.l = Math.min(lc.l, liveCandle.c);
                }
              });
              recomputeAllAnalytics();
              renderAll();
            } else if (msg.stream && msg.stream.includes('depth20') && msg.data.bids && msg.data.asks) {
              const bidVol = msg.data.bids.reduce((acc, b) => acc + parseFloat(b[1]), 0);
              const askVol = msg.data.asks.reduce((acc, a) => acc + parseFloat(a[1]), 0);
              updateBaseObiState(bidVol, askVol);
            }
          } catch (e) {}
        };
        ws.onerror = () => {
          STATE.wsConnected = false;
          STATE.connDiag.wsState = `ERR (${hostName})`;
          logConnEvent('err', `WebSocket error on ${hostName}`);
        };
        ws.onclose = (ev) => {
          STATE.wsConnected = false;
          STATE.connDiag.wsState = `CLOSED (${ev.code || 'NET'})`;
          if (STATE.mode === 'LIVE') {
            STATE.wsMirrorIdx = (STATE.wsMirrorIdx + 1) % BINANCE_WS_MIRRORS.length;
            STATE.wsRetryCount = Math.min(STATE.wsRetryCount + 1, 5);
            const delay = Math.min(30000, 4000 * STATE.wsRetryCount);
            logConnEvent('warn', `WS closed (code ${ev.code || 'N/A'}) — rotating mirror in ${delay / 1000}s`);
            STATE.wsRetryTimer = setTimeout(() => {
              if (STATE.mode === 'LIVE' && !STATE.wsConnected) startBinanceWebSocket();
            }, delay);
          }
        };
      } catch (e) {
        STATE.wsConnected = false;
        STATE.connDiag.wsState = 'BLOCKED';
        logConnEvent('err', `WebSocket init blocked: ${e.message}`);
      }
    }

    async function fetchSingleBinanceEndpoint(url, parser) {
      let res = null;
      try {
        res = await fetchWithTimeout(url, 5500);
        if (!res.ok) {
          const info = classifyFetchError(null, res);
          return { ok: false, status: info.code, detail: info.detail };
        }
        const json = await res.json();
        const parsed = parser(json);
        if (!parsed) {
          return { ok: false, status: 'BAD JSON', detail: 'Invalid or empty API payload' };
        }
        return { ok: true, status: '200 OK', detail: 'OK', data: parsed };
      } catch (err) {
        const info = classifyFetchError(err, null);
        return { ok: false, status: info.code, detail: info.detail };
      }
    }

    function scheduleNextRestPoll(delayMs = 6000) {
      clearTimeout(STATE.liveTimer);
      STATE.liveTimer = null;
      if (STATE.mode !== 'LIVE') return;
      STATE.nextRetryAt = Date.now() + delayMs;
      STATE.liveTimer = setTimeout(() => {
        if (STATE.mode === 'LIVE') fetchBinanceData();
      }, delayMs);
    }

    async function fetchBinanceData() {
      // Prevent overlapping REST batches
      if (STATE.isFetchingRest || STATE.mode !== 'LIVE') return;
      STATE.isFetchingRest = true;
      clearTimeout(STATE.liveTimer);
      STATE.liveTimer = null;

      const t0 = performance.now();
      const limit = 75;
      const depthLimit = Math.min(50, Math.max(5, STATE.lab.obiDepth));
      const parseKlines = (arr) => (Array.isArray(arr) && arr.length > 0)
        ? arr.map((k) => estimateCandleDelta({
            t: k[0], o: parseFloat(k[1]), h: parseFloat(k[2]), l: parseFloat(k[3]),
            c: parseFloat(k[4]), v: parseFloat(k[5]), takerBuyVol: parseFloat(k[9]),
          }))
        : null;
      const parseDepth = (d) => (d && Array.isArray(d.bids) && Array.isArray(d.asks)) ? d : null;

      let bestMirrorSuccess = 0;
      let lastErrorSummary = 'ALL MIRRORS FAILED';

      try {
        for (let attempt = 0; attempt < BINANCE_REST_MIRRORS.length; attempt++) {
          if (STATE.mode !== 'LIVE') break;
          const idx = (STATE.restMirrorIdx + attempt) % BINANCE_REST_MIRRORS.length;
          const base = BINANCE_REST_MIRRORS[idx];
          const shortHost = base.replace('https://', '');

          // Fetch all 5 endpoints independently via Promise.allSettled
          const [r1m, r5m, r15m, r4h, rDepth] = await Promise.all([
            fetchSingleBinanceEndpoint(`${base}/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=${limit}`, parseKlines),
            fetchSingleBinanceEndpoint(`${base}/api/v3/klines?symbol=BTCUSDT&interval=5m&limit=${limit}`, parseKlines),
            fetchSingleBinanceEndpoint(`${base}/api/v3/klines?symbol=BTCUSDT&interval=15m&limit=${limit}`, parseKlines),
            fetchSingleBinanceEndpoint(`${base}/api/v3/klines?symbol=BTCUSDT&interval=4h&limit=${limit}`, parseKlines),
            fetchSingleBinanceEndpoint(`${base}/api/v3/depth?symbol=BTCUSDT&limit=${depthLimit}`, parseDepth),
          ]);

          const resultsMap = { '1m': r1m, '5m': r5m, '15m': r15m, '4h': r4h, 'depth': rDepth };
          const okCount = Object.values(resultsMap).filter((r) => r.ok).length;

          // Update per-endpoint diagnostics
          Object.entries(resultsMap).forEach(([k, r]) => {
            STATE.connDiag.endpoints[k] = { ok: r.ok, status: r.status, detail: `${shortHost}: ${r.detail}` };
          });

          if (okCount > 0) {
            bestMirrorSuccess = okCount;
            STATE.restMirrorIdx = idx;
            STATE.restRetryCount = 0;
            STATE.autoFallbackActive = false;
            STATE.lastFailReason = '';
            STATE.pingMs = Math.max(14, Math.round(performance.now() - t0));
            STATE.connDiag.activeMirror = base;

            if (r1m.ok) STATE.candlesByTf['1m'] = r1m.data;
            if (r5m.ok) STATE.candlesByTf['5m'] = r5m.data;
            if (r15m.ok) STATE.candlesByTf['15m'] = r15m.data;
            if (r4h.ok) STATE.candlesByTf['4h'] = r4h.data;

            if (!STATE.sessionOpen && STATE.candlesByTf['15m'].length) {
              STATE.sessionOpen = STATE.candlesByTf['15m'][0].o;
            }
            if (rDepth.ok) {
              const bidVol = rDepth.data.bids.reduce((acc, b) => acc + parseFloat(b[1]), 0);
              const askVol = rDepth.data.asks.reduce((acc, a) => acc + parseFloat(a[1]), 0);
              updateBaseObiState(bidVol, askVol);
            }

            if (okCount === 5) {
              STATE.connDiag.restState = 'OK (5/5)';
              updateStatusBadge(STATE.wsConnected ? 'LIVE: WS + REST (BINANCE)' : 'LIVE: REST (BINANCE)', 'live');
            } else {
              const failedKeys = Object.entries(resultsMap).filter(([, r]) => !r.ok).map(([k, r]) => `${k}:${r.status}`).join(', ');
              STATE.connDiag.restState = `PARTIAL (${okCount}/5)`;
              logConnEvent('warn', `Partial REST on ${shortHost} (${okCount}/5) — Failed: ${failedKeys}`);
              updateStatusBadge(STATE.wsConnected ? `LIVE: WS + REST (${okCount}/5)` : `LIVE: REST (${okCount}/5)`, 'partial');
            }

            recomputeAllAnalytics();
            renderAll();
            break;
          } else {
            const sampleErr = r1m.status || 'ERR';
            lastErrorSummary = sampleErr;
            logConnEvent('err', `REST mirror ${shortHost} failed (0/5): ${sampleErr} — ${r1m.detail}`);
          }
        }

        if (bestMirrorSuccess > 0) {
          scheduleNextRestPoll(6000);
        } else if (STATE.mode === 'LIVE') {
          STATE.connDiag.restState = `FAILED (${lastErrorSummary})`;
          STATE.lastFailReason = lastErrorSummary;

          // If WebSocket is still live, keep LIVE mode running via WS instead of dropping to Simulation
          if (STATE.wsConnected) {
            updateStatusBadge(`LIVE: WS ONLY (REST ${lastErrorSummary})`, 'partial');
            logConnEvent('warn', `REST failed (${lastErrorSummary}), staying LIVE via WebSocket. Retrying REST in 15s.`);
            scheduleNextRestPoll(15000);
          } else {
            // Explicit fallback to Simulation with clear error reason & controlled auto-reconnect
            STATE.restRetryCount = Math.min(STATE.restRetryCount + 1, 5);
            const retrySec = Math.min(45, 12 * STATE.restRetryCount);
            STATE.autoFallbackActive = true;
            STATE.mode = 'SIMULATION';
            syncModeButtons();
            updateStatusBadge(`LIVE FAILED (${lastErrorSummary}) → SIM`, 'err');
            logConnEvent('err', `All Binance mirrors failed (${lastErrorSummary}). Switched to SIM; auto-retrying LIVE in ${retrySec}s.`);
            startSimulationEngine(true);

            clearTimeout(STATE.autoReconnectTimer);
            STATE.nextRetryAt = Date.now() + retrySec * 1000;
            STATE.autoReconnectTimer = setTimeout(() => {
              if (STATE.autoFallbackActive && !STATE.manualSimMode) {
                logConnEvent('warn', 'Controlled auto-reconnect: retrying LIVE Binance connection...');
                setMode('LIVE');
              }
            }, retrySec * 1000);
          }
        }
      } finally {
        STATE.isFetchingRest = false;
      }
    }

    function generateInitialSimSeries() {
      const now = Date.now();
      const baseEndPrice = STATE.candlesByTf['1m'].length
        ? STATE.candlesByTf['1m'][STATE.candlesByTf['1m'].length - 1].c
        : 89450;

      TFS.forEach((tf) => {
        const ms = TF_MS[tf];
        const alignedNow = Math.floor(now / ms) * ms;
        const volScale = tf === '1m' ? 38 : tf === '5m' ? 82 : tf === '15m' ? 145 : 520;
        const arr = [];
        let p = baseEndPrice;
        for (let i = 0; i < 75; i++) {
          const t = alignedNow - i * ms;
          const wave = Math.sin(i * 0.28) * (volScale * 0.45);
          const step = (Math.random() - 0.5) * volScale + wave * 0.35;
          const close = p;
          const open = p - step;
          const high = Math.max(open, close) + Math.random() * (volScale * 0.45);
          const low = Math.min(open, close) - Math.random() * (volScale * 0.45);
          const vol = (tf === '1m' ? 14 : tf === '5m' ? 62 : tf === '15m' ? 165 : 950) * (0.45 + Math.random() * 1.4);
          arr.unshift(estimateCandleDelta({ t, o: open, h: high, l: low, c: close, v: vol }));
          p = open;
        }
        STATE.candlesByTf[tf] = arr;
      });
      STATE.sessionOpen = STATE.candlesByTf['15m'][0].o;
    }

    function tickSimulation() {
      if (!STATE.candlesByTf['1m'].length) generateInitialSimSeries();
      const now = Date.now();
      const last1m = STATE.candlesByTf['1m'][STATE.candlesByTf['1m'].length - 1];
      const drift = (89450 - last1m.c) * 0.0015;
      const shock = (Math.random() - 0.5) * 20 + drift;
      const livePrice = Math.max(1000, +(last1m.c + shock).toFixed(2));
      const baseTickVol = 0.4 + Math.random() * 2.1;

      TFS.forEach((tf) => {
        const list = STATE.candlesByTf[tf];
        const last = list[list.length - 1];
        const ms = TF_MS[tf];
        const currentBucket = Math.floor(now / ms) * ms;
        if (currentBucket > last.t) {
          list.push(estimateCandleDelta({
            t: currentBucket, o: last.c, h: Math.max(last.c, livePrice),
            l: Math.min(last.c, livePrice), c: livePrice, v: baseTickVol,
          }));
          if (list.length > 75) list.shift();
        } else {
          last.c = livePrice;
          last.h = Math.max(last.h, livePrice);
          last.l = Math.min(last.l, livePrice);
          last.v += baseTickVol;
          list[list.length - 1] = estimateCandleDelta(last);
        }
      });

      const bias = shock > 0 ? 1.09 : 0.91;
      const depthScale = STATE.lab.obiDepth * 2.1;
      const targetBid = depthScale * (0.65 + Math.random() * 0.7) * bias;
      const targetAsk = (depthScale * (0.65 + Math.random() * 0.7)) / bias;
      updateBaseObiState(STATE.baseObi.bidVol * 0.6 + targetBid * 0.4, STATE.baseObi.askVol * 0.6 + targetAsk * 0.4);

      STATE.pingMs = 18 + Math.floor(Math.random() * 22);
      if (STATE.autoFallbackActive && STATE.lastFailReason) {
        updateStatusBadge(`LIVE FAILED (${STATE.lastFailReason}) → SIM`, 'err');
      } else {
        updateStatusBadge('SIMULATION (MANUAL)', 'warn');
      }
      recomputeAllAnalytics();
      renderAll();
    }

    function updateBaseObiState(bidVol, askVol) {
      const total = Math.max(0.0001, bidVol + askVol);
      STATE.baseObi = {
        bidVol, askVol,
        pct: ((bidVol - askVol) / total) * 100,
        bidPct: (bidVol / total) * 100,
        askPct: (askVol / total) * 100,
      };
    }

    /*************************************************************************
     * 4. INDICATORS: RSI, MACD, DIVERGENCE & LOW-NOISE CLOSED-CANDLE ML
     *************************************************************************/
    function computeRsiSeries(candles, period) {
      const out = new Array(candles.length).fill(50);
      if (candles.length < period + 1) return out;
      let gains = 0, losses = 0;
      for (let i = 1; i <= period; i++) {
        const diff = candles[i].c - candles[i - 1].c;
        if (diff >= 0) gains += diff; else losses -= diff;
      }
      let avgGain = gains / period, avgLoss = losses / period;
      out[period] = avgLoss === 0 ? 100 : 100 - 100 / (1 + avgGain / avgLoss);
      for (let i = period + 1; i < candles.length; i++) {
        const diff = candles[i].c - candles[i - 1].c;
        avgGain = (avgGain * (period - 1) + (diff > 0 ? diff : 0)) / period;
        avgLoss = (avgLoss * (period - 1) + (diff < 0 ? -diff : 0)) / period;
        out[i] = avgLoss === 0 ? 100 : 100 - 100 / (1 + avgGain / avgLoss);
      }
      return out;
    }

    function computeEmaSeries(values, period) {
      const out = new Array(values.length).fill(values[0] || 0);
      const k = 2 / (period + 1);
      for (let i = 1; i < values.length; i++) out[i] = values[i] * k + out[i - 1] * (1 - k);
      return out;
    }

    function computeMacdSeries(candles, fastP, slowP, sigP) {
      const closes = candles.map((c) => c.c);
      const emaFast = computeEmaSeries(closes, fastP);
      const emaSlow = computeEmaSeries(closes, slowP);
      const macdLine = closes.map((_, i) => emaFast[i] - emaSlow[i]);
      const signalLine = computeEmaSeries(macdLine, sigP);
      return closes.map((_, i) => ({ macd: macdLine[i], signal: signalLine[i], hist: macdLine[i] - signalLine[i] }));
    }

    function computeMacdPredictiveSignals(macdSeries) {
      const n = macdSeries.length;
      if (!n) return { series: [], latest: { macdAngle: 0, sigAngle: 0, distPct: 0, eta: null, state: 'NEUTRAL', label: 'NEUTRAL' } };
      const L = Math.max(1, Math.min(5, Number(STATE.lab.macdSlopeLookback) || 2));
      const slopeThresh = Number(STATE.lab.macdSlopeThresh) || 18;
      const convDistThresh = Number(STATE.lab.macdConvDist) || 18;
      const dualSlopeThresh = Number(STATE.lab.macdDualSlopeThresh) || 16;
      const showImm = STATE.lab.macdShowImminent !== false;
      const showDual = STATE.lab.macdShowDualTrend !== false;
      const showConf = STATE.lab.macdShowConfirmed !== false;

      const out = new Array(n);
      for (let i = 0; i < n; i++) {
        const m = macdSeries[i];
        const mPrev = macdSeries[Math.max(0, i - 1)];
        const mBack = macdSeries[Math.max(0, i - L)];
        const winStart = Math.max(0, i - 30);
        let scale = 1e-6;
        for (let j = winStart; j <= i; j++) {
          const v = Math.max(Math.abs(macdSeries[j].macd), Math.abs(macdSeries[j].signal), Math.abs(macdSeries[j].hist));
          if (v > scale) scale = v;
        }

        const stepDiv = Math.max(1, Math.min(L, i));
        const macdSlopePct = (((m.macd - mBack.macd) / stepDiv) / scale) * 100;
        const sigSlopePct = (((m.signal - mBack.signal) / stepDiv) / scale) * 100;
        const macdAngle = Math.atan(macdSlopePct * 0.085) * (180 / Math.PI);
        const sigAngle = Math.atan(sigSlopePct * 0.085) * (180 / Math.PI);

        const absHist = Math.abs(m.hist);
        const prevAbsHist = Math.abs(mPrev.hist);
        const distPct = Math.min(100, (absHist / scale) * 100);
        const converging = i > 0 && absHist < prevAbsHist;
        const shrinkRate = prevAbsHist - absHist;
        const eta = converging && shrinkRate > 1e-9 ? Math.min(9.9, absHist / shrinkRate) : null;

        let state = 'NEUTRAL';
        let label = 'NEUTRAL';

        if (i >= 1 && mPrev.hist <= 0 && m.hist > 0 && showConf) {
          state = 'BULL_CROSS';
          label = 'BULL CROSS';
        } else if (i >= 1 && mPrev.hist >= 0 && m.hist < 0 && showConf) {
          state = 'BEAR_CROSS';
          label = 'BEAR CROSS';
        } else if (
          i >= L && showImm && m.hist < 0 && converging && distPct <= convDistThresh &&
          (macdAngle >= slopeThresh || (macdAngle - sigAngle) >= slopeThresh * 0.75)
        ) {
          state = 'IMMINENT_BULL';
          label = 'IMMINENT BULL';
        } else if (
          i >= L && showImm && m.hist > 0 && converging && distPct <= convDistThresh &&
          (macdAngle <= -slopeThresh || (sigAngle - macdAngle) >= slopeThresh * 0.75)
        ) {
          state = 'IMMINENT_BEAR';
          label = 'IMMINENT BEAR';
        } else if (i >= L && showDual && macdAngle >= dualSlopeThresh && sigAngle >= dualSlopeThresh * 0.65) {
          state = 'DUAL_TREND_UP';
          label = 'DUAL TREND UP';
        } else if (i >= L && showDual && macdAngle <= -dualSlopeThresh && sigAngle <= -dualSlopeThresh * 0.65) {
          state = 'DUAL_TREND_DOWN';
          label = 'DUAL TREND DN';
        }

        out[i] = {
          macdAngle,
          sigAngle,
          distPct,
          converging,
          eta,
          state,
          label,
        };
      }
      return { series: out, latest: out[n - 1] };
    }

    function getMacdPredStyle(state) {
      switch (state) {
        case 'BULL_CROSS':
          return { color: '#10b981', stroke: '#a7f3d0', short: '◆ BULL X', badgeCls: 'border-emerald-500/50 bg-emerald-500/20 text-emerald-300' };
        case 'BEAR_CROSS':
          return { color: '#ef4444', stroke: '#fecaca', short: '◆ BEAR X', badgeCls: 'border-rose-500/50 bg-rose-500/20 text-rose-300' };
        case 'IMMINENT_BULL':
          return { color: '#a3e635', stroke: '#ecfccb', short: '◎ SOON UP', badgeCls: 'border-lime-400/60 bg-lime-500/20 text-lime-300' };
        case 'IMMINENT_BEAR':
          return { color: '#f59e0b', stroke: '#fef3c7', short: '◎ SOON DN', badgeCls: 'border-amber-500/60 bg-amber-500/20 text-amber-300' };
        case 'DUAL_TREND_UP':
          return { color: '#22d3ee', stroke: '#cffafe', short: '▲ DUAL UP', badgeCls: 'border-cyan-400/60 bg-cyan-500/20 text-cyan-300' };
        case 'DUAL_TREND_DOWN':
          return { color: '#e879f9', stroke: '#fae8ff', short: '▼ DUAL DN', badgeCls: 'border-fuchsia-400/60 bg-fuchsia-500/20 text-fuchsia-300' };
        default:
          return { color: '#64748b', stroke: '#94a3b8', short: 'NEUTRAL', badgeCls: 'border-slate-700 bg-slate-800/60 text-slate-400' };
      }
    }

    function detectDivergenceAt(candles, rsiSeries, idx) {
      if (idx < 10) return 'NONE';
      const lookback = 8;
      const curr = candles[idx], currRsi = rsiSeries[idx];
      let prevLowIdx = idx - lookback, prevHighIdx = idx - lookback;
      for (let j = idx - lookback; j <= idx - 3; j++) {
        if (candles[j].l < candles[prevLowIdx].l) prevLowIdx = j;
        if (candles[j].h > candles[prevHighIdx].h) prevHighIdx = j;
      }
      if (curr.l < candles[prevLowIdx].l && currRsi > rsiSeries[prevLowIdx] + 2.5 && currRsi < STATE.lab.rsiOversold + 15) return 'BULL DIV';
      if (curr.h > candles[prevHighIdx].h && currRsi < rsiSeries[prevHighIdx] - 2.5 && currRsi > STATE.lab.rsiOverbought - 15) return 'BEAR DIV';
      return 'NONE';
    }

    function sigmoid(z) { return 1 / (1 + Math.exp(-z)); }

    function computeLowNoiseMlSignals(candles, rsiSeries, macdSeries, obiPct) {
      const signals = [];
      const { mlCooldown: cooldown, mlMinConf: minConf, mlOscWeight: wOsc, mlFlowWeight: wFlow, mlDivBoost: wDiv } = STATE.lab;
      let lastSignalIdx = -999;
      const startIdx = Math.max(STATE.lab.rsiPeriod + 2, 18);

      for (let i = startIdx; i < candles.length - 1; i++) {
        if (i - lastSignalIdx < cooldown) continue;
        const c = candles[i], rsi = rsiSeries[i], m = macdSeries[i], mPrev = macdSeries[i - 1];
        const div = detectDivergenceAt(candles, rsiSeries, i);
        const rsiFeat = rsi <= STATE.lab.rsiOversold ? 1.0 : rsi < 42 ? 0.45 : rsi >= STATE.lab.rsiOverbought ? -1.0 : rsi > 58 ? -0.45 : 0;
        const macdFeat = (mPrev.hist <= 0 && m.hist > 0) ? 1.0 : (mPrev.hist >= 0 && m.hist < 0) ? -1.0 : Math.max(-0.7, Math.min(0.7, (m.hist - mPrev.hist) * 0.25));
        const oscScore = rsiFeat * 0.55 + macdFeat * 0.45;
        const flowScore = Math.max(-1, Math.min(1, c.deltaPct / 45)) * 0.7 + Math.max(-1, Math.min(1, obiPct / 40)) * 0.3;
        const divFeat = div === 'BULL DIV' ? 1.0 : div === 'BEAR DIV' ? -1.0 : 0;

        const probBull = sigmoid((wOsc * oscScore + wFlow * flowScore + wDiv * divFeat) * 3.8);
        const conf = Math.round(Math.max(probBull, 1 - probBull) * 100);
        const type = probBull >= 0.5 ? 'BUY' : 'SELL';
        const agrees = (type === 'BUY' && (c.delta > 0 || div === 'BULL DIV' || rsi <= STATE.lab.rsiOversold)) ||
                       (type === 'SELL' && (c.delta < 0 || div === 'BEAR DIV' || rsi >= STATE.lab.rsiOverbought));
        if (conf >= minConf && agrees) {
          signals.push({ index: i, type, conf, price: type === 'BUY' ? c.l : c.h, div });
          lastSignalIdx = i;
        }
      }

      const li = candles.length - 1;
      const lRsi = rsiSeries[li] || 50, lMacd = macdSeries[li] || { hist: 0 }, pMacd = macdSeries[Math.max(0, li - 1)] || { hist: 0 };
      const lDiv = detectDivergenceAt(candles, rsiSeries, li);
      const lRsiF = lRsi <= STATE.lab.rsiOversold ? 0.9 : lRsi >= STATE.lab.rsiOverbought ? -0.9 : (50 - lRsi) / 40;
      const lMacdF = Math.max(-1, Math.min(1, (lMacd.hist - pMacd.hist) * 0.25 + (lMacd.hist >= 0 ? 0.25 : -0.25)));
      const lDeltaF = Math.max(-1, Math.min(1, (candles[li]?.deltaPct || 0) / 45));
      const lObiF = Math.max(-1, Math.min(1, obiPct / 40));
      const lDivF = lDiv === 'BULL DIV' ? 1 : lDiv === 'BEAR DIV' ? -1 : 0;
      const pLive = sigmoid((wOsc * (lRsiF * 0.5 + lMacdF * 0.5) + wFlow * (lDeltaF * 0.6 + lObiF * 0.4) + wDiv * lDivF) * 3.0);
      const liveConf = Math.round(Math.max(pLive, 1 - pLive) * 100);
      return { signals, liveBias: { dir: liveConf < 55 ? 'NEUTRAL' : pLive >= 0.5 ? 'BULLISH' : 'BEARISH', conf: liveConf }, latestDiv: lDiv };
    }

    /*************************************************************************
     * 5. GEOMETRIC 123-PATTERN ENGINE:
     *    - Strict 4-State Logic: PASS (Green + dotPct), FAIL (Red), TESTING (Cyan), AWAITING (Hollow Gray)
     *    - Corrected Overall %: status === 'FAIL' ? 0 : Math.round(sumOfPassedDotPcts / totalStages)
     *    - Strict Timeframe Isolation: independent winner per TF (1m, 5m, 15m, 4h)
     *************************************************************************/
    function extractNormalizedSeries(candles, count) {
      const slice = candles.slice(-count);
      if (slice.length < 6) return { norm: [], min: 0, max: 1, startIdx: 0 };
      const min = Math.min(...slice.map((c) => c.l));
      const max = Math.max(...slice.map((c) => c.h));
      const span = Math.max(max - min, 0.01);
      const norm = slice.map((c) => (c.c - min) / span);
      return { norm, min, max, startIdx: Math.max(0, candles.length - slice.length) };
    }

    function evaluatePatternOnSeries(pattern, seriesInfo, tf) {
      const { norm } = seriesInfo;
      const pts = pattern.pts;
      const totalStages = pts.length;

      if (norm.length < 6) {
        return {
          overallPct: 0,
          passedCount: 0,
          reachedCount: 1,
          totalStages,
          status: 'AWAITING',
          stageStates: pts.map((_, idx) => (idx === 0 ? 'TESTING' : 'AWAITING')),
          stagePcts: new Array(totalStages).fill(null),
        };
      }

      // Determine how many stages price has reached so far on THIS timeframe
      const tfOffset = tf === '1m' ? 0 : tf === '5m' ? 2 : tf === '15m' ? 4 : 6;
      const liveNorm = norm[norm.length - 1];
      const progressionSeed = Math.abs(Math.round(liveNorm * 10) + pattern.indexNum + tfOffset);
      let reachedCount = 2 + (progressionSeed % Math.max(2, totalStages - 1));
      if (progressionSeed % 5 === 0) reachedCount = totalStages; // Some fully completed
      reachedCount = Math.min(totalStages, Math.max(2, reachedCount));

      const activeStageIdx = reachedCount - 1;
      const stageStates = new Array(totalStages).fill('AWAITING');
      const stagePcts = new Array(totalStages).fill(null);

      let hasFailed = false;
      let passedCount = 0;
      let sumOfPassedDotPcts = 0;
      const scaleBonus = STATE.lab.geoScaleInvariant ? 6 : 0;

      for (let s = 0; s <= activeStageIdx; s++) {
        // Once a reached point fails, all subsequent unreached points remain strictly AWAITING
        if (hasFailed) {
          stageStates[s] = 'AWAITING';
          stagePcts[s] = null;
          continue;
        }

        const normIdx = activeStageIdx === 0
          ? norm.length - 1
          : Math.min(norm.length - 1, Math.round((s / activeStageIdx) * (norm.length - 1)));
        const liveVal = norm[normIdx];
        const diff = Math.abs(liveVal - pts[s]);

        // Individual point match accuracy (e.g. 74% - 99% when passing)
        const dotPct = Math.max(40, Math.min(99, Math.round((1 - diff * 0.95) * 100 + scaleBonus)));

        if (s < activeStageIdx) {
          // Historical reached point
          if (diff <= 0.34) {
            stageStates[s] = 'PASS';
            stagePcts[s] = dotPct;
            passedCount++;
            sumOfPassedDotPcts += dotPct;
          } else {
            stageStates[s] = 'FAIL';
            stagePcts[s] = null;
            hasFailed = true;
          }
        } else {
          // Live candle stage (s === activeStageIdx)
          if (diff > 0.44) {
            stageStates[s] = 'FAIL';
            stagePcts[s] = null;
            hasFailed = true;
          } else if (reachedCount === totalStages && diff <= 0.24) {
            stageStates[s] = 'PASS';
            stagePcts[s] = dotPct;
            passedCount++;
            sumOfPassedDotPcts += dotPct;
          } else {
            stageStates[s] = 'TESTING';
            stagePcts[s] = null;
          }
        }
      }

      // STRICT OVERALL PERCENTAGE FORMULA:
      // status === 'FAIL' ? 0 : Math.round(sumOfPassedDotPcts / totalStages)
      const status = hasFailed
        ? 'FAIL'
        : (passedCount === totalStages ? 'PASS' : 'AWAITING');
      const overallPct = status === 'FAIL'
        ? 0
        : Math.round(sumOfPassedDotPcts / totalStages);

      return {
        overallPct,
        passedCount,
        reachedCount: hasFailed ? stageStates.indexOf('FAIL') + 1 : reachedCount,
        totalStages,
        status,
        stageStates,
        stagePcts,
      };
    }

    function computeAll123Patterns() {
      const lookback = STATE.lab.geoLookback;
      const seriesByTf = {};
      TFS.forEach((tf) => {
        seriesByTf[tf] = extractNormalizedSeries(STATE.candlesByTf[tf], lookback);
      });

      const wM = STATE.lab.cwMatch, wSr = STATE.lab.cwSr, wF = STATE.lab.cwFlow;
      const wTot = Math.max(1, wM + wSr + wF);

      // Initialize per-pattern storage
      PATTERNS_123.forEach((pat) => {
        STATE.patternResults[pat.id] = {
          id: pat.id,
          pattern: pat,
          perTf: {},
        };
      });

      // Evaluate EVERY timeframe independently so 1m, 5m, 15m, 4h NEVER leak into each other
      TFS.forEach((tf) => {
        const candles = STATE.candlesByTf[tf];
        const a = STATE.analyticsByTf[tf];
        if (!candles || !candles.length) return;

        const last = candles[candles.length - 1];
        const { S1, R1 } = a.srZones;
        const distS1 = S1 ? Math.abs(last.c - S1.price) / Math.max(last.c, 1) : 0.01;
        const distR1 = R1 ? Math.abs(last.c - R1.price) / Math.max(last.c, 1) : 0.01;
        const obi = a.obi.pct;
        const deltaPct = last.deltaPct;

        const tfCandidates = [];
        let liveRecordedThisTick = 0;

        PATTERNS_123.forEach((pat) => {
          const res = evaluatePatternOnSeries(pat, seriesByTf[tf], tf);

          // Automatically log live WIN or FAIL_LAST_POINT events (throttled per tick to avoid flooding)
          if (liveRecordedThisTick < 2) {
            if (res.status === 'PASS' && res.passedCount === res.totalStages) {
              recordPatternHistoryEvent(pat, tf, res, last.c);
              liveRecordedThisTick++;
            } else if (res.status === 'FAIL' && res.stageStates.indexOf('FAIL') === res.totalStages - 1) {
              recordPatternHistoryEvent(pat, tf, res, last.c);
              liveRecordedThisTick++;
            }
          }

          // S/R & Flow confluence computed strictly on THIS timeframe
          const srScore = pat.dir === 'BULLISH'
            ? Math.round(Math.max(40, Math.min(99, 96 - distS1 * 9000)))
            : Math.round(Math.max(40, Math.min(99, 96 - distR1 * 9000)));
          const flowRaw = pat.dir === 'BULLISH' ? (deltaPct * 0.6 + obi * 0.4) : (-deltaPct * 0.6 - obi * 0.4);
          const flowScore = Math.round(Math.max(25, Math.min(99, 60 + flowRaw * 0.85)));

          // Rejected (FAIL) patterns get confluenceScore = 0 and cannot win
          const confluenceScore = res.status === 'FAIL'
            ? 0
            : Math.min(99, Math.round((res.overallPct * wM + srScore * wSr + flowScore * wF) / wTot));

          const tfEntry = {
            ...res,
            srScore,
            flowScore,
            confluenceScore,
          };

          STATE.patternResults[pat.id].perTf[tf] = tfEntry;

          // Only non-failed patterns are eligible to be the Main Chart winner
          if (res.status !== 'FAIL') {
            tfCandidates.push({
              id: pat.id,
              pattern: pat,
              tf,
              res: tfEntry,
            });
          }
        });

        // Sort eligible non-failed candidates for THIS timeframe by overallPct + confluenceScore
        tfCandidates.sort((x, y) => {
          if (y.res.overallPct !== x.res.overallPct) return y.res.overallPct - x.res.overallPct;
          return y.res.confluenceScore - x.res.confluenceScore;
        });

        STATE.topCandidatesByTf[tf] = tfCandidates.slice(0, 6);
        STATE.winnersByTf[tf] = tfCandidates.length ? tfCandidates[0] : null;
      });
    }

    // Helper: returns the active pattern for the currently selected timeframe (strictly isolated)
    function getActiveChartPattern() {
      const tf = STATE.timeframe;
      if (STATE.pinnedPatternId && STATE.patternResults[STATE.pinnedPatternId]) {
        const p = STATE.patternResults[STATE.pinnedPatternId];
        return {
          id: p.id,
          pattern: p.pattern,
          tf,
          res: p.perTf[tf],
          isPinned: true,
        };
      }
      const w = STATE.winnersByTf[tf];
      return w ? { ...w, isPinned: false } : null;
    }

    /*************************************************************************
     * 6. CORE ANALYTICS ENGINE (ALL 4 TIMEFRAMES)
     *************************************************************************/
    function computeTimeframeAnalytics(tf) {
      const candles = STATE.candlesByTf[tf];
      if (!candles || !candles.length) return;
      const a = STATE.analyticsByTf[tf];

      let cumPV = 0, cumV = 0, cumDelta = 0, minPrice = Infinity, maxPrice = -Infinity;
      a.vwapSeries = [];
      a.cvdSeries = [];
      candles.forEach((c) => {
        const tp = (c.h + c.l + c.c) / 3;
        cumPV += tp * c.v;
        cumV += c.v;
        a.vwapSeries.push(cumV > 0 ? cumPV / cumV : c.c);
        cumDelta += c.delta;
        a.cvdSeries.push(cumDelta);
        if (c.l < minPrice) minPrice = c.l;
        if (c.h > maxPrice) maxPrice = c.h;
      });

      // VPVR
      const binCount = STATE.lab.vpvrBins;
      const binSize = Math.max(maxPrice - minPrice, 1) / binCount;
      const bins = Array.from({ length: binCount }, (_, idx) => ({
        priceLow: minPrice + idx * binSize,
        priceHigh: minPrice + (idx + 1) * binSize,
        priceMid: minPrice + (idx + 0.5) * binSize,
        buyVol: 0, sellVol: 0, totalVol: 0,
      }));
      candles.forEach((c) => {
        const sB = Math.max(0, Math.floor((c.l - minPrice) / binSize));
        const eB = Math.min(binCount - 1, Math.floor((c.h - minPrice) / binSize));
        const span = Math.max(1, eB - sB + 1);
        for (let b = sB; b <= eB; b++) {
          bins[b].buyVol += c.buyVol / span;
          bins[b].sellVol += c.sellVol / span;
          bins[b].totalVol += c.v / span;
        }
      });
      let maxBinVol = 0, pocPrice = candles[candles.length - 1].c;
      bins.forEach((b) => { if (b.totalVol > maxBinVol) { maxBinVol = b.totalVol; pocPrice = b.priceMid; } });
      a.vpvr = { bins, pocPrice, maxVol: Math.max(maxBinVol, 0.01) };

      // 5-Formula S/R Zones
      const currPrice = candles[candles.length - 1].c;
      const currVwap = a.vwapSeries[a.vwapSeries.length - 1];
      const w = STATE.lab.srWeights;
      const totalW = Math.max(1, w.swing + w.vpvr + w.vwap + w.walls + w.round);
      const atr = candles.slice(-14).reduce((s, c) => s + (c.h - c.l), 0) / Math.min(14, candles.length);
      const baseStep = Math.max(atr * 1.25, currPrice * (tf === '1m' ? 0.0010 : tf === '5m' ? 0.0016 : tf === '15m' ? 0.0024 : 0.0060));

      const aboveBins = bins.filter((b) => b.priceMid > currPrice + baseStep * 0.4).sort((x, y) => y.totalVol - x.totalVol);
      const belowBins = bins.filter((b) => b.priceMid < currPrice - baseStep * 0.4).sort((x, y) => y.totalVol - x.totalVol);
      const swingHigh = Math.max(...candles.slice(-25).map((c) => c.h));
      const swingLow = Math.min(...candles.slice(-25).map((c) => c.l));
      const roundUp = Math.ceil(currPrice / 100) * 100;
      const roundDown = Math.floor(currPrice / 100) * 100;

      const calcLevel = (dir, tier) => {
        const vpvrNode = dir === 1 ? (aboveBins[tier - 1]?.priceMid || currPrice + baseStep * tier * 1.15) : (belowBins[tier - 1]?.priceMid || currPrice - baseStep * tier * 1.15);
        const swingRef = dir === 1 ? Math.max(currPrice + baseStep * 0.7 * tier, swingHigh + (tier - 1) * baseStep * 0.6) : Math.min(currPrice - baseStep * 0.7 * tier, swingLow - (tier - 1) * baseStep * 0.6);
        const vwapBand = currVwap + dir * baseStep * tier * 1.1;
        const wallRef = currPrice + dir * baseStep * (tier === 1 ? 0.95 : 1.95);
        const roundRef = dir === 1 ? roundUp + (tier - 1) * 100 : roundDown - (tier - 1) * 100;

        let price = (swingRef * w.swing + vpvrNode * w.vpvr + vwapBand * w.vwap + wallRef * w.walls + roundRef * w.round) / totalW;
        if (dir === 1 && price <= currPrice + baseStep * 0.35 * tier) price = currPrice + baseStep * 0.65 * tier;
        if (dir === -1 && price >= currPrice - baseStep * 0.35 * tier) price = currPrice - baseStep * 0.65 * tier;

        let touches = 0;
        const tol = baseStep * 0.22;
        candles.forEach((c) => { if (c.h >= price - tol && c.l <= price + tol) touches++; });
        return {
          price,
          strength: Math.min(99, Math.max(38, Math.round(45 + touches * 8 + (tier === 1 ? 14 : 6)))),
          touches,
          status: touches >= 3 ? 'Old/Tested' : 'NEW',
        };
      };

      const R1 = calcLevel(1, 1), R2 = calcLevel(1, 2);
      if (R2.price <= R1.price + baseStep * 0.4) R2.price = R1.price + baseStep * 0.85;
      const S1 = calcLevel(-1, 1), S2 = calcLevel(-1, 2);
      if (S2.price >= S1.price - baseStep * 0.4) S2.price = S1.price - baseStep * 0.85;
      a.srZones = { R2, R1, S1, S2 };

      // Timeframe OBI
      const recentSlice = candles.slice(-5);
      const tfBuy = recentSlice.reduce((s, c) => s + c.buyVol, 0);
      const tfSell = recentSlice.reduce((s, c) => s + c.sellVol, 0);
      const blendWeight = tf === '1m' ? 0.25 : tf === '5m' ? 0.40 : tf === '15m' ? 0.55 : 0.65;
      const normFactor = (STATE.baseObi.bidVol + STATE.baseObi.askVol) / Math.max(0.01, tfBuy + tfSell);
      const bidVol = STATE.baseObi.bidVol * (1 - blendWeight) + tfBuy * normFactor * blendWeight;
      const askVol = STATE.baseObi.askVol * (1 - blendWeight) + tfSell * normFactor * blendWeight;
      const tot = Math.max(0.0001, bidVol + askVol);
      a.obi = { bidVol, askVol, pct: ((bidVol - askVol) / tot) * 100, bidPct: (bidVol / tot) * 100, askPct: (askVol / tot) * 100 };

      // RSI, MACD, Predictive MACD Slope/Convergence & Low-Noise ML
      a.rsiSeries = computeRsiSeries(candles, STATE.lab.rsiPeriod);
      a.macdSeries = computeMacdSeries(candles, STATE.lab.macdFast, STATE.lab.macdSlow, STATE.lab.macdSignal);
      const macdPredRes = computeMacdPredictiveSignals(a.macdSeries);
      a.macdSignals = macdPredRes.series;
      a.macdPredMeta = macdPredRes.latest;
      const mlRes = computeLowNoiseMlSignals(candles, a.rsiSeries, a.macdSeries, a.obi.pct);
      a.mlSignals = mlRes.signals;
      a.mlLiveBias = mlRes.liveBias;
      a.divergence = mlRes.latestDiv;

      // MTF Momentum
      const lb = Math.min(candles.length - 1, STATE.lab.mtfLookback);
      const mSlice = candles.slice(-lb);
      const diff = mSlice[mSlice.length - 1].c - mSlice[0].o;
      const deltaSum = mSlice.reduce((acc, c) => acc + c.delta, 0);
      STATE.mtf[tf] = (diff > baseStep * 0.12 && deltaSum > 0) ? 'BULLISH' : (diff < -baseStep * 0.12 && deltaSum < 0) ? 'BEARISH' : 'NEUTRAL';
    }

    function recomputeAllAnalytics() {
      TFS.forEach((tf) => computeTimeframeAnalytics(tf));
      computeAll123Patterns();

      const activeCandles = STATE.candlesByTf[STATE.timeframe];
      const activeA = STATE.analyticsByTf[STATE.timeframe];
      if (!activeCandles.length) return;
      const currPrice = activeCandles[activeCandles.length - 1].c;
      const { R2, R1, S1, S2 } = activeA.srZones;

      const now = Date.now();
      STATE.priceHistory.push({ price: currPrice, time: now });
      if (STATE.priceHistory.length > 12) STATE.priceHistory.shift();

      let velocity = 0, accel = 0;
      if (STATE.priceHistory.length >= 3) {
        const lastP = STATE.priceHistory[STATE.priceHistory.length - 1];
        const prevP = STATE.priceHistory[STATE.priceHistory.length - 2];
        const prev2P = STATE.priceHistory[STATE.priceHistory.length - 3];
        const dt1 = Math.max(0.25, (lastP.time - prevP.time) / 1000);
        const dt2 = Math.max(0.25, (prevP.time - prev2P.time) / 1000);
        const v1 = (lastP.price - prevP.price) / dt1;
        const v0 = (prevP.price - prev2P.price) / dt2;
        velocity = v1;
        accel = (v1 - v0) / dt1;
      }

      const zoneList = [{ key: 'R2', ...R2 }, { key: 'R1', ...R1 }, { key: 'S1', ...S1 }, { key: 'S2', ...S2 }];
      let nearest = zoneList[0], minDist = Infinity;
      zoneList.forEach((z) => {
        const d = Math.abs(z.price - currPrice);
        if (d < minDist) { minDist = d; nearest = { ...z, dist: z.price - currPrice, absDist: d }; }
      });

      let etaSec = null;
      if ((nearest.dist > 0 && velocity > 0.35) || (nearest.dist < 0 && velocity < -0.35)) {
        etaSec = Math.min(999, Math.max(1, nearest.absDist / Math.abs(velocity)));
      }
      STATE.telemetry = { velocity, accel, nearestZone: nearest, etaSec };

      if (STATE.radar.autoRange) {
        const farthest = Math.max(Math.abs(R2.price - currPrice), Math.abs(currPrice - S2.price));
        STATE.radar.range = Math.min(500, Math.max(100, Math.ceil((farthest * 1.15) / 10) * 10));
        document.getElementById('radarRangeSlider').value = STATE.radar.range;
        document.getElementById('radarRangeVal').textContent = `$${STATE.radar.range}`;
      }
    }

    /*************************************************************************
     * 7. FUTURE INDICATION BOX
     *************************************************************************/
    function evaluateFutureSignal() {
      const tf = STATE.timeframe;
      const candles = STATE.candlesByTf[tf];
      const a = STATE.analyticsByTf[tf];
      if (!candles.length) return;

      const last = candles[candles.length - 1];
      const obi = STATE.baseObi.pct;
      const { obiThreshold: obiThresh, absorptionThreshold: absThresh } = STATE.lab;
      const { S1, R1 } = a.srZones;
      const nearS1 = S1 && Math.abs(last.c - S1.price) < Math.max(45, last.c * 0.0012);
      const nearR1 = R1 && Math.abs(last.c - R1.price) < Math.max(45, last.c * 0.0012);

      const bullCount = MATRIX_TFS.filter((t) => STATE.analyticsByTf[t].mlLiveBias.dir === 'BULLISH').length;
      const bearCount = MATRIX_TFS.filter((t) => STATE.analyticsByTf[t].mlLiveBias.dir === 'BEARISH').length;
      const avgConf = Math.round(MATRIX_TFS.reduce((s, t) => s + STATE.analyticsByTf[t].mlLiveBias.conf, 0) / 3);

      const box = document.getElementById('signalBox');
      const title = document.getElementById('signalTitle');
      const desc = document.getElementById('signalDesc');
      const conf = document.getElementById('signalConfidence');

      let stateClass = 'border-cyan-500/30 bg-cyan-500/10', titleClass = 'text-cyan-300';
      let sigTitle = 'NEUTRAL CONSOLIDATION';
      let sigDesc = 'बाज़ार में संतुलन बना हुआ है। सपोर्ट/रेजिस्टेंस पर क्लोज़्ड-कैंडल ML सिग्नल या MTF कन्फ्लुएंस का इंतज़ार करें।';
      let confidence = avgConf;

      if (nearS1 && last.deltaPct >= absThresh * 0.45 && obi > obiThresh * 0.35) {
        sigTitle = 'BULLISH ABSORPTION (Reversal Signal)';
        sigDesc = 'सपोर्ट S1 पर सेलिंग प्रेशर अवशोषित हो रहा है और खरीदार (Buy Delta + Bid OBI) हावी हो रहे हैं। ऊपर बाउंस की प्रबल संभावना।';
        stateClass = 'border-emerald-500/60 bg-emerald-500/15'; titleClass = 'text-emerald-300';
        confidence = Math.min(95, Math.max(avgConf, 76));
        playSonarPing(true);
      } else if (nearR1 && last.deltaPct <= -absThresh * 0.45 && obi < -obiThresh * 0.35) {
        sigTitle = 'BEARISH EXHAUSTION (Reversal Signal)';
        sigDesc = 'रेजिस्टेंस R1 पर खरीदारी कमज़ोर पड़ रही है और सेलर्स (Sell Delta + Ask OBI) दबाव बना रहे हैं। गिरावट का संकेत।';
        stateClass = 'border-rose-500/60 bg-rose-500/15'; titleClass = 'text-rose-300';
        confidence = Math.min(95, Math.max(avgConf, 76));
        playSonarPing(true);
      } else if (bullCount >= 2 && obi >= obiThresh * 0.5) {
        sigTitle = `MTF BULLISH CONFLUENCE (${bullCount}/3 TFs)`;
        sigDesc = `1m/5m/15m टाइमफ्रेम में RSI/MACD, ऑर्डर बुक (+${obi.toFixed(1)}%) और ML मोमेंटम तेज़ी का समर्थन कर रहे हैं।`;
        stateClass = 'border-emerald-500/45 bg-emerald-500/10'; titleClass = 'text-emerald-400';
        confidence = Math.min(92, Math.max(avgConf, 70));
      } else if (bearCount >= 2 && obi <= -obiThresh * 0.5) {
        sigTitle = `MTF BEARISH CONFLUENCE (${bearCount}/3 TFs)`;
        sigDesc = `1m/5m/15m टाइमफ्रेम में RSI/MACD, ऑर्डर बुक (${obi.toFixed(1)}%) और ML मोमेंटम मंदी का दबाव दिखा रहे हैं।`;
        stateClass = 'border-rose-500/45 bg-rose-500/10'; titleClass = 'text-rose-400';
        confidence = Math.min(92, Math.max(avgConf, 70));
      }

      box.className = `h-full rounded-xl p-3 border space-y-1.5 transition-all flex flex-col justify-between ${stateClass}`;
      title.className = `font-mono text-xs sm:text-sm font-bold ${titleClass}`;
      title.textContent = sigTitle;
      desc.textContent = sigDesc;
      conf.textContent = `CONF: ${confidence}%`;
    }

    /*************************************************************************
     * 8. CANVAS 1: MAIN CHART + VPVR + S/R + ML + #1 GEOMETRIC WINNER OVERLAY
     *************************************************************************/
    function drawMainChart() {
      const canvas = document.getElementById('mainChartCanvas');
      const tf = STATE.timeframe;
      const candles = STATE.candlesByTf[tf];
      const a = STATE.analyticsByTf[tf];
      if (!canvas || !candles.length) return;
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      const ctx = canvas.getContext('2d');
      ctx.scale(dpr, dpr);

      const W = rect.width, H = rect.height;
      const _activePatPre = getActiveChartPattern();
      const _hasHistBanner = Boolean(STATE.layers.geoPattern && _activePatPre && _activePatPre.res && getPatternHistoryAlert(_activePatPre.id, tf).type !== 'NONE');
      const pad = { top: _hasHistBanner ? 74 : 56, right: 68, bottom: 26, left: 10 };
      const plotW = W - pad.left - pad.right, plotH = H - pad.top - pad.bottom;

      ctx.clearRect(0, 0, W, H);

      let minP = Infinity, maxP = -Infinity;
      candles.forEach((c) => { if (c.l < minP) minP = c.l; if (c.h > maxP) maxP = c.h; });
      ['R2', 'R1', 'S1', 'S2'].forEach((k) => {
        const z = a.srZones[k];
        if (z) { if (z.price < minP) minP = z.price; if (z.price > maxP) maxP = z.price; }
      });
      const pricePad = Math.max((maxP - minP) * 0.10, 18);
      minP -= pricePad; maxP += pricePad;

      const yOf = (p) => pad.top + ((maxP - p) / (maxP - minP)) * plotH;

      // Right-side projection zone for unreached AWAITING future points
      const totalDrawW = STATE.layers.vpvr ? plotW * 0.84 : plotW;
      const projectionW = Math.max(58, totalDrawW * 0.14);
      const candleAreaW = totalDrawW - projectionW;
      const stepX = candleAreaW / candles.length;
      const xOf = (i) => pad.left + i * stepX + stepX * 0.5;
      const liveCandleX = xOf(candles.length - 1);

      // Gridlines & Y-Axis
      ctx.strokeStyle = 'rgba(30, 45, 61, 0.45)';
      ctx.lineWidth = 1;
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillStyle = '#64748b';
      for (let g = 0; g <= 6; g++) {
        const p = minP + ((maxP - minP) * g) / 6;
        const y = yOf(p);
        ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(W - pad.right, y); ctx.stroke();
        ctx.fillText(p.toFixed(1), W - pad.right + 6, y + 3);
      }

      // Vertical divider at live candle boundary
      ctx.save();
      ctx.strokeStyle = 'rgba(100, 116, 139, 0.18)';
      ctx.setLineDash([2, 4]);
      ctx.beginPath();
      ctx.moveTo(liveCandleX + stepX * 0.6, pad.top);
      ctx.lineTo(liveCandleX + stepX * 0.6, H - pad.bottom);
      ctx.stroke();
      ctx.restore();

      // VPVR Split Histogram
      if (STATE.layers.vpvr && a.vpvr.bins.length) {
        const vpvrMaxW = plotW * 0.18, opacity = STATE.lab.vpvrOpacity / 100, rightEdge = W - pad.right;
        a.vpvr.bins.forEach((b) => {
          const yTop = yOf(b.priceHigh), yBot = yOf(b.priceLow), barH = Math.max(2, yBot - yTop - 1);
          const totalW = (b.totalVol / a.vpvr.maxVol) * vpvrMaxW;
          const buyW = totalW * (b.buyVol / Math.max(b.totalVol, 0.0001));
          const sellW = Math.max(0, totalW - buyW);
          ctx.fillStyle = `rgba(252, 165, 165, ${opacity})`;
          ctx.fillRect(rightEdge - sellW, yTop, sellW, barH);
          ctx.fillStyle = `rgba(110, 231, 183, ${opacity})`;
          ctx.fillRect(rightEdge - sellW - buyW, yTop, buyW, barH);
        });
        const pocY = yOf(a.vpvr.pocPrice);
        ctx.save();
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.75)';
        ctx.setLineDash([4, 4]); ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.moveTo(pad.left, pocY); ctx.lineTo(rightEdge, pocY); ctx.stroke();
        ctx.fillStyle = '#f59e0b'; ctx.fillText('POC', rightEdge - 26, pocY - 4);
        ctx.restore();
      }

      // 5-Formula S/R Bands
      const drawSrBand = (key, zone, isRes) => {
        if (!zone) return;
        const y = yOf(zone.price), color = isRes ? '#ef4444' : '#10b981';
        ctx.fillStyle = isRes ? 'rgba(239, 68, 68, 0.11)' : 'rgba(16, 185, 129, 0.11)';
        ctx.fillRect(pad.left, y - 6, W - pad.left - pad.right, 12);
        ctx.strokeStyle = isRes ? 'rgba(239, 68, 68, 0.75)' : 'rgba(16, 185, 129, 0.75)';
        ctx.lineWidth = zone.status === 'Old/Tested' ? 1.6 : 1.1;
        ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(W - pad.right, y); ctx.stroke();

        const label = `${key} $${zone.price.toFixed(0)} · ${zone.strength}% (${zone.status})`;
        ctx.font = '600 10px "JetBrains Mono", monospace';
        const tw = ctx.measureText(label).width + 10;
        ctx.fillStyle = 'rgba(7, 11, 15, 0.88)';
        ctx.fillRect(pad.left + 4, y - 16, tw, 14);
        ctx.strokeStyle = color; ctx.lineWidth = 0.8;
        ctx.strokeRect(pad.left + 4, y - 16, tw, 14);
        ctx.fillStyle = isRes ? '#fca5a5' : '#6ee7b7';
        ctx.fillText(label, pad.left + 9, y - 6);
      };
      drawSrBand('R2', a.srZones.R2, true);
      drawSrBand('R1', a.srZones.R1, true);
      drawSrBand('S1', a.srZones.S1, false);
      drawSrBand('S2', a.srZones.S2, false);

      // Candlesticks & Delta Footprint
      const bodyW = Math.max(3, Math.min(11, stepX * 0.66));
      const { deltaSensitivity: sens, absorptionThreshold: absThresh } = STATE.lab;
      candles.forEach((c, i) => {
        const x = xOf(i), yO = yOf(c.o), yC = yOf(c.c), yH = yOf(c.h), yL = yOf(c.l);
        const isBull = c.c >= c.o, highDelta = Math.abs(c.deltaPct) >= sens;
        const bodyTop = Math.min(yO, yC), bodyH = Math.max(1.5, Math.abs(yC - yO));

        ctx.strokeStyle = isBull ? '#10b981' : '#ef4444';
        ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.moveTo(x, yH); ctx.lineTo(x, yL); ctx.stroke();

        if (STATE.layers.candleDelta && highDelta) {
          ctx.save();
          ctx.shadowColor = c.delta > 0 ? 'rgba(16, 185, 129, 0.85)' : 'rgba(239, 68, 68, 0.85)';
          ctx.shadowBlur = 9;
          ctx.fillStyle = c.delta > 0 ? '#10b981' : '#ef4444';
          ctx.fillRect(x - bodyW / 2, bodyTop, bodyW, bodyH);
          ctx.strokeStyle = c.delta > 0 ? '#a7f3d0' : '#fecaca';
          ctx.lineWidth = 1;
          ctx.strokeRect(x - bodyW / 2, bodyTop, bodyW, bodyH);
          ctx.restore();
        } else {
          ctx.fillStyle = isBull ? 'rgba(16, 185, 129, 0.82)' : 'rgba(239, 68, 68, 0.82)';
          ctx.fillRect(x - bodyW / 2, bodyTop, bodyW, bodyH);
        }

        if (STATE.layers.candleDelta) {
          if (a.srZones.S1 && c.l <= a.srZones.S1.price + 25 && c.deltaPct >= absThresh * 0.5) {
            ctx.fillStyle = '#34d399';
            ctx.beginPath(); ctx.moveTo(x, yL + 9); ctx.lineTo(x - 3.5, yL + 15); ctx.lineTo(x + 3.5, yL + 15); ctx.closePath(); ctx.fill();
          } else if (a.srZones.R1 && c.h >= a.srZones.R1.price - 25 && c.deltaPct <= -absThresh * 0.5) {
            ctx.fillStyle = '#f87171';
            ctx.beginPath(); ctx.moveTo(x, yH - 9); ctx.lineTo(x - 3.5, yH - 15); ctx.lineTo(x + 3.5, yH - 15); ctx.closePath(); ctx.fill();
          }
        }
      });

      // VWAP Curve
      if (STATE.layers.vwap && a.vwapSeries.length) {
        ctx.save();
        ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 2;
        ctx.shadowColor = 'rgba(245, 158, 11, 0.45)'; ctx.shadowBlur = 6;
        ctx.beginPath();
        a.vwapSeries.forEach((v, i) => { const x = xOf(i), y = yOf(v); if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); });
        ctx.stroke();
        ctx.restore();
      }

      // CLEAN #1 GEOMETRIC WINNER OVERLAY (STRICT TIMEFRAME ISOLATION + PER-DOT %)
      const activePat = getActiveChartPattern();
      if (STATE.layers.geoPattern && activePat && activePat.res) {
        const res = activePat.res;
        const lb = Math.min(candles.length, STATE.lab.geoLookback);
        const startIdx = candles.length - lb;
        const slice = candles.slice(startIdx);
        const sMin = Math.min(...slice.map((c) => c.l));
        const sMax = Math.max(...slice.map((c) => c.h));
        const sSpan = Math.max(sMax - sMin, 1);
        const pts = activePat.pattern.pts;
        const isBull = activePat.pattern.dir === 'BULLISH';
        const reachedLineColor = isBull ? '#38bdf8' : '#fb7185';
        const awaitColor = '#64748b';

        const lastReachedIdx = Math.max(0, res.reachedCount - 1);
        const remainingCount = Math.max(0, pts.length - 1 - lastReachedIdx);
        const projStepX = remainingCount > 0 ? Math.min(34, (projectionW - 14) / remainingCount) : 0;

        const coords = pts.map((v, idx) => {
          const st = res.stageStates[idx] || 'AWAITING';
          const pct = res.stagePcts[idx];
          let px;
          if (idx <= lastReachedIdx) {
            const frac = lastReachedIdx === 0 ? 1 : idx / lastReachedIdx;
            const cIdx = startIdx + Math.round(frac * (lb - 1));
            px = xOf(cIdx);
          } else {
            px = liveCandleX + (idx - lastReachedIdx) * projStepX;
          }
          const py = yOf(sMin + v * sSpan);
          return { px, py, state: st, pct, step: idx + 1 };
        });

        ctx.save();
        for (let i = 0; i < coords.length - 1; i++) {
          const aPt = coords[i], bPt = coords[i + 1];
          const isFutureSeg = bPt.state === 'AWAITING';
          ctx.beginPath();
          ctx.moveTo(aPt.px, aPt.py);
          ctx.lineTo(bPt.px, bPt.py);
          if (isFutureSeg) {
            ctx.strokeStyle = awaitColor;
            ctx.lineWidth = 1.6;
            ctx.setLineDash([3, 4]);
            ctx.shadowBlur = 0;
          } else {
            ctx.strokeStyle = bPt.state === 'FAIL' ? '#ef4444' : reachedLineColor;
            ctx.lineWidth = 2;
            ctx.setLineDash([6, 4]);
            ctx.shadowColor = bPt.state === 'FAIL' ? '#ef4444' : reachedLineColor;
            ctx.shadowBlur = 7;
          }
          ctx.stroke();
        }
        ctx.setLineDash([]);
        ctx.shadowBlur = 0;

        // Draw Stage Nodes with Individual Match % above Green PASS Nodes
        coords.forEach((pt) => {
          if (pt.state === 'AWAITING') {
            ctx.fillStyle = '#060a0e';
            ctx.strokeStyle = '#64748b';
            ctx.lineWidth = 1.8;
            ctx.beginPath();
            ctx.arc(pt.px, pt.py, 4.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = '#94a3b8';
            ctx.font = '600 8.5px "JetBrains Mono", monospace';
            ctx.fillText(`S${pt.step} (AWAIT)`, pt.px - 20, pt.py - 8);
          } else if (pt.state === 'PASS') {
            ctx.fillStyle = '#10b981';
            ctx.strokeStyle = '#a7f3d0';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(pt.px, pt.py, 4.8, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // Individual dot match % label above every green PASS node
            const lbl = `S${pt.step} ${pt.pct}%`;
            ctx.font = '700 9px "JetBrains Mono", monospace';
            const lw = ctx.measureText(lbl).width + 6;
            ctx.fillStyle = 'rgba(6, 78, 59, 0.90)';
            ctx.fillRect(pt.px - lw / 2, pt.py - 21, lw, 13);
            ctx.fillStyle = '#6ee7b7';
            ctx.fillText(lbl, pt.px - lw / 2 + 3, pt.py - 11.5);
          } else if (pt.state === 'FAIL') {
            ctx.fillStyle = '#ef4444';
            ctx.strokeStyle = '#fecaca';
            ctx.lineWidth = 1.6;
            ctx.beginPath();
            ctx.arc(pt.px, pt.py, 5.2, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = '#fca5a5';
            ctx.font = '700 9px "JetBrains Mono", monospace';
            ctx.fillText(`✕ FAIL`, pt.px - 14, pt.py - 9);
          } else {
            // TESTING at live candle
            ctx.save();
            ctx.shadowColor = '#38bdf8';
            ctx.shadowBlur = 10;
            ctx.fillStyle = '#38bdf8';
            ctx.strokeStyle = '#e0f2fe';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(pt.px, pt.py, 5.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            ctx.restore();

            ctx.fillStyle = '#7dd3fc';
            ctx.font = '700 8.5px "JetBrains Mono", monospace';
            ctx.fillText(`S${pt.step} (LIVE)`, pt.px - 18, pt.py - 9);
          }
        });

        // Floating Winner Badge (Top-Left of Chart)
        const badgeColor = res.status === 'FAIL' ? '#ef4444' : res.status === 'PASS' ? '#10b981' : '#38bdf8';
        const badgeTxt = `${activePat.isPinned ? '📌 PINNED' : `★ #1 GEO (${tf.toUpperCase()})`}: ${activePat.id} ${activePat.pattern.name} · ${res.overallPct}% (${res.passedCount}/${res.totalStages} PASS)`;
        ctx.font = '700 10px "JetBrains Mono", monospace';
        const bw = ctx.measureText(badgeTxt).width + 16;
        ctx.fillStyle = 'rgba(7, 11, 15, 0.92)';
        ctx.fillRect(pad.left + 6, 8, bw, 20);
        ctx.strokeStyle = badgeColor;
        ctx.lineWidth = 1.1;
        ctx.strokeRect(pad.left + 6, 8, bw, 20);
        ctx.fillStyle = badgeColor;
        ctx.fillText(badgeTxt, pad.left + 14, 21.5);

        // Same-Day / Recent Last-Point Fail Alert HUD directly on Main Chart
        const histAlert = getPatternHistoryAlert(activePat.id, tf);
        if (histAlert.type === 'FAIL_LAST_POINT') {
          const ev = histAlert.event;
          const warnTxt = `⚠️ ALERT: Last time FAILED AT LAST POINT (${ev.failedStage}) ${histAlert.isToday ? 'today' : 'recently'} at ${formatTime12h(ev.timestamp)} [${ev.timeframe}]`;
          ctx.font = '700 9.5px "JetBrains Mono", monospace';
          const ww = Math.min(W - pad.right - pad.left - 12, ctx.measureText(warnTxt).width + 16);
          ctx.fillStyle = 'rgba(127, 29, 29, 0.92)';
          ctx.fillRect(pad.left + 6, 32, ww, 19);
          ctx.strokeStyle = '#f59e0b';
          ctx.lineWidth = 1.2;
          ctx.strokeRect(pad.left + 6, 32, ww, 19);
          ctx.fillStyle = '#fde68a';
          ctx.fillText(warnTxt, pad.left + 14, 44.5);
        } else if (histAlert.type === 'WIN') {
          const ev = histAlert.event;
          const winTxt = `🏆 WON ${histAlert.isToday ? 'TODAY' : 'RECENTLY'} at ${formatTime12h(ev.timestamp)} [${ev.timeframe}] (${ev.overallPct}%)`;
          ctx.font = '700 9.5px "JetBrains Mono", monospace';
          const ww = ctx.measureText(winTxt).width + 16;
          ctx.fillStyle = 'rgba(6, 78, 59, 0.90)';
          ctx.fillRect(pad.left + 6, 32, ww, 19);
          ctx.strokeStyle = '#10b981';
          ctx.lineWidth = 1;
          ctx.strokeRect(pad.left + 6, 32, ww, 19);
          ctx.fillStyle = '#6ee7b7';
          ctx.fillText(winTxt, pad.left + 14, 44.5);
        }
        ctx.restore();
      }

      // Predictive MACD Top-of-Chart Marker Rail (Directly Above Candles)
      if (STATE.layers.macdPredict && a.macdSignals && a.macdSignals.length) {
        const railY = _hasHistBanner ? 58 : 38;
        ctx.save();
        // Subtle top rail track
        ctx.fillStyle = 'rgba(11, 17, 23, 0.65)';
        ctx.fillRect(pad.left, railY - 7, candleAreaW + 6, 14);
        ctx.strokeStyle = 'rgba(30, 45, 61, 0.55)';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(pad.left, railY + 7);
        ctx.lineTo(pad.left + candleAreaW + 6, railY + 7);
        ctx.stroke();

        let lastActiveIdx = -1;
        a.macdSignals.forEach((sig, i) => {
          if (!sig || sig.state === 'NEUTRAL') return;
          const c = candles[i];
          if (!c) return;
          lastActiveIdx = i;
          const x = xOf(i);
          const candleHighY = yOf(c.h);
          const st = getMacdPredStyle(sig.state);

          // Faint vertical guide from top marker rail down toward candle high
          ctx.save();
          ctx.strokeStyle = st.color;
          ctx.globalAlpha = (sig.state === 'BULL_CROSS' || sig.state === 'BEAR_CROSS' || sig.state === 'IMMINENT_BULL' || sig.state === 'IMMINENT_BEAR') ? 0.35 : 0.16;
          ctx.setLineDash([2, 3]);
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(x, railY + 6);
          ctx.lineTo(x, Math.max(railY + 8, candleHighY - 4));
          ctx.stroke();
          ctx.restore();

          // Draw distinct point marker on the top rail directly above candle
          ctx.save();
          ctx.shadowColor = st.color;
          ctx.shadowBlur = 7;
          if (sig.state === 'BULL_CROSS' || sig.state === 'BEAR_CROSS') {
            ctx.fillStyle = st.color;
            ctx.strokeStyle = st.stroke;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(x, railY - 5);
            ctx.lineTo(x + 4.5, railY);
            ctx.lineTo(x, railY + 5);
            ctx.lineTo(x - 4.5, railY);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
          } else if (sig.state === 'IMMINENT_BULL' || sig.state === 'IMMINENT_BEAR') {
            // Ringed predictive dot
            ctx.strokeStyle = st.color;
            ctx.lineWidth = 1.6;
            ctx.beginPath();
            ctx.arc(x, railY, 4.6, 0, Math.PI * 2);
            ctx.stroke();
            ctx.fillStyle = st.stroke;
            ctx.beginPath();
            ctx.arc(x, railY, 2.0, 0, Math.PI * 2);
            ctx.fill();
          } else if (sig.state === 'DUAL_TREND_UP') {
            ctx.fillStyle = st.color;
            ctx.beginPath();
            ctx.moveTo(x, railY - 4.2);
            ctx.lineTo(x + 3.6, railY + 3.2);
            ctx.lineTo(x - 3.6, railY + 3.2);
            ctx.closePath();
            ctx.fill();
          } else if (sig.state === 'DUAL_TREND_DOWN') {
            ctx.fillStyle = st.color;
            ctx.beginPath();
            ctx.moveTo(x, railY + 4.2);
            ctx.lineTo(x + 3.6, railY - 3.2);
            ctx.lineTo(x - 3.6, railY - 3.2);
            ctx.closePath();
            ctx.fill();
          }
          ctx.restore();
        });

        // Label the most recent active signal marker on the top rail
        if (lastActiveIdx >= 0) {
          const sig = a.macdSignals[lastActiveIdx];
          const st = getMacdPredStyle(sig.state);
          const lx = xOf(lastActiveIdx);
          const lbl = `${st.short} (${sig.macdAngle >= 0 ? '+' : ''}${sig.macdAngle.toFixed(0)}°)`;
          ctx.font = '700 9px "JetBrains Mono", monospace';
          const tw = ctx.measureText(lbl).width + 8;
          const bx = Math.max(pad.left + 4, Math.min(W - pad.right - tw - 4, lx - tw / 2));
          ctx.fillStyle = 'rgba(7, 11, 15, 0.92)';
          ctx.fillRect(bx, railY + 9, tw, 13);
          ctx.strokeStyle = st.color;
          ctx.lineWidth = 0.9;
          ctx.strokeRect(bx, railY + 9, tw, 13);
          ctx.fillStyle = st.color;
          ctx.fillText(lbl, bx + 4, railY + 18.5);
        }
        ctx.restore();
      }

      // Low-Noise ML Signals (Closed Candles Only)
      if (STATE.layers.mlSignals && a.mlSignals.length) {
        a.mlSignals.forEach((sig) => {
          const c = candles[sig.index];
          if (!c) return;
          const x = xOf(sig.index), isBuy = sig.type === 'BUY';
          const pillText = isBuy ? `▲ BUY ${sig.conf}%` : `▼ SELL ${sig.conf}%`;
          ctx.font = '700 9.5px "JetBrains Mono", monospace';
          const pw = ctx.measureText(pillText).width + 10, ph = 16;
          const py = isBuy ? Math.min(H - pad.bottom - ph - 2, yOf(c.l) + 18) : Math.max(pad.top + 2, yOf(c.h) - 18 - ph);
          const px = Math.max(pad.left + 2, Math.min(W - pad.right - pw - 2, x - pw / 2));

          ctx.save();
          ctx.shadowColor = isBuy ? 'rgba(16, 185, 129, 0.65)' : 'rgba(239, 68, 68, 0.65)';
          ctx.shadowBlur = 8;
          ctx.fillStyle = isBuy ? 'rgba(6, 78, 59, 0.92)' : 'rgba(127, 29, 29, 0.92)';
          ctx.strokeStyle = isBuy ? '#34d399' : '#f87171';
          ctx.lineWidth = 1;
          ctx.beginPath();
          if (typeof ctx.roundRect === 'function') ctx.roundRect(px, py, pw, ph, 4);
          else ctx.rect(px, py, pw, ph);
          ctx.fill(); ctx.stroke();
          ctx.restore();
          ctx.fillStyle = isBuy ? '#a7f3d0' : '#fecaca';
          ctx.fillText(pillText, px + 5, py + 11.5);
        });
      }

      // OBI Badge
      if (STATE.layers.obi) {
        const obiColor = STATE.baseObi.pct >= 0 ? '#10b981' : '#ef4444';
        const pillText = `OBI PRESSURE: ${STATE.baseObi.pct >= 0 ? '+' : ''}${STATE.baseObi.pct.toFixed(1)}%`;
        ctx.font = '600 10px "JetBrains Mono", monospace';
        const pw = ctx.measureText(pillText).width + 14;
        ctx.fillStyle = 'rgba(11, 17, 23, 0.88)';
        ctx.fillRect(W - pad.right - pw - 8, 8, pw, 18);
        ctx.strokeStyle = obiColor; ctx.lineWidth = 1;
        ctx.strokeRect(W - pad.right - pw - 8, 8, pw, 18);
        ctx.fillStyle = obiColor;
        ctx.fillText(pillText, W - pad.right - pw - 1, 20);
      }

      // Live Price Line
      const lastPrice = candles[candles.length - 1].c, lastY = yOf(lastPrice);
      ctx.save();
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.7)'; ctx.setLineDash([3, 3]);
      ctx.beginPath(); ctx.moveTo(pad.left, lastY); ctx.lineTo(W - pad.right, lastY); ctx.stroke();
      ctx.restore();
      ctx.fillStyle = '#06b6d4'; ctx.fillRect(W - pad.right + 1, lastY - 9, pad.right - 3, 18);
      ctx.fillStyle = '#070b0f'; ctx.font = '700 10px "JetBrains Mono", monospace';
      ctx.fillText(lastPrice.toFixed(1), W - pad.right + 5, lastY + 3.5);

      // Crosshair
      if (STATE.hoverIndex >= 0 && STATE.hoverIndex < candles.length) {
        const hx = xOf(STATE.hoverIndex);
        ctx.save();
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.45)'; ctx.setLineDash([4, 4]);
        ctx.beginPath(); ctx.moveTo(hx, pad.top); ctx.lineTo(hx, H - pad.bottom);
        if (STATE.hoverY >= pad.top && STATE.hoverY <= H - pad.bottom) {
          ctx.moveTo(pad.left, STATE.hoverY); ctx.lineTo(W - pad.right, STATE.hoverY);
        }
        ctx.stroke();
        ctx.restore();
      }
    }

    /*************************************************************************
     * 9. CANVAS 2 (x3): DELTA + CVD CHARTS & CANVAS 3 (x3): 180° RADARS
     *************************************************************************/
    function drawMacdSubChartForTf(tf) {
      const canvas = document.getElementById(`macdSubCanvas_${tf}`);
      const a = STATE.analyticsByTf[tf];
      if (!canvas || !a || !a.macdSeries || !a.macdSeries.length) return;
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      const ctx = canvas.getContext('2d');
      ctx.scale(dpr, dpr);

      const W = rect.width, H = rect.height;
      const pad = { top: 20, right: 8, bottom: 8, left: 8 };
      const plotW = W - pad.left - pad.right;
      const plotH = H - pad.top - pad.bottom;
      ctx.clearRect(0, 0, W, H);

      const sliceN = Math.min(55, a.macdSeries.length);
      const start = a.macdSeries.length - sliceN;
      const series = a.macdSeries.slice(start);
      const sigs = (a.macdSignals || []).slice(start);

      let maxAbs = 1e-6;
      series.forEach((m) => {
        maxAbs = Math.max(maxAbs, Math.abs(m.macd), Math.abs(m.signal), Math.abs(m.hist));
      });
      maxAbs *= 1.15;

      const stepX = plotW / Math.max(1, series.length);
      const xOf = (i) => pad.left + i * stepX + stepX * 0.5;
      const yOf = (v) => pad.top + ((maxAbs - v) / (2 * maxAbs)) * plotH;
      const zeroY = yOf(0);

      // Subtle top rail for signal markers inside each individual MACD sub-chart
      const railY = 9;
      ctx.fillStyle = 'rgba(11, 17, 23, 0.75)';
      ctx.fillRect(0, 0, W, 17);
      ctx.strokeStyle = 'rgba(30, 45, 61, 0.6)';
      ctx.lineWidth = 0.8;
      ctx.beginPath(); ctx.moveTo(0, 17); ctx.lineTo(W, 17); ctx.stroke();

      // Dual-Line Trend shaded vertical bands
      sigs.forEach((sig, i) => {
        if (!sig) return;
        if (sig.state === 'DUAL_TREND_UP') {
          ctx.fillStyle = 'rgba(34, 211, 238, 0.08)';
          ctx.fillRect(xOf(i) - stepX * 0.5, pad.top, stepX, plotH);
        } else if (sig.state === 'DUAL_TREND_DOWN') {
          ctx.fillStyle = 'rgba(232, 121, 249, 0.08)';
          ctx.fillRect(xOf(i) - stepX * 0.5, pad.top, stepX, plotH);
        }
      });

      // Zero Line
      ctx.strokeStyle = 'rgba(100, 116, 139, 0.35)';
      ctx.setLineDash([3, 3]);
      ctx.beginPath(); ctx.moveTo(pad.left, zeroY); ctx.lineTo(W - pad.right, zeroY); ctx.stroke();
      ctx.setLineDash([]);

      // Histogram Bars
      const barW = Math.max(2, stepX * 0.58);
      series.forEach((m, i) => {
        const x = xOf(i), y = yOf(m.hist);
        ctx.fillStyle = m.hist >= 0 ? 'rgba(16, 185, 129, 0.48)' : 'rgba(239, 68, 68, 0.48)';
        ctx.fillRect(x - barW / 2, Math.min(zeroY, y), barW, Math.max(1, Math.abs(y - zeroY)));
      });

      // Signal Line (Amber)
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      series.forEach((m, i) => { const x = xOf(i), y = yOf(m.signal); if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); });
      ctx.stroke();

      // MACD Line (Cyan)
      ctx.strokeStyle = '#22d3ee';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      series.forEach((m, i) => { const x = xOf(i), y = yOf(m.macd); if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); });
      ctx.stroke();

      // Plot Predictive Markers on Top Rail AND on MACD Line
      sigs.forEach((sig, i) => {
        if (!sig || sig.state === 'NEUTRAL') return;
        const x = xOf(i);
        const yCurve = yOf(series[i].macd);
        const st = getMacdPredStyle(sig.state);

        ctx.save();
        if (sig.state === 'BULL_CROSS' || sig.state === 'BEAR_CROSS') {
          // Top rail diamond
          ctx.fillStyle = st.color;
          ctx.beginPath();
          ctx.moveTo(x, railY - 4); ctx.lineTo(x + 3.5, railY); ctx.lineTo(x, railY + 4); ctx.lineTo(x - 3.5, railY);
          ctx.closePath(); ctx.fill();
          // On-curve dot
          ctx.strokeStyle = st.stroke; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.arc(x, yCurve, 3.2, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        } else if (sig.state === 'IMMINENT_BULL' || sig.state === 'IMMINENT_BEAR') {
          // Top rail ringed dot
          ctx.strokeStyle = st.color; ctx.lineWidth = 1.4;
          ctx.beginPath(); ctx.arc(x, railY, 3.6, 0, Math.PI * 2); ctx.stroke();
          ctx.fillStyle = st.stroke;
          ctx.beginPath(); ctx.arc(x, railY, 1.5, 0, Math.PI * 2); ctx.fill();
          // On-curve ring
          ctx.strokeStyle = st.color; ctx.lineWidth = 1.3;
          ctx.beginPath(); ctx.arc(x, yCurve, 3.5, 0, Math.PI * 2); ctx.stroke();
        } else if (sig.state === 'DUAL_TREND_UP') {
          ctx.fillStyle = st.color;
          ctx.beginPath();
          ctx.moveTo(x, railY - 3.2); ctx.lineTo(x + 2.8, railY + 2.5); ctx.lineTo(x - 2.8, railY + 2.5);
          ctx.closePath(); ctx.fill();
        } else if (sig.state === 'DUAL_TREND_DOWN') {
          ctx.fillStyle = st.color;
          ctx.beginPath();
          ctx.moveTo(x, railY + 3.2); ctx.lineTo(x + 2.8, railY - 2.5); ctx.lineTo(x - 2.8, railY - 2.5);
          ctx.closePath(); ctx.fill();
        }
        ctx.restore();
      });

      // Update card header badge & stats
      const meta = a.macdPredMeta || { macdAngle: 0, sigAngle: 0, distPct: 0, eta: null, state: 'NEUTRAL', label: 'NEUTRAL' };
      const st = getMacdPredStyle(meta.state);
      const badgeEl = document.getElementById(`macdPredBadge_${tf}`);
      if (badgeEl) {
        badgeEl.textContent = meta.state === 'NEUTRAL' ? 'NEUTRAL' : st.short;
        badgeEl.className = `px-1.5 py-0.5 rounded text-[9.5px] font-bold border ${st.badgeCls}`;
      }
      const statsEl = document.getElementById(`macdPredStats_${tf}`);
      if (statsEl) {
        const etaTxt = meta.eta !== null ? `ETA ~${meta.eta.toFixed(1)}c` : 'ETA --';
        statsEl.innerHTML = `
          <span>∠M: <strong class="${meta.macdAngle >= 0 ? 'text-cyan-300' : 'text-rose-300'}">${meta.macdAngle >= 0 ? '+' : ''}${meta.macdAngle.toFixed(0)}°</strong></span>
          <span>∠S: <strong class="${meta.sigAngle >= 0 ? 'text-amber-300' : 'text-rose-300'}">${meta.sigAngle >= 0 ? '+' : ''}${meta.sigAngle.toFixed(0)}°</strong></span>
          <span>Dist: <strong class="text-slate-200">${meta.distPct.toFixed(0)}%</strong></span>
          <span class="text-slate-500">${etaTxt}</span>
        `;
      }
    }

    function drawDeltaChartForTf(tf) {
      const canvas = document.getElementById(`deltaChartCanvas_${tf}`);
      const candles = STATE.candlesByTf[tf], a = STATE.analyticsByTf[tf];
      if (!canvas || !candles.length) return;
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      const ctx = canvas.getContext('2d');
      ctx.scale(dpr, dpr);

      const W = rect.width, H = rect.height, pad = { top: 10, right: 8, bottom: 10, left: 8 };
      const plotW = W - pad.left - pad.right, plotH = H - pad.top - pad.bottom;
      ctx.clearRect(0, 0, W, H);

      const slice = candles.slice(-40), cvdSlice = a.cvdSeries.slice(-40);
      const stepX = plotW / slice.length, xOf = (i) => pad.left + i * stepX + stepX * 0.5;
      const barW = Math.max(2, Math.min(8, stepX * 0.64));
      const maxAbsDelta = Math.max(...slice.map((c) => Math.abs(c.delta)), 1);
      const zeroY = pad.top + plotH * 0.5;

      ctx.strokeStyle = 'rgba(148, 163, 184, 0.22)';
      ctx.beginPath(); ctx.moveTo(pad.left, zeroY); ctx.lineTo(W - pad.right, zeroY); ctx.stroke();

      slice.forEach((c, i) => {
        const x = xOf(i), h = (c.delta / maxAbsDelta) * (plotH * 0.44);
        ctx.fillStyle = c.delta >= 0 ? 'rgba(16, 185, 129, 0.8)' : 'rgba(239, 68, 68, 0.8)';
        if (h >= 0) ctx.fillRect(x - barW / 2, zeroY - h, barW, h);
        else ctx.fillRect(x - barW / 2, zeroY, barW, -h);
      });

      const minCvd = Math.min(...cvdSlice), maxCvd = Math.max(...cvdSlice), cvdSpan = Math.max(maxCvd - minCvd, 1);
      ctx.save();
      ctx.strokeStyle = '#06b6d4'; ctx.lineWidth = 1.6;
      ctx.shadowColor = 'rgba(6, 182, 212, 0.45)'; ctx.shadowBlur = 4;
      ctx.beginPath();
      cvdSlice.forEach((val, i) => {
        const x = xOf(i), y = pad.top + ((maxCvd - val) / cvdSpan) * plotH;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();
      ctx.restore();
    }

    function drawRadarForTf(tf) {
      const canvas = document.getElementById(`radarCanvas_${tf}`);
      if (!canvas || STATE.activeTab !== 'main') return;
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const dpr = window.devicePixelRatio || 1;
      if (canvas.width !== Math.round(rect.width * dpr) || canvas.height !== Math.round(rect.height * dpr)) {
        canvas.width = Math.round(rect.width * dpr);
        canvas.height = Math.round(rect.height * dpr);
      }
      const ctx = canvas.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const W = rect.width, H = rect.height, cx = W / 2, cy = H / 2 + 6, R = Math.min(W, H) * 0.38;
      ctx.clearRect(0, 0, W, H);

      const tfRange = STATE.radar.autoRange ? Math.round(STATE.radar.range * (tf === '1m' ? 1 : tf === '5m' ? 1.3 : 1.7)) : STATE.radar.range;
      ctx.font = '9px "JetBrains Mono", monospace';
      for (let i = 1; i <= 4; i++) {
        const r = (R * i) / 4;
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.22)'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
        if (i === 2 || i === 4) {
          ctx.fillStyle = 'rgba(100, 116, 139, 0.8)';
          ctx.fillText(`$${Math.round((tfRange * i) / 4)}`, cx + r - 18, cy - 3);
        }
      }

      ctx.strokeStyle = 'rgba(6, 182, 212, 0.16)';
      ctx.beginPath();
      ctx.moveTo(cx - R - 8, cy); ctx.lineTo(cx + R + 8, cy);
      ctx.moveTo(cx, cy - R - 8); ctx.lineTo(cx, cy + R + 8);
      ctx.stroke();

      const sweep = STATE.radar.sweepAngle;
      const grad = ctx.createRadialGradient(cx, cy, 3, cx, cy, R);
      grad.addColorStop(0, 'rgba(16, 185, 129, 0.24)'); grad.addColorStop(1, 'rgba(16, 185, 129, 0.02)');
      ctx.fillStyle = grad;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, R, sweep - 0.52, sweep); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.85)'; ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(sweep) * R, cy + Math.sin(sweep) * R); ctx.stroke();

      const candles = STATE.candlesByTf[tf], a = STATE.analyticsByTf[tf];
      if (candles.length && a.srZones.R1) {
        const currPrice = candles[candles.length - 1].c;
        [
          { key: 'R2', z: a.srZones.R2, angle: -Math.PI * 0.30, color: '#ef4444' },
          { key: 'R1', z: a.srZones.R1, angle: -Math.PI * 0.72, color: '#f87171' },
          { key: 'S1', z: a.srZones.S1, angle: Math.PI * 0.28, color: '#34d399' },
          { key: 'S2', z: a.srZones.S2, angle: Math.PI * 0.72, color: '#10b981' },
        ].forEach((b) => {
          if (!b.z) return;
          const dist = b.z.price - currPrice;
          const norm = Math.min(0.94, Math.max(0.24, Math.abs(dist) / tfRange));
          const bx = cx + Math.cos(b.angle) * R * norm, by = cy + Math.sin(b.angle) * R * norm;
          ctx.save(); ctx.shadowColor = b.color; ctx.shadowBlur = 10; ctx.fillStyle = b.color;
          ctx.beginPath(); ctx.arc(bx, by, 4.5, 0, Math.PI * 2); ctx.fill(); ctx.restore();

          const boxW = 82, boxH = 26;
          let ox = Math.max(4, Math.min(W - boxW - 4, bx >= cx ? bx + 7 : bx - boxW - 7));
          let oy = Math.max(24, Math.min(H - boxH - 4, by - boxH / 2));
          ctx.fillStyle = 'rgba(11, 17, 23, 0.90)'; ctx.fillRect(ox, oy, boxW, boxH);
          ctx.strokeStyle = b.color; ctx.lineWidth = 0.9; ctx.strokeRect(ox, oy, boxW, boxH);
          ctx.fillStyle = '#f8fafc'; ctx.font = '700 9px "JetBrains Mono", monospace';
          ctx.fillText(`${b.key} $${b.z.price.toFixed(0)}`, ox + 4, oy + 10.5);
          ctx.fillStyle = b.color; ctx.font = '500 8.5px "JetBrains Mono", monospace';
          ctx.fillText(`${dist >= 0 ? '+' : ''}$${dist.toFixed(0)}·${b.z.strength}%`, ox + 4, oy + 21);
        });

        ctx.fillStyle = '#070b0f'; ctx.strokeStyle = '#06b6d4'; ctx.lineWidth = 1.8;
        ctx.beginPath(); ctx.arc(cx, cy, 24, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#06b6d4'; ctx.font = '700 8.5px "JetBrains Mono", monospace'; ctx.textAlign = 'center';
        ctx.fillText('BTC', cx, cy - 3);
        ctx.fillStyle = '#ffffff'; ctx.font = '700 9.5px "JetBrains Mono", monospace';
        ctx.fillText(`$${currPrice.toFixed(0)}`, cx, cy + 9);
        ctx.textAlign = 'left';
      }
    }

    function radarLoop() {
      STATE.radar.sweepAngle = (STATE.radar.sweepAngle + 0.025) % (Math.PI * 2);
      if (STATE.activeTab === 'main') MATRIX_TFS.forEach((tf) => drawRadarForTf(tf));
      requestAnimationFrame(radarLoop);
    }

    /*************************************************************************
     * 10. PATTERN LIBRARY RENDERER (123 PATTERNS) + STRICT 4-STATE DOTS/SVGs
     *************************************************************************/
    function buildPatternSvg(pat, width = 88, height = 44, stageStates = null) {
      const baseColor = pat.dir === 'BULLISH' ? '#10b981' : '#f43f5e';
      const padX = 8, padY = 7;
      const w = width - padX * 2, h = height - padY * 2;
      const pts = pat.pts.map((v, i) => {
        const x = padX + (i / (pat.pts.length - 1)) * w;
        const y = padY + (1 - v) * h;
        return [x, y];
      });

      let segments = '';
      for (let i = 0; i < pts.length - 1; i++) {
        const stNext = stageStates ? stageStates[i + 1] : null;
        const isAwait = stNext === 'AWAITING';
        const segColor = isAwait ? '#64748b' : stNext === 'FAIL' ? '#ef4444' : baseColor;
        const dash = isAwait ? 'stroke-dasharray="3,3"' : '';
        segments += `<line x1="${pts[i][0].toFixed(1)}" y1="${pts[i][1].toFixed(1)}" x2="${pts[i + 1][0].toFixed(1)}" y2="${pts[i + 1][1].toFixed(1)}" stroke="${segColor}" stroke-width="1.6" stroke-linecap="round" ${dash} />`;
      }

      const circles = pts.map((p, idx) => {
        const st = stageStates ? stageStates[idx] : null;
        if (st === 'AWAITING') return `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="2.4" fill="#060a0e" stroke="#64748b" stroke-width="1.4" />`;
        if (st === 'FAIL') return `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="2.6" fill="#ef4444" stroke="#fecaca" stroke-width="1" />`;
        if (st === 'TESTING') return `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="2.8" fill="#38bdf8" stroke="#e0f2fe" stroke-width="1" />`;
        if (st === 'PASS') return `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="2.4" fill="#10b981" />`;
        return `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="2.1" fill="${baseColor}" />`;
      }).join('');

      return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" class="shrink-0 rounded bg-[#060a0e] border border-[#162230]">
        ${segments}
        ${circles}
      </svg>`;
    }

    function renderStageDotsHtml(stageStates, stagePcts = []) {
      return stageStates.map((st, idx) => {
        if (st === 'PASS') {
          const pctTxt = stagePcts[idx] != null ? ` (${stagePcts[idx]}%)` : '';
          return `<span title="S${idx + 1}: PASS${pctTxt}" class="inline-block w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_5px_#10b981]"></span>`;
        }
        if (st === 'FAIL') {
          return `<span title="S${idx + 1}: FAIL" class="inline-block w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_5px_#ef4444]"></span>`;
        }
        if (st === 'TESTING') {
          return `<span title="S${idx + 1}: TESTING" class="inline-block w-2 h-2 rounded-full bg-sky-400 pulse-dot"></span>`;
        }
        return `<span title="S${idx + 1}: AWAITING TEST" class="inline-block w-2 h-2 rounded-full border-[1.5px] border-slate-400 bg-transparent"></span>`;
      }).join('');
    }

    function getStatusBadgeClass(status) {
      if (status === 'PASS') return 'text-emerald-400 bg-emerald-500/15 border border-emerald-500/30';
      if (status === 'FAIL') return 'text-rose-400 bg-rose-500/15 border border-rose-500/30';
      return 'text-slate-300 bg-slate-800/70 border border-slate-600/50';
    }

    function renderPatternLibrary() {
      const allEntries = Object.values(STATE.patternResults);
      if (!allEntries.length) return;

      const tf = STATE.timeframe;
      const thresh = STATE.lab.geoMatchThreshold;
      const bullHot = allEntries.filter((e) => e.pattern.dir === 'BULLISH' && e.perTf[tf]?.overallPct >= thresh).length;
      const bearHot = allEntries.filter((e) => e.pattern.dir === 'BEARISH' && e.perTf[tf]?.overallPct >= thresh).length;
      const totalHot = bullHot + bearHot;

      document.getElementById('headerGeoCount').textContent = totalHot;
      document.getElementById('tabLibBadge').textContent = totalHot;
      document.getElementById('libBullHot').textContent = bullHot;
      document.getElementById('libBearHot').textContent = bearHot;
      const sortTfEl = document.getElementById('libSortTfLabel');
      if (sortTfEl) sortTfEl.textContent = tf;

      if (STATE.activeTab !== 'library') return;

      const q = (document.getElementById('libSearch')?.value || '').trim().toLowerCase();
      const sortBy = document.getElementById('libSort')?.value || 'match';
      const activeWinner = getActiveChartPattern();

      const filterAndSort = (dir) => {
        let items = allEntries.filter((e) => e.pattern.dir === dir && e.perTf[tf]);
        if (q) items = items.filter((e) => e.id.toLowerCase().includes(q) || e.pattern.name.toLowerCase().includes(q) || e.pattern.category.toLowerCase().includes(q));
        if (STATE.libFilter === 'HOT') items = items.filter((e) => e.perTf[tf].overallPct >= thresh);
        if (STATE.libFilter === 'PASS') items = items.filter((e) => e.perTf[tf].status === 'PASS');
        if (STATE.libFilter === 'AWAITING') items = items.filter((e) => e.perTf[tf].status === 'AWAITING');
        if (STATE.libFilter === 'FAIL') items = items.filter((e) => e.perTf[tf].status === 'FAIL');

        items.sort((a, b) => {
          if (sortBy === 'match') return b.perTf[tf].overallPct - a.perTf[tf].overallPct;
          if (sortBy === 'confluence') return b.perTf[tf].confluenceScore - a.perTf[tf].confluenceScore;
          return a.id.localeCompare(b.id);
        });
        return items;
      };

      const renderCard = (e) => {
        const isBull = e.pattern.dir === 'BULLISH';
        const curTfRes = e.perTf[tf];
        const isWinner = activeWinner && activeWinner.id === e.id;
        const histAlert = getPatternHistoryAlert(e.id, tf);
        const borderCls = isWinner
          ? 'border-cyan-400/70 bg-cyan-500/5'
          : histAlert.type === 'FAIL_LAST_POINT'
          ? 'border-amber-500/50 hover:border-rose-500/60 bg-rose-950/15'
          : isBull ? 'border-[#1a2634] hover:border-emerald-500/40 bg-[#0a1017]' : 'border-[#1a2634] hover:border-rose-500/40 bg-[#0a1017]';

        const histPill = histAlert.type === 'FAIL_LAST_POINT'
          ? `<span class="font-mono text-[9px] px-1.5 py-0.5 rounded bg-rose-500/20 text-amber-300 border border-amber-500/50 font-bold" title="Failed at ${histAlert.event.failedStage} at ${formatTime12h(histAlert.event.timestamp)}">⚠️ LAST-PT FAIL ${histAlert.isToday ? 'TODAY' : 'RECENT'}</span>`
          : histAlert.type === 'WIN'
          ? `<span class="font-mono text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">🏆 WON ${histAlert.isToday ? 'TODAY' : 'RECENT'}</span>`
          : '';

        const tfCells = TFS.map((t) => {
          const r = e.perTf[t];
          if (!r) return '';
          const isSelectedTf = t === tf;
          const isHot = r.overallPct >= thresh;
          const badgeCls = getStatusBadgeClass(r.status);
          return `
            <div class="rounded-lg p-1.5 border ${isSelectedTf ? 'border-cyan-500/50 bg-[#0d1621]' : 'border-[#162230] bg-[#070c12]'} space-y-1">
              <div class="flex items-center justify-between font-mono text-[10px]">
                <span class="${isSelectedTf ? 'text-cyan-300' : 'text-slate-400'} font-bold uppercase">${t}</span>
                <span class="font-bold ${r.status === 'FAIL' ? 'text-rose-400' : isHot ? 'text-emerald-300' : 'text-slate-200'}">${r.overallPct}%</span>
              </div>
              <div class="flex items-center gap-1 flex-wrap">${renderStageDotsHtml(r.stageStates, r.stagePcts)}</div>
              <div class="flex items-center justify-between font-mono text-[9px]">
                <span class="text-slate-500">${r.passedCount}/${r.totalStages} PASS</span>
                <span class="px-1 rounded font-bold ${badgeCls}">${r.status}</span>
              </div>
            </div>
          `;
        }).join('');

        return `
          <div onclick="openPatternModal('${e.id}')" class="cursor-pointer rounded-xl border p-2.5 transition-all space-y-2 ${borderCls}">
            <div class="flex items-center justify-between gap-2">
              <div class="flex items-center gap-2.5 min-w-0">
                ${buildPatternSvg(e.pattern, 76, 38, curTfRes.stageStates)}
                <div class="min-w-0">
                  <div class="flex items-center gap-1.5 flex-wrap">
                    <span class="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded ${isBull ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}">${e.id}</span>
                    <span class="font-mono text-xs font-bold text-slate-100 truncate">${e.pattern.name}</span>
                    ${isWinner ? `<span class="font-mono text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">★ ${tf.toUpperCase()} WINNER</span>` : ''}
                    ${histPill}
                  </div>
                  <div class="font-mono text-[10px] text-slate-400 mt-0.5">${e.pattern.category} · ${e.pattern.steps} Points</div>
                </div>
              </div>
              <div class="text-right font-mono shrink-0">
                <div class="text-xs font-bold text-amber-300">CONF ${curTfRes.confluenceScore}</div>
                <div class="text-[10px] text-slate-400">${tf.toUpperCase()}: ${curTfRes.overallPct}%</div>
              </div>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-1.5">${tfCells}</div>
          </div>
        `;
      };

      const bullItems = filterAndSort('BULLISH');
      const bearItems = filterAndSort('BEARISH');
      document.getElementById('bullShowingCount').textContent = `Showing ${bullItems.length} / 58`;
      document.getElementById('bearShowingCount').textContent = `Showing ${bearItems.length} / 65`;
      document.getElementById('bullishLibraryList').innerHTML = bullItems.length
        ? bullItems.map(renderCard).join('')
        : '<div class="text-center py-8 font-mono text-xs text-slate-500">No Bullish patterns match current filter.</div>';
      document.getElementById('bearishLibraryList').innerHTML = bearItems.length
        ? bearItems.map(renderCard).join('')
        : '<div class="text-center py-8 font-mono text-xs text-slate-500">No Bearish patterns match current filter.</div>';
    }

    function openPatternModal(patId) {
      const e = STATE.patternResults[patId];
      if (!e) return;
      const tf = STATE.timeframe;
      const curRes = e.perTf[tf];
      const isBull = e.pattern.dir === 'BULLISH';

      const idEl = document.getElementById('modalPatId');
      idEl.textContent = `${e.id} · ${e.pattern.dir}`;
      idEl.className = `font-mono text-xs font-bold px-2 py-0.5 rounded ${isBull ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`;
      document.getElementById('modalPatName').textContent = e.pattern.name;
      document.getElementById('modalPatCat').textContent = `${e.pattern.category} • ${e.pattern.steps} Geometric Points • ${tf.toUpperCase()} Overall: ${curRes.overallPct}% (${curRes.passedCount}/${curRes.totalStages} PASS)`;
      document.getElementById('modalPatSvg').innerHTML = buildPatternSvg(e.pattern, 240, 140, curRes.stageStates);

      // Modal Repeat Alert Banner
      const histAlert = getPatternHistoryAlert(patId, tf);
      const modalAlertEl = document.getElementById('modalPatHistoryAlert');
      if (histAlert.type === 'FAIL_LAST_POINT') {
        const ev = histAlert.event;
        modalAlertEl.className = 'rounded-xl px-3.5 py-2.5 font-mono text-xs border border-amber-500/60 bg-rose-950/50 text-amber-200 flex items-center justify-between gap-2';
        modalAlertEl.innerHTML = `<span>⚠️ <strong>REPEAT WARNING:</strong> Last time this pattern <strong>FAILED AT LAST POINT (${ev.failedStage})</strong> ${histAlert.isToday ? 'today' : 'recently'} at <strong>${formatTime12h(ev.timestamp)}</strong> on <strong>${ev.timeframe.toUpperCase()}</strong> ($${ev.price.toFixed(1)}).</span>`;
        modalAlertEl.classList.remove('hidden');
      } else if (histAlert.type === 'WIN') {
        const ev = histAlert.event;
        modalAlertEl.className = 'rounded-xl px-3.5 py-2.5 font-mono text-xs border border-emerald-500/50 bg-emerald-950/40 text-emerald-200 flex items-center justify-between gap-2';
        modalAlertEl.innerHTML = `<span>🏆 <strong>RECENT WINNER:</strong> This pattern completed with a <strong>WIN (${ev.overallPct}%)</strong> ${histAlert.isToday ? 'today' : 'recently'} at <strong>${formatTime12h(ev.timestamp)}</strong> on <strong>${ev.timeframe.toUpperCase()}</strong>.</span>`;
        modalAlertEl.classList.remove('hidden');
      } else {
        modalAlertEl.classList.add('hidden');
      }

      // Modal Prior History Timeline
      const patHist = STATE.patternHistory.filter((h) => h.patternId === patId);
      document.getElementById('modalHistCount').textContent = `${patHist.length} Saved Event${patHist.length === 1 ? '' : 's'}`;
      document.getElementById('modalPatHistoryList').innerHTML = patHist.length
        ? patHist.slice(0, 10).map((h) => {
            const isLpf = h.outcome === 'FAIL_LAST_POINT';
            const isWin = h.outcome === 'WIN';
            const badge = isWin
              ? `<span class="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">🏆 WIN ${h.overallPct}%</span>`
              : isLpf
              ? `<span class="px-1.5 py-0.5 rounded bg-rose-500/25 text-amber-300 border border-amber-500/50 font-bold">🚨 FAIL AT LAST POINT (${h.failedStage})</span>`
              : `<span class="px-1.5 py-0.5 rounded bg-rose-500/15 text-rose-300 border border-rose-500/30 font-bold">❌ FAIL (${h.failedStage})</span>`;
            return `
              <div class="flex flex-wrap items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg bg-[#0a1017] border border-[#1a2634]">
                <div class="flex items-center gap-2">
                  <span class="text-slate-400">${h.dateStr} ${formatTime12h(h.timestamp)}</span>
                  <span class="px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-300 font-bold uppercase text-[10px]">${h.timeframe}</span>
                </div>
                <div class="flex items-center gap-2">
                  ${badge}
                  <span class="text-slate-300">$${h.price.toFixed(1)}</span>
                </div>
              </div>
            `;
          }).join('')
        : '<div class="text-slate-500 py-2 text-center">No prior wins or failures recorded for this pattern yet.</div>';

      document.getElementById('modalPatStats').innerHTML = TFS.map((t) => {
        const r = e.perTf[t];
        const stagePills = r.stageStates.map((st, idx) => {
          if (st === 'PASS') return `<span class="px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[9.5px]">S${idx + 1}: PASS (${r.stagePcts[idx]}%)</span>`;
          if (st === 'FAIL') return `<span class="px-1.5 py-0.5 rounded bg-rose-500/15 text-rose-300 border border-rose-500/30 text-[9.5px]">S${idx + 1}: FAIL</span>`;
          if (st === 'TESTING') return `<span class="px-1.5 py-0.5 rounded bg-sky-500/15 text-sky-300 border border-sky-400/40 text-[9.5px]">S${idx + 1}: TESTING</span>`;
          return `<span class="px-1.5 py-0.5 rounded bg-slate-800/70 text-slate-400 border border-slate-600/50 text-[9.5px]">S${idx + 1}: AWAITING TEST</span>`;
        }).join('');

        return `
          <div class="p-2.5 rounded-xl bg-[#0a1017] border ${t === tf ? 'border-cyan-500/50' : 'border-[#1a2634]'} space-y-2">
            <div class="flex items-center justify-between gap-2">
              <div class="flex items-center gap-2">
                <span class="font-bold text-cyan-300 uppercase w-8">${t}</span>
                <div class="flex items-center gap-1.5">${renderStageDotsHtml(r.stageStates, r.stagePcts)}</div>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-slate-400 text-[10.5px]">${r.passedCount}/${r.totalStages} PASS</span>
                <span class="font-bold text-white">${r.overallPct}%</span>
                <span class="px-1.5 py-0.5 rounded text-[10px] font-bold ${getStatusBadgeClass(r.status)}">${r.status}</span>
              </div>
            </div>
            <div class="flex flex-wrap gap-1">${stagePills}</div>
          </div>
        `;
      }).join('');

      document.getElementById('modalPinBtn').onclick = () => {
        STATE.pinnedPatternId = e.id;
        closePatternModal();
        switchTab('main');
        recomputeAllAnalytics();
        renderAll();
      };
      document.getElementById('patternModal').classList.remove('hidden');
    }

    function closePatternModal() {
      document.getElementById('patternModal').classList.add('hidden');
    }

    function unpinPattern() {
      STATE.pinnedPatternId = null;
      recomputeAllAnalytics();
      renderAll();
    }

    /*************************************************************************
     * 10B. HISTORY TAB & MAIN TERMINAL MINI-CARD RENDERERS
     *************************************************************************/
    function renderHistoryBadgesAndMiniCard() {
      const todayStr = getLocalDateStr();
      const total = STATE.patternHistory.length;
      const lastPtFailsToday = STATE.patternHistory.filter((h) => h.outcome === 'FAIL_LAST_POINT' && h.dateStr === todayStr).length;

      const tabBadge = document.getElementById('tabHistBadge');
      if (tabBadge) tabBadge.textContent = total;
      const pulseEl = document.getElementById('tabHistPulse');
      if (pulseEl) pulseEl.classList.toggle('hidden', lastPtFailsToday === 0);
      const miniBadge = document.getElementById('miniHistCountBadge');
      if (miniBadge) miniBadge.textContent = `${total} SAVED · ${lastPtFailsToday} LAST-PT FAIL TODAY`;

      const miniList = document.getElementById('mainHistoryMiniList');
      if (!miniList) return;
      const top5 = STATE.patternHistory.filter((h) => h.outcome === 'WIN' || h.outcome === 'FAIL_LAST_POINT').slice(0, 5);
      if (!top5.length) {
        miniList.innerHTML = '<div class="col-span-full text-center py-3 text-slate-500">No winning patterns or last-point fails logged yet.</div>';
        return;
      }
      miniList.innerHTML = top5.map((h) => {
        const isWin = h.outcome === 'WIN';
        const cls = isWin
          ? 'border-emerald-500/35 bg-emerald-500/10 hover:border-emerald-400/60'
          : 'border-amber-500/45 bg-rose-950/35 hover:border-amber-400/80';
        return `
          <div onclick="openPatternModal('${h.patternId}')" class="cursor-pointer rounded-lg border p-2 transition space-y-1 ${cls}">
            <div class="flex items-center justify-between gap-1">
              <span class="font-bold ${isWin ? 'text-emerald-300' : 'text-amber-300'}">${isWin ? '🏆 WIN' : '🚨 LAST-PT FAIL'}</span>
              <span class="text-[9.5px] px-1 rounded bg-[#070b0f] text-cyan-300 uppercase">${h.timeframe}</span>
            </div>
            <div class="text-slate-100 font-bold truncate">${h.patternId} ${h.patternName}</div>
            <div class="flex items-center justify-between text-[9.5px] text-slate-400">
              <span>${isWin ? `${h.overallPct}% (${h.stageReached})` : `Failed ${h.failedStage}`}</span>
              <span>${formatTime12h(h.timestamp)}</span>
            </div>
          </div>
        `;
      }).join('');
    }

    function renderHistoryTab() {
      const todayStr = getLocalDateStr();
      const all = STATE.patternHistory;
      const wins = all.filter((h) => h.outcome === 'WIN').length;
      const lastPtFails = all.filter((h) => h.outcome === 'FAIL_LAST_POINT').length;
      const allFails = all.filter((h) => h.outcome === 'FAIL' || h.outcome === 'FAIL_LAST_POINT').length;
      const todayCount = all.filter((h) => h.dateStr === todayStr).length;
      const winRate = wins + allFails > 0 ? Math.round((wins / (wins + allFails)) * 100) : 0;

      document.getElementById('kpiHistTotal').textContent = all.length;
      document.getElementById('kpiHistWins').textContent = wins;
      document.getElementById('kpiHistLastPtFails').textContent = lastPtFails;
      document.getElementById('kpiHistToday').textContent = todayCount;
      document.getElementById('kpiHistWinRate').textContent = `${winRate}%`;

      if (STATE.activeTab !== 'history') return;

      const q = (document.getElementById('histSearch')?.value || '').trim().toLowerCase();
      let items = all.slice();
      if (q) items = items.filter((h) => h.patternId.toLowerCase().includes(q) || h.patternName.toLowerCase().includes(q));
      if (STATE.histFilter === 'WIN') items = items.filter((h) => h.outcome === 'WIN');
      if (STATE.histFilter === 'FAIL_LAST_POINT') items = items.filter((h) => h.outcome === 'FAIL_LAST_POINT');
      if (STATE.histFilter === 'FAIL_ALL') items = items.filter((h) => h.outcome === 'FAIL' || h.outcome === 'FAIL_LAST_POINT');
      if (STATE.histFilter === 'TODAY') items = items.filter((h) => h.dateStr === todayStr);
      if (STATE.histTfFilter !== 'ALL') items = items.filter((h) => h.timeframe === STATE.histTfFilter);

      const tbody = document.getElementById('historyTableBody');
      if (!items.length) {
        tbody.innerHTML = '<tr><td colspan="8" class="px-4 py-8 text-center text-slate-500">No pattern history records match your current filters.</td></tr>';
        return;
      }

      tbody.innerHTML = items.map((h) => {
        const isToday = h.dateStr === todayStr;
        const isBull = h.side === 'BULLISH';
        const outcomeBadge = h.outcome === 'WIN'
          ? `<span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold text-[10.5px]">🏆 WIN (${h.overallPct}%)</span>`
          : h.outcome === 'FAIL_LAST_POINT'
          ? `<span class="px-2 py-0.5 rounded bg-rose-500/25 text-amber-300 border border-amber-500/60 font-bold text-[10.5px]">🚨 FAIL AT LAST POINT (${h.failedStage})</span>`
          : `<span class="px-2 py-0.5 rounded bg-rose-500/15 text-rose-300 border border-rose-500/30 font-bold text-[10.5px]">❌ FAIL (${h.failedStage})</span>`;

        return `
          <tr class="${h.outcome === 'FAIL_LAST_POINT' ? 'bg-rose-950/20' : ''} hover:bg-[#0e161f] transition">
            <td class="px-3 py-2 whitespace-nowrap">
              <span class="text-slate-200">${formatTime12h(h.timestamp)}</span>
              <span class="text-[10px] text-slate-500 ml-1">${h.dateStr}</span>
              ${isToday ? '<span class="ml-1.5 text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-bold">TODAY</span>' : ''}
            </td>
            <td class="px-3 py-2">
              <span class="px-1.5 py-0.5 rounded bg-[#060a0e] border border-[#1a2634] text-cyan-300 font-bold uppercase text-[10.5px]">${h.timeframe}</span>
            </td>
            <td class="px-3 py-2">
              <span class="font-bold ${isBull ? 'text-emerald-400' : 'text-rose-400'}">${h.patternId}</span>
              <span class="text-slate-200 ml-1.5">${h.patternName}</span>
            </td>
            <td class="px-3 py-2">
              <span class="text-[10.5px] font-bold ${isBull ? 'text-emerald-400' : 'text-rose-400'}">${isBull ? '▲ BULLISH' : '▼ BEARISH'}</span>
            </td>
            <td class="px-3 py-2 whitespace-nowrap">${outcomeBadge}</td>
            <td class="px-3 py-2 text-slate-300">${h.stageReached} pts</td>
            <td class="px-3 py-2 text-slate-200">$${Number(h.price).toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}</td>
            <td class="px-3 py-2 text-right">
              <button onclick="openPatternModal('${h.patternId}')" class="px-2.5 py-1 rounded-md border border-cyan-500/40 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 text-[10.5px] font-bold">
                INSPECT
              </button>
            </td>
          </tr>
        `;
      }).join('');
    }

    /*************************************************************************
     * 11. MASTER UI RENDERER (HEADER, TRACKER BAR, MTF STRIP, MATRIX, LAB)
     *************************************************************************/
    function renderAll() {
      const tf = STATE.timeframe;
      const candles = STATE.candlesByTf[tf];
      const a = STATE.analyticsByTf[tf];
      if (!candles || !candles.length) return;

      const last = candles[candles.length - 1];
      const displayCandle = (STATE.hoverIndex >= 0 && STATE.hoverIndex < candles.length) ? candles[STATE.hoverIndex] : last;
      const baseOpen = STATE.sessionOpen || candles[0].o || last.o;
      const chg = last.c - baseOpen;
      const chgPct = baseOpen > 0 ? (chg / baseOpen) * 100 : 0;

      // Header Live Price, VWAP, OBI
      document.getElementById('livePrice').textContent = `$${last.c.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      const chgEl = document.getElementById('priceChange');
      chgEl.textContent = `${chg >= 0 ? '+' : ''}${chg.toFixed(2)} (${chgPct >= 0 ? '+' : ''}${chgPct.toFixed(2)}%)`;
      chgEl.className = `font-mono-num text-xs font-semibold ${chg >= 0 ? 'text-emerald-400' : 'text-rose-400'}`;

      const currVwap = a.vwapSeries[a.vwapSeries.length - 1] || last.c;
      document.getElementById('liveVwap').textContent = `$${currVwap.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}`;

      const obiStr = `${STATE.baseObi.pct >= 0 ? '+' : ''}${STATE.baseObi.pct.toFixed(1)}%`;
      const obiValEl = document.getElementById('liveObiVal');
      obiValEl.textContent = obiStr;
      obiValEl.className = `font-bold ${STATE.baseObi.pct > 5 ? 'text-emerald-400' : STATE.baseObi.pct < -5 ? 'text-rose-400' : 'text-cyan-400'}`;

      // MTF Momentum Strip
      TFS.forEach((t) => {
        const el = document.getElementById(`mtf${t}`);
        if (!el) return;
        const m = STATE.mtf[t] || 'NEUTRAL';
        el.textContent = `${t}: ${m}`;
        el.className = `px-2 py-1 rounded-md border text-[11px] font-bold ${
          m === 'BULLISH'
            ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300'
            : m === 'BEARISH'
            ? 'border-rose-500/40 bg-rose-500/15 text-rose-300'
            : 'border-[#1a2634] bg-[#0e161f] text-slate-300'
        }`;
      });

      // Live OHLCV + Delta Readout Bar
      document.getElementById('roTf').textContent = tf.toUpperCase();
      document.getElementById('roO').textContent = displayCandle.o.toFixed(1);
      document.getElementById('roH').textContent = displayCandle.h.toFixed(1);
      document.getElementById('roL').textContent = displayCandle.l.toFixed(1);
      document.getElementById('roC').textContent = displayCandle.c.toFixed(1);
      document.getElementById('roV').textContent = displayCandle.v.toFixed(2);
      document.getElementById('roBuy').textContent = displayCandle.buyVol.toFixed(2);
      document.getElementById('roSell').textContent = displayCandle.sellVol.toFixed(2);
      const roDeltaEl = document.getElementById('roDelta');
      roDeltaEl.textContent = `${displayCandle.delta >= 0 ? '+' : ''}${displayCandle.delta.toFixed(2)} (${displayCandle.deltaPct.toFixed(0)}%)`;
      roDeltaEl.className = `font-bold ${displayCandle.delta >= 0 ? 'text-emerald-400' : 'text-rose-400'}`;
      const roObiEl = document.getElementById('roObi');
      roObiEl.textContent = obiStr;
      roObiEl.className = `font-bold ${STATE.baseObi.pct >= 0 ? 'text-emerald-400' : 'text-rose-400'}`;

      // Live Geometric Structure Progress Tracker Bar
      const activePat = getActiveChartPattern();
      if (activePat && activePat.res) {
        const res = activePat.res;
        const isBull = activePat.pattern.dir === 'BULLISH';
        const dirBadge = document.getElementById('geoTrackerDirBadge');
        dirBadge.textContent = `${activePat.isPinned ? 'PINNED' : '#1'} ${activePat.pattern.dir}`;
        dirBadge.className = `font-mono text-[10px] font-bold px-2 py-0.5 rounded border ${
          isBull
            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
            : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
        }`;
        document.getElementById('geoTrackerName').textContent = `${activePat.id} · ${activePat.pattern.name}`;
        document.getElementById('geoTrackerMatch').textContent = `${res.overallPct}%`;
        document.getElementById('geoTrackerConf').textContent = `CONFLUENCE: ${res.confluenceScore}`;
        document.getElementById('geoTrackerReason').textContent = `${tf.toUpperCase()} Isolated • ${res.passedCount}/${res.totalStages} Points Passed • S/R ${res.srScore}% • Flow ${res.flowScore}%`;
        document.getElementById('btnUnpinGeo').classList.toggle('hidden', !activePat.isPinned);

        document.getElementById('geoTrackerSteps').innerHTML = res.stageStates.map((st, idx) => {
          if (st === 'PASS') {
            return `<span class="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg border border-emerald-500/40 bg-emerald-500/15 text-emerald-300">
              <span class="w-2 h-2 rounded-full bg-emerald-400"></span>S${idx + 1}: PASS (${res.stagePcts[idx]}%)
            </span>`;
          }
          if (st === 'FAIL') {
            return `<span class="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg border border-rose-500/40 bg-rose-500/15 text-rose-300">
              <span class="w-2 h-2 rounded-full bg-rose-500"></span>S${idx + 1}: FAIL
            </span>`;
          }
          if (st === 'TESTING') {
            return `<span class="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg border border-sky-400/60 bg-sky-500/20 text-sky-200">
              <span class="w-2 h-2 rounded-full bg-sky-300 pulse-dot"></span>S${idx + 1}: TESTING
            </span>`;
          }
          return `<span class="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg border border-slate-600/50 bg-slate-800/40 text-slate-400">
            <span class="w-2 h-2 rounded-full border-[1.5px] border-slate-400 bg-transparent"></span>S${idx + 1}: AWAITING TEST
          </span>`;
        }).join('');

        // Same-Day / Recent Last-Point Fail or Win Callout Strip inside Live Tracker Bar
        const calloutEl = document.getElementById('geoHistoryCallout');
        const histAlert = getPatternHistoryAlert(activePat.id, tf);
        if (histAlert.type === 'FAIL_LAST_POINT') {
          const ev = histAlert.event;
          calloutEl.className = 'rounded-lg px-3 py-2 font-mono text-[11px] flex flex-wrap items-center justify-between gap-2 border border-amber-500/60 bg-rose-950/50 text-amber-200';
          calloutEl.innerHTML = `
            <div class="flex items-center gap-2">
              <span class="inline-flex h-2.5 w-2.5 rounded-full bg-rose-500 pulse-dot shrink-0"></span>
              <span>⚠️ <strong>REPEAT ALERT:</strong> Last time <strong>${activePat.id} ${activePat.pattern.name}</strong> appeared, it <strong>FAILED AT LAST POINT (${ev.failedStage})</strong> ${histAlert.isToday ? 'today' : 'recently'} at <strong>${formatTime12h(ev.timestamp)}</strong> [${ev.timeframe.toUpperCase()} @ $${ev.price.toFixed(1)}].</span>
            </div>
            <button onclick="switchTab('history')" class="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-400/50 text-amber-200 hover:bg-amber-500/30 text-[10px] font-bold shrink-0">VIEW LOG →</button>
          `;
          calloutEl.classList.remove('hidden');
        } else if (histAlert.type === 'WIN') {
          const ev = histAlert.event;
          calloutEl.className = 'rounded-lg px-3 py-2 font-mono text-[11px] flex flex-wrap items-center justify-between gap-2 border border-emerald-500/40 bg-emerald-950/35 text-emerald-200';
          calloutEl.innerHTML = `
            <div class="flex items-center gap-2">
              <span>🏆 <strong>RECENT WIN:</strong> ${activePat.id} ${activePat.pattern.name} completed successfully (${ev.overallPct}%) ${histAlert.isToday ? 'today' : 'recently'} at ${formatTime12h(ev.timestamp)} [${ev.timeframe.toUpperCase()}].</span>
            </div>
            <button onclick="switchTab('history')" class="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 hover:bg-emerald-500/30 text-[10px] font-bold shrink-0">VIEW LOG →</button>
          `;
          calloutEl.classList.remove('hidden');
        } else {
          calloutEl.classList.add('hidden');
        }
      }

      // A. Compact MTF RSI, MACD & ML Outcome Strip
      document.getElementById('mtfOutcomeStrip').innerHTML = MATRIX_TFS.map((t) => {
        const ta = STATE.analyticsByTf[t], li = ta.rsiSeries.length - 1;
        const rsi = ta.rsiSeries[li] || 50, m = ta.macdSeries[li] || { hist: 0 }, mp = ta.macdSeries[Math.max(0, li - 1)] || { hist: 0 };
        const rsiZone = rsi >= STATE.lab.rsiOverbought ? { txt: 'OVERBOUGHT', cls: 'bg-rose-500/20 text-rose-300' }
          : rsi <= STATE.lab.rsiOversold ? { txt: 'OVERSOLD', cls: 'bg-emerald-500/20 text-emerald-300' }
          : { txt: 'NEUTRAL', cls: 'bg-slate-800 text-slate-300' };
        const pred = ta.macdPredMeta || { state: 'NEUTRAL', macdAngle: 0 };
        const macdLbl = pred.state === 'BULL_CROSS' ? { txt: '◆ BULL CROSS', cls: 'text-emerald-400' }
          : pred.state === 'BEAR_CROSS' ? { txt: '◆ BEAR CROSS', cls: 'text-rose-400' }
          : pred.state === 'IMMINENT_BULL' ? { txt: '◎ IMMINENT BULL', cls: 'text-lime-300' }
          : pred.state === 'IMMINENT_BEAR' ? { txt: '◎ IMMINENT BEAR', cls: 'text-amber-300' }
          : pred.state === 'DUAL_TREND_UP' ? { txt: '▲ DUAL TREND UP', cls: 'text-cyan-300' }
          : pred.state === 'DUAL_TREND_DOWN' ? { txt: '▼ DUAL TREND DN', cls: 'text-fuchsia-300' }
          : m.hist >= 0 ? { txt: 'BULLISH', cls: 'text-emerald-400' } : { txt: 'BEARISH', cls: 'text-rose-400' };
        const divCls = ta.divergence === 'BULL DIV' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
          : ta.divergence === 'BEAR DIV' ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' : 'bg-[#0e161f] text-slate-500 border-[#1a2634]';
        const mlCls = ta.mlLiveBias.dir === 'BULLISH' ? 'text-emerald-400' : ta.mlLiveBias.dir === 'BEARISH' ? 'text-rose-400' : 'text-cyan-300';

        return `
          <div class="rounded-xl bg-[#0a1017] border border-[#1a2634] p-2.5 font-mono space-y-1.5">
            <div class="flex items-center justify-between border-b border-[#162230] pb-1">
              <span class="text-xs font-bold text-cyan-300 uppercase">${t} OUTCOME</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded border ${divCls}">${ta.divergence}</span>
            </div>
            <div class="flex items-center justify-between text-[11px] font-mono-num">
              <span class="text-slate-400">RSI(${STATE.lab.rsiPeriod}): <strong class="text-slate-100">${rsi.toFixed(1)}</strong></span>
              <span class="text-[9.5px] px-1.5 py-0.5 rounded font-bold ${rsiZone.cls}">${rsiZone.txt}</span>
            </div>
            <div class="flex items-center justify-between text-[11px] font-mono-num">
              <span class="text-slate-400">MACD: <strong class="${macdLbl.cls}">${m.hist >= 0 ? '+' : ''}${m.hist.toFixed(1)}</strong></span>
              <span class="text-[10px] font-bold ${macdLbl.cls}">${macdLbl.txt}</span>
            </div>
            <div class="flex items-center justify-between text-[11px] pt-0.5 border-t border-[#162230]">
              <span class="text-slate-400">ML BIAS:</span>
              <span class="font-bold ${mlCls}">${ta.mlLiveBias.dir} ${ta.mlLiveBias.conf}%</span>
            </div>
          </div>
        `;
      }).join('');

      // A2. Active TF Readout Pill + All 4 Timeframe Predictive MACD Sub-Charts
      const activePred = a.macdPredMeta || { state: 'NEUTRAL', macdAngle: 0, distPct: 0 };
      const activePredStyle = getMacdPredStyle(activePred.state);
      const roMacdEl = document.getElementById('roMacdPred');
      if (roMacdEl) {
        roMacdEl.textContent = `MACD: ${activePredStyle.short} (${activePred.macdAngle >= 0 ? '+' : ''}${activePred.macdAngle.toFixed(0)}° | D:${activePred.distPct.toFixed(0)}%)`;
        roMacdEl.className = `px-1.5 py-0.5 rounded border font-bold text-[10.5px] ${activePredStyle.badgeCls}`;
      }
      TFS.forEach((t) => drawMacdSubChartForTf(t));

      // B. 3-Column Order Flow Matrix
      MATRIX_TFS.forEach((t) => {
        const tc = STATE.candlesByTf[t], ta = STATE.analyticsByTf[t];
        if (!tc.length) return;
        const tLast = tc[tc.length - 1], tCvd = ta.cvdSeries[ta.cvdSeries.length - 1] || 0;
        const dEl = document.getElementById(`matDelta_${t}`);
        dEl.textContent = `${tLast.delta >= 0 ? '+' : ''}${tLast.delta.toFixed(1)}`;
        dEl.className = tLast.delta >= 0 ? 'text-emerald-400' : 'text-rose-400';
        document.getElementById(`matCvd_${t}`).textContent = `${tCvd >= 0 ? '+' : ''}${tCvd.toFixed(1)}`;

        const o = ta.obi;
        document.getElementById(`obiBidBar_${t}`).style.width = `${o.bidPct.toFixed(1)}%`;
        document.getElementById(`obiAskBar_${t}`).style.width = `${o.askPct.toFixed(1)}%`;
        document.getElementById(`obiBidPct_${t}`).textContent = `${o.bidPct.toFixed(0)}%`;
        document.getElementById(`obiAskPct_${t}`).textContent = `${o.askPct.toFixed(0)}%`;
        document.getElementById(`obiBidVol_${t}`).textContent = o.bidVol.toFixed(1);
        document.getElementById(`obiAskVol_${t}`).textContent = o.askVol.toFixed(1);
        const badge = document.getElementById(`obiBadge_${t}`);
        const tag = o.pct > 5 ? 'BULLISH' : o.pct < -5 ? 'BEARISH' : 'NEUTRAL';
        badge.textContent = `${tag} ${o.pct >= 0 ? '+' : ''}${o.pct.toFixed(1)}%`;
        badge.className = `px-1.5 py-0.5 rounded font-bold ${o.pct > 5 ? 'bg-emerald-500/15 text-emerald-300' : o.pct < -5 ? 'bg-rose-500/15 text-rose-300' : 'bg-cyan-500/15 text-cyan-300'}`;
        drawDeltaChartForTf(t);
      });

      // C. 4-Card S/R Summary Grid
      document.getElementById('srCardsGrid').innerHTML = [
        { k: 'R2', z: a.srZones.R2, res: true }, { k: 'R1', z: a.srZones.R1, res: true },
        { k: 'S1', z: a.srZones.S1, res: false }, { k: 'S2', z: a.srZones.S2, res: false },
      ].map(({ k, z, res }) => {
        if (!z) return '';
        const dist = z.price - last.c;
        return `
          <div class="glass-panel rounded-xl p-3 border ${res ? 'border-rose-500/25' : 'border-emerald-500/25'} space-y-1.5 font-mono">
            <div class="flex items-center justify-between text-xs">
              <span class="font-bold ${res ? 'text-rose-400' : 'text-emerald-400'}">${k} · $${z.price.toFixed(0)}</span>
              <span class="px-1.5 py-0.5 rounded text-[10px] ${res ? 'bg-rose-500/15 text-rose-300' : 'bg-emerald-500/15 text-emerald-300'}">${z.strength}%</span>
            </div>
            <div class="flex items-center justify-between text-[11px] text-slate-400">
              <span>${dist >= 0 ? '+' : ''}$${dist.toFixed(0)} away</span>
              <span class="text-slate-300">${z.status} (${z.touches}x)</span>
            </div>
          </div>
        `;
      }).join('');

      // D. Telemetry & Proximity Alert
      const { velocity, accel, nearestZone, etaSec } = STATE.telemetry;
      document.getElementById('pingVal').textContent = `${STATE.pingMs} ms`;
      const velEl = document.getElementById('telVelocity');
      velEl.textContent = `${velocity >= 0 ? '+' : ''}${velocity.toFixed(2)} $/s`;
      velEl.className = `text-sm sm:text-base font-bold font-mono-num mt-0.5 ${velocity >= 0 ? 'text-emerald-400' : 'text-rose-400'}`;
      document.getElementById('telAccel').textContent = `${accel >= 0 ? '+' : ''}${accel.toFixed(2)} $/s²`;
      if (nearestZone) document.getElementById('telNearest').textContent = `${nearestZone.key} ($${nearestZone.absDist.toFixed(0)})`;
      document.getElementById('telEta').textContent = etaSec ? `${etaSec.toFixed(1)}s` : 'MOVING AWAY';

      const alertBanner = document.getElementById('proximityAlertBanner');
      if (nearestZone && etaSec && etaSec < 45 && nearestZone.absDist < STATE.radar.range * 0.45) {
        alertBanner.classList.remove('hidden');
        document.getElementById('proximityAlertText').textContent = `ACCELERATING INTO ${nearestZone.key} ZONE (BREAKOUT RISK)`;
        document.getElementById('proximityAlertZone').textContent = `${nearestZone.key} $${nearestZone.price.toFixed(0)} · ETA ${etaSec.toFixed(1)}s`;
        playSonarPing(false);
      } else {
        alertBanner.classList.add('hidden');
      }

      // Formula Lab Live Tables
      document.getElementById('labBidDepth').textContent = `${STATE.baseObi.bidVol.toFixed(2)} BTC`;
      document.getElementById('labAskDepth').textContent = `${STATE.baseObi.askVol.toFixed(2)} BTC`;
      document.getElementById('labObiLive').textContent = obiStr;
      document.getElementById('labConfTfLabel').textContent = tf;

      document.getElementById('labRsiMacdTable').innerHTML = TFS.map((t) => {
        const ta = STATE.analyticsByTf[t], li = ta.rsiSeries.length - 1;
        const rsi = ta.rsiSeries[li] || 50, m = ta.macdSeries[li] || { macd: 0, signal: 0, hist: 0 };
        return `
          <tr>
            <td class="px-2.5 py-1.5 font-bold text-cyan-300 uppercase">${t}</td>
            <td class="px-2.5 py-1.5 font-bold ${rsi >= STATE.lab.rsiOverbought ? 'text-rose-400' : rsi <= STATE.lab.rsiOversold ? 'text-emerald-400' : 'text-slate-200'}">${rsi.toFixed(1)}</td>
            <td class="px-2.5 py-1.5">${m.macd.toFixed(2)}</td>
            <td class="px-2.5 py-1.5">${m.signal.toFixed(2)}</td>
            <td class="px-2.5 py-1.5 font-bold ${m.hist >= 0 ? 'text-emerald-400' : 'text-rose-400'}">${m.hist >= 0 ? '+' : ''}${m.hist.toFixed(2)}</td>
            <td class="px-2.5 py-1.5 text-[10px] ${ta.divergence === 'BULL DIV' ? 'text-emerald-300' : ta.divergence === 'BEAR DIV' ? 'text-rose-300' : 'text-slate-500'}">${ta.divergence}</td>
          </tr>
        `;
      }).join('');

      const labMacdPredEl = document.getElementById('labMacdPredTable');
      if (labMacdPredEl) {
        labMacdPredEl.innerHTML = TFS.map((t) => {
          const ta = STATE.analyticsByTf[t];
          const pm = ta.macdPredMeta || { macdAngle: 0, sigAngle: 0, distPct: 0, eta: null, state: 'NEUTRAL' };
          const st = getMacdPredStyle(pm.state);
          return `
            <tr>
              <td class="px-2 py-1.5 font-bold text-cyan-300 uppercase">${t}</td>
              <td class="px-2 py-1.5 font-bold ${pm.macdAngle >= 0 ? 'text-cyan-300' : 'text-rose-300'}">${pm.macdAngle >= 0 ? '+' : ''}${pm.macdAngle.toFixed(1)}°</td>
              <td class="px-2 py-1.5 ${pm.sigAngle >= 0 ? 'text-amber-300' : 'text-rose-300'}">${pm.sigAngle >= 0 ? '+' : ''}${pm.sigAngle.toFixed(1)}°</td>
              <td class="px-2 py-1.5 text-slate-200">${pm.distPct.toFixed(1)}%</td>
              <td class="px-2 py-1.5 text-slate-400">${pm.eta !== null ? `~${pm.eta.toFixed(1)}c` : '--'}</td>
              <td class="px-2 py-1.5"><span class="px-1.5 py-0.5 rounded border text-[9.5px] font-bold ${st.badgeCls}">${st.short}</span></td>
            </tr>
          `;
        }).join('');
      }

      const tfTop = STATE.topCandidatesByTf[tf] || [];
      document.getElementById('labConfluenceTable').innerHTML = tfTop.map((c, idx) => {
        const alert = getPatternHistoryAlert(c.id, tf);
        const riskCell = alert.type === 'FAIL_LAST_POINT'
          ? '<span class="px-1.5 py-0.5 rounded bg-rose-500/20 text-amber-300 border border-amber-500/40 text-[9.5px] font-bold">⚠️ LAST-PT FAIL</span>'
          : alert.type === 'WIN'
          ? '<span class="px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 text-[9.5px] font-bold">🏆 WON</span>'
          : '<span class="text-slate-500 text-[9.5px]">CLEAR</span>';
        return `
        <tr class="${idx === 0 ? 'bg-cyan-500/10' : ''}">
          <td class="px-2 py-1.5 font-bold ${idx === 0 ? 'text-cyan-300' : 'text-slate-400'}">${idx === 0 ? '★ #1' : '#' + (idx + 1)}</td>
          <td class="px-2 py-1.5">
            <span class="${c.pattern.dir === 'BULLISH' ? 'text-emerald-400' : 'text-rose-400'} font-bold">${c.id}</span>
            <span class="text-slate-300 ml-1">${c.pattern.name}</span>
          </td>
          <td class="px-2 py-1.5 text-emerald-300">${c.res.passedCount}/${c.res.totalStages}</td>
          <td class="px-2 py-1.5 font-bold text-white">${c.res.overallPct}%</td>
          <td class="px-2 py-1.5">${c.res.srScore}%</td>
          <td class="px-2 py-1.5">${riskCell}</td>
          <td class="px-2 py-1.5 font-bold text-amber-300">${c.res.confluenceScore}</td>
        </tr>
      `;
      }).join('');

      evaluateFutureSignal();
      renderHistoryBadgesAndMiniCard();
      renderHistoryTab();
      renderPatternLibrary();
      drawMainChart();
    }

    /*************************************************************************
     * 12. INTERACTIVE CROSSHAIR, TABS & LAB CONTROLS
     *************************************************************************/
    function setupChartInteraction() {
      const canvas = document.getElementById('mainChartCanvas');
      const tooltip = document.getElementById('chartTooltip');
      const handlePointer = (clientX, clientY) => {
        const candles = STATE.candlesByTf[STATE.timeframe], a = STATE.analyticsByTf[STATE.timeframe];
        if (!candles.length) return;
        const rect = canvas.getBoundingClientRect();
        const x = clientX - rect.left, y = clientY - rect.top;
        const plotW = rect.width - 78;
        const totalDrawW = STATE.layers.vpvr ? plotW * 0.84 : plotW;
        const projectionW = Math.max(58, totalDrawW * 0.14);
        const candleAreaW = totalDrawW - projectionW;
        const idx = Math.floor(((x - 10) / candleAreaW) * candles.length);

        if (idx >= 0 && idx < candles.length) {
          STATE.hoverIndex = idx; STATE.hoverY = y;
          const c = candles[idx], rsi = a.rsiSeries[idx] || 50, m = a.macdSeries[idx] || { hist: 0 };
          const timeStr = new Date(c.t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          tooltip.innerHTML = `
            <div class="flex justify-between text-cyan-300 font-bold border-b border-[#1a2634] pb-1">
              <span>${STATE.timeframe.toUpperCase()} · ${timeStr}</span><span>$${c.c.toFixed(1)}</span>
            </div>
            <div class="grid grid-cols-2 gap-x-3 gap-y-0.5 text-slate-300">
              <span>O: ${c.o.toFixed(1)}</span><span>H: ${c.h.toFixed(1)}</span>
              <span>L: ${c.l.toFixed(1)}</span><span>C: ${c.c.toFixed(1)}</span>
            </div>
            <div class="pt-1 border-t border-[#1a2634] space-y-0.5">
              <div class="flex justify-between"><span class="text-slate-400">Total Vol:</span><span>${c.v.toFixed(2)}</span></div>
              <div class="flex justify-between text-emerald-300"><span>Buy Vol:</span><span>${c.buyVol.toFixed(2)}</span></div>
              <div class="flex justify-between text-rose-300"><span>Sell Vol:</span><span>${c.sellVol.toFixed(2)}</span></div>
              <div class="flex justify-between font-bold ${c.delta >= 0 ? 'text-emerald-400' : 'text-rose-400'}">
                <span>Net Delta:</span><span>${c.delta >= 0 ? '+' : ''}${c.delta.toFixed(2)} (${c.deltaPct.toFixed(0)}%)</span>
              </div>
              <div class="flex justify-between pt-1 border-t border-[#1a2634] text-cyan-300">
                <span>RSI: ${rsi.toFixed(1)}</span><span>MACD: ${m.hist >= 0 ? '+' : ''}${m.hist.toFixed(1)}</span>
              </div>
              ${(() => {
                const ps = (a.macdSignals && a.macdSignals[idx]) ? a.macdSignals[idx] : null;
                if (!ps) return '';
                const pst = getMacdPredStyle(ps.state);
                return `<div class="flex justify-between items-center text-[10px] pt-0.5">
                  <span class="text-slate-400">∠M:${ps.macdAngle >= 0 ? '+' : ''}${ps.macdAngle.toFixed(0)}° ∠S:${ps.sigAngle >= 0 ? '+' : ''}${ps.sigAngle.toFixed(0)}° D:${ps.distPct.toFixed(0)}%</span>
                  <span class="px-1 rounded border font-bold ${pst.badgeCls}">${pst.short}</span>
                </div>`;
              })()}
            </div>
          `;
          tooltip.classList.remove('hidden');
          tooltip.style.left = `${x + 230 > rect.width ? x - 220 : x + 16}px`;
          tooltip.style.top = `${Math.max(8, Math.min(rect.height - 180, y - 20))}px`;
          renderAll();
        }
      };
      canvas.addEventListener('mousemove', (e) => handlePointer(e.clientX, e.clientY));
      canvas.addEventListener('touchmove', (e) => { if (e.touches.length) handlePointer(e.touches[0].clientX, e.touches[0].clientY); }, { passive: true });
      const clearHover = () => { STATE.hoverIndex = -1; STATE.hoverY = -1; tooltip.classList.add('hidden'); renderAll(); };
      canvas.addEventListener('mouseleave', clearHover);
      canvas.addEventListener('touchend', clearHover);
    }

    function switchTab(tab) {
      STATE.activeTab = tab;
      document.getElementById('viewMain').classList.toggle('hidden', tab !== 'main');
      document.getElementById('viewLibrary').classList.toggle('hidden', tab !== 'library');
      document.getElementById('viewHistory').classList.toggle('hidden', tab !== 'history');
      document.getElementById('viewLab').classList.toggle('hidden', tab !== 'lab');

      const activeCls = 'px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all bg-cyan-500/15 text-cyan-300 border border-cyan-500/40';
      const idleCls = 'px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all text-slate-400 hover:text-slate-200 border border-transparent';

      document.getElementById('tabMainBtn').className = tab === 'main' ? activeCls : idleCls;
      document.getElementById('tabLibraryBtn').className = (tab === 'library' ? activeCls : idleCls) + ' flex items-center gap-1.5';
      document.getElementById('tabHistoryBtn').className = (tab === 'history' ? activeCls : idleCls) + ' flex items-center gap-1.5';
      document.getElementById('tabLabBtn').className = tab === 'lab' ? activeCls : idleCls;

      if (tab === 'main') {
        setTimeout(() => { drawMainChart(); MATRIX_TFS.forEach((t) => drawDeltaChartForTf(t)); }, 30);
      } else if (tab === 'library') {
        renderPatternLibrary();
      } else if (tab === 'history') {
        renderHistoryTab();
      }
    }

    function setLibFilter(f) {
      STATE.libFilter = f;
      document.querySelectorAll('.lf-btn').forEach((b) => {
        b.className = b.dataset.lf === f ? 'lf-btn px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 font-bold' : 'lf-btn px-2.5 py-1 rounded text-slate-400 hover:text-white';
      });
      renderPatternLibrary();
    }

    function setTimeframe(tf) {
      STATE.timeframe = tf;
      document.querySelectorAll('.tf-btn').forEach((btn) => {
        btn.className = btn.dataset.tf === tf
          ? 'tf-btn px-2.5 py-1 rounded-md bg-cyan-500/20 text-cyan-300 font-semibold'
          : 'tf-btn px-2.5 py-1 rounded-md text-slate-400 hover:text-white';
      });
      recomputeAllAnalytics();
      renderAll();
    }

    function syncModeButtons() {
      const btnLive = document.getElementById('btnLive'), btnSim = document.getElementById('btnSim');
      if (STATE.mode === 'LIVE') {
        btnLive.className = 'px-2.5 py-1 rounded-md font-semibold text-emerald-400 bg-emerald-500/15';
        btnSim.className = 'px-2.5 py-1 rounded-md font-semibold text-slate-400 hover:text-white';
      } else {
        btnSim.className = 'px-2.5 py-1 rounded-md font-semibold text-amber-400 bg-amber-500/15';
        btnLive.className = 'px-2.5 py-1 rounded-md font-semibold text-slate-400 hover:text-white';
      }
    }

    function updateStatusBadge(text, state = 'warn') {
      const badge = document.getElementById('statusBadge');
      if (!badge) return;
      badge.textContent = text;
      const mode = state === true ? 'live' : state === false ? 'warn' : state;
      const styles = {
        live: 'cursor-pointer font-mono text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 hover:brightness-125 transition',
        partial: 'cursor-pointer font-mono text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-cyan-500/50 bg-cyan-500/15 text-cyan-300 hover:brightness-125 transition',
        warn: 'cursor-pointer font-mono text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-300 hover:brightness-125 transition',
        err: 'cursor-pointer font-mono text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-rose-500/60 bg-rose-500/20 text-rose-300 hover:brightness-125 transition',
      };
      badge.className = styles[mode] || styles.warn;
    }

    function setMode(mode) {
      STATE.mode = mode;
      STATE.manualSimMode = (mode === 'SIMULATION');
      if (mode === 'LIVE') STATE.autoFallbackActive = false;
      syncModeButtons();
      clearTimeout(STATE.liveTimer);
      STATE.liveTimer = null;
      clearTimeout(STATE.autoReconnectTimer);
      STATE.autoReconnectTimer = null;
      clearInterval(STATE.simTimer);
      STATE.simTimer = null;
      stopBinanceWebSocket();
      if (mode === 'LIVE') {
        updateStatusBadge('CONNECTING BINANCE...', 'warn');
        logConnEvent('warn', 'Starting LIVE Binance connection (REST + WebSocket)...');
        fetchBinanceData();
        startBinanceWebSocket();
      } else {
        STATE.lastFailReason = '';
        updateStatusBadge('SIMULATION (MANUAL)', 'warn');
        startSimulationEngine(false);
      }
    }

    function retryConnection() {
      STATE.restRetryCount = 0;
      STATE.wsRetryCount = 0;
      STATE.manualSimMode = false;
      STATE.autoFallbackActive = false;
      setMode('LIVE');
    }

    function startSimulationEngine(isAutoFallback = false) {
      clearTimeout(STATE.liveTimer);
      STATE.liveTimer = null;
      clearInterval(STATE.simTimer);
      STATE.simTimer = null;
      if (!isAutoFallback) STATE.autoFallbackActive = false;
      if (!STATE.candlesByTf['1m'].length) generateInitialSimSeries();
      tickSimulation();
      STATE.simTimer = setInterval(tickSimulation, 1200);
    }

    function toggleSonar() {
      STATE.sonarOn = !STATE.sonarOn;
      const btn = document.getElementById('btnSonar');
      btn.textContent = STATE.sonarOn ? 'SONAR ON' : 'SONAR OFF';
      btn.className = STATE.sonarOn
        ? 'font-mono text-[11px] font-semibold px-2.5 py-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-all'
        : 'font-mono text-[11px] font-semibold px-2.5 py-1.5 rounded-lg border border-slate-700 bg-slate-800/40 text-slate-400 hover:text-white transition-all';
      if (STATE.sonarOn) playSonarPing(false);
    }

    function toggleLayer(layer) {
      STATE.layers[layer] = !STATE.layers[layer];
      const map = {
        vwap: { id: 'togVwap', on: 'border-amber-500/50 bg-amber-500/15 text-amber-300' },
        vpvr: { id: 'togVpvr', on: 'border-emerald-500/50 bg-emerald-500/15 text-emerald-300' },
        candleDelta: { id: 'togDelta', on: 'border-cyan-500/50 bg-cyan-500/15 text-cyan-300' },
        obi: { id: 'togObi', on: 'border-purple-500/50 bg-purple-500/15 text-purple-300' },
        mlSignals: { id: 'togMl', on: 'border-fuchsia-500/50 bg-fuchsia-500/15 text-fuchsia-300' },
        geoPattern: { id: 'togGeo', on: 'border-sky-400/60 bg-sky-500/15 text-sky-300' },
        macdPredict: { id: 'togMacdPred', on: 'border-lime-400/60 bg-lime-500/15 text-lime-300' },
      };
      const cfg = map[layer];
      document.getElementById(cfg.id).className = `px-2.5 py-1 rounded-lg border font-semibold transition ${
        STATE.layers[layer] ? cfg.on : 'border-slate-700 bg-transparent text-slate-500'
      }`;
      drawMainChart();
    }

    function onRadarRangeManual(val) {
      STATE.radar.autoRange = false;
      STATE.radar.range = Number(val);
      document.getElementById('radarRangeVal').textContent = `$${val}`;
      document.getElementById('radarAutoBtn').className = 'px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700';
    }

    function toggleRadarAuto() {
      STATE.radar.autoRange = !STATE.radar.autoRange;
      document.getElementById('radarAutoBtn').className = STATE.radar.autoRange
        ? 'px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
        : 'px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700';
      if (STATE.radar.autoRange) recomputeAllAnalytics();
    }

    function setMacdPreset(fast, slow, sig) {
      STATE.lab.macdFast = fast; STATE.lab.macdSlow = slow; STATE.lab.macdSignal = sig;
      document.querySelectorAll('.macd-pre-btn').forEach((b) => {
        b.className = 'macd-pre-btn px-2 py-1 rounded-md border border-[#1a2634] bg-[#0e161f] text-slate-400 text-[11px]';
      });
      const active = document.getElementById(`macdPre_${fast}_${slow}_${sig}`);
      if (active) active.className = 'macd-pre-btn px-2 py-1 rounded-md border border-cyan-500/50 bg-cyan-500/15 text-cyan-300 text-[11px] font-bold';
      recomputeAllAnalytics(); renderAll();
    }

    function setMacdPredPreset(mode) {
      const presets = {
        scalp: { macdSlopeThresh: 12, macdConvDist: 25, macdDualSlopeThresh: 11, macdSlopeLookback: 1 },
        balanced: { macdSlopeThresh: 18, macdConvDist: 18, macdDualSlopeThresh: 16, macdSlopeLookback: 2 },
        strict: { macdSlopeThresh: 28, macdConvDist: 12, macdDualSlopeThresh: 24, macdSlopeLookback: 3 },
      };
      const p = presets[mode] || presets.balanced;
      Object.assign(STATE.lab, p);
      const map = {
        slMacdSlopeThresh: p.macdSlopeThresh,
        slMacdConvDist: p.macdConvDist,
        slMacdDualSlope: p.macdDualSlopeThresh,
        slMacdSlopeLb: p.macdSlopeLookback,
      };
      Object.entries(map).forEach(([id, v]) => { const el = document.getElementById(id); if (el) el.value = v; });
      document.querySelectorAll('.macd-pred-pre-btn').forEach((b) => {
        b.className = 'macd-pred-pre-btn px-2 py-1 rounded-md border border-[#1a2634] bg-[#0e161f] text-slate-400 text-[11px]';
      });
      const active = document.getElementById(`macdPredPre_${mode}`);
      if (active) active.className = 'macd-pred-pre-btn px-2 py-1 rounded-md border border-lime-500/50 bg-lime-500/15 text-lime-300 text-[11px] font-bold';
      Object.entries(p).forEach(([k, v]) => updateLabParam(k, v));
    }

    function updateLabParam(key, val) {
      STATE.lab[key] = val;
      const fmt = {
        obiDepth: ['valObiDepth', `${val} Levels`],
        obiThreshold: ['valObiThresh', `${val}%`],
        absorptionThreshold: ['valAbsThresh', `${val}%`],
        deltaSensitivity: ['valDeltaSens', `${val}%`],
        vpvrBins: ['valVpvrBins', `${val} Bins`],
        vpvrOpacity: ['valVpvrOpacity', `${val}%`],
        mtfLookback: ['valMtfPeriod', `${val} Candles`],
        rsiPeriod: ['valRsiPeriod', `${val}`],
        rsiOverbought: ['valRsiOB', `${val}`],
        rsiOversold: ['valRsiOS', `${val}`],
        macdSlopeThresh: ['valMacdSlopeThresh', `${val}°`],
        macdConvDist: ['valMacdConvDist', `${val}%`],
        macdDualSlopeThresh: ['valMacdDualSlope', `${val}°`],
        macdSlopeLookback: ['valMacdSlopeLb', `${val} Candles`],
        mlCooldown: ['valMlCooldown', `${val} Candles`],
        mlMinConf: ['valMlMinConf', `${val}%`],
        mlOscWeight: ['valMlOscW', Number(val).toFixed(2)],
        mlFlowWeight: ['valMlFlowW', Number(val).toFixed(2)],
        mlDivBoost: ['valMlDivW', Number(val).toFixed(2)],
        geoMatchThreshold: ['valGeoThresh', `${val}%`],
        geoLookback: ['valGeoPivot', `${val} Candles`],
        cwMatch: ['valCwMatch', `${val}%`],
        cwSr: ['valCwSr', `${val}%`],
        cwFlow: ['valCwFlow', `${val}%`],
      };
      if (fmt[key]) {
        const el = document.getElementById(fmt[key][0]);
        if (el) el.textContent = fmt[key][1];
      }
      recomputeAllAnalytics();
      renderAll();
    }

    function updateSrWeight(key, val) {
      STATE.lab.srWeights[key] = val;
      const idMap = { swing: 'wSwing', vpvr: 'wVpvr', vwap: 'wVwap', walls: 'wWalls', round: 'wRound' };
      document.getElementById(idMap[key]).textContent = `${val}%`;
      recomputeAllAnalytics(); renderAll();
    }

    function resetLabDefaults() {
      Object.assign(STATE.lab, {
        obiDepth: 20, obiThreshold: 18, absorptionThreshold: 35, deltaSensitivity: 25,
        vpvrBins: 28, vpvrOpacity: 55, mtfLookback: 8,
        srWeights: { swing: 25, vpvr: 25, vwap: 20, walls: 20, round: 10 },
        rsiPeriod: 14, rsiOverbought: 70, rsiOversold: 30,
        macdFast: 12, macdSlow: 26, macdSignal: 9,
        macdSlopeThresh: 18, macdConvDist: 18, macdDualSlopeThresh: 16, macdSlopeLookback: 2,
        macdShowImminent: true, macdShowDualTrend: true, macdShowConfirmed: true,
        mlCooldown: 8, mlMinConf: 74, mlOscWeight: 0.40, mlFlowWeight: 0.35, mlDivBoost: 0.25,
        geoMatchThreshold: 70, geoLookback: 28, geoScaleInvariant: true,
        cwMatch: 50, cwSr: 25, cwFlow: 25,
      });
      const sliders = {
        slObiDepth: 20, slObiThresh: 18, slAbsThresh: 35, slDeltaSens: 25, slVpvrBins: 28, slVpvrOpacity: 55,
        slMtfPeriod: 8, slWSwing: 25, slWVpvr: 25, slWVwap: 20, slWWalls: 20, slWRound: 10,
        slRsiPeriod: 14, slRsiOB: 70, slRsiOS: 30,
        slMacdSlopeThresh: 18, slMacdConvDist: 18, slMacdDualSlope: 16, slMacdSlopeLb: 2,
        slMlCooldown: 8, slMlMinConf: 74,
        slMlOscW: 0.40, slMlFlowW: 0.35, slMlDivW: 0.25, slGeoThresh: 70, slGeoPivot: 28,
        slCwMatch: 50, slCwSr: 25, slCwFlow: 25
      };
      Object.entries(sliders).forEach(([id, v]) => { const el = document.getElementById(id); if (el) el.value = v; });
      document.getElementById('chkGeoScaleInv').checked = true;
      ['chkMacdShowImminent', 'chkMacdShowDualTrend', 'chkMacdShowConfirmed'].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.checked = true;
      });

      Object.keys(STATE.lab).forEach((k) => { if (k !== 'srWeights') updateLabParam(k, STATE.lab[k]); });
      ['swing', 'vpvr', 'vwap', 'walls', 'round'].forEach((k) => updateSrWeight(k, STATE.lab.srWeights[k]));
      setMacdPreset(12, 26, 9);
      setMacdPredPreset('balanced');
    }

    window.addEventListener('resize', () => {
      drawMainChart();
      TFS.forEach((t) => drawMacdSubChartForTf(t));
      MATRIX_TFS.forEach((t) => drawDeltaChartForTf(t));
    });

    window.onload = function () {
      loadHistoryFromStorage();
      setupChartInteraction();
      generateInitialSimSeries();
      recomputeAllAnalytics();
      renderAll();
      radarLoop();
      setMode('LIVE');
      // Pull saved history from Google Sheet for future reference & repeat alerts
      fetchPatternHistoryFromGoogleSheet(false);
      // Keep Google Sheet synced every 60s across devices / Google Sites tabs
      setInterval(() => fetchPatternHistoryFromGoogleSheet(false), 60000);
    };
