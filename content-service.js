const adminDB = require('./admin-db-mysql');
const newsData = require('./news-data');
const eventData = require('./event-data');

class ContentService {
    // NEWS METHODS
    async getAllNews() {
        try {
            const dbNews = await adminDB.getAllNews();
            
            // Filter hanya yang published
            const publishedNews = dbNews.filter(news => news.status === 'published');
            
            if (publishedNews.length > 0) {
                return this.formatNewsForFrontend(publishedNews);
            } else {
                // Fallback ke dummy data
                return newsData.getAllNews();
            }
        } catch (error) {
            console.error('Error getting news from database, using dummy data:', error);
            return newsData.getAllNews();
        }
    }

    async getNewsBySlug(slug) {
        try {
            const dbNews = await adminDB.getAllNews();
            const news = dbNews.find(item => item.slug === slug && item.status === 'published');
            
            if (news) {
                return this.formatSingleNewsForFrontend(news);
            } else {
                // Fallback ke dummy data
                return newsData.getNewsBySlug(slug);
            }
        } catch (error) {
            console.error('Error getting news by slug from database:', error);
            return newsData.getNewsBySlug(slug);
        }
    }

    async getFeaturedNews(limit = 3) {
        try {
            const allNews = await this.getAllNews();
            return allNews.slice(0, limit);
        } catch (error) {
            console.error('Error getting featured news:', error);
            return newsData.getFeaturedNews(limit);
        }
    }

    async getNewsByCategory(category) {
        try {
            const allNews = await this.getAllNews();
            return allNews.filter(news => news.category === category);
        } catch (error) {
            console.error('Error getting news by category:', error);
            return newsData.getNewsByCategory(category);
        }
    }

    async searchNews(query) {
        try {
            const allNews = await this.getAllNews();
            return allNews.filter(news => 
                news.title.toLowerCase().includes(query.toLowerCase()) ||
                (news.summary && news.summary.toLowerCase().includes(query.toLowerCase()))
            );
        } catch (error) {
            console.error('Error searching news:', error);
            return newsData.searchNews(query);
        }
    }

    getNewsCategories() {
        return ['research', 'announcement', 'achievement', 'collaboration'];
    }

    // EVENTS METHODS
    async getAllEvents() {
        try {
            const dbEvents = await adminDB.getAllEvents();
            
            if (dbEvents.length > 0) {
                return this.formatEventsForFrontend(dbEvents);
            } else {
                // Fallback ke dummy data
                return eventData.getAllEvents();
            }
        } catch (error) {
            console.error('Error getting events from database, using dummy data:', error);
            return eventData.getAllEvents();
        }
    }

    async getEventBySlug(slug) {
        try {
            const dbEvents = await adminDB.getAllEvents();
            const event = dbEvents.find(item => item.slug === slug);
            
            if (event) {
                return this.formatSingleEventForFrontend(event);
            } else {
                // Fallback ke dummy data
                return eventData.getEventBySlug(slug);
            }
        } catch (error) {
            console.error('Error getting event by slug from database:', error);
            return eventData.getEventBySlug(slug);
        }
    }

    async getUpcomingEvents(limit = 3) {
        try {
            const allEvents = await this.getAllEvents();
            const upcoming = allEvents.filter(event => 
                event.status === 'upcoming' || event.status === 'ongoing'
            );
            return upcoming.slice(0, limit);
        } catch (error) {
            console.error('Error getting upcoming events:', error);
            return eventData.getUpcomingEvents(limit);
        }
    }

    async getEventsByCategory(category) {
        try {
            const allEvents = await this.getAllEvents();
            return allEvents.filter(event => event.category === category);
        } catch (error) {
            console.error('Error getting events by category:', error);
            return eventData.getEventsByCategory(category);
        }
    }

    async getEventsByStatus(status) {
        try {
            const allEvents = await this.getAllEvents();
            return allEvents.filter(event => event.status === status);
        } catch (error) {
            console.error('Error getting events by status:', error);
            return eventData.getEventsByStatus(status);
        }
    }

    getEventCategories() {
        return ['conference', 'workshop', 'seminar', 'research', 'collaboration'];
    }

    getEventTypes() {
        return ['online', 'offline', 'hybrid'];
    }

    // TEAM METHODS
    async getAllTeam() {
        try {
            const dbTeam = await adminDB.getAllTeam();
            
            // Filter hanya yang active
            const activeTeam = dbTeam.filter(member => member.status === 'active');
            
            if (activeTeam.length > 0) {
                return this.formatTeamForFrontend(activeTeam);
            } else {
                // Fallback ke data kosong atau bisa ditambahkan dummy data
                return [];
            }
        } catch (error) {
            console.error('Error getting team from database:', error);
            return [];
        }
    }

    async getTeamByRole(role) {
        try {
            const allTeam = await this.getAllTeam();
            return allTeam.filter(member => member.role === role);
        } catch (error) {
            console.error('Error getting team by role:', error);
            return [];
        }
    }

    // FORMAT METHODS
    formatNewsForFrontend(dbNews) {
        return dbNews.map(news => ({
            id: news.id,
            title: news.title,
            slug: news.slug,
            excerpt: news.summary || '',
            content: news.content || '',
            author: 'ANRG Lab',
            category: news.category,
            tags: [news.category],
            imageUrl: `/api/images/news/${news.id}`,
            publishDate: news.publishDate || news.createdAt,
            readTime: Math.ceil((news.content || '').split(' ').length / 200) + ' min read'
        }));
    }

    formatSingleNewsForFrontend(news) {
        return {
            id: news.id,
            title: news.title,
            slug: news.slug,
            excerpt: news.summary || '',
            content: news.content || '',
            author: 'ANRG Lab',
            category: news.category,
            tags: [news.category],
            imageUrl: `/api/images/news/${news.id}`,
            publishDate: news.publishDate || news.createdAt,
            readTime: Math.ceil((news.content || '').split(' ').length / 200) + ' min read'
        };
    }

    formatEventsForFrontend(dbEvents) {
        return dbEvents.map(event => ({
            id: event.id,
            title: event.title,
            slug: event.slug,
            description: event.description || '',
            content: event.content || '',
            date: event.date,
            time: event.time || '09:00',
            location: event.location || 'TBA',
            organizer: event.organizer || 'ANRG Laboratory',
            imageUrl: `/api/images/events/${event.id}`,
            registrationLink: event.registrationLink || null,
            status: event.status,
            category: 'seminar',
            type: 'offline',
            price: event.price || 0,
            maxParticipants: 100,
            currentParticipants: Math.floor(Math.random() * 80)
        }));
    }

    formatSingleEventForFrontend(event) {
        return {
            id: event.id,
            title: event.title,
            slug: event.slug,
            description: event.description || '',
            content: event.content || '',
            date: event.date,
            time: event.time || '09:00',
            location: event.location || 'TBA',
            organizer: event.organizer || 'ANRG Laboratory',
            imageUrl: `/api/images/events/${event.id}`,
            registrationLink: event.registrationLink || null,
            status: event.status,
            category: 'seminar',
            type: 'offline',
            price: event.price || 0,
            maxParticipants: 100,
            currentParticipants: Math.floor(Math.random() * 80)
        };
    }

    formatTeamForFrontend(dbTeam) {
        return dbTeam.map(member => ({
            id: member.id,
            name: member.name,
            role: member.role,
            title: this.getRoleTitle(member.role),
            email: member.email || '',
            phone: member.phone || '',
            specialization: member.specialization || '',
            bio: member.bio || '',
            image: `/api/images/team/${member.id}`,
            social: {
                linkedin: member.linkedin || '',
                scholar: member.scholar || '',
                email: member.email || ''
            }
        }));
    }

    getRoleTitle(role) {
        const roleTitles = {
            'advisor': 'Academic Advisor',
            'researcher': 'Senior Researcher',
            'student': 'Research Student',
            'alumni': 'Alumni'
        };
        return roleTitles[role] || role;
    }

    // HELPER METHODS
    async getRelatedNews(newsId, limit = 3) {
        try {
            const allNews = await this.getAllNews();
            const filtered = allNews.filter(news => news.id != newsId);
            return filtered.slice(0, limit);
        } catch (error) {
            console.error('Error getting related news:', error);
            return [];
        }
    }

    async getRelatedEvents(eventId, limit = 3) {
        try {
            const allEvents = await this.getAllEvents();
            const filtered = allEvents.filter(event => event.id != eventId);
            return filtered.slice(0, limit);
        } catch (error) {
            console.error('Error getting related events:', error);
            return [];
        }
    }
}

module.exports = new ContentService();
