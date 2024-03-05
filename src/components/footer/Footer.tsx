import { Link } from "react-router-dom";
import styles from "./footer.module.css";
import githubLogo from "../../assets/github-logo.png";
import linkedinLogo from "../../assets/linkedin.png";
import xLogo from "../../assets/twitter.png";
import whatsappLogo from "../../assets/whatsapp.png";
import { Avatar, Spin } from "antd";
import categoryStore from "../../stores/category/categoryStore";
import { CategoryListModel } from "../../services/category/dtos/categoryListModel";
import { useEffect, useState } from "react";
import { handleApiError } from "../../helpers/errorHelpers";
import tagStore from "../../stores/tag/tagStore";
import { GetListTagListItemDto } from "../../services/tag/dtos/getListTagListItemDto";
import { GetListResponse } from "../../services/base/models/GetListResponse";
import { GetListFooterListItemDto } from "../../services/footer/dtos/getListFooterListItemDto";
import footerStore from "../../stores/footer/footerStore";
import WhatsAppButton from "../whatsAppButton/WhatsAppButton";

const Footer = () => {
  const [categories, setCategories] = useState<CategoryListModel>(
    {} as CategoryListModel
  );

  const [tags, setTags] = useState<GetListResponse<GetListTagListItemDto>>(
    {} as GetListResponse<GetListTagListItemDto>
  );

  const [footers, setFooters] = useState<
    GetListResponse<GetListFooterListItemDto>
  >({} as GetListResponse<GetListFooterListItemDto>);

  const [categoryLoading, setCategoryLoading] = useState<boolean>(false);
  const [tagLoading, setTagLoading] = useState<boolean>(false);
  const [footerLoading, setFooterLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchFooterData();
    fetchCategoriesData();
    fetchTagsData();
  }, []);

  const fetchCategoriesData = async () => {
    setCategoryLoading(true);
    try {
      let categories = await categoryStore.getCategoriesListByDynamic(
        {
          pageIndex: 0,
          pageSize: 4,
        },
        { sort: [{ field: "createdDate", dir: "desc" }], filter: undefined }
      );
      setCategories(categories);
    } catch (error) {
      handleApiError(error);
    } finally {
      setCategoryLoading(false);
    }
  };

  const fetchTagsData = async () => {
    setTagLoading(true);
    try {
      let tags = await tagStore.getList({ pageIndex: 0, pageSize: 4 });
      setTags(tags);
    } catch (error) {
      handleApiError(error);
    } finally {
      setTagLoading(false);
    }
  };

  const fetchFooterData = async () => {
    setFooterLoading(true);
    try {
      let footers = await footerStore.getList({ pageIndex: 0, pageSize: 1 });
      setFooters(footers);
    } catch (error) {
      handleApiError(error);
    } finally {
      setFooterLoading(false);
    }
  };

  return (
    <div className={styles.container} style={{ marginTop: "100px" }}>
      <div className={styles.info}>
        {footerLoading ? (
          <div className={styles.spinnerContainer}>
            <Spin style={{ alignContent: "center" }} size="large" />
          </div>
        ) : (
          <>
            <div className={styles.logo}>
              <Avatar
                size={40}
                src="https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Baby"
              />
              <h1 className={styles.logoText}>{footers.items?.[0]?.title}</h1>
            </div>
            <p className={styles.desc}>{footers.items?.[0]?.description}</p>
          </>
        )}

        <div className={styles.icons}>
          <img src={githubLogo} alt="" width={18} height={18} />
          <img src={linkedinLogo} alt="" width={18} height={18} />
          <img src={xLogo} alt="" width={18} height={18} />
          <WhatsAppButton
            phone="905379184330"
            message="Test"
            icon={whatsappLogo}
            width={18}
            height={18}
          />
        </div>
      </div>
      <div className={styles.links}>
        <div className={styles.list}>
          <span className={styles.listTitle}>Links</span>
          <Link to="/">Anasayfa</Link>
          <Link to="/contact">İletişim</Link>
          <Link to="/about">Hakkımda</Link>
          <Link to="/write">Yaz</Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Kategoriler</span>
          {categoryLoading ? (
            <div className={styles.spinnerContainer}>
              <Spin style={{ alignContent: "center" }} size="large" />
            </div>
          ) : (
            <>
              {categories.items?.map((category, index) => (
                <Link to={`/category/${category.id}`} key={index}>
                  {category.name}
                </Link>
              ))}
            </>
          )}
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Tags</span>
          {tagLoading ? (
            <div className={styles.spinnerContainer}>
              <Spin style={{ alignContent: "center" }} size="large" />
            </div>
          ) : (
            <>
              {tags.items?.map((tag, index) => (
                <Link to="" key={index}>
                  {tag.name}
                </Link>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Footer;
