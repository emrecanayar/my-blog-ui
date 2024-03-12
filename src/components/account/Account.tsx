import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Image,
  Popover,
  Spin,
  Select,
} from "antd";
import { CultureType } from "../../complexTypes/enums";
import userStore from "../../stores/user/userStore";
import { GetByIdUserResponse } from "../../services/user/dtos/getByIdUserResponse";
import { handleApiError } from "../../helpers/errorHelpers";
import styles from "./account.module.css";
import config from "../../config";
import { cultureLabels } from "../../complexTypes/enumLabels";
import { UpdateUserInformationCommand } from "../../services/user/dtos/updateUserInformationCommand";
import { ToastContainer, toast } from "react-toastify";

type FieldType = {
  firstName?: string;
  lastName?: string;
  email?: string;
  cultureType: CultureType;
};

const Account = () => {
  const [form] = Form.useForm();
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [userInformation, setUserInformation] = useState<GetByIdUserResponse>(
    {} as GetByIdUserResponse
  );
  const [userInformationLoading, setUserInformationLoading] =
    useState<boolean>(false);
  const [updateUserInformation, setUpdateUserInformation] =
    useState<UpdateUserInformationCommand>({} as UpdateUserInformationCommand);

  useEffect(() => {
    fetchUserInformationData();
  }, []);

  useEffect(() => {
    // Kullanıcı bilgileri alındığında form alanlarını güncelleyin
    form.setFieldsValue({
      firstName: userInformation.firstName,
      lastName: userInformation.lastName,
      email: userInformation.email,
      cultureType: cultureLabels[userInformation.cultureType],
    });
  }, [userInformation]); // userInformation değiştiğinde bu useEffect tetiklenir

  const onFinish = async (values: FieldType) => {
    const updateCommand: UpdateUserInformationCommand = {
      id: userInformation.id, // `userInformation` state'inden `id` alınıyor
      firstName: values.firstName!,
      lastName: values.lastName!,
      email: values.email!,
      cultureType: values.cultureType,
    };

    setUpdateUserInformation(updateCommand);
    try {
      let response = await userStore.updateUserInformation(updateCommand);
      if (response.id !== undefined) {
        toast.success("Kullanıcı bilgileri başarıyla güncellendi.");
        fetchUserInformationData();
        setComponentDisabled(true);
      }
    } catch (error) {
      handleApiError(error);
    }

    console.log("Received values of form: ", values);
  };

  const updateUserInformationState = () => {
    setComponentDisabled(false);
    closePopover();
  };

  const handleVisibleChange = (visible: any) => {
    setPopoverVisible(visible);
  };

  const closePopover = () => {
    setPopoverVisible(false);
  };

  const fetchUserInformationData = async () => {
    setUserInformationLoading(true);
    try {
      let response = await userStore.getFromAuth();
      setUserInformation(response);
    } catch (error) {
      handleApiError(error);
      throw error;
    } finally {
      setUserInformationLoading(false);
    }
  };

  // Enum'dan seçenekler listesi oluşturma
  const cultureOptions = Object.keys(CultureType)
    .filter((key) => !isNaN(Number(key))) // Sayısal anahtarları filtrele
    .map((key: any) => {
      return {
        label: CultureType[key],
        value: Number.parseInt(key), // Burada CultureType enum'unun sayısal değerini kullanıyoruz
      };
    });

  const content = (
    <div>
      <p>
        Eğer bilgilerinizde bir güncelleme yapmak istiyorsanız aşağıdaki butona
        tıklayarak form içerisinde bulunan alanların açılmasını
        sağlayabilirsiniz.
      </p>
      <Button
        onClick={updateUserInformationState}
        style={{
          marginTop: "10px",
          backgroundColor: "#1890ff",
          color: "white",
        }}
        block
      >
        Güncelle
      </Button>
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "2rem",
      }}
    >
      {userInformationLoading ? (
        <div className={styles.spinnerContainer}>
          <Spin style={{ alignContent: "center" }} size="large" />{" "}
        </div>
      ) : (
        <>
          <Image
            width={200}
            style={{ marginBottom: "2rem" }} // Resim altında boşluk bırak
            src={`${config.FILE_BASE_URL}${userInformation.userUploadedFiles?.[0]?.newPath}`}
            preview={true} // Eğer resmin önizlemesini istemiyorsanız
          />
          <Form
            form={form}
            name="accountForm"
            onFinish={onFinish}
            layout="vertical" // İnputların üstünde label'ları göster
            size="large" // Daha büyük form elemanları için
            style={{ width: "100%", maxWidth: "800px" }} // Form genişliği
            disabled={componentDisabled}
          >
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item<FieldType>
                  label="Ad"
                  name="firstName"
                  rules={[
                    { required: true, message: "Ad alanı boş geçilemez!" },
                  ]}
                >
                  <Input placeholder="Adınız" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item<FieldType>
                  label="Soyad"
                  name="lastName"
                  rules={[
                    { required: true, message: "Soyad alanı boş geçilemez!" },
                  ]}
                >
                  <Input placeholder="Soyadınız" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item<FieldType>
                  label="E-Posta"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "E-Posta alanı boş geçilemez!",
                      type: "email",
                    },
                  ]}
                >
                  <Input placeholder="ornek@eposta.com" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item<FieldType> label="Uyruk" name="cultureType">
                  <Select options={cultureOptions} />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Kaydet
              </Button>
            </Form.Item>
          </Form>

          <Popover
            content={content}
            title="Güncelleme İsteği"
            trigger="click"
            visible={popoverVisible}
            onVisibleChange={handleVisibleChange}
          >
            <Button block>Bilgileri Güncelleme İsteği</Button>
          </Popover>
        </>
      )}
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

export default Account;
