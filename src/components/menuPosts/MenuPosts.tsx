import React, { useEffect, useState } from "react";
import styles from "./menuPosts.module.css";
import { Link } from "react-router-dom";
import articleStore from "../../stores/article/articleStore";
import { ArticleListModel } from "../../services/article/dtos/articleListModel";
import { handleApiError } from "../../helpers/errorHelpers";
import config from "../../config";
import { formatDateForDate } from "../../helpers/dateHelper";
import { Spin } from "antd";
import editorArticlePickStore from "../../stores/editorArticlePick/editorArticlePickStore";
import { EditorArticlePickListModel } from "../../services/editorArticlePick/dtos/editorArticlePickListModel";

export interface MenuPostsProps {
  withImage: boolean;
  type: number;
}

const MenuPosts = ({ withImage, type }: MenuPostsProps) => {
  const [loading, setLoading] = useState(false);
  const [popularArticles, setPopularArticles] = useState<ArticleListModel>(
    {} as ArticleListModel
  );
  const [editorChoiceArticles, setEditorChoiceArticles] =
    useState<EditorArticlePickListModel>({} as EditorArticlePickListModel);

  useEffect(() => {
    fetchMenuPostsData(type);
  }, [type]);

  const fetchMenuPostsData = async (type: number) => {
    switch (type) {
      case 1:
        fetchPopulerArticles();
        break;
      case 2:
        fetchEditorChoiceArticles();
        break;
      default:
        throw new Error("Invalid type");
    }
  };

  const fetchPopulerArticles = async () => {
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

  const fetchEditorChoiceArticles = async () => {
    setLoading(true);
    try {
      let data = await editorArticlePickStore.getListByDynamic(
        { pageIndex: 0, pageSize: 4 },
        { sort: [{ field: "createdBy", dir: "desc" }], filter: undefined }
      );
      setEditorChoiceArticles(data);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  function PopulerArticle() {
    return (
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
    );
  }

  function EditorChoiceArticle() {
    return (
      <>
        {editorChoiceArticles.items &&
          editorChoiceArticles.items.map((article, index) => {
            const dynamicClass = styles[`a${index % 6}`];
            const categoryClass = `${styles.category} ${dynamicClass}`;
            return (
              <>
                <Link to="/" className={styles.item}>
                  <div className={styles.imageContainer}>
                    <img
                      src={`${config.FILE_BASE_URL}${article.article.articleUploadedFiles[0].newPath}`}
                      alt=""
                      className={styles.image}
                    />
                  </div>
                  <div className={styles.textContainer}>
                    <span className={categoryClass}>
                      {article.article.category.name}
                    </span>
                    <h3 className={styles.postTitle}>
                      {article.article.title}
                    </h3>
                    <div className={styles.detail}>
                      <span className={styles.username}>
                        {article.user.firstName} {article.user.lastName}
                      </span>
                      <span className={styles.date}>
                        {" "}
                        - {formatDateForDate(article.article.date)}
                      </span>
                    </div>
                  </div>
                </Link>
              </>
            );
          })}
      </>
    );
  }

  return (
    <div className={styles.items}>
      {loading ? (
        <div className={styles.spinnerContainer}>
          <Spin style={{ alignContent: "center" }} size="large" />{" "}
        </div>
      ) : (
        <>{type === 1 ? <PopulerArticle /> : <EditorChoiceArticle />}</>
      )}
    </div>
  );
};

export default MenuPosts;
