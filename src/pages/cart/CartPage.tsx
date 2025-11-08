import { Container, Table, Button } from 'react-bootstrap';
import { NavBar } from '../sharedComponents/NavBar';
import { useCart } from '../../context/CartContext';

export const CartPage = () => {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
  const handleDummySearch = () => {};

  const formatCLP = (value: number) =>
    new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);

  const hasItems = items.length > 0;

  return (
    <div style={{ backgroundColor: '#D9E4C8', minHeight: '100vh', paddingBottom: '3rem' }}>
      {/* NavBar arriba como en el resto de la app */}
      <NavBar onQuery={handleDummySearch} />

      <Container className="mt-5">
        <h2 className="mb-4">Mi Carrito</h2>

        {!hasItems && (
          <p>Tu carrito está vacío. Agrega productos desde la lista de la feria.</p>
        )}

        {hasItems && (
          <>
            <Table responsive bordered hover className="bg-white">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.producto.id}>
                    <td>
                      <strong>{item.producto.nombre}</strong>
                      <br />
                      <small className="text-muted">{item.producto.categoria}</small>
                    </td>
                    <td>{formatCLP(item.producto.precio)}</td>
                    <td style={{ maxWidth: '120px' }}>
                      <input
                        type="number"
                        className="form-control"
                        min={1}
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.producto.id, Number(e.target.value) || 1)
                        }
                      />
                    </td>
                    <td>{formatCLP(item.producto.precio * item.quantity)}</td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => removeFromCart(item.producto.id)}
                      >
                        Quitar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <div className="d-flex justify-content-between align-items-center mt-3">
              <div>
                <strong>Productos totales:</strong> {totalItems}
              </div>
              <div>
                <strong>Total a pagar:</strong> {formatCLP(totalPrice)}
              </div>
            </div>

            <div className="d-flex justify-content-end mt-3 gap-2">
              <Button variant="outline-secondary" onClick={clearCart}>
                Vaciar carrito
              </Button>
              <Button
                style={{ backgroundColor: '#2E753D', borderColor: '#2E753D' }}
              >
                Finalizar compra
              </Button>
            </div>
          </>
        )}
      </Container>
    </div>
  );
};
