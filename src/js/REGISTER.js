// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const langBtn = document.getElementById('lang-btn');
const langDropdown = document.getElementById('lang-dropdown');
const selectedLang = document.getElementById('selected-lang');

// Form elements
const registerForm = document.getElementById('register-form');
const fullNameInput = document.getElementById('fullName');
const mobileInput = document.getElementById('mobile');
const villageInput = document.getElementById('village');
const districtSelect = document.getElementById('district');
const cropInput = document.getElementById('crop-input');
const cropsTagsContainer = document.getElementById('crops-tags');
const cropsHiddenInput = document.getElementById('crops');
const preferredLanguageSelect = document.getElementById('preferredLanguage');
const pinInput = document.getElementById('pin');
const termsCheckbox = document.getElementById('terms');
const newsletterCheckbox = document.getElementById('newsletter');


let selectedCrops = [];

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
        
        // Also update the preferred language select
        preferredLanguageSelect.value = selectedLanguage;
        
        console.log('Language changed to:', selectedLanguage);
    });
});

// Close language dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!langBtn.contains(e.target) && !langDropdown.contains(e.target)) {
        langDropdown.classList.remove('active');
    }
});

// Validation functions
function validateName(name) {
    return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name);
}

function validateMobile(mobile) {
    const regex = /^[6-9]\d{9}$/;
    return regex.test(mobile);
}

function validateVillage(village) {
    return village.trim().length >= 2;
}

function validatePIN(pin) {
    if (!pin) return true; // Optional field
    const regex = /^\d{4}$/;
    return regex.test(pin);
}

// Show/hide error messages
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId + '-error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

function hideError(elementId) {
    const errorElement = document.getElementById(elementId + '-error');
    if (errorElement) {
        errorElement.classList.remove('show');
    }
}

// Crops management
function addCrop(cropName) {
    if (!cropName || selectedCrops.includes(cropName)) {
        return;
    }
    
    selectedCrops.push(cropName);
    updateCropsDisplay();
    updateCropsHiddenInput();
}

function removeCrop(cropName) {
    selectedCrops = selectedCrops.filter(crop => crop !== cropName);
    updateCropsDisplay();
    updateCropsHiddenInput();
}

function updateCropsDisplay() {
    cropsTagsContainer.innerHTML = '';
    
    selectedCrops.forEach(crop => {
        const tag = document.createElement('div');
        tag.className = 'crop-tag';
        tag.innerHTML = `
            ${crop}
            <span class="remove" data-crop="${crop}">×</span>
        `;
        cropsTagsContainer.appendChild(tag);
    });
}

function updateCropsHiddenInput() {
    cropsHiddenInput.value = selectedCrops.join(',');
}

// Crop input handler
cropInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        const cropName = this.value.trim();
        if (cropName) {
            addCrop(cropName);
            this.value = '';
        }
    }
});

// Crop suggestion handlers
document.querySelectorAll('.crop-suggestion').forEach(suggestion => {
    suggestion.addEventListener('click', function() {
        const cropName = this.getAttribute('data-crop');
        addCrop(cropName);
    });
});

// Crop removal handler (event delegation)
cropsTagsContainer.addEventListener('click', function(e) {
    if (e.target.classList.contains('remove')) {
        const cropName = e.target.getAttribute('data-crop');
        removeCrop(cropName);
    }
});

// Input event listeners for real-time validation
fullNameInput.addEventListener('input', function() {
    if (this.value.length > 0) {
        hideError('fullName');
    }
});

mobileInput.addEventListener('input', function() {
    this.value = this.value.replace(/\D/g, ''); // Only allow digits
    if (this.value.length > 0) {
        hideError('mobile');
    }
});

villageInput.addEventListener('input', function() {
    if (this.value.length > 0) {
        hideError('village');
    }
});

districtSelect.addEventListener('change', function() {
    if (this.value) {
        hideError('district');
    }
});

pinInput.addEventListener('input', function() {
    this.value = this.value.replace(/\D/g, ''); // Only allow digits
});

// Focus events
fullNameInput.addEventListener('focus', () => hideError('fullName'));
mobileInput.addEventListener('focus', () => hideError('mobile'));
villageInput.addEventListener('focus', () => hideError('village'));
districtSelect.addEventListener('focus', () => hideError('district'));

// Form submission
registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        fullName: fullNameInput.value.trim(),
        mobile: mobileInput.value.trim(),
        village: villageInput.value.trim(),
        district: districtSelect.value,
        crops: selectedCrops.join(','),
        preferredLanguage: preferredLanguageSelect.value,
        pin: pinInput.value.trim(),
        terms: termsCheckbox.checked,
        newsletter: newsletterCheckbox.checked
    };
    
    let isValid = true;
    
    // Validate all required fields
    if (!formData.fullName) {
        showError('fullName', 'Please enter your full name');
        isValid = false;
    } else if (!validateName(formData.fullName)) {
        showError('fullName', 'Please enter a valid name (letters only)');
        isValid = false;
    } else {
        hideError('fullName');
    }
    
    if (!formData.mobile) {
        showError('mobile', 'Please enter mobile number');
        isValid = false;
    } else if (!validateMobile(formData.mobile)) {
        showError('mobile', 'Please enter a valid 10-digit mobile number');
        isValid = false;
    } else {
        hideError('mobile');
    }
    
    if (!formData.village) {
        showError('village', 'Please enter your village name');
        isValid = false;
    } else if (!validateVillage(formData.village)) {
        showError('village', 'Please enter a valid village name');
        isValid = false;
    } else {
        hideError('village');
    }
    
    if (!formData.district) {
        showError('district', 'Please select your district');
        isValid = false;
    } else {
        hideError('district');
    }
    
    if (formData.pin && !validatePIN(formData.pin)) {
        showError('pin', 'PIN must be 4 digits');
        isValid = false;
    }
    
    if (!formData.terms) {
        showNotification('Please agree to the Terms of Service and Privacy Policy', 'error');
        isValid = false;
    }
    
    if (!isValid) {
        return;
    }
    
    // Add ripple effect to submit button
    const submitBtn = this.querySelector('button[type="submit"]');
    addRippleEffect(submitBtn, e);
    
    // Disable form and show loading
    const formElements = this.querySelectorAll('input, select, button');
    formElements.forEach(el => el.disabled = true);
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
    
    // Simulate account creation process
    setTimeout(() => {
        // Check if mobile already exists (simulate)
        if (formData.mobile === '9999999999') {
            showError('mobile', 'This mobile number is already registered');
            formElements.forEach(el => el.disabled = false);
            submitBtn.innerHTML = '<i class="fas fa-user-plus"></i> Create Account';
            mobileInput.focus();
            mobileInput.select();
        } else {
            showNotification('Account created successfully! Please login to continue.', 'success');
            console.log('Registration data:', formData);
            
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        }
    }, 3000);
});

// Ripple effect function
function addRippleEffect(button, event) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple effect to all buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        if (!this.querySelector('.ripple')) {
            addRippleEffect(this, e);
        }
    });
});

// Notification function
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
        max-width: 350px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
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
    }, 4000);
}

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

// Initialize form
document.addEventListener('DOMContentLoaded', function() {
    // Set default preferred language from navbar
    const currentLang = selectedLang.textContent;
    preferredLanguageSelect.value = currentLang;
});

// Console message
console.log('%cKrishiAI - Farmer Registration', 'color: #4a7c59; font-size: 16px; font-weight: bold;');
console.log('%cJoin the digital farming revolution', 'color: #666; font-size: 12px;');