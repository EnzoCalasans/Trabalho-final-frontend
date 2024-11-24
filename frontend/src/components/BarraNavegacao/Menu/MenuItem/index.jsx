import { Link } from "react-router-dom";

const MenuItem = ({ link }) => {
  const { name, path, action } = link;

  const handleClick = (e) => {
    if (action) {
      e.preventDefault();  // Previne a navegação padrão do Link
      action();  // Executa a ação de logout
    }
  };

  return (
    <li className="nav-item">
      <Link 
        className="nav-link" 
        to={path} 
        aria-current="page"
        onClick={handleClick}  // Adiciona o clique personalizado
      >
        {name}
      </Link>
    </li>
  );
};

export default MenuItem;
