import { useState } from "react";
import productsStore from "../../store";
import Bejamas from "@/public/bejamas.svg";
import Cart from "@/public/cart.svg";
import styles from "./Header.module.scss";
import CartProducts from "./cartProducts";

const Header = () => {
  const { cart } = productsStore();
  const [showCart, setShowCart] = useState(false);

  const handleCartClick = () => {
    setShowCart((prevShowCart) => !prevShowCart);
  };

  return (
    <div className={styles.headerContainer}>
      <img src={Bejamas} alt="Bejamas Logo" className={styles.logo} />
      <div className={styles.cart} onClick={handleCartClick}>
        <img src={Cart} alt="Shopping Cart" className={styles.cart} />
        <div className={styles.cartCount}>{cart.length}</div>
      </div>
      {showCart && (
        <CartProducts showCart={showCart} setShowCart={setShowCart} />
      )}
    </div>
  );
};

export default Header;
