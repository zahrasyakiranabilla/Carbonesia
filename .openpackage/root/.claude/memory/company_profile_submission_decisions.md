---
name: Company Profile & Submission Form Decisions
description: Keputusan desain untuk modul Company Profile dan Submission Form - scope MVP, arsitektur, database, fitur
type: project
---

## Company Profile & Submission Form - Keputusan Desain

### 1. Arsitektur Sistem
- **Backend**: Satu Go backend untuk semua modul (Absensi + Company Profile + Submission)
- **Frontend Public**: TanStack Start SSR di subdomain `company.apotikasasi.com`
- **Frontend Admin**: Custom admin UI di `admin.apotikasasi.com` (shared untuk semua modul)
- **Database**: PostgreSQL (shared untuk semua modul)
- **File Storage**: Cloudinary R2 untuk foto dan file upload

### 2. Scope MVP - Public Pages
Prioritas fase 1:
- **Beranda (Home)**: Hero section, keunggulan, layanan highlight, CTA buttons
- **Profil**: About, visi-misi, struktur kepengurusan (static content)
- **Cabang**: List cabang dari DB dengan alamat, Google Maps link, WA, jam operasional
- **Artikel**: Listing artikel kesehatan + detail page
- **Karir**: Listing lowongan + detail + apply form (external link/email/internal form)
- **Hubungi Kami**: Contact form sederhana

### 3. Scope MVP - Submission Forms
- **Contact Us**: Form kontak umum (nama, email, telepon, alamat, pesan)
- **B2B Partnership**: Form kerjasama perusahaan
- **Internship**: Form magang dengan upload CV (PDF, max 2MB)
- **Event Collaboration**: Form kerjasama event
- **Endorsement**: Form endorsement media sosial
- **Prescription**: **Skipped** untuk MVP

### 4. Scope MVP - Admin Dashboard
- **CRUD Articles**: Create, edit, publish, archive artikel kesehatan
- **CRUD Lowongan**: Create, edit, open/close lowongan
- **View Job Applications**: Lihat aplikasi masuk dari internal form
- **View Submissions**: Lihat semua submission (Contact, B2B, Internship, Event, Endorsement)
- **Manajemen Branches**: CRUD cabang (shared dengan Absensi)

### 5. Content Management
- **Rich Text Editor**: TipTap untuk artikel dan lowongan content
- **Image Upload**: Cloudinary R2 via presigned URL
- **Publish Workflow**: Single-step (draft → publish, no approval chain)
- **Scheduled Publish**: Tidak ada untuk MVP (manual publish only)
- **Versioning**: Tidak ada (hanya updated_at timestamp)

### 6. Submission Handling
- **Storage**: JSONB field untuk data submission (flexible schema per type)
- **Status Tracking**: pending → reviewed → approved/rejected
- **Anonymous Submission**: Tidak perlu login untuk submit form
- **Tracking Token**: **Removed** dari MVP (fire-and-forget)
- **Email Notification**: SMTP handled later (Phase 2)

### 7. Lowongan Application
- **Application Methods**: Admin bisa enable multiple per lowongan:
  - External link (LinkedIn, job portal, Google Form)
  - Email (mailto dengan pre-filled subject)
  - Internal form (upload CV + supporting document, PDF max 2MB each)
  - WhatsApp (wa.me link dengan pre-filled message)
- **Job Application Schema**:
  - full_name, email, phone, cover_letter (optional)
  - cv_url (required), supporting_doc_url (optional)
  - status: pending → reviewed → interview → hired/rejected

### 8. Database Schema (Shared)
**Single `branches` table** untuk Company Profile dan Absensi:
- id, name, address, latitude, longitude, radius_meters
- google_maps_link, whatsapp_number, operating_hours
- phone (optional), email (optional), is_active

**New tables:**
- `articles`: id, title, slug, excerpt, content, featured_image_url, author_name, published_at, status (draft/published/archived)
- `lowongan`: id, position_title, slug, job_description, requirements, location, employment_type, status (open/closed), apply_method_* fields
- `job_applications`: id, lowongan_id, full_name, email, phone, cv_url, supporting_doc_url, status
- `submissions`: id, type (contact/b2b/internship/event/endorsement), data (JSONB), status, submitted_at

### 9. Authentication & Authorization
- **Single admin role** untuk MVP (full akses semua modul)
- **Centralized login** di `admin.apotikasasi.com/login`
- **Anonymous submissions** (tidak perlu login untuk public forms)
- **JWT**: 24 jam access token, 30 hari refresh token (shared dengan Absensi)

### 10. Out of Scope (Fase Berikutnya)
- Floating buttons (WhatsApp, e-commerce)
- Tracking token untuk submissions
- Email/SMS notifications
- Approval workflow multi-step
- Scheduled publishing
- Content versioning/history
- Promo/Membership/Testimoni pages
- Dashboard analytics
- Prescription form

### 11. SEO & Performance
- Meta title/description per page
- Open Graph + Twitter Card tags
- Sitemap.xml + Robots.txt
- Schema.org structured data (Article, JobPosting, Organization)
- LCP < 2.5s, PageSpeed > 90
- Cloudinary untuk image optimization (auto format, quality, lazy load)

### 12. Domain Structure
- `company.apotikasasi.com` - Public company profile pages
- `admin.apotikasasi.com` - Admin dashboard (all modules)
- `absensi.apotikasasi.com` - Employee absensi pages (separate app)
