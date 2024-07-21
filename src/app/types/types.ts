export interface AuthContextProp {
   register: (name: string, image: File, email: string, password: string) => Promise<void>;
}