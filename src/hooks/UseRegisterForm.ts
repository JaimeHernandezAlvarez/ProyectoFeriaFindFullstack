import { useState, type FormEvent} from 'react';
import { useNavigate } from 'react-router-dom';
import type { RegisterFormData, RegisterErrors } from '../interfaces/auth.interfaces';
import { registerUserAction } from '../actions/auth.actions';

export const useRegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterFormData>({
    nombre: '', email: '', password: '', confirmPassword: '',
  });
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
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

    const response = await registerUserAction(formData);

    if (response.ok) {
      // ✅ LOGICA JWT:
      // El action ya guardó el token. Nosotros guardamos el email para referencia.
      localStorage.setItem("usuarioLogeado", formData.email);
      navigate("/"); 
    } else {
      setErrors({ email: response.message || "Error al registrarse. Intente otro email." });
    }

    setLoading(false);
  };

  return { formData, errors, handleChange, handleSubmit, loading };
};