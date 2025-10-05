// Data game dan nominal
const gameData = {
    mlbb: {
        name: "Mobile Legends",
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
        nominals: [
            { amount: "60 Crystal", price: 15000, bonus: "" },
            { amount: "330 Crystal", price: 80000, bonus: "+30 Crystal" },
            { amount: "1090 Crystal", price: 240000, bonus: "+110 Crystal" },
            { amount: "2240 Crystal", price: 480000, bonus: "+240 Crystal" },
            { amount: "3880 Crystal", price: 800000, bonus: "+520 Crystal" }
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
});

// Inisialisasi pilihan game
function initializeGameSelection() {
    const gameItems = document.querySelectorAll('.game-item');
    
    gameItems.forEach(item => {
        item.addEventListener('click', function() {
            // Hapus active class dari semua item
            gameItems.forEach(i => i.classList.remove('active'));
            
            // Tambah active class ke item yang diklik
            this.classList.add('active');
            
            // Simpan game yang dipilih
            selectedGame = this.getAttribute('data-game');
            
            // Load nominal untuk game yang dipilih
            loadNominals(selectedGame);
        });
    });
}

// Load nominal berdasarkan game
function loadNominals(game) {
    const nominalList = document.getElementById('nominalList');
    const gameInfo = gameData[game];
    
    if (!gameInfo) return;
    
    nominalList.innerHTML = '';
    
    gameInfo.nominals.forEach((nominal, index) => {
        const nominalItem = document.createElement('div');
        nominalItem.className = 'nominal-item';
        nominalItem.setAttribute('data-index', index);
        
        nominalItem.innerHTML = `
            <div class="nominal-amount">${nominal.amount}</div>
            <div class="nominal-price">Rp ${nominal.price.toLocaleString('id-ID')}</div>
            ${nominal.bonus ? `<div class="nominal-bonus">${nominal.bonus}</div>` : ''}
        `;
        
        nominalItem.addEventListener('click', function() {
            // Hapus active class dari semua nominal
            document.querySelectorAll('.nominal-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Tambah active class ke nominal yang dipilih
            this.classList.add('active');
            
            // Simpan nominal yang dipilih
            selectedNominal = index;
        });
        
        nominalList.appendChild(nominalItem);
    });
}

// Navigasi step berikutnya
function nextStep(step) {
    // Validasi sebelum pindah step
    if (step === 2 && !selectedGame) {
        alert('Pilih game terlebih dahulu!');
        return;
    }
    
    if (step === 3 && selectedNominal === null) {
        alert('Pilih nominal topup terlebih dahulu!');
        return;
    }
    
    if (step === 4) {
        // Validasi form
        const form = document.getElementById('customerForm');
        if (!form.checkValidity()) {
            alert('Harap lengkapi semua data pembeli!');
            return;
        }
        
        // Simpan data form
        saveFormData();
        
        // Update summary
        updateOrderSummary();
    }
    
    // Sembunyikan step saat ini
    document.getElementById(`step${currentStep}`).classList.remove('active');
    
    // Tampilkan step berikutnya
    document.getElementById(`step${step}`).classList.add('active');
    
    // Update current step
    currentStep = step;
}

// Kembali ke step sebelumnya
function prevStep(step) {
    // Sembunyikan step saat ini
    document.getElementById(`step${currentStep}`).classList.remove('active');
    
    // Tampilkan step sebelumnya
    document.getElementById(`step${step}`).classList.add('active');
    
    // Update current step
    currentStep = step;
}

// Simpan data form
function saveFormData() {
    orderData = {
        game: selectedGame,
        gameName: gameData[selectedGame].name,
        nominal: gameData[selectedGame].nominals[selectedNominal],
        playerName: document.getElementById('playerName').value,
        playerEmail: document.getElementById('playerEmail').value,
        playerId: document.getElementById('playerId').value,
        playerServer: document.getElementById('playerServer').value
    };
}

// Update ringkasan pesanan
function updateOrderSummary() {
    document.getElementById('summaryGame').textContent = orderData.gameName;
    document.getElementById('summaryNominal').textContent = orderData.nominal.amount;
    document.getElementById('summaryPrice').textContent = `Rp ${orderData.nominal.price.toLocaleString('id-ID')}`;
    document.getElementById('summaryName').textContent = orderData.playerName;
    document.getElementById('summaryId').textContent = orderData.playerId;
}

// Proses pembayaran
function processPayment() {
    // Simulasi proses pembayaran
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    
    // Tampilkan loading atau animasi di sini
    alert(`Memproses pembayaran dengan ${getPaymentMethodName(paymentMethod)}...`);
    
    // Simulasi delay pembayaran
    setTimeout(() => {
        // Generate kode pesanan acak
        const orderCode = 'TOPUP-' + Math.random().toString(36).substr(2, 9).toUpperCase();
        document.getElementById('orderCode').textContent = orderCode;
        
        // Pindah ke step 5 (status pembayaran)
        document.getElementById(`step${currentStep}`).classList.remove('active');
        document.getElementById('step5').classList.add('active');
        currentStep = 5;
        
        // Di sini biasanya akan ada integrasi dengan payment gateway
        // Contoh: Midtrans, Xendit, dll.
    }, 2000);
}

// Dapatkan nama metode pembayaran
function getPaymentMethodName(method) {
    const methods = {
        'bank': 'Transfer Bank',
        'ewallet': 'E-Wallet',
        'qris': 'QRIS'
    };
    
    return methods[method] || 'Metode Pembayaran';
}

// Reset pesanan untuk memulai lagi
function resetOrder() {
    // Reset state
    currentStep = 1;
    selectedGame = null;
    selectedNominal = null;
    orderData = {};
    
    // Reset UI
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active');
    });
    
    document.getElementById('step1').classList.add('active');
    
    // Reset form
    document.getElementById('customerForm').reset();
    
    // Reset pilihan
    document.querySelectorAll('.game-item, .nominal-item').forEach(item => {
        item.classList.remove('active');
    });
}
