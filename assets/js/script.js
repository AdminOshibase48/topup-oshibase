// Data game dan nominal (extended version)
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

// State aplikasi
let currentStep = 1;
let selectedGame = null;
let selectedNominal = null;
let orderData = {};

// Inisialisasi
document.addEventListener('DOMContentLoaded', function() {
    initializeGameSelection();
    updateProgressSteps();
});

// Inisialisasi pilihan game
function initializeGameSelection() {
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(card => {
        card.addEventListener('click', function() {
            // Hapus active class dari semua card
            gameCards.forEach(c => c.classList.remove('active'));
            
            // Tambah active class ke card yang diklik
            this.classList.add('active');
            
            // Simpan game yang dipilih
            selectedGame = this.getAttribute('data-game');
            
            // Update tampilan game yang dipilih
            updateSelectedGameDisplay();
            
            // Load nominal untuk game yang dipilih
            loadNominals(selectedGame);
        });
    });
}

// Update tampilan game yang dipilih
function updateSelectedGameDisplay() {
    const gameInfo = gameData[selectedGame];
    if (!gameInfo) return;
    
    const gameIcon = document.getElementById('selectedGameIcon');
    const gameName = document.getElementById('selectedGameName');
    
    gameIcon.src = gameInfo.icon;
    gameName.textContent = gameInfo.name;
}

// Load nominal berdasarkan game
function loadNominals(game) {
    const nominalList = document.getElementById('nominalList');
    const gameInfo = gameData[game];
    
    if (!gameInfo) return;
    
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
            // Hapus active class dari semua nominal
            document.querySelectorAll('.nominal-card').forEach(card => {
                card.classList.remove('active');
            });
            
            // Tambah active class ke nominal yang dipilih
            this.classList.add('active');
            
            // Simpan nominal yang dipilih
            selectedNominal = index;
        });
        
        nominalList.appendChild(nominalCard);
    });
}

// Update progress steps
function updateProgressSteps() {
    const stepItems = document.querySelectorAll('.step-item');
    
    stepItems.forEach((item, index) => {
        if (index + 1 === currentStep) {
            item.classList.add('active');
        } else if (index + 1 < currentStep) {
            item.classList.add('completed');
        } else {
            item.classList.remove('active', 'completed');
        }
    });
}

// Navigasi step berikutnya
function nextStep(step) {
    // Validasi sebelum pindah step
    if (step === 2 && !selectedGame) {
        showNotification('Pilih game terlebih dahulu!', 'error');
        return;
    }
    
    if (step === 3 && selectedNominal === null) {
        showNotification('Pilih nominal topup terlebih dahulu!', 'error');
        return;
    }
    
    if (step === 4) {
        // Validasi form
        const form = document.getElementById('customerForm');
        if (!form.checkValidity()) {
            showNotification('Harap lengkapi semua data pembeli!', 'error');
            return;
        }
        
        // Simpan data form
        saveFormData();
        
        // Update preview dan summary
        updateOrderPreview();
        updateOrderSummary();
    }
    
    // Sembunyikan step saat ini
    document.getElementById(`step${currentStep}`).classList.remove('active');
    
    // Tampilkan step berikutnya
    document.getElementById(`step${step}`).classList.add('active');
    
    // Update current step
    currentStep = step;
    
    // Update progress steps
    updateProgressSteps();
}

// Kembali ke step sebelumnya
function prevStep(step) {
    // Sembunyikan step saat ini
    document.getElementById(`step${currentStep}`).classList.remove('active');
    
    // Tampilkan step sebelumnya
    document.getElementById(`step${step}`).classList.add('active');
    
    // Update current step
    currentStep = step;
    
    // Update progress steps
    updateProgressSteps();
}

// Simpan data form
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
        playerPhone: document.getElementById('playerPhone').value
    };
}

// Update preview pesanan
function updateOrderPreview() {
    document.getElementById('previewGame').textContent = orderData.gameName;
    document.getElementById('previewNominal').textContent = orderData.nominal.amount;
    document.getElementById('previewPrice').textContent = `Rp ${orderData.nominal.price.toLocaleString('id-ID')}`;
}

// Update ringkasan pesanan
function updateOrderSummary() {
    document.getElementById('summaryGame').textContent = orderData.gameName;
    document.getElementById('summaryNominal').textContent = orderData.nominal.amount;
    document.getElementById('summaryId').textContent = orderData.playerId;
    document.getElementById('summaryName').textContent = orderData.playerName;
    document.getElementById('summaryPrice').textContent = `Rp ${orderData.nominal.price.toLocaleString('id-ID')}`;
}

// Proses pembayaran
function processPayment() {
    // Simulasi proses pembayaran
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    
    // Tampilkan loading
    showNotification('Memproses pembayaran...', 'info');
    
    // Simulasi delay pembayaran
    setTimeout(() => {
        // Generate kode pesanan acak
        const orderCode = 'TOPUP-' + Math.random().toString(36).substr(2, 9).toUpperCase();
        
        // Update success page
        document.getElementById('orderCode').textContent = orderCode;
        document.getElementById('successGame').textContent = orderData.gameName;
        document.getElementById('successNominal').textContent = orderData.nominal.amount;
        document.getElementById('successId').textContent = orderData.playerId;
        document.getElementById('successPrice').textContent = `Rp ${orderData.nominal.price.toLocaleString('id-ID')}`;
        
        // Pindah ke step 5 (success)
        document.getElementById(`step${currentStep}`).classList.remove('active');
        document.getElementById('step5').classList.add('active');
        currentStep = 5;
        
        // Update progress steps
        updateProgressSteps();
        
        // Simpan ke database (akan dipanggil via AJAX)
        saveOrderToDatabase(orderCode);
    }, 2000);
}

// Simpan pesanan ke database
function saveOrderToDatabase(orderCode) {
    // Di sini akan ada AJAX call ke backend PHP
    const formData = new FormData();
    formData.append('order_code', orderCode);
    formData.append('game', orderData.game);
    formData.append('game_name', orderData.gameName);
    formData.append('nominal', orderData.nominal.amount);
    formData.append('price', orderData.nominal.price);
    formData.append('player_id', orderData.playerId);
    formData.append('player_zone', orderData.playerZone);
    formData.append('player_name', orderData.playerName);
    formData.append('player_email', orderData.playerEmail);
    formData.append('player_phone', orderData.playerPhone);
    formData.append('payment_method', document.querySelector('input[name="payment"]:checked').value);
    
    // Contoh AJAX call (uncomment untuk digunakan)
    /*
    fetch('process.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (!data.success) {
            console.error('Error saving order:', data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
    */
}

// Reset pesanan untuk memulai lagi
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
    
    // Reset form
    document.getElementById('customerForm').reset();
    
    // Reset pilihan
    document.querySelectorAll('.game-card, .nominal-card').forEach(card => {
        card.classList.remove('active');
    });
    
    // Update progress steps
    updateProgressSteps();
}

// Show notification
function showNotification(message, type = 'info') {
    // Buat element notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    // Style notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'error' ? '#ef4444' : type === 'success' ? '#10b981' : '#6366f1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove setelah 5 detik
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Search functionality
document.querySelector('.search-box input').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(card => {
        const gameName = card.querySelector('h4').textContent.toLowerCase();
        if (gameName.includes(searchTerm)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
});
