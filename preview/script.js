document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector("#primary-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      toggle.querySelector("span").textContent = open ? "+" : "−";
      menu.classList.toggle("is-open", !open);
    });
    menu.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      toggle.querySelector("span").textContent = "+";
      menu.classList.remove("is-open");
    }));
  }
});