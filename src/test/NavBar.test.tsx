import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { NavBar } from "../pages/sharedComponents/NavBar";
import { CartProvider } from "../context/CartContext";

describe("NavBar", () => {
  test("se renderiza correctamente", () => {
    render(
      <CartProvider>
        <MemoryRouter>
          <NavBar onQuery={() => {}} />
        </MemoryRouter>
      </CartProvider>
    );

    // input de busqueda
    expect(
      screen.getByPlaceholderText(/tomates, papas/i)
    ).toBeInTheDocument();

    // boton de iniciar sesion (con tilde)
    expect(
      screen.getByRole("button", { name: /iniciar sesión/i })
    ).toBeInTheDocument();

    // boton registrarse
    expect(
      screen.getByRole("button", { name: /registrarse/i })
    ).toBeInTheDocument();
  });
});
