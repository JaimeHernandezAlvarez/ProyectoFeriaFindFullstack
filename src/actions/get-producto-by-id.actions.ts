import type { RespuestaProductoUnico } from "../interfaces/productos.interfaces";
import { mapProductoApiToApp } from "../helpers"; // O "../helpers/producto-mapper" si no tienes index.ts

// 1. CORRECCIÓN: Agregamos /api/v1 a la URL base
const BASE_URL = 'https://microprod.onrender.com/api/v1'; 

export const getProductoById = async(id: number): Promise<RespuestaProductoUnico> => {
  try {
    console.log(`🔎 Buscando producto ID: ${id} en ${BASE_URL}/productos/${id}`);

    // Petición al endpoint específico
    const response = await fetch(`${BASE_URL}/productos/${id}`);

    if (!response.ok) {
       // Si es 404, lanzamos error específico
       if(response.status === 404) throw new Error(`Producto no encontrado (404)`);
       throw new Error(`Error del servidor: ${response.status}`);
    }

    const dataApi = await response.json();
    console.log("📦 Producto único recibido:", dataApi); // Para depurar

    // 2. Mapeamos el objeto (aquí NO hay _embedded, suele venir directo el objeto)
    const productoMapeado = mapProductoApiToApp(dataApi);

    return {
      ok: true,
      statusCode: 200,
      producto: productoMapeado
    };

  } catch (error) {
    console.error("❌ Error en getProductoById:", error);
    throw error; 
  }
}