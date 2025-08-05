const express = require('express');
const multer = require('multer');
const path = require('path');
const adminDB = require('../admin-db-mysql');

const router = express.Router();

// Simple authentication middleware
function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader !== 'Bearer admin123') {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
}

// Configure multer for file uploads - save to memory
const storage = multer.memoryStorage();

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: function (req, file, cb) {
        const allowedTypes = /jpeg|jpg|png|gif|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'));
        }
    }
});

// NEWS ROUTES
router.get('/news', requireAuth, async (req, res) => {
    try {
        const news = await adminDB.getAllNews();
        res.json({
            success: true,
            data: news,
            total: news.length
        });
    } catch (error) {
        console.error('Error getting news:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.get('/news/:id', requireAuth, async (req, res) => {
    try {
        const news = await adminDB.getNewsById(req.params.id);
        if (!news) {
            return res.status(404).json({ success: false, message: 'News not found' });
        }
        res.json({ success: true, data: news });
    } catch (error) {
        console.error('Error getting news by ID:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.post('/news', requireAuth, upload.single('image'), async (req, res) => {
    try {
        const newsData = { ...req.body };
        
        const newNews = await adminDB.addNews(newsData, req.file);
        res.json({ success: true, data: newNews });
    } catch (error) {
        console.error('Error adding news:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.put('/news/:id', requireAuth, upload.single('image'), async (req, res) => {
    try {
        const newsData = { ...req.body };
        
        const updated = await adminDB.updateNews(req.params.id, newsData, req.file);
        if (!updated) {
            return res.status(404).json({ success: false, message: 'News not found' });
        }
        res.json({ success: true, message: 'News updated successfully' });
    } catch (error) {
        console.error('Error updating news:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.delete('/news/:id', requireAuth, async (req, res) => {
    try {
        const deleted = await adminDB.deleteNews(req.params.id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: 'News not found' });
        }
        res.json({ success: true, message: 'News deleted successfully' });
    } catch (error) {
        console.error('Error deleting news:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// EVENTS ROUTES
router.get('/events', requireAuth, async (req, res) => {
    try {
        const events = await adminDB.getAllEvents();
        res.json({
            success: true,
            data: events,
            total: events.length
        });
    } catch (error) {
        console.error('Error getting events:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.get('/events/:id', requireAuth, async (req, res) => {
    try {
        const event = await adminDB.getEventById(req.params.id);
        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }
        res.json({ success: true, data: event });
    } catch (error) {
        console.error('Error getting event by ID:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.post('/events', requireAuth, upload.single('image'), async (req, res) => {
    try {
        const eventData = { ...req.body };
        
        const newEvent = await adminDB.addEvent(eventData, req.file);
        res.json({ success: true, data: newEvent });
    } catch (error) {
        console.error('Error adding event:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.put('/events/:id', requireAuth, upload.single('image'), async (req, res) => {
    try {
        const eventData = { ...req.body };
        
        const updated = await adminDB.updateEvent(req.params.id, eventData, req.file);
        if (!updated) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }
        res.json({ success: true, message: 'Event updated successfully' });
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.delete('/events/:id', requireAuth, async (req, res) => {
    try {
        const deleted = await adminDB.deleteEvent(req.params.id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }
        res.json({ success: true, message: 'Event deleted successfully' });
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// TEAM ROUTES
router.get('/team', requireAuth, async (req, res) => {
    try {
        const team = await adminDB.getAllTeam();
        res.json({
            success: true,
            data: team,
            total: team.length
        });
    } catch (error) {
        console.error('Error getting team:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.get('/team/:id', requireAuth, async (req, res) => {
    try {
        const member = await adminDB.getTeamMemberById(req.params.id);
        if (!member) {
            return res.status(404).json({ success: false, message: 'Team member not found' });
        }
        res.json({ success: true, data: member });
    } catch (error) {
        console.error('Error getting team member by ID:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.post('/team', requireAuth, upload.single('photo'), async (req, res) => {
    try {
        const memberData = { ...req.body };
        
        const newMember = await adminDB.addTeamMember(memberData, req.file);
        res.json({ success: true, data: newMember });
    } catch (error) {
        console.error('Error adding team member:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.put('/team/:id', requireAuth, upload.single('photo'), async (req, res) => {
    try {
        const memberData = { ...req.body };
        
        const updated = await adminDB.updateTeamMember(req.params.id, memberData, req.file);
        if (!updated) {
            return res.status(404).json({ success: false, message: 'Team member not found' });
        }
        res.json({ success: true, message: 'Team member updated successfully' });
    } catch (error) {
        console.error('Error updating team member:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.delete('/team/:id', requireAuth, async (req, res) => {
    try {
        const deleted = await adminDB.deleteTeamMember(req.params.id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: 'Team member not found' });
        }
        res.json({ success: true, message: 'Team member deleted successfully' });
    } catch (error) {
        console.error('Error deleting team member:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// CONTACTS ROUTES
router.get('/contacts', requireAuth, async (req, res) => {
    try {
        const contacts = await adminDB.getAllContacts();
        res.json({
            success: true,
            data: contacts,
            total: contacts.length
        });
    } catch (error) {
        console.error('Error getting contacts:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.put('/contacts/:id/status', requireAuth, async (req, res) => {
    try {
        const { status } = req.body;
        const updated = await adminDB.updateContactStatus(req.params.id, status);
        if (!updated) {
            return res.status(404).json({ success: false, message: 'Contact not found' });
        }
        res.json({ success: true, message: 'Contact status updated successfully' });
    } catch (error) {
        console.error('Error updating contact status:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// DASHBOARD STATS
router.get('/stats', requireAuth, async (req, res) => {
    try {
        const stats = await adminDB.getStats();
        res.json({ success: true, data: stats });
    } catch (error) {
        console.error('Error getting stats:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
