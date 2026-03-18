// YouTube Videos Integration
class YouTubeVideosManager {
    constructor() {
        this.apiKey = window.__GOOGLE_API_KEY__ || '';
        this.channelHandle = 'creativesmarttech';
        this.maxVideos = 6;
        this.DEBUG = false;
    }

    log(...args) {
        if (this.DEBUG) console.log('[YouTubeVideos]', ...args);
    }

    async init() {
        if (!this.apiKey) {
            this.log('No API key');
            this.showError('API key not configured');
            return;
        }
        try {
            await this.loadVideos();
        } catch (error) {
            this.log('Failed to load videos:', error);
            this.showError('Failed to load videos');
        }
    }

    showError(msg) {
        const container = document.querySelector('.youtube-grid');
        if (container) container.innerHTML = `<div class="youtube-loading">${msg}</div>`;
    }

    async loadVideos() {
        // Search for videos from the channel
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCL5u4u2kAytov22ITSXFI0g&maxResults=${this.maxVideos}&order=date&type=video&key=${this.apiKey}`;
        this.log('Fetching:', url);
        
        const response = await fetch(url);
        this.log('Response status:', response.status);
        
        if (!response.ok) {
            const err = await response.json();
            this.log('API Error:', err);
            this.showError('API error - check console');
            return;
        }
        
        const data = await response.json();
        this.log('Data:', data);
        
        if (!data.items || data.items.length === 0) {
            this.showError('No videos found');
            return;
        }
        
        const videos = data.items.map(item => ({
            id: item.id.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.medium?.url,
            publishedAt: new Date(item.snippet.publishedAt)
        }));
        
        this.renderVideos(videos);
    }

    renderVideos(videos) {
        const container = document.querySelector('.youtube-grid');
        if (!container) return;
        container.textContent = '';
        videos.forEach((video, index) => {
            container.appendChild(this.createVideoCard(video, index));
        });
    }

    createVideoCard(video, index) {
        const article = document.createElement('article');
        article.className = 'youtube-card glass hover-lift';
        article.style.animationDelay = `${(index + 1) * 0.1}s`;
        article.style.cursor = 'pointer';
        article.setAttribute('role', 'link');
        article.setAttribute('tabindex', '0');
        article.setAttribute('aria-label', `Watch video: ${video.title}`);
        const videoUrl = `https://www.youtube.com/watch?v=${video.id}`;
        article.onclick = () => window.open(videoUrl, '_blank', 'noopener,noreferrer');
        article.onkeydown = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); window.open(videoUrl, '_blank', 'noopener,noreferrer'); } };

        const thumbDiv = document.createElement('div');
        thumbDiv.className = 'youtube-thumbnail';
        const img = document.createElement('img');
        img.src = video.thumbnail;
        img.alt = video.title;
        img.loading = 'lazy';
        const playBtn = document.createElement('div');
        playBtn.className = 'play-button';
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        thumbDiv.appendChild(img);
        thumbDiv.appendChild(playBtn);

        const content = document.createElement('div');
        content.className = 'youtube-content';
        const title = document.createElement('h3');
        title.textContent = video.title;
        const date = document.createElement('span');
        date.className = 'youtube-date';
        date.textContent = video.publishedAt.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        content.appendChild(title);
        content.appendChild(date);

        article.appendChild(thumbDiv);
        article.appendChild(content);
        return article;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Wait briefly for config.js to set the API key
    setTimeout(() => new YouTubeVideosManager().init(), 100);
});
