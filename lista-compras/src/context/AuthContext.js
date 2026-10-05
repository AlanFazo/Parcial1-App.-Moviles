import React, { createContext, useContext, useEffect, useState } from 'react';
import { getUsers, saveUsers, getSession, setSession } from '../storage/storage';
import { validateCredentials } from '../utils/validation';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const saved = await getSession();
      if (saved) setUser(saved);
      setLoading(false);
    })();
  }, []);

  const register = async (username, password) => {
    const check = validateCredentials(username, password);
    if (!check.valid) return { ok: false, error: check.error };

    const users = await getUsers();
    const name = username.trim();
    if (users.some((u) => u.username.toLowerCase() === name.toLowerCase())) {
      return { ok: false, error: 'Ese usuario ya existe' };
    }
    await saveUsers([...users, { username: name, password }]);
    return { ok: true };
  };

  const login = async (username, password) => {
    const users = await getUsers();
    const found = users.find(
      (u) => u.username.toLowerCase() === username.trim().toLowerCase() && u.password === password
    );
    if (!found) return { ok: false, error: 'Usuario o contraseña incorrectos' };
    await setSession(found.username);
    setUser(found.username);
    return { ok: true };
  };

  const logout = async () => {
    await setSession(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);