import React from "react";
import styles from "./menuCategories.module.css";
import { Link } from "react-router-dom";

const MenuCategories = () => {
  return (
    <div className={styles.categoryList}>
      <Link
        to="/blog?cat=style"
        className={`${styles.categoryItem} ${styles.style}`}
      >
        Style
      </Link>
      <Link to="/blog" className={`${styles.categoryItem} ${styles.fashion}`}>
        Fashion
      </Link>
      <Link to="/blog" className={`${styles.categoryItem} ${styles.food}`}>
        Food
      </Link>
      <Link to="/blog" className={`${styles.categoryItem} ${styles.travel}`}>
        Travel
      </Link>
      <Link to="/blog" className={`${styles.categoryItem} ${styles.culture}`}>
        Culture
      </Link>
      <Link to="/blog" className={`${styles.categoryItem} ${styles.coding}`}>
        Coding
      </Link>
    </div>
  );
};

export default MenuCategories;
