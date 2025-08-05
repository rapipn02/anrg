const mysql = require('mysql2/promise');
require('dotenv').config();

async function checkEvents() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME
        });

        console.log('🔍 Checking events in database...');
        const [events] = await connection.execute('SELECT id, title, imageData IS NOT NULL as hasImageData, imageMimeType, image, LENGTH(imageData) as imageSize FROM events');
        
        console.log('\n📋 Events found:');
        events.forEach(event => {
            console.log(`   ID: ${event.id}`);
            console.log(`   Title: ${event.title}`);
            console.log(`   Has ImageData: ${event.hasImageData ? 'Yes' : 'No'}`);
            console.log(`   Image Size: ${event.imageSize || 0} bytes`);
            console.log(`   MIME Type: ${event.imageMimeType || 'None'}`);
            console.log(`   Image Field: ${event.image || 'None'}`);
            console.log('   ---');
        });

        console.log('\n🔍 Checking news in database...');
        const [news] = await connection.execute('SELECT id, title, imageData IS NOT NULL as hasImageData, imageMimeType FROM news');
        
        console.log('\n📋 News found:');
        news.forEach(newsItem => {
            console.log(`   ID: ${newsItem.id}, Title: ${newsItem.title}, Has Image: ${newsItem.hasImageData ? 'Yes' : 'No'}, MIME: ${newsItem.imageMimeType || 'None'}`);
        });

        await connection.end();
    } catch (error) {
        console.error('Error:', error);
    }
}

checkEvents();
