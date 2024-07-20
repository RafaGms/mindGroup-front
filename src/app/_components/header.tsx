import Image from 'next/image';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

const Header = () => {
   return (
      <div>
         <Card className="rounded-none">
            <CardContent className="flex justify-between pb-0 py-6">
               <div>
                  <Image src='/logo.png' width={70} height={40} alt='logo' />
               </div>
               <div className='flex gap-3'>
                  <Button className="flex gap-1  border-primary" >
                     Login
                  </Button>
                  <Button className="flex gap-1 text-primary border-primary" variant={"outline"}>
                     Cadastre-se
                  </Button>
               </div>
            </CardContent>
         </Card>
      </div>
   );
}

export default Header;