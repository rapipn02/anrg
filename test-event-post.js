const axios = require('axios');

async function testEventPost() {
    try {
        // Test data untuk event
        const eventData = {
            title: 'Test Event',
            description: 'Test description',
            content: 'Test content',
            date: '2024-12-31',
            time: '10:00',
            location: 'Test Location',
            organizer: 'Test Organizer',
            registrationLink: 'http://test.com',
            price: '50000',
            status: 'upcoming'
        };

        // POST ke endpoint events - gunakan Authorization header
        const eventResponse = await axios.post('http://localhost:3000/api/admin/events', eventData, {
            headers: {
                'Authorization': 'Bearer admin123',
                'Content-Type': 'application/json'
            }
        });

        console.log('Event POST response:', eventResponse.status, eventResponse.data);
        
    } catch (error) {
        console.error('Error details:');
        console.error('Status:', error.response?.status);
        console.error('Data:', error.response?.data);
        console.error('Message:', error.message);
        
        if (error.response?.data) {
            console.error('Response body:', error.response.data);
        }
    }
}

testEventPost();
