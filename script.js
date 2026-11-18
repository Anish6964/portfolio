/* ==========================================================================
   ANISH THOTA — NEO-BRUTALIST MOTION ENGINE
   Blueprint Grid Field · Hero Packet Conveyor · Kinetic Marquee · 4-Tab Stage
   ========================================================================== */

(function () {
  'use strict';

  const EMAIL = 'anishthota96@gmail.com';
  const REDUCED_MOTION =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const CHAPTER_META = [
    {
      hudLeft: 'CH 01 // SHA-256 DEDUPE GATE',
      hudRight: '1,000+ TXNS/DAY · 5 STATES',
      metrics: 'HASH VERIFIED · ZERO DUPLICATE ROWS · UTC LOCKED',
      accent: '#B8F348'
    },
    {
      hudLeft: 'CH 02 // MONTE CARLO ROUTING ENGINE',
      hudRight: '50,000 TRIALS · 30D BIN HISTORY',
      metrics: 'READ-REPLICA ISOLATED · 95% CI LOCKED · GATE: READY',
      accent: '#6AD2FF'
    },
    {
      hudLeft: 'CH 03 // MILLICENT BILLING LEDGER',
      hudRight: '$1 = 1,000 INTEGER UNITS',
      metrics: 'DRIFT: 0.000000 · SANDBOX EXCLUDED · CYCLE LOCKED',
      accent: '#FFD23F'
    },
    {
      hudLeft: 'CH 04 // 5-GATEWAY TELEMETRY MONITOR',
      hudRight: 'UTC WINDOW · NOISE FILTERED',
      metrics: 'RECOVERY TRACKED · HMAC VERIFIED · 8-ROLE ISOLATION',
      accent: '#FF6B4A'
    }
  ];

  let currentTheme = 'light';
  let lenisInstance = null;
  let scrollVelocity = 0;
  let scrollYPos = 0;
  let pointerX = -999;
  let pointerY = -999;
  let redrawGrid = null;
  let redrawMachine = null;
  let redrawStage = null;

  /* -------------------- 1. Light / Dark Risograph Theme Toggle -------------------- */
  const root = document.documentElement;
  const themeBtn = document.getElementById('theme-toggle');
  const themeLabel = document.getElementById('theme-label');

  function applyTheme(theme) {
    currentTheme = theme === 'dark' ? 'dark' : 'light';
    root.setAttribute('data-theme', currentTheme);
    if (themeLabel) {
      themeLabel.textContent = currentTheme === 'light' ? 'Dark' : 'Light';
    }
    try {
      localStorage.setItem('at-theme', currentTheme);
    } catch (_) {}
    if (REDUCED_MOTION) {
      if (redrawGrid) redrawGrid();
      if (redrawMachine) redrawMachine();
      if (redrawStage) redrawStage();
    }
  }

  (function initTheme() {
    let saved = null;
    try {
      saved = localStorage.getItem('at-theme');
    } catch (_) {}
    applyTheme(saved === 'dark' || saved === 'light' ? saved : 'light');
  })();

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      applyTheme(currentTheme === 'light' ? 'dark' : 'light');
    });
  }

  /* -------------------- 2. Tactile Copy Email Checkmark -------------------- */
  function wireCopy(btn) {
    if (!btn) return;
    let timer = null;
    const label = btn.querySelector('.copy-label');

    function showDone() {
      btn.classList.add('copied');
      if (label) label.textContent = 'Copied!';
      clearTimeout(timer);
      timer = setTimeout(() => {
        btn.classList.remove('copied');
        if (label) label.textContent = EMAIL;
      }, 1800);
    }

    btn.addEventListener('click', () => {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(EMAIL).then(showDone).catch(() => fallbackCopy(EMAIL, showDone));
      } else {
        fallbackCopy(EMAIL, showDone);
      }
    });
  }

  function fallbackCopy(str, cb) {
    const ta = document.createElement('textarea');
    ta.value = str;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      cb();
    } catch (_) {
      window.location.href = 'mailto:' + EMAIL;
    }
    document.body.removeChild(ta);
  }

  wireCopy(document.getElementById('copy-email'));
  wireCopy(document.getElementById('copy-email-footer'));

  /* -------------------- 3. Smooth Anchor Navigation -------------------- */
  document.querySelectorAll('.nav-item[href^="#"], .brand-lockup[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      if (lenisInstance) {
        lenisInstance.scrollTo(target, { offset: -12 });
      } else {
        target.scrollIntoView({ behavior: REDUCED_MOTION ? 'auto' : 'smooth' });
      }
    });
  });

  window.addEventListener('pointermove', (e) => {
    pointerX = e.clientX;
    pointerY = e.clientY;
  }, { passive: true });

  /* -------------------- 4. Motion 1: Interactive Blueprint Grid Field -------------------- */
  function initBlueprintGrid() {
    const bgCanvas = document.getElementById('bg-grid-canvas');
    if (!bgCanvas || !bgCanvas.getContext) return;
    const ctx = bgCanvas.getContext('2d');
    let vw = window.innerWidth;
    let vh = window.innerHeight;

    function resize() {
      vw = window.innerWidth;
      vh = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      bgCanvas.width = Math.round(vw * dpr);
      bgCanvas.height = Math.round(vh * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw() {
      const dark = currentTheme === 'dark';
      ctx.clearRect(0, 0, vw, vh);

      const spacing = 56;
      const offsetY = -(scrollYPos * 0.2) % spacing;

      for (let gx = spacing * 0.5; gx < vw; gx += spacing) {
        for (let gy = offsetY; gy < vh + spacing; gy += spacing) {
          const dx = pointerX - gx;
          const dy = pointerY - gy;
          const dist = Math.hypot(dx, dy);
          const influence = Math.max(0, 1 - dist / 190);
          const angle = REDUCED_MOTION ? 0 : Math.atan2(dy, dx) * influence * 0.65;
          const arm = 4 + influence * 2.5;

          ctx.save();
          ctx.translate(gx, gy);
          ctx.rotate(angle);
          ctx.strokeStyle = influence > 0.2
            ? '#FF6B4A'
            : (dark ? 'rgba(247, 243, 232, 0.12)' : 'rgba(20, 20, 19, 0.12)');
          ctx.globalAlpha = influence > 0.2 ? 0.3 + influence * 0.45 : 1;
          ctx.lineWidth = influence > 0.2 ? 1.5 : 1.1;

          ctx.beginPath();
          ctx.moveTo(-arm, 0);
          ctx.lineTo(arm, 0);
          ctx.moveTo(0, -arm);
          ctx.lineTo(0, arm);
          ctx.stroke();
          ctx.restore();
        }
      }

      if (!REDUCED_MOTION) {
        requestAnimationFrame(draw);
      }
    }

    redrawGrid = draw;
    window.addEventListener('resize', () => {
      resize();
      if (REDUCED_MOTION) draw();
    });
    resize();
    draw();
  }

  /* -------------------- 5. Motion 2: Hero Live Packet Conveyor Machine -------------------- */
  function initHeroMachine() {
    const canvas = document.getElementById('hero-machine');
    const statsEl = document.getElementById('machine-stats');
    if (!canvas || !canvas.getContext) return;

    const ctx = canvas.getContext('2d');
    let w = 460;
    let h = 270;
    let blocks = [];
    let ejected = [];
    let stamps = { api: 0, sha: 0, router: 0, db: 0 };
    let seq = 0;
    let committed = 128;
    let dropped = 16;
    let lastSpawn = 0;
    let visible = true;
    let rafId = null;

    function updateStats() {
      if (statsEl) {
        statsEl.textContent = 'COMMITTED: ' + committed + ' · RETRIES DROPPED: ' + dropped;
      }
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width) return;
      w = rect.width;
      h = rect.height || 270;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function spawnBlock(forceClean) {
      seq++;
      const isRetry = !forceClean && seq % 6 === 0;
      const colors = ['#6AD2FF', '#B8F348', '#FFD23F', '#FFA6DC'];
      blocks.push({
        x: 34,
        y: h * 0.56,
        isRetry: isRetry,
        color: isRetry ? '#FF6B4A' : colors[seq % colors.length],
        stamped: false,
        routed: false,
        speed: isRetry ? 1.9 : 1.75
      });
      stamps.api = 1;
    }

    function drawStation(x, y, bw, bh, fill, label, sub, pulse, ink, shadow) {
      const s = 1 + pulse * 0.1;
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, 2 - s);

      ctx.fillStyle = shadow;
      ctx.fillRect(-bw / 2 + 3, -bh / 2 + 3, bw, bh);

      ctx.fillStyle = fill;
      ctx.strokeStyle = ink;
      ctx.lineWidth = 2;
      ctx.fillRect(-bw / 2, -bh / 2, bw, bh);
      ctx.strokeRect(-bw / 2, -bh / 2, bw, bh);

      ctx.fillStyle = '#141413';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const labelSize = Math.max(8.5, Math.min(10.5, bw * 0.16));
      const subSize = Math.max(7.2, Math.min(9, bw * 0.13));
      ctx.font = '700 ' + labelSize.toFixed(1) + 'px "Space Mono", monospace';
      ctx.fillText(label, 0, -bh * 0.14);
      ctx.font = '400 ' + subSize.toFixed(1) + 'px "Space Mono", monospace';
      ctx.fillText(sub, 0, bh * 0.22);
      ctx.restore();
    }

    function render(ms) {
      const dark = currentTheme === 'dark';
      const ink = dark ? '#F7F3E8' : '#141413';
      const shadow = dark ? '#000000' : '#141413';
      const bg = dark ? '#181A20' : '#FFFDF8';
      const track = dark ? '#2B2E38' : '#EFE9D8';
      const t = REDUCED_MOTION ? 0 : ms * 0.001;

      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      const railY = h * 0.56;
      const stations = [
        { x: w * 0.14, label: 'API', sub: 'Ingress', fill: '#6AD2FF', key: 'api' },
        { x: w * 0.39, label: 'SHA-256', sub: 'Dedupe', fill: '#FFD23F', key: 'sha' },
        { x: w * 0.64, label: 'ROUTER', sub: '50k Sim', fill: '#B8F348', key: 'router' },
        { x: w * 0.87, label: 'DB', sub: 'Postgres', fill: '#FFA6DC', key: 'db' }
      ];

      // Conveyor belt rails + rolling belt notches
      ctx.fillStyle = track;
      ctx.fillRect(22, railY - 8, w - 44, 16);
      ctx.strokeStyle = ink;
      ctx.lineWidth = 2;
      ctx.strokeRect(22, railY - 8, w - 44, 16);

      ctx.strokeStyle = dark ? 'rgba(247,243,232,0.22)' : 'rgba(20,20,19,0.22)';
      ctx.lineWidth = 1.5;
      const beltShift = (t * 42) % 24;
      for (let bx = 28 + beltShift; bx < w - 26; bx += 24) {
        ctx.beginPath();
        ctx.moveTo(bx, railY - 8);
        ctx.lineTo(bx - 5, railY + 8);
        ctx.stroke();
      }

      // Eject bin indicator above SHA-256
      ctx.fillStyle = dark ? '#C8C4B8' : '#383734';
      ctx.font = '700 9.5px "Space Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('RETRY EJECT ↑', stations[1].x, h * 0.16);

      if (!REDUCED_MOTION && ms - lastSpawn > 850) {
        spawnBlock(false);
        lastSpawn = ms;
      }

      // Decay station bounce pulses
      Object.keys(stamps).forEach((k) => {
        stamps[k] *= 0.86;
      });

      // Update & draw conveyor blocks
      const nextBlocks = [];
      for (let i = 0; i < blocks.length; i++) {
        const b = blocks[i];
        b.x += REDUCED_MOTION ? 0 : b.speed * (w / 440);

        if (!b.stamped && b.x >= stations[1].x) {
          b.stamped = true;
          stamps.sha = 1;
          if (b.isRetry) {
            dropped++;
            updateStats();
            ejected.push({
              x: stations[1].x,
              y: railY - 12,
              vx: (Math.random() - 0.5) * 1.6,
              vy: -3.2,
              rot: 0,
              vr: (Math.random() > 0.5 ? 1 : -1) * 0.12,
              alpha: 1,
              color: b.color
            });
            continue;
          }
        }

        if (!b.routed && b.x >= stations[2].x) {
          b.routed = true;
          stamps.router = 1;
        }

        if (b.x >= stations[3].x) {
          stamps.db = 1;
          committed++;
          updateStats();
          continue;
        }

        // Chunky hard-outlined packet cube
        ctx.fillStyle = shadow;
        ctx.fillRect(b.x - 7, b.y - 7, 16, 16);
        ctx.fillStyle = b.color;
        ctx.strokeStyle = ink;
        ctx.lineWidth = 2;
        ctx.fillRect(b.x - 10, b.y - 10, 16, 16);
        ctx.strokeRect(b.x - 10, b.y - 10, 16, 16);
        nextBlocks.push(b);
      }
      blocks = nextBlocks;

      // Ejected duplicate retry blocks
      const nextEj = [];
      for (let i = 0; i < ejected.length; i++) {
        const e = ejected[i];
        e.x += e.vx;
        e.y += e.vy;
        e.vy += 0.08;
        e.rot += e.vr;
        e.alpha -= 0.024;
        if (e.alpha <= 0) continue;

        ctx.save();
        ctx.globalAlpha = e.alpha;
        ctx.translate(e.x, e.y);
        ctx.rotate(e.rot);
        ctx.fillStyle = e.color;
        ctx.strokeStyle = ink;
        ctx.lineWidth = 2;
        ctx.fillRect(-7, -7, 14, 14);
        ctx.strokeRect(-7, -7, 14, 14);
        ctx.restore();
        nextEj.push(e);
      }
      ejected = nextEj;

      // Draw stations on top of conveyor track (proportional to canvas width)
      const bw = Math.min(72, Math.max(46, (w - 44) / 4.4));
      const bh = Math.min(44, Math.max(34, bw * 0.62));
      stations.forEach((st) => {
        drawStation(st.x, railY - bh - 6, bw, bh, st.fill, st.label, st.sub, stamps[st.key], ink, shadow);
        ctx.strokeStyle = ink;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(st.x, railY - 6);
        ctx.lineTo(st.x, railY + 2);
        ctx.stroke();
      });

      if (!REDUCED_MOTION && visible) {
        rafId = requestAnimationFrame(render);
      } else {
        rafId = null;
      }
    }

    function triggerBurst() {
      if (REDUCED_MOTION) return;
      for (let i = 0; i < 6; i++) {
        setTimeout(() => spawnBlock(i !== 2), i * 85);
      }
    }

    canvas.addEventListener('click', triggerBurst);
    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      triggerBurst();
    }, { passive: false });

    redrawMachine = () => render(0);
    window.addEventListener('resize', () => {
      resize();
      if (REDUCED_MOTION) render(0);
    });

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        visible = entries[0].isIntersecting;
        if (visible && !rafId && !REDUCED_MOTION) {
          rafId = requestAnimationFrame(render);
        }
      }, { threshold: 0.05 });
      io.observe(canvas);
    }

    resize();
    spawnBlock(true);
    if (REDUCED_MOTION) {
      blocks[0].x = w * 0.52;
      render(0);
    } else {
      rafId = requestAnimationFrame(render);
    }
  }

  /* -------------------- 6. Motion 3: Scroll-Velocity Kinetic Marquee -------------------- */
  function initKineticMarquee() {
    const track = document.getElementById('marquee-track');
    if (!track || REDUCED_MOTION) return;

    let offset = 0;
    let smoothVel = 0;

    function step() {
      const singleW = track.scrollWidth / 3;
      smoothVel += (scrollVelocity - smoothVel) * 0.08;
      offset -= 0.75 + Math.max(-4, Math.min(4, smoothVel * 0.14));
      if (singleW > 0) {
        offset = ((offset % singleW) + singleW) % singleW - singleW;
      }
      track.style.transform = 'translate3d(' + offset.toFixed(1) + 'px, 0, 0)';
      requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  /* -------------------- 7. Motion 4: 4-Tab Neo-Brutalist Folder Stage -------------------- */
  const folderSection = document.getElementById('systems');
  const stageCanvas = document.getElementById('stage-canvas');
  const progressFillEl = document.getElementById('stage-progress-fill');
  const hudLeftEl = document.getElementById('stage-hud-left');
  const hudRightEl = document.getElementById('stage-hud-right');
  const hudDotEl = document.getElementById('hud-dot');
  const metricsEl = document.getElementById('stage-metrics');
  const folderTabs = Array.from(document.querySelectorAll('.folder-tab'));
  const chapterPanels = Array.from(document.querySelectorAll('.chapter-panel'));

  let stageProgress = 0;
  let activeChapter = -1;

  function setChapterUI(idx) {
    const meta = CHAPTER_META[idx] || CHAPTER_META[0];
    if (hudDotEl) hudDotEl.style.backgroundColor = meta.accent;
    if (progressFillEl) progressFillEl.style.backgroundColor = meta.accent;

    if (idx === activeChapter) return;
    activeChapter = idx;

    folderTabs.forEach((tab, i) => tab.classList.toggle('active', i === idx));
    chapterPanels.forEach((panel, i) => panel.classList.toggle('active', i === idx));

    if (hudLeftEl) hudLeftEl.textContent = meta.hudLeft;
    if (hudRightEl) hudRightEl.textContent = meta.hudRight;
    if (metricsEl) metricsEl.textContent = meta.metrics;
  }

  folderTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const idx = parseInt(tab.getAttribute('data-chapter'), 10);
      if (isNaN(idx)) return;

      const isMobile = window.innerWidth <= 900;
      if (isMobile || REDUCED_MOTION) {
        stageProgress = idx * 0.25 + 0.05;
        setChapterUI(idx);
        if (redrawStage) redrawStage();
        return;
      }

      if (folderSection) {
        const maxSpan = Math.max(1, folderSection.offsetHeight - window.innerHeight);
        const destY = folderSection.offsetTop + maxSpan * ((idx + 0.5) * 0.25);
        if (lenisInstance) {
          lenisInstance.scrollTo(destY);
        } else {
          window.scrollTo({ top: destY, behavior: 'smooth' });
        }
      }
    });
  });

  // Native touch swipe navigation on the folder board for mobile & tablet
  const folderBoardEl = document.querySelector('.folder-board');
  if (folderBoardEl) {
    let touchStartX = 0;
    let touchStartY = 0;
    folderBoardEl.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    folderBoardEl.addEventListener('touchend', (e) => {
      if (window.innerWidth > 900 || !e.changedTouches || e.changedTouches.length !== 1) return;
      const diffX = e.changedTouches[0].clientX - touchStartX;
      const diffY = e.changedTouches[0].clientY - touchStartY;
      if (Math.abs(diffX) > 42 && Math.abs(diffX) > Math.abs(diffY)) {
        const current = activeChapter >= 0 ? activeChapter : 0;
        if (diffX < 0) {
          // Swipe left -> advance to next chapter
          const next = (current + 1) % 4;
          stageProgress = next * 0.25 + 0.05;
          setChapterUI(next);
          if (redrawStage) redrawStage();
        } else {
          // Swipe right -> return to previous chapter
          const prev = (current - 1 + 4) % 4;
          stageProgress = prev * 0.25 + 0.05;
          setChapterUI(prev);
          if (redrawStage) redrawStage();
        }
      }
    }, { passive: true });
  }

  function initStageCanvas() {
    if (!stageCanvas || !stageCanvas.getContext) return;
    const ctx = stageCanvas.getContext('2d');
    let cw = 520;
    let ch = 316;
    let visible = true;
    let rafId = null;
    let currentScene = 0;
    let prevScene = -1;
    let slideStartMs = -1;
    let slideDir = 1;
    const SLIDE_MS = 200;

    const BINS = 18;
    const histA = [];
    const histB = [];
    for (let i = 0; i < BINS; i++) {
      const x = (i - (BINS - 1) * 0.5) / (BINS * 0.24);
      histA.push(Math.exp(-0.5 * (x - 0.5) * (x - 0.5)));
      histB.push(Math.exp(-0.5 * (x + 0.45) * (x + 0.45)) * 0.8);
    }

    function getPal() {
      const dark = currentTheme === 'dark';
      return {
        bg: dark ? '#121317' : '#F7F3E8',
        surface: dark ? '#1C1E24' : '#FFFDF8',
        alt: dark ? '#242730' : '#EFE9D8',
        ink: dark ? '#F7F3E8' : '#141413',
        shadow: dark ? '#000000' : '#141413',
        grid: dark ? 'rgba(247, 243, 232, 0.07)' : 'rgba(20, 20, 19, 0.07)',
        lime: '#B8F348',
        sky: '#6AD2FF',
        yellow: '#FFD23F',
        coral: '#FF6B4A',
        pink: '#FFA6DC'
      };
    }

    function resize() {
      const r = stageCanvas.getBoundingClientRect();
      if (!r.width) return;
      cw = r.width;
      ch = r.height || 316;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      stageCanvas.width = Math.round(cw * dpr);
      stageCanvas.height = Math.round(ch * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function hardBox(x, y, w, h, fill, pal, dx, dy) {
      const ox = dx === undefined ? 3 : dx;
      const oy = dy === undefined ? 3 : dy;
      ctx.fillStyle = pal.shadow;
      ctx.fillRect(x + ox, y + oy, w, h);
      ctx.fillStyle = fill;
      ctx.strokeStyle = pal.ink;
      ctx.lineWidth = 2;
      ctx.fillRect(x, y, w, h);
      ctx.strokeRect(x, y, w, h);
    }

    function drawBgGrid(pal) {
      ctx.strokeStyle = pal.grid;
      ctx.lineWidth = 1;
      for (let x = 24; x < cw; x += 36) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, ch);
        ctx.stroke();
      }
      for (let y = 24; y < ch; y += 36) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(cw, y);
        ctx.stroke();
      }
    }

    /* Scene 01: Settlement Recon Conveyor + Chunky SHA-256 Gate */
    function sceneRecon(alpha, t, pal) {
      ctx.save();
      ctx.globalAlpha = alpha;
      const isCompact = cw < 480;
      const cx = isCompact ? cw * 0.42 : cw * 0.46;
      const cy = ch * 0.5;
      const r = Math.min(cw, ch) * (isCompact ? 0.15 : 0.17);
      const endLineX = isCompact ? cw * 0.72 : cw - 116;

      for (let i = 0; i < 5; i++) {
        const ly = ch * (0.18 + i * 0.16);
        const dup = i === 1;
        ctx.strokeStyle = pal.ink;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(16, ly);
        ctx.lineTo(dup ? cx - r - 8 : endLineX, ly);
        ctx.stroke();

        const ph = (t * (0.36 + i * 0.04) + i * 0.21) % 1;
        if (dup) {
          const px = 16 + ph * (cx - r - 20);
          hardBox(px - 5, ly - 5, 10, 10, pal.coral, pal, 1.5, 1.5);
        } else {
          const px = 16 + ph * (endLineX - 22);
          hardBox(px - 5, ly - 5, 10, 10, i === 3 && ph < 0.4 ? pal.yellow : pal.lime, pal, 1.5, 1.5);
        }
      }

      // Rotating thick octagonal gate
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t * 0.4);
      ctx.fillStyle = pal.shadow;
      ctx.beginPath();
      for (let s = 0; s < 8; s++) {
        const a = (s / 8) * Math.PI * 2;
        if (s === 0) ctx.moveTo(Math.cos(a) * r + 3, Math.sin(a) * r + 3);
        else ctx.lineTo(Math.cos(a) * r + 3, Math.sin(a) * r + 3);
      }
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = pal.yellow;
      ctx.strokeStyle = pal.ink;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let s = 0; s < 8; s++) {
        const a = (s / 8) * Math.PI * 2;
        if (s === 0) ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r);
        else ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      ctx.fillStyle = '#141413';
      ctx.textAlign = 'center';
      ctx.font = '700 ' + (isCompact ? '9px' : '10.5px') + ' "Space Mono", monospace';
      ctx.fillText('SHA-256', cx, cy + 3);

      // Postgres Matrix
      const cols = isCompact ? 3 : 4;
      const cellW = isCompact ? 11 : 14;
      const colStep = isCompact ? 15 : 20;
      const rowStep = isCompact ? 22 : 28;
      const gx = cw - (cols * colStep) - (isCompact ? 8 : 22);
      const gy = ch * 0.18;
      for (let row = 0; row < 5; row++) {
        for (let col = 0; col < cols; col++) {
          const lit = ((Math.floor(t * 3.5) + row * 3 + col) % 6) !== 0;
          hardBox(gx + col * colStep, gy + row * rowStep - 5, cellW, cellW, lit ? pal.lime : pal.alt, pal, 1.5, 1.5);
        }
      }
      ctx.restore();
    }

    /* Scene 02: 50k Monte Carlo Split Histograms */
    function sceneMonteCarlo(alpha, t, pal) {
      ctx.save();
      ctx.globalAlpha = alpha;
      const isCompact = cw < 480;
      const splitX = isCompact ? cw * 0.2 : cw * 0.25;
      const cy = ch * 0.5;

      ctx.strokeStyle = pal.ink;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(16, cy);
      ctx.lineTo(splitX, cy);
      ctx.lineTo(cw * (isCompact ? 0.38 : 0.42), ch * 0.28);
      ctx.moveTo(splitX, cy);
      ctx.lineTo(cw * (isCompact ? 0.38 : 0.42), ch * 0.72);
      ctx.stroke();

      for (let k = 0; k < 8; k++) {
        const p = (t * 0.55 + k / 8) % 1;
        const topBranch = k % 3 !== 0;
        let px, py;
        const endX = cw * (isCompact ? 0.38 : 0.42);
        if (p < 0.4) {
          const u = p / 0.4;
          px = 16 + (splitX - 16) * u;
          py = cy;
        } else {
          const u = (p - 0.4) / 0.6;
          px = splitX + (endX - splitX) * u;
          py = cy + ((topBranch ? ch * 0.28 : ch * 0.72) - cy) * u;
        }
        hardBox(px - 4, py - 4, 8, 8, topBranch ? pal.sky : pal.pink, pal, 1.5, 1.5);
      }

      const splitBoxW = isCompact ? 38 : 48;
      const splitBoxH = isCompact ? 26 : 34;
      hardBox(splitX - splitBoxW / 2, cy - splitBoxH / 2, splitBoxW, splitBoxH, pal.sky, pal, 2, 2);
      ctx.fillStyle = '#141413';
      ctx.textAlign = 'center';
      ctx.font = '700 ' + (isCompact ? '8.5px' : '10px') + ' "Space Mono", monospace';
      ctx.fillText('70/30', splitX, cy + (isCompact ? 3 : 4));

      const cx0 = isCompact ? cw * 0.42 : cw * 0.46;
      const chartW = cw - cx0 - (isCompact ? 12 : 24);
      const baseLineY = ch * 0.8;
      const maxH = ch * 0.54;
      const stepW = chartW / BINS;
      const barW = Math.max(3.5, stepW * 0.68);
      const wave = 0.88 + Math.sin(t * 1.5) * 0.08;

      for (let i = 0; i < BINS; i++) {
        const bx = cx0 + i * stepW;
        const h1 = histA[i] * maxH * wave;
        const h2 = histB[i] * maxH * wave * 0.7;
        hardBox(bx, baseLineY - h2, barW, h2, pal.pink, pal, 1.5, 1.5);
        hardBox(bx + 1.5, baseLineY - h1, barW * 0.78, h1, pal.sky, pal, 1.5, 1.5);
      }

      ctx.strokeStyle = pal.ink;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx0 - 4, baseLineY);
      ctx.lineTo(cx0 + chartW + 4, baseLineY);
      ctx.stroke();

      const badgeW = isCompact ? Math.min(140, chartW * 0.95) : 178;
      const badgeH = isCompact ? 20 : 24;
      const badgeX = cx0 + (chartW - badgeW) / 2;
      hardBox(badgeX, ch * 0.08, badgeW, badgeH, pal.yellow, pal, 2, 2);
      ctx.fillStyle = '#141413';
      ctx.textAlign = 'center';
      ctx.font = '700 ' + (isCompact ? '8px' : '10px') + ' "Space Mono", monospace';
      ctx.fillText(isCompact ? '95% CI · 50k TRIALS' : '95% CI · 50,000 TRIALS', badgeX + badgeW / 2, ch * 0.08 + (isCompact ? 13 : 15));
      ctx.restore();
    }

    /* Scene 03: Millicent Billing Stepper & Sticker Invoice */
    function sceneBilling(alpha, t, pal) {
      ctx.save();
      ctx.globalAlpha = alpha;
      const isCompact = cw < 480;

      const cx = isCompact ? cw * 0.22 : cw * 0.27;
      const cy = ch * 0.5;
      const R = Math.min(cw * (isCompact ? 0.16 : 0.22), ch * (isCompact ? 0.25 : 0.28));

      ctx.fillStyle = pal.shadow;
      ctx.beginPath();
      ctx.arc(cx + 3, cy + 3, R, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = pal.surface;
      ctx.strokeStyle = pal.ink;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      for (let i = 0; i < 24; i++) {
        const ang = (i / 24) * Math.PI * 2 - Math.PI * 0.5;
        const lit = i <= ((t * 10) % 24);
        ctx.strokeStyle = lit ? pal.coral : pal.ink;
        ctx.lineWidth = lit ? (isCompact ? 2.5 : 3.5) : 1.5;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(ang) * (R - (isCompact ? 8 : 14)), cy + Math.sin(ang) * (R - (isCompact ? 8 : 14)));
        ctx.lineTo(cx + Math.cos(ang) * (R - 3), cy + Math.sin(ang) * (R - 3));
        ctx.stroke();
      }

      const badgeW = isCompact ? 68 : 84;
      const badgeH = isCompact ? 24 : 32;
      hardBox(cx - badgeW / 2, cy - badgeH / 2, badgeW, badgeH, pal.yellow, pal, 2, 2);
      ctx.fillStyle = '#141413';
      ctx.textAlign = 'center';
      ctx.font = '700 ' + (isCompact ? '9px' : '10.5px') + ' "Space Mono", monospace';
      ctx.fillText('$1=1000', cx, cy + (isCompact ? 3 : 4));

      const dx = isCompact ? cx + R + 12 : cw * 0.52;
      const dy = ch * 0.1;
      const dw = Math.max(140, cw - dx - (isCompact ? 10 : 20));
      const dh = ch * 0.8;
      hardBox(dx, dy, dw, dh, pal.surface, pal, 4, 4);
      hardBox(dx, dy, dw, isCompact ? 26 : 32, pal.yellow, pal, 0, 0);

      ctx.fillStyle = '#141413';
      ctx.textAlign = 'left';
      ctx.font = '700 ' + (isCompact ? '8.5px' : '10px') + ' "Space Mono", monospace';
      ctx.fillText(isCompact ? 'INVOICE // EXACT' : 'INVOICE DRAFT // EXACT', dx + (isCompact ? 8 : 12), dy + (isCompact ? 16 : 20));

      const rows = isCompact
        ? [
            { k: 'TIER 1', v: '482.5k u', col: pal.lime },
            { k: 'TIER 2', v: '267.5k u', col: pal.sky },
            { k: 'TAX', v: '38.2k u', col: pal.pink },
            { k: 'DRIFT', v: '0.000', col: pal.yellow }
          ]
        : [
            { k: 'TIER 1 ROLLUP', v: '482,500 u', col: pal.lime },
            { k: 'TIER 2 VOLUME', v: '267,500 u', col: pal.sky },
            { k: 'TAX LEDGER', v: '038,250 u', col: pal.pink },
            { k: 'FLOAT DRIFT', v: '0.000000', col: pal.yellow }
          ];

      const rowGap = isCompact ? (dh - 34) / 4 : 40;
      rows.forEach((rw, idx) => {
        const ry = dy + (isCompact ? 40 : 54) + idx * rowGap;
        ctx.fillStyle = pal.ink;
        ctx.font = '700 ' + (isCompact ? '8.5px' : '10px') + ' "Space Mono", monospace';
        ctx.textAlign = 'left';
        ctx.fillText(rw.k, dx + (isCompact ? 8 : 12), ry);
        ctx.textAlign = 'right';
        ctx.fillText(rw.v, dx + dw - (isCompact ? 8 : 12), ry);
        hardBox(dx + (isCompact ? 8 : 12), ry + 5, (dw - (isCompact ? 16 : 24)) * 0.72, isCompact ? 6 : 9, rw.col, pal, 1.5, 1.5);
      });
      ctx.restore();
    }

    /* Scene 04: 5-Gateway Outage Monitor */
    function scenePulse(alpha, t, pal) {
      ctx.save();
      ctx.globalAlpha = alpha;
      const isCompact = cw < 480;
      const lp = isCompact ? 40 : 56;
      const pw = cw - lp - (isCompact ? 12 : 24);

      // Yellow quiet-hour band
      const bandY = ch * 0.65;
      hardBox(lp, bandY, pw, ch * 0.2, pal.yellow, pal, 2, 2);
      ctx.fillStyle = '#141413';
      ctx.font = '700 ' + (isCompact ? '8px' : '9.5px') + ' "Space Mono", monospace';
      ctx.textAlign = 'left';
      ctx.fillText(isCompact ? 'QUIET-HOUR NOISE FILTERED' : 'QUIET-HOUR NOISE SUPPRESSED', lp + 8, bandY + (isCompact ? 15 : 20));

      const ys = [0.18, 0.3, 0.42, 0.52, 0.6];
      const gwCols = [pal.lime, pal.sky, pal.coral, pal.ink, pal.ink];
      const dip = (t * 0.16) % 1;

      for (let g = 0; g < 5; g++) {
        const y0 = ch * ys[g];
        const deg = g === 2;
        ctx.beginPath();
        for (let sx = 0; sx <= pw; sx += 4) {
          const nx = sx / pw;
          let wy = y0 + Math.sin(nx * 13 - t * 2.4 + g) * (isCompact ? 3.5 : 5);
          if (deg) {
            const d = Math.abs(nx - dip);
            if (d < 0.14) {
              const bell = Math.cos((d / 0.14) * Math.PI * 0.5);
              wy += bell * bell * (ch * 0.25);
            }
          }
          if (sx === 0) ctx.moveTo(lp + sx, wy);
          else ctx.lineTo(lp + sx, wy);
        }
        ctx.strokeStyle = gwCols[g];
        ctx.lineWidth = deg ? (isCompact ? 2.5 : 3) : (isCompact ? 1.5 : 2);
        ctx.stroke();

        ctx.fillStyle = deg ? pal.coral : pal.ink;
        ctx.textAlign = 'right';
        ctx.font = '700 ' + (isCompact ? '8px' : '9px') + ' "Space Mono", monospace';
        ctx.fillText('G' + (g + 1), lp - 6, y0 + 3);
      }

      const rx = lp + dip * pw;
      const ry = ch * ys[2] + ch * 0.23;
      hardBox(rx - 8, ry - 8, 16, 16, pal.coral, pal, 1.5, 1.5);
      ctx.restore();
    }

    function render(ms) {
      const t = REDUCED_MOTION ? 0 : ms * 0.001;
      const pal = getPal();
      ctx.fillStyle = pal.bg;
      ctx.fillRect(0, 0, cw, ch);
      drawBgGrid(pal);

      const idx = Math.min(3, Math.max(0, Math.floor(stageProgress * 4)));

      setChapterUI(idx);
      if (progressFillEl) {
        progressFillEl.style.height = (Math.min(1, Math.max(0.08, stageProgress)) * 100).toFixed(1) + '%';
      }

      if (idx !== currentScene) {
        prevScene = currentScene;
        currentScene = idx;
        slideDir = idx > prevScene ? 1 : -1;
        slideStartMs = REDUCED_MOTION ? -1 : ms;
      }

      const scenes = [sceneRecon, sceneMonteCarlo, sceneBilling, scenePulse];
      const elapsed = slideStartMs >= 0 ? ms - slideStartMs : SLIDE_MS;

      if (prevScene >= 0 && elapsed < SLIDE_MS && !REDUCED_MOTION) {
        const p = Math.min(1, Math.max(0, elapsed / SLIDE_MS));
        const u = 1 - Math.pow(1 - p, 3);
        const outX = -slideDir * u * cw;
        const inX = slideDir * (1 - u) * cw;

        ctx.save();
        ctx.translate(outX, 0);
        scenes[prevScene](1, t, pal);
        ctx.restore();

        ctx.save();
        ctx.translate(inX, 0);
        ctx.fillStyle = pal.bg;
        ctx.fillRect(0, 0, cw, ch);
        drawBgGrid(pal);
        scenes[currentScene](1, t, pal);
        ctx.restore();

        const seamX = slideDir > 0 ? inX : outX + cw;
        ctx.strokeStyle = pal.ink;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(seamX, 0);
        ctx.lineTo(seamX, ch);
        ctx.stroke();
      } else {
        slideStartMs = -1;
        scenes[currentScene](1, t, pal);
      }

      if (!REDUCED_MOTION && visible) {
        rafId = requestAnimationFrame(render);
      } else {
        rafId = null;
      }
    }

    redrawStage = () => render(0);
    window.addEventListener('resize', () => {
      resize();
      if (REDUCED_MOTION) render(0);
    });

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        visible = entries[0].isIntersecting;
        if (visible && !rafId && !REDUCED_MOTION) {
          rafId = requestAnimationFrame(render);
        }
      }, { threshold: 0.02 });
      io.observe(stageCanvas);
    }

    resize();
    render(0);
  }

  /* -------------------- 8. Master Lenis + GSAP Initialization -------------------- */
  window.addEventListener('DOMContentLoaded', () => {
    initBlueprintGrid();
    initHeroMachine();
    initKineticMarquee();
    initStageCanvas();

    function updateNativeProgress() {
      scrollYPos = window.scrollY || 0;
      if (!folderSection) return;
      const rect = folderSection.getBoundingClientRect();
      const total = Math.max(1, folderSection.offsetHeight - window.innerHeight);
      stageProgress = Math.min(1, Math.max(0, -rect.top / total));
    }

    if (REDUCED_MOTION) return;

    const hasGSAP = typeof window.gsap !== 'undefined';
    const hasST = typeof window.ScrollTrigger !== 'undefined';
    const hasLenis = typeof window.Lenis !== 'undefined';

    if (hasLenis) {
      lenisInstance = new window.Lenis({
        lerp: 0.16,
        wheelMultiplier: 1.15,
        smoothWheel: true
      });
      lenisInstance.on('scroll', (e) => {
        scrollVelocity = e.velocity || 0;
        scrollYPos = e.scroll || window.scrollY || 0;
        if (hasST) {
          window.ScrollTrigger.update();
        } else {
          updateNativeProgress();
        }
      });
      if (!hasGSAP) {
        (function rafLenis(t) {
          lenisInstance.raf(t);
          requestAnimationFrame(rafLenis);
        })(performance.now());
      }
    } else {
      window.addEventListener('scroll', () => {
        if (!hasST) updateNativeProgress();
        else scrollYPos = window.scrollY || 0;
      }, { passive: true });
    }

    if (hasGSAP) {
      const gsap = window.gsap;
      if (hasST) gsap.registerPlugin(window.ScrollTrigger);

      if (lenisInstance) {
        gsap.ticker.add((time) => {
          lenisInstance.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
      }

      const heroItems = document.querySelectorAll('[data-hero-anim]');
      if (heroItems.length) {
        gsap.from(heroItems, {
          y: 16,
          opacity: 0,
          duration: 0.55,
          stagger: 0.06,
          ease: 'power3.out',
          clearProps: 'transform,opacity'
        });
      }

      if (hasST) {
        if (folderSection) {
          window.ScrollTrigger.create({
            trigger: folderSection,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.18,
            onUpdate: (self) => {
              if (window.innerWidth > 900) {
                stageProgress = self.progress;
              }
            }
          });
        }

        document.querySelectorAll('[data-stamp-reveal]').forEach((card) => {
          gsap.from(card, {
            y: 22,
            rotation: -0.7,
            opacity: 0,
            duration: 0.52,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              once: true
            }
          });
        });
      }
    }

    let resizeTimer = null;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (typeof window.ScrollTrigger !== 'undefined') {
          window.ScrollTrigger.refresh();
        }
        if (redrawGrid) redrawGrid();
        if (redrawMachine) redrawMachine();
        if (redrawStage) redrawStage();
      }, 120);
    });
  });
})();
