import { CardBodyComponent } from "./CardBodyComponent";
import type { ProductoProps } from "../../interfaces/productos.interfaces";

interface Props{
  productos: ProductoProps[];
}

export const CardComponent = ({ productos }: Props) => {

  const productosArray = Array.isArray(productos) ? productos : [productos];

  return (
    <>
      {
        productosArray.map((producto) => (
          <div key={producto.id} className="col-xl-3 col-lg-4 col-md-4 col-sm-12 col-12 mb-4 mt-2">
            <div 
              // 1. ESTILO ACTUALIZADO:
              // - Quitamos 'text-white' y lo cambiamos por 'text-dark'.
              // - Añadimos 'border-0' y 'shadow-sm' para el estilo limpio de FeriaFind.
              className="card h-100 text-dark border-0 shadow-sm"
              // 2. ESTILO EN LÍNEA ELIMINADO:
              // Ya no necesitamos el fondo oscuro, el blur ni el borde blanco.
            >
              <img src={producto.imagen} 
                className="card-img-top" 
                alt={producto.nombre} 
                style={{
                  height: '300px',
                  objectFit: "contain"
                }}
              />
              <CardBodyComponent producto={producto} />
            </div>
          </div>
        ))}
    </>
  )
}