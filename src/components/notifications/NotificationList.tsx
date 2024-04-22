import React, { useRef } from "react";
import { Menu, Tabs, Dropdown } from "antd";
import { BellOutlined } from "@ant-design/icons";
import TabPane from "antd/es/tabs/TabPane";
import { Link } from "react-router-dom";
import NotificationCommentListContent from "./components/comment/NotificationCommentListContent";
import styles from "./notificationList.module.css";
import NotificationListContent from "./components/allNotifications/NotificationListContent";
import NotiticationsLikeListContent from "./components/like/NotificationLikeListContent";
import NotificationSubscriptionListContent from "./components/subscription/NotificationSubscriptionListContent";

const NotificationList: React.FC = () => {
  const commentListRef = useRef<any>(null);
  const likeListRef = useRef<any>(null);
  const subscriptionListRef = useRef<any>(null);
  const allListRef = useRef<any>(null);

  const handleTabChange = (activeKey: string) => {
    if (activeKey === "3") {
      commentListRef.current?.reloadData();
    } else if (activeKey === "5") {
      likeListRef.current?.reloadData();
    } else if (activeKey === "4") {
      subscriptionListRef.current?.reloadData();
    } else if (activeKey === "1") {
      allListRef.current?.reloadData();
    }
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <Tabs defaultActiveKey="1" onChange={handleTabChange}>
          <TabPane tab="Hepsi" key="1">
            <NotificationListContent ref={allListRef} />
          </TabPane>
          <TabPane tab="Yorumlar" key="3">
            <NotificationCommentListContent ref={commentListRef} />
          </TabPane>
          <TabPane tab="Abonelikler" key="4">
            <NotificationSubscriptionListContent ref={subscriptionListRef} />
          </TabPane>
          <TabPane tab="Beğenmeler" key="5">
            <NotiticationsLikeListContent ref={likeListRef} />
          </TabPane>
        </Tabs>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <div className={styles.notificationWrapper}>
        <Dropdown overlay={menu} trigger={["click"]}>
          <Link
            to=""
            className="ant-dropdown-link"
            onClick={(e) => e.preventDefault()}
          >
            <BellOutlined
              style={{ fontSize: "24px" }}
              onClick={(e) => {
                e.preventDefault(); // Prevent default if necessary
                handleTabChange("3");
                handleTabChange("5");
                handleTabChange("4");
                handleTabChange("1");
              }}
            />
          </Link>
        </Dropdown>
      </div>
    </>
  );
};

export default NotificationList;
