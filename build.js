// Enhanced build script with proper error handling
'use strict';

const fs = require('fs');
const path = require('path');

let CleanCSS, UglifyJS;
try { CleanCSS = require('clean-css'); } catch { CleanCSS = null; }
try { UglifyJS = require('uglify-js'); } catch { UglifyJS = null; }

async function buildProject() {
    try {
        console.log('🚀 Building production version...');
        
        const requiredFiles = ['sw.js', 'index.html', 'script.js'];
        for (const file of requiredFiles) {
            const filePath = path.join(__dirname, file);
            if (!fs.existsSync(filePath)) {
                throw new Error(`Required file missing: ${file}`);
            }
        }
        
        await updateServiceWorkerVersion();
        await minifyAssets();
        await validateHtmlStructure();
        await checkPlaceholders();
        
        console.log('✅ Build completed successfully!');
        console.log('\n📋 Next steps:');
        console.log('1. Replace EmailJS configuration in script.js');
        console.log('2. Update domain URLs in HTML and sitemap.xml');
        console.log('3. Optimize and add favicon and PWA icons');
        console.log('4. Test the website thoroughly');
        console.log('5. Deploy to your hosting provider');
        
    } catch (error) {
        console.error('❌ Build failed:', error.message);
        process.exit(1);
    }
}

async function updateServiceWorkerVersion() {
    try {
        const swPath = path.join(__dirname, 'sw.js');
        const swContent = await fs.promises.readFile(swPath, 'utf8');
        const newVersion = `v${Date.now()}`;
        const updatedSw = swContent.replace(/v[\d.]+/, newVersion);
        await fs.promises.writeFile(swPath, updatedSw);
        console.log(`✅ Updated service worker cache version to ${newVersion}`);
    } catch (error) {
        throw new Error(`Service worker update failed: ${error.message}`);
    }
}

async function validateHtmlStructure() {
    try {
        const htmlPath = path.join(__dirname, 'index.html');
        const htmlContent = await fs.promises.readFile(htmlPath, 'utf8');
        
        const requiredElements = [
            '<title>',
            '<meta name="description"',
            '<meta property="og:title"',
            'application/ld+json',
            '<main id="main-content">',
            'role="alert"'
        ];
        
        const missingElements = requiredElements.filter(element => 
            !htmlContent.includes(element)
        );
        
        if (missingElements.length > 0) {
            throw new Error(`Missing required HTML elements: ${missingElements.join(', ')}`);
        }
        
        console.log('✅ HTML validation passed');
    } catch (error) {
        throw new Error(`HTML validation failed: ${error.message}`);
    }
}

async function checkPlaceholders() {
    try {
        const placeholders = [
            'YOUR_SERVICE_ID',
            'YOUR_TEMPLATE_ID', 
            'YOUR_PUBLIC_KEY',
            'https://santhoshanand.dev'
        ];
        
        const jsPath = path.join(__dirname, 'script.js');
        const htmlPath = path.join(__dirname, 'index.html');
        
        const [jsContent, htmlContent] = await Promise.all([
            fs.promises.readFile(jsPath, 'utf8'),
            fs.promises.readFile(htmlPath, 'utf8')
        ]);
        
        const foundPlaceholders = placeholders.filter(placeholder => 
            jsContent.includes(placeholder) || htmlContent.includes(placeholder)
        );
        
        if (foundPlaceholders.length > 0) {
            console.warn(`⚠️  Found placeholders that should be replaced: ${foundPlaceholders.join(', ')}`);
        }
    } catch (error) {
        console.warn(`Placeholder check failed: ${error.message}`);
    }
}

async function minifyAssets() {
    // Only minify in CI environment to avoid destroying source files locally
    if (!process.env.CI) {
        console.log('ℹ️  Skipping minification (not in CI). Set CI=true to enable.');
        return;
    }

    if (CleanCSS) {
        const cssPath = path.join(__dirname, 'styles.css');
        if (fs.existsSync(cssPath)) {
            const css = await fs.promises.readFile(cssPath, 'utf8');
            const minified = new CleanCSS({ level: 2 }).minify(css);
            if (minified.styles) {
                await fs.promises.writeFile(cssPath, minified.styles);
                const saved = ((1 - minified.styles.length / css.length) * 100).toFixed(1);
                console.log(`✅ CSS minified (${saved}% reduction)`);
            }
        }
    } else {
        console.warn('⚠️  clean-css not installed, skipping CSS minification');
    }

    if (UglifyJS) {
        const jsFiles = ['script.js', 'linkedin-posts.js', 'youtube-videos.js'];
        for (const file of jsFiles) {
            const jsPath = path.join(__dirname, file);
            if (fs.existsSync(jsPath)) {
                const js = await fs.promises.readFile(jsPath, 'utf8');
                const result = UglifyJS.minify(js);
                if (result.code) {
                    await fs.promises.writeFile(jsPath, result.code);
                    const saved = ((1 - result.code.length / js.length) * 100).toFixed(1);
                    console.log(`✅ ${file} minified (${saved}% reduction)`);
                }
            }
        }
    } else {
        console.warn('⚠️  uglify-js not installed, skipping JS minification');
    }
}

buildProject();
