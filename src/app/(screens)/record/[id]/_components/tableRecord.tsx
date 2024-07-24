"use client";

import { Button } from "@/app/_components/ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/app/_components/ui/dialog";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/app/_components/ui/table";
import { IparamsUserId, Itransation } from "@/app/types/types";
import { Dialog } from "@radix-ui/react-dialog";
import { Edit, Trash2, ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { deleteTransactionApi } from "../../../../api/deleteApi";
import { editTransactionApi } from "@/app/api/editApi";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/app/_components/ui/radio-group";

const TableRecord = ({ userId }: IparamsUserId) => {
   const [description, setDescription] = useState<string>('');
   const [amount, setAmount] = useState<number | null>(null);
   const [success, setSuccess] = useState<string>('');
   const [transactions, setTransactions] = useState<Itransation[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
   const [selectedTransactionId, setSelectedTransactionId] = useState<number | null>(null);
   const [transactionType, setTransactionType] = useState<string>('income');

   useEffect(() => {
      const fetchTransactions = async () => {
         try {
            const response = await fetch(`http://localhost:8000/transations/${userId}`, {
               method: 'GET',
               headers: {
                  'Content-Type': 'application/json',
               },
            });

            if (response.ok) {
               const data = await response.json();
               setTransactions(data);
            } else {
               setError('Erro ao buscar transações');
            }
         } catch (error) {
            setError('Erro ao buscar transações');
            console.log('Erro', error);
         } finally {
            setLoading(false);
         }
      };

      fetchTransactions();
   }, [userId]);

   const handleDelete = async () => {
      if (selectedTransactionId !== null) {
         try {
            await deleteTransactionApi(selectedTransactionId);
            setTransactions(transactions.filter(transaction => transaction.id !== selectedTransactionId));
            setSelectedTransactionId(null);
         } catch (error) {
            if (error instanceof Error) {
               setError(`Erro ao excluir transação: ${error.message}`);
            } else {
               setError('Erro desconhecido ao excluir transação');
            }
         }
      }
   };

   const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (selectedTransactionId !== null && description && amount !== null && transactionType) {
         try {
            const updatedTransaction = { description, amount, type: transactionType };
            const editedTransaction = await editTransactionApi(selectedTransactionId, updatedTransaction);
            setTransactions(transactions.map(transaction =>
               transaction.id === selectedTransactionId ? editedTransaction : transaction
            ));
            setSelectedTransactionId(null);
            setSuccess('Transação editada com sucesso');
         } catch (error) {
            if (error instanceof Error) {
               setError(`Erro ao editar transação: ${error.message}`);
            } else {
               setError('Erro desconhecido ao editar transação');
            }
         }
      }
   };

   if (loading) {
      return <div>Loading...</div>;
   }

   if (error) {
      return <div>{error}</div>;
   }

   const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR', {
         year: 'numeric',
         month: 'long',
         day: 'numeric'
      });
   };

   const calculateBalance = () => {
      return transactions.reduce((accumulator, transaction) => {
         return transaction.type === 'income' ? accumulator + transaction.amount : accumulator - transaction.amount;
      }, 0);
   };

   const balance = calculateBalance();

   return (
      <div className="bg-card rounded-3xl px-5 py-6 my-5">
         <Table>
            <TableCaption className="text- text-primary font-medium text-md">
               Saldo Previsto:<span className={`${balance < 0 ? 'text-red-600' : 'text-green-600'}`}> {balance < 0 ? (`R$ ${balance.toFixed(2).replace('.', ',')}`) : (`+ R$ ${balance.toFixed(2).replace('.', ',')}`)}</span>
            </TableCaption>
            <TableHeader>
               <TableRow>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {transactions.length === 0 ? (
                  <TableRow>
                     <TableCell colSpan={5}>Não há transações para este usuário.</TableCell>
                  </TableRow>
               ) : (
                  transactions.map(transaction => (
                     <TableRow key={transaction.id}>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell>
                           {transaction.type === 'income' ? (
                              <div className="flex items-center gap-2">
                                 <ArrowUpCircle className="text-green-500" />
                                 Receita
                              </div>
                           ) : (
                              <div className="flex items-center gap-2">
                                 <ArrowDownCircle className="text-red-500" />
                                 Despesa
                              </div>
                           )}
                        </TableCell>
                        <TableCell>{formatDate(transaction.date)}</TableCell>
                        <TableCell className={`text-right ${transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                           R$ {transaction.amount.toFixed(2).replace('.', ',')}
                        </TableCell>
                        <TableCell className="text-right">
                           <div className="flex justify-end gap-3">
                              <div>
                                 <Dialog>
                                    <DialogTrigger asChild>
                                       <Button size="icon" onClick={() => {
                                          setSelectedTransactionId(transaction.id);
                                          setDescription(transaction.description);
                                          setAmount(transaction.amount);
                                          setTransactionType(transaction.type);
                                       }}>
                                          <Edit />
                                       </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                       <form onSubmit={handleEdit}>
                                          <DialogTitle>Editar Transação</DialogTitle>
                                          <DialogDescription>Você realmente deseja editar esta transação? As alterações serão salvas permanentemente.</DialogDescription>
                                          {error && <p className="text-red-500 mt-3">{error}</p>}
                                          {success && <p className="text-green-500 mt-3">{success}</p>}
                                          <div>
                                             <div className="mb-5 mt-4">
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
                                             <div className="mb-5">
                                                <RadioGroup className="gap-4" value={transactionType} onValueChange={setTransactionType}>
                                                   <div className="flex items-center space-x-2">
                                                      <RadioGroupItem value="income" id="income" />
                                                      <Label htmlFor="income">Receita</Label>
                                                   </div>
                                                   <div className="flex items-center space-x-2">
                                                      <RadioGroupItem value="expense" id="expense" />
                                                      <Label htmlFor="expense">Despesa</Label>
                                                   </div>
                                                </RadioGroup>
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
                                          <DialogFooter className="spac">
                                             <DialogClose asChild>
                                                <Button className="bg-destructive">Cancelar</Button>
                                             </DialogClose>
                                             <Button type="submit">Salvar</Button>
                                          </DialogFooter>
                                       </form>
                                    </DialogContent>
                                 </Dialog>
                              </div>
                              <div>
                                 <Dialog>
                                    <DialogTrigger asChild>
                                       <Button size="icon" onClick={() => setSelectedTransactionId(transaction.id)}>
                                          <Trash2 />
                                       </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                       <DialogHeader>
                                          <DialogTitle>Excluir Transação</DialogTitle>
                                          <DialogDescription>
                                             Você está prestes a excluir uma transação. Esta ação é irreversível e você não poderá recuperar esta transação depois que ela for excluída.
                                             <span className="font-semibold text-md text-destructive ml-3">Tem certeza de que deseja continuar?</span>
                                          </DialogDescription>
                                       </DialogHeader>
                                       <DialogFooter>
                                          <Button
                                             variant={"destructive"}
                                             onClick={handleDelete}
                                          >
                                             Excluir
                                          </Button>
                                          <DialogClose asChild><Button variant={"outline"} onClick={() => setSelectedTransactionId(null)}>Cancelar</Button></DialogClose>
                                       </DialogFooter>
                                    </DialogContent>
                                 </Dialog>
                              </div>
                           </div>
                        </TableCell>
                     </TableRow>
                  ))
               )}
            </TableBody>
         </Table>
      </div>
   );
};

export default TableRecord;
