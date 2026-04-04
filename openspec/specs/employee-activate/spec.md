## ADDED Requirements

### Requirement: Aktifkan Karyawan
Sistem SHALL mengaktifkan akun karyawan yang sebelumnya nonaktif.

#### Scenario: Admin mengaktifkan karyawan
- **WHEN** admin klik tombol "Aktifkan" pada karyawan nonaktif
- **THEN** sistem menampilkan dialog konfirmasi "Yakin ingin mengaktifkan karyawan ini?"

#### Scenario: Konfirmasi aktifkan karyawan
- **WHEN** admin klik "Ya, Aktifkan"
- **THEN** sistem mengubah status karyawan menjadi aktif
- **AND** sistem menampilkan pesan sukses "Karyawan berhasil diaktifkan"
- **AND** badge status berubah menjadi hijau "Aktif"

#### Scenario: Karyawan sudah aktif
- **WHEN** admin klik tombol aktifkan pada karyawan yang sudah aktif
- **THEN** sistem tidak menampilkan tombol aktifkan (atau disabled)

#### Scenario: Aktifkan gagal
- **WHEN** sistem gagal mengaktifkan karyawan karena error
- **THEN** sistem menampilkan pesan error "Gagal mengaktifkan karyawan"
- **AND** status tidak berubah