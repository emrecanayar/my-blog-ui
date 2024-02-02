import { Link } from "react-router-dom";
import styles from "./authLinks.module.css";
import { useState } from "react";

const AuthLinks = () => {
  const [open, setOpen] = useState(false);
  const status = "notatuhenticated";
  return (
    <>
      {status === "notatuhenticated" ? (
        <Link to="/login">Giriş Yap</Link>
      ) : (
        <>
          <Link to="/logout">Yaz</Link>
          <span className={styles.link}>Çıkış Yap</span>
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
          {status === "notatuhenticated" ? (
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
};
export default AuthLinks;
