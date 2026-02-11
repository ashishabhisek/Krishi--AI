// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const langBtn = document.getElementById('lang-btn');
const langDropdown = document.getElementById('lang-dropdown');
const selectedLang = document.getElementById('selected-lang');
const feedbackForm = document.getElementById('feedback-form');
const starRating = document.getElementById('star-rating');
const ratingInput = document.getElementById('rating');
const successModal = document.getElementById('success-modal');
const closeModalBtn = document.getElementById('close-modal');

// Form elements
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const feedbackTypeSelect = document.getElementById('feedback-type');
const messageTextarea = document.getElementById('message');

// Error message elements
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const feedbackTypeError = document.getElementById('feedback-type-error');
const ratingError = document.getElementById('rating-error');
const messageError = document.getElementById('message-error');

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

// Star Rating Functionality
const stars = starRating.querySelectorAll('.star');
let currentRating = 0;

stars.forEach((star, index) => {
    const rating = index + 1;
    
    // Click event
    star.addEventListener('click', () => {
        currentRating = rating;
        ratingInput.value = rating;
        updateStarDisplay(rating);
        clearError('rating');
    });
    
    // Hover events
    star.addEventListener('mouseenter', () => {
        updateStarDisplay(rating, true);
    });
    
    starRating.addEventListener('mouseleave', () => {
        updateStarDisplay(currentRating);
    });
});

function updateStarDisplay(rating, isHover = false) {
    stars.forEach((star, index) => {
        const starRating = index + 1;
        star.classList.remove('active', 'hover');
        
        if (starRating <= rating) {
            star.classList.add(isHover ? 'hover' : 'active');
        }
    });
}

// Form Validation Functions
function validateName(name) {
    if (!name.trim()) {
        return 'Name is required';
    }
    if (name.trim().length < 2) {
        return 'Name must be at least 2 characters long';
    }
    return '';
}

function validateEmail(email) {
    if (!email.trim()) {
        return 'Email is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Please enter a valid email address';
    }
    return '';
}

function validateFeedbackType(type) {
    if (!type) {
        return 'Please select a feedback type';
    }
    return '';
}

function validateRating(rating) {
    if (rating === 0) {
        return 'Please provide a rating';
    }
    return '';
}

function validateMessage(message) {
    if (!message.trim()) {
        return 'Message is required';
    }
    if (message.trim().length < 10) {
        return 'Message must be at least 10 characters long';
    }
    return '';
}

// Display Error Function
function displayError(fieldName, message) {
    const errorElement = document.getElementById(`${fieldName}-error`);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

// Clear Error Function
function clearError(fieldName) {
    const errorElement = document.getElementById(`${fieldName}-error`);
    if (errorElement) {
        errorElement.textContent = '';
    }
}

// Clear all errors
function clearAllErrors() {
    ['name', 'email', 'feedback-type', 'rating', 'message'].forEach(clearError);
}

// Real-time validation
nameInput.addEventListener('input', () => {
    const error = validateName(nameInput.value);
    displayError('name', error);
});

emailInput.addEventListener('input', () => {
    const error = validateEmail(emailInput.value);
    displayError('email', error);
});

feedbackTypeSelect.addEventListener('change', () => {
    const error = validateFeedbackType(feedbackTypeSelect.value);
    displayError('feedback-type', error);
});

messageTextarea.addEventListener('input', () => {
    const error = validateMessage(messageTextarea.value);
    displayError('message', error);
});

// Form Submission
feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Clear all previous errors
    clearAllErrors();
    
    // Get form data
    const formData = {
        name: nameInput.value,
        email: emailInput.value,
        feedbackType: feedbackTypeSelect.value,
        rating: parseInt(ratingInput.value),
        message: messageTextarea.value
    };
    
    // Validate all fields
    const errors = {
        name: validateName(formData.name),
        email: validateEmail(formData.email),
        'feedback-type': validateFeedbackType(formData.feedbackType),
        rating: validateRating(formData.rating),
        message: validateMessage(formData.message)
    };
    
    // Display errors
    let hasErrors = false;
    Object.entries(errors).forEach(([field, error]) => {
        if (error) {
            displayError(field, error);
            hasErrors = true;
        }
    });
    
    // If no errors, submit the form
    if (!hasErrors) {
        submitFeedback(formData);
    }
});

// Submit Feedback Function
function submitFeedback(formData) {
    console.log('Feedback submitted:', formData);
    
    // Show success modal
    successModal.classList.add('show');
    
    // Reset form
    feedbackForm.reset();
    currentRating = 0;
    ratingInput.value = '0';
    updateStarDisplay(0);
    clearAllErrors();
    
    // Add submission animation to button
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Submitted!';
    submitBtn.style.background = '#28a745';
    
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Feedback';
        submitBtn.style.background = 'linear-gradient(135deg, #4a7c59 0%, #3d6b4a 100%)';
    }, 3000);
}

// Modal Functions
closeModalBtn.addEventListener('click', closeModal);

successModal.addEventListener('click', (e) => {
    if (e.target === successModal) {
        closeModal();
    }
});

function closeModal() {
    successModal.classList.remove('show');
}

// Escape key to close modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && successModal.classList.contains('show')) {
        closeModal();
    }
});

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

// Form animation on scroll
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

// Observe form container and feedback cards
document.querySelectorAll('.form-container, .feedback-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// Utility function for showing notifications (for future use)
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
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
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

// Character counter for message textarea (optional feature)
function addCharacterCounter() {
    const counter = document.createElement('div');
    counter.style.cssText = `
        text-align: right;
        font-size: 12px;
        color: #666;
        margin-top: 5px;
    `;
    counter.id = 'char-counter';
    messageTextarea.parentNode.appendChild(counter);
    
    const updateCounter = () => {
        const length = messageTextarea.value.length;
        counter.textContent = `${length} characters`;
        
        if (length > 500) {
            counter.style.color = '#dc3545';
        } else if (length > 400) {
            counter.style.color = '#ffc107';
        } else {
            counter.style.color = '#666';
        }
    };
    
    messageTextarea.addEventListener('input', updateCounter);
    updateCounter();
}

// Initialize character counter
addCharacterCounter();

// Console message for developers
console.log('%cKrishiAI Feedback Page', 'color: #4a7c59; font-size: 16px; font-weight: bold;');
console.log('%cFeedback system initialized successfully', 'color: #666; font-size: 12px;');

// Form field focus effects
document.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('focus', function() {
        this.parentNode.classList.add('focused');
    });
    
    field.addEventListener('blur', function() {
        if (!this.value) {
            this.parentNode.classList.remove('focused');
        }
    });
});

// Add some CSS for the focused state
const focusStyle = document.createElement('style');
focusStyle.textContent = `
    .form-group.focused label {
        color: #4a7c59;
        transform: translateY(-2px);
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(focusStyle);