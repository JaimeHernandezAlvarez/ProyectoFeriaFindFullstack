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

// Representa el objeto de usuario completo guardado en localStorage
export interface UserProfile {
  nombre: string;
  email: string;      // Este es el 'ID'
  password: string;   // La contraseña guardada
  descripcion?: string;
  horario?: string;
  foto?: string;      // URL de la foto de perfil
}

// Representa los datos del formulario de perfil
export interface ProfileFormData {
  nombre: string;
  email: string;      // Lo mostraremos, pero no dejaremos que se edite
  descripcion: string;
  horario: string;
  foto: string;
  newPassword: string; // Campo separado para cambiar contraseña
  confirmPassword: string;
}

// Representa los errores de validación del formulario
export interface ProfileErrors {
  nombre?: string;
  foto?: string;
  newPassword?: string;
  confirmPassword?: string;
  general?: string; // Para mensajes de éxito o error
}