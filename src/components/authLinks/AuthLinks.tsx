import { Link } from "react-router-dom";
import styles from "./authLinks.module.css";
import { useState } from "react";
import authStore from "../../stores/auth/authStore";
import { observer } from "mobx-react";
import { Avatar, Badge, Dropdown, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import userStore from "../../stores/user/userStore";

const AuthLinks = observer(() => {
  const [open, setOpen] = useState(false);
  const status = authStore.isAuthenticated;

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Link to="/profile">
          (
          {userStore.userInformation &&
            userStore.userInformation !== undefined &&
            userStore.userInformation.firstName +
              " " +
              userStore.userInformation.lastName}
          ) - Profil{" "}
        </Link>
      </Menu.Item>
      <Menu.Item key="1">
        <Link to="/settings">Ayarlar</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" onClick={() => authStore.logOutUser()}>
        Çıkış Yap
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      {!status ? (
        <Link to="/login">Giriş Yap</Link>
      ) : (
        <>
          <Link to="/write" className={styles.writeLink}>
            Yaz
          </Link>
          <Badge count={1}>
            <Dropdown overlay={menu} trigger={["click"]}>
              <Avatar shape="square" icon={<UserOutlined />} />
            </Dropdown>
          </Badge>
        </>
      )}
      <div className={styles.burger} onClick={() => setOpen(!open)}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
      {open && (
        <div className={styles.responsiveMenu}>
          <Link to="/">HomePage</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          {!status ? (
            <Link to="/login">Login</Link>
          ) : (
            <>
              <Link to="/logout">Write</Link>
              <span className={styles.link}>Logout</span>
            </>
          )}
        </div>
      )}
    </>
  );
});
export default AuthLinks;
