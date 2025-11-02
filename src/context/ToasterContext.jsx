import { createContext, useContext, useState, useCallback, useRef } from "react";
import Toast from "@/components/Toast";

const ToasterContext = createContext();

export const ToasterProvider = ({ children }) => {
    const [toast, setToast] = useState({ message: "", type: "", visible: false });
    const timeoutRef = useRef(null);

    const showToast = useCallback((message, type = "success", duration = 2500) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        setToast({ message, type, visible: true });

        timeoutRef.current = setTimeout(() => {
            setToast((prev) => ({ ...prev, visible: false }));
            timeoutRef.current = null;
        }, duration);
    }, []);

    return (
        <ToasterContext.Provider value={{ showToast }}>
            {children}
            <Toast toast={toast} />
        </ToasterContext.Provider>
    );
};

export const useToaster = () => {
    const context = useContext(ToasterContext);
    if (!context) {
        throw new Error("useToaster must be used within ToasterProvider");
    }
    return context;
};
