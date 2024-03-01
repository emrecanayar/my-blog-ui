import styles from "./singlePage.module.css";
import p1 from "../../assets/p1.jpeg";
import Comments from "../../components/comments/Comments";
import { Spin, Tag } from "antd";
import { useParams } from "react-router-dom";
import articleStore from "../../stores/article/articleStore";
import { GetByIdArticleResponse } from "../../services/article/dtos/getByIdArticleResponse";
import { useEffect, useState } from "react";
import { handleApiError } from "../../helpers/errorHelpers";
import { formatDateForDate } from "../../helpers/dateHelper";
import config from "../../config";

const SinglePage = () => {
  let { id } = useParams(); // URL'den alınan id
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState<GetByIdArticleResponse>(
    {} as GetByIdArticleResponse
  );

  useEffect(() => {
    fetchArticleData(id as string);
  }, []);

  const fetchArticleData = async (id: string) => {
    setLoading(true);
    try {
      let article = await articleStore.getArticleById(id);
      setArticle(article);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.spinnerContainer}>
          <Spin style={{ alignContent: "center" }} size="large" />{" "}
        </div>
      ) : (
        <div>
          <div className={styles.infoContainer}>
            <div className={styles.textContainer}>
              <h1 className={styles.title}>{article.title}</h1>
              <div className={styles.user}>
                <div className={styles.userImageContainer}>
                  <img src={p1} alt="" className={styles.avatar} />
                </div>
                <div className={styles.userTextContainer}>
                  <span className={styles.username}>
                    {article.user?.firstName} {article.user?.lastName}
                  </span>
                  <span className={styles.date}>
                    {formatDateForDate(article.date)} - {article.category?.name}
                  </span>
                </div>
                .
              </div>
            </div>
            <div className={styles.imageContainer}>
              <img
                src={`${config.FILE_BASE_URL}${
                  article.articleUploadedFiles &&
                  article.articleUploadedFiles[0]?.newPath
                }`}
                alt=""
                className={styles.image}
              />
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.post}>
              <p className={styles.description}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: article.content,
                  }}
                ></div>
              </p>
              <div className={styles.tags}>
                {article.tags &&
                  article.tags.map((tag) => (
                    <Tag color="blue" key={tag.id}>
                      {tag.name}
                    </Tag>
                  ))}
              </div>
              <div className={styles.comment}>
                <Comments />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SinglePage;
