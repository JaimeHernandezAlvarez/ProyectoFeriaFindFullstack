import { useEffect, useState , type KeyboardEvent } from 'react';
import { Navbar, Nav, NavDropdown, Container, Form, Button } from 'react-bootstrap';

interface Props {
  onQuery: (query:string) => void; 
}

export const NavBar = ({ onQuery }:Props) => {

  const [ query , setQuery ] = useState('');

  useEffect(()=> {
    const timeOutId = setTimeout(()=> {
      onQuery(query);
      },2000)

      return () => {
        clearTimeout(timeOutId);
      }
  },[query,onQuery])

  const handleSearch = () => {
    onQuery(query)
  }

  const handleKeyDown = (event:KeyboardEvent<HTMLInputElement>) => {
    if(event.key === "Enter"){
      event.preventDefault();
      handleSearch();
    }
  }

  return (
    // 1. CAMBIO DE COLOR:
    // Se eliminó la prop 'bg="success"'
    // Se añadió la prop 'style' con tu color específico.
    <Navbar 
      expand="lg" 
      style={{ backgroundColor: '#2E753D' }} 
      variant="dark" 
      className="border-bottom border-secondary"
    >
      <Container fluid>
        <Navbar.Brand href="/" className="text-white fw-bold">
          <i className="fa-solid fa-seedling me-2"></i>
          FeriaFind
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="me-auto">
            <Nav.Link href="/" active className="text-white">
              <i className="fa-solid fa-house me-1"></i>
              Inicio
            </Nav.Link>
            <Nav.Link href="/mapa" className="text-white">
              <i className="fa-solid fa-map-location-dot me-1"></i>
              Mapa
            </Nav.Link>
            <NavDropdown 
              title={
                <span className="text-white">
                  <i className="fa-solid fa-store me-1"></i>
                  Categorías
                </span>
              } 
              id="basic-nav-dropdown"
              menuVariant="dark"
            >
              <NavDropdown.Item href="/categorias/frutas" className="text-white">
                Frutas
              </NavDropdown.Item>
              <NavDropdown.Item href="/categorias/verduras" className="text-white">
                Verduras
              </NavDropdown.Item>
              <NavDropdown.Divider className="bg-secondary" />
              <NavDropdown.Item href="/categorias/abarrotes" className="text-white">
                Abarrotes
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
                setQuery(event.target.value)
              }}
              onKeyDown={handleKeyDown}
            />
            <Button 
              variant="outline-light"
              className="me-2 text-nowrap"
            >
              Iniciar Sesión
            </Button>
            <Button 
              variant="warning"
              className="text-nowrap"
            >
              Registrarse
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}