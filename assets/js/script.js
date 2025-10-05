// Data Games
const gamesData = [
    {
        id: 1,
        name: "Mobile Legends",
        icon: "fas fa-diamond",
        color: "#ff6b6b",
        description: "Diamond MLBB",
        price: "Mulai Rp 5.000"
    },
    {
        id: 2,
        name: "Free Fire",
        icon: "fas fa-fire",
        color: "#4ecdc4",
        description: "Diamond FF",
        price: "Mulai Rp 2.500"
    },
    {
        id: 3,
        name: "PUBG Mobile",
        icon: "fas fa-crosshairs",
        color: "#45b7d1",
        description: "UC PUBG",
        price: "Mulai Rp 5.000"
    },
    {
        id: 4,
        name: "Genshin Impact",
        icon: "fas fa-wind",
        color: "#ffd166",
        description: "Genesis Crystal",
        price: "Mulai Rp 15.000"
    },
    {
        id: 5,
        name: "Valorant",
        icon: "fas fa-bullseye",
        color: "#ff6b6b",
        description: "Valorant Points",
        price: "Mulai Rp 10.000"
    },
    {
        id: 6,
        name: "Call of Duty",
        icon: "fas fa-gamepad",
        color: "#4ecdc4",
        description: "CP Points",
        price: "Mulai Rp 8.000"
    }
];

// DOM Elements
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const gamesGrid = document.getElementById('gamesGrid');
const notificationContainer = document.getElementById('notificationContainer');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadGames();
    setupEventListeners();
    setupSmoothScroll();
});

// Setup Event Listeners
function setupEventListeners() {
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu when clicking on links
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Form submissions
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    // Modal background close
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });

    // Escape key to close modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
}

// Mobile Menu Functions
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
}

function closeMobileMenu() {
    navMenu.classList.remove('active');
}

// Modal Functions
function showLoginModal() {
    closeAllModals();
    const modal = document.getElementById('loginModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function showRegisterModal() {
    closeAllModals();
    const modal = document.getElementById('registerModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.classList.remove('active');
    });
    document.body.style.overflow = 'auto';
}

// Game Functions
function loadGames() {
    if (!gamesGrid) return;

    gamesGrid.innerHTML = gamesData.map(game => `
        <div class="game-card" onclick="selectGame(${game.id})">
            <div class="game-icon" style="background-color: ${game.color}">
                <i class="${game.icon}"></i>
            </div>
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <span class="game-price">${game.price}</span>
        </div>
    `).join('');
}

function selectGame(gameId) {
    const game = gamesData.find(g => g.id === gameId);
    showNotification(`Memilih game: ${game.name}`, 'success');
    // Here you would typically redirect to the top-up page or show a top-up modal
}

function showAllGames() {
    showNotification('Menampilkan semua game...', 'info');
    // Implement show all games functionality
}

// Navigation Functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        closeMobileMenu();
    }
}

function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                closeMobileMenu();
            }
        });
    });
}

// Form Handlers
function handleLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    // Simulate login process
    if (email && password) {
        showNotification('Login berhasil!', 'success');
        closeModal('loginModal');
        // Here you would typically make an API call
    } else {
        showNotification('Harap isi semua field!', 'error');
    }
}

function handleRegister(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const password = formData.get('password');
    const confirm = formData.get('confirm');

    // Simple validation
    if (password !== confirm) {
        showNotification('Password tidak cocok!', 'error');
        return;
    }

    showNotification('Pendaftaran berhasil!', 'success');
    closeModal('registerModal');
    // Here you would typically make an API call
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <p>${message}</p>
        </div>
    `;

    notificationContainer.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Top-up Functions
function startTopup() {
    showNotification('Memulai proses top-up...', 'info');
    // Implement top-up flow
}

// Active link highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav__link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active-link');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active-link');
        }
    });
});
