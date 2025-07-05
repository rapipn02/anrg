const fs = require('fs');
const https = require('https');
const path = require('path');

// SSL Configuration for HTTPS
// In production, use real SSL certificates from Let's Encrypt or commercial CA

const sslConfig = {
    // For development - self-signed certificates
    // Generate with: openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365 -nodes
    key: process.env.SSL_KEY || null, // Path to private key
    cert: process.env.SSL_CERT || null, // Path to certificate
    
    // HTTPS options
    options: {
        // Force HTTPS redirect
        httpsRedirect: process.env.HTTPS_REDIRECT === 'true',
        // HSTS (HTTP Strict Transport Security)
        hsts: {
            maxAge: 31536000, // 1 year
            includeSubDomains: true,
            preload: true
        }
    }
};

// Middleware to force HTTPS
const httpsRedirect = (req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
        res.redirect(`https://${req.header('host')}${req.url}`);
    } else {
        next();
    }
};

// Security headers middleware
const securityHeaders = (req, res, next) => {
    // HSTS Header
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    
    // Other security headers
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    next();
};

// Create HTTPS server if certificates are available
const createHttpsServer = (app) => {
    if (sslConfig.key && sslConfig.cert && fs.existsSync(sslConfig.key) && fs.existsSync(sslConfig.cert)) {
        const options = {
            key: fs.readFileSync(sslConfig.key),
            cert: fs.readFileSync(sslConfig.cert)
        };
        
        return https.createServer(options, app);
    }
    return null;
};

module.exports = {
    sslConfig,
    httpsRedirect,
    securityHeaders,
    createHttpsServer
};
