"use client";
import { Link } from "react-router-dom";
import styles from "./loginPage.module.css";
import { useEffect, useState } from "react";
import { UserForLoginDto } from "../../services/auth/dtos/userForLoginDto";
import authStore from "../../stores/auth/authStore";
import { handleApiError } from "../../helpers/errorHelpers";
import { observer } from "mobx-react";
import { ToastContainer } from "react-toastify";

const LoginPage = observer(() => {
  const [loginModel, setLoginModel] = useState<UserForLoginDto>({
    email: "",
    password: "",
  });

  const status = "authenticated";

  if (status === "authenticated") {
  }

  useEffect(() => {
    authStore.logOutLoginUserAutomatically();
  }, []);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setLoginModel({
      ...loginModel,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      var result = await authStore.login(loginModel);
      if (result?.accessToken.token !== null) {
        window.location.href = "/";
        localStorage.setItem("token", result.accessToken.token);
        authStore.authenticatedUser();
      }
    } catch (error: any) {
      console.log("Error", error);
      handleApiError(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.center}>
          <h1>Giriş Yap</h1>
          <form onSubmit={handleSubmit}>
            <div className={styles.txtField}>
              <input
                type="email"
                name="email"
                value={loginModel.email}
                onChange={handleInputChange}
              />
              <span></span>
              <label>E-Posta</label>
            </div>
            <div className={styles.txtField}>
              <input
                type="password"
                name="password"
                value={loginModel.password}
                onChange={handleInputChange}
              />
              <span></span>
              <label>Şifre</label>
            </div>
            <div className={styles.pass}>Şifremi Unuttum?</div>
            <input type="submit" value="Giriş Yap" />
            <div className={styles.signupLink}>
              Üye değil misin? <Link to="/register">Üye Ol</Link>
            </div>
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
});

export default LoginPage;
