import { useEffect, useState } from "react";
import articleStore from "../../stores/article/articleStore";
import Card from "../card/Card";
import Pagination from "../pagination/Pagination";
import styles from "./cardList.module.css";
import { ArticleListModel } from "../../services/article/dtos/articleListModel";
import { handleApiError } from "../../helpers/errorHelpers";

const CardList = () => {
  const [articles, setArticles] = useState<ArticleListModel>(
    {} as ArticleListModel
  );

  useEffect(() => {
    fetchArticlesData();
  }, []);

  const fetchArticlesData = async () => {
    try {
      let data = await articleStore.getArticlesListByDynamic(
        { pageIndex: 0, pageSize: 5 },
        { sort: [{ field: "date", dir: "desc" }], filter: undefined }
      );
      setArticles(data);
    } catch (error) {
      handleApiError(error);
    }
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>En Son Gönderiler</h1>
      <div className={styles.posts}>
        {articles.items?.map((item, index) => (
          <Card item={item} key={index} />
        ))}
      </div>
      <Pagination />
    </div>
  );
};
export default CardList;
