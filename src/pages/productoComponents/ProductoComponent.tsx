import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { ProductoProps } from "../../interfaces/productos.interfaces";
import { capitalizeFirst } from "../../helpers";
import { getProductoById } from "../../actions/get-producto-by-id.actions";
import { useCart } from "../../context/CartContext";

export const ProductoComponent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart } = useCart();

  const [producto, setProducto] = useState<ProductoProps | null>(null);
  const [loading, setLoading] = useState(true);

  const goBack = () => {    
    navigate("/");
  };

  useEffect(() => {
    if (id) {
      const fetchProductoById = async (productoId: number) => {
        try {
          const productoEncontrado = await getProductoById(productoId);
          const productoData = productoEncontrado.producto;        
          setProducto(productoData || null);
        } catch (error) {
          console.error("❌ Error fetching producto:", error);
          setProducto(null);
        } finally {
          setLoading(false);
        }
      };

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

  // === ESTADO: CARGANDO ===
  if (loading) {
    return (
      <div
        className="d-flex vh-100 justify-content-center align-items-center"
        style={{ backgroundColor: "#D9E4C8" }}
      >
        <div className="text-center">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-2 mb-0">Cargando producto...</p>
        </div>
      </div>
    );
  }

  // === ESTADO: NO ENCONTRADO ===
  if (!producto) {
    return (
      <div
        className="d-flex vh-100 justify-content-center align-items-center"
        style={{ backgroundColor: "#D9E4C8" }}
      >
        <div className="text-center">
          <h2 className="mb-2">Producto no encontrado</h2>
          <p>No se pudo cargar la información del producto.</p>
          <button
            className="btn btn-primary mt-1"
            onClick={goBack}
          >
            <i className="fa-solid fa-backward"></i> Volver
          </button>
        </div>
      </div>
    );
  }

  // === DATOS DEL PRODUCTO ===
  const nombreProducto = producto.nombre ? capitalizeFirst(producto.nombre) : "Nombre no disponible";
  const imagenPrincipal = producto.imagen || "";
  const imagenMiniatura = producto.miniatura || "";
  
  const precioProducto = new Intl.NumberFormat("es-CL", { 
    style: "currency", 
    currency: "CLP" 
  }).format(producto.precio);
  
  const unidadProducto = producto.unidad || "N/A";
  const categoriaProducto = producto.categoria ? capitalizeFirst(producto.categoria) : "Sin categoría";
  const origenProducto = producto.origen ? capitalizeFirst(producto.origen) : "Origen desconocido";
  const descripcionProducto = producto.descripcion || "Sin descripción disponible.";
  const stockProducto = producto.stock;

  // === VISTA PRINCIPAL ===
  return (
    <div
      className="container-fluid min-vh-100 py-4"
      style={{ backgroundColor: "#D9E4C8" }}
    >
      <div className="row mb-4">
        <div className="col-12 text-center">
          <button
            className="btn btn-primary"
            onClick={goBack}
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
              src={imagenPrincipal}
              style={{ maxHeight: "500px", objectFit: "contain" }}
            />
          </div>

          {imagenMiniatura && (
            <div className="text-center mt-5">
              <h5 className="text-warning mb-3">
                <i className="fa-solid fa-seedling me-2"></i>
                Miniatura
              </h5>
              <img 
                alt={nombreProducto}
                className="img-fluid rounded-3 shadow-lg"
                src={imagenMiniatura}
                style={{ maxHeight: "200px", objectFit: "contain" }}
              />
            </div>
          )}
        </div>

        {/* Columna de Información */}
        <div className="col-lg-6 col-md-12">
          <div className="p-3">
            <h1 className="display-4 fw-bold text-primary mb-4">
              {nombreProducto}
            </h1>
            
            <div className="mb-3">
              <h3 className="text-success fw-bold">{precioProducto}</h3>
              <span className="text-muted fs-5">(por {unidadProducto})</span>
            </div>

            <div className="row mb-3">
              <div className="col-sm-6">
                <p className="mb-1">
                  <strong>Categoría:</strong>{" "}
                  <span className="text-info">{categoriaProducto}</span>
                </p>
              </div>
              <div className="col-sm-6">
                <p className="mb-1">
                  <strong>Origen:</strong> {origenProducto}
                </p>
              </div>
              <div className="col-sm-6">
                <p className="mb-1">
                  <strong>Stock:</strong> {stockProducto} {unidadProducto}(s)
                </p>
              </div>
              <div className="col-sm-6">
                <p className="mb-1">
                  <strong>ID:</strong> {producto.id}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <h5 className="text-success">
                <i className="fa-solid fa-circle-info me-2"></i>
                Información
              </h5>
              <p className="fs-6 text-dark">
                {descripcionProducto}
              </p>
            </div>

            {/* BOTÓN AGREGAR AL CARRITO */}
            <div className="d-flex gap-2">
              <button
                className="btn btn-success"
                style={{ backgroundColor: "#2E753D", borderColor: "#2E753D" }}
                onClick={() => addToCart(producto)}
              >
                <i className="fa-solid fa-cart-plus me-2"></i>
                Agregar al carrito
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};
