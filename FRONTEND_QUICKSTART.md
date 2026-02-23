# Frontend Quickstart (Stateless)

Dokumen ini versi singkat untuk tim frontend.

## Base URL

```txt
https://ceklakuversihp.onrender.com
```

## Alur Wajib

1. Cek token di `localStorage`.
2. Jika token tidak ada atau `expiresAt` lewat, tampilkan login form.
3. Login ke `POST /auth/login`.
4. Simpan `token` + `expiresAt`.
5. Ambil data dashboard via `GET /dashboard` dengan header `Authorization: Bearer <token>`.
6. Jika `401 TOKEN_INVALID`, hapus token lalu balik ke login.

## Endpoint yang Dipakai Frontend

### 1) Login

`POST /auth/login`

Body:

```json
{
  "email": "user@example.com",
  "password": "secret"
}
```

Response sukses:

```json
{
  "success": true,
  "token": "c25veX...",
  "expiresAt": "2026-02-16T17:20:14.331Z"
}
```

### 2) Ambil Dashboard

`GET /dashboard`

Header:

```txt
Authorization: Bearer ISI_TOKEN
```

Response sukses:

```json
{
  "success": true,
  "source": "table",
  "user": "Nama User",
  "periode": "Februari 2026",
  "totalTransaksi": 123456,
  "rowCount": 15,
  "headers": ["No", "Produk", "Qty", "Total"],
  "data": [
    { "No": "1", "Produk": "Item A", "Qty": "2", "Total": "5000" }
  ]
}
```

### 3) Healthcheck (opsional)

`GET /health`

## Error Contract

Semua error:

```json
{
  "success": false,
  "code": "ERROR_CODE",
  "message": "Penjelasan error"
}
```

Error penting:
- `401 TOKEN_INVALID`: token invalid/expired.
- `422 INVALID_CREDENTIALS_INPUT`: email/password kosong.
- `401 LOGIN_FAILED`: login gagal.
- `400 TOKEN_REQUIRED`: header `Authorization: Bearer <token>` belum dikirim.

## Contoh Kode Frontend (Fetch)

```js
const API_BASE = 'https://ceklakuversihp.onrender.com';

async function login(email, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.message || 'Login gagal');

  localStorage.setItem('dashboard_token', json.token);
  localStorage.setItem('dashboard_expires_at', json.expiresAt);
  return json;
}

function tokenValid() {
  const token = localStorage.getItem('dashboard_token');
  const expiresAt = localStorage.getItem('dashboard_expires_at');
  if (!token || !expiresAt) return false;
  return Date.now() < new Date(expiresAt).getTime();
}

async function fetchDashboard() {
  const token = localStorage.getItem('dashboard_token');
  const res = await fetch(`${API_BASE}/dashboard`, {
    method: 'GET',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  const json = await res.json();

  if (res.status === 401 && json.code === 'TOKEN_INVALID') {
    localStorage.removeItem('dashboard_token');
    localStorage.removeItem('dashboard_expires_at');
    throw new Error('Session habis, login ulang');
  }

  if (!res.ok || !json.success) throw new Error(json.message || 'Gagal ambil dashboard');
  return json;
}
```
