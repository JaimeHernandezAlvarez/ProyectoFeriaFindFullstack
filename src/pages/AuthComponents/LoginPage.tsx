import { useLoginForm } from '../../hooks/UseLoginForm';
import { Link } from 'react-router-dom'; // Para enlazar a la pág. de registro
import './RegisterPage.css'; // Reutilizamos el MISMO CSS

export const LoginPage = () => {

  // Traemos toda la lógica del hook
  const { formData, errors, handleChange, handleSubmit } = useLoginForm();

  return (
    <section className="center-content">
      <div className="login-box">
        <h2>Login</h2>
        
        <form onSubmit={handleSubmit} noValidate>
          
          {/* Campo Email */}
          <label htmlFor="email">Ingrese su email:</label>
          <input
            type="email"
            name="email" // 'name' debe coincidir con el estado
            id="txtEmail" // 'id' puede ser el que quieras
            value={formData.email}
            onChange={handleChange}
            required
          />
          {/*
            El error de 'email o contraseña incorrectos' también aparecerá aquí.
            Tu JS original también ponía el error genérico en el 'emailError'.
          */}
          {errors.email && <span className="error-message">{errors.email}</span>}
          
          {/* Campo Contraseña */}
          <label htmlFor="password">Ingrese su Contraseña:</label>
          <input
            type="password"
            name="password" // 'name' debe coincidir con el estado
            id="txtPassword"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
          
          <div>
            <button type="submit" className="button">
              Iniciar sesión
            </button>
          </div>

          {/* Enlace para ir a la página de registro */}
          <p className="auth-link">
            ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
          </p>

        </form>
      </div>
    </section>
  );
};