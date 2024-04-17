import React from "react";
import { Menu, Tabs, Dropdown } from "antd";
import { BellOutlined } from "@ant-design/icons";
import TabPane from "antd/es/tabs/TabPane";
import { Link } from "react-router-dom";
import NotificationCommentListContent from "./components/comment/NotificationCommentListContent";
import styles from "./notificationList.module.css";
import NotificationListContent from "./components/allNotifications/NotificationListContent";

const NotificationList: React.FC = () => {
  const menu = (
    <Menu>
      <Menu.Item>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Hepsi" key="1">
            <NotificationListContent />
          </TabPane>
          <TabPane tab="Okunmayanlar" key="2">
            İçerik 2
          </TabPane>
          <TabPane tab="Yorumlar" key="3">
            <NotificationCommentListContent />
          </TabPane>
          <TabPane tab="Abonelikler" key="4">
            İçerik 4
          </TabPane>
          <TabPane tab="Beğenmeler" key="5">
            İçerik 5
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
            <BellOutlined style={{ fontSize: "24px" }} />
          </Link>
        </Dropdown>
      </div>
    </>
  );
};

export default NotificationList;
