'use client'
import { createContext, ReactNode, useEffect, useState } from "react";
import { AuthContextProp, Iuser } from "../types/types";
import { setCookie, parseCookies } from "nookies";
import { useRouter } from "next/navigation";
import { api } from "../service/axiosConfig";

export const AuthContext = createContext<AuthContextProp>({} as AuthContextProp);

export function AuthProvider({ children }: { children: ReactNode }) {
   const [error, setError] = useState<string | null>(null);
   const [user, setUser] = useState<Iuser | null>(null)
   const isAuthenticated = !!user;
   const router = useRouter();

   useEffect(() => {
      const checkToken = async () => {
         const { 'finance-token': token } = parseCookies();

         if (token) {
            try {
               const response = await fetch('http://localhost:8000/token', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ token })
               });

               if (response.ok) {
                  const data = await response.json();
                  setUser(data.user);
               } else {
                  // Handle invalid token or other errors
                  setUser(null);
               }
            } catch (error) {
               console.error('Failed to validate token', error);
               setUser(null);
            }
         }
      };
      checkToken();
   }, []);

   const signIn = async (email: string, password: string) => {
      try {
         const response = await fetch('http://localhost:8000/signIn', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
         });

         if (response.ok) {
            const data = await response.json();
            setError(null);
            setCookie(undefined, 'finance-token', data.token, {
               maxAge: 120 * 120 * 1, //4 hours
            });
            api.defaults.headers['Authorization'] = `Bearer ${data.token}`;
            setUser(data.user);
            router.push('/dashboard');
         } else {
            const errorData = await response.json();
            setError(errorData.error || 'Falha no login.');
         }
      } catch (error) {
         setError('Falha no login.');
      }
   };

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
            router.push('/login')
         } else {
            const errorData = await response.json();
            setError(errorData.error || 'Falha ao registrar.');
         }
      } catch (error) {
         setError('Falha ao registrar.');
      }
   };

   return (
      <AuthContext.Provider value={{ register, signIn, isAuthenticated, user, }}>
         {children}
      </AuthContext.Provider>
   );
}
