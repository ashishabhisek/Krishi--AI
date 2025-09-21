// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const langBtn = document.getElementById('lang-btn');
const langDropdown = document.getElementById('lang-dropdown');
const selectedLang = document.getElementById('selected-lang');
const dashboardLink = document.getElementById('dashboard-link');

const farmingImages = [
    'https://media.istockphoto.com/id/1328004520/photo/healthy-young-soybean-crop-in-field-at-dawn.jpg?s=612x612&w=0&k=20&c=XRw20PArfhkh6LLgFrgvycPLm0Uy9y7lu9U7fLqabVY=', // Plowing field
    'https://www.gaiaherbs.com/cdn/shop/articles/35250_WEB_Blog_FallTransition_09223.jpg?v=1664166459&width=900',   // Crop close-up (wheat)
    'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg', // Irrigation/watering
    'https://web-assets.bcg.com/dims4/default/f0aa1c8/2147483647/strip/true/crop/2880x1620+0+0/resize/768x432!/format/webp/quality/90/?url=http%3A%2F%2Fboston-consulting-group-brightspot.s3.amazonaws.com%2Fd3%2Fb1%2Fb1945a374994a81308c707357eee%2Fmaking-regenerative-agriculture-profitable-for-us-farmers-rectangle.jpg', // Tractor in field
    'https://images.pexels.com/photos/1112080/pexels-photo-1112080.jpeg'  // Harvesting/farming hands
];



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
        
        // Here you would typically handle language change
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
// In a real application, this would be based on actual authentication
let isAdmin = false; // Change this to true to simulate admin login

function toggleAdminFeatures() {
    if (isAdmin) {
        dashboardLink.style.display = 'block';
    } else {
        dashboardLink.style.display = 'none';
    }
}

// Simulate admin login/logout (for demonstration)
function simulateAdminLogin() {
    isAdmin = !isAdmin;
    toggleAdminFeatures();
    console.log('Admin status:', isAdmin ? 'Logged in' : 'Logged out');
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
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Feature cards animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Button click handlers
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
            case 'Ask a Query':
                console.log('Redirecting to query page...');
                // window.location.href = '/query';
                break;
            case 'Explore Knowledge':
                console.log('Redirecting to knowledge library...');
                // window.location.href = '/knowledge';
                break;
            case 'Login':
                console.log('Opening login modal...');
                // showLoginModal();
                break;
            case 'Register Now':
                console.log('Opening registration modal...');
                // showRegisterModal();
                break;
        }
    });
});

// Add ripple effect CSS
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Form validation (for future login/register forms)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[+]?[\d\s\-\(\)]{10,}$/;
    return re.test(phone);
}

// Utility function for showing notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
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
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Console message for developers
console.log('%cKrishiAI - AI-Based Farmer Query Support System', 'color: #4a7c59; font-size: 16px; font-weight: bold;');
console.log('%cDeveloped with ❤️ for farmers', 'color: #666; font-size: 12px;');

// Uncomment the line below to test admin features
// simulateAdminLogin();