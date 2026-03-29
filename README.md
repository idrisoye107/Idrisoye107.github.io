# AIM Safety Consulting Ltd — Website

**Safety Simplified. Compliance Assured.**

A professional, modern, high-trust multi-section business website for AIM Safety Consulting Ltd — a UK Health & Safety consultancy specialising in Fire Risk Assessments, H&S Audits, and FFE Training.

---

## ✅ Completed Features

### Pages & Sections
- **Navigation** — Fixed navbar with scroll-aware styling (transparent → white), active link highlighting, mobile hamburger menu
- **Hero Section** — Full-screen with headline "Safety Simplified. Compliance Assured.", CTA buttons, trust badges, animated scroll indicator
- **Stats Section** — Animated counter strip (500+ businesses, 98% satisfaction, 1,200+ audits, 15 years)
- **Services Section** — Three service cards: Fire Risk Assessments, H&S Audits (featured), FFE Training — each with feature lists and CTAs
- **AIM Advantage Section** — Dark navy section with compliance card widget, regulatory coverage, key differentiators
- **The AIM Assurance (About)** — "Safety That Works With You, Not Against You" copy with commitment list (Seamless Integration, Always Current, Quality & Assurance)
- **Process Section** — 4-step visual process (Consultation → Assessment → Report → Partnership)
- **Testimonials** — Three client testimonials across manufacturing, hospitality, and logistics
- **Booking Portal** — Full contact/booking form with validation, Service Required, Company Size, Preferred Date, and success state
- **Footer** — Links, social icons, brand tagline, compliance links

### Design & UX
- **Colour Palette**: Deep Navy (#0D2240), Slate Grey (#5A6880), Safety Orange (#F26522)
- **Typography**: Montserrat (headings) + Inter (body)
- **Fully Responsive**: Mobile, tablet, desktop breakpoints
- **Scroll Animations**: Fade-up entrance animations on all cards and sections
- **Animated Counters**: Stats count up on scroll into view
- **Form Validation**: Client-side field validation with inline error messages
- **Data Persistence**: Booking submissions saved via RESTful Table API

### Branding
- **SVG Logo**: Flat vector logo — shield icon with stylised "A" + checkmark, navy + orange wordmark

---

## 📁 File Structure

```
index.html              Main single-page website
css/
  style.css             All styles (3200+ lines, fully commented)
js/
  main.js               Interactivity, animations, form handling
images/
  aim-logo.svg          Minimalist flat vector logo
README.md               This file
```

---

## 🔗 Navigation Anchors

| Section            | URL Anchor     |
|--------------------|---------------|
| Home / Hero        | `#home`       |
| Stats              | `#stats`      |
| Services           | `#services`   |
| Fire Risk          | `#fire-risk`  |
| H&S Audits         | `#hs-audits`  |
| FFE Training       | `#ffe-training`|
| AIM Advantage      | `#advantage`  |
| About / Assurance  | `#about`      |
| Booking Portal     | `#booking`    |

---

## 🗄️ Data Model

### `bookings` Table
| Field           | Type      | Description                          |
|-----------------|-----------|--------------------------------------|
| id              | text      | Auto-generated UUID                  |
| firstName       | text      | Client first name                    |
| lastName        | text      | Client last name                     |
| email           | text      | Client email address                 |
| phone           | text      | Client phone number (optional)       |
| company         | text      | Company name                         |
| serviceRequired | text      | fire-risk / hs-audit / ffe-training  |
| companySize     | text      | sole-trader / small / medium / large |
| preferredDate   | text      | Preferred consultation date          |
| message         | rich_text | Additional information               |
| submittedAt     | datetime  | Submission timestamp                 |

**API Endpoint:** `GET/POST tables/bookings`

---

## 🚧 Features Not Yet Implemented

- Live chat widget
- Case studies / portfolio pages
- Blog / regulatory news feed
- Client login portal
- PDF report download samples
- Online payment / quote calculator
- Google Analytics / tracking integration
- Cookie consent banner
- Email autoresponder on form submission

---

## 💡 Recommended Next Steps

1. **Replace placeholder contact details** (phone number, email) with real business information
2. **Add company registration number** to the footer
3. **Add accreditation logos** (NEBOSH, IOSH, SafeContractor, etc.)
4. **Blog/News section** for UK H&S regulatory updates — great for SEO
5. **Case studies** with real client outcomes to boost trust
6. **Google Maps embed** if there's a physical office
7. **Cookie consent banner** for GDPR compliance
8. **Schema.org markup** for local business SEO
