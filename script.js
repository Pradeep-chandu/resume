// Resume Interactive Features - Demonstrating Backend Developer Skills
// Performance-optimized animations and interactions

(function() {
    'use strict';

    // Intersection Observer for scroll animations (performance-optimized)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Animate elements on scroll
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.experience-card, .skill-group, .content-section');
        animatedElements.forEach((el, index) => {
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

    // Dynamic typing effect for profile title
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
                }, 500);
            }
        }, 100);
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

    // Initialize all features when DOM is ready
    function init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        // Initialize all features
        initScrollAnimations();
        initSkillInteractions();
        initAchievementInteractions();
        initSmoothScroll();
        logPerformanceMetrics();
        simulateLazyLoading();
        initBadgeAnimation();
        
        // Delayed animations for better UX
        setTimeout(() => {
            initTypingEffect();
            animateExperienceCounter();
        }, 500);
        
        // Parallax only on desktop (disabled on mobile for performance)
        if (window.innerWidth > 768 && !('ontouchstart' in window)) {
            initParallaxEffect();
        }
    }

    // Start initialization
    init();

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

    // Share resume functionality
    window.shareResume = function() {
        const shareData = {
            title: 'B. Pradeep Chandu - Senior Node.js Developer Resume',
            text: 'Check out my resume - Senior Node.js Developer with 5+ years of experience',
            url: window.location.href
        };

        if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
            navigator.share(shareData)
                .then(() => console.log('Resume shared successfully'))
                .catch((error) => {
                    // Fallback: copy to clipboard
                    copyToClipboard(window.location.href);
                });
        } else {
            // Fallback: copy URL to clipboard
            copyToClipboard(window.location.href);
        }
    };

    // Copy to clipboard function
    function copyToClipboard(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                showToast('Link copied to clipboard!');
            });
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                showToast('Link copied to clipboard!');
            } catch (err) {
                showToast('Failed to copy. Please copy manually.');
            }
            document.body.removeChild(textArea);
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

    // Initialize scroll to top
    initScrollToTop();

    // Initialize copy contact on mobile
    if ('ontouchstart' in window) {
        initCopyContact();
    }

})();