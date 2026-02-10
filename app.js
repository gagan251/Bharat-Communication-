// Mobile Menu Toggle
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn?.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(isOpen));

  // animate burger to X
  const bars = menuBtn.querySelectorAll("span");
  if (isOpen) {
    bars[0].style.transform = "translateY(7px) rotate(45deg)";
    bars[1].style.opacity = "0";
    bars[2].style.transform = "translateY(-7px) rotate(-45deg)";
  } else {
    bars[0].style.transform = "";
    bars[1].style.opacity = "";
    bars[2].style.transform = "";
  }
});

// Close mobile menu on link click
document.querySelectorAll(".m-link").forEach(a => {
  a.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    const bars = menuBtn.querySelectorAll("span");
    bars[0].style.transform = "";
    bars[1].style.opacity = "";
    bars[2].style.transform = "";
  });
});

// Reveal on scroll
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("show");
  });
}, { threshold: 0.15 });

revealEls.forEach(el => io.observe(el));

// Simple count-up stats (Hero)
function animateCount(el, to) {
  const start = 0;
  const duration = 900;
  const t0 = performance.now();

  function tick(t) {
    const p = Math.min((t - t0) / duration, 1);
    const val = Math.floor(start + (to - start) * (p * (2 - p)));
    el.textContent = val;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const statNums = document.querySelectorAll(".stat-num[data-count]");
let counted = false;
const hero = document.getElementById("home");

const heroObs = new IntersectionObserver((entries) => {
  if (counted) return;
  entries.forEach(e => {
    if (e.isIntersecting) {
      counted = true;
      statNums.forEach(n => animateCount(n, Number(n.dataset.count || 0)));
    }
  });
}, { threshold: 0.3 });

if (hero) heroObs.observe(hero);

// 3D tilt on hero card
const tiltCard = document.getElementById("tiltCard");
if (tiltCard) {
  const maxTilt = 10;

  tiltCard.addEventListener("mousemove", (e) => {
    const rect = tiltCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const px = (x / rect.width) - 0.5;
    const py = (y / rect.height) - 0.5;

    const rotY = px * maxTilt * 2;
    const rotX = -py * maxTilt * 2;

    tiltCard.style.transform =
      `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-2px)`;
  });

  tiltCard.addEventListener("mouseleave", () => {
    tiltCard.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  });
}

// Coming soon button
const notifyBtn = document.getElementById("notifyBtn");
notifyBtn?.addEventListener("click", () => {
  alert("✅ Thanks! We will notify you when courses are launched.");
});

// Contact form (demo)
const form = document.getElementById("contactForm");
const hint = document.getElementById("formHint");

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  hint.textContent = "✅ Message saved (demo). Connect backend later.";
  form.reset();
  setTimeout(() => (hint.textContent = ""), 3500);
});

