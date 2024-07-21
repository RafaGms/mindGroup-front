'use client'
import { createContext, ReactNode, useState } from "react";
import { AuthContextProp } from "../types/types";

export const AuthContext = createContext<AuthContextProp>({} as AuthContextProp);

export function AuthProvider({ children }: { children: ReactNode }) {
   const [error, setError] = useState<string | null>(null);

   const register = async (name: string, image: File | null, email: string, password: string) => {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      if (image) formData.append('images', image);

      try {
         const response = await fetch('http://localhost:8000/users', {
            method: 'POST',
            body: formData
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
   );
}
