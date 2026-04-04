## Context

Sistem Apotek Asasi saat ini memiliki:

- Backend API Go dengan struktur fitur modular (auth, user, branch)
- Model User yang sudah memiliki field `Active` untuk status aktif/nonaktif
- Frontend dashboard dengan arsitektur TanStack Router dan feature-based organization
- Sistem auth dengan token JWT

Fitur manajemen karyawan perlu ditambahkan untuk memungkinkan admin mengelola akun pengguna sistem.

## Goals / Non-Goals

**Goals:**

- Menambahkan endpoint API untuk CRUD karyawan (list, create, update, activate, deactivate)
- Menambahkan halaman frontend untuk manajemen karyawan di dashboard admin
- Seluruh konten menggunakan bahasa Indonesia
- Mengikuti arsitektur yang sudah ada (feature-based, TanStack Router)

**Non-Goals:**

- Multiple roles (apoteker, cashier, etc.) - hanya menggunakan role "employee"
- Mengubah sistem autentikasi yang sudah ada
- Fitur import/export data karyawan
- Riwayat perubahan status karyawan (audit log)

## Decisions

### 1. Struktur API

**Decision:** Menggunakan endpoint baru di `/api/v1/users` dengan prefix admin

**Alternatives considered:**

- Menambah endpoint di `/api/v1/employees` - tidak konsisten dengan naming yang sudah ada
- Memakai route yang sama dengan auth - terlalu banyak tanggung jawab di satu tempat

**Rationale:** Struktur `features/user` sudah ada di backend, lebih baik memperluas daripada membuat baru.

### 2. Metode Activate/Deactivate

**Decision:** Menggunakan PATCH endpoint dengan payload `{ "active": true/false }`

**Alternatives considered:**

- DELETE endpoint - tidak tepat karena data tidak dihapus
- POST endpoint terpisah untuk activate/deactivate - terlalu banyak endpoint

**Rationale:** PATCH sesuai dengan semantik REST untuk update parsial.

### 3. List Karyawan dengan Pagination

**Decision:** Implementasi server-side pagination dengan parameter `page` dan `limit`

**Alternatives considered:**

- Load all - tidak scalable untuk banyak user
- Cursor-based pagination - lebih kompleks di implementasi

**Rationale:** Offset-based pagination lebih sederhana dan sudah lazim digunakan.

### 4. Fitur "Edit Company"

**Decision:** Menambahkan field `branch_id` di user model untuk mengaitkan karyawan dengan cabang

**Alternatives considered:**

- Tabel terpisah untuk company info - terlalu kompleks untuk fase awal
- Hardcode - tidak fleksibel

**Rationale:** Hubungan user-branch sudah ada di model, perlu memanfaatkan.

### 5. Paginated Response Helper

**Decision:** Menggunakan format response `{ data: [...], meta: {...} }` untuk semua list endpoint

**Response Structure:**

```go
type PaginatedResponse struct {
    Data interface{}     `json:"data"`
    Meta *PaginationMeta `json:"meta"`
}

type PaginationMeta struct {
    Page       int `json:"page"`
    Limit      int `json:"limit"`
    Total      int `json:"total"`
    TotalPages int `json:"total_pages"`
}
```

**Alternatives considered:**

- Flat structure dengan fields langsung di response - tidak konsisten
- Menggunakan array langsung - tidak ada metadata

**Rationale:** Format `data` + `meta` lebih konsisten dan memungkinkan frontend easily handle pagination.

## Risks / Trade-offs

- [Risk] Admin bisa menonaktifkan akun dirinya sendiri → Mitigation: Validasi di backend, tidak izinkan deactivate jika userID sama dengan yang melakukan request
- [Risk] Password plain text di response → Mitigation: Password tidak pernah di-expose, hanya hash di backend
- [Risk] Perubahan breaking di user repository → Mitigation: Menambahkan method baru, tidak mengubah method yang sudah ada

## Migration Plan

1. Backend: Tambahkan method baru di user repository (List, Update, SetActive)
2. Backend: Buat service layer untuk logika bisnis
3. Backend: Buat handler dengan endpoint baru
4. Backend: Daftarkan route di server
5. Frontend: Buat feature `employee` dengan api, hooks, types, components
6. Frontend: Buat halaman list dan form di routes
7. Test: Manual testing semua flow

## Open Questions

- Apakah perlu filter by role di list karyawan?
- Berapa default pagination limit? (disarankan 20)
- Apakah perlu search by name/email di list?
