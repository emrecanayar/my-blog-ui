import styles from "./card.module.css";
import { Link } from "react-router-dom";
import { GetListArticleListItemDto } from "../../services/article/dtos/getListArticleListItemDto";
import config from "../../config";
import { formatDate } from "../../helpers/dateHelper";
import  {
  FacebookOutlined,
  LinkOutlined,
  LinkedinOutlined,
  ShareAltOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Menu, message } from "antd";

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

  const handleCopyLink = () => {
    navigator.clipboard.writeText("test").then(() => {
      message.success("Link panoya kopyalandı!");
    });
  };

  const shareMenu = (
    <Menu>
      <Menu.Item key="0">
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
            window.location.href
          )}&text=${encodeURIComponent(item.title)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <TwitterOutlined /> Twitter'da Paylaş
        </a>
      </Menu.Item>
      <Menu.Item key="1">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            window.location.href
          )}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FacebookOutlined /> Facebook'ta Paylaş
        </a>
      </Menu.Item>
      <Menu.Item key="2">
        <a
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
            window.location.href
          )}&title=${encodeURIComponent(item.title)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedinOutlined /> LinkedIn'de Paylaş
        </a>
      </Menu.Item>
      <Menu.Item key="3">
        <a onClick={handleCopyLink}>
          <LinkOutlined /> Link'i Kopyala
        </a>
      </Menu.Item>
    </Menu>
  );

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
        <div className={styles.actions}>
          <Link to={`/detail/${item.id}`} className={styles.link}>
            Devamını Oku
          </Link>
          <Dropdown
            overlay={shareMenu}
            trigger={["click"]}
            placement="bottomRight"
          >
            <Button icon={<ShareAltOutlined />} shape="circle" />
          </Dropdown>
        </div>
      </div>
    </div>
  );
};
export default ArticleCard;
