"use client";
import React, { useState, createContext, useRef, useEffect } from "react";
import { CheckCircle, Info, AlertTriangle, XCircle, X } from "lucide-react";

// export the context so useNotify can import it
export const NotifyContext = createContext();

export function NotifyProvider({ children }) {
  const [toast, setToast] = useState(null);
  const [alert, setAlert] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [toastProgress, setToastProgress] = useState(0);
  const toastIntervalRef = useRef();

  const showToast = (message, type = "info", duration = 3000) => {
    setToast({ message, type, duration });
    setToastProgress(0);

    const start = Date.now();
    clearInterval(toastIntervalRef.current);
    toastIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min((elapsed / duration) * 100, 100);
      setToastProgress(progress);
      if (progress >= 100) clearInterval(toastIntervalRef.current);
    }, 20);

    setTimeout(() => {
      setToast(null);
      setToastProgress(0);
      clearInterval(toastIntervalRef.current);
    }, duration);
  };

  const closeToast = () => {
    setToast(null);
    setToastProgress(0);
    clearInterval(toastIntervalRef.current);
  };

  const showAlert = (message, onClose) => {
    setAlert({ message, onClose, show: true });
  };

  const showConfirm = (message, onConfirm, onCancel) => {
    setConfirm({ message, onConfirm, onCancel, show: true });
  };

  const hideAlert = () => {
    setAlert((p) => (p ? { ...p, show: false } : null));
    setTimeout(() => {
      setAlert(null);
      alert?.onClose?.();
    }, 400);
  };

  const hideConfirm = (result) => {
    setConfirm((p) => (p ? { ...p, show: false } : null));
    setTimeout(() => {
      setConfirm(null);
      result ? confirm?.onConfirm?.() : confirm?.onCancel?.();
    }, 400);
  };

  useEffect(() => {
    return () => {
      clearInterval(toastIntervalRef.current);
    };
  }, []);

  const toastIcon = {
    success: <CheckCircle className="text-green-500 w-5 h-5 mr-2" />,
    info: <Info className="text-cyan-500 w-5 h-5 mr-2" />,
    warning: <AlertTriangle className="text-yellow-500 w-5 h-5 mr-2" />,
    error: <XCircle className="text-red-500 w-5 h-5 mr-2" />,
  };

  return (
    <NotifyContext.Provider
      value={{ showToast, closeToast, showAlert, showConfirm }}
    >
      {children}
      {/* toast / dialogs UI (keep your existing JSX here) */}
      {/* ...existing code... */}
    </NotifyContext.Provider>
  );
}
