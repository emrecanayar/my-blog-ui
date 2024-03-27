import styles from "./searchBar.module.css";

const SearchBar = () => {
  return (
    <div className={styles.searchContainer}>
      <input type="text" placeholder="Ara..." className={styles.searchInput} />
      <button className={styles.searchButton} type="submit">
        Ara
      </button>
    </div>
  );
};
export default SearchBar;
