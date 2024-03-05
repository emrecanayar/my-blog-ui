import styles from "./featured.module.css";
import p1 from "../../assets/p1.jpeg";
import featureStore from "../../stores/feature/featureStore";
import { GetListFeatureListItemDto } from "../../services/feature/dtos/getListFeatureListItemDto";
import { useEffect, useState } from "react";
import { handleApiError } from "../../helpers/errorHelpers";
import { Spin } from "antd";
import headArticleFeatureStore from "../../stores/headArticleFeature/headArticleFeatureStore";
import { GetListHeadArticleFeatureListItemDto } from "../../services/headArticleFeature/dtos/getListHeadArticleFeatureListItemDto";
import { GetListResponse } from "../../services/base/models/GetListResponse";
import config from "../../config";
import { Link } from "react-router-dom";

const Featured = () => {
  const [feature, setFeature] = useState<GetListFeatureListItemDto[]>(
    [] as GetListFeatureListItemDto[]
  );
  const [headArticleFeature, setHeadArticleFeature] = useState<
    GetListResponse<GetListHeadArticleFeatureListItemDto>
  >({} as GetListResponse<GetListHeadArticleFeatureListItemDto>);
  const [titleLoading, setTitleLoading] = useState<boolean>(false);
  const [headArticleFeatureLoading, setHeadArticleFeatureLoading] =
    useState<boolean>(false);

  useEffect(() => {
    fetchFeatureData();
    fetchHeadArticleFeatureData();
  }, []);

  const fetchFeatureData = async () => {
    setTitleLoading(true);
    try {
      let response = await featureStore.getlist();
      setFeature(response);
    } catch (error) {
      handleApiError(error);
    } finally {
      setTitleLoading(false);
    }
  };

  const fetchHeadArticleFeatureData = async () => {
    setHeadArticleFeatureLoading(true);
    try {
      let response = await headArticleFeatureStore.getList({
        pageIndex: 0,
        pageSize: 4,
      });
      setHeadArticleFeature(response);
    } catch (error) {
      handleApiError(error);
    } finally {
      setHeadArticleFeatureLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {titleLoading ? (
          <div className={styles.spinnerContainer}>
            <Spin style={{ alignContent: "center" }} size="large" />{" "}
          </div>
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: feature.length > 0 ? feature[0].title : "",
            }}
          ></div>
        )}
      </h1>
      <div className={styles.post}>
        {headArticleFeatureLoading ? (
          <div className={styles.spinnerContainer}>
            <Spin style={{ alignContent: "center" }} size="large" />{" "}
          </div>
        ) : (
          <>
            <div className={styles.imgContainer} style={{}}>
              <img
                src={`${config.FILE_BASE_URL}${headArticleFeature.items?.[0]?.headArticleFeatureUploadedFiles?.[0]?.newPath}`}
                alt="İlk Paragraf Görseli"
                className={styles.image}
              />
            </div>
            <div className={styles.textContainer}>
              <h1 className={styles.postTitle}>
                {headArticleFeature.items?.[0]?.title}
              </h1>
              <p className={styles.postDesc}>
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      headArticleFeature.items?.length > 0
                        ? headArticleFeature.items?.[0]?.content
                        : "",
                  }}
                ></div>
              </p>
              <Link
                to={`/category/${headArticleFeature.items?.[0]?.categoryId}`}
                className={styles.button}
              >
                Daha Fazla
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Featured;
