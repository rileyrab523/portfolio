document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');

    // Función para actualizar el enlace activo en la barra de navegación
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

// Función throttle para limitar la cantidad de ejecuciones
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
}, 100), { passive: false }); // Throttle cada 100ms

    // Actualizar el enlace activo también en scroll normal
    window.addEventListener('scroll', updateActiveLink);

    const hamburger = document.querySelector('.hamburger');
    const navUL = document.querySelector('.navbar ul');

    hamburger.addEventListener('click', function() {
        navUL.classList.toggle('open');
    });

    // Escuchar clics en todo el documento
    document.addEventListener('click', function(event) {
        // Si el clic NO es en el hamburger y no es dentro del navbar ul
        if (!hamburger.contains(event.target) && !navUL.contains(event.target)) {
            navUL.classList.remove('open');  // Cierra el menú
        }
    });

    function initSwiper() {
        new Swiper('.mySwiper', {
            slidesPerView: 1, // Para móviles, muestra una tarjeta a la vez
            spaceBetween: 10, // Espacio entre slides para móviles
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
                    slidesPerView: 3, // Para pantallas más grandes, muestra 3 tarjetas
                    spaceBetween: 30, // Espacio entre slides para pantallas más grandes
                }
            },
        });
    }

    initSwiper(); // Inicia Swiper al cargar
    window.addEventListener('resize', initSwiper); // Re-inicializar Swiper en cambio de tamaño
});
