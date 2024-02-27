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

  useEffect(() => {
    fetchArticlesData();
  }, []);

  const fetchArticlesData = async () => {
    setLoading(true);
    try {
      let data = await articleStore.getArticlesListByDynamic(
        { pageIndex: 0, pageSize: 5 },
        { sort: [{ field: "date", dir: "desc" }], filter: undefined }
      );
      setArticles(data);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
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
      <Pagination />
    </div>
  );
};
export default CardList;
