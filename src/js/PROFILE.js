// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const langBtn = document.getElementById('lang-btn');
const langDropdown = document.getElementById('lang-dropdown');
const selectedLang = document.getElementById('selected-lang');
const editModal = document.getElementById('edit-modal');
const responseModal = document.getElementById('response-modal');
const editForm = document.getElementById('edit-form');

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
        showNotification(`Language changed to ${selectedLanguage}`, 'success');
    });
});

// Close language dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!langBtn.contains(e.target) && !langDropdown.contains(e.target)) {
        langDropdown.classList.remove('active');
    }
});

// Profile Photo Click Handler
document.querySelector('.profile-photo').addEventListener('click', () => {
    showNotification('Profile photo update feature coming soon!', 'info');
});

// Edit Profile Modal Functions
function openEditModal() {
    editModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeEditModal() {
    editModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking overlay
editModal.addEventListener('click', (e) => {
    if (e.target === editModal) {
        closeEditModal();
    }
});

// Edit Form Handler
editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(editForm);
    const name = document.getElementById('edit-name').value;
    const phone = document.getElementById('edit-phone').value;
    const location = document.getElementById('edit-location').value;
    const language = document.getElementById('edit-language').value;
    
    // Update the profile display
    updateProfileDisplay(name, phone, location, language);
    
    showNotification('Profile updated successfully!', 'success');
    closeEditModal();
});

function updateProfileDisplay(name, phone, location, language) {
    // Update the farmer details in the UI
    const detailItems = document.querySelectorAll('.detail-item span');
    detailItems[0].textContent = name;
    detailItems[1].textContent = phone;
    detailItems[2].textContent = location;
    detailItems[3].textContent = language;
}

// View Response Modal Functions
function viewResponse(queryId) {
    const responses = {
        1: {
            query: "What is the best treatment for rice blast disease?",
            response: `
                <h4>Treatment for Rice Blast Disease</h4>
                <p>Rice blast is a serious fungal disease that can significantly reduce yield. Here's a comprehensive treatment approach:</p>
                
                <h5>Immediate Treatment:</h5>
                <ul>
                    <li>Apply fungicides containing tricyclazole or isoprothiolane</li>
                    <li>Use copper-based fungicides for organic treatment</li>
                    <li>Ensure proper drainage to reduce humidity</li>
                </ul>
                
                <h5>Prevention Measures:</h5>
                <ul>
                    <li>Use resistant rice varieties</li>
                    <li>Maintain proper plant spacing for air circulation</li>
                    <li>Apply balanced fertilization - avoid excess nitrogen</li>
                    <li>Remove infected plant debris</li>
                </ul>
                
                <p><strong>Expert Recommendation:</strong> Monitor your fields regularly and apply preventive treatments during humid conditions.</p>
            `
        },
        2: {
            query: "When is the best time to plant coconut saplings?",
            response: `
                <h4>Optimal Planting Time for Coconut Saplings</h4>
                <p>The timing of coconut planting is crucial for successful establishment and growth:</p>
                
                <h5>Best Seasons:</h5>
                <ul>
                    <li><strong>Pre-monsoon (April-May):</strong> Ideal for most regions</li>
                    <li><strong>Post-monsoon (September-October):</strong> Good alternative timing</li>
                    <li><strong>Winter (December-January):</strong> Suitable in tropical areas</li>
                </ul>
                
                <h5>Site Preparation:</h5>
                <ul>
                    <li>Prepare pits of 1m x 1m x 1m size</li>
                    <li>Fill with topsoil, compost, and sand mix</li>
                    <li>Ensure good drainage</li>
                    <li>Maintain 7-8 meter spacing between plants</li>
                </ul>
                
                <p><strong>Regional Tip:</strong> In Kerala, April-May planting takes advantage of upcoming monsoon rains for better establishment.</p>
            `
        },
        3: {
            query: "How to improve soil fertility naturally?",
            response: `
                <h4>Natural Soil Fertility Enhancement</h4>
                <p>This query has been escalated to our soil expert for detailed analysis. Here's preliminary guidance:</p>
                
                <h5>Organic Matter Addition:</h5>
                <ul>
                    <li>Apply well-decomposed farmyard manure (5-10 tons/hectare)</li>
                    <li>Use compost from crop residues and kitchen waste</li>
                    <li>Green manuring with leguminous crops</li>
                </ul>
                
                <h5>Biological Methods:</h5>
                <ul>
                    <li>Apply biofertilizers (Rhizobium, Azotobacter, PSB)</li>
                    <li>Use earthworm castings (vermicompost)</li>
                    <li>Encourage beneficial microorganisms</li>
                </ul>
                
                <p><strong>Status Update:</strong> Our soil specialist will provide a detailed fertility management plan based on your specific soil conditions within 2-3 days.</p>
            `
        },
        4: {
            query: "What fertilizer is best for pepper plants?",
            response: `
                <h4>Fertilizer Recommendations for Pepper Plants</h4>
                <p>Pepper plants require balanced nutrition for optimal growth and yield:</p>
                
                <h5>NPK Requirements:</h5>
                <ul>
                    <li><strong>Nitrogen:</strong> 120-150 kg/hectare (split application)</li>
                    <li><strong>Phosphorus:</strong> 50-60 kg/hectare (basal application)</li>
                    <li><strong>Potassium:</strong> 60-75 kg/hectare (split application)</li>
                </ul>
                
                <h5>Organic Alternatives:</h5>
                <ul>
                    <li>Neem cake: 250-300 kg/hectare</li>
                    <li>Poultry manure: 5-6 tons/hectare</li>
                    <li>Bone meal for phosphorus</li>
                    <li>Wood ash for potassium</li>
                </ul>
                
                <h5>Micronutrients:</h5>
                <ul>
                    <li>Foliar spray of zinc sulfate (0.5%)</li>
                    <li>Borax application for boron deficiency</li>
                </ul>
                
                <p><strong>Application Schedule:</strong> Apply 1/3 nitrogen at planting, 1/3 at flowering, and 1/3 during fruit development.</p>
            `
        },
        5: {
            query: "How to control pest attacks on vegetables?",
            response: `
                <h4>Integrated Pest Management for Vegetables</h4>
                <p>Effective pest control requires a multi-pronged approach combining prevention and treatment:</p>
                
                <h5>Preventive Measures:</h5>
                <ul>
                    <li>Crop rotation to break pest cycles</li>
                    <li>Use of trap crops and companion planting</li>
                    <li>Maintain field hygiene and remove crop debris</li>
                    <li>Install yellow sticky traps for flying insects</li>
                </ul>
                
                <h5>Biological Control:</h5>
                <ul>
                    <li>Encourage natural predators (ladybugs, spiders)</li>
                    <li>Use Bacillus thuringiensis (Bt) for caterpillars</li>
                    <li>Neem oil spray (2-3 ml/liter water)</li>
                    <li>Release parasitic wasps for aphid control</li>
                </ul>
                
                <h5>Organic Sprays:</h5>
                <ul>
                    <li>Soap solution (5 ml/liter) for soft-bodied insects</li>
                    <li>Chili-garlic spray for general pests</li>
                    <li>Turmeric powder mixed with water</li>
                </ul>
                
                <p><strong>Safety Note:</strong> Always spray during evening hours and avoid during flowering to protect pollinators.</p>
            `
        }
    };
    
    const response = responses[queryId];
    if (response) {
        document.getElementById('response-content').innerHTML = response.response;
        responseModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeResponseModal() {
    responseModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close response modal when clicking overlay
responseModal.addEventListener('click', (e) => {
    if (e.target === responseModal) {
        closeResponseModal();
    }
});

// Read Tip Functions
function readTip(tipId) {
    const tips = {
        1: "Detailed guide on organic pest control methods...",
        2: "Comprehensive monsoon farming preparation tips...",
        3: "Complete soil health management strategies...",
        4: "Water conservation and irrigation techniques..."
    };
    
    showNotification(`Opening tip: ${tips[tipId]}`, 'info');
    // In a real application, this would navigate to the full tip page
}

// Save Preferences Function
function savePreferences() {
    const smsToggle = document.getElementById('sms-toggle').checked;
    const emailToggle = document.getElementById('email-toggle').checked;
    const pushToggle = document.getElementById('push-toggle').checked;
    
    const preferences = {
        sms: smsToggle,
        email: emailToggle,
        push: pushToggle
    };
    
    console.log('Saved preferences:', preferences);
    showNotification('Notification preferences saved successfully!', 'success');
}

// Toggle Switch Animation
document.querySelectorAll('.toggle-switch input').forEach(toggle => {
    toggle.addEventListener('change', function() {
        const label = this.nextElementSibling;
        if (this.checked) {
            label.style.backgroundColor = '#4a7c59';
        } else {
            label.style.backgroundColor = '#ccc';
        }
    });
});

// Card Hover Effects
document.querySelectorAll('.profile-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Query Item Click Effects
document.querySelectorAll('.query-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.borderColor = '#4a7c59';
        this.style.backgroundColor = '#f9fdf9';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.borderColor = '#e8f5e8';
        this.style.backgroundColor = 'transparent';
    });
});

// Notification Function
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 12px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        max-width: 350px;
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

// Smooth scrolling for internal links
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

// Form validation
function validateForm() {
    const name = document.getElementById('edit-name').value;
    const phone = document.getElementById('edit-phone').value;
    const location = document.getElementById('edit-location').value;
    
    if (!name.trim()) {
        showNotification('Please enter your name', 'error');
        return false;
    }
    
    if (!phone.trim() || !/^[+]?[\d\s\-\(\)]{10,}$/.test(phone)) {
        showNotification('Please enter a valid phone number', 'error');
        return false;
    }
    
    if (!location.trim()) {
        showNotification('Please enter your location', 'error');
        return false;
    }
    
    return true;
}

// Add form validation to edit form
editForm.addEventListener('submit', (e) => {
    if (!validateForm()) {
        e.preventDefault();
        return;
    }
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Add entrance animations
    const cards = document.querySelectorAll('.profile-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });
    
    // Initialize toggle switches
    document.querySelectorAll('.toggle-switch input').forEach(toggle => {
        if (toggle.checked) {
            toggle.nextElementSibling.style.backgroundColor = '#4a7c59';
        }
    });
    
    console.log('Profile page initialized successfully');
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Escape key to close modals
    if (e.key === 'Escape') {
        if (editModal.classList.contains('active')) {
            closeEditModal();
        }
        if (responseModal.classList.contains('active')) {
            closeResponseModal();
        }
        if (langDropdown.classList.contains('active')) {
            langDropdown.classList.remove('active');
        }
    }
    
    // Ctrl/Cmd + E to open edit profile
    if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        openEditModal();
    }
});

// Add loading states for buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
        if (this.classList.contains('save-prefs-btn') || this.classList.contains('edit-profile-btn')) {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 1000);
        }
    });
});

console.log('KrishiAI Profile Page - Loaded successfully');
console.log('Features: Edit Profile, Query History, Saved Tips, Notification Preferences');