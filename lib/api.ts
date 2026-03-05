import axios from "axios";
import { getToken } from "../storage/token";

export const api = axios.create({
  baseURL: "https://bolaozasso-backend.onrender.com",
  timeout: 20000,
});

api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});