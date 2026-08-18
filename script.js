document.querySelectorAll('.grid div').forEach((c,i)=>{
  c.style.opacity=0;
  setTimeout(()=>{
    c.style.transition='0.6s';
    c.style.opacity=1;
  },i*150);
});

/* Auto-scroll halaman setelah 2 detik tanpa aktivitas user. */
(function () {
  const IDLE_DELAY = 2000;     // 2 detik
  const SCROLL_STEP = 1;       // kecepatan turun (px per interval)
  const SCROLL_INTERVAL = 25;  // makin kecil = makin cepat
  const TOP_PAUSE = 120;       // jeda sangat singkat setelah kembali ke atas

  let idleTimer = null;
  let scrollTimer = null;
  let autoScrolling = false;
  let returningToTop = false;

  function stopAutoScroll() {
    if (scrollTimer !== null) {
      clearInterval(scrollTimer);
      scrollTimer = null;
    }
    autoScrolling = false;
  }

  function scheduleAutoScroll() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(startAutoScroll, IDLE_DELAY);
  }

  function startAutoScroll() {
    if (autoScrolling || returningToTop) return;

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) return;

    autoScrolling = true;

    scrollTimer = setInterval(() => {
      const max = document.documentElement.scrollHeight - window.innerHeight;

      if (window.scrollY >= max - 2) {
        clearInterval(scrollTimer);
        scrollTimer = null;
        autoScrolling = false;
        returningToTop = true;

        // Kembali cepat/langsung ke bagian paling atas.
        window.scrollTo(0, 0);

        setTimeout(() => {
          returningToTop = false;
          startAutoScroll();
        }, TOP_PAUSE);

        return;
      }

      window.scrollBy(0, SCROLL_STEP);
    }, SCROLL_INTERVAL);
  }

  // Aktivitas nyata dari user menghentikan auto-scroll.
  const userEvents = [
    'mousemove',
    'mousedown',
    'mouseup',
    'wheel',
    'touchstart',
    'touchmove',
    'keydown',
    'pointerdown',
    'pointermove'
  ];

  userEvents.forEach(eventName => {
    window.addEventListener(eventName, () => {
      stopAutoScroll();
      returningToTop = false;
      scheduleAutoScroll();
    }, { passive: true });
  });

  document.addEventListener('click', () => {
    stopAutoScroll();
    returningToTop = false;
    scheduleAutoScroll();
  });

  // Mulai menghitung 2 detik sejak halaman dibuka.
  scheduleAutoScroll();
})();
