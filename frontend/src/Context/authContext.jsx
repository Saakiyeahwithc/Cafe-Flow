import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    if (savedRole) setRole(savedRole);
  }, []);

  const login = (newRole) => {
    setRole(newRole);
    localStorage.setItem("role", newRole);
  };

  const logout = () => {
    setRole(null);
    localStorage.removeItem("role");
  };

  return (
    <AuthContext.Provider value={{ role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext)