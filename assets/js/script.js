// Data Game dengan gambar dari Unipin
const games = [
    {
        id: 1,
        name: "Mobile Legends",
        category: "MOBA",
        platform: "mobile",
        image: "https://cdn.unipin.com/images/icon_product_pages/1658817763-icon-200x200_icon%20ff.jpg",
        price: "Rp 10.000 - 500.000",
        popular: true
    },
    {
        id: 2,
        name: "Free Fire",
        category: "Battle Royale",
        platform: "mobile",
        image: "https://cdn.unipin.com/images/icon_product_pages/1658817763-icon-200x200_icon%20ff.jpg",
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
        image: "https://cdn.unipin.com/images/icon_product_pages/1757471734-icon-96.png",
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
        image: "https://cdn.unipin.com/images/icon_product_pages/1757471734-icon-96.png",
        price: "Rp 25.000 - 400.000"
    },
    {
        id: 8,
        name: "League of Legends",
        category: "MOBA",
        platform: "pc",
        image: "https://cdn.unipin.com/images/icon_product_pages/1757471734-icon-96.png",
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
const gameNameElement = document.getElementById('gameName');
const paymentOptions = document.querySelectorAll('.payment-option');

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
    
    if (filteredGames.length === 0) {
        gamesGrid.innerHTML = `
            <div class="no-games">
                <i class="fas fa-gamepad"></i>
                <h3>Tidak ada game yang ditemukan</h3>
                <p>Coba filter lain atau gunakan pencarian</p>
            </div>
        `;
        return;
    }
    
    filteredGames.forEach((game, index) => {
        const gameCard = document.createElement('div');
        gameCard.classList.add('game-card');
        gameCard.style.animationDelay = `${index * 0.1}s`;
        gameCard.innerHTML = `
            <div class="game-image">
                <img src="${game.image}" alt="${game.name}" onerror="this.src='https://via.placeholder.com/300x150/6c5ce7/ffffff?text=Game+Image'">
                ${game.popular ? '<div class="popular-badge">Populer</div>' : ''}
            </div>
            <div class="game-info">
                <h3 class="game-title">${game.name}</h3>
                <p class="game-category">
                    <i class="fas fa-${game.platform === 'mobile' ? 'mobile-alt' : 'desktop'}"></i>
                    ${game.category}
                </p>
                <div class="game-price">
                    <span class="price">${game.price}</span>
                    <button class="btn-buy" data-id="${game.id}">
                        <i class="fas fa-shopping-cart"></i> Beli
                    </button>
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

// Payment Options Selection
paymentOptions.forEach(option => {
    const radio = option.querySelector('input[type="radio"]');
    const label = option.querySelector('label');
    
    label.addEventListener('click', () => {
        // Remove selected class from all options
        paymentOptions.forEach(opt => opt.classList.remove('selected'));
        // Add selected class to clicked option
        option.classList.add('selected');
        // Check the radio button
        radio.checked = true;
    });
});

// Payment Modal
function openPaymentModal(game) {
    // Update modal content based on selected game
    gameNameElement.textContent = game.name;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Reset payment options
    paymentOptions.forEach(opt => opt.classList.remove('selected'));
    paymentOptions[0].classList.add('selected');
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
    // Get selected payment method
    const selectedPayment = document.querySelector('input[name="payment"]:checked');
    if (!selectedPayment) {
        alert('Pilih metode pembayaran terlebih dahulu!');
        return;
    }
    
    // Simulate payment processing
    modal.classList.remove('active');
    
    // Show loading state
    payButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memproses...';
    payButton.disabled = true;
    
    // Show success notification after 2 seconds
    setTimeout(() => {
        notification.classList.add('active');
        
        // Reset pay button
        payButton.innerHTML = 'Bayar Sekarang';
        payButton.disabled = false;
        
        // Hide notification after 5 seconds
        setTimeout(() => {
            notification.classList.remove('active');
        }, 5000);
    }, 2000);
    
    // Update cart count
    let count = parseInt(cartCount.textContent);
    cartCount.textContent = count + 1;
    
    // Add animation to cart
    cartCount.style.transform = 'scale(1.3)';
    setTimeout(() => {
        cartCount.style.transform = 'scale(1)';
    }, 300);
    
    document.body.style.overflow = 'auto';
});

// Search Functionality
function initSearch() {
    const searchInput = document.createElement('div');
    searchInput.innerHTML = `
        <div class="search-container">
            <input type="text" id="gameSearch" placeholder="Cari game...">
            <button id="searchBtn"><i class="fas fa-search"></i></button>
        </div>
    `;
    
    const filterContainer = document.querySelector('.games-filter');
    filterContainer.parentNode.insertBefore(searchInput, filterContainer.nextSibling);
    
    const searchField = document.getElementById('gameSearch');
    const searchButton = document.getElementById('searchBtn');
    
    function performSearch() {
        const searchTerm = searchField.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
            generateGameCards(activeFilter);
            return;
        }
        
        const filteredGames = games.filter(game => 
            game.name.toLowerCase().includes(searchTerm) || 
            game.category.toLowerCase().includes(searchTerm)
        );
        
        gamesGrid.innerHTML = '';
        
        if (filteredGames.length === 0) {
            gamesGrid.innerHTML = `
                <div class="no-games">
                    <i class="fas fa-search"></i>
                    <h3>Game tidak ditemukan</h3>
                    <p>Tidak ada game yang cocok dengan pencarian "${searchTerm}"</p>
                </div>
            `;
        } else {
            filteredGames.forEach((game, index) => {
                const gameCard = document.createElement('div');
                gameCard.classList.add('game-card');
                gameCard.style.animationDelay = `${index * 0.1}s`;
                gameCard.innerHTML = `
                    <div class="game-image">
                        <img src="${game.image}" alt="${game.name}" onerror="this.src='https://via.placeholder.com/300x150/6c5ce7/ffffff?text=Game+Image'">
                        ${game.popular ? '<div class="popular-badge">Populer</div>' : ''}
                    </div>
                    <div class="game-info">
                        <h3 class="game-title">${game.name}</h3>
                        <p class="game-category">
                            <i class="fas fa-${game.platform === 'mobile' ? 'mobile-alt' : 'desktop'}"></i>
                            ${game.category}
                        </p>
                        <div class="game-price">
                            <span class="price">${game.price}</span>
                            <button class="btn-buy" data-id="${game.id}">
                                <i class="fas fa-shopping-cart"></i> Beli
                            </button>
                        </div>
                    </div>
                `;
                gamesGrid.appendChild(gameCard);
            });
            
            // Reattach event listeners to buy buttons
            document.querySelectorAll('.btn-buy').forEach(button => {
                button.addEventListener('click', function() {
                    const gameId = this.getAttribute('data-id');
                    const game = games.find(g => g.id == gameId);
                    openPaymentModal(game);
                });
            });
        }
    }
    
    searchButton.addEventListener('click', performSearch);
    searchField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

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

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    generateGameCards();
    initSearch();
    
    // Add scroll animation
    window.addEventListener('scroll', animateOnScroll);
    
    // Initial animation check
    animateOnScroll();
});

// Set initial styles for animation
document.querySelectorAll('.game-card, .step, .access-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// Add CSS for additional elements
const additionalStyles = `
    .search-container {
        display: flex;
        max-width: 400px;
        margin: 0 auto 2rem;
        background: white;
        border-radius: 25px;
        overflow: hidden;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
    
    #gameSearch {
        flex: 1;
        padding: 0.8rem 1.5rem;
        border: none;
        outline: none;
        font-size: 1rem;
    }
    
    #searchBtn {
        background: var(--primary);
        color: white;
        border: none;
        padding: 0 1.5rem;
        cursor: pointer;
        transition: var(--transition);
    }
    
    #searchBtn:hover {
        background: var(--primary-dark);
    }
    
    .no-games {
        text-align: center;
        padding: 3rem;
        grid-column: 1 / -1;
    }
    
    .no-games i {
        font-size: 3rem;
        color: var(--gray);
        margin-bottom: 1rem;
    }
    
    .no-games h3 {
        color: var(--dark);
        margin-bottom: 0.5rem;
    }
    
    .no-games p {
        color: var(--gray);
    }
    
    .popular-badge {
        position: absolute;
        top: 10px;
        right: 10px;
        background: var(--accent);
        color: white;
        padding: 0.3rem 0.8rem;
        border-radius: 15px;
        font-size: 0.8rem;
        font-weight: 600;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
