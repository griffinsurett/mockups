
  lucide.createIcons();

  // ---------- Tweaks state ----------
  const state = Object.assign({}, TWEAK_DEFAULTS);

  function applyTweaks() {
    document.body.dataset.theme = state.theme;
    document.body.dataset.density = state.density;
    document.body.dataset.hero = state.hero;
    // show only the active hero
    document.querySelectorAll('[data-hero-variant]').forEach(el => {
      el.style.display = (el.dataset.heroVariant === state.hero) ? '' : 'none';
    });
    // sync segmented buttons
    document.querySelectorAll('#tweaks .seg').forEach(seg => {
      const k = seg.dataset.tweak;
      seg.querySelectorAll('button').forEach(b => {
        b.classList.toggle('on', b.dataset.val === state[k]);
      });
    });
  }

  function setTweak(key, val) {
    state[key] = val;
    applyTweaks();
    try {
      window.parent.postMessage({type: '__edit_mode_set_keys', edits: {[key]: val}}, '*');
    } catch (e) {}
  }

  document.querySelectorAll('#tweaks .seg').forEach(seg => {
    const k = seg.dataset.tweak;
    seg.addEventListener('click', e => {
      const b = e.target.closest('button[data-val]');
      if (!b) return;
      setTweak(k, b.dataset.val);
    });
  });

  // ---------- Edit-mode wiring (register listener BEFORE announcing) ----------
  const panel = document.getElementById('tweaks');
  const closeBtn = panel.querySelector('.close');

  window.addEventListener('message', (e) => {
    const d = e.data || {};
    if (d.type === '__activate_edit_mode')   panel.classList.add('open');
    if (d.type === '__deactivate_edit_mode') panel.classList.remove('open');
  });
  closeBtn.addEventListener('click', () => {
    panel.classList.remove('open');
    try { window.parent.postMessage({type: '__edit_mode_dismissed'}, '*'); } catch(e) {}
  });
  try { window.parent.postMessage({type: '__edit_mode_available'}, '*'); } catch(e) {}

  // initial paint
  applyTweaks();
