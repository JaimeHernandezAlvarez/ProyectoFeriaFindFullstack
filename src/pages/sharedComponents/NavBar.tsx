import { useEffect, useState , type KeyboardEvent } from 'react';
import { Navbar, Nav, NavDropdown, Container, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

interface Props {
  onQuery: (query:string) => void; 
}

export const NavBar = ({ onQuery }:Props) => {
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const [ query , setQuery ] = useState('');

  // --- 1. LEER DATOS DEL USUARIO ---
  // Leemos el usuario que guardamos en auth.actions.ts
  const userRaw = localStorage.getItem("user");
  const user = userRaw ? JSON.parse(userRaw) : null;

  // Verificamos si existe token (para saber si está logueado)
  const isLoggedIn = !!localStorage.getItem("token");

  // 👇 Verificamos si es ADMIN (usando la propiedad 'rol' de tu backend)
  const isAdmin = user?.rol === "ADMIN"; 

  // --- Lógica de búsqueda ---
  useEffect(()=> {
    const timeOutId = setTimeout(()=> {
      onQuery(query);
    },2000);

    return () => {
      clearTimeout(timeOutId);
    };
  },[query,onQuery]);

  const handleSearch = () => {
    onQuery(query);
  };

  const handleKeyDown = (event:KeyboardEvent<HTMLInputElement>) => {
    if(event.key === "Enter"){
      event.preventDefault();
      handleSearch();
    }
  };

  const handleLogout = () => {
    // 👇 Limpiamos todo para evitar errores
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <Navbar 
      expand="lg" 
      style={{ backgroundColor: '#2E753D' }} 
      variant="dark" 
      className="border-bottom border-secondary"
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="text-white fw-bold">
          <i className="fa-solid fa-seedling me-2"></i>
          FeriaFind
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" active className="text-white">
              <i className="fa-solid fa-house me-1"></i>
              Inicio
            </Nav.Link>
            
            {/* ... Resto de tus links de navegación ... */}
             <Nav.Link as={Link} to="/vendedores" active className="text-white">
              <i className="fa-solid fa-address-card me-1"></i>
              Vendedores
            </Nav.Link>
            <Nav.Link as={Link} to="/mapa" className="text-white">
              <i className="fa-solid fa-map-location-dot me-1"></i>
              Mapa
            </Nav.Link>
            <NavDropdown 
              title={
                <span className="text-white">
                  <i className="fa-solid fa-store me-1"></i>
                  Categorias
                </span>
              } 
              id="basic-nav-dropdown"
              menuVariant="dark"
            >
              <NavDropdown.Item as={Link} to="/categorias/frutas" className="text-white">
                Frutas
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/categorias/verduras" className="text-white">
                Verduras
              </NavDropdown.Item>
              <NavDropdown.Divider className="bg-secondary" />
              <NavDropdown.Item as={Link} to="/categorias/otros" className="text-white">
                Otros
              </NavDropdown.Item>
            </NavDropdown>

            {/* 👇 BOTÓN SOLO PARA ADMIN (OPCIÓN EN EL NAV) 
                Si prefieres que esté arriba en el menú principal: */}
            {isAdmin && (
               <Nav.Link as={Link} to="/admin" className="text-warning fw-bold">
                  <i className="fa-solid fa-crown me-1"></i>
                  Panel Admin
               </Nav.Link>
            )}

          </Nav>
          
          <Form className="d-flex align-items-center">
            <Form.Control
              type="search"
              placeholder="Ej: tomates, papas..."
              className="me-2"
              aria-label="Search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
              }}
              onKeyDown={handleKeyDown}
            />

            <Button
              variant="outline-light"
              className="me-2 position-relative text-nowrap"
              onClick={() => navigate('/carrito')}
            >
              <i className="fa-solid fa-cart-shopping"></i>
              {totalItems > 0 && (
                <span
                  className="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle"
                  style={{ fontSize: '0.7rem' }}
                >
                  {totalItems}
                </span>
              )}
            </Button>
            
            { isLoggedIn ? (
              <>
                {/* 👇 BOTÓN SOLO PARA ADMIN (OPCIÓN BOTÓN DESTACADO) */}
                {isAdmin && (
                    <Button 
                      variant="danger" // Color rojo/distintivo para admin
                      className="me-2 text-nowrap"
                      onClick={() => navigate('/admin')}
                    >
                      <i className="fa-solid fa-user-shield me-1"></i>
                      Admin
                    </Button>
                )}

                <Button 
                  onClick={() => navigate('/perfil')}
                  variant="outline-light"
                  className="me-2 text-nowrap"
                >
                  <i className="fa-solid fa-user me-1"></i>
                  Mi Perfil
                </Button>
                <Button 
                  variant="warning"
                  className="text-nowrap"
                  onClick={handleLogout}
                >
                  <i className="fa-solid fa-arrow-right-from-bracket me-1"></i>
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="outline-light"
                  className="me-2 text-nowrap"
                  onClick={() => navigate('/login')}
                >
                  Iniciar Sesión
                </Button>
                <Button 
                  variant="warning"
                  className="text-nowrap"
                  onClick={() => navigate('/registro')}
                >
                  Registrarse
                </Button>
              </>
            )}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};