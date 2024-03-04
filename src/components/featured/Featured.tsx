import styles from "./featured.module.css";
import p1 from "../../assets/p1.jpeg";
import featureStore from "../../stores/feature/featureStore";
import { GetListFeatureListItemDto } from "../../services/feature/dtos/getListFeatureListItemDto";
import { useEffect, useState } from "react";
import { handleApiError } from "../../helpers/errorHelpers";
import { Spin } from "antd";

const Featured = () => {
  const [feature, setFeature] = useState<GetListFeatureListItemDto[]>(
    [] as GetListFeatureListItemDto[]
  );

  const [titleLoading, setTitleLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchFeatureData();
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
        <div className={styles.imgContainer} style={{}}>
          <img src={p1} alt="İlk Paragraf Görseli" className={styles.image} />
        </div>
        <div className={styles.textContainer}>
          <h1 className={styles.postTitle}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi,
            commodi.
          </h1>
          <p className={styles.postDesc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
            perferendis voluptatum, repellat labore itaque laborum
            exercitationem accusamus, assumenda aliquid provident incidunt
            quidem quisquam praesentium non ipsa magnam veniam nihil molestias?
          </p>
          <button className={styles.button}>Daha Fazla</button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
