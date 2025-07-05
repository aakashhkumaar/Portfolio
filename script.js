// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in, .slide-up, .scale-in').forEach(el => {
    observer.observe(el);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});

// Scroll to Top Button
const scrollToTopButton = document.getElementById('scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        scrollToTopButton.classList.remove('opacity-0', 'translate-y-4');
        scrollToTopButton.classList.add('opacity-100', 'translate-y-0');
    } else {
        scrollToTopButton.classList.remove('opacity-100', 'translate-y-0');
        scrollToTopButton.classList.add('opacity-0', 'translate-y-4');
    }
});

scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Copy Email
const emailAddressSpan = document.getElementById('email-address');
const copyEmailButton = document.getElementById('copy-email-button');
const copyFeedbackSpan = document.getElementById('copy-feedback');

copyEmailButton.addEventListener('click', () => {
    const email = emailAddressSpan.textContent;
    const tempInput = document.createElement('textarea');
    tempInput.value = email;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    copyFeedbackSpan.classList.remove('hidden');
    setTimeout(() => {
        copyFeedbackSpan.classList.add('hidden');
    }, 2000);
});

// Three.js hero background
window.onload = function() {
    const canvas = document.getElementById('hero-canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const particleCount = 1000;
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    const color1 = new THREE.Color(0xA78BFA);
    const color2 = new THREE.Color(0xD8B4FE);
    const color3 = new THREE.Color(0xFBCFE8);

    for (let i = 0; i < particleCount; i++) {
        positions.push((Math.random() - 0.5) * 200, (Math.random() - 0.5) * 200, (Math.random() - 0.5) * 200);

        const color = new THREE.Color();
        if (Math.random() < 0.33) color.copy(color1);
        else if (Math.random() < 0.66) color.copy(color2);
        else color.copy(color3);
        colors.push(color.r, color.g, color.b);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 0.5,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    camera.position.z = 50;

    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;
    });

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    let scrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        scrollY = window.scrollY;
    });

    function animate() {
        requestAnimationFrame(animate);
        targetX = mouseX * 0.001;
        targetY = mouseY * 0.001;

        particles.rotation.y += 0.0005 * (targetX - particles.rotation.y);
        particles.rotation.x += 0.0005 * (targetY - particles.rotation.x);

        particles.position.y = -scrollY * 0.05;

        const positions = geometry.attributes.position.array;
        for (let i = 0; i < particleCount; i++) {
            positions[i * 3 + 1] += 0.01;
            if (positions[i * 3 + 1] > 100) positions[i * 3 + 1] = -100;
        }
        geometry.attributes.position.needsUpdate = true;

        renderer.render(scene, camera);
    }
    animate();
};

// Parallax effect for sections
document.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.parallax-section');
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const scrollFactor = 0.1;
        const offset = (window.innerHeight - rect.top) * scrollFactor;
        section.style.setProperty('--scroll-y-offset', `${-offset}px`);
    });
});
