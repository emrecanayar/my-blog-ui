import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import notificationStore from "../../../../stores/notification/notificationStore";
import userStore from "../../../../stores/user/userStore";
import { handleApiError } from "../../../../helpers/errorHelpers";
import { NotificationListModel } from "../../../../services/notification/dtos/notificationListModel";
import { Badge, List, Spin } from "antd";
import styles from "./notificationLikeListContent.module.css";
import { LikeOutlined, SunOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { GetByIdNotificationResponse } from "../../../../services/notification/dtos/getByIdNotificationResponse";
import LikeDrawer from "../drawers/like/LikeDrawer";

interface NotificationLikeListContentProps {
  onDataStatus?: (status: boolean) => void;
}

const NotiticationsLikeListContent = forwardRef(
  (props: NotificationLikeListContentProps, ref) => {
    const [loading, setLoading] = useState(false);
    const [notifications, setNotifications] = useState<NotificationListModel>(
      {} as NotificationListModel
    );
    const [commentDetail, setCommentDetail] =
      useState<GetByIdNotificationResponse>({} as GetByIdNotificationResponse);
    const [commentDrawerVisible, setCommentDrawerVisible] = useState(false);

    useEffect(() => {
      fetchNotificationsData();
    }, []);

    const showDrawer = (notificationId: string) => {
      fetchNotificationCommentDetail(notificationId);
      setCommentDrawerVisible(true);
      markAsReadNotification(notificationId);
    };

    const onClose = () => {
      setCommentDrawerVisible(false);
    };

    const fetchNotificationsData = async () => {
      setLoading(true);
      try {
        const postLikePromise = notificationStore.getListByDynamic(
          { pageIndex: 0, pageSize: 4 },
          {
            sort: [{ field: "createdDate", dir: "desc" }],
            filter: {
              field: "type",
              operator: "eq",
              value: "PostLike",
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

        const commentLikePromise = notificationStore.getListByDynamic(
          { pageIndex: 0, pageSize: 4 },
          {
            sort: [{ field: "createdDate", dir: "desc" }],
            filter: {
              field: "type",
              operator: "eq",
              value: "CommentLike",
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

        const [postLikeResults, commentLikeResults] = await Promise.all([
          postLikePromise,
          commentLikePromise,
        ]);

        props.onDataStatus?.(
          postLikeResults.data.items.length > 0 ||
            commentLikeResults.data.items.length > 0
        );

        const combinedNotifications: NotificationListModel = {
          items: [
            ...postLikeResults.data.items,
            ...commentLikeResults.data.items,
          ],
          size: postLikeResults.data.size + commentLikeResults.data.size,
          count: postLikeResults.data.count + commentLikeResults.data.count,
          index: postLikeResults.data.index + commentLikeResults.data.index,
          hasNext:
            postLikeResults.data.hasNext || commentLikeResults.data.hasNext,
          hasPrevious:
            postLikeResults.data.hasPrevious ||
            commentLikeResults.data.hasPrevious,
          pages: postLikeResults.data.pages + commentLikeResults.data.pages,
        };

        setNotifications(combinedNotifications);
      } catch (error) {
        handleApiError(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchNotificationCommentDetail = async (notificationId: string) => {
      try {
        let response = await notificationStore.getById(notificationId);
        setCommentDetail(response);
      } catch (error) {
        handleApiError(error);
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

    useImperativeHandle(ref, () => ({
      reloadData() {
        fetchNotificationsData();
      },
    }));

    const customLocales = {
      emptyText: "Gösterilecek beğeni bildirimi bulunmuyor.",
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
            <List.Item
              onClick={() => {
                if (item.content.includes("yorumunuzu")) {
                  showDrawer(item.id);
                } else {
                  window.location.href = `/detail/${item.articleId}`;
                  markAsReadNotification(item.id);
                }
              }}
            >
              <List.Item.Meta
                avatar={
                  <Badge>
                    {item.content.includes("yorumunuzu") ? (
                      <LikeOutlined style={{ color: "blue" }} />
                    ) : (
                      <SunOutlined style={{ color: "blue" }} />
                    )}
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
        {commentDetail && (
          <LikeDrawer
            visible={commentDrawerVisible}
            onClose={onClose}
            comment={commentDetail}
          />
        )}
      </div>
    );
  }
);
export default NotiticationsLikeListContent;
