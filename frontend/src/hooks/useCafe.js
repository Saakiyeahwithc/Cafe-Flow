import { useContext } from "react";
import { CafeContext } from "../context/cafeContext"; // ✅ must match export

export function useCafe() {
  const context = useContext(CafeContext);

  if (!context) {
    throw new Error("useCafe must be used within CafeProvider");
  }

  return context;
}
