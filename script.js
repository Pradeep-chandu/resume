/**
 * Resume Interactive Features - Senior Backend Engineer Portfolio
 * Performance-optimized animations and interactions
 * Production-ready with error handling and accessibility
 */
(function() {
    'use strict';

    // Performance optimization: Use requestAnimationFrame for animations
    const raf = window.requestAnimationFrame || 
                 window.webkitRequestAnimationFrame || 
                 window.mozRequestAnimationFrame || 
                 function(callback) { return setTimeout(callback, 16); };

    // Error handling utility
    function safeExecute(fn, context = 'Unknown') {
        try {
            return fn();
        } catch (error) {
            console.error(`Error in ${context}:`, error);
            return null;
        }
    }

    // Intersection Observer for scroll animations (performance-optimized)
    let observer = null;
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Initialize observer with error handling
    function initObserver() {
        if (!('IntersectionObserver' in window)) {
            // Fallback for older browsers
            const elements = document.querySelectorAll('.experience-card, .skill-group, .content-section');
            elements.forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            });
            return;
        }

        observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    raf(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
    }

    // Animate elements on scroll
    function initScrollAnimations() {
        if (!observer) return;
        
        const animatedElements = document.querySelectorAll('.experience-card, .skill-group, .content-section');
        animatedElements.forEach((el, index) => {
            // Respect reduced motion preference
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (prefersReducedMotion) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
                return;
            }

            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
            observer.observe(el);
        });
    }

    // Interactive skill tags with hover effects
    function initSkillInteractions() {
        const skillTags = document.querySelectorAll('.skill-tag');
        skillTags.forEach(tag => {
            tag.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.05)';
                this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });
            
            tag.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Enhanced typing effect for profile title
    function initTypingEffect() {
        const titleElement = document.querySelector('.profile-title');
        if (!titleElement) return;
        
        const text = titleElement.textContent;
        titleElement.textContent = '';
        titleElement.classList.add('typing');
        
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                titleElement.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
                setTimeout(() => {
                    titleElement.classList.remove('typing');
                }, 1000);
            }
        }, 80);
    }

    // Animated counter for experience badge
    function animateExperienceCounter() {
        const badge = document.querySelector('.experience-badge span:last-child');
        if (!badge) return;
        
        const targetText = badge.textContent;
        const match = targetText.match(/(\d+)\+/);
        if (!match) return;
        
        const targetNumber = parseInt(match[1]);
        let currentNumber = 0;
        const duration = 2000;
        const increment = targetNumber / (duration / 16);
        
        const counterInterval = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= targetNumber) {
                currentNumber = targetNumber;
                clearInterval(counterInterval);
            }
            badge.textContent = `${Math.floor(currentNumber)}+ Years Experience`;
        }, 16);
    }

    // Subtle parallax effect for profile image (disabled to prevent jumping)
    function initParallaxEffect() {
        // Parallax disabled - keeping function for future use if needed
        // The jumping was caused by transform conflicts with hover effects
        return;
    }

    // Interactive achievement list items
    function initAchievementInteractions() {
        const achievements = document.querySelectorAll('.achievements-list li, .exp-responsibilities li');
        achievements.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.4s ease-out';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 50);
            
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(8px)';
                this.style.color = 'var(--primary-color)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0)';
                this.style.color = '';
            });
        });
    }

    // Smooth scroll for anchor links
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Performance monitoring (demonstrating backend thinking)
    function logPerformanceMetrics() {
        if (window.performance && window.performance.timing) {
            window.addEventListener('load', () => {
                const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
                console.log(`Resume loaded in ${loadTime}ms - Optimized for performance`);
            });
        }
    }

    // Dynamic content loading simulation (backend pattern)
    function simulateLazyLoading() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (img.complete) {
                img.style.opacity = '1';
            } else {
                img.style.opacity = '0';
                img.addEventListener('load', function() {
                    this.style.transition = 'opacity 0.5s ease-in';
                    this.style.opacity = '1';
                });
            }
        });
    }

    // Interactive project badge pulse animation
    function initBadgeAnimation() {
        const badgeDot = document.querySelector('.badge-dot');
        if (!badgeDot) return;
        
        setInterval(() => {
            badgeDot.style.animation = 'none';
            setTimeout(() => {
                badgeDot.style.animation = 'pulse 2s infinite';
            }, 10);
        }, 2000);
    }

    // Dark mode toggle functionality
    function initThemeToggle() {
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.setAttribute('aria-label', 'Toggle dark mode');
        themeToggle.innerHTML = '🌙';
        document.body.appendChild(themeToggle);

        // Get saved theme or default to light
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
            
            // Add transition effect
            document.body.style.transition = 'background 0.3s ease, color 0.3s ease';
        });

        function updateThemeIcon(theme) {
            themeToggle.innerHTML = theme === 'dark' ? '☀️' : '🌙';
        }
    }

    // Enhanced scroll animations with parallax
    function initEnhancedScrollAnimations() {
        if (!('IntersectionObserver' in window)) return;
        
        const observerOptions = {
            threshold: [0, 0.25, 0.5, 0.75, 1],
            rootMargin: '0px 0px -100px 0px'
        };

        const enhancedObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const ratio = entry.intersectionRatio;
                if (ratio > 0) {
                    raf(() => {
                        entry.target.style.opacity = Math.max(ratio, 0.3);
                        entry.target.style.transform = `translateY(${30 * (1 - ratio)}px)`;
                    });
                }
            });
        }, observerOptions);

        document.querySelectorAll('.experience-card, .skill-group').forEach(el => {
            enhancedObserver.observe(el);
        });
    }

    // Add smooth reveal animation on page load
    function initPageLoadAnimation() {
        const resume = document.querySelector('.resume');
        if (resume) {
            resume.style.opacity = '0';
            resume.style.transform = 'scale(0.95) translateY(20px)';
            
            setTimeout(() => {
                resume.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                resume.style.opacity = '1';
                resume.style.transform = 'scale(1) translateY(0)';
            }, 100);
        }
    }

    // Initialize all features when DOM is ready
    function init() {
        return safeExecute(() => {
            // Wait for DOM to be fully loaded
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', init);
                return;
            }

            // Initialize observer first
            initObserver();

            // Initialize all features with error handling
            safeExecute(() => initThemeToggle(), 'initThemeToggle');
            safeExecute(() => initPageLoadAnimation(), 'initPageLoadAnimation');
            safeExecute(() => initScrollAnimations(), 'initScrollAnimations');
            safeExecute(() => initEnhancedScrollAnimations(), 'initEnhancedScrollAnimations');
            safeExecute(() => initSkillInteractions(), 'initSkillInteractions');
            safeExecute(() => initAchievementInteractions(), 'initAchievementInteractions');
            safeExecute(() => initSmoothScroll(), 'initSmoothScroll');
            safeExecute(() => logPerformanceMetrics(), 'logPerformanceMetrics');
            safeExecute(() => simulateLazyLoading(), 'simulateLazyLoading');
            safeExecute(() => initBadgeAnimation(), 'initBadgeAnimation');
            safeExecute(() => initScrollToTop(), 'initScrollToTop');
            
            // Delayed animations for better UX
            setTimeout(() => {
                safeExecute(() => initTypingEffect(), 'initTypingEffect');
                safeExecute(() => animateExperienceCounter(), 'animateExperienceCounter');
            }, 500);
            
            // Initialize copy contact on mobile
            if ('ontouchstart' in window) {
                safeExecute(() => initCopyContact(), 'initCopyContact');
            }
        }, 'init');
    }

    // Start initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Reinitialize on resize if needed (desktop only, no touch devices)
            if (window.innerWidth > 768 && !('ontouchstart' in window)) {
                initParallaxEffect();
            }
        }, 250);
    });

    // Disable hover effects on touch devices for better mobile UX
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }

    // Scroll to top functionality
    function initScrollToTop() {
        const scrollBtn = document.getElementById('scrollToTop');
        if (!scrollBtn) return;

        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollBtn.style.opacity = '1';
                scrollBtn.style.visibility = 'visible';
            } else {
                scrollBtn.style.opacity = '0';
                scrollBtn.style.visibility = 'hidden';
            }
        });

        // Scroll to top on click
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Share resume functionality with error handling
    window.shareResume = function() {
        return safeExecute(() => {
            const shareData = {
                title: 'B. Pradeep Chandu - Senior Node.js Developer Resume',
                text: 'Check out my resume - Senior Node.js Developer with 5+ years of experience',
                url: window.location.href
            };

            if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
                navigator.share(shareData)
                    .then(() => {
                        showToast('Resume shared successfully!');
                    })
                    .catch((error) => {
                        // User cancelled or error occurred - fallback to clipboard
                        if (error.name !== 'AbortError') {
                            copyToClipboard(window.location.href);
                        }
                    });
            } else {
                // Fallback: copy URL to clipboard
                copyToClipboard(window.location.href);
            }
        }, 'shareResume');
    };

    // Copy to clipboard function with error handling
    function copyToClipboard(text) {
        return safeExecute(() => {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text)
                    .then(() => {
                        showToast('Link copied to clipboard!');
                    })
                    .catch((error) => {
                        console.error('Clipboard write failed:', error);
                        fallbackCopyToClipboard(text);
                    });
            } else {
                fallbackCopyToClipboard(text);
            }
        }, 'copyToClipboard');
    }

    // Fallback copy method for older browsers
    function fallbackCopyToClipboard(text) {
        try {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.top = '0';
            textArea.style.left = '0';
            textArea.style.width = '2em';
            textArea.style.height = '2em';
            textArea.style.padding = '0';
            textArea.style.border = 'none';
            textArea.style.outline = 'none';
            textArea.style.boxShadow = 'none';
            textArea.style.background = 'transparent';
            textArea.setAttribute('aria-hidden', 'true');
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);
            
            if (successful) {
                showToast('Link copied to clipboard!');
            } else {
                showToast('Failed to copy. Please copy manually.');
            }
        } catch (err) {
            console.error('Fallback copy failed:', err);
            showToast('Failed to copy. Please copy manually.');
        }
    }

    // Toast notification
    function showToast(message) {
        // Remove existing toast if any
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);

        // Show toast
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);

        // Hide and remove toast after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }

    // Copy contact info functionality
    function initCopyContact() {
        const contactItems = document.querySelectorAll('.contact-link');
        contactItems.forEach(item => {
            item.addEventListener('click', function(e) {
                // Allow default behavior (tel: and mailto: links)
                // But add long-press to copy
                let pressTimer;
                
                this.addEventListener('touchstart', function() {
                    pressTimer = setTimeout(() => {
                        e.preventDefault();
                        const text = this.textContent.trim();
                        copyToClipboard(text);
                    }, 500);
                });

                this.addEventListener('touchend', function() {
                    clearTimeout(pressTimer);
                });
            });
        });
    }

    // Keyboard navigation support
    function initKeyboardNavigation() {
        // Add keyboard support for interactive elements
        document.addEventListener('keydown', (e) => {
            // Escape key to close modals/overlays (if any in future)
            if (e.key === 'Escape') {
                // Future: close any open modals
            }
            
            // Enter/Space on buttons
            if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('sticky-btn')) {
                e.preventDefault();
                e.target.click();
            }
        });
    }

    // Initialize keyboard navigation
    safeExecute(() => initKeyboardNavigation(), 'initKeyboardNavigation');

})();