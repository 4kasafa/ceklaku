const API_BASE = '/api';

export async function login(email, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.message || 'Login gagal');
  }

  localStorage.setItem('dashboard_token', json.token);
  localStorage.setItem('dashboard_expires_at', json.expiresAt);
  return json;
}

export function tokenValid() {
  const token = localStorage.getItem('dashboard_token');
  const expiresAt = localStorage.getItem('dashboard_expires_at');
  if (!token || !expiresAt) return false;
  return Date.now() < new Date(expiresAt).getTime();
}

export async function fetchDashboard() {
  const token = localStorage.getItem('dashboard_token');
  const res = await fetch(`${API_BASE}/dashboard?token=${encodeURIComponent(token || '')}`);
  const json = await res.json();

  if (res.status === 401 && json.code === 'TOKEN_INVALID') {
    localStorage.removeItem('dashboard_token');
    localStorage.removeItem('dashboard_expires_at');
    throw new Error('Session habis, login ulang');
  }

  if (!res.ok || !json.success) {
    throw new Error(json.message || 'Gagal ambil dashboard');
  }
  return json;
}
