import styles from "./card.module.css";
import p1 from "../../assets/p1.jpeg";
import { Link } from "react-router-dom";

const Card = ({ key, item }: any) => {
  return (
    <div className={styles.container} key={key}>
      <div className={styles.imageContainer}>
        <img src={p1} alt="" className={styles.image} />
      </div>
      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}>31.01.2024 - </span>
          <span className={styles.category}>CULTURE</span>
        </div>
        <Link to="/">
          <h1>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero,
            voluptatum!
          </h1>
        </Link>
        <p className={styles.desc}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, non minus
          nesciunt aliquam amet, cupiditate aliquid distinctio quasi alias
          beatae culpa dolorem voluptatem mollitia. Deleniti harum sint at quis
          ea.
        </p>
        <Link to={`/`} className={styles.link}>
          Daha Fazla
        </Link>
      </div>
    </div>
  );
};
export default Card;
