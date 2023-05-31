import { useState, useEffect, useRef } from "react";
import productsStore from "../../store";
import CartProducts from "../Header/cartProducts";
import FeaturedBadge from "./FeatureaedBadge";
import styles from "./FeaturedProducts.module.scss";

const FeaturedProducts = () => {
  const [showCart, setShowCart] = useState(false);
  const { featuredProduct, addToCart, fetchFeaturedProduct } = productsStore();
  const [imageVisible, setImageVisible] = useState(false);

  const imageRef = useRef(null);

  useEffect(() => {
    fetchFeaturedProduct();
  }, []);

  useEffect(() => {
    if (featuredProduct) {
      const observer = new IntersectionObserver(
        (entries) => {
          const image = entries[0];
          if (image.isIntersecting) {
            setImageVisible(true);
            observer.unobserve(image.target);
          }
        },
        { threshold: 0.5 }
      );

      const ref = imageRef.current;

      if (ref) {
        observer.observe(ref);
      }

      return () => {
        if (ref) {
          observer.unobserve(ref);
        }
      };
    }
  }, [featuredProduct]);

  const handleAddToCart = async (featuredProductId: string) => {
    await addToCart(featuredProductId);
    setShowCart(true);
  };

  if (!featuredProduct) {
    return null;
  }

  const { name, image, featured, details } = featuredProduct;

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <div className={styles.buttonContainer}>
            <h2>{name}</h2>
            <div className={styles.addToCart}>
              <button onClick={() => handleAddToCart(featuredProduct._id)}>
                Add to cart
              </button>
            </div>
          </div>
          <div className={styles.imageWrapper}>
            <img
              className={styles.img}
              src={imageVisible ? image.src : ""}
              alt={image.alt}
              ref={imageRef}
            />
          </div>
          {featured && <FeaturedBadge />}
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.aboutContainer}>
            <h3>About the {name}</h3>
            <h4>Pets</h4>
            {details ? (
              <>
                <p>{details.description.slice(0, 416)}</p>
                {details.description.length > 416 && (
                  <p>{details.description.slice(416)}</p>
                )}
              </>
            ) : (
              <p>No details available.</p>
            )}
          </div>
          <div className={styles.recommendationsContainer}>
            <h3>People also buy</h3>
            {details?.recommendations?.map((rec, index) => (
              <img
                key={index}
                className={styles.photos}
                src={rec.src}
                alt={rec.alt}
              />
            ))}
            <h2>Details</h2>
            {details ? (
              <>
                <p>
                  Size: {details.dimmentions?.width} x{" "}
                  {details.dimmentions?.height} Pixels
                </p>
                <p>Size: {details.size}</p>
              </>
            ) : (
              <p>No details available.</p>
            )}
          </div>
        </div>
      </div>
      {showCart && <CartProducts setShowCart={setShowCart} />}
    </div>
  );
};

export default FeaturedProducts;
