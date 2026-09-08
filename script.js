// 1. Number Roll-up Animation
function animateCountUp() {
  const metricElements = document.querySelectorAll(".metric-number");
  if (!metricElements.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const targetNum = parseInt(el.getAttribute("data-target"), 10);
          const suffix = el.getAttribute("data-suffix") || "";
          let currentNum = 0;
          const duration = 1200;
          const stepTime = 20;
          const increment = targetNum / (duration / stepTime);

          const timer = setInterval(() => {
            currentNum += increment;
            if (currentNum >= targetNum) {
              el.textContent = targetNum + suffix;
              clearInterval(timer);
            } else {
              el.textContent = Math.floor(currentNum) + suffix;
            }
          }, stepTime);

          obs.unobserve(el);
        }
      });
    },
    { threshold: 0.3 }
  );

  metricElements.forEach((el) => observer.observe(el));
}

// 2. Glowing Beacon Expansion on Scroll
function initLightScrollExpansion() {
  const problemSection = document.querySelector(".problem-section");
  const light = document.querySelector(".problem-light");

  if (!problemSection || !light) return;

  function handleScroll() {
    const rect = problemSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Trigger only when problem-section is inside view
    if (rect.top <= windowHeight && rect.bottom >= 0) {
      // 0 = section just entered bottom of screen, 1 = section reached top
      const progress = Math.min(
        Math.max((windowHeight - rect.top) / (windowHeight + rect.height * 0.5), 0),
        1
      );

      // Scales from 1x up to 7x as you scroll past
      const scale = 1 + progress * 6;
      const glowSpread = 16 + progress * 32;

      light.style.transform = `scale(${scale.toFixed(2)})`;
      light.style.boxShadow = `0 0 ${glowSpread.toFixed(0)}px var(--color-surface), 0 0 ${(glowSpread * 2.5).toFixed(0)}px var(--color-surface)`;
    }
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll(); // Run immediately on load in case user refreshed mid-page
}

document.addEventListener("DOMContentLoaded", () => {
  animateCountUp();
  initLightScrollExpansion();
});
