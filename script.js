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


    // 2. Magnetic Button Effect (Premium UI Interaction)
    const magneticButtons = document.querySelectorAll('.magnetic');

    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const position = btn.getBoundingClientRect();
            const x = e.pageX - position.left - position.width / 2;
            const y = e.pageY - position.top - position.height / 2;
            
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
            navbar.style.padding = "0.8rem 2rem";
            navbar.style.background = "rgba(10, 10, 10, 0.85)";
        } else {
            navbar.style.padding = "1rem 2rem";
            navbar.style.background = "rgba(15, 15, 15, 0.7)";
        }
    });

});