import { useCallback, useEffect, useState } from "react";
import TrendingArticleCard from "../../components/trendingArticleCard/TrendingArticleCard";
import { Col, Input, Row, Spin } from "antd";
import { ArticleListModel } from "../../services/article/dtos/articleListModel";
import articleStore from "../../stores/article/articleStore";
import { handleApiError } from "../../helpers/errorHelpers";
import _ from "lodash";
import styles from "./trending.module.css";
const { Search } = Input;

const Trending = () => {
  const [trendArticles, setTrendArticles] = useState<ArticleListModel>(
    {} as ArticleListModel
  );
  const [loading, setLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchTrendingArticles();
  }, []);

  // Debounce ile kaydırma olayını optimize et
  const loadMoreData = useCallback(
    _.debounce(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
          document.documentElement.scrollHeight - 200 &&
        hasMore &&
        !loading
      ) {
        fetchMoreArticles();
      }
    }, 100),
    [hasMore, loading]
  );

  useEffect(() => {
    window.addEventListener("scroll", loadMoreData);
    return () => window.removeEventListener("scroll", loadMoreData);
  }, [loadMoreData]);

  const fetchTrendingArticles = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await articleStore.getArticlesListByDynamic(
        { pageIndex: 0, pageSize: 8 },
        {
          sort: [{ field: "date", dir: "desc" }],
          filter: undefined,
        }
      );
      setTrendArticles(result);
      setPageIndex(1); // Başlangıçta pageIndex'i 1 olarak ayarla
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreArticles = async () => {
    setLoading(true);
    try {
      const result = await articleStore.getArticlesListByDynamic(
        { pageIndex, pageSize: 8 },
        {
          sort: [{ field: "date", dir: "desc" }],
          filter: undefined,
        }
      );

      if (result.items && result.items.length > 0) {
        setTrendArticles((prevArticles) => ({
          ...prevArticles,
          items: [...prevArticles.items, ...result.items],
        }));
        setPageIndex((prevPageIndex) => prevPageIndex + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const renderLoadingIndicator = () => {
    return loading && hasMore ? (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px",
        }}
      >
        <Spin />
      </div>
    ) : null;
  };

  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}
      >
        <Search
          placeholder="Makale Ara..."
          style={{ maxWidth: 500, width: "100%" }}
          size="large"
        />
      </div>
      <Row gutter={[16, 16]} justify="center">
        {trendArticles.items &&
          trendArticles.items.map((article, index) => (
            <Col
              key={index}
              xs={24}
              sm={12}
              md={8}
              lg={6}
              className={styles.fadeIn}
            >
              <TrendingArticleCard article={article} loading={loading} />
            </Col>
          ))}
      </Row>
      {renderLoadingIndicator()}
    </>
  );
};
export default Trending;
