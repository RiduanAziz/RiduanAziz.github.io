document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Intersection Observer for Smooth Scroll Reveals
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left');
    revealElements.forEach(el => revealObserver.observe(el));

    // Accessible mobile navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const closeMenu = () => {
        navLinks.classList.remove('is-open');
        hamburger.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Open navigation menu');
    };

    hamburger.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('is-open');
        hamburger.classList.toggle('is-open', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
        hamburger.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    });

    navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') closeMenu();
    });


    // 2. Magnetic Button Effect (Premium UI Interaction)
    const magneticButtons = document.querySelectorAll('.magnetic');

    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const position = btn.getBoundingClientRect();
            const x = e.clientX - position.left - position.width / 2;
            const y = e.clientY - position.top - position.height / 2;
            
            // Move button slightly towards cursor
            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });

        btn.addEventListener('mouseout', () => {
            // Snap back into place
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    // 3. Dynamic Glass Navbar Shrink on Scroll
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('is-scrolled');
        } else {
            navbar.classList.remove('is-scrolled');
        }
    });

});