import { useEffect } from "react";
import Image from "next/image";
import productsStore from "@/store";
import { x } from "@/public";
import styles from "./Header.module.scss";

const CartProducts = ({ setShowCart }: any) => {
  const { cart, deleteCartItem, clearCart } = productsStore();

  const clearCartHandler = async () => {
    await clearCart();
    setShowCart(false);
  };

  const deleteCartItemHandler = async (cartItemId: string) => {
    await deleteCartItem(cartItemId);
    if (cart.length <= 1) {
      setShowCart(false);
    }
  };

  const handleDeleteClick = async (cartItemId: string) => {
    await deleteCartItemHandler(cartItemId);
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
                  onClick={() => handleDeleteClick(item._id)}
                >
                  <Image
                    src={x}
                    alt="x delete svg icon"
                    width={18}
                    height={18}
                  />
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
                <Image
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
};

export default CartProducts;
