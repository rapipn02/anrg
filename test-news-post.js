const axios = require('axios');

async function testNewsPost() {
    try {
        // Test data untuk news
        const newsData = {
            title: 'Test News',
            summary: 'Test summary',
            content: 'Test content',
            category: 'technology',
            status: 'published'
        };

        // POST ke endpoint news - gunakan Authorization header
        const newsResponse = await axios.post('http://localhost:3000/api/admin/news', newsData, {
            headers: {
                'Authorization': 'Bearer admin123',
                'Content-Type': 'application/json'
            }
        });

        console.log('News POST response:', newsResponse.status, newsResponse.data);
        
    } catch (error) {
        console.error('Error details:');
        console.error('Status:', error.response?.status);
        console.error('Data:', error.response?.data);
        console.error('Message:', error.message);
    }
}

testNewsPost();
