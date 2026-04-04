## ADDED Requirements

### Requirement: Formulir Buat Karyawan

Sistem SHALL menampilkan formulir untuk membuat akun karyawan baru.

#### Scenario: Admin membuka halaman buat karyawan

- **WHEN** admin klik tombol "Tambah Karyawan"
- **THEN** sistem menampilkan formulir dengan field: Nama, Email, Password, Konfirmasi Password
- **AND** peran karyawan otomatis di-set sebagai "employee"

#### Scenario: Validasi field kosong

- **WHEN** admin mengirim formulir dengan field kosong
- **THEN** sistem menampilkan pesan error pada field yang kosong
- **AND** formulir tidak dikirim

#### Scenario: Validasi format email

- **WHEN** admin menginput email tidak valid
- **THEN** sistem menampilkan pesan "Email tidak valid"

#### Scenario: Validasi password cocok

- **WHEN** password dan konfirmasi password tidak sama
- **THEN** sistem menampilkan pesan "Password tidak cocok"

#### Scenario: Validasi panjang password

- **WHEN** password kurang dari 8 karakter
- **THEN** sistem menampilkan pesan "Password minimal 8 karakter"

#### Scenario: Email sudah terdaftar

- **WHEN** admin menginput email yang sudah terdaftar
- **THEN** sistem menampilkan pesan "Email sudah terdaftar"

### Requirement: Sukses Membuat Karyawan

Sistem SHALL membuat akun karyawan dan menampilkan konfirmasi berhasil.

#### Scenario: Berhasil membuat karyawan

- **WHEN** admin mengirim formulir dengan data valid
- **THEN** sistem membuat akun karyawan baru di database
- **AND** sistem menampilkan pesan sukses "Karyawan berhasil ditambahkan"
- **AND** admin diarahkan kembali ke daftar karyawan

### Requirement: Loading State

Sistem SHALL menampilkan indikator loading saat formulir sedang diproses.

#### Scenario: Mengirim formulir

- **WHEN** admin klik tombol "Simpan"
- **THEN** sistem menonaktifkan tombol submit
- **AND** sistem menampilkan indikator loading
