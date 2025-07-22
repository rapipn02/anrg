// Event data for MBC Laboratory
const eventData = [
    {
        id: 1,
        title: "Cybersecurity Summit 2024: Future of Digital Protection",
        slug: "cybersecurity-summit-2024-future-digital-protection",
        description: "Join industry leaders and cybersecurity experts for a comprehensive discussion on the future of digital protection, emerging threats, and innovative security solutions.",
        content: `
            <p>MBC Laboratory proudly presents the Cybersecurity Summit 2024, a premier event bringing together industry leaders, security professionals, and technology innovators to discuss the evolving landscape of digital protection.</p>
            
            <h3>Event Highlights</h3>
            <ul>
                <li><strong>Keynote Presentations:</strong> Insights from renowned cybersecurity experts and industry pioneers</li>
                <li><strong>Technical Workshops:</strong> Hands-on sessions covering the latest security tools and techniques</li>
                <li><strong>Panel Discussions:</strong> Deep dive into current threats and future challenges</li>
                <li><strong>Networking Sessions:</strong> Connect with peers and industry professionals</li>
                <li><strong>Product Demonstrations:</strong> Latest cybersecurity solutions and technologies</li>
            </ul>
            
            <h3>Agenda Overview</h3>
            <h4>Day 1: Threat Landscape & Emerging Technologies</h4>
            <ul>
                <li>09:00 - Opening Keynote: "The Evolution of Cyber Threats"</li>
                <li>10:30 - Workshop: "AI-Powered Security Solutions"</li>
                <li>13:00 - Panel: "Zero Trust Architecture Implementation"</li>
                <li>15:30 - Technical Session: "Advanced Threat Hunting"</li>
            </ul>
            
            <h4>Day 2: Practical Implementation & Future Trends</h4>
            <ul>
                <li>09:00 - Keynote: "Building Resilient Security Frameworks"</li>
                <li>10:30 - Workshop: "Incident Response Best Practices"</li>
                <li>13:00 - Panel: "Regulatory Compliance in Digital Age"</li>
                <li>15:30 - Closing Session: "Future of Cybersecurity"</li>
            </ul>
            
            <h3>Target Audience</h3>
            <ul>
                <li>Chief Information Security Officers (CISOs)</li>
                <li>IT Security Managers and Analysts</li>
                <li>Penetration Testers and Ethical Hackers</li>
                <li>Compliance and Risk Management Professionals</li>
                <li>Technology Consultants and Solution Architects</li>
            </ul>
            
            <h3>What You'll Gain</h3>
            <ul>
                <li>Latest insights on cybersecurity trends and threats</li>
                <li>Practical knowledge and implementation strategies</li>
                <li>Networking opportunities with industry experts</li>
                <li>Certificate of participation</li>
                <li>Access to exclusive resources and whitepapers</li>
            </ul>
        `,
        startDate: "2025-08-15",
        endDate: "2025-08-16",
        startTime: "09:00",
        endTime: "17:00",
        venue: "Jakarta Convention Center",
        address: "Jl. Gatot Subroto, Jakarta Pusat, DKI Jakarta",
        capacity: 500,
        registeredCount: 287,
        price: "Rp 2.500.000",
        earlyBirdPrice: "Rp 1.999.000",
        category: "Conference",
        type: "Hybrid", // Online, Offline, Hybrid
        level: "Intermediate", // Beginner, Intermediate, Advanced
        duration: "2 days", // Duration of the event
        status: "open", // open, closed, cancelled, completed
        organizer: "MBC Laboratory",
        speakers: [
            {
                name: "Dr. Sarah Chen",
                title: "Chief Security Officer, TechCorp",
                bio: "Leading cybersecurity expert with 15+ years of experience",
                image: "/images/speakers/sarah-chen.jpg"
            },
            {
                name: "Ahmad Rizky",
                title: "Senior Penetration Tester, MBC Laboratory",
                bio: "Certified ethical hacker and security consultant",
                image: "/images/speakers/ahmad-rizky.jpg"
            }
        ],
        tags: ["cybersecurity", "conference", "networking", "ai", "zero-trust"],
        imageUrl: "/images/events/cybersecurity-summit-2024.jpg",
        image: "/images/events/cybersecurity-summit-2024.jpg", // For template compatibility
        date: "2025-08-15", // For template compatibility
        time: "09:00 - 17:00", // For template compatibility
        spotsLeft: 213, // capacity - registeredCount = 500 - 287
        location: "Jakarta Convention Center", // For template compatibility
        requirements: [
            "Laptop with Wi-Fi capability",
            "Basic understanding of cybersecurity concepts",
            "Valid ID for registration"
        ],
        agenda: [
            {
                date: "2025-08-15",
                sessions: [
                    { time: "08:00-09:00", title: "Registration & Welcome Coffee" },
                    { time: "09:00-10:00", title: "Opening Keynote", speaker: "Dr. Sarah Chen" },
                    { time: "10:30-12:00", title: "AI-Powered Security Workshop", speaker: "Ahmad Rizky" }
                ]
            }
        ]
    },
    {
        id: 2,
        title: "Hands-on Penetration Testing Workshop",
        slug: "hands-on-penetration-testing-workshop",
        description: "Intensive 2-day workshop covering practical penetration testing techniques, tools, and methodologies for security professionals and ethical hackers.",
        content: `
            <p>This intensive hands-on workshop is designed for security professionals who want to develop practical penetration testing skills using industry-standard tools and methodologies.</p>
            
            <h3>Workshop Overview</h3>
            <p>Participants will gain hands-on experience with real-world penetration testing scenarios, learning to identify vulnerabilities and document findings effectively.</p>
            
            <h3>Learning Objectives</h3>
            <ul>
                <li>Master fundamental penetration testing methodologies</li>
                <li>Learn to use industry-standard security tools</li>
                <li>Understand vulnerability assessment techniques</li>
                <li>Practice report writing and documentation</li>
                <li>Develop ethical hacking mindset and approach</li>
            </ul>
            
            <h3>Topics Covered</h3>
            <h4>Day 1: Foundations & Network Security</h4>
            <ul>
                <li>Introduction to penetration testing frameworks</li>
                <li>Information gathering and reconnaissance</li>
                <li>Network scanning and enumeration</li>
                <li>Vulnerability identification and analysis</li>
                <li>Network exploitation techniques</li>
            </ul>
            
            <h4>Day 2: Web Applications & Reporting</h4>
            <ul>
                <li>Web application security testing</li>
                <li>OWASP Top 10 vulnerabilities</li>
                <li>SQL injection and XSS attacks</li>
                <li>Post-exploitation techniques</li>
                <li>Professional reporting and documentation</li>
            </ul>
            
            <h3>Tools You'll Learn</h3>
            <ul>
                <li>Nmap for network discovery</li>
                <li>Metasploit for exploitation</li>
                <li>Burp Suite for web application testing</li>
                <li>Wireshark for traffic analysis</li>
                <li>Custom scripts and automation</li>
            </ul>
            
            <h3>Prerequisites</h3>
            <ul>
                <li>Basic networking knowledge</li>
                <li>Understanding of Linux command line</li>
                <li>Familiarity with web technologies</li>
                <li>Own laptop with 8GB+ RAM</li>
            </ul>
        `,
        startDate: "2025-08-20",
        endDate: "2025-08-21",
        startTime: "09:00",
        endTime: "17:00",
        venue: "MBC Laboratory Training Center",
        address: "Jl. Sudirman No. 123, Jakarta Selatan",
        capacity: 25,
        registeredCount: 18,
        price: "Rp 3.500.000",
        earlyBirdPrice: "Rp 2.999.000",
        category: "Workshop",
        type: "Offline",
        level: "Intermediate",
        duration: "2 days",
        status: "open",
        organizer: "MBC Laboratory",
        speakers: [
            {
                name: "Muhammad Iqbal",
                title: "Senior Penetration Tester, MBC Laboratory",
                bio: "CEH certified with 8+ years of penetration testing experience",
                image: "/images/speakers/muhammad-iqbal.jpg"
            }
        ],
        tags: ["penetration-testing", "workshop", "hands-on", "ethical-hacking", "security"],
        imageUrl: "/images/events/pentest-workshop.jpg",
        image: "/images/events/pentest-workshop.jpg", // For template compatibility
        date: "2025-08-20", // For template compatibility
        time: "09:00 - 17:00", // For template compatibility
        spotsLeft: 7, // capacity - registeredCount = 25 - 18
        location: "MBC Laboratory Training Center", // For template compatibility
        requirements: [
            "Laptop with minimum 8GB RAM",
            "VirtualBox or VMware installed",
            "Basic Linux knowledge",
            "Networking fundamentals"
        ]
    },
    {
        id: 3,
        title: "Cloud Security Masterclass",
        slug: "cloud-security-masterclass",
        description: "Comprehensive masterclass on cloud security best practices, covering AWS, Azure, and GCP security implementations for enterprise environments.",
        content: `
            <p>This masterclass provides comprehensive coverage of cloud security across major cloud platforms, focusing on practical implementation and enterprise-grade security strategies.</p>
            
            <h3>Why Attend This Masterclass?</h3>
            <p>As organizations increasingly migrate to cloud environments, understanding cloud security becomes critical for protecting digital assets and maintaining compliance.</p>
            
            <h3>Learning Outcomes</h3>
            <ul>
                <li>Understand cloud security shared responsibility models</li>
                <li>Implement security controls across AWS, Azure, and GCP</li>
                <li>Design secure cloud architectures</li>
                <li>Master cloud compliance frameworks</li>
                <li>Develop incident response strategies for cloud environments</li>
            </ul>
            
            <h3>Curriculum Highlights</h3>
            <h4>Module 1: Cloud Security Fundamentals</h4>
            <ul>
                <li>Cloud service models and security implications</li>
                <li>Shared responsibility model across platforms</li>
                <li>Cloud security frameworks and best practices</li>
            </ul>
            
            <h4>Module 2: Platform-Specific Security</h4>
            <ul>
                <li>AWS Security: IAM, VPC, CloudTrail, GuardDuty</li>
                <li>Azure Security: Azure AD, NSG, Security Center</li>
                <li>GCP Security: Cloud IAM, VPC, Security Command Center</li>
            </ul>
            
            <h4>Module 3: Advanced Cloud Security</h4>
            <ul>
                <li>Container and serverless security</li>
                <li>DevSecOps implementation</li>
                <li>Cloud compliance and governance</li>
                <li>Incident response in cloud environments</li>
            </ul>
            
            <h3>Hands-on Labs</h3>
            <ul>
                <li>Setting up secure cloud environments</li>
                <li>Implementing monitoring and logging</li>
                <li>Configuring security automation</li>
                <li>Incident simulation and response</li>
            </ul>
            
            <h3>Target Audience</h3>
            <ul>
                <li>Cloud architects and engineers</li>
                <li>Security professionals transitioning to cloud</li>
                <li>DevOps and platform engineers</li>
                <li>IT managers and decision makers</li>
            </ul>
        `,
        startDate: "2025-09-10",
        endDate: "2025-09-12",
        startTime: "09:00",
        endTime: "17:00",
        venue: "Online via Zoom",
        address: "Virtual Event",
        capacity: 100,
        registeredCount: 67,
        price: "Rp 4.500.000",
        earlyBirdPrice: "Rp 3.999.000",
        category: "Masterclass",
        type: "Online",
        level: "Advanced",
        duration: "3 days",
        status: "open",
        organizer: "MBC Laboratory",
        speakers: [
            {
                name: "Rizki Pratama",
                title: "Cloud Security Architect, MBC Laboratory",
                bio: "CISSP certified with expertise in multi-cloud security",
                image: "/images/speakers/rizki-pratama.jpg"
            }
        ],
        tags: ["cloud-security", "aws", "azure", "gcp", "masterclass"],
        imageUrl: "/images/events/cloud-security-masterclass.jpg",
        image: "/images/events/cloud-security-masterclass.jpg", // For template compatibility
        date: "2025-09-10", // For template compatibility
        time: "09:00 - 17:00", // For template compatibility
        spotsLeft: 33, // capacity - registeredCount = 100 - 67
        location: "Online", // For template compatibility
        requirements: [
            "Basic cloud computing knowledge",
            "Understanding of networking concepts",
            "Access to cloud provider free tier accounts",
            "Stable internet connection for virtual labs"
        ]
    },
    {
        id: 4,
        title: "AI in Cybersecurity: Innovation & Implementation",
        slug: "ai-cybersecurity-innovation-implementation",
        description: "Explore the intersection of artificial intelligence and cybersecurity, covering machine learning applications, threat detection, and automated response systems.",
        content: `
            <p>This cutting-edge seminar explores how artificial intelligence is revolutionizing cybersecurity, from automated threat detection to intelligent response systems.</p>
            
            <h3>Event Focus</h3>
            <p>Understanding and implementing AI-driven security solutions to enhance organizational cyber defense capabilities and stay ahead of evolving threats.</p>
            
            <h3>Key Topics</h3>
            <h4>AI-Powered Threat Detection</h4>
            <ul>
                <li>Machine learning algorithms for anomaly detection</li>
                <li>Behavioral analysis and user profiling</li>
                <li>Automated malware classification</li>
                <li>Real-time threat intelligence</li>
            </ul>
            
            <h4>Intelligent Security Operations</h4>
            <ul>
                <li>SOAR (Security Orchestration, Automation, and Response)</li>
                <li>AI-enhanced SIEM platforms</li>
                <li>Automated incident response</li>
                <li>Predictive security analytics</li>
            </ul>
            
            <h4>Implementation Strategies</h4>
            <ul>
                <li>Building AI security teams</li>
                <li>Technology selection and integration</li>
                <li>ROI measurement and metrics</li>
                <li>Overcoming implementation challenges</li>
            </ul>
            
            <h3>Case Studies</h3>
            <ul>
                <li>Enterprise AI security transformation</li>
                <li>Financial sector threat detection</li>
                <li>Healthcare data protection with AI</li>
                <li>Government cybersecurity automation</li>
            </ul>
            
            <h3>Interactive Sessions</h3>
            <ul>
                <li>Live AI threat detection demonstration</li>
                <li>Hands-on with security AI tools</li>
                <li>Q&A with AI security experts</li>
                <li>Networking with industry practitioners</li>
            </ul>
            
            <h3>Takeaways</h3>
            <ul>
                <li>Practical AI implementation roadmap</li>
                <li>Access to AI security tools and resources</li>
                <li>Industry best practices documentation</li>
                <li>Professional networking opportunities</li>
            </ul>
        `,
        startDate: "2025-10-25",
        endDate: "2025-10-25",
        startTime: "13:00",
        endTime: "18:00",
        venue: "Tech Hub Jakarta",
        address: "Jl. HR Rasuna Said, Kuningan, Jakarta Selatan",
        capacity: 150,
        registeredCount: 98,
        price: "Rp 1.500.000",
        earlyBirdPrice: "Rp 1.199.000",
        category: "Seminar",
        type: "Hybrid",
        level: "Beginner",
        duration: "5 hours",
        status: "open",
        organizer: "MBC Laboratory",
        speakers: [
            {
                name: "Dr. Lisa Wang",
                title: "AI Research Director, CyberTech Institute",
                bio: "PhD in AI with focus on cybersecurity applications",
                image: "/images/speakers/lisa-wang.jpg"
            },
            {
                name: "Sarah Wijaya",
                title: "AI Security Specialist, MBC Laboratory",
                bio: "Machine learning expert in security applications",
                image: "/images/speakers/sarah-wijaya.jpg"
            }
        ],
        tags: ["ai", "machine-learning", "threat-detection", "automation", "innovation"],
        imageUrl: "/images/events/ai-cybersecurity-seminar.jpg",
        image: "/images/events/ai-cybersecurity-seminar.jpg", // For template compatibility
        date: "2025-10-25", // For template compatibility
        time: "13:00 - 18:00", // For template compatibility
        spotsLeft: 52, // capacity - registeredCount = 150 - 98
        location: "Hybrid Event", // For template compatibility
        requirements: [
            "Basic understanding of cybersecurity concepts",
            "Familiarity with AI/ML terminology",
            "Laptop for interactive sessions",
            "Notebook for taking notes"
        ]
    }
];

// Functions to manage event data
function getAllEvents() {
    return eventData.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
}

function getEventById(id) {
    return eventData.find(event => event.id === parseInt(id));
}

function getEventBySlug(slug) {
    return eventData.find(event => event.slug === slug);
}

function getEventsByCategory(category) {
    return eventData.filter(event => event.category.toLowerCase() === category.toLowerCase())
                   .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
}

function getEventsByType(type) {
    return eventData.filter(event => event.type.toLowerCase() === type.toLowerCase())
                   .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
}

function getEventsByStatus(status) {
    return eventData.filter(event => event.status.toLowerCase() === status.toLowerCase())
                   .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
}

function getUpcomingEvents(limit = 3) {
    const today = new Date();
    return eventData.filter(event => new Date(event.startDate) >= today && event.status === 'open')
                   .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
                   .slice(0, limit);
}

function getFeaturedEvents(limit = 3) {
    return eventData.filter(event => event.status === 'open')
                   .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
                   .slice(0, limit);
}

function getRelatedEvents(currentEventId, limit = 3) {
    const currentEvent = getEventById(currentEventId);
    if (!currentEvent) return [];
    
    return eventData
        .filter(event => event.id !== currentEventId && 
                        (event.category === currentEvent.category || 
                         event.tags.some(tag => currentEvent.tags.includes(tag))))
        .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
        .slice(0, limit);
}

function searchEvents(query) {
    const searchTerm = query.toLowerCase();
    return eventData.filter(event => 
        event.title.toLowerCase().includes(searchTerm) ||
        event.description.toLowerCase().includes(searchTerm) ||
        event.content.toLowerCase().includes(searchTerm) ||
        event.venue.toLowerCase().includes(searchTerm) ||
        event.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    ).sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
}

function getEventCategories() {
    const categories = [...new Set(eventData.map(event => event.category))];
    return categories.sort();
}

function getEventTypes() {
    const types = [...new Set(eventData.map(event => event.type))];
    return types.sort();
}

function getAllTags() {
    const allTags = eventData.flatMap(event => event.tags);
    const uniqueTags = [...new Set(allTags)];
    return uniqueTags.sort();
}

function isEventAvailable(eventId) {
    const event = getEventById(eventId);
    if (!event) return false;
    
    return event.status === 'open' && 
           new Date(event.startDate) > new Date() && 
           event.registeredCount < event.capacity;
}

function getAvailableSpots(eventId) {
    const event = getEventById(eventId);
    if (!event) return 0;
    
    return Math.max(0, event.capacity - event.registeredCount);
}

module.exports = {
    getAllEvents,
    getEventById,
    getEventBySlug,
    getEventsByCategory,
    getEventsByType,
    getEventsByStatus,
    getUpcomingEvents,
    getFeaturedEvents,
    getRelatedEvents,
    searchEvents,
    getEventCategories,
    getEventTypes,
    getAllTags,
    isEventAvailable,
    getAvailableSpots
};
