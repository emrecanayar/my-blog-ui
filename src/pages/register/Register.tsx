import { ToastContainer, toast } from "react-toastify";
import styles from "./register.module.css";
import { GetProp, Row, Upload, UploadProps } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import authStore from "../../stores/auth/authStore";
import { handleApiError } from "../../helpers/errorHelpers";
import useFileUpload from "../../hooks/useFileUpload";
import uploadedFileStore from "../../stores/uploadedFile/uploadedFileStore";
import { RegisterCommand } from "../../services/auth/dtos/registerCommand";

const Register = () => {
  type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [register, setRegister] = useState<RegisterCommand>({
    userForRegisterDto: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
    tokens: [],
  });

  const { handleFiles } = useFileUpload();

  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      toast.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      toast.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Resim Yükle</div>
    </button>
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegister((prevRegister) => ({
      ...prevRegister,
      userForRegisterDto: {
        ...prevRegister.userForRegisterDto,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (!uploadedFileStore.uploadFile) {
        toast.error("Lütfen bir resim yükleyin.");
        return;
      }

      if (!register.tokens) {
        register.tokens = [];
      }
      register.tokens.push(uploadedFileStore.uploadedFile.token);
      let response = await authStore.register(register);
      if (response.token !== null) {
        toast.success("Kayıt Başarılı");
        window.location.href = "/login";
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setRegister({} as RegisterCommand);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.center}>
          <h1>Kayıt Ol</h1>
          <form onSubmit={handleSubmit}>
            <div className={styles.uploadSection}>
              <Row>
                <Upload
                  name="avatar"
                  listType="picture-circle"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                  customRequest={({ file, onSuccess }) => {
                    setTimeout(() => {
                      const dataTransfer = new DataTransfer();
                      dataTransfer.items.add(file as File);
                      // Yeni handleFiles fonksiyonunu çağır
                      handleFiles(dataTransfer.files);
                      if (onSuccess) {
                        onSuccess("ok");
                      }
                    }, 0);
                  }}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="avatar"
                      style={{ width: "100%" }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </Row>
            </div>
            <div className={styles.inputRow}>
              <div className={styles.txtField}>
                <input
                  type="text"
                  name="firstName"
                  onChange={handleInputChange}
                  required
                />
                <span></span>
                <label>Ad</label>
              </div>
              <div className={styles.txtField}>
                <input
                  type="text"
                  name="lastName"
                  onChange={handleInputChange}
                  required
                />
                <span></span>
                <label>Soyad</label>
              </div>
            </div>
            <div className={styles.inputRow}>
              <div className={styles.txtField}>
                <input
                  type="email"
                  name="email"
                  onChange={handleInputChange}
                  required
                />
                <span></span>
                <label>E-Posta</label>
              </div>
              <div className={styles.txtField}>
                <input
                  type="password"
                  name="password"
                  onChange={handleInputChange}
                  required
                />
                <span></span>
                <label>Şifre</label>
              </div>
            </div>
            <input
              type="submit"
              value="Kayıt Ol"
              style={{ marginBottom: "10px" }}
            />
          </form>
        </div>
      </div>
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
  );
};
export default Register;
