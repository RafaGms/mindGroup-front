'use client'
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import Link from "next/link";
import { useState } from "react";

const FormRegister = () => {
   const [name, setName] = useState<string>('');
   const [image, setImage] = useState<File | null>(null);
   const [email, setEmail] = useState<string>('');
   const [password, setPassword] = useState<string>('');

   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      setImage(file);
   };

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(name, image, email, password);
   }
   return (
      <div className="p-6 w-full md:max-w-lg">
         <div>
            <h1 className="text-3xl font-bold mb-6 text-center">Criar uma conta!</h1>
         </div>
         <form onSubmit={handleSubmit}>
            <Card>
               <CardContent className="px-4 py-5">

                  <div className="mb-3">
                     <Label htmlFor="name">Nome</Label>
                     <Input
                        className="mt-3 mb-5"
                        id="name"
                        placeholder="Nome"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        aria-label="Nome"
                        autoComplete="name" />
                  </div>
                  <div className="mb-3">
                     <Label htmlFor="image">Imagem</Label>
                     <Input
                        className="mt-3 mb-5 text-white"
                        id="image"
                        type="file"
                        placeholder="Seleciona sua imagem"
                        onChange={handleImageChange}
                        aria-label="image" />
                  </div>
                  <div className="mb-3">
                     <Label htmlFor="email">Email</Label>
                     <Input
                        className="mt-3 mb-5"
                        id="email"
                        placeholder="E-mail"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-label="email"
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
                        aria-label="senha"
                        autoComplete="current-password" />
                  </div>
                  <div className="mb-3 flex justify-center">
                     <Button type="submit" className="text-white">Cadastrar</Button>
                  </div>

                  <div className="text-center mt-6">
                     <p>Já tem uma conta? <Link href='/login' className="text-primary">Entrar</Link></p>
                  </div>
               </CardContent>
            </Card>
         </form>
      </div>
   );
}

export default FormRegister;