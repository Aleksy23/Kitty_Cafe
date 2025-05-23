// context/AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User, currentUser as mockCurrentUser } from '../data/mockData'; // Używamy mockowego użytkownika

interface AuthContextType {
  user: User | null;
  login: () => void;
  logout: () => void;
  isLoadingAuth: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true); // Na początku ładujemy

  // Symulacja logowania
  const login = () => {
    setIsLoadingAuth(true);
    setTimeout(() => {
      setUser(mockCurrentUser); // Ustaw mockowego użytkownika jako zalogowanego
      setIsLoadingAuth(false);
      console.log('User logged in:', mockCurrentUser.username);
    }, 1500); // Symuluj opóźnienie API
  };

  // Symulacja wylogowania
  const logout = () => {
    setIsLoadingAuth(true);
    setTimeout(() => {
      setUser(null);
      setIsLoadingAuth(false);
      console.log('User logged out.');
    }, 500);
  };

  // Tutaj mógłby być useEffect do sprawdzenia tokena uwierzytelnienia przy starcie aplikacji
  useEffect(() => {
    // Symulacja automatycznego logowania lub wczytywania sesji
    const checkAuthStatus = async () => {
      setIsLoadingAuth(true);
      // W prawdziwej aplikacji: sprawdzanie AsyncStorage dla tokena, walidacja tokena na serwerze
      await new Promise(resolve => setTimeout(resolve, 1000)); // Symulacja opóźnienia
      // Jeśli token jest ważny, ustaw użytkownika
      // setUser(userFromToken);
      setIsLoadingAuth(false);
    };
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoadingAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};