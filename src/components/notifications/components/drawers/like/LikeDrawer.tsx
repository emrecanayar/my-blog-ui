import { Avatar, Card, Drawer, Typography } from "antd";
import { GetByIdNotificationResponse } from "../../../../../services/notification/dtos/getByIdNotificationResponse";
import styles from "./likeDrawer.module.css";
import { UserOutlined } from "@ant-design/icons";
import { formatDateForDate } from "../../../../../helpers/dateHelper";
import { Link } from "react-router-dom";

const { Title } = Typography;

interface LikeDrawerProps {
  visible: boolean;
  onClose: () => void;
  comment: GetByIdNotificationResponse;
}

const LikeDrawer = ({ onClose, visible, comment }: LikeDrawerProps) => {
  return (
    <Drawer
      title="Yorum Detayları"
      placement="right"
      closable={true}
      onClose={onClose}
      visible={visible}
      width={450}
    >
      <div className={styles.replyComment}>
        <div className={styles.commentSection}>
          <Title level={5} className={styles.commentTitle}>
            Makale Başlığı :{" "}
            <Link to={`/detail/${comment?.article?.id}`}>
              {comment?.article?.title}
            </Link>
          </Title>
        </div>
        <div>
          <Card className={styles.cardStyle}>
            <Card.Meta
              className={styles.cardMetaStyle}
              avatar={<Avatar src={""} icon={<UserOutlined />} />}
              title={comment?.comment?.authorName}
              description={formatDateForDate(comment?.comment?.datePosted)}
            />
            <div
              style={{ marginTop: "1em" }}
              className={styles.postContent}
              dangerouslySetInnerHTML={{
                __html: comment?.comment?.content,
              }}
            ></div>
          </Card>
        </div>
      </div>
    </Drawer>
  );
};
export default LikeDrawer;
