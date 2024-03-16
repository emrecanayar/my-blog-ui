import styles from "./card.module.css";
import { Link } from "react-router-dom";
import { GetListArticleListItemDto } from "../../services/article/dtos/getListArticleListItemDto";
import config from "../../config";
import { formatDate } from "../../helpers/dateHelper";

// Ortak prop türlerini tanımlayın
interface ArticleCardProps {
  item: GetListArticleListItemDto;
  variant?: "default" | "user" | "category"; // Opsiyonel varyant prop'u
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  item,
  variant = "default",
}) => {
  // CSS modülündeki stil isimlerini varyant'a göre seçmek
  let containerStyle = styles.container; // Varsayılan stil
  if (variant === "user") {
    containerStyle = `${styles.container} ${styles.userVariant}`;
  } else if (variant === "category") {
    containerStyle = `${styles.container} ${styles.categoryVariant}`;
  }

  // Ortak TSX yapısını render et
  return (
    <div className={containerStyle}>
      <div className={styles.imageContainer}>
        <img
          src={`${config.FILE_BASE_URL}${item.articleUploadedFiles?.[0]?.newPath}`}
          alt=""
          className={styles.image}
        />
      </div>
      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}>
            {formatDate(item.date.toString())} -{" "}
          </span>
          <span className={styles.category}>{item.category.name}</span>
        </div>
        <Link to="/">
          <h1>{item.title}</h1>
        </Link>
        <p className={styles.desc}>
          <span
            dangerouslySetInnerHTML={{
              __html: item.seoDescription,
            }}
          ></span>
        </p>
        <Link to={`/detail/${item.id}`} className={styles.link}>
          Devamını Oku
        </Link>
      </div>
    </div>
  );
};
export default ArticleCard;
