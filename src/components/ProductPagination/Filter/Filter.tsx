import { useState, useEffect } from "react";
import productsStore from "../../../store";
import styles from "./filter.module.scss";

const categoryList = [
  "People",
  "Premium",
  "Pets",
  "Food",
  "Landmarks",
  "Cities",
  "Nature",
];
const priceList = [
  { label: "Lower than $20", min: 0, max: 20 },
  { label: "$20 - $100", min: 20, max: 100 },
  { label: "$100 - $200", min: 100, max: 200 },
  { label: "More than $200", min: 200, max: Infinity },
];
const Filter = () => {
  const { fetchProductsData, page, limit, sortType, sortOrder } = productsStore(
    (state: any) => ({
      fetchProductsData: state.fetchProductsData,
      page: state.page,
      limit: state.limit,
      sortType: state.sortType,
      sortOrder: state.sortOrder,
    })
  );

  const [categories, setCategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(
    null
  );

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const category = event.target.name;

    if (event.target.checked) {
      setCategories([...categories, category]);
    } else {
      setCategories(categories.filter((c) => c !== category));
    }
  };

  const handlePriceChange = (priceLabel: string, min: number, max: number) => {
    setSelectedPriceRange(priceLabel);
    setMinPrice(min);
    setMaxPrice(max);
  };

  useEffect(() => {
    fetchProductsData(
      page,
      limit,
      sortType,
      sortOrder,
      categories,
      minPrice,
      maxPrice
    );
  }, [page, limit, sortType, sortOrder, categories, minPrice, maxPrice]);

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterSection}>
        <h3>Category</h3>
        <div className={styles.checkboxContainer}>
          {categoryList.map((category) => (
            <label
              key={category}
              className={styles.checkboxLabel}
              htmlFor={category}
            >
              <input
                type="checkbox"
                id={category}
                name={category}
                onChange={handleCategoryChange}
              />
              {category}
            </label>
          ))}
        </div>
      </div>
      <div className={styles.filterSection}>
        <h3>Price Range</h3>
        <div className={styles.checkboxContainer}>
          {priceList.map((price) => (
            <label key={price.label} className={styles.priceLabel}>
              <input
                type="checkbox"
                checked={selectedPriceRange === price.label}
                onChange={() =>
                  handlePriceChange(price.label, price.min, price.max)
                }
              />
              {price.label}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
