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
