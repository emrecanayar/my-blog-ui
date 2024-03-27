import {
  CommentOutlined,
  HeartOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import Meta from "antd/es/card/Meta";
import styles from "./trendingArticleCard.module.css";
import { GetListArticleListItemDto } from "../../services/article/dtos/getListArticleListItemDto";
import config from "../../config";
import { Link } from "react-router-dom";

interface TrendingArticleCardProps {
  article: GetListArticleListItemDto;
  loading: boolean;
}

const TrendingArticleCard = ({
  article,
  loading,
}: TrendingArticleCardProps) => {
  return (
    <Card
      loading={loading} // Kartın yüklenme durumu
      hoverable // Kartın üzerine gelindiğinde bir gölge efekti ekler
      style={{
        width: 300,
        marginTop: 16,
        borderRadius: 12,
      }} // Örnek kart genişliği
      className={styles.cardHover}
      actions={[
        // Kartın altında yer alacak ikonlar
        <HeartOutlined key="like" />,
        <CommentOutlined key="comment" />,
        <LinkOutlined key="share" />,
      ]}
    >
      <Meta
        avatar={
          // Avatar resmi
          <Avatar
            src={`${config.FILE_BASE_URL}${article.user?.userUploadedFiles?.[0]?.newPath}`}
          />
        }
        title={
          <div className={styles.customTitle}>
            {article.title} {/* Başlık */}
          </div>
        }
        description={`${article.date}-${article.category.name}`} // Açıklama metni
      />
      <div className={styles.articleImageWrapper}>
        <img
          alt={article.category.name}
          src={`${config.FILE_BASE_URL}${article.articleUploadedFiles?.[0]?.newPath}`} // Gerçek resim linkinizi buraya ekleyin.
        />
      </div>
      <div className={styles.readMoreButton}>
        <Link to={`/detail/${article.id}`}>Devamını Oku</Link>
      </div>
    </Card>
  );
};
export default TrendingArticleCard;
