// Game Data
const gameData = {
    mlbb: {
        name: "Mobile Legends",
        currency: "Diamond",
        icon: "fas fa-diamond",
        color: "#FF6B6B",
        nominals: [
            { amount: "86 Diamond", price: 20000, bonus: "" },
            { amount: "172 Diamond", price: 40000, bonus: "+14 Diamond" },
            { amount: "257 Diamond", price: 60000, bonus: "+21 Diamond" },
            { amount: "344 Diamond", price: 80000, bonus: "+28 Diamond" },
            { amount: "429 Diamond", price: 100000, bonus: "+35 Diamond" },
            { amount: "514 Diamond", price: 120000, bonus: "+42 Diamond" }
        ]
    },
    freefire: {
        name: "Free Fire",
        currency: "Diamond",
        icon: "fas fa-fire",
        color: "#4ECDC4",
        nominals: [
            { amount: "70 Diamond", price: 10000, bonus: "" },
            { amount: "140 Diamond", price: 20000, bonus: "+10 Diamond" },
            { amount: "210 Diamond", price: 30000, bonus: "+15 Diamond" },
            { amount: "355 Diamond", price: 50000, bonus: "+25 Diamond" },
            { amount: "720 Diamond", price: 100000, bonus: "+50 Diamond" },
            { amount: "1450 Diamond", price: 200000, bonus: "+100 Diamond" }
        ]
    },
    pubg: {
        name: "PUBG Mobile",
        currency: "UC",
        icon: "fas fa-crosshairs",
        color: "#45B7D1",
        nominals: [
            { amount: "60 UC", price: 15000, bonus: "" },
            { amount: "325 UC", price: 80000, bonus: "+25 UC" },
            { amount: "660 UC", price: 160000, bonus: "+60 UC" },
            { amount: "1800 UC", price: 400000, bonus: "+200 UC" },
            { amount: "3850 UC", price: 800000, bonus: "+450 UC" },
            { amount: "8100 UC", price: 1600000, bonus: "+1000 UC" }
        ]
    },
    genshin: {
        name: "Genshin Impact",
        currency: "Crystal",
        icon: "fas fa-gem",
        color: "#96CEB4",
        nominals: [
            { amount: "60 Crystal", price: 15000, bonus: "" },
            { amount: "330 Crystal", price: 80000, bonus: "+30 Crystal" },
            { amount: "1090 Crystal", price: 240000, bonus: "+110 Crystal" },
            { amount: "2240 Crystal", price: 480000, bonus: "+240 Crystal" },
            { amount: "3880 Crystal", price: 800000, bonus: "+520 Crystal" }
        ]
    },
    valorant: {
        name: "Valorant",
        currency: "Points",
        icon: "fas fa-bullseye",
        color: "#F7A8B8",
        nominals: [
            { amount: "125 Points", price: 15000, bonus: "" },
            { amount: "420 Points", price: 50000, bonus: "" },
            { amount: "700 Points", price: 80000, bonus: "" },
            { amount: "1375 Points", price: 150000, bonus: "" },
            { amount: "2400 Points", price: 250000, bonus: "" }
        ]
    },
    codm: {
        name: "Call of Duty Mobile",
        currency: "CP",
        icon: "fas fa-target",
        color: "#FFE66D",
        nominals: [
            { amount: "80 CP", price: 12000, bonus: "" },
            { amount: "420 CP", price: 60000, bonus: "" },
            { amount: "700 CP", price: 100000, bonus: "" },
            { amount: "1375 CP", price: 180000, bonus: "" },
            { amount: "2400 CP", price: 300000, bonus: "" }
        ]
    }
};

// Global State
let currentUser = null;
let selectedGame = null;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize Application
function initializeApp() {
    loadUserData();
    initializeNavigation();
    initializeGamesGrid();
    initializeAuthForms();
    initializeModals();
    initializeScrollAnimations();
    
    console.log('GameTopup initialized successfully!');
}

// User Management
function loadUserData() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUserInterface();
    }
}

function saveUserData() {
    if (currentUser) {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
}

function updateUserInterface() {
    const loginBtn = document.querySelector('.btn--login');
    const registerBtn = document.querySelector('.btn--primary');
    const navButtons = document.querySelector('.nav__buttons');
    
    if (currentUser) {
        // User is logged in
        if (navButtons) {
            navButtons.innerHTML = `
                <div class="user-menu">
                    <button class="btn btn--outline" onclick="showUserMenu()">
                        <i class="fas fa-user"></i>
                        ${currentUser.name}
                    </button>
                    <div class="user-dropdown" id="userDropdown">
                        <a href="#"><i class="fas fa-history"></i> Riwayat</a>
                        <a href="#"><i class="fas fa-wallet"></i> Saldo: Rp ${currentUser.balance?.toLocaleString() || '0'}</a>
                        <a href="#"><i class="fas fa-cog"></i> Pengaturan</a>
                        <div class="dropdown-divider"></div>
                        <a href="#" onclick="logout()" class="logout"><i class="fas fa-sign-out-alt"></i> Logout</a>
                    </div>
                </div>
            `;
        }
    }
}

// Navigation
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
    }
    
    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                navToggle.querySelector('i').classList.add('fa-bars');
                navToggle.querySelector('i').classList.remove('fa-times');
            }
        });
    });
}

// Games Grid
function initializeGamesGrid() {
    const gamesGrid = document.querySelector('.games__grid');
    if (!gamesGrid) return;
    
    const popularGames = ['mlbb', 'freefire', 'pubg', 'genshin', 'valorant', 'codm'];
    
    gamesGrid.innerHTML = popularGames.map(gameId => {
        const game = gameData[gameId];
        const lowestPrice = game.nominals[0].price.toLocaleString();
        
        return `
            <div class="game__card" onclick="selectGame('${gameId}')">
                ${gameId === 'mlbb' ? '<div class="game__badge"><i class="fas fa-fire"></i> Paling Laris</div>' : ''}
                <div class="game__header">
                    <div class="game__icon" style="background: ${game.color}">
                        <i class="${game.icon}"></i>
                    </div>
                    <div class="game__info">
                        <h3>${game.name}</h3>
                        <p>${game.currency}</p>
                    </div>
                </div>
                <div class="game__features">
                    <span class="game__feature"><i class="fas fa-bolt"></i> Instant</span>
                    <span class="game__feature"><i class="fas fa-gift"></i> Bonus</span>
                </div>
                <div class="game__price">Mulai Rp ${lowestPrice}</div>
            </div>
        `;
    }).join('');
}

// Game Selection
function selectGame(gameId) {
    if (!currentUser) {
        showNotification('Silakan login terlebih dahulu untuk top up', 'warning');
        showLoginModal();
        return;
    }
    
    selectedGame = gameId;
    localStorage.setItem('selectedGame', gameId);
    
    // Add selection animation
    const gameCard = document.querySelector(`[onclick="selectGame('${gameId}')"]`);
    if (gameCard) {
        gameCard.style.transform = 'scale(0.95)';
        setTimeout(() => {
            gameCard.style.transform = 'scale(1)';
        }, 150);
    }
    
    // Redirect to topup page (you can create topup.html)
    showNotification(`Memulai top up ${gameData[gameId].name}`, 'success');
    setTimeout(() => {
        // window.location.href = 'topup.html';
        showNotification('Halaman top up sedang dikembangkan', 'info');
    }, 1000);
}

// Authentication
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

function handleLogin(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    
    showLoading(true);
    
    // Simulate API call
    setTimeout(() => {
        if (email && password) {
            currentUser = {
                id: 1,
                name: 'Player Gaming',
                email: email,
                balance: 150000,
                joinDate: new Date().toISOString()
            };
            
            saveUserData();
            updateUserInterface();
            closeModal('loginModal');
            showNotification('Login berhasil! Selamat datang kembali!', 'success');
        } else {
            showNotification('Email dan password harus diisi', 'error');
        }
        
        showLoading(false);
    }, 1500);
}

function handleRegister(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const username = formData.get('username');
    const password = formData.get('password');
    const confirm = formData.get('confirm');
    
    showLoading(true);
    
    // Simulate API call
    setTimeout(() => {
        if (name && email && username && password && confirm) {
            if (password !== confirm) {
                showNotification('Password dan konfirmasi password tidak cocok', 'error');
                showLoading(false);
                return;
            }
            
            currentUser = {
                id: Date.now(),
                name: name,
                email: email,
                username: username,
                balance: 0,
                joinDate: new Date().toISOString()
            };
            
            saveUserData();
            updateUserInterface();
            closeModal('registerModal');
            showNotification('Registrasi berhasil! Selamat bergabung!', 'success');
        } else {
            showNotification('Harap isi semua field dengan benar', 'error');
        }
        
        showLoading(false);
    }, 2000);
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateUserInterface();
    showNotification('Logout berhasil', 'success');
}

// Modals
function initializeModals() {
    // Close modals with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
    
    // Close modals when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this.id);
            }
        });
    });
}

function showLoginModal() {
    showModal('loginModal');
}

function showRegisterModal() {
    showModal('registerModal');
}

function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
    document.body.style.overflow = 'auto';
}

// User Menu
function showUserMenu() {
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
}

// Close user dropdown when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.user-menu')) {
        const dropdown = document.getElementById('userDropdown');
        if (dropdown) {
            dropdown.classList.remove('show');
        }
    }
});

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.game__card, .feature__card').forEach(el => {
        observer.observe(el);
    });
}

// Scroll to Section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Start Topup
function startTopup() {
    if (!currentUser) {
        showNotification('Silakan login terlebih dahulu', 'warning');
        showLoginModal();
        return;
    }
    
    // Redirect to games section
    scrollToSection('games');
    showNotification('Pilih game yang ingin di-top up', 'info');
}

// Show All Games
function showAllGames() {
    showNotification('Fitur daftar semua game sedang dikembangkan!', 'info');
}

// Loading
function showLoading(show) {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.style.display = show ? 'flex' : 'none';
    }
}

// Notifications
function showNotification(message, type = 'info') {
    const container = document.getElementById('notificationContainer');
    if (!container) return;
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    
    notification.innerHTML = `
        <div class="notification__icon">
            <i class="${icons[type] || icons.info}"></i>
        </div>
        <div class="notification__content">
            <div class="notification__message">${message}</div>
        </div>
        <button class="notification__close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    container.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Utility Functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
}

// Export functions to global scope
window.showLoginModal = showLoginModal;
window.showRegisterModal = showRegisterModal;
window.closeModal = closeModal;
window.scrollToSection = scrollToSection;
window.startTopup = startTopup;
window.selectGame = selectGame;
window.showAllGames = showAllGames;
window.showUserMenu = showUserMenu;
window.logout = logout;
