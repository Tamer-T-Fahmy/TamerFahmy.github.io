/* =============================================
   TAMER FAHMY - PERSONAL WEBPAGE SCRIPTS
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initSmoothScrolling();
    initScrollAnimations();
    initNavbarScroll();
    initActiveNavHighlight();
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

                const sectionId = href.replace('#', '');

                // Auto-expand the section if it's collapsible
                const button = target.querySelector('.section-toggle');
                const sectionContent = target.querySelector('.section-content');
                const toggleText = button ? button.querySelector('.toggle-text') : null;

                if (button && sectionContent && button.classList.contains('collapsed')) {
                    button.classList.remove('collapsed');
                    sectionContent.classList.remove('collapsed');
                    target.classList.remove('collapsed');
                    button.setAttribute('aria-expanded', 'true');
                    if (toggleText) toggleText.textContent = 'Collapse';
                }

                // Wait a moment for expansion, then scroll
                setTimeout(() => {
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = target.offsetTop - navHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }, 100);

                // Update URL to clean path
                const newUrl = sectionId === 'home' ? '/' : '/' + sectionId;
                history.pushState({ section: sectionId }, '', newUrl);
            }
        });
    });

    // Handle browser back/forward navigation
    window.addEventListener('popstate', (e) => {
        if (e.state && e.state.section) {
            expandAndScrollToSection(e.state.section);
        } else {
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
    const path = window.location.pathname.replace(/^\//, '');
    const hash = window.location.hash.replace('#', '');
    const sectionId = hash || path;

    if (sectionId && sectionId !== '' && sectionId !== 'home') {
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
    setTimeout(() => {
        const target = document.getElementById(sectionId);
        if (target) {
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
   SCROLL ANIMATIONS (uses CSS classes instead of inline styles)
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
        '.stat-card, .publication-card, .contact-card, .section-title'
    );

    animateElements.forEach(el => {
        el.classList.add('animate-target');
        observer.observe(el);
    });
}

/* =============================================
   NAVBAR SCROLL EFFECT (throttled with rAF, uses CSS classes)
   ============================================= */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const currentScroll = window.pageYOffset;

                if (currentScroll > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }

                if (currentScroll > lastScroll && currentScroll > 500) {
                    navbar.classList.add('hidden');
                } else {
                    navbar.classList.remove('hidden');
                }

                lastScroll = currentScroll;
                ticking = false;
            });
            ticking = true;
        }
    });
}

/* =============================================
   ACTIVE NAV LINK HIGHLIGHTING (throttled with rAF)
   ============================================= */
function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
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

                ticking = false;
            });
            ticking = true;
        }
    });
}

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
                button.classList.remove('collapsed');
                sectionContent.classList.remove('collapsed');
                section.classList.remove('collapsed');
                button.setAttribute('aria-expanded', 'true');
                if (toggleText) toggleText.textContent = 'Collapse';
            } else {
                button.classList.add('collapsed');
                sectionContent.classList.add('collapsed');
                section.classList.add('collapsed');
                button.setAttribute('aria-expanded', 'false');
                if (toggleText) toggleText.textContent = 'Expand';
            }
        });
    });
}
