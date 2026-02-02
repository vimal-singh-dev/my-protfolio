// Slider Data
const slidesData = [
    {
        id: 1,
        title: `VIMAL<br><span class="highlight">SINGH</span><br>`,
        subtitle: "B.TECH IT 2027",
        meta: "AUTOMATION | <span class='highlight-text'>CLOUD</span> | DEVOPS",
        description: "Passionate about building real-world tools. Exploring the intersection of software development, automation, and cloud infrastructure.",
        image: "assets/one_last_flight.png"
    },
    {
        id: 2,
        title: `CLOUD<br><span class="highlight">NATIVE</span><br>AWS`,
        subtitle: "ARCHITECTING SOLUTIONS",
        meta: "CERTIFIED | <span class='highlight-text'>SCALABLE</span> | SECURE",
        description: "Leveraging the power of AWS and modern DevOps practices to deploy robust and scalable applications.",
        image: "assets/one_last_man_standing.png"
    },
    {
        id: 3,
        title: `FULL<br><span class="highlight">STACK</span><br>CODE`,
        subtitle: "NEXT.JS & NODE",
        meta: "PYTHON | <span class='highlight-text'>JAVA</span> | C++",
        description: "Building end-to-end applications with a versatile tech stack. From interactive frontends to powerful backends.",
        image: "assets/one_last_funeral.png"
    },
    {
        id: 4,
        title: `DIGITAL<br><span class="highlight">FORENSICS</span><br>UFDR`,
        subtitle: "ANALYZING DATA",
        meta: "SECURITY | <span class='highlight-text'>INSIGHTS</span> | TOOLS",
        description: "Developing specialized tools like UFDR Analyzer to extract and visualize critical forensic data.",
        image: "assets/one_last_voyage.png"
    },
    {
        id: 5,
        title: `OPEN<br><span class="highlight">TO WORK</span><br>HIRE`,
        subtitle: "READY TO JOIN",
        meta: "INTERNSHIPS | <span class='highlight-text'>STARTUPS</span> | COLLAB",
        description: "Seeking opportunities to contribute meaningful code. Fun fact: Anime Lover & Cyberpunk Fan.",
        image: "assets/one_last_dawn.png"
    }
];

let currentSlideIndex = 0;
const sliderContainer = document.querySelector('.slider-container');
const animationClasses = ['anim-fade', 'anim-zoom', 'anim-slide-up', 'anim-slide-left'];

function createSlideHTML(slideItem, index) {
    const isActive = index === 0 ? 'active' : '';
    // No animation class initially for the first slide on load
    return `
        <div class="slide ${isActive}" data-index="${index}">
            <div class="bg-image" style="background-image: url('${slideItem.image}')"></div>
            <div class="content">
                <h1 class="main-title">${slideItem.title}</h1>
                <div class="info-panel">
                    <h2 class="slide-title">${slideItem.subtitle}</h2>
                    <div class="meta">${slideItem.meta}</div>
                    <p class="description">${slideItem.description}</p>
                </div>
            </div>
            <div class="year">2026©</div>
        </div>
    `;
}

function initSlider() {
    sliderContainer.innerHTML = slidesData.map((slide, index) => createSlideHTML(slide, index)).join('');
    setInterval(nextSlide, 3000);
}

function nextSlide() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;

    // Cleanup old slide
    slides[currentSlideIndex].classList.remove('active');

    // Remove all animation classes from ALL slides to reset
    slides.forEach(s => s.classList.remove(...animationClasses));

    currentSlideIndex = (currentSlideIndex + 1) % slidesData.length;

    // Pick random animation
    const randomAnim = animationClasses[Math.floor(Math.random() * animationClasses.length)];

    slides[currentSlideIndex].classList.add('active');
    slides[currentSlideIndex].classList.add(randomAnim);
}

// Scroll Listener for Header & Nav
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Header glass effect
    if (scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Active Link Highlight
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(section.id)) {
                    link.classList.add('active');
                }
            });
        }
    });

});

initSlider();

// Custom Cursor & Parallax Logic
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
const floaters = document.querySelectorAll('.floater');

document.addEventListener('mousemove', (e) => {
    // Cursor Movement
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';

    // Follower Delay
    setTimeout(() => {
        follower.style.left = e.clientX + 'px';
        follower.style.top = e.clientY + 'px';
    }, 50);

    // Parallax Effect for 3D Shapes
    floaters.forEach((floater, index) => {
        const speed = (index + 1) * 0.02; // Varied speed for depth
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;

        // Apply translation while keeping existing transform (rotation handled by CSS animation)
        // Note: CSS animation uses transform, so we need a wrapper or handle cautiously.
        // Actually, CSS animation overrides 'transform'. A better approach is to use CSS variables for parallax offset
        // or apply parallax to a wrapper.
        // Simplified approach: Update CSS variable --parallax-x and --parallax-y on the container?
        // Or directly transform: To avoid conflict with CSS 'float' animation which uses transform, 
        // we can margin or top/left if position is absolute.

        // Let's use margin for parallax to avoid overriding 'transform: rotate...' in CSS animation
        floater.style.marginLeft = `${x}px`;
        floater.style.marginTop = `${y}px`;
    });
});


// Interactive Elements Hover
const interactables = document.querySelectorAll('a, button, .card, .service-box, input, textarea, i');

interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hovered-cursor');
        follower.style.opacity = '0'; // Hide follower on hover specifically or style differently
    });

    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovered-cursor');
        follower.style.opacity = '1';
    });
});

