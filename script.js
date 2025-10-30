// Navbar hide on scroll down, show on scroll up
let prevScrollPos = window.pageYOffset;
const navbar = document.getElementById("navbar");

window.onscroll = () => {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollPos > currentScrollPos) {
    navbar.style.top = "0";
  } else {
    navbar.style.top = "-80px";
  }
  prevScrollPos = currentScrollPos;
};

// Fade-in elements on scroll
const faders = document.querySelectorAll(".fade-in");
const appearOptions = { threshold: 0.1 };

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));

// Particle animation
const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");

let particlesArray;
let mouse = { x: null, y: null, radius: 100 };

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

function initParticles() {
  particlesArray = [];
  const numberOfParticles = (canvas.width * canvas.height) / 9000;
  for (let i = 0; i < numberOfParticles; i++) {
    const size = Math.random() * 2 + 1;
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const directionX = Math.random() * 0.5 - 0.25;
    const directionY = Math.random() * 0.5 - 0.25;
    const color = "#a020f0";
    particlesArray.push({ x, y, directionX, directionY, size, color });
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let p of particlesArray) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2, false);
    ctx.fillStyle = p.color;
    ctx.fill();

    if (p.x + p.size > canvas.width || p.x - p.size < 0) p.directionX = -p.directionX;
    if (p.y + p.size > canvas.height || p.y - p.size < 0) p.directionY = -p.directionY;
    p.x += p.directionX;
    p.y += p.directionY;
  }
  requestAnimationFrame(animateParticles);
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
animateParticles();
