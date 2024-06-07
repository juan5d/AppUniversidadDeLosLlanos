import React, { createContext, useContext, useState } from 'react';

// Crear el contexto
const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [codPersona, setCodPersona] = useState(null);

  const login =  (data) => {
    
    setToken(data.token);
    setCodPersona(data.codPersona);
  };

  const logout =  () => {
    setToken(null);
    setCodPersona(null);
  };

  return (
    <AuthContext.Provider value={{ token, codPersona, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para acceder al contexto
export const useAuth = () => {
  return useContext(AuthContext);
};