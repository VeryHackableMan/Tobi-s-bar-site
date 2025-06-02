// --- Mobile Menu Toggle ---
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link"); // Get all nav links

// Function to close the mobile menu
const closeMenu = () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    // Optional: Re-enable scrolling when menu is closed
    document.body.style.overflow = '';
};

// Toggle menu on hamburger click
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");

    // Optional: Prevent body scrolling when menu is open
    if (navMenu.classList.contains("active")) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Close menu when a nav link is clicked (useful for single-page apps or jumping to sections)
navLinks.forEach(n => n.addEventListener("click", closeMenu));

// Optional: Close menu if user clicks outside the menu area (more advanced)
// document.addEventListener('click', (event) => {
//     const isClickInsideNav = navMenu.contains(event.target);
//     const isClickOnHamburger = hamburger.contains(event.target);
//
//     if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
//         closeMenu();
//     }
// });


// --- Optional: Add subtle animations on scroll ---
// Example using Intersection Observer API (more performant than scroll event listeners)

const sections = document.querySelectorAll('.section-padding'); // Select all sections with padding
const menuCards = document.querySelectorAll('.menu-card'); // Select menu cards specifically for staggered effect

const observerOptions = {
    root: null, // viewport
    rootMargin: '0px',
    threshold: 0.1 // Trigger when 10% of the element is visible
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
            // Optional: Unobserve after animation to save resources
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply initial styles for animation start state
sections.forEach(section => {
    section.style.opacity = 0;
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    sectionObserver.observe(section); // Observe each section
});

// Staggered animation for menu cards
const cardObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add delay based on card index
            entry.target.style.transitionDelay = `${index * 0.1}s`;
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0) scale(1)';
            observer.unobserve(entry.target); // Unobserve after animation
        }
    });
}, { threshold: 0.1 }); // Adjust threshold if needed

menuCards.forEach(card => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(20px) scale(0.98)';
    // Transition is already set in CSS for hover, add here if needed for entrance
    card.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    cardObserver.observe(card);
});

// Add similar observer logic for other elements like .feature-item if desired