const express = require('express');
const router = express.Router();
const { pool } = require('../database');

// API endpoint untuk serve gambar news
router.get('/news/:id', async (req, res) => {
    try {
        const [rows] = await pool.execute(
            'SELECT imageData, imageMimeType, image FROM news WHERE id = ?',
            [req.params.id]
        );
        
        if (rows.length === 0) {
            return res.status(404).json({ error: 'News not found' });
        }
        
        const news = rows[0];
        
        if (news.imageData) {
            // Jika ada data gambar di database, serve dari database
            res.set('Content-Type', news.imageMimeType || 'image/jpeg');
            res.set('Cache-Control', 'public, max-age=86400'); // Cache 24 jam
            res.send(news.imageData);
        } else if (news.image) {
            // Jika tidak ada data di database tapi ada nama file, redirect ke file
            res.redirect(`/images/news/${news.image}`);
        } else {
            // Jika tidak ada gambar sama sekali, return default
            res.redirect('/images/default-news.jpg');
        }
    } catch (error) {
        console.error('Error serving news image:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API endpoint untuk serve gambar events
router.get('/events/:id', async (req, res) => {
    try {
        const [rows] = await pool.execute(
            'SELECT imageData, imageMimeType, image FROM events WHERE id = ?',
            [req.params.id]
        );
        
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }
        
        const event = rows[0];
        
        if (event.imageData) {
            // Jika ada data gambar di database, serve dari database
            res.set('Content-Type', event.imageMimeType || 'image/jpeg');
            res.set('Cache-Control', 'public, max-age=86400'); // Cache 24 jam
            res.send(event.imageData);
        } else if (event.image) {
            // Jika tidak ada data di database tapi ada nama file, redirect ke file
            res.redirect(`/images/events/${event.image}`);
        } else {
            // Jika tidak ada gambar sama sekali, return default
            res.redirect('/images/default-event.jpg');
        }
    } catch (error) {
        console.error('Error serving event image:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API endpoint untuk serve foto team
router.get('/team/:id', async (req, res) => {
    try {
        const [rows] = await pool.execute(
            'SELECT photoData, photoMimeType, photo FROM team WHERE id = ?',
            [req.params.id]
        );
        
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Team member not found' });
        }
        
        const member = rows[0];
        
        if (member.photoData) {
            // Jika ada data foto di database, serve dari database
            res.set('Content-Type', member.photoMimeType || 'image/jpeg');
            res.set('Cache-Control', 'public, max-age=86400'); // Cache 24 jam
            res.send(member.photoData);
        } else if (member.photo) {
            // Jika tidak ada data di database tapi ada nama file, redirect ke file
            res.redirect(`/images/team/${member.photo}`);
        } else {
            // Jika tidak ada foto sama sekali, return default
            res.redirect('/images/default-avatar.svg');
        }
    } catch (error) {
        console.error('Error serving team photo:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
