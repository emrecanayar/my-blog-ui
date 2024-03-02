import styles from "./comments.module.css";
import p1 from "../../assets/p1.jpeg";
import ReactQuill from "react-quill";
import { modules, formats } from "../../options/reactQuillOptions";
import { Card, Input, Pagination, Switch } from "antd";
import { useEffect, useState } from "react";
import {
  AppstoreOutlined,
  CheckOutlined,
  CloseOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import userStore from "../../stores/user/userStore";
import authStore from "../../stores/auth/authStore";
import { GetByIdUserResponse } from "../../services/user/dtos/getByIdUserResponse";
import { handleApiError } from "../../helpers/errorHelpers";
import { CreateCommentCommand } from "../../services/comment/dtos/createCommentCommand";
import commentStore from "../../stores/comment/commentStore";
import { ToastContainer, toast } from "react-toastify";

export interface CommentsProps {
  articleId: string;
}

const Comments = ({ articleId }: CommentsProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isUserLoggedInInfo, setIsUserLoggedInInfo] =
    useState<GetByIdUserResponse>({} as GetByIdUserResponse);
  const [sendButtonStatu, setSendButtonStatu] = useState(true);
  const [createComment, setCreateComment] = useState<CreateCommentCommand>(
    {} as CreateCommentCommand
  );

  useEffect(() => {
    isUserLoggedIn();
  }, []);

  const handleSumbitCreateComment = async () => {
    try {
      if (
        createComment.authorName === undefined ||
        createComment.authorEmail === undefined
      ) {
        createComment.authorName =
          isUserLoggedInInfo.firstName + " " + isUserLoggedInInfo.lastName;
        createComment.authorEmail = isUserLoggedInInfo.email;
        createComment.userId = isUserLoggedInInfo.id;
        createComment.sendNewComments = false;
        createComment.sendNewPosts = false;
        createComment.rememberMe = false;
      }
      createComment.articleId = articleId;

      let response = await commentStore.createComment(createComment);
      if (response.id !== undefined) {
        toast.success("Yorumunuz başarıyla gönderildi.");
      }
    } catch (error) {
      handleApiError(error);
      toast.error("Yorumunuz gönderilemedi.");
    }
  };

  const isUserLoggedIn = async () => {
    try {
      await authStore.initializeAuthState();
      if (authStore.isAuthenticated) {
        let userInformation = await userStore.getFromAuth();
        setIsUserLoggedInInfo(userInformation);
        setSendButtonStatu(false);
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleQuillChange = (value: any) => {
    setShowDetails(true); // Eğer içerik boş değilse detayları göster
    if (value === "" || value === "<p><br></p>") {
      setShowDetails(false);
    }
    setCreateComment((prevState) => ({
      ...prevState,
      content: value,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCreateComment((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (
      createComment.authorEmail !== undefined &&
      createComment.authorName !== undefined
    ) {
      setSendButtonStatu(false);
    }
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setCreateComment((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
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
        <button
          className={styles.button}
          disabled={sendButtonStatu}
          onClick={handleSumbitCreateComment}
        >
          Gönder
        </button>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
      {showDetails && isUserLoggedInInfo.id === undefined && (
        <div
          className={`${styles.write} ${styles.commentDetails} ${
            showDetails ? styles.commentDetailsShow : ""
          }`}
        >
          <Card
            title="Bir yorum eklemek için oturum açın veya adınız ve e-postanızı girin."
            className={styles.customCard}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="E-Posta (Adres hiç bir zaman paylaşılmayacaktır)"
              className={styles.customInput}
              name="authorEmail"
              onChange={handleInputChange}
            />
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="İsim"
              className={styles.customInput}
              name="authorName"
              onChange={handleInputChange}
            />
            <Input
              prefix={<AppstoreOutlined className="site-form-item-icon" />}
              placeholder="Web Sitesi (İsteğe Bağlı)"
              className={styles.customInput}
              name="authorWebSite"
              onChange={handleInputChange}
            />
            <div className={styles.customSwitch}>
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                onChange={(checked) =>
                  handleSwitchChange("sendNewPosts", checked)
                }
              />
              Yeni yazıları bana e-postayla gönder
            </div>
            <div className={styles.customSwitch}>
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                onChange={(checked) =>
                  handleSwitchChange("sendNewComments", checked)
                }
              />
              Yeni yorumlar için bana e-posta gönder.
            </div>
            <div className={styles.customSwitch}>
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                onChange={(checked) =>
                  handleSwitchChange("rememberMe", checked)
                }
              />
              Bir dahaki sefere yorum yaptığımda kullanılmak üzere adımı,
              e-posta adresimi ve web site adresimi bu tarayıcıya kaydet.
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
