import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import styles from "./notificationSubscriptionListContent.module.css";
import { Badge, List, Spin } from "antd";
import { Link } from "react-router-dom";
import { NotificationListModel } from "../../../../services/notification/dtos/notificationListModel";
import userStore from "../../../../stores/user/userStore";
import notificationStore from "../../../../stores/notification/notificationStore";
import { handleApiError } from "../../../../helpers/errorHelpers";
import { StarOutlined } from "@ant-design/icons";

interface NotificationSubscriptionListContentProps {
  onDataStatus?: (status: boolean) => void
}

const NotificationSubscriptionListContent = forwardRef(
  (props: NotificationSubscriptionListContentProps, ref) => {
    const [loading, setLoading] = useState(false);
    const [notifications, setNotifications] = useState<NotificationListModel>(
      {} as NotificationListModel
    );

    useEffect(() => {
      fetchNotificationSubscriptionListData();
    }, []);

    useImperativeHandle(ref, () => ({
      reloadData() {
        fetchNotificationSubscriptionListData();
      },
    }));

    const customLocales = {
      emptyText: "Okunacak abonelik bildirimi bulunamadı.",
    };

    const fetchNotificationSubscriptionListData = async () => {
      setLoading(true);
      try {
        await notificationStore
          .getListByDynamic(
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
          )
          .then((response) => {
            setNotifications(response.data);
            props.onDataStatus?.(response.data.items.length > 0);
          });
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
