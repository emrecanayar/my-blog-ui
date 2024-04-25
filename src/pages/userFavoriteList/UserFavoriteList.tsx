import { useEffect, useState } from "react";
import styles from "./userFavoriteList.module.css";
import favoriteArticleStore from "../../stores/favoriteArticle/favoriteArticleStore";
import { GetListFavoriteArticleListItemDto } from "../../services/favoriteArticle/dtos/getListFavoriteArticleListItemDto";
import { GetListResponse } from "../../services/base/models/GetListResponse";
import { handleApiError } from "../../helpers/errorHelpers";
import NotFoundResult from "../../components/results/notFoundResult/notFoundResult";
import { Spin } from "antd";
import ArticleCard from "../../components/articleCard/ArticleCard";
import Pagination from "../../components/pagination/Pagination";
import { LoadingOutlined } from "@ant-design/icons";

const UserFavoriteList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [favoriteArticles, setFavoriteArticles] = useState<
    GetListResponse<GetListFavoriteArticleListItemDto>
  >({} as GetListResponse<GetListFavoriteArticleListItemDto>);

  useEffect(() => {
    fetchFavoriteArticlesData();
  }, [currentPage]);

  const fetchFavoriteArticlesData = async () => {
    setLoading(true);
    try {
      let data = await favoriteArticleStore.getListFavoriteArticle({
        pageIndex: currentPage,
        pageSize: 4,
      });
      setFavoriteArticles(data);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  // Sayfa değiştirme fonksiyonları
  const goToPrevPage = () => {
    if (favoriteArticles.hasPrevious) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (favoriteArticles.hasNext) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPage = (pageNumber: any) => {
    setCurrentPage(pageNumber); // Seçilen sayfa numarasına güncelle
  };

  function HandleFavoriteUserArticleList({ articles }: any) {
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
            {articles.items[0].user.firstName} {articles.items[0].user.lastName} - Favori Yazılar
          </span>
        )}
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span style={{ color: "crimson" }}>
          <HandleFavoriteUserArticleList articles={favoriteArticles} />
        </span>
      </h1>
      <div className={styles.posts}>
        {loading ? (
          <div className={styles.spinnerContainer}>
         <Spin
            indicator={<LoadingOutlined style={{ fontSize: 24,alignContent: "center" }} spin />}
          ></Spin>
          </div>
        ) : (
          favoriteArticles.items &&
          favoriteArticles.items?.map((item, index) => (
            <ArticleCard key={index} item={item.article} variant="user" />
          ))
        )}
      </div>
      {favoriteArticles.pages > 1 && (
        <Pagination
        page={currentPage}
        totalPages={favoriteArticles.pages} // totalPages değerini doğru bir şekilde articles'dan almalısınız
        hasPrev={favoriteArticles.hasPrevious}
        hasNext={favoriteArticles.hasNext}
        onPrev={goToPrevPage}
        onNext={goToNextPage}
        onPageSelect={goToPage} // İşte burada goToPage fonksiyonunu prop olarak geçiriyoruz
      />
      )}
    </div>
  );
};
export default UserFavoriteList;
