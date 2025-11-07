import { useState, useEffect, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import type { UserProfile, ProfileFormData, ProfileErrors } from '../interfaces';

export const useProfile = () => {
  const navigate = useNavigate();
  
  // Estado para los datos del formulario
  const [formData, setFormData] = useState<ProfileFormData>({
    nombre: '',
    email: '',
    descripcion: '',
    horario: '',
    foto: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  // Estado para errores y mensajes de éxito
  const [errors, setErrors] = useState<ProfileErrors>({});
  // Estado para el email original (nuestro ID)
  const [loggedInEmail, setLoggedInEmail] = useState<string | null>(null);
  // Estado de carga
  const [isLoading, setIsLoading] = useState(true);

  // 1. CARGAR DATOS DEL USUARIO AL INICIAR
  useEffect(() => {
    const email = localStorage.getItem("usuarioLogeado");
    if (!email) {
      navigate("/login"); // Si no hay nadie, fuera
      return;
    }

    setLoggedInEmail(email); // Guardamos el email (nuestro ID)
    const allUsers: UserProfile[] = JSON.parse(localStorage.getItem("usuarios") || "[]");
    const currentUser = allUsers.find(u => u.email === email);

    if (currentUser) {
      // Llenamos el formulario con los datos guardados
      setFormData({
        nombre: currentUser.nombre,
        email: currentUser.email,
        descripcion: currentUser.descripcion || '', // Usamos '' si es undefined
        horario: currentUser.horario || '',
        foto: currentUser.foto || '',
        newPassword: '',
        confirmPassword: '',
      });
    } else {
      // El usuario logeado no existe en la BD (raro, pero posible)
      localStorage.removeItem("usuarioLogeado");
      navigate("/login");
    }
    
    setIsLoading(false);
  }, [navigate]);

  // 2. MANEJADOR DE CAMBIOS GENÉRICO
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Limpiar errores al escribir
    if (errors[name as keyof ProfileErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
    if (errors.general) {
      setErrors(prev => ({ ...prev, general: undefined }));
    }
  };

  // 3. MANEJADOR DE GUARDADO
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loggedInEmail) return; // No debería pasar

    const newErrors: ProfileErrors = {};
    let valid = true;

    // --- Validación ---
    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre no puede estar vacío.";
      valid = false;
    }
    
    // Validar contraseña (solo si se está intentando cambiar)
    if (formData.newPassword) {
      if (formData.newPassword.length < 6) {
        newErrors.newPassword = "La contraseña debe tener al menos 6 caracteres.";
        valid = false;
      }
      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = "Las contraseñas no coinciden.";
        valid = false;
      }
    }
    
    // Validar URL de foto (básico)
    if (formData.foto && !formData.foto.startsWith('http')) {
        newErrors.foto = "Por favor, ingrese una URL válida (http...).";
        valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    // --- Lógica de Guardado ---
    const allUsers: UserProfile[] = JSON.parse(localStorage.getItem("usuarios") || "[]");
    const userIndex = allUsers.findIndex(u => u.email === loggedInEmail);

    if (userIndex === -1) {
      setErrors({ general: "Error: No se pudo encontrar al usuario. Intente más tarde." });
      return;
    }

    // Actualizar el usuario
    const oldUser = allUsers[userIndex];
    
    // Creamos el usuario actualizado
    const updatedUser: UserProfile = {
      ...oldUser, // Mantenemos email y password original
      nombre: formData.nombre.trim(),
      descripcion: formData.descripcion.trim(),
      horario: formData.horario.trim(),
      foto: formData.foto.trim(),
      // Si se cambió la contraseña, la actualizamos
      password: formData.newPassword ? formData.newPassword : oldUser.password,
    };

    // Reemplazamos al usuario en el array
    allUsers[userIndex] = updatedUser;
    
    // Guardamos el array actualizado en localStorage
    localStorage.setItem("usuarios", JSON.stringify(allUsers));

    // Mostramos mensaje de éxito
    setErrors({ general: "¡Perfil actualizado con éxito!" });
  };

  // Retornamos todo lo que el componente necesita
  return {
    formData,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
  };
};