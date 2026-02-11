// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const langBtn = document.getElementById('lang-btn');
const langDropdown = document.getElementById('lang-dropdown');
const selectedLang = document.getElementById('selected-lang');
const dashboardLink = document.getElementById('dashboard-link');

// Query Form Elements
const queryText = document.getElementById('query-text');
const voiceBtn = document.getElementById('voice-btn');
const uploadBtn = document.getElementById('upload-btn');
const imageUpload = document.getElementById('image-upload');
const uploadPreview = document.getElementById('upload-preview');
const submitBtn = document.getElementById('submit-btn');

// Response Elements
const responseSection = document.getElementById('response-section');
const loadingAnimation = document.getElementById('loading-animation');
const responseContent = document.getElementById('response-content');
const responseText = document.getElementById('response-text');
const readAloudBtn = document.getElementById('read-aloud-btn');
const askAgainBtn = document.getElementById('ask-again-btn');
const escalateBtn = document.getElementById('escalate-btn');

// State Variables
let isRecording = false;
let uploadedImage = null;

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

// Voice Input Handler
voiceBtn.addEventListener('click', () => {
    if (!isRecording) {
        startVoiceRecording();
    } else {
        stopVoiceRecording();
    }
});

function startVoiceRecording() {
    isRecording = true;
    voiceBtn.classList.add('recording');
    voiceBtn.innerHTML = '<i class="fas fa-stop"></i><span>Stop Recording</span>';
    
    showNotification('Voice recording started...', 'info');
    
    // Simulate voice recording (in real app, you'd use Web Speech API)
    setTimeout(() => {
        stopVoiceRecording();
        queryText.value = "My wheat crop is showing yellow leaves and some plants are wilting. What could be the problem?";
        showNotification('Voice input captured successfully!', 'success');
    }, 3000);
}

function stopVoiceRecording() {
    isRecording = false;
    voiceBtn.classList.remove('recording');
    voiceBtn.innerHTML = '<i class="fas fa-microphone"></i><span>Voice Input</span>';
}

// Image Upload Handler
uploadBtn.addEventListener('click', () => {
    imageUpload.click();
});

imageUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                uploadedImage = e.target.result;
                displayImagePreview(uploadedImage, file.name);
                showNotification('Image uploaded successfully!', 'success');
            };
            reader.readAsDataURL(file);
        } else {
            showNotification('Please select a valid image file', 'error');
        }
    }
});

function displayImagePreview(imageSrc, fileName) {
    uploadPreview.innerHTML = `
        <div style="position: relative; display: inline-block;">
            <img src="${imageSrc}" alt="Uploaded crop image" style="max-width: 200px; max-height: 150px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
            <button class="remove-image" onclick="removeImage()" style="position: absolute; top: 5px; right: 5px; background: #dc3545; color: white; border: none; border-radius: 50%; width: 24px; height: 24px; cursor: pointer; font-size: 12px;">×</button>
            <p style="margin-top: 8px; font-size: 12px; color: #666;">${fileName}</p>
        </div>
    `;
    uploadPreview.style.display = 'block';
}

function removeImage() {
    uploadedImage = null;
    uploadPreview.style.display = 'none';
    uploadPreview.innerHTML = '';
    imageUpload.value = '';
    showNotification('Image removed', 'info');
}

// Submit Query Handler
submitBtn.addEventListener('click', () => {
    const query = queryText.value.trim();
    
    if (!query) {
        showNotification('Please enter your question', 'warning');
        queryText.focus();
        return;
    }
    
    submitQuery(query);
});

// Allow Enter key to submit (with Shift+Enter for new line)
queryText.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        submitBtn.click();
    }
});

function submitQuery(query) {
    // Disable submit button
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    
    // Show response section with loading
    responseSection.style.display = 'block';
    loadingAnimation.style.display = 'block';
    responseContent.style.display = 'none';
    
    // Scroll to response section
    responseSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    // Simulate AI processing time (2-4 seconds)
    const processingTime = Math.random() * 2000 + 2000;
    
    setTimeout(() => {
        displayAIResponse(query);
        
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Query';
    }, processingTime);
}

function displayAIResponse(query) {
    // Hide loading animation
    loadingAnimation.style.display = 'none';
    
    // Generate AI response based on query
    const aiResponse = generateAIResponse(query);
    
    // Display response
    responseText.innerHTML = aiResponse;
    responseContent.style.display = 'block';
    
    showNotification('AI response generated successfully!', 'success');
}

function generateAIResponse(query) {
    // Simple keyword-based response generation (in real app, this would be AI-powered)
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('yellow') && (lowerQuery.includes('leaves') || lowerQuery.includes('leaf'))) {
        return `
            <h4>🌱 Diagnosis: Possible Nutrient Deficiency or Disease</h4>
            <p><strong>Yellow leaves</strong> in crops can indicate several issues:</p>
            <ul>
                <li><strong>Nitrogen Deficiency:</strong> Most common cause. Apply urea fertilizer (46-0-0) at 50-75 kg per hectare.</li>
                <li><strong>Overwatering:</strong> Check soil drainage. Reduce irrigation frequency if soil is waterlogged.</li>
                <li><strong>Fungal Disease:</strong> If yellowing starts from lower leaves, it might be a fungal infection. Use copper-based fungicide.</li>
            </ul>
            <p><strong>Immediate Actions:</strong></p>
            <ol>
                <li>Check soil moisture - it should be moist but not waterlogged</li>
                <li>Apply balanced NPK fertilizer (10-26-26) at recommended dose</li>
                <li>Remove affected leaves to prevent disease spread</li>
                <li>Monitor for 7-10 days for improvement</li>
            </ol>
            <p><em>💡 Tip: Take soil sample for testing to get accurate nutrient recommendations.</em></p>
        `;
    } else if (lowerQuery.includes('pest') || lowerQuery.includes('insect') || lowerQuery.includes('bug')) {
        return `
            <h4>🐛 Pest Management Recommendations</h4>
            <p><strong>Integrated Pest Management (IPM) approach:</strong></p>
            <ul>
                <li><strong>Biological Control:</strong> Introduce beneficial insects like ladybugs, lacewings</li>
                <li><strong>Organic Solutions:</strong> Neem oil spray (5ml per liter water) every 7 days</li>
                <li><strong>Cultural Practices:</strong> Crop rotation, proper spacing, weed management</li>
                <li><strong>Chemical Control:</strong> Use only when necessary, follow label instructions</li>
            </ul>
            <p><strong>Prevention Tips:</strong></p>
            <ol>
                <li>Regular field monitoring (2-3 times per week)</li>
                <li>Maintain field hygiene</li>
                <li>Use pheromone traps for early detection</li>
                <li>Plant trap crops around main crop</li>
            </ol>
            <p><em>⚠️ Always wear protective equipment when applying any treatment.</em></p>
        `;
    } else if (lowerQuery.includes('fertilizer') || lowerQuery.includes('nutrition') || lowerQuery.includes('nutrient')) {
        return `
            <h4>🌾 Fertilizer and Nutrition Guide</h4>
            <p><strong>Balanced nutrition is key to healthy crops:</strong></p>
            <ul>
                <li><strong>Primary Nutrients:</strong> Nitrogen (N), Phosphorus (P), Potassium (K)</li>
                <li><strong>Secondary Nutrients:</strong> Calcium, Magnesium, Sulfur</li>
                <li><strong>Micronutrients:</strong> Iron, Zinc, Boron, Manganese</li>
            </ul>
            <p><strong>Application Schedule:</strong></p>
            <ol>
                <li><strong>Basal Application:</strong> Apply 50% N, 100% P, 50% K at sowing</li>
                <li><strong>Top Dressing:</strong> Remaining 50% N and K in 2-3 splits</li>
                <li><strong>Foliar Spray:</strong> Micronutrients during critical growth stages</li>
            </ol>
            <p><strong>Organic Alternatives:</strong></p>
            <ul>
                <li>Compost: 5-10 tons per hectare</li>
                <li>Vermicompost: 2-3 tons per hectare</li>
                <li>Green manure: Grow legumes and incorporate</li>
            </ul>
            <p><em>📊 Soil testing every 2-3 years helps optimize fertilizer use.</em></p>
        `;
    } else if (lowerQuery.includes('water') || lowerQuery.includes('irrigation') || lowerQuery.includes('drought')) {
        return `
            <h4>💧 Water Management Solutions</h4>
            <p><strong>Efficient water use is crucial for sustainable farming:</strong></p>
            <ul>
                <li><strong>Drip Irrigation:</strong> 40-50% water savings, better yield</li>
                <li><strong>Sprinkler System:</strong> Suitable for field crops, uniform distribution</li>
                <li><strong>Mulching:</strong> Reduces evaporation by 50-70%</li>
                <li><strong>Rainwater Harvesting:</strong> Store monsoon water for dry periods</li>
            </ul>
            <p><strong>Water Scheduling:</strong></p>
            <ol>
                <li>Monitor soil moisture at root zone depth</li>
                <li>Water early morning or late evening</li>
                <li>Apply water slowly for better infiltration</li>
                <li>Adjust frequency based on crop stage and weather</li>
            </ol>
            <p><strong>Drought Management:</strong></p>
            <ul>
                <li>Choose drought-tolerant varieties</li>
                <li>Practice conservation tillage</li>
                <li>Use organic matter to improve water retention</li>
            </ul>
            <p><em>🌡️ Use weather forecasts to plan irrigation schedules.</em></p>
        `;
    } else {
        return `
            <h4>🤖 AI Analysis Complete</h4>
            <p>Thank you for your query: "<em>${query}</em>"</p>
            <p><strong>General Agricultural Recommendations:</strong></p>
            <ul>
                <li><strong>Regular Monitoring:</strong> Check your crops daily for any changes in appearance, growth, or health</li>
                <li><strong>Soil Health:</strong> Maintain soil pH between 6.0-7.5 for optimal nutrient uptake</li>
                <li><strong>Integrated Approach:</strong> Combine organic and modern farming practices</li>
                <li><strong>Weather Awareness:</strong> Monitor weather forecasts and plan activities accordingly</li>
            </ul>
            <p><strong>Next Steps:</strong></p>
            <ol>
                <li>Observe your crops for the mentioned symptoms</li>
                <li>Take photos if you notice any issues</li>
                <li>Consult with local agricultural extension officer if needed</li>
                <li>Keep records of treatments and their effectiveness</li>
            </ol>
            <p><em>💡 For more specific advice, please provide details about your crop type, location, and current growing conditions.</em></p>
        `;
    }
}

// Response Action Handlers
readAloudBtn.addEventListener('click', () => {
    showNotification('Reading answer aloud... (Feature coming soon)', 'info');
    // In real app, you'd use Web Speech API to read the response
    console.log('Read aloud functionality would be implemented here');
});

askAgainBtn.addEventListener('click', () => {
    // Clear form and hide response
    queryText.value = '';
    responseSection.style.display = 'none';
    removeImage();
    queryText.focus();
    showNotification('Ready for your next question!', 'success');
});

escalateBtn.addEventListener('click', () => {
    showNotification('Connecting you to an Agricultural Officer...', 'info');
    // In real app, this would initiate a chat or call with human expert
    setTimeout(() => {
        showNotification('Agricultural Officer will contact you within 30 minutes', 'success');
    }, 2000);
});

// Admin Dashboard Visibility
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

// History item click handlers
document.querySelectorAll('.history-item').forEach(item => {
    item.addEventListener('click', () => {
        const queryPreview = item.querySelector('.query-preview p:first-child');
        if (queryPreview) {
            const questionText = queryPreview.textContent.replace('Q: ', '');
            queryText.value = questionText;
            queryText.focus();
            showNotification('Previous query loaded. You can modify and resubmit.', 'info');
        }
    });
});

// View all queries button
document.querySelector('.view-all-btn').addEventListener('click', () => {
    showNotification('Redirecting to query history page...', 'info');
    // In real app, this would navigate to a dedicated history page
    console.log('Navigate to query history page');
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
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
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

// Auto-resize textarea
queryText.addEventListener('input', () => {
    queryText.style.height = 'auto';
    queryText.style.height = Math.min(queryText.scrollHeight, 200) + 'px';
});

// Character counter for query input
const maxChars = 1000;
const charCounter = document.createElement('div');
charCounter.style.cssText = `
    text-align: right;
    font-size: 12px;
    color: #666;
    margin-top: 5px;
`;
queryText.parentNode.appendChild(charCounter);

queryText.addEventListener('input', () => {
    const remaining = maxChars - queryText.value.length;
    charCounter.textContent = `${remaining} characters remaining`;
    
    if (remaining < 50) {
        charCounter.style.color = '#dc3545';
    } else if (remaining < 100) {
        charCounter.style.color = '#ffc107';
    } else {
        charCounter.style.color = '#666';
    }
    
    if (remaining < 0) {
        queryText.value = queryText.value.substring(0, maxChars);
        charCounter.textContent = '0 characters remaining';
    }
});

// Initialize character counter
queryText.dispatchEvent(new Event('input'));

// Console message for developers
console.log('%cKrishiAI Query Page - Ready for farmer queries!', 'color: #4a7c59; font-size: 16px; font-weight: bold;');
console.log('%cFeatures: Voice input, Image upload, AI responses, Query history', 'color: #666; font-size: 12px;');

// Add some sample queries for testing
const sampleQueries = [
    "My tomato plants have yellow spots on leaves. What could be the problem?",
    "How to control aphids in wheat crop organically?",
    "Best time for sowing rice in monsoon season?",
    "My soil pH is 8.2. How can I reduce it naturally?",
    "White powdery substance on cucumber leaves - is this a disease?"
];

// Add quick query buttons for testing (hidden by default)
if (window.location.search.includes('debug=true')) {
    const quickQueries = document.createElement('div');
    quickQueries.style.cssText = `
        margin-top: 20px;
        padding: 15px;
        background: #f0f8f0;
        border-radius: 8px;
        border: 1px solid #4a7c59;
    `;
    quickQueries.innerHTML = `
        <h4 style="margin-bottom: 10px; color: #2d5016;">Quick Test Queries:</h4>
        ${sampleQueries.map((query, index) => 
            `<button onclick="loadSampleQuery(${index})" style="display: block; width: 100%; margin: 5px 0; padding: 8px; background: white; border: 1px solid #ddd; border-radius: 4px; cursor: pointer; text-align: left; font-size: 12px;">${query}</button>`
        ).join('')}
    `;
    
    document.querySelector('.query-form').appendChild(quickQueries);
}

function loadSampleQuery(index) {
    queryText.value = sampleQueries[index];
    queryText.dispatchEvent(new Event('input'));
    queryText.focus();
}