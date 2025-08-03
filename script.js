// Data Initialization
const ytThumbnails = [
  'https://i.postimg.cc/rpvfy8XB/1.png',
  'https://i.postimg.cc/MHY5YVMw/2.png',
  'https://i.postimg.cc/bJk3sKqs/3.png',
  'https://i.postimg.cc/qqrQnj7Q/4.png',
  'https://i.postimg.cc/8kdZDQyY/5.png',
  'https://i.postimg.cc/ZKTV5725/6.png',
  'https://i.postimg.cc/RVXG61xQ/7.png',
  'https://i.postimg.cc/RZhdc3Mr/8.png',
  'https://i.postimg.cc/7ZRVXx65/9.png'
];

const banners = [
  'https://i.postimg.cc/VkkGDGWV/Black-And-Gold-Modern-Launching-Soon-Instagram-Post.png',
  'https://i.postimg.cc/X73Dy7G3/Black-and-White-Greeting-Friendship-Day-Postcard.png',
  'https://i.postimg.cc/FsZCb53S/Black-and-Yellow-Modern-Farewell-Party-Invitation-Landscape.png',
  'https://i.postimg.cc/kGN1hLHk/Brown-and-Pink-Watercolor-Flower-shop-Flyer.png',
  'https://i.postimg.cc/Pf1Rx8q2/Green-and-Blue-India-Independence-Day-Instagram-Post-1.png',
  'https://i.postimg.cc/kGPYs7TQ/Red-And-Purple-Bold-Summer-Party-Flyer.png',
  'https://i.postimg.cc/0Nr42W6w/Traditional-Green-and-Gold-Indian-Wedding-Invitation.png',
  'https://i.postimg.cc/bwmMPcvP/Yellow-and-Black-Gradient-Vintage-Nag-Panchami-Greeting-Poster.png',
  'https://i.postimg.cc/3Rvb2kFr/Yellow-and-Green-Traditional-Janmashtami-Festival-Poster.png'
];

const logos = [
  'https://i.postimg.cc/j5Fk7z7F/Black-and-Gold-Elegant-Luxury-Flower-Jewelry-Logo.png',
  'https://i.postimg.cc/gjLtqnyk/Black-and-White-Square-Home-Interior-Design-Logo.png',
  'https://i.postimg.cc/y84tjXbq/Black-and-White-Vintage-Illustrative-Weights-Health-and-Fitness-Logo.png',
  'https://i.postimg.cc/zfpQJmX5/Black-Gold-Elegant-Jewelry-Logo.png',
  'https://i.postimg.cc/KzzHj9RT/Black-White-Bold-Simple-Initials-Name-Logo.png',
  'https://i.postimg.cc/FF62dQbH/Black-White-Minimalist-Modern-Aesthetic-Initials-Font-Logo.png',
  'https://i.postimg.cc/jSH9FwpD/Dark-Green-Henna-Art-Business-Logo.png',
  'https://i.postimg.cc/JhRgV78P/Grey-Brown-Circle-Floral-Initial-Wedding-Logo.png'
];

// Mobile Detection
function isMobileDevice() {
  return /Mobi|Android/i.test(navigator.userAgent);
}

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const canvas = document.getElementById("hero-canvas");

  if (isMobileDevice()) {
    if (canvas) canvas.style.display = "none";
  } else {
    initHero3D();
  }

  // Theme Detection and Toggle
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");

  function detectSystemTheme() {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
      body.classList.add("light-mode");
      themeIcon.textContent = "🌙";
      return "light";
    } else {
      body.classList.remove("light-mode");
      themeIcon.textContent = "☀️";
      return "dark";
    }
  }

  let savedTheme = localStorage.getItem("theme");
  if (!savedTheme) {
    savedTheme = detectSystemTheme();
    localStorage.setItem("theme", savedTheme);
  } else {
    if (savedTheme === "light") {
      body.classList.add("light-mode");
      themeIcon.textContent = "🌙";
    } else {
      body.classList.remove("light-mode");
      themeIcon.textContent = "☀️";
    }
  }

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("light-mode");
    const isLight = body.classList.contains("light-mode");
    localStorage.setItem("theme", isLight ? "light" : "dark");
    themeIcon.textContent = isLight ? "🌙" : "☀️";
  });

  // Typewriter Effect
  const typewriterText = "Expert Photo Editor • Video Editor • Creative Designer";
  const typewriterElement = document.querySelector(".typewriter");
  let charIndex = 0;
  function typeWriter() {
    if (charIndex < typewriterText.length) {
      typewriterElement.textContent += typewriterText.charAt(charIndex);
      charIndex++;
      setTimeout(typeWriter, 100);
    }
  }
  typeWriter();

  // GSAP Animations
  gsap.registerPlugin(ScrollTrigger);
  gsap.from(".cta-btn", { opacity: 0, y: 50, duration: 1, delay: 1.5 });
  document.querySelectorAll(".portfolio-section").forEach(section => {
    gsap.from(section, {
      scrollTrigger: { trigger: section, start: "top 80%" },
      opacity: 0, y: 50, duration: 1
    });
  });

  // Skills Progress Bars
  const skillsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll(".skill-card").forEach(card => {
          const fill = card.querySelector(".progress-fill");
          const value = card.dataset.skill;
          fill.style.width = `${value}%`;
        });
        skillsObserver.unobserve(entry.target);
      }
    });
  });
  skillsObserver.observe(document.getElementById("skills"));

  // Load Galleries
  function loadGallery(id, imgs) {
    const grid = document.getElementById(id);
    imgs.forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      img.className = "gallery-img";
      img.loading = "lazy";
      img.alt = "Portfolio Item";
      img.onclick = () => window.openModal(src, false); // Fixed: Use window.openModal
      grid.appendChild(img);
    });
  }
  loadGallery("yt-thumbnails", ytThumbnails);
  loadGallery("banners", banners);
  loadGallery("logos", logos);

  // Contact Canvas (Particles)
  if (!isMobileDevice()) {
    const contactCanvas = document.getElementById("contact-canvas");
    if (contactCanvas) {
      const ctx = contactCanvas.getContext("2d");
      contactCanvas.width = contactCanvas.offsetWidth;
      contactCanvas.height = contactCanvas.offsetHeight;

      class Particle {
        constructor() {
          this.x = Math.random() * contactCanvas.width;
          this.y = Math.random() * contactCanvas.height;
          this.vx = (Math.random() - 0.5) * 2;
          this.vy = (Math.random() - 0.5) * 2;
          this.radius = Math.random() * 2 + 1;
        }

        draw() {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          ctx.fillStyle = document.body.classList.contains("light-mode") ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.5)";
          ctx.fill();
        }

        update() {
          this.x += this.vx;
          this.y += this.vy;
          if (this.x < 0 || this.x > contactCanvas.width) this.vx *= -1;
          if (this.y < 0 || this.y > contactCanvas.height) this.vy *= -1;
        }
      }

      let particles = [];
      for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
      }

      function animateParticles() {
        ctx.clearRect(0, 0, contactCanvas.width, contactCanvas.height);
        particles.forEach(particle => {
          particle.update();
          particle.draw();
        });
        requestAnimationFrame(animateParticles);
      }

      animateParticles();

      // Resize canvas on window resize
      window.addEventListener("resize", () => {
        contactCanvas.width = contactCanvas.offsetWidth;
        contactCanvas.height = contactCanvas.offsetHeight;
      });
    }
  }

  // Modal Expander for Images — CLICK TO EXPAND
  const modal = document.getElementById("modal");
  const modalContent = modal.querySelector(".modal-content");
  const modalClose = modal.querySelector(".modal-close");
  window.openModal = (src, isVideo) => {
    modal.style.display = "flex";
    modalContent.innerHTML = "";
    const element = isVideo ? document.createElement("iframe") : document.createElement("img");
    element.src = src;
    if (!isVideo) {
      element.style.maxWidth = "95%";
      element.style.maxHeight = "85vh";
    }
    modalContent.appendChild(element);
  };
  modalClose.onclick = () => { modal.style.display = "none"; };
  modal.onclick = e => { if (e.target === modal) modal.style.display = "none"; };

  // Back to Top
  const backToTop = document.getElementById("back-to-top");
  window.addEventListener("scroll", () => {
    backToTop.style.display = window.scrollY > 300 ? "block" : "none";
  });
  backToTop.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // Dynamic Year
  document.getElementById("current-year").textContent = new Date().getFullYear();
});

// 3D Hero Initialization
let scene, camera, renderer, particleSystem;
function initHero3D() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("hero-canvas"), alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const geometry = new THREE.BufferGeometry();
  const vertices = [];
  for (let i = 0; i < 5000; i++) {
    vertices.push(
      THREE.MathUtils.randFloatSpread(2000),
      THREE.MathUtils.randFloatSpread(2000),
      THREE.MathUtils.randFloatSpread(2000)
    );
  }
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
  const material = new THREE.PointsMaterial({ color: 0x00E5FF, size: 2 });
  particleSystem = new THREE.Points(geometry, material);
  scene.add(particleSystem);
  camera.position.z = 1000;
  animateHero();
}
function animateHero() {
  requestAnimationFrame(animateHero);
  particleSystem.rotation.y += 0.001;
  renderer.render(scene, camera);
}
