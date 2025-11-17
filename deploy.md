# Deployment Guide

## Pre-deployment Checklist

### 1. EmailJS Setup
- Create account at https://emailjs.com
- Create a service (Gmail, Outlook, etc.)
- Create an email template with variables: `{{from_name}}`, `{{from_email}}`, `{{subject}}`, `{{message}}`
- Update `script.js` with your actual:
  - Service ID (replace `service_portfolio`)
  - Template ID (replace `template_contact`)
  - Public Key (replace `user_portfolio_key`)

### 2. Domain Configuration
- Update all instances of `https://santhoshanand.dev` with your actual domain
- Update canonical URLs in HTML
- Update sitemap.xml with your domain
- Update Open Graph URLs

### 3. Image Optimization
- Optimize `Photo.jpeg` (compress, resize to 300x300px)
- Create favicon.ico (16x16, 32x32 sizes)
- Create apple-touch-icon.png (180x180px)
- Create PWA icons (192x192px and 512x512px)

### 4. Content Updates
- Update contact information
- Update LinkedIn profile URL
- Update phone number and email
- Update resume/portfolio document

## Deployment Options

### Option 1: Static Hosting (Recommended)
- **Netlify**: Drag and drop the Website folder
- **Vercel**: Connect GitHub repository
- **GitHub Pages**: Push to repository, enable Pages
- **AWS S3 + CloudFront**: Upload files, configure distribution

### Option 2: Traditional Web Hosting
- Upload all files via FTP/SFTP
- Ensure .htaccess is uploaded for Apache servers
- Configure SSL certificate
- Set up custom domain

## Performance Optimization

### 1. Image Optimization
```bash
# Convert images to WebP format
cwebp Photo.jpeg -o Photo.webp -q 80

# Create responsive images
convert Photo.jpeg -resize 150x150 Photo-150.jpeg
convert Photo.jpeg -resize 300x300 Photo-300.jpeg
```

### 2. Minification (Optional)
- Minify CSS and JavaScript files
- Use tools like UglifyJS, CleanCSS
- Or use build tools like Webpack, Vite

### 3. CDN Setup
- Use CloudFlare for global CDN
- Configure caching rules
- Enable auto-minification

## Security Configuration

### 1. SSL Certificate
- Obtain SSL certificate (Let's Encrypt recommended)
- Configure HTTPS redirect
- Update all internal links to HTTPS

### 2. Security Headers
- The .htaccess file includes security headers
- For Nginx, convert .htaccess rules to nginx.conf
- Test security headers at securityheaders.com

### 3. Content Security Policy
- Review and adjust CSP in .htaccess
- Test with browser developer tools
- Whitelist only necessary external domains

## SEO Configuration

### 1. Google Search Console
- Add and verify your domain
- Submit sitemap.xml
- Monitor indexing status

### 2. Google Analytics (Optional)
- Create GA4 property
- Add tracking code to HTML head
- Configure goals and conversions

### 3. Schema Markup
- The structured data is already included
- Test with Google's Rich Results Test
- Monitor rich snippets in search results

## Monitoring and Maintenance

### 1. Performance Monitoring
- Use Google PageSpeed Insights
- Monitor Core Web Vitals
- Set up uptime monitoring

### 2. Regular Updates
- Update dependencies monthly
- Review and update content quarterly
- Monitor security vulnerabilities

### 3. Backup Strategy
- Regular backups of website files
- Version control with Git
- Database backups (if applicable)

## Testing Checklist

- [ ] All links work correctly
- [ ] Contact form sends emails
- [ ] Mobile responsiveness
- [ ] Dark mode toggle works
- [ ] All images load properly
- [ ] SEO meta tags are correct
- [ ] PWA installation works
- [ ] Offline functionality works
- [ ] Performance scores >90
- [ ] Accessibility scores >95
- [ ] Security headers configured

## Post-deployment

1. Test website on multiple devices and browsers
2. Submit to search engines
3. Set up monitoring and analytics
4. Create social media profiles linking to website
5. Update business cards and email signatures