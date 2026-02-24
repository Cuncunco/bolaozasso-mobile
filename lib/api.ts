import axios from "axios";
import { getToken } from "../storage/token";

export const api = axios.create({
  baseURL: "http://192.168.1.35:3333",
});

api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
