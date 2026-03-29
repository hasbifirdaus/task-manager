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

## 📦 Instalasi & Persiapan

### 1. Clone Repository

```bash
git clone [https://github.com/hasbifirdaus/task-manager.git](https://github.com/username/task-manager.git)
cd task-manager
```

### 2. Install Dependensi

npm install

3. Konfigurasi Environment Variables

### 4. Setup Database (Prisma)

npx prisma migrate dev --name init
npx prisma generate

### 5. Jalankan Aplikasi

npm run dev

Aplikasi akan berjalan di http://localhost:3000.

📑 Dokumentasi API

#### User Endpoints

Method,Endpoint,Deskripsi
POST,/api/users,Registrasi user baru
POST,/api/users/login,Login user & dapatkan token
GET,/api/users,List semua user
GET,/api/users/:id,Ambil detail user by ID
PUT,/api/users/:id,Update data user
DELETE,/api/users/:id,Soft delete user
DELETE,/api/users/:id/hard-delete,Hapus permanen user
PATCH,/api/users/:id/restore,Mengembalikan user yang di-soft delete

#### Task Endpoints

Method,Endpoint,Deskripsi,Auth Required
POST,/api/tasks,Membuat task baru,✅ Yes
GET,/api/tasks,List semua task,❌ No
GET,/api/tasks/my-tasks,List task milik user login,✅ Yes
GET,/api/tasks/:id,Detail task by ID,❌ No
PUT,/api/tasks/:id,Update task,✅ Yes
DELETE,/api/tasks/:id,Hapus task,✅ Yes
GET,/api/users/:id/tasks,Get tasks berdasarkan User ID,❌ No

📝 Contoh Request & Response

#### Register User

##### POST /api/users

// Request Body
{
"name": "Julian",
"email": "julian@gmail.com",
"password": "password123"
}

##### Create Task

// Request Body
{
"title": "Mengerjakan Laporan Tahunan",
"description": "Menyelesaikan laporan hasil rapat tahunan"
}

🖥️ Tampilan Frontend
Interface mencakup:

- Halaman Login/Register: Form input dengan validasi.
- Dashboard: Menampilkan list task user, status completion, dan tombol logout.
- Form Task: Modal/Halaman untuk tambah dan edit task dengan checkbox status.

📁 Struktur Folder Utama

- /app/api: Route handlers untuk backend API.
- /app/dashboard: Halaman utama setelah login.
- /prisma: Skema database dan konfigurasi ORM.
