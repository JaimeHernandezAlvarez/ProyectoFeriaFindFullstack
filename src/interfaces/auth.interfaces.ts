//Registro
export interface RegisterFormData {
   nombre: string;
   email: string;
   password: string;
   confirmPassword: string;
}

export interface RegisterErrors {
   nombre?: string;
   email?: string;
   password?: string;
   confirmPassword?: string;
}

//Login
export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginErrors {
  email?: string;
  password?: string;
}