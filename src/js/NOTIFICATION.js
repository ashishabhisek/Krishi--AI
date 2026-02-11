// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const langBtn = document.getElementById('lang-btn');
const langDropdown = document.getElementById('lang-dropdown');
const selectedLang = document.getElementById('selected-lang');

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
        
        // Handle language change for notifications content
        handleLanguageChange(selectedLanguage);
        console.log('Language changed to:', selectedLanguage);
    });
});

// Close language dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!langBtn.contains(e.target) && !langDropdown.contains(e.target)) {
        langDropdown.classList.remove('active');
    }
});

// Alert Card Interactions
document.querySelectorAll('.alert-card').forEach(card => {
    card.addEventListener('click', function() {
        // Add click animation
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
        
        // Handle alert card click
        const alertType = this.querySelector('h3').textContent;
        showAlertDetails(alertType, this);
    });
});

// Personal Alert Items Interactions
document.querySelectorAll('.personal-alert-item').forEach(item => {
    item.addEventListener('click', function() {
        const alertContent = this.querySelector('.alert-content p').textContent;
        showPersonalAlertDetails(alertContent);
    });
});

// Read More Button Functionality
document.querySelectorAll('.btn-read-more').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const schemeTitle = this.closest('.announcement-card').querySelector('h3').textContent;
        showSchemeDetails(schemeTitle);
        
        // Button animation
        this.style.transform = 'translateY(-3px)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
});

// Notification Functions
function showAlertDetails(alertType, cardElement) {
    // Get alert details from the card
    const badge = cardElement.querySelector('.alert-badge').textContent;
    const message = cardElement.querySelector('.alert-message p').textContent;
    const date = cardElement.querySelector('.alert-date').textContent.trim();
    const region = cardElement.querySelector('.alert-region').textContent.trim();
    
    // Create detailed alert modal or expand functionality
    console.log('Alert Details:', {
        type: alertType,
        severity: badge,
        message: message,
        date: date,
        region: region
    });
    
    // In a real application, this would open a detailed modal
    showNotification(`Viewing details for ${alertType} alert`, 'info');
}

function showPersonalAlertDetails(alertContent) {
    console.log('Personal Alert Clicked:', alertContent);
    showNotification('Personal alert details opened', 'info');
}

function showSchemeDetails(schemeTitle) {
    console.log('Opening scheme details for:', schemeTitle);
    
    // In a real application, this would redirect to detailed scheme page
    // For now, show a notification
    showNotification(`Opening details for ${schemeTitle}`, 'info');
}

// Language Change Handler
function handleLanguageChange(language) {
    // In a real application, this would translate the content
    // For now, we'll just update some demo content
    const translations = {
        'English': {
            pageTitle: 'Notifications & Alerts',
            pageSubtitle: 'Stay updated with real-time alerts, weather warnings, and important announcements'
        },
        'हिन्दी': {
            pageTitle: 'सूचनाएं और अलर्ट',
            pageSubtitle: 'रीयल-टाइम अलर्ट, मौसम चेतावनी और महत्वपूर्ण घोषणाओं के साथ अपडेट रहें'
        },
        'മലയാളം': {
            pageTitle: 'അറിയിപ്പുകളും മുന്നറിയിപ്പുകളും',
            pageSubtitle: 'തത്സമയ മുന്നറിയിപ്പുകൾ, കാലാവസ്ഥാ മുന്നറിയിപ്പുകൾ, പ്രധാന അറിയിപ്പുകൾ എന്നിവ ലഭിക്കുക'
        }
    };
    
    if (translations[language]) {
        const pageTitle = document.querySelector('.page-title');
        const pageSubtitle = document.querySelector('.page-subtitle');
        
        if (pageTitle && pageSubtitle) {
            // Update with icon preserved
            pageTitle.innerHTML = `<i class="fas fa-bell"></i> ${translations[language].pageTitle}`;
            pageSubtitle.textContent = translations[language].pageSubtitle;
        }
    }
}

// Auto-refresh functionality for real-time updates
let refreshInterval;

function startAutoRefresh() {
    refreshInterval = setInterval(() => {
        // In a real application, this would fetch new alerts from the server
        console.log('Checking for new alerts...');
        simulateNewAlert();
    }, 60000); // Check every minute
}

function stopAutoRefresh() {
    if (refreshInterval) {
        clearInterval(refreshInterval);
    }
}

function simulateNewAlert() {
    // Simulate receiving a new alert
    const alertTypes = ['Pest outbreak detected', 'Weather warning issued', 'New scheme announced'];
    const randomAlert = alertTypes[Math.floor(Math.random() * alertTypes.length)];
    
    // Show notification badge or update
    console.log('New alert received:', randomAlert);
    
    // In a real app, this would update the alerts display
    updateAlertCounts();
}

function updateAlertCounts() {
    // Update section count badges
    const countElements = document.querySelectorAll('.section-count');
    countElements.forEach(element => {
        const currentText = element.textContent;
        const currentCount = parseInt(currentText.match(/\d+/)[0]);
        
        // Randomly increment some counts
        if (Math.random() > 0.7) {
            const newCount = currentCount + 1;
            element.textContent = currentText.replace(/\d+/, newCount);
            element.style.animation = 'pulse 0.5s ease-in-out';
            setTimeout(() => {
                element.style.animation = '';
            }, 500);
        }
    });
}

// Notification utility function
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
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
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
        case 'critical':
            notification.style.backgroundColor = '#dc2626';
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

// Filter and Search Functionality
function createFilterControls() {
    const filterContainer = document.createElement('div');
    filterContainer.className = 'filter-controls';
    filterContainer.innerHTML = `
        <div class="filter-buttons">
            <button class="filter-btn active" data-filter="all">All Alerts</button>
            <button class="filter-btn" data-filter="critical">Critical</button>
            <button class="filter-btn" data-filter="warning">Warning</button>
            <button class="filter-btn" data-filter="info">Info</button>
        </div>
    `;
    
    // Insert filter controls before the first section
    const firstSection = document.querySelector('.alerts-section');
    if (firstSection) {
        firstSection.parentNode.insertBefore(filterContainer, firstSection);
    }
    
    // Add filter functionality
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active state
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter alerts
            const filterType = this.getAttribute('data-filter');
            filterAlerts(filterType);
        });
    });
}

function filterAlerts(type) {
    const alertCards = document.querySelectorAll('.alert-card');
    
    alertCards.forEach(card => {
        if (type === 'all' || card.classList.contains(type)) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.3s ease-in-out';
        } else {
            card.style.display = 'none';
        }
    });
}

// Scroll animations
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

// Observe alert cards and announcement cards
document.querySelectorAll('.alert-card, .announcement-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Initialize auto-refresh on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Notifications page loaded');
    startAutoRefresh();
    
    // Add filter controls (uncomment if needed)
    // createFilterControls();
    
    // Show welcome notification
    setTimeout(() => {
        showNotification('Welcome to Notifications & Alerts', 'info');
    }, 1000);
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    stopAutoRefresh();
});

// Add CSS for filter controls and animations
const style = document.createElement('style');
style.textContent = `
    .filter-controls {
        background: #fff;
        padding: 20px 40px;
        border-bottom: 1px solid #f0f0f0;
    }
    
    .filter-buttons {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
    }
    
    .filter-btn {
        padding: 10px 20px;
        border: 2px solid #e5e7eb;
        border-radius: 25px;
        background: #fff;
        color: #666;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .filter-btn:hover {
        border-color: #4a7c59;
        color: #4a7c59;
    }
    
    .filter-btn.active {
        background: #4a7c59;
        border-color: #4a7c59;
        color: white;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
    
    @media (max-width: 768px) {
        .filter-controls {
            padding: 15px 20px;
        }
        
        .filter-buttons {
            justify-content: center;
        }
        
        .filter-btn {
            padding: 8px 16px;
            font-size: 12px;
        }
    }
`;
document.head.appendChild(style);

console.log('%cKrishiAI Notifications & Alerts System', 'color: #4a7c59; font-size: 16px; font-weight: bold;');
console.log('%cReal-time agricultural alerts and notifications', 'color: #666; font-size: 12px;');