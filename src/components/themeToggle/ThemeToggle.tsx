import styles from "./themeToggle.module.css";
import moon from "../../assets/moon.png";
import sun from "../../assets/sun.png";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const ThemeToggle = () => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) return null;
  const { toggle, theme } = themeContext;
  console.log(theme);
  return (
    <div
      className={styles.container}
      style={
        theme === "dark"
          ? { backgroundColor: "white" }
          : { backgroundColor: "#0f172a" }
      }
      onClick={toggle}
    >
      <img src={moon} alt="" width={20} height={20} />
      <div
        className={styles.ball}
        style={
          theme === "dark"
            ? { left: 1, backgroundColor: "#0f172a" }
            : { right: 1, backgroundColor: "white" }
        }
      ></div>
      <img src={sun} alt="" width={20} height={20} />
    </div>
  );
};
export default ThemeToggle;
