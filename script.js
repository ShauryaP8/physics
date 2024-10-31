// Particle animation for homepage
const particleContainerBack = document.getElementById("particle-container-back");
const particleContainerFront = document.getElementById("particle-container-front");
const particles = [];
const numParticles = 100;

// Create particles for both layers
for (let i = 0; i < numParticles; i++) {
    const container = i % 2 === 0 ? particleContainerBack : particleContainerFront;
    const particle = document.createElement("div");
    particle.classList.add("particle");
    container.appendChild(particle);

    particles.push({
        element: particle,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 4 + 2,
        speedX: (Math.random() - 0.5) * (i % 2 === 0 ? 1 : 2),
        speedY: (Math.random() - 0.5) * (i % 2 === 0 ? 1 : 2),
        baseOpacity: Math.random() * 0.5 + 0.5,
        opacityChange: Math.random() * 0.02,
        color: `hsl(${Math.random() * 80 + 200}, 100%, 70%)`
    });

    // Apply initial styles, including color and size
    particle.style.backgroundColor = particles[i].color;
    particle.style.boxShadow = `0 0 8px ${particles[i].color}`;
    particle.style.width = `${particles[i].size}px`;
    particle.style.height = `${particles[i].size}px`;
}

function animateParticles() {
    particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Bounce off edges
        if (particle.x < 0 || particle.x > window.innerWidth) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > window.innerHeight) particle.speedY *= -1;

        // Opacity pulsing
        particle.baseOpacity += particle.opacityChange;
        if (particle.baseOpacity > 1 || particle.baseOpacity < 0.5) {
            particle.opacityChange *= -1;
        }

        // Update position, size, and opacity
        particle.element.style.transform = `translate(${particle.x}px, ${particle.y}px)`;
        particle.element.style.opacity = particle.baseOpacity;
    });
    requestAnimationFrame(animateParticles);
}

// Mouse interaction for warp effect
document.addEventListener("mousemove", (event) => {
    particles.forEach(particle => {
        const dx = particle.x - event.clientX;
        const dy = particle.y - event.clientY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) { // Increase distance sensitivity
            const force = Math.min(3 / distance, 0.05); // Higher force with proximity
            particle.speedX += dx * force;
            particle.speedY += dy * force;
        }
    });
});

// Navigate to the overview page with fade effect
function navigateTo(url) {
    document.body.classList.add("fade-out");
    setTimeout(() => {
        window.location.href = url;
    }, 500); // Matches the CSS transition time
}

// Apply the fade-in effect when the page loads
window.addEventListener("DOMContentLoaded", () => {
    document.body.classList.remove("fade-out");
});

// Add event listener for the button on the homepage
document.querySelector("button").addEventListener("click", function() {
    navigateTo("overview.html");
});

animateParticles();
