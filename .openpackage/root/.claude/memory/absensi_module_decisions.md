---
name: Absensi Module Technical Decisions
description: Keputusan teknis untuk modul Absensi - database, auth, validasi GPS, dan edge cases
type: project
---

## Modul Absensi - Keputusan Desain Teknis

### 1. Data Storage
- **Database**: PostgreSQL untuk semua data struktural
- **Foto**: Cloudinary R2 untuk penyimpanan foto selfie

### 2. Validasi GPS
- **Server-side validation** menggunakan Haversine formula
- **Radius toleransi**: 50 meter dari koordinat apotek
- **Koordinat exact**: Akan diberikan kemudian untuk Apotek Mangu, Colomadu, Manahan
- **Role Office**: Tidak divalidasi koordinatnya
- **Tidak ada grace period** untuk validasi GPS

### 3. Struktur Database

**Tabel `users`:**
- `id`, `email` (unique), `password_hash`, `name`, `role` (office/apoteker/staff/admin)
- `active` (boolean), `must_change_password` (boolean)
- `reset_token`, `reset_token_expiry` (untuk forgot password)
- `created_at`, `updated_at`

**Tabel `attendances`:**
- `id`, `user_id` (FK), `date`, `branch_id` (FK, nullable)
- `check_in_time`, `check_out_time`
- `check_in_photo_url`, `check_out_photo_url`
- `check_in_lat`, `check_in_lng`, `check_out_lat`, `check_out_lng`
- `status` (hadir/sakit/izin_keluarga/alpha/lembur/izin_pulang_cepat)
- `reason`, `overtime_reason`, `overtime_duration` (menit)
- `work_duration_minutes` (dihitung saat check-out)
- `created_at`, `updated_at`
- **Index**: `(user_id, date)`

**Tabel `branches`:**
- `id`, `name`, `address`, `latitude`, `longitude` (nullable untuk Office)
- `radius_meters` (default 50), `active`

**Tabel `refresh_tokens`:**
- Untuk menyimpan refresh token yang aktif (bisa di-revoke)

### 4. Authentication & Authorization
- **Login**: Email + password
- **Access token**: JWT, expiry 24 jam
- **Refresh token**: 30 hari, disimpan di database, di-rotate setiap refresh
- **Forgot password**: Via email dengan reset token (expiry 1 jam)
- **Default password**: Admin set password awal untuk karyawan baru
- **Role level**: 2 level saja - `employee` (office/apoteker/staff) dan `admin`
- **Middleware authorization** di setiap endpoint

### 5. Check-In/Check-Out Rules
- **Foto wajib**: Hanya untuk status hadir/pulang normal (sakit/izin tidak perlu foto)
- **GPS wajib**: Untuk status hadir (role office kecuali)
- **Tidak ada hard lock waktu**: Fleksibel, tidak ada grace period
- **Double check-in**: Reject, user harus check-out dulu
- **Check-out lewat tengah malam**: Boleh (max 23:59 hari berikutnya)
- **Overtime**: Optional field `overtime_reason` dan `overtime_duration`
- **Izin/Sakit**: Bisa submit tanpa check-in

### 6. Employee Assignment
- **Sistem bebas**: Karyawan bisa check-in di cabang manapun tanpa assignment dari admin
- `branch_id` di `attendances` untuk tracking di cabang mana karyawan bertugas

### 7. Dashboard Admin Features
- **Real-time monitoring**: Manual refresh (tidak perlu WebSocket/polling)
- **Table view**: Tidak perlu map view di fase awal
- **Tidak ada notifikasi real-time**
- **Export**: Excel (.xlsx) dengan filter per range tanggal
- **Admin bisa**: Lihat detail attendance per karyawan spesifik, manual input check-out untuk kasus lupa

### 8. Upload Foto
- **Direct upload** (Opsi A): Client upload langsung ke Cloudinary via signed URL
- **Max ukuran**: 500KB setelah kompresi
- **Format**: JPEG quality 80%
- **Resolusi**: Max 800x600

### 9. Edge Cases Handling
1. GPS disabled → Reject untuk status hadir
2. Upload foto gagal → Reject check-in/out
3. Lupa check-out → Admin bisa manual input
4. Double check-in → Reject dengan error message
5. Check-out lewat tengah malam → Boleh sampai max 23:59 hari berikutnya
