// src/NotifyProvider.jsx
import React, { useState, createContext, useRef, useEffect } from "react";
import { CheckCircle, Info, AlertTriangle, XCircle, X } from "lucide-react";
var NotifyContext = createContext();
function NotifyProvider({ children }) {
  const [toast, setToast] = useState(null);
  const [alert, setAlert] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [toastProgress, setToastProgress] = useState(0);
  const toastIntervalRef = useRef();
  const showToast = (message, type = "info", duration = 3e3) => {
    setToast({ message, type, duration });
    setToastProgress(0);
    const start = Date.now();
    clearInterval(toastIntervalRef.current);
    toastIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration * 100, 100);
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
    setAlert((p) => p ? { ...p, show: false } : null);
    setTimeout(() => {
      var _a;
      setAlert(null);
      (_a = alert == null ? void 0 : alert.onClose) == null ? void 0 : _a.call(alert);
    }, 400);
  };
  const hideConfirm = (result) => {
    setConfirm((p) => p ? { ...p, show: false } : null);
    setTimeout(() => {
      var _a, _b;
      setConfirm(null);
      result ? (_a = confirm == null ? void 0 : confirm.onConfirm) == null ? void 0 : _a.call(confirm) : (_b = confirm == null ? void 0 : confirm.onCancel) == null ? void 0 : _b.call(confirm);
    }, 400);
  };
  useEffect(() => {
    return () => {
      clearInterval(toastIntervalRef.current);
    };
  }, []);
  const toastIcon = {
    success: /* @__PURE__ */ React.createElement(CheckCircle, { className: "text-green-500 w-5 h-5 mr-2" }),
    info: /* @__PURE__ */ React.createElement(Info, { className: "text-cyan-500 w-5 h-5 mr-2" }),
    warning: /* @__PURE__ */ React.createElement(AlertTriangle, { className: "text-yellow-500 w-5 h-5 mr-2" }),
    error: /* @__PURE__ */ React.createElement(XCircle, { className: "text-red-500 w-5 h-5 mr-2" })
  };
  return /* @__PURE__ */ React.createElement(
    NotifyContext.Provider,
    {
      value: { showToast, closeToast, showAlert, showConfirm }
    },
    children
  );
}

// src/useNotify.js
import { useContext } from "react";
function useNotify() {
  const ctx = useContext(NotifyContext);
  if (!ctx) {
    throw new Error("useNotify must be used within a NotifyProvider");
  }
  return ctx;
}
export {
  NotifyProvider,
  useNotify
};
