import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import styles from "./notificationSubscriptionListContent.module.css";
import { Badge, List, Spin } from "antd";
import { Link } from "react-router-dom";
import { NotificationListModel } from "../../../../services/notification/dtos/notificationListModel";
import userStore from "../../../../stores/user/userStore";
import notificationStore from "../../../../stores/notification/notificationStore";
import { handleApiError } from "../../../../helpers/errorHelpers";
import { StarOutlined } from "@ant-design/icons";

interface NotificationSubscriptionListContentProps {}

const NotificationSubscriptionListContent = forwardRef(
  (props: NotificationSubscriptionListContentProps, ref) => {
    const [loading, setLoading] = useState(false);
    const [notifications, setNotifications] = useState<NotificationListModel>(
      {} as NotificationListModel
    );

    useEffect(() => {
      fetchNotificationCommentListData();
    }, []);

    useImperativeHandle(ref, () => ({
      reloadData() {
        fetchNotificationCommentListData();
      },
    }));

    const customLocales = {
      emptyText: "Okunacak abonelik bildirimi bulunamadı.",
    };

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
              value: "Subscription",
              logic: "and",
              filters: [
                {
                  field: "userId",
                  operator: "eq",
                  value: `${userStore.userInformation.id}`,
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

    const markAsReadNotification = async (notificationId: string) => {
      try {
        await notificationStore.markAsReadNotification({
          id: notificationId,
        });
      } catch (error) {
        handleApiError(error);
      }
    };

    return loading ? (
      <div className={styles.spinnerContainer}>
        <Spin size="small" />
      </div>
    ) : (
      <div>
        <List
          itemLayout="horizontal"
          dataSource={notifications.items}
          locale={{ emptyText: customLocales.emptyText }}
          renderItem={(item) => (
            <List.Item onClick={() => markAsReadNotification(item.id)}>
              <List.Item.Meta
                avatar={
                  <Badge>
                    <StarOutlined style={{ color: "blue" }} />
                  </Badge>
                }
                title={<Link to={item.articleId}>{item.content}</Link>}
                description={
                  <div
                    style={{ marginTop: "1em" }}
                    className={styles.postContent}
                    dangerouslySetInnerHTML={{
                      __html: item.comment && item.comment.content,
                    }}
                  ></div>
                }
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
);
export default NotificationSubscriptionListContent;
