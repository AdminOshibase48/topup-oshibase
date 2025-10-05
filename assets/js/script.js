// Game Data Configuration
const gameData = {
    mlbb: {
        name: "Mobile Legends",
        currency: "Diamond",
        icon: "https://via.placeholder.com/60x60/FF6B6B/white?text=ML",
        nominals: [
            { amount: "86 Diamond", price: 20000, bonus: "", popular: false },
            { amount: "172 Diamond", price: 40000, bonus: "+14 Diamond", popular: false },
            { amount: "257 Diamond", price: 60000, bonus: "+21 Diamond", popular: false },
            { amount: "344 Diamond", price: 80000, bonus: "+28 Diamond", popular: true },
            { amount: "429 Diamond", price: 100000, bonus: "+35 Diamond", popular: false },
            { amount: "514 Diamond", price: 120000, bonus: "+42 Diamond", popular: false },
            { amount: "706 Diamond", price: 150000, bonus: "+58 Diamond", popular: true },
            { amount: "1441 Diamond", price: 300000, bonus: "+119 Diamond", popular: false }
        ]
    },
    freefire: {
        name: "Free Fire",
        currency: "Diamond",
        icon: "https://via.placeholder.com/60x60/4ECDC4/white?text=FF",
        nominals: [
            { amount: "70 Diamond", price: 10000, bonus: "", popular: false },
            { amount: "140 Diamond", price: 20000, bonus: "+10 Diamond", popular: false },
            { amount: "210 Diamond", price: 30000, bonus: "+15 Diamond", popular: false },
            { amount: "355 Diamond", price: 50000, bonus: "+25 Diamond", popular: true },
            { amount: "720 Diamond", price: 100000, bonus: "+50 Diamond", popular: true },
            { amount: "1450 Diamond", price: 200000, bonus: "+100 Diamond", popular: false }
        ]
    },
    pubg: {
        name: "PUBG Mobile",
        currency: "UC",
        icon: "https://via.placeholder.com/60x60/45B7D1/white?text=PG",
        nominals: [
            { amount: "60 UC", price: 15000, bonus: "", popular: false },
            { amount: "325 UC", price: 80000, bonus: "+25 UC", popular: true },
            { amount: "660 UC", price: 160000, bonus: "+60 UC", popular: false },
            { amount: "1800 UC", price: 400000, bonus: "+200 UC", popular: true },
            { amount: "3850 UC", price: 800000, bonus: "+450 UC", popular: false },
            { amount: "8100 UC", price: 1600000, bonus: "+1000 UC", popular: false }
        ]
    },
    genshin: {
        name: "Genshin Impact",
        currency: "Crystal",
        icon: "https://via.placeholder.com/60x60/96CEB4/white?text=GI",
        nominals: [
            { amount: "60 Crystal", price: 15000, bonus: "", popular: false },
            { amount: "330 Crystal", price: 80000, bonus: "+30 Crystal", popular: true },
            { amount: "1090 Crystal", price: 240000, bonus: "+110 Crystal", popular: false },
            { amount: "2240 Crystal", price: 480000, bonus: "+240 Crystal", popular: true },
            { amount: "3880 Crystal", price: 800000, bonus: "+520 Crystal", popular: false }
        ]
    },
    valorant: {
        name: "Valorant",
        currency: "Points",
        icon: "https://via.placeholder.com/60x60/F7A8B8/white?text=VL",
        nominals: [
            { amount: "125 Points", price: 15000, bonus: "", popular: false },
            { amount: "420 Points", price: 50000, bonus: "", popular: true },
            { amount: "700 Points", price: 80000, bonus: "", popular: false },
            { amount: "1375 Points", price: 150000, bonus: "", popular: true },
            { amount: "2400 Points", price: 250000, bonus: "", popular: false }
        ]
    },
    codm: {
        name: "Call of Duty Mobile",
        currency: "CP",
        icon: "https://via.placeholder.com/60x60/FFE66D/white?text=CO",
        nominals: [
            { amount: "80 CP", price: 12000, bonus: "", popular: false },
            { amount: "420 CP", price: 60000, bonus: "", popular: true },
            { amount: "700 CP", price: 100000, bonus: "", popular: false },
            { amount: "1375 CP", price: 180000, bonus: "", popular: true },
            { amount: "2400 CP", price: 300000, bonus: "", popular: false }
        ]
    }
};

// Global State Management
let currentStep = 1;
let selectedGame = null;
let selectedNominal = null;
let orderData = {};
let userData = null;

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    checkUserLoginStatus();
});

// Main Initialization Function
function initializeApp() {
    if (document.body.classList.contains('landing-page')) {
        initializeLandingPage();
    } else if (document.body.classList.contains('topup-page')) {
        initializeTopupPage();
    }
    
    initializeScrollAnimations();
    initializeEventListeners();
    initializeNotificationSystem();
}

// Landing Page Initialization
function initializeLandingPage() {
    console.log('Initializing Landing Page...');
    
    // Add animations to elements
    animateOnScroll();
    
    // Initialize game cards with animations
    const gameCards = document.querySelectorAll('.game-card-large');
    gameCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('animate-fade-in-up');
        
        // Add click animation
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Initialize feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('animate-fade-in-up');
    });
}

// Topup Page Initialization
function initializeTopupPage() {
    console.log('Initializing Topup Page...');
    
    initializeGameSelection();
    initializeNominalSelection();
    initializeFormValidation();
    initializePaymentMethods();
    updateProgressSteps();
    
    // Load saved game from localStorage or URL parameter
    loadSavedGame();
}

// Event Listeners Initialization
function initializeEventListeners() {
    // Navigation events
    initializeNavigation();
    
    // Auth form events
    initializeAuthForms();
    
    // User menu events
    initializeUserMenu();
    
    // Modal events
    initializeModalEvents();
    
    // Search functionality
    initializeSearch();
    
    // Keyboard shortcuts
    initializeKeyboardShortcuts();
}

// Navigation Functions
function initializeNavigation() {
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
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
}

// Start Topup Process
function startTopup() {
    if (!userData) {
        showLogin();
        showNotification('Silakan login terlebih dahulu untuk top up', 'info');
        return;
    }
    window.location.href = 'topup.html';
}

// Navigate to Home
function goToHome() {
    window.location.href = 'index.html';
}

// Scroll to Games Section
function scrollToGames() {
    const gamesSection = document.getElementById('games');
    if (gamesSection) {
        gamesSection.scrollIntoView({ 
            behavior: 'smooth' 
        });
    }
}

// Select Game from Landing Page
function selectGame(gameId) {
    if (!gameData[gameId]) {
        showNotification('Game tidak ditemukan', 'error');
        return;
    }
    
    selectedGame = gameId;
    
    // Add selection animation
    const gameCard = document.querySelector(`[data-game="${gameId}"]`);
    if (gameCard) {
        gameCard.style.transform = 'scale(0.95)';
        setTimeout(() => {
            gameCard.style.transform = 'scale(1)';
        }, 150);
    }
    
    // Save selection and redirect
    localStorage.setItem('selectedGame', gameId);
    
    if (!userData) {
        showLogin();
        showNotification('Silakan login untuk melanjutkan top up', 'info');
    } else {
        setTimeout(() => {
            startTopup();
        }, 500);
    }
}

// Show All Games (Placeholder)
function showAllGames() {
    showNotification('Fitur daftar semua game sedang dikembangkan!', 'info');
}

// Auth Modal Functions
function showLogin() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Add animation
        modal.style.animation = 'fadeIn 0.3s ease';
    }
}

function showRegister() {
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    
    if (loginModal && registerModal) {
        loginModal.style.display = 'none';
        registerModal.style.display = 'block';
        
        // Add animation
        registerModal.style.animation = 'fadeIn 0.3s ease';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 250);
    }
}

// Initialize Auth Forms
function initializeAuthForms() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
}

// Login Handler
function handleLogin(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const remember = formData.get('remember');
    
    // Simple validation
    if (!email || !password) {
        showNotification('Harap isi semua field', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Mock successful login
        userData = {
            id: 1,
            name: 'Player Gaming',
            email: email,
            username: email.split('@')[0],
            balance: 150000,
            joinDate: new Date().toISOString()
        };
        
        // Save to localStorage if remember me is checked
        if (remember) {
            localStorage.setItem('userData', JSON.stringify(userData));
        }
        
        sessionStorage.setItem('userData', JSON.stringify(userData));
        
        showNotification('Login berhasil! Selamat datang kembali!', 'success');
        closeModal('loginModal');
        
        // Update UI
        updateUserInterface();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // If there's a selected game, redirect to topup
        const savedGame = localStorage.getItem('selectedGame');
        if (savedGame) {
            setTimeout(() => {
                startTopup();
            }, 1000);
        }
    }, 1500);
}

// Register Handler
function handleRegister(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const username = formData.get('username');
    const password = formData.get('password');
    const confirm = formData.get('confirm');
    const terms = formData.get('terms');
    
    // Validation
    if (!name || !email || !username || !password || !confirm) {
        showNotification('Harap isi semua field', 'error');
        return;
    }
    
    if (password !== confirm) {
        showNotification('Password dan konfirmasi password tidak cocok', 'error');
        return;
    }
    
    if (!terms) {
        showNotification('Anda harus menyetujui syarat dan ketentuan', 'error');
        return;
    }
    
    if (password.length < 6) {
        showNotification('Password harus minimal 6 karakter', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mendaftar...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Mock successful registration
        userData = {
            id: Math.floor(Math.random() * 1000),
            name: name,
            email: email,
            username: username,
            balance: 0,
            joinDate: new Date().toISOString()
        };
        
        sessionStorage.setItem('userData', JSON.stringify(userData));
        
        showNotification('Registrasi berhasil! Selamat bergabung!', 'success');
        closeModal('registerModal');
        
        // Update UI
        updateUserInterface();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// User Menu Functions
function initializeUserMenu() {
    const userMenu = document.querySelector('.user-menu');
    if (userMenu) {
        // Click outside to close
        document.addEventListener('click', function(event) {
            if (!userMenu.contains(event.target)) {
                const dropdown = document.getElementById('userDropdown');
                if (dropdown) {
                    dropdown.classList.remove('show');
                }
            }
        });
    }
}

function toggleUserMenu() {
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
}

function logout() {
    userData = null;
    sessionStorage.removeItem('userData');
    localStorage.removeItem('userData');
    
    showNotification('Logout berhasil', 'success');
    updateUserInterface();
    
    // Redirect to home if on topup page
    if (document.body.classList.contains('topup-page')) {
        setTimeout(() => {
            goToHome();
        }, 1000);
    }
}

// Check User Login Status
function checkUserLoginStatus() {
    const savedUserData = sessionStorage.getItem('userData') || localStorage.getItem('userData');
    if (savedUserData) {
        try {
            userData = JSON.parse(savedUserData);
            updateUserInterface();
        } catch (e) {
            console.error('Error parsing user data:', e);
        }
    }
}

// Update User Interface Based on Login Status
function updateUserInterface() {
    const loginBtn = document.querySelector('.btn-login');
    const registerBtn = document.querySelector('.btn-register');
    const userMenu = document.querySelector('.user-menu');
    
    if (userData) {
        // User is logged in
        if (loginBtn) loginBtn.style.display = 'none';
        if (registerBtn) registerBtn.style.display = 'none';
        if (userMenu) userMenu.style.display = 'block';
        
        // Update user info
        const userName = document.querySelector('.btn-user span');
        if (userName) {
            userName.textContent = `Hi, ${userData.name.split(' ')[0]}!`;
        }
    } else {
        // User is not logged in
        if (loginBtn) loginBtn.style.display = 'block';
        if (registerBtn) registerBtn.style.display = 'block';
        if (userMenu) userMenu.style.display = 'none';
    }
}

// Modal Events Initialization
function initializeModalEvents() {
    // Close modals with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                if (modal.style.display === 'block') {
                    closeModal(modal.id);
                }
            });
        }
    });
    
    // Prevent modal close when clicking inside modal
    document.querySelectorAll('.modal-content').forEach(content => {
        content.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
    
    // Close modal when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this.id);
            }
        });
    });
}

// Search Functionality
function initializeSearch() {
    const searchBox = document.querySelector('.search-box input');
    if (searchBox) {
        searchBox.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const gameCards = document.querySelectorAll('.game-card, .game-card-large');
            
            gameCards.forEach(card => {
                const gameName = card.querySelector('h3, h4')?.textContent.toLowerCase() || '';
                if (gameName.includes(searchTerm)) {
                    card.style.display = 'flex';
                    card.style.animation = 'fadeInUp 0.3s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

// Keyboard Shortcuts
function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl + / to focus search
        if (e.ctrlKey && e.key === '/') {
            e.preventDefault();
            const searchBox = document.querySelector('.search-box input');
            if (searchBox) {
                searchBox.focus();
            }
        }
        
        // Escape to close modals
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal[style*="display: block"]');
            if (activeModal) {
                closeModal(activeModal.id);
            }
        }
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        observer.observe(element);
    });
}

function animateOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .game-card-large, .stat');
    
    elements.forEach((element, index) => {
        element.classList.add('reveal');
        element.style.animationDelay = `${index * 0.1}s`;
    });
}

// Notification System
function initializeNotificationSystem() {
    // Add notification styles
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(100%);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @keyframes slideOutRight {
                from {
                    opacity: 1;
                    transform: translateX(0);
                }
                to {
                    opacity: 0;
                    transform: translateX(100%);
                }
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    
    notification.innerHTML = `
        <i class="${icons[type] || icons.info}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    const notificationColor = getNotificationColor(type);
    const borderColor = getNotificationBorderColor(type);
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${notificationColor};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        animation: slideInRight 0.3s ease, slideOutRight 0.3s ease 4.7s forwards;
        max-width: 400px;
        border-left: 4px solid ${borderColor};
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function getNotificationColor(type) {
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#6366f1'
    };
    return colors[type] || colors.info;
}

function getNotificationBorderColor(type) {
    const colors = {
        success: '#059669',
        error: '#dc2626',
        warning: '#d97706',
        info: '#4f46e5'
    };
    return colors[type] || colors.info;
}

// Topup Process Functions
function initializeGameSelection() {
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            gameCards.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked card with animation
            this.classList.add('active');
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Set selected game
            selectedGame = this.getAttribute('data-game');
            
            // Update display and load nominals
            updateSelectedGameDisplay();
            loadNominals(selectedGame);
        });
    });
}

function loadSavedGame() {
    const savedGame = localStorage.getItem('selectedGame');
    if (savedGame && gameData[savedGame]) {
        selectedGame = savedGame;
        const gameCard = document.querySelector(`[data-game="${savedGame}"]`);
        if (gameCard) {
            gameCard.classList.add('active');
            updateSelectedGameDisplay();
            loadNominals(selectedGame);
        }
    }
}

function updateSelectedGameDisplay() {
    const gameInfo = gameData[selectedGame];
    if (!gameInfo) return;
    
    const gameIcon = document.getElementById('selectedGameIcon');
    const gameName = document.getElementById('selectedGameName');
    
    if (gameIcon) gameIcon.src = gameInfo.icon;
    if (gameName) gameName.textContent = gameInfo.name;
}

function initializeNominalSelection() {
    // This will be called when nominals are loaded
}

function loadNominals(game) {
    const nominalList = document.getElementById('nominalList');
    const gameInfo = gameData[game];
    
    if (!gameInfo || !nominalList) return;
    
    nominalList.innerHTML = '';
    
    gameInfo.nominals.forEach((nominal, index) => {
        const nominalCard = document.createElement('div');
        nominalCard.className = 'nominal-card';
        nominalCard.setAttribute('data-index', index);
        
        let badgeHTML = '';
        if (nominal.popular) {
            badgeHTML = `<div class="nominal-badge">Paling Populer</div>`;
        }
        
        let bonusHTML = '';
        if (nominal.bonus) {
            bonusHTML = `<div class="nominal-bonus">${nominal.bonus}</div>`;
        }
        
        nominalCard.innerHTML = `
            ${badgeHTML}
            <div class="nominal-amount">${nominal.amount}</div>
            <div class="nominal-price">Rp ${nominal.price.toLocaleString('id-ID')}</div>
            ${bonusHTML}
        `;
        
        nominalCard.addEventListener('click', function() {
            // Remove active class from all nominals
            document.querySelectorAll('.nominal-card').forEach(card => {
                card.classList.remove('active');
            });
            
            // Add active class to clicked nominal with animation
            this.classList.add('active');
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Set selected nominal
            selectedNominal = index;
        });
        
        nominalList.appendChild(nominalCard);
    });
}

function initializeFormValidation() {
    const customerForm = document.getElementById('customerForm');
    if (customerForm) {
        customerForm.addEventListener('input', function(e) {
            validateField(e.target);
        });
    }
}

function validateField(field) {
    const value = field.value.trim();
    
    switch(field.type) {
        case 'email':
            if (value && !isValidEmail(value)) {
                field.style.borderColor = '#ef4444';
            } else {
                field.style.borderColor = '#10b981';
            }
            break;
        case 'tel':
            if (value && !isValidPhone(value)) {
                field.style.borderColor = '#ef4444';
            } else {
                field.style.borderColor = '#10b981';
            }
            break;
        default:
            if (value) {
                field.style.borderColor = '#10b981';
            } else {
                field.style.borderColor = '#6b7280';
            }
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[0-9+-\s()]{10,}$/;
    return phoneRegex.test(phone);
}

function initializePaymentMethods() {
    const paymentOptions = document.querySelectorAll('.payment-option input');
    paymentOptions.forEach(option => {
        option.addEventListener('change', function() {
            // Update selected payment method display
            paymentOptions.forEach(opt => {
                const label = opt.nextElementSibling;
                if (opt.checked) {
                    label.style.background = 'rgba(99, 102, 241, 0.2)';
                    label.style.borderColor = '#6366f1';
                } else {
                    label.style.background = 'rgba(255, 255, 255, 0.05)';
                    label.style.borderColor = 'transparent';
                }
            });
        });
    });
}

// Step Navigation Functions
function nextStep(step) {
    // Validation before proceeding
    if (!validateStep(currentStep)) {
        return;
    }
    
    // Save current step data
    saveStepData(currentStep);
    
    // Hide current step with animation
    const currentStepElement = document.getElementById(`step${currentStep}`);
    if (currentStepElement) {
        currentStepElement.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            currentStepElement.classList.remove('active');
        }, 250);
    }
    
    // Show next step with animation
    const nextStepElement = document.getElementById(`step${step}`);
    if (nextStepElement) {
        nextStepElement.classList.add('active');
        nextStepElement.style.animation = 'fadeIn 0.3s ease';
    }
    
    // Update current step
    currentStep = step;
    
    // Update progress steps
    updateProgressSteps();
    
    // If moving to step 4, update summary
    if (step === 4) {
        updateOrderSummary();
    }
}

function prevStep(step) {
    // Hide current step with animation
    const currentStepElement = document.getElementById(`step${currentStep}`);
    if (currentStepElement) {
        currentStepElement.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            currentStepElement.classList.remove('active');
        }, 250);
    }
    
    // Show previous step with animation
    const prevStepElement = document.getElementById(`step${step}`);
    if (prevStepElement) {
        prevStepElement.classList.add('active');
        prevStepElement.style.animation = 'fadeIn 0.3s ease';
    }
    
    // Update current step
    currentStep = step;
    
    // Update progress steps
    updateProgressSteps();
}

function validateStep(step) {
    switch(step) {
        case 1:
            if (!selectedGame) {
                showNotification('Pilih game terlebih dahulu!', 'error');
                return false;
            }
            break;
        case 2:
            if (selectedNominal === null) {
                showNotification('Pilih nominal topup terlebih dahulu!', 'error');
                return false;
            }
            break;
        case 3:
            const form = document.getElementById('customerForm');
            if (!form.checkValidity()) {
                showNotification('Harap lengkapi semua data pembeli!', 'error');
                return false;
            }
            break;
    }
    return true;
}

function saveStepData(step) {
    switch(step) {
        case 3:
            saveFormData();
            break;
    }
}

function saveFormData() {
    const gameInfo = gameData[selectedGame];
    const nominalInfo = gameInfo.nominals[selectedNominal];
    
    orderData = {
        game: selectedGame,
        gameName: gameInfo.name,
        nominal: nominalInfo,
        playerId: document.getElementById('playerId').value,
        playerZone: document.getElementById('playerZone').value,
        playerName: document.getElementById('playerName').value,
        playerEmail: document.getElementById('playerEmail').value,
        playerPhone: document.getElementById('playerPhone').value,
        timestamp: new Date().toISOString()
    };
    
    // Update preview
    updateOrderPreview();
}

function updateOrderPreview() {
    const previewGame = document.getElementById('previewGame');
    const previewNominal = document.getElementById('previewNominal');
    const previewPrice = document.getElementById('previewPrice');
    
    if (previewGame) previewGame.textContent = orderData.gameName;
    if (previewNominal) previewNominal.textContent = orderData.nominal.amount;
    if (previewPrice) previewPrice.textContent = `Rp ${orderData.nominal.price.toLocaleString('id-ID')}`;
}

function updateOrderSummary() {
    const summaryGame = document.getElementById('summaryGame');
    const summaryNominal = document.getElementById('summaryNominal');
    const summaryId = document.getElementById('summaryId');
    const summaryName = document.getElementById('summaryName');
    const summaryPrice = document.getElementById('summaryPrice');
    
    if (summaryGame) summaryGame.textContent = orderData.gameName;
    if (summaryNominal) summaryNominal.textContent = orderData.nominal.amount;
    if (summaryId) summaryId.textContent = orderData.playerId;
    if (summaryName) summaryName.textContent = orderData.playerName;
    if (summaryPrice) summaryPrice.textContent = `Rp ${orderData.nominal.price.toLocaleString('id-ID')}`;
}

function updateProgressSteps() {
    const stepItems = document.querySelectorAll('.step-item');
    
    stepItems.forEach((item, index) => {
        const stepNumber = index + 1;
        
        if (stepNumber === currentStep) {
            item.classList.add('active');
        } else if (stepNumber < currentStep) {
            item.classList.add('completed');
        } else {
            item.classList.remove('active', 'completed');
        }
    });
}

// Payment Processing
function processPayment() {
    if (!userData) {
        showNotification('Silakan login terlebih dahulu', 'error');
        showLogin();
        return;
    }
    
    const paymentMethod = document.querySelector('input[name="payment"]:checked');
    if (!paymentMethod) {
        showNotification('Pilih metode pembayaran terlebih dahulu', 'error');
        return;
    }
    
    // Show loading state
    const payBtn = document.querySelector('.btn-pay');
    const originalText = payBtn.innerHTML;
    payBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memproses...';
    payBtn.disabled = true;
    
    // Simulate payment processing
    setTimeout(() => {
        // Generate order code
        const orderCode = 'TOPUP-' + Math.random().toString(36).substr(2, 9).toUpperCase();
        
        // Update success page
        updateSuccessPage(orderCode);
        
        // Move to success step
        document.getElementById(`step${currentStep}`).classList.remove('active');
        document.getElementById('step5').classList.add('active');
        currentStep = 5;
        
        // Update progress steps
        updateProgressSteps();
        
        // Save order to database
        saveOrderToDatabase(orderCode);
        
        // Reset button
        payBtn.innerHTML = originalText;
        payBtn.disabled = false;
        
        showNotification('Pembayaran berhasil! Diamond akan segera diproses.', 'success');
    }, 3000);
}

function updateSuccessPage(orderCode) {
    const orderCodeElement = document.getElementById('orderCode');
    const successGame = document.getElementById('successGame');
    const successNominal = document.getElementById('successNominal');
    const successId = document.getElementById('successId');
    const successPrice = document.getElementById('successPrice');
    
    if (orderCodeElement) orderCodeElement.textContent = orderCode;
    if (successGame) successGame.textContent = orderData.gameName;
    if (successNominal) successNominal.textContent = orderData.nominal.amount;
    if (successId) successId.textContent = orderData.playerId;
    if (successPrice) successPrice.textContent = `Rp ${orderData.nominal.price.toLocaleString('id-ID')}`;
}

function saveOrderToDatabase(orderCode) {
    // Simulate API call to save order
    const order = {
        orderCode: orderCode,
        ...orderData,
        paymentMethod: document.querySelector('input[name="payment"]:checked').value,
        status: 'processing',
        userId: userData?.id
    };
    
    // Save to localStorage for demo purposes
    const orders = JSON.parse(localStorage.getItem('userOrders') || '[]');
    orders.push(order);
    localStorage.setItem('userOrders', JSON.stringify(orders));
    
    console.log('Order saved:', order);
}

function resetOrder() {
    // Reset state
    currentStep = 1;
    selectedGame = null;
    selectedNominal = null;
    orderData = {};
    
    // Reset UI
    document.querySelectorAll('.step-content').forEach(step => {
        step.classList.remove('active');
    });
    
    document.getElementById('step1').classList.add('active');
    
    // Reset forms
    const customerForm = document.getElementById('customerForm');
    if (customerForm) customerForm.reset();
    
    // Reset selections
    document.querySelectorAll('.game-card, .nominal-card').forEach(card => {
        card.classList.remove('active');
        card.style.transform = 'scale(1)';
    });
    
    // Reset payment methods
    document.querySelectorAll('.payment-option input').forEach(option => {
        option.checked = false;
        const label = option.nextElementSibling;
        label.style.background = 'rgba(255, 255, 255, 0.05)';
        label.style.borderColor = 'transparent';
    });
    
    // Set default payment method
    const firstPayment = document.querySelector('.payment-option input');
    if (firstPayment) {
        firstPayment.checked = true;
        const label = firstPayment.nextElementSibling;
        label.style.background = 'rgba(99, 102, 241, 0.2)';
        label.style.borderColor = '#6366f1';
    }
    
    // Update progress steps
    updateProgressSteps();
    
    showNotification('Pesanan baru telah dimulai', 'info');
}

// Utility Functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
}

function generateOrderId() {
    return 'TOPUP-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5).toUpperCase();
}

// Export functions for global access
window.startTopup = startTopup;
window.goToHome = goToHome;
window.scrollToGames = scrollToGames;
window.selectGame = selectGame;
window.showAllGames = showAllGames;
window.showLogin = showLogin;
window.showRegister = showRegister;
window.closeModal = closeModal;
window.toggleUserMenu = toggleUserMenu;
window.logout = logout;
window.nextStep = nextStep;
window.prevStep = prevStep;
window.processPayment = processPayment;
window.resetOrder = resetOrder;

console.log('GameTopup Script Loaded Successfully!');
