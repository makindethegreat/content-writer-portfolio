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
      {
        name: "Google",
        mark: '<svg viewBox="0 0 48 48" role="img" aria-label="Google"><path fill="#4285F4" d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.7c3.9-3.6 6-8.9 6-15Z"/><path fill="#34A853" d="M24 44c5.5 0 10.1-1.8 13.5-4.8l-6.7-5.1c-1.8 1.2-4 1.9-6.8 1.9-5.2 0-9.6-3.5-11.2-8.2H5.9v5.3A20 20 0 0 0 24 44Z"/><path fill="#FBBC05" d="M12.8 27.8a12 12 0 0 1 0-7.6v-5.3H5.9a20 20 0 0 0 0 18.2l6.9-5.3Z"/><path fill="#EA4335" d="M24 12c3 0 5.7 1 7.8 3.1l5.9-5.9C34.1 5.8 29.5 4 24 4A20 20 0 0 0 5.9 14.9l6.9 5.3C14.4 15.5 18.8 12 24 12Z"/></svg>'
      },
      { name: "ChatGPT", src: "/assets/images/platform-chatgpt-custom.png" },
      { name: "Perplexity", src: "/assets/images/platform-perplexity-custom.png" },
      {
        name: "Gemini",
        mark: '<svg viewBox="0 0 48 48" role="img" aria-label="Gemini"><defs><linearGradient id="vevnit-gemini-gradient" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4285F4"/><stop offset=".48" stop-color="#9B72CB"/><stop offset="1" stop-color="#D96570"/></linearGradient></defs><path fill="url(#vevnit-gemini-gradient)" d="M24 2C21.6 13.2 15.2 19.6 4 22c11.2 2.4 17.6 8.8 20 20 2.4-11.2 8.8-17.6 20-20C32.8 19.6 26.4 13.2 24 2Z"/></svg>'
      },
      { name: "Claude", src: "/assets/images/platform-claude-custom.png" }
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
