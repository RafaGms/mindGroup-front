import Header from "@/app/_components/header";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";

const DashboardPage = () => {
   return (
      <div>
         <Header />
         <div className="container ">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6 mt-10">
               <div>
                  <Card>
                     <CardContent>
                        Entada
                     </CardContent>
                  </Card>
               </div>
               <div>
                  <Card>
                     <CardContent>
                        Saída
                     </CardContent>
                  </Card>
               </div>
               <div>
                  <Card>
                     <CardContent>
                        Gráficos
                     </CardContent>
                  </Card>
               </div>
               <div>
                  <Card>
                     <CardContent>
                        Total
                     </CardContent>
                  </Card>
               </div>
            </div>

            <div className="mb-6">
               <div className="mb-4">
                  <Button className="text-white">Adicionar Registro</Button>
               </div>
               <Card>
                  <CardContent>
                     Buscar
                  </CardContent>
               </Card>
            </div>

            <div className="">
               <Card>
                  <CardContent>
                     Tabela de Transições
                  </CardContent>
               </Card>
            </div>
         </div>
      </div>
   );
}

export default DashboardPage;