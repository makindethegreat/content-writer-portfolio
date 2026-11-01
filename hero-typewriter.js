/* Vevnit homepage inline platform typewriter.
   Text uses Atkinson Hyperlegible through the existing hero slot styles.
   Supplied PNGs are transparent assets in /assets/images/. */
(() => {
  const init = () => {
    const word = document.querySelector(".hero-dynamic-word");
    const logo = document.querySelector(".hero-dynamic-logo");
    if (!word || !logo) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = [
      { name: "Google", src: "/content-writer-portfolio/assets/images/platform-google.webp" },
      { name: "ChatGPT", src: "/content-writer-portfolio/assets/images/platform-chatgpt-custom.png" },
      { name: "Perplexity", src: "/content-writer-portfolio/assets/images/platform-perplexity-custom.png" },
      { name: "Gemini", src: "/content-writer-portfolio/assets/images/platform-gemini.webp" },
      { name: "Claude", src: "/content-writer-portfolio/assets/images/platform-claude-custom.png" }
    ];

    const wait = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));

    const showMark = (item) => {
      logo.replaceChildren();

      if (item.src) {
        const image = document.createElement("img");
        image.src = item.src;
        image.alt = "";
        image.width = 142;
        image.height = 142;
        image.decoding = "async";
        image.draggable = false;
        logo.appendChild(image);
      } else {
        logo.innerHTML = item.mark;
      }

      window.requestAnimationFrame(() => logo.classList.add("is-visible"));
    };

    const animate = async () => {
      let index = 0;

      if (reducedMotion) {
        const initial = items[0];
        word.textContent = initial.name;
        showMark(initial);
        return;
      }

      while (true) {
        const item = items[index];

        // Reset the previous platform without changing the reserved slot width.
        logo.classList.remove("is-visible");
        await wait(220);
        word.textContent = "";

        // Type the platform name, then reveal its mark inline.
        for (const character of item.name) {
          word.textContent += character;
          await wait(92);
        }

        showMark(item);
        await wait(2500);

        // Fade the mark, erase the word, and proceed to the next platform.
        logo.classList.remove("is-visible");
        await wait(320);
        while (word.textContent.length > 0) {
          word.textContent = word.textContent.slice(0, -1);
          await wait(45);
        }

        await wait(180);
        index = (index + 1) % items.length;
      }
    };

    animate();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
