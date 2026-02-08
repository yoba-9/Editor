// ============================================
// REEL VIDEO PLAYERS
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const reelVideos = document.querySelectorAll('.reel-video');
    const videoContainers = document.querySelectorAll('.video-container');

    videoContainers.forEach((container, index) => {
        const video = reelVideos[index];

        // Click to play/pause
        container.addEventListener('click', () => {
            if (video.paused) {
                // Pause all other videos
                reelVideos.forEach(v => {
                    if (v !== video) {
                        v.pause();
                        v.currentTime = 0;
                        v.closest('.video-container').classList.remove('playing');
                    }
                });

                // Play this video
                video.play();
                container.classList.add('playing');
            } else {
                video.pause();
                container.classList.remove('playing');
            }
        });

        // Reset on video end
        video.addEventListener('ended', () => {
            video.currentTime = 0;
            container.classList.remove('playing');
        });
    });

    // Pause videos when scrolling away
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            const container = video.closest('.video-container');

            if (!entry.isIntersecting && !video.paused) {
                video.pause();
                video.currentTime = 0;
                container.classList.remove('playing');
            }
        });
    }, { threshold: 0.5 });

    reelVideos.forEach(video => videoObserver.observe(video));
});

// ============================================
// NAVIGATION SCROLL EFFECT
// ============================================
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ============================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// ANIMATE ELEMENTS ON SCROLL
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
const animateElements = document.querySelectorAll('.about-card, .portfolio-item, .skill-category, .contact-card');
animateElements.forEach(el => observer.observe(el));

// ============================================
// SKILL BAR ANIMATION
// ============================================
const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 200);
            skillObserver.unobserve(bar);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => skillObserver.observe(bar));

// ============================================
// CONTACT FORM HANDLING
// ============================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        projectType: document.getElementById('projectType').value,
        budget: document.getElementById('budget').value,
        message: document.getElementById('message').value
    };

    // Create mailto link with form data
    const subject = `Portfolio Inquiry from ${formData.name}`;
    const body = `
Name: ${formData.name}
Email: ${formData.email}
Project Type: ${formData.projectType || 'Not specified'}
Budget: ${formData.budget || 'Not specified'}

Message:
${formData.message}
    `.trim();

    const mailtoLink = `mailto:eyobmebratu49@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open email client
    window.location.href = mailtoLink;

    // Show success message
    showNotification('Opening your email client...', 'success');

    // Reset form after a short delay
    setTimeout(() => {
        contactForm.reset();
    }, 1000);
});

// ============================================
// NOTIFICATION SYSTEM
// ============================================
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        padding: '20px 30px',
        background: type === 'success' ? 'var(--gradient-primary)' : 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        color: 'white',
        borderRadius: '15px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        zIndex: '10000',
        animation: 'slideInRight 0.4s ease',
        border: '1px solid var(--card-border)',
        fontWeight: '500'
    });

    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s ease';
        setTimeout(() => notification.remove(), 400);
    }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// CURSOR EFFECT (Optional Premium Touch)
// ============================================
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
Object.assign(cursor.style, {
    position: 'fixed',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    background: 'rgba(16, 185, 129, 0.3)',
    pointerEvents: 'none',
    zIndex: '9999',
    transition: 'transform 0.2s ease',
    display: 'none'
});
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.display = 'block';
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
});

// Scale cursor on clickable elements
document.querySelectorAll('a, button, .portfolio-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
    });
});

// ============================================
// PERFORMANCE: Lazy Load Videos
// ============================================
const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const iframe = entry.target.querySelector('iframe');
            if (iframe && !iframe.src) {
                iframe.src = iframe.dataset.src;
            }
            videoObserver.unobserve(entry.target);
        }
    });
}, { rootMargin: '50px' });

document.querySelectorAll('.video-wrapper').forEach(wrapper => {
    videoObserver.observe(wrapper);
});

// ============================================
// FORM VALIDATION
// ============================================
const inputs = document.querySelectorAll('input[required], textarea[required]');

inputs.forEach(input => {
    input.addEventListener('blur', () => {
        validateInput(input);
    });

    input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
            validateInput(input);
        }
    });
});

function validateInput(input) {
    const isValid = input.checkValidity();

    if (!isValid) {
        input.style.borderColor = '#ef4444';
        input.classList.add('error');
    } else {
        input.style.borderColor = 'var(--card-border)';
        input.classList.remove('error');
    }

    return isValid;
}

// ============================================
// EASTER EGG: Konami Code
// ============================================
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join('') === konamiSequence.join('')) {
        showNotification('🎬 You found the secret! Keep creating amazing content!', 'success');
        document.body.style.animation = 'rainbow 2s linear';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
    }
});

const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);

console.log('%c🎬 Welcome to Eyob Mebratu\'s Portfolio!', 'font-size: 20px; color: #667eea; font-weight: bold;');
console.log('%cLooking to hire a video editor? Let\'s create something amazing together!', 'font-size: 14px; color: #a1a1aa;');
