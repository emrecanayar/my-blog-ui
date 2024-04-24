import styles from "./pagination.module.css";

// Pagination component'i
const Pagination = ({
  page,
  totalPages,
  hasPrev,
  hasNext,
  onPrev,
  onNext,
  onPageSelect,
}: any) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className={styles.container}>
      <button
        className={styles.paginationButton}
        disabled={!hasPrev}
        onClick={onPrev}
      >
        Geri
      </button>
      {pages.map((p) => (
        <button
          key={p}
          className={`${styles.pageButton} ${
            page + 1 === p ? styles.active : ""
          }`}
          onClick={() => onPageSelect(p - 1)} // API'ye uyumlu olarak sayfa numarasını 1 azaltarak gönderiyoruz
        >
          {p}
        </button>
      ))}
      <button
        className={styles.paginationButton}
        disabled={!hasNext}
        onClick={onNext}
      >
        İleri
      </button>
    </div>
  );
};

export default Pagination;
