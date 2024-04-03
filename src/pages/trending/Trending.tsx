import { useCallback, useEffect, useState } from "react";
import TrendingArticleCard from "../../components/trendingArticleCard/TrendingArticleCard";
import { AutoComplete, Col, Input, Row, SelectProps, Spin } from "antd";
import { ArticleListModel } from "../../services/article/dtos/articleListModel";
import articleStore from "../../stores/article/articleStore";
import { handleApiError } from "../../helpers/errorHelpers";
import _ from "lodash";
import styles from "./trending.module.css";
import { UserOutlined } from "@ant-design/icons";
import { CategoryListModel } from "../../services/category/dtos/categoryListModel";
import categoryStore from "../../stores/category/categoryStore";

const Trending = () => {
  const [trendArticles, setTrendArticles] = useState<ArticleListModel>(
    {} as ArticleListModel
  );
  const [loading, setLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [popularCategories, setPopularCategories] =
    useState<CategoryListModel>();
  const [popularArticles, setPopularArticles] = useState<ArticleListModel>(
    {} as ArticleListModel
  );

  useEffect(() => {
    fetchTrendingArticles();
    fetchPopulerCategories();
    fetchPopulerArticles();
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

  // Popüler kategorileri ve makaleleri setOptions ile ayarlayan fonksiyon
  const setOptionsWithCategoriesAndArticles = () => {
    const categoryOptions =
      popularCategories?.items?.map((category) => ({
        value: category.name,
        label: (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {category.name}
            <span></span>
          </div>
        ),
      })) || [];

    const articleOptions =
      popularArticles?.items?.map((article) => ({
        value: article.title,
        label: (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {article.title}
            <span></span>
          </div>
        ),
      })) || [];

    setOptions([
      {
        label: renderTitle("Popüler Kategoriler"),
        options: categoryOptions,
      },
      {
        label: renderTitle("Popüler Makaleler"),
        options: articleOptions,
      },
    ]);
  };

  useEffect(() => {
    // API'den veri çekme işlemleri sonrasında options güncelle
    setOptionsWithCategoriesAndArticles();
  }, [popularCategories, popularArticles]); // Bağımlılıklar eklendi

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

  const fetchPopulerCategories = async () => {
    try {
      const data = await categoryStore.getCategoriesListByDynamic(
        { pageIndex: 0, pageSize: 6 },
        { filter: { field: "isPopular", operator: "eq", value: "true" } }
      );
      if (data && data.items) {
        setPopularCategories(data);
      }
    } catch (error: any) {
      console.log("Kategoriler yüklenirken bir hata oluştu : ", error);
      handleApiError(error);
    }
  };

  const fetchPopulerArticles = async () => {
    try {
      let data = await articleStore.getArticlesListByDynamic(
        { pageIndex: 0, pageSize: 4 },
        { sort: [{ field: "viewCount", dir: "desc" }], filter: undefined }
      );
      setPopularArticles(data);
    } catch (error) {
      handleApiError(error);
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

  const renderTitle = (title: string) => (
    <span>
      {title}
      <a
        style={{ float: "right" }}
        href="https://www.google.com/search?q=antd"
        target="_blank"
        rel="noopener noreferrer"
      >
        daha fazla
      </a>
    </span>
  );

  const renderItem = (title: string, count: number) => ({
    value: title,
    label: (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {title}
        <span>{count}</span>
      </div>
    ),
  });

  const [options, setOptions] = useState<SelectProps<object>["options"]>([
    {
      label: renderTitle("Kategoriler"),
      options: [
        renderItem("AntDesign UI FAQ", 60100),
        renderItem("AntDesign FAQ", 30010),
      ],
    },
    {
      label: renderTitle("Makaleler"),
      options: [renderItem("AntDesign design language", 100000)],
    },
  ]);

  const getRandomInt = (max: number, min = 0) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const searchResult = (query: string) =>
    new Array(getRandomInt(5))
      .join(".")
      .split(".")
      .map((_, idx) => {
        const category = `${query}${idx}`;
        return {
          value: category,
          label: (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>
                Found {query} on{" "}
                <a
                  href={`https://s.taobao.com/search?q=${query}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {category}
                </a>
              </span>
              <span>{getRandomInt(200, 100)} results</span>
            </div>
          ),
        };
      });

  // Kullanıcı arama yapınca çağrılacak
  const handleSearch = (value: string) => {
    if (value) {
      // Kullanıcı bir şeyler yazdıysa, dinamik sonuçları göster
      setOptions(searchResult(value));
    } else {
      // Kullanıcı arama kutusunu boşaltırsa, varsayılan seçenekleri geri yükle
      setOptionsWithCategoriesAndArticles();
    }
  };
  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}
      >
        <AutoComplete
          popupClassName="certain-category-search-dropdown"
          popupMatchSelectWidth={500}
          style={{ maxWidth: 500, width: "100%" }}
          options={options}
          size="large"
          placeholder="Ara..."
          onSearch={handleSearch}
        >
          <Input.Search size="large" placeholder="Ara..." enterButton />
        </AutoComplete>
      </div>
      <Row gutter={[16, 16]} justify="start">
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
