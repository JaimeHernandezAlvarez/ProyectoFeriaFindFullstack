import { useState, type FormEvent} from 'react';
import { useNavigate } from 'react-router-dom';
import type { RegisterFormData, RegisterErrors } from '../interfaces/auth.interfaces';
import { registerUserAction } from '../actions/auth.actions'; // 👈 IMPORTAR ACCIÓN

export const useRegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterFormData>({
    nombre: '', email: '', password: '', confirmPassword: '',
  });
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [loading, setLoading] = useState(false); // 👈 NUEVO

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // ... (Tu lógica existente se mantiene igual) ...
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    // ... (Mantén tu validación de contraseñas y email aquí) ...
    // Solo resumí por espacio, pero NO borres tu código de validación
    if (formData.password !== formData.confirmPassword) {
        setErrors({ confirmPassword: "No coinciden" });
        return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    // --- NUEVA LÓGICA CON API ---
    const response = await registerUserAction(formData);

    if (response.ok) {
      // Si el registro es exitoso, logeamos automáticamente al usuario
      localStorage.setItem("usuarioLogeado", formData.email);
      navigate("/"); 
    } else {
      setErrors({ email: response.message || "Error al registrarse. Intente otro email." });
    }

    setLoading(false);
  };

  return { formData, errors, handleChange, handleSubmit, loading };
};