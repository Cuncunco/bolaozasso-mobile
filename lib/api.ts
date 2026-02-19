import axios from "axios";
import { getToken } from "../storage/token";

export const api = axios.create({
  baseURL: "http://192.168.1.11:3333", // TROQUE pelo IP do seu PC
});

api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
