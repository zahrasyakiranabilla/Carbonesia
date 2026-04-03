## 1. Backend - User Repository Extensions

- [ ] 1.1 Tambahkan method `List(ctx, page, limit, filter)` di `apps/api/internal/features/user/repository.go`
- [ ] 1.2 Tambahkan method `Update(ctx, user)` untuk update data user
- [ ] 1.3 Tambahkan method `SetActive(ctx, userID, active)` untuk mengaktifkan/nonaktifkan user
- [ ] 1.4 Tambahkan method `GetAll(ctx)` untuk mengambil semua user tanpa filter

## 2. Backend - User Service

- [ ] 2.1 Buat method `ListUsers(ctx, page, limit, role, search)` di service layer
- [ ] 2.2 Buat method `CreateUser(ctx, CreateUserRequest)` dengan validasi email unik
- [ ] 2.3 Buat method `UpdateUser(ctx, userID, UpdateUserRequest)` untuk update data
- [ ] 2.4 Buat method `ActivateUser(ctx, userID)` dengan validasi tidak boleh activate diri sendiri
- [ ] 2.5 Buat method `DeactivateUser(ctx, userID)` dengan validasi tidak boleh deactivate diri sendiri
- [ ] 2.6 Buat method `ResetPassword(ctx, userID)` untuk generate password baru

## 3. Backend - User Handler & Routes

- [ ] 3.1 Buat handler baru di `apps/api/internal/features/user/handler.go` untuk CRUD operations
- [ ] 3.2 Buat request/response DTOs untuk employee management
- [ ] 3.3 Register route `GET /api/v1/admin/users` untuk list users (admin only)
- [ ] 3.4 Register route `POST /api/v1/admin/users` untuk create user (admin only)
- [ ] 3.5 Register route `PUT /api/v1/admin/users/:id` untuk update user (admin only)
- [ ] 3.6 Register route `PATCH /api/v1/admin/users/:id/activate` untuk activate (admin only)
- [ ] 3.7 Register route `PATCH /api/v1/admin/users/:id/deactivate` untuk deactivate (admin only)
- [ ] 3.8 Register route `POST /api/v1/admin/users/:id/reset-password` untuk reset password (admin only)
- [ ] 3.9 Pastikan semua route menggunakan middleware RequireAuth dan RequireRole("admin")

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

## 5. Frontend - Auth Context

- [ ] 5.1 extend User type di auth types untuk menyertakan role check "admin"

## 6. Frontend - Components

- [ ] 6.1 Buat komponen `EmployeeList.tsx` - tabel dengan Kolom Nama, Email, Peran, Status, Aksi
- [ ] 6.2 Buat komponen `EmployeeFilters.tsx` - search input dan role filter dropdown
- [ ] 6.3 Buat komponen `EmployeeForm.tsx` - form untuk create/edit dengan validasi
- [ ] 6.4 Buat komponen `ActivateDialog.tsx` - dialog konfirmasi activate
- [ ] 6.5 Buat komponen `DeactivateDialog.tsx` - dialog konfirmasi deactivate
- [ ] 6.6 Buat komponen `ResetPasswordDialog.tsx` - dialog reset password dengan password baru

## 7. Frontend - Hooks

- [ ] 7.1 Buat `useEmployees(params)` hook dengan TanStack Query
- [ ] 7.2 Buat `useCreateEmployee()` hook
- [ ] 7.3 Buat `useUpdateEmployee()` hook
- [ ] 7.4 Buat `useActivateEmployee()` hook
- [ ] 7.5 Buat `useDeactivateEmployee()` hook
- [ ] 7.6 Buat `useResetPassword()` hook

## 8. Frontend - Routes

- [ ] 8.1 Buat route `apps/dashboard/src/routes/employees/index.tsx` - halaman list karyawan
- [ ] 8.2 Buat route `apps/dashboard/src/routes/employees/create/index.tsx` - halaman buat karyawan
- [ ] 8.3 Buat route `apps/dashboard/src/routes/employees/:id/edit/index.tsx` - halaman edit karyawan
- [ ] 8.4 Tambahkan menu sidebar "Karyawan" yang menuju ke halaman list
- [ ] 8.5 Protect routes dengan role admin check

## 9. Testing

- [ ] 9.1 Test API: list users dengan pagination
- [ ] 9.2 Test API: create user dengan validasi
- [ ] 9.3 Test API: update user
- [ ] 9.4 Test API: activate user
- [ ] 9.5 Test API: deactivate user (tidak bisa deactivate diri sendiri)
- [ ] 9.6 Test frontend: halaman list karyawan
- [ ] 9.7 Test frontend: form create employee dengan validasi
- [ ] 9.8 Test frontend: form edit employee
- [ ] 9.9 Test frontend: dialog activate/deactivate
- [ ] 9.10 Test frontend: unauthorized user tidak bisa akses halaman karyawan