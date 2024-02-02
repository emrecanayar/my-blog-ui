import { Link } from "react-router-dom";
import styles from "./categoryList.module.css";
import style from "../../assets/style.png";
import fashion from "../../assets/fashion.png";
import food from "../../assets/food.png";
import travel from "../../assets/travel.png";
import culture from "../../assets/culture.png";
import coding from "../../assets/coding.png";

const CategoryList = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Popüler Kategoriler</h1>
      <div className={styles.categories}>
        <Link to="/" className={`${styles.category} ${styles.style}`}>
          <img
            src={style}
            alt="Style"
            width={32}
            height={32}
            className={styles.image}
          />
          Style
        </Link>
        <Link to="/" className={`${styles.category} ${styles.fashion}`}>
          <img
            src={fashion}
            alt="Fashion"
            width={32}
            height={32}
            className={styles.image}
          />
          Fashion
        </Link>
        <Link to="/" className={`${styles.category} ${styles.food}`}>
          <img
            src={food}
            alt="Food"
            width={32}
            height={32}
            className={styles.image}
          />
          Food
        </Link>
        <Link to="/" className={`${styles.category} ${styles.travel}`}>
          <img src={travel} alt="Travel" width={32} height={32} className={styles.image} />
          Travel
        </Link>
        <Link to="/" className={`${styles.category} ${styles.culture}`}>
          <img src={culture} alt="Culture" width={32} height={32} className={styles.image} />
          Culture
        </Link>
        <Link to="/" className={`${styles.category} ${styles.coding}`}>
          <img src={coding} alt="Coding" width={32} height={32} className={styles.image} />
          Coding
        </Link>
      </div>
    </div>
  );
};
export default CategoryList;
