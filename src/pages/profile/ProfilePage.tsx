import { Container, Row, Col, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { NavBar } from '../sharedComponents/NavBar'; // Asumimos esta ruta
import { useProfile } from '../../hooks/UseProfile';

export const ProfilePage = () => {
    const defaultProfilePic = "https://i.pinimg.com/170x/5a/bd/98/5abd985735a8fd4adcb0e795de6a1005.jpg";
  // Traemos toda la lógica desde nuestro hook
  const { formData, errors, isLoading, handleChange, handleSubmit } = useProfile();

  // Función placeholder para el NavBar (la página de perfil no tiene búsqueda)
  const handleDummySearch = () => {};

  // Estado de Carga
  if (isLoading) {
    return (
      <div className="d-flex vh-100 justify-content-center align-items-center" style={{ backgroundColor: '#F2F0ED' }}>
        <Spinner animation="border" variant="success" />
      </div>
    );
  }

  return (
    // Fondo beige principal
    <div style={{ backgroundColor: '#D9E4C8', minHeight: '100vh', paddingBottom: '3rem' }}>
      {/* 1. Incluimos el NavBar */}
      <NavBar onQuery={handleDummySearch} />

      {/* 2. Contenedor del formulario */}
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            {/* 3. Tarjeta blanca (como en el login) */}
            <div className="bg-white p-4 p-md-5 rounded shadow-sm">
              <h2 className="text-center mb-4">Mi Perfil</h2>
              
              <Form onSubmit={handleSubmit} noValidate>
                
                {/* --- Foto de Perfil (URL) --- */}
                <div className="text-center mb-3">
                  <img 
                    // 3. Lógica 'OR': Usa la foto del formulario O, si está vacía, usa la por defecto
                    src={formData.foto || defaultProfilePic} 
                    alt="Foto de perfil" 
                    style={{ 
                      width: '150px', 
                      height: '150px', 
                      borderRadius: '50%', 
                      objectFit: 'cover' 
                    }}
                    // 4. Si la URL del usuario falla, también usa la por defecto
                    onError={(e) => {
                      e.currentTarget.src = defaultProfilePic;
                    }}
                  />
                </div>

                <Form.Group className="mb-3" controlId="formFoto">
                  <Form.Label>URL Foto de Perfil</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="https://ejemplo.com/imagen.png"
                    name="foto"
                    value={formData.foto}
                    onChange={handleChange}
                    isInvalid={!!errors.foto}
                  />
                  <Form.Control.Feedback type="invalid">{errors.foto}</Form.Control.Feedback>
                </Form.Group>

                {/* --- Nombre --- */}
                <Form.Group className="mb-3" controlId="formNombre">
                  <Form.Label>Nombre de Usuario</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    isInvalid={!!errors.nombre}
                    required
                  />
                  <Form.Control.Feedback type="invalid">{errors.nombre}</Form.Control.Feedback>
                </Form.Group>

                {/* --- Email (Solo lectura) --- */}
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    readOnly // ¡Importante!
                    disabled
                  />
                  <Form.Text className="text-muted">
                    El email es tu identificador y no se puede modificar.
                  </Form.Text>
                </Form.Group>

                {/* --- Descripción --- */}
                <Form.Group className="mb-3" controlId="formDescripcion">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Describe tu puesto o lo que ofreces..."
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                  />
                </Form.Group>
                
                {/* --- Horario --- */}
                <Form.Group className="mb-3" controlId="formHorario">
                  <Form.Label>Horario</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ej: Lunes a Viernes, 9am - 6pm"
                    name="horario"
                    value={formData.horario}
                    onChange={handleChange}
                  />
                </Form.Group>

                {/* --- Cambiar Contraseña --- */}
                <h4 className="mt-5 mb-3 fs-5">Cambiar Contraseña</h4>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formNewPassword">
                      <Form.Label>Nueva Contraseña</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="(Dejar en blanco para no cambiar)"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        isInvalid={!!errors.newPassword}
                      />
                      <Form.Control.Feedback type="invalid">{errors.newPassword}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formConfirmPassword">
                      <Form.Label>Confirmar Contraseña</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="..."
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        isInvalid={!!errors.confirmPassword}
                      />
                      <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                
                {/* --- Botón de Guardar y Mensajes --- */}
                <div className="d-grid">
                  <Button 
                    type="submit" 
                    size="lg"
                    style={{ backgroundColor: '#2E753D', borderColor: '#2E753D' }} // Tu verde
                  >
                    Guardar Cambios
                  </Button>
                </div>
                
                {/* Mensaje de éxito/error general */}
                {errors.general && (
                  <Alert variant={errors.general.includes('Error') ? 'danger' : 'success'} className="mt-4">
                    {errors.general}
                  </Alert>
                )}
                
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};