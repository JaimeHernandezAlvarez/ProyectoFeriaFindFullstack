import { useRoutes } from "react-router-dom";

// 1. Importar los componentes renombrados
import { FeriaApp } from "../FeriaApp"; 
// 2. Corregir la importación del componente de detalle
import { ProductoComponent } from "../pages/productoComponents";

export const AppRoutes = () => {
    const routes = useRoutes([
        {
            // 3. Ruta principal: Renderiza la app principal de la feria
            path: '/',
            element: <FeriaApp />
        },
        {
            // 4. Ruta de detalle: Actualizar el path y el elemento
            path: '/producto-component/:id',
            element: <ProductoComponent />
        },
        {
            path: '*',
            element: <div>Pagina no encontrada - 404</div>
        }
    ]);

    return routes;
}