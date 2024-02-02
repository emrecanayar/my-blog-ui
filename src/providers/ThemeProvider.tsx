import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";

const ThemeProvider = ({ children }: any) => {
  const themeContext = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!themeContext) return null;
  const { theme } = themeContext;

  if (mounted) {
    return <div className={theme}>{children}</div>;
  }

  return <div className={theme}>{children}</div>;
};

export default ThemeProvider;
