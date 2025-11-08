import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes/AppRoutes'
import { CartProvider } from './context/CartContext'   // 👈 Import del carrito
import './index.css'                                   // 👈 Asegura los estilos globales

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>             {/* 👈 Envolvemos toda la app */}
        <AppRoutes />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)
