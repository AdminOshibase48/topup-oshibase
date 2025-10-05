CREATE DATABASE topup_game;
USE topup_game;

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_code VARCHAR(50) NOT NULL UNIQUE,
    game VARCHAR(100) NOT NULL,
    nominal VARCHAR(100) NOT NULL,
    price INT NOT NULL,
    player_name VARCHAR(255) NOT NULL,
    player_email VARCHAR(255) NOT NULL,
    player_id VARCHAR(100) NOT NULL,
    player_server VARCHAR(100),
    payment_method VARCHAR(50) NOT NULL,
    status ENUM('pending', 'processing', 'completed', 'failed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE games (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(50) NOT NULL UNIQUE,
    image_url VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE nominals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    game_code VARCHAR(50) NOT NULL,
    amount VARCHAR(100) NOT NULL,
    price INT NOT NULL,
    bonus VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    FOREIGN KEY (game_code) REFERENCES games(code)
);
