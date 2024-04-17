import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  HeartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Card, Drawer, Tooltip } from "antd";
import { GetByIdNotificationResponse } from "../../../../../services/notification/dtos/getByIdNotificationResponse";
import styles from "./commentDrawer.module.css";

// Yorum detaylarınızı temsil eden bir tip veya arayüz

// Drawer içinde yorum kartını gösterecek bir bileşen
const CommentCard: React.FC<GetByIdNotificationResponse> = (commentDetail) => {
  return (
    <Card>
      <Card.Meta
        avatar={<Avatar src={""} icon={<UserOutlined />} />}
        title={commentDetail?.comment?.authorName}
        description={commentDetail?.comment?.datePosted?.toString()}
      />
      <p style={{ marginTop: "1em" }}>{commentDetail?.content}</p>
    </Card>
  );
};

const CommentDrawer: React.FC<{
  visible: boolean;
  onClose: () => void;
  comment: GetByIdNotificationResponse;
}> = ({ visible, onClose, comment }) => {
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
        <Tooltip title="Spam" color="pink" key="pink" placement="bottom">
          <Button icon={<CloseOutlined />}></Button>
        </Tooltip>
        <Tooltip title="Beğen" color="red" key="red" placement="bottom">
          <Button icon={<HeartOutlined />}></Button>
        </Tooltip>
        <Tooltip title="Düzenle" color="orange" key="orange" placement="bottom">
          <Button icon={<EditOutlined />}></Button>
        </Tooltip>
        <Tooltip title="Sil" color="volcano" key="volcano" placement="bottom">
          <Button icon={<DeleteOutlined />}></Button>
        </Tooltip>
      </div>
    </Drawer>
  );
};

export default CommentDrawer;
