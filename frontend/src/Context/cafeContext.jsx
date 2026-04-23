import { useState, createContext } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const CafeContext = createContext();

export function CafeProvider({ children }) {
  const [menuItems, setMenuItems] = useState([]);
  const [orders, setOrders] = useState([]);

  return (
    <CafeContext.Provider
      value={{ menuItems, orders, setMenuItems, setOrders }}
    >
      {children}
    </CafeContext.Provider>
  );
}
