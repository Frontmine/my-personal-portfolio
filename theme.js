
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navBackdrop = document.querySelector('.nav-backdrop');
const navLinks = document.querySelectorAll('.nav-menu a');
let isMenuOpen = false;

function toggleMenu() {
  isMenuOpen = !isMenuOpen;
  navToggle.classList.toggle('active', isMenuOpen);
  navMenu.classList.toggle('active', isMenuOpen);
  navBackdrop.classList.toggle('active', isMenuOpen);
  const icon = navToggle.querySelector('.menu-icon');
  icon.textContent = isMenuOpen ? '✕' : '☰';
}

function closeMenu() {
  if (isMenuOpen) toggleMenu();
}

navToggle.addEventListener('click', toggleMenu);
navBackdrop.addEventListener('click', closeMenu);

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetEl = document.querySelector(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
      closeMenu();
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
});


window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('.section');
  const scrollPos = window.scrollY + window.innerHeight / 2;
  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollPos >= top && scrollPos <= bottom) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) link.classList.add('active');
      });
    }
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.transition = 'all 1s ease';
      entry.target.style.transform = 'translateY(0)';
      entry.target.style.opacity = '1';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });


document.querySelectorAll('.reveal-up').forEach(el => {
  el.style.transform = 'translateY(60px)';
  el.style.opacity = '0';
  revealObserver.observe(el);
});

window.addEventListener('load', () => {
  const heroBox = document.querySelector('.hero .box');
  if (heroBox) {
    heroBox.style.transform = 'translateY(80px)';
    heroBox.style.opacity = '0';
    setTimeout(() => {
      heroBox.style.transition = 'all 1.2s ease';
      heroBox.style.transform = 'translateY(0)';
      heroBox.style.opacity = '1';
    }, 200);
  }
});
