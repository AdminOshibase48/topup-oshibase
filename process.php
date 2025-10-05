<?php
// Koneksi ke database
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "topup_game";

// Buat koneksi
$conn = new mysqli($servername, $username, $password, $dbname);

// Cek koneksi
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Tangkap data dari form
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $game = $_POST['game'];
    $nominal = $_POST['nominal'];
    $price = $_POST['price'];
    $player_name = $_POST['player_name'];
    $player_email = $_POST['player_email'];
    $player_id = $_POST['player_id'];
    $player_server = $_POST['player_server'];
    $payment_method = $_POST['payment_method'];
    
    // Generate kode pesanan
    $order_code = 'TOPUP-' . strtoupper(uniqid());
    
    // Status awal
    $status = 'pending';
    
    // Simpan ke database
    $sql = "INSERT INTO orders (order_code, game, nominal, price, player_name, player_email, player_id, player_server, payment_method, status, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssissssss", $order_code, $game, $nominal, $price, $player_name, $player_email, $player_id, $player_server, $payment_method, $status);
    
    if ($stmt->execute()) {
        // Kirim response sukses
        echo json_encode([
            'success' => true,
            'order_code' => $order_code,
            'message' => 'Pesanan berhasil dibuat'
        ]);
    } else {
        // Kirim response error
        echo json_encode([
            'success' => false,
            'message' => 'Terjadi kesalahan: ' . $stmt->error
        ]);
    }
    
    $stmt->close();
}

$conn->close();
?>
