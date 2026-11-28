document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector("#primary-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      toggle.setAttribute("aria-label", open ? "Open navigation menu" : "Close navigation menu");
      menu.classList.toggle("is-open", !open);
    });
    menu.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation menu");
      menu.classList.remove("is-open");
    }));
  }

  // Vevnit article inline conversion CTA\n  // Article inline CTA: copy and destination are selected by editorial funnel stage.
  const articleCta = document.querySelector("[data-article-cta]");
  if (articleCta) {
    const articleStage = (articleCta.dataset.stage || "tofu").toLowerCase();
    const articleCopy = {
      tofu: {headline:"Your content should be doing more.",description:"Let's find the gaps between what your product offers and what your buyers need to see before making a decision.",button:"Explore what we do",href:"/work-with-me/"},
      mofu: {headline:"Turn your content into a growth system.",description:"Strategy, execution and discoverability built around your product, audience and commercial objectives.",button:"Discuss your content strategy",href:"mailto:makindegbenga00@gmail.com?subject=Vevnit%20content%20strategy%20enquiry"},
      bofu: {headline:"Need a content partner who understands the product?",description:"Let's build the content engine behind your growth.",button:"Book a free call",href:"mailto:makindegbenga00@gmail.com?subject=Vevnit%20project%20enquiry"}
    };
    const selected = articleCopy[articleStage] || articleCopy.tofu;
    articleCta.querySelector(".cms-article-cta__headline").textContent = selected.headline;
    articleCta.querySelector(".cms-article-cta__description").textContent = selected.description;
    const primary = articleCta.querySelector(".cms-article-cta__button");
    primary.textContent = selected.button + " ↗";
    primary.href = selected.href;
    const secondary = articleCta.querySelector(".cms-article-cta__secondary");
    const trackInline = eventName => {
      const payload = {event:eventName,cta_stage:articleStage,cta_page:window.location.pathname};
      if(window.dataLayer && Array.isArray(window.dataLayer)) window.dataLayer.push(payload);
      window.dispatchEvent(new CustomEvent("vevnit:article-cta",{detail:payload}));
    };
    trackInline("article_cta_view");
    primary.addEventListener("click",()=>trackInline("article_cta_click"));
    secondary.addEventListener("click",()=>trackInline("article_cta_secondary_click"));
  }
\n  // Vevnit sticky conversion CTA
  const stickyCta = document.querySelector("[data-sticky-cta]");
  if (stickyCta) {
    const stage = document.body.classList.contains("vevnit-home") ? "home" : (stickyCta.dataset.stage || "tofu").toLowerCase();
    const ctaCopy = {
      home: {headline:"Your product deserves better content.",description:"Let's build the content engine behind your growth.",button:"Book free call",href:"mailto:makindegbenga00@gmail.com?subject=Vevnit%20project%20enquiry"},
      tofu: {headline:"Your content should be doing more.",description:"Let's find the gaps between content and growth.",button:"Explore what we can do",href:"/work-with-me/"},
      mofu: {headline:"Turn product differentiation into buyer-decision content.",description:"Let's build a strategy around your business.",button:"Discuss your strategy",href:"mailto:makindegbenga00@gmail.com?subject=Vevnit%20content%20strategy%20enquiry"},
      bofu: {headline:"Your content engine needs the right partner.",description:"Let's build the content engine behind your growth.",button:"Book free call",href:"mailto:makindegbenga00@gmail.com?subject=Vevnit%20project%20enquiry"}
    };
    const copy = ctaCopy[stage] || ctaCopy.tofu;
    stickyCta.querySelector(".vevnit-sticky-cta__headline").textContent = copy.headline;
    stickyCta.querySelector(".vevnit-sticky-cta__description").textContent = copy.description;
    const ctaLink = stickyCta.querySelector(".vevnit-sticky-cta__button");
    ctaLink.textContent = copy.button + " ↗";
    ctaLink.href = copy.href;
    const storageKey = "vevnit-sticky-cta-dismissed";
    const isDismissed = () => { try { return sessionStorage.getItem(storageKey) === "1"; } catch (_) { return false; } };
    const track = (eventName) => {
      const payload = {event:eventName,cta_stage:stage,cta_page:window.location.pathname};
      if (window.dataLayer && Array.isArray(window.dataLayer)) window.dataLayer.push(payload);
      window.dispatchEvent(new CustomEvent("vevnit:sticky-cta",{detail:payload}));
    };
    let trackedView = false;
    const show = () => {
      if (isDismissed()) return;
      stickyCta.classList.add("is-visible");
      stickyCta.setAttribute("aria-hidden","false");
      if (!trackedView) { trackedView=true; track("sticky_cta_view"); }
    };
    const hide = () => { stickyCta.classList.remove("is-visible"); stickyCta.setAttribute("aria-hidden","true"); };
    const threshold = stage === "home" ? 0.20 : 0.30;
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      if (progress >= threshold) show(); else hide();
    };
    stickyCta.querySelector(".vevnit-sticky-cta__close").addEventListener("click", () => {
      hide();
      try { sessionStorage.setItem(storageKey,"1"); } catch (_) {}
      track("sticky_cta_dismiss");
    });
    ctaLink.addEventListener("click", () => track("sticky_cta_click"));
    if (!isDismissed()) { window.addEventListener("scroll",onScroll,{passive:true}); onScroll(); }
  }
});