import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import type { LoginFormData, LoginErrors } from '../interfaces/auth.interfaces';

export const useLoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  // Un solo estado de error para ambos campos
  const [errors, setErrors] = useState<LoginErrors>({});

  // Manejador de cambios genérico
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Limpia el error al escribir
    if (errors[name as keyof LoginErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Función de validación
  const validateForm = (): boolean => {
    const { email, password } = formData;
    const newErrors: LoginErrors = {};
    let valid = true;

    if (!email.trim()) {
      newErrors.email = "Por favor, ingrese su email.";
      valid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Por favor, ingrese su contraseña.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Manejador del envío
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // --- Lógica de Autenticación (de tu .js) ---
    const { email, password } = formData;
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    
    // NOTA: En una app real, la contraseña NUNCA se compara así.
    // Esto es solo para replicar tu lógica.
    const usuario = usuarios.find((u: any) => 
      u.email === email && u.password === password
    );

    if (usuario) {
      // Éxito: Guardar sesión y redirigir
      localStorage.setItem("usuarioLogeado", email);
      navigate("/"); // Redirige al inicio
    } else {
      // Fracaso: Mostrar error
      setErrors({ email: "Email o contraseña incorrectos." });
    }
  };

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
  };
};