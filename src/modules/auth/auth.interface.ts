export interface ILoginUser{
    email:string;
    password:string;
}
export  interface IRegisterUser{
  email:string;
  password:string ; 
  name:string;
//   role:string;
   role: "CUSTOMER" | "PROVIDER";
}
