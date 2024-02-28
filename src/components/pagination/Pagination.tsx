import styles from "./pagination.module.css";

// Pagination component'i
const Pagination = ({ page, hasPrev, hasNext, onPrev, onNext }: any) => {
  return (
    <div className={styles.container}>
      <button
        className={styles.paginationButton}
        disabled={!hasPrev}
        onClick={onPrev} // "Geri" butonu için tıklama olayı
      >
        Geri
      </button>
      <button
        className={styles.paginationButton}
        disabled={!hasNext}
        onClick={onNext} // "İleri" butonu için tıklama olayı
      >
        İleri
      </button>
    </div>
  );
};

export default Pagination;
