// LinkedIn Posts Integration with Google Sheets
class LinkedInPostsManager {
    constructor() {
        this.apiKey = window.__API_KEY__ || '';
        this.sheetId = window.__YT_SHEET_ID__ || '';
        this.range = window.__LI_SHEET_RANGE__ || 'LinkedIn Articles!A:D';
        this.maxPosts = 6;

        this.categories = [
            { keywords: ['leadership', 'team', 'management', 'leader', 'mentor'], icon: 'fas fa-users-cog', colors: ['#667eea', '#764ba2'] },
            { keywords: ['ai', 'artificial', 'machine', 'automation', 'copilot', 'chatgpt'], icon: 'fas fa-robot', colors: ['#f093fb', '#f5576c'] },
            { keywords: ['cloud', 'aws', 'azure', 'devops', 'infrastructure'], icon: 'fas fa-cloud', colors: ['#4facfe', '#00f2fe'] },
            { keywords: ['code', 'developer', 'programming', 'software', 'tech', '.net'], icon: 'fas fa-code', colors: ['#43e97b', '#38f9d7'] },
            { keywords: ['data', 'analytics', 'database', 'sql'], icon: 'fas fa-chart-bar', colors: ['#fa709a', '#fee140'] },
            { keywords: ['security', 'cyber', 'protect'], icon: 'fas fa-shield-alt', colors: ['#a8edea', '#fed6e3'] },
            { keywords: ['career', 'growth', 'success', 'journey', 'personal'], icon: 'fas fa-rocket', colors: ['#ff9a9e', '#fecfef'] },
            { keywords: ['agile', 'scrum', 'sprint', 'project'], icon: 'fas fa-tasks', colors: ['#a18cd1', '#fbc2eb'] },
            { keywords: ['social', 'community', 'network', 'connect'], icon: 'fas fa-handshake', colors: ['#ffecd2', '#fcb69f'] },
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

    async init() {
        if (!this.apiKey) return;
        try { await this.loadPosts(); }
        catch (e) { console.error('[LinkedInPosts] Failed:', e); }
    }

    async loadPosts() {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.sheetId}/values/${encodeURIComponent(this.range)}?key=${this.apiKey}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('API error');
        const data = await res.json();
        if (!data.values || data.values.length < 2) return;
        this.renderPosts(this.parsePosts(data.values));
    }

    parsePosts(rows) {
        const posts = [];
        for (let i = 1; i < rows.length; i++) {
            const r = rows[i];
            if (!r || r.length < 4 || !r[3]) continue;
            posts.push({ rawDate: r[1] || '', date: this.formatDate(r[1] || ''), title: r[2] || 'LinkedIn Post', url: r[3] });
        }
        posts.sort((a, b) => new Date(b.rawDate) - new Date(a.rawDate));
        return posts.slice(0, this.maxPosts);
    }

    formatDate(s) {
        if (!s) return '';
        try {
            let d;
            if (s.includes('/') || s.includes('-')) d = new Date(s);
            else if (!isNaN(s)) d = new Date(new Date(1900, 0, 1).getTime() + (s - 2) * 86400000);
            else d = new Date(s);
            return isNaN(d.getTime()) ? s : d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        } catch { return s; }
    }

    getCategory(title, index) {
        const lower = title.toLowerCase();
        for (const cat of this.categories) {
            if (cat.keywords.some(kw => lower.includes(kw))) return cat;
        }
        return this.fallbacks[index % this.fallbacks.length];
    }

    renderPosts(posts) {
        const container = document.querySelector('.linkedin-grid');
        if (!container) return;
        container.innerHTML = '';
        posts.forEach((post, i) => container.appendChild(this.createCard(post, i)));
    }

    createCard(post, index) {
        const card = document.createElement('article');
        card.className = 'linkedin-card glass hover-lift';
        card.style.cursor = 'pointer';
        card.setAttribute('role', 'link');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', `Read LinkedIn post: ${post.title}`);
        card.onclick = () => window.open(post.url, '_blank', 'noopener,noreferrer');
        card.onkeydown = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); window.open(post.url, '_blank', 'noopener,noreferrer'); } };

        const cat = this.getCategory(post.title, index);
        const [c1, c2] = cat.colors;

        const thumb = document.createElement('div');
        thumb.className = 'linkedin-thumbnail';
        const gradient = document.createElement('div');
        gradient.className = 'linkedin-gradient';
        gradient.style.background = `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)`;

        const pattern = document.createElement('div');
        pattern.className = 'gradient-pattern';

        const dateSpan = document.createElement('span');
        dateSpan.className = 'gradient-date';
        dateSpan.textContent = post.date;

        const iconDiv = document.createElement('div');
        iconDiv.className = 'category-icon';
        const iconEl = document.createElement('i');
        iconEl.className = cat.icon;
        iconDiv.appendChild(iconEl);

        const titleP = document.createElement('p');
        titleP.className = 'gradient-title';
        titleP.textContent = post.title;

        gradient.append(pattern, dateSpan, iconDiv, titleP);

        const btnDiv = document.createElement('div');
        btnDiv.className = 'linkedin-button';
        const btnIcon = document.createElement('i');
        btnIcon.className = 'fab fa-linkedin-in';
        btnDiv.appendChild(btnIcon);

        thumb.append(gradient, btnDiv);

        card.appendChild(thumb);
        return card;
    }

    escapeHtml(text) {
        const d = document.createElement('div');
        d.textContent = text;
        return d.innerHTML;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => new LinkedInPostsManager().init(), 100);
});
