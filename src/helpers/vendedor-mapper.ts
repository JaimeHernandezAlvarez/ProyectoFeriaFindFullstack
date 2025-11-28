import type { VendedorProps } from "../interfaces/vendedores.interfaces";

export const mapVendedorApiToApp = (apiData: any): VendedorProps => {
  return {
    id: apiData.idVendedor || apiData.id,
    nombre: apiData.nombreVendedor || apiData.nombre || "Vendedor Sin Nombre",
    descripcion: apiData.descripcion || "Sin descripción disponible",
    // Usamos una imagen por defecto si el vendedor no tiene foto
    foto: apiData.fotoPerfil || apiData.imagen || "https://cdn-icons-png.flaticon.com/512/1995/1995515.png",
    estado: apiData.estado
  };
};