# Resume Review & Change Log

**Review date:** November 18, 2026  
**Target roles:** Senior Node.js Developer, Senior Backend Engineer, Backend Engineer  
**Location:** Hyderabad, India  
**Official current title:** Software Developer (Maren Solutions)

---

## Issues Found (Original)

1. Experience badge showed **5+** while employment periods sum to ~**6 years 7 months**.
2. Unsupported metrics (100K concurrent users, 10K RPS, 55%/40% gains, 99.95% payments, 99.9% SLA, MTTR, cost savings).
3. **HIPAA** claimed for Saudi healthcare product without verification.
4. Stripe/PayPal payment-abstraction ownership unverified.
5. Platform-architect language overstated for role.
6. Maren section too long / repetitive.
7. Intermediate and SSC education clutter for senior applications.
8. Skills included Docker, CI/CD, PostgreSQL, WebSocket, Bull Queue without strong verification.
9. Inconsistent titles (Senior Node.js vs Backend Engineer vs Software Developer).
10. `resume-ats-draft.html` temporarily emptied; useful content recovered into `resume-ats.html`.

---

## Experience Calculation

| Company | Period | Approx. duration |
|---------|--------|------------------|
| Dhenushya Infotech | Jun 2019 – Oct 2020 | 1y 5m |
| Beyond Drops | Jul 2021 – Oct 2021 | 4m |
| Maren Solutions | Feb 2022 – Present (Nov 2026) | ~4y 10m |
| **Total (non-overlapping)** | | **~6y 7m** |

**Badge / summary wording used:** `6+ Years of Experience`

Gaps remain (Oct 2020–Jul 2021; Oct 2021–Feb 2022) — optional interview explanation only.

---

## Changes Implemented

### `index.html`
- Updated SEO title/description/keywords.
- Headline: Software Developer | Node.js Backend.
- Experience badge: 6+.
- Added Hyderabad in contact.
- Rewrote professional summary (credible, keyword-rich, no inflated metrics).
- Maren title: Software Developer; 8 contribution bullets.
- Softened Beyond Drops / Dhenushya bullets; removed unverified percentages.
- Skills regrouped; removed unverified Docker/CI/CD/PostgreSQL/WebSocket/Bull/HIPAA.
- Education: B.Tech only (removed Intermediate/SSC and percentage).
- ATS plain header synced.
- Kept visual layout, ATS download button, mobile sticky bar, LinkedIn.

### `resume-ats.html`
- Rebuilt as primary single-column ATS resume.
- Same verified content as website.
- Print/A4 friendly CSS; no icons/images.
- Selectable text; standard headings.

### `resume-ats-draft.html`
- Retained as historical pointer to `resume-ats.html` (not deleted).

### `script.js`
- Share text updated to 6+ / Software Developer positioning.
- Experience counter still reads badge number dynamically (now 6).

### `style.css`
- Minor readability tweaks for ATS plain header and non-link contact text.

---

## Claims Removed or Rewritten

| Claim | Action |
|-------|--------|
| 100K+ concurrent users | Removed |
| 10K+ requests/second | Removed |
| 55% DB / 40% latency improvements | Removed |
| 99.95% payment success | Removed |
| 99.9% uptime SLA | Removed |
| ~30% infra cost savings | Removed |
| MTTR 2h → 20m | Removed |
| HIPAA compliance | Removed |
| Stripe / PayPal abstraction ownership | Removed |
| “Architected scalable microservices system” as sole ownership | Rewritten to contribution language |
| Intermediate / SSC | Removed from primary resume |
| Docker, CI/CD, PostgreSQL, WebSocket, Bull Queue as confirmed skills | Removed pending verification |

---

## Verification Required (User Confirmation Still Helpful)

1. Redis depth beyond tokens/feature-switch troubleshooting.
2. MongoDB aggregation pipeline authorship (vs records/query patterns).
3. SummaryV1/V2: migration ownership vs production RCA/debugging.
4. RabbitMQ personal publish/consume (APS docs show connect-only in places).
5. Cigna integration ownership (only coverage copy found so far).
6. Automated testing frameworks used (Jest/Mocha/Supertest).
7. Docker / Jenkins / GitHub Actions practical usage.
8. Any **verified** metrics you can defend with method/tooling.
9. Optional gap explanation for employment gaps.

---

## ATS Improvements

- Single-column `resume-ats.html`.
- Standard headings: Summary, Skills, Experience, Education.
- Consistent dates and 6+ experience.
- Natural keywords: Node.js, TypeScript, Express, MongoDB, REST, microservices, gRPC, Redis, JWT, RBAC, healthcare.
- No decorative graphics in ATS version.
- Print CSS for A4 export.

**Note:** No automated ATS scanner was run; do not treat any numeric “ATS score” as measured.

---

## Final QA (2026-11-18)

### Checks completed
- Content consistency across `index.html`, `resume-ats.html`, `RESUME_REVIEW.md` (titles, companies, dates, 6+).
- Download button targets `resume-ats.html` (verified in browser).
- Desktop 1440 / tablet 768 / mobile 375: no horizontal overflow (`scrollWidth === clientWidth`).
- Headless Chrome A4 PDF of `resume-ats.html`: 2 pages, tagged, text selectable (~4005 chars extracted via `pdftotext`).
- No unsupported claim strings (HIPAA / inflated metrics) in PDF extract.
- `script.js` syntax check passed; share title aligned to Software Developer.

### Fixes during QA
- LinkedIn shown as plain URL text in ATS contact (ATS/PDF extractability).
- Removed print CSS `a::after` URL duplication that caused awkward wrapping.
- Grammar: “followed coding standards”.
- Share dialog title aligned with official Software Developer positioning.

### Checks not fully available
- Dedicated browser console-message MCP tool not present; used Runtime error hook (no uncaught errors captured). Intentional `console.log` performance message may still appear on load.
- Tablet screenshot capture timed out once; overflow metric still measured at 768px.
- Visual print-preview page aesthetics remain a short manual check in Chrome Print dialog.

---

## Remaining Recommendations

1. Add GitHub link if you have a public professional profile.
2. Add 1–2 testing bullets if you have real Jest/Supertest usage.
3. Prepare interview stories for: appointment grouping/rebook, gRPC/pm-connector, Redis summary stalls, lab follow-up.
4. Optionally add a one-line employment-gap note for HR screens if asked.
5. Confirm soft claims still open: Redis depth, aggregations, SummaryV ownership, RabbitMQ, Cigna, automated testing, Docker/CI.

---

## Career Progression Shown

MEAN Stack Developer → Node.js Developer → Software Developer (Node.js backend at Maren / Sanar)
