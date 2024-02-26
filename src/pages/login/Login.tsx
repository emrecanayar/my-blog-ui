"use client";
import { Link } from "react-router-dom";
import styles from "./loginPage.module.css";

const LoginPage = () => {
  const status = "authenticated";

  if (status === "authenticated") {
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.center}>
          <h1>Giriş Yap</h1>
          <form>
            <div className={styles.txtField}>
              <input type="email" name="email" />
              <span></span>
              <label>E-Posta</label>
            </div>
            <div className={styles.txtField}>
              <input type="password" name="password" />
              <span></span>
              <label>Şifre</label>
            </div>
            <div className={styles.pass}>Şifremi Unuttum?</div>
            <input type="submit" value="Giriş Yap" />
            <div className={styles.signupLink}>
              Üye değil misin? <Link to="#">Üye Ol</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
