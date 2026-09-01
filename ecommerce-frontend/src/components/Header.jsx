import { Link } from 'react-router';
import './header.css';

function Header({ cart }) {
  let totalQua = 0;

  cart.forEach((cartItem) => {
    totalQua += cartItem.quantity;
  });

  return (
    <div className="header">

      <div className="left-section">
        <Link to="/" className="header-link logo-text">
          <span className="logo-k">K</span>alanix Shop
        </Link>
      </div>

      <div className="middle-section">
        <input
          className="search-bar"
          type="text"
          placeholder="Search"
        />

        <button className="search-button">
          <img
            className="search-icon"
            src="/images/icons/search-icon.png"
            alt="Search"
          />
        </button>
      </div>

      <div className="right-section">

        <Link className="orders-link header-link" to="/orders">
          <span className="orders-text">Orders</span>
        </Link>

        <Link className="cart-link header-link" to="/checkout">
          <img
            className="cart-icon"
            src="/images/icons/cart-icon.png"
            alt="Cart"
          />

          <div className="cart-quantity">{totalQua}</div>
          <div className="cart-text">Cart</div>
        </Link>

      </div>

    </div>
  );
}

export default Header;
