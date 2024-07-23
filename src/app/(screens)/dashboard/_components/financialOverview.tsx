'use client';

import { AuthContext } from "@/app/context/authContext";
import { useContext, useEffect, useState } from "react";
import CreateTransactionIncome from "./createTransationIncome";
import CreateTransactionExpense from "./createTransationExpense";
import { Itransation } from "@/app/types/types";

const FinancialOverview = () => {
   const { user } = useContext(AuthContext);

   const [transactions, setTransactions] = useState<Itransation[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   const fetchTransactions = async () => {
      if (!user?.id) return;

      try {
         const response = await fetch(`http://localhost:8000/transations/${user.id}`, {
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

   useEffect(() => {
      fetchTransactions();
   }, [user?.id]);

   const calculateIncome = () => {
      return transactions
         .filter(transaction => transaction.type === 'income')
         .reduce((acc, transaction) => acc + transaction.amount, 0);
   };

   const calculateExpense = () => {
      return transactions
         .filter(transaction => transaction.type === 'expense')
         .reduce((acc, transaction) => acc + transaction.amount, 0);
   };

   const calculateBalance = () => {
      return calculateIncome() - calculateExpense();
   };

   const income = calculateIncome();
   const expense = calculateExpense();
   const balance = calculateBalance();

   if (loading) {
      return <div>Loading...</div>;
   }

   if (error) {
      return <div>{error}</div>;
   }

   return (
      <div>
         <div className="my-6">
            <div className="bg-card rounded-3xl px-4 py-5">
               <div className="flex justify-center md:justify-between items-center flex-wrap gap-3">
                  <div className="flex-col justify-between w-full sm:w-auto m-auto sm:m-0">
                     <h1>{'Olá ' + user?.name}</h1>
                     <div className="flex flex-wrap gap-4 my-3 w-full justify-center">
                        <div className="text-center shadow-lg sm:w-auto w-full shadow-slate-300 p-3 rounded-xl">
                           <p>Receita mensal</p>
                           <p className="text-green-600 -tracking-tighter text-lg font-medium">
                              R${income.toFixed(2).replace('.', ',')}
                           </p>
                        </div>
                        <div className="text-center sm:w-auto w-full shadow-lg shadow-slate-300 p-3 rounded-xl">
                           <p>Despesa mensal</p>
                           <p className="text-red-600 -tracking-tighter text-lg font-medium">
                              R${expense.toFixed(2).replace('.', ',')}
                           </p>
                        </div>
                        <div className="text-center sm:w-auto w-full shadow-lg shadow-slate-300 p-3 rounded-xl">
                           <p>Saldo geral</p>
                           <p className={balance < 0 ? "text-red-600 -tracking-tighter text-lg font-medium" : "text-green-600 -tracking-tighter text-lg font-medium"}>
                              R${balance.toFixed(2).replace('.', ',')}
                           </p>
                        </div>
                     </div>
                  </div>
                  <div className="flex justify-center items-center gap-2 md:border-l-2">
                     <div className="ml-10">
                        <CreateTransactionIncome onTransactionCreated={fetchTransactions} />
                     </div>
                     <div>
                        <CreateTransactionExpense onTransactionCreated={fetchTransactions} />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default FinancialOverview;
