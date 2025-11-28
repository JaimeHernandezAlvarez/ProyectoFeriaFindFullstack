import { useRoutes } from "react-router-dom";
import { FeriaApp } from "../FeriaApp";
import { ProductoComponent } from "../pages/productoComponents";
import { RegisterPage } from "../pages/AuthComponents/RegisterPage";
import { LoginPage } from "../pages/AuthComponents/LoginPage";
import { ProfilePage } from "../pages/profile/ProfilePage";
import { CartPage } from "../pages/cart/CartPage";
import { CategoriaPage } from "../pages/productoComponents/CategoriaPage";
import { VendedoresPage } from "../pages/vendedoresComponents/VendedoresComponent";

export const AppRoutes = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <FeriaApp />,
    },
    {
      path: "/producto-component/:id",
      element: <ProductoComponent />,
    },
    {
      path: "/registro",
      element: <RegisterPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/perfil",
      element: <ProfilePage />,
    },
    {
      path: "/carrito",
      element: <CartPage />,
    },
    {
      path: "/categorias/:nombreCategoria",
      element: <CategoriaPage />,
    },
    {
      path: "/vendedores",
      element: <VendedoresPage/>
    },
    {
      path: "*",
      element: <div>Pagina no encontrada - 404</div>,
    },
  ]);

  return routes;
};
