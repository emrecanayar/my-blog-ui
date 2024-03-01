import styles from "./comments.module.css";
import p1 from "../../assets/p1.jpeg";
import ReactQuill from "react-quill";
import { modules, formats } from "../../options/reactQuillOptions";
import { Card, Input, Pagination, Switch } from "antd";
import { useState } from "react";
import {
  AppstoreOutlined,
  CheckOutlined,
  CloseOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";

const Comments = () => {
  const [showDetails, setShowDetails] = useState(false);

  const handleQuillChange = (value: any) => {
    setShowDetails(true); // Eğer içerik boş değilse detayları göster
    if (value === "" || value === "<p><br></p>") {
      setShowDetails(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Yorum bırakın</h1>
      <div className={styles.write}>
        <ReactQuill
          modules={modules}
          theme="snow"
          placeholder="yorum yaz..."
          formats={formats}
          className={styles.input}
          onChange={handleQuillChange}
        />
        <button className={styles.button}>Gönder</button>
      </div>
      {showDetails && (
        <div
          className={`${styles.write} ${styles.commentDetails} ${
            showDetails ? styles.commentDetailsShow : ""
          }`}
        >
         <Card title="Bir yorum eklemek için oturum açın veya adınız ve e-postanızı girin." className={styles.customCard}>
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="E-Posta (Adres hiç bir zaman paylaşılmayacaktır)"
              className={styles.customInput}
            />
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="İsim"
              className={styles.customInput}
            />
            <Input
              prefix={<AppstoreOutlined className="site-form-item-icon" />}
              placeholder="Web Sitesi (İsteğe Bağlı)"
              className={styles.customInput}
            />
            <div className={styles.customSwitch}>
              <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
              Yeni yazıları bana e-postayla gönder
            </div>
            <div className={styles.customSwitch}>
              <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
              Yeni yorumlar için bana e-posta gönder.
            </div>
            <div className={styles.customSwitch}>
              <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
              Bir dahaki sefere yorum yaptığımda kullanılmak üzere adımı, e-posta adresimi ve web site adresimi bu tarayıcıya kaydet.
            </div>
          </Card>
        </div>
      )}
      <div className={styles.comments}>
        <div className={styles.comment}>
          <div className={styles.user}>
            <img
              src={p1}
              alt=""
              width={50}
              height={50}
              className={styles.image}
            />
            <div className={styles.userInfo}>
              <span className={styles.username}>Emre Can Ayar</span>
              <span className={styles.date}>31.01.2024</span>
            </div>
          </div>
          <p className={styles.desc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
            vitae culpa asperiores omnis fuga sed explicabo nostrum excepturi
            libero ab tempore quaerat, quibusdam ullam dolor, deleniti, sapiente
            assumenda neque beatae.
          </p>
        </div>
      </div>
      <div>
        <Pagination style={{ display: "flex", justifyContent: "center" }} />
      </div>
    </div>
  );
};

export default Comments;
