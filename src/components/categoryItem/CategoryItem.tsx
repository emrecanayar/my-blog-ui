import styles from "./categoryItem.module.css";
import { Dropdown, Menu, Spin } from "antd";
import navStyles from "../navbar/navbar.module.css";
import { useEffect, useState } from "react";
import { CategoryListModel } from "../../services/category/dtos/categoryListModel";
import categoryStore from "../../stores/category/categoryStore";
import config from "../../config";
import { useNavigate } from "react-router-dom";

const CategoryItem = () => {
  const [menuColumns, setMenuColumns] = useState("repeat(3, 1fr)");
  const [categories, setCategories] = useState<CategoryListModel>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategoriesData();
    const itemsPerColumn = 4; // Her sütunda gösterilecek maksimum öğe sayısı
    const columnCount = Math.ceil(
      categories ? categories?.count : 0 / itemsPerColumn
    );
    setMenuColumns(`repeat(${columnCount}, 1fr)`);
  }, []);

  const fetchCategoriesData = async () => {
    setLoading(true);
    try {
      const data = await categoryStore.getCategoriesListByDynamic(
        { pageIndex: 0, pageSize: 1000 },
        { filter: undefined }
      );
      if (data && data.items) {
        setCategories(data);
      }
    } catch (error: any) {
      console.log("Kategoriler yüklenirken bir hata oluştu : ", error);
    } finally {
      setLoading(false);
    }
  };

  const menu = loading ? (
    <div className={styles.spinnerContainer}>
      <Spin style={{ alignContent: "center" }} size="large" />
    </div>
  ) : (
    <Menu
      className={styles.customDropdownMenu}
      style={{ gridTemplateColumns: menuColumns }}
    >
      {categories &&
        categories?.items.map((category, index) => (
          <Menu.Item
            key={category.id}
            className={styles.menuItem}
            onClick={() => navigate(`/category/${category.id}`)}
          >
            <img
              src={`${config.FILE_BASE_URL}${category.categoryUploadedFiles?.[0]?.newPath}`}
              alt={category.name}
              className={styles.categoryImage}
            />
            <span className={styles.menuText}>{category.name}</span>
          </Menu.Item>
        ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement="bottomCenter" arrow>
      <div className={navStyles.link}>Kategoriler</div>
    </Dropdown>
  );
};

export default CategoryItem;
