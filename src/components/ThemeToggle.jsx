import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useThemeContext } from "@/context/ThemeContext";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeContext();
  const iconRef = useRef(null);

  useEffect(() => {
    if (!iconRef.current) return;

    const tl = gsap.timeline();

    tl.to(iconRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        iconRef.current.textContent = theme === "light" ? "🌙" : "☀️";
      },
    })
      .to(iconRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
      });

    return () => tl.kill();
  }, [theme]);

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Activate ${theme === "light" ? "dark" : "light"} mode`}
      className='h-12 w-12 rounded-full border-3 flex items-center justify-center cursor-pointer 
        transition-all duration-300 shadow-md overflow-hidden border-green-700 bg-green-200 hover:bg-green-300'
    >
      <span ref={iconRef} className="text-3xl select-none flex items-center justify-center">
        {theme === "light" ? "🌙" : "☀️"}
      </span>
    </button>
  );
};
