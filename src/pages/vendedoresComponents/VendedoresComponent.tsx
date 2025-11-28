import { useEffect, useState, useCallback } from 'react';
import { getVendedores } from '../../actions/get-vendedores.actions';
import type { VendedorProps } from '../../interfaces/vendedores.interfaces';
import { NavBar } from '../productosComponents'; 

export const VendedoresPage = () => {
  
  // 1. Estado para lo que se muestra en pantalla
  const [vendedores, setVendedores] = useState<VendedorProps[]>([]);
  // 2. Estado de respaldo (copia de seguridad de todos los datos)
  const [allVendedores, setAllVendedores] = useState<VendedorProps[]>([]);
  
  const [loading, setLoading] = useState(true);

  // --- CARGA INICIAL ---
  useEffect(() => {
    const fetchVendedores = async () => {
      try {
        const data = await getVendedores();
        // Guardamos los datos en AMBOS estados
        setVendedores(data.vendedores);
        setAllVendedores(data.vendedores);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchVendedores();
  }, []);

  // --- LÓGICA DE BÚSQUEDA (El cambio que faltaba) ---
  const handleSearch = useCallback((query: string) => {
    const busqueda = query.trim().toLowerCase();

    // Si la barra está vacía, restauramos la lista completa desde el respaldo
    if (busqueda.length === 0) {
      setVendedores(allVendedores);
      return;
    }

    // Filtramos la lista de respaldo
    const filtrados = allVendedores.filter(v => 
        v.nombre.toLowerCase().includes(busqueda)
    );

    setVendedores(filtrados);
  }, [allVendedores]); // Se recrea solo si cambia la lista original


  return (
    <div className="container-fluid min-vh-100 p-0" style={{ backgroundColor: '#D9E4C8' }}>
      
      {/* 3. AHORA SÍ CONECTAMOS LA BÚSQUEDA */}
      <NavBar onQuery={handleSearch} /> 

      <div className="container py-5">
        <h2 className="mb-4 text-center fw-bold text-success">
            <i className="fa-solid fa-store me-2"></i>Nuestros Vendedores
        </h2>

        {loading ? (
           <div className="text-center mt-5">
             <div className="spinner-border text-success" role="status"></div>
             <p>Cargando feriantes...</p>
           </div>
        ) : (
          <div className="row">
            {vendedores.length === 0 ? (
                <div className="col-12 text-center">
                    <div className="alert alert-warning">
                        No se encontraron vendedores con ese nombre.
                    </div>
                </div>
            ) : (
                vendedores.map((vendedor) => (
                  <div key={vendedor.id} className="col-md-6 col-lg-4 mb-4">
                    <div className="card h-100 shadow-sm border-0">
                      <div className="d-flex justify-content-center pt-4">
                        <img 
                            src={vendedor.foto} 
                            alt={vendedor.nombre} 
                            className="rounded-circle border border-3 border-success"
                            style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                        />
                      </div>
                      <div className="card-body text-center">
                        <h5 className="card-title fw-bold">{vendedor.nombre}</h5>
                        <p className="card-text text-muted small">{vendedor.descripcion}</p>
                        
                        <button className="btn btn-outline-success mt-2">
                            <i className="fa-solid fa-eye me-2"></i>Ver productos
                        </button>
                      </div>
                    </div>
                  </div>
                ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};