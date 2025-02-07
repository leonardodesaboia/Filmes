// pages/Cart/index.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, title: 'Inception', price: 20, image: 'https://via.placeholder.com/80' },
    { id: 2, title: 'Interstellar', price: 25, image: 'https://via.placeholder.com/80' },
  ]);

  const navigate = useNavigate();

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div>
        <div className="cart-page">
        <div className="cart-container">
            <div className="cart-content">
            <h1>Seu Carrinho</h1>

            <div className="cart-items">
                {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.title} />
                    <div className="cart-item-info">
                    <h3>{item.title}</h3>
                    <p>R$ {item.price.toFixed(2)}</p>
                    </div>
                    <div className="cart-item-actions">
                    <button onClick={() => handleRemoveItem(item.id)}>Remover</button>
                    </div>
                </div>
                ))}
            </div>

            <div className="cart-total">
                <strong>Total: R$ {totalPrice.toFixed(2)}</strong>
            </div>

            <div className="cart-actions">
                <button className="secondary" onClick={() => navigate('/')}>Continuar Comprando</button>
                <button onClick={() => navigate('/checkout')}>Finalizar Compra</button>
            </div>
            </div>
        </div>
        </div>
    </div>
  );
};

export default Cart;