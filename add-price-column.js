require('dotenv').config();
const mysql = require('mysql2/promise');

async function addPriceColumn() {
    try {
        console.log('🔄 Adding price column to events table...');
        
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME
        });
        
        // Check if price column exists
        const [columns] = await connection.execute(`
            SELECT COLUMN_NAME 
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'events' AND COLUMN_NAME = 'price'
        `, [process.env.DB_NAME]);
        
        if (columns.length === 0) {
            // Add price column
            await connection.execute(`
                ALTER TABLE events 
                ADD COLUMN price DECIMAL(10,2) DEFAULT 0.00 
                AFTER registrationLink
            `);
            console.log('✅ Price column added successfully');
        } else {
            console.log('ℹ️ Price column already exists');
        }
        
        await connection.end();
        console.log('🎉 Column migration completed!');
        
    } catch (error) {
        console.error('❌ Error adding price column:', error);
    } finally {
        console.log('Migration completed. Exiting...');
        process.exit(0);
    }
}

addPriceColumn();
