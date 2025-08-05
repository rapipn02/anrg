const axios = require('axios');

async function testImageAPI() {
    try {
        console.log('🔍 Testing News image API...');
        // Test news image API
        try {
            const newsResponse = await axios.get('http://localhost:3000/api/images/news/3', {
                timeout: 5000
            });
            console.log('✅ News image API status:', newsResponse.status);
            console.log('   Content-Type:', newsResponse.headers['content-type']);
            console.log('   Data size:', newsResponse.data.length || 'No data');
        } catch (newsError) {
            console.log('❌ News image API error:', newsError.response?.status, newsError.response?.data);
        }

        console.log('\n🔍 Testing Events image API...');
        // Test events image API dengan ID yang benar
        try {
            const eventsResponse = await axios.get('http://localhost:3000/api/images/events/3', {
                timeout: 5000
            });
            console.log('✅ Events image API status:', eventsResponse.status);
            console.log('   Content-Type:', eventsResponse.headers['content-type']);
            console.log('   Data size:', eventsResponse.data.length || 'No data');
        } catch (eventsError) {
            console.log('❌ Events image API error:', eventsError.response?.status, eventsError.response?.data);
        }

    } catch (error) {
        console.error('Error:', error.message);
    }
}

testImageAPI();
