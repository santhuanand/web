// Videos page logic
(function () {
    function AllVideosManager() {
        this.apiKey = window.__API_KEY__ || '';
        this.channelId = window.__YT_CHANNEL_ID__ || '';
        this.sheetId = window.__YT_SHEET_ID__ || '';
        this.sheetRange = window.__YT_SHEET_RANGE__ || '';
        this.videosPerPage = 9;
        this.nextPageToken = null;
        this.isLoading = false;
        this.usingSheet = false;
    }

    AllVideosManager.prototype.init = async function () {
        if (!this.apiKey) return;
        try { await this.loadVideos(); }
        catch (err) {
            console.error('API failed, trying Sheet fallback:', err);
            try { await this.loadFromSheet(); }
            catch (e2) { console.error('Sheet fallback also failed:', e2); this.showError(); }
        }
        this.setupLoadMore();
    };

    AllVideosManager.prototype.showError = function () {
        var c = document.getElementById('allVideosGrid');
        if (c) c.innerHTML = '<div class="youtube-loading"><p>Unable to load videos right now</p><a href="https://www.youtube.com/@creativesmarttech" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="margin-top:15px"><i class="fab fa-youtube"></i> Visit Channel</a></div>';
    };

    AllVideosManager.prototype.extractVideoId = function (url) {
        if (!url) return null;
        var m = url.match(/(?:v=|youtu\.be\/|\/embed\/|\/v\/)([a-zA-Z0-9_-]{11})/);
        return m ? m[1] : null;
    };

    AllVideosManager.prototype.loadFromSheet = async function () {
        if (!this.sheetId || !this.sheetRange) throw new Error('No sheet config');
        var url = 'https://sheets.googleapis.com/v4/spreadsheets/' + this.sheetId + '/values/' + encodeURIComponent(this.sheetRange) + '?key=' + this.apiKey;
        var res = await fetch(url);
        if (!res.ok) throw new Error('Sheet API error');
        var data = await res.json();
        if (!data.values || data.values.length < 2) throw new Error('No sheet data');
        var videos = [], self = this;
        for (var i = 1; i < data.values.length; i++) {
            var row = data.values[i];
            if (!row || row.length < 4 || !row[3]) continue;
            var vid = self.extractVideoId(row[3]);
            if (!vid) continue;
            videos.push({ id: vid, title: row[2] || 'YouTube Video', thumbnail: 'https://i.ytimg.com/vi/' + vid + '/hqdefault.jpg', publishedAt: new Date(row[1] || '') });
        }
        videos.sort(function (a, b) { return b.publishedAt - a.publishedAt; });
        this.usingSheet = true;
        document.getElementById('loadMoreContainer').style.display = 'none';
        this.renderVideos(videos, false);
    };

    AllVideosManager.prototype.loadVideos = async function (append) {
        if (this.isLoading || this.usingSheet) return;
        this.isLoading = true;
        var btn = document.getElementById('loadMoreBtn');
        if (btn) btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        var url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=' + this.channelId + '&maxResults=' + this.videosPerPage + '&order=date&type=video&key=' + this.apiKey;
        if (this.nextPageToken) url += '&pageToken=' + this.nextPageToken;
        try {
            var res = await fetch(url);
            if (!res.ok) throw new Error('API error');
            var data = await res.json();
            this.nextPageToken = data.nextPageToken || null;
            document.getElementById('loadMoreContainer').style.display = this.nextPageToken ? 'flex' : 'none';
            var videos = (data.items || []).map(function (item) {
                return { id: item.id.videoId, title: item.snippet.title, thumbnail: (item.snippet.thumbnails.high || item.snippet.thumbnails.medium || {}).url, publishedAt: new Date(item.snippet.publishedAt) };
            });
            this.renderVideos(videos, append);
        } finally {
            this.isLoading = false;
            if (btn) btn.innerHTML = '<i class="fas fa-plus"></i> Load More Videos';
        }
    };

    AllVideosManager.prototype.renderVideos = function (videos, append) {
        var container = document.getElementById('allVideosGrid');
        if (!append) container.innerHTML = '';
        videos.forEach(function (video) {
            var card = document.createElement('article');
            card.className = 'youtube-card glass hover-lift';
            card.style.cursor = 'pointer';
            card.setAttribute('role', 'link');
            card.setAttribute('tabindex', '0');
            card.setAttribute('aria-label', 'Watch video: ' + video.title);
            card.addEventListener('click', function () { window.open('https://www.youtube.com/watch?v=' + video.id, '_blank', 'noopener,noreferrer'); });
            card.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); window.open('https://www.youtube.com/watch?v=' + video.id, '_blank', 'noopener,noreferrer'); } });
            var thumbDiv = document.createElement('div');
            thumbDiv.className = 'youtube-thumbnail';
            var img = document.createElement('img');
            img.src = video.thumbnail;
            img.alt = video.title;
            img.loading = 'lazy';
            var playBtn = document.createElement('div');
            playBtn.className = 'play-button';
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
            thumbDiv.appendChild(img);
            thumbDiv.appendChild(playBtn);
            var contentDiv = document.createElement('div');
            contentDiv.className = 'youtube-content';
            var h3 = document.createElement('h3');
            h3.textContent = video.title;
            var dateSpan = document.createElement('span');
            dateSpan.className = 'youtube-date';
            dateSpan.textContent = video.publishedAt.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
            contentDiv.appendChild(h3);
            contentDiv.appendChild(dateSpan);
            card.appendChild(thumbDiv);
            card.appendChild(contentDiv);
            container.appendChild(card);
        });
    };

    AllVideosManager.prototype.setupLoadMore = function () {
        var self = this;
        var btn = document.getElementById('loadMoreBtn');
        if (btn) btn.addEventListener('click', function () { self.loadVideos(true); });
    };

    document.addEventListener('DOMContentLoaded', function () {
        setTimeout(function () { new AllVideosManager().init(); }, 100);
    });
})();
