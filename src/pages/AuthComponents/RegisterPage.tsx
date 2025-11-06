import { useRegisterForm } from '../../hooks/UseRegisterForm';
import './RegisterPage.css'; // Importamos los estilos

export const RegisterPage = () => {
  
  // ¡Toda la lógica compleja está aquí, en una sola línea!
  const { formData, errors, handleChange, handleSubmit } = useRegisterForm();

  return (
    <section className="center-content">
      <div className="login-box">
        <h2>Registro de Usuario</h2>
        
        {/* Usamos <form> y onSubmit para la semántica y accesibilidad */}
        <form onSubmit={handleSubmit} noValidate>
          
          {/* Campo Nombre */}
          <label htmlFor="nombre">Nombre de usuario:</label>
          <input
            type="text"
            name="nombre"
            id="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
          {/* Renderizado condicional del error */}
          {errors.nombre && <span className="error-message">{errors.nombre}</span>}
          
          {/* Campo Email */}
          <label htmlFor="email">Correo electrónico:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
          
          {/* Campo Contraseña */}
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
          
          {/* Campo Confirmar Contraseña */}
          <label htmlFor="confirmPassword">Confirmar contraseña:</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          
          <div>
            {/* El botón ahora es de tipo "submit" */}
            <button type="submit" className="button">
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};