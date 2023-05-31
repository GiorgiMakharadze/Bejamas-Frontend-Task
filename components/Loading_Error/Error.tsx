import styles from "./Loading_Error.module.scss";

const Error = ({ message }: any) => {
  return (
    <div className={styles.ErrorContainer}>
      <p>Error message: {message}</p>
      <button>refresh</button>
    </div>
  );
};

export default Error;
