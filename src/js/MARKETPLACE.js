// Product data
const products = [
  {
    id: 1,
    name: "Premium Wheat Seeds",
    category: "seeds",
    price: 450,
    image: "https://nutrisum.in/cdn/shop/articles/The_Digestive_and_Energizing_Power_of_Whole_Wheat__Unveiling_its_Benefits.png?v=1706006243&width=1100",
    seller: {
      name: "Rajesh Kumar",
      location: "Punjab, India",
      phone: "+91 98765 43210",
      email: "rajesh.kumar@email.com",
      avatar: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
    },
    date: new Date('2024-01-15')
  },
  {
    id: 2,
    name: "Organic NPK Fertilizer",
    category: "fertilizers",
    price: 850,
    image: "https://agribegri.com/productimage/7056536241744610610.webp",
    seller: {
      name: "Priya Sharma",
      location: "Haryana, India",
      phone: "+91 87654 32109",
      email: "priya.sharma@email.com",
      avatar: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
    },
    date: new Date('2024-01-18')
  },
  {
    id: 3,
    name: "Heavy Duty Tractor",
    category: "machinery",
    price: 850000,
    image: "https://5.imimg.com/data5/NJ/AF/GLADMIN-38685380/t7-heavy-duty-500x500.png",
    seller: {
      name: "Amit Singh",
      location: "Uttar Pradesh, India",
      phone: "+91 76543 21098",
      email: "amit.singh@email.com",
      avatar: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
    },
    date: new Date('2024-01-12')
  },
  {
    id: 4,
    name: "Garden Hand Tools Set",
    category: "tools",
    price: 1200,
    image: "https://m.media-amazon.com/images/I/71t74kwI81L.jpg",
    seller: {
      name: "Sunita Devi",
      location: "Bihar, India",
      phone: "+91 65432 10987",
      email: "sunita.devi@email.com",
      avatar: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
    },
    date: new Date('2024-01-20')
  },
  {
    id: 5,
    name: "Hybrid Tomato Seeds",
    category: "seeds",
    price: 320,
    image: "https://5.imimg.com/data5/SELLER/Default/2024/6/428694785/YY/CQ/WP/10660676/ravi-f1-hybrid-tomato-seed-500x500.jpg",
    seller: {
      name: "Ravi Patel",
      location: "Gujarat, India",
      phone: "+91 54321 09876",
      email: "ravi.patel@email.com",
      avatar: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
    },
    date: new Date('2024-01-22')
  },
  {
    id: 6,
    name: "Bio Pesticide Spray",
    category: "fertilizers",
    price: 680,
    image: "https://m.media-amazon.com/images/I/41sguMH7qIL._UF1000,1000_QL80_.jpg",
    seller: {
      name: "Meera Nair",
      location: "Kerala, India",
      phone: "+91 43210 98765",
      email: "meera.nair@email.com",
      avatar: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
    },
    date: new Date('2024-01-25')
  }
];

const recommendedProducts = [
  {
    id: 101,
    name: "Smart Irrigation System",
    price: 15000,
    image: "https://www.shutterstock.com/image-photo/smart-sprinkling-embracing-greenery-automatic-260nw-2392592377.jpg"
  },
  {
    id: 102,
    name: "Soil Testing Kit",
    price: 2500,
    image: "https://5.imimg.com/data5/SELLER/Default/2023/9/343720103/YT/NQ/NT/31927185/soil-testing-kit.jpg"
  },
  {
    id: 103,
    name: "Weather Monitor",
    price: 5200,
    image: "https://5.imimg.com/data5/SELLER/Default/2024/8/443642584/MN/XD/MQ/13413432/weather-monitoring-station.jpg"
  },
  {
    id: 104,
    name: "Solar Water Pump",
    price: 45000,
    image: "https://5.imimg.com/data5/SELLER/Default/2021/10/RB/OF/MS/138865819/agriculture-solar-water-pump.png"
  }
];

// DOM Elements - Navigation
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const langBtn = document.getElementById('lang-btn');
const langDropdown = document.getElementById('lang-dropdown');
const selectedLang = document.getElementById('selected-lang');
const dashboardLink = document.getElementById('dashboard-link');

// DOM elements
const productsGrid = document.getElementById('productsGrid');
const recommendedGrid = document.getElementById('recommendedGrid');
const noProducts = document.getElementById('noProducts');
const categoryFilter = document.getElementById('categoryFilter');
const searchInput = document.getElementById('searchInput');
const sortFilter = document.getElementById('sortFilter');
const contactModal = document.getElementById('contactModal');
const sellModal = document.getElementById('sellModal');
const openSellModal = document.getElementById('openSellModal');
const closeSellModal = document.getElementById('closeSellModal');
const closeContactModal = document.getElementById('closeContactModal');
const sellForm = document.getElementById('sellForm');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

// State
let filteredProducts = [...products];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
  initializeNavigation();
  renderProducts();
  renderRecommendedProducts();
  setupEventListeners();
});

// Initialize Navigation
function initializeNavigation() {
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

  // Admin Dashboard Visibility (Simulated)
  let isAdmin = false;
  function toggleAdminFeatures() {
    if (isAdmin) {
      dashboardLink.style.display = 'block';
    } else {
      dashboardLink.style.display = 'none';
    }
  }
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
}

// Render products
function renderProducts() {
  if (filteredProducts.length === 0) {
    productsGrid.style.display = 'none';
    noProducts.style.display = 'block';
    return;
  }

  productsGrid.style.display = 'grid';
  noProducts.style.display = 'none';

  productsGrid.innerHTML = filteredProducts.map(product => `
    <div class="product-card" data-id="${product.id}">
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <div class="product-info">
        <span class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span>
        <h3 class="product-name">${product.name}</h3>
        <div class="product-price">₹${product.price.toLocaleString()}</div>
        <div class="seller-info">
          <img src="${product.seller.avatar}" alt="${product.seller.name}" class="seller-avatar">
          <div class="seller-details">
            <h4>${product.seller.name}</h4>
            <p class="seller-location">${product.seller.location}</p>
          </div>
        </div>
        <button class="contact-seller-btn" onclick="openContactModal(${product.id})">
          Contact Seller
        </button>
      </div>
    </div>
  `).join('');
}

// Render recommended products
function renderRecommendedProducts() {
  recommendedGrid.innerHTML = recommendedProducts.map(product => `
    <div class="recommended-card">
      <img src="${product.image}" alt="${product.name}" class="recommended-image">
      <div class="recommended-info">
        <h4 class="recommended-name">${product.name}</h4>
        <div class="recommended-price">₹${product.price.toLocaleString()}</div>
        <button class="view-btn" onclick="viewRecommendedProduct(${product.id})">View</button>
      </div>
    </div>
  `).join('');
}

// Filter and sort products
function filterProducts() {
  const category = categoryFilter.value;
  const searchTerm = searchInput.value.toLowerCase();
  const sortBy = sortFilter.value;

  // Filter by category and search term
  filteredProducts = products.filter(product => {
    const matchesCategory = !category || product.category === category;
    const matchesSearch = !searchTerm || product.name.toLowerCase().includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  // Sort products
  switch (sortBy) {
    case 'price-low':
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case 'newest':
      filteredProducts.sort((a, b) => b.date - a.date);
      break;
  }

  renderProducts();
}

// Open contact modal
function openContactModal(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const modal = document.getElementById('contactModal');
  const sellerImage = document.getElementById('sellerImage');
  const sellerName = document.getElementById('sellerName');
  const sellerLocation = document.getElementById('sellerLocation');
  const sellerPhone = document.getElementById('sellerPhone');
  const sellerEmail = document.getElementById('sellerEmail');

  sellerImage.src = product.seller.avatar;
  sellerName.textContent = product.seller.name;
  sellerLocation.textContent = product.seller.location;
  sellerPhone.textContent = product.seller.phone;
  sellerEmail.textContent = product.seller.email;

  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal(modal) {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// View recommended product
function viewRecommendedProduct(productId) {
  alert(`Viewing product with ID: ${productId}\nThis would navigate to the product detail page.`);
}

// Setup event listeners
function setupEventListeners() {
  // Filter and search
  categoryFilter.addEventListener('change', filterProducts);
  searchInput.addEventListener('input', filterProducts);
  sortFilter.addEventListener('change', filterProducts);

  // Modal controls
  openSellModal.addEventListener('click', () => {
    sellModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  });

  closeSellModal.addEventListener('click', () => closeModal(sellModal));
  closeContactModal.addEventListener('click', () => closeModal(contactModal));

  // Close modals when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === contactModal) {
      closeModal(contactModal);
    }
    if (e.target === sellModal) {
      closeModal(sellModal);
    }
  });

  // Sell form submission
  sellForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(sellForm);
    const productData = {
      name: formData.get('productName'),
      category: formData.get('productCategory'),
      price: formData.get('productPrice'),
      description: formData.get('productDescription'),
      image: formData.get('productImage')
    };

    alert(`Product "${productData.name}" has been listed successfully!\n\nCategory: ${productData.category}\nPrice: ₹${productData.price}\nDescription: ${productData.description}`);
    
    sellForm.reset();
    closeModal(sellModal);
  });

  // Navigation toggle
  // Navigation is handled in initializeNavigation()

  // Contact buttons in modal
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('phone-btn')) {
      const phone = document.getElementById('sellerPhone').textContent;
      alert(`Calling ${phone}...\nThis would open your phone app.`);
    }
    if (e.target.classList.contains('email-btn')) {
      const email = document.getElementById('sellerEmail').textContent;
      alert(`Opening email to ${email}...\nThis would open your email app.`);
    }
  });

  // Language selector
  // Language selector is handled in initializeNavigation()

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (contactModal.style.display === 'block') {
        closeModal(contactModal);
      }
      if (sellModal.style.display === 'block') {
        closeModal(sellModal);
      }
    }
  });
}

// Search functionality with debounce
let searchTimeout;
searchInput.addEventListener('input', () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(filterProducts, 300);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#marketplace') return; // Don't scroll for current page
    
    // For demo purposes, just show an alert
    alert(`Navigating to: ${targetId.replace('#', '').charAt(0).toUpperCase() + targetId.replace('#', '').slice(1)}`);
  });
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.addEventListener('load', () => {
      img.style.opacity = '1';
    });
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
  });
});

// File upload preview
document.getElementById('productImage').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (file) {
    const label = e.target.nextElementSibling;
    label.innerHTML = `<i class="fas fa-check"></i> ${file.name}`;
  }
});

// Add scroll animations for product cards
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

// Observe product cards when they're rendered
function observeProductCards() {
  document.querySelectorAll('.product-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
}

// Update renderProducts to include animations
const originalRenderProducts = renderProducts;
renderProducts = function() {
  originalRenderProducts();
  setTimeout(observeProductCards, 100);
};

// Make functions global for onclick handlers
window.openContactModal = openContactModal;
window.viewRecommendedProduct = viewRecommendedProduct;