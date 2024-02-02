import { ReactNode, createContext, useEffect, useState } from "react";


type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggle: () => void; 
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

const getFromLocalStorage = (): Theme => {
  if (typeof window !== "undefined") {
    const theme = localStorage.getItem("theme") as Theme;
    return theme || "light";
  }
  return "light";
};

interface ThemeContextProviderProps {
  children: ReactNode;
}

export const ThemeContextProvider = ({
  children,
}: ThemeContextProviderProps) => {
  const [theme, setTheme] = useState<Theme>(getFromLocalStorage);

  const toggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};
