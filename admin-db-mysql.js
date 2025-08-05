const { pool, generateSlug } = require('./database');

class AdminDB {
    constructor() {
        // MySQL connection handled by pool
    }

    // NEWS METHODS
    async getAllNews() {
        try {
            const [rows] = await pool.execute(
                'SELECT * FROM news ORDER BY createdAt DESC'
            );
            return rows;
        } catch (error) {
            console.error('Error getting all news:', error);
            throw error;
        }
    }

    async getNewsById(id) {
        try {
            const [rows] = await pool.execute(
                'SELECT * FROM news WHERE id = ?',
                [id]
            );
            return rows[0] || null;
        } catch (error) {
            console.error('Error getting news by ID:', error);
            throw error;
        }
    }

    async addNews(newsData, imageFile = null) {
        try {
            const slug = generateSlug(newsData.title);
            const publishDate = newsData.status === 'published' ? new Date().toISOString().split('T')[0] : null;
            
            let imageData = null;
            let imageMimeType = null;
            
            if (imageFile) {
                imageData = imageFile.buffer;
                imageMimeType = imageFile.mimetype;
            }
            
            const [result] = await pool.execute(
                `INSERT INTO news (title, slug, summary, content, category, image, imageData, imageMimeType, status, publishDate) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    newsData.title,
                    slug,
                    newsData.summary || '',
                    newsData.content || '',
                    newsData.category,
                    newsData.image || null,
                    imageData,
                    imageMimeType,
                    newsData.status || 'draft',
                    publishDate
                ]
            );
            
            return { id: result.insertId, ...newsData, slug, publishDate };
        } catch (error) {
            console.error('Error adding news:', error);
            throw error;
        }
    }

    async updateNews(id, newsData, imageFile = null) {
        try {
            const slug = generateSlug(newsData.title);
            const publishDate = newsData.status === 'published' ? new Date().toISOString().split('T')[0] : null;
            
            let updateQuery = `UPDATE news SET title = ?, slug = ?, summary = ?, content = ?, 
                 category = ?, image = ?, status = ?, publishDate = ?, updatedAt = CURRENT_TIMESTAMP`;
            
            let updateParams = [
                newsData.title,
                slug,
                newsData.summary || '',
                newsData.content || '',
                newsData.category,
                newsData.image || null,
                newsData.status || 'draft',
                publishDate
            ];
            
            if (imageFile) {
                updateQuery += `, imageData = ?, imageMimeType = ?`;
                updateParams.push(imageFile.buffer, imageFile.mimetype);
            }
            
            updateQuery += ` WHERE id = ?`;
            updateParams.push(id);
            
            const [result] = await pool.execute(updateQuery, updateParams);
            
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error updating news:', error);
            throw error;
        }
    }

    async deleteNews(id) {
        try {
            const [result] = await pool.execute(
                'DELETE FROM news WHERE id = ?',
                [id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error deleting news:', error);
            throw error;
        }
    }

    // EVENTS METHODS
    async getAllEvents() {
        try {
            const [rows] = await pool.execute(
                'SELECT * FROM events ORDER BY date DESC'
            );
            return rows;
        } catch (error) {
            console.error('Error getting all events:', error);
            throw error;
        }
    }

    async getEventById(id) {
        try {
            const [rows] = await pool.execute(
                'SELECT * FROM events WHERE id = ?',
                [id]
            );
            return rows[0] || null;
        } catch (error) {
            console.error('Error getting event by ID:', error);
            throw error;
        }
    }

    async addEvent(eventData, imageFile = null) {
        try {
            const slug = generateSlug(eventData.title);
            
            let imageData = null;
            let imageMimeType = null;
            
            if (imageFile) {
                imageData = imageFile.buffer;
                imageMimeType = imageFile.mimetype;
            }
            
            const [result] = await pool.execute(
                `INSERT INTO events (title, slug, description, content, date, time, location, 
                 organizer, image, imageData, imageMimeType, registrationLink, price, status) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    eventData.title,
                    slug,
                    eventData.description || '',
                    eventData.content || '',
                    eventData.date,
                    eventData.time || null,
                    eventData.location || '',
                    eventData.organizer || '',
                    eventData.image || null,
                    imageData,
                    imageMimeType,
                    eventData.registrationLink || null,
                    eventData.price || 0,
                    eventData.status || 'upcoming'
                ]
            );
            
            return { id: result.insertId, ...eventData, slug };
        } catch (error) {
            console.error('Error adding event:', error);
            throw error;
        }
    }

    async updateEvent(id, eventData, imageFile = null) {
        try {
            const slug = generateSlug(eventData.title);
            
            let updateQuery = `UPDATE events SET title = ?, slug = ?, description = ?, content = ?, 
                 date = ?, time = ?, location = ?, organizer = ?, image = ?, 
                 registrationLink = ?, price = ?, status = ?, updatedAt = CURRENT_TIMESTAMP`;
            
            let updateParams = [
                eventData.title,
                slug,
                eventData.description || '',
                eventData.content || '',
                eventData.date,
                eventData.time || null,
                eventData.location || '',
                eventData.organizer || '',
                eventData.image || null,
                eventData.registrationLink || null,
                eventData.price || 0,
                eventData.status || 'upcoming'
            ];
            
            if (imageFile) {
                updateQuery += `, imageData = ?, imageMimeType = ?`;
                updateParams.push(imageFile.buffer, imageFile.mimetype);
            }
            
            updateQuery += ` WHERE id = ?`;
            updateParams.push(id);
            
            const [result] = await pool.execute(updateQuery, updateParams);
            
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error updating event:', error);
            throw error;
        }
    }

    async deleteEvent(id) {
        try {
            const [result] = await pool.execute(
                'DELETE FROM events WHERE id = ?',
                [id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error deleting event:', error);
            throw error;
        }
    }

    // TEAM METHODS
    async getAllTeam() {
        try {
            const [rows] = await pool.execute(
                'SELECT * FROM team ORDER BY role, name'
            );
            return rows;
        } catch (error) {
            console.error('Error getting all team:', error);
            throw error;
        }
    }

    async getTeamMemberById(id) {
        try {
            const [rows] = await pool.execute(
                'SELECT * FROM team WHERE id = ?',
                [id]
            );
            return rows[0] || null;
        } catch (error) {
            console.error('Error getting team member by ID:', error);
            throw error;
        }
    }

    async addTeamMember(memberData, photoFile = null) {
        try {
            let photoData = null;
            let photoMimeType = null;
            
            if (photoFile) {
                photoData = photoFile.buffer;
                photoMimeType = photoFile.mimetype;
            }
            
            const [result] = await pool.execute(
                `INSERT INTO team (name, role, email, phone, specialization, bio, 
                 photo, photoData, photoMimeType, linkedin, scholar, status) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    memberData.name,
                    memberData.role,
                    memberData.email || null,
                    memberData.phone || null,
                    memberData.specialization || '',
                    memberData.bio || '',
                    memberData.photo || null,
                    photoData,
                    photoMimeType,
                    memberData.linkedin || null,
                    memberData.scholar || null,
                    memberData.status || 'active'
                ]
            );
            
            return { id: result.insertId, ...memberData };
        } catch (error) {
            console.error('Error adding team member:', error);
            throw error;
        }
    }

    async updateTeamMember(id, memberData, photoFile = null) {
        try {
            let updateQuery = `UPDATE team SET name = ?, role = ?, email = ?, phone = ?, 
                 specialization = ?, bio = ?, photo = ?, linkedin = ?, 
                 scholar = ?, status = ?, updatedAt = CURRENT_TIMESTAMP`;
            
            let updateParams = [
                memberData.name,
                memberData.role,
                memberData.email || null,
                memberData.phone || null,
                memberData.specialization || '',
                memberData.bio || '',
                memberData.photo || null,
                memberData.linkedin || null,
                memberData.scholar || null,
                memberData.status || 'active'
            ];
            
            if (photoFile) {
                updateQuery += `, photoData = ?, photoMimeType = ?`;
                updateParams.push(photoFile.buffer, photoFile.mimetype);
            }
            
            updateQuery += ` WHERE id = ?`;
            updateParams.push(id);
            
            const [result] = await pool.execute(updateQuery, updateParams);
            
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error updating team member:', error);
            throw error;
        }
    }

    async deleteTeamMember(id) {
        try {
            const [result] = await pool.execute(
                'DELETE FROM team WHERE id = ?',
                [id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error deleting team member:', error);
            throw error;
        }
    }

    // CONTACTS METHODS
    async getAllContacts() {
        try {
            const [rows] = await pool.execute(
                'SELECT * FROM contacts ORDER BY createdAt DESC'
            );
            return rows;
        } catch (error) {
            console.error('Error getting all contacts:', error);
            throw error;
        }
    }

    async saveContact(contactData) {
        try {
            const [result] = await pool.execute(
                `INSERT INTO contacts (name, email, service, message, ip) 
                 VALUES (?, ?, ?, ?, ?)`,
                [
                    contactData.name,
                    contactData.email,
                    contactData.service || null,
                    contactData.message,
                    contactData.ip || null
                ]
            );
            
            return { id: result.insertId, ...contactData };
        } catch (error) {
            console.error('Error saving contact:', error);
            throw error;
        }
    }

    async updateContactStatus(id, status) {
        try {
            const [result] = await pool.execute(
                'UPDATE contacts SET status = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
                [status, id]
            );
            
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error updating contact status:', error);
            throw error;
        }
    }

    // STATISTICS
    async getStats() {
        try {
            const [newsCount] = await pool.execute('SELECT COUNT(*) as count FROM news');
            const [eventsCount] = await pool.execute('SELECT COUNT(*) as count FROM events');
            const [teamCount] = await pool.execute('SELECT COUNT(*) as count FROM team');
            const [contactsCount] = await pool.execute('SELECT COUNT(*) as count FROM contacts');
            
            return {
                news: newsCount[0].count,
                events: eventsCount[0].count,
                team: teamCount[0].count,
                contacts: contactsCount[0].count
            };
        } catch (error) {
            console.error('Error getting stats:', error);
            throw error;
        }
    }
}

module.exports = new AdminDB();
