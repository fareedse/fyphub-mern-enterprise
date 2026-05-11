import React, { createContext, useContext, useMemo, useState } from 'react';
import api from '../api/client';
const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('fyphub_token'));
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('fyphub_user') || 'null'));
  const saveAuth = (data) => { localStorage.setItem('fyphub_token', data.token); localStorage.setItem('fyphub_user', JSON.stringify(data.user)); setToken(data.token); setUser(data.user); };
  const login = async (payload) => { const { data } = await api.post('/auth/login', payload); saveAuth(data); return data; };
  const register = async (payload) => { const { data } = await api.post('/auth/register', payload); saveAuth(data); return data; };
  const logout = () => { localStorage.removeItem('fyphub_token'); localStorage.removeItem('fyphub_user'); setToken(null); setUser(null); };
  const value = useMemo(() => ({ token, user, isAuthed: !!token, isAdmin: ['admin','staff'].includes(user?.role), login, register, logout, setUser }), [token, user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const useAuth = () => useContext(AuthContext);
