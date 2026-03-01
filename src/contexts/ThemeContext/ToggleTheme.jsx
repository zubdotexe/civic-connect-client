import { useContext } from "react";
import ThemeContext from "./ThemeContext";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import { ImSun } from "react-icons/im";

export default function ToggleTheme() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    const handleToggle = () => {
        toggleTheme();

        const html = document.documentElement;
        const newTheme = theme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
    };

    return (
        <div>
            <button className="cursor-pointer pt-1" onClick={handleToggle}>
                {theme === "light" ? (
                    <MdDarkMode size={24} />
                ) : (
                    <ImSun size={20} />
                )}
            </button>
        </div>
    );
}
