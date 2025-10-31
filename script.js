        
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all original functionality
    initMobileMenu();
    initBackToTop();
    initFormValidation();
    initSmoothScrolling();
    initScrollAnimations();
    
    // --- NEW TASK 2 INITIALIZATION ---
    initProductCatalog();
    // --- END OF NEW TASK 2 INITIALIZATION ---
});

// Mobile Menu Toggle
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    
    if (hamburger && navList) {
        hamburger.addEventListener('click', function() {
            navList.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navList.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside (Note: This might close on cart click, let's refine)
        document.addEventListener('click', function(e) {
            const cartIcon = document.querySelector('.cart-icon-wrapper');
            // Check if click is outside nav, hamburger, AND cart icon
            if (!hamburger.contains(e.target) && !navList.contains(e.target) && !cartIcon.contains(e.target)) {
                navList.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
}

// Back to Top Button
function initBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        // Show/hide button based on scroll position (Handled by optimized handler)
        
        // Smooth scroll to top when clicked
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Form Validation
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form elements
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            // Clear previous errors
            clearErrors();
            
            // Validate form
            let isValid = true;
            
            // Name validation
            if (!validateName(name.value.trim())) {
                showError('nameError', 'Please enter a valid name (at least 2 characters)');
                isValid = false;
            }
            
            // Email validation
            if (!validateEmail(email.value.trim())) {
                showError('emailError', 'Please enter a valid email address');
                isValid = false;
            }
            
            // Message validation
            if (!validateMessage(message.value.trim())) {
                showError('messageError', 'Please enter a message (at least 10 characters)');
                isValid = false;
            }
            
            // If form is valid, show success message
            if (isValid) {
                showSuccessMessage();
                contactForm.reset();
            }
        });
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }
}

// Validation Functions
function validateName(name) {
    return name.length >= 2 && /^[a-zA-Z\s]+$/.test(name);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateMessage(message) {
    return message.length >= 10;
}

function validateField(field) {
    const fieldName = field.name;
    const fieldValue = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    switch (fieldName) {
        case 'name':
            if (!validateName(fieldValue)) {
                errorMessage = 'Please enter a valid name (at least 2 characters)';
                isValid = false;
            }
            break;
        case 'email':
            if (!validateEmail(fieldValue)) {
                errorMessage = 'Please enter a valid email address';
                isValid = false;
            }
            break;
        case 'message':
            if (!validateMessage(fieldValue)) {
                errorMessage = 'Please enter a message (at least 10 characters)';
                isValid = false;
            }
            break;
    }
    
    if (!isValid) {
        showError(fieldName + 'Error', errorMessage);
    } else {
        clearFieldError(field);
    }
    
    return isValid;
}

// Error Handling Functions
function showError(errorId, message) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(error => {
        error.textContent = '';
        error.style.display = 'none';
    });
}

function clearFieldError(field) {
    const errorId = field.name + 'Error';
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
}

function showSuccessMessage() {
    // Create success message element
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, #4CAF50, #2D5016);
            color: white;
            padding: 2rem 3rem;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            text-align: center;
            z-index: 10000;
            animation: fadeInScale 0.5s ease;
        ">
            <i class="fas fa-check-circle" style="font-size: 3rem; margin-bottom: 1rem; color: #FFD700;"></i>
            <h3 style="margin-bottom: 1rem; font-size: 1.5rem;">Thank You!</h3>
            <p style="margin-bottom: 0; opacity: 0.9;">Your message has been sent successfully. We'll get back to you soon!</p>
        </div>
        <style>
            @keyframes fadeInScale {
                from {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.8);
                }
                to {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
            }
        </style>
    `;
    
    document.body.appendChild(successMessage);
    
    // Remove success message after 3 seconds
    setTimeout(() => {
        if (document.body.contains(successMessage)) {
                document.body.removeChild(successMessage);
        }
    }, 3000);
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries, obs) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Stop observing once animated
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature, .info-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Note: .product-card animation will be handled by the product rendering function
}


// CTA Button click handler
document.addEventListener('DOMContentLoaded', function() {
    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            const productsSection = document.getElementById('products');
            if (productsSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = productsSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
});

// Add loading animation to page
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Utility function to debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(function() {
    // Header scroll effect
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        if (header.style.backdropFilter !== 'blur(10px)') {
            header.style.backdropFilter = 'blur(10px)';
        }
    } else {
        header.style.background = '#FFFFFF';
            if (header.style.backdropFilter !== 'none') {
            header.style.backdropFilter = 'none';
            }
    }
    
    // Back to top button
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    }
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// --- END OF ORIGINAL script.js ---


// --- START OF NEW TASK 2 SCRIPT ---

// Product Database
const allProducts = [
    {
        id: 1,
        name: "Fresh Apples",
        description: "Crisp and juicy apples from local orchards",
        price: 2.99,
        unit: "lb",
        image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        category: "fruit"
    },
    {
        id: 2,
        name: "Organic Carrots",
        description: "Sweet and crunchy organic carrots",
        price: 1.99,
        unit: "lb",
        image: "https://images.unsplash.com/photo-1445282768818-728615cc910a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        category: "vegetable"
    },
    {
        id: 3,
        name: "Fresh Lemons",
        description: "Zesty lemons perfect for cooking and drinks",
        price: 3.49,
        unit: "lb",
        image: "https://images.unsplash.com/photo-1568569350062-ebfa3cb195df?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2670",
        category: "fruit"
    },
    {
        id: 4,
        name: "Bell Peppers",
        description: "Colorful bell peppers for your recipes",
        price: 2.49,
        unit: "lb",
        image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        category: "vegetable"
    },
    {
        id: 5,
        name: "Fresh Lettuce",
        description: "Crisp lettuce leaves for healthy salads",
        price: 1.79,
        unit: "head",
        image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        category: "vegetable"
    },
    {
        id: 6,
        name: "Sweet Grapes",
        description: "Delicious grapes bursting with flavor",
        price: 4.99,
        unit: "lb",
        image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        category: "fruit"
    },
    {
        id: 7,
        name: "Tomatoes",
        description: "Ripe tomatoes perfect for any dish",
        price: 2.99,
        unit: "lb",
        image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        category: "vegetable" // Botanically a fruit, but culinarily a vegetable
    },
    {
        id: 8,
        name: "Fresh Spinach",
        description: "Nutrient-rich spinach for your meals",
        price: 2.29,
        unit: "bunch",
        image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        category: "vegetable"
    },
    {
        id: 9,
        name: "Fresh Bananas",
        description: "Sweet and nutritious bananas",
        price: 1.49,
        unit: "lb",
        image: "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        category: "fruit"
    },
        {
        id: 10,
        name: "Organic Broccoli",
        description: "Fresh broccoli florets, packed with vitamins",
        price: 3.99,
        unit: "lb",
        image: "https://images.unsplash.com/photo-1604296707566-e12dd0d7f938?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1632",
        category: "vegetable"
    },
    {
        id: 11,
        name: "Strawberries",
        description: "Sweet, juicy, and red all the way through",
        price: 5.49,
        unit: "pint",
        image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
        category: "fruit"
    },
    {
        id: 12,
        name: "Avocado",
        description: "Rich and creamy Hass avocados",
        price: 2.19,
        unit: "each",
        image: "https://images.unsplash.com/photo-1601039641847-7857b994d704?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
        category: "fruit"
    }
];

// Cart State
let cartCount = 0;

// Filter State
let currentFilters = {
    searchTerm: '',
    category: 'all',
    maxPrice: 10
};

// Main Initialization Function for Task 2
function initProductCatalog() {
    // Get elements
    const productsGrid = document.getElementById('products-grid');
    const searchInput = document.getElementById('search-input');
    const categoryFilters = document.getElementById('category-filters');
    const priceSlider = document.getElementById('price-slider');
    const priceValue = document.getElementById('price-value');
    const cartCountElement = document.getElementById('cart-count');

    // --- 1. Render Initial Products ---
    renderProducts(allProducts);
    
    // --- 2. Setup Filter Event Listeners ---
    
    // Search Bar (real-time filtering)
    searchInput.addEventListener('input', () => {
        currentFilters.searchTerm = searchInput.value.toLowerCase();
        filterAndRenderProducts();
    });

    // Category Buttons
    categoryFilters.addEventListener('click', (e) => {
        if (e.target.classList.contains('category-btn')) {
            // Update active class
            categoryFilters.querySelector('.active').classList.remove('active');
            e.target.classList.add('active');
            
            // Update filter state
            currentFilters.category = e.target.dataset.category;
            filterAndRenderProducts();
        }
    });

    // Price Slider
    // Set initial max price and value based on product data
    const maxPrice = Math.ceil(Math.max(...allProducts.map(p => p.price)));
    priceSlider.max = maxPrice;
    priceSlider.value = maxPrice;
    priceValue.textContent = `$${Number(maxPrice).toFixed(2)}`;
    currentFilters.maxPrice = maxPrice;

    priceSlider.addEventListener('input', () => {
        const price = Number(priceSlider.value);
        currentFilters.maxPrice = price;
        priceValue.textContent = `$${price.toFixed(2)}`;
        // Debounce filtering for better slider performance
        debouncedFilterAndRender();
    });
    
    // --- 3. Setup Cart Event Listener ---
    productsGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            // No need to get ID, just increment count as per simple brief
            cartCount++;
            cartCountElement.textContent = cartCount;
            
            // Add a little "added" feedback
            e.target.textContent = "Added!";
            e.target.style.background = "var(--secondary-green)";
            setTimeout(() => {
                    if (e.target) {
                    e.target.innerHTML = '<i class="fas fa-cart-plus"></i> Add to Cart';
                    e.target.style.background = "var(--primary-green)";
                    }
            }, 1000);
        }
    });
}

// Function to filter products based on current state
function filterAndRenderProducts() {
    let filteredProducts = allProducts.filter(product => {
        // 1. Search filter
        const nameMatch = product.name.toLowerCase().includes(currentFilters.searchTerm);
        
        // 2. Category filter
        const categoryMatch = (currentFilters.category === 'all') || (product.category === currentFilters.category);
        
        // 3. Price filter
        const priceMatch = product.price <= currentFilters.maxPrice;

        return nameMatch && categoryMatch && priceMatch;
    });

    renderProducts(filteredProducts);
}

// Create a debounced version of the filter function for the slider
const debouncedFilterAndRender = debounce(filterAndRenderProducts, 200);

// Function to render products to the grid
function renderProducts(productsToRender) {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = ''; // Clear existing products
    
    if (productsToRender.length === 0) {
        productsGrid.innerHTML = `<p id="no-products-message">No products match your filters. Try adjusting your search!</p>`;
        return;
    }

    // Create intersection observer for new cards
    const observer = new IntersectionObserver(function(entries, obs) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    productsToRender.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.id = product.id; // Add data-id for cart logic
        
        card.innerHTML = `
            <div class="product-card-content">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" class="product-img" onerror="this.src='https://placehold.co/300x200/F5F5DC/2C3E50?text=${product.name.replace(' ','+')}'; this.onerror=null;">
                </div>
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="price">$${product.price.toFixed(2)}/${product.unit}</div>
            </div>
            <button class="add-to-cart-btn">
                <i class="fas fa-cart-plus"></i> Add to Cart
            </button>
        `;
        
        // Set up for animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        productsGrid.appendChild(card);
        observer.observe(card); // Observe new card
    });
}