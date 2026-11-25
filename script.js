/**
 * Portfolio interactions
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

    var scrollHandlers = [];
    var scrollTicking = false;

    function onScroll(handler) {
        scrollHandlers.push(handler);
        handler();
    }

    window.addEventListener('scroll', function () {
        if (scrollTicking) return;
        scrollTicking = true;
        window.requestAnimationFrame(function () {
            scrollHandlers.forEach(function (handler) { handler(); });
            scrollTicking = false;
        });
    }, { passive: true });

    function initScrollChrome() {
        var bar = document.getElementById('scrollProgress');
        var header = document.getElementById('siteHeader');
        var topBtn = document.getElementById('scrollToTop');

        onScroll(function () {
            var y = window.pageYOffset;
            var scrollable = document.documentElement.scrollHeight - window.innerHeight;
            if (bar) {
                var progress = scrollable > 0 ? Math.min(1, Math.max(0, y / scrollable)) : 0;
                bar.style.transform = 'scaleX(' + progress + ')';
            }
            if (header) header.classList.toggle('is-scrolled', y > 8);
            if (topBtn) topBtn.classList.toggle('show', y > 480);
        });

        if (topBtn) {
            topBtn.addEventListener('click', function () {
                window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
            });
        }
    }

    function initSectionNav() {
        var links = Array.prototype.slice.call(document.querySelectorAll('[data-nav]'));
        var toggle = document.querySelector('.nav-toggle');
        var nav = document.getElementById('section-nav');
        if (!links.length) return;

        var ids = [];
        links.forEach(function (link) {
            var id = link.getAttribute('data-nav');
            if (ids.indexOf(id) === -1) ids.push(id);
        });
        var sections = ids.map(function (id) { return document.getElementById(id); })
            .filter(Boolean)
            .sort(function (a, b) {
                return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
            });

        var quickNav = document.getElementById('quickNav');
        var hero = document.getElementById('top');
        var lastActive = null;

        function revealActiveChip(id) {
            if (!quickNav || quickNav.scrollWidth <= quickNav.clientWidth) return;
            var chip = quickNav.querySelector('[data-nav="' + id + '"]');
            if (!chip) return;
            var left = chip.offsetLeft - (quickNav.clientWidth - chip.offsetWidth) / 2;
            quickNav.scrollTo({ left: Math.max(0, left), behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
        }

        function setActive(id) {
            if (id === lastActive) return;
            lastActive = id;
            links.forEach(function (link) {
                if (link.getAttribute('data-nav') === id) link.setAttribute('aria-current', 'true');
                else link.removeAttribute('aria-current');
            });
            revealActiveChip(id);
        }

        if (quickNav && hero) {
            onScroll(function () {
                quickNav.classList.toggle('is-visible', hero.getBoundingClientRect().bottom < 0);
            });
        }

        onScroll(function () {
            var current = '';
            var marker = window.innerHeight * 0.3;
            sections.forEach(function (section) {
                if (section.getBoundingClientRect().top <= marker) current = section.id;
            });
            if (window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight - 4) {
                current = sections[sections.length - 1].id;
            }
            setActive(current);
        });

        if (!toggle || !nav) return;

        function closeNav() {
            nav.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
        }

        toggle.addEventListener('click', function () {
            var open = nav.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });

        nav.addEventListener('click', function (event) {
            if (event.target.closest('a')) closeNav();
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && nav.classList.contains('is-open')) {
                closeNav();
                toggle.focus();
            }
        });

        document.addEventListener('click', function (event) {
            if (!nav.contains(event.target) && !toggle.contains(event.target)) closeNav();
        });
    }

    function formatNumber(value) {
        return value.toLocaleString('en-US');
    }

    function countUp(el) {
        var target = parseInt(el.getAttribute('data-count'), 10);
        if (!target) return;
        var duration = 900;
        var start = null;
        el.setAttribute('aria-hidden', 'true');
        var label = document.createElement('span');
        label.className = 'visually-hidden';
        label.textContent = formatNumber(target);
        el.parentNode.insertBefore(label, el);

        function frame(ts) {
            if (start === null) start = ts;
            var t = Math.min(1, (ts - start) / duration);
            var eased = 1 - Math.pow(1 - t, 3);
            el.textContent = formatNumber(Math.round(target * eased));
            if (t < 1) window.requestAnimationFrame(frame);
        }
        el.textContent = '0';
        window.requestAnimationFrame(frame);
    }

    function playFlow(board) {
        board.classList.remove('is-flowing');
        void board.offsetWidth;
        board.classList.add('is-flowing');
    }

    function initReveals() {
        var items = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
        var timeline = document.querySelector('.timeline');
        var board = document.getElementById('archBoard');
        var replay = document.getElementById('replayFlow');
        var motionOk = !prefersReducedMotion() && 'IntersectionObserver' in window;

        function show(el) {
            if (el.classList.contains('is-in')) return;
            el.classList.add('is-in');
            if (!motionOk) return;
            Array.prototype.forEach.call(el.querySelectorAll('.count'), countUp);
            if (el.classList.contains('count')) countUp(el);
            if (el === board) {
                playFlow(board);
                if (replay) replay.classList.remove('is-pending');
            }
        }

        if (motionOk && replay) {
            replay.classList.add('is-pending');
            replay.hidden = false;
        }

        if (!motionOk) {
            items.forEach(show);
            if (timeline) timeline.classList.add('is-drawn');
            return;
        }

        var groups = ['.highlight-grid', '.case-grid', '.skills-grid'];
        groups.forEach(function (selector) {
            var group = document.querySelector(selector);
            if (!group) return;
            Array.prototype.forEach.call(group.querySelectorAll('.reveal'), function (el, index) {
                el.style.setProperty('--stagger', (index % 6) * 70 + 'ms');
            });
        });

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                show(entry.target);
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

        items.forEach(function (el) { observer.observe(el); });

        if (timeline) {
            var timelineObserver = new IntersectionObserver(function (entries) {
                if (entries.some(function (entry) { return entry.isIntersecting; })) {
                    timeline.classList.add('is-drawn');
                    timelineObserver.disconnect();
                }
            }, { threshold: 0.05 });
            timelineObserver.observe(timeline);
        }

        if (replay && board) {
            replay.addEventListener('click', function () { playFlow(board); });
        }
    }

    function initCaseDetails() {
        var details = document.getElementById('caseDetails');
        if (!details) return;
        if (window.matchMedia('(max-width: 768px)').matches) details.open = false;
        window.addEventListener('beforeprint', function () { details.open = true; });
    }

    function init() {
        safeExecute(initCaseDetails, 'initCaseDetails');
        safeExecute(initScrollChrome, 'initScrollChrome');
        safeExecute(initSectionNav, 'initSectionNav');
        safeExecute(initReveals, 'initReveals');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
