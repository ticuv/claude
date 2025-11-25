/* ========================================
   TICUV Portfolio - Enhanced JavaScript
   Digital Noir • Award-Winning Experience
   ======================================== */

// Wait for all resources to load
window.addEventListener('load', () => {
    initLoadingScreen();
});

// Start initializing as soon as DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initSound();
    initLenisScroll();
    initGSAPAnimations();
    initInteractions();
});

/* ========================================
   LOADING SCREEN WITH PERCENTAGE COUNTER
   ======================================== */

function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingProgress = document.querySelector('.loading-progress');
    const loadingPercentage = document.querySelector('.loading-percentage');

    let progress = 0;
    const duration = 2000; // 2 seconds
    const interval = 20;
    const increment = (100 / duration) * interval;

    const progressInterval = setInterval(() => {
        progress += increment;

        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);

            // Hide loading screen
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                // Start hero animations
                gsap.to('.hero-title', {
                    duration: 1.5,
                    opacity: 1,
                    scale: 1,
                    ease: 'power3.out'
                });
            }, 300);
        }

        loadingProgress.style.width = progress + '%';
        loadingPercentage.textContent = Math.floor(progress) + '%';
    }, interval);
}

/* ========================================
   MAGNETIC CURSOR EFFECT
   ======================================== */

function initCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let outlineX = 0;
    let outlineY = 0;

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor movement
    function animateCursor() {
        // Dot follows closely
        const dotSpeed = 0.3;
        cursorX += (mouseX - cursorX) * dotSpeed;
        cursorY += (mouseY - cursorY) * dotSpeed;

        // Outline follows with delay
        const outlineSpeed = 0.15;
        outlineX += (mouseX - outlineX) * outlineSpeed;
        outlineY += (mouseY - outlineY) * outlineSpeed;

        cursorDot.style.left = cursorX + 'px';
        cursorDot.style.top = cursorY + 'px';
        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Add hover class to interactive elements
    const hoverTargets = document.querySelectorAll('a, button, .project-image');

    hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });

        target.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
}

/* ========================================
   SOUND DESIGN (Optional Ambient)
   ======================================== */

function initSound() {
    const soundToggle = document.querySelector('.sound-toggle');
    const soundIcon = document.querySelector('.sound-icon');
    let soundEnabled = false;

    // Create subtle hover sounds using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    function playHoverSound() {
        if (!soundEnabled) return;

        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 800;
        gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }

    soundToggle.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        soundIcon.textContent = soundEnabled ? '🔊' : '🔇';

        if (soundEnabled && audioContext.state === 'suspended') {
            audioContext.resume();
        }
    });

    // Add sound to interactive elements
    const soundTargets = document.querySelectorAll('a, button, .project-image');
    soundTargets.forEach(target => {
        target.addEventListener('mouseenter', playHoverSound);
    });
}

/* ========================================
   INITIALIZE LENIS SMOOTH SCROLL
   ======================================== */

let lenis;

function initLenisScroll() {
    lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2
    });

    lenis.on('scroll', ScrollTrigger.update);

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
}

/* ========================================
   GSAP ANIMATIONS & SCROLLTRIGGER
   ======================================== */

function initGSAPAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // HERO ANIMATIONS
    animateHero();

    // SHOWCASE ANIMATIONS
    animateShowcase();

    // HORIZONTAL SCROLL PROJECT
    animateHorizontalScroll();

    // ABOUT SECTION
    animateAboutSection();

    // FOOTER CTA
    animateCTA();

    // Refresh on resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 250);
    });
}

/* ========================================
   HERO SECTION ANIMATIONS
   ======================================== */

function animateHero() {
    const heroTitle = document.querySelector('.hero-title');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    // Pin and fade out hero title
    gsap.to(heroTitle, {
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
        },
        opacity: 0,
        scale: 0.8,
        y: -100,
        ease: 'power2.inOut'
    });

    // Fade out scroll indicator
    gsap.to(scrollIndicator, {
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'center top',
            scrub: 1,
        },
        opacity: 0,
        y: -20,
        ease: 'power2.out'
    });
}

/* ========================================
   SHOWCASE SECTION ANIMATIONS
   ======================================== */

function animateShowcase() {
    const projectItems = document.querySelectorAll('.project-item:not(.horizontal-project)');

    projectItems.forEach((item, index) => {
        const image = item.querySelector('.project-image');
        const imageWrapper = item.querySelector('.project-image-wrapper');
        const info = item.querySelector('.project-info');

        // CLIP-PATH REVEAL ANIMATION
        gsap.from(imageWrapper, {
            scrollTrigger: {
                trigger: item,
                start: 'top 75%',
                end: 'top 40%',
                scrub: 1,
            },
            clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
            ease: 'power2.out'
        });

        // B&W to Color transition
        ScrollTrigger.create({
            trigger: image,
            start: 'top 60%',
            end: 'bottom 40%',
            onEnter: () => image.classList.add('active'),
            onLeave: () => image.classList.remove('active'),
            onEnterBack: () => image.classList.add('active'),
            onLeaveBack: () => image.classList.remove('active'),
        });

        // Parallax - image moves slower
        gsap.to(image, {
            scrollTrigger: {
                trigger: item,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5,
            },
            y: -50,
            ease: 'none'
        });

        // Parallax - info moves faster
        gsap.to(info, {
            scrollTrigger: {
                trigger: item,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5,
            },
            y: 30,
            ease: 'none'
        });

        // Fade in with slide up
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                end: 'top 50%',
                scrub: 1,
            },
            opacity: 0,
            y: 100,
            ease: 'power2.out'
        });

        // TEXT REVEAL ANIMATION (Split text effect)
        const title = item.querySelector('.project-title');
        if (title) {
            splitTextReveal(title, item);
        }
    });
}

/* ========================================
   SPLIT TEXT REVEAL ANIMATION
   ======================================== */

function splitTextReveal(element, trigger) {
    const text = element.textContent;
    element.innerHTML = '';

    // Split into words
    const words = text.split(' ');
    words.forEach((word, wordIndex) => {
        const wordSpan = document.createElement('span');
        wordSpan.style.display = 'inline-block';
        wordSpan.style.overflow = 'hidden';
        wordSpan.style.marginRight = '0.3em';

        const innerSpan = document.createElement('span');
        innerSpan.textContent = word;
        innerSpan.style.display = 'inline-block';
        innerSpan.style.transform = 'translateY(100%)';

        wordSpan.appendChild(innerSpan);
        element.appendChild(wordSpan);

        // Animate each word
        gsap.to(innerSpan, {
            scrollTrigger: {
                trigger: trigger,
                start: 'top 70%',
                end: 'top 50%',
                scrub: 1,
            },
            y: 0,
            ease: 'power2.out',
            delay: wordIndex * 0.05
        });
    });
}

/* ========================================
   HORIZONTAL SCROLL PROJECT
   ======================================== */

function animateHorizontalScroll() {
    const horizontalSection = document.querySelector('.horizontal-project');
    if (!horizontalSection) return;

    const container = horizontalSection.querySelector('.horizontal-scroll-container');
    const scrollWidth = container.scrollWidth - window.innerWidth;

    gsap.to(container, {
        scrollTrigger: {
            trigger: horizontalSection,
            start: 'top top',
            end: () => `+=${scrollWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
        },
        x: -scrollWidth,
        ease: 'none'
    });

    // Animate images within horizontal scroll
    const images = container.querySelectorAll('.project-image');
    images.forEach((img, index) => {
        ScrollTrigger.create({
            trigger: img,
            start: 'left center',
            end: 'right center',
            containerAnimation: gsap.to(container, { x: -scrollWidth }),
            onEnter: () => img.classList.add('active'),
            onLeave: () => img.classList.remove('active'),
            onEnterBack: () => img.classList.add('active'),
            onLeaveBack: () => img.classList.remove('active'),
        });
    });
}

/* ========================================
   ABOUT SECTION ANIMATIONS
   ======================================== */

function animateAboutSection() {
    const aboutSection = document.querySelector('.about-section');
    if (!aboutSection) return;

    // Fade in label
    gsap.from('.about-label', {
        scrollTrigger: {
            trigger: aboutSection,
            start: 'top 70%',
            end: 'top 50%',
            scrub: 1,
        },
        opacity: 0,
        y: 20,
        ease: 'power2.out'
    });

    // Reveal title with split text
    const title = document.querySelector('.about-title');
    if (title) {
        splitTextReveal(title, aboutSection);
    }

    // Fade in paragraphs
    gsap.from('.about-text p', {
        scrollTrigger: {
            trigger: '.about-text',
            start: 'top 70%',
            end: 'top 50%',
            scrub: 1,
        },
        opacity: 0,
        y: 30,
        stagger: 0.2,
        ease: 'power2.out'
    });

    // Animate stats
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach((stat, index) => {
        gsap.from(stat, {
            scrollTrigger: {
                trigger: '.about-stats',
                start: 'top 70%',
                end: 'top 50%',
                scrub: 1,
            },
            opacity: 0,
            y: 50,
            delay: index * 0.1,
            ease: 'power2.out'
        });

        // Animate numbers counting up
        const number = stat.querySelector('.stat-number');
        const finalValue = number.textContent;

        if (finalValue !== '∞') {
            const numValue = parseInt(finalValue);

            ScrollTrigger.create({
                trigger: stat,
                start: 'top 80%',
                onEnter: () => {
                    gsap.from(number, {
                        duration: 2,
                        textContent: 0,
                        snap: { textContent: 1 },
                        ease: 'power1.inOut',
                        onUpdate: function() {
                            number.textContent = Math.floor(this.targets()[0].textContent) + '+';
                        }
                    });
                }
            });
        }
    });
}

/* ========================================
   FOOTER CTA ANIMATIONS
   ======================================== */

function animateCTA() {
    const ctaText = document.querySelector('.cta-text');

    // Scale up CTA
    gsap.from(ctaText, {
        scrollTrigger: {
            trigger: '.footer-section',
            start: 'top 80%',
            end: 'center center',
            scrub: 1.5,
        },
        scale: 0.8,
        opacity: 0,
        ease: 'power2.out'
    });

    // Enhanced character split with index for wave effect
    const text = ctaText.textContent;
    ctaText.innerHTML = text
        .split('')
        .map((char, i) => {
            if (char === ' ' || char === '\n') return char;
            return `<span style="--char-index: ${i};">${char}</span>`;
        })
        .join('');
}

/* ========================================
   ADDITIONAL INTERACTIONS
   ======================================== */

function initInteractions() {
    // Smooth scroll to anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target && lenis) {
                lenis.scrollTo(target, {
                    offset: 0,
                    duration: 2
                });
            }
        });
    });

    // Preload images
    const images = document.querySelectorAll('.project-image');
    images.forEach(img => {
        const tempImg = new Image();
        tempImg.src = img.src;
    });

    console.log('🎨 TICUV Portfolio Enhanced');
    console.log('✨ Lenis Smooth Scroll: Active');
    console.log('🎬 GSAP Animations: Ready');
    console.log('🎯 Magnetic Cursor: Active');
    console.log('🔊 Sound Design: Optional');
    console.log('🎞️ Horizontal Scroll: Active');
    console.log('📊 About Section: Animated');
}
