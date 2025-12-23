/* =============================================
   TAMER FAHMY - PERSONAL WEBPAGE SCRIPTS
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initNavigation();
    initSmoothScrolling();
    initScrollAnimations();
    initNavbarScroll();
    initSectionToggle();
});

/* =============================================
   MOBILE NAVIGATION
   ============================================= */
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

/* =============================================
   SMOOTH SCROLLING
   ============================================= */
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update URL to clean path (e.g., /about instead of /#about)
                const sectionId = href.replace('#', '');
                const newUrl = sectionId === 'home' ? '/' : '/' + sectionId;
                history.pushState({ section: sectionId }, '', newUrl);
            }
        });
    });

    // Handle browser back/forward navigation
    window.addEventListener('popstate', (e) => {
        if (e.state && e.state.section) {
            scrollToSection(e.state.section);
        } else {
            // If no state, scroll to top (home)
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    // Handle direct URL access (e.g., /about, /career)
    handleDirectUrlAccess();
}

/* =============================================
   HANDLE DIRECT URL ACCESS
   ============================================= */
function handleDirectUrlAccess() {
    // Handle clean URL paths (e.g., /about, /career)
    const path = window.location.pathname.replace(/^\//, '');

    // Handle hash-based URLs (e.g., /#about from 404 redirect)
    const hash = window.location.hash.replace('#', '');

    const sectionId = hash || path; // Prioritize hash over path

    if (sectionId && sectionId !== '' && sectionId !== 'home') {
        // Use window.onload to ensure everything is fully loaded
        if (document.readyState === 'complete') {
            expandAndScrollToSection(sectionId);
        } else {
            window.addEventListener('load', () => {
                expandAndScrollToSection(sectionId);
            });
        }
    }
}

/* =============================================
   EXPAND AND SCROLL TO SECTION
   ============================================= */
function expandAndScrollToSection(sectionId) {
    // Give extra time for all resources to load
    setTimeout(() => {
        const target = document.getElementById(sectionId);
        if (target) {
            // Expand the section
            const button = target.querySelector('.section-toggle');
            const sectionContent = target.querySelector('.section-content');
            const toggleText = button ? button.querySelector('.toggle-text') : null;

            if (button && sectionContent) {
                button.classList.remove('collapsed');
                sectionContent.classList.remove('collapsed');
                target.classList.remove('collapsed');
                button.setAttribute('aria-expanded', 'true');
                if (toggleText) toggleText.textContent = 'Collapse';
            }

            // Wait for expansion animation, then scroll
            setTimeout(() => {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }, 150);
        }
    }, 300);
}

/* =============================================
   SCROLL TO SECTION HELPER
   ============================================= */
function scrollToSection(sectionId, autoExpand = false) {
    const target = document.getElementById(sectionId);
    if (target) {
        // If section should auto-expand (from direct URL access)
        if (autoExpand && target.classList.contains('collapsed')) {
            const button = target.querySelector('.section-toggle');
            const sectionContent = target.querySelector('.section-content');
            if (button && sectionContent) {
                button.classList.remove('collapsed');
                sectionContent.classList.remove('collapsed');
                target.classList.remove('collapsed');
                button.setAttribute('aria-expanded', 'true');
            }
        }

        // Small delay to allow expansion animation to start
        setTimeout(() => {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }, autoExpand ? 100 : 0);
    }
}

/* =============================================
   SCROLL ANIMATIONS
   ============================================= */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll(
        '.stat-card, .ai-card, .publication-card, .contact-card, .about-text, .section-title'
    );

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

/* =============================================
   NAVBAR SCROLL EFFECT
   ============================================= */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.background = 'rgba(5, 5, 5, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.9)';
            navbar.style.boxShadow = 'none';
        }

        if (currentScroll > lastScroll && currentScroll > 500) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });
}

/* =============================================
   ACTIVE NAV LINK HIGHLIGHTING
   ============================================= */
function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    window.addEventListener('scroll', () => {
        let current = '';
        const navHeight = document.querySelector('.navbar').offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', initActiveNavHighlight);

/* =============================================
   SECTION TOGGLE (COLLAPSE/EXPAND)
   ============================================= */
function initSectionToggle() {
    const toggleButtons = document.querySelectorAll('.section-toggle');

    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const section = button.closest('.collapsible-section');
            const sectionContent = section.querySelector('.section-content');
            const toggleText = button.querySelector('.toggle-text');
            const isCollapsed = button.classList.contains('collapsed');

            if (isCollapsed) {
                // Expand
                button.classList.remove('collapsed');
                sectionContent.classList.remove('collapsed');
                section.classList.remove('collapsed');
                button.setAttribute('aria-expanded', 'true');
                if (toggleText) toggleText.textContent = 'Collapse';
            } else {
                // Collapse
                button.classList.add('collapsed');
                sectionContent.classList.add('collapsed');
                section.classList.add('collapsed');
                button.setAttribute('aria-expanded', 'false');
                if (toggleText) toggleText.textContent = 'Expand';
            }
        });
    });
}
