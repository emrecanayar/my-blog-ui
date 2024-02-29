import React, { useEffect, useState } from "react";
import styles from "./menuPosts.module.css";
import { Link } from "react-router-dom";
import p1 from "../../assets/p1.jpeg";

import articleStore from "../../stores/article/articleStore";
import { ArticleListModel } from "../../services/article/dtos/articleListModel";
import { handleApiError } from "../../helpers/errorHelpers";
import config from "../../config";
import { formatDateForDate } from "../../helpers/dateHelper";
import { Spin } from "antd";

const MenuPosts = ({ withImage }: any) => {
  const [loading, setLoading] = useState(false);
  const [popularArticles, setPopularArticles] = useState<ArticleListModel>(
    {} as ArticleListModel
  );

  useEffect(() => {
    fetcPopulerArticles();
  }, []);

  const fetcPopulerArticles = async () => {
    setLoading(true);
    try {
      let data = await articleStore.getArticlesListByDynamic(
        { pageIndex: 0, pageSize: 4 },
        { sort: [{ field: "viewCount", dir: "desc" }], filter: undefined }
      );
      setPopularArticles(data);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={styles.items}>
      {loading ? (
        <div className={styles.spinnerContainer}>
          <Spin style={{ alignContent: "center" }} size="large" />{" "}
        </div>
      ) : (
        <>
          {popularArticles.items &&
            popularArticles.items.map((article, index) => {
              const dynamicClass = styles[`a${index % 6}`];
              const categoryClass = `${styles.category} ${dynamicClass}`;
              return (
                <>
                  <Link to="/" className={styles.item}>
                    <div className={styles.imageContainer}>
                      <img
                        src={`${config.FILE_BASE_URL}${article.articleUploadedFiles[0].newPath}`}
                        alt=""
                        className={styles.image}
                      />
                    </div>
                    <div className={styles.textContainer}>
                      <span className={categoryClass}>
                        {article.category.name}
                      </span>
                      <h3 className={styles.postTitle}>{article.title}</h3>
                      <div className={styles.detail}>
                        <span className={styles.username}>
                          {article.user.firstName} {article.user.lastName}
                        </span>
                        <span className={styles.date}>
                          {" "}
                          - {formatDateForDate(article.date)}
                        </span>
                      </div>
                    </div>
                  </Link>
                </>
              );
            })}
        </>
      )}
    </div>
  );
};

export default MenuPosts;
