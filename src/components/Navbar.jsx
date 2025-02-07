import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa'; 

const Navbar = () => {
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();

  const categories = ['Ação', 'Comédia', 'Drama', 'Terror', 'Ficção'];

  return (
    <nav className="navbar">
      <div className="nav-content">
        <div className="nav-logo" onClick={() => navigate('/')}>
          <img src="../../public/TMDB.png" alt="Logo" />
          <span>TMDB</span>
        </div>

        <ul className="nav-categories">
          {categories.map(category => (
            <li key={category}>
              <a href={`/category/${category.toLowerCase()}`}>{category}</a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <div className="cart-icon" onClick={() => navigate('/cart')}>
            <FaShoppingCart size={20} />
          </div>
          <button
            className="login-btn"
            onClick={() => (setIsLogged(!isLogged) ? navigate('/login') : navigate('/register'))}
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;