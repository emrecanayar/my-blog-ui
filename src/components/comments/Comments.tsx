import styles from "./comments.module.css";
import p1 from "../../assets/p1.jpeg";
import ReactQuill from "react-quill";
import { modules, formats } from "../../options/reactQuillOptions";
import { Card, Input, Spin, Switch } from "antd";
import { useEffect, useRef, useState } from "react";
import {
  AppstoreOutlined,
  CheckOutlined,
  CloseOutlined,
  DislikeOutlined,
  LikeOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import userStore from "../../stores/user/userStore";
import authStore from "../../stores/auth/authStore";
import { GetByIdUserResponse } from "../../services/user/dtos/getByIdUserResponse";
import { handleApiError } from "../../helpers/errorHelpers";
import { CreateCommentCommand } from "../../services/comment/dtos/createCommentCommand";
import commentStore from "../../stores/comment/commentStore";
import { ToastContainer, toast } from "react-toastify";
import { CommentListModel } from "../../services/comment/dtos/commentListModel";
import Pagination from "../pagination/Pagination";
import { formatDateForDate } from "../../helpers/dateHelper";
import { CreateReplyCommentCommand } from "../../services/comment/dtos/createReplyCommentCommand";
import { CreateLikeCommand } from "../../services/like/dtos/createLikeCommand";
import likeStore from "../../stores/like/likeStore";
import { CreateReportCommand } from "../../services/report/dtos/createReportCommand";
import reportStore from "../../stores/report/reportStore";
import ReportPopover from "./components/ReportPopover";

export interface CommentsProps {
  articleId: string;
  articleUserId: string;
  articleTitle: string;
}

const Comments = ({
  articleId,
  articleUserId,
  articleTitle,
}: CommentsProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isUserLoggedInInfo, setIsUserLoggedInInfo] =
    useState<GetByIdUserResponse>({} as GetByIdUserResponse);
  const [sendButtonStatu, setSendButtonStatu] = useState(true);
  const [createComment, setCreateComment] = useState<CreateCommentCommand>(
    {} as CreateCommentCommand
  );
  const [replyComment, setReplyComment] = useState<CreateReplyCommentCommand>(
    {} as CreateReplyCommentCommand
  );
  const [comments, setComments] = useState<CommentListModel>(
    {} as CommentListModel
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string>("");
  const [createLike, setCreateLike] = useState<CreateLikeCommand>(
    {} as CreateLikeCommand
  );
  const [createReport, setCreateReport] = useState<CreateReportCommand>(
    {} as CreateReportCommand
  );

  const quillRef = useRef<ReactQuill>(null);

  useEffect(() => {
    isUserLoggedIn();
    fetchCommentsData();
  }, [currentPage]);

  const addLikeDislikeCountsToComments = (comments: any) => {
    return comments.map((comment: any) => {
      const likeCount = comment.likes.filter(
        (like: any) => like.isLiked
      ).length;
      const dislikeCount = comment.likes.filter(
        (like: any) => !like.isLiked
      ).length;
      const replies = comment.replies
        ? addLikeDislikeCountsToComments(comment.replies)
        : [];
      return { ...comment, likeCount, dislikeCount, replies };
    });
  };

  const fetchCommentsData = async () => {
    setLoading(true);
    try {
      let response = await commentStore.getListByDynamic(
        {
          pageIndex: currentPage,
          pageSize: 4,
        },
        {
          sort: [{ field: "datePosted", dir: "desc" }],
          filter: { field: "articleId", operator: "eq", value: `${articleId}` },
        }
      );

      const commentsWithCounts = addLikeDislikeCountsToComments(response.items);
      setComments({
        ...response,
        items: commentsWithCounts,
      });
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSumbitCreateComment = async () => {
    try {
      if (
        createComment.authorName === undefined ||
        createComment.authorEmail === undefined
      ) {
        createComment.authorName =
          isUserLoggedInInfo.firstName + " " + isUserLoggedInInfo.lastName;
        createComment.authorEmail = isUserLoggedInInfo.email;
        createComment.userId = isUserLoggedInInfo.id;
        createComment.sendNewComments = false;
        createComment.sendNewPosts = false;
        createComment.rememberMe = false;
        createComment.userIdForArticle = articleUserId;
        createComment.articleTitleForComment = articleTitle;
      }
      createComment.articleId = articleId;

      let response = await commentStore.createComment(createComment);
      if (response.id !== undefined) {
        await fetchCommentsData();
        toast.success("Yorumunuz başarıyla gönderildi.");
      }
    } catch (error) {
      handleApiError(error);
      toast.error("Yorumunuz gönderilemedi.");
    } finally {
      setCreateComment({} as CreateCommentCommand);
      if (quillRef.current) {
        quillRef.current.getEditor().clipboard.dangerouslyPasteHTML("");
      }
    }
  };

  const handleSumbitCreateReplyComment = async () => {
    try {
      if (
        replyComment.authorName === undefined ||
        replyComment.authorEmail === undefined
      ) {
        replyComment.authorName =
          isUserLoggedInInfo.firstName + " " + isUserLoggedInInfo.lastName;
        replyComment.authorEmail = isUserLoggedInInfo.email;
        replyComment.userId = isUserLoggedInInfo.id;
      }
      replyComment.articleId = articleId;
      replyComment.parentCommentId = replyingTo;
      console.log("ReplyComment", replyComment);

      let response = await commentStore.createReplyComment(replyComment);
      if (response.id !== undefined) {
        await fetchCommentsData();
        toast.success("Yorumunuz başarıyla gönderildi.");
      }
    } catch (error) {
      handleApiError(error);
      toast.error("Yorumunuz gönderilemedi.");
    } finally {
      setReplyComment({} as CreateReplyCommentCommand);
      if (quillRef.current) {
        quillRef.current.getEditor().clipboard.dangerouslyPasteHTML("");
      }
    }
  };

  const isUserLoggedIn = async () => {
    try {
      await authStore.initializeAuthState();
      if (authStore.isAuthenticated) {
        let userInformation = await userStore.getFromAuth();
        setIsUserLoggedInInfo(userInformation);
        setSendButtonStatu(false);
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleQuillChange = (value: any) => {
    setShowDetails(true); // Eğer içerik boş değilse detayları göster
    if (value === "" || value === "<p><br></p>") {
      setShowDetails(false);
    }
    setCreateComment((prevState) => ({
      ...prevState,
      content: value,
    }));
  };

  const handleReplyQuillChange = (value: any) => {
    console.log("Cevap için girdi", value);
    setReplyComment((prevState) => ({
      ...prevState,
      content: value,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCreateComment((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (
      createComment.authorEmail !== undefined &&
      createComment.authorName !== undefined
    ) {
      setSendButtonStatu(false);
    }
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setCreateComment((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  // Sayfa değiştirme fonksiyonları
  const goToPrevPage = () => {
    if (comments.hasPrevious) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (comments.hasNext) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleLike = async (commentId: string) => {
    // API çağrısı yaparak yorumu beğen
    createLike.commentId = commentId;
    createLike.isLiked = true;
    createLike.userFullName =
      isUserLoggedInInfo.firstName + " " + isUserLoggedInInfo.lastName;
    createLike.articleId = articleId;
    setCreateLike(createLike);
    try {
      let response = await likeStore.createLike(createLike);
      if (response.id !== undefined) {
        fetchCommentsData();
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleDislike = async (commentId: string) => {
    // API çağrısı yaparak yorumu beğenme
    createLike.commentId = commentId;
    createLike.isLiked = false;
    setCreateLike(createLike);
    try {
      let response = await likeStore.createLike(createLike);
      if (response.id !== undefined) {
        fetchCommentsData();
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleChangeReportReason = async (reason: string) => {
    setCreateReport((prevState) => ({
      ...prevState,
      reason: reason,
    }));
  };

  const handleReport = async (commentId: string) => {
    const updatedReport = {
      ...createReport,
      commentId: commentId,
    };

    try {
      let response = await reportStore.createReport(updatedReport);
      console.log("Report Response", response);
      if (response.id !== undefined) {
        toast.success("Yorum başarıyla raporlandı.");
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setCreateReport({} as CreateReportCommand);
    }
  };

  const renderComments = (comments: any, indentLevel = 0) => {
    return (
      comments &&
      comments.map((comment: any, index: any) => (
        <div
          key={index}
          className={indentLevel > 0 ? `${styles.reply}` : `${styles.comment}`}
        >
          <div className={styles.user}>
            <img
              src={p1} // Varsayılan bir resim olarak p1 kullanıldı
              alt={comment.authorName}
              width={50}
              height={50}
              className={styles.image}
            />
            <div className={styles.userInfo}>
              <span className={styles.username}>
                {comment.authorName}{" "}
                {comment.user && <span className={styles.memberTag}>Üye</span>}
              </span>
              <span className={styles.date}>
                {formatDateForDate(comment.datePosted)}
              </span>
            </div>
          </div>
          <p className={styles.desc}>
            <div
              dangerouslySetInnerHTML={{
                __html: comment.content,
              }}
            ></div>
          </p>
          <button
            className={styles.replyButton}
            onClick={() => setReplyingTo(comment.id)}
          >
            Cevapla
          </button>
          {replyingTo === comment.id && (
            <div className={styles.replyForm}>
              <ReactQuill
                theme="snow"
                placeholder="Cevabınız..."
                onChange={handleReplyQuillChange}
              />
              <button
                className={`${styles.replySendButton}`}
                onClick={handleSumbitCreateReplyComment}
              >
                Gönder
              </button>
            </div>
          )}
          <div className={styles.actionIcons}>
            <button
              className={styles.iconButton}
              onClick={() => handleLike(comment.id)}
            >
              <LikeOutlined />
            </button>
            <span className={styles.likeIconCount}>{comment.likeCount}</span>
            <button
              className={styles.iconButton}
              onClick={() => handleDislike(comment.id)}
            >
              <DislikeOutlined />
            </button>
            <span className={styles.dislikeIconCount}>
              {comment.dislikeCount}
            </span>
            <ReportPopover
              commentId={comment.id}
              reason={createReport.reason}
              onReasonChange={(e) => handleChangeReportReason(e.target.value)}
              onSubmitReport={handleReport}
            />
          </div>
          {comment.replies && renderComments(comment.replies, indentLevel + 1)}
        </div>
      ))
    );
  };

  const goToPage = (pageNumber: any) => {
    setCurrentPage(pageNumber); // Seçilen sayfa numarasına güncelle
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Yorum bırakın</h1>
      <div className={styles.write}>
        <ReactQuill
          modules={modules}
          theme="snow"
          placeholder="yorum yaz..."
          formats={formats}
          className={styles.input}
          ref={quillRef}
          onChange={handleQuillChange}
        />
        <button
          className={styles.button}
          disabled={sendButtonStatu}
          onClick={handleSumbitCreateComment}
        >
          Gönder
        </button>
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
      {showDetails && isUserLoggedInInfo.id === undefined && (
        <div
          className={`${styles.write} ${styles.commentDetails} ${
            showDetails ? styles.commentDetailsShow : ""
          }`}
        >
          <Card
            title="Bir yorum eklemek için oturum açın veya adınız ve e-postanızı girin."
            className={styles.customCard}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="E-Posta (Adres hiç bir zaman paylaşılmayacaktır)"
              className={styles.customInput}
              name="authorEmail"
              onChange={handleInputChange}
            />
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="İsim"
              className={styles.customInput}
              name="authorName"
              onChange={handleInputChange}
            />
            <Input
              prefix={<AppstoreOutlined className="site-form-item-icon" />}
              placeholder="Web Sitesi (İsteğe Bağlı)"
              className={styles.customInput}
              name="authorWebSite"
              onChange={handleInputChange}
            />
            <div className={styles.customSwitch}>
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                onChange={(checked) =>
                  handleSwitchChange("sendNewPosts", checked)
                }
              />
              Yeni yazıları bana e-postayla gönder
            </div>
            <div className={styles.customSwitch}>
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                onChange={(checked) =>
                  handleSwitchChange("sendNewComments", checked)
                }
              />
              Yeni yorumlar için bana e-posta gönder.
            </div>
            <div className={styles.customSwitch}>
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                onChange={(checked) =>
                  handleSwitchChange("rememberMe", checked)
                }
              />
              Bir dahaki sefere yorum yaptığımda kullanılmak üzere adımı,
              e-posta adresimi ve web site adresimi bu tarayıcıya kaydet.
            </div>
          </Card>
        </div>
      )}
      <div className={styles.comments}>
        {loading ? (
          <div className={styles.spinnerContainer}>
            <Spin size="large" />
          </div>
        ) : (
          renderComments(comments.items)
        )}
      </div>
      <div>
        <Pagination
          style={{ display: "flex", justifyContent: "center" }}
          page={currentPage}
          totalPages={comments.pages} // totalPages değerini doğru bir şekilde articles'dan almalısınız
          hasPrev={comments.hasPrevious}
          hasNext={comments.hasNext}
          onPrev={goToPrevPage}
          onNext={goToNextPage}
          onPageSelect={goToPage} // İşte burada goToPage fonksiyonunu prop olarak geçiriyoruz
        />
      </div>
    </div>
  );
};

export default Comments;
