## ADDED Requirements

### Requirement: Nonaktifkan Karyawan
Sistem SHALL menonaktifkan akun karyawan tanpa menghapus data.

#### Scenario: Admin menonaktifkan karyawan
- **WHEN** admin klik tombol "Nonaktifkan" pada karyawan aktif
- **THEN** sistem menampilkan dialog konfirmasi "Yakin ingin menonaktifkan karyawan ini? Karyawan tidak akan dapat login."

#### Scenario: Konfirmasi nonaktifkan karyawan
- **WHEN** admin klik "Ya, Nonaktifkan"
- **THEN** sistem mengubah status karyawan menjadi nonaktif
- **AND** sistem menampilkan pesan sukses "Karyawan berhasil dinonaktifkan"
- **AND** badge status berubah menjadi merah "Nonaktif"

#### Scenario: Admin mencoba menonaktifkan dirinya sendiri
- **WHEN** admin klik tombol nonaktifkan pada akunnya sendiri
- **THEN** sistem menampilkan pesan error "Anda tidak dapat menonaktifkan akun sendiri"
- **AND** tombol nonaktifkan tidak tersedia

#### Scenario: Karyawan sudah nonaktif
- **WHEN** admin klik tombol nonaktifkan pada karyawan yang sudah nonaktif
- **THEN** sistem tidak menampilkan tombol nonaktifkan (atau disabled)

#### Scenario: Nonaktifkan gagal
- **WHEN** sistem gagal menonaktifkan karyawan karena error
- **THEN** sistem menampilkan pesan error "Gagal menonaktifkan karyawan"
- **AND** status tidak berubah