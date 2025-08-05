const axios = require('axios');

async function testHomePage() {
    try {
        console.log('🔍 Testing Home Page for Events with Images...');
        
        const response = await axios.get('http://localhost:3000/');
        
        if (response.status === 200) {
            console.log('✅ Home page loaded successfully');
            
            // Check if event imageUrl is in the HTML
            const html = response.data;
            const eventImageUrls = html.match(/\/api\/images\/events\/\d+/g);
            
            if (eventImageUrls) {
                console.log(`✅ Found ${eventImageUrls.length} event image URLs on home page:`);
                eventImageUrls.forEach(url => {
                    console.log(`   ${url}`);
                });
            } else {
                console.log('❌ No event image URLs found on home page');
                
                // Check for old image format
                const oldEventImages = html.match(/event\.image/g);
                if (oldEventImages) {
                    console.log(`⚠️ Found ${oldEventImages.length} old format event.image references`);
                }
            }
            
            // Also check for news images
            const newsImageUrls = html.match(/\/api\/images\/news\/\d+/g);
            if (newsImageUrls) {
                console.log(`✅ Found ${newsImageUrls.length} news image URLs on home page:`);
                newsImageUrls.forEach(url => {
                    console.log(`   ${url}`);
                });
            }
            
        } else {
            console.log('❌ Home page failed to load:', response.status);
        }
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

testHomePage();
