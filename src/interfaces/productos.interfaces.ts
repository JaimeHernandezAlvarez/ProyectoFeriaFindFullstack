// Archivo sugerido: src/interfaces/productos.interfaces.ts

/**
 * Interfaz para un solo Producto de la feria.
 * Reemplaza a 'robotsProps'.
 */
export interface ProductoProps {
  id: number;
  nombre: string;         // Ej: "Tomate Limachino", "Papa Fina"
  categoria: string;      // Ej: "Verdura", "Fruta", "Abarrotes"
  precio: number;         // Precio (podría ser por unidad o kg)
  unidad: string;         // Ej: "kg", "unidad", "atado", "bandeja"
  imagen: string;         // URL de la imagen principal (reemplaza 'avatar')
  miniatura?: string;    // URL de imagen pequeña (reemplaza 'sprite1', opcional)
  origen?: string;       // Ej: "Valle Central", "Limache" (opcional)
  descripcion: string;    // Información del producto (reemplaza 'info')
  stock: number;          // Cantidad disponible (reemplaza 'series' o es nueva)
}

/**
 * Interfaz para la respuesta de la API al obtener TODOS los productos.
 * Reemplaza a 'robotsAllProps'.
 */
export interface RespuestaTodosProductos {
  ok: boolean;
  statusCode: number;
  productos: ProductoProps[]; // Cambiado de 'robots'
}

/**
 * Interfaz para la respuesta de la API al obtener UN SOLO producto
 * (ya sea por ID o por nombre).
 * Reemplaza a 'robotNameProps' y 'robotIdProps'.
 */
export interface RespuestaProductoUnico {
  ok: boolean;
  statusCode: number;
  producto: ProductoProps; // Cambiado de 'robot' o 'robotABuscar'
}