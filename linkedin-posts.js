// LinkedIn Posts Integration with Google Sheets
class LinkedInPostsManager {
    constructor() {
        this.sheetId = '12DsWwpdqIcNTPyusaPuINW6_BAPtRrVdA-s9ZFPGWKc';
        this.apiKey = 'AIzaSyCSlh_Z9L00p1E1cyyzK_ZRU5krep50E_E'; // You need to get this from Google Cloud Console
        this.range = 'Website Post!A:G'; // Columns A to G from the Website Post tab
        this.maxPosts = 3;
    }

    

    // Initialize and load posts
    async init() {
        console.log('Initializing LinkedIn Posts Manager...');
        this.showLoadingSpinner();
        try {
            await this.loadPosts();
            console.log('LinkedIn posts loaded successfully!');
        } catch (error) {
            console.error('Failed to load LinkedIn posts:', error);
            this.showFallbackContent();
        } finally {
            this.hideLoadingSpinner();
        }
    }

    // Fetch data from Google Sheets
    async loadPosts() {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.sheetId}/values/${this.range}?key=${this.apiKey}`;
        console.log('Fetching data from:', url.replace(this.apiKey, 'API_KEY_HIDDEN'));
        
        const response = await fetch(url);
        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Response Error:', response.status, errorText);
            throw new Error(`Failed to fetch sheet data: ${response.status} - ${errorText}`);
        }
        
        const data = await response.json();
        console.log('Sheet data received:', data);
        
        if (!data.values || data.values.length === 0) {
            console.warn('No data found in sheet');
            return;
        }
        
        const posts = this.parseSheetData(data.values);
        console.log('Parsed posts:', posts);
        this.renderPosts(posts);
    }

    // Parse sheet data into post objects
    parseSheetData(rows) {
        if (!rows || rows.length < 2) {
            console.warn('Not enough rows in sheet data');
            return [];
        }
        
        const headers = rows[0];
        console.log('Sheet headers:', headers);
        
        // Find column indices based on header names
        const columnMap = {};
        headers.forEach((header, index) => {
            const cleanHeader = header.toLowerCase().trim();
            console.log(`Header ${index}: "${header}" -> "${cleanHeader}"`);
            if (cleanHeader === 'date' || header.trim() === 'Date') columnMap.date = index;
            if (cleanHeader.includes('linkedin post title')) columnMap.title = index;
            if (cleanHeader.includes('post content')) columnMap.content = index;
            if (cleanHeader === 'imageurl' || header.trim() === 'imageUrl' || cleanHeader.includes('image')) columnMap.image = index;
        });
        
        console.log('Column mapping:', columnMap);
        const posts = [];
        
        for (let i = 1; i < Math.min(rows.length, this.maxPosts + 1); i++) {
            const row = rows[i];
            console.log(`Processing row ${i}:`, row);
            
            if (row && row.length >= 2) {
                const imageUrl = row[columnMap.image] || null;
                console.log(`Row ${i} image URL:`, imageUrl);
                
                const post = {
                    date: this.formatDate(row[columnMap.date] || ''),
                    title: row[columnMap.title] || 'Untitled Post',
                    description: row[columnMap.content] || '',
                    category: 'LinkedIn Post',
                    tags: [],
                    linkedinUrl: '#',
                    imageUrl: imageUrl
                };
                posts.push(post);
                console.log('Added post:', post);
            } else {
                console.warn(`Skipping row ${i} - insufficient data:`, row);
            }
        }
        
        return posts;
    }

    // Format date for display
    formatDate(dateString) {
        console.log('Formatting date:', dateString, 'Type:', typeof dateString);
        
        if (!dateString || dateString.trim() === '') {
            console.log('Empty date string, using current date');
            return new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
        }
        
        try {
            // Handle various date formats
            let date;
            
            // If it's already a valid date string
            if (dateString.includes('/') || dateString.includes('-')) {
                date = new Date(dateString);
            }
            // If it's a number (Excel serial date)
            else if (!isNaN(dateString)) {
                // Excel date serial number (days since 1900-01-01)
                const excelEpoch = new Date(1900, 0, 1);
                date = new Date(excelEpoch.getTime() + (dateString - 2) * 24 * 60 * 60 * 1000);
            }
            // Try parsing as-is
            else {
                date = new Date(dateString);
            }
            
            console.log('Parsed date object:', date, 'Valid:', !isNaN(date.getTime()));
            
            if (isNaN(date.getTime())) {
                console.log('Invalid date, returning original string');
                return dateString;
            }
            
            const formatted = date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short' 
            });
            console.log('Formatted date:', formatted);
            return formatted;
        } catch (error) {
            console.error('Date formatting error:', error);
            return dateString;
        }
    }

    // Render posts to the insights section
    renderPosts(posts) {
        const insightsGrid = document.querySelector('.insights-grid');
        if (!insightsGrid) return;

        // Clear existing content
        insightsGrid.innerHTML = '';

        posts.forEach((post, index) => {
            const postElement = this.createPostElement(post, index);
            insightsGrid.appendChild(postElement);
        });
    }

    // Create individual post element
    createPostElement(post, index) {
        const article = document.createElement('article');
        article.className = 'insight-card';
        article.style.animationDelay = `${(index + 1) * 0.1}s`;

        console.log(`Creating post ${index}:`, {
            hasImageUrl: !!post.imageUrl,
            imageUrl: post.imageUrl,
            isValid: post.imageUrl ? this.isValidImageUrl(post.imageUrl) : false,
            proxyUrl: post.imageUrl ? this.getProxyImageUrl(post.imageUrl) : null
        });

        article.innerHTML = `
            <div class="insight-content">
                <div class="insight-meta">
                    <span class="insight-date">${post.date}</span>
                    <span class="insight-category">${post.category}</span>
                </div>
                <h3>${this.sanitizeText(post.title)}</h3>
                <div class="insight-description" style="white-space: pre-line; line-height: 1.6; margin-bottom: 20px;">${this.sanitizeText(post.description)}</div>
                <div class="insight-tags">
                    ${post.tags.map(tag => `<span>${this.sanitizeText(tag)}</span>`).join('')}
                </div>
            </div>
        `;

        return article;
    }

    // Try fallback image URLs when primary fails
    tryFallbackImage(imgElement, originalUrl) {
        console.log('Image failed, trying fallback for:', originalUrl);
        
        if (originalUrl && originalUrl.includes('drive.google.com/file/d/')) {
            const fileIdMatch = originalUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
            if (fileIdMatch) {
                const fallbackUrl = `https://drive.google.com/uc?export=view&id=${fileIdMatch[1]}`;
                console.log('Trying fallback URL:', fallbackUrl);
                imgElement.src = fallbackUrl;
                imgElement.onerror = () => {
                    console.log('All image URLs failed, hiding image');
                    imgElement.parentElement.style.display = 'none';
                };
            }
        } else {
            imgElement.parentElement.style.display = 'none';
        }
    }

    // Convert Google Drive share URL to direct image URL
    convertGoogleDriveUrl(url) {
        if (!url || url.trim() === '') {
            console.log('No URL provided');
            return null;
        }
        
        console.log('Original URL from sheet:', url);
        
        // Handle existing public access formats including export=download
        if (url.includes('drive.google.com/uc?id=') || url.includes('drive.usercontent.google.com')) {
            // Convert download URLs to view URLs for image display
            if (url.includes('export=download')) {
                const viewUrl = url.replace('&export=download', '');
                console.log('Converting download URL to view URL:', viewUrl);
                return viewUrl;
            }
            console.log('Using existing public URL:', url);
            return url;
        }
        
        // Convert share URLs to public viewable format
        if (url.includes('drive.google.com/file/d/')) {
            const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
            if (fileIdMatch) {
                const directUrl = `https://drive.google.com/uc?id=${fileIdMatch[1]}`;
                console.log('Converted share URL to public:', directUrl);
                return directUrl;
            }
        }
        
        // Try to extract file ID from any Google Drive URL format
        const idMatch = url.match(/[?&]id=([a-zA-Z0-9-_]+)/) || url.match(/\/d\/([a-zA-Z0-9-_]+)/);
        if (idMatch && url.includes('drive.google.com')) {
            const directUrl = `https://drive.google.com/uc?id=${idMatch[1]}`;
            console.log('Extracted ID and created view URL:', directUrl);
            return directUrl;
        }
        
        console.log('Using original URL as-is:', url);
        return url;
    }

    // Sanitize text content
    sanitizeText(text) {
        if (typeof text !== 'string') return '';
        return text.replace(/[<>\"'&]/g, function(match) {
            const escapeMap = {
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#x27;',
                '&': '&amp;'
            };
            return escapeMap[match];
        });
    }

    // Validate image URL
    isValidImageUrl(url) {
        if (!url || typeof url !== 'string') {
            console.log('Invalid image URL - not a string:', url);
            return false;
        }
        
        try {
            new URL(url);
        } catch {
            console.log('Invalid image URL - malformed URL:', url);
            return false;
        }
        
        console.log('Validating image URL:', url);
        
        // More permissive validation - allow any URL that looks like an image
        const imageExtensions = /\.(jpg|jpeg|png|gif|webp|svg|bmp|tiff)$/i;
        const imageHosts = /(imgur\.com|unsplash\.com|pexels\.com|pixabay\.com|drive\.google\.com|dropbox\.com|amazonaws\.com|cloudinary\.com)/i;
        const hasImageExtension = imageExtensions.test(url);
        const isImageHost = imageHosts.test(url);
        
        console.log('Image validation - extension:', hasImageExtension, 'host:', isImageHost);
        
        // If it's a known image host or has image extension, allow it
        // Also allow any HTTPS URL as a fallback
        return hasImageExtension || isImageHost || url.startsWith('https://');
    }
    
    // Get proxy URL for images
    getProxyImageUrl(url) {
        console.log('Processing image URL:', url);
        
        if (url.includes('drive.google.com')) {
            const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
            console.log('Google Drive file ID match:', fileIdMatch);
            
            if (fileIdMatch) {
                const directUrl = `https://drive.google.com/uc?export=view&id=${fileIdMatch[1]}`;
                console.log('Converted Google Drive URL to:', directUrl);
                return directUrl;
            }
        }
        
        if (url.includes('linkedin.com') || url.includes('licdn.com')) {
            console.log('Skipping LinkedIn image due to CORS');
            return null;
        }
        
        console.log('Using original URL:', url);
        return url;
    }

    // Show loading spinner
    showLoadingSpinner() {
        const insightsGrid = document.querySelector('.insights-grid');
        if (insightsGrid) {
            insightsGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: #6b7280;">
                    <div style="display: inline-block; width: 40px; height: 40px; border: 4px solid #e5e7eb; border-radius: 50%; border-top-color: #2563eb; animation: spin 1s ease-in-out infinite; margin-bottom: 1rem;"></div>
                    <p>Loading latest insights...</p>
                    <style>
                        @keyframes spin {
                            to { transform: rotate(360deg); }
                        }
                    </style>
                </div>
            `;
        }
    }

    // Hide loading spinner
    hideLoadingSpinner() {
        // Spinner will be replaced by actual content or fallback
    }

    // Show fallback content if API fails
    showFallbackContent() {
        console.log('Using fallback content for insights section');
        const insightsGrid = document.querySelector('.insights-grid');
        if (insightsGrid) {
            insightsGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: #6b7280;">
                    <p>Unable to load latest posts. Please check back later.</p>
                </div>
            `;
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const linkedInManager = new LinkedInPostsManager();
    linkedInManager.init();
});