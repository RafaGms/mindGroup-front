'use client';

import { Button } from "@/app/_components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from "@/app/_components/ui/dialog";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { AuthContext } from "@/app/context/authContext";
import { CircleMinus } from "lucide-react";
import { useState, useContext } from "react";

const CreateTransactionExpense = ({ onTransactionCreated }: any) => {
   const [description, setDescription] = useState<string>('');
   const [amount, setAmount] = useState<number | null>(null);
   const [error, setError] = useState<string>('');
   const [success, setSuccess] = useState<string>('');
   const { user } = useContext(AuthContext);

   const handleClickRegister = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError('');
      setSuccess('');

      if (!description) {
         setError('A descrição é obrigatória.');
         return;
      }

      if (amount === null || amount <= 0) {
         setError('O valor deve ser maior que zero.');
         return;
      }

      const userId = user?.id;
      const type = 'expense';

      try {
         const response = await fetch('http://localhost:8000/transation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ description, amount, userId, type })
         });

         if (response.ok) {
            const data = await response.json();
            setSuccess('Transação cadastrada com sucesso!');
            setDescription('');
            setAmount(null);
            onTransactionCreated();
         } else {
            const errorData = await response.json();
            setError(errorData.error || 'Falha no cadastro.');
         }
      } catch (error) {
         setError('Falha ao se conectar ao servidor.');
      }
   }

   return (
      <div>
         <Dialog>
            <DialogTrigger asChild>
               <Button className="py-10 bg-red-500">
                  <div className="flex flex-col gap-1 items-center">
                     <CircleMinus size={36} />
                     Despesas
                  </div>
               </Button>
            </DialogTrigger>
            <DialogContent>
               <form onSubmit={handleClickRegister}>
                  <DialogTitle>Nova Despesa</DialogTitle>
                  <DialogDescription>Adicione uma nova despesa ao seu controle financeiro</DialogDescription>
                  {error && <p className="text-red-500 mt-3">{error}</p>}
                  {success && <p className="text-green-500 mt-3">{success}</p>}
                  <div>
                     <div className="mb-3 mt-4">
                        <Label htmlFor="description">Descrição</Label>
                        <Input
                           className="mt-2"
                           id="description"
                           placeholder="Descrição"
                           type="text"
                           value={description}
                           onChange={(e) => setDescription(e.target.value)}
                           aria-label="Descrição"
                        />
                     </div>
                     <div className="mb-3">
                        <Label htmlFor="amount">Valor</Label>
                        <Input
                           className="mt-2"
                           id="amount"
                           placeholder="Valor"
                           type="number"
                           value={amount !== null ? amount : ''}
                           onChange={(e) => setAmount(parseFloat(e.target.value))}
                           aria-label="amount"
                        />
                     </div>
                  </div>
                  <DialogFooter>
                     <DialogClose asChild>
                        <Button className="bg-destructive">Cancelar</Button>
                     </DialogClose>
                     <Button type="submit">Cadastrar</Button>
                  </DialogFooter>
               </form>
            </DialogContent>
         </Dialog>
      </div>
   );
}
export default CreateTransactionExpense;
