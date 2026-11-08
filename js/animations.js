// Scroll reveal animation using IntersectionObserver
function initScrollReveal() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach((element) => {
        // If it's already active (e.g. Hero content), don't observe it
        if (element.classList.contains("active")) {
            return;
        }
        observer.observe(element);
    });
}
document.addEventListener("DOMContentLoaded", initScrollReveal);

// Ambient Dynamic Canvas Animation
const canvas = document.getElementById('ambient-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height, particles = [];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    for (let i = 0; i < 25; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 80 + 40,
            dx: (Math.random() - 0.5) * 0.4,
            dy: (Math.random() - 0.5) * 0.4,
            color: i % 2 === 0 ? 'rgba(0, 106, 96, 0.08)' : 'rgba(44, 48, 106, 0.06)'
        });
    }

    function animateCanvas() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.x += p.dx;
            p.y += p.dy;
            if (p.x < -p.radius) p.x = width + p.radius;
            if (p.x > width + p.radius) p.x = -p.radius;
            if (p.y < -p.radius) p.y = height + p.radius;
            if (p.y > height + p.radius) p.y = -p.radius;

            let gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
            gradient.addColorStop(0, p.color);
            gradient.addColorStop(1, 'transparent');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
        });
        requestAnimationFrame(animateCanvas);
    }
    animateCanvas();
}
