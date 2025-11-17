# Santhosh Anand - Professional Portfolio

A modern, responsive, and accessible portfolio website showcasing 13+ years of software development and team leadership experience.

## 🌟 Features

- **Responsive Design**: Optimized for all devices and screen sizes
- **Dark Mode**: Toggle between light and dark themes
- **PWA Support**: Installable as a mobile app
- **Offline Support**: Service worker for offline functionality
- **SEO Optimized**: Meta tags, structured data, and sitemap
- **Accessibility**: WCAG 2.1 AA compliant
- **Performance**: Optimized for Core Web Vitals
- **Contact Form**: EmailJS integration with validation
- **Security**: CSP headers and security best practices

## 🚀 Quick Start

### Prerequisites
- Modern web browser
- Web server (for local development)
- EmailJS account (for contact form)

### Local Development
```bash
# Clone or download the project
cd Website

# Install development dependencies (optional)
npm install

# Start local server
npm run serve
# or
npx http-server . -p 3000

# Open http://localhost:3000
```

### Production Build
```bash
# Run build validation
npm run build

# Run HTML validation
npm run validate

# Run Lighthouse audit
npm run lighthouse
```

## 📁 Project Structure

```
Website/
├── index.html          # Main HTML file
├── styles.css          # Stylesheet
├── script.js           # JavaScript functionality
├── sw.js              # Service worker
├── manifest.json      # PWA manifest
├── sitemap.xml        # SEO sitemap
├── robots.txt         # Search engine directives
├── .htaccess          # Apache server configuration
├── Photo.jpeg         # Profile photo
├── Santhosh_Anand_Senior_Development_Manager.docx
├── deploy.md          # Deployment guide
├── build.js           # Build script
├── package.json       # NPM configuration
└── README.md          # This file
```

## ⚙️ Configuration

### 1. EmailJS Setup
1. Create account at [EmailJS](https://emailjs.com)
2. Create email service and template
3. Update `script.js` with your credentials:
```javascript
const EMAIL_CONFIG = {
    serviceId: 'your_service_id',
    templateId: 'your_template_id',
    publicKey: 'your_public_key'
};
```

### 2. Domain Configuration
Currently configured for GitHub Pages: `https://santhuanand.github.io/Portfilio`
To use a custom domain, update:
- `index.html` (meta tags, canonical URL)
- `sitemap.xml`
- `manifest.json`

### 3. Content Customization
- Replace `Photo.jpeg` with your photo
- Update contact information
- Modify experience, skills, and portfolio sections
- Replace resume document

## 🎨 Customization

### Colors
Primary colors are defined in CSS variables:
```css
:root {
    --primary: #2563eb;
    --secondary: #64748b;
    --accent: #3b82f6;
}
```

### Fonts
Using Inter font family from Google Fonts. Change in HTML head:
```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### Sections
Each section is modular and can be:
- Reordered by moving HTML blocks
- Hidden by adding `style="display: none;"`
- Customized by editing content and styles

## 🔧 Development

### Code Quality
- Semantic HTML5
- Modern CSS with Flexbox/Grid
- Vanilla JavaScript (ES6+)
- Progressive enhancement
- Mobile-first approach

### Performance
- Optimized images
- Minified resources
- Service worker caching
- Lazy loading
- Critical CSS inlined

### Accessibility
- ARIA labels and roles
- Keyboard navigation
- Screen reader support
- Color contrast compliance
- Focus management

## 📱 PWA Features

- Installable on mobile devices
- Offline functionality
- App-like experience
- Custom splash screen
- Theme color integration

## 🔒 Security

- Content Security Policy
- XSS protection
- Clickjacking prevention
- HTTPS enforcement
- Input sanitization

## 📊 SEO Features

- Structured data (JSON-LD)
- Open Graph tags
- Twitter Cards
- XML sitemap
- Robots.txt
- Canonical URLs

## 🚀 Deployment

### Static Hosting (Recommended)
- **GitHub Pages**: Currently deployed at https://santhuanand.github.io/Portfilio
- **Netlify**: Drag and drop deployment
- **Vercel**: Git integration
- **AWS S3**: Scalable hosting

### Traditional Hosting
- Upload via FTP/SFTP
- Configure SSL certificate
- Set up custom domain

See `deploy.md` for detailed deployment instructions.

## 🧪 Testing

### Manual Testing
- [ ] All links work
- [ ] Contact form submits
- [ ] Mobile responsiveness
- [ ] Dark mode toggle
- [ ] PWA installation
- [ ] Offline functionality

### Automated Testing
```bash
# HTML validation
npm run validate

# Performance audit
npm run lighthouse

# Accessibility testing
# Use axe-core browser extension
```

## 📈 Performance Metrics

Target scores:
- **Performance**: >90
- **Accessibility**: >95
- **Best Practices**: >90
- **SEO**: >90

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## 📄 License

MIT License - feel free to use this template for your own portfolio.

## 📞 Support

For questions or support:
- Email: santhuanand7@gmail.com
- LinkedIn: [santhoshanand](https://linkedin.com/in/santhoshanand)

## 🙏 Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- EmailJS for contact form functionality
- Modern web standards and best practices

---

**Built with ❤️ by Santhosh Anand**