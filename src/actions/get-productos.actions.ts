import type { RespuestaTodosProductos } from '../interfaces/productos.interfaces';
import { mockProductos } from '../data/mock-productos';

// Renombramos la función
export const getProductos = async(): Promise<RespuestaTodosProductos> => {
  
  // Simulamos una llamada asíncrona (como si fuera un fetch)
  // Esto es para que el componente que llame a getProductos pueda usar await
  await new Promise(resolve => setTimeout(resolve, 50)); // Simula 50ms de lag

  // Creamos la respuesta simulada con la estructura de la API
  const data: RespuestaTodosProductos = {
    ok: true,
    statusCode: 200,
    productos: mockProductos // Usamos nuestros datos locales
  };

  return data;
}