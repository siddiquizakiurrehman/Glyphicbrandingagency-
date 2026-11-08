/**
 * Glyphic Studio - Client Testimonials / Reviews Data and Render Engine
 */

const reviews = [
    {
        quote: "Great experience working with Glyphic Studio on my logo, brochure, and social media designs. Professional, creative, detail-oriented, and quick to understand requirements. Highly recommended.",
        name: "Aasem Quazi",
        role: "Founder & Director",
        company: "DataBinaries",
        image: "Testimonial_Photo/AsimQazi.jfif",
        rating: 5
    },
    {
        quote: "We got our branding and promotion done by Glyphic studio, in our experience they design your business technically, the logo, the colour selection, the artwork and the design sounds exactly like the business you do.",
        name: "Riyaz Biyabani",
        role: "Owner",
        company: "Hunger Station",
        image: "Testimonial_Photo/Riyaz.jfif",
        rating: 5
    },
    {
        quote: "I absolutely loved Fankaars Creations rebranding. The youthful, modern design perfectly captures the artistic spirit of the Urdu word 'Fankaar' while giving it a fresh, contemporary identity.",
        name: "Samad Sayed",
        role: "Founder",
        company: "Fankaars Creations",
        image: "Testimonial_Photo/samad.jfif",
        rating: 5
    },
    {
        quote: "We used Glyphic studio to create our artists' profiles, and the designs turned out perfectly aligned with our brand guidelines. The process was smooth, and the attention to detail was fantastic. Highly recommended!",
        name: "Aakash Mehta",
        role: "Founder",
        company: "Curry Leaf Media",
        image: "Testimonial_Photo/AkashMehta.jfif",
        rating: 5
    },
    {
        quote: "Glyphic Studio understood our podcast vision perfectly and created a standout logo and theme colours. Their creative input was excellent. Highly recommended for branding services!",
        name: "Sameed Ahmad",
        role: "Strategist",
        company: "Litrali Unfiltered",
        image: "Testimonial_Photo/sameed.jfif",
        rating: 5
    },
    {
        quote: "Glyphic Studio built our comedy club's brand identity with fresh, creative ideas that perfectly captured our vibe. Professional, easy to work with, and delivered designs that truly stood out.",
        name: "Rehan Ali",
        role: "Founder",
        company: "Aurangabad Comedy Club",
        image: "Testimonial_Photo/rehanali.jfif",
        rating: 5
    },
    {
        quote: "Glyphic Studio gave JK Tours & Travel a fresh, professional identity that perfectly captured their vision. Creative, professional, and easy to work with!",
        name: "Rehmat Khan",
        role: "Co-Founder",
        company: "JK Tours & Travel",
        image: "Testimonial_Photo/JK.jfif",
        rating: 5
    },
    {
        quote: "Glyphic Studio brought our brand vision to life with a distinctive logo and a complete, professional brand identity that truly represents 52 Gates.",
        name: "Umar Kamaal Farooqui",
        role: "Joint Managing Partner",
        company: "52 Gates Legal",
        image: "Testimonial_Photo/Umar Kamaal Farooqui.jfif",
        rating: 5
    },
    {
        quote: "Tetrix.",
        name: "Amara Okafor",
        role: "Founder",
        company: "Tetrix",
        image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80",
        rating: 5
    },
    {
        quote: "Professionalism, creativity, and speed. Glyphic Studio transformed our traditional brand into a modern, sophisticated identity that commands respect.",
        name: "Julian Mercer",
        role: "Executive Director",
        company: "Horizon Legal Partners",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
        rating: 5
    }
];

function initTestimonialsMarquee() {
    const track1 = document.getElementById('reviews-track-1');
    const track2 = document.getElementById('reviews-track-2');
    
    if (!track1 || !track2) return;

    const cardsHTML = reviews.map(review => {
        return `
        <div class="flex-shrink-0 w-[260px] sm:w-[310px] md:w-[360px] lg:w-[400px] h-[210px] sm:h-[260px] md:h-[300px] lg:h-[320px] bg-white rounded-2xl sm:rounded-[32px] p-4 sm:p-6 md:p-8 flex flex-col justify-between border border-outline-variant/10 shadow-sm transition-all hover:shadow-md">
            <div>
                <div class="flex justify-between items-start mb-0">
                    <span class="text-3xl sm:text-4xl lg:text-6xl font-serif text-[#2C306A]/10 leading-none select-none">&#8220;</span>
                    <span class="text-amber-500 text-sm sm:text-base lg:text-lg font-bold tracking-wider select-none">${'&#9733;'.repeat(review.rating)}</span>
                </div>
                <p class="text-xs sm:text-sm md:text-[15px] text-slate-800 leading-relaxed font-medium whitespace-normal line-clamp-4 sm:line-clamp-5">
                    ${review.quote}
                </p>
            </div>
            <div class="flex items-center gap-2.5 sm:gap-4 mt-auto">
                <img src="${review.image}" alt="${review.name}" width="48" height="48" class="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full object-cover bg-custom-cream flex-shrink-0" loading="lazy">
                <div class="flex flex-col min-w-0">
                    <span class="font-bold text-[#161954] text-xs sm:text-sm md:text-[15px] leading-tight truncate">${review.name}</span>
                    <span class="text-[11px] sm:text-xs text-on-surface-variant/80 truncate">${review.role} at ${review.company}</span>
                </div>
            </div>
        </div>
        `;
    }).join('');

    track1.innerHTML = cardsHTML;
    track2.innerHTML = cardsHTML;
}

document.addEventListener('DOMContentLoaded', initTestimonialsMarquee);
