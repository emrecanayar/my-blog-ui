import React from "react";
import { List, Badge, Menu, Tabs, Dropdown } from "antd";
import { MailOutlined, LikeOutlined, BellOutlined } from "@ant-design/icons";
import TabPane from "antd/es/tabs/TabPane";
import { Link } from "react-router-dom";
import NotificationCommentListContent from "./components/NotificationCommentListContent";

const data = [
  {
    id: 1,
    title: "Hemen harekete geçin! WordPress.com alan adınız yenilenemedi",
    icon: <MailOutlined style={{ color: "red" }} />,
    description: "OLDER THAN 2 DAYS",
    badgeCount: 1,
    link: "/example-link-1",
  },
  {
    id: 2,
    title: "Emre Can Ayar tarihinde 500 gönderi paylaştınız.",
    icon: <LikeOutlined style={{ color: "blue" }} />,
    description: "OLDER THAN A MONTH",
    badgeCount: 27,
    link: "/example-link-2",
  },
];

const NotificationListContent = () => (
  <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item) => (
      <List.Item>
        <List.Item.Meta
          avatar={
            <Badge count={item.badgeCount} overflowCount={99}>
              {item.icon}
            </Badge>
          }
          title={<Link to={item.link}>{item.title}</Link>}
          description={item.description}
        />
      </List.Item>
    )}
  />
);

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

const NotificationList = () => (
  <Dropdown overlay={menu} trigger={["click"]}>
    <Link
      to=""
      className="ant-dropdown-link"
      onClick={(e) => e.preventDefault()}
    >
      <BellOutlined style={{ fontSize: "24px" }} />
    </Link>
  </Dropdown>
);

export default NotificationList;
