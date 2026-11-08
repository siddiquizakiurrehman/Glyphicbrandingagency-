// Logofolio Interactive Modal & Keyboard Accessibility
const logoModal = document.getElementById('logo-modal');
const modalContainer = document.getElementById('modal-container');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalClose = document.getElementById('modal-close');

let lastFocusedLogofolioCard = null;

function openLogoModal(card) {
    if (!card || !logoModal || !modalContainer) return;
    const img = card.querySelector('img');
    if (!img) return;

    lastFocusedLogofolioCard = card;

    if (modalImg) {
        modalImg.src = img.src;
        modalImg.alt = img.alt;
    }
    if (modalTitle) {
        modalTitle.textContent = card.dataset.client || img.alt.replace(/ logo/i, '');
    }
    if (modalDesc) {
        modalDesc.textContent = card.dataset.description || "Designed with precision to capture the brand's essence, positioning, and target audience.";
    }

    logoModal.classList.remove('hidden', 'pointer-events-none');
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
        logoModal.classList.remove('opacity-0');
        modalContainer.classList.remove('scale-95');
        if (modalClose) {
            modalClose.focus();
        }
    }, 10);
}

function closeLogoModal() {
    if (!logoModal || !modalContainer) return;

    logoModal.classList.add('opacity-0');
    modalContainer.classList.add('scale-95');

    setTimeout(() => {
        logoModal.classList.add('hidden', 'pointer-events-none');
        document.body.style.overflow = '';
        if (lastFocusedLogofolioCard && typeof lastFocusedLogofolioCard.focus === 'function') {
            lastFocusedLogofolioCard.focus();
        }
    }, 300);
}

document.querySelectorAll('#portfolio .grid > div').forEach(card => {
    card.addEventListener('click', () => openLogoModal(card));
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openLogoModal(card);
        }
    });
});

if (modalClose) modalClose.addEventListener('click', closeLogoModal);
if (logoModal) {
    logoModal.addEventListener('click', (e) => {
        if (e.target === logoModal) closeLogoModal();
    });
}

// Logo Modal Keyboard Handling: Escape to close and basic focus trap
document.addEventListener('keydown', (e) => {
    if (!logoModal || logoModal.classList.contains('hidden') || logoModal.classList.contains('pointer-events-none')) {
        return;
    }

    if (e.key === 'Escape') {
        e.preventDefault();
        closeLogoModal();
        return;
    }

    if (e.key === 'Tab') {
        const focusableElements = Array.from(
            logoModal.querySelectorAll(
                'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
            )
        ).filter(el => el.offsetWidth > 0 || el.offsetHeight > 0 || el === document.activeElement);

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) { // Shift + Tab
            if (document.activeElement === firstElement || !logoModal.contains(document.activeElement)) {
                e.preventDefault();
                lastElement.focus();
            }
        } else { // Tab
            if (document.activeElement === lastElement || !logoModal.contains(document.activeElement)) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }
});

// ==========================================
// OUR WORK - SCROLL STACKING & MODAL ENGINE
// ==========================================
const SERVICES_DATA = [
    {
        id: "logo-brand-design",
        title: "Logo & Brand Design",
        description: "Creating distinctive logos and cohesive brand identities that give businesses a unique and memorable visual presence.",
        mockups: [
            "Mockups/LogoAndMerch/Website Mockups-13.webp",
            "Mockups/LogoAndMerch/Website Mockups-14.webp",
            "Mockups/LogoAndMerch/Website Mockups-15.webp"
        ]
    },
    {
        id: "meta-ads",
        title: "Meta Ad Campaigns",
        description: "High-converting social ad creatives, scroll-stopping hooks, and performance-tuned ad sets engineered for scalable user acquisition.",
        mockups: [
            "Mockups/MetaAds/Website Mockups-10.webp",
            "Mockups/MetaAds/Website Mockups-11.webp",
            "Mockups/MetaAds/Website Mockups-12.webp"
        ]
    },
    {
        id: "presentation-design",
        title: "Presentation Design",
        description: "Designing impactful presentations, portfolios, and business decks that communicate ideas clearly and leave a lasting impression on investors and stakeholders.",
        mockups: [
            "Mockups/PresentationDesign/Website Mockups-16.webp",
            "Mockups/PresentationDesign/Website Mockups-17.webp",
            "Mockups/PresentationDesign/Website Mockups-18.webp"
        ]
    },
    {
        id: "print-design",
        title: "Print & Media Design",
        description: "Creating visually engaging banners, business cards, magazines, brochures, and print materials that bring brands to life.",
        mockups: [
            "Mockups/PrintDesign/Website Mockups-01.webp",
            "Mockups/PrintDesign/Website Mockups-02.webp",
            "Mockups/PrintDesign/Website Mockups-03.webp"
        ]
    },
    {
        id: "digital-design",
        title: "Digital & Web Design",
        description: "Designing modern, responsive websites and digital experiences that strengthen brand presence and engage audiences.",
        mockups: [
            "Mockups/DigitalDesign/Website Mockups-19.webp",
            "Mockups/DigitalDesign/Website Mockups-20.webp",
            "Mockups/DigitalDesign/Website Mockups-21.webp"
        ]
    },
    {
        id: "content-marketing",
        title: "Content Marketing",
        description: "Creating engaging social media content and strategic Meta ad campaigns that boost brand visibility and audience engagement.",
        mockups: [
            "Mockups/ContentMarketing/Website Mockups-22.webp",
            "Mockups/ContentMarketing/Website Mockups-23.webp",
            "Mockups/ContentMarketing/Website Mockups-24.webp"
        ]
    },
    {
    id: "package-design",
        title: "Package Design",
        description: "Creative and premium packaging designs that make products stand out and create a memorable brand experience.",
        mockups: [
            "Mockups/PackageDesign/Website Mockups-07.webp",
            "Mockups/PackageDesign/Website Mockups-08.webp",
            "Mockups/PackageDesign/Website Mockups-09.webp"
        ]
},

    {
        id: "merchandise-design",
        title: "Merchandise Design",
        description: "Designing custom merchandise, from apparel and accessories to decorative products, tailored to your brand or personal style.",
        mockups: [
            "Mockups/MerchandiseDesign/Website Mockups-04.webp",
            "Mockups/MerchandiseDesign/Website Mockups-05.webp",
            "Mockups/MerchandiseDesign/Website Mockups-06.webp"
        ]
    }
];

// Supplementary service dictionary for ID-based lookup if needed
const SERVICE_BY_ID = SERVICES_DATA.reduce((acc, s) => { acc[s.id] = s; return acc; }, {});
SERVICE_BY_ID["infographics-design"] = {
    id: "infographics-design",
    title: "Infographics Design",
    description: "Data visualization, process diagrams, and analytical infographics that turn complex technical concepts into clarity.",
    mockups: []
};

// Synchronize Service Cards with SERVICES_DATA (Single Source of Truth) and Attach Handlers
const stackWrapper = document.getElementById('work-stack-wrapper');
if (stackWrapper) {
    stackWrapper.querySelectorAll('.stack-card-item').forEach(card => {
        const sIndex = parseInt(card.getAttribute('data-service-index'), 10);
        if (!isNaN(sIndex) && SERVICES_DATA[sIndex]) {
            const service = SERVICES_DATA[sIndex];
            
            // Sync card heading and description directly from SERVICES_DATA
            const titleEl = card.querySelector('h3');
            if (titleEl && service.title) {
                titleEl.textContent = service.title;
            }
            const descEl = card.querySelector('p');
            if (descEl && service.description) {
                descEl.textContent = service.description;
            }

            card.addEventListener('click', () => {
                openServiceModal(service);
            });
        }
    });
}

// Wire Footer Service Links to Our Work Cards & Modals
document.querySelectorAll('.footer-service-link').forEach(link => {
    link.addEventListener('click', (e) => {
        const sIndex = parseInt(link.getAttribute('data-service-index'), 10);
        if (!isNaN(sIndex) && SERVICES_DATA[sIndex]) {
            e.preventDefault();
            const targetCard = document.querySelector(`.stack-card-item[data-service-index="${sIndex}"]`);
            if (targetCard) {
                targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            openServiceModal(SERVICES_DATA[sIndex]);
        }
    });
});

// ==========================================
// MODAL LIGHTBOX ENGINE
// ==========================================
const modal = document.getElementById('service-work-modal');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalServiceTitle = document.getElementById('modal-service-title');
const modalDisplay = document.getElementById('modal-mockup-display');
const modalPrevBtn = document.getElementById('modal-prev-mockup');
const modalNextBtn = document.getElementById('modal-next-mockup');

let activeService = null;
let activeMockupIndex = 0;

function openServiceModal(service) {
    activeService = service;
    activeMockupIndex = 0;

    if (modalServiceTitle) modalServiceTitle.textContent = service.title;

    renderModalMockup();

    modal.classList.remove('hidden', 'pointer-events-none', 'opacity-0');
    modal.classList.add('flex', 'opacity-100');
    document.body.style.overflow = 'hidden'; // Prevent scroll leakage
}

function closeServiceModal() {
    modal.classList.remove('opacity-100');
    modal.classList.add('opacity-0', 'pointer-events-none');
    setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = '';
    }, 300);
}

function renderModalMockup() {
    if (!activeService) return;
    const mockups = activeService.mockups || [];
    
    if (mockups.length === 0) {
        if (modalDisplay) {
            modalDisplay.innerHTML = `
                <div class="flex flex-col items-center justify-center text-center p-8 text-white/60">
                    <span class="material-symbols-outlined text-4xl mb-3 text-secondary-fixed opacity-70">image</span>
                    <p class="text-base font-medium text-white/80 mb-1">Portfolio Showcase</p>
                    <p class="text-xs text-white/50 max-w-sm">Mockup assets for ${activeService.title} are currently being curated.</p>
                </div>
            `;
        }
        if (modalPrevBtn) modalPrevBtn.style.display = 'none';
        if (modalNextBtn) modalNextBtn.style.display = 'none';
        return;
    }

    if (modalPrevBtn) modalPrevBtn.style.display = mockups.length > 1 ? 'flex' : 'none';
    if (modalNextBtn) modalNextBtn.style.display = mockups.length > 1 ? 'flex' : 'none';

    if (activeMockupIndex >= mockups.length) activeMockupIndex = 0;
    if (activeMockupIndex < 0) activeMockupIndex = mockups.length - 1;

    const currentMockupSrc = mockups[activeMockupIndex];
    if (modalDisplay) {
        modalDisplay.innerHTML = `
            <img src="${encodeURI(currentMockupSrc)}" 
                 alt="${activeService.title} Mockup ${activeMockupIndex + 1}" 
                 class="max-h-full max-w-full w-auto h-auto object-contain rounded-xl shadow-2xl transition-opacity duration-300 select-none" />
        `;
    }
}

if (modalPrevBtn) {
    modalPrevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!activeService) return;
        const mockups = activeService.mockups || [];
        if (mockups.length <= 1) return;
        activeMockupIndex = (activeMockupIndex - 1 + mockups.length) % mockups.length;
        renderModalMockup();
    });
}

if (modalNextBtn) {
    modalNextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!activeService) return;
        const mockups = activeService.mockups || [];
        if (mockups.length <= 1) return;
        activeMockupIndex = (activeMockupIndex + 1) % mockups.length;
        renderModalMockup();
    });
}

if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeServiceModal);
}

if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeServiceModal();
    });
}

// Global Keyboard Event Listener
document.addEventListener('keydown', (e) => {
    if (!modal || modal.classList.contains('hidden')) return;
    if (e.key === 'Escape') {
        closeServiceModal();
    } else if (e.key === 'ArrowLeft' && modalPrevBtn) {
        modalPrevBtn.click();
    } else if (e.key === 'ArrowRight' && modalNextBtn) {
        modalNextBtn.click();
    }
});
