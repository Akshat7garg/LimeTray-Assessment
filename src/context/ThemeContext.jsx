import { createContext, useContext } from "react";
import useTheme from "@/hooks/useTheme";

const ThemeContext = createContext({
    theme: "light",
    toggleTheme: () => { },
});

export const ThemeProvider = ({ children }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook to use ThemeContext
export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useThemeContext must be used within a ThemeProvider");
    }
    return context;
};
