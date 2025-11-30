import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { defaultUsers, loadFromLocalStorage, saveToLocalStorage } from '../database/database';

const STORAGE_KEYS = {
  activeUser: 'sf_active_user',
  users: 'sf_registered_users',
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => loadFromLocalStorage(STORAGE_KEYS.activeUser, null));
  const [users, setUsers] = useState(() => {
    const storedUsers = loadFromLocalStorage(STORAGE_KEYS.users, []);
    // Admin user yoxdursa əlavə et
    const hasAdmin = storedUsers.some(u => u.email.toLowerCase() === 'admin@gmail.com');
    if (!hasAdmin) {
      return [...defaultUsers, ...storedUsers];
    }
    return storedUsers;
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    saveToLocalStorage(STORAGE_KEYS.users, users);
  }, [users]);

  useEffect(() => {
    if (user) {
      saveToLocalStorage(STORAGE_KEYS.activeUser, user);
    } else {
      localStorage.removeItem(STORAGE_KEYS.activeUser);
    }
  }, [user]);

  const signup = (payload) => {
    setError(null);
    const exists = users.some((entry) => entry.email.toLowerCase() === payload.email.toLowerCase());

    if (exists) {
      throw new Error('Bu e-poçt ilə hesab artıq mövcuddur.');
    }

    const id = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString();
    const newUser = {
      id,
      ...payload,
      createdAt: new Date().toISOString(),
    };

    setUsers((prev) => [...prev, newUser]);
    // Registerdan sonra avtomatik daxil olunmur - yalnız istifadəçi yaradılır
  };

  const login = ({ email, password }) => {
    setError(null);
    const existingUser = users.find(
      (entry) => entry.email.toLowerCase() === email.toLowerCase() && entry.password === password
    );

    if (!existingUser) {
      throw new Error('Daxil etdiyiniz məlumatlar yanlışdır.');
    }

    setUser({
      id: existingUser.id,
      fullName: existingUser.fullName,
      role: existingUser.role,
      email: existingUser.email,
    });
  };

  const logout = () => {
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      error,
      signup,
      login,
      logout,
    }),
    [user, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth yalnız AuthProvider daxilində istifadə oluna bilər.');
  }
  return context;
};

