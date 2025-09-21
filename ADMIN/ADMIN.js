// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const langBtn = document.getElementById('lang-btn');
const langDropdown = document.getElementById('lang-dropdown');
const selectedLang = document.getElementById('selected-lang');
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebarLinks = document.querySelectorAll('.sidebar-link');
const dashboardSections = document.querySelectorAll('.dashboard-section');

// Sample Data
const sampleQueries = [
    {
        id: 1,
        farmer: "Rajesh Kumar",
        query: "My tomato plants are showing yellow spots on leaves. What could be the cause?",
        date: "2025-01-08",
        status: "pending"
    },
    {
        id: 2,
        farmer: "Priya Sharma",
        query: "When is the best time to plant rice in Kerala?",
        date: "2025-01-08",
        status: "answered"
    },
    {
        id: 3,
        farmer: "Amit Patel",
        query: "How to control pest attack on my wheat crop?",
        date: "2025-01-07",
        status: "escalated"
    },
    {
        id: 4,
        farmer: "Sunita Devi",
        query: "What fertilizer should I use for better cotton yield?",
        date: "2025-01-07",
        status: "answered"
    },
    {
        id: 5,
        farmer: "Mohammed Ali",
        query: "My sugarcane crop is affected by red rot. Please help.",
        date: "2025-01-06",
        status: "escalated"
    }
];

const sampleAlerts = [
    {
        id: 1,
        title: "Brown Planthopper Alert",
        type: "pest",
        region: "Punjab",
        date: "2025-01-08"
    },
    {
        id: 2,
        title: "Heavy Rainfall Warning",
        type: "weather",
        region: "Maharashtra",
        date: "2025-01-07"
    },
    {
        id: 3,
        title: "PM-KISAN Scheme Update",
        type: "scheme",
        region: "All India",
        date: "2025-01-06"
    },
    {
        id: 4,
        title: "Aphid Infestation Alert",
        type: "pest",
        region: "Rajasthan",
        date: "2025-01-05"
    }
];

const sampleUsers = [
    {
        id: 1,
        name: "Rajesh Kumar",
        phone: "+91 9876543210",
        location: "Punjab",
        language: "Hindi"
    },
    {
        id: 2,
        name: "Priya Sharma",
        phone: "+91 8765432109",
        location: "Kerala",
        language: "Malayalam"
    },
    {
        id: 3,
        name: "Amit Patel",
        phone: "+91 7654321098",
        location: "Gujarat",
        language: "Hindi"
    },
    {
        id: 4,
        name: "Sunita Devi",
        phone: "+91 6543210987",
        location: "Bihar",
        language: "Hindi"
    },
    {
        id: 5,
        name: "Mohammed Ali",
        phone: "+91 5432109876",
        location: "Karnataka",
        language: "English"
    }
];

const sampleFeedback = [
    {
        id: 1,
        user: "Rajesh Kumar",
        rating: 5,
        comment: "Excellent service! Got immediate help for my crop disease problem.",
        date: "2025-01-08"
    },
    {
        id: 2,
        user: "Priya Sharma",
        rating: 4,
        comment: "Very helpful platform. The AI responses are quite accurate.",
        date: "2025-01-07"
    },
    {
        id: 3,
        user: "Amit Patel",
        rating: 5,
        comment: "Best agricultural support system I've used. Highly recommend!",
        date: "2025-01-06"
    },
    {
        id: 4,
        user: "Sunita Devi",
        rating: 3,
        comment: "Good service but response time could be faster.",
        date: "2025-01-05"
    }
];

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Sidebar Toggle
sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
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
        showNotification(`Language changed to ${selectedLanguage}`, 'success');
    });
});

// Close language dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!langBtn.contains(e.target) && !langDropdown.contains(e.target)) {
        langDropdown.classList.remove('active');
    }
});

// Sidebar Navigation
sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSection = link.getAttribute('data-section');
        
        // Update active sidebar link
        sidebarLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Update active section
        dashboardSections.forEach(section => section.classList.remove('active'));
        document.getElementById(targetSection).classList.add('active');
        
        // Close sidebar on mobile
        if (window.innerWidth <= 1024) {
            sidebar.classList.remove('active');
        }
    });
});

// Initialize Dashboard
function initializeDashboard() {
    populateQueriesTable();
    populateAlertsTable();
    populateUsersTable();
    populateFeedbackGrid();
}

// Populate Queries Table
function populateQueriesTable() {
    const tbody = document.getElementById('queries-table-body');
    tbody.innerHTML = '';
    
    sampleQueries.forEach(query => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${query.farmer}</td>
            <td>${query.query.length > 50 ? query.query.substring(0, 50) + '...' : query.query}</td>
            <td>${formatDate(query.date)}</td>
            <td><span class="status-badge ${query.status}">${capitalizeFirst(query.status)}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-primary btn-sm" onclick="viewQuery(${query.id})">
                        <i class="fas fa-eye"></i> View & Respond
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Populate Alerts Table
function populateAlertsTable() {
    const tbody = document.getElementById('alerts-table-body');
    tbody.innerHTML = '';
    
    sampleAlerts.forEach(alert => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${alert.title}</td>
            <td><span class="status-badge ${alert.type}">${capitalizeFirst(alert.type)}</span></td>
            <td>${alert.region}</td>
            <td>${formatDate(alert.date)}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-secondary btn-sm" onclick="editAlert(${alert.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="deleteAlert(${alert.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Populate Users Table
function populateUsersTable() {
    const tbody = document.getElementById('users-table-body');
    tbody.innerHTML = '';
    
    sampleUsers.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.phone}</td>
            <td>${user.location}</td>
            <td>${user.language}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-primary btn-sm" onclick="viewUser(${user.id})">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Populate Feedback Grid
function populateFeedbackGrid() {
    const container = document.getElementById('feedback-container');
    container.innerHTML = '';
    
    sampleFeedback.forEach(feedback => {
        const item = document.createElement('div');
        item.className = 'feedback-item';
        item.innerHTML = `
            <div class="feedback-header">
                <span class="feedback-user">${feedback.user}</span>
                <div class="feedback-rating">
                    ${generateStars(feedback.rating)}
                </div>
            </div>
            <p class="feedback-comment">${feedback.comment}</p>
            <span class="feedback-date">${formatDate(feedback.date)}</span>
        `;
        container.appendChild(item);
    });
}

// Generate star rating
function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += `<span class="star ${i <= rating ? '' : 'empty'}">★</span>`;
    }
    return stars;
}

// Modal Functions
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Query Management Functions
function viewQuery(queryId) {
    const query = sampleQueries.find(q => q.id === queryId);
    if (query) {
        document.getElementById('query-farmer').textContent = query.farmer;
        document.getElementById('query-date').textContent = formatDate(query.date);
        document.getElementById('query-text').textContent = query.query;
        document.getElementById('response-text').value = generateAIResponse(query.query);
        openModal('query-modal');
    }
}

function generateAIResponse(query) {
    // Simulate AI response based on query content
    if (query.toLowerCase().includes('yellow spots')) {
        return "Based on your description, the yellow spots on tomato leaves could indicate early blight or bacterial spot. I recommend:\n\n1. Remove affected leaves immediately\n2. Apply copper-based fungicide\n3. Ensure proper spacing for air circulation\n4. Water at soil level to avoid leaf wetness\n5. Consider resistant varieties for future planting";
    } else if (query.toLowerCase().includes('rice')) {
        return "For rice planting in Kerala, the optimal time depends on the season:\n\n1. Kharif season: June-July (with monsoon)\n2. Rabi season: December-January\n3. Summer season: February-March (with irrigation)\n\nConsider local weather patterns and water availability for best results.";
    } else {
        return "Thank you for your query. Based on the information provided, I recommend consulting with local agricultural experts for the most accurate diagnosis and treatment plan specific to your region and crop conditions.";
    }
}

// Alert Management Functions
function editAlert(alertId) {
    showNotification('Edit alert functionality will be implemented', 'info');
}

function deleteAlert(alertId) {
    if (confirm('Are you sure you want to delete this alert?')) {
        showNotification('Alert deleted successfully', 'success');
        // Remove from array and refresh table
        const index = sampleAlerts.findIndex(alert => alert.id === alertId);
        if (index > -1) {
            sampleAlerts.splice(index, 1);
            populateAlertsTable();
        }
    }
}

function openCreateAlertModal() {
    openModal('create-alert-modal');
}

// Content Management Functions
function openContentModal(type) {
    const modal = document.getElementById('content-modal');
    const title = document.getElementById('content-modal-title');
    const body = document.getElementById('content-modal-body');
    
    title.textContent = `Manage ${capitalizeFirst(type)}`;
    
    let content = '';
    switch(type) {
        case 'crops':
            content = `
                <div class="content-management">
                    <h4>Crop Management</h4>
                    <p>Manage crop varieties, growing guides, and seasonal information.</p>
                    <div class="form-group">
                        <label>Crop Name</label>
                        <input type="text" placeholder="Enter crop name">
                    </div>
                    <div class="form-group">
                        <label>Category</label>
                        <select>
                            <option>Cereals</option>
                            <option>Vegetables</option>
                            <option>Fruits</option>
                            <option>Cash Crops</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Growing Season</label>
                        <input type="text" placeholder="Optimal growing season">
                    </div>
                    <div class="form-actions">
                        <button class="btn btn-primary">Add Crop</button>
                        <button class="btn btn-secondary">Update Existing</button>
                    </div>
                </div>
            `;
            break;
        case 'pests':
            content = `
                <div class="content-management">
                    <h4>Pest Management</h4>
                    <p>Manage pest information, identification guides, and treatment methods.</p>
                    <div class="form-group">
                        <label>Pest Name</label>
                        <input type="text" placeholder="Enter pest name">
                    </div>
                    <div class="form-group">
                        <label>Affected Crops</label>
                        <input type="text" placeholder="Crops commonly affected">
                    </div>
                    <div class="form-group">
                        <label>Treatment Method</label>
                        <textarea rows="3" placeholder="Recommended treatment"></textarea>
                    </div>
                    <div class="form-actions">
                        <button class="btn btn-primary">Add Pest Info</button>
                        <button class="btn btn-secondary">Update Existing</button>
                    </div>
                </div>
            `;
            break;
        case 'schemes':
            content = `
                <div class="content-management">
                    <h4>Government Schemes Management</h4>
                    <p>Manage government schemes, subsidies, and farmer benefits information.</p>
                    <div class="form-group">
                        <label>Scheme Name</label>
                        <input type="text" placeholder="Enter scheme name">
                    </div>
                    <div class="form-group">
                        <label>Eligibility</label>
                        <textarea rows="2" placeholder="Eligibility criteria"></textarea>
                    </div>
                    <div class="form-group">
                        <label>Benefits</label>
                        <textarea rows="3" placeholder="Scheme benefits"></textarea>
                    </div>
                    <div class="form-actions">
                        <button class="btn btn-primary">Add Scheme</button>
                        <button class="btn btn-secondary">Update Existing</button>
                    </div>
                </div>
            `;
            break;
    }
    
    body.innerHTML = content;
    openModal('content-modal');
}

// User Management Functions
function viewUser(userId) {
    const user = sampleUsers.find(u => u.id === userId);
    if (user) {
        showNotification(`Viewing user: ${user.name}`, 'info');
    }
}

function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        showNotification('User deleted successfully', 'success');
        const index = sampleUsers.findIndex(user => user.id === userId);
        if (index > -1) {
            sampleUsers.splice(index, 1);
            populateUsersTable();
        }
    }
}

// Utility Functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Form Submissions
document.getElementById('create-alert-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const title = document.getElementById('alert-title').value;
    const type = document.getElementById('alert-type').value;
    const region = document.getElementById('alert-region').value;
    const description = document.getElementById('alert-description').value;
    
    if (title && type && region && description) {
        // Add to alerts array
        const newAlert = {
            id: sampleAlerts.length + 1,
            title: title,
            type: type,
            region: region,
            date: new Date().toISOString().split('T')[0]
        };
        
        sampleAlerts.unshift(newAlert);
        populateAlertsTable();
        closeModal('create-alert-modal');
        showNotification('Alert created successfully!', 'success');
        
        // Reset form
        document.getElementById('create-alert-form').reset();
    } else {
        showNotification('Please fill all required fields', 'error');
    }
});

// Close modals when clicking outside
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});

// Search and Filter Functionality
function setupSearchAndFilters() {
    // Search inputs
    const searchInputs = document.querySelectorAll('.search-input');
    searchInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            // Implementation would filter respective tables
            console.log(`Searching for: ${searchTerm}`);
        });
    });
    
    // Filter selects
    const filterSelects = document.querySelectorAll('.filter-select');
    filterSelects.forEach(select => {
        select.addEventListener('change', (e) => {
            const filterValue = e.target.value;
            // Implementation would filter respective tables
            console.log(`Filtering by: ${filterValue}`);
        });
    });
}

// Responsive behavior
function handleResponsive() {
    if (window.innerWidth <= 1024) {
        sidebar.classList.remove('active');
    }
}

window.addEventListener('resize', handleResponsive);

// Initialize Dashboard on Load
document.addEventListener('DOMContentLoaded', () => {
    initializeDashboard();
    setupSearchAndFilters();
    handleResponsive();
    animateStatsNumbers();
    
    // Show welcome notification
    setTimeout(() => {
        showNotification('Welcome to KrishiAI Admin Dashboard!', 'success');
    }, 1000);
});

// Animate stats numbers with counting effect
function animateStatsNumbers() {
    const statsData = [
        { element: '.stat-card:nth-child(1) .stat-content h3', target: 12847, duration: 2000 },
        { element: '.stat-card:nth-child(2) .stat-content h3', target: 8923, duration: 2200 },
        { element: '.stat-card:nth-child(3) .stat-content h3', target: 142, duration: 1800 },
        { element: '.stat-card:nth-child(4) .stat-content h3', target: 23, duration: 1500 }
    ];

    statsData.forEach(stat => {
        const element = document.querySelector(stat.element);
        if (element) {
            animateNumber(element, 0, stat.target, stat.duration);
        }
    });
}

// Animate individual number counting
function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    const range = end - start;
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Use easeOutCubic for smooth deceleration
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (range * easeProgress));
        
        // Format number with commas for better readability
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        } else {
            // Ensure final value is exact
            element.textContent = end.toLocaleString();
        }
    }
    
    requestAnimationFrame(updateNumber);
}
// Console message for developers
console.log('%cKrishiAI Admin Dashboard', 'color: #4a7c59; font-size: 16px; font-weight: bold;');
console.log('%cAdmin panel loaded successfully', 'color: #666; font-size: 12px;');