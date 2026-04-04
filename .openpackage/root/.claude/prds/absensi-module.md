---
title: Modul Absensi - Product Requirements Document
version: 1.0
status: draft
---

## Problem Statement

Apotek Asasi membutuhkan sistem absensi digital untuk mengelola kehadiran karyawan di tiga cabang apotek (Mangu, Colomadu, Manahan) dan office. Saat ini, pencatatan kehadiran masih manual sehingga menyulitkan monitoring real-time, rekap bulanan, dan validasi kehadiran karyawan. Diperlukan solusi yang memungkinkan karyawan melakukan check-in/check-out dengan validasi lokasi GPS dan foto selfie, sementara admin dapat memonitor dan merekap kehadiran secara efisien.

## Solution

Sistem absensi berbasis web dan mobile dengan fitur:
- **Employee Self-Service**: Karyawan dapat check-in/check-out via web/mobile dengan validasi GPS (radius 50m dari lokasi apotek) dan upload foto selfie
- **Admin Dashboard**: Monitoring real-time, rekap kehadiran, export Excel, dan manajemen akun pegawai
- **Validasi Server-Side**: Menggunakan Haversine formula untuk validasi koordinat GPS
- **Storage Terpusat**: PostgreSQL untuk data struktural, Cloudinary R2 untuk penyimpanan foto

## User Stories

### Modul Employee - Check-In/Check-Out

1. Sebagai karyawan, saya ingin melakukan check-in dengan foto selfie dan validasi GPS, sehingga kehadiran saya tercatat dengan bukti yang valid
2. Sebagai karyawan, saya ingin memilih status kehadiran (Hadir, Sakit, Izin Keluarga, Alpha), sehingga alasan ketidakhadiran terdokumentasi
3. Sebagai karyawan, saya ingin melakukan check-out dengan foto dan validasi GPS, sehingga jam pulang saya tercatat untuk perhitungan durasi kerja
4. Sebagai karyawan, saya ingin mengisi field keterangan ketika tidak hadir (sakit/izin), sehingga alasan ketidakhadiran jelas untuk admin
5. Sebagai karyawan, saya ingin mengisi field overtime reason dan duration ketika lembur, sehingga jam lembur saya tercatat
6. Sebagai karyawan dengan role Office, saya ingin check-in tanpa validasi GPS, karena lokasi kerja saya tidak tetap di satu cabang
7. Sebagai karyawan, saya ingin ditolak saat double check-in, sehingga saya diingatkan untuk check-out dulu sebelum check-in lagi
8. Sebagai karyawan, saya ingin bisa check-out lewat tengah malam (max 23:59 hari berikutnya), sehingga shift malam terakomodasi

### Modul Employee - Riwayat Absensi

9. Sebagai karyawan, saya ingin melihat riwayat absensi pribadi lengkap (tanggal, jam check-in/out, foto, lokasi GPS, status, total jam kerja), sehingga saya dapat memantau catatan kehadiran saya
10. Sebagai karyawan, saya ingin filter riwayat berdasarkan bulan dan status, sehingga saya dapat mencari data spesifik dengan mudah

### Modul Admin - Monitoring Real-time

11. Sebagai admin, saya ingin memantau seluruh data absensi pegawai secara real-time (detail lokasi GPS, jam check-in/out, foto, status), sehingga saya dapat mengawasi kehadiran secara langsung
12. Sebagai admin, saya ingin filter monitoring berdasarkan lokasi apotek, tanggal, dan status kehadiran (Hadir/Izin/Alpha/Absen), sehingga saya dapat melihat data spesifik
13. Sebagai admin, saya ingin melihat detail attendance per karyawan spesifik, sehingga saya dapat mengecek riwayat individual
14. Sebagai admin, saya ingin melakukan manual input check-out untuk karyawan yang lupa, sehingga data kehadiran tetap lengkap

### Modul Admin - Rekap Kehadiran

15. Sebagai admin, saya ingin melihat rekap kehadiran pegawai (jam masuk, jam pulang, total jam kerja, jumlah hadir/izin/alpha), sehingga saya dapat membuat laporan bulanan
16. Sebagai admin, saya ingin filter rekap secara harian, mingguan, bulanan, dan lokasi apotek, sehingga laporan dapat disesuaikan dengan kebutuhan
17. Sebagai admin, saya ingin export data absensi ke format Excel (.xlsx) dengan filter range tanggal, sehingga saya dapat mengolah data lebih lanjut

### Modul Admin - Manajemen Akun Pegawai

18. Sebagai admin, saya ingin membuat akun untuk pegawai baru, sehingga pegawai dapat login dan menggunakan sistem absensi
19. Sebagai admin, saya ingin menonaktifkan akun pegawai yang keluar kerja, sehingga akun tidak dapat digunakan lagi
20. Sebagai admin, saya ingin mengaktifkan kembali akun pegawai yang kembali bekerja, sehingga pegawai dapat menggunakan sistem lagi

### Modul Admin - Manajemen Branch

21. Sebagai admin, saya ingin menambah/edit cabang apotek dengan nama, alamat, koordinat GPS, dan radius toleransi, sehingga validasi GPS akurat
22. Sebagai admin, saya ingin mengatur radius toleransi GPS per cabang (default 50m), sehingga validasi dapat disesuaikan dengan kondisi lokasi

## Implementation Decisions

### Arsitektur Sistem

**Frontend:**
- **Framework**: React 19 + TypeScript + TanStack React Start (Vite)
- **UI Components**: shadcn/ui (shared di packages/ui)
- **Routing**: TanStack Router
- **Styling**: Tailwind CSS v4
- **State Management**: React Query (TanStack Query) untuk server state
- **Apps**:
  - `apps/absensi` - Employee self-service (check-in/out, riwayat)
  - `apps/absensi-admin` - Admin dashboard (monitoring, rekap, manajemen)

**Backend:**
- **Bahasa**: Go (Golang) dengan standard library
- **Database**: PostgreSQL
- **Auth**: JWT (access token 24 jam, refresh token 30 hari)
- **File Storage**: Cloudinary R2 untuk foto selfie
- **Deployment**: Docker di VPS

### Struktur Database

**Tabel `users`:**
```
- id (UUID, PK)
- email (VARCHAR, UNIQUE, NOT NULL)
- password_hash (VARCHAR, NOT NULL)
- name (VARCHAR, NOT NULL)
- role (ENUM: office, apoteker, staff, admin, NOT NULL)
- active (BOOLEAN, DEFAULT true)
- must_change_password (BOOLEAN, DEFAULT false)
- reset_token (VARCHAR, NULL)
- reset_token_expiry (TIMESTAMP, NULL)
- created_at (TIMESTAMP, DEFAULT NOW())
- updated_at (TIMESTAMP, DEFAULT NOW())
```

**Tabel `attendances`:**
```
- id (UUID, PK)
- user_id (UUID, FK -> users.id, NOT NULL)
- date (DATE, NOT NULL)
- branch_id (UUID, FK -> branches.id, NULL)
- check_in_time (TIMESTAMP, NULL)
- check_out_time (TIMESTAMP, NULL)
- check_in_photo_url (VARCHAR, NULL)
- check_out_photo_url (VARCHAR, NULL)
- check_in_lat (DECIMAL(10,8), NULL)
- check_in_lng (DECIMAL(11,8), NULL)
- check_out_lat (DECIMAL(10,8), NULL)
- check_out_lng (DECIMAL(11,8), NULL)
- status (ENUM: hadir, sakit, izin_keluarga, alpha, lembur, izin_pulang_cepat, NOT NULL)
- reason (TEXT, NULL)
- overtime_reason (TEXT, NULL)
- overtime_duration (INTEGER, NULL) -- dalam menit
- work_duration_minutes (INTEGER, NULL) -- dihitung saat check-out
- created_at (TIMESTAMP, DEFAULT NOW())
- updated_at (TIMESTAMP, DEFAULT NOW())

Index: (user_id, date)
```

**Tabel `branches`:**
```
- id (UUID, PK)
- name (VARCHAR, NOT NULL)
- address (TEXT, NOT NULL)
- latitude (DECIMAL(10,8), NULL)
- longitude (DECIMAL(11,8), NULL)
- radius_meters (INTEGER, DEFAULT 50)
- active (BOOLEAN, DEFAULT true)
- branch_type (ENUM: apotek, office, DEFAULT apotek)
- created_at (TIMESTAMP, DEFAULT NOW())
- updated_at (TIMESTAMP, DEFAULT NOW())
```

**Tabel `refresh_tokens`:**
```
- id (UUID, PK)
- user_id (UUID, FK -> users.id, NOT NULL)
- token (VARCHAR, NOT NULL)
- expires_at (TIMESTAMP, NOT NULL)
- revoked (BOOLEAN, DEFAULT false)
- created_at (TIMESTAMP, DEFAULT NOW())
```

### API Endpoints

**Authentication:**
- `POST /api/auth/login` - Login dengan email + password
- `POST /api/auth/logout` - Logout (invalidate refresh token)
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/forgot-password` - Request reset password
- `POST /api/auth/reset-password` - Reset password dengan token

**Attendances (Employee):**
- `POST /api/attendances/check-in` - Submit check-in (foto, GPS, status)
- `POST /api/attendances/check-out` - Submit check-out (foto, GPS, overtime)
- `GET /api/attendances/me` - Riwayat absensi pribadi
- `GET /api/attendances/me/:id` - Detail attendance spesifik

**Attendances (Admin):**
- `GET /api/admin/attendances` - Monitoring real-time semua pegawai
- `GET /api/admin/attendances/summary` - Rekap kehadiran
- `GET /api/admin/attendances/:id` - Detail attendance pegawai
- `POST /api/admin/attendances/:id/check-out` - Manual check-out
- `GET /api/admin/attendances/export` - Export Excel

**Users (Admin):**
- `GET /api/admin/users` - List semua pegawai
- `POST /api/admin/users` - Buat akun pegawai baru
- `PATCH /api/admin/users/:id` - Update profil/aktivasi user
- `DELETE /api/admin/users/:id` - Nonaktifkan/hapus user

**Branches (Admin):**
- `GET /api/admin/branches` - List semua cabang
- `POST /api/admin/branches` - Tambah cabang baru
- `PATCH /api/admin/branches/:id` - Update cabang
- `DELETE /api/admin/branches/:id` - Hapus cabang

### Validasi GPS (Haversine Formula)

```go
func validateGPS(userLat, userLng, branchLat, branchLng, radiusMeters float64) bool {
    const R = 6371e3 // Earth radius in meters
    dLat := toRadians(userLat - branchLat)
    dLng := toRadians(userLng - branchLng)
    a := math.Sin(dLat/2)*math.Sin(dLat/2) +
         math.Cos(toRadians(branchLat)) * math.Cos(toRadians(userLat)) *
         math.Sin(dLng/2)*math.Sin(dLng/2)
    c := 2 * math.Atan2(math.Sqrt(a), math.Sqrt(1-a))
    distance := R * c
    return distance <= radiusMeters
}
```

### Upload Foto (Direct to Cloudinary)

**Flow:**
1. Client request signed URL dari backend (`POST /api/upload/presign`)
2. Backend generate presigned URL Cloudinary (expiry 5 menit)
3. Client upload langsung ke Cloudinary R2
4. Client kirim URL foto ke endpoint check-in/out

**Validasi:**
- Max ukuran: 500KB setelah kompresi
- Format: JPEG quality 80%
- Resolusi: Max 800x600

### Check-In/Check-Out Rules

| Aturan | Deskripsi |
|--------|-----------|
| Foto wajib | Hanya untuk status hadir/pulang normal (sakit/izin tidak perlu) |
| GPS wajib | Untuk status hadir (kecuali role Office) |
| Double check-in | Reject dengan error "Anda sudah check-in, silakan check-out dulu" |
| Check-out tanpa check-in | Reject dengan error "Anda belum check-in hari ini" |
| Check-out lewat tengah malam | Boleh max sampai 23:59 hari berikutnya |
| Sick/Leave tanpa check-in | Boleh, hanya perlu keterangan |
| Branch assignment | Bebas, karyawan bisa check-in di cabang manapun |

### Authorization Rules

| Role | Akses |
|------|-------|
| employee | Check-in/out sendiri, lihat riwayat sendiri |
| admin | Full akses (monitoring, rekap, user management, branch management) |

### Edge Cases Handling

| Scenario | Handling |
|----------|----------|
| GPS disabled | Reject check-in/out untuk status hadir |
| Upload foto gagal | Reject check-in/out, tampilkan error spesifik |
| Lupa check-out | Admin dapat manual input check-out |
| Double check-in | Reject dengan error message yang jelas |
| Check-out tanpa check-in | Reject, arahkan ke admin untuk manual input |
| Koordinat di luar radius | Reject dengan info jarak aktual dari lokasi |
| Server down saat check-in | Cache data lokal, retry otomatis saat online |

### Security Considerations

1. **Password Hashing**: bcrypt dengan cost factor 12
2. **JWT Secret**: Environment variable, min 32 karakter
3. **Rate Limiting**: Max 5 request login/menit per IP
4. **CORS**: Hanya allow domain production
5. **Input Validation**: Sanitasi semua input untuk mencegah SQL injection
6. **HTTPS**: Wajib untuk production

### Deployment (Docker)

**Services:**
- `api` - Go backend API
- `web-employee` - Frontend employee app
- `web-admin` - Frontend admin app
- `postgres` - PostgreSQL database
- `nginx` - Reverse proxy

**Environment Variables (Backend):**
```
DATABASE_URL=postgres://user:pass@host:5432/dbname
JWT_SECRET=your-secret-key
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx
FRONTEND_EMPLOYEE_URL=https://absensi.domain.com
FRONTEND_ADMIN_URL=https://absensi-admin.domain.com
```

## Testing Decisions

### Backend Testing

**Unit Tests:**
- `haversine_test.go` - Validasi rumus Haversine dengan berbagai koordinat
- `jwt_test.go` - Token generation, validation, refresh, expiry
- `password_test.go` - Hash dan verify password
- `attendance_rules_test.go` - Validasi check-in/out logic (double check-in, GPS validation)

**Integration Tests:**
- `auth_integration_test.go` - Login, refresh token, logout flow
- `attendance_integration_test.go` - End-to-end check-in/out flow
- `admin_integration_test.go` - Admin monitoring dan rekap

**Test Coverage Target:** Minimal 80% untuk business logic

### Frontend Testing

**Unit Tests:**
- GPS validation utility (distance calculation)
- Form validation (required fields, format)
- Date/time utilities

**Component Tests:**
- Check-in form submission
- Check-out form submission
- Attendance history table rendering
- Admin dashboard filters

**E2E Tests (Playwright):**
- Employee check-in flow (dengan mock GPS)
- Employee check-out flow
- Admin monitoring dashboard
- Export Excel functionality

### Prior Art dalam Codebase

Belum ada testing pattern yang established di repo ini. Akan dibuatkan contoh test di folder `apps/absensi/src/__tests__/` dan `backend/internal/handler/__tests__/` sebagai referensi.

## Out of Scope

Berikut adalah fitur yang **tidak termasuk** dalam scope PRD ini:

1. **Shift Management** - Penjadwalan shift otomatis, assignment shift
2. **Overtime Approval Workflow** - Approval chain untuk lembur
3. **Leave Request Workflow** - Pengajuan cuti formal dengan approval
4. **Payroll Integration** - Integrasi dengan sistem payroll untuk perhitungan gaji
5. **Notification System** - Email/SMS notifikasi untuk reminder absensi
6. **Real-time Dashboard (WebSocket)** - Dashboard dengan live update via WebSocket (cukup manual refresh)
7. **Face Recognition** - Validasi foto dengan facial recognition (cukup visual verification oleh admin)
8. **Geofencing Advanced** - Multiple polygon geofencing (cukup circular radius)
9. **Mobile App Native** - Aplikasi mobile native (iOS/Android), cukup responsive web
10. **Biometric Integration** - Integrasi dengan fingerprint/face ID device
11. **QR Code Check-in** - Alternatif check-in dengan QR code

## Further Notes

### Koordinat Cabang

Koordinat exact untuk ketiga cabang akan diberikan kemudian:
- Apotek Mangu: `(latitude, longitude)` - TBD
- Apotek Colomadu: `(latitude, longitude)` - TBD
- Apotek Manahan: `(latitude, longitude)` - TBD

Untuk development dan testing, dapat menggunakan koordinat dummy dengan radius yang lebih besar (100-500m).

### Fase Pengembangan

**Fase 1 (MVP - 2-3 minggu):**
- Backend API (Go) dengan PostgreSQL
- Employee check-in/out dengan validasi GPS + foto
- Admin monitoring dasar (table view)
- Export Excel

**Fase 2 (Enhancement - 1-2 minggu):**
- Admin dashboard lengkap dengan filter dan rekap
- User management (CRUD pegawai)
- Branch management
- Riwayat absensi untuk employee

**Fase 3 (Optional - nanti):**
- Dashboard analytics (grafik, statistik)
- Advanced reporting
- Integration dengan sistem HR lainnya

### Dependencies Eksternal

| Service | Purpose | Alternatif |
|---------|---------|------------|
| PostgreSQL | Primary database | MySQL, MariaDB |
| Cloudinary R2 | Foto storage | AWS S3, Google Cloud Storage |
| VPS | Hosting | AWS EC2, DigitalOcean, GCP |
| Docker | Containerization | Manual install, Kubernetes (nanti) |

### Performance Targets

| Metric | Target |
|--------|--------|
| API response time (p95) | < 500ms |
| Check-in/out submission | < 3 detik (termasuk upload foto) |
| Dashboard load time | < 2 detik |
| Export Excel (1 bulan) | < 10 detik |
| Concurrent users support | 100+ concurrent |

### Monitoring & Logging

**Logging:**
- Structured logging dengan JSON format
- Log level: INFO (prod), DEBUG (dev)
- Log rotation harian

**Monitoring:**
- Health check endpoint: `/health`
- Metrics endpoint (Prometheus format): `/metrics`
- Error tracking: Sentry (optional nanti)

### Data Retention

- **Attendance records**: Dipertahankan selamanya untuk compliance
- **Photos**: 2 tahun, kemudian diarsipkan ke cold storage
- **Logs**: 90 hari di production, 1 tahun di archive
- **Inactive users**: Data tetap dipertahankan untuk audit trail
