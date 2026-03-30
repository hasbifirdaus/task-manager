[![Live Demo](https://img.shields.io/badge/demo-online-brightgreen)](https://task-manager-two-drab-16.vercel.app/)

**Live URL:** [https://task-manager-two-drab-16.vercel.app/](https://task-manager-two-drab-16.vercel.app/)

# Task Manager API & Frontend

Proyek ini adalah aplikasi **Task Manager** sederhana yang dibangun menggunakan **Next.js** sebagai Fullstack framework. Aplikasi ini memungkinkan pengguna untuk melakukan registrasi, login, dan mengelola daftar tugas (CRUD) dengan sistem autentikasi dan relasi database one-to-many antara User dan Task.

## 🚀 Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Database ORM:** Prisma
- **Validation:** Zod
- **Styling:** Tailwind CSS
- **Authentication:** JSON Web Token (JWT) & bcrypt-ts
- **Icons:** Lucide React & React Icons
- **Form Handling:** React Hook Form with Resolver

## 🛠️ Fitur Utama

- **Manajemen User:** Registrasi, Login, Autentikasi JWT, Update Profil, dan Soft/Hard Delete User.
- **CRUD Tasks:** Membuat, membaca, memperbarui, dan menghapus tugas yang terelasi dengan user tertentu.
- **Fitur Tambahan:**
  - **Filter User Tasks:** Mengambil data tugas spesifik milik user yang sedang login.
  - **Validasi Input:** Menggunakan Zod untuk memastikan data input sesuai skema (front-end).

## ✅ Progress Requirements (Frontend)

- ✅ Form Login/Register (Validation included)
- ✅ Dashboard Task List
- ✅ Form Create/Edit Task
- ✅ Fitur Interaksi

## 📦 Instalasi & Persiapan

### 1. Clone Repository

```bash
git clone [https://github.com/hasbifirdaus/task-manager.git]
cd task-manager
```

### 2. Install Dependensi

```bash
npm install
```

### 3. Konfigurasi Environment Variables

```bash
cp .env.example .env
```

(atau kamu bisa salin konfigurasi di bawah ini dan isi dengan milik kamu)

```text
# DATABASE CONFIGURATION (PostgreSQL / Neon / Vercel Postgres)
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require"

# Migrasi Prisma (Direct Connection)
DATABASE_URL_UNPOOLED="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require"

# AUTHENTICATION
JWT_SECRET="your_super_secret_random_string_here"

# APPLICATION SETTINGS
NEXT_PUBLIC_APP_URL="http://localhost:3000"

```

### 4. Setup Database (Prisma)

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Jalankan Aplikasi

```bash
npm run dev
```

📑 Dokumentasi API

#### User Endpoints

| Method | Endpoint         | Deskripsi                   |
| :----- | :--------------- | :-------------------------- |
| POST   | /api/users       | Register user baru          |
| POST   | /api/users/login | Login user & dapatkan token |
| GET    | /api/users       | Ambil data semua user       |
| GET    | /api/users/:id   | Ambil detail user by ID     |
| PUT    | /api/users/:id   | Update data user            |
| DELETE | /api/users/:id/  | Hapus user                  |

#### Task Endpoints

| Method | Endpoint             | Deskripsi                     | Auth Required |
| :----- | :------------------- | :---------------------------- | ------------- |
| POST   | /api/tasks           | Membuat task baru             | ✅ Yes        |
| GET    | /api/tasks           | List semua task               | ❌ No         |
| GET    | /api/tasks/my-tasks  | List task milik user login    | ✅ Yes        |
| GET    | /api/tasks/:id       | Detail task by ID             | ❌ No         |
| PUT    | /api/tasks/:id       | Update task                   | ✅ Yes        |
| DELETE | /api/tasks/:id       | Hapus task                    | ✅ Yes        |
| GET    | /api/users/:id/tasks | Get tasks berdasarkan User ID | ❌ No         |

📝 Contoh Request & Response

1. Register User

   Endpoint: POST /api/users

   Request Body:

   ```json
   {
     "name": "Julian",
     "email": "julian@gmail.com",
     "password": "password123"
   }
   ```

   Response:

   ```text
   Status: 200 OK
   ```

   ```json
   {
     "message": "User Created",
     "user": {
       "id": "00f1f4c9-4c30-4cc6-9dca-e57ac331cdcf",
       "name": "julian",
       "email": "julian@gmail.com",
       "image": null,
       "isDeleted": false,
       "deletedAt": null,
       "createdAt": "2026-03-29T23:58:21.887Z",
       "updatedAt": "2026-03-29T23:58:21.887Z"
     }
   }
   ```

   Response Error:
   1. Email sudah terdaftar (conflict)

      Request Body:

      ```json
      {
        "name": "julian",
        "email": "julian@gmail.com",
        "password": "password123"
      }
      ```

      Response:

      ```text
      Status: 409 Conflict
      ```

      ```json
      {
        "message": "Email already exists"
      }
      ```

   2. Validasi gagal

      Request Body:

      ```json
      {
        "name": "",
        "email": "julian@gmail.com",
        "password": "password123"
      }
      ```

      Response:

      ```text
      Status: 400 Bad Request
      ```

      ```json
      {
        "message": "name is required"
      }
      ```

2. Create Task

   Endpoint: POST /api/tasks

   Request Body:

   ```json
   {
     "title": "Mengerjakan Laporan Tahunan",
     "description": "Menyelesaikan laporan hasil rapat tahunan"
   }
   ```

   Response:

   ```text
   Status: 201 Created
   ```

   ```json
   {
     "id": 7,
     "title": "Mengerjakan Laporan Tahunan",
     "description": "Menyelesaikan laporan hasil rapat tahunan",
     "completed": false,
     "isDeleted": false,
     "deletedAt": null,
     "userId": "91efa9b2-6a70-4396-8d48-7f0ca4d74399",
     "createdAt": "2026-03-30T00:16:32.170Z",
     "updatedAt": "2026-03-30T00:16:32.170Z"
   }
   ```

   Response Error:

   Request Body:

   ```json
   {
     "title": "",
     "description": "Menyelesaikan laporan hasil rapat tahunan"
   }
   ```

   Response:

   ```text
   Status: 400 Bad Request
   ```

   ```json
   {
     "message": "Title is required and cannot be empty"
   }
   ```

3. GET Task by id

   Endpoint: GET /api/tasks/[id]

   Response:

   ```text
   Status: 200 OK
   ```

   ```json
   {
     "id": 9,
     "title": "Mengerjakan Laporan Harian",
     "description": "Menyelesaikan laporan harian",
     "completed": false,
     "isDeleted": false,
     "deletedAt": null,
     "userId": "00f1f4c9-4c30-4cc6-9dca-e57ac331cdcf",
     "createdAt": "2026-03-30T01:08:13.793Z",
     "updatedAt": "2026-03-30T01:08:13.793Z"
   }
   ```

   Response Error:

   ```text
   Status: 401 Unauthorized
   ```

   ```json
   {
     "message": "Unauthorized"
   }
   ```

🖥️ Tampilan Frontend
Interface mencakup:

- Halaman Login/Register: Form input dengan validasi.
- Dashboard: Menampilkan list task user, status completion, dan tombol logout.
- Form Task: Modal/Halaman untuk tambah dan edit task dengan checkbox status.

📁 Struktur Folder Utama

```text
src
┗ app
┃ ┣ (auth)
┃ ┃ ┣ login
┃ ┃ ┃ ┗ page.tsx
┃ ┃ ┗ register
┃ ┃ ┃ ┗ page.tsx
┃ ┣ api
┃ ┃ ┣ tasks
┃ ┃ ┃ ┣ my-tasks
┃ ┃ ┃ ┃ ┗ route.ts
┃ ┃ ┃ ┣ [id]
┃ ┃ ┃ ┃ ┣ hard-delete
┃ ┃ ┃ ┃ ┃ ┗ route.ts
┃ ┃ ┃ ┃ ┣ restore
┃ ┃ ┃ ┃ ┃ ┗ route.ts
┃ ┃ ┃ ┃ ┗ route.ts
┃ ┃ ┃ ┗ route.ts
┃ ┃ ┗ users
┃ ┃ ┃ ┣ login
┃ ┃ ┃ ┃ ┗ route.ts
┃ ┃ ┃ ┣ logout
┃ ┃ ┃ ┃ ┗ route.ts
┃ ┃ ┃ ┣ [id]
┃ ┃ ┃ ┃ ┣ hard-delete
┃ ┃ ┃ ┃ ┃ ┗ route.ts
┃ ┃ ┃ ┃ ┣ restore
┃ ┃ ┃ ┃ ┃ ┗ route.ts
┃ ┃ ┃ ┃ ┣ tasks
┃ ┃ ┃ ┃ ┃ ┗ route.ts
┃ ┃ ┃ ┃ ┗ route.ts
┃ ┃ ┃ ┗ route.ts
┃ ┣ dashboard
┃ ┃ ┗ page.tsx
┃ ┣ users
┃ ┃ ┣ [id]
┃ ┃ ┃ ┗ page.tsx
┃ ┃ ┗ page.tsx
┃ ┣ favicon.ico
┃ ┣ globals.css
┃ ┣ layout.tsx
┃ ┗ page.tsx

```
