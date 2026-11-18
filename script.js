/**
 * Resume portfolio interactions
 * Lightweight, accessible, prefers-reduced-motion aware
 */
(function () {
    'use strict';

    function safeExecute(fn, context) {
        try {
            return fn();
        } catch (error) {
            console.error('Error in ' + context + ':', error);
            return null;
        }
    }

    function prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    function initScrollToTop() {
        var scrollBtn = document.getElementById('scrollToTop');
        if (!scrollBtn) return;

        var ticking = false;
        window.addEventListener('scroll', function () {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(function () {
                var show = window.pageYOffset > 320;
                scrollBtn.classList.toggle('show', show);
                scrollBtn.style.opacity = show ? '1' : '0';
                scrollBtn.style.visibility = show ? 'visible' : 'hidden';
                ticking = false;
            });
        }, { passive: true });

        scrollBtn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: prefersReducedMotion() ? 'auto' : 'smooth'
            });
        });
    }

    function showToast(message) {
        var existingToast = document.querySelector('.toast');
        if (existingToast) existingToast.remove();

        var toast = document.createElement('div');
        toast.className = 'toast';
        toast.setAttribute('role', 'status');
        toast.setAttribute('aria-live', 'polite');
        toast.textContent = message;
        document.body.appendChild(toast);

        window.requestAnimationFrame(function () {
            toast.classList.add('show');
        });

        window.setTimeout(function () {
            toast.classList.remove('show');
            window.setTimeout(function () {
                toast.remove();
            }, 220);
        }, 2600);
    }

    function fallbackCopyToClipboard(text) {
        try {
            var textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.setAttribute('readonly', '');
            textArea.style.position = 'fixed';
            textArea.style.top = '0';
            textArea.style.left = '0';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.select();
            var successful = document.execCommand('copy');
            document.body.removeChild(textArea);
            showToast(successful ? 'Link copied to clipboard!' : 'Failed to copy. Please copy manually.');
        } catch (err) {
            console.error('Fallback copy failed:', err);
            showToast('Failed to copy. Please copy manually.');
        }
    }

    function copyToClipboard(text) {
        return safeExecute(function () {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text)
                    .then(function () {
                        showToast('Link copied to clipboard!');
                    })
                    .catch(function () {
                        fallbackCopyToClipboard(text);
                    });
            } else {
                fallbackCopyToClipboard(text);
            }
        }, 'copyToClipboard');
    }

    window.shareResume = function () {
        return safeExecute(function () {
            var shareData = {
                title: 'B. Pradeep Chandu - Software Developer | Node.js Backend Resume',
                text: 'Check out my resume - Software Developer | Node.js Backend | 6+ years of experience',
                url: window.location.href
            };

            if (navigator.share && (!navigator.canShare || navigator.canShare(shareData))) {
                navigator.share(shareData).catch(function (error) {
                    if (!error || error.name !== 'AbortError') {
                        copyToClipboard(window.location.href);
                    }
                });
            } else {
                copyToClipboard(window.location.href);
            }
        }, 'shareResume');
    };

    function init() {
        safeExecute(initScrollToTop, 'initScrollToTop');

        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            document.body.classList.add('touch-device');
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
