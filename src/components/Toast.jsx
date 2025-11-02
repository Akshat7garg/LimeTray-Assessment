import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Toast({ toast }) {
  const toastRef = useRef(null);

  // Animation effect on toast visibility change
  useEffect(() => {
    if (toast.visible) {
      gsap.fromTo(
        toastRef.current,
        { y: -50, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
        }
      );
    } else {
      gsap.to(toastRef.current, {
        y: -50,
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [toast.visible]);

  if (!toast.visible) return null;

  // Define color schemes based on toast type
  const colors = {
    success: "border-3 border-green-700 bg-green-200 text-green-700",
    error: "border-3 border-red-700 bg-red-200 text-red-700",
    info: "border-3 border-blue-700 bg-blue-200 text-blue-700",
  };

  return (
    <div
      ref={toastRef}
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 
        px-6 py-3 rounded-xl shadow-lg font-medium 
        ${colors[toast.type] || colors.success}`}
    >
      {toast.message}
    </div>
  );
}
