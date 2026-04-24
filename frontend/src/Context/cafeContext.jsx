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

//for adding, updating and deleting units (tables and rooms)
export const UnitContext = createContext();

export function UnitProvider({ children }) {
  const [units, setUnits] = useState([]);

  // adding new unit (table or room)
  const addUnit = ({ type, number, capacity }) => {
    const normalizedNumber = Number(number);
    
    const exists = units.some(
      (u) => u.type === type && u.number === normalizedNumber
    );

    if (exists) {
      return false;
    }

    const newUnit = {
      id: Date.now(),
      type: type,        // "table" | "room"
      number: Number(number),      
      capacity: Math.max(1, Number(capacity)),    // seats or beds
      customerName: "",
      status: "Available",
    };

    setUnits((prev) => [...prev, newUnit]);
    return true;
  };

  // updating status and name
  const updateUnit = (id, newStatus, newCustomerName) => {
    setUnits((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: newStatus, 
            customerName: newStatus === "Available" ? "" : newCustomerName, }
          : u
      )
    );
  };

  // deleting unit
  const deleteUnit = (id) => {
    setUnits((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <UnitContext.Provider
      value={{
        units,
        addUnit,
        updateUnit,
        deleteUnit,
      }}
    >
      {children}
    </UnitContext.Provider>
  );
}