import { LikeOutlined, MailOutlined } from "@ant-design/icons";
import { Badge, List } from "antd";
import { Link } from "react-router-dom";

interface NotificationItem {
  id: number;
  title: string;
  icon: JSX.Element;
  description: string;
  badgeCount: number;
  link: string;
}

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

const NotificationListContent: React.FC = () => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Badge count={item.badgeCount}>
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
};
export default NotificationListContent;
