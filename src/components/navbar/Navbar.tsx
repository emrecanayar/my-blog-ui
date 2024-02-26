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

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.social}>
        <img src={githubLogo} alt="github" width={24} height={24} />
        <img src={linkedinLogo} alt="linkedin" width={24} height={24} />
        <img src={xLogo} alt="x" width={24} height={24} />
        <img src={whatsappLogo} alt="whatsapp" width={24} height={24} />
      </div>
      <div className={styles.logo}>
        <Avatar
          size={85}
          src="https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Baby"
        />
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
        <AuthLinks />
      </div>
    </div>
  );
};
export default Navbar;
