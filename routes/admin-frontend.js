const express = require('express');
const router = express.Router();

// Admin Dashboard Routes (Frontend)
router.get('/', (req, res) => {
    res.render('admin/dashboard', {
        title: 'Admin Dashboard - ANRG Laboratory'
    });
});

router.get('/login', (req, res) => {
    res.render('admin/login', {
        title: 'Admin Login - ANRG Laboratory'
    });
});

router.get('/news', (req, res) => {
    res.render('admin/news', {
        title: 'News Management - ANRG Laboratory'
    });
});

router.get('/events', (req, res) => {
    res.render('admin/events', {
        title: 'Events Management - ANRG Laboratory'
    });
});

router.get('/team', (req, res) => {
    res.render('admin/team', {
        title: 'Team Management - ANRG Laboratory'
    });
});

module.exports = router;
