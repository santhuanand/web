(function () {
    'use strict';

    var grid = document.getElementById('certificatesGrid');
    var filterContainer = document.querySelector('.cert-filter');

    // Scroll animations
    var scrollObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) e.target.classList.add('animate'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.scroll-animate').forEach(function (el) { scrollObs.observe(el); });

    // Parallax
    var parallaxEls = document.querySelectorAll('.parallax-bg');
    if (parallaxEls.length) {
        var ticking = false;
        window.addEventListener('scroll', function () {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(function () {
                var scrolled = window.pageYOffset;
                parallaxEls.forEach(function (el, i) {
                    el.style.transform = 'translateY(' + -(scrolled * (0.5 + i * 0.2)) + 'px)';
                });
                ticking = false;
            });
        }, { passive: true });
    }

    function openPDF(path) {
        window.open(path, '_blank', 'noopener,noreferrer');
    }

    // Grid click delegation
    grid.addEventListener('click', function (e) {
        var item = e.target.closest('.preview-item');
        if (!item) return;
        var pdf = item.getAttribute('data-pdf');
        if (pdf) openPDF(pdf);
    });

    // Grid keyboard delegation
    grid.addEventListener('keydown', function (e) {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        var item = e.target.closest('.preview-item');
        if (!item) return;
        e.preventDefault();
        var pdf = item.getAttribute('data-pdf');
        if (pdf) openPDF(pdf);
    });

    // A11y attributes
    grid.querySelectorAll('.preview-item').forEach(function (item) {
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        var h4 = item.querySelector('h4');
        if (h4) item.setAttribute('aria-label', 'Open ' + h4.textContent + ' certificate');
    });

    // Filter
    var buttonTexts = {
        all: 'All Certificates', aws: 'AWS', azure: 'Azure', gcp: 'Google Cloud',
        data: 'Data & Analytics', devops: 'DevOps', ai: 'AI', others: 'Others'
    };

    filterContainer.addEventListener('click', function (e) {
        var btn = e.target.closest('.filter-btn');
        if (!btn) return;
        var category = btn.getAttribute('data-category');
        if (!category) return;

        btn.style.opacity = '0.7';
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';

        setTimeout(function () {
            filterContainer.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            btn.style.opacity = '1';
            btn.innerHTML = buttonTexts[category] || 'All Certificates';

            grid.querySelectorAll('.preview-item').forEach(function (item) {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.5s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        }, 300);
    });

    // PDF fallback
    (function () {
        var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        var hasPDFPlugin = navigator.plugins && Array.from(navigator.plugins).some(function (p) {
            return p.name.toLowerCase().includes('pdf') || p.name.toLowerCase().includes('adobe');
        });
        var supportsPDFMime = navigator.mimeTypes && navigator.mimeTypes['application/pdf'];

        function testPDFSupport() {
            return new Promise(function (resolve) {
                var t = document.createElement('embed');
                t.src = 'data:application/pdf;base64,JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUl0KL0NvdW50IDEKPD4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQo+PgplbmRvYmoKeHJlZgowIDQKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDA5IDAwMDAwIG4gCjAwMDAwMDAwNzQgMDAwMDAgbiAKMDAwMDAwMDEyMCAwMDAwMCBuIAp0cmFpbGVyCjw8Ci9TaXplIDQKL1Jvb3QgMSAwIFIKPj4Kc3RhcnR4cmVmCjE3OQolJUVPRgo=';
                t.type = 'application/pdf';
                t.style.cssText = 'width:10px;height:10px;position:absolute;left:-9999px;visibility:hidden';
                document.body.appendChild(t);
                setTimeout(function () {
                    var ok = t.offsetHeight > 0 && t.offsetWidth > 0;
                    document.body.removeChild(t);
                    resolve(ok);
                }, 200);
            });
        }

        testPDFSupport().then(function (pdfSupported) {
            if (pdfSupported && (hasPDFPlugin || supportsPDFMime) && !isMobile) return;

            grid.querySelectorAll('.preview-item').forEach(function (item) {
                item.classList.add('mobile-fallback');
            });

            var note = document.createElement('div');
            note.style.cssText = 'position:fixed;top:80px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;padding:12px 20px;border-radius:8px;font-size:0.9rem;z-index:10000;box-shadow:0 4px 12px rgba(0,0,0,0.15);animation:slideDown .3s ease';
            note.innerHTML = '<i class="fas fa-info-circle" style="margin-right:8px"></i>Click certificates to view in new tab';
            document.body.appendChild(note);
            setTimeout(function () {
                note.style.animation = 'slideUp .3s ease forwards';
                setTimeout(function () { note.remove(); }, 300);
            }, 3000);
        });

        var s = document.createElement('style');
        s.textContent = '@keyframes slideDown{from{transform:translateX(-50%) translateY(-100%);opacity:0}to{transform:translateX(-50%) translateY(0);opacity:1}}@keyframes slideUp{from{transform:translateX(-50%) translateY(0);opacity:1}to{transform:translateX(-50%) translateY(-100%);opacity:0}}';
        document.head.appendChild(s);
    })();

    // Lazy load PDFs
    var pdfObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (!e.isIntersecting) return;
            var embed = e.target.querySelector('embed[data-src]');
            if (embed) { embed.src = embed.getAttribute('data-src'); embed.removeAttribute('data-src'); }
            pdfObs.unobserve(e.target);
        });
    }, { rootMargin: '200px' });
    grid.querySelectorAll('.preview-item').forEach(function (item) { pdfObs.observe(item); });

})();
