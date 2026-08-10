(function () {
  const OPEN_ATTR = 'data-modal-open';
  const CLOSE_ATTR = 'data-modal-close';
  let lastFocused = null;

  function openModal(id) {
    const overlay = document.getElementById(id);
    if (!overlay) return;
    lastFocused = document.activeElement;
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const focusable = overlay.querySelector('input,textarea,button,[href]');
    focusable && focusable.focus();
  }

  function closeModal(overlay) {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lastFocused && lastFocused.focus();
  }

  document.addEventListener('click', (e) => {
    const opener = e.target.closest(`[${OPEN_ATTR}]`);
    if (opener) {
      e.preventDefault();
      openModal(opener.getAttribute(OPEN_ATTR));
    }

    const closer = e.target.closest(`[${CLOSE_ATTR}]`);
    if (closer) closeModal(closer.closest('.modal-overlay'));

    if (e.target.classList.contains('modal-overlay')) closeModal(e.target);
  });

  document.addEventListener('keydown', (e) => {
    const open = document.querySelector('.modal-overlay.open');
    if (!open) return;

    if (e.key === 'Escape') closeModal(open);

    if (e.key === 'Tab') {
      const focusables = open.querySelectorAll('input,textarea,button,[href]');
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
})();
