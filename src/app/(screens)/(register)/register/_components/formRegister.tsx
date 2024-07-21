'use client'
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { AuthContext } from "@/app/context/authContext";
import Link from "next/link";
import { useContext, useState } from "react";

const FormRegister = () => {
   const [name, setName] = useState<string>('');
   const [image, setImage] = useState<File | undefined>();
   const [email, setEmail] = useState<string>('');
   const [password, setPassword] = useState<string>('');
   const [confirmPassword, setConfirmPassword] = useState<string>('');
   const [error, setError] = useState<string | null>(null);
   const [success, setSuccess] = useState<string | null>(null);
   const { register } = useContext(AuthContext);

   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      setImage(file);
   };

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Field validations:
      // if the fields are emptyand 
      if (!name || !email || !password || !confirmPassword || !image) {
         setError("Todos os campos são obrigatórios.");
         return;
      }
      // if the password is a minimum of 4 digits
      if (password.length < 4) {
         setError("A senha deve ter pelo menos 4 dígitos.");
         return;
      }
      // if the password fields are the same 
      if (password !== confirmPassword) {
         setError("As senhas não correspondem.");
         return;
      }
      //if the email is valid
      if (!validateEmail(email)) {
         setError("O e-mail é inválido.");
         return;
      }
      //if the image has a maximum of 8MB
      if (image.size > 8 * 1024 * 1024) { // Limite de 8MB
         setError("A imagem deve ter no máximo 8MB.");
         return;
      }

      setError(null);

      try {
         await register(name, image, email, password);
         setSuccess("Cadastro realizado com sucesso!");
         setName('');
         setImage(undefined);
         setEmail('');
         setPassword('');
         setConfirmPassword('');
      } catch (error) {
         setError("Erro ao cadastrar o usuário.");
      }
   };

   // Function of validation email
   const validateEmail = (email: string): boolean => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
   };

   return (
      <div className="p-6 w-full md:max-w-lg">
         <div>
            <h1 className="text-3xl font-bold mb-6 text-center">Criar uma conta!</h1>
         </div>
         <form onSubmit={handleSubmit}>
            <Card>
               <CardContent className="px-4 py-5">
                  {error && <div className="mb-4 text-center text-red-500">{error}</div>}
                  {success && <div className="mb-4 text-center text-green-500">{success}</div>}

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
                  <div className="mb-3">
                     <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                     <Input
                        className="mt-3 mb-5"
                        id="confirmPassword"
                        placeholder="Confirmar Senha"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        aria-label="confirm-password"
                        autoComplete="new-password" />
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
};

export default FormRegister;
