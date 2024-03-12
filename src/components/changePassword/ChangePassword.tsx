import { Button, Col, Form, Input, Row } from "antd";
import { useState } from "react";
import { ChangePasswordCommand } from "../../services/user/dtos/changePasswordCommand";
import userStore from "../../stores/user/userStore";
import { handleApiError } from "../../helpers/errorHelpers";
import { ToastContainer, toast } from "react-toastify";
import authStore from "../../stores/auth/authStore";

const ChangePassword = () => {
  const [form] = Form.useForm();
  const [changePassword, setChangePassword] = useState<ChangePasswordCommand>(
    {} as ChangePasswordCommand
  );

  const onFinish = async (values: ChangePasswordCommand) => {
    setChangePassword(values);
    try {
      let response = await userStore.changePassword(changePassword);
      if (response.id !== undefined) {
        form.resetFields();
        toast.success("Şifreniz başarıyla değiştirildi.");
        await authStore.logOutUser();
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Form
        form={form}
        name="dependencies"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        size="large" // Daha büyük form elemanları için
        style={{ width: "100%", maxWidth: "800px" }} // Form genişliği
      >
        <Row gutter={24}>
          <Col xs={24} sm={24}>
            <Form.Item<ChangePasswordCommand>
              label="Mevcut Şifre"
              name="currentPassword"
              rules={[
                { required: true, message: "Lütfen mevcut şifrenizi girin!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col xs={24} sm={24}>
            <Form.Item<ChangePasswordCommand>
              label="Yeni Şifre"
              name="newPassword"
              rules={[
                { required: true, message: "Lütfen yeni şifrenizi girin!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col xs={24} sm={24}>
            <Form.Item<ChangePasswordCommand>
              label="Yeni Şifre Tekrar"
              name="confirmPassword"
              dependencies={["newPassword"]}
              rules={[
                {
                  required: true,
                  message: "Lütfen yeni şifrenizi tekrar girin!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Girdiğiniz yeni şifre eşleşmiyor!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xs={24} sm={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Kaydet
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
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
export default ChangePassword;
