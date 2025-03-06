var mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

const create_table_movies = [
    `CREATE TABLE IF NOT EXISTS roles (
        id INT PRIMARY KEY AUTO_INCREMENT,
        role_name VARCHAR(50) NOT NULL
    );`,

    `CREATE TABLE IF NOT EXISTS membership_levels (
        id INT AUTO_INCREMENT PRIMARY KEY,
        level_name VARCHAR(50),
        discount_percentage DECIMAL(5, 2)
    );`,

    `CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        membership_level_id INT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        numberphone VARCHAR(20),
        date_of_birth DATE,
        address VARCHAR(500),
        password VARCHAR(255) NOT NULL,
        role_id INT NOT NULL,
        customer_score INT DEFAULT 0,
        verified BOOLEAN DEFAULT 0,
        FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE RESTRICT ON UPDATE CASCADE,
        FOREIGN KEY (membership_level_id) REFERENCES membership_levels(id) ON DELETE SET NULL ON UPDATE CASCADE
    );`,

    `CREATE TABLE IF NOT EXISTS areas (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    );`,

    `CREATE TABLE IF NOT EXISTS theaters (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address TEXT,
        area_id INT,
        total_screens INT DEFAULT 0,
        total_seats INT DEFAULT 0,
        manager_id INT,
        FOREIGN KEY (manager_id) REFERENCES users(id), 
        FOREIGN KEY (area_id) REFERENCES areas(id) ON DELETE SET NULL ON UPDATE CASCADE
    );`,

    `CREATE TABLE IF NOT EXISTS movies (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        original_language VARCHAR(10),
        overview TEXT,
        release_date DATE,
        adult TINYINT(1) DEFAULT 0,
        img_bg VARCHAR(255),
        img_poster VARCHAR(255),
        vote_average DECIMAL(3, 2),
        vote_count INT
    );`,

    `CREATE TABLE IF NOT EXISTS movie_theater (
        theater_id INT NOT NULL,
        movie_id INT NOT NULL,
        PRIMARY KEY (theater_id, movie_id),
        FOREIGN KEY (theater_id) REFERENCES theaters(id) ON DELETE CASCADE,
        FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE
    );`,

    `CREATE TABLE IF NOT EXISTS genres (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL
    );`,

    `CREATE TABLE IF NOT EXISTS movie_genres (
        movie_id INT,
        genre_id INT,
        PRIMARY KEY (movie_id, genre_id),
        FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
        FOREIGN KEY (genre_id) REFERENCES genres(id) ON DELETE CASCADE
    );`,

    `CREATE TABLE IF NOT EXISTS screens (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        theater_id INT,
        total_row INT DEFAULT 0,
        total_column INT DEFAULT 0,
        FOREIGN KEY (theater_id) REFERENCES theaters(id) ON DELETE CASCADE ON UPDATE CASCADE
    );`,

    `CREATE TABLE IF NOT EXISTS seat_type (
        id INT AUTO_INCREMENT PRIMARY KEY,
        type_name VARCHAR(100),
        price DECIMAL(10, 2) NOT NULL
    );`,

    `CREATE TABLE IF NOT EXISTS seats (
        id INT AUTO_INCREMENT PRIMARY KEY,
        seat_name VARCHAR(50) NOT NULL,
        screen_id INT,
        seat_type_id INT,
        FOREIGN KEY (seat_type_id) REFERENCES seat_type(id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (screen_id) REFERENCES screens(id) ON DELETE CASCADE ON UPDATE CASCADE
    );`,

    `CREATE TABLE IF NOT EXISTS showtimes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        movie_id INT,
        screen_id INT,
        date_time DATETIME,
        start_time DATETIME,
        end_time DATETIME,
        FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE SET NULL ON UPDATE CASCADE,
        FOREIGN KEY (screen_id) REFERENCES screens(id) ON DELETE CASCADE ON UPDATE CASCADE
    );`,

    `CREATE TABLE IF NOT EXISTS invoices (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        purchase_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        TotalAmount DECIMAL(10,2) NOT NULL DEFAULT 0,
        PaymentStatus ENUM('Paid', 'Pending', 'Cancelled') DEFAULT 'Pending',
        theater_id INT NOT NULL,
        FOREIGN KEY (theater_id) REFERENCES theaters(id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
    );`,

    `CREATE TABLE IF NOT EXISTS tickets (
        id INT PRIMARY KEY AUTO_INCREMENT,
        invoice_id INT,
        showtime_id INT,
        seat_id INT,
        FOREIGN KEY (showtime_id) REFERENCES showtimes(id) ON DELETE SET NULL ON UPDATE CASCADE,
        FOREIGN KEY (seat_id) REFERENCES seats(id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (invoice_id) REFERENCES invoices(id) ON DELETE CASCADE ON UPDATE CASCADE
    );`,

    `CREATE TABLE IF NOT EXISTS events (
        id INT AUTO_INCREMENT PRIMARY KEY,
        theater_id INT,
        name VARCHAR(255),
        description TEXT,
        start_date DATE,
        end_date DATE,
        FOREIGN KEY (theater_id) REFERENCES theaters(id) ON DELETE CASCADE ON UPDATE CASCADE
    );`,

    `CREATE TABLE IF NOT EXISTS services (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50),
        img VARCHAR(255),
        category ENUM('popcorn', 'drink', 'combo') NOT NULL,
        inventory INT,
        price DECIMAl(10,2) NOT NULL,
        discount INT NOT NULL DEFAULT 0,
        description TEXT DEFAULT NULL
    );`,

    `CREATE TABLE IF NOT EXISTS invoice_services (
        id INT AUTO_INCREMENT PRIMARY KEY,
        invoice_id INT,
        service_id INT,
        quantity INT NOT NULL DEFAULT 1,
        total_price DECIMAl(10,2) DEFAULT 0, 
        FOREIGN KEY (invoice_id) REFERENCES invoices(id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE ON UPDATE CASCADE
    );`,

    `CREATE TABLE IF NOT EXISTS user_verification (
        user_id INT NOT NULL,
        uniqueString VARCHAR(255),
        createAt DATE,
        expiresAt DATE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
    );`,
];


const createTableDB = () => {
    const con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: process.env.DATABASE_NAME
    });
    con.connect(function (err) {
        if (err) {
            console.error("Error connecting to the database:", err);
            return;
        }
        console.log("Connected!");
        create_table_movies.forEach((query, index) => {
            con.query(query, function (err, result) {
                if (err) {
                    console.error(`Error creating table at query ${index + 1}:`, err);
                } else {
                    console.log(`Table created successfully for query ${index + 1}`);
                }
            });
        });
        con.end();
    });
};
module.exports = { createTableDB };