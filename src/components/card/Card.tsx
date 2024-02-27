import styles from "./card.module.css";
import { Link } from "react-router-dom";
import { GetListArticleListItemDto } from "../../services/article/dtos/getListArticleListItemDto";
import config from "../../config";
import { formatDate } from "../../helpers/dateHelper";

export interface CardProps {
  key: number;
  item: GetListArticleListItemDto;
}

const Card = ({ key, item }: any) => {
  return (
    <div className={styles.container} key={key}>
      <div className={styles.imageContainer}>
        <img
          src={`${config.FILE_BASE_URL}${item.articleUploadedFiles[0].newPath}`}
          alt=""
          className={styles.image}
        />
      </div>
      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}>{formatDate(item.date)} - </span>
          <span className={styles.category}>{item.category.name}</span>
        </div>
        <Link to="/">
          <h1>{item.title}</h1>
        </Link>
        <p className={styles.desc}>{item.seoDescription}</p>
        <Link to={`/`} className={styles.link}>
          Daha Fazla
        </Link>
      </div>
    </div>
  );
};
export default Card;
