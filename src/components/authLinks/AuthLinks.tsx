import { Link } from "react-router-dom";
import styles from "./authLinks.module.css";
import { useEffect, useState } from "react";
import authStore from "../../stores/auth/authStore";
import { observer } from "mobx-react";
import { Avatar, Badge, Dropdown, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import userStore from "../../stores/user/userStore";
import NotificationList from "../notifications/NotificationList";
import notificationStore from "../../stores/notification/notificationStore";
import { GetNotificationCountDto } from "../../services/notification/dtos/getNotificationCountDto";
import { handleApiError } from "../../helpers/errorHelpers";
import config from "../../config";

const AuthLinks = observer(() => {
  const [open, setOpen] = useState(false);
  const status = authStore.isAuthenticated;
  const [notificationCount, setNotificationCount] =
    useState<GetNotificationCountDto>({} as GetNotificationCountDto);

  useEffect(() => {
    fetchNotificationCount();

    const interval = setInterval(() => {
      fetchNotificationCount();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchNotificationCount = async () => {
    try {
      if (userStore.userInformation.id === undefined) return;
      var response = await notificationStore.getByUserIdCount();
      if (response) {
        setNotificationCount(response);
      }
    } catch (error) {
      handleApiError(error);
    }
  };

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
        <Link to={`/myarticles/${userStore.userInformation.id}`}>
          Yazılarım
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to={`/myfavoritearticles`}>Favorilerim</Link>
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
        <Link to="/login">Giriş</Link>
      ) : (
        <>
          <Link to="/write" className={styles.writeLink}>
            Yaz
          </Link>

          <Dropdown overlay={menu} trigger={["click"]}>
            <Avatar
              style={{ cursor: "pointer" }}
              icon={<UserOutlined />}
              src={`${process.env.REACT_APP_FILE_BASE_URL}${userStore.userInformation.userUploadedFiles?.[0]?.newPath}`}
            />
          </Dropdown>

          <Badge count={notificationCount.totalCount}>
            <NotificationList />
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
          <Link to="/">Ana Sayfa</Link>
          <Link to="/about">Hakkımda</Link>
          <Link to="/contact">İletişim</Link>
          {!status ? (
            <Link to="/login">Giriş</Link>
          ) : (
            <>
              <Link to="/logout">Yaz</Link>
              <span className={styles.link}>Logout</span>
            </>
          )}
        </div>
      )}
    </>
  );
});
export default AuthLinks;
