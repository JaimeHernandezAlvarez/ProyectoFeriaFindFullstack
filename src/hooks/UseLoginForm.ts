import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import type { LoginFormData, LoginErrors } from '../interfaces/auth.interfaces';
import { loginUserAction } from '../actions/auth.actions';

export const useLoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({ email: '', password: '' });
  const [errors, setErrors] = useState<LoginErrors>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof LoginErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
     const { email, password } = formData;
     if (!email.trim()) return false;
     if (!password.trim()) return false;
     return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    const response = await loginUserAction(formData);

    // 👇 AQUÍ ESTÁ EL CAMBIO IMPORTANTE
    if (response.ok) {
      // Como el backend solo devuelve el token, guardamos el email 
      // DIRECTAMENTE DEL FORMULARIO (formData.email)
      localStorage.setItem("usuarioLogeado", formData.email); 
      
      console.log("✅ Login exitoso. Usuario guardado:", formData.email);
      navigate("/");
    } else {
      setErrors({ email: response.message || "Error al iniciar sesión" });
    }
    
    setLoading(false);
  };

  return { formData, errors, handleChange, handleSubmit, loading };
};