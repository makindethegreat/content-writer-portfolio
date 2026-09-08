// 1. Roll-up Number Counting Animation on Scroll
function initCountUp() {
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
    { threshold: 0.2 }
  );

  metricElements.forEach((el) => observer.observe(el));
}

// 2. Beacon Expanding Glow on Scroll
function initLightScrollExpansion() {
  const problemSection = document.querySelector(".problem-section");
  const light = document.querySelector(".problem-light");

  if (!problemSection || !light) return;

  function handleScroll() {
    const rect = problemSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Trigger continuously while inside the viewport
    if (rect.top <= windowHeight && rect.bottom >= 0) {
      const scrollProgress = (windowHeight - rect.top) / (windowHeight + rect.height);
      const progress = Math.min(Math.max(scrollProgress, 0), 1);

      // Light scales smoothly up to 6.5x with layered expansion
      const scale = 1 + progress * 5.5;
      const glowSpread = 16 + progress * 40;

      light.style.transform = `scale(${scale.toFixed(2)})`;
      light.style.boxShadow = `0 0 ${glowSpread.toFixed(0)}px var(--color-surface), 0 0 ${(glowSpread * 2.5).toFixed(0)}px var(--color-surface)`;
    }
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
}

document.addEventListener("DOMContentLoaded", () => {
  initCountUp();
  initLightScrollExpansion();
});
