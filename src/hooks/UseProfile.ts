import { useState, useEffect, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ProfileFormData, ProfileErrors } from '../interfaces/auth.interfaces'; // Asegúrate que la ruta sea correcta
import { getUserByEmailAction, updateUserAction } from '../actions/auth.actions';

export const useProfile = () => {
  const navigate = useNavigate();
  
  // Estado para el formulario
  const [formData, setFormData] = useState<ProfileFormData>({
    nombre: '',
    email: '',
    descripcion: '',
    horario: '',
    foto: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  // Estado para errores y mensajes
  const [errors, setErrors] = useState<ProfileErrors>({});
  
  // Estados para manejar la lógica de API
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<number | null>(null);

  // 1. CARGAR DATOS DEL USUARIO (API)
  useEffect(() => {
    const cargarPerfil = async () => {
      // Obtenemos el email guardado en el login
      const emailStorage = localStorage.getItem("usuarioLogeado");
      
      if (!emailStorage) {
        navigate("/login");
        return;
      }

      // Llamamos a la API
      const respuesta = await getUserByEmailAction(emailStorage);

      if (respuesta.ok && respuesta.usuario) {
        const u = respuesta.usuario;
        
        // Guardamos el ID para poder actualizar después
        setUserId(u.idUsuario || 0);
        // Guardamos la contraseña actual (hash) por si no la quieren cambiar

        // Rellenamos el formulario mapeando los nombres del backend a nuestro frontend
        setFormData({
            nombre: u.nombreUsuario || '',    // Backend: nombreUsuario -> Frontend: nombre
            email: u.correoElectronico || '', // Backend: correoElectronico -> Frontend: email
            descripcion: u.descripcion || '',
            horario: u.horario || '',
            foto: u.foto || '',
            newPassword: '',
            confirmPassword: ''
        });
      } else {
        // Si falla (ej: borraron el usuario de la DB), cerramos sesión
        console.error("Usuario no encontrado en la nube");
        localStorage.removeItem("usuarioLogeado");
        navigate("/login");
      }
      
      setIsLoading(false);
    };

    cargarPerfil();
  }, [navigate]);

  // 2. MANEJADOR DE CAMBIOS
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Limpiar errores
    if (errors[name as keyof ProfileErrors]) setErrors(prev => ({ ...prev, [name]: undefined }));
    if (errors.general) setErrors(prev => ({ ...prev, general: undefined }));
  };

  // 3. MANEJADOR DE GUARDADO (UPDATE)
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId) return; 

    // --- VALIDACIONES LOCALES ---
    const newErrors: ProfileErrors = {};
    let valid = true;

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio.";
      valid = false;
    }
    
    // Si escribió algo en nueva contraseña, validamos
    if (formData.newPassword) {
      if (formData.newPassword.length < 6) {
        newErrors.newPassword = "Mínimo 6 caracteres.";
        valid = false;
      }
      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = "Las contraseñas no coinciden.";
        valid = false;
      }
    }

    if (formData.foto && !formData.foto.startsWith('http')) {
        newErrors.foto = "La URL de la imagen debe ser válida (http...).";
        valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    // --- LLAMADA A LA API ---
    const resultado = await updateUserAction(userId, formData);

    if (resultado.ok) {
        setErrors({ general: "¡Perfil actualizado correctamente en la nube!" });
        // Opcional: Limpiar campos de contraseña
        setFormData(prev => ({...prev, newPassword: '', confirmPassword: ''}));
    } else {
        setErrors({ general: resultado.message || "Error al actualizar." });
    }

    setIsLoading(false);
  };

  return {
    formData,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
  };
};