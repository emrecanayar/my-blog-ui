import {
  DownOutlined,
  EllipsisOutlined,
  ExclamationCircleOutlined,
  EyeInvisibleOutlined,
  HeartFilled,
  HeartTwoTone,
  LinkOutlined,
  UpCircleTwoTone,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Dropdown,
  Form,
  Input,
  Menu,
  Modal,
  Radio,
} from "antd";
import Meta from "antd/es/card/Meta";
import styles from "./trendingArticleCard.module.css";
import { GetListArticleListItemDto } from "../../services/article/dtos/getListArticleListItemDto";
import config from "../../config";
import { Link } from "react-router-dom";
import favoriteArticleStore from "../../stores/favoriteArticle/favoriteArticleStore";
import { useEffect, useState } from "react";
import { handleApiError } from "../../helpers/errorHelpers";
import { message } from "antd";
import { formatDateAsDayMonthWeekday } from "../../helpers/dateHelper";
import articleVoteStore from "../../stores/articleVote/articleVoteStore";
import { ArticleReportType, VoteType } from "../../complexTypes/enums";
import articleReportStore from "../../stores/articleReport/articleReportStore";
import { CreateArticleReportCommand } from "../../services/articleReport/dtos/createArticleReportCommand";

interface TrendingArticleCardProps {
  article: GetListArticleListItemDto;
  loading: boolean;
}

const TrendingArticleCard = ({
  article,
  loading,
}: TrendingArticleCardProps) => {
  const [liked, setLiked] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // Kartın görünürlüğü için yeni durum
  const [upvoteCount, setUpvoteCount] = useState<number>(0); // upvote sayısını saklamak için yeni durum
  const [isReportModalVisible, setIsReportModalVisible] = useState(false); // Rapor modalı durumu için state
  const [createArticleReport, setCreateArticleReport] =
    useState<CreateArticleReportCommand>({} as CreateArticleReportCommand);

  const [isHovered, setIsHovered] = useState(false);
  // Rapor modalını gösterme fonksiyonu
  const showReportModal = () => {
    setCreateArticleReport((prevState) => ({
      ...prevState,
      articleId: article.id, // Burada article.id'yi ekleyin
    }));
    setIsReportModalVisible(true);
  };

  // Rapor modalını gizleme fonksiyonu
  const hideReportModal = () => {
    setIsReportModalVisible(false);
  };

  const addFavorite = async (articleId: string) => {
    try {
      let response = await favoriteArticleStore.addFavoriteArticle({
        articleId: articleId,
      });
      if (response.data.id !== undefined) {
        setLiked(true);
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  const deleteFavorite = async (articleId: string) => {
    try {
      let response =
        await favoriteArticleStore.deleteFavoriteArticleByArticleId(articleId);
      if (response.id !== undefined) {
        setLiked(false);
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleCopyLink = (articleId: string) => {
    navigator.clipboard
      .writeText(
        window.location.href.replace("/trending", "") + "/detail/" + articleId
      )
      .then(() => message.success("Link panoya kopyalandı!"))
      .catch((err) => message.error("Link kopyalanırken bir hata oluştu."));
  };

  const handleUpVote = async () => {
    try {
      let response = await articleVoteStore.articleUpVote({
        articleId: article.id,
        vote: VoteType.Upvote,
      });
      if (response.id !== undefined) {
        message.success("Upvote başarılı!");
        setUpvoteCount((prevCount) => prevCount + 1); // Anlık olarak upvote sayısını artır
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleDownVote = async () => {
    try {
      let response = await articleVoteStore.articleDownVote({
        articleId: article.id,
        vote: VoteType.Downvote,
      });
      if (response.id !== undefined) {
        message.warning("Downvote başarılı!");
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  const fetchUpvoteCount = async () => {
    try {
      let response =
        await articleVoteStore.getByArticleIdArticleVoteUpvoteCount(article.id);
      setUpvoteCount(response.upvoteCount); // upvoteCount'u doğrudan sayısal bir değer olarak güncelleyin
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleArticleReport = async (values: CreateArticleReportCommand) => {
    try {
      values.articleId = createArticleReport.articleId;
      let response = await articleReportStore.add(values);
      if (response.id !== undefined) {
        message.success("İlgili makale başarıyla rapor edilmiştir.");
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsReportModalVisible(false);
    }
  };

  const isArticleDateToday = (articleDate: Date) => {
    const today = new Date();
    const articleDateObj = new Date(articleDate);

    return (
      articleDateObj.getDate() === today.getDate() &&
      articleDateObj.getMonth() === today.getMonth() &&
      articleDateObj.getFullYear() === today.getFullYear()
    );
  };

  useEffect(() => {
    fetchUpvoteCount();
  }, [article.id]);

  const UpvoteComponent = ({ upvoteCount, handleUpVote }: any) => {
    return (
      <div
        onClick={handleUpVote}
        style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
      >
        <UpCircleTwoTone key="upvote" />
        <span style={{ marginLeft: 8 }}>{upvoteCount}</span>
      </div>
    );
  };

  const ReportModal = ({ isModalVisible, handleOk, handleCancel }: any) => {
    return (
      <>
        <Modal
          title={`Makaleyi Rapor Et`}
          visible={isModalVisible}
          onOk={handleOk}
          okText="Rapor Et"
          onCancel={handleCancel}
          cancelText="İptal"
          footer={null}
        >
          <Form onFinish={handleArticleReport}>
            <Form.Item name="reportType" rules={[{ required: true }]}>
              <Radio.Group>
                <Radio
                  className={styles.radioStyle}
                  value={ArticleReportType.NotAbout}
                >
                  Yazı bununla ilgili değil...
                </Radio>
                <Radio
                  className={styles.radioStyle}
                  value={ArticleReportType.BrokenLink}
                >
                  Kırık bağlantı
                </Radio>
                <Radio
                  className={styles.radioStyle}
                  value={ArticleReportType.Clickbait}
                >
                  Clickbait (Tıklama tuzağı)
                </Radio>
                <Radio
                  className={styles.radioStyle}
                  value={ArticleReportType.LowQuality}
                >
                  Düşük kaliteli içerik
                </Radio>
                <Radio
                  className={styles.radioStyle}
                  value={ArticleReportType.NSFW}
                >
                  NSFW İçerik Koruması
                </Radio>
                <Radio
                  className={styles.radioStyle}
                  value={ArticleReportType.Other}
                >
                  Diğer
                </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item name="description" label="Açıklama">
              <Input.TextArea
                rows={4}
                placeholder="Eklemek istediğiniz başka bir şey var mı?"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Gönder
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  };

  function ArticleHeartIcon({
    article,
    liked,
    addFavorite,
    deleteFavorite,
  }: any) {
    const isFavorited = liked || article.isUserFavoriteArticle;

    return isFavorited ? (
      <HeartFilled
        style={{ color: "#eb2f96" }}
        onClick={() => deleteFavorite(article.id)}
      />
    ) : (
      <HeartTwoTone
        onClick={() => addFavorite(article.id)}
        twoToneColor="#eb2f96"
      />
    );
  }

  // Menü seçenekleri
  const menu = (
    <Menu>
      <Menu.Item
        key="1"
        icon={<EyeInvisibleOutlined />}
        onClick={() => setIsVisible(false)}
      >
        Gizle
      </Menu.Item>
      <Menu.Item
        key="2"
        icon={<DownOutlined />}
        onClick={() => handleDownVote()}
      >
        Downvote
      </Menu.Item>
      <Menu.Item
        key="3"
        icon={<ExclamationCircleOutlined />}
        onClick={showReportModal}
      >
        Rapor Et
      </Menu.Item>
    </Menu>
  );

  // Menüyü tetikleyecek bileşen
  const DropdownMenu = () => (
    <Dropdown overlay={menu} trigger={["click"]}>
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        <EllipsisOutlined
          style={{ fontSize: "22px", color: "white", marginLeft: "10px" }}
          rotate={90}
        />
      </a>
    </Dropdown>
  );

  return (
    <>
      {isVisible ? (
        <Card
          loading={loading} // Kartın yüklenme durumu
          hoverable // Kartın üzerine gelindiğinde bir gölge efekti ekler
          style={{
            width: 300,
            marginTop: 16,
            borderRadius: 12,
            position: "relative", // Required for absolute positioning of children
            overflow: "visible", // Ensure that children can render outside the card
          }} // Örnek kart genişliği
          className={`${styles.cardHover} ${styles.trendingArticleCard}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          actions={[
            <div className={styles.actionItem}>
              <ArticleHeartIcon
                article={article}
                liked={liked}
                addFavorite={addFavorite}
                deleteFavorite={deleteFavorite}
              />
            </div>,
            <div className={styles.actionItem}>
              <UpvoteComponent
                upvoteCount={upvoteCount}
                handleUpVote={handleUpVote}
              />
            </div>,
            <div className={styles.actionItem}>
              <LinkOutlined
                key="share"
                onClick={() => handleCopyLink(article.id)}
              />
            </div>,
          ]}
        >
          <div
             className={`${styles.hotLabelPlaceholder} ${
              isArticleDateToday(article.date) ? styles.potentialHotLabel : ''
            }`}
          >
            SICAK
          </div>
          <Meta
            avatar={
              // Avatar resmi
              <Avatar
                src={`${config.FILE_BASE_URL}${article.user?.userUploadedFiles?.[0]?.newPath}`}
              />
            }
            title={
              <div className={styles.customTitle}>
                {article.title} {/* Başlık */}
              </div>
            }
            description={
              <span>
                {`${formatDateAsDayMonthWeekday(article.date)} - `}
                <span style={{ color: "#DC143C" }}>
                  {article.category.name}
                </span>
              </span>
            } // Açıklama metni // Açıklama metni
          />
          <div className={styles.articleImageWrapper}>
            <img
              alt={article.category.name}
              src={`${config.FILE_BASE_URL}${article.articleUploadedFiles?.[0]?.newPath}`} // Gerçek resim linkinizi buraya ekleyin.
            />
          </div>
          <div className={styles.readMoreButton}>
            <Link to={`/detail/${article.id}`}>Devamını Oku</Link>
            <DropdownMenu />
          </div>
        </Card>
      ) : null}
      <ReportModal
        isModalVisible={isReportModalVisible}
        handleOk={handleArticleReport}
        handleCancel={hideReportModal} // Modalı gizleme fonksiyonu
      />
    </>
  );
};
export default TrendingArticleCard;
