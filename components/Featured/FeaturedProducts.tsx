import { useState } from "react";
import productsStore from "../../store";
import CartProducts from "../Header/cartProducts";
import FeaturedBadge from "./FeatureaedBadge";
import styles from "./FeaturedProducts.module.scss";

const FeaturedProducts = ({ featuredProduct }: any) => {
  const [showCart, setShowCart] = useState(false);

  const { details } = featuredProduct;
  const { addToCart } = productsStore();

  const handleAddToCart = async (featuredProductId: any) => {
    await addToCart(featuredProductId);
    setShowCart(true);
  };

  return (
    <div className={styles.mainContainer}>
      {featuredProduct && (
        <div className={styles.container} key={featuredProduct._id}>
          <div className={styles.imageContainer}>
            <div className={styles.buttonContainer}>
              <h2>{featuredProduct.name}</h2>
              <div className={styles.addToCart}>
                <button onClick={() => handleAddToCart(featuredProduct._id)}>
                  Add to cart
                </button>
              </div>
            </div>
            <div className={styles.imageWrapper}>
              <img
                className={styles.img}
                src={featuredProduct.image.src}
                alt={featuredProduct.image.alt}
              />
            </div>
            {featuredProduct.featured && <FeaturedBadge />}
          </div>
          <div className={styles.contentContainer}>
            <div className={styles.aboutContainer}>
              <h3>About the {featuredProduct.name}</h3>
              <h4>Pets</h4>
              {details && (
                <div>
                  <p>{details.description.slice(0, 416)}</p>
                  <br />
                  {details.description.length > 416 && (
                    <p>{details.description.slice(416)}</p>
                  )}
                </div>
              )}
            </div>
            <div className={styles.recommendationsContainer}>
              <h3>People also buy</h3>
              {details?.recommendations?.map((rec: any, index: number) => (
                <img
                  key={index}
                  className={styles.photos}
                  src={rec.src}
                  alt={rec.alt}
                />
              ))}
              <h2>Details</h2>
              <p>
                Size: {details?.dimmentions?.width} x{" "}
                {details?.dimmentions?.height} Pixels
              </p>
              <p>Size: {details?.size}</p>
            </div>
          </div>
        </div>
      )}
      {showCart && <CartProducts setShowCart={setShowCart} />}
    </div>
  );
};

export default FeaturedProducts;
