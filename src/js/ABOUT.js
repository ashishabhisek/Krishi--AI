// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const langBtn = document.getElementById('lang-btn');
const langDropdown = document.getElementById('lang-dropdown');
const selectedLang = document.getElementById('selected-lang');
const dashboardLink = document.getElementById('dashboard-link');

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Language Selector
langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    langDropdown.classList.toggle('active');
});

// Language Selection
document.querySelectorAll('.lang-dropdown a').forEach(langOption => {
    langOption.addEventListener('click', (e) => {
        e.preventDefault();
        const selectedLanguage = e.target.getAttribute('data-lang');
        selectedLang.textContent = selectedLanguage;
        langDropdown.classList.remove('active');
        console.log('Language changed to:', selectedLanguage);
    });
});

// Close language dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!langBtn.contains(e.target) && !langDropdown.contains(e.target)) {
        langDropdown.classList.remove('active');
    }
});

// Admin Dashboard Visibility (Simulated)
let isAdmin = false;

function toggleAdminFeatures() {
    if (isAdmin) {
        dashboardLink.style.display = 'block';
    } else {
        dashboardLink.style.display = 'none';
    }
}

// Initialize admin features
toggleAdminFeatures();

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.stat-item, .mission-card, .vision-card, .feature-card, .team-card').forEach(el => {
    observer.observe(el);
});

// Counter animation for statistics
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(start));
        }
    }, 16);
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M+';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K+';
    } else if (num === 95) {
        return num + '%';
    } else if (num === 24) {
        return '24/7';
    }
    return num.toString();
}

// Animate counters when they come into view
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const text = statNumber.textContent;
            
            if (text.includes('50K+')) {
                animateCounter(statNumber, 50000);
            } else if (text.includes('1M+')) {
                animateCounter(statNumber, 1000000);
            } else if (text.includes('95%')) {
                animateCounter(statNumber, 95);
            } else if (text.includes('24/7')) {
                animateCounter(statNumber, 24);
            }
            
            statObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-item').forEach(stat => {
    statObserver.observe(stat);
});

// Button click handlers with ripple effect
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Add ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        // Handle button actions
        const buttonText = this.textContent.trim();
        switch(buttonText) {
            case 'Get Started':
                console.log('Redirecting to registration...');
                showNotification('Registration page would open here', 'info');
                break;
            case 'Learn More':
                console.log('Showing more information...');
                showNotification('More information would be displayed', 'info');
                break;
        }
    });
});

// LinkedIn button handlers
document.querySelectorAll('.linkedin-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const teamCard = btn.closest('.team-card');
        const name = teamCard.querySelector('h3').textContent;
        console.log(`Opening LinkedIn profile for ${name}...`);
        showNotification(`${name}'s LinkedIn profile would open here`, 'info');
    });
});

// Feature card interactions
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('click', () => {
        const title = card.querySelector('h3').textContent;
        console.log(`Feature clicked: ${title}`);
        showNotification(`Learn more about ${title}`, 'info');
    });
});

// Team card hover effects
document.querySelectorAll('.team-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Utility function for showing notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 350px;
        word-wrap: break-word;
    `;
    
    switch(type) {
        case 'success':
            notification.style.backgroundColor = '#4a7c59';
            break;
        case 'error':
            notification.style.backgroundColor = '#dc3545';
            break;
        case 'warning':
            notification.style.backgroundColor = '#ffc107';
            notification.style.color = '#000';
            break;
        default:
            notification.style.backgroundColor = '#17a2b8';
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Dynamic text animation for hero section
const heroTitle = document.querySelector('.hero-content h2');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.innerHTML = '';
    
    text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.animationDelay = `${index * 0.05}s`;
        span.style.opacity = '0';
        span.style.animation = 'fadeInChar 0.5s ease forwards';
        heroTitle.appendChild(span);
    });
}

// Add CSS for character animation
const charAnimationStyle = document.createElement('style');
charAnimationStyle.textContent = `
    @keyframes fadeInChar {
        to {
            opacity: 1;
            transform: translateY(0);
        }
        from {
            opacity: 0;
            transform: translateY(20px);
        }
    }
`;
document.head.appendChild(charAnimationStyle);

// Keyboard accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open dropdowns
        langDropdown.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Focus management for accessibility
document.querySelectorAll('.btn, .nav-link, .linkedin-btn').forEach(element => {
    element.addEventListener('focus', () => {
        element.style.outline = '2px solid #4a7c59';
        element.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', () => {
        element.style.outline = 'none';
    });
});

// Console message for developers
console.log('%cKrishiAI About Page', 'color: #4a7c59; font-size: 16px; font-weight: bold;');
console.log('%cAbout page loaded with animations and interactions', 'color: #666; font-size: 12px;');