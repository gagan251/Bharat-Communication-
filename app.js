// Bharat Communication Center - homepage interactions
(() => {
  const revealEls = Array.from(document.querySelectorAll(".reveal"));
  const toast = document.getElementById("toast");
  const startBtn = document.getElementById("startBtn");
  const profileBtn = document.getElementById("profileBtn");
  const art = document.querySelector(".art__card");
  const heroArt = document.getElementById("heroArt");

  // Staggered reveal on load
  function revealIn() {
    revealEls.forEach((el, i) => {
      setTimeout(() => el.classList.add("is-in"), 120 + i * 90);
    });
  }

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => toast.classList.remove("show"), 1600);
  }

  // CTA click ripple-ish + toast (placeholder)
  startBtn?.addEventListener("click", (e) => {
    const btn = e.currentTarget;
    const r = document.createElement("span");
    r.className = "ripple";
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    r.style.left = x + "px";
    r.style.top = y + "px";
    btn.appendChild(r);
    setTimeout(() => r.remove(), 650);

    showToast("Opening Dictation… (connect later)");
  });

  profileBtn?.addEventListener("click", () => {
    showToast("Profile menu (add later)");
  });

  // Micro-interaction: pop quick items on hover (via JS for a tiny extra feel)
  document.querySelectorAll("[data-anim='pop']").forEach((a) => {
    a.addEventListener("mouseenter", () => a.classList.add("pop"));
    a.addEventListener("mouseleave", () => a.classList.remove("pop"));
  });

  // Parallax tilt for hero art
  function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

  function onMove(e) {
    const rect = heroArt.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;   // 0..1
    const py = (e.clientY - rect.top) / rect.height;   // 0..1
    const rx = clamp((0.5 - py) * 10, -8, 8);
    const ry = clamp((px - 0.5) * 12, -10, 10);
    art.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateY(-1px)`;
  }

  function resetTilt() {
    art.style.transform = "rotateX(0deg) rotateY(0deg) translateY(0px)";
  }

  heroArt?.addEventListener("mousemove", onMove);
  heroArt?.addEventListener("mouseleave", resetTilt);

  // Start
  revealIn();
})();

/* Ripple style injected (keeps CSS file cleaner) */
(() => {
  const style = document.createElement("style");
  style.textContent = `
    .cta { position: relative; }
    .ripple{
      position:absolute;
      width: 12px;
      height: 12px;
      border-radius: 999px;
      transform: translate(-50%, -50%);
      background: rgba(255,255,255,.55);
      animation: ripple .65s ease-out forwards;
      pointer-events:none;
      z-index: 0;
    }
    @keyframes ripple{
      from{ opacity: .9; transform: translate(-50%, -50%) scale(1); }
      to{ opacity: 0; transform: translate(-50%, -50%) scale(18); }
    }
    .quick__item.pop{ transform: translateY(-3px) scale(1.02); }
  `;
  document.head.appendChild(style);
})();
