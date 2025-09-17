var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.jsx
var index_exports = {};
__export(index_exports, {
  NotifyProvider: () => NotifyProvider,
  useNotify: () => useNotify
});
module.exports = __toCommonJS(index_exports);

// src/NotifyProvider.jsx
var import_react = __toESM(require("react"));
var import_lucide_react = require("lucide-react");
var NotifyContext = (0, import_react.createContext)();
function NotifyProvider({ children }) {
  const [toast, setToast] = (0, import_react.useState)(null);
  const [alert, setAlert] = (0, import_react.useState)(null);
  const [confirm, setConfirm] = (0, import_react.useState)(null);
  const [toastProgress, setToastProgress] = (0, import_react.useState)(0);
  const toastIntervalRef = (0, import_react.useRef)();
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
  (0, import_react.useEffect)(() => {
    return () => {
      clearInterval(toastIntervalRef.current);
    };
  }, []);
  const toastIcon = {
    success: /* @__PURE__ */ import_react.default.createElement(import_lucide_react.CheckCircle, { className: "text-green-500 w-5 h-5 mr-2" }),
    info: /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Info, { className: "text-cyan-500 w-5 h-5 mr-2" }),
    warning: /* @__PURE__ */ import_react.default.createElement(import_lucide_react.AlertTriangle, { className: "text-yellow-500 w-5 h-5 mr-2" }),
    error: /* @__PURE__ */ import_react.default.createElement(import_lucide_react.XCircle, { className: "text-red-500 w-5 h-5 mr-2" })
  };
  return /* @__PURE__ */ import_react.default.createElement(
    NotifyContext.Provider,
    {
      value: { showToast, closeToast, showAlert, showConfirm }
    },
    children
  );
}

// src/useNotify.js
var import_react2 = require("react");
function useNotify() {
  const ctx = (0, import_react2.useContext)(NotifyContext);
  if (!ctx) {
    throw new Error("useNotify must be used within a NotifyProvider");
  }
  return ctx;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  NotifyProvider,
  useNotify
});
