import { useState, useEffect, useMemo } from "react";
import CartProducts from "../Header/cartProducts";
import styles from "./ProductPagination.module.scss";
import {
  arrowup,
  arrowdown,
  chevrondown,
  chevronleft,
  chevronright,
  filter,
} from "../../assets/svg";
import Filter from "./Filter/Filter";
import FilterPopUp from "./Filter/FilterPopUp";
import productsStore from "../../store";
import { Product } from "../../types/productTypes";

const ProductPagination = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [sortType, setSortType] = useState("Price");
  const [sortOrder, setSortOrder] = useState("Ascending");
  const [isMobile, setIsMobile] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const sortOptions = ["Price", "Alphabetically"];

  const totalPages = 4;

  useEffect(() => {
    setIsLoading(true);
    fetchProductsData(currentPage, 6)
      .then(() => {
        const data = productsStore.getState().data;
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentPage]);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  const { fetchProductsData, addToCart } = productsStore();

  const sortedProducts = useMemo(() => {
    const sorted = [...products];

    if (sortType === "Price") {
      sorted.sort((a, b) => {
        if (sortOrder === "Ascending") {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });
    } else if (sortType === "Alphabetically") {
      sorted.sort((a, b) => {
        if (sortOrder === "Ascending") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
    }

    return sorted;
  }, [products, sortType, sortOrder]);

  const handleSortOptionClick = (option: string) => {
    if (option === sortType) {
      setSortOrder((prevSortOrder) =>
        prevSortOrder === "Ascending" ? "Descending" : "Ascending"
      );
    } else {
      setSortType(option);
      setSortOrder("Ascending");
    }
    setDropdownOpen(false);
  };

  const handleAddToCart = async (productId: string) => {
    await addToCart(productId);
    setShowCart(true);
  };

  const toggleSortDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const renderSortDropdown = () => (
    <div className={styles.dropdown}>
      {sortOptions.map((option, index) => (
        <div
          key={index}
          className={styles.option}
          onClick={() => handleSortOptionClick(option)}
        >
          {option}
        </div>
      ))}
    </div>
  );

  // const handlePreviousPage = () => {
  //   if (currentPage > 1) {
  //     navigate(`/?currentPage=${currentPage + 1}`);
  //   }
  // };

  // const handleNextPage = () => {
  //   if (currentPage < totalPages) {
  //     navigate(`/?currentPage=${currentPage + 1}`);
  //   }
  // };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>
          Photography /<span> Premium Photos</span>
        </h2>
        {isMobile && (
          <button
            onClick={() => setIsOptionsOpen(!isOptionsOpen)}
            className={styles.filterButton}
          >
            <img src={filter} alt="filter svg icon" />
          </button>
        )}
        <div className={styles.sortContainer}>
          <button
            className={styles.ascDescBtn}
            onClick={() =>
              setSortOrder((prevSortOrder) =>
                prevSortOrder === "Ascending" ? "Descending" : "Ascending"
              )
            }
          >
            <img src={arrowdown} alt="arrow svg icon" width={7} height={15} />
            <img src={arrowup} alt="arrow svg icon" width={7} height={15} />
          </button>
          <p>Sort By</p>
          <span>{sortType}</span>
          <button className={styles.sortBtn} onClick={toggleSortDropdown}>
            <img
              src={chevrondown}
              alt="chevron svg icon"
              width={16}
              height={8}
            />
          </button>
          {dropdownOpen && renderSortDropdown()}
        </div>
        {isMobile && isOptionsOpen && (
          <FilterPopUp onClose={() => setIsOptionsOpen(false)} />
        )}
      </div>

      {!isMobile && <Filter />}

      <div className={`${styles.products} ${isMobile ? styles.mobile : ""}`}>
        {sortedProducts
          .slice(0, 9)
          .map((product: Product, productIndex: number) => (
            <div className={styles.gridItem} key={productIndex}>
              <div className={`${styles.img} ${styles.hoverEffect}`}>
                {product.bestseller && (
                  <p className={styles.bestsellerBadge}>Best seller</p>
                )}
                <img
                  src={product.image.src}
                  alt={product.image.alt}
                  width={300}
                  height={390}
                />
                <button
                  className={styles.addToCartBtn}
                  onClick={() => handleAddToCart(product._id)}
                >
                  ADD TO CART
                </button>
              </div>
              <h4>{product.category}</h4>
              <h3>{product.name}</h3>
              <p>${product.price}</p>
            </div>
          ))}
        <div className={styles.pagination}>
          {currentPage > 1 && (
            <button
              onClick={() => console.log("handle prev page")}
              className={styles.chevronButton}
            >
              <img
                src={chevronleft}
                alt="chevron left icon"
                width={18}
                height={26}
              />
            </button>
          )}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNumber) => (
              <button
                className={`${styles.pageButtons} ${
                  currentPage === pageNumber ? styles.activePageButton : ""
                }`}
                key={pageNumber}
                // onClick={() =>
                //   navigate(
                //     pageNumber === 1 ? "/" : `/?currentPage=${pageNumber}`,
                //     undefined
                //   )
                //}
              >
                {pageNumber}
              </button>
            )
          )}
          {currentPage < totalPages && (
            <button
              onClick={() => console.log("next page")}
              className={styles.chevronButton}
            >
              <img
                src={chevronright}
                alt="chevron left icon"
                width={18}
                height={26}
              />
            </button>
          )}
        </div>
      </div>
      {showCart && <CartProducts setShowCart={setShowCart} />}
    </div>
  );
};

export default ProductPagination;
