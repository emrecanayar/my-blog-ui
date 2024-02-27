import { Link } from "react-router-dom";
import styles from "./categoryList.module.css";
import categoryStore from "../../stores/category/categoryStore";
import { useEffect, useState } from "react";
import { CategoryListModel } from "../../services/category/dtos/categoryListModel";
import config from "../../config";
import { Spin } from "antd";

const CategoryList = () => {
  const [popularCategories, setPopularCategories] =
    useState<CategoryListModel>();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPopularCategories();
  }, []);

  const fetchPopularCategories = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Popüler Kategoriler</h1>
      {loading ? (
        <div className={styles.spinnerContainer}>
          <Spin style={{ alignContent: "center" }} size="large" />{" "}
        </div>
      ) : (
        <div className={styles.categories}>
          {popularCategories?.items.map((category, index) => {
            const dynamicClass = styles[`a${index % 6}`];
            const categoryClass = `${styles.category} ${dynamicClass}`;
            return (
              <Link
                to={`/category/${category.id}`}
                className={categoryClass}
                key={category.id}
              >
                <img
                  src={`${config.FILE_BASE_URL}${category.categoryUploadedFiles[0].newPath}`}
                  alt={category.name}
                  width={32}
                  height={32}
                  className={styles.image}
                />
                {category.name}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default CategoryList;
