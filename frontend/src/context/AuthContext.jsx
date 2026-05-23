import { createContext, useContext, useState, useEffect } from 'react'
import { adminLogin } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('admin_token'))
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('admin_token'))

const login = async (username, password) => {
  console.log("LOGIN CALLED", username, password);

  const res = await adminLogin({ username, password });

  console.log("API RESPONSE", res);

  const jwt = res.data.token;

  localStorage.setItem('admin_token', jwt);
  setToken(jwt);
  setIsAuthenticated(true);

  return jwt;
};
  const logout = () => {
    localStorage.removeItem('admin_token')
    setToken(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
