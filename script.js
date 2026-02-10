// ============================================
// PORTFOLIO - Main JavaScript
// ============================================

'use strict';

/**
 * Manejo de acordeones de proyectos
 */
const initProjectAccordions = () => {
    const buttons = document.querySelectorAll('.btnProyecto button');
    
    if (!buttons.length) return;
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Toggle active state
            this.classList.toggle('active');
            
            // Update ARIA attribute
            const isExpanded = this.classList.contains('active');
            this.setAttribute('aria-expanded', isExpanded);
            
            // Find and toggle description
            const proyecto = this.closest('.proyecto');
            if (!proyecto) return;
            
            const descripcion = proyecto.querySelector('.descripcion');
            if (!descripcion) return;
            
            // Update ARIA attribute on description
            descripcion.setAttribute('aria-hidden', !isExpanded);
            
            // Toggle height
            if (descripcion.style.height && descripcion.style.height !== '0px') {
                descripcion.style.height = '0px';
            } else {
                descripcion.style.height = descripcion.scrollHeight + 'px';
            }
        });
    });
};

/**
 * Manejo del menú hamburguesa
 */
const initMobileMenu = () => {
    const burger = document.getElementById('burger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links span a');
    
    if (!burger || !navLinks) return;
    
    // Toggle menu
    burger.addEventListener('click', () => {
        const isActive = navLinks.classList.toggle('active');
        burger.classList.toggle('toggle');
        
        // Update ARIA attribute
        burger.setAttribute('aria-expanded', isActive);
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isActive ? 'hidden' : '';
    });
    
    // Close menu when clicking on a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            burger.classList.remove('toggle');
            burger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && 
            !burger.contains(e.target) && 
            navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            burger.classList.remove('toggle');
            burger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
    
    // Close menu on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            burger.classList.remove('toggle');
            burger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
};

/**
 * Smooth scroll para navegación
 */
const initSmoothScroll = () => {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ignorar links vacíos o solo con #
            if (!href || href === '#') return;
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Scroll suave
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL sin scroll
                if (history.pushState) {
                    history.pushState(null, null, href);
                }
            }
        });
    });
};

/**
 * Ajustar altura de descripciones en resize
 */
const handleDescriptionResize = () => {
    const activeDescriptions = document.querySelectorAll('.descripcion[style*="height"]');
    
    activeDescriptions.forEach(desc => {
        if (desc.style.height !== '0px') {
            desc.style.height = desc.scrollHeight + 'px';
        }
    });
};

/**
 * Inicialización
 */
const init = () => {
    // Inicializar componentes
    initProjectAccordions();
    initMobileMenu();
    initSmoothScroll();
    
    // Manejar resize con debounce
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            handleDescriptionResize();
        }, 250);
    });
    
    // Log de inicialización (solo en desarrollo)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('Portfolio inicializado correctamente');
    }
};

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
