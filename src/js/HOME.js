// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const dashboardLink = document.getElementById('dashboard-link');
const loginBtn = document.getElementById('login-btn');
const langBtn = document.getElementById('lang-btn');
const langDropdown = document.getElementById('lang-dropdown');
const selectedLang = document.getElementById('selected-lang');

const farmingImages = [
    'https://media.istockphoto.com/id/1328004520/photo/healthy-young-soybean-crop-in-field-at-dawn.jpg?s=612x612&w=0&k=20&c=XRw20PArfhkh6LLgFrgvycPLm0Uy9y7lu9U7fLqabVY=', // Plowing field
    'https://www.gaiaherbs.com/cdn/shop/articles/35250_WEB_Blog_FallTransition_09223.jpg?v=1664166459&width=900',   // Crop close-up (wheat)
    'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg', // Irrigation/watering
    'https://web-assets.bcg.com/dims4/default/f0aa1c8/2147483647/strip/true/crop/2880x1620+0+0/resize/768x432!/format/webp/quality/90/?url=http%3A%2F%2Fboston-consulting-group-brightspot.s3.amazonaws.com%2Fd3%2Fb1%2Fb1945a374994a81308c707357eee%2Fmaking-regenerative-agriculture-profitable-for-us-farmers-rectangle.jpg', // Tractor in field
    'https://images.pexels.com/photos/1112080/pexels-photo-1112080.jpeg'  // Harvesting/farming hands
];
 const translations = {
            en: {
                navHome: "Home",
                navQuery: "Query",
                navKnowledge: "Knowledge Library",
                navNotifications: "Notifications",
                navMarketplace: "Marketplace",
                navDashboard: "Dashboard",
                navAbout: "About",
                login: "Login",
                heroTitle: "Your Digital <span class=\"highlight\">Krishi Officer</span> – always available, always learning, and always <span class=\"highlight\">farmer-first</span>",
                heroDescription: "Get instant AI-powered solutions to all your farming queries. From crop diseases to weather patterns, market prices to best practices – your digital agricultural advisor is here 24/7.",
                askQuery: "Ask a Query",
                exploreKnowledge: "Explore Knowledge",
                advisory: "Advisory and Resources",
                profile: "My Profile",
                whyChoose: "Why Choose KrishiAI?",
                whyChooseDesc: "Experience the future of agricultural support with our AI-powered platform designed specifically for Indian farmers.",
                instantAI: "Instant AI Answers",
                instantAIDesc: "Get immediate responses to your farming questions powered by advanced AI technology trained on agricultural best practices.",
                personalized: "Personalized Advisory",
                personalizedDesc: "Receive customized advice based on your location, crop type, soil condition, and farming history for optimal results.",
                available: "Available Anytime Anywhere",
                availableDesc: "Access expert agricultural guidance 24/7 from anywhere - whether you're in the field or at home.",
                joinFarmers: "Join Thousands of Smart Farmers",
                joinDesc: "Start your journey towards more productive and profitable farming. Create your free account today and get access to AI-powered agricultural expertise.",
                registerNow: "Register Now",
                empowering: "Empowering farmers with AI-driven agricultural solutions for a more productive and sustainable future.",
                contactUs: "Contact Us",
                quickLinks: "Quick Links",
                followUs: "Follow Us",
                copyright: "© 2025 KrishiAI - AI-Based Farmer Query Support and Advisory System. All rights reserved."
            },
            hi: {
                navHome: "होम",
                navQuery: "प्रश्न",
                navKnowledge: "ज्ञान भंडार",
                navNotifications: "सूचनाएं",
                navMarketplace: "बाज़ार",
                navDashboard: "डैशबोर्ड",
                navAbout: "के बारे में",
                login: "लॉग इन",
                heroTitle: "आपका डिजिटल <span class=\"highlight\">कृषि अधिकारी</span> – हमेशा उपलब्ध, हमेशा सीखता रहता है, और हमेशा <span class=\"highlight\">किसान-प्राथमिकता</span>",
                heroDescription: "अपने सभी कृषि प्रश्नों के लिए तुरंत AI-संचालित समाधान प्राप्त करें। फसल रोगों से मौसम पैटर्न तक, बाजार मूल्यों से सर्वोत्तम प्रथाओं तक – आपका डिजिटल कृषि सलाहकार यहां 24/7 है।",
                askQuery: "प्रश्न पूछें",
                exploreKnowledge: "ज्ञान खोजें",
                advisory: "सलाह और संसाधन",
                profile: "मेरी प्रोफ़ाइल",
                whyChoose: "कृषि AI क्यों चुनें?",
                whyChooseDesc: "भारतीय किसानों के लिए विशेष रूप से डिज़ाइन किए गए हमारे AI-संचालित प्लेटफॉर्म के साथ कृषि सहायता के भविष्य का अनुभव करें।",
                instantAI: "तुरंत AI उत्तर",
                instantAIDesc: "कृषि सर्वोत्तम प्रथाओं पर प्रशिक्षित उन्नत AI तकनीक द्वारा संचालित अपने कृषि प्रश्नों का तुरंत उत्तर प्राप्त करें।",
                personalized: "व्यक्तिगत सलाह",
                personalizedDesc: "इष्टतम परिणामों के लिए अपने स्थान, फसल प्रकार, मिट्टी की स्थिति और कृषि इतिहास के आधार पर अनुकूलित सलाह प्राप्त करें।",
                available: "कहीं भी कभी भी उपलब्ध",
                availableDesc: "कहीं से भी 24/7 विशेषज्ञ कृषि मार्गदर्शन तक पहुंच - चाहे आप खेत में हों या घर पर।",
                joinFarmers: "हजारों स्मार्ट किसानों में शामिल हों",
                joinDesc: "अधिक उत्पादक और लाभदायक कृषि की दिशा में अपनी यात्रा शुरू करें। आज ही अपना मुफ्त खाता बनाएं और AI-संचालित कृषि विशेषज्ञता तक पहुंच प्राप्त करें।",
                registerNow: "अभी पंजीकरण करें",
                empowering: "अधिक उत्पादक और टिकाऊ भविष्य के लिए AI-संचालित कृषि समाधानों के साथ किसानों को सशक्त बनाना।",
                contactUs: "संपर्क करें",
                quickLinks: "त्वरित लिंक",
                followUs: "हमें फॉलो करें",
                copyright: "© 2025 कृषि AI - AI-आधारित किसान प्रश्न सहायता और सलाहकार प्रणाली। सभी अधिकार सुरक्षित।"
            },
            ml: {
                navHome: "ഹോം",
                navQuery: "ചോദ്യം",
                navKnowledge: "വിജ്ഞാന ഭണ്ഡാരം",
                navNotifications: "അറിയിപ്പുകൾ",
                navMarketplace: "മാർക്കറ്റ്പ്ലേസ്",
                navDashboard: "ഡാഷ്ബോർഡ്",
                navAbout: "കുറിച്ച്",
                login: "ലോഗിൻ",
                heroTitle: "നിങ്ങളുടെ ഡിജിറ്റൽ <span class=\"highlight\">കൃഷി ഓഫീസർ</span> – എപ്പോഴും ലഭ്യം, എപ്പോഴും പഠിക്കുന്നു, എപ്പോഴും <span class=\"highlight\">കർഷക-മുൻഗണന</span>",
                heroDescription: "നിങ്ങളുടെ എല്ലാ കൃഷി ചോദ്യങ്ങൾക്കും AI-പവർഡ് സോള്യൂഷനുകൾ തൽക്ഷണം നേടുക. വിള രോഗങ്ങൾ മുതൽ കാലാവസ്ഥ രീതികൾ വരെ, മാർക്കറ്റ് വിലകൾ മുതൽ മികച്ച രീതികൾ വരെ – നിങ്ങളുടെ ഡിജിറ്റൽ കാർഷിക ഉപദേശകൻ ഇവിടെ 24/7 ആണ്.",
                askQuery: "ചോദ്യം ചോദിക്കുക",
                exploreKnowledge: "വിജ്ഞാനം പര്യവേക്ഷണം",
                advisory: "ഉപദേശവും വിഭവങ്ങളും",
                profile: "എന്റെ പ്രൊഫൈൽ",
                whyChoose: "എന്തുകൊണ്ട് കൃഷി AI തിരഞ്ഞെടുക്കണം?",
                whyChooseDesc: "ഇന്ത്യൻ കർഷകർക്കായി പ്രത്യേകം രൂപകൽപ്പന ചെയ്ത ഞങ്ങളുടെ AI-പവർഡ് പ്ലാറ്റ്ഫോമിലൂടെ കാർഷിക പിന്തുണയുടെ ഭാവി അനുഭവിക്കുക.",
                instantAI: "തൽക്ഷണ AI ഉത്തരങ്ങൾ",
                instantAIDesc: "കാർഷിക മികച്ച രീതികളിൽ പരിശീലിപ്പിച്ച അഡ്വാൻസ്ഡ് AI സാങ്കേതികവിദ്യയാൽ നയിക്കപ്പെടുന്ന നിങ്ങളുടെ കൃഷി ചോദ്യങ്ങൾക്ക് ഉടനടി പ്രതികരണങ്ങൾ നേടുക.",
                personalized: "വ്യക്തിഗതമാക്കിയ ഉപദേശം",
                personalizedDesc: "അനുകൂല ഫലങ്ങൾക്കായി നിങ്ങളുടെ സ്ഥാനം, വിള തരം, മണ്ണിന്റെ അവസ്ഥ, കൃഷി ചരിത്രം എന്നിവയെ അടിസ്ഥാനമാക്കി ഇഷ്ടാനുസൃതമാക്കിയ ഉപദേശം സ്വീകരിക്കുക.",
                available: "എവിടെയും എപ്പോഴും ലഭ്യം",
                availableDesc: "എവിടുനിന്നും 24/7 വിദഗ്ധ കാർഷിക മാർഗനിർദേശം ആക്സസ് ചെയ്യുക - നിങ്ങൾ വയലിലായാലും വീട്ടിലായാലും.",
                joinFarmers: "ആയിരക്കണക്കിന് സ്മാർട്ട് കർഷകരോട് ചേരുക",
                joinDesc: "കൂടുതൽ ഉത്പാദനക്ഷമവും ലാഭകരവുമായ കൃഷിയിലേക്കുള്ള നിങ്ങളുടെ യാത്ര ആരംഭിക്കുക. ഇന്നേ നിങ്ങളുടെ സൗജന്യ അക്കൗണ്ട് സൃഷ്ടിക്കുകയും AI-പവർഡ് കാർഷിക വൈദഗ്ധ്യത്തിലേക്ക് പ്രവേശനം നേടുകയും ചെയ്യുക.",
                registerNow: "ഇപ്പോൾ രജിസ്റ്റർ ചെയ്യുക",
                empowering: "കൂടുതൽ ഉത്പാദനക്ഷമവും സുസ്ഥിരവുമായ ഭാവിയ്ക്കായി AI-പവർഡ് കാർഷിക പരിഹാരങ്ങളുമായി കർഷകരെ ശാക്തീകരിക്കുന്നു.",
                contactUs: "ഞങ്ങളെ ബന്ധപ്പെടുക",
                quickLinks: "ദ്രുത ലിങ്കുകൾ",
                followUs: "ഞങ്ങളെ പിന്തുടരുക",
                copyright: "© 2025 കൃഷി AI - AI-അടിസ്ഥാനമാക്കിയ കർഷക ചോദ്യ പിന്തുണയും ഉപദേശക സംവിധാനവും. എല്ലാ അവകാശങ്ങളും സംരക്ഷിച്ചിരിക്കുന്നു."
            }
        };
        
        let currentLanguage = 'en';

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
if (langBtn && langDropdown && selectedLang) {
    langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langDropdown.classList.toggle('active');
    });

    // Language Selection
    document.querySelectorAll('.lang-dropdown a').forEach(langOption => {
        langOption.addEventListener('click', (e) => {
            e.preventDefault();
            const selectedLanguage = e.target.getAttribute('data-lang');
            const langCode = e.target.getAttribute('data-code');
            
            selectedLang.textContent = selectedLanguage;
            langDropdown.classList.remove('active');
            
            // Change language
            changeLanguage(langCode);
            console.log('Language changed to:', selectedLanguage);
            showNotification(`Language changed to ${selectedLanguage}`, 'success');
        });
    });

    // Close language dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!langBtn.contains(e.target) && !langDropdown.contains(e.target)) {
            langDropdown.classList.remove('active');
        }
    });
}

// Language Change Function
function changeLanguage(langCode) {
    if (!translations[langCode]) {
        console.error('Language not supported:', langCode);
        return;
    }
    
    currentLanguage = langCode;
    const translation = translations[langCode];
    
    // Update all elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translation[key]) {
            element.innerHTML = translation[key];
        }
    });
    
    // Update document language attribute
    document.documentElement.lang = langCode;
    
    // Store language preference
    localStorage.setItem('preferredLanguage', langCode);
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    if (savedLanguage !== 'en') {
        changeLanguage(savedLanguage);
        
        // Update language selector display
        const langOption = document.querySelector(`[data-code="${savedLanguage}"]`);
        if (langOption && selectedLang) {
            selectedLang.textContent = langOption.getAttribute('data-lang');
        }
    }
});

// Login Button Click Handler
if (loginBtn) {
    loginBtn.addEventListener('click', () => {
        console.log('Login button clicked');
        showNotification('Redirecting to login page...', 'info');
        // Add your login redirect logic here
        // For example: window.location.href = '../LOGIN/LOGIN.html';
    });
}

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
                showNotification('Redirecting to query page...', 'info');
                // window.location.href = '/query';
                break;
            case 'Explore Knowledge':
                console.log('Redirecting to knowledge library...');
                showNotification('Redirecting to knowledge library...', 'info');
                // window.location.href = '/knowledge';
                break;
            case 'Login':
                console.log('Opening login modal...');
                showNotification('Opening login...', 'info');
                // showLoginModal();
                break;
            case 'Register Now':
                console.log('Opening registration modal...');
                showNotification('Opening registration...', 'info');
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