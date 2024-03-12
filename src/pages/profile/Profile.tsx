import { Card, Layout, Menu, Typography } from "antd";
import "./profile.module.css";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import React, { useState } from "react";
import { SettingOutlined, UserOutlined } from "@ant-design/icons";
import Account from "../../components/account/Account";
import ChangePassword from "../../components/changePassword/ChangePassword";
const { Paragraph } = Typography;

// Alt menü seçenekleri için bir dizi oluşturun
const subItems = [
  { label: "Hesap", key: "sub1-1" },
  { label: "Şifre", key: "sub1-2" },
  { label: "Güvenlik", key: "sub1-3" },
  { label: "Uygulama", key: "sub1-4" },
  { label: "Bildirimler", key: "sub1-5" },
];

// Ana menü ve alt menüler için items dizisini oluşturun
const items = [
  {
    key: "sub1",
    icon: React.createElement(UserOutlined),
    label: "Profil",
    children: subItems, // Alt menü seçeneklerini buraya ekleyin
  },
];

const Profile = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("");

  // Menu öğesine tıklandığında çalışacak fonksiyon
  const onMenuClick = (e: any) => {
    setSelectedMenuItem(e.key);
  };

  function DefaultSelect() {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Paragraph>
          Bu sayfada profil ayarlarınızı düzenleyebilirsiniz. Sol tarafta
          bulunan menüden istediğiniz ayarı seçebilirsiniz.
        </Paragraph>

        <div>
          <SettingOutlined />
        </div>
      </div>
    );
  }

  return (
    <Card title="Profil Ayarları">
      <Layout
        style={{
          padding: "24px 0",
          background: "white",
          borderRadius: "borderRadiusLG",
        }}
      >
        <Sider style={{ background: "white" }} width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%" }}
            items={items}
            onClick={onMenuClick}
          />
        </Sider>
        <Content>
          {<DefaultSelect />}
          {selectedMenuItem === "sub1-1" && <Account />}
          {selectedMenuItem === "sub1-2" && <ChangePassword />}
        </Content>
      </Layout>
    </Card>
  );
};

export default Profile;
