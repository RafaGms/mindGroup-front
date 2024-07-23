'use client'
import Image from 'next/image';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import Link from 'next/link';
import { AuthContext } from '../context/authContext';
import { useContext } from 'react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import SideMenu from './sideMenu';
import { Menu } from 'lucide-react';


const Header = () => {
   const { user } = useContext(AuthContext)
   return (
      <div>
         <Card className="rounded-none">
            <CardContent className="flex justify-between pb-0 py-6">
               <div>
                  <Image src='/assets/logo.png' width={70} height={70} alt='logo' />
               </div>
               <div className='flex gap-3'>
                  {user?.name ? (
                     <Sheet>
                        <SheetTrigger asChild>
                           <Button className="px-2"><Menu /></Button>
                        </SheetTrigger>
                        <SheetContent>
                           <SideMenu />
                        </SheetContent>
                     </Sheet>
                  ) : (
                     <div>
                        <div className='flex gap-3'>
                           <Button className="flex gap-1 text-white border-primary" >
                              <Link href='/login'>Login</Link>
                           </Button>
                           <Button className="flex gap-1 text-primary border-primary" variant={"outline"} asChild>
                              <Link href='/register'>Cadastre-se</Link>
                           </Button>
                        </div>
                     </div>
                  )
                  }
               </div >
            </CardContent >
         </Card >
      </div >
   );
}

export default Header;