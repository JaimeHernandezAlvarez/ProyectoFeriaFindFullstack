import { useState, type FormEvent} from 'react';
import { useNavigate } from 'react-router-dom';
import type { RegisterFormData, RegisterErrors } from '../interfaces/auth.interfaces';

// (NOTA: Deberás crear 'auth.interfaces.ts' para estas interfaces)

export const useRegisterForm = () => {
  // Hook de React Router para la navegación
  const navigate = useNavigate();

  // Estado para todos los campos del formulario en un solo objeto
  const [formData, setFormData] = useState<RegisterFormData>({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Estado para todos los mensajes de error en un solo objeto
  const [errors, setErrors] = useState<RegisterErrors>({});

  // Función para manejar los cambios en CUALQUIER input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Actualiza el estado del formulario
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
    
    // Limpia el error de ese campo en cuanto el usuario empieza a escribir
    if (errors[name as keyof RegisterErrors]) {
      setErrors((prev: any) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Función de validación (extraída de tu .js)
  const validateForm = (): boolean => {
    const { nombre, email, password, confirmPassword } = formData;
    const newErrors: RegisterErrors = {};
    let valid = true;

    if (!nombre.trim()) {
      newErrors.nombre = "Por favor, ingrese un nombre de usuario.";
      valid = false;
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Ingrese un correo electrónico válido.";
      valid = false;
    }

    if (password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres.";
      valid = false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden.";
      valid = false;
    }

    setErrors(newErrors); // Actualiza el estado de errores
    return valid;
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevenir recarga de página

    // Si la validación falla, no continuar
    if (!validateForm()) {
      return;
    }

    // --- Lógica de éxito (copiada de tu .js) ---
    const { nombre, email, password } = formData;

    const usuario = {
      nombre: nombre.trim(),
      email: email.trim(),
      password: password, // En una app real, NUNCA guardarías la contraseña así
    };

    let usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // Marcar como logeado
    localStorage.setItem("usuarioLogeado", email.trim());

    // Redirigir al inicio (index)
    navigate("/"); 
  };

  // Retornamos todo lo que el componente necesitará
  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
  };
};

