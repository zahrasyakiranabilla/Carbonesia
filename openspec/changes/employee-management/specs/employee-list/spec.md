## ADDED Requirements

### Requirement: Generate Password Random
Sistem SHALL menyediakan tombol untuk menghasilkan password random saat membuat karyawan baru dan reset password.

#### Scenario: Admin membuat karyawan baru
- **WHEN** admin mengisi form tambah karyawan
- **THEN** sistem menampilkan tombol "Generate Password" di field password
- **AND** ketika diklik, sistem menghasilkan password random 16 karakter
- **AND** password ditampilkan di modal dialog
- **AND** admin diingatkan untuk menyimpan password sebelum menutup modal
- **AND** modal memiliki tombol "Salin Password" dan checkbox "Saya sudah menyimpan password"
- **AND** tombol "Simpan" di form hanya aktif setelah admin mencentang checkbox konfirmasi

#### Scenario: Admin mereset password karyawan
- **WHEN** admin klik reset password di daftar karyawan
- **THEN** sistem menampilkan modal dengan password baru yang di-generate
- **AND** admin diingatkan untuk menyimpan password baru
- **AND** modal memiliki tombol "Salin Password" dan checkbox "Saya sudah menyimpan password"

### Requirement: Daftar Karyawan
Sistem SHALL menampilkan daftar semua karyawan dengan informasi dasar untuk admin.

#### Scenario: Admin mengakses halaman daftar karyawan
- **WHEN** admin navigasi ke halaman manajemen karyawan
- **THEN** sistem menampilkan tabel dengan kolom: Nama, Email, Peran, Status, Aksi
- **AND** setiap baris menampilkan data karyawan yang sesuai

#### Scenario: Daftar karyawan kosong
- **WHEN** tidak ada karyawan dalam sistem
- **THEN** sistem menampilkan pesan "Belum ada karyawan"

#### Scenario: Daftar karyawan dengan banyak data (pagination)
- **WHEN** terdapat lebih dari 20 karyawan
- **THEN** sistem menampilkan navigasi pagination di bagian bawah tabel
- **AND** admin dapat memilih halaman lain

### Requirement: Pencarian Karyawan
Sistem SHALL memungkinkan admin mencari karyawan berdasarkan nama atau email.

#### Scenario: Admin mencari karyawan
- **WHEN** admin mengetik di kolom pencarian
- **THEN** sistem memfilter daftar karyawan yang cocok dengan keyword
- **AND** hasil pencarian ditampilkan secara real-time

### Requirement: Filter Berdasarkan Peran
Sistem SHALL memungkinkan admin menyaring karyawan berdasarkan peran.

#### Scenario: Admin filter berdasarkan peran
- **WHEN** admin memilih peran dari dropdown filter
- **THEN** sistem menampilkan hanya karyawan dengan peran yang dipilih

### Requirement: Menampilkan Status Aktif
Sistem SHALL menampilkan indikator status aktif/nonaktif setiap karyawan.

#### Scenario: Menampilkan status aktif
- **WHEN** karyawan dalam keadaan aktif
- **THEN** sistem menampilkan badge hijau dengan teks "Aktif"

#### Scenario: Menampilkan status nonaktif
- **WHEN** karyawan dalam keadaan nonaktif
- **THEN** sistem menampilkan badge merah dengan teks "Nonaktif"

### Requirement: API Response Format
Semua endpoint yang mengembalikan list SHALL menggunakan format paginated response.

#### Response Format
```json
{
  "success": true,
  "data": [...],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "total_pages": 5
  }
}
```

#### Scenario: Mendapatkan data dengan pagination
- **WHEN** client memanggil GET /api/v1/admin/users?page=1&limit=20
- **THEN** response mengembalikan object dengan field `data` dan `meta`
- **AND** `meta` berisi informasi pagination (page, limit, total, total_pages)