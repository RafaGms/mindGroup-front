'use client'
import { LogOutIcon } from "lucide-react";
import { Button } from "./ui/button";
import { SheetHeader, SheetTitle } from "./ui/sheet";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const SideMenu = () => {
   const { user } = useContext(AuthContext);

   const handleClickLogout = () => {
      console.log('LOGOUT')
   }

   return (
      <div>
         <SheetHeader className="border-b mb-4 p-4">
            <SheetTitle>Menu</SheetTitle>
         </SheetHeader>

         {user?.name && (
            <div className="flex justify-between items-center px-5 py-6">
               <div className="flex items-center gap-2 ">
                  <div>
                     {user.email}
                  </div>
               </div>
               <div>
                  <Button size={"icon"} onClick={handleClickLogout} variant={"secondary"}>
                     <LogOutIcon />
                  </Button>
               </div>
            </div>
         )}
      </div>
   );
}

export default SideMenu;