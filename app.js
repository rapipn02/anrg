const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const contactDB = require('./contact-db'); // Import database functions
const emailTemplates = require('./email-templates'); // Import email templates
const formValidation = require('./form-validation'); // Import form validation

// Import content service (menggunakan MySQL dengan fallback dummy data)
const contentService = require('./content-service');

// Import admin routes
const adminApiRoutes = require('./routes/admin-mysql'); // Admin API routes with MySQL
const adminFrontendRoutes = require('./routes/admin-frontend'); // Admin frontend routes
const imagesApiRoutes = require('./routes/images'); // Images API routes

// Import database and admin DB
const { testConnection, initializeTables } = require('./database');
const adminDB = require('./admin-db-mysql');

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

// Admin Routes
app.use('/admin', adminFrontendRoutes); // Admin frontend pages
app.use('/api/admin', adminApiRoutes); // Admin API routes
app.use('/api/images', imagesApiRoutes); // Images API routes

// Routes
app.get('/', async (req, res) => {
    try {
        const featuredNews = await contentService.getFeaturedNews(3); // Get 3 latest news for homepage
        const upcomingEvents = await contentService.getUpcomingEvents(3); // Get 3 upcoming events for homepage
        res.render('index', { 
            title: 'ANRG Laboratory - Advanced Network Research Group',
            currentPage: 'home',
            featuredNews: featuredNews,
            upcomingEvents: upcomingEvents
        });
    } catch (error) {
        console.error('Error loading homepage:', error);
        res.render('index', { 
            title: 'ANRG Laboratory - Advanced Network Research Group',
            currentPage: 'home',
            featuredNews: [],
            upcomingEvents: []
        });
    }
});

app.get('/services', (req, res) => {
    res.render('services', { 
        title: 'Our Services - ANRG Laboratory',
        currentPage: 'services'
    });
});

app.get('/contact', (req, res) => {
    res.render('contact', { 
        title: 'Contact Us - ANRG Laboratory',
        currentPage: 'contact'
    });
});

app.get('/team', async (req, res) => {
    try {
        const teamMembers = await contentService.getAllTeam();
        const advisors = await contentService.getTeamByRole('advisor');
        const researchers = await contentService.getTeamByRole('researcher');
        const students = await contentService.getTeamByRole('student');
        const alumni = await contentService.getTeamByRole('alumni');
        
        res.render('team', { 
            title: 'Our Team - ANRG Laboratory',
            currentPage: 'team',
            teamMembers: teamMembers,
            advisors: advisors,
            researchers: researchers,
            students: students,
            alumni: alumni
        });
    } catch (error) {
        console.error('Error loading team page:', error);
        res.render('team', { 
            title: 'Our Team - ANRG Laboratory',
            currentPage: 'team',
            teamMembers: [],
            advisors: [],
            researchers: [],
            students: [],
            alumni: []
        });
    }
});

app.get('/developer', (req, res) => {
    res.render('developer', { 
        title: 'Developer Info - ANRG Laboratory',
        currentPage: 'developer'
    });
});

// News routes
app.get('/news', async (req, res) => {
    try {
        const { category, search, page = 1 } = req.query;
        let allNews = await contentService.getAllNews();
        
        // Filter by category if specified
        if (category && category !== 'all') {
            allNews = await contentService.getNewsByCategory(category);
        }
        
        // Search functionality
        if (search) {
            allNews = await contentService.searchNews(search);
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
            title: 'Latest News - ANRG Laboratory',
            currentPage: 'news',
            news: paginatedNews,
            categories: contentService.getNewsCategories(),
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
    } catch (error) {
        console.error('Error loading news page:', error);
        res.render('news', {
            title: 'Latest News - ANRG Laboratory',
            currentPage: 'news',
            news: [],
            categories: contentService.getNewsCategories(),
            selectedCategory: 'all',
            searchQuery: '',
            pagination: {
                current: 1,
                total: 1,
                hasNext: false,
                hasPrev: false,
                nextPage: 1,
                prevPage: 1
            },
            totalNews: 0
        });
    }
});

app.get('/news/:slug', async (req, res) => {
    try {
        const news = await contentService.getNewsBySlug(req.params.slug);
        
        if (!news) {
            return res.status(404).render('404', {
                title: 'News Not Found - ANRG Laboratory',
                currentPage: 'news'
            });
        }
        
        const relatedNews = await contentService.getRelatedNews(news.id, 3);
        
        res.render('news-detail', {
            title: `${news.title} - ANRG Laboratory`,
            currentPage: 'news',
            news: news,
            relatedNews: relatedNews,
            currentUrl: req.protocol + '://' + req.get('host') + req.originalUrl
        });
    } catch (error) {
        console.error('Error loading news detail:', error);
        res.status(404).render('404', {
            title: 'News Not Found - ANRG Laboratory',
            currentPage: 'news'
        });
    }
});

// Event routes
app.get('/events', async (req, res) => {
    try {
        const { category, type, status, search, page = 1 } = req.query;
        let allEvents = await contentService.getAllEvents();
        
        // Filter by category if specified
        if (category && category !== 'all') {
            allEvents = await contentService.getEventsByCategory(category);
        }
        
        // Filter by status if specified
        if (status && status !== 'all') {
            allEvents = await contentService.getEventsByStatus(status);
        }
        
        // Search functionality
        if (search) {
            allEvents = allEvents.filter(event =>
                event.title.toLowerCase().includes(search.toLowerCase()) ||
                (event.description && event.description.toLowerCase().includes(search.toLowerCase()))
            );
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
            title: 'Upcoming Events - ANRG Laboratory',
            currentPage: 'events',
            events: paginatedEvents,
            categories: contentService.getEventCategories(),
            types: contentService.getEventTypes(),
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
    } catch (error) {
        console.error('Error loading events page:', error);
        res.render('events', {
            title: 'Upcoming Events - ANRG Laboratory',
            currentPage: 'events',
            events: [],
            categories: contentService.getEventCategories(),
            types: contentService.getEventTypes(),
            selectedCategory: 'all',
            selectedType: 'all',
            selectedStatus: 'all',
            searchQuery: '',
            pagination: {
                current: 1,
                total: 1,
                hasNext: false,
                hasPrev: false,
                nextPage: 1,
                prevPage: 1
            },
            totalEvents: 0
        });
    }
});

app.get('/events/:slug', async (req, res) => {
    try {
        const event = await contentService.getEventBySlug(req.params.slug);
        
        if (!event) {
            return res.status(404).render('404', {
                title: 'Event Not Found - ANRG Laboratory',
                currentPage: 'events'
            });
        }
        
        const relatedEvents = await contentService.getRelatedEvents(event.id, 3);
        const availableSpots = event.maxParticipants - event.currentParticipants;
        const isAvailable = availableSpots > 0;
        
        res.render('event-detail', {
            title: `${event.title} - ANRG Laboratory`,
            currentPage: 'events',
            event: event,
            relatedEvents: relatedEvents,
            availableSpots: availableSpots,
            isAvailable: isAvailable,
            currentUrl: req.protocol + '://' + req.get('host') + req.originalUrl
        });
    } catch (error) {
        console.error('Error loading event detail:', error);
        res.status(404).render('404', {
            title: 'Event Not Found - ANRG Laboratory',
            currentPage: 'events'
        });
    }
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
        // Save to database using MySQL adminDB
        const savedContact = await adminDB.saveContact({ 
            name, 
            email, 
            message, 
            service,
            ip: clientIP 
        });
        
        console.log('💾 Contact form submission saved to database');

        // Email to admin
        const adminTemplate = emailTemplates.adminNotification({ name, email, message, service });
        const adminMailOptions = {
            from: email,
            to: process.env.ADMIN_EMAIL || 'admin@anrglaboratory.com',
            subject: adminTemplate.subject,
            html: adminTemplate.html
        };

        // Confirmation email to user
        const userTemplate = emailTemplates.userConfirmation({ name, email, message, service });
        const userMailOptions = {
            from: process.env.EMAIL_USER || 'noreply@anrglaboratory.com',
            to: email,
            subject: userTemplate.subject,
            html: userTemplate.html
        };

        // Send emails jika email sudah dikonfigurasi
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS && 
            process.env.EMAIL_USER !== 'demo@anrglaboratory.com') {
            await transporter.sendMail(adminMailOptions);
            await transporter.sendMail(userMailOptions);
            console.log('📧 Emails sent successfully!');
        } else {
            console.log('📧 Email not configured - check .env file');
        }
        
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
            title: 'Contact Us - ANRG Laboratory',
            currentPage: 'contact',
            success: 'Thank you for your message! We will contact you soon.',
            formData: { name, email, message, service }
        });
    } catch (error) {
        console.error('Error handling contact form submission:', error);
        res.render('contact', { 
            title: 'Contact Us - ANRG Laboratory',
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

// Start server with database initialization
async function startServer() {
    try {
        // Test database connection
        const isConnected = await testConnection();
        if (!isConnected) {
            console.error('❌ Cannot start server - database connection failed');
            process.exit(1);
        }
        
        // Initialize database tables
        await initializeTables();
        
        // Start the server
        app.listen(PORT, () => {
            console.log(`🌐 ANRG Laboratory website running on http://localhost:${PORT}`);
            console.log(`🚀 Website ready! Open your browser and visit the URL above`);
            console.log(`📄 Available pages:`);
            console.log(`   • Home: http://localhost:${PORT}/`);
            console.log(`   • Services: http://localhost:${PORT}/services`);
            console.log(`   • Contact: http://localhost:${PORT}/contact`);
            console.log(`   • News: http://localhost:${PORT}/news`);
            console.log(`   • Events: http://localhost:${PORT}/events`);
            console.log(`   • Team: http://localhost:${PORT}/team`);
            console.log(`   • Developer: http://localhost:${PORT}/developer`);
            console.log(`🔧 Admin Panel:`);
            console.log(`   • Login: http://localhost:${PORT}/admin/login`);
            console.log(`   • Dashboard: http://localhost:${PORT}/admin`);
        });
    } catch (error) {
        console.error('❌ Server startup failed:', error);
        process.exit(1);
    }
}

// Start the server
startServer();
