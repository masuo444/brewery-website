# 益々酒造 - Premium Sake Collection

![Van Cleef & Arpels Inspired Design](https://img.shields.io/badge/Design-Van%20Cleef%20%26%20Arpels%20Inspired-gold)
![Mobile First](https://img.shields.io/badge/Design-Mobile%20First-blue)
![Multilingual](https://img.shields.io/badge/Languages-4%20Languages-green)

A luxury sake catalog website designed for overseas VIPs and sake professionals visiting breweries. Features Van Cleef & Arpels inspired design with mobile-first responsive layout.

## 🍶 Overview

This premium sake collection website helps overcome language barriers for overseas VIPs visiting Japanese sake breweries. It features a curated collection of 10 fictional premium sake brands with comprehensive multilingual support.

## ✨ Features

### 🎨 Design
- **Van Cleef & Arpels Inspired**: Luxury color palette with warm golds, deep blacks, and pearl whites
- **Mobile-First Responsive**: Optimized for all devices with elegant scaling
- **Traditional Japanese Elements**: Authentic typography and cultural aesthetics

### 🌐 Advanced Translation System
- **8 Languages**: Japanese, English, French, Chinese, Korean, Italian, Spanish, Vietnamese
- **DeepL API Integration**: Professional-grade translation quality
- **Smart Caching**: Local storage for fast repeated translations
- **Real-time Translation**: Dynamic content translation without page reload
- **Cultural Localization**: Context-aware translations for sake terminology

### 🛍️ E-commerce Features
- **Product Catalog**: 10 premium sake brands with detailed information
- **Shopping Cart**: Full cart management with quantity controls
- **Stock Management**: Real-time inventory tracking
- **Price Display**: Formatted pricing in Japanese Yen

### 🤖 AI Features
- **AIソムリエ「サクラ」**: GPT-4搭載の専門AIアシスタント
- **QR Code Scanner**: Product information via QR scanning
- **Smart Search**: Multi-criteria product filtering
- **Natural Conversation**: Real-time chat with sake expertise
- **Personalized Recommendations**: Context-aware pairing suggestions

### 🏭 Brewery Experience
- **Virtual Tours**: Multilingual brewery tour system
- **Photo Gallery**: Interactive brewery showcase
- **Educational Content**: Traditional sake brewing process

## 📱 Mobile Experience

Designed with mobile-first principles:
- **Touch-Optimized Navigation**: Hamburger menu and touch-friendly controls
- **Responsive Grid**: Products adapt from 1 column (mobile) to 4 columns (desktop)
- **Optimized Typography**: Scalable fonts for all screen sizes
- **Performance**: Fast loading with minimal dependencies

## 🛠️ Technology Stack

- **Frontend**: Vanilla HTML5, CSS3, JavaScript ES6+
- **Styling**: CSS Grid, Flexbox, CSS Variables
- **Fonts**: Google Fonts (Playfair Display, Source Sans Pro, Noto Sans JP)
- **Icons**: Unicode emojis for universal compatibility
- **Storage**: Local Storage for cart and preferences

## 📂 Project Structure

```
masumasu-sake-website/
├── index.html              # Main homepage
├── css/
│   └── style.css           # Van Cleef & Arpels inspired styles
├── js/
│   ├── data.js            # Sake product database
│   └── script.js          # Main application logic
└── README.md              # This file
```

## 🚀 Getting Started

1. **Clone the Repository**
   ```bash
   git clone [repository-url]
   cd masumasu-sake-website
   ```

2. **Setup AI Sommelier (Optional)**
   ```bash
   # Copy the example config
   cp config/api-config.example.js config/api-config.js
   
   # Edit config/api-config.js and add your OpenAI API key
   # const OPENAI_API_KEY = 'your-api-key-here';
   ```

3. **Open in Browser**
   - Simply open `index.html` in any modern web browser
   - No build process required - pure vanilla implementation

4. **Local Development**
   - Use a local server for best experience:
   ```bash
   python -m http.server 8000
   # or
   npx serve .
   ```

## 📐 Design System

### Color Palette (Van Cleef & Arpels Inspired)
```css
--color-primary: #1A1A1A;     /* Deep Black */
--color-accent: #D4A574;      /* Warm Gold */
--color-secondary: #2B2B2B;   /* Charcoal */
--color-background: #FEFEFE;  /* Pure White */
--color-cream: #F8F6F3;      /* Warm Cream */
--color-rose: #E8C5A0;       /* Rose Gold */
--color-pearl: #F5F5F0;      /* Pearl White */
```

### Typography
- **Headings**: Playfair Display (luxury serif)
- **Body**: Source Sans Pro (clean sans-serif)
- **Japanese**: Noto Sans JP (authentic Japanese)
- **Script**: Dancing Script (elegant cursive)

### Responsive Breakpoints
- **Mobile**: < 768px (1 column grid)
- **Tablet**: 768px - 1024px (2-3 column grid)
- **Desktop**: > 1024px (4 column grid)

## 🍶 Product Features

Each sake product includes:
- **Multilingual Names**: Native and romanized names
- **Detailed Specifications**: Alcohol content, rice polish ratio, rice type
- **Tasting Notes**: Professional flavor profiles
- **Awards**: Recognition and accolades
- **Stock Management**: Real-time availability
- **Pricing**: Premium pricing in Japanese Yen (¥8,000 - ¥30,000)

## 🎯 Target Audience

- **Overseas VIPs**: High-net-worth individuals interested in premium Japanese sake
- **Sake Professionals**: Importers, distributors, and industry experts
- **Cultural Enthusiasts**: Travelers seeking authentic Japanese experiences
- **Collectors**: Rare and limited edition sake enthusiasts

## 🌟 Key Differentiators

1. **Luxury Design**: Van Cleef & Arpels inspired aesthetic
2. **Cultural Authenticity**: Genuine Japanese brewery experience
3. **Language Accessibility**: Comprehensive multilingual support
4. **Mobile Excellence**: Superior mobile experience
5. **AI Enhancement**: Intelligent sake recommendations

## 📈 Performance

- **Lightweight**: No external frameworks or heavy dependencies
- **Fast Loading**: Optimized images and minimal HTTP requests
- **Smooth Animations**: Hardware-accelerated CSS transitions
- **Responsive**: Instant layout adaptation

## 🔧 Customization

The website is designed for easy customization:

1. **Products**: Modify `js/data.js` to add/edit sake products
2. **Styling**: Update CSS variables in `css/style.css`
3. **Languages**: Extend translation objects for new languages
4. **Features**: Add new functionality in `js/script.js`

## 📝 License

This project is designed for Masumasu Brewery (益々酒造) - a fictional premium sake brand created for demonstration purposes.

## 🤝 Contributing

This is a specialized project for sake brewery tourism. For suggestions or improvements, please consider the target audience and maintain the luxury aesthetic.

---

**益々酒造** - *Bringing traditional Japanese sake craftsmanship to the world through elegant digital experiences.*

🍶 *Kampai!* 🍶