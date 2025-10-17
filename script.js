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

// ===== Scroll Reveal Animation (one-time trigger, staggered for groups) =====
const reveals = document.querySelectorAll('.reveal');

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  reveals.forEach(parent => {
    const elementTop = parent.getBoundingClientRect().top;

    // Only trigger if visible and not already shown
    if (elementTop < windowHeight - 100 && !parent.classList.contains('visible')) {
      parent.classList.add('visible');

      // If this element contains multiple revealable children (like project cards)
      const children = parent.querySelectorAll('.project-card.reveal');
      if (children.length > 0) {
        let delay = 0;
        children.forEach(child => {
          child.style.transitionDelay = `${delay}s`;
          child.classList.add('visible');
          delay += 0.1; // 0.1s stagger
        });
      }
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ===== Lightbox for Project Pages =====
const galleryImages = document.querySelectorAll('img');
const lightbox = document.createElement('div');
lightbox.classList.add('lightbox');
document.body.appendChild(lightbox);

galleryImages.forEach(img => {
  img.addEventListener('click', () => {
    lightbox.innerHTML = `<img src="${img.src}" alt="${img.alt}">`;
    lightbox.classList.add('visible');
  });
});

lightbox.addEventListener('click', () => {
  lightbox.classList.remove('visible');
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') lightbox.classList.remove('visible');
});

// ===== Dropdown Menu Toggle (Click-to-open + Hover fix + Arrow Rotation) =====
document.addEventListener('DOMContentLoaded', () => {
  const dropdown = document.querySelector('.dropdown');
  const button = dropdown.querySelector('.dropbtn');
  const menu = dropdown.querySelector('.dropdown-content');

  // Toggle dropdown on click (for touch + mobile)
  button.addEventListener('click', (e) => {
    e.preventDefault();
    dropdown.classList.toggle('open');
  });

  // Close when clicking elsewhere
  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove('open');
    }
  });
});
