import type { ProductoProps } from "../interfaces/productos.interfaces";

// Exportamos un arreglo de productos que sigue nuestra nueva interfaz
export const mockProductos: ProductoProps[] = [
  {
    id: 1,
    nombre: "Tomate Limachino",
    categoria: "Verdura",
    precio: 1890,
    unidad: "kg",
    imagen: "https://ejemplo.com/images/tomate.jpg", // Reemplaza con una URL real
    miniatura: "https://ejemplo.com/images/tomate_thumb.jpg",
    origen: "Limache, Valle Central",
    descripcion: "Tomate jugoso y sabroso, ideal para ensaladas.",
    stock: 100,
  },
  {
    id: 2,
    nombre: "Palta Hass",
    categoria: "Fruta", // Técnicamente es una fruta!
    precio: 4990,
    unidad: "kg",
    imagen: "https://ejemplo.com/images/palta.jpg",
    miniatura: "https://ejemplo.com/images/palta_thumb.jpg",
    origen: "Quillota",
    descripcion: "Palta cremosa, perfecta para tostadas.",
    stock: 80,
  },
  {
    id: 3,
    nombre: "Papa Fina",
    categoria: "Verdura",
    precio: 1290,
    unidad: "kg",
    imagen: "https://ejemplo.com/images/papa.jpg",
    miniatura: "https://ejemplo.com/images/papa_thumb.jpg",
    origen: "Sur de Chile",
    descripcion: "Papa especial para freír o cocer.",
    stock: 200,
  },
];