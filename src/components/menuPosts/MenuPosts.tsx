import React from "react";
import styles from "./menuPosts.module.css";
import { Link } from "react-router-dom";
import p1 from "../../assets/p1.jpeg"

const MenuPosts = ({ withImage }: any) => {
  return (
    <div className={styles.items}>
      <Link to="/" className={styles.item}>
        <div className={styles.imageContainer}>
          <img src={p1} alt="" className={styles.image} />
        </div>
        <div className={styles.textContainer}>
          <span className={`${styles.category} ${styles.travel}`}>Travel</span>
          <h3 className={styles.postTitle}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h3>
          <div className={styles.detail}>
            <span className={styles.username}>John Doe</span>
            <span className={styles.date}> - 10.03.2023</span>
          </div>
        </div>
      </Link>
      <Link to="/" className={styles.item}>
        <div className={styles.imageContainer}>
          <img src={p1} alt="" className={styles.image} />
        </div>

        <div className={styles.textContainer}>
          <span className={`${styles.category} ${styles.culture}`}>
            Culture
          </span>
          <h3 className={styles.postTitle}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h3>
          <div className={styles.detail}>
            <span className={styles.username}>John Doe</span>
            <span className={styles.date}> - 10.03.2023</span>
          </div>
        </div>
      </Link>
      <Link to="/" className={styles.item}>
        <div className={styles.imageContainer}>
          <img src={p1} alt="" className={styles.image} />
        </div>
        <div className={styles.textContainer}>
          <span className={`${styles.category} ${styles.food}`}>Food</span>
          <h3 className={styles.postTitle}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h3>
          <div className={styles.detail}>
            <span className={styles.username}>John Doe</span>
            <span className={styles.date}> - 10.03.2023</span>
          </div>
        </div>
      </Link>
      <Link to="/" className={styles.item}>
        <div className={styles.imageContainer}>
          <img src={p1} alt="" className={styles.image} />
        </div>
        <div className={styles.textContainer}>
          <span className={`${styles.category} ${styles.fashion}`}>
            Fashion
          </span>
          <h3 className={styles.postTitle}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h3>
          <div className={styles.detail}>
            <span className={styles.username}>John Doe</span>
            <span className={styles.date}> - 10.03.2023</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MenuPosts;
