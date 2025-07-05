// Simple JSON file database untuk menyimpan contact form submissions
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'data', 'contacts.json');

// Pastikan folder data exists
if (!fs.existsSync(path.dirname(dbPath))) {
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
}

// Initialize file jika belum ada
if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify([]));
}

// Save contact to JSON file
function saveContact(contactData) {
    try {
        const contacts = JSON.parse(fs.readFileSync(dbPath));
        const newContact = {
            id: Date.now(),
            ...contactData,
            timestamp: new Date().toISOString(),
            status: 'new'
        };
        contacts.push(newContact);
        fs.writeFileSync(dbPath, JSON.stringify(contacts, null, 2));
        return newContact;
    } catch (error) {
        console.error('Error saving contact:', error);
        return null;
    }
}

// Get all contacts
function getAllContacts() {
    try {
        return JSON.parse(fs.readFileSync(dbPath));
    } catch (error) {
        console.error('Error reading contacts:', error);
        return [];
    }
}

// Get contact by ID
function getContactById(id) {
    const contacts = getAllContacts();
    return contacts.find(contact => contact.id === parseInt(id));
}

// Update contact status
function updateContactStatus(id, status) {
    try {
        const contacts = getAllContacts();
        const contactIndex = contacts.findIndex(contact => contact.id === parseInt(id));
        if (contactIndex !== -1) {
            contacts[contactIndex].status = status;
            contacts[contactIndex].updatedAt = new Date().toISOString();
            fs.writeFileSync(dbPath, JSON.stringify(contacts, null, 2));
            return contacts[contactIndex];
        }
        return null;
    } catch (error) {
        console.error('Error updating contact:', error);
        return null;
    }
}

module.exports = {
    saveContact,
    getAllContacts,
    getContactById,
    updateContactStatus
};
