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
import { Filter } from "../../services/base/models/Filter";
import noResultImage from "../../assets/noResult.png";
import { LoadingOutlined } from "@ant-design/icons";

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
  const [isSearching, setIsSearching] = useState(false); // Arama yapılıp yapılmadığının durumunu tutacak state

  const [autoCompleteKey, setAutoCompleteKey] = useState(
    Math.random().toString()
  );

  const [filter, setFilter] = useState<Filter | undefined>(
    ({} as Filter) || undefined
  );

  const [open, setOpen] = useState(false);
  const [initialClick, setInitialClick] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

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

  useEffect(() => {
    if (searchData.items && searchData.items.length > 0) {
      setOpen(true); // Sonuçlar varsa açılır menüyü aç
    } else {
      setOpen(false); // Sonuç yoksa açılır menüyü kapat
    }
  }, [searchData]);

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

  const fetchTrendingArticles = async (name?: string) => {
    if (loading) return;

    let filter = undefined;
    if (name !== undefined && name !== "") {
      filter = {
        field: "category.name",
        operator: "contains",
        value: name,
        logic: "or",
        filters: [
          {
            field: "title",
            operator: "contains",
            value: name,
            logic: "or",
          },
        ],
      };

      setFilter({
        field: "category.name",
        operator: "contains",
        value: name,
        logic: "or",
        filters: [
          {
            field: "title",
            operator: "contains",
            value: name,
            logic: "or",
          },
        ],
      });
    } else {
      setFilter(undefined);
    }

    try {
      setLoading(true);
      const result = await articleStore.getArticlesListByDynamic(
        { pageIndex: 0, pageSize: 8 },
        {
          sort: [{ field: "date", dir: "desc" }],
          filter: filter, // Filtre uygula
        }
      );
      setTrendArticles(result);
      setPageIndex(1);
      setHasMore(result.hasNext); // Burada da `hasNext`'i ayarlayın
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSelect = async (value: any, option: any) => {
    setIsSearching(true);
    // Arama sonuçlarından bir seçim yapıldığında yapılacak işlem
    await fetchArticleDetailsById(value);
    setAutoCompleteKey(Math.random().toString());
    setSearchData({} as ArticleSearchListModel); // Arama sonuçlarını temizle
    setFilter(undefined); // Kullanıcı bir makale seçtiğinde filtreyi temizleyin
    setIsSearching(false);
  };

  const handleInitialSelect = async (value: any, option: any) => {
    setIsSearching(true);
    await fetchTrendingArticles(value);
    setIsSearching(false);
    setOpen(false); // Kullanıcı bir seçim yaptığında açılır menüyü kapat
    // Kullanıcıya kategorilere veya makalelere göre filtrelenmiş sonuçlar göstermek gibi.
  };

  const fetchMoreArticles = async () => {
    if (!hasMore || loading) return;
    setLoading(true);
    try {
      const result = await articleStore.getArticlesListByDynamic(
        { pageIndex, pageSize: 8 },
        {
          sort: [{ field: "date", dir: "desc" }],
          filter: filter,
        }
      );

      if (result.items && result.items.length > 0) {
        setTrendArticles((prevArticles) => ({
          ...prevArticles,
          items: [...prevArticles.items, ...result.items],
        }));
        setPageIndex((prevPageIndex) => prevPageIndex + 1);
        setHasMore(result.hasNext);
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
        <Spin
            indicator={<LoadingOutlined style={{ fontSize: 24,alignContent: "center" }} spin />}
          ></Spin>
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
        setSearchPerformed(true);
        await fetchGetListByDynamicForSearchArticle(value);
        setOpen(true); // Kullanıcı arama yaptığında açılır menüyü aç
      } else if (isFocused && !value) {
        // Eğer kullanıcı tüm metni silerse ve bileşen hala odaklanmışsa, başlangıç seçeneklerini göster
        setOpen(true);
      } else {
        // Arama kutusu boşaldığında popüler kategorileri ve makaleleri yeniden yükle

        setOptionsWithCategoriesAndArticles();
        setOpen(false); // Kullanıcı arama yaptığında açılır menüyü aç
      }
    }, 300),
    // useCallback hook'unun bağımlılıklar listesini güncelleyin
    [fetchGetListByDynamicForSearchArticle, setOptionsWithCategoriesAndArticles]
  );

  const handleFocus = () => {
    if (initialClick) {
      setOpen(true); // Kullanıcı ilk odaklandığında açılır menüyü aç
      setInitialClick(false); // İlk tıklama yapıldı olarak işaretle
    }
  };

  const handleClickSearch = (value: string) => {
    setSearchPerformed(true); // Arama yapıldığını belirten state'i güncelle
    fetchTrendingArticles(value);
    setSearchData({} as ArticleSearchListModel); // Arama sonuçlarını temizle
    setFilter(undefined); // Kullanıcı bir makale seçtiğinde filtreyi temizleyin
    setIsSearching(false);
  };

  const NoResultsFound = () => (
    <div className={styles.noResultsContainer}>
      <img
        src={noResultImage}
        alt="No Results"
        className={styles.noResultsImage}
      />
      <div className={styles.noResultsText}>
        Aramanızla eşleşen bir sonuç bulunamadı.
      </div>
      <div className={styles.noResultsSubtext}>
        Farklı anahtar kelimelerle arama yapmayı deneyin.
      </div>
    </div>
  );

  return (
    <>
      {isSearching && (
        <div className={styles.loadingContainer}>
         <Spin
            indicator={<LoadingOutlined style={{ fontSize: 24,alignContent: "center" }} spin />}
          ></Spin>
        </div>
      )}
      <div
        style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}
      >
        <AutoComplete
          key={autoCompleteKey}
          popupClassName="certain-category-search-dropdown"
          popupMatchSelectWidth={500}
          open={open}
          style={{ maxWidth: 500, width: "100%" }}
          options={options}
          size="large"
          onFocus={handleFocus}
          placeholder="Ara..."
          onSearch={handleSearch}
          onSelect={(value, option) => {
            // Eğer arama sonuçları varsa ve kullanıcı bir arama yaptıysa, arama sonuçlarından birini seçtiğini varsayalım.
            if (searchData && searchData.items && searchData.items.length > 0) {
              handleSearchSelect(value, option);
            } else {
              handleInitialSelect(value, option);
            }
          }}
          value={isSearching ? "" : undefined} // Eğer arama yapılıyorsa input değeri boş olacak
        >
          <Input.Search
            size="large"
            placeholder="Ara..."
            enterButton
            onSearch={(value) => {
              handleClickSearch(value);
            }}
          />
        </AutoComplete>
      </div>
      {trendArticles.items && trendArticles.items.length > 0 ? (
        <Row gutter={[16, 16]} justify="start">
          {trendArticles.items.map((article, index) => (
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
      ) : !isSearching && searchPerformed ? (
        // Arama yapıldı ancak sonuç bulunamadıysa NoResultsFound bileşeni gösterilir
        <NoResultsFound />
      ) : null}
      {renderLoadingIndicator()}
    </>
  );
};
export default Trending;
