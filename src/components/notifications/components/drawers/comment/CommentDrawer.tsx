import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  HeartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Card, Drawer, Typography, Tooltip } from "antd";
import { GetByIdNotificationResponse } from "../../../../../services/notification/dtos/getByIdNotificationResponse";
import styles from "./commentDrawer.module.css";
import TextArea from "antd/es/input/TextArea";
import { formatDateForDate } from "../../../../../helpers/dateHelper";
import EditCommentModal from "./components/EditCommentModal";
import { useState } from "react";
import ReportPopover from "../../../../comments/components/ReportPopover";
import { CreateReportCommand } from "../../../../../services/report/dtos/createReportCommand";
import reportStore from "../../../../../stores/report/reportStore";
import { handleApiError } from "../../../../../helpers/errorHelpers";
import { ToastContainer, toast } from "react-toastify";
import { CreateLikeCommand } from "../../../../../services/like/dtos/createLikeCommand";
import likeStore from "../../../../../stores/like/likeStore";

const { Title } = Typography;
// Drawer içinde yorum kartını gösterecek bir bileşen
const CommentCard: React.FC<GetByIdNotificationResponse> = (commentDetail) => {
  return (
    <>
      <div className={styles.commentSection}>
        <Title level={5} className={styles.commentTitle}>
          Makale Başlığı : {commentDetail?.article?.title}
        </Title>
      </div>
      <div>
        <Card className={styles.cardStyle}>
          <Card.Meta
            className={styles.cardMetaStyle}
            avatar={<Avatar src={""} icon={<UserOutlined />} />}
            title={commentDetail?.comment?.authorName}
            description={formatDateForDate(commentDetail?.comment?.datePosted)}
          />
          <div
            style={{ marginTop: "1em" }}
            className={styles.postContent}
            dangerouslySetInnerHTML={{
              __html: commentDetail?.comment?.content,
            }}
          ></div>
        </Card>
      </div>
    </>
  );
};

const CommentDrawer: React.FC<{
  visible: boolean;
  onClose: () => void;
  comment: GetByIdNotificationResponse;
}> = ({ visible, onClose, comment }) => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [createReport, setCreateReport] = useState<CreateReportCommand>(
    {} as CreateReportCommand
  );

  const [createLike, setCreateLike] = useState<CreateLikeCommand>(
    {} as CreateLikeCommand
  );

  const showEditModal = () => {
    setIsEditModalVisible(true);
  };

  const closeDrawerOnUpdate = () => {
    onClose(); // Drawer'ı kapat
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

  const handleLike = async (commentId: string) => {
    // API çağrısı yaparak yorumu beğen
    createLike.commentId = commentId;
    createLike.isLiked = true;
    setCreateLike(createLike);
    try {
      let response = await likeStore.createLike(createLike);
      if (response.id !== undefined) {
        toast.success("Yorum beğenildi.");
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <Drawer
      title="Yorum Detayları"
      placement="right"
      closable={true}
      onClose={onClose}
      visible={visible}
      width={450}
    >
      <CommentCard {...comment} />
      <div className={styles.buttonsContainer}>
        <Tooltip title="Onayla" color="green" key="green" placement="bottom">
          <Button icon={<CheckOutlined />}></Button>
        </Tooltip>
        <ReportPopover
          commentId={comment?.comment?.id}
          reason={createReport.reason}
          onReasonChange={(e) => handleChangeReportReason(e.target.value)}
          onSubmitReport={handleReport}
        />
        <Tooltip title="Beğen" color="red" key="red" placement="bottom">
          <Button
            icon={<HeartOutlined />}
            onClick={() => handleLike(comment?.comment?.id)}
          ></Button>
        </Tooltip>
        <Tooltip title="Düzenle" color="orange" key="orange" placement="bottom">
          <Button icon={<EditOutlined />} onClick={showEditModal}></Button>
        </Tooltip>
        <Tooltip title="Sil" color="volcano" key="volcano" placement="bottom">
          <Button icon={<DeleteOutlined />}></Button>
        </Tooltip>
      </div>

      <div className={styles.replyComment}>
        <div className={styles.textareaContainer}>
          <TextArea
            rows={4}
            placeholder={`${comment?.comment?.authorName} adlı kişiye cevap ver`}
          />
        </div>
        <div className={styles.sendButton}>
          <button className={styles.button}>Gönder</button>
        </div>
      </div>
      <EditCommentModal
        isModalVisible={isEditModalVisible}
        handleCancel={() => setIsEditModalVisible(false)}
        commentDetail={comment?.comment}
        onUpdateSuccess={closeDrawerOnUpdate}
      />

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
    </Drawer>
  );
};

export default CommentDrawer;
