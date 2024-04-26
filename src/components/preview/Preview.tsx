import { useEffect, useState } from "react";
import styles from "./preview.module.css";
import { Spin, Tag } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { formatDateForDate } from "../../helpers/dateHelper";
import config from "../../config";
import userStore from "../../stores/user/userStore";
import { CreateArticleCommand } from "../../services/article/dtos/createArticleCommand";
import categoryStore from "../../stores/category/categoryStore";
import { GetByIdCategoryResponse } from "../../services/category/dtos/getByIdCategoryResponse";
import { handleApiError } from "../../helpers/errorHelpers";

export interface IPreviewProps {
  article: CreateArticleCommand;
  uploadedFilePath: string;
}

const Preview = ({ article, uploadedFilePath }: IPreviewProps) => {
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<GetByIdCategoryResponse>(
    {} as GetByIdCategoryResponse
  );

  useEffect(() => {
    fetchCategoryDetail();
  }, []);

  const fetchCategoryDetail = async () => {
    try {
      setLoading(true);
      let categoryDetail = await categoryStore.getById(article.categoryId);
      setCategory(categoryDetail);
    } catch (error) {
      handleApiError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.spinnerContainer}>
          <Spin
            indicator={
              <LoadingOutlined
                style={{ fontSize: 24, alignContent: "center" }}
                spin
              />
            }
          ></Spin>
        </div>
      ) : (
        <div>
          <div className={styles.infoContainer}>
            <div className={styles.textContainer}>
              <h1 className={styles.title}>{article.title}</h1>
              <div className={styles.user}>
                <div className={styles.userImageContainer}>
                  <img
                    src={`${config.FILE_BASE_URL}${userStore.userInformation.userUploadedFiles?.[0]?.newPath}`}
                    alt=""
                    className={styles.avatar}
                  />
                </div>
                <div className={styles.userTextContainer}>
                  <span className={styles.username}>
                    {userStore.userInformation?.firstName}{" "}
                    {userStore.userInformation?.lastName}
                  </span>
                  <span className={styles.date}>
                    {formatDateForDate(new Date())} - {category?.name}
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.imageContainer}>
              <img
                src={`${config.FILE_BASE_URL}${uploadedFilePath}`}
                alt=""
                className={styles.image}
              />
            </div>
          </div>

          <div className={styles.content}>
            <div className={styles.post}>
              <p className={styles.description}>
                <div
                  className="ql-editor"
                  dangerouslySetInnerHTML={{
                    __html: article.content,
                  }}
                ></div>
              </p>
              <div className={styles.tags}>
                {article.tags &&
                  article.tags.map((tag: any) => (
                    <Tag color="blue" key={tag}>
                      {tag}
                    </Tag>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Preview;
