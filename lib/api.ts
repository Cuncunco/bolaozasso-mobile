import axios from "axios";

export const API_BASE_URL = "https://bolaozasso-backend.onrender.com";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 90000, // 90s para aguentar cold start do Render
  headers: {
    "Content-Type": "application/json",
  },
});

export function isNetworkError(err: any) {
  return !!err && !err.response;
}

export async function wakeBackend() {
  try {
    await api.get("/users/count");
  } catch {
    // ignorado
  }
}

export async function withRetry<T>(
  fn: () => Promise<T>,
  opts?: { retries?: number; delayMs?: number }
): Promise<T> {
  const retries = opts?.retries ?? 2;
  const delayMs = opts?.delayMs ?? 1500;

  let lastErr: any;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err: any) {
      lastErr = err;

      if (!isNetworkError(err)) throw err;

      await wakeBackend();

      if (attempt < retries) {
        await new Promise((r) => setTimeout(r, delayMs));
      }
    }
  }

  throw lastErr;
}