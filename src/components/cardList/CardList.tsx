import { useEffect, useState } from "react";
import articleStore from "../../stores/article/articleStore";
import Card from "../card/Card";
import Pagination from "../pagination/Pagination";
import styles from "./cardList.module.css";
import { ArticleListModel } from "../../services/article/dtos/articleListModel";
import { handleApiError } from "../../helpers/errorHelpers";
import { Spin } from "antd";

const CardList = () => {
  const [articles, setArticles] = useState<ArticleListModel>(
    {} as ArticleListModel
  );

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetchArticlesData();
  }, [currentPage]);

  const fetchArticlesData = async () => {
    setLoading(true);
    try {
      let data = await articleStore.getArticlesListByDynamic(
        { pageIndex: currentPage, pageSize: 4 },
        { sort: [{ field: "date", dir: "desc" }], filter: undefined }
      );
      setArticles(data);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  // Sayfa değiştirme fonksiyonları
  const goToPrevPage = () => {
    if (articles.hasPrevious) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (articles.hasNext) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>En Son Gönderiler</h1>
      <div className={styles.posts}>
        {loading ? (
          <div className={styles.spinnerContainer}>
            <Spin style={{ alignContent: "center" }} size="large" />{" "}
          </div>
        ) : (
          articles.items?.map((item, index) => (
            <Card item={item} key={index} id={index} />
          ))
        )}
      </div>
      {articles.pages > 1 && (
        <Pagination
          page={currentPage}
          hasPrev={articles.hasPrevious}
          hasNext={articles.hasNext}
          onPrev={goToPrevPage}
          onNext={goToNextPage}
        />
      )}
    </div>
  );
};
export default CardList;
