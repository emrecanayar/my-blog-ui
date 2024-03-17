import React, { useEffect, useState } from "react";
import styles from "./menuCategories.module.css";
import { Link } from "react-router-dom";
import { handleApiError } from "../../helpers/errorHelpers";
import categoryStore from "../../stores/category/categoryStore";
import { CategoryListModel } from "../../services/category/dtos/categoryListModel";
import { set } from "mobx";
import { Spin } from "antd";

const MenuCategories = () => {
  const [categories, setCategories] = useState<CategoryListModel>(
    {} as CategoryListModel
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategoriesData();
  }, []);

  const fetchCategoriesData = async () => {
    setLoading(true);
    try {
      let categoryList = await categoryStore.getCategoriesListByDynamic(
        {
          pageIndex: 0,
          pageSize: 100,
        },
        { filter: undefined }
      );
      setCategories(categoryList);
    } catch (error) {
      console.error("Error fetching categories data: ", error);
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.categoryList}>
      {loading ? (
        <div className={styles.spinnerContainer}>
          <Spin style={{ alignContent: "center" }} size="large" />{" "}
        </div>
      ) : (
        categories.items?.map((category, index) => {
          const dynamicClass = styles[`a${index % 6}`];
          const categoryClass = `${styles.categoryItem} ${dynamicClass}`;
          return (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className={categoryClass}
            >
              {category.name}
            </Link>
          );
        })
      )}
    </div>
  );
};

export default MenuCategories;
