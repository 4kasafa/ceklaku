Baca seluruh codebase project ini secara menyeluruh, termasuk file FRONTEND_QUICKSTART.md dan example/data.json. Pahami struktur API, format response, serta mekanisme autentikasi yang digunakan.

Saya ingin dibuatkan sebuah webapp menggunakan:

React (sudah terinstall)

TailwindCSS (sudah terinstall)

Gunakan API yang dijelaskan pada FRONTEND_QUICKSTART.md dengan implementasi yang benar dan clean.

🎯 Alur Autentikasi

Saat aplikasi pertama kali dibuka:

Cek apakah terdapat token di localStorage.

Jika token tidak ada:

Tampilkan halaman login dalam bentuk floating card.

Setelah login berhasil:

Simpan token ke localStorage

Langsung request endpoint /dashboard

Tampilkan data dashboard

Jika token ada:

Lakukan request ke /dashboard menggunakan token

Jika request gagal (401 atau invalid token):

Hapus token dari localStorage

Redirect ke login

Jika berhasil:

Tampilkan data dashboard

🎨 Konsep UI

Desain seperti end score / end screen game:

Background fullscreen

Di tengah ada floating card

Card menjadi fokus utama

Style modern, clean, slightly cartoonish

Responsive dan terlihat bagus di mobile

🧩 Struktur Layout Card
Header Card

Pojok kiri atas: tombol Settings

Pojok kanan atas: tombol About

Tengah atas:

Judul besar: CEK LAKU

Subtitle kecil: versi hp

Main Score Section (Highlight Area)

Tampilkan:

Status (lebih / kurang / pas)

Data selisih sebagai main score (paling besar dan mencolok)

Dual Info Section

Tampilkan berdampingan:

KOMPUTER
(label kecil, angka besar di bawahnya)

UANG FISIK
(label kecil, angka besar di bawahnya)

Detail Section

Ambil struktur data mengikuti example/data.json:

Tanggal

Nama kasir

Pengeluaran

Dan field lainnya sesuai file example

Navigation Section

Di bagian bawah card:

<     1/6     >


Navigasi antar session data

Footer Website

Paling bawah halaman:

© Copyright by Kasafa

🧠 Technical Requirements

Gunakan struktur kode modular

Pisahkan:

services/api.js

hooks (misal useAuth)

components (LoginCard, DashboardCard, ScoreSection, dll)

Clean code

Mudah dikembangkan

Hindari logic bercampur di satu file

Gunakan functional component + hooks

Jangan hardcode data

🎨 Styling Requirements

Modern

Sedikit cartoon-ish

Soft shadow

Rounded corner besar

Animasi ringan saat load

Responsive mobile-first