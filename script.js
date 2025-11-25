/* ========================================
   TICUV Portfolio - Main JavaScript
   Digital Noir • Immersive Experience
   ======================================== */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {

    /* ========================================
       INITIALIZE LENIS SMOOTH SCROLL
       ======================================== */

    const lenis = new Lenis({
        duration: 1.2,          // Smooth scroll duration
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
        direction: 'vertical',   // Scroll direction
        gestureDirection: 'vertical',
        smooth: true,
        smoothTouch: false,      // Disable on touch devices for better performance
        touchMultiplier: 2
    });

    // Lenis scroll event
    lenis.on('scroll', (e) => {
        // You can add custom scroll events here if needed
    });

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Update Lenis on each animation frame
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    /* ========================================
       REGISTER GSAP & SCROLLTRIGGER
       ======================================== */

    gsap.registerPlugin(ScrollTrigger);

    /* ========================================
       PHASE 1: HERO ANIMATIONS
       Pinned fade-out effect for TICUV title
       ======================================== */

    const heroTitle = document.querySelector('.hero-title');
    const heroContent = document.querySelector('.hero-content');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    // Pin the hero section and fade out the title
    gsap.to(heroTitle, {
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
            pin: false,
            // markers: true, // Uncomment for debugging
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

    /* ========================================
       PHASE 2: SHOWCASE ANIMATIONS
       B&W to Color transition + Parallax
       ======================================== */

    const projectItems = document.querySelectorAll('.project-item');

    projectItems.forEach((item, index) => {
        const image = item.querySelector('.project-image');
        const info = item.querySelector('.project-info');

        // B&W to Color transition when image enters center of viewport
        ScrollTrigger.create({
            trigger: image,
            start: 'top 60%',      // When top of image hits 60% of viewport
            end: 'bottom 40%',     // When bottom of image hits 40% of viewport
            // markers: true,      // Uncomment for debugging
            onEnter: () => image.classList.add('active'),
            onLeave: () => image.classList.remove('active'),
            onEnterBack: () => image.classList.add('active'),
            onLeaveBack: () => image.classList.remove('active'),
        });

        // Parallax effect - image moves slower than scroll
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

        // Parallax effect - info moves slightly faster
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

        // Fade in animation when project enters viewport
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
    });

    /* ========================================
       PHASE 3: FOOTER CTA ANIMATIONS
       Scale and reveal effect
       ======================================== */

    const ctaText = document.querySelector('.cta-text');

    // Scale up CTA as it enters viewport
    gsap.from(ctaText, {
        scrollTrigger: {
            trigger: '.footer-section',
            start: 'top 80%',
            end: 'center center',
            scrub: 1.5,
            // markers: true, // Uncomment for debugging
        },
        scale: 0.8,
        opacity: 0,
        ease: 'power2.out'
    });

    // Character split animation (optional advanced effect)
    // Split text into spans for individual character animation
    const text = ctaText.textContent;
    ctaText.innerHTML = text
        .split('')
        .map((char, i) => {
            if (char === ' ' || char === '\n') return char;
            return `<span style="display: inline-block; transition-delay: ${i * 0.02}s">${char}</span>`;
        })
        .join('');

    /* ========================================
       SMOOTH SCROLL TO SECTIONS (Optional)
       ======================================== */

    // If you want to add smooth scroll to anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                lenis.scrollTo(target, {
                    offset: 0,
                    duration: 2
                });
            }
        });
    });

    /* ========================================
       LOADING ANIMATION (Initial page load)
       ======================================== */

    // Animate hero title on load
    gsap.from(heroTitle, {
        duration: 1.5,
        opacity: 0,
        scale: 0.9,
        ease: 'power3.out',
        delay: 0.2
    });

    gsap.from(scrollIndicator, {
        duration: 1,
        opacity: 0,
        y: 20,
        ease: 'power2.out',
        delay: 1
    });

    /* ========================================
       PERFORMANCE & UTILITY
       ======================================== */

    // Refresh ScrollTrigger on window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 250);
    });

    // Preload images for better performance
    const images = document.querySelectorAll('.project-image');
    images.forEach(img => {
        const tempImg = new Image();
        tempImg.src = img.src;
    });

    console.log('🎨 TICUV Portfolio initialized');
    console.log('✨ Lenis Smooth Scroll: Active');
    console.log('🎬 GSAP Animations: Ready');

});

/* ========================================
   ADDITIONAL CURSOR EFFECTS (Optional)
   Uncomment to add custom cursor
   ======================================== */

/*
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Add this to CSS:
// .custom-cursor {
//     width: 20px;
//     height: 20px;
//     border: 2px solid #fff;
//     border-radius: 50%;
//     position: fixed;
//     pointer-events: none;
//     z-index: 9999;
//     mix-blend-mode: difference;
// }
*/
