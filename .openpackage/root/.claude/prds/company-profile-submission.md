---
title: Company Profile & Submission Form - Product Requirements Document
version: 1.0
status: draft
---

## Problem Statement

Apotek Asasi membutuhkan kehadiran digital yang profesional untuk membangun kredibilitas brand, menginformasikan layanan kepada publik, dan menerima berbagai pengajuan dari masyarakat (kerjasama bisnis, magang, event, endorsement). Saat ini tidak ada website company profile sehingga:
- Masyarakat tidak dapat mengakses informasi apotek secara online (profil, layanan, cabang, artikel kesehatan)
- Tidak ada channel digital untuk menerima pengajuan kerjasama, magang, atau event
- Lowongan kerja hanya disebar manual tanpa tracking aplikasi yang masuk
- Tidak ada platform untuk publikasi artikel kesehatan sebagai value-add untuk pelanggan

## Solution

Website Company Profile berbasis web dengan fitur:
- **Public Pages**: Beranda, Profil, Cabang, Artikel Kesehatan, Karir, Hubungi Kami
- **Submission Forms**: Contact, B2B Partnership, Internship, Event Collaboration, Endorsement
- **Admin Dashboard**: CMS untuk Articles & Lowongan, dashboard untuk review submissions
- **Shared Backend**: Go API terintegrasi dengan modul Absensi untuk unified authentication dan database

## User Stories

### Public Pages - Visitor Experience

1. Sebagai pengunjung, saya ingin melihat halaman beranda yang informatif dengan hero banner dan keunggulan apotek, sehingga saya langsung memahami nilai yang ditawarkan Apotek Asasi
2. Sebagai pengunjung, saya ingin membaca profil apotek (sejarah, visi-misi, struktur), sehingga saya mengenal background dan kredibilitas apotek
3. Sebagai pengunjung, saya ingin melihat daftar cabang apotek dengan alamat, jam operasional, nomor WA, dan link Google Maps, sehingga saya dapat mengunjungi cabang terdekat
4. Sebagai pengunjung, saya ingin membaca artikel kesehatan, sehingga saya mendapat informasi medis yang terpercaya
5. Sebagai pengunjung, saya ingin melihat daftar artikel dalam format listing dengan featured image, sehingga saya dapat memilih artikel yang menarik
6. Sebagai pengunjung, saya ingin membaca detail artikel lengkap dengan author info, sehingga saya tahu sumber informasinya
7. Sebagai pengunjung, saya ingin melihat lowongan pekerjaan yang tersedia, sehingga saya dapat melamar posisi yang sesuai
8. Sebagai pengunjung, saya ingin melihat detail lowongan (job desc, requirements, lokasi, tipe employment), sehingga saya paham kualifikasi yang dibutuhkan
9. Sebagai pengunjung, saya ingin melamar lowongan via email/external link/internal form, sehingga saya dapat mengirim lamaran dengan cara yang paling mudah bagi saya
10. Sebagai pengunjung, saya ingin mengirim pesan via form Hubungi Kami, sehingga saya dapat bertanya atau menyampaikan pesan ke apotek
11. Sebagai pengunjung, saya ingin navigasi yang jelas ke semua halaman, sehingga saya dapat menemukan informasi yang saya cari dengan mudah
12. Sebagai pengunjung mobile, saya ingin website responsive dan cepat, sehingga saya dapat browsing dengan nyaman dari HP

### Submission Forms - External Users

13. Sebagai pengguna eksternal, saya ingin submit form Contact Us dengan nama, email, telepon, alamat, dan pesan, sehingga saya dapat menghubungi apotek
14. Sebagai代表 perusahaan, saya ingin submit form B2B Partnership dengan detail perusahaan dan proposal kerjasama, sehingga saya dapat mengajukan kemitraan bisnis
15. Sebagai mahasiswa/pelajar, saya ingin submit form Internship dengan upload CV dan surat pengantar, sehingga saya dapat mengajukan magang di apotek
16. Sebagai penyelenggara event, saya ingin submit form Event Collaboration dengan detail event, sehingga saya dapat mengajak apotek berkolaborasi
17. Sebagai kreator/influencer, saya ingin submit form Endorsement dengan info followers dan portofolio, sehingga saya dapat menawarkan kerjasama endorsement
18. Sebagai pelamar magang, saya ingin upload CV dalam format PDF (max 2MB), sehingga dokumen saya dapat dibuka dan dibaca dengan baik
19. Sebagai user yang submit form, saya ingin mendapat konfirmasi sukses setelah submit, sehingga saya tahu form saya terkirim

### Admin Dashboard - Content Management

20. Sebagai admin, saya ingin login dengan email dan password, sehingga saya dapat akses dashboard admin
21. Sebagai admin, saya ingin membuat artikel baru dengan rich text editor, sehingga saya dapat menulis konten kesehatan dengan formatting yang baik
22. Sebagai admin, saya ingin upload featured image untuk artikel via Cloudinary, sehingga artikel punya visual yang menarik
23. Sebagai admin, saya ingin set status artikel (draft/published/archived), sehingga saya dapat kontrol kapan artikel tayang
24. Sebagai admin, saya ingin edit artikel yang sudah dibuat, sehingga saya dapat update konten jika ada perubahan
25. Sebagai admin, saya ingin delete artikel yang tidak relevan lagi, sehingga konten tetap up-to-date
26. Sebagai admin, saya ingin membuat lowongan baru dengan detail posisi, requirements, dan metode aplikasi, sehingga saya dapat publikasi lowongan
27. Sebagai admin, saya ingin pilih metode aplikasi per lowongan (external link/email/internal form/WhatsApp), sehingga saya dapat tentukan cara lamaran yang paling sesuai
28. Sebagai admin, saya ingin set status lowongan (open/closed), sehingga saya dapat tutup lowongan yang sudah terpenuhi
29. Sebagai admin, saya ingin edit lowongan yang sudah dibuat, sehingga saya dapat update info jika ada perubahan
30. Sebagai admin, saya ingin delete lowongan yang sudah tidak berlaku, sehingga listing tetap relevan

### Admin Dashboard - Submissions Management

31. Sebagai admin, saya ingin melihat list semua submission masuk (Contact, B2B, Internship, Event, Endorsement), sehingga saya dapat review satu per satu
32. Sebagai admin, saya ingin filter submission berdasarkan tipe, sehingga saya dapat fokus review tipe tertentu
33. Sebagai admin, saya ingin filter submission berdasarkan status (pending/reviewed/approved/rejected), sehingga saya dapat track progress review
34. Sebagai admin, saya ingin lihat detail submission per tipe, sehingga saya dapat baca semua informasi yang disubmit
35. Sebagai admin, saya ingin update status submission (pending → reviewed → approved/rejected), sehingga saya dapat track hasil review
36. Sebagai admin, saya ingin tambahkan admin notes pada submission, sehingga saya dapat catat internal notes untuk follow-up
37. Sebagai admin, saya ingin lihat submission internship dengan CV yang diupload, sehingga saya dapat download dan review kualifikasi pelamar
38. Sebagai admin, saya ingin lihat submission job applications dari internal form, sehingga saya dapat review lamaran yang masuk per lowongan

### Admin Dashboard - Branch Management

39. Sebagai admin, saya ingin tambah cabang baru dengan nama, alamat, koordinat GPS, WA, jam operasional, Google Maps link, sehingga info cabang tersedia di public page
40. Sebagai admin, saya ingin edit info cabang yang sudah ada, sehingga saya dapat update jika ada perubahan jam operasional atau kontak
41. Sebagai admin, saya ingin set cabang inactive (tanpa delete), sehingga saya dapat hide cabang sementara tanpa hilang data
42. Sebagai admin, saya ingin koordinat cabang terintegrasi dengan modul Absensi, sehingga validasi GPS absensi akurat

### Shared Features

43. Sebagai admin, saya ingin single login untuk akses semua modul (Absensi + Company Profile), sehingga saya tidak perlu login berkali-kali
44. Sebagai admin, saya ingin session saya tetap aktif selama 24 jam, sehingga saya tidak perlu re-login saat bekerja
45. Sebagai visitor, saya ingin website load cepat (LCP < 2.5s), sehingga saya tidak menunggu lama
46. Sebagai visitor, saya ingin website SEO-friendly, sehingga saya dapat menemukan Apotek Asasi via Google search
47. Sebagai admin, saya ingin rich text editor yang user-friendly untuk artikel, sehingga saya dapat format konten dengan mudah (bold, italic, heading, list, link)

## Implementation Decisions

### Arsitektur Sistem

**Frontend:**
- **Public Pages**: TanStack React Start (SSR) di `apps/company-profile`
- **Admin Dashboard**: TanStack React Start di `apps/dashboard` (shared untuk semua modul)
- **UI Components**: shadcn/ui shared di `packages/ui`
- **Styling**: Tailwind CSS v4
- **State Management**: TanStack Query
- **Rich Text Editor**: TipTap

**Backend:**
- **Bahasa**: Go (Golang) standard library
- **Database**: PostgreSQL (shared dengan Absensi)
- **Auth**: JWT (24 jam access, 30 hari refresh)
- **File Storage**: Cloudinary R2 (images + PDF uploads)
- **Deployment**: Docker di VPS (shared dengan Absensi)

**Domain Structure:**
- `company.apotikasasi.com` - Public pages
- `admin.apotikasasi.com` - Admin dashboard
- API: `api.apotikasasi.com` (shared backend)

### Database Schema

**`articles` table:**
```
- id (UUID, PK)
- title (VARCHAR(200), NOT NULL)
- slug (VARCHAR(255), UNIQUE, NOT NULL)
- excerpt (TEXT, NULL)
- content (TEXT, NOT NULL)
- featured_image_url (VARCHAR, NULL)
- author_name (VARCHAR(100), DEFAULT "Apotek Asasi")
- author_avatar_url (VARCHAR, NULL)
- published_at (TIMESTAMP, NULL)
- status (ENUM: draft, published, archived, DEFAULT draft)
- created_at, updated_at

Index: (slug), (status, published_at)
```

**`lowongan` table:**
```
- id (UUID, PK)
- position_title (VARCHAR(200), NOT NULL)
- slug (VARCHAR(255), UNIQUE, NOT NULL)
- job_description (TEXT, NOT NULL)
- requirements (TEXT, NOT NULL)
- location (VARCHAR(200), NULL)
- employment_type (ENUM: full-time, part-time, contract, internship)
- salary_range (VARCHAR(100), NULL)
- application_deadline (DATE, NULL)
- status (ENUM: open, closed, DEFAULT open)
- apply_method_external_link (BOOLEAN, DEFAULT false)
- apply_method_email (BOOLEAN, DEFAULT false)
- apply_method_internal_form (BOOLEAN, DEFAULT false)
- apply_method_whatsapp (BOOLEAN, DEFAULT false)
- application_email (VARCHAR(255), NULL)
- application_whatsapp (VARCHAR(50), NULL)
- application_external_url (VARCHAR, NULL)
- created_at, updated_at

Index: (slug), (status)
```

**`job_applications` table:**
```
- id (UUID, PK)
- lowongan_id (UUID, FK -> lowongan.id)
- full_name (VARCHAR(200), NOT NULL)
- email (VARCHAR(255), NOT NULL)
- phone (VARCHAR(50), NOT NULL)
- cover_letter (TEXT, NULL)
- cv_url (VARCHAR, NOT NULL)
- supporting_doc_url (VARCHAR, NULL)
- source (VARCHAR(100), NULL)
- status (ENUM: pending, reviewed, interview, hired, rejected, DEFAULT pending)
- created_at, updated_at

Index: (lowongan_id), (status)
```

**`submissions` table:**
```
- id (UUID, PK)
- type (ENUM: contact, b2b, internship, event, endorsement, NOT NULL)
- data (JSONB, NOT NULL) -- flexible schema per type
- status (ENUM: pending, reviewed, approved, rejected, DEFAULT pending)
- admin_notes (TEXT, NULL)
- submitted_at (TIMESTAMP, DEFAULT NOW())
- reviewed_at (TIMESTAMP, NULL)
- reviewed_by (UUID, FK -> users.id, NULL)

Index: (type, status)
```

**`branches` table** (shared dengan Absensi):
```
- id (UUID, PK)
- name (VARCHAR, NOT NULL)
- address (TEXT, NOT NULL)
- latitude (DECIMAL(10,8), NULL)
- longitude (DECIMAL(11,8), NULL)
- radius_meters (INTEGER, DEFAULT 50)
- google_maps_link (VARCHAR, NULL)
- whatsapp_number (VARCHAR(50), NULL)
- operating_hours (VARCHAR(200), NULL)
- phone (VARCHAR(50), NULL)
- email (VARCHAR(255), NULL)
- branch_type (ENUM: apotek, office, DEFAULT apotek)
- is_active (BOOLEAN, DEFAULT true)
- created_at, updated_at
```

**`users` table** (shared dengan Absensi):
```
- id, email (unique), password_hash, name, role (admin/employee)
- active, must_change_password, reset_token, reset_token_expiry
- created_at, updated_at
```

### API Endpoints

**Public (no auth required):**
```
GET  /api/v1/public/articles          - List published articles
GET  /api/v1/public/articles/:slug    - Article detail
GET  /api/v1/public/lowongan          - List open lowongan
GET  /api/v1/public/lowongan/:slug    - Lowongan detail
GET  /api/v1/public/branches          - List active branches
POST /api/v1/public/submit            - Submit form (contact/b2b/internship/event/endorsement)
POST /api/v1/public/apply             - Apply lowongan (internal form)
POST /api/v1/public/contact           - Contact form
```

**Admin (auth required):**
```
POST /api/v1/admin/articles          - Create article
GET  /api/v1/admin/articles          - List all articles
GET  /api/v1/admin/articles/:id      - Article detail for edit
PATCH /api/v1/admin/articles/:id     - Update article
DELETE /api/v1/admin/articles/:id    - Delete article

POST /api/v1/admin/lowongan          - Create lowongan
GET  /api/v1/admin/lowongan          - List all lowongan
GET  /api/v1/admin/lowongan/:id      - Lowongan detail for edit
PATCH /api/v1/admin/lowongan/:id     - Update lowongan
DELETE /api/v1/admin/lowongan/:id    - Delete lowongan

GET  /api/v1/admin/applications      - List job applications
GET  /api/v1/admin/applications/:id  - Application detail
PATCH /api/v1/admin/applications/:id - Update status

GET  /api/v1/admin/submissions       - List all submissions (filter by type, status)
GET  /api/v1/admin/submissions/:id   - Submission detail
PATCH /api/v1/admin/submissions/:id  - Update status + admin_notes

POST /api/v1/admin/branches          - Create branch
GET  /api/v1/admin/branches          - List branches
PATCH /api/v1/admin/branches/:id     - Update branch
DELETE /api/v1/admin/branches/:id    - Deactivate branch

POST /api/v1/admin/upload/presign   - Get presigned URL for Cloudinary
```

**Auth (shared dengan Absensi):**
```
POST /api/v1/auth/login              - Login
POST /api/v1/auth/logout             - Logout
POST /api/v1/auth/refresh            - Refresh token
POST /api/v1/auth/forgot-password    - Request reset
POST /api/v1/auth/reset-password     - Reset password
```

### Submission Form Data Schemas (JSONB)

**Contact:**
```json
{
  "first_name": "string",
  "last_name": "string",
  "email": "string",
  "phone": "string",
  "address": "string",
  "message": "string"
}
```

**B2B Partnership:**
```json
{
  "company_name": "string",
  "partnership_type": "string",
  "pic_name": "string",
  "pic_position": "string",
  "phone": "string",
  "email": "string",
  "proposal_details": "string"
}
```

**Internship:**
```json
{
  "full_name": "string",
  "institution": "string",
  "major": "string",
  "internship_period": "string",
  "phone": "string",
  "email": "string",
  "cv_url": "string"
}
```

**Event:**
```json
{
  "organizer_name": "string",
  "event_type": "string",
  "event_date": "string",
  "event_location": "string",
  "event_description": "string",
  "estimated_participants": "number",
  "contact_person": "string",
  "contact_phone": "string"
}
```

**Endorsement:**
```json
{
  "name": "string",
  "social_platform": "string",
  "followers_count": "number",
  "content_type": "string",
  "portfolio_link": "string"
}
```

### File Upload Flow

**Images (Articles/Featured):**
1. Admin request presigned URL: `POST /api/v1/admin/upload/presign`
2. Backend return Cloudinary presigned URL (5 min expiry)
3. Frontend upload langsung ke Cloudinary R2
4. Frontend save URL ke article form

**Documents (CV/Supporting):**
1. User request presigned URL: `POST /api/v1/public/upload/presign`
2. Backend validate file type (PDF only) dan size (max 2MB)
3. Return presigned URL
4. Upload langsung ke Cloudinary
5. Submit form dengan file URL

**Validasi Upload:**
- Images: JPEG/PNG, max 500KB, auto-resize 800x600
- Documents: PDF only, max 2MB

### Authorization Rules

| Role | Akses |
|------|-------|
| admin | Full akses (Articles, Lowongan, Submissions, Applications, Branches, Users, Attendances) |
| employee | Tidak ada akses admin (hanya modul Absensi employee) |

### Content Management Workflow

**Articles:**
```
Draft → Published (admin publish langsung)
Published → Archived (admin archive jika tidak relevan)
```

**Lowongan:**
```
Draft → Open (lowongan tayang publik)
Open → Closed (tutup lowongan)
```

**Submissions:**
```
Pending → Reviewed → Approved
                 → Rejected
```

### SEO Implementation

**Meta Tags per Page:**
- Dynamic title: `{page_title} | Apotek Asasi`
- Meta description (150-160 chars)
- Open Graph: og:title, og:description, og:image, og:url
- Twitter Card: summary_large_image
- Canonical URL
- Schema.org structured data:
  - Article untuk artikel kesehatan
  - JobPosting untuk lowongan
  - PharmacyOrganization untuk company profile
  - LocalBusiness untuk cabang

**Sitemap & Robots:**
- sitemap.xml auto-generated
- robots.txt allow all public pages

### Performance Optimization

- Image lazy loading (native loading="lazy")
- Cloudinary auto-format (WebP/AVIF support)
- ISR (Incremental Static Regeneration) untuk artikel listing
- TanStack Router code splitting
- TanStack Query caching untuk API responses
- Target LCP < 2.5s, CLS < 0.1, PageSpeed > 90

### Security Considerations

1. **Input Validation**: Sanitasi semua input untuk prevent XSS dan SQL injection
2. **Rate Limiting**:
   - Public submit endpoints: 10 requests/hour per IP
   - Upload presign: 20 requests/hour per IP
   - Admin endpoints: 100 requests/hour per user
3. **CORS**:
   - Public endpoints: allow all
   - Admin endpoints: restrict to admin domain only
4. **File Upload Security**:
   - Validate file type (magic bytes, bukan hanya extension)
   - Scan PDF untuk malware (optional, Phase 2)
   - Generate random filename (sanitize original)

## Testing Decisions

### Backend Testing

**Unit Tests:**
- `submission_validation_test.go` - Validasi schema JSONB per tipe submission
- `file_upload_validation_test.go` - Validasi file type dan size
- `slug_generation_test.go` - Auto-generate slug dari title
- `job_application_status_test.go` - Status transition validation

**Integration Tests:**
- `articles_integration_test.go` - CRUD articles flow
- `lowongan_integration_test.go` - CRUD lowongan flow
- `submissions_integration_test.go` - Submit form + admin review flow
- `job_applications_integration_test.go` - Apply lowongan + review flow

**Test Coverage Target:** Minimal 80% untuk business logic dan validation

### Frontend Testing

**Unit Tests:**
- Form validation (required fields, email format, phone format)
- File upload validation (type, size)
- Slug generation preview

**Component Tests:**
- Article listing page rendering
- Lowongan detail page rendering
- Submission form submission
- Admin article editor (TipTap integration)

**E2E Tests (Playwright):**
- Visitor browsing articles
- Visitor applying lowongan via internal form
- User submitting internship form with CV upload
- Admin creating/publishing article
- Admin reviewing submissions

### Prior Art dalam Codebase

Belum ada testing pattern yang established. Akan dibuatkan contoh test di:
- `backend/internal/handler/__tests__/` untuk backend
- `apps/company-profile/src/__tests__/` untuk frontend public
- `apps/dashboard/src/__tests__/` untuk admin

## Out of Scope

Berikut adalah fitur yang **tidak termasuk** dalam scope PRD ini:

1. **Prescription Form** - Form resep dokter (deferred to Phase 2)
2. **Floating Buttons** - WhatsApp dan e-commerce floating button
3. **Tracking Token** - Tracking submission status untuk anonymous users
4. **Email Notifications** - Notifikasi email saat submission masuk atau status berubah
5. **SMS/WhatsApp Notifications** - Notifikasi via WA/SMS
6. **Approval Workflow Multi-step** - Chain approval (creator → manager → publish)
7. **Scheduled Publishing** - Auto-publish artikel di waktu tertentu
8. **Content Versioning** - History edit artikel
9. **Promo Page** - Halaman khusus promo
10. **Membership Page** - Halaman program membership
11. **Testimoni Page** - Halaman testimoni pelanggan
12. **Dashboard Analytics** - Grafik statistik (views, submissions per period)
13. **Export Reports** - Export submissions/applications ke Excel
14. **Multi-language** - Website bahasa Inggris
15. **Video Company Profile** - Embed video profil di homepage
16. **Product Catalog Page** - Halaman produk dengan CTA e-commerce

## Further Notes

### Fase Pengembangan

**Fase 1 (MVP - 3-4 minggu):**
- Backend API Go untuk Articles, Lowongan, Submissions, Applications
- Frontend public pages: Beranda, Profil, Cabang, Artikel (listing + detail), Karir (listing + detail), Hubungi Kami
- Submission forms: Contact, B2B, Internship, Event, Endorsement
- Admin dashboard: CRUD Articles, CRUD Lowongan, View Submissions, View Applications
- Branch management (shared dengan Absensi)
- Authentication terpusat

**Fase 2 (Enhancement - 2-3 minggu):**
- Email notifications untuk submission baru
- Tracking token untuk anonymous users
- Floating buttons (WA, e-commerce)
- Promo/Membership/Testimoni pages
- Dashboard analytics basic

**Fase 3 (Optional):**
- Approval workflow
- Scheduled publishing
- Content versioning
- Video company profile
- Product catalog
- Multi-language support

### Content Migration

Jika sudah ada konten artikel/lowongan di tempat lain (Google Docs, Word), perlu disiapkan:
- Import script untuk migrate konten existing
- Atau admin input manual untuk konten awal

### Dependencies Eksternal

| Service | Purpose | Alternatif |
|---------|---------|------------|
| PostgreSQL | Primary database | - |
| Cloudinary R2 | File storage | AWS S3, GCP Storage |
| TipTap | Rich text editor | Quill, CKEditor |
| TanStack Start | SSR framework | Next.js, Remix |

### Monitoring & Logging

- Health check endpoint: `/health`
- Structured logging (JSON format)
- Error tracking: Sentry (optional Phase 2)

### Content Guidelines

**Artikel Kesehatan:**
- Minimal 300 kata
- Featured image recommended
- Author attribution (misal: "Tim Apotek Asasi" atau nama apoteker)
- Categorization (optional Phase 2)

**Lowongan:**
- Job description jelas dan spesifik
- Requirements terstruktur (bullet points)
- Metode aplikasi sesuai preferensi (email/form/WA)

### Koordinasi dengan Modul Absensi

**Shared Components:**
- Authentication (login, JWT, refresh)
- User management
- Branch management
- Upload utility (Cloudinary presigned URLs)

**Backend Structure:**
- Single Go backend dengan modular handlers:
  - `/api/v1/auth/*` - Shared auth
  - `/api/v1/admin/*` - Admin endpoints (all modules)
  - `/api/v1/public/*` - Public endpoints (Company Profile)
  - `/api/v1/attendances/*` - Absensi module
