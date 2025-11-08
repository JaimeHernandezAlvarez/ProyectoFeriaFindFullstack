import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductos } from "../../actions";
import { CardComponent } from "../productosComponents/CardComponent";
import type { ProductoProps } from "../../interfaces/productos.interfaces";
import { NavBar } from "../sharedComponents/NavBar";

const mapSlugToCategoria = (slug?: string) => {
  if (!slug) return "";
  switch (slug.toLowerCase()) {
    case "frutas":
      return "Fruta";
    case "verduras":
      return "Verdura";
    case "otros":
      return "Otros";
    default:
      return slug;
  }
};

export const CategoriaPage = () => {
  const { nombreCategoria } = useParams<{ nombreCategoria: string }>();

  const [productosCategoria, setProductosCategoria] = useState<ProductoProps[]>([]);
  const [productosFiltrados, setProductosFiltrados] = useState<ProductoProps[]>([]);
  const [loading, setLoading] = useState(true);

  // cargar productos de esa categoría
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProductos();
        const todos = data.productos;

        const categoriaReal = mapSlugToCategoria(nombreCategoria);
        const filtrados = todos.filter(
          (p) => p.categoria.toLowerCase() === categoriaReal.toLowerCase()
        );

        setProductosCategoria(filtrados);
        setProductosFiltrados(filtrados);
      } catch (error) {
        console.error("Error cargando productos por categoría:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [nombreCategoria]);

  // búsqueda dentro de la categoría
  const handleSearch = (query: string) => {
    const limpio = query.trim().toLowerCase();
    if (limpio.length === 0) {
      setProductosFiltrados(productosCategoria);
      return;
    }

    const filtrados = productosCategoria.filter((p) =>
      p.nombre.toLowerCase().includes(limpio)
    );
    setProductosFiltrados(filtrados);
  };

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
          <p className="mt-2 mb-0">Cargando productos...</p>
        </div>
      </div>
    );
  }

  const titulo =
    nombreCategoria ? mapSlugToCategoria(nombreCategoria).toUpperCase() : "CATEGORÍA";

  return (
    <div style={{ backgroundColor: "#D9E4C8", minHeight: "100vh" }}>
      <NavBar onQuery={handleSearch} />

      <div className="container py-5">
        <h2 className="mb-4 text-center">{titulo}</h2>

        {productosFiltrados.length === 0 ? (
          <p className="text-center">No hay productos en esta categoría.</p>
        ) : (
          <div className="row">
            <CardComponent productos={productosFiltrados} />
          </div>
        )}
      </div>
    </div>
  );
};
