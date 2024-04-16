import { useEffect, useState } from "react";
import notificationStore from "../../../stores/notification/notificationStore";
import { NotificationListModel } from "../../../services/notification/dtos/notificationListModel";
import { handleApiError } from "../../../helpers/errorHelpers";
import { Badge, List } from "antd";
import { Link } from "react-router-dom";
import { CommentOutlined } from "@ant-design/icons";

const NotificationCommentListContent = () => {
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState<NotificationListModel>(
    {} as NotificationListModel
  );

  useEffect(() => {
    fetchNotificationCommentListData();
  }, []);

  const fetchNotificationCommentListData = async () => {
    setLoading(true);
    try {
      let response = await notificationStore.getListByDynamic(
        { pageIndex: 0, pageSize: 4 },
        {
          sort: [{ field: "createdDate", dir: "desc" }],
          filter: {
            field: "type",
            operator: "eq",
            value: "Comment",
            logic: "and",
            filters: [
              {
                field: "userId",
                operator: "eq",
                value: "19afb672-bf92-47b0-ac84-2997c4320245",
                logic: "and",
              },
              {
                field: "isRead",
                operator: "eq",
                value: "false",
              },
            ],
          },
        }
      );
      setNotifications(response.data);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <List
    itemLayout="horizontal"
    dataSource={notifications.items}
    renderItem={(item) => (
      <List.Item>
        <List.Item.Meta
          avatar={
            <Badge count={notifications.count} overflowCount={99}>
             <CommentOutlined style={{ color: "blue" }} />,
            </Badge>
          }
          title={<Link to={item.articleId}>{item.content}</Link>}
          description={item.content}
        />
      </List.Item>
    )}
  />
  );
};
export default NotificationCommentListContent;
