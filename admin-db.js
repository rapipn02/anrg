// Database management for News, Events, and Team
const fs = require('fs');
const path = require('path');

class AdminDB {
    constructor() {
        this.dataPath = path.join(__dirname, 'data');
        this.newsPath = path.join(this.dataPath, 'news.json');
        this.eventsPath = path.join(this.dataPath, 'events.json');
        this.teamPath = path.join(this.dataPath, 'team.json');
        
        // Ensure data directory exists
        if (!fs.existsSync(this.dataPath)) {
            fs.mkdirSync(this.dataPath, { recursive: true });
        }
        
        // Initialize files if they don't exist
        this.initializeFiles();
    }
    
    initializeFiles() {
        if (!fs.existsSync(this.newsPath)) {
            this.saveNews([]);
        }
        if (!fs.existsSync(this.eventsPath)) {
            this.saveEvents([]);
        }
        if (!fs.existsSync(this.teamPath)) {
            this.saveTeam([]);
        }
    }
    
    // Helper methods
    generateId() {
        return Date.now().toString() + Math.random().toString(36).substr(2, 9);
    }
    
    generateSlug(title) {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim('-');
    }
    
    // NEWS METHODS
    getAllNews() {
        try {
            const data = fs.readFileSync(this.newsPath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }
    
    saveNews(news) {
        fs.writeFileSync(this.newsPath, JSON.stringify(news, null, 2));
    }
    
    addNews(newsData) {
        const news = this.getAllNews();
        const newNews = {
            id: this.generateId(),
            ...newsData,
            slug: this.generateSlug(newsData.title),
            publishDate: newsData.publishDate || new Date().toISOString().split('T')[0],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        news.unshift(newNews);
        this.saveNews(news);
        return newNews;
    }
    
    updateNews(id, newsData) {
        const news = this.getAllNews();
        const index = news.findIndex(item => item.id === id);
        
        if (index !== -1) {
            news[index] = {
                ...news[index],
                ...newsData,
                slug: newsData.title ? this.generateSlug(newsData.title) : news[index].slug,
                updatedAt: new Date().toISOString()
            };
            this.saveNews(news);
            return news[index];
        }
        return null;
    }
    
    deleteNews(id) {
        const news = this.getAllNews();
        const filteredNews = news.filter(item => item.id !== id);
        
        if (filteredNews.length !== news.length) {
            this.saveNews(filteredNews);
            return true;
        }
        return false;
    }
    
    getNewsById(id) {
        const news = this.getAllNews();
        return news.find(item => item.id === id);
    }
    
    // EVENTS METHODS
    getAllEvents() {
        try {
            const data = fs.readFileSync(this.eventsPath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }
    
    saveEvents(events) {
        fs.writeFileSync(this.eventsPath, JSON.stringify(events, null, 2));
    }
    
    addEvent(eventData) {
        const events = this.getAllEvents();
        const newEvent = {
            id: this.generateId(),
            ...eventData,
            slug: this.generateSlug(eventData.title),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        events.unshift(newEvent);
        this.saveEvents(events);
        return newEvent;
    }
    
    updateEvent(id, eventData) {
        const events = this.getAllEvents();
        const index = events.findIndex(item => item.id === id);
        
        if (index !== -1) {
            events[index] = {
                ...events[index],
                ...eventData,
                slug: eventData.title ? this.generateSlug(eventData.title) : events[index].slug,
                updatedAt: new Date().toISOString()
            };
            this.saveEvents(events);
            return events[index];
        }
        return null;
    }
    
    deleteEvent(id) {
        const events = this.getAllEvents();
        const filteredEvents = events.filter(item => item.id !== id);
        
        if (filteredEvents.length !== events.length) {
            this.saveEvents(filteredEvents);
            return true;
        }
        return false;
    }
    
    getEventById(id) {
        const events = this.getAllEvents();
        return events.find(item => item.id === id);
    }
    
    // TEAM METHODS
    getAllTeam() {
        try {
            const data = fs.readFileSync(this.teamPath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }
    
    saveTeam(team) {
        fs.writeFileSync(this.teamPath, JSON.stringify(team, null, 2));
    }
    
    addTeamMember(memberData) {
        const team = this.getAllTeam();
        const newMember = {
            id: this.generateId(),
            ...memberData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        team.push(newMember);
        this.saveTeam(team);
        return newMember;
    }
    
    updateTeamMember(id, memberData) {
        const team = this.getAllTeam();
        const index = team.findIndex(item => item.id === id);
        
        if (index !== -1) {
            team[index] = {
                ...team[index],
                ...memberData,
                updatedAt: new Date().toISOString()
            };
            this.saveTeam(team);
            return team[index];
        }
        return null;
    }
    
    deleteTeamMember(id) {
        const team = this.getAllTeam();
        const filteredTeam = team.filter(item => item.id !== id);
        
        if (filteredTeam.length !== team.length) {
            this.saveTeam(filteredTeam);
            return true;
        }
        return false;
    }
    
    getTeamMemberById(id) {
        const team = this.getAllTeam();
        return team.find(item => item.id === id);
    }
}

module.exports = new AdminDB();
