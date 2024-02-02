import { Link } from "react-router-dom";
import styles from "./footer.module.css";
import githubLogo from "../../assets/github-logo.png";
import linkedinLogo from "../../assets/linkedin.png";
import xLogo from "../../assets/twitter.png";
import whatsappLogo from "../../assets/whatsapp.png";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.logo}>
          <img src={logo} alt="lama blog" width={50} height={50} />
          <h1 className={styles.logoText}>Emre Can Ayar</h1>
        </div>
        <p className={styles.desc}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim
          necessitatibus similique aspernatur obcaecati veritatis. Aperiam cum
          porro sequi, totam minima consequuntur, aspernatur deleniti vero
          repellendus dorales.
        </p>
        <div className={styles.icons}>
          <img src={githubLogo} alt="" width={18} height={18} />
          <img src={linkedinLogo} alt="" width={18} height={18} />
          <img src={xLogo} alt="" width={18} height={18} />
          <img src={whatsappLogo} alt="" width={18} height={18} />
        </div>
      </div>
      <div className={styles.links}>
        <div className={styles.list}>
          <span className={styles.listTitle}>Links</span>
          <Link to="/">Homepage</Link>
          <Link to="/">Blog</Link>
          <Link to="/">About</Link>
          <Link to="/">Contact</Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Tags</span>
          <Link to="/">Style</Link>
          <Link to="/">Fashion</Link>
          <Link to="/">Coding</Link>
          <Link to="/">Travel</Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Social</span>
          <Link to="/">Facebook</Link>
          <Link to="/">Instagram</Link>
          <Link to="/">Tiktok</Link>
          <Link to="/">Youtube</Link>
        </div>
      </div>
    </div>
  );
};
export default Footer;
