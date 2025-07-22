// News data for MBC Laboratory
const newsData = [
    {
        id: 1,
        title: "Peningkatan Keamanan Siber di Era Digital: Tren dan Tantangan 2024",
        slug: "peningkatan-keamanan-siber-era-digital-2024",
        excerpt: "Dengan berkembangnya teknologi digital, tantangan keamanan siber semakin kompleks. Pelajari tren terbaru dan strategi perlindungan yang efektif untuk bisnis modern.",
        content: `
            <p>Era digital telah membawa transformasi besar dalam cara kita bekerja, berkomunikasi, dan menjalankan bisnis. Namun, dengan kemajuan teknologi ini, muncul pula tantangan baru dalam bidang keamanan siber yang semakin kompleks dan canggih.</p>
            
            <h3>Tren Keamanan Siber 2024</h3>
            <p>Tahun 2024 menandai era baru dalam lanskap keamanan siber. Beberapa tren utama yang perlu diperhatikan:</p>
            
            <ul>
                <li><strong>AI-Powered Attacks:</strong> Serangan siber yang memanfaatkan kecerdasan buatan untuk mengotomatisasi dan meningkatkan efektivitas serangan.</li>
                <li><strong>Zero Trust Security:</strong> Pendekatan keamanan yang tidak mempercayai siapa pun atau apa pun secara default, baik di dalam maupun di luar jaringan.</li>
                <li><strong>Cloud Security:</strong> Dengan migrasi massal ke cloud, keamanan infrastruktur cloud menjadi prioritas utama.</li>
                <li><strong>IoT Security:</strong> Perlindungan perangkat Internet of Things yang semakin banyak dan beragam.</li>
            </ul>
            
            <h3>Tantangan Utama</h3>
            <p>Organisasi menghadapi berbagai tantangan dalam menjaga keamanan digital:</p>
            
            <ol>
                <li><strong>Kompleksitas Infrastruktur:</strong> Arsitektur IT yang semakin kompleks membutuhkan pendekatan keamanan yang lebih holistik.</li>
                <li><strong>Kekurangan Talent:</strong> Gap antara kebutuhan dan ketersediaan profesional keamanan siber yang berkualitas.</li>
                <li><strong>Evolusi Ancaman:</strong> Serangan siber yang terus berkembang dan semakin canggih.</li>
                <li><strong>Compliance:</strong> Kepatuhan terhadap regulasi yang semakin ketat dan beragam.</li>
            </ol>
            
            <h3>Solusi dan Strategi</h3>
            <p>MBC Laboratory merekomendasikan pendekatan berlapis untuk menghadapi tantangan ini:</p>
            
            <ul>
                <li>Implementasi security framework yang komprehensif</li>
                <li>Pelatihan berkelanjutan untuk tim IT dan karyawan</li>
                <li>Investasi dalam teknologi keamanan terdepan</li>
                <li>Pengembangan incident response plan yang efektif</li>
                <li>Regular security assessment dan penetration testing</li>
            </ul>
            
            <p>Keamanan siber bukan lagi pilihan, melainkan kebutuhan fundamental untuk keberlanjutan bisnis di era digital. Dengan strategi yang tepat dan implementasi yang konsisten, organisasi dapat melindungi aset digital mereka sambil tetap memanfaatkan potensi penuh teknologi modern.</p>
        `,
        author: "Dr. Ahmad Rifai",
        authorTitle: "Lead Cybersecurity Researcher",
        publishDate: "2024-01-15",
        category: "Cybersecurity",
        tags: ["cybersecurity", "digital", "ai", "cloud", "iot"],
        imageUrl: "/images/news/cyber-security-2024.jpg",
        readTime: "8 menit"
    },
    {
        id: 2,
        title: "Implementasi Machine Learning untuk Deteksi Anomali Jaringan",
        slug: "implementasi-machine-learning-deteksi-anomali-jaringan",
        excerpt: "Teknologi machine learning telah revolusioner dalam mendeteksi ancaman siber. Pelajari bagaimana AI dapat meningkatkan kemampuan deteksi anomali dalam infrastruktur jaringan.",
        content: `
            <p>Machine Learning (ML) telah menjadi game-changer dalam dunia keamanan siber, khususnya dalam deteksi anomali jaringan. Teknologi ini memungkinkan sistem untuk belajar dari pola normal dan mengidentifikasi perilaku yang mencurigakan secara real-time.</p>
            
            <h3>Mengapa Machine Learning Penting untuk Keamanan Jaringan?</h3>
            <p>Metode tradisional dalam deteksi ancaman seringkali tidak mampu mengimbangi evolusi serangan siber yang semakin canggih. ML menawarkan beberapa keunggulan:</p>
            
            <ul>
                <li><strong>Adaptabilitas:</strong> Sistem dapat belajar dan beradaptasi dengan pola serangan baru</li>
                <li><strong>Kecepatan:</strong> Deteksi real-time yang jauh lebih cepat dari analisis manual</li>
                <li><strong>Akurasi:</strong> Mengurangi false positive dan meningkatkan presisi deteksi</li>
                <li><strong>Skalabilitas:</strong> Mampu menganalisis volume data yang sangat besar</li>
            </ul>
            
            <h3>Algoritma Machine Learning untuk Deteksi Anomali</h3>
            <p>Beberapa algoritma ML yang efektif untuk deteksi anomali jaringan:</p>
            
            <h4>1. Unsupervised Learning</h4>
            <ul>
                <li><strong>Isolation Forest:</strong> Efektif untuk mendeteksi outlier dalam dataset besar</li>
                <li><strong>One-Class SVM:</strong> Ideal untuk scenario di mana data normal lebih banyak tersedia</li>
                <li><strong>K-Means Clustering:</strong> Mengidentifikasi kelompok data yang tidak normal</li>
            </ul>
            
            <h4>2. Supervised Learning</h4>
            <ul>
                <li><strong>Random Forest:</strong> Robust terhadap overfitting dan memberikan interpretabilitas yang baik</li>
                <li><strong>Neural Networks:</strong> Mampu menangkap pola kompleks dalam data jaringan</li>
                <li><strong>Support Vector Machines:</strong> Efektif untuk klasifikasi dengan boundary yang jelas</li>
            </ul>
            
            <h3>Implementasi Praktis</h3>
            <p>Langkah-langkah implementasi ML untuk deteksi anomali:</p>
            
            <ol>
                <li><strong>Data Collection:</strong> Mengumpulkan log jaringan, traffic patterns, dan metadata</li>
                <li><strong>Feature Engineering:</strong> Ekstraksi fitur relevan seperti bandwidth usage, connection patterns, protocol distribution</li>
                <li><strong>Model Training:</strong> Melatih model dengan dataset yang telah disiapkan</li>
                <li><strong>Real-time Monitoring:</strong> Implementasi model untuk monitoring live traffic</li>
                <li><strong>Alert System:</strong> Sistem notifikasi untuk anomali yang terdeteksi</li>
                <li><strong>Continuous Learning:</strong> Update model berdasarkan feedback dan data baru</li>
            </ol>
            
            <h3>Studi Kasus: Implementasi di MBC Laboratory</h3>
            <p>MBC Laboratory telah berhasil mengimplementasikan sistem deteksi anomali berbasis ML dengan hasil:</p>
            
            <ul>
                <li>95% akurasi dalam deteksi intrusi</li>
                <li>Pengurangan false positive hingga 70%</li>
                <li>Response time rata-rata di bawah 30 detik</li>
                <li>Deteksi otomatis untuk 15+ jenis serangan siber</li>
            </ul>
            
            <h3>Tantangan dan Solusi</h3>
            <p>Implementasi ML untuk keamanan jaringan juga menghadapi tantangan:</p>
            
            <ul>
                <li><strong>Data Quality:</strong> Memerlukan data berkualitas tinggi dan representatif</li>
                <li><strong>Concept Drift:</strong> Pola serangan yang berubah seiring waktu</li>
                <li><strong>Interpretability:</strong> Memahami alasan di balik prediksi model</li>
                <li><strong>Resource Requirements:</strong> Kebutuhan komputasi yang tinggi</li>
            </ul>
            
            <p>Machine Learning telah terbukti sebagai teknologi yang revolusioner dalam deteksi anomali jaringan. Dengan implementasi yang tepat, organisasi dapat meningkatkan postur keamanan mereka secara signifikan sambil mengurangi beban kerja tim keamanan.</p>
        `,
        author: "Sarah Wijaya, M.T.",
        authorTitle: "AI Security Specialist",
        publishDate: "2024-01-10",
        category: "Machine Learning",
        tags: ["machine-learning", "ai", "network-security", "anomaly-detection"],
        imageUrl: "/images/news/ml-network-security.jpg",
        readTime: "12 menit"
    },
    {
        id: 3,
        title: "Panduan Komprehensif Penetration Testing untuk Startup",
        slug: "panduan-komprehensif-penetration-testing-startup",
        excerpt: "Startup perlu memahami pentingnya penetration testing sejak dini. Pelajari metodologi, tools, dan best practices untuk mengamankan infrastruktur digital startup Anda.",
        content: `
            <p>Penetration testing atau ethical hacking merupakan salah satu metode paling efektif untuk mengidentifikasi kerentanan keamanan sebelum dieksploitasi oleh pihak yang tidak bertanggung jawab. Untuk startup, pentest menjadi investasi krusial dalam membangun fondasi keamanan yang solid.</p>
            
            <h3>Mengapa Startup Memerlukan Penetration Testing?</h3>
            <p>Startup seringkali fokus pada pengembangan produk dan pertumbuhan bisnis, namun aspek keamanan tidak boleh diabaikan:</p>
            
            <ul>
                <li><strong>Perlindungan Data Pelanggan:</strong> Menjaga kepercayaan dan menghindari pelanggaran data yang merugikan reputasi</li>
                <li><strong>Compliance Requirements:</strong> Memenuhi standar regulasi industri</li>
                <li><strong>Competitive Advantage:</strong> Keamanan yang baik menjadi nilai jual yang kuat</li>
                <li><strong>Cost Efficiency:</strong> Lebih murah mencegah daripada menangani incident</li>
                <li><strong>Investor Confidence:</strong> Menunjukkan profesionalisme dan persiapan yang matang</li>
            </ul>
            
            <h3>Metodologi Penetration Testing</h3>
            <p>MBC Laboratory menggunakan metodologi yang terstandardisasi untuk memastikan testing yang komprehensif:</p>
            
            <h4>1. Planning and Reconnaissance</h4>
            <ul>
                <li>Scope definition dan target identification</li>
                <li>Information gathering menggunakan OSINT</li>
                <li>Network scanning dan enumeration</li>
                <li>Social engineering assessment (jika diperlukan)</li>
            </ul>
            
            <h4>2. Vulnerability Assessment</h4>
            <ul>
                <li>Automated scanning dengan tools seperti Nessus, OpenVAS</li>
                <li>Manual testing untuk vulnerabilities yang kompleks</li>
                <li>Code review untuk aplikasi web</li>
                <li>Configuration review untuk infrastructure</li>
            </ul>
            
            <h4>3. Exploitation</h4>
            <ul>
                <li>Proof of concept untuk vulnerabilities kritis</li>
                <li>Privilege escalation testing</li>
                <li>Lateral movement simulation</li>
                <li>Data exfiltration scenarios</li>
            </ul>
            
            <h4>4. Post-Exploitation</h4>
            <ul>
                <li>Persistence mechanism testing</li>
                <li>Impact assessment</li>
                <li>Clean-up procedures</li>
                <li>Evidence collection</li>
            </ul>
            
            <h4>5. Reporting</h4>
            <ul>
                <li>Executive summary untuk management</li>
                <li>Technical details untuk IT team</li>
                <li>Remediation roadmap dengan prioritas</li>
                <li>Risk assessment matrix</li>
            </ul>
            
            <h3>Tools dan Teknologi</h3>
            <p>Beberapa tools yang umum digunakan dalam penetration testing:</p>
            
            <h4>Network Security Testing</h4>
            <ul>
                <li><strong>Nmap:</strong> Network discovery dan port scanning</li>
                <li><strong>Metasploit:</strong> Exploitation framework yang komprehensif</li>
                <li><strong>Wireshark:</strong> Network protocol analyzer</li>
                <li><strong>Nessus:</strong> Vulnerability scanner</li>
            </ul>
            
            <h4>Web Application Testing</h4>
            <ul>
                <li><strong>OWASP ZAP:</strong> Web application security scanner</li>
                <li><strong>Burp Suite:</strong> Integrated platform untuk web app testing</li>
                <li><strong>SQLmap:</strong> SQL injection testing tool</li>
                <li><strong>Nikto:</strong> Web server scanner</li>
            </ul>
            
            <h4>Wireless Security Testing</h4>
            <ul>
                <li><strong>Aircrack-ng:</strong> Wireless security auditing suite</li>
                <li><strong>Kismet:</strong> Wireless network detector</li>
                <li><strong>Reaver:</strong> WPS attack tool</li>
            </ul>
            
            <h3>Pentesting Checklist untuk Startup</h3>
            <p>Checklist minimal yang harus dipenuhi startup:</p>
            
            <h4>Infrastructure Security</h4>
            <ul>
                <li>☐ Server hardening dan patch management</li>
                <li>☐ Firewall configuration review</li>
                <li>☐ Network segmentation testing</li>
                <li>☐ VPN security assessment</li>
                <li>☐ Cloud security configuration</li>
            </ul>
            
            <h4>Application Security</h4>
            <ul>
                <li>☐ OWASP Top 10 vulnerabilities testing</li>
                <li>☐ Authentication dan authorization testing</li>
                <li>☐ Input validation dan sanitization</li>
                <li>☐ Session management review</li>
                <li>☐ API security testing</li>
            </ul>
            
            <h4>Data Protection</h4>
            <ul>
                <li>☐ Encryption implementation review</li>
                <li>☐ Database security assessment</li>
                <li>☐ Backup security testing</li>
                <li>☐ Data leakage prevention</li>
            </ul>
            
            <h3>Best Practices untuk Startup</h3>
            <ol>
                <li><strong>Start Early:</strong> Integrasikan security testing sejak development phase</li>
                <li><strong>Regular Testing:</strong> Lakukan penetration testing secara berkala</li>
                <li><strong>Fix Prioritization:</strong> Fokus pada vulnerabilities dengan risk tertinggi</li>
                <li><strong>Team Training:</strong> Edukasi development team tentang secure coding</li>
                <li><strong>Documentation:</strong> Maintain security documentation yang up-to-date</li>
                <li><strong>Incident Response:</strong> Siapkan incident response plan</li>
            </ol>
            
            <h3>ROI Penetration Testing</h3>
            <p>Investasi dalam penetration testing memberikan return yang signifikan:</p>
            
            <ul>
                <li>Mencegah financial loss akibat data breach</li>
                <li>Menghindari regulatory fines</li>
                <li>Menjaga customer trust dan brand reputation</li>
                <li>Meningkatkan competitive advantage</li>
                <li>Mempercepat go-to-market dengan security confidence</li>
            </ul>
            
            <p>Penetration testing bukan expense, melainkan investment untuk sustainable growth startup. Dengan pendekatan yang tepat dan partner yang experienced, startup dapat membangun foundation keamanan yang solid sambil tetap agile dalam pengembangan produk.</p>
        `,
        author: "Muhammad Iqbal, CEH",
        authorTitle: "Senior Penetration Tester",
        publishDate: "2024-01-05",
        category: "Penetration Testing",
        tags: ["penetration-testing", "startup", "security", "ethical-hacking"],
        imageUrl: "/images/news/pentest-startup.jpg",
        readTime: "15 menit"
    },
    {
        id: 4,
        title: "Cloud Security Best Practices untuk Enterprise",
        slug: "cloud-security-best-practices-enterprise",
        excerpt: "Migrasi ke cloud membutuhkan strategi keamanan yang berbeda. Pelajari best practices untuk mengamankan infrastruktur cloud enterprise dengan framework yang terbukti.",
        content: `
            <p>Cloud computing telah menjadi tulang punggung operasional enterprise modern. Namun, dengan fleksibilitas dan efisiensi yang ditawarkan cloud, muncul pula tantangan keamanan yang unik dan kompleks yang memerlukan pendekatan khusus.</p>
            
            <h3>Paradigma Keamanan Cloud</h3>
            <p>Keamanan cloud berbeda dengan keamanan tradisional dalam beberapa aspek fundamental:</p>
            
            <ul>
                <li><strong>Shared Responsibility Model:</strong> Pembagian tanggung jawab keamanan antara cloud provider dan customer</li>
                <li><strong>Dynamic Infrastructure:</strong> Infrastruktur yang dapat berubah secara dinamis dan elastic</li>
                <li><strong>API-Driven:</strong> Semua operasi dilakukan melalui API calls</li>
                <li><strong>Multi-Tenancy:</strong> Resource sharing dengan customer lain</li>
                <li><strong>Global Scale:</strong> Distribusi geografis yang luas</li>
            </ul>
            
            <h3>Framework Cloud Security</h3>
            <p>MBC Laboratory merekomendasikan implementasi framework berlapis untuk cloud security:</p>
            
            <h4>1. Identity and Access Management (IAM)</h4>
            <ul>
                <li><strong>Principle of Least Privilege:</strong> Grant minimal permissions yang diperlukan</li>
                <li><strong>Multi-Factor Authentication:</strong> Wajib untuk semua privileged accounts</li>
                <li><strong>Role-Based Access Control:</strong> Implementasi RBAC yang granular</li>
                <li><strong>Regular Access Review:</strong> Audit berkala untuk unused/excessive permissions</li>
                <li><strong>Federated Identity:</strong> Single sign-on dengan identity providers</li>
            </ul>
            
            <h4>2. Network Security</h4>
            <ul>
                <li><strong>Virtual Private Cloud (VPC):</strong> Network isolation dan segmentation</li>
                <li><strong>Security Groups:</strong> Stateful firewall di instance level</li>
                <li><strong>Network Access Control Lists:</strong> Stateless firewall di subnet level</li>
                <li><strong>VPN dan Direct Connect:</strong> Secure connectivity untuk hybrid environments</li>
                <li><strong>Web Application Firewall:</strong> Protection untuk web applications</li>
            </ul>
            
            <h4>3. Data Protection</h4>
            <ul>
                <li><strong>Encryption at Rest:</strong> Semua data storage harus encrypted</li>
                <li><strong>Encryption in Transit:</strong> TLS/SSL untuk semua communications</li>
                <li><strong>Key Management:</strong> Centralized key management dengan HSM</li>
                <li><strong>Data Classification:</strong> Kategorisasi data berdasarkan sensitivity</li>
                <li><strong>Data Loss Prevention:</strong> Monitoring dan prevention untuk data exfiltration</li>
            </ul>
            
            <h4>4. Monitoring dan Logging</h4>
            <ul>
                <li><strong>Centralized Logging:</strong> Aggregate logs dari semua cloud services</li>
                <li><strong>Real-time Monitoring:</strong> Continuous monitoring untuk suspicious activities</li>
                <li><strong>SIEM Integration:</strong> Security Information and Event Management</li>
                <li><strong>Automated Alerting:</strong> Immediate notification untuk security incidents</li>
                <li><strong>Forensics Capability:</strong> Maintain audit trails untuk investigasi</li>
            </ul>
            
            <h3>Multi-Cloud Security Strategy</h3>
            <p>Enterprise sering menggunakan multiple cloud providers, yang memerlukan strategi khusus:</p>
            
            <h4>Unified Security Management</h4>
            <ul>
                <li>Cloud Security Posture Management (CSPM) tools</li>
                <li>Centralized identity management across clouds</li>
                <li>Consistent policy enforcement</li>
                <li>Cross-cloud network security</li>
            </ul>
            
            <h4>Cloud-Native Security Tools</h4>
            <ul>
                <li><strong>AWS:</strong> GuardDuty, Security Hub, Config, CloudTrail</li>
                <li><strong>Azure:</strong> Security Center, Sentinel, Key Vault, Monitor</li>
                <li><strong>GCP:</strong> Security Command Center, Cloud Asset Inventory, Cloud KMS</li>
            </ul>
            
            <h3>DevSecOps dalam Cloud</h3>
            <p>Integrasikan security dalam CI/CD pipeline:</p>
            
            <ol>
                <li><strong>Infrastructure as Code (IaC) Security:</strong>
                    <ul>
                        <li>Static analysis untuk Terraform, CloudFormation templates</li>
                        <li>Policy as Code dengan tools seperti Open Policy Agent</li>
                        <li>Automated compliance checking</li>
                    </ul>
                </li>
                <li><strong>Container Security:</strong>
                    <ul>
                        <li>Image vulnerability scanning</li>
                        <li>Runtime protection untuk containers</li>
                        <li>Kubernetes security hardening</li>
                    </ul>
                </li>
                <li><strong>Automated Security Testing:</strong>
                    <ul>
                        <li>Dynamic Application Security Testing (DAST)</li>
                        <li>Static Application Security Testing (SAST)</li>
                        <li>Software Composition Analysis (SCA)</li>
                    </ul>
                </li>
            </ol>
            
            <h3>Compliance dan Governance</h3>
            <p>Maintain compliance dalam cloud environment:</p>
            
            <h4>Regulatory Compliance</h4>
            <ul>
                <li><strong>GDPR:</strong> Data privacy dan protection requirements</li>
                <li><strong>SOX:</strong> Financial reporting controls</li>
                <li><strong>HIPAA:</strong> Healthcare data protection</li>
                <li><strong>PCI DSS:</strong> Payment card industry standards</li>
                <li><strong>ISO 27001:</strong> Information security management</li>
            </ul>
            
            <h4>Cloud Governance Framework</h4>
            <ul>
                <li>Cloud adoption framework implementation</li>
                <li>Cost optimization dengan security considerations</li>
                <li>Resource tagging dan management</li>
                <li>Change management processes</li>
                <li>Risk assessment dan mitigation</li>
            </ul>
            
            <h3>Incident Response untuk Cloud</h3>
            <p>Cloud-specific incident response procedures:</p>
            
            <ol>
                <li><strong>Detection:</strong> Automated threat detection menggunakan cloud-native tools</li>
                <li><strong>Containment:</strong> Isolasi affected resources tanpa disrupting business operations</li>
                <li><strong>Investigation:</strong> Forensics analysis menggunakan cloud audit logs</li>
                <li><strong>Recovery:</strong> Restore dari backup dan implement additional controls</li>
                <li><strong>Lessons Learned:</strong> Update security policies dan procedures</li>
            </ol>
            
            <h3>Emerging Threats dan Future Considerations</h3>
            <p>Threat landscape yang terus berkembang:</p>
            
            <ul>
                <li><strong>Cloud-Native Malware:</strong> Malware yang designed khusus untuk cloud environments</li>
                <li><strong>Serverless Security:</strong> New attack vectors dalam serverless architectures</li>
                <li><strong>AI/ML Security:</strong> Protection untuk machine learning models dan data</li>
                <li><strong>Quantum Computing:</strong> Impact terhadap encryption dan cryptography</li>
            </ul>
            
            <h3>ROI Cloud Security Investment</h3>
            <p>Investasi dalam cloud security memberikan return melalui:</p>
            
            <ul>
                <li>Reduced risk of data breaches dan financial losses</li>
                <li>Improved operational efficiency melalui automation</li>
                <li>Enhanced customer trust dan brand reputation</li>
                <li>Faster time-to-market dengan secure-by-design approach</li>
                <li>Competitive advantage melalui security differentiation</li>
            </ul>
            
            <p>Cloud security bukan pilihan melainkan imperative untuk enterprise success. Dengan implementasi best practices yang comprehensive dan continuous improvement, enterprise dapat memanfaatkan full potential cloud computing sambil maintaining security posture yang strong.</p>
        `,
        author: "Rizki Pratama, CISSP",
        authorTitle: "Cloud Security Architect",
        publishDate: "2024-01-01",
        category: "Cloud Security",
        tags: ["cloud-security", "enterprise", "aws", "azure", "gcp"],
        imageUrl: "/images/news/cloud-security-enterprise.jpg",
        readTime: "18 menit"
    }
];

// Functions to manage news data
function getAllNews() {
    return newsData.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
}

function getNewsById(id) {
    return newsData.find(news => news.id === parseInt(id));
}

function getNewsBySlug(slug) {
    return newsData.find(news => news.slug === slug);
}

function getNewsByCategory(category) {
    return newsData.filter(news => news.category.toLowerCase() === category.toLowerCase())
                   .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
}

function getFeaturedNews(limit = 3) {
    return newsData.slice(0, limit);
}

function getRelatedNews(currentNewsId, limit = 3) {
    const currentNews = getNewsById(currentNewsId);
    if (!currentNews) return [];
    
    return newsData
        .filter(news => news.id !== currentNewsId && news.category === currentNews.category)
        .slice(0, limit);
}

function searchNews(query) {
    const searchTerm = query.toLowerCase();
    return newsData.filter(news => 
        news.title.toLowerCase().includes(searchTerm) ||
        news.excerpt.toLowerCase().includes(searchTerm) ||
        news.content.toLowerCase().includes(searchTerm) ||
        news.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    ).sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
}

function getNewsCategories() {
    const categories = [...new Set(newsData.map(news => news.category))];
    return categories.sort();
}

function getAllTags() {
    const allTags = newsData.flatMap(news => news.tags);
    const uniqueTags = [...new Set(allTags)];
    return uniqueTags.sort();
}

module.exports = {
    getAllNews,
    getNewsById,
    getNewsBySlug,
    getNewsByCategory,
    getFeaturedNews,
    getRelatedNews,
    searchNews,
    getNewsCategories,
    getAllTags
};
