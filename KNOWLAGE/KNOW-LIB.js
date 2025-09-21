// Knowledge Library Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const langBtn = document.getElementById('lang-btn');
    const langDropdown = document.getElementById('lang-dropdown');
    const selectedLang = document.getElementById('selected-lang');

    // Mobile Navigation Toggle
    hamburger.addEventListener('click', function() {
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
    langBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        langDropdown.classList.toggle('show');
    });

    // Language Selection
    document.querySelectorAll('.lang-dropdown a').forEach(langOption => {
        langOption.addEventListener('click', function(e) {
            e.preventDefault();
            const selectedLanguage = e.target.getAttribute('data-lang');
            selectedLang.textContent = selectedLanguage;
            langDropdown.classList.remove('show');
            
            // Here you would typically handle language change
            console.log('Language switched to:', selectedLanguage);
        });
    });

    // Close language dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!langBtn.contains(e.target) && !langDropdown.contains(e.target)) {
            langDropdown.classList.remove('show');
        }
    });

    // Video card interactions
    const videoCards = document.querySelectorAll('.video-card');
    videoCards.forEach(card => {
        card.addEventListener('click', function() {
            const videoTitle = this.querySelector('h3').textContent;
            alert(`Playing video: ${videoTitle}`);
            // Here you would implement actual video playing functionality
        });
    });

    // Scheme "Learn More" button interactions
    const learnMoreBtns = document.querySelectorAll('.scheme-card .btn-primary');
    learnMoreBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const schemeTitle = this.closest('.scheme-card').querySelector('h3').textContent;
            alert(`Loading details for: ${schemeTitle}`);
            // Here you would implement navigation to detailed scheme information
        });
    });

    // Calendar "View Details" button interactions
    const viewDetailsBtns = document.querySelectorAll('.calendar-card .btn');
    viewDetailsBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const cropName = this.closest('.calendar-card').querySelector('h3').textContent;
            alert(`Loading detailed calendar for: ${cropName}`);
            // Here you would implement navigation to detailed crop calendar
        });
    });

    // Pest management "Learn More" button interactions
    const pestLearnMoreBtns = document.querySelectorAll('.pest-card .btn');
    pestLearnMoreBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const pestName = this.closest('.pest-card').querySelector('h3').textContent;
            alert(`Loading detailed information for: ${pestName}`);
            // Here you would implement navigation to detailed pest management guide
        });
    });

    // Weather widget interaction
    const weatherCard = document.querySelector('.weather-card');
    if (weatherCard) {
        weatherCard.addEventListener('click', function() {
            alert('Opening detailed weather forecast...');
            // Here you would implement detailed weather view
        });
    }

    // Animation on scroll
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

    // Apply animation observer to cards
    const cards = document.querySelectorAll('.calendar-card, .pest-card, .scheme-card, .video-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
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

    // Console message for developers
    console.log('%cKrishiAI - Knowledge Library', 'color: #4a7c59; font-size: 16px; font-weight: bold;');
    console.log('Knowledge Library page initialized successfully');
});