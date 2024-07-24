import { Button } from "@/app/_components/ui/button";
import FromLogin from "./_components/formLogin";
import Header from "@/app/_components/header";

const LoginPage = () => {
   return (
      <div>
         <Header />
         <div className="flex flex-col justify-center  items-center">
            <FromLogin />
         </div>
      </div>
   );
}

export default LoginPage;