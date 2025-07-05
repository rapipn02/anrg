const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const contactDB = require('./contact-db'); // Import database functions
const emailTemplates = require('./email-templates'); // Import email templates
const formValidation = require('./form-validation'); // Import form validation
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Email configuration (gunakan credentials dari .env file)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'demo@mbclaboratory.com',
        pass: process.env.EMAIL_PASS || 'demo_password'
    }
});

// Test email configuration
if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    console.log('✅ Email configuration loaded');
} else {
    console.log('⚠️  Email not configured - using console logging only');
}

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

// Admin dashboard page
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'admin-dashboard.html'));
});

// Contact form handler with email functionality
app.post('/contact', async (req, res) => {
    const clientIP = req.ip || req.connection.remoteAddress || 'unknown';
    
    // Rate limiting check
    const rateLimit = formValidation.checkRateLimit(clientIP);
    if (!rateLimit.allowed) {
        return res.status(429).render('contact', {
            title: 'Contact Us - MBC Laboratory',
            currentPage: 'contact',
            error: `Too many requests. Please try again in ${rateLimit.resetTime} seconds.`,
            formData: req.body
        });
    }
    
    // Sanitize input data
    const sanitizedData = formValidation.sanitizeInput(req.body);
    const { name, email, message, service } = sanitizedData;
    
    // Validate form data
    const validation = formValidation.validateContactForm(sanitizedData);
    if (!validation.isValid) {
        return res.render('contact', {
            title: 'Contact Us - MBC Laboratory',
            currentPage: 'contact',
            error: validation.errors.join(', '),
            formData: req.body
        });
    }
    
    try {
        // Save to database
        await contactDB.saveContactForm({ name, email, message, service });
        console.log('💾 Contact form submission saved to database');

        // Email to admin
        const adminTemplate = emailTemplates.adminNotification({ name, email, message, service });
        const adminMailOptions = {
            from: email,
            to: process.env.ADMIN_EMAIL || 'admin@mbclaboratory.com',
            subject: adminTemplate.subject,
            html: adminTemplate.html
        };

        // Confirmation email to user
        const userTemplate = emailTemplates.userConfirmation({ name, email, message, service });
        const userMailOptions = {
            from: process.env.EMAIL_USER || 'noreply@mbclaboratory.com',
            to: email,
            subject: userTemplate.subject,
            html: userTemplate.html
        };

        // Send emails jika email sudah dikonfigurasi
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS && 
            process.env.EMAIL_USER !== 'demo@mbclaboratory.com') {
            await transporter.sendMail(adminMailOptions);
            await transporter.sendMail(userMailOptions);
            console.log('📧 Emails sent successfully!');
        } else {
            console.log('📧 Email not configured - check .env file');
        }
        
        // Save to database
        const savedContact = contactDB.saveContact({ name, email, message, service });
        
        // Log to terminal (for demonstration)
        console.log('=== Contact Form Submission ===');
        console.log(`ID: ${savedContact.id}`);
        console.log(`Name: ${name}`);
        console.log(`Email: ${email}`);
        console.log(`Service: ${service}`);
        console.log(`Message: ${message}`);
        console.log(`Time: ${new Date().toISOString()}`);
        console.log(`Saved to database: ✅`);
        console.log('==============================');
        
        res.render('contact', { 
            title: 'Contact Us - MBC Laboratory',
            currentPage: 'contact',
            success: 'Thank you for your message! We will contact you soon.',
            formData: { name, email, message, service }
        });
    } catch (error) {
        console.error('Error handling contact form submission:', error);
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

// Admin dashboard to view all contacts
app.get('/admin/contacts', (req, res) => {
    // Simple auth check (in production, use proper authentication)
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader !== 'Bearer admin123') {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const contacts = contactDB.getAllContacts();
    res.json({
        total: contacts.length,
        contacts: contacts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    });
});

// Update contact status
app.put('/admin/contacts/:id/status', (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader !== 'Bearer admin123') {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const { id } = req.params;
    const { status } = req.body;
    
    const updatedContact = contactDB.updateContactStatus(id, status);
    if (updatedContact) {
        res.json(updatedContact);
    } else {
        res.status(404).json({ error: 'Contact not found' });
    }
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
