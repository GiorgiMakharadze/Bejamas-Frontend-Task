import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import styles from "./Loading_Error.module.scss";

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <ClipLoader color="#000" size={150} />
    </div>
  );
};

export default Loading;
