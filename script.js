/* ============================================
   DEMA - Agência de Marketing e Design
   JavaScript Principal
   ============================================ */

// === Cursor Personalizado ===
const customCursor = document.getElementById('customCursor');
const customCursorFollower = document.getElementById('customCursorFollower');

let cursorX = 0, cursorY = 0;
let followerX = 0, followerY = 0;
let isVisible = false;

// Mover o cursor
function moveCursor(e) {
    if (!isVisible) {
        isVisible = true;
        customCursor.style.opacity = '1';
        customCursorFollower.style.opacity = '1';
    }
    cursorX = e.clientX;
    cursorY = e.clientY;
}

// Animação suave para o follower
function animateCursor() {
    // Cursor principal segue instantaneamente
    customCursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
    
    // Follower com delay suave (lerp)
    followerX += (cursorX - followerX) * 0.15;
    followerY += (cursorY - followerY) * 0.15;
    customCursorFollower.style.transform = `translate(${followerX}px, ${followerY}px) translate(-50%, -50%)`;
    
    requestAnimationFrame(animateCursor);
}

// Inicializar cursor
function initCustomCursor() {
    customCursor.style.opacity = '0';
    customCursorFollower.style.opacity = '0';
    customCursor.style.transition = 'opacity 0.3s ease, width 0.2s ease, height 0.2s ease, background 0.2s ease';
    customCursorFollower.style.transition = 'opacity 0.3s ease, width 0.3s ease, height 0.3s ease, border-color 0.2s ease';
    
    // Esconder em mobile/touch
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        html.style.cursor = '';
        return;
    }
    
    document.addEventListener('mousemove', moveCursor);
    animateCursor();
    
    // Efeito hover em links e botões
    const hoverElements = document.querySelectorAll('a, button, .btn, .service-card, .portfolio-item, .social-link');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            customCursor.classList.add('hover');
            customCursorFollower.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            customCursor.classList.remove('hover');
            customCursorFollower.classList.remove('hover');
        });
    });
}

const html = document.documentElement;

if (customCursor && customCursorFollower) {
    initCustomCursor();
}

// === Navbar Scroll Effect ===
const navbar = document.getElementById('navbar');

function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleNavbarScroll, { passive: true });
handleNavbarScroll();

// === Mobile Menu Toggle ===
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// === Partículas no Hero ===
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (10 + Math.random() * 10) + 's';
        particle.style.width = (2 + Math.random() * 4) + 'px';
        particle.style.height = particle.style.width;
        particle.style.opacity = 0.1 + Math.random() * 0.4;
        container.appendChild(particle);
    }
}

createParticles();

// === Contador Animado ===
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const startTime = Date.now();

        function updateCounter() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(target * easeOut);
            
            counter.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        }

        updateCounter();
    });
}

// === Smooth Scroll para links internos ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// === ScrollReveal Configuration ===
// Aguardar o DOM estar pronto antes de iniciar o ScrollReveal
document.addEventListener('DOMContentLoaded', function() {
    
    // Inicializar ScrollReveal
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            origin: 'bottom',
            distance: '60px',
            duration: 1000,
            delay: 0,
            easing: 'cubic-bezier(0.5, 0, 0, 1)',
            reset: false,
            mobile: true,
            viewFactor: 0.2
        });

        // Reveal from top
        sr.reveal('.reveal-top', {
            origin: 'top',
            distance: '60px',
            duration: 1000
        });

        // Reveal from bottom
        sr.reveal('.reveal-bottom', {
            origin: 'bottom',
            distance: '60px',
            duration: 1000,
            delay: function(el, i) {
                return el.getAttribute('data-reveal-delay') || i * 100;
            }
        });

        // Reveal from left
        sr.reveal('.reveal-left', {
            origin: 'left',
            distance: '80px',
            duration: 1200
        });

        // Reveal from right
        sr.reveal('.reveal-right', {
            origin: 'right',
            distance: '80px',
            duration: 1200
        });

        // Reveal scale
        sr.reveal('.reveal-scale', {
            origin: 'bottom',
            distance: '0px',
            duration: 1000,
            scale: { from: 0.8, to: 1 }
        });

        // Hero elements
        sr.reveal('.hero-logo', {
            origin: 'top',
            distance: '40px',
            duration: 1200,
            delay: 200
        });

        sr.reveal('.hero-title', {
            origin: 'bottom',
            distance: '60px',
            duration: 1000,
            delay: 600
        });

        sr.reveal('.hero-subtitle', {
            origin: 'bottom',
            distance: '40px',
            duration: 1000,
            delay: 800
        });

        sr.reveal('.hero-buttons', {
            origin: 'bottom',
            distance: '40px',
            duration: 1000,
            delay: 1000
        });

        // Scroll indicator
        sr.reveal('.scroll-indicator', {
            origin: 'bottom',
            distance: '20px',
            duration: 800,
            delay: 1400
        });

        // Stagger service cards
        sr.reveal('.service-card', {
            origin: 'bottom',
            distance: '50px',
            duration: 800,
            delay: function(el, i) {
                return (i % 3) * 150;
            },
            interval: 150
        });

        // Stagger portfolio items
        sr.reveal('.portfolio-item', {
            origin: 'bottom',
            distance: '50px',
            duration: 800,
            delay: function(el, i) {
                return i * 100;
            },
            interval: 100
        });

        // Section labels
        sr.reveal('.section-label', {
            origin: 'left',
            distance: '40px',
            duration: 800,
            delay: 0
        });

        // Section titles
        sr.reveal('.section-title', {
            origin: 'bottom',
            distance: '40px',
            duration: 800,
            delay: 200
        });
    }

    // === Intersection Observer para Contadores ===
    const statsSection = document.querySelector('.about-stats');
    let countersAnimated = false;

    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersAnimated) {
                    countersAnimated = true;
                    animateCounters();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(statsSection);
    }

    // === Efeito Parallax Suave ===
    function parallaxEffect() {
        const scrollY = window.scrollY;
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach((shape, index) => {
            const speed = 0.03 + (index * 0.01);
            shape.style.transform = `translateY(${scrollY * speed}px)`;
        });
    }

    window.addEventListener('scroll', parallaxEffect, { passive: true });

    // === Active Link Highlight ===
    const sections = document.querySelectorAll('section[id]');
    
    function highlightActiveLink() {
        const scrollY = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightActiveLink, { passive: true });
});

// === Efeito de Mouse Glow (opcional) ===
document.addEventListener('mousemove', function(e) {
    const aboutSection = document.querySelector('.about');
    if (!aboutSection) return;

    const rect = aboutSection.getBoundingClientRect();
    
    if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        aboutSection.style.setProperty('--mouse-x', `${x}px`);
        aboutSection.style.setProperty('--mouse-y', `${y}px`);
    }
});

// === Preloader ===
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// === Sticky Scroll Effect para CTA ===
const ctaSection = document.querySelector('.cta-sticky');

if (ctaSection) {
    const ctaContent = ctaSection.querySelector('.cta-content');
    
    function handleCtaScroll() {
        const rect = ctaSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        if (rect.top < viewportHeight && rect.bottom > 0) {
            const progress = 1 - (rect.bottom / (viewportHeight + rect.height));
            const clampedProgress = Math.max(0, Math.min(1, progress));
            
            ctaContent.style.opacity = 0.5 + (clampedProgress * 0.5);
        }
    }
    
    window.addEventListener('scroll', handleCtaScroll, { passive: true });
}
