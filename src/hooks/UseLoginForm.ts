import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import type { LoginFormData, LoginErrors } from '../interfaces/auth.interfaces';
import { loginUserAction } from '../actions/auth.actions'; // 👈 IMPORTAR ACCIÓN

export const useLoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({ email: '', password: '' });
  const [errors, setErrors] = useState<LoginErrors>({});
  const [loading, setLoading] = useState(false); // 👈 NUEVO ESTADO

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof LoginErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
     // ... (Tu validación existente se mantiene igual) ...
     const { email, password } = formData;
     if (!email.trim()) return false;
     if (!password.trim()) return false;
     return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true); // Bloqueamos botón

    // --- NUEVA LÓGICA CON API ---
    const response = await loginUserAction(formData);

    if (response.ok && response.usuario) {
      // 1. Guardamos el email o token en localStorage para mantener sesión
      localStorage.setItem("usuarioLogeado", response.usuario.correoElectronico);
      // Opcional: Guardar más datos del usuario si quieres
      localStorage.setItem("userData", JSON.stringify(response.usuario));
      
      navigate("/");
    } else {
      setErrors({ email: response.message || "Error al iniciar sesión" });
    }
    
    setLoading(false);
  };

  return { formData, errors, handleChange, handleSubmit, loading };
};