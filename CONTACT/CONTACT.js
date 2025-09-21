// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const langBtn = document.getElementById('lang-btn');
const langDropdown = document.getElementById('lang-dropdown');
const selectedLang = document.getElementById('selected-lang');
const contactForm = document.getElementById('contactForm');
const successModal = document.getElementById('successModal');
const modalCloseBtn = document.getElementById('modalCloseBtn');

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

// Form Validation Functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[+]?[\d\s\-\(\)]{10,}$/;
    return re.test(phone);
}

function showError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    errorElement.textContent = message;
    errorElement.classList.add('show');
    
    const field = document.getElementById(fieldId);
    field.style.borderColor = '#dc3545';
}

function clearError(fieldId) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    errorElement.classList.remove('show');
    
    const field = document.getElementById(fieldId);
    field.style.borderColor = '#e0e0e0';
}

function validateForm() {
    let isValid = true;
    
    // Clear all previous errors
    ['name', 'email', 'phone', 'subject', 'message'].forEach(fieldId => {
        clearError(fieldId);
    });
    
    // Validate Name
    const name = document.getElementById('name').value.trim();
    if (name.length < 2) {
        showError('name', 'Name must be at least 2 characters long');
        isValid = false;
    }
    
    // Validate Email
    const email = document.getElementById('email').value.trim();
    if (!validateEmail(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate Phone
    const phone = document.getElementById('phone').value.trim();
    if (!validatePhone(phone)) {
        showError('phone', 'Please enter a valid phone number');
        isValid = false;
    }
    
    // Validate Subject
    const subject = document.getElementById('subject').value;
    if (!subject) {
        showError('subject', 'Please select a subject');
        isValid = false;
    }
    
    // Validate Message
    const message = document.getElementById('message').value.trim();
    if (message.length < 10) {
        showError('message', 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    return isValid;
}

// Form Submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (validateForm()) {
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission delay
        setTimeout(() => {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Show success modal
            successModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Reset form
            contactForm.reset();
            
            // Track form submission
            console.log('Contact form submitted successfully');
        }, 2000);
    }
});

// Modal Close Functionality
modalCloseBtn.addEventListener('click', closeModal);
successModal.addEventListener('click', (e) => {
    if (e.target === successModal) {
        closeModal();
    }
});

function closeModal() {
    successModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Real-time validation
document.getElementById('name').addEventListener('blur', () => {
    const name = document.getElementById('name').value.trim();
    if (name && name.length < 2) {
        showError('name', 'Name must be at least 2 characters long');
    } else {
        clearError('name');
    }
});

document.getElementById('email').addEventListener('blur', () => {
    const email = document.getElementById('email').value.trim();
    if (email && !validateEmail(email)) {
        showError('email', 'Please enter a valid email address');
    } else {
        clearError('email');
    }
});

document.getElementById('phone').addEventListener('blur', () => {
    const phone = document.getElementById('phone').value.trim();
    if (phone && !validatePhone(phone)) {
        showError('phone', 'Please enter a valid phone number');
    } else {
        clearError('phone');
    }
});

document.getElementById('message').addEventListener('blur', () => {
    const message = document.getElementById('message').value.trim();
    if (message && message.length < 10) {
        showError('message', 'Message must be at least 10 characters long');
    } else {
        clearError('message');
    }
});

// Button Ripple Effect
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
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
    });
});

// Scroll Animations
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
document.querySelectorAll('.contact-form-container, .contact-info-card, .info-item').forEach(el => {
    observer.observe(el);
});

// Social Media Links
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const platform = link.classList[1]; // facebook, instagram, etc.
        console.log(`Opening ${platform} page...`);
        // In a real application, these would be actual social media URLs
        showNotification(`${platform.charAt(0).toUpperCase() + platform.slice(1)} page would open here`, 'info');
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

// Handle form field focus effects
document.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('focus', () => {
        field.parentElement.classList.add('focused');
    });
    
    field.addEventListener('blur', () => {
        field.parentElement.classList.remove('focused');
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

// Keyboard accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && successModal.classList.contains('active')) {
        closeModal();
    }
});

// Console message for developers
console.log('%cKrishiAI Contact Page', 'color: #4a7c59; font-size: 16px; font-weight: bold;');
console.log('%cContact form ready with validation', 'color: #666; font-size: 12px;');