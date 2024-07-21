'use client'
import { createContext, ReactNode, useState } from "react";
import { AuthContextProp } from "../types/types";

export const AuthContext = createContext<AuthContextProp>({} as AuthContextProp)

export function AuthProvider({ children }: { children: ReactNode }) {
   const [error, setError] = useState<string | null>(null);

   const register = async (name: string, image: File, email: string, password: string) => {
      try {
         const response = await fetch('http://localhost:8000/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, image, email, password })
         });

         if (response.ok) {
            setError(null);
         } else {
            const errorData = await response.json();
            setError(errorData.error || 'Falha ao registrar.');
         }
      } catch (error) {
         setError('Falha ao registrar.');
      }
   };

   return (
      <AuthContext.Provider value={{ register }}>
         {children}
      </AuthContext.Provider>
   )
} 