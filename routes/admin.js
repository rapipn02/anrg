const express = require('express');
const router = express.Router();
const adminDB = require('../admin-db-mysql');

// Simple authentication middleware
function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader !== 'Bearer admin123') {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
}

// NEWS ROUTES

// Get all news
router.get('/news', requireAuth, (req, res) => {
    try {
        const news = adminDB.getAllNews();
        res.json({
            success: true,
            data: news,
            total: news.length
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch news' });
    }
});

// Get single news
router.get('/news/:id', requireAuth, (req, res) => {
    try {
        const news = adminDB.getNewsById(req.params.id);
        if (news) {
            res.json({ success: true, data: news });
        } else {
            res.status(404).json({ error: 'News not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch news' });
    }
});

// Create news
router.post('/news', requireAuth, (req, res) => {
    try {
        const { title, excerpt, content, author, category, tags, imageUrl, readTime } = req.body;
        
        if (!title || !excerpt || !content) {
            return res.status(400).json({ error: 'Title, excerpt, and content are required' });
        }
        
        const newsData = {
            title,
            excerpt,
            content,
            author: author || 'Admin',
            category: category || 'General',
            tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()) : []),
            imageUrl: imageUrl || '/images/news/default.jpg',
            readTime: readTime || '5 menit'
        };
        
        const newNews = adminDB.addNews(newsData);
        res.status(201).json({ success: true, data: newNews });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create news' });
    }
});

// Update news
router.put('/news/:id', requireAuth, (req, res) => {
    try {
        const updatedNews = adminDB.updateNews(req.params.id, req.body);
        if (updatedNews) {
            res.json({ success: true, data: updatedNews });
        } else {
            res.status(404).json({ error: 'News not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update news' });
    }
});

// Delete news
router.delete('/news/:id', requireAuth, (req, res) => {
    try {
        const deleted = adminDB.deleteNews(req.params.id);
        if (deleted) {
            res.json({ success: true, message: 'News deleted successfully' });
        } else {
            res.status(404).json({ error: 'News not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete news' });
    }
});

// EVENTS ROUTES

// Get all events
router.get('/events', requireAuth, (req, res) => {
    try {
        const events = adminDB.getAllEvents();
        res.json({
            success: true,
            data: events,
            total: events.length
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch events' });
    }
});

// Get single event
router.get('/events/:id', requireAuth, (req, res) => {
    try {
        const event = adminDB.getEventById(req.params.id);
        if (event) {
            res.json({ success: true, data: event });
        } else {
            res.status(404).json({ error: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch event' });
    }
});

// Create event
router.post('/events', requireAuth, (req, res) => {
    try {
        const { 
            title, description, content, date, time, location, type, 
            category, status, price, spotsLeft, level, image 
        } = req.body;
        
        if (!title || !description || !date) {
            return res.status(400).json({ error: 'Title, description, and date are required' });
        }
        
        const eventData = {
            title,
            description,
            content: content || description,
            date,
            time: time || '09:00',
            location: location || 'Online',
            type: type || 'online',
            category: category || 'workshop',
            status: status || 'upcoming',
            price: parseInt(price) || 0,
            spotsLeft: parseInt(spotsLeft) || 50,
            level: level || 'beginner',
            image: image || '/images/events/default.jpg'
        };
        
        const newEvent = adminDB.addEvent(eventData);
        res.status(201).json({ success: true, data: newEvent });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create event' });
    }
});

// Update event
router.put('/events/:id', requireAuth, (req, res) => {
    try {
        const updatedEvent = adminDB.updateEvent(req.params.id, req.body);
        if (updatedEvent) {
            res.json({ success: true, data: updatedEvent });
        } else {
            res.status(404).json({ error: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update event' });
    }
});

// Delete event
router.delete('/events/:id', requireAuth, (req, res) => {
    try {
        const deleted = adminDB.deleteEvent(req.params.id);
        if (deleted) {
            res.json({ success: true, message: 'Event deleted successfully' });
        } else {
            res.status(404).json({ error: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete event' });
    }
});

// TEAM ROUTES

// Get all team members
router.get('/team', requireAuth, (req, res) => {
    try {
        const team = adminDB.getAllTeam();
        res.json({
            success: true,
            data: team,
            total: team.length
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch team' });
    }
});

// Get single team member
router.get('/team/:id', requireAuth, (req, res) => {
    try {
        const member = adminDB.getTeamMemberById(req.params.id);
        if (member) {
            res.json({ success: true, data: member });
        } else {
            res.status(404).json({ error: 'Team member not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch team member' });
    }
});

// Create team member
router.post('/team', requireAuth, (req, res) => {
    try {
        const { name, position, bio, image, skills, social } = req.body;
        
        if (!name || !position) {
            return res.status(400).json({ error: 'Name and position are required' });
        }
        
        const memberData = {
            name,
            position,
            bio: bio || '',
            image: image || '/images/team/default.jpg',
            skills: Array.isArray(skills) ? skills : (skills ? skills.split(',').map(s => s.trim()) : []),
            social: social || {}
        };
        
        const newMember = adminDB.addTeamMember(memberData);
        res.status(201).json({ success: true, data: newMember });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create team member' });
    }
});

// Update team member
router.put('/team/:id', requireAuth, (req, res) => {
    try {
        const updatedMember = adminDB.updateTeamMember(req.params.id, req.body);
        if (updatedMember) {
            res.json({ success: true, data: updatedMember });
        } else {
            res.status(404).json({ error: 'Team member not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update team member' });
    }
});

// Delete team member
router.delete('/team/:id', requireAuth, (req, res) => {
    try {
        const deleted = adminDB.deleteTeamMember(req.params.id);
        if (deleted) {
            res.json({ success: true, message: 'Team member deleted successfully' });
        } else {
            res.status(404).json({ error: 'Team member not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete team member' });
    }
});

module.exports = router;
