// ===== HAMBURGER MENU FUNCTIONALITY =====

const hamburgerMenu = document.querySelector('.hamburger-menu');
const headerNav = document.querySelector('.header-nav');
const navLinks = document.querySelectorAll('.nav-links a');
const body = document.body;

// Toggle menu on hamburger click
if (hamburgerMenu) {
    hamburgerMenu.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('active');
        headerNav.classList.toggle('active');
        body.classList.toggle('menu-open');
    });
}

// Close menu when a navigation link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburgerMenu.classList.remove('active');
        headerNav.classList.remove('active');
        body.classList.remove('menu-open');
    });
});

// Handle dropdown toggle on mobile
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const dropdown = toggle.closest('.dropdown');
            const dropdownMenu = dropdown.querySelector('.dropdown-menu');
            
            // Close other dropdowns
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                if (menu !== dropdownMenu) {
                    menu.style.maxHeight = '0';
                }
            });
            
            // Toggle current dropdown
            if (dropdownMenu.style.maxHeight === '0px' || !dropdownMenu.style.maxHeight) {
                dropdownMenu.style.maxHeight = '500px';
            } else {
                dropdownMenu.style.maxHeight = '0';
            }
        }
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    const isClickInsideHeader = document.querySelector('.header').contains(e.target);
    
    if (!isClickInsideHeader && headerNav.classList.contains('active')) {
        hamburgerMenu.classList.remove('active');
        headerNav.classList.remove('active');
        body.classList.remove('menu-open');
    }
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && headerNav.classList.contains('active')) {
        hamburgerMenu.classList.remove('active');
        headerNav.classList.remove('active');
        body.classList.remove('menu-open');
    }
});

// ===== SCROLL ANIMATION FUNCTIONALITY =====

// Simple scroll animation using Intersection Observer
const scrollAnimationObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            const animationType = entry.target.getAttribute('data-animate');
            if (animationType) {
                entry.target.classList.add(animationType);
                entry.target.classList.add('animated');
                // Stop observing this element
                scrollAnimationObserver.unobserve(entry.target);
            }
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Start observing all elements with data-animate
document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = document.querySelectorAll('[data-animate]');
    elementsToAnimate.forEach(function(element) {
        scrollAnimationObserver.observe(element);
    });
});

// Also run on page load in case DOM is already loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    const elementsToAnimate = document.querySelectorAll('[data-animate]');
    elementsToAnimate.forEach(function(element) {
        scrollAnimationObserver.observe(element);
    });
}

// Handle window resize to maintain responsive behavior
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Recheck menu state on resize
        if (window.innerWidth > 768) {
            hamburgerMenu.classList.remove('active');
            headerNav.classList.remove('active');
            body.classList.remove('menu-open');
        }
    }, 250);
});
