// Smooth nav transitions
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Mobile Menu Drawer Toggle & Dismissal
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');

function openMobileMenu() {
    if (!mobileMenu || !mobileMenuBtn) return;
    mobileMenu.classList.remove('hidden');
    if (menuIcon) menuIcon.textContent = 'close';
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
}

function closeMobileMenu() {
    if (!mobileMenu || !mobileMenuBtn) return;
    if (mobileMenu.classList.contains('hidden')) return;
    mobileMenu.classList.add('hidden');
    if (menuIcon) menuIcon.textContent = 'menu';
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
}

function toggleMobileMenu() {
    if (!mobileMenu) return;
    if (mobileMenu.classList.contains('hidden')) {
        openMobileMenu();
    } else {
        closeMobileMenu();
    }
}

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        toggleMobileMenu();
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    // Outside-click dismissal: close drawer when clicking anywhere outside drawer and toggle button
    document.addEventListener('click', (e) => {
        if (mobileMenu.classList.contains('hidden')) return;
        if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Escape key dismissal: close drawer on Escape without interfering with other keyboard functions
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
            closeMobileMenu();
            mobileMenuBtn.focus();
        }
    });
}

// Active Nav Link Scroll Highlight
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active', 'text-secondary', 'font-bold');
        link.classList.add('text-on-surface-variant');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active', 'text-secondary', 'font-bold');
            link.classList.remove('text-on-surface-variant');
        }
    });
});
