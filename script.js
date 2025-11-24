



// Mobile Navigation Toggle with security validation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', (e) => {
        try {
            e.preventDefault();
            e.stopPropagation();
            
            // Validate elements still exist
            if (hamburger && navMenu) {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
                
                // Prevent body scroll when menu is open
                if (navMenu.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            }
        } catch (error) {
            console.warn('Navigation toggle failed:', error);
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Close mobile menu when clicking on a link with validation
try {
    document.querySelectorAll('.nav-link').forEach(n => {
        if (n) {
            n.addEventListener('click', (e) => {
                try {
                    if (hamburger && navMenu) {
                        hamburger.classList.remove('active');
                        navMenu.classList.remove('active');
                    }
                } catch (error) {
                    console.warn('Menu close failed:', error);
                }
            });
        }
    });
} catch (error) {
    console.warn('Nav links setup failed:', error);
}

// Smooth scrolling for navigation links with security validation
try {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (anchor) {
            anchor.addEventListener('click', function (e) {
                try {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const href = this.getAttribute('href');
                    if (href && typeof href === 'string' && href.startsWith('#') && href.length > 1) {
                        // Sanitize href to prevent XSS
                        const sanitizedHref = href.replace(/[^#a-zA-Z0-9_-]/g, '');
                        const target = document.querySelector(sanitizedHref);
                        if (target) {
                            target.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }
                    }
                } catch (error) {
                    console.warn('Smooth scroll failed:', error);
                }
            });
        }
    });
} catch (error) {
    console.warn('Smooth scroll setup failed:', error);
}

// Navbar background on scroll with throttling and error handling
let scrollTimeout;
const navbar = document.querySelector('.navbar');

if (navbar) {
    const handleScroll = () => {
        try {
            if (navbar) {
                const scrollY = Math.max(0, window.scrollY || 0);
                if (scrollY > 100) {
                    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
                } else {
                    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                    navbar.style.boxShadow = 'none';
                }
            }
        } catch (error) {
            console.warn('Navbar scroll effect failed:', error);
        }
    };
    
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = requestAnimationFrame(handleScroll);
    }, { passive: true });
}

// Enhanced skill bars animation
function animateSkillBars() {
    try {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach((bar, index) => {
            const width = bar.getAttribute('data-width');
            if (width && bar && !bar.classList.contains('animated')) {
                bar.classList.add('animated');
                setTimeout(() => {
                    bar.style.width = width;
                    bar.style.background = 'var(--gradient-secondary)';
                }, 300 + (index * 150));
            }
        });
    } catch (error) {
        console.warn('Skill bars animation failed:', error);
    }
}

// Animated Counter Function
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (target >= 1000 ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (target >= 1000 ? '+' : '');
        }
    }, 16);
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate skill bars
            if (entry.target.classList.contains('skills')) {
                animateSkillBars();
            }
            // Animate counters
            if (entry.target.classList.contains('about-stats')) {
                const counters = entry.target.querySelectorAll('.stat-item h3');
                counters.forEach(counter => {
                    if (!counter.classList.contains('animated')) {
                        counter.classList.add('animated');
                        const target = counter.textContent.includes('L') ? 300000 : 
                                     counter.textContent.includes('+') ? parseInt(counter.textContent) : 
                                     parseInt(counter.textContent);
                        animateCounter(counter, target);
                    }
                });
            }
        }
    });
}, observerOptions);

// Observe sections
try {
    const skillsSection = document.querySelector('.skills');
    const aboutStats = document.querySelector('.about-stats');
    if (skillsSection) observer.observe(skillsSection);
    if (aboutStats) observer.observe(aboutStats);
} catch (error) {
    console.warn('Observer setup failed:', error);
}

// Typing Animation
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}

// Skeleton Loading
function showSkeletons() {
    document.body.classList.add('loading');
    
    // Add skeleton placeholders
    const portfolioGrid = document.querySelector('.portfolio-grid');
    const timelineItems = document.querySelectorAll('.timeline-content');
    
    if (portfolioGrid) {
        for (let i = 0; i < 6; i++) {
            const skeleton = document.createElement('div');
            skeleton.className = 'skeleton skeleton-card';
            portfolioGrid.appendChild(skeleton);
        }
    }
    
    timelineItems.forEach(item => {
        const skeleton = document.createElement('div');
        skeleton.className = 'skeleton skeleton-card';
        item.parentNode.appendChild(skeleton);
    });
}

function hideSkeletons() {
    setTimeout(() => {
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
        document.querySelectorAll('.skeleton').forEach(el => el.remove());
    }, 1200);
}

// Initialize loading sequence
showSkeletons();
hideSkeletons();

// Initialize typing animation
try {
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const originalText = subtitle.textContent;
        setTimeout(() => {
            typeWriter(subtitle, originalText, 80);
        }, 1500);
    }
} catch (error) {
    console.warn('Typing animation failed:', error);
}

// Subtle Parallax Effect
try {
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            hero.style.transform = `translateY(${rate}px)`;
        }, { passive: true });
    }
} catch (error) {
    console.warn('Parallax effect failed:', error);
}



// Interactive Micro-Animations
try {
    // Button click ripple effect
    document.querySelectorAll('.btn, .filter-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255,255,255,0.4);
                border-radius: 50%;
                transform: scale(0);
                animation: rippleEffect 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Hover tilt effect for cards
    document.querySelectorAll('.portfolio-item, .cert-item, .preview-item').forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
    
    // Floating animation for icons
    document.querySelectorAll('.cert-icon, .mobile-pdf-placeholder i').forEach((icon, index) => {
        icon.style.animation = `float 3s ease-in-out infinite ${index * 0.5}s`;
    });
    
} catch (error) {
    console.warn('Micro-animations failed:', error);
}

// Enhanced input sanitization function
function sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    
    // Enhanced XSS prevention
    return input
        .replace(/[<>"'&]/g, function(match) {
            const escapeMap = {
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#x27;',
                '&': '&amp;'
            };
            return escapeMap[match];
        })
        .replace(/javascript:/gi, '')
        .replace(/on\w+=/gi, '')
        .replace(/data:/gi, '')
        .trim();
}

// Notification system
const NotificationManager = {
    types: {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6'
    },
    
    show(message, type = 'info') {
        try {
            this.clearExisting();
            const notification = this.create(message, type);
            this.display(notification);
            this.autoRemove(notification);
        } catch (error) {
            console.error('Notification display failed:', error);
        }
    },
    
    clearExisting() {
        const existing = document.querySelectorAll('.notification');
        existing.forEach(n => n.remove());
    },
    
    create(message, type) {
        try {
            const notification = document.createElement('div');
            const sanitizedType = type.replace(/[^a-zA-Z0-9_-]/g, '');
            notification.className = `notification notification-${sanitizedType}`;
            
            // Only sanitize if message contains potential XSS, otherwise use as-is for system messages
            const needsSanitization = /<[^>]*>|javascript:|on\w+=/i.test(message);
            notification.textContent = needsSanitization ? sanitizeInput(message) : message;
            
            notification.setAttribute('role', 'alert');
            notification.setAttribute('aria-live', 'polite');
            
            this.applyStyles(notification, sanitizedType);
            return notification;
        } catch (error) {
            console.error('Notification creation failed:', error);
            return null;
        }
    },
    
    applyStyles(notification, type) {
        const baseStyles = {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 20px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            zIndex: '10000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            maxWidth: '300px',
            wordWrap: 'break-word',
            background: this.types[type] || this.types.info
        };
        
        Object.assign(notification.style, baseStyles);
    },
    
    display(notification) {
        try {
            if (notification && document.body) {
                document.body.appendChild(notification);
                requestAnimationFrame(() => {
                    if (notification) {
                        notification.style.transform = 'translateX(0)';
                    }
                });
            }
        } catch (error) {
            console.error('Notification display failed:', error);
        }
    },
    
    autoRemove(notification) {
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }
};

// EmailJS Configuration - Replace with your actual credentials
const EMAIL_CONFIG = {
    serviceId: 'service_39063kf',     // Replace with your EmailJS Service ID
    templateId: 'template_kff25ca',   // Replace with your EmailJS Template ID
    publicKey: 'N54EZivtWJBbU3kbd'      // Replace with your EmailJS Public Key
};

// Initialize EmailJS with enhanced error handling and validation
(function() {
    try {
        if (typeof emailjs !== 'undefined' && EMAIL_CONFIG.publicKey) {
            // Validate public key format
            if (typeof EMAIL_CONFIG.publicKey === 'string' && EMAIL_CONFIG.publicKey.length > 10) {
                emailjs.init({
                    publicKey: EMAIL_CONFIG.publicKey,
                    blockHeadless: true,
                    limitRate: {
                        id: 'app',
                        throttle: 10000,
                    },
                });
            } else {
                console.warn('Invalid EmailJS public key');
            }
        } else {
            console.warn('EmailJS not available or invalid configuration');
        }
    } catch (error) {
        console.warn('EmailJS initialization failed:', error);
    }
})();

// Enhanced Form Validation
const FormValidator = {
    rules: {
        name: {
            required: true,
            minLength: 2,
            pattern: /^[a-zA-Z\s]+$/,
            message: 'Name must be at least 2 characters and contain only letters'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        },
        subject: {
            required: true,
            minLength: 5,
            maxLength: 100,
            message: 'Subject must be between 5-100 characters'
        },
        message: {
            required: true,
            minLength: 10,
            maxLength: 1000,
            message: 'Message must be between 10-1000 characters'
        }
    },
    
    validate(field, value) {
        const rule = this.rules[field];
        if (!rule) return { valid: true };
        
        if (rule.required && (!value || value.trim() === '')) {
            return { valid: false, message: `${field.charAt(0).toUpperCase() + field.slice(1)} is required` };
        }
        
        if (rule.minLength && value.length < rule.minLength) {
            return { valid: false, message: rule.message };
        }
        
        if (rule.maxLength && value.length > rule.maxLength) {
            return { valid: false, message: rule.message };
        }
        
        if (rule.pattern && !rule.pattern.test(value)) {
            return { valid: false, message: rule.message };
        }
        
        return { valid: true };
    },
    
    showError(field, message) {
        const input = document.getElementById(field);
        const errorDiv = document.getElementById(`${field}-error`);
        
        if (input && errorDiv) {
            input.classList.add('error');
            errorDiv.textContent = message;
            input.setAttribute('aria-invalid', 'true');
        }
    },
    
    clearError(field) {
        const input = document.getElementById(field);
        const errorDiv = document.getElementById(`${field}-error`);
        
        if (input && errorDiv) {
            input.classList.remove('error');
            errorDiv.textContent = '';
            input.setAttribute('aria-invalid', 'false');
        }
    },
    
    validateForm(formData) {
        let isValid = true;
        const errors = {};
        
        for (const [field, value] of formData.entries()) {
            const result = this.validate(field, value);
            if (!result.valid) {
                errors[field] = result.message;
                this.showError(field, result.message);
                isValid = false;
            } else {
                this.clearError(field);
            }
        }
        
        return { isValid, errors };
    }
};

// Math Captcha Generation
function generateMathCaptcha() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const answer = num1 + num2;
    
    document.getElementById('mathQuestion').textContent = `${num1} + ${num2} = ?`;
    document.getElementById('captcha').dataset.answer = answer;
    document.getElementById('captcha').value = '';
}

// Contact form handling with enhanced validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    // Generate initial math captcha after DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        generateMathCaptcha();
    });
    
    // Also generate immediately if DOM is already loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', generateMathCaptcha);
    } else {
        generateMathCaptcha();
    }
    
    // Real-time validation
    ['name', 'email', 'subject', 'message', 'captcha'].forEach(field => {
        const input = document.getElementById(field);
        if (input) {
            input.addEventListener('blur', function() {
                const result = FormValidator.validate(field, this.value);
                if (!result.valid) {
                    FormValidator.showError(field, result.message);
                } else {
                    FormValidator.clearError(field);
                }
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    const result = FormValidator.validate(field, this.value);
                    if (result.valid) {
                        FormValidator.clearError(field);
                    }
                }
            });
        }
    });
    
    contactForm.addEventListener('submit', function(e) {
        try {
            e.preventDefault();
            e.stopPropagation();
            
            const submitBtn = document.getElementById('submit-btn');
            const formData = new FormData(this);
            
            // Enhanced CSRF protection
            const timestamp = Date.now();
            const lastSubmit = parseInt(sessionStorage.getItem('lastSubmit') || '0');
            if (timestamp - lastSubmit < 3000) {
                ToastManager.show('Please wait before submitting again', 'error');
                return;
            }
            sessionStorage.setItem('lastSubmit', timestamp.toString());
            
            // Validate form
            const validation = FormValidator.validateForm(formData);
            if (!validation.isValid) {
                ToastManager.show('Please fix the errors above', 'error');
                return;
            }
            
            // Show loading state
            if (submitBtn) {
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;
            }
            
            function resetSubmitButton() {
                try {
                    if (submitBtn) {
                        submitBtn.classList.remove('loading');
                        submitBtn.disabled = false;
                    }
                } catch (error) {
                    console.warn('Button reset failed:', error);
                }
            }
            
            // Enhanced EmailJS validation
            if (typeof emailjs === 'undefined' || !EMAIL_CONFIG.serviceId || !EMAIL_CONFIG.templateId) {
                ToastManager.show('Email service not available. Please contact directly at santhuanand7@gmail.com', 'error');
                resetSubmitButton();
                return;
            }
            
            // Validate math captcha
            const captchaAnswer = parseInt(formData.get('captcha'));
            const correctAnswer = parseInt(document.getElementById('captcha').dataset.answer);
            if (captchaAnswer !== correctAnswer) {
                document.getElementById('captcha-error').textContent = 'Incorrect answer. Please try again.';
                ToastManager.show('Please solve the math problem correctly', 'error');
                generateMathCaptcha();
                resetSubmitButton();
                return;
            } else {
                document.getElementById('captcha-error').textContent = '';
            }
            
            const templateParams = {
                from_name: sanitizeInput(formData.get('name')),
                from_email: sanitizeInput(formData.get('email')),
                subject: sanitizeInput(formData.get('subject')),
                message: sanitizeInput(formData.get('message')),
                to_name: 'Santhosh Anand',
                timestamp: new Date().toISOString(),
                captcha_verified: true
            };
            
            // Enhanced email sending with timeout
            const emailPromise = emailjs.send(EMAIL_CONFIG.serviceId, EMAIL_CONFIG.templateId, templateParams);
            const timeoutPromise = new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Request timeout')), 30000)
            );
            
            Promise.race([emailPromise, timeoutPromise])
                .then(function(response) {
                    if (response && response.status === 200) {
                        // Show success animation
                        const successAnimation = document.getElementById('successAnimation');
                        if (successAnimation && contactForm) {
                            contactForm.style.display = 'none';
                            successAnimation.style.display = 'block';
                            
                            // Reset form after animation
                            setTimeout(() => {
                                contactForm.reset();
                                generateMathCaptcha();
                                ['name', 'email', 'subject', 'message', 'captcha'].forEach(field => {
                                    FormValidator.clearError(field);
                                });
                                document.getElementById('captcha-error').textContent = '';
                                
                                // Hide animation and show form again after 3 seconds
                                setTimeout(() => {
                                    successAnimation.style.display = 'none';
                                    contactForm.style.display = 'block';
                                }, 3000);
                            }, 100);
                        }
                    } else {
                        throw new Error('Email service returned error');
                    }
                })
                .catch(function(error) {
                    console.error('Email send failed:', error);
                    const errorMessage = error.message === 'Request timeout' 
                        ? 'Request timed out. Please try again or contact directly at santhuanand7@gmail.com'
                        : 'Failed to send message. Please try again or contact directly at santhuanand7@gmail.com';
                    ToastManager.show(errorMessage, 'error');
                    
                    // Ensure form is visible on error
                    const successAnimation = document.getElementById('successAnimation');
                    if (successAnimation && contactForm) {
                        successAnimation.style.display = 'none';
                        contactForm.style.display = 'block';
                    }
                })
                .finally(function() {
                    resetSubmitButton();
                });
        } catch (error) {
            console.error('Form submission error:', error);
            ToastManager.show('Form submission failed. Please contact directly at santhuanand7@gmail.com', 'error');
            try {
                const submitBtn = document.getElementById('submit-btn');
                if (submitBtn) {
                    submitBtn.classList.remove('loading');
                    submitBtn.disabled = false;
                }
            } catch (btnError) {
                console.warn('Button reset failed:', btnError);
            }
        }
    });
}

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');

if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}



// Magnetic Cursor Effect
try {
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    // Hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .portfolio-item, .cert-item, .timeline-dot');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
} catch (error) {
    console.warn('Cursor effect failed:', error);
}

// Intersection Observer for Animations
try {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right').forEach(el => {
        animationObserver.observe(el);
    });
} catch (error) {
    console.warn('Animation observer failed:', error);
}

// Timeline Progress Indicator
try {
    const timelineProgress = document.getElementById('timelineProgress');
    if (timelineProgress) {
        window.addEventListener('scroll', () => {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            timelineProgress.style.height = Math.min(scrolled, 100) + '%';
        });
    }
} catch (error) {
    console.warn('Timeline progress failed:', error);
}

// Enhanced Toast Notifications
const ToastManager = {
    show(message, type = 'info', duration = 5000) {
        try {
            const toast = document.createElement('div');
            toast.className = `toast ${type}`;
            toast.textContent = message;
            document.body.appendChild(toast);
            
            setTimeout(() => toast.classList.add('show'), 100);
            
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 300);
            }, duration);
        } catch (error) {
            console.warn('Toast failed:', error);
        }
    }
};



// Dark Mode Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

if (themeToggle && body) {
    // Check for saved theme preference or default to light mode
    let currentTheme = 'light';
    try {
        currentTheme = localStorage.getItem('theme') || 'light';
    } catch (error) {
        console.warn('localStorage access failed:', error);
    }
    body.setAttribute('data-theme', currentTheme);
    
    // Update toggle icon based on current theme
    function updateToggleIcon() {
        try {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                if (body.getAttribute('data-theme') === 'dark') {
                    icon.className = 'fas fa-sun';
                } else {
                    icon.className = 'fas fa-moon';
                }
            }
        } catch (error) {
            console.warn('Theme icon update failed:', error);
        }
    }
    
    // Initialize icon
    updateToggleIcon();
    
    // Toggle theme with enhanced security
    themeToggle.addEventListener('click', (e) => {
        try {
            e.preventDefault();
            e.stopPropagation();
            
            const currentTheme = body.getAttribute('data-theme');
            const validThemes = ['light', 'dark'];
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Validate theme value
            if (validThemes.includes(newTheme)) {
                body.setAttribute('data-theme', newTheme);
                try {
                    localStorage.setItem('theme', newTheme);
                } catch (error) {
                    console.warn('localStorage save failed:', error);
                }
                updateToggleIcon();
            }
        } catch (error) {
            console.error('Theme toggle failed:', error);
        }
    });
}

// Keyboard Navigation & Accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        if (hamburger && navMenu && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Make interactive elements keyboard accessible
document.querySelectorAll('.portfolio-item, .cert-item').forEach(item => {
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    
    item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            item.click();
        }
    });
});

// Reading Progress Bar
const progressBar = document.getElementById('progressBar');
if (progressBar) {
    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = Math.min(scrolled, 100) + '%';
    }, { passive: true });
}

// Calculate Experience Duration
function calculateExperienceDuration() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        const dateElement = item.querySelector('.timeline-date');
        if (dateElement) {
            const dateText = dateElement.textContent;
            
            if (dateText.includes('Present')) {
                // Current position
                const startDate = dateText.split(' - ')[0];
                const years = calculateYearsFromStart(startDate);
                item.setAttribute('data-duration', `${years}+ years`);
            } else if (dateText.includes(' - ')) {
                // Past position
                const [startDate, endDate] = dateText.split(' - ');
                const years = calculateYearsBetween(startDate, endDate);
                item.setAttribute('data-duration', `${years} year${years > 1 ? 's' : ''}`);
            }
        }
    });
}

function calculateYearsFromStart(startDateStr) {
    try {
        const [month, year] = startDateStr.split(' ');
        const monthMap = {
            'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
            'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
        };
        
        const startDate = new Date(parseInt(year), monthMap[month], 1);
        const currentDate = new Date();
        
        const diffTime = currentDate - startDate;
        const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
        
        return Math.floor(diffYears);
    } catch (error) {
        console.warn('Date calculation failed:', error);
        return 5;
    }
}

function calculateYearsBetween(startDateStr, endDateStr) {
    try {
        const monthMap = {
            'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
            'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
        };
        
        const [startMonth, startYear] = startDateStr.split(' ');
        const [endMonth, endYear] = endDateStr.split(' ');
        
        const startMonthNum = monthMap[startMonth];
        const endMonthNum = monthMap[endMonth];
        
        // Calculate total months (add 1 to include the end month)
        const totalMonths = (parseInt(endYear) - parseInt(startYear)) * 12 + (endMonthNum - startMonthNum) + 1;
        
        // Convert to years with 1 decimal place
        const years = Math.round((totalMonths / 12) * 10) / 10;
        
        return years;
    } catch (error) {
        console.warn('Date calculation failed:', error);
        return 2;
    }
}

// Initialize experience duration calculation
calculateExperienceDuration();

// Section Progress Indicators
const sectionProgressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            const progressElement = document.getElementById(sectionId + 'Progress');
            
            if (progressElement) {
                const rect = entry.target.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                const sectionHeight = entry.target.offsetHeight;
                const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
                const progress = Math.max(0, Math.min(100, (visibleHeight / Math.min(sectionHeight, viewportHeight)) * 100));
                
                progressElement.style.height = progress + '%';
            }
        }
    });
}, {
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
});

// Observe sections with progress indicators
['experience', 'skills', 'portfolio'].forEach(sectionId => {
    const section = document.getElementById(sectionId);
    if (section) {
        sectionProgressObserver.observe(section);
    }
});



