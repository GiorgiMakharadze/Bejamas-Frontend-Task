import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import productsStore from "@/store";
import { Product, ProductsData } from "@/types/productTypes";
import CartProducts from "../Header/cartProducts";
import styles from "./ProductPagination.module.scss";
import {
  arrowup,
  arrowdown,
  chevrondown,
  chevronleft,
  chevronright,
  filter,
} from "@/public";
import Filter from "./Filter/Filter";
import FilterPopUp from "./Filter/FilterPopUp";

const ProductPagination = ({
  products,
  currentPage,
}: ProductsData & { currentPage: number }) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [sortType, setSortType] = useState("Price");
  const [sortOrder, setSortOrder] = useState("Ascending");
  const [isMobile, setIsMobile] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const sortOptions = ["Price", "Alphabetically"];

  const router = useRouter();
  const totalPages = 4;

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  const { addToCart } = productsStore();

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

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      router.push(`/?currentPage=${currentPage - 1}`, undefined, {
        scroll: false,
      });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      router.push(`/?currentPage=${currentPage + 1}`, undefined, {
        scroll: false,
      });
    }
  };

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
            <Image src={filter} alt="filter svg icon" />
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
            <Image src={arrowdown} alt="arrow svg icon" width={7} height={15} />
            <Image src={arrowup} alt="arrow svg icon" width={7} height={15} />
          </button>
          <p>Sort By</p>
          <span>{sortType}</span>
          <button className={styles.sortBtn} onClick={toggleSortDropdown}>
            <Image
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
                <Image
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
              onClick={handlePreviousPage}
              className={styles.chevronButton}
            >
              <Image
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
                onClick={() =>
                  router.push(
                    pageNumber === 1 ? "/" : `/?currentPage=${pageNumber}`,
                    undefined,
                    { scroll: false }
                  )
                }
              >
                {pageNumber}
              </button>
            )
          )}
          {currentPage < totalPages && (
            <button onClick={handleNextPage} className={styles.chevronButton}>
              <Image
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
