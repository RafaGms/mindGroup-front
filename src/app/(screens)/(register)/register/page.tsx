import Header from "@/app/_components/header";
import FormRegister from "./_components/formRegister";

const RegisterPage = () => {
   return (
      <div>
         <Header />
         <div className="flex justify-center  items-center">
            <FormRegister />
         </div>
      </div>
   );
}

export default RegisterPage;