'use client'
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { AuthContext } from "@/app/context/authContext";
import Link from "next/link";

import { useContext, useState } from "react";

const FromLogin = () => {
   const [email, setEmail] = useState<string>('');
   const [password, setPassword] = useState<string>('');
   const [localError, setLocalError] = useState<string | null>(null);
   const { signIn, error } = useContext(AuthContext);

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLocalError(null);

      if (!email || !password) {
         setLocalError('Por favor, preencha todos os campos.');
         return;
      }

      try {
         await signIn(email, password);
      } catch (e) {
         setLocalError('Falha no login. Verifique suas credenciais e tente novamente.');
      }
   }

   return (
      <div className="p-6 w-full md:max-w-lg ">
         <div>
            <h1 className="text-3xl font-bold mb-6 text-center">Entrar com sua conta!</h1>
         </div>
         <form onSubmit={handleSubmit}>
            <Card>
               <CardContent className="px-4 py-5">
                  <div className="mb-4 sm:hidden">
                     <Button asChild variant={"link"}>
                        <Link href={'/'}>Voltar para iníco</Link>
                     </Button>
                  </div>
                  {(localError || error) && <p className="text-red-500 text-center mb-4">{localError || error}</p>}
                  <div className="mb-3">
                     <Label htmlFor="email">Email</Label>
                     <Input
                        className="mt-3 mb-5"
                        id="email"
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-label="Email"
                        autoComplete="email" />
                  </div>
                  <div className="mb-3">
                     <Label htmlFor="password">Senha</Label>
                     <Input
                        className="mt-3 mb-5"
                        id="password"
                        placeholder="Senha"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        aria-label="Senha"
                        autoComplete="current-password" />
                  </div>
                  <div className="mt-6 mb-5 flex justify-center">
                     <Button className="text-white" type="submit">Login</Button>
                  </div>

                  <div className="text-center mt-6">
                     <p>Não tem uma conta? <Link href='/register' className="text-blue-500"> Cadastre-se</Link></p>
                  </div>
               </CardContent>
            </Card>
         </form>
      </div>
   );
}

export default FromLogin;
