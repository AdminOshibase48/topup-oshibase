// Data Game
const games = [
    {
        id: 1,
        name: "Mobile Legends",
        category: "MOBA",
        image: "https://via.placeholder.com/300x150/6c5ce7/ffffff?text=Mobile+Legends",
        price: "Rp 10.000"
    },
    {
        id: 2,
        name: "Free Fire",
        category: "Battle Royale",
        image: "https://via.placeholder.com/300x150/e84393/ffffff?text=Free+Fire",
        price: "Rp 15.000"
    },
    {
        id: 3,
        name: "Genshin Impact",
        category: "RPG",
        image: "https://via.placeholder.com/300x150/00b894/ffffff?text=Genshin+Impact",
        price: "Rp 25.000"
    },
    {
        id: 4,
        name: "Valorant",
        category: "FPS",
        image: "https://via.placeholder.com/300x150/0984e3/ffffff?text=Valorant",
        price: "Rp 20.000"
    },
    {
        id: 5,
        name: "PUBG Mobile",
        category: "Battle Royale",
        image: "https://via.placeholder.com/300x150/fdcb6e/ffffff?text=PUBG+Mobile",
        price: "Rp 18.000"
    },
    {
        id: 6,
        name: "Call of Duty Mobile",
        category: "FPS",
        image: "https://via.placeholder.com/300x150/e17055/ffffff?text=COD+Mobile",
        price: "Rp 22.000"
    },
    {
        id: 7,
        name: "Apex Legends",
        category: "Battle Royale",
        image: "https://via.placeholder.com/300x150/6c5ce7/ffffff?text=Apex+Legends",
        price: "Rp 30.000"
    },
    {
        id: 8,
        name: "League of Legends",
        category: "MOBA",
        image: "https://via.placeholder.com/300x150/a29bfe/ffffff?text=League+of+Legends",
        price: "Rp 35.000"
    }
];

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const gamesGrid = document.querySelector('.games-grid');
const loading = document.querySelector('.loading');

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
function generateGameCards() {
    gamesGrid.innerHTML = '';
    
    games.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.classList.add('game-card');
        gameCard.innerHTML = `
            <div class="game-image">
                <img src="${game.image}" alt="${game.name}">
            </div>
            <div class="game-info">
                <h3 class="game-title">${game.name}</h3>
                <p class="game-category">${game.category}</p>
                <div class="game-price">
                    <span class="price">${game.price}</span>
                    <button class="btn-buy" data-id="${game.id}">Beli</button>
                </div>
            </div>
        `;
        gamesGrid.appendChild(gameCard);
        
        // Add animation delay for staggered effect
        gameCard.style.animationDelay = `${game.id * 0.1}s`;
    });
    
    // Add event listeners to buy buttons
    document.querySelectorAll('.btn-buy').forEach(button => {
        button.addEventListener('click', function() {
            const gameId = this.getAttribute('data-id');
            const game = games.find(g => g.id == gameId);
            showLoading();
            
            // Simulate purchase process
            setTimeout(() => {
                hideLoading();
                alert(`Terima kasih! Anda telah membeli ${game.name} seharga ${game.price}`);
            }, 2000);
        });
    });
}

// Show Loading Animation
function showLoading() {
    loading.classList.add('active');
}

// Hide Loading Animation
function hideLoading() {
    loading.classList.remove('active');
}

// Search Functionality
const searchInput = document.querySelector('.search-box input');
searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const filteredGames = games.filter(game => 
        game.name.toLowerCase().includes(searchTerm) || 
        game.category.toLowerCase().includes(searchTerm)
    );
    
    if (filteredGames.length === 0) {
        gamesGrid.innerHTML = '<p class="no-results">Tidak ada game yang ditemukan</p>';
    } else {
        renderFilteredGames(filteredGames);
    }
});

// Render Filtered Games
function renderFilteredGames(filteredGames) {
    gamesGrid.innerHTML = '';
    
    filteredGames.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.classList.add('game-card');
        gameCard.innerHTML = `
            <div class="game-image">
                <img src="${game.image}" alt="${game.name}">
            </div>
            <div class="game-info">
                <h3 class="game-title">${game.name}</h3>
                <p class="game-category">${game.category}</p>
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
            showLoading();
            
            // Simulate purchase process
            setTimeout(() => {
                hideLoading();
                alert(`Terima kasih! Anda telah membeli ${game.name} seharga ${game.price}`);
            }, 2000);
        });
    });
}

// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.game-card, .step, .promo-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animated');
        }
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    generateGameCards();
    
    // Show loading for 1.5 seconds on page load
    showLoading();
    setTimeout(() => {
        hideLoading();
    }, 1500);
    
    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
    
    // Initial animation check
    animateOnScroll();
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
});
