import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_KEY = "@bolaozasso:user";

type UserProps = {
  id: string;
  name?: string | null;
  email: string;
  avatarUrl?: string | null;
};

export async function saveUser(user: UserProps) {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
}

export async function getUser(): Promise<UserProps | null> {
  const data = await AsyncStorage.getItem(USER_KEY);
  if (!data) return null;

  try {
    return JSON.parse(data) as UserProps;
  } catch {
    return null;
  }
}

export async function deleteUser() {
  await AsyncStorage.removeItem(USER_KEY);
}