import { useState, Suspense, lazy } from "react";
import productsStore from "../../store";
import Bejamas from "../../assets/svg/bejamas.svg";
import Cart from "../../assets/svg/cart.svg";
import styles from "./Header.module.scss";

const CartProducts = lazy(() => import("./cartProducts"));

const Header = () => {
  const { cart } = productsStore();
  const [showCart, setShowCart] = useState(false);

  const handleCartClick = () => {
    setShowCart((prevShowCart) => !prevShowCart);
  };

  return (
<<<<<<< HEAD
    <>
      <div className={styles.headerContainer}>
        <img src={Bejamas} alt="Bejamas Logo" className={styles.logo} />
        <div className={styles.cart} onClick={handleCartClick}>
          <img src={Cart} alt="Shopping Cart" className={styles.cart} />
          <div className={styles.cartCount}>{cart.length}</div>
        </div>
=======
    <div className={styles.headerContainer}>
      <img src={Bejamas} alt="Bejamas Logo" className={styles.logo} />
      <div className={styles.cart} onClick={handleCartClick}>
        <img src={Cart} alt="Shopping Cart" className={styles.cart} />
        <div className={styles.cartCount}>{cart.length}</div>
>>>>>>> 6c27b98da0d7a80dd2db23c481919fda8f1894b3
      </div>
      {showCart && (
        <Suspense fallback={<div>Loading...</div>}>
          <CartProducts showCart={showCart} setShowCart={setShowCart} />
        </Suspense>
      )}
<<<<<<< HEAD
    </>
=======
    </div>
>>>>>>> 6c27b98da0d7a80dd2db23c481919fda8f1894b3
  );
};

export default Header;
