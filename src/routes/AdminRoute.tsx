import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
// Importa tu interfaz para que TypeScript te ayude

interface Props {
  children: ReactNode;
}

export const AdminRoute = ({ children }: Props) => {
  // 1. Leemos la llave "user" que guardamos en el loginAction
  const userRaw = localStorage.getItem("user");
  const user = userRaw ? JSON.parse(userRaw) : null;

  // 2. Verificamos 'rol' (tal como viene de tu backend: "ADMIN")
  const isAdmin = user?.rol === "ADMIN"; 

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};