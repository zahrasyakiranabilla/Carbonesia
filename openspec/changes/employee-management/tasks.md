## 1. Backend - User Repository Extensions

- [x] 1.1 Tambahkan method `List(ctx, page, limit, filter)` di `apps/api/internal/features/user/repository.go`
- [x] 1.2 Tambahkan method `Update(ctx, user)` untuk update data user
- [x] 1.3 Tambahkan method `SetActive(ctx, userID, active)` untuk mengaktifkan/nonaktifkan user
- [x] 1.4 Tambahkan method `GetAll(ctx)` untuk mengambil semua user tanpa filter

## 2. Backend - User Service

- [x] 2.1 Buat method `ListUsers(ctx, page, limit, role, search)` di service layer
- [x] 2.2 Buat method `CreateUser(ctx, CreateUserRequest)` dengan validasi email unik
- [x] 2.3 Buat method `UpdateUser(ctx, userID, UpdateUserRequest)` untuk update data
- [x] 2.4 Buat method `ActivateUser(ctx, userID)` dengan validasi tidak boleh activate diri sendiri
- [x] 2.5 Buat method `DeactivateUser(ctx, userID)` dengan validasi tidak boleh deactivate diri sendiri
- [x] 2.6 Buat method `ResetPassword(ctx, userID)` untuk generate password baru

## 3. Backend - User Handler & Routes

- [x] 3.1 Buat handler baru di `apps/api/internal/features/user/handler.go` untuk CRUD operations
- [x] 3.2 Buat request/response DTOs untuk employee management
- [x] 3.3 Register route `GET /api/v1/admin/users` untuk list users (admin only)
- [x] 3.4 Register route `POST /api/v1/admin/users` untuk create user (admin only)
- [x] 3.5 Register route `PUT /api/v1/admin/users/:id` untuk update user (admin only)
- [x] 3.6 Register route `PATCH /api/v1/admin/users/:id/activate` untuk activate (admin only)
- [x] 3.7 Register route `PATCH /api/v1/admin/users/:id/deactivate` untuk deactivate (admin only)
- [x] 3.8 Register route `POST /api/v1/admin/users/:id/reset-password` untuk reset password (admin only)
- [x] 3.9 Pastikan semua route menggunakan middleware RequireAuth dan RequireRole("admin")

## 4. Frontend - API Layer

- [ ] 4.1 Buat direktori `apps/dashboard/src/features/employee/` (api/, components/, hooks/, types/)
- [ ] 4.2 Buat TypeScript types untuk Employee, CreateEmployeeRequest, UpdateEmployeeRequest
- [ ] 4.3 Buat employee API client di `api/employee-api.ts` dengan method:
  - `getEmployees(params)` - list dengan pagination dan filter
  - `createEmployee(data)` - buat karyawan baru
  - `updateEmployee(id, data)` - update karyawan
  - `activateEmployee(id)` - aktifkan karyawan
  - `deactivateEmployee(id)` - nonaktifkan karyawan
  - `resetPassword(id)` - reset password
- [ ] 4.4 Buat helper function `generatePassword(length)` untuk generate password random 16 karakter

## 5. Frontend - UI Components

- [ ] 5.1 Buat komponen `GeneratePasswordDialog.tsx` - modal dialog untuk menampilkan password yang di-generate dengan:
  - Tampilan password yang di-generate
  - Tombol "Salin Password"
  - Checkbox "Saya sudah menyimpan password"
  - Pesan peringatan untuk menyimpan password
- [ ] 5.2 Buat komponen `PasswordInput.tsx` - input field password dengan tombol "Generate" di sampingnya

## 6. Frontend - Auth Context

- [ ] 6.1 extend User type di auth types untuk menyertakan role check "admin"

## 7. Frontend - Components

- [ ] 7.1 Buat komponen `EmployeeList.tsx` - tabel dengan Kolom Nama, Email, Peran, Status, Aksi
- [ ] 7.2 Buat komponen `EmployeeFilters.tsx` - search input dan role filter dropdown
- [ ] 7.3 Buat komponen `EmployeeForm.tsx` - form untuk create/edit dengan validasi dan password generator
- [ ] 7.4 Buat komponen `ActivateDialog.tsx` - dialog konfirmasi activate
- [ ] 7.5 Buat komponen `DeactivateDialog.tsx` - dialog konfirmasi deactivate
- [ ] 7.6 Buat komponen `ResetPasswordDialog.tsx` - dialog reset password dengan password yang di-generate dan konfirmasi penyimpanan

## 8. Frontend - Hooks

- [ ] 8.1 Buat `useEmployees(params)` hook dengan TanStack Query
- [ ] 8.2 Buat `useCreateEmployee()` hook
- [ ] 8.3 Buat `useUpdateEmployee()` hook
- [ ] 8.4 Buat `useActivateEmployee()` hook
- [ ] 8.5 Buat `useDeactivateEmployee()` hook
- [ ] 8.6 Buat `useResetPassword()` hook
- [ ] 8.7 Buat `useGeneratePassword()` hook untuk generate password random

## 9. Frontend - Routes

- [ ] 9.1 Buat route `apps/dashboard/src/routes/employees/index.tsx` - halaman list karyawan
- [ ] 9.2 Buat route `apps/dashboard/src/routes/employees/create/index.tsx` - halaman buat karyawan dengan password generator
- [ ] 9.3 Buat route `apps/dashboard/src/routes/employees/:id/edit/index.tsx` - halaman edit karyawan
- [ ] 9.4 Tambahkan menu sidebar "Karyawan" yang menuju ke halaman list
- [ ] 9.5 Protect routes dengan role admin check

## 10. Testing

- [ ] 10.1 Test API: list users dengan pagination
- [ ] 10.2 Test API: create user dengan validasi
- [ ] 10.3 Test API: update user
- [ ] 10.4 Test API: activate user
- [ ] 10.5 Test API: deactivate user (tidak bisa deactivate diri sendiri)
- [ ] 10.6 Test frontend: halaman list karyawan
- [ ] 10.7 Test frontend: form create employee dengan password generator
- [ ] 10.8 Test frontend: dialog generate password (copy button, checkbox konfirmasi)
- [ ] 10.9 Test frontend: form edit employee
- [ ] 10.10 Test frontend: dialog activate/deactivate
- [ ] 10.11 Test frontend: reset password dengan modal konfirmasi
- [ ] 10.12 Test frontend: unauthorized user tidak bisa akses halaman karyawan