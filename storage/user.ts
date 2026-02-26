import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_KEY = "@bolaozasso:user";

export async function saveUser(user: any) {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
}

export async function getUser() {
  const data = await AsyncStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) : null;
}

export async function deleteUser() {
  await AsyncStorage.removeItem(USER_KEY);
}