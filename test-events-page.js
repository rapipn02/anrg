const axios = require('axios');

async function testEventsPage() {
    try {
        console.log('🔍 Testing Events Page HTML...');
        
        const response = await axios.get('http://localhost:3000/events');
        
        if (response.status === 200) {
            console.log('✅ Events page loaded successfully');
            
            // Check if imageUrl is in the HTML
            const html = response.data;
            const imageUrlMatches = html.match(/\/api\/images\/events\/\d+/g);
            
            if (imageUrlMatches) {
                console.log(`✅ Found ${imageUrlMatches.length} event image URLs:`);
                imageUrlMatches.forEach(url => {
                    console.log(`   ${url}`);
                });
            } else {
                console.log('❌ No event image URLs found in HTML');
                
                // Check for old image format
                const oldImageMatches = html.match(/event\.image/g);
                if (oldImageMatches) {
                    console.log(`⚠️ Found ${oldImageMatches.length} old format references`);
                }
            }
            
        } else {
            console.log('❌ Events page failed to load:', response.status);
        }
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

testEventsPage();
