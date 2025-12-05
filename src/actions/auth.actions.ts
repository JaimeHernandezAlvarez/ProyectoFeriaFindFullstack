import type { LoginFormData, RegisterFormData, AuthResponse, ProfileFormData } from '../interfaces/auth.interfaces';

const BASE_URL = 'https://microuser.onrender.com/api/v1';

// 🛠️ UTILIDAD: Función para obtener el token y armar los headers de autorización
const getAuthHeaders = () => {
  const token = localStorage.getItem('token'); // Recuperamos el token guardado
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}) // Si hay token, lo agregamos
  };
};

// --- LOGIN ---
export const loginUserAction = async (formData: LoginFormData): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/usuarios/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, // Login es público, no lleva token
      body: JSON.stringify({
        correoElectronico: formData.email,
        password: formData.password
      })
    });

    if (!response.ok) {
        throw new Error('Credenciales incorrectas');
    }

    const data = await response.json();
    
    // 👇 LOGICA JWT: Guardamos el token si viene en la respuesta
    if (data.token) {
      localStorage.setItem('token', data.token);
      console.log("🔑 Token guardado correctamente");
    }

    return {
      ok: true,
      usuario: data, // Si 'data' contiene info del usuario + token
      token: data.token
    };

  } catch (error) {
    console.error("Error en Login:", error);
    return { ok: false, message: 'Email o contraseña incorrectos' };
  }
};

// --- REGISTRO ---
export const registerUserAction = async (formData: RegisterFormData): Promise<AuthResponse> => {
  try {
    const payload = {
      nombreUsuario:      formData.nombre,
      correoElectronico:  formData.email,
      contrasena:         formData.password,
      foto:               "https://cdn-icons-png.flaticon.com/512/149/149071.png",
      descripcion:        "Nuevo usuario registrado desde la web",
      horario:            "Disponible"
    };

    console.log("📤 Enviando Payload JSON:", payload);

    const response = await fetch(`${BASE_URL}/usuarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, // Registro es público
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: No se pudo registrar.`);
    }

    const data = await response.json();
    
    // 👇 LOGICA JWT: Al registrarse, usualmente el backend loguea automáticamente
    if (data.token) {
      localStorage.setItem('token', data.token);
      console.log("🔑 Token guardado tras registro");
    }
    
    return { 
        ok: true, 
        usuario: data,
        token: data.token
    };

  } catch (error: any) {
    console.error("❌ Excepción:", error);
    return { 
        ok: false, 
        message: 'Error al intentar registrarse.' 
    };
  }
};

// --- 3. OBTENER USUARIO POR EMAIL ---
export const getUserByEmailAction = async (email: string): Promise<AuthResponse> => {
    try {
        console.log(`🔎 Buscando usuario por QueryParam: ${email}`);

        // 👇 CAMBIO CLAVE: Agregamos el segundo parámetro con los headers
        const response = await fetch(`${BASE_URL}/usuarios/buscar?email=${encodeURIComponent(email)}`, {
            method: 'GET',           // Es buena práctica explicitar el método
            headers: getAuthHeaders() // <--- ¡AQUÍ ESTÁ LA SOLUCIÓN! Enviamos el token.
        });
        
        if (!response.ok) {
            console.error(`Error HTTP: ${response.status}`);
            return { ok: false, message: 'Usuario no encontrado o sesión expirada' };
        }
        
        const data = await response.json();
        return { ok: true, usuario: data };

    } catch (error) {
        console.error("❌ Error:", error);
        return { ok: false, message: 'Error de conexión' };
    }
};

// --- 4. ACTUALIZAR USUARIO (PUT) ---
// 🔒 ESTA RUTA DEBERÍA ESTAR PROTEGIDA
export const updateUserAction = async (id: number, formData: ProfileFormData): Promise<AuthResponse> => {
    try {
        const payload: any = {
            idUsuario: id,
            nombreUsuario: formData.nombre,
            correoElectronico: formData.email,
            descripcion: formData.descripcion,
            horario: formData.horario,
            foto: formData.foto
        };

        if (formData.newPassword && formData.newPassword.trim().length > 0) {
            payload.contrasena = formData.newPassword;
        } 

        // 👇 CAMBIO IMPORTANTE: Usamos los headers con Token
        const response = await fetch(`${BASE_URL}/usuarios/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(), // <--- Aquí inyectamos el JWT
            body: JSON.stringify(payload)
        });
        
        // Manejo especial para token expirado (401 o 403)
        if (response.status === 401 || response.status === 403) {
             // Opcional: podrías forzar logout aquí
             throw new Error("Sesión expirada o no autorizada");
        }

        if (!response.ok) throw new Error(`Error ${response.status}`);
        
        const data = await response.json();
        return { ok: true, usuario: data };

    } catch (error: any) {
        return { ok: false, message: error.message };
    }
};