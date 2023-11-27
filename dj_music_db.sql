-- Creating the albums table
CREATE TABLE albums (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  release_date DATE NOT NULL,
  cover_image_s3_url VARCHAR(255)
);

-- Creating the album_tracks table without FK constraints
CREATE TABLE album_tracks (
  album_id INT,
  track_id INT,
  PRIMARY KEY (album_id, track_id)
);

-- Creating the orders table without FK constraints
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  product_id INT,
  quantity INT NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  tracking_number VARCHAR(50),
  status ENUM('pending', 'complete', 'shipped', 'delivered'),
  address VARCHAR(255),
  payment_method VARCHAR(50),
  payment_status ENUM('pending', 'paid', 'failed', 'refunded')
);

-- Creating the products table
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  short_description VARCHAR(255),
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image VARCHAR(255),
  type ENUM('cloud', 'hard_drive'),
  quantity_in_stock INT
);

-- Creating the subscriptions table without FK constraints
CREATE TABLE subscriptions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  product_id INT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL
);

-- Creating the tracks table
CREATE TABLE tracks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50),
  duration TIME NOT NULL,
  s3_url VARCHAR(255) NOT NULL
);

-- Creating the Downloads table without FK constraints
CREATE TABLE Downloads (
  track_id INT,
  user_id INT,
  download_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (track_id, user_id)
);

-- Creating the users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  full_name VARCHAR(255),
  user_role ENUM('new_user', 'admin', 'subscriber'),
  address VARCHAR(255),
  phone VARCHAR(20),
  country VARCHAR(50)
);

-- Creating the Reviews table without FK constraints
CREATE TABLE Reviews (
  review_id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT,
  user_id INT,
  review TEXT,
  stars INT
);

-- Creating the newsletter table
CREATE TABLE newsletter (
  email VARCHAR(100) PRIMARY KEY,
  subscription_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Adding FK constraints to album_tracks
ALTER TABLE album_tracks
ADD FOREIGN KEY (album_id) REFERENCES albums(id),
ADD FOREIGN KEY (track_id) REFERENCES tracks(id);

-- Adding FK constraints to orders
ALTER TABLE orders
ADD FOREIGN KEY (user_id) REFERENCES users(id),
ADD FOREIGN KEY (product_id) REFERENCES products(id);

-- Adding FK constraints to subscriptions
ALTER TABLE subscriptions
ADD FOREIGN KEY (user_id) REFERENCES users(id),
ADD FOREIGN KEY (product_id) REFERENCES products(id);

-- Adding FK constraints to Downloads
ALTER TABLE Downloads
ADD FOREIGN KEY (track_id) REFERENCES tracks(id),
ADD FOREIGN KEY (user_id) REFERENCES users(id);

-- Adding FK constraints to Reviews
ALTER TABLE Reviews
ADD FOREIGN KEY (product_id) REFERENCES products(id),
ADD FOREIGN KEY (user_id) REFERENCES users(id);
