import { useNavigate } from "react-router-dom";
import { CardTitleComponent } from "./CardTitleComponent";
import { CardTextComponent } from "./CardTextComponent";
import { capitalizeFirst } from '../../helpers';
import type { ProductoProps } from "../../interfaces/productos.interfaces";

interface Props {
  producto: ProductoProps;
}

export const CardBodyComponent = ({ producto }: Props) => {

  const navigate = useNavigate();

  const handleShowProducto = ( producto: ProductoProps ) => {
    navigate(`/producto-component/${producto.id}`);
  }

  const precioFormateado = new Intl.NumberFormat('es-CL', { 
    style: 'currency', 
    currency: 'CLP' 
  }).format(producto.precio);

  const textoPrecio = `${precioFormateado} / ${producto.unidad}`;

  return (
    <div className="card-body">
      <CardTitleComponent name={ capitalizeFirst(producto.nombre) } />
      
      <CardTextComponent text={textoPrecio} />

      {/* --- CAMBIO AQUÍ --- */}
      <a          
        // 1. Quitamos 'btn-primary' y añadimos 'text-white'
        className="btn text-center text-white"
        // 2. Añadimos el estilo en línea con tu color
        style={{ 
          backgroundColor: '#2E753D', 
          borderColor: '#2E753D' 
        }}
        onClick={ () => {
          handleShowProducto(producto)
        }}
      >
        <i className="fa-solid fa-eye"></i> Ver mas...
      </a>
    </div>
  )
}