'use client'
import { LogOutIcon } from "lucide-react";
import { Button } from "./ui/button";
import { SheetHeader, SheetTitle } from "./ui/sheet";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";

import { useState } from 'react';

const SideMenu = () => {
   const { user, logout } = useContext(AuthContext);
   const [imageUrl, setImageUrl] = useState('');

   useEffect(() => {
      if (!user?.id) return;
      const fetchTransactions = async () => {
         try {
            const response = await fetch(`http://localhost:8000/image/${user.id}`);
            if (!response.ok) {
               throw new Error("Erro ao buscar imagem");
            }
            // Cria um blob URL para exibir a imagem
            const imageBlob = await response.blob();
            const imageObjectURL = URL.createObjectURL(imageBlob);
            setImageUrl(imageObjectURL);

         } catch (error) {
            console.error(error);
         }
      };

      fetchTransactions();
   }, [user?.id]);

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
                  <div>
                     {user.email}
                  </div>
                  {imageUrl && <img src={imageUrl} alt="User" />}
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
