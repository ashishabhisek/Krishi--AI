// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const langBtn = document.getElementById('lang-btn');
const langDropdown = document.getElementById('lang-dropdown');
const selectedLang = document.getElementById('selected-lang');

// Card language selector
const cardLangBtn = document.getElementById('card-lang-btn');
const cardLangDropdown = document.getElementById('card-lang-dropdown');
const cardSelectedLang = document.getElementById('card-selected-lang');

// Form elements
const loginForm = document.getElementById('login-form');
const mobileInput = document.getElementById('mobile');
const otpInput = document.getElementById('otp');
const sendOtpBtn = document.getElementById('send-otp-btn');
const otpSection = document.getElementById('otp-section');
const resendOtpBtn = document.getElementById('resend-otp-btn');
const timerElement = document.getElementById('timer');
const otpTimerText = document.getElementById('otp-timer-text');

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

// Language Selector Functions
function setupLanguageSelector(btn, dropdown, selectedSpan) {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('active');
        
        // Close other dropdowns
        document.querySelectorAll('.lang-dropdown').forEach(dd => {
            if (dd !== dropdown) {
                dd.classList.remove('active');
            }
        });
    });

    dropdown.querySelectorAll('a').forEach(langOption => {
        langOption.addEventListener('click', (e) => {
            e.preventDefault();
            const selectedLanguage = e.target.getAttribute('data-lang');
            selectedSpan.textContent = selectedLanguage;
            dropdown.classList.remove('active');
            
            // Sync both language selectors
            selectedLang.textContent = selectedLanguage;
            cardSelectedLang.textContent = selectedLanguage;
            
            console.log('Language changed to:', selectedLanguage);
        });
    });
}

// Setup both language selectors
setupLanguageSelector(langBtn, langDropdown, selectedLang);
setupLanguageSelector(cardLangBtn, cardLangDropdown, cardSelectedLang);

// Close language dropdowns when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.language-selector')) {
        document.querySelectorAll('.lang-dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
});

// Mobile number validation
function validateMobile(mobile) {
    const regex = /^[6-9]\d{9}$/;
    return regex.test(mobile);
}

// OTP validation
function validateOTP(otp) {
    const regex = /^\d{6}$/;
    return regex.test(otp);
}

// Show error message
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId + '-error');
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

// Hide error message
function hideError(elementId) {
    const errorElement = document.getElementById(elementId + '-error');
    errorElement.classList.remove('show');
}

// OTP Timer
let otpTimer = null;
let timeLeft = 30;

function startOtpTimer() {
    timeLeft = 30;
    resendOtpBtn.style.display = 'none';
    otpTimerText.style.display = 'block';
    
    otpTimer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(otpTimer);
            otpTimerText.style.display = 'none';
            resendOtpBtn.style.display = 'inline-block';
        }
    }, 1000);
}

// Send OTP Handler
sendOtpBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    const mobile = mobileInput.value.trim();
    
    // Validate mobile number
    if (!mobile) {
        showError('mobile', 'Please enter mobile number');
        mobileInput.focus();
        return;
    }
    
    if (!validateMobile(mobile)) {
        showError('mobile', 'Please enter a valid 10-digit mobile number');
        mobileInput.focus();
        return;
    }
    
    hideError('mobile');
    
    // Add ripple effect
    addRippleEffect(this, e);
    
    // Disable button and show loading
    this.disabled = true;
    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending OTP...';
    
    // Simulate OTP sending
    setTimeout(() => {
        this.disabled = false;
        this.innerHTML = '<i class="fas fa-mobile-alt"></i> Resend OTP';
        
        // Show OTP section
        otpSection.style.display = 'block';
        otpInput.focus();
        
        // Start timer
        startOtpTimer();
        
        showNotification('OTP sent successfully to +91' + mobile, 'success');
    }, 2000);
});

// Resend OTP Handler
resendOtpBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    const mobile = mobileInput.value.trim();
    
    // Add ripple effect
    addRippleEffect(sendOtpBtn, e);
    
    // Disable button and show loading
    sendOtpBtn.disabled = true;
    sendOtpBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Resending OTP...';
    
    // Simulate OTP resending
    setTimeout(() => {
        sendOtpBtn.disabled = false;
        sendOtpBtn.innerHTML = '<i class="fas fa-mobile-alt"></i> Resend OTP';
        
        // Start timer
        startOtpTimer();
        
        showNotification('OTP resent successfully to +91' + mobile, 'success');
    }, 2000);
});

// Form submission
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const mobile = mobileInput.value.trim();
    const otp = otpInput.value.trim();
    
    let isValid = true;
    
    // Validate mobile
    if (!mobile) {
        showError('mobile', 'Please enter mobile number');
        isValid = false;
    } else if (!validateMobile(mobile)) {
        showError('mobile', 'Please enter a valid 10-digit mobile number');
        isValid = false;
    } else {
        hideError('mobile');
    }
    
    // Validate OTP
    if (!otp) {
        showError('otp', 'Please enter OTP');
        isValid = false;
    } else if (!validateOTP(otp)) {
        showError('otp', 'Please enter a valid 6-digit OTP');
        isValid = false;
    } else {
        hideError('otp');
    }
    
    if (!isValid) {
        return;
    }
    
    // Add ripple effect to submit button
    const submitBtn = this.querySelector('button[type="submit"]');
    addRippleEffect(submitBtn, e);
    
    // Disable form and show loading
    const formElements = this.querySelectorAll('input, button');
    formElements.forEach(el => el.disabled = true);
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
    
    // Simulate login process
    setTimeout(() => {
        // Check if OTP is correct (simulate)
        if (otp === '123456') {
            showNotification('Login successful! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = 'index.html'; // Redirect to dashboard
            }, 1500);
        } else {
            showError('otp', 'Invalid OTP. Please try again.');
            formElements.forEach(el => el.disabled = false);
            submitBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login';
            otpInput.focus();
            otpInput.select();
        }
    }, 2000);
});

// Input event listeners for real-time validation
mobileInput.addEventListener('input', function() {
    this.value = this.value.replace(/\D/g, ''); // Only allow digits
    if (this.value.length > 0) {
        hideError('mobile');
    }
});

otpInput.addEventListener('input', function() {
    this.value = this.value.replace(/\D/g, ''); // Only allow digits
    if (this.value.length > 0) {
        hideError('otp');
    }
});

// Focus events
mobileInput.addEventListener('focus', () => hideError('mobile'));
otpInput.addEventListener('focus', () => hideError('otp'));

// Social login handlers
document.querySelectorAll('.btn-social').forEach(btn => {
    btn.addEventListener('click', function(e) {
        addRippleEffect(this, e);
        
        const provider = this.textContent.includes('Google') ? 'Google' : 'DigiLocker';
        showNotification(`${provider} login will be available soon!`, 'info');
    });
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

// Console message
console.log('%cKrishiAI - Farmer Login', 'color: #4a7c59; font-size: 16px; font-weight: bold;');
console.log('%cSecure authentication system', 'color: #666; font-size: 12px;');