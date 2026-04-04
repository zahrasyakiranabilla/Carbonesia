## Why

Sistem Apotek Asasi saat ini belum memiliki fitur manajemen karyawan. Admin perlu dapat melihat daftar karyawan, membuat akun perusahaan baru, mengedit informasi perusahaan, dan mengelola status aktif/nonaktif karyawan. Tanpa fitur ini, manajemen pengguna sistem tidak dapat dilakukan secara terpusat.

## What Changes

- Menambahkan halaman daftar karyawan yang dapat diakses oleh admin
- Menambahkan form untuk membuat akun karyawan baru (akun perusahaan)
- Menambahkan kemampuan untuk mengedit informasi data karyawan
- Menambahkan fitur mengaktifkan dan menonaktifkan akun karyawan
- Seluruh konten antarmuka menggunakan bahasa Indonesia

## Capabilities

### New Capabilities

- `employee-list`: Menampilkan daftar semua karyawan dengan informasi dasar (nama, email, status aktif)
- `employee-create`: Formulir untuk membuat akun karyawan baru dengan field nama, email, password. Peran otomatis di-set sebagai "employee"
- `employee-edit`: Formulir untuk mengedit informasi karyawan yang sudah ada (nama dan email saja, peran tidak dapat diubah)
- `employee-activate`: Fitur untuk mengaktifkan akun karyawan yang nonaktif
- `employee-deactivate`: Fitur untuk menonaktifkan akun karyawan (tanpa menghapus data)

### Modified Capabilities

- Tidak ada

## Impact

- Backend API: endpoint baru untuk CRUD karyawan (GET list, POST create, PUT update, PATCH activate/deactivate)
- Frontend dashboard: halaman baru untuk manajemen karyawan
- Database: kemungkinan perlu kolom tambahan di tabel users untuk status aktif/nonaktif
- Tidak ada breaking change pada fitur yang sudah ada
