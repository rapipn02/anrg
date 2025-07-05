const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Email configuration (for demonstration - use environment variables in production)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'demo@mbclaboratory.com',
        pass: process.env.EMAIL_PASS || 'demo_password'
    }
});

// Set EJS as template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.render('index', { 
        title: 'MBC Laboratory - Cybersecurity Solutions',
        currentPage: 'home'
    });
});

app.get('/services', (req, res) => {
    res.render('services', { 
        title: 'Our Services - MBC Laboratory',
        currentPage: 'services'
    });
});

app.get('/contact', (req, res) => {
    res.render('contact', { 
        title: 'Contact Us - MBC Laboratory',
        currentPage: 'contact'
    });
});

app.get('/developer', (req, res) => {
    res.render('developer', { 
        title: 'Developer Info - MBC Laboratory',
        currentPage: 'developer'
    });
});

// Contact form handler with email functionality
app.post('/contact', async (req, res) => {
    const { name, email, message, service } = req.body;
    
    try {
        // Email to admin
        const adminMailOptions = {
            from: email,
            to: 'admin@mbclaboratory.com',
            subject: `New Contact Form Submission - ${service}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Service:</strong> ${service}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
                <hr>
                <p><em>Sent from MBC Laboratory Contact Form</em></p>
            `
        };

        // Confirmation email to user
        const userMailOptions = {
            from: 'noreply@mbclaboratory.com',
            to: email,
            subject: 'Thank you for contacting MBC Laboratory',
            html: `
                <h2>Thank you for your inquiry!</h2>
                <p>Dear ${name},</p>
                <p>We have received your message regarding our <strong>${service}</strong> service.</p>
                <p>Our team will review your inquiry and get back to you within 24-48 hours.</p>
                <p>Best regards,<br>MBC Laboratory Team</p>
            `
        };

        // Send emails (commented for demo - uncomment when email credentials are set)
        // await transporter.sendMail(adminMailOptions);
        // await transporter.sendMail(userMailOptions);
        
        // Log to terminal (for demonstration)
        console.log('=== Contact Form Submission ===');
        console.log(`Name: ${name}`);
        console.log(`Email: ${email}`);
        console.log(`Service: ${service}`);
        console.log(`Message: ${message}`);
        console.log(`Time: ${new Date().toISOString()}`);
        console.log('==============================');
        
        res.render('contact', { 
            title: 'Contact Us - MBC Laboratory',
            currentPage: 'contact',
            success: 'Thank you for your message! We will contact you soon.',
            formData: { name, email, message, service }
        });
    } catch (error) {
        console.error('Email error:', error);
        res.render('contact', { 
            title: 'Contact Us - MBC Laboratory',
            currentPage: 'contact',
            error: 'Sorry, there was an error sending your message. Please try again.',
            formData: { name, email, message, service }
        });
    }
});

// Security Dashboard (Admin only)
app.get('/admin/security', (req, res) => {
    // Simple auth check (in production, use proper authentication)
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader !== 'Bearer admin123') {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    
    res.json({
        status: 'operational',
        monitoring: 'active',
        message: 'Security system running'
    });
});

// Security status endpoint
app.get('/security/status', (req, res) => {
    res.json({
        status: 'operational',
        monitoring: 'active',
        alerts: 0,
        blockedIPs: 0,
        lastCheck: new Date().toISOString()
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).render('404', { 
        title: '404 - Page Not Found',
        currentPage: ''
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🌐 MBC Laboratory website running on http://localhost:${PORT}`);
    console.log(`🚀 Website ready! Open your browser and visit the URL above`);
    console.log(`📄 Available pages:`);
    console.log(`   • Home: http://localhost:${PORT}/`);
    console.log(`   • Services: http://localhost:${PORT}/services`);
    console.log(`   • Contact: http://localhost:${PORT}/contact`);
    console.log(`   • Developer: http://localhost:${PORT}/developer`);
});
