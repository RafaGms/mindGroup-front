'use client'
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { AuthContext } from "@/app/context/authContext";
import { CircleMinus } from "lucide-react";
import { useContext } from "react";
import CreateTransationPage from "./createTransationIncome";

const FinancialOverview = () => {
   const { user } = useContext(AuthContext)

   return (
      <div>
         <div className="my-6">
            <Card>
               <CardContent className="p-6 ">
                  <div className="flex justify-center md:justify-between items-center flex-wrap gap-3">

                     <div className="flex-col justify-between w-full sm:w-auto m-auto sm:m-0">
                        <h1 className=""> {'Olá ' + user?.name}</h1>
                        <div className="flex flex-wrap gap-4 my-3 w-full justify-center">
                           <div className="text-center shadow-lg sm:w-auto w-full shadow-slate-300 p-3 rounded-xl">
                              <p>Receita mensal</p>
                              <p className="text-green-400 -tracking-tighter text-lg font-medium">R$500,00</p>
                           </div>
                           <div className="text-center sm:w-auto w-full shadow-lg  shadow-slate-300 p-3 rounded-xl">
                              <p>Despesa mensal</p>
                              <p className="text-red-400 -tracking-tighter text-lg font-medium">R$500,00</p>
                           </div>
                           <div className="text-center sm:w-auto w-full shadow-lg shadow-slate-300 p-3 rounded-xl">
                              <p>Saldo geral</p>
                              <p className="text-red-400 -tracking-tighter text-lg font-medium">R$500,00</p>
                           </div>
                        </div>
                     </div>

                     <div className="flex justify-center items-center gap-2 md:border-l-2 ">
                        <div className="ml-10">
                           <CreateTransationPage />
                        </div>
                        <div>
                           <Button className="py-10"><div className="flex flex-col gap-1 items-center"><CircleMinus size={36} />Despesas</div></Button>
                        </div>
                     </div>

                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
   );
}

export default FinancialOverview;