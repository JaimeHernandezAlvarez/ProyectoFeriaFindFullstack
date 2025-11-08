import { useNavigate } from "react-router-dom";
import { CardTitleComponent } from "./CardTitleComponent";
import { CardTextComponent } from "./CardTextComponent";
import { capitalizeFirst } from '../../helpers';
import type { ProductoProps } from "../../interfaces/productos.interfaces";
import { useCart } from '../../context/CartContext'; // 👈 NUEVO

interface Props {
  producto: ProductoProps;
}

export const CardBodyComponent = ({ producto }: Props) => {

  const navigate = useNavigate();
  const { addToCart } = useCart(); // 👈 NUEVO

  const handleShowProducto = (producto: ProductoProps) => {
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

      <div className="d-flex justify-content-between mt-2 gap-2">
        {/* Botón ver más (igual que antes, pero como button) */}
        <button
          className="btn text-center text-white flex-fill"
          style={{ 
            backgroundColor: '#2E753D', 
            borderColor: '#2E753D' 
          }}
          onClick={() => handleShowProducto(producto)}
        >
          <i className="fa-solid fa-eye"></i> Ver mas...
        </button>

        {/* NUEVO: botón agregar al carrito */}
        <button
          className="btn btn-outline-success flex-fill"
          onClick={() => addToCart(producto)}
        >
          <i className="fa-solid fa-cart-plus me-1"></i>
          Agregar
        </button>
      </div>
    </div>
  )
}
