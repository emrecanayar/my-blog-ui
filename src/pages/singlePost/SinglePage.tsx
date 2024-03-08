import styles from "./singlePage.module.css";
import p1 from "../../assets/p1.jpeg";
import Comments from "../../components/comments/Comments";
import { Button, Popover, Rate, Spin, Tag } from "antd";
import { useParams } from "react-router-dom";
import articleStore from "../../stores/article/articleStore";
import { GetByIdArticleResponse } from "../../services/article/dtos/getByIdArticleResponse";
import { useEffect, useState } from "react";
import { handleApiError } from "../../helpers/errorHelpers";
import { formatDateForDate } from "../../helpers/dateHelper";
import config from "../../config";
import { CreateRatingCommand } from "../../services/rating/dtos/createRatingCommand";
import ratingStore from "../../stores/rating/ratingStore";
import { ToastContainer, toast } from "react-toastify";
import { GetRatingInformationResponse } from "../../services/rating/dtos/getRatingInformationResponse";
import { UpdateRatingCommand } from "../../services/rating/dtos/updateRatingCommand";

const SinglePage = () => {
  let { id } = useParams(); // URL'den alınan id
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState<GetByIdArticleResponse>(
    {} as GetByIdArticleResponse
  );
  const [createRating, setCreateRating] = useState<CreateRatingCommand>(
    {} as CreateRatingCommand
  );

  const [isThere, setIsThere] = useState<GetRatingInformationResponse>(
    {} as GetRatingInformationResponse
  );

  const [updateRating, setUpdateRating] = useState<UpdateRatingCommand>(
    {} as UpdateRatingCommand
  );

  useEffect(() => {
    fetchArticleData(id as string);
    fetchGetRatingInformation(id as string);
  }, []);

  const fetchArticleData = async (id: string) => {
    setLoading(true);
    try {
      let article = await articleStore.getArticleById(id);
      setArticle(article);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchGetRatingInformation = async (id: string) => {
    try {
      let response = await ratingStore.getRatingInformation(id);
      setIsThere(response);
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleRateChange = async (value: number) => {
    try {
      createRating.score = value;
      createRating.articleId = id as string;
      let response = await ratingStore.createRating(createRating);
      console.log(response);
      if (response !== undefined) {
        toast.success("Değerlendirme başarılı bir şekilde yapıldı.");
        setTimeout(() => {
          fetchArticleData(id as string);
          fetchGetRatingInformation(id as string);
        }, 2000);
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleUpdateRateChange = async (value: number) => {
    try {
      updateRating.id = isThere.id;
      updateRating.score = value;
      updateRating.articleId = id as string;
      let response = await ratingStore.updateRating(updateRating);
      console.log(response);
      if (response !== undefined) {
        console.log("Inside if block");
        toast.success("Değerlendirme başarılı bir şekilde güncellendi.");
        setTimeout(() => {
          fetchArticleData(id as string);
          fetchGetRatingInformation(id as string);
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);
      handleApiError(error);
    }
  };

  const updateRatingContent = (
    <div>
      <p>Bu yazı hakkında değerlendirmede bulunmuşsunuz.</p>
      <p>
        Eğer değerlendirmenizi güncellemek istiyorsanız aşağıdan yapabilirsiniz.
      </p>
      <Rate defaultValue={isThere.score} onChange={handleUpdateRateChange} />
    </div>
  );

  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.spinnerContainer}>
          <Spin style={{ alignContent: "center" }} size="large" />{" "}
        </div>
      ) : (
        <div>
          <div className={styles.infoContainer}>
            <div className={styles.textContainer}>
              <h1 className={styles.title}>{article.title}</h1>
              <div className={styles.user}>
                <div className={styles.userImageContainer}>
                  <img src={p1} alt="" className={styles.avatar} />
                </div>
                <div className={styles.userTextContainer}>
                  <span className={styles.username}>
                    {article.user?.firstName} {article.user?.lastName}
                  </span>
                  <span className={styles.date}>
                    {formatDateForDate(article.date)} - {article.category?.name}
                  </span>
                </div>
                <div className={styles.rateContainer}>
                  <span className={styles.rateText}>Değerlendirme</span>
                  <Rate disabled defaultValue={article.averageRating} />
                </div>
              </div>
            </div>
            <div className={styles.imageContainer}>
              <img
                src={`${config.FILE_BASE_URL}${
                  article.articleUploadedFiles &&
                  article.articleUploadedFiles?.[0]?.newPath
                }`}
                alt=""
                className={styles.image}
              />
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.post}>
              <p className={styles.description}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: article.content,
                  }}
                ></div>
              </p>
              <div className={styles.tags}>
                {article.tags &&
                  article.tags.map((tag) => (
                    <Tag color="blue" key={tag.id}>
                      {tag.name}
                    </Tag>
                  ))}
              </div>
              <div>
                <div className={styles.ratingContainer}>
                  {isThere && isThere.id ? (
                    <Popover
                      content={updateRatingContent}
                      title="Değerlendirme Güncelle"
                      trigger="click"
                    >
                      <Button>Değerlendirmenizi Güncelleyin</Button>
                    </Popover>
                  ) : (
                    <>
                      <span className={styles.rateText}>
                        Yazıyı Değerlendir
                      </span>
                      <Rate onChange={handleRateChange} />
                    </>
                  )}
                </div>
              </div>
              <div className={styles.comment}>
                <Comments articleId={id as string} />
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default SinglePage;
