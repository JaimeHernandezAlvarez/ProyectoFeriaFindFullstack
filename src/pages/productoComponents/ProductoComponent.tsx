import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// 1. IMPORTAR LA NUEVA INTERFAZ
import type { ProductoProps } from "../../interfaces/productos.interfaces";
import { capitalizeFirst } from "../../helpers";
// 2. IMPORTAR LA NUEVA ACCIÓN
import { getProductoById } from "../../actions/get-producto-by-id.actions";

// 3. RENOMBRAR EL COMPONENTE
export const ProductoComponent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // 4. CAMBIAR EL ESTADO PARA USAR ProductoProps
  const [producto, setProducto] = useState<ProductoProps | null>(null);
  const [loading, setLoading] = useState(true);

  const goBack = () => {    
    navigate("/");
  }

  useEffect(() => {
    if (id) {
      // 5. CAMBIAR EL NOMBRE DE LA FUNCIÓN INTERNA
      const fetchProductoById = async (productoId: number) => {
        try {
          // 6. LLAMAR A LA NUEVA ACCIÓN
          const productoEncontrado = await getProductoById(productoId);
          // 7. ACCEDER A LA PROPIEDAD CORRECTA DE LA RESPUESTA ('producto' en vez de 'robotABuscar')
          const productoData = productoEncontrado.producto;        
          setProducto(productoData || null);
        } catch (error) {
          // 8. ACTUALIZAR MENSAJE DE ERROR
          console.error("❌ Error fetching producto:", error);
          setProducto(null);
        } finally {
          setLoading(false);
        }
      }

      const numericId = parseInt(id, 10);
      if (!isNaN(numericId)) {
        fetchProductoById(numericId);
      } else {
        console.error("❌ ID inválido:", id);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [id]);

  // --- ESTADOS DE CARGA Y ERROR (ACTUALIZAR TEXTOS) ---

  if (loading) {
    return (
      <div className="container-fluid bg-black min-vh-100">
        <div className="row">
          <div className="col-12 text-center text-white p-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            {/* 9. ACTUALIZAR TEXTO DE CARGA */}
            <p className="mt-2">Cargando producto...</p>
          </div>
        </div>
      </div>
    );
  }

  // 10. CAMBIAR LA VALIDACIÓN A 'producto'
  if (!producto) {
    return (
      <div className="container-fluid bg-black min-vh-100">
        <div className="row">
          <div className="col-12 text-center text-white p-4">
            {/* 11. ACTUALIZAR TEXTO DE ERROR */}
            <h2>Producto no encontrado</h2>
            <p>No se pudo cargar la información del producto.</p>
            <button
              className="btn btn-primary mt-1"
              onClick={goBack}
            >
              <i className="fa-solid fa-backward"></i> Volver
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- EXTRACCIÓN Y FORMATO DE DATOS (REEMPLAZO COMPLETO) ---
  // 12. Mapear las propiedades del producto
  const nombreProducto = producto.nombre ? capitalizeFirst(producto.nombre) : 'Nombre no disponible';
  const imagenPrincipal = producto.imagen || ''; // TODO: Añadir imagen placeholder
  const imagenMiniatura = producto.miniatura || '';
  
  // Formatear precio a CLP
  const precioProducto = new Intl.NumberFormat('es-CL', { 
    style: 'currency', 
    currency: 'CLP' 
  }).format(producto.precio);
  
  const unidadProducto = producto.unidad || 'N/A';
  const categoriaProducto = producto.categoria ? capitalizeFirst(producto.categoria) : 'Sin categoría';
  const origenProducto = producto.origen ? capitalizeFirst(producto.origen) : 'Origen desconocido';
  const descripcionProducto = producto.descripcion || 'Sin descripción disponible.';
  const stockProducto = producto.stock;

  // --- RENDERIZADO DEL JSX (REEMPLAZO COMPLETO) ---

  return (
    // Mantenemos el fondo oscuro y el botón de volver
    <div className="container-fluid bg-black text-white min-vh-100 py-4">      
      <div className="row mb-4">
        <div className="col-12 text-center">
          <button
            className="btn btn-primary"
            onClick={ goBack }
          >
            <i className="fa-solid fa-arrow-left me-2"></i> 
             Volver a la lista
          </button>
        </div>
      </div>

      
      <div className="row align-items-start">        
        {/* Columna de Imagen */}
        <div className="col-lg-6 col-md-12 mb-4 mb-lg-0">
          <div className="text-center">
            <img 
              alt={nombreProducto}
              className="img-fluid rounded-3 shadow-lg"
              // 13. Usar la imagen del producto
              src={imagenPrincipal}
              style={{ maxHeight: '500px', objectFit: 'contain' }}
            />
          </div>
          {/* Mostrar miniatura si existe */}
          {imagenMiniatura && (
            <div className="text-center mt-5">
              <h5 className="text-warning mb-3">
                {/* 14. Icono más apropiado */}
                <i className="fa-solid fa-seedling me-2"></i>
                Miniatura
              </h5>
              <img 
                alt={nombreProducto}
                className="img-fluid rounded-3 shadow-lg"
                src={imagenMiniatura}
                style={{ maxHeight: '200px', objectFit: 'contain' }}
              />
            </div>
          )}
        </div>

        
        {/* Columna de Información */}
        <div className="col-lg-6 col-md-12">
          <div className="p-3">
            {/* 15. Nombre del producto */}
            <h1 className="display-4 fw-bold text-primary mb-4">{nombreProducto}</h1>
            
            {/* 16. Precio y Unidad (en lugar de Serie/ID) */}
            <div className="mb-3">
              <h3 className="text-success fw-bold">{precioProducto}</h3>
              <span className="text-white-50 fs-5">(por {unidadProducto})</span>
            </div>

            {/* 17. Detalles (Categoría, Origen, Stock) */}
            <div className="row mb-3">
              <div className="col-sm-6">
                <p className="mb-1"><strong>Categoría:</strong> <span className="text-info">{categoriaProducto}</span></p>
              </div>
              <div className="col-sm-6">
                <p className="mb-1"><strong>Origen:</strong> {origenProducto}</p>
              </div>
              <div className="col-sm-6">
                 <p className="mb-1"><strong>Stock:</strong> {stockProducto} {unidadProducto}(s)</p>
              </div>
               <div className="col-sm-6">
                 <p className="mb-1"><strong>ID:</strong> {producto.id}</p>
              </div>
            </div>

            {/* 18. Descripción (reemplaza Arma, Debilidad, Frase) */}
            <div className="mb-4">
              <h5 className="text-success">
                <i className="fa-solid fa-circle-info me-2"></i>
                Información
              </h5>
              <p className="fs-6 text-light">{descripcionProducto}</p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};