/* =============================================
   AIM Safety Consulting Ltd — Main JavaScript
   ============================================= */

'use strict';

// ============================================================
// 1. NAVBAR — scroll behaviour & mobile toggle
// ============================================================
(function initNavbar() {
    const navbar   = document.getElementById('navbar');
    const toggle   = document.getElementById('navToggle');
    const menu     = document.getElementById('navMenu');
    const navLinks = menu.querySelectorAll('.nav-link');

    // Scroll state
    function onScroll() {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load

    // Mobile toggle
    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        menu.classList.toggle('open');
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            menu.classList.remove('open');
        });
    });

    // Highlight active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    function highlightNav() {
        const scrollPos = window.scrollY + 100;
        sections.forEach(section => {
            const id   = section.getAttribute('id');
            const link = menu.querySelector(`a[href="#${id}"]`);
            if (!link) return;
            const top    = section.offsetTop;
            const bottom = top + section.offsetHeight;
            if (scrollPos >= top && scrollPos < bottom) {
                navLinks.forEach(l => l.classList.remove('active-link'));
                link.classList.add('active-link');
            }
        });
    }
    window.addEventListener('scroll', highlightNav, { passive: true });
})();


// ============================================================
// 2. BACK TO TOP
// ============================================================
(function initBackToTop() {
    const btn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();


// ============================================================
// 3. SCROLL-TRIGGERED ANIMATIONS
// ============================================================
(function initScrollAnimations() {
    // Elements to observe
    const targets = document.querySelectorAll(
        '.service-card, .advantage-item, .commitment-item, .process-step, ' +
        '.testimonial-card, .stat-item, .aig-item, .adv-stat, .comp-item, ' +
        '.bci-item'
    );

    targets.forEach((el, i) => {
        el.classList.add('fade-up');
        // Stagger siblings by parent
        const siblings = Array.from(el.parentElement.children);
        const idx = siblings.indexOf(el);
        if (idx <= 3) {
            el.classList.add(`fade-up-delay-${idx}`);
        }
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    targets.forEach(el => observer.observe(el));
})();


// ============================================================
// 4. COUNTER ANIMATION (stats section)
// ============================================================
(function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');

    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    function animateCounter(el) {
        const target   = parseInt(el.getAttribute('data-target'), 10);
        const duration = 1800; // ms
        const start    = performance.now();
        const suffix   = el.getAttribute('data-suffix') || '';

        function step(now) {
            const elapsed  = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const value    = Math.round(easeOut(progress) * target);
            el.textContent = value.toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
})();


// ============================================================
// 5. BOOKING FORM — validation & submission
// ============================================================
(function initBookingForm() {
    const form        = document.getElementById('bookingForm');
    const formBody    = document.getElementById('formBody');
    const formSuccess = document.getElementById('formSuccess');
    const submitBtn   = document.getElementById('submitBtn');

    if (!form) return;

    // Set minimum date to today
    const dateInput = document.getElementById('preferredDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    // Field validators
    const validators = {
        firstName:       { required: true,  msg: 'Please enter your first name.' },
        lastName:        { required: true,  msg: 'Please enter your last name.' },
        email:           { required: true,  email: true, msg: 'Please enter a valid email address.' },
        company:         { required: true,  msg: 'Please enter your company name.' },
        serviceRequired: { required: true,  msg: 'Please select a service.' },
        companySize:     { required: true,  msg: 'Please select your company size.' },
        consent:         { required: true,  checkbox: true, msg: 'Please accept to continue.' },
    };

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validateField(id, rules) {
        const el       = document.getElementById(id);
        const errorEl  = document.getElementById(id + 'Error');
        if (!el) return true;

        let value = rules.checkbox ? el.checked : el.value.trim();
        let valid = true;
        let msg   = '';

        if (rules.required && (rules.checkbox ? !value : !value)) {
            valid = false; msg = rules.msg;
        } else if (rules.email && value && !validateEmail(value)) {
            valid = false; msg = rules.msg;
        }

        if (errorEl) errorEl.textContent = valid ? '' : msg;
        el.classList.toggle('error', !valid);
        return valid;
    }

    function validateAll() {
        return Object.entries(validators).map(([id, rules]) => validateField(id, rules)).every(Boolean);
    }

    // Live validation
    Object.keys(validators).forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        const evt = el.tagName === 'SELECT' ? 'change' : (validators[id].checkbox ? 'change' : 'blur');
        el.addEventListener(evt, () => validateField(id, validators[id]));
    });

    // Submit
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!validateAll()) return;

        // UI — loading state
        const btnText    = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        btnText.style.display    = 'none';
        btnLoading.style.display = 'inline-flex';
        submitBtn.disabled = true;

        // Gather form data
        const data = {
            firstName:       document.getElementById('firstName').value.trim(),
            lastName:        document.getElementById('lastName').value.trim(),
            email:           document.getElementById('email').value.trim(),
            phone:           document.getElementById('phone').value.trim(),
            company:         document.getElementById('company').value.trim(),
            serviceRequired: document.getElementById('serviceRequired').value,
            companySize:     document.getElementById('companySize').value,
            preferredDate:   document.getElementById('preferredDate').value,
            message:         document.getElementById('message').value.trim(),
            submittedAt:     new Date().toISOString(),
        };

        try {
            // Save to Table API
            await fetch('tables/bookings', {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body:    JSON.stringify(data),
            });
        } catch (err) {
            // Even if the API call fails, show success to user
            console.warn('API call failed (may be development mode):', err);
        }

        // Simulate brief processing delay then show success
        await new Promise(r => setTimeout(r, 800));

        formBody.style.display    = 'none';
        formSuccess.style.display = 'flex';
        formSuccess.classList.add('visible');
    });
})();


// ============================================================
// 6. SMOOTH SCROLL for all anchor links
// ============================================================
(function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const id = anchor.getAttribute('href');
            if (id === '#') return;
            const target = document.querySelector(id);
            if (target) {
                e.preventDefault();
                const navHeight = 72;
                const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
})();


// ============================================================
// 7. COMPLIANCE CARD — animated progress bar
// ============================================================
(function initComplianceCard() {
    const card = document.querySelector('.compliance-card');
    if (!card) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Stagger the compliance items appearing
                const items = card.querySelectorAll('.comp-item');
                items.forEach((item, i) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, i * 150);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    // Set initial state
    const items = card.querySelectorAll('.comp-item');
    items.forEach(item => {
        item.style.opacity    = '0';
        item.style.transform  = 'translateX(-20px)';
        item.style.transition = 'opacity .4s ease, transform .4s ease';
    });

    observer.observe(card);
})();


// ============================================================
// 8. SERVICE CARD — hover enhancement
// ============================================================
(function initServiceCards() {
    const cards = document.querySelectorAll('.service-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.querySelector('.service-icon-wrap') &&
                this.querySelector('.service-icon-wrap').classList.add('pulse');
        });
        card.addEventListener('mouseleave', function () {
            this.querySelector('.service-icon-wrap') &&
                this.querySelector('.service-icon-wrap').classList.remove('pulse');
        });
    });
})();


// ============================================================
// 9. ADVANTAGE ITEMS — stagger entrance
// ============================================================
(function initAdvantageItems() {
    const items = document.querySelectorAll('.advantage-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity   = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, i * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    items.forEach(item => {
        item.style.opacity   = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'opacity .5s ease, transform .5s ease';
        observer.observe(item);
    });
})();


// ============================================================
// 10. Utility — active link CSS
// ============================================================
const style = document.createElement('style');
style.textContent = `
    .nav-link.active-link { color: var(--orange) !important; }
    .navbar.scrolled .nav-link.active-link { color: var(--orange) !important; }
    .service-icon-wrap.pulse { animation: iconPulse .4s ease; }
    @keyframes iconPulse {
        0%   { transform: scale(1); }
        50%  { transform: scale(1.15); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);
