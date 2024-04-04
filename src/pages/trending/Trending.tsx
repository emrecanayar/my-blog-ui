import { useCallback, useEffect, useState } from "react";
import TrendingArticleCard from "../../components/trendingArticleCard/TrendingArticleCard";
import { AutoComplete, Col, Input, Row, SelectProps, Spin } from "antd";
import { ArticleListModel } from "../../services/article/dtos/articleListModel";
import articleStore from "../../stores/article/articleStore";
import { handleApiError } from "../../helpers/errorHelpers";
import _ from "lodash";
import styles from "./trending.module.css";
import { CategoryListModel } from "../../services/category/dtos/categoryListModel";
import categoryStore from "../../stores/category/categoryStore";
import { ArticleSearchListModel } from "../../services/article/dtos/articleSearchListModel";

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

  const [searchData, setSearchData] = useState<ArticleSearchListModel>(
    {} as ArticleSearchListModel
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

  useEffect(() => {
    if (searchData && searchData.items && searchData.items.length > 0) {
      const newOptions = processSearchData(searchData);
      setOptions(newOptions);
    } else {
      setOptionsWithCategoriesAndArticles();
    }
  }, [searchData, popularCategories, popularArticles]); // Bağımlılıkları güncelledim.

  const processSearchData = (data: ArticleSearchListModel) => {
    return (
      data.items &&
      data.items.map((article: any) => ({
        value: article.id, // value olarak makalenin benzersiz ID'si kullanılır
        label: (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <strong>{article.title}</strong> {/* Makale başlığı */}
            <span>Kategori - {`${article.categoryName}`}</span>{" "}
            {/* Kategori ve yazar */}
          </div>
        ),
      }))
    );
  };

  const fetchTrendingArticles = async () => {
    if (loading) return;
    setLoading(true);
    let filter = undefined;
    try {
      const result = await articleStore.getArticlesListByDynamic(
        { pageIndex: 0, pageSize: 8 },
        {
          sort: [{ field: "date", dir: "desc" }],
          filter: filter, // Filtre uygula
        }
      );
      setTrendArticles(result);
      setPageIndex(1);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = async (value: any, option: any) => {
    await fetchArticleDetailsById(value);
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

  const fetchGetListByDynamicForSearchArticle = async (value: string) => {
    try {
      const data = await articleStore.getListByDynamicForSearchArticle(
        { pageIndex: 0, pageSize: 20 },
        {
          sort: [{ field: "date", dir: "desc" }],
          filter: {
            field: "category.name",
            operator: "contains",
            value: value,
            logic: "or",
            filters: [
              {
                field: "title",
                operator: "contains",
                value: value,
                logic: "or",
              },
            ],
          },
        }
      );

      setSearchData(data);
    } catch (error) {
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

  const fetchArticleDetailsById = async (articleId: string) => {
    try {
      const response = await articleStore.getArticleByIdForSearch(articleId); // await ekleyin.
      // Tek bir makale döndüğü için, items dizisini tek elemanlı bir dizi ile güncelle
      console.log("Response", response);
      setTrendArticles({
        items: [response], // response'un bir diziye konulduğuna emin olun
        index: 0, // Varsayılan veya mevcut değerler
        size: 1,
        count: 1,
        pages: 1,
        hasPrevious: false, // Sayfalama için önceki sayfa yok
        hasNext: false, // Sayfalama için sonraki sayfa yok
      });
    } catch (error) {
      console.error("Makale detayları yüklenirken bir hata oluştu:", error);
    }
  };

  const handleSearch = useCallback(
    _.debounce(async (value) => {
      if (value) {
        await fetchGetListByDynamicForSearchArticle(value);
      } else {
        // Arama kutusu boşaldığında popüler kategorileri ve makaleleri yeniden yükle
        setOptionsWithCategoriesAndArticles();
      }
    }, 300),
    // useCallback hook'unun bağımlılıklar listesini güncelleyin
    [fetchGetListByDynamicForSearchArticle, setOptionsWithCategoriesAndArticles]
  );

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
          onSelect={handleSelect}
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
