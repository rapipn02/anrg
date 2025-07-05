# MBC Laboratory Landing Page

Landing page modern untuk MBC Laboratory - Pusat Riset Teknologi dan Konsultan Cybersecurity, Big Data Analytics, Game Technology, dan Geographic Information Systems (GIS).

## 🚀 Tech Stack

- **Backend**: Node.js + Express.js
- **Templating**: EJS (Embedded JavaScript)
- **Styling**: Tailwind CSS
- **Icons**: Font Awesome 6
- **Deployment**: Ready untuk Vercel, Netlify, atau cloud platform

## 📋 Fitur

- ✅ **Responsive Design** - Mobile-friendly dengan Tailwind CSS
- ✅ **Modern UI/UX** - Gradient backgrounds, animations, dan hover effects
- ✅ **Interactive Navigation** - Mobile menu dengan smooth scrolling
- ✅ **Contact Form** - Form kontak terintegrasi
- ✅ **SEO Optimized** - Meta tags dan struktur HTML semantik
- ✅ **Fast Loading** - CDN untuk assets dan optimized code

## 🏗️ Struktur Halaman

### 1. **Halaman Utama (Home)**
- Hero section dengan gradient background
- About section dengan feature cards
- Objectives section
- Call-to-action section

### 2. **Halaman Services**
- Detail layanan Cybersecurity
- Big Data Analytics
- Game Technology
- Geographic Information Systems

### 3. **Halaman Contact**
- Form kontak terintegrasi
- Informasi kontak perusahaan
- Google Maps integration (optional)

### 4. **Halaman Developer**
- Dokumentasi developer
- Informasi tim pengembang
- Links ke GitHub/Portfolio

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 atau lebih baru)
- npm atau yarn

### Installation

1. **Clone atau download project**
   ```bash
   git clone <repository-url>
   cd mbc-laboratory
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # atau
   npm start
   ```

4. **Open browser**
   ```
   http://localhost:3000
   ```

## 📝 Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server dengan nodemon
- `npm run build-css` - Build Tailwind CSS (jika menggunakan custom build)

## 🎨 Customization

### Colors
File `tailwind.config.js` berisi custom color palette:
- **Primary**: Blue tones untuk branding utama
- **Cyber**: Cyan tones untuk tema cybersecurity
- **Gradients**: Kombinasi warna untuk backgrounds

### Content
- Edit file `.ejs` di folder `views/` untuk mengubah konten
- Tambah atau ubah routes di `app.js`
- Styling tambahan bisa ditambahkan di `src/input.css`

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🔧 Configuration

### Environment Variables
```bash
PORT=3000                    # Port server (default: 3000)
NODE_ENV=development         # Environment mode
```

### Contact Form
Form kontak saat ini hanya menampilkan console.log. Untuk production:
1. Tambahkan email service (Nodemailer, SendGrid, dll)
2. Atau integrasikan dengan database
3. Tambahkan validasi dan sanitization

## 🚀 Deployment

### Vercel
1. Push ke GitHub repository
2. Connect dengan Vercel
3. Deploy otomatis

### Netlify
1. Build project: `npm run build`
2. Upload dist folder ke Netlify
3. Configure redirects untuk SPA

### Traditional Hosting
```bash
npm install --production
npm start
```

## 📊 Features Overview

| Feature | Status | Description |
|---------|--------|-------------|
| Responsive Design | ✅ | Mobile-first design |
| Modern UI | ✅ | Tailwind CSS + animations |
| Contact Form | ✅ | Basic form handling |
| SEO Ready | ✅ | Meta tags, semantic HTML |
| Fast Loading | ✅ | Optimized assets |
| SSL Ready | ✅ | HTTPS support |
| Analytics Ready | 🔄 | Google Analytics integration |
| Multi-language | 🔄 | i18n support |

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

MIT License - lihat file [LICENSE](LICENSE) untuk detail.

## 👥 Contact

**MBC Laboratory**
- Email: info@mbclaboratory.com
- Website: [mbclaboratory.com](https://mbclaboratory.com)
- Phone: +62 xxx-xxxx-xxxx

---

**Developed with ❤️ for MBC Laboratory**
