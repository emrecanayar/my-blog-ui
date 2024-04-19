import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import notificationStore from "../../../../stores/notification/notificationStore";
import { NotificationListModel } from "../../../../services/notification/dtos/notificationListModel";
import { handleApiError } from "../../../../helpers/errorHelpers";
import { Badge, List, Spin } from "antd";
import { Link } from "react-router-dom";
import { CommentOutlined } from "@ant-design/icons";
import { GetByIdUserResponse } from "../../../../services/user/dtos/getByIdUserResponse";
import authStore from "../../../../stores/auth/authStore";
import userStore from "../../../../stores/user/userStore";
import styles from "./notificationCommentListContent.module.css";
import CommentDrawer from "../drawers/comment/CommentDrawer";
import { GetByIdNotificationResponse } from "../../../../services/notification/dtos/getByIdNotificationResponse";

interface NotificationCommentListContentProps {}

const NotificationCommentListContent = forwardRef(
  (props: NotificationCommentListContentProps, ref) => {
    const [loading, setLoading] = useState(false);
    const [notifications, setNotifications] = useState<NotificationListModel>(
      {} as NotificationListModel
    );
    const [isUserLoggedInInfo, setIsUserLoggedInInfo] =
      useState<GetByIdUserResponse>({} as GetByIdUserResponse);

    const [commentDrawerVisible, setCommentDrawerVisible] = useState(false);
    const [commentDetail, setCommentDetail] =
      useState<GetByIdNotificationResponse>({} as GetByIdNotificationResponse);

    const customLocales = {
      emptyText: "Okunacak yorum bulunamadı.",
    };

    useEffect(() => {
      if (isUserLoggedInInfo.id) {
        fetchNotificationCommentListData();
      }
    }, [isUserLoggedInInfo.id]);

    useEffect(() => {
      if (authStore.isAuthenticated) {
        userStore
          .getFromAuth()
          .then((userInformation) => {
            setIsUserLoggedInInfo(userInformation);
            // veya yukarıda önerildiği gibi bir useEffect ile izleyebilirsiniz.
          })
          .catch(handleApiError);
      }
    }, []);

    useImperativeHandle(ref, () => ({
      reloadData() {
        fetchNotificationCommentListData();
      },
    }));

    const showDrawer = (notificationId: string) => {
      fetchNotificationCommentDetail(notificationId);
      setCommentDrawerVisible(true);
      markAsReadNotification(notificationId);
    };

    const onClose = () => {
      setCommentDrawerVisible(false);
    };

    const fetchNotificationCommentDetail = async (notificationId: string) => {
      try {
        let response = await notificationStore.getById(notificationId);
        console.log("Response =>", response);
        setCommentDetail(response);
      } catch (error) {
        handleApiError(error);
      }
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
              value: "Comment",
              logic: "and",
              filters: [
                {
                  field: "userId",
                  operator: "eq",
                  value: `${
                    isUserLoggedInInfo &&
                    isUserLoggedInInfo !== undefined &&
                    isUserLoggedInInfo.id
                  }`,
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
            <List.Item onClick={() => showDrawer(item.id)}>
              <List.Item.Meta
                avatar={
                  <Badge>
                    <CommentOutlined style={{ color: "blue" }} />
                  </Badge>
                }
                title={<Link to={item.articleId}>{item.content}</Link>}
                description={item.comment && item.comment.content}
              />
            </List.Item>
          )}
        />
        {commentDetail && (
          <CommentDrawer
            visible={commentDrawerVisible}
            onClose={onClose}
            comment={commentDetail}
          />
        )}
      </div>
    );
  }
);
export default NotificationCommentListContent;
