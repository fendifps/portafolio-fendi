// main.js - Controla la lógica del portafolio

// Función principal que se ejecuta cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    // Verificar en qué página estamos
    if (document.querySelector('.welcome-screen')) {
        initWelcomePage();
    } else if (document.querySelector('.portfolio-container')) {
        initPortfolioPage();
    }
});

/**
 * Inicializa la página de bienvenida (index.html)
 */
function initWelcomePage() {
    const viewPortfolioBtn = document.getElementById('viewPortfolio');
    const loadingOverlay = document.getElementById('loadingOverlay');
    
    if (viewPortfolioBtn && loadingOverlay) {
        viewPortfolioBtn.addEventListener('click', function() {
            // Mostrar overlay de carga
            loadingOverlay.style.display = 'flex';
            
            // Iniciar animación de carga
            startLoadingAnimation();
        });
    }
}

/**
 * Controla la animación de carga y redirección
 */
function startLoadingAnimation() {
    const loadingMessage = document.getElementById('loadingMessage');
    const progressFill = document.querySelector('.progress-fill');
    
    // Simular progreso de carga
    let progress = 0;
    const interval = setInterval(() => {
        progress += 1;
        if (progress <= 100) {
            // Actualizar barra de progreso visualmente (ya está animada con CSS)
            // Podríamos actualizar el ancho manualmente si fuera necesario
        } else {
            clearInterval(interval);
            // Redirigir a portfolio.html después de completar la animación
            setTimeout(() => {
                window.location.href = 'portfolio.html';
            }, 500);
        }
    }, 25); // 25ms * 100 = 2.5 segundos
}

/**
 * Inicializa la página del portafolio (portfolio.html)
 */
function initPortfolioPage() {
    // Inicializar navegación por pestañas
    initTabNavigation();
    
    // Inicializar menú hamburguesa para móviles
    initMobileMenu();
    
    // Aplicar efecto de escritura terminal a los títulos
    initTerminalTextEffect();
}

/**
 * Controla la navegación entre pestañas
 */
function initTabNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remover clase active de todos los botones y contenidos
            navButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            
            // Mostrar el contenido correspondiente
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

/**
 * Controla el menú hamburguesa en dispositivos móviles
 */
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navList = document.getElementById('navList');
    
    if (hamburger && navList) {
        hamburger.addEventListener('click', function() {
            navList.classList.toggle('active');
            
            // Animación de hamburguesa a X
            const spans = this.querySelectorAll('span');
            if (navList.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Cerrar menú al hacer clic en un enlace
        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach(button => {
            button.addEventListener('click', function() {
                navList.classList.remove('active');
                
                // Restablecer animación de hamburguesa
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
}

/**
 * Aplica efecto de escritura tipo terminal a elementos específicos
 */
function initTerminalTextEffect() {
    // Seleccionar elementos que tendrán el efecto de terminal
    const terminalElements = document.querySelectorAll('.terminal-animation .terminal-line');
    
    terminalElements.forEach((element, index) => {
        // Aplicar efecto de escritura con retraso
        setTimeout(() => {
            element.style.animation = 'typeLine 0.5s forwards';
        }, index * 500);
    });
}

/**
 * Función auxiliar para crear efecto de escritura en cualquier elemento
 * @param {HTMLElement} element - Elemento HTML donde aplicar el efecto
 * @param {string} text - Texto a escribir
 * @param {number} speed - Velocidad de escritura en ms
 */
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}