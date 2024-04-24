import { useEffect, useState } from "react";
import { handleApiError } from "../../helpers/errorHelpers";
import { ArticleListModel } from "../../services/article/dtos/articleListModel";
import articleStore from "../../stores/article/articleStore";
import styles from "./userArticleList.module.css";
import { Spin } from "antd";
import Pagination from "../../components/pagination/Pagination";
import { useParams } from "react-router";
import NotFoundResult from "../../components/results/notFoundResult/notFoundResult";
import ArticleCard from "../../components/articleCard/ArticleCard";

const UserArticleList = () => {
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
            field: "user.id",
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

  const goToPage = (pageNumber: any) => {
    setCurrentPage(pageNumber); // Seçilen sayfa numarasına güncelle
  };

  function HandleUserArticleList({ articles }: any) {
    if (!articles || !articles.items || articles.items.length === 0) {
      return (
        <div>
          <NotFoundResult title="Bu kullanıcıya ait yazı bulunamadı..." />
        </div>
      );
    }

    return (
      <div>
        {articles.items[0]?.user && (
          <span>
            {articles.items[0].user.firstName} {articles.items[0].user.lastName}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span style={{ color: "crimson" }}>
          <HandleUserArticleList articles={articles} />
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
            <ArticleCard key={index} item={item} variant="user" />
          ))
        )}
      </div>
      {articles.pages > 1 && (
        <Pagination
          page={currentPage}
          totalPages={articles.pages} // totalPages değerini doğru bir şekilde articles'dan almalısınız
          hasPrev={articles.hasPrevious}
          hasNext={articles.hasNext}
          onPrev={goToPrevPage}
          onNext={goToNextPage}
          onPageSelect={goToPage} // İşte burada goToPage fonksiyonunu prop olarak geçiriyoruz
        />
      )}
    </div>
  );
};
export default UserArticleList;
