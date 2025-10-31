// ============================
// NAVBAR: Hide on scroll down, show on scroll up
// ============================
let prevScrollPos = window.pageYOffset;
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  const currentScrollPos = window.pageYOffset;

  // Add subtle fade on scroll
  if (prevScrollPos > currentScrollPos) {
    navbar.style.top = "0";
    navbar.style.opacity = "1";
  } else {
    navbar.style.top = "-90px";
    navbar.style.opacity = "0.85";
  }

  prevScrollPos = currentScrollPos;
});

// ============================
// FADE-IN EFFECT ON SCROLL
// ============================
const faders = document.querySelectorAll(".fade-in");
const appearOptions = { threshold: 0.15 };

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach((fader) => appearOnScroll.observe(fader));

// ============================
// PARTICLE BACKGROUND
// ============================
const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");

let particlesArray = [];
const mouse = { x: null, y: null, radius: 100 };

// Mouse interactivity
window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

// Create particle objects
function initParticles() {
  particlesArray = [];
  const numberOfParticles = (canvas.width * canvas.height) / 9000;

  for (let i = 0; i < numberOfParticles; i++) {
    const size = Math.random() * 2 + 1;
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const directionX = (Math.random() - 0.5) * 0.4;
    const directionY = (Math.random() - 0.5) * 0.4;
    const color = "#b043ff"; // Slightly softer neon for better glow
    particlesArray.push({ x, y, directionX, directionY, size, color });
  }
}

// Animate particles
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let p of particlesArray) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();

    // Bounce off walls
    if (p.x + p.size > canvas.width || p.x - p.size < 0) p.directionX = -p.directionX;
    if (p.y + p.size > canvas.height || p.y - p.size < 0) p.directionY = -p.directionY;

    // Move particle
    p.x += p.directionX;
    p.y += p.directionY;
  }

  requestAnimationFrame(animateParticles);
}

// Resize canvas dynamically
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
animateParticles();
