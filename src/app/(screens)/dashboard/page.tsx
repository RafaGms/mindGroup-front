import Header from "@/app/_components/header";
import FinancialOverview from "./_components/financialOverview";

const DashboardPage = () => {
   return (
      <div>
         <Header />
         <div className="container">
            <FinancialOverview />
         </div>
      </div>
   );
}

export default DashboardPage;