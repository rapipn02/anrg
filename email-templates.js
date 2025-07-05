// Email templates for MBC Laboratory
const emailTemplates = {
    // Email to admin when new contact form is submitted
    adminNotification: (contactData) => ({
        subject: `New Contact: ${contactData.service} - ${contactData.name}`,
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .header { background: #1e40af; color: white; padding: 20px; text-align: center; }
                    .content { padding: 20px; background: #f8f9fa; }
                    .info-box { background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #1e40af; }
                    .footer { background: #374151; color: white; padding: 15px; text-align: center; font-size: 12px; }
                    .button { display: inline-block; background: #1e40af; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>🛡️ MBC Laboratory</h1>
                    <p>New Contact Form Submission</p>
                </div>
                
                <div class="content">
                    <div class="info-box">
                        <h3>Contact Information</h3>
                        <p><strong>Name:</strong> ${contactData.name}</p>
                        <p><strong>Email:</strong> ${contactData.email}</p>
                        <p><strong>Service Interested:</strong> ${contactData.service}</p>
                        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
                    </div>
                    
                    <div class="info-box">
                        <h3>Message</h3>
                        <p>${contactData.message.replace(/\n/g, '<br>')}</p>
                    </div>
                    
                    <div style="text-align: center; margin: 20px 0;">
                        <a href="http://localhost:3000/admin" class="button">View in Admin Dashboard</a>
                    </div>
                </div>
                
                <div class="footer">
                    <p>MBC Laboratory - Cybersecurity Solutions</p>
                    <p>This is an automated notification from your website contact form.</p>
                </div>
            </body>
            </html>
        `
    }),

    // Confirmation email to user
    userConfirmation: (contactData) => ({
        subject: 'Thank you for contacting MBC Laboratory',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .header { background: #1e40af; color: white; padding: 20px; text-align: center; }
                    .content { padding: 20px; background: #f8f9fa; }
                    .info-box { background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #10b981; }
                    .footer { background: #374151; color: white; padding: 15px; text-align: center; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>🛡️ MBC Laboratory</h1>
                    <p>Thank you for your inquiry!</p>
                </div>
                
                <div class="content">
                    <h2>Dear ${contactData.name},</h2>
                    
                    <div class="info-box">
                        <p>Thank you for your interest in our <strong>${contactData.service}</strong> service.</p>
                        <p>We have received your message and our team will review your inquiry carefully.</p>
                    </div>
                    
                    <h3>What happens next?</h3>
                    <ul>
                        <li>✅ Our cybersecurity experts will review your requirements</li>
                        <li>📧 We'll contact you within 24-48 hours</li>
                        <li>🎯 We'll provide a tailored solution for your needs</li>
                        <li>🤝 Schedule a consultation if needed</li>
                    </ul>
                    
                    <div class="info-box">
                        <h4>Your submission details:</h4>
                        <p><strong>Service:</strong> ${contactData.service}</p>
                        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
                        <p><strong>Reference ID:</strong> #${Date.now()}</p>
                    </div>
                    
                    <h3>Need immediate assistance?</h3>
                    <p>
                        📧 Email: <a href="mailto:info@mbclaboratory.com">info@mbclaboratory.com</a><br>
                        📱 WhatsApp: +62 xxx-xxxx-xxxx<br>
                        🌐 Website: <a href="http://localhost:3000">MBC Laboratory</a>
                    </p>
                </div>
                
                <div class="footer">
                    <p>MBC Laboratory - Professional Cybersecurity Solutions</p>
                    <p>Securing your digital future with expert technology solutions.</p>
                </div>
            </body>
            </html>
        `
    })
};

module.exports = emailTemplates;
