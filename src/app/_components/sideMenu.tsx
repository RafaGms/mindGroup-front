'use client'
import { LogOutIcon } from "lucide-react";
import { Button } from "./ui/button";
import { SheetHeader, SheetTitle } from "./ui/sheet";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

import Link from "next/link";

const SideMenu = () => {
   const { user, logout } = useContext(AuthContext);

   const handleClickLogout = () => {
      logout();
   }

   return (
      <div>
         <SheetHeader className="border-b mb-4 p-4">
            <SheetTitle>Menu</SheetTitle>
         </SheetHeader>
         {user?.name && (
            <div className="flex justify-between items-center px-5 py-6">
               <div className="flex items-center gap-2 ">
                  Conta:
                  <div>
                     {user.email}
                  </div>
               </div>
               <div>
                  <Button size={"icon"} onClick={handleClickLogout}>
                     <LogOutIcon />
                  </Button>
               </div>
            </div>
         )}
         <div>
            <div className='flex flex-col gap-5  items-center'>
               <Button asChild variant={'outline'} className="w-full">
                  <Link href='/'>Início</Link>
               </Button>
               <Button asChild variant={'outline'} className="w-full">
                  <Link href='/dashboard'>Visão geral</Link>
               </Button>
               <Button asChild variant={'outline'} className="w-full">
                  <Link href={`/record/${user?.id}`}>Relatórios</Link>
               </Button>
            </div>
         </div>
      </div>
   );
}

export default SideMenu;
