import Image from "next/image";
import { x } from "@/public";
import styles from "./filter.module.scss";

const FilterPopUp = ({ onClose, onClear }: any) => {
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
              <Image src={x} alt="x svg icon" width={18} height={18} />
            </button>
          </div>
          <div className={styles.checkboxContainer}>
            <label className={styles.checkboxLabel} htmlFor="People">
              <input type="checkbox" id="People" />
              People
            </label>
            <label className={styles.checkboxLabel} htmlFor="Premium">
              <input type="checkbox" id="Premium" />
              Premium
            </label>
            <label className={styles.checkboxLabel} htmlFor="Pets">
              <input type="checkbox" id="Pets" />
              Pets
            </label>
            <label className={styles.checkboxLabel} htmlFor="Food">
              <input type="checkbox" id="Food" />
              <span className={styles.checkmark}></span>
              Food
            </label>
            <label className={styles.checkboxLabel} htmlFor="Landmarks">
              <input type="checkbox" id="Landmarks" />
              Landmarks
            </label>
            <label className={styles.checkboxLabel} htmlFor="Cities">
              <input type="checkbox" id="Cities" />
              Cities
            </label>
            <label className={styles.checkboxLabel} htmlFor="Nature">
              <input type="checkbox" id="Nature" />
              Nature
            </label>
          </div>
          <div className={styles.filterSection}>
            <h3>Price Range</h3>
            <div className={styles.checkboxContainer}>
              <label className={styles.priceLabel}>
                <input type="checkbox" />
                Lower than $20
              </label>
              <label className={styles.priceLabel}>
                <input type="checkbox" />
                $20 - $100
              </label>
              <label className={styles.priceLabel}>
                <input type="checkbox" />
                $100 - $200
              </label>
              <label className={styles.priceLabel}>
                <input type="checkbox" />
                More than $200
              </label>
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
