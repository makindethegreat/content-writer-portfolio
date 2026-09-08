// Interactive Number Roll-up on Scroll
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
          const duration = 1200; // ms
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
            // Expand Problem Section Light on Scroll
function initLightScrollExpansion() {
  const problemSection = document.querySelector(".problem-section");
  const light = document.querySelector(".problem-light");

  if (!problemSection || !light) return;

  window.addEventListener(
    "scroll",
    () => {
      const rect = problemSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if problem section is within the viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        // Calculate progress from 0 (just entering) to 1 (scrolled past)
        const totalDistance = windowHeight + rect.height;
        const currentProgress = (windowHeight - rect.top) / totalDistance;
        const progress = Math.min(Math.max(currentProgress, 0), 1);

        // Scale factor: grows from 1x up to 7x as you scroll
        const scale = 1 + progress * 6;
        const glowSpread = 16 + progress * 24;

        light.style.transform = `scale(${scale.toFixed(2)})`;
        light.style.boxShadow = `0 0 ${glowSpread.toFixed(0)}px var(--color-surface), 0 0 ${(glowSpread * 2).toFixed(0)}px var(--color-surface)`;
      }
    },
    { passive: true }
  );
}

document.addEventListener("DOMContentLoaded", () => {
  initLightScrollExpansion();
});
          }, stepTime);

          obs.unobserve(el);
        }
      });
    },
    { threshold: 0.3 }
  );

  metricElements.forEach((el) => observer.observe(el));
}

document.addEventListener("DOMContentLoaded", () => {
  animateCountUp();
});
