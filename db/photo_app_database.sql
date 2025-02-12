
-- Tạo cơ sở dữ liệu
CREATE DATABASE IF NOT EXISTS photo_app;
USE photo_app;

-- Bảng lưu thông tin người dùng
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bảng lưu thông tin ảnh
CREATE TABLE photos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Bảng lưu bình luận ảnh
CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    photo_id INT NOT NULL,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (photo_id) REFERENCES photos(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Bảng lưu ảnh đã được người dùng lưu
CREATE TABLE saved_photos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    photo_id INT NOT NULL,
    saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (photo_id) REFERENCES photos(id) ON DELETE CASCADE
);

-- Thêm dữ liệu mẫu vào bảng users
INSERT INTO users (username, password, email) VALUES
('john_doe', 'password123', 'john@example.com'),
('jane_doe', 'password456', 'jane@example.com');

-- Thêm dữ liệu mẫu vào bảng photos
INSERT INTO photos (user_id, title, description, image_url) VALUES
(1, 'Sunset', 'A beautiful sunset.', 'https://example.com/sunset.jpg'),
(2, 'Mountain', 'A scenic mountain view.', 'https://example.com/mountain.jpg');

-- Thêm dữ liệu mẫu vào bảng comments
INSERT INTO comments (photo_id, user_id, content) VALUES
(1, 2, 'Amazing photo!'),
(2, 1, 'Wow, so beautiful!');

-- Thêm dữ liệu mẫu vào bảng saved_photos
INSERT INTO saved_photos (user_id, photo_id) VALUES
(1, 2),
(2, 1);
