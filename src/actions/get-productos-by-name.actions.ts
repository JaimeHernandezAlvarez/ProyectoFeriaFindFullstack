import type { RespuestaProductoUnico } from '../interfaces/productos.interfaces';
import { mockProductos } from '../data/mock-productos';

// Renombramos la función
// Asumimos que la búsqueda por nombre devuelve un solo producto (búsqueda exacta)
export const getProductoByName = async(query: string): Promise<RespuestaProductoUnico> => {
  
  await new Promise(resolve => setTimeout(resolve, 50)); // Simula lag

  // Normalizamos la búsqueda (ignoramos mayúsculas/minúsculas)
  const queryLower = query.toLowerCase();
  const productoEncontrado = mockProductos.find( 
    p => p.nombre.toLowerCase() === queryLower 
  );

  // Simulamos el error si no se encuentra
  if (!productoEncontrado) {
    throw new Error(`Error: Producto con nombre "${query}" no encontrado.`);
  }

  const data: RespuestaProductoUnico = {
    ok: true,
    statusCode: 200,
    producto: productoEncontrado
  };

  return data;
}