import { useRoutes } from "react-router-dom";
import { FeriaApp } from "../FeriaApp"; 
import { ProductoComponent } from "../pages/productoComponents";
import { RegisterPage } from "../pages/AuthComponents/RegisterPage";
import { LoginPage } from "../pages/AuthComponents/LoginPage";
import { ProfilePage } from "../pages/profile/ProfilePage";
import { CartPage } from "../pages/cart/CartPage"; // 👈 NUEVO IMPORT

export const AppRoutes = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <FeriaApp />
    },
    {
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
      path: '/perfil',
      element: <ProfilePage />
    },
    {
      path: '/carrito',          // 👈 NUEVA RUTA DEL CARRITO
      element: <CartPage />
    },
    {
      path: '*',
      element: <div>Pagina no encontrada - 404</div>
    }
  ]);

  return routes;
};
