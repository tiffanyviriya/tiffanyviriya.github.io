# Tiffany's Portfolio

Website portfolio - Tiffany Viriya Chu / 18224068. 
Aku buat website ini dengan isi berupa profil singkat, experiences, awards, hingga selected works.

## Tech Stack
- **HTML5** untuk struktur halaman
- **CSS3** untuk styling custom, responsive layout, dan animation
- **Vanilla JavaScript** untuk render contents dan interactions
- **Google Fonts**:
  - DM Sans
  - Instrument Serif

## Halaman
- `index.html` - page utama portfolio berisi hero, services ticker, about section, experience, awards, dan contact CTA
- `works.html` - page selected works berisi kartu project dan link project

Kedua pages menggunakan sumber data dan logic render yang sama dari `js/data.js` dan `js/app.js`.

## Struktur Project
```text
.
├── assets/
│   ├── about/          
│   ├── works/          
│   ├── favicon.ico
│   ├── me.jpeg
│   └── me-transparent.png
├── css/
│   └── styles.css      
├── js/
│   ├── app.js          
│   └── data.js         
├── index.html         
├── works.html          
└── README.md
```

## Features
- Responsive portfolio layout
- Fixed navigation dengan scroll state
- Dynamic content rendering dari satu file data
- Services/skills marquee ticker
- Interactive about photo collage
- Scroll reveal animation dengan dukungan reduced motion
- Project cards dengan hover overlay dan external link
- Basic SEO metadata dan Open Graph tags

