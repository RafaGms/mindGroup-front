import Header from "@/app/_components/header";
import TableRecord from "./_components/tableRecord";
import { Iparams } from "@/app/types/types";

const RecordPage = ({ params }: { params: Iparams }) => {
   return (
      <div>
         <Header />
         <div className="container">
            <TableRecord userId={params.id} />
         </div>
      </div>
   );
}

export default RecordPage;
