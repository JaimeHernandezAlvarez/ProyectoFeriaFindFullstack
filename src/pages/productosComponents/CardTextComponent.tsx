// 1. Cambiamos la prop en la interfaz de 'weapon' a 'text'
interface Props {
  text: string;
}

// 2. Recibimos 'text' como prop
export const CardTextComponent = ({ text }: Props) => {
  return (
    // 3. Cambiamos el ícono de 'fa-gun' a 'fa-dollar-sign'
    // 4. Cambiamos el color de 'text-warning' a 'text-success' (opcional, pero va bien con el precio)
    // 5. Mostramos la variable 'text'
    <p className="card-text text-center text-success">
      <i className="fa-solid fa-dollar-sign me-2"></i>
      { text }
    </p>
  )
}