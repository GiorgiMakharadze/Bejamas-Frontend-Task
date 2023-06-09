import productsStore from "../../store";
import styles from "./Header.module.scss";
import { x } from "../../assets/svg";
import { memo } from "react";

const CartProducts = memo(({ setShowCart }: any) => {
  const { cart, clearCart, deleteFromCart } = productsStore();

  const clearCartHandler = async () => {
    await clearCart();
    setShowCart(false);
  };

  const handleDeleteClick = (cartItemId: string) => async () => {
    await deleteFromCart(cartItemId);
    if (cart.length <= 1) {
      setShowCart(false);
    }
  };

  return (
    <div className={styles.cartProducts}>
      {cart.length > 0 ? (
        <ul className={styles.productList}>
          {cart.map((item) => (
            <li key={item._id} className={styles.productItem}>
              <div className={styles.deleteBtnContainer}>
                <button
                  className={styles.deleteBtn}
                  onClick={handleDeleteClick(item._id)}
                >
                  <img src={x} alt="x delete svg icon" width={18} height={18} />
                </button>
              </div>
              <div className={styles.productInfo}>
                <h4 className={styles.productName}>
                  {item.products[0].product.name}
                </h4>
                <p className={styles.productPrice}>
                  ${item.products[0].product.price}
                </p>
              </div>
              <div className={styles.productImage}>
                <img
                  src={item.products[0].product.image.src}
                  alt={item.products[0].product.image.alt}
                  width={149}
                  height={86}
                />
              </div>
            </li>
          ))}
          <button className={styles.clearButton} onClick={clearCartHandler}>
            CLEAR
          </button>
        </ul>
      ) : (
        <p className={styles.emptyMessage}>Your cart is empty</p>
      )}
    </div>
  );
});

export default CartProducts;
