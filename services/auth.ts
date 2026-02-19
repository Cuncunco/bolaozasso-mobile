import { api } from "../lib/api";
import { saveToken } from "../storage/token";

type AuthResponse = {
  user: { id: string; name?: string | null; email: string };
  token: string;
};

export async function loginUser(params: { email: string; password: string }) {
  const { data } = await api.post<AuthResponse>("/login", params);
  await saveToken(data.token);
  return data;
}

export async function registerUser(params: { name?: string; email: string; password: string }) {
  const { data } = await api.post<AuthResponse>("/register", params);
  await saveToken(data.token);
  return data;
}
