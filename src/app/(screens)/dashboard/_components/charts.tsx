'use client';

import * as React from "react";
import { Area, AreaChart, CartesianGrid } from "recharts";
import { Card, CardContent, CardDescription, CardHeader } from "@/app/_components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip } from "@/app/_components/ui/chart";
import { AuthContext } from "@/app/context/authContext";
import { Button } from "@/app/_components/ui/button";

interface Transaction {
   date: string;
   amount: number;
   type: 'income' | 'expense';
}

const chartConfig = {
   visitors: {
      label: "Visitors",
   },
   income: {
      label: "Income",
      color: "hsl(var(--chart-1))",
   },
   expense: {
      label: "Expense",
      color: "hsl(var(--chart-2))",
   },
} satisfies ChartConfig;

const generateDateRange = (startDate: Date, endDate: Date) => {
   const dates: { date: string; income: number; expense: number }[] = [];
   let currentDate = startDate;

   while (currentDate <= endDate) {
      dates.push({
         date: currentDate.toLocaleDateString(),
         income: 0,
         expense: 0,
      });
      currentDate.setDate(currentDate.getDate() + 1);
   }

   return dates;
};

export function ChartsLineMultiple({ onTransactionCreated }: any) {
   const [data, setData] = React.useState<{ date: string; income: number; expense: number }[]>([]);
   const [loading, setLoading] = React.useState(true);
   const [error, setError] = React.useState<string | null>(null);
   const [refresh, setRefresh] = React.useState(0); // Estado para controle de atualização
   const { user } = React.useContext(AuthContext);
   const id = user?.id;

   const fetchTransactions = async () => {
      if (!id) return;

      try {
         const response = await fetch(`http://localhost:8000/transactions/${id}`);
         if (!response.ok) {
            throw new Error("Erro ao buscar transações");
         }
         const transactions: Transaction[] = await response.json();

         const endDate = new Date();
         const startDate = new Date();
         startDate.setDate(endDate.getDate() - 1);

         const dateRange = generateDateRange(startDate, endDate);

         const processedData = transactions.reduce((acc: any[], transaction) => {
            const date = new Date(transaction.date).toLocaleDateString();
            const existing = acc.find((item) => item.date === date);

            if (existing) {
               if (transaction.type === 'income') {
                  existing.income += transaction.amount;
               } else {
                  existing.expense += transaction.amount;
               }
            }

            return acc;
         }, dateRange);

         setData(processedData);
      } catch (error) {
         setError('Erro ao buscar transações');
         console.error(error);
      } finally {
         setLoading(false);
      }
   };

   React.useEffect(() => {
      fetchTransactions();
   }, [id, refresh]); // Atualiza quando o id ou refresh muda

   const handleRefresh = () => {
      setRefresh(prev => prev + 1); // Força a atualização do gráfico
   };

   if (loading) return <div>Loading...</div>;
   if (error) return <div>{error}</div>;

   return (
      <div className="col-span-4">
         <Card className="w-full">
            <CardHeader>
               <CardDescription>
                  Visualização de transações por gráfico
               </CardDescription>
               <Button
                  onClick={handleRefresh}
                  className="mt-4 p-2 bg-blue-500 ">
                  Atualizar Dados
               </Button>
            </CardHeader>
            <CardContent className="space-y-4">
               <ChartContainer
                  config={chartConfig}
                  className="aspect-auto h-[250px] w-full"
               >
                  <AreaChart data={data}>
                     <defs>
                        <linearGradient
                           id="colorIncome"
                           x1={0}
                           y1={0}
                           x2={0}
                           y2={1}
                        >
                           <stop
                              offset="5%"
                              stopColor="#4CAF50"
                              stopOpacity={0.5}
                           />
                           <stop
                              offset="95%"
                              stopColor="#4CAF50"
                              stopOpacity={0}
                           />
                        </linearGradient>
                        <linearGradient
                           id="colorExpense"
                           x1={0}
                           y1={0}
                           x2={0}
                           y2={1}
                        >
                           <stop
                              offset="5%"
                              stopColor="#F44336"
                              stopOpacity={0.5}
                           />
                           <stop
                              offset="95%"
                              stopColor="#F44336"
                              stopOpacity={0}
                           />
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" />
                     <ChartTooltip cursor={false} />
                     <Area
                        type="monotone"
                        dataKey="income"
                        stroke="#4CAF50"
                        fillOpacity={1}
                        fill="url(#colorIncome)"
                     />
                     <Area
                        type="monotone"
                        dataKey="expense"
                        stroke="#F44336"
                        fillOpacity={1}
                        fill="url(#colorExpense)"
                     />
                  </AreaChart>
               </ChartContainer>
            </CardContent>
         </Card>
      </div>
   );
}
