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

// 2. Ambient Beacon Flare on Scroll (Controlled & Contained)
function initLightScrollExpansion() {
  const problemSection = document.querySelector(".problem-section");
  const light = document.querySelector(".problem-light");

  if (!problemSection || !light) return;

  function updateLight() {
    const rect = problemSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top <= windowHeight && rect.bottom >= 0) {
      // Progress from 0 (section enters) to 1 (section exits top)
      const progress = Math.min(
        Math.max((windowHeight - rect.top) / (windowHeight + rect.height), 0),
        1
      );

      // Scales ambient halo cleanly from 1x to 4.5x without displacing text
      const scale = (1 + progress * 3.5).toFixed(2);
      const opacity = (0.35 + progress * 0.55).toFixed(2);

      light.style.setProperty("--light-scale", scale);
      light.style.setProperty("--light-opacity", opacity);
    }
  }

  window.addEventListener("scroll", updateLight, { passive: true });
  updateLight();
}

document.addEventListener("DOMContentLoaded", () => {
  initCountUp();
  initLightScrollExpansion();
});
