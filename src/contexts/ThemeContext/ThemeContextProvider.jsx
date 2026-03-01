import React, { useState } from "react";
import ThemeContext from "./ThemeContext";

export default function ThemeContextProvider({ children }) {
    const [theme, setTheme] = useState("light");

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    const value = {
        theme,
        toggleTheme,
    };

    return <ThemeContext value={value}>{children}</ThemeContext>;
}
