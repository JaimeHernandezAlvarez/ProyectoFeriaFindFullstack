import type { ProductoProps } from "../interfaces/productos.interfaces";
// src/helpers/producto-mapper.ts

export const mapProductoApiToApp = (apiData: any): ProductoProps => {
  return {
    id: apiData.idProducto, // Tu API usa idProducto
    nombre: apiData.nombre,
    categoria: apiData.idCategoria ? `Categoría ${apiData.idCategoria}` : 'Varios',
    precio: apiData.precio,
    unidad: apiData.unidadMedida,
    imagen: apiData.imagen || "https://via.placeholder.com/300", // Imagen por defecto si viene vacía
    miniatura: apiData.imagen,
    descripcion: "Descripción no disponible en lista",
    stock: 10 // Stock simulado
  };
};