// Shared utilities for all pages
(function() {
    // Theme detection (already set by inline script, this ensures icon sync)
    const theme = document.body.getAttribute('data-theme');

    // Theme toggle
    var themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        var updateIcon = function() {
            var icon = themeToggle.querySelector('i');
            if (icon) {
                if (document.body.getAttribute('data-theme') === 'dark') {
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                } else {
                    icon.classList.remove('fa-sun');
                    icon.classList.add('fa-moon');
                }
            }
        };
        updateIcon();
        themeToggle.addEventListener('click', function() {
            var current = document.body.getAttribute('data-theme');
            var next = current === 'dark' ? 'light' : 'dark';
            document.body.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            updateIcon();
        });
    }

    // Mobile hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Escape key closes mobile menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Scroll to top button
    var scrollBtn = document.getElementById('scrollToTop');
    if (scrollBtn) {
        window.addEventListener('scroll', function() {
            scrollBtn.classList.toggle('visible', window.scrollY > 300);
        }, { passive: true });
        scrollBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Custom cursor (pointer devices only, skip touch)
    if (!window.matchMedia('(pointer: coarse)').matches) {
        var cursor = document.createElement('div');
        cursor.className = 'cursor';
        document.body.classList.add('has-custom-cursor');
        document.body.appendChild(cursor);
        var cursorTicking = false;
        document.addEventListener('mousemove', function(e) {
            if (cursorTicking) return;
            cursorTicking = true;
            requestAnimationFrame(function() {
                cursor.style.left = e.clientX - 10 + 'px';
                cursor.style.top = e.clientY - 10 + 'px';
                cursorTicking = false;
            });
        });
        document.querySelectorAll('a, button, .portfolio-item, .cert-item, .preview-item, .filter-btn, .timeline-dot').forEach(function(el) {
            el.addEventListener('mouseenter', function() { cursor.classList.add('hover'); });
            el.addEventListener('mouseleave', function() { cursor.classList.remove('hover'); });
        });
    }
})();
