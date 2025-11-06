import { useRoutes } from "react-router-dom";
import { FeriaApp } from "../FeriaApp"; 
import { ProductoComponent } from "../pages/productoComponents";
import { RegisterPage } from "../pages/AuthComponents/RegisterPage";
import { LoginPage } from "../pages/AuthComponents/LoginPage";

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
            path: '/registro',
            element: <RegisterPage/>
        },
        {
            path: '/login',
            element: <LoginPage />
        },
        {
            path: '*',
            element: <div>Pagina no encontrada - 404</div>
        }
    ]);

    return routes;
}