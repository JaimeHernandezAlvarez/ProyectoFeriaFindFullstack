import { mapProductoApiToApp } from '../helpers/producto-mapper';
import type { RespuestaTodosProductos } from '../interfaces/productos.interfaces';

const BASE_URL = 'https://microprod.onrender.com/api/v1'; 

export const getProductos = async(): Promise<RespuestaTodosProductos> => {
  try {
    const response = await fetch(`${BASE_URL}/productos`);
    
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

    const dataApi = await response.json();

    // --- CORRECCIÓN CLAVE AQUÍ ---
    let listaProductosRaw = [];

    // 1. Verificamos si existe _embedded.productoList (Así viene de tu API según la foto)
    if (dataApi._embedded && dataApi._embedded.productoList) {
        listaProductosRaw = dataApi._embedded.productoList;
    } 
    // 2. Por si acaso en el futuro cambia a un array directo
    else if (Array.isArray(dataApi)) {
        listaProductosRaw = dataApi;
    }

    // 3. Mapeamos
    const productosMapeados = listaProductosRaw.map(mapProductoApiToApp);

    return {
      ok: true,
      statusCode: response.status,
      productos: productosMapeados
    };

  } catch (error) {
    console.error("❌ Error en getProductos:", error);
    return {
      ok: false,
      statusCode: 500,
      productos: []
    };
  }
}