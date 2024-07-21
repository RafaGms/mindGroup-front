export interface AuthContextProp {
   isAuthenticated: boolean;
   user: Iuser | null;
   register: (name: string, image: File, email: string, password: string) => Promise<void>;
   signIn: (name: string, email: string) => Promise<void>;
}

export interface Iuser {
   name: string;
   email: string;
}