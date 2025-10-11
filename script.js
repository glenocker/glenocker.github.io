// Highlight active section in navbar on scroll
document.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 80;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((a) => {
    a.classList.remove("active");
    if (a.getAttribute("href") === `#${current}`) {
      a.classList.add("active");
    }
  });
});

// Mobile menu toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// ===== Scroll Reveal Animation (one-time trigger, staggered) =====
const reveals = document.querySelectorAll('.reveal');

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  let delay = 0;

  reveals.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;

    // Only trigger if visible and not already shown
    if (elementTop < windowHeight - 100 && !el.classList.contains('visible')) {
      // Apply staggered delay for each element entering view
      el.style.transitionDelay = `${delay}s`;
      el.classList.add('visible');
      delay += 0.1; // 0.1 s gap between items
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);