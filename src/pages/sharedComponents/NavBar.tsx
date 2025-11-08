import { useEffect, useState , type KeyboardEvent } from 'react';
import { Navbar, Nav, NavDropdown, Container, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext'; // 👈 NUEVO

interface Props {
  onQuery: (query:string) => void; 
}

export const NavBar = ({ onQuery }:Props) => {
  const navigate = useNavigate();
  const { totalItems } = useCart(); // 👈 NUEVO
  const [ query , setQuery ] = useState('');

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
  // --- Fin de la lógica de búsqueda ---

  const isLoggedIn = !!localStorage.getItem("usuarioLogeado");

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogeado");
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

            {/* 🛒 Botón Carrito */}
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
