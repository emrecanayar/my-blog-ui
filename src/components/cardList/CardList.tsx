import { useEffect, useRef, useState } from "react";
import articleStore from "../../stores/article/articleStore";
import Pagination from "../pagination/Pagination";
import styles from "./cardList.module.css";
import { ArticleListModel } from "../../services/article/dtos/articleListModel";
import { handleApiError } from "../../helpers/errorHelpers";
import { Spin } from "antd";
import ArticleCard from "../articleCard/ArticleCard";
import { LoadingOutlined } from "@ant-design/icons";

const CardList = () => {
  const topOfTheListRef = useRef<HTMLDivElement>(null);
  const [articles, setArticles] = useState<ArticleListModel>(
    {} as ArticleListModel
  );

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetchArticlesData();
  }, [currentPage]);

  // Yeni içeriğin yüklenmesini takiben scroll işlemi için ek useEffect.
  useEffect(() => {
    // currentPage'nin ilk yüklenme anında olmamasını sağlamak için kontrol.
    // Eğer ilk sayfa ise ve kullanıcı daha önce "ileri" butonuna basmadıysa scroll yapılmaz.
    if (currentPage !== 0) {
      scrollToTopOfTheList();
    }
  }, [articles]); // articles değiştiğinde tetiklenir.

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

  const scrollToTopOfTheList = () => {
    topOfTheListRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Sayfa değiştirme fonksiyonları
  const goToPrevPage = () => {
    if (articles.hasPrevious) {
      setCurrentPage(currentPage - 1);
      scrollToTopOfTheList();
    }
  };

  const goToNextPage = () => {
    if (articles.hasNext) {
      setCurrentPage(currentPage + 1);
      scrollToTopOfTheList();
    }
  };

  const goToPage = (pageNumber: any) => {
    setCurrentPage(pageNumber); // Seçilen sayfa numarasına güncelle
    scrollToTopOfTheList(); // Liste başına otomatik kaydır
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title} ref={topOfTheListRef}>
        En Son Gönderiler
      </h1>
      <div className={styles.posts}>
        {loading ? (
          <div className={styles.spinnerContainer}>
            <Spin
              indicator={
                <LoadingOutlined
                  style={{ fontSize: 24, alignContent: "center" }}
                  spin
                />
              }
            ></Spin>
          </div>
        ) : (
          articles.items?.map((item, index) => (
            <ArticleCard item={item} key={index} />
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
export default CardList;
