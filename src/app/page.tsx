import Image from "next/image";
import Header from "./_components/header";
import { Button } from "./_components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="h-dvh flex flex-col sm:flex-row sm:justify-between justify-center items-center md:container px-6 md:gap-16">
        <div className="max-w-lg w-full flex flex-col gap-5">
          <p className="text-3xl text-center md:text-left md:text-5xl font-bold ">Controle financeiro pessoal com praticidade além das planilhas. Gerencie suas finanças com facilidade e inteligência.</p>
          <div className="flex justify-center md:justify-start">
            <Button className="w-full max-w-48 h-10 text-xl text-white" asChild><Link href='/login'>Comece já</Link></Button>
          </div>
        </div>

        <div className="">
          <Image src='/assets/initialview.png' alt="Initialview" width={600} height={600} />
        </div>
      </div>
    </div>
  );
}
