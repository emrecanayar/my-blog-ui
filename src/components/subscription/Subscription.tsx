import { Button, Input, Space } from "antd";
import { observer } from "mobx-react";
import authStore from "../../stores/auth/authStore";
import { CreateSubscriptionCommand } from "../../services/subscription/dtos/createSubscriptionCommand";
import { useState } from "react";
import subscriptionStore from "../../stores/subscription/subscriptionStore";
import { ToastContainer, toast } from "react-toastify";
import { handleApiError } from "../../helpers/errorHelpers";
import userStore from "../../stores/user/userStore";

const Subscription = observer(() => {
  const [createSubscription, setCreateSubscription] =
    useState<CreateSubscriptionCommand>({} as CreateSubscriptionCommand);

  const handleSubmitSubscription = async () => {
    try {
      await handleSubscriotionState();
      let response = await subscriptionStore.createSubscription(
        createSubscription
      );
      if (response.data.id !== undefined) {
        toast.success("Abone olundu");
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleSubscriotionState = async () => {
    if (authStore.isAuthenticated) {
      createSubscription.email = userStore.userInformation.email;
      createSubscription.userId = userStore.userInformation.id;
      createSubscription.firstName = userStore.userInformation.firstName;
      createSubscription.lastName = userStore.userInformation.lastName;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCreateSubscription((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div style={{ marginTop: "10px" }}>
      {authStore.isAuthenticated ? (
        <div style={{ width: "100%" }}>
          <Button type="default" onClick={handleSubmitSubscription}>
            Abone Ol
          </Button>
        </div>
      ) : (
        <div>
          <Space.Compact style={{ width: "100%" }}>
            <Input
              placeholder="E-Posta Adresiniz"
              onChange={handleInputChange}
              name="email"
            />
            <Button type="default" onClick={handleSubmitSubscription}>
              Abone Ol
            </Button>
          </Space.Compact>
        </div>
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
});
export default Subscription;
