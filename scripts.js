document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');

    // Function to update the active link in the navigation bar
    const updateActiveLink = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.href.includes(current)) {
                link.classList.add('active');
            }
        });
    };

// Throttle function to limit the number of executions
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

window.addEventListener('wheel', throttle((e) => {
    e.preventDefault();
    const currentSection = document.elementFromPoint(0, window.innerHeight / 2);
    let targetSection = e.deltaY < 0 ? currentSection.previousElementSibling : currentSection.nextElementSibling;

    if (targetSection && targetSection.tagName === 'SECTION') {
        targetSection.scrollIntoView({ behavior: 'smooth' });
    }

    setTimeout(updateActiveLink, 500);
}, 100), { passive: false }); // Throttle every 100ms


    // Update the active link also in normal scroll
    window.addEventListener('scroll', updateActiveLink);

    const hamburger = document.querySelector('.hamburger');
    const navUL = document.querySelector('.navbar ul');

    hamburger.addEventListener('click', function() {
        navUL.classList.toggle('open');
    });

    // Hear clicks throughout the document
    document.addEventListener('click', function(event) {
        // If the click is NOT on the hamburger and is not within the navbar ul
        if (!hamburger.contains(event.target) && !navUL.contains(event.target)) {
            navUL.classList.remove('open');  // Close the menu
        }
    });

    function initSwiper() {
        new Swiper('.mySwiper', {
            slidesPerView: 1, // For mobile, display one card at a time
            spaceBetween: 10, // Space between slides for mobile devices
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                768: {
                    slidesPerView: 3, // For larger screens, display 3 cards
                    spaceBetween: 30, // Space between slides for larger screens
                }
            },
        });
    }

    initSwiper(); // Start Swiper on load
    window.addEventListener('resize', initSwiper); // Re-initialize Swiper on resize
});
