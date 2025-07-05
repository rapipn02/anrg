// Form validation and security functions
const validator = require('validator');

const formValidation = {
    // Validate contact form data
    validateContactForm: (data) => {
        const errors = [];
        
        // Name validation
        if (!data.name || data.name.trim().length < 2) {
            errors.push('Name must be at least 2 characters long');
        }
        if (data.name && data.name.length > 100) {
            errors.push('Name must be less than 100 characters');
        }
        
        // Email validation
        if (!data.email || !validator.isEmail(data.email)) {
            errors.push('Please provide a valid email address');
        }
        
        // Message validation
        if (!data.message || data.message.trim().length < 10) {
            errors.push('Message must be at least 10 characters long');
        }
        if (data.message && data.message.length > 1000) {
            errors.push('Message must be less than 1000 characters');
        }
        
        // Service validation
        const validServices = [
            'Vulnerability Assessment', 
            'Penetration Testing', 
            'Security Consultation', 
            'Compliance Audit',
            'Incident Response',
            'Security Training'
        ];
        if (!data.service || !validServices.includes(data.service)) {
            errors.push('Please select a valid service');
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    },
    
    // Sanitize input data
    sanitizeInput: (data) => {
        return {
            name: validator.escape(data.name?.trim() || ''),
            email: validator.normalizeEmail(data.email?.trim() || ''),
            message: validator.escape(data.message?.trim() || ''),
            service: validator.escape(data.service?.trim() || '')
        };
    },
    
    // Rate limiting check (simple implementation)
    checkRateLimit: (ip, timeWindow = 300000, maxRequests = 5) => {
        // In production, use Redis or proper rate limiting
        // This is a simple in-memory implementation
        if (!global.rateLimitStore) {
            global.rateLimitStore = new Map();
        }
        
        const now = Date.now();
        const windowStart = now - timeWindow;
        
        if (!global.rateLimitStore.has(ip)) {
            global.rateLimitStore.set(ip, []);
        }
        
        const requests = global.rateLimitStore.get(ip);
        
        // Remove old requests outside time window
        const recentRequests = requests.filter(time => time > windowStart);
        
        if (recentRequests.length >= maxRequests) {
            return {
                allowed: false,
                resetTime: Math.ceil((recentRequests[0] + timeWindow - now) / 1000)
            };
        }
        
        // Add current request
        recentRequests.push(now);
        global.rateLimitStore.set(ip, recentRequests);
        
        return {
            allowed: true,
            remaining: maxRequests - recentRequests.length
        };
    }
};

module.exports = formValidation;
