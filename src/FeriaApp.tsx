import { useCallback, useEffect , useState } from 'react';
import { NavBar , CardComponent } from './pages/productosComponents';
import { getProductos , getProductoByName } from './actions';
import type { ProductoProps } from './interfaces/productos.interfaces';
import 'bootstrap/dist/css/bootstrap.min.css'

export const FeriaApp = () => {

  const [ productos , setProductos ] = useState<ProductoProps[]>([]);
  const [ allProductos , setAllProductos ] = useState<ProductoProps[]>([]);

  useEffect(()=> {
    const fetchData = async() => {
      try{
        const data = await getProductos();
        const productosData = data.productos;
        setProductos(productosData);
        setAllProductos(productosData);
      }catch(error){
        console.log(`Error en fetching data: ${ error }`);
      }
    }
    fetchData();
  },[]);

  const handleSearch = useCallback(async(query:string) => {
    query = query.trim().toLowerCase()
    if(query.length === 0){
      setProductos(allProductos);
      return
    }
    try{
      const wantedProducto = await getProductoByName(query);
      if(wantedProducto.producto){
        setProductos([wantedProducto.producto])
      }
      return
    }catch(error){
      console.log(`Error en: ${error}`);
    }
  },[allProductos])
  
  
  return (
    <div 
      className="container-fluid min-vh-100"
      style={{
        // 1. CAMBIO DE ESTILO:
        // Eliminamos todas las propiedades de 'backgroundImage', 'backgroundSize', etc.
        // y las reemplazamos por un color de fondo sólido.
        backgroundColor: '#D9E4C8' // Un tono beige/crema claro y "terroso"
      }}
    >       
      <div className="row">
        <NavBar onQuery={handleSearch} />
        <CardComponent productos={productos} />
      </div>
    </div>
  )
}