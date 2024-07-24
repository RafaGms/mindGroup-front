import Header from "@/app/_components/header";
import FinancialOverview from "./_components/financialOverview";
import { ChartsLineMultiple } from "./_components/charts";

const DashboardPage = () => {
   return (
      <div>
         <Header />
         <div className="container">
            <FinancialOverview />
         </div>

         <div className="container grid grid-cols-4">
            <ChartsLineMultiple />
         </div>
      </div>
   );
}

export default DashboardPage;