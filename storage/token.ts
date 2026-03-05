// storage/token.ts
import { Platform } from "react-native";

const TOKEN_KEY = "bolaozasso_token";

async function getWebToken() {
  return localStorage.getItem(TOKEN_KEY);
}
async function saveWebToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}
async function deleteWebToken() {
  localStorage.removeItem(TOKEN_KEY);
}

async function getNativeToken() {
  const SecureStore = await import("expo-secure-store");
  return SecureStore.getItemAsync(TOKEN_KEY);
}
async function saveNativeToken(token: string) {
  const SecureStore = await import("expo-secure-store");
  return SecureStore.setItemAsync(TOKEN_KEY, token);
}
async function deleteNativeToken() {
  const SecureStore = await import("expo-secure-store");
  return SecureStore.deleteItemAsync(TOKEN_KEY);
}

export async function getToken() {
  return Platform.OS === "web" ? getWebToken() : getNativeToken();
}

export async function saveToken(token: string) {
  return Platform.OS === "web" ? saveWebToken(token) : saveNativeToken(token);
}

export async function deleteToken() {
  return Platform.OS === "web" ? deleteWebToken() : deleteNativeToken();
}