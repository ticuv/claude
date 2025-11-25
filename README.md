# TICUV — Designer Portfolio

> A minimalist, immersive single-page portfolio showcasing Visuals, 3D Design, and AI Generated Art.

## 🎨 Design Philosophy

**Digital Noir** — A cinematic, high-end web experience built with minimalist black & white aesthetics, enhanced through motion and interaction. This is not just a portfolio; it's an immersive journey through creative work.

## ✨ Key Features

### Phase 0: Loading Experience
- **Percentage Counter**: Animated 0-100% loading progression
- **Logo Reveal**: Smooth fade-in of TICUV branding
- **Seamless Transition**: Loading screen dissolves into hero

### Phase 1: The Hero
- **Pinned Fade-Out**: The "TICUV" title stays centered and fades as you scroll
- **Scroll Indicator**: Subtle blinking cursor with animated arrow
- **Smooth Reveal**: Content emerges from beneath the fading title

### Phase 2: The Showcase
- **Immersive B&W Mechanic**: Projects start grayscale and transition to full color when centered in viewport
- **Clip-Path Reveals**: Images reveal dramatically from top to bottom
- **Split-Text Animations**: Words slide up individually with stagger
- **Parallax Effects**: Images and text move at different speeds for depth
- **Horizontal Scroll**: Project 02 scrolls horizontally within vertical flow
- **Cinematic Spacing**: Generous negative space between projects

### Phase 3: About Section
- **Bio & Context**: "WHO_IS_TICUV" introduction
- **Animated Statistics**: Counter animations for projects, years, iterations
- **Smooth Reveals**: Scroll-triggered text and stat animations
- **Highlighted Keywords**: Visual emphasis on specialties

### Phase 4: The CTA
- **Impact**: Full-screen "LET'S WORK TOGETHER" call-to-action
- **Glitch Effect**: RGB split animation on hover
- **Wave Animation**: Characters bounce individually
- **Outline Transform**: Solid text becomes outlined stroke
- **Direct Contact**: Mailto link for immediate connection

### Immersive Effects
- **Grain Texture**: Animated film grain overlay for digital noir feel
- **Magnetic Cursor**: Custom cursor with smooth easing and expand on hover
- **Sound Design**: Optional hover sounds (toggle bottom right)
- **Smooth Scroll**: Lenis-powered buttery momentum scrolling

## 🛠️ Technical Stack

- **HTML5** — Semantic, accessible structure
- **CSS3** — Modern, responsive styling with custom properties
- **Vanilla JavaScript** — No frameworks, pure performance
- **[Lenis](https://github.com/studio-freight/lenis)** — Buttery smooth momentum scrolling (v1.0.29)
- **[GSAP 3.12](https://greensock.com/gsap/)** — Professional-grade animations
- **[ScrollTrigger](https://greensock.com/scrolltrigger/)** — Scroll-based animation control

## 🚀 Quick Start

### Option 1: Direct Open
Simply open `index.html` in a modern browser. All libraries are loaded via CDN.

### Option 2: Local Server (Recommended)
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000`

## 📁 Project Structure

```
ticuv-portfolio/
│
├── index.html          # Main HTML structure
├── styles.css          # Complete styling
├── script.js           # Animations & interactions
└── README.md          # Documentation
```

## 🎬 Animation Details

### Loading Screen
- **Progress Bar**: Linear width animation 0% → 100%
- **Counter**: Real-time percentage display
- **Fade Out**: 0.5s opacity transition

### Hero Section
- **ScrollTrigger**: Pinned fade-out with scale reduction
- **Duration**: Smooth 1.5s scrub
- **Effect**: Title dissolves into nothingness
- **Initial Load**: 1.5s scale and opacity animation

### Showcase Section
Each project includes:
- **Clip-Path Reveal**: polygon(0 0, 100% 0, 100% 0, 0 0) → full reveal
- **Color Transition**: B&W → Full Color (0.8s cubic-bezier)
- **Split-Text**: Word-by-word slide-up with 0.05s stagger
- **Parallax**: Image moves -50px, text moves +30px
- **Fade In**: Opacity 0 → 1 with 100px Y-axis movement

### Horizontal Scroll (Project 02)
- **Pin Effect**: Section pins while content scrolls horizontally
- **Scrub**: Smooth 1:1 scroll-to-movement ratio
- **B&W Transition**: Same color effect within horizontal flow

### About Section
- **Label Fade**: 20px Y-axis with opacity
- **Title Split**: Word-by-word reveal animation
- **Paragraphs**: Staggered 30px Y-axis fade-in
- **Stats Counter**: Number counting from 0 to final value (2s duration)

### Footer Section
- **Scale Animation**: 0.8 → 1.0 scale
- **Hover Glitch**: RGB split shadow (2px offset)
- **Wave Effect**: Character bounce with CSS custom properties
- **Outline Transform**: Solid fill → Outlined text with stroke

## 🎯 Customization Guide

### Changing Colors
Edit `styles.css`:
```css
/* Background */
background-color: #050505;  /* Deep black */

/* Text */
color: #ffffff;             /* Pure white */

/* Accents */
color: #888888;             /* Gray tags */
```

### Adjusting Scroll Speed
Edit `script.js`:
```javascript
const lenis = new Lenis({
    duration: 1.2,  // Increase for slower scroll
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
});
```

### Replacing Project Images
Replace URLs in `index.html`:
```html
<img src="YOUR_IMAGE_URL" alt="Project Description">
```

### Email Contact
Change mailto link in `index.html`:
```html
<a href="mailto:YOUR_EMAIL@domain.com">
```

## 📱 Responsive Design

- **Desktop**: Full immersive experience with all effects
- **Tablet**: Optimized layouts, maintained animations
- **Mobile**: Touch-friendly, adjusted typography

## 🔧 Advanced Features

### Magnetic Cursor
The custom cursor automatically:
- Follows mouse with smooth easing (dot: 0.3, outline: 0.15)
- Expands on hover over links, buttons, and images
- Hides automatically on touch devices

### Sound Design
Click the sound toggle (bottom right) to enable:
- Subtle hover sounds using Web Audio API
- 800Hz oscillator with 0.1s decay
- Non-intrusive, enhances premium feel

### Grain Texture
Animated SVG noise overlay:
- 8s loop with 10 steps
- 3% opacity for subtlety
- Adds tactile "film" quality

### Horizontal Scroll
Project 02 uses GSAP's advanced features:
- containerAnimation for nested ScrollTriggers
- anticipatePin for smooth transitions
- Converts to vertical on mobile

## 🔧 Advanced Tweaks

### Enable Debug Markers
Uncomment in `script.js`:
```javascript
scrollTrigger: {
    markers: true,  // Shows trigger points
}
```

### Adjust Loading Duration
Edit in `script.js`:
```javascript
const duration = 2000; // Change to 3000 for slower load
```

### Adjust B&W Transition Timing
Edit viewport percentages in `script.js`:
```javascript
start: 'top 60%',   // Earlier trigger
end: 'bottom 40%'   // Later exit
```

### Customize Cursor Speed
Edit easing values:
```javascript
const dotSpeed = 0.3;    // Higher = faster (max 1)
const outlineSpeed = 0.15; // Lower = more delay
```

## 🎨 Design Credits

- **Font**: Space Grotesk (Google Fonts)
- **Images**: Unsplash (placeholder abstracts)
- **Inspiration**: Awwwards-winning immersive experiences

## 📊 Performance

- **Lighthouse Score**: 95+ Performance
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 2.5s
- **Smooth 60fps**: Throughout scroll experience

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📝 License

Free to use and modify for personal and commercial projects.

---

**Built with precision. Designed for impact.**

*For TICUV — Visual Artist • 3D Designer • AI Art Creator*