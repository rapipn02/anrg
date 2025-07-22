const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const contactDB = require('./contact-db'); // Import database functions
const emailTemplates = require('./email-templates'); // Import email templates
const formValidation = require('./form-validation'); // Import form validation
const newsData = require('./news-data'); // Import news data
const eventData = require('./event-data'); // Import event data
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
    const featuredNews = newsData.getFeaturedNews(3); // Get 3 latest news for homepage
    const upcomingEvents = eventData.getUpcomingEvents(3); // Get 3 upcoming events for homepage
    res.render('index', { 
        title: 'MBC Laboratory - Cybersecurity Solutions',
        currentPage: 'home',
        featuredNews: featuredNews,
        upcomingEvents: upcomingEvents
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

app.get('/team', (req, res) => {
    res.render('team', { 
        title: 'Our Team - MBC Laboratory',
        currentPage: 'team'
    });
});

app.get('/developer', (req, res) => {
    res.render('developer', { 
        title: 'Developer Info - MBC Laboratory',
        currentPage: 'developer'
    });
});

// News routes
app.get('/news', (req, res) => {
    const { category, search, page = 1 } = req.query;
    let allNews = newsData.getAllNews();
    
    // Filter by category if specified
    if (category && category !== 'all') {
        allNews = newsData.getNewsByCategory(category);
    }
    
    // Search functionality
    if (search) {
        allNews = newsData.searchNews(search);
    }
    
    // Pagination
    const newsPerPage = 6;
    const totalNews = allNews.length;
    const totalPages = Math.ceil(totalNews / newsPerPage);
    const currentPage = Math.max(1, Math.min(page, totalPages));
    const startIndex = (currentPage - 1) * newsPerPage;
    const endIndex = startIndex + newsPerPage;
    const paginatedNews = allNews.slice(startIndex, endIndex);
    
    res.render('news', {
        title: 'Latest News - MBC Laboratory',
        currentPage: 'news',
        news: paginatedNews,
        categories: newsData.getNewsCategories(),
        selectedCategory: category || 'all',
        searchQuery: search || '',
        pagination: {
            current: currentPage,
            total: totalPages,
            hasNext: currentPage < totalPages,
            hasPrev: currentPage > 1,
            nextPage: currentPage + 1,
            prevPage: currentPage - 1
        },
        totalNews: totalNews
    });
});

app.get('/news/:slug', (req, res) => {
    const news = newsData.getNewsBySlug(req.params.slug);
    
    if (!news) {
        return res.status(404).render('404', {
            title: 'News Not Found - MBC Laboratory',
            currentPage: 'news'
        });
    }
    
    const relatedNews = newsData.getRelatedNews(news.id, 3);
    
    res.render('news-detail', {
        title: `${news.title} - MBC Laboratory`,
        currentPage: 'news',
        news: news,
        relatedNews: relatedNews,
        currentUrl: req.protocol + '://' + req.get('host') + req.originalUrl
    });
});

// Event routes
app.get('/events', (req, res) => {
    const { category, type, status, search, page = 1 } = req.query;
    let allEvents = eventData.getAllEvents();
    
    // Filter by category if specified
    if (category && category !== 'all') {
        allEvents = eventData.getEventsByCategory(category);
    }
    
    // Filter by type if specified
    if (type && type !== 'all') {
        allEvents = eventData.getEventsByType(type);
    }
    
    // Filter by status if specified
    if (status && status !== 'all') {
        allEvents = eventData.getEventsByStatus(status);
    }
    
    // Search functionality
    if (search) {
        allEvents = eventData.searchEvents(search);
    }
    
    // Pagination
    const eventsPerPage = 6;
    const totalEvents = allEvents.length;
    const totalPages = Math.ceil(totalEvents / eventsPerPage);
    const currentPage = Math.max(1, Math.min(page, totalPages));
    const startIndex = (currentPage - 1) * eventsPerPage;
    const endIndex = startIndex + eventsPerPage;
    const paginatedEvents = allEvents.slice(startIndex, endIndex);
    
    res.render('events', {
        title: 'Upcoming Events - MBC Laboratory',
        currentPage: 'events',
        events: paginatedEvents,
        categories: eventData.getEventCategories(),
        types: eventData.getEventTypes(),
        selectedCategory: category || 'all',
        selectedType: type || 'all',
        selectedStatus: status || 'all',
        searchQuery: search || '',
        pagination: {
            current: currentPage,
            total: totalPages,
            hasNext: currentPage < totalPages,
            hasPrev: currentPage > 1,
            nextPage: currentPage + 1,
            prevPage: currentPage - 1
        },
        totalEvents: totalEvents
    });
});

app.get('/events/:slug', (req, res) => {
    const event = eventData.getEventBySlug(req.params.slug);
    
    if (!event) {
        return res.status(404).render('404', {
            title: 'Event Not Found - MBC Laboratory',
            currentPage: 'events'
        });
    }
    
    const relatedEvents = eventData.getRelatedEvents(event.id, 3);
    const availableSpots = eventData.getAvailableSpots(event.id);
    const isAvailable = eventData.isEventAvailable(event.id);
    
    res.render('event-detail', {
        title: `${event.title} - MBC Laboratory`,
        currentPage: 'events',
        event: event,
        relatedEvents: relatedEvents,
        availableSpots: availableSpots,
        isAvailable: isAvailable,
        currentUrl: req.protocol + '://' + req.get('host') + req.originalUrl
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
