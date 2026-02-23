/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { login as apiLogin, tokenValid, fetchDashboard, waitForServerReady } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(tokenValid());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState('');

  const simulateActivity = useCallback((message) => {
    setLoadingMessage(message);
    // For indeterminate progress, we don't need to simulate percentage
    // We just set the message to indicate activity.
    // If needed, a short delay could be added here to visually "hold" the message.
  }, []);

  const checkAuth = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setLoadingMessage('');

    if (tokenValid()) {
      try {
        const data = await fetchDashboard();
        setDashboardData(data);
        setIsAuthenticated(true);
      } catch (err) {
        localStorage.removeItem('dashboard_token');
        localStorage.removeItem('dashboard_expires_at');
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
    setIsLoading(false);
    setLoadingMessage('Done'); // Clear message or set completion message
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    setError(null);
    simulateActivity('Menghubungkan ke server...');

    try {
      await waitForServerReady({
        timeoutMs: 90000,
        intervalMs: 2500,
      });
      simulateActivity('Sedang login...');
      await apiLogin(email, password);
      setIsAuthenticated(true);
      simulateActivity('Memuat data...');
      const data = await fetchDashboard();
      setDashboardData(data);
      return { success: true };
    } catch (err) {
      if (err instanceof Error && err.message.toLowerCase().includes('server belum siap')) {
        setError('Gagal menghubungkan ke server. Periksa koneksi internet Anda lalu coba lagi.');
      } else {
        setError(err.message);
      }
      setIsAuthenticated(false);
      return { success: false, message: err.message };
    } finally {
      setIsLoading(false);
      setLoadingMessage('Done'); // Clear message or set completion message
    }
  }, [simulateActivity]);

  const logout = useCallback(() => {
    localStorage.removeItem('dashboard_token');
    localStorage.removeItem('dashboard_expires_at');
    setIsAuthenticated(false);
    setDashboardData(null);
  }, []);

  const value = {
    isAuthenticated,
    isLoading,
    error,
    dashboardData,
    login,
    logout,
    checkAuth,
    loadingMessage,
    // loadingProgress is removed
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};
