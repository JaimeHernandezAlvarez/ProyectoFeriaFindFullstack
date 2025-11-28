import type { LoginFormData, RegisterFormData, AuthResponse } from '../interfaces/auth.interfaces';
import type { ProfileFormData } from '../interfaces/auth.interfaces';
const BASE_URL = 'https://microuser.onrender.com/api/v1';

// --- LOGIN ---
export const loginUserAction = async (formData: LoginFormData): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/usuarios/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        correoElectronico: formData.email, // 👈 Mapeo manual para el backend
        password: formData.password
      })
    });

    // Si la API devuelve 401 (no autorizado) o 404, lanzamos error
    if (!response.ok) {
        throw new Error('Credenciales incorrectas');
    }

    const data = await response.json();

    return {
      ok: true,
      usuario: data // Asumimos que la API devuelve el objeto usuario directamente o dentro de data
    };

  } catch (error) {
    console.error("Error en Login:", error);
    return { ok: false, message: 'Email o contraseña incorrectos' };
  }
};

// --- REGISTRO ---
// --- REGISTRO ---
// --- REGISTRO ---
export const registerUserAction = async (formData: RegisterFormData): Promise<AuthResponse> => {
  try {
    // 1. Preparamos el payload EXACTO según tu Swagger
    const payload = {
      // Frontend (formData)  ->  Backend (Swagger)
      nombreUsuario:      formData.nombre,           // nombre -> nombreUsuario
      correoElectronico:  formData.email,            // email -> correoElectronico
      contrasena:         formData.password,         // password -> contrasena
      
      // Datos obligatorios que el formulario no pide (Enviamos valores por defecto)
      foto:               "https://cdn-icons-png.flaticon.com/512/149/149071.png",
      descripcion:        "Nuevo usuario registrado desde la web",
      horario:            "Disponible"
    };

    console.log("📤 Enviando Payload JSON:", payload);

    const response = await fetch(`${BASE_URL}/usuarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Error del Backend:", response.status, errorText);
      throw new Error(`Error ${response.status}: No se pudo registrar.`);
    }

    const data = await response.json();
    console.log("✅ Registro exitoso:", data);
    
    return { 
        ok: true, 
        usuario: data 
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
// src/actions/auth.actions.ts
export const getUserByEmailAction = async (email: string): Promise<AuthResponse> => {
    try {
        console.log(`🔎 Buscando usuario por QueryParam: ${email}`);

        // CORRECCIÓN FINAL: Cambiamos 'correoElectronico' por 'email'
        const response = await fetch(`${BASE_URL}/usuarios/buscar?email=${encodeURIComponent(email)}`);
        
        if (!response.ok) {
            console.error(`Error HTTP: ${response.status}`);
            return { ok: false, message: 'Usuario no encontrado' };
        }
        
        const data = await response.json();
        console.log("📦 Usuario recibido:", data);

        // Como tu backend devuelve 'EntityModel', los datos del usuario suelen venir
        // en la raíz del objeto JSON (junto con "_links"). 
        // Así que devolvemos 'data' directamente.
        return { ok: true, usuario: data };

    } catch (error) {
        console.error("❌ Error:", error);
        return { ok: false, message: 'Error de conexión' };
    }
};

// --- 4. ACTUALIZAR USUARIO (PUT) ---
// En src/actions/auth.actions.ts

export const updateUserAction = async (id: number, formData: ProfileFormData): Promise<AuthResponse> => {
    try {
        // 1. Payload base SIN la propiedad contrasena
        const payload: any = {
            idUsuario: id,
            nombreUsuario: formData.nombre,
            correoElectronico: formData.email,
            descripcion: formData.descripcion,
            horario: formData.horario,
            foto: formData.foto
        };

        // 2. Solo agregamos la propiedad SI Y SOLO SI hay texto real
        // Como ahora los inputs están ocultos, formData.newPassword estará vacío ("")
        if (formData.newPassword && formData.newPassword.trim().length > 0) {
            payload.contrasena = formData.newPassword;
        } 
        
        // DEBUG: Mira la consola. Si actualizas el nombre, NO debe aparecer 'contrasena' aquí.
        console.log("📤 Payload a enviar:", payload);

        const response = await fetch(`${BASE_URL}/usuarios/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) throw new Error(`Error ${response.status}`);
        const data = await response.json();
        return { ok: true, usuario: data };

    } catch (error: any) {
        return { ok: false, message: error.message };
    }
};