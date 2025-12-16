/**
 * WebMonitorPro - Portfolio Website
 * Interactive features and animations
 */

// =============================================
// INITIALIZATION
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    initScrollReveal();
    initSmoothScroll();
    initDynamicBeams();
});

// =============================================
// NAVBAR SCROLL EFFECT
// =============================================

function initNavbar() {
    const navbar = document.getElementById('navbar');

    if (!navbar) return;

    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
}

// =============================================
// MOBILE MENU
// =============================================

function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const closeBtn = document.getElementById('mobile-nav-close');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (!menuBtn || !mobileNav) return;

    menuBtn.addEventListener('click', () => {
        mobileNav.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    const closeMenu = () => {
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (closeBtn) {
        closeBtn.addEventListener('click', closeMenu);
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
            closeMenu();
        }
    });
}

// =============================================
// SCROLL REVEAL ANIMATIONS
// =============================================

function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');

    if (!revealElements.length) return;

    const revealOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const revealCallback = (entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for elements that appear together
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, index * 100);

                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
}

// =============================================
// SMOOTH SCROLLING
// =============================================

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            if (href === '#') return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                const navbarHeight = document.getElementById('navbar')?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// =============================================
// DYNAMIC BEAM ANIMATIONS
// =============================================

function initDynamicBeams() {
    const beamContainer = document.querySelector('.beam-container');

    if (!beamContainer) return;

    // Create additional random beams periodically
    const createRandomBeam = () => {
        const beam = document.createElement('div');
        beam.className = Math.random() > 0.5 ? 'beam' : 'beam-horizontal';

        if (beam.className === 'beam') {
            beam.style.left = `${Math.random() * 100}%`;
            beam.style.animationDelay = `${Math.random() * 2}s`;
            beam.style.animationDuration = `${6 + Math.random() * 4}s`;
        } else {
            beam.style.top = `${Math.random() * 100}%`;
            beam.style.animationDelay = `${Math.random() * 2}s`;
            beam.style.animationDuration = `${10 + Math.random() * 6}s`;
        }

        beam.style.opacity = `${0.1 + Math.random() * 0.2}`;

        beamContainer.appendChild(beam);

        // Remove beam after animation completes
        const duration = parseFloat(beam.style.animationDuration) * 1000;
        setTimeout(() => {
            beam.remove();
        }, duration);
    };

    // Create new beams periodically
    setInterval(createRandomBeam, 3000);
}

// =============================================
// TYPING EFFECT FOR HERO (optional enhancement)
// =============================================

function initTypingEffect() {
    const element = document.querySelector('.hero-title .gradient-text');

    if (!element) return;

    const words = ['Website Outage', 'SSL Expiry', 'Downtime', 'Domain Issues'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeSpeed = 100;
    const deleteSpeed = 50;
    const pauseTime = 2000;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            element.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            element.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let nextDelay = isDeleting ? deleteSpeed : typeSpeed;

        if (!isDeleting && charIndex === currentWord.length) {
            nextDelay = pauseTime;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }

        setTimeout(type, nextDelay);
    }

    // Uncomment to enable typing effect
    // setTimeout(type, pauseTime);
}

// =============================================
// PARALLAX EFFECT FOR ORBS
// =============================================

function initParallax() {
    const orbs = document.querySelectorAll('.glow-orb');

    if (!orbs.length) return;

    let ticking = false;

    window.addEventListener('mousemove', (e) => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const x = (e.clientX / window.innerWidth - 0.5) * 20;
                const y = (e.clientY / window.innerHeight - 0.5) * 20;

                orbs.forEach((orb, index) => {
                    const factor = (index + 1) * 0.5;
                    orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
                });

                ticking = false;
            });

            ticking = true;
        }
    }, { passive: true });
}

// Initialize parallax for desktop only
if (window.matchMedia('(min-width: 992px)').matches) {
    initParallax();
}

// =============================================
// COUNTER ANIMATION FOR STATS
// =============================================

function animateCounter(element, target, suffix = '') {
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;

        if (current >= target) {
            current = target;
            clearInterval(timer);
        }

        element.textContent = Math.floor(current) + suffix;
    }, 16);
}

// =============================================
// CONTACT FORM TRACKING (Analytics placeholder)
// =============================================

function trackContactClick() {
    // Placeholder for analytics tracking
    console.log('Contact button clicked - tracking event');

    // If you add analytics later:
    // gtag('event', 'contact_click', { method: 'email' });
}

// Add tracking to contact buttons
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', trackContactClick);
});

// =============================================
// PERFORMANCE: REDUCE MOTION IF PREFERRED
// =============================================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable animations for users who prefer reduced motion
    document.documentElement.style.setProperty('--transition-smooth', '0s');
    document.documentElement.style.setProperty('--transition-fast', '0s');

    // Remove beam animations
    document.querySelectorAll('.beam, .beam-horizontal').forEach(beam => {
        beam.style.animation = 'none';
    });
}
