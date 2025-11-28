export interface VendedorProps {
  id: number;
  nombre: string;
  descripcion: string;
  foto: string;
  estado?: string; // Por si quieres mostrar si está activo
}

export interface RespuestaTodosVendedores {
  ok: boolean;
  vendedores: VendedorProps[];
}