import styles from "./navbar.module.css";
import githubLogo from "../../assets/github-logo.png";
import linkedinLogo from "../../assets/linkedin.png";
import xLogo from "../../assets/twitter.png";
import whatsappLogo from "../../assets/whatsapp.png";
import homeIcon from "../../assets/icons-home.png";
import { Link } from "react-router-dom";
import AuthLinks from "../authLinks/AuthLinks";
import ThemeToggle from "../themeToggle/ThemeToggle";
import { Avatar } from "antd";
import WhatsAppButton from "../whatsAppButton/WhatsAppButton";

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.social}>
        <img src={githubLogo} alt="github" width={24} height={24} />
        <img src={linkedinLogo} alt="linkedin" width={24} height={24} />
        <img src={xLogo} alt="x" width={24} height={24} />
        <WhatsAppButton
          phone="905379184330"
          message="Test"
          icon={whatsappLogo}
          width={24}
          height={24}
        />
      </div>
      <div className={styles.logo}>
      </div>
      <div className={styles.links}>
        <ThemeToggle />
        <Link to="/" className={styles.link}>
          <img src={homeIcon} alt="Ana Sayfa" />
        </Link>
        <Link to="/contact" className={styles.link}>
          İletişim
        </Link>
        <Link to="/about" className={styles.link}>
          Hakkımda
        </Link>
        <Link to="/trending" className={styles.link}>
          Trendler
        </Link>
        <AuthLinks />
      </div>
    </div>
  );
};
export default Navbar;
