// middleware.ts
import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
   const cookieHeader = request.headers.get('cookie');
   const cookies = parseCookies(cookieHeader);
   const token = cookies['finance-token'];

   if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
      console.log('Token ausente. Redirecionando para /login');
      return NextResponse.redirect(new URL('/login', request.url));
   }
   return NextResponse.next();
}

// Função auxiliar para analisar cookies
function parseCookies(cookieHeader: string | null) {
   const cookies: Record<string, string> = {};
   if (cookieHeader) {
      cookieHeader.split(';').forEach(cookie => {
         const [name, ...rest] = cookie.split('=');
         cookies[name.trim()] = rest.join('=').trim();
      });
   }
   return cookies;
}

export const config = {
   matcher: ['/dashboard/:path*'],
};
