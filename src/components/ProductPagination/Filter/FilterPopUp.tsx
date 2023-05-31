import { x } from "../../../assets/svg";
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

const FilterPopUp = ({ onClose }: any) => {
  const handleClose = () => {
    onClose();
  };

  const handleConfirm = () => {
    onClose();
  };
  const handleClear = () => {
    onClose();
  };

  return (
    <div className={styles.popupContainer}>
      <div className={styles.content}>
        <div className={styles.filterSection}>
          <div className={styles.header}>
            <h3>Filter</h3>
            <button onClick={handleClose} className={styles.closeBtn}>
              <img src={x} alt="x svg icon" width={18} height={18} />
            </button>
          </div>
          <div className={styles.checkboxContainer}>
            {categoryList.map((category) => (
              <label
                key={category}
                className={styles.checkboxLabel}
                htmlFor={category}
              >
                <input type="checkbox" id={category} name={category} />
                {category}
              </label>
            ))}
          </div>
          <div className={styles.filterSection}>
            <h3>Price Range</h3>
            <div className={styles.checkboxContainer}>
              {priceList.map((price) => (
                <label key={price.label} className={styles.priceLabel}>
                  <input type="checkbox" checked={false} />
                  {price.label}
                </label>
              ))}
            </div>
          </div>
          <div className={styles.buttons}>
            <button onClick={handleClear} className={styles.clearBtn}>
              CLEAR
            </button>
            <button onClick={handleConfirm} className={styles.confirmBtn}>
              SAVE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPopUp;
