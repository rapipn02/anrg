# ANRG Laboratory Website

Website modern untuk Advanced Network Research Group (ANRG) Laboratory - Grup riset yang berfokus pada pengembangan solusi di bidang Software, Jaringan (seperti 5G), Cyber Security, dan Artificial Intelligence/Machine Learning (AI/ML).

## 🚀 Tech Stack

- **Backend**: Node.js + Express.js
- **Templating**: EJS (Embedded JavaScript)
- **Styling**: Tailwind CSS
- **Icons**: Font Awesome 6
- **Animations**: AOS (Animate On Scroll)
- **Deployment**: Ready untuk Vercel, Netlify, atau cloud platform

## 📋 Fitur

- ✅ **Responsive Design** - Mobile-friendly dengan Tailwind CSS
- ✅ **Modern UI/UX** - Gradient backgrounds, glass morphism, animations
- ✅ **Interactive Navigation** - Mobile menu dengan active page highlighting
- ✅ **Contact Form** - Form kontak dengan email integration
- ✅ **News & Events** - Sistem berita dan events dengan search & filter
- ✅ **Team Section** - Carousel tim dengan animasi
- ✅ **Partner Showcase** - Auto-scrolling partner logos
- ✅ **SEO Optimized** - Meta tags dan struktur HTML semantik
- ✅ **Fast Loading** - Optimized assets dan lazy loading

## 🏗️ Struktur Halaman

### 1. **Halaman Utama (Home)**
- Hero section dengan gradient background
- Partner carousel section
- About section dengan feature cards
- Latest news preview
- Recent events preview
- Team section dengan floating animations

### 2. **Halaman Services**
- Detail layanan Cybersecurity
- Software Development
- Network Solutions (5G)
- AI/ML Research

### 3. **Halaman News**
- Listing berita dengan pagination
- Search functionality
- Category filtering
- Individual news detail pages

### 4. **Halaman Events**
- Listing events dengan pagination
- Search functionality
- Status filtering (upcoming, ongoing, completed)
- Individual event detail pages

### 5. **Halaman Team**
- Grid layout tim dengan statistik
- Member profiles dengan hover effects
- Team carousel untuk homepage

### 6. **Halaman Contact**
- Form kontak terintegrasi dengan email
- Informasi kontak lengkap
- Social media links

### 7. **Halaman Developer**
- Dokumentasi developer
- Informasi tim pengembang
- Links ke GitHub/Portfolio

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 atau lebih baru)
- npm atau yarn
- Git

### Installation

### Installation

1. **Clone repository**
   ```bash
   git clone https://github.com/rapipn02/anrg.git
   cd anrg
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup Environment Variables**
   Buat file `.env` di root folder:
   ```env
   # Email Configuration (opsional untuk contact form)
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password

   # Environment
   NODE_ENV=development
   PORT=3000

   # Security
   SESSION_SECRET=your-secret-key-here
   ```

4. **Build Tailwind CSS**
   ```bash
   npm run build-css
   ```

5. **Start development server**
   ```bash
   npm run dev
   # atau untuk production
   npm start
   ```

6. **Open browser**
   ```
   http://localhost:3000
   ```

## 📝 Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server dengan nodemon
- `npm run build-css` - Build Tailwind CSS

## 🎨 Customization

### Colors
File `tailwind.config.js` berisi custom color palette:
- **Primary**: Blue tones untuk branding utama
- **Cyber**: Cyan tones untuk tema teknologi
- **Mint**: Green tones untuk accent
- **Gradients**: Kombinasi warna untuk backgrounds

### Content
- Edit file `.ejs` di folder `views/` untuk mengubah konten
- Tambah atau ubah routes di `app.js`
- Data untuk news dan events ada di folder `data/`
- Partner logos disimpan di `public/images/partners/`

### Partner Logos
Untuk menambah atau mengubah partner logos:
1. Simpan logo di folder `public/images/partners/`
2. Edit section partner di `views/index.ejs`
3. Format yang didukung: .jpg, .jpeg, .png, .svg

Partner logos yang saat ini ditampilkan:
- AD-RG (ad-rg.jpeg)
- Adaptive (adaptive.jpg)
- CPS (cps.jpg)
- Daskom (daskom.jpg)
- Fisdas (fisdas.jpg)
- MBC (mbc.jpg)
- Mobcom (mobcom.jpg)
- TIP (tip.jpg)

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

## � Troubleshooting

### Jika CSS tidak muncul:
```bash
npm run build-css
```

### Jika ada error port:
Ubah PORT di file `.env` atau:
```bash
PORT=4000 npm start
```

### Jika gambar partner tidak muncul:
Pastikan folder `public/images/partners/` berisi semua file logo:
- ad-rg.jpeg
- adaptive.jpg
- cps.jpg
- daskom.jpg
- fisdas.jpg
- mbc.jpg
- mobcom.jpg
- tip.jpg

### Jika contact form tidak berfungsi:
Setup email configuration di file `.env` dengan Gmail App Password

### Jika ada error `currentUrl is not defined`:
Restart server setelah update routes di `app.js`

## �🚀 Deployment

### Vercel (Recommended)
1. Push ke GitHub repository
2. Connect dengan Vercel account
3. Add environment variables di Vercel dashboard
4. Deploy otomatis

### Netlify
1. Build project: `npm run build-css`
2. Upload project ke Netlify
3. Configure environment variables

### Traditional Hosting (VPS/Shared Hosting)
```bash
npm install --production
npm run build-css
npm start
```

## 📞 Support

Jika mengalami masalah:
1. ✅ Node.js versi 16+ terinstall
2. ✅ Dependencies terinstall: `npm install`
3. ✅ CSS sudah di-build: `npm run build-css`
4. ✅ Port 3000 tidak digunakan aplikasi lain
5. ✅ File `.env` sudah dibuat dengan konfigurasi yang benar
6. ✅ Semua partner logo files ada di folder yang tepat

## 🤝 Contributing

1. Fork repository
2. Buat branch fitur: `git checkout -b feature/nama-fitur`
3. Commit perubahan: `git commit -am 'Tambah fitur baru'`
4. Push ke branch: `git push origin feature/nama-fitur`
5. Buat Pull Request

## 📄 License

Copyright © 2025 ANRG Laboratory. All rights reserved.

---

**Happy coding! 🎉**

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
