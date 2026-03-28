// Articles page logic
(function () {
    function AllArticlesManager() {
        this.sheetId = window.__YT_SHEET_ID__ || '';
        this.apiKey = window.__API_KEY__ || '';
        this.range = window.__LI_SHEET_RANGE__ || 'LinkedIn Articles!A:D';
        this.categories = [
            { keywords: ['leadership', 'team', 'management', 'leader', 'mentor'], icon: 'fas fa-users-cog', colors: ['#667eea', '#764ba2'] },
            { keywords: ['ai', 'artificial', 'machine', 'automation', 'copilot', 'chatgpt'], icon: 'fas fa-robot', colors: ['#f093fb', '#f5576c'] },
            { keywords: ['cloud', 'aws', 'azure', 'devops', 'infrastructure'], icon: 'fas fa-cloud', colors: ['#4facfe', '#00f2fe'] },
            { keywords: ['code', 'developer', 'programming', 'software', 'tech', '.net'], icon: 'fas fa-code', colors: ['#43e97b', '#38f9d7'] },
            { keywords: ['data', 'analytics', 'database', 'sql'], icon: 'fas fa-chart-bar', colors: ['#fa709a', '#fee140'] },
            { keywords: ['security', 'cyber', 'protect'], icon: 'fas fa-shield-alt', colors: ['#a8edea', '#fed6e3'] },
            { keywords: ['career', 'growth', 'success', 'journey', 'personal'], icon: 'fas fa-rocket', colors: ['#ff9a9e', '#fecfef'] },
            { keywords: ['agile', 'scrum', 'sprint', 'project'], icon: 'fas fa-tasks', colors: ['#a18cd1', '#fbc2eb'] },
            { keywords: ['social', 'community', 'network', 'connect'], icon: 'fas fa-handshake', colors: ['#ffecd2', '#fcb69f'] }
        ];
        this.fallbacks = [
            { icon: 'fas fa-lightbulb', colors: ['#0077b5', '#00a0dc'] },
            { icon: 'fas fa-pen-fancy', colors: ['#667eea', '#764ba2'] },
            { icon: 'fas fa-bullhorn', colors: ['#f093fb', '#f5576c'] },
            { icon: 'fas fa-compass', colors: ['#4facfe', '#00f2fe'] },
            { icon: 'fas fa-star', colors: ['#43e97b', '#38f9d7'] },
            { icon: 'fas fa-gem', colors: ['#fa709a', '#fee140'] }
        ];
    }

    AllArticlesManager.prototype.init = async function () {
        if (!this.apiKey) return;
        try { await this.loadArticles(); }
        catch (err) {
            console.error('Failed to load posts:', err);
            document.getElementById('allArticlesGrid').innerHTML = '<div class="youtube-loading">Failed to load posts</div>';
        }
    };

    AllArticlesManager.prototype.loadArticles = async function () {
        var url = 'https://sheets.googleapis.com/v4/spreadsheets/' + this.sheetId + '/values/' + encodeURIComponent(this.range) + '?key=' + this.apiKey;
        var res = await fetch(url);
        if (!res.ok) throw new Error('API error');
        var data = await res.json();
        if (!data.values || data.values.length < 2) return;
        this.renderArticles(this.parseSheetData(data.values));
    };

    AllArticlesManager.prototype.parseSheetData = function (rows) {
        var posts = [];
        for (var i = 1; i < rows.length; i++) {
            var row = rows[i];
            if (!row || row.length < 4 || !row[3]) continue;
            posts.push({ rawDate: row[1] || '', date: this.formatDate(row[1] || ''), title: row[2] || 'LinkedIn Post', url: row[3] });
        }
        posts.sort(function (a, b) { return new Date(b.rawDate) - new Date(a.rawDate); });
        return posts;
    };

    AllArticlesManager.prototype.formatDate = function (ds) {
        if (!ds) return '';
        try {
            var d;
            if (ds.includes('/') || ds.includes('-')) d = new Date(ds);
            else if (!isNaN(ds)) { var ep = new Date(1900, 0, 1); d = new Date(ep.getTime() + (ds - 2) * 86400000); }
            else d = new Date(ds);
            if (isNaN(d.getTime())) return ds;
            return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        } catch (e) { return ds; }
    };

    AllArticlesManager.prototype.getCategory = function (title, index) {
        var lower = title.toLowerCase();
        for (var c = 0; c < this.categories.length; c++) {
            if (this.categories[c].keywords.some(function (kw) { return lower.includes(kw); })) return this.categories[c];
        }
        return this.fallbacks[index % this.fallbacks.length];
    };

    AllArticlesManager.prototype.renderArticles = function (posts) {
        var container = document.getElementById('allArticlesGrid');
        container.innerHTML = '';
        var self = this;
        posts.forEach(function (post, index) {
            var card = document.createElement('article');
            card.className = 'linkedin-card glass hover-lift';
            card.style.cursor = 'pointer';
            card.setAttribute('role', 'link');
            card.setAttribute('tabindex', '0');
            card.setAttribute('aria-label', 'Read LinkedIn post: ' + post.title);
            card.addEventListener('click', function () { window.open(post.url, '_blank', 'noopener,noreferrer'); });
            card.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); window.open(post.url, '_blank', 'noopener,noreferrer'); } });
            var cat = self.getCategory(post.title, index);
            var thumbDiv = document.createElement('div');
            thumbDiv.className = 'linkedin-thumbnail';
            var gradient = document.createElement('div');
            gradient.className = 'linkedin-gradient';
            gradient.style.background = 'linear-gradient(135deg, ' + cat.colors[0] + ' 0%, ' + cat.colors[1] + ' 100%)';
            var pattern = document.createElement('div');
            pattern.className = 'gradient-pattern';
            var dateSpan = document.createElement('span');
            dateSpan.className = 'gradient-date';
            dateSpan.textContent = post.date;
            var iconDiv = document.createElement('div');
            iconDiv.className = 'category-icon';
            var iconEl = document.createElement('i');
            iconEl.className = cat.icon;
            iconDiv.appendChild(iconEl);
            var titleP = document.createElement('p');
            titleP.className = 'gradient-title';
            titleP.textContent = post.title;
            gradient.append(pattern, dateSpan, iconDiv, titleP);
            var btnDiv = document.createElement('div');
            btnDiv.className = 'linkedin-button';
            var btnIcon = document.createElement('i');
            btnIcon.className = 'fab fa-linkedin-in';
            btnDiv.appendChild(btnIcon);
            thumbDiv.append(gradient, btnDiv);
            card.appendChild(thumbDiv);
            container.appendChild(card);
        });
    };

    document.addEventListener('DOMContentLoaded', function () {
        setTimeout(function () { new AllArticlesManager().init(); }, 100);
    });
})();
