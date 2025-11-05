import type { RespuestaProductoUnico } from "../interfaces/productos.interfaces";
import { mockProductos } from '../data/mock-productos';

// Renombramos la función y usamos la nueva interfaz
export const getProductoById = async(id: number): Promise<RespuestaProductoUnico> => {

  await new Promise(resolve => setTimeout(resolve, 50)); // Simula lag

  // Buscamos el producto en nuestro mock
  const productoEncontrado = mockProductos.find( p => p.id === id );

  // Simulamos el error 404 si no se encuentra
  if (!productoEncontrado) {
    throw new Error(`Error: Producto con ID ${id} no encontrado.`);
  }

  // Creamos la respuesta simulada
  const data: RespuestaProductoUnico = {
    ok: true,
    statusCode: 200,
    producto: productoEncontrado
  };

  return data;
}