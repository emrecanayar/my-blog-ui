import { Menu, message } from "antd";
import { shareLinks } from "../../utils/ShareMenuUtils";
import { LinkOutlined } from "@ant-design/icons";
import { GetListArticleListItemDto } from "../../services/article/dtos/getListArticleListItemDto";

interface ShareMenuProps {
  item: GetListArticleListItemDto;
  detailUrl: string; // detailUrl prop'u eklendi
}

const ShareMenu = ({ item, detailUrl }: ShareMenuProps) => {
  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(window.location.href + "/detail/" + item.id)
      .then(() => message.success("Link panoya kopyalandı!"))
      .catch((err) => message.error("Link kopyalanırken bir hata oluştu."));
  };

  const menuItems = shareLinks(item, detailUrl).map((link, index) => (
    <Menu.Item
      key={index}
      onClick={() => {
        if (link.label === "Link'i Kopyala") {
          handleCopyLink();
        } else {
          window.open(link.url, "_blank");
        }
      }}
    >
      {link.icon} {link.label}
    </Menu.Item>
  ));

  return (
    <Menu>
      {menuItems}
      <Menu.Item key="copy" onClick={handleCopyLink}>
        <LinkOutlined /> Link'i Kopyala
      </Menu.Item>
    </Menu>
  );
};
export default ShareMenu;
