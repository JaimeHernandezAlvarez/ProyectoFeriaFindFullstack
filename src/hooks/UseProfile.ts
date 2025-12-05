import { useState, useEffect, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ProfileFormData, ProfileErrors } from '../interfaces/auth.interfaces';
import { getUserByEmailAction, updateUserAction } from '../actions/auth.actions';

export const useProfile = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<ProfileFormData>({
    nombre: '', email: '', descripcion: '', horario: '', foto: '', newPassword: '', confirmPassword: '',
  });
  
  const [errors, setErrors] = useState<ProfileErrors>({});
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<number | null>(null);

  // 1. CARGAR DATOS
  useEffect(() => {
    const cargarPerfil = async () => {
      const token = localStorage.getItem("token");         // 👈 Validamos Token
      const emailStorage = localStorage.getItem("usuarioLogeado"); // 👈 Validamos Email

      // Si falta alguno, no hay sesión válida
      if (!token || !emailStorage) {
        handleLogout(); // Limpia y redirige
        return;
      }

      const respuesta = await getUserByEmailAction(emailStorage);

      if (respuesta.ok && respuesta.usuario) {
        const u = respuesta.usuario;
        setUserId(u.idUsuario || 0);
        setFormData({
            nombre: u.nombreUsuario || '',
            email: u.correoElectronico || '',
            descripcion: u.descripcion || '',
            horario: u.horario || '',
            foto: u.foto || '',
            newPassword: '',
            confirmPassword: ''
        });
      } else {
        console.error("Usuario no encontrado o token inválido");
        handleLogout();
      }
      
      setIsLoading(false);
    };

    cargarPerfil();
  }, [navigate]);

  // 2. LOGOUT (NUEVA FUNCIÓN)
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuarioLogeado");
    localStorage.removeItem("userData");
    navigate("/login");
  };

  // 3. MANEJADOR DE CAMBIOS
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof ProfileErrors]) setErrors(prev => ({ ...prev, [name]: undefined }));
    if (errors.general) setErrors(prev => ({ ...prev, general: undefined }));
  };

  // 4. UPDATE
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId) return; 

    // ... (Tu validación local se mantiene igual) ...
    const newErrors: ProfileErrors = {};
    let valid = true;
    if (!formData.nombre.trim()) { newErrors.nombre = "El nombre es obligatorio."; valid = false; }
    if (formData.newPassword) {
      if (formData.newPassword.length < 6) { newErrors.newPassword = "Mínimo 6 caracteres."; valid = false; }
      if (formData.newPassword !== formData.confirmPassword) { newErrors.confirmPassword = "Las contraseñas no coinciden."; valid = false; }
    }
    if (!valid) { setErrors(newErrors); return; }

    setIsLoading(true);

    // Al llamar a updateUserAction, esta usará 'getAuthHeaders' (que creamos antes)
    // para leer el token del localStorage y enviarlo.
    const resultado = await updateUserAction(userId, formData);

    if (resultado.ok) {
        setErrors({ general: "¡Perfil actualizado correctamente!" });
        setFormData(prev => ({...prev, newPassword: '', confirmPassword: ''}));
    } else {
        // Si el token expiró, el action podría devolver un error específico
        if (resultado.message === "Sesión expirada o no autorizada") {
            handleLogout();
        } else {
            setErrors({ general: resultado.message || "Error al actualizar." });
        }
    }

    setIsLoading(false);
  };

  return {
    formData,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
    handleLogout // 👈 Exportamos esto para usarlo en el botón
  };
};