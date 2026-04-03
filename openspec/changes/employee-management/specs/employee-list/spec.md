## ADDED Requirements

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