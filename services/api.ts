const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:5000';

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? 'Request failed');
  return data as T;
}

interface AuthResponse {
  token: string;
  user: { id: string; name: string; email: string };
}

export const registerUser = (name: string, email: string, password: string) =>
  request<AuthResponse>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });

export const loginUser = (email: string, password: string) =>
  request<AuthResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });