import { useEffect, useState } from "react";
import { handleApiError } from "../../helpers/errorHelpers";
import { ArticleListModel } from "../../services/article/dtos/articleListModel";
import articleStore from "../../stores/article/articleStore";
import styles from "./categoryArticleList.module.css";
import { Spin } from "antd";
import Pagination from "../../components/pagination/Pagination";
import { useParams } from "react-router";
import NotFoundResult from "../../components/results/notFoundResult/notFoundResult";
import ArticleCard from "../../components/card/ArticleCard";

const CategoryArticleList = () => {
  const [articles, setArticles] = useState<ArticleListModel>(
    {} as ArticleListModel
  );

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    fetchArticlesData();
  }, [currentPage]);

  const fetchArticlesData = async () => {
    setLoading(true);
    try {
      let data = await articleStore.getArticlesListByDynamic(
        { pageIndex: currentPage, pageSize: 4 },
        {
          sort: [{ field: "date", dir: "desc" }],
          filter: {
            field: "category.id",
            operator: "eq",
            value: `${id}`,
          },
        }
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

  function HandleCategoryArticleList({ articles }: any) {
    if (!articles || !articles.items || articles.items.length === 0) {
      return (
        <div>
          <NotFoundResult title="Bu kategoriye ait yazı bulunamadı..." />
        </div>
      );
    }

    return (
      <div>
        {articles.items[0]?.category?.name && (
          <span>{articles.items[0].category.name}</span>
        )}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span style={{ color: "crimson" }}>
          <HandleCategoryArticleList articles={articles} />
        </span>
      </h1>
      <div className={styles.posts}>
        {loading ? (
          <div className={styles.spinnerContainer}>
            <Spin style={{ alignContent: "center" }} size="large" />{" "}
          </div>
        ) : (
          articles.items &&
          articles.items?.map((item, index) => (
            <ArticleCard key={index} item={item} variant="category" />
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
export default CategoryArticleList;
