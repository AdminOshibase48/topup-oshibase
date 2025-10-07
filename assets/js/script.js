// Data Game
const games = [
    {
        id: 1,
        name: "Mobile Legends",
        category: "MOBA",
        platform: "mobile",
        image: "https://cdn.unipin.com/images/icon_product_pages/1…9-icon-Mobile%20Legends%20Bang%20Bang_9_11zon.png",
        price: "Rp 10.000 - 500.000",
        popular: true
    },
    {
        id: 2,
        name: "Free Fire",
        category: "Battle Royale",
        platform: "mobile",
        image: "	https://cdn.unipin.com/images/icon_product_pages/1658817763-icon-200x200_icon%20ff.jpg",
        price: "Rp 5.000 - 300.000",
        popular: true
    },
    {
        id: 3,
        name: "Genshin Impact",
        category: "RPG",
        platform: "pc",
        image: "https://cdn.unipin.com/images/icon_product_pages/1757471734-icon-96.png",
        price: "Rp 15.000 - 1.000.000",
        popular: true
    },
    {
        id: 4,
        name: "Valorant",
        category: "FPS",
        platform: "pc",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE1ArX_7Wj-mE-jhIbYx8siyP8yTUkbdxSWQ&s",
        price: "Rp 20.000 - 500.000",
        popular: true
    },
    {
        id: 5,
        name: "PUBG Mobile",
        category: "Battle Royale",
        platform: "mobile",
        image: "https://cdn.unipin.com/images/icon_product_pages/1592228250-icon-pubgm.jpg",
        price: "Rp 10.000 - 200.000"
    },
    {
        id: 6,
        name: "Call of Duty Mobile",
        category: "FPS",
        platform: "mobile",
        image: "https://cdn.unipin.com/images/icon_product_pages/1633599388-icon-Icon_1024.jpg",
        price: "Rp 15.000 - 300.000"
    },
    {
        id: 7,
        name: "Apex Legends",
        category: "Battle Royale",
        platform: "pc",
        image: "https://via.placeholder.com/300x150/6c5ce7/ffffff?text=Apex+Legends",
        price: "Rp 25.000 - 400.000"
    },
    {
        id: 8,
        name: "League of Legends",
        category: "MOBA",
        platform: "pc",
        image: "https://cdn.freebiesupply.com/images/large/2x/apex-legends-logo-png-transparent.png",
        price: "Rp 20.000 - 350.000"
    }
];

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const gamesGrid = document.querySelector('.games-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const faqItems = document.querySelectorAll('.faq-item');
const modal = document.getElementById('paymentModal');
const closeModal = document.querySelector('.close');
const notification = document.getElementById('successNotification');
const cartCount = document.querySelector('.cart-count');

// Toggle Mobile Menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Generate Game Cards
function generateGameCards(filter = 'all') {
    gamesGrid.innerHTML = '';
    
    const filteredGames = filter === 'all' 
        ? games 
        : games.filter(game => game.platform === filter);
    
    filteredGames.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.classList.add('game-card');
        gameCard.innerHTML = `
            <div class="game-image">
                <img src="${game.image}" alt="${game.name}">
            </div>
            <div class="game-info">
                <h3 class="game-title">${game.name}</h3>
                <p class="game-category">
                    <i class="fas fa-${game.platform === 'mobile' ? 'mobile-alt' : 'desktop'}"></i>
                    ${game.category}
                </p>
                <div class="game-price">
                    <span class="price">${game.price}</span>
                    <button class="btn-buy" data-id="${game.id}">Beli</button>
                </div>
            </div>
        `;
        gamesGrid.appendChild(gameCard);
    });
    
    // Add event listeners to buy buttons
    document.querySelectorAll('.btn-buy').forEach(button => {
        button.addEventListener('click', function() {
            const gameId = this.getAttribute('data-id');
            const game = games.find(g => g.id == gameId);
            openPaymentModal(game);
        });
    });
}

// Filter Games
filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        // Filter games
        const filter = this.getAttribute('data-filter');
        generateGameCards(filter);
    });
});

// FAQ Toggle
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        // Close all other FAQ items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        // Toggle current item
        item.classList.toggle('active');
    });
});

// Payment Modal
function openPaymentModal(game) {
    // Update modal content based on selected game
    const summaryItem = modal.querySelector('.summary-item span:first-child');
    summaryItem.textContent = game.name;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Payment Process
const payButton = document.querySelector('.btn-pay');
payButton.addEventListener('click', () => {
    // Simulate payment processing
    modal.classList.remove('active');
    
    // Show success notification after 1 second
    setTimeout(() => {
        notification.classList.add('active');
        
        // Hide notification after 5 seconds
        setTimeout(() => {
            notification.classList.remove('active');
        }, 5000);
    }, 1000);
    
    // Update cart count
    let count = parseInt(cartCount.textContent);
    cartCount.textContent = count + 1;
    
    document.body.style.overflow = 'auto';
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    generateGameCards();
    
    // Add scroll animation
    window.addEventListener('scroll', animateOnScroll);
});

// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.game-card, .step, .access-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Set initial styles for animation
document.querySelectorAll('.game-card, .step, .access-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});
