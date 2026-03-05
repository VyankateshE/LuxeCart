import { createContext, useEffect, useMemo, useState } from 'react';
import { loginApi, profileApi, registerApi } from '../api/authApi';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const hydrate = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoadingAuth(false);
        return;
      }

      try {
        const data = await profileApi();
        setUser(data);
      } catch (_error) {
        localStorage.removeItem('token');
      } finally {
        setLoadingAuth(false);
      }
    };

    hydrate();
  }, []);

  const login = async (payload) => {
    const data = await loginApi(payload);
    localStorage.setItem('token', data.token);
    setUser(data.user);
    return data;
  };

  const register = async (payload) => {
    const data = await registerApi(payload);
    localStorage.setItem('token', data.token);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      loadingAuth,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
    }),
    [user, loadingAuth],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
