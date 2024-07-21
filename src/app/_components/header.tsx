import Image from 'next/image';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import Link from 'next/link';

const Header = () => {
   return (
      <div>
         <Card className="rounded-none">
            <CardContent className="flex justify-between pb-0 py-6">
               <div>
                  <Image src='/assets/logo.png' width={70} height={70} alt='logo' />
               </div>
               <div className='flex gap-3'>
                  <Button className="flex gap-1 text-white border-primary" >
                     <Link href='/login'>Login</Link>
                  </Button>
                  <Button className="flex gap-1 text-primary border-primary" variant={"outline"} asChild>
                     <Link href='/register'>Cadastre-se</Link>
                  </Button>
               </div>
            </CardContent>
         </Card>
      </div>
   );
}

export default Header;