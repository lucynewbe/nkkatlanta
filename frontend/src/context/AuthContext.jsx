import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('nkk_admin_token'));
  const [username, setUsername] = useState(() => localStorage.getItem('nkk_admin_user'));
  const [role, setRole] = useState(() => localStorage.getItem('nkk_admin_role'));
  const [loading, setLoading] = useState(false);

  const login = async (user, pass) => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user, password: pass }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Login failed');
      }
      const data = await res.json();
      localStorage.setItem('nkk_admin_token', data.token);
      localStorage.setItem('nkk_admin_user', data.username);
      if (data.role) localStorage.setItem('nkk_admin_role', data.role);
      setToken(data.token);
      setUsername(data.username);
      setRole(data.role || 'editor');
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('nkk_admin_token');
    localStorage.removeItem('nkk_admin_user');
    localStorage.removeItem('nkk_admin_role');
    setToken(null);
    setUsername(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ token, username, role, login, logout, loading, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
