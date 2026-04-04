## ADDED Requirements

### Requirement: Formulir Edit Karyawan

Sistem SHALL menampilkan formulir untuk mengedit informasi karyawan yang sudah ada.

#### Scenario: Admin membuka halaman edit karyawan

- **WHEN** admin klik tombol edit pada baris karyawan
- **THEN** sistem menampilkan formulir dengan data karyawan yang terisi
- **AND** field password dikosongkan (tidak ditampilkan)

#### Scenario: Load data karyawan gagal

- **WHEN** sistem tidak dapat mengambil data karyawan
- **THEN** sistem menampilkan pesan error "Gagal memuat data karyawan"

### Requirement: Update Data Karyawan

Sistem SHALL memperbarui informasi karyawan yang dipilih.

#### Scenario: Berhasil update nama

- **WHEN** admin mengubah nama dan menyimpan
- **THEN** sistem memperbarui nama di database
- **AND** sistem menampilkan pesan sukses "Data karyawan diperbarui"

#### Scenario: Berhasil update email

- **WHEN** admin mengubah email (belum terdaftar) dan menyimpan
- **THEN** sistem memperbarui email di database
- **AND** sistem menampilkan pesan sukses

#### Scenario: Email sudah digunakan

- **WHEN** admin menginput email yang sudah digunakan karyawan lain
- **THEN** sistem menampilkan pesan "Email sudah digunakan"

#### Scenario: Peran tidak dapat diubah

- **WHEN** admin edit data karyawan
- **THEN** sistem tidak menampilkan field peran
- **AND** peran karyawan tetap "employee" (tidak dapat diubah)

### Requirement: Reset Password

Sistem SHALL memungkinkan admin mereset password karyawan.

#### Scenario: Reset password karyawan

- **WHEN** admin klik tombol "Reset Password"
- **THEN** sistem menampilkan dialog konfirmasi
- **AND** jika dikonfirmasi, sistem generate password baru
- **AND** sistem menampilkan password baru kepada admin
