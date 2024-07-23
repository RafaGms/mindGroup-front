"use client";

import { Button } from "@/app/_components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/app/_components/ui/table";
import { IparamsUserId, Itransation } from "@/app/types/types";
import { Edit, Trash2, ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { useEffect, useState } from "react";

const TableRecord = ({ userId }: IparamsUserId) => {
   const [transactions, setTransactions] = useState<Itransation[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

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
               Saldo Previsto:<span className={`${balance < 0 ? 'text-red-600' : 'text-green-600'}`}> {balance < 0 ? (`- R$ ${balance.toFixed(2).replace('.', ',')}`) : (`+ R$ ${balance.toFixed(2).replace('.', ',')}`)}</span>
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
                              <Button size="icon"><Edit /></Button>
                              <Button size="icon"><Trash2 /></Button>
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
