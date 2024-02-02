import styles from "./pagination.module.css";

const Pagination = ({ page, hasPrev, hasNext }: any) => {

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        disabled={!hasPrev}
      >
        Geri
      </button>
      <button
        disabled={!hasNext}
        className={styles.button}
      >
        İleri
      </button>
    </div>
  );
};

export default Pagination;
