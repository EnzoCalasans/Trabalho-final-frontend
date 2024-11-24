import { useNavigate } from "react-router-dom";
import MenuItem from "./MenuItem";

const links = [
  { name: "Home", path: "/" },
  { name: "Carrinho", path: "/carrinho" },
];

const Menu = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Limpar o token de autenticação
    localStorage.removeItem('auth-token');

    // Redirecionar para a página inicial
    navigate('/');
  };

  // Operador ternario para verificar se esta logado
  const userLinks = localStorage.getItem('auth-token') 
    ? [{ name: "Logout", path: "#", action: handleLogout }] 
    : [{ name: "Login", path: "/login" }];
  
  // Combine os links gerais com os específicos do usuário (Login/Logout)
  const allLinks = [...links, ...userLinks];

  return (
    <ul className="navbar-nav me-auto">
      {allLinks.map((link) => (
        <MenuItem key={link.path} link={link} />
      ))}
    </ul>
  );
};

export default Menu;
