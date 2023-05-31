import { useState } from "react";
import Image from "next/image";
import FeaturedBadge from "./FeatureaedBadge";
import productsStore from "@/store";
import { Product } from "@/types/productTypes";
import CartProducts from "../Header/cartProducts";
import styles from "./FeaturedProducts.module.scss";

const FeaturedProducts = ({
  featuredProduct,
}: {
  featuredProduct: Product;
}) => {
  const [showCart, setShowCart] = useState(false);

  const { details } = featuredProduct;
  const { addToCart } = productsStore();

  const handleAddToCart = async (featuredProductId: string) => {
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
              <Image
                className={styles.img}
                src={featuredProduct.image.src}
                alt={featuredProduct.image.alt}
                width={1650}
                height={553}
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
                <Image
                  key={index}
                  className={styles.photos}
                  src={rec.src}
                  alt={rec.alt}
                  width={117}
                  height={147}
                  priority
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
