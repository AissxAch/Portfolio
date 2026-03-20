/* =============================================
   ACHOURI AISSA — PORTFOLIO
   script.js
   ============================================= */

'use strict';

/* =============================================
   THEME TOGGLE
   ============================================= */
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Load saved theme from localStorage
const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('portfolio-theme', next);
});

/* =============================================
   SCROLL: NAV SHADOW + ACTIVE STATE
   ============================================= */
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}, { passive: true });

/* =============================================
   SMOOTH SCROLL — NAV LINKS
   ============================================= */
function smoothScrollTo(targetId) {
  const target = document.querySelector(targetId);
  if (!target) return;
  const offset = 80; // nav height buffer
  const top = target.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href.length > 1) {
      e.preventDefault();
      smoothScrollTo(href);
    }
  });
});

/* =============================================
   MOBILE MENU
   ============================================= */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const menuClose = document.getElementById('menuClose');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.add('open');
  document.body.style.overflow = 'hidden';
});

function closeMenu() {
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}

menuClose.addEventListener('click', closeMenu);

// Close on link click
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Close on backdrop click
mobileMenu.addEventListener('click', e => {
  if (e.target === mobileMenu) closeMenu();
});

/* =============================================
   INTERSECTION OBSERVER — REVEAL ON SCROLL
   ============================================= */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      // Animate skill bars when they appear
      if (entry.target.classList.contains('skill-badge')) {
        const fill = entry.target.querySelector('.skill-badge__fill');
        if (fill) {
          const delay = parseInt(entry.target.dataset.delay || 0) * 80;
          setTimeout(() => {
            fill.style.width = fill.style.getPropertyValue('--pct') ||
              getComputedStyle(fill).getPropertyValue('--pct');
          }, delay);
        }
      }
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -60px 0px'
});

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

/* =============================================
   HERO — IMMEDIATE REVEAL (above fold)
   ============================================= */
// Elements in the hero don't need scroll trigger — they animate on load
window.addEventListener('load', () => {
  const heroReveals = document.querySelectorAll('.hero .reveal');
  heroReveals.forEach(el => {
    const delay = parseFloat(el.style.transitionDelay) || 0;
    setTimeout(() => {
      el.classList.add('revealed');
    }, delay * 1000 + 100);
  });
});

/* =============================================
   ACTIVE NAV LINK HIGHLIGHT
   ============================================= */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === `#${id}`
        );
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// Add active style dynamically
const styleTag = document.createElement('style');
styleTag.textContent = `.nav__links a.active { color: var(--accent); }`;
document.head.appendChild(styleTag);
/* =============================================
   SKILL BADGE STAGGER (data-delay attr)
   ============================================= */
// Applied via CSS custom property + JS in reveal observer above.
// Each badge has data-delay="N" for stagger effect.
document.querySelectorAll('.skill-badge').forEach((badge, i) => {
  badge.dataset.delay = i;
});

/* =============================================
   TYPING EFFECT — HERO TAGLINE (subtle)
   ============================================= */
// Adds a subtle cursor blink to the hero title accent
const heroTitle = document.querySelector('.hero__title');
if (heroTitle) {
  const cursor = document.createElement('span');
  cursor.style.cssText = `
    display: inline-block;
    width: 2px;
    height: 1em;
    background: var(--accent);
    margin-left: 4px;
    vertical-align: middle;
    animation: blink 1.2s step-end infinite;
  `;
  const blinkStyle = document.createElement('style');
  blinkStyle.textContent = `@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`;
  document.head.appendChild(blinkStyle);
  heroTitle.appendChild(cursor);
  // Remove cursor after 4 seconds
  setTimeout(() => cursor.remove(), 4000);
}

/* =============================================
   PARALLAX — HERO DECORATION (subtle)
   ============================================= */
const heroDecoration = document.querySelector('.hero__decoration');
if (heroDecoration) {
  window.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 12;
    const y = (e.clientY / window.innerHeight - 0.5) * 12;
    heroDecoration.style.transform = `translateY(-50%) translate(${x}px, ${y}px)`;
  }, { passive: true });
}

/* =============================================
   CARD TILT — PROJECT CARDS (subtle 3D)
   ============================================= */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 6;
    card.style.transform = `translateY(-4px) rotateX(${-y}deg) rotateY(${x}deg)`;
    card.style.transformStyle = 'preserve-3d';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
