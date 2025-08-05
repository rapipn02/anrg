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

async function migrateDatabase() {
    try {
        console.log('🔄 Starting database migration...');
        
        // Add imageData and imageMimeType to news table
        try {
            await pool.execute(`
                ALTER TABLE news 
                ADD COLUMN imageData LONGBLOB,
                ADD COLUMN imageMimeType VARCHAR(100)
            `);
            console.log('✅ Added image storage columns to news table');
        } catch (error) {
            if (error.code === 'ER_DUP_FIELDNAME') {
                console.log('ℹ️ Image columns already exist in news table');
            } else {
                throw error;
            }
        }
        
        // Add imageData and imageMimeType to events table
        try {
            await pool.execute(`
                ALTER TABLE events 
                ADD COLUMN imageData LONGBLOB,
                ADD COLUMN imageMimeType VARCHAR(100)
            `);
            console.log('✅ Added image storage columns to events table');
        } catch (error) {
            if (error.code === 'ER_DUP_FIELDNAME') {
                console.log('ℹ️ Image columns already exist in events table');
            } else {
                throw error;
            }
        }
        
        // Add photoData and photoMimeType to team table
        try {
            await pool.execute(`
                ALTER TABLE team 
                ADD COLUMN photoData LONGBLOB,
                ADD COLUMN photoMimeType VARCHAR(100)
            `);
            console.log('✅ Added photo storage columns to team table');
        } catch (error) {
            if (error.code === 'ER_DUP_FIELDNAME') {
                console.log('ℹ️ Photo columns already exist in team table');
            } else {
                throw error;
            }
        }
        
        console.log('🎉 Database migration completed successfully!');
        
    } catch (error) {
        console.error('❌ Database migration failed:', error);
        throw error;
    }
}

// Run migration if this file is executed directly
if (require.main === module) {
    migrateDatabase()
        .then(() => {
            console.log('Migration completed. Exiting...');
            process.exit(0);
        })
        .catch((error) => {
            console.error('Migration failed:', error);
            process.exit(1);
        });
}

module.exports = { migrateDatabase };
