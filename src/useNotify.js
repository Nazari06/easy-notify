import { useContext } from "react";
import { NotifyContext } from "./NotifyProvider.jsx";

export function useNotify() {
  const ctx = useContext(NotifyContext);
  if (!ctx) {
    throw new Error("useNotify must be used within a NotifyProvider");
  }
  return ctx;
}
