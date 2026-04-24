import { createContext, useContext, useState } from "react";

const CafeContext = createContext();

export function CafeProvider({ children }) {
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: "Espresso", category: "Coffee", price: 120, available: true },
    { id: 2, name: "Cappuccino", category: "Coffee", price: 150, available: true },
    { id: 3, name: "Latte", category: "Coffee", price: 160, available: true },
    { id: 4, name: "Americano", category: "Coffee", price: 130, available: true },
    { id: 5, name: "Club Sandwich", category: "Food", price: 280, available: true },
    { id: 6, name: "Pasta Carbonara", category: "Food", price: 320, available: true },
    { id: 7, name: "Caesar Salad", category: "Food", price: 250, available: true },
    { id: 8, name: "Burger", category: "Food", price: 300, available: true },
    { id: 9, name: "Chocolate Cake", category: "Dessert", price: 180, available: true },
    { id: 10, name: "Cheesecake", category: "Dessert", price: 200, available: true },
    { id: 11, name: "Ice Cream", category: "Dessert", price: 120, available: true },
  ]);

  const [orders, setOrders] = useState([
    {
      id: 1,
      tableNumber: "3",
      customerName: "John Doe",
      items: [
        { name: "Cappuccino", quantity: 2, price: 150 },
        { name: "Club Sandwich", quantity: 1, price: 280 },
      ],
      total: 580,
      status: "preparing",
      time: "10:30 AM",
    },
  ]);

  const [tables, setTables] = useState([
    { id: 1, number: 1, capacity: 2, isOccupied: false },
    { id: 2, number: 2, capacity: 4, isOccupied: false },
    { id: 3, number: 3, capacity: 4, isOccupied: true },
  ]);

  const [staff, setStaff] = useState([]);
  const [financeRecords, setFinanceRecords] = useState([]);

  // MENU
  const addMenuItem = (item) => {
    const newId = Math.max(...menuItems.map((i) => i.id), 0) + 1;
    setMenuItems([...menuItems, { ...item, id: newId }]);
  };

  const removeMenuItem = (id) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
  };

  const toggleMenuItemAvailability = (id) => {
    setMenuItems(
      menuItems.map((item) =>
        item.id === id ? { ...item, available: !item.available } : item
      )
    );
  };

  const updateMenuItem = (id, updates) => {
    setMenuItems(
      menuItems.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      )
    );
  };

  // ORDERS
  const addOrder = (order) => {
    const tableNum = parseInt(order.tableNumber);
    const table = tables.find((t) => t.number === tableNum);

    if (!table) {
      return { success: false, message: "Invalid table" };
    }

    if (table.isOccupied) {
      return { success: false, message: "Table occupied" };
    }

    const newId = Math.max(...orders.map((o) => o.id), 0) + 1;
    const time = new Date().toLocaleTimeString();

    const newOrder = {
      ...order,
      id: newId,
      time,
      status: "preparing",
    };

    setOrders((prev) => [...prev, newOrder]);

    setTables((prev) =>
      prev.map((t) =>
        t.number === tableNum ? { ...t, isOccupied: true } : t
      )
    );

    return { success: true, message: "Order placed" };
  };

  const completeOrder = (id, discountPercent, paymentMethod) => {
    const order = orders.find((o) => o.id === id);
    if (!order) return;

    const discountAmount = Math.round(
      (order.total * discountPercent) / 100
    );
    const finalAmount = order.total - discountAmount;

    const record = {
      id: Date.now(),
      orderId: order.id,
      tableNumber: order.tableNumber,
      customerName: order.customerName,
      items: order.items,
      subtotal: order.total,
      discountPercent,
      discountAmount,
      finalAmount,
      paymentMethod,
      paidAt: new Date().toLocaleString(),
    };

    setFinanceRecords((prev) => [record, ...prev]);

    const remaining = orders.filter((o) => o.id !== id);
    setOrders(remaining);

    setTables((prev) =>
      prev.map((t) =>
        t.number === parseInt(order.tableNumber)
          ? { ...t, isOccupied: false }
          : t
      )
    );
  };

  const cancelOrder = (id) => {
    const order = orders.find((o) => o.id === id);
    const remaining = orders.filter((o) => o.id !== id);
    setOrders(remaining);

    if (order) {
      setTables((prev) =>
        prev.map((t) =>
          t.number === parseInt(order.tableNumber)
            ? { ...t, isOccupied: false }
            : t
        )
      );
    }
  };

  // TABLES
  const addTable = (capacity) => {
    const newId = Math.max(...tables.map((t) => t.id), 0) + 1;
    const newNumber = Math.max(...tables.map((t) => t.number), 0) + 1;

    setTables((prev) => [
      ...prev,
      { id: newId, number: newNumber, capacity, isOccupied: false },
    ]);
  };

  const deleteTable = (id) => {
    const table = tables.find((t) => t.id === id);
    if (!table || table.isOccupied) {
      return { success: false, message: "Cannot delete" };
    }

    setTables((prev) => prev.filter((t) => t.id !== id));
    return { success: true, message: "Deleted" };
  };

  // STAFF
  const addStaff = (member) => {
    const newId = Math.max(...staff.map((s) => s.id), 0) + 1;
    setStaff((prev) => [...prev, { ...member, id: newId }]);
  };

  const updateStaff = (id, updates) => {
    setStaff((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  };

  const deleteStaff = (id) => {
    setStaff((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <CafeContext.Provider
      value={{
        menuItems,
        orders,
        tables,
        staff,
        financeRecords,
        addMenuItem,
        removeMenuItem,
        toggleMenuItemAvailability,
        updateMenuItem,
        addOrder,
        completeOrder,
        cancelOrder,
        addTable,
        deleteTable,
        addStaff,
        updateStaff,
        deleteStaff,
      }}
    >
      {children}
    </CafeContext.Provider>
  );
}

export function useCafe() {
  const context = useContext(CafeContext);
  if (!context) {
    throw new Error("useCafe must be used within CafeProvider");
  }
  return context;
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