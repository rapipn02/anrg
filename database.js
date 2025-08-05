const mysql = require('mysql2/promise');
require('dotenv').config();

// Database configuration
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'anrg',
    charset: 'utf8mb4',
    timezone: '+00:00'
};

// Create connection pool
const pool = mysql.createPool({
    ...dbConfig,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test database connection
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('✅ MySQL database connected successfully');
        connection.release();
        return true;
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        return false;
    }
}

// Initialize database tables
async function initializeTables() {
    try {
        const connection = await pool.getConnection();
        
        // Create news table with image storage
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS news (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                slug VARCHAR(255) UNIQUE NOT NULL,
                summary TEXT,
                content LONGTEXT,
                category VARCHAR(100),
                image VARCHAR(255),
                imageData LONGBLOB,
                imageMimeType VARCHAR(100),
                status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
                publishDate DATE,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
        `);
        
        // Create events table with image storage
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS events (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                slug VARCHAR(255) UNIQUE NOT NULL,
                description TEXT,
                content LONGTEXT,
                date DATE NOT NULL,
                time TIME,
                location VARCHAR(255),
                organizer VARCHAR(255),
                image VARCHAR(255),
                imageData LONGBLOB,
                imageMimeType VARCHAR(100),
                registrationLink VARCHAR(500),
                price DECIMAL(10,2) DEFAULT 0.00,
                status ENUM('upcoming', 'ongoing', 'completed', 'cancelled') DEFAULT 'upcoming',
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
        `);
        
        // Create team table with photo storage
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS team (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                role ENUM('advisor', 'researcher', 'student', 'alumni') NOT NULL,
                email VARCHAR(255),
                phone VARCHAR(50),
                specialization VARCHAR(255),
                bio TEXT,
                photo VARCHAR(255),
                photoData LONGBLOB,
                photoMimeType VARCHAR(100),
                linkedin VARCHAR(500),
                scholar VARCHAR(500),
                status ENUM('active', 'inactive') DEFAULT 'active',
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
        `);
        
        // Create contacts table
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS contacts (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                service VARCHAR(100),
                message TEXT NOT NULL,
                status ENUM('new', 'read', 'responded', 'closed') DEFAULT 'new',
                ip VARCHAR(45),
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
        `);
        
        connection.release();
        console.log('✅ Database tables initialized successfully');
        
    } catch (error) {
        console.error('❌ Error initializing tables:', error.message);
        throw error;
    }
}

// Helper function to generate slug from title
function generateSlug(title) {
    return title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
        .trim();
}

module.exports = {
    pool,
    testConnection,
    initializeTables,
    generateSlug
};
