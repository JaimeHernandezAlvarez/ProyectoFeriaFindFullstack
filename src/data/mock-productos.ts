import type { ProductoProps } from "../interfaces/productos.interfaces";

// Exportamos un arreglo de productos que sigue nuestra nueva interfaz
export const mockProductos: ProductoProps[] = [
  {
    id: 1,
    nombre: "Tomate Limachino",
    categoria: "Verdura",
    precio: 1890,
    unidad: "kg",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/8/89/Tomate_2009.jpg", //actualizar por imagenes flickr
    miniatura: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomate_2009.jpg/200px-Tomate_2009.jpg",
    origen: "Limache, Valle Central",
    descripcion: "Tomate jugoso y sabroso, ideal para ensaladas.",
    stock: 100,
  },
  {
    id: 2,
    nombre: "Palta Hass",
    categoria: "Fruta", // tecnicamente es una fruta
    precio: 4990,
    unidad: "kg",
    // enlace directo desde flickr (valido)
    imagen: "https://live.staticflickr.com/3547/3297970578_ef9c57a94d_k.jpg",
    miniatura: "https://live.staticflickr.com/3547/3297970578_ef9c57a94d_k.jpg",
    origen: "Quillota",
    descripcion: "Palta cremosa, perfecta para tostadas o ensaladas.",
    stock: 80,
  },
  {
    id: 3,
    nombre: "Papa Fina",
    categoria: "Verdura",
    precio: 1290,
    unidad: "kg",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Chilean_potatoes.jpg", //actualizar por imagenes flickr
    miniatura: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Chilean_potatoes.jpg/200px-Chilean_potatoes.jpg",
    origen: "Sur de Chile",
    descripcion: "Papa especial para freir o cocer.",
    stock: 200,
  },

  // FRUTAS
  {
    id: 4,
    nombre: "Manzana Fuji",
    categoria: "Fruta",
    precio: 1690,
    unidad: "kg",
    imagen: "https://ejemplo.com/images/manzana-fuji.jpg", //actualizar por imagenes flickr
    miniatura: "https://ejemplo.com/images/manzana-fuji-thumb.jpg",
    origen: "Curico, Region del Maule",
    descripcion: "Manzana dulce y jugosa, ideal para comer fresca o en postres.",
    stock: 120,
  },
  {
    id: 5,
    nombre: "Platano Ecuatoriano",
    categoria: "Fruta",
    precio: 1490,
    unidad: "kg",
    imagen: "https://ejemplo.com/images/platano-ecuatoriano.jpg", //actualizar por imagenes flickr
    miniatura: "https://ejemplo.com/images/platano-ecuatoriano-thumb.jpg",
    origen: "Importado, Ecuador",
    descripcion: "Platano de buena madurez, perfecto para colaciones y batidos.",
    stock: 140,
  },
  {
    id: 6,
    nombre: "Uva Red Globe",
    categoria: "Fruta",
    precio: 2590,
    unidad: "kg",
    imagen: "https://ejemplo.com/images/uva-red-globe.jpg", //actualizar por imagenes flickr
    miniatura: "https://ejemplo.com/images/uva-red-globe-thumb.jpg",
    origen: "San Felipe, Region de Valparaiso",
    descripcion: "Uva de granos grandes y dulces, ideal para compartir.",
    stock: 90,
  },
  {
    id: 7,
    nombre: "Naranja Valencia",
    categoria: "Fruta",
    precio: 1390,
    unidad: "kg",
    imagen: "https://ejemplo.com/images/naranja-valencia.jpg", //actualizar por imagenes flickr
    miniatura: "https://ejemplo.com/images/naranja-valencia-thumb.jpg",
    origen: "Region del Biobio",
    descripcion: "Naranja jugosa, perfecta para jugos naturales.",
    stock: 110,
  },
  {
    id: 8,
    nombre: "Frutilla Fresca",
    categoria: "Fruta",
    precio: 2990,
    unidad: "bandeja",
    imagen: "https://ejemplo.com/images/frutilla-fresca.jpg", //actualizar por imagenes flickr
    miniatura: "https://ejemplo.com/images/frutilla-fresca-thumb.jpg",
    origen: "Lampa, Region Metropolitana",
    descripcion: "Frutillas rojas y aromaticas, ideales para postres y batidos.",
    stock: 60,
  },

  // VERDURAS
  {
    id: 9,
    nombre: "Zanahoria Fresca",
    categoria: "Verdura",
    precio: 890,
    unidad: "kg",
    imagen: "https://ejemplo.com/images/zanahoria-fresca.jpg", //actualizar por imagenes flickr
    miniatura: "https://ejemplo.com/images/zanahoria-fresca-thumb.jpg",
    origen: "Talagante, Region Metropolitana",
    descripcion: "Zanahoria crujiente y dulce, ideal para ensaladas y guisos.",
    stock: 150,
  },
  {
    id: 10,
    nombre: "Lechuga Escarola",
    categoria: "Verdura",
    precio: 890,
    unidad: "unidad",
    imagen: "https://ejemplo.com/images/lechuga-escarola.jpg", //actualizar por imagenes flickr
    miniatura: "https://ejemplo.com/images/lechuga-escarola-thumb.jpg",
    origen: "Peñaflor, Region Metropolitana",
    descripcion: "Lechuga de hojas crespas, fresca y crocante.",
    stock: 130,
  },
  {
    id: 11,
    nombre: "Cebolla Morada",
    categoria: "Verdura",
    precio: 1190,
    unidad: "kg",
    imagen: "https://ejemplo.com/images/cebolla-morada.jpg", //actualizar por imagenes flickr
    miniatura: "https://ejemplo.com/images/cebolla-morada-thumb.jpg",
    origen: "Region de O'Higgins",
    descripcion: "Cebolla de sabor suave, ideal para ensaladas chilenas.",
    stock: 160,
  },

  // OTROS (ROPA, ELECTRO, JUGUETES, ETC.)
  {
    id: 12,
    nombre: "Polera usada",
    categoria: "Otros",
    precio: 3000,
    unidad: "unidad",
    imagen: "https://ejemplo.com/images/polera-usada.jpg", //actualizar por imagenes flickr
    miniatura: "https://ejemplo.com/images/polera-usada-thumb.jpg",
    origen: "Puesto 18 - Feria Recoleta",
    descripcion: "Polera de segunda mano en buen estado, talla M.",
    stock: 15,
  },
  {
    id: 13,
    nombre: "Pantalon de mezclilla",
    categoria: "Otros",
    precio: 5000,
    unidad: "unidad",
    imagen: "https://ejemplo.com/images/pantalon-mezclilla.jpg", //actualizar por imagenes flickr
    miniatura: "https://ejemplo.com/images/pantalon-mezclilla-thumb.jpg",
    origen: "Puesto 21 - Feria Recoleta",
    descripcion: "Pantalon de mezclilla usado, sin roturas, varias tallas.",
    stock: 10,
  },
  {
    id: 14,
    nombre: "Zapatillas deportivas usadas",
    categoria: "Otros",
    precio: 12000,
    unidad: "par",
    imagen: "https://ejemplo.com/images/zapatillas-usadas.jpg", //actualizar por imagenes flickr
    miniatura: "https://ejemplo.com/images/zapatillas-usadas-thumb.jpg",
    origen: "Puesto 7 - Feria Conchali",
    descripcion: "Zapatillas en buen estado, limpias y listas para usar.",
    stock: 8,
  },
  {
    id: 15,
    nombre: "Juguete de plastico",
    categoria: "Otros",
    precio: 2000,
    unidad: "unidad",
    imagen: "https://ejemplo.com/images/juguete-plastico.jpg", //actualizar por imagenes flickr
    miniatura: "https://ejemplo.com/images/juguete-plastico-thumb.jpg",
    origen: "Puesto 30 - Feria Barrial",
    descripcion: "Juguete de plastico de segunda mano, ideal para niños pequeños.",
    stock: 25,
  },
  {
    id: 16,
    nombre: "Peluche grande",
    categoria: "Otros",
    precio: 6000,
    unidad: "unidad",
    imagen: "https://ejemplo.com/images/peluche-grande.jpg", //actualizar por imagenes flickr
    miniatura: "https://ejemplo.com/images/peluche-grande-thumb.jpg",
    origen: "Puesto 12 - Feria Recoleta",
    descripcion: "Peluche suave y grande, ideal para regalo.",
    stock: 12,
  },
  {
    id: 17,
    nombre: "Celular Samsung A10 usado",
    categoria: "Otros",
    precio: 45000,
    unidad: "unidad",
    imagen: "https://ejemplo.com/images/celular-samsung-a10.jpg", //actualizar por imagenes flickr
    miniatura: "https://ejemplo.com/images/celular-samsung-a10-thumb.jpg",
    origen: "Puesto 3 - Feria Tecnologica",
    descripcion: "Celular usado, probado en el puesto, incluye cargador generico.",
    stock: 5,
  },
  {
    id: 18,
    nombre: "Hervidor electrico usado",
    categoria: "Otros",
    precio: 15000,
    unidad: "unidad",
    imagen: "https://ejemplo.com/images/hervidor-usado.jpg", //actualizar por imagenes flickr
    miniatura: "https://ejemplo.com/images/hervidor-usado-thumb.jpg",
    origen: "Puesto 9 - Feria de las Pulgas",
    descripcion: "Hervidor electrico de segunda mano, en buen funcionamiento.",
    stock: 7,
  },
  {
    id: 19,
    nombre: "Radio antigua",
    categoria: "Otros",
    precio: 18000,
    unidad: "unidad",
    imagen: "https://ejemplo.com/images/radio-antigua.jpg", //actualizar por imagenes flickr
    miniatura: "https://ejemplo.com/images/radio-antigua-thumb.jpg",
    origen: "Puesto 15 - Feria de las Pulgas",
    descripcion: "Radio antigua decorativa, funciona y tiene buen sonido.",
    stock: 4,
  },
  {
    id: 20,
    nombre: "Set de herramientas",
    categoria: "Otros",
    precio: 25000,
    unidad: "set",
    imagen: "https://ejemplo.com/images/set-herramientas.jpg", //actualizar por imagenes flickr
    miniatura: "https://ejemplo.com/images/set-herramientas-thumb.jpg",
    origen: "Puesto 5 - Feria Conchali",
    descripcion: "Set basico de herramientas, ideal para reparaciones en el hogar.",
    stock: 9,
  },
];
