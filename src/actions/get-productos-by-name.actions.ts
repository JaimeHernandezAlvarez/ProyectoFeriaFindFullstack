import type { RespuestaProductoUnico } from '../interfaces/productos.interfaces';
import { getProductos } from './get-productos.actions';

export const getProductoByName = async(query: string): Promise<RespuestaProductoUnico> => {
  
  try {
    // 1. Traemos TODOS los productos reales (reutilizando la función que ya hicimos)
    const { productos } = await getProductos();

    // 2. Filtramos en memoria (Client-side filtering)
    const queryLower = query.toLowerCase();
    const productoEncontrado = productos.find( 
      p => p.nombre.toLowerCase().includes(queryLower) 
    );

    if (!productoEncontrado) {
      throw new Error(`Producto "${query}" no encontrado.`);
    }

    return {
      ok: true,
      statusCode: 200,
      producto: productoEncontrado
    };

  } catch (error) {
    console.error(error);
    throw error;
  }
}