"use client";
import { Link } from "react-router-dom";
import styles from "./comments.module.css";
import p1 from "../../assets/p1.jpeg";

const Comments = () => {
  const status = "authenticated";

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, libero.</h1>
      {status === "authenticated" ? (
        <div className={styles.write}>
          <textarea placeholder="yorum yaz..." className={styles.input} />
          <button className={styles.button}>Gönder</button>
        </div>
      ) : (
        <Link to="/login">Yorum yazmak için giriş yap</Link>
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
    </div>
  );
};

export default Comments;
