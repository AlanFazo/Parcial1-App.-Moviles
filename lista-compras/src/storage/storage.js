import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_KEY = '@users';
const SESSION_KEY = '@session';
const productsKey = (username) => `@products:${username}`;

export async function getUsers() {
  const raw = await AsyncStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function saveUsers(users) {
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export async function getSession() {
  return AsyncStorage.getItem(SESSION_KEY);
}

export async function setSession(username) {
  if (username) await AsyncStorage.setItem(SESSION_KEY, username);
  else await AsyncStorage.removeItem(SESSION_KEY);
}

export async function getProducts(username) {
  const raw = await AsyncStorage.getItem(productsKey(username));
  return raw ? JSON.parse(raw) : [];
}

export async function saveProducts(username, products) {
  await AsyncStorage.setItem(productsKey(username), JSON.stringify(products));
}