const axios = require('axios');

async function testEventImageDetailed() {
    try {
        console.log('🔍 Testing Events image API with detailed response...');
        
        const response = await axios.get('http://localhost:3000/api/images/events/3', {
            responseType: 'arraybuffer', // Get binary data
            timeout: 10000,
            validateStatus: function (status) {
                return status < 500; // Allow any status below 500
            }
        });
        
        console.log('✅ Response Status:', response.status);
        console.log('📋 Response Headers:');
        Object.keys(response.headers).forEach(key => {
            console.log(`   ${key}: ${response.headers[key]}`);
        });
        
        if (response.status === 200) {
            console.log(`📊 Image Size: ${response.data.length} bytes`);
            console.log(`🖼️ Content-Type: ${response.headers['content-type']}`);
            
            // Check if it's a valid image by looking at the first few bytes
            const buffer = Buffer.from(response.data);
            const header = buffer.toString('hex', 0, 8);
            console.log(`🔍 File Header: ${header}`);
            
            // PNG header should start with 89504e47
            if (header.startsWith('89504e47')) {
                console.log('✅ Valid PNG image detected');
            } else if (header.startsWith('ffd8ff')) {
                console.log('✅ Valid JPEG image detected');
            } else {
                console.log('⚠️ Unknown image format');
            }
        } else {
            console.log('❌ Error Response:', response.data.toString());
        }
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        if (error.response) {
            console.error('   Status:', error.response.status);
            console.error('   Data:', error.response.data);
        }
    }
}

testEventImageDetailed();
