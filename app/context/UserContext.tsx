"use client";

import { createContext, useState, useContext, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  country: string;
  points: number;
  age: number;
}

interface UserContextType {
  user: User | null;
  fetchUserData: (userId: string) => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);


  useEffect(() => {
    const userFromStorage = localStorage.getItem('user');
    if (userFromStorage) {
      setUser(JSON.parse(userFromStorage));
    }
  }, []);


  const fetchUserData = async (userId: string) => {
    try {
      const res = await fetch(`/api/user/${userId}`);
      if (res.ok) {
        const data = await res.json();
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
      } else {
        console.error('User not found or error occurred:', res.status);
      }
    } catch (error) {
      console.error('Failed to fetch user data', error);
    }
  };


  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, fetchUserData, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};