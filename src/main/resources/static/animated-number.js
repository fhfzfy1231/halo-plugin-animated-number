(() => {
  const SELECTOR = 'animated-number';
  const DIGIT_PATTERN = /^\d$/;
  const RANDOM_STEPS = 20;

  function prepare(element) {
    if (element.dataset.animatedNumberReady) return;
    element.dataset.animatedNumberReady = 'true';

    const content = element.getAttribute('content') || element.textContent?.trim() || 'XXXXXX';
    element.textContent = '';
    element.style.fontSize = `${Number(element.getAttribute('fontSize') || 48)}px`;
    element.style.color = element.getAttribute('color') || '#16a34a';
    element.style.fontWeight = element.getAttribute('fontWeight') || '700';
    element.style.textAlign = element.getAttribute('align') || 'center';
    element.style.width = element.getAttribute('width') || '100%';

    Array.from(content).forEach((character, index) => {
      const span = document.createElement('span');
      if (DIGIT_PATTERN.test(character)) {
        span.className = 'animated-number-digit';
        span.dataset.target = character;
        span.dataset.delay = String(Math.min(240, index * 24 + Math.random() * 90));
        span.dataset.sequence = Array.from(
          { length: RANDOM_STEPS },
          () => String(Math.floor(Math.random() * 10))
        ).join('');
        span.textContent = '0';
      } else {
        span.className = 'animated-number-static';
        span.textContent = character;
      }
      element.appendChild(span);
    });
  }

  function animate(element) {
    if (element.dataset.animatedNumberPlayed) return;
    element.dataset.animatedNumberPlayed = 'true';

    const digits = [...element.querySelectorAll('.animated-number-digit')];
    const finish = () => {
      digits.forEach((digit) => {
        digit.textContent = digit.dataset.target || '0';
      });
    };

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      finish();
      return;
    }

    const duration = Math.max(600, Number(element.getAttribute('duration') || 1500));
    const startedAt = Date.now();

    function frame() {
      const elapsed = Date.now() - startedAt;
      let finished = true;

      digits.forEach((digit) => {
        const delay = Number(digit.dataset.delay || 0);
        const localElapsed = Math.max(0, elapsed - delay);
        const localDuration = Math.max(300, duration - delay);
        const progress = Math.min(1, localElapsed / localDuration);

        if (progress < 1) {
          finished = false;
          const sequence = digit.dataset.sequence || '01234567890123456789';
          const step = Math.min(RANDOM_STEPS - 1, Math.floor(progress * RANDOM_STEPS));
          digit.textContent = sequence.charAt(step);
        } else {
          digit.textContent = digit.dataset.target || '0';
        }
      });

      if (!finished) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }

  function init() {
    const elements = [...document.querySelectorAll(SELECTOR)];
    elements.forEach(prepare);

    if (!('IntersectionObserver' in window)) {
      elements.forEach(animate);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animate(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1 });

    elements.forEach((element) => observer.observe(element));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
