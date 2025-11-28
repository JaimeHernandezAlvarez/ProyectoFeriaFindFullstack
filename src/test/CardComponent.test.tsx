import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CardComponent } from '../pages/productosComponents/CardComponent';
import { CartProvider } from '../context/CartContext';
import type { ProductoProps } from '../interfaces/productos.interfaces';

const mockProducto: ProductoProps = {
  id: 99,
  nombre: 'Producto de prueba',
  categoria: 'Fruta',
  precio: 1234,
  unidad: 'kg',
  imagen: 'https://via.placeholder.com/600x400?text=Test',
  miniatura: 'https://via.placeholder.com/200x200?text=Test',
  origen: 'Origen test',
  descripcion: 'Descripcion de prueba',
  stock: 10,
};

describe('CardComponent', () => {
  it('muestra nombre, precio y botones de acciones', () => {
    render(
      <MemoryRouter>
        <CartProvider>
          <div className="row">
            <CardComponent productos={[mockProducto]} />
          </div>
        </CartProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/producto de prueba/i)).toBeInTheDocument();
    expect(screen.getByText(/\$1\.234 \/ kg/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ver mas/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /agregar/i })).toBeInTheDocument();
  });
});
