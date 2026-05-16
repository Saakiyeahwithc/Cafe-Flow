import { useState } from "react";
import { privateAPI } from "../auth/config/api.js";

export function useTables() {
  //   const [tables, setTables] = useState([
  //   { id: 1, tableNo: 4, capacity: 2, status: "Available", details: null},
  //   { id: 2, tableNo: 2, capacity: 4, status: "Available", details: null},
  //   { id: 3, tableNo: 3, capacity: 4, status: "Available", details: null},
  //   { id: 4, tableNo: 1, capacity: 1, status: "Available", details: null},
  // ]);

  const [tables, setTables] = useState([]);

  const fetchTables = async () => {
    try {
      const res = await privateAPI.get("/tables/");
      console.log(res.data.data);

      setTables(res.data.data);
    } catch (error) {
      console.error("Error fetching tables:", error);
    }
  };

  const changeTableStatus = async (id, status) => {
    try {
      if (status === "Occupied") {
        await privateAPI.patch(`/tables/${id}/occupy`);
      } else {
        await privateAPI.put(`/tables/${id}`, { status });
      }

      fetchTables();
    } catch (error) {
      console.error("Error changing table status:", error);
    }
  };

  const assignTable = async (id) => {
    try {
      await privateAPI.patch(`/table-reservations/${id}/assign`);
      fetchTables();
    } catch (error) {
      console.error("Error assigning table:", error.message);
    }
  };
  const deleteTable = async (id) => {
    try {
      await privateAPI.delete(`/tables/${id}`);
      fetchTables();
    } catch (error) {
      console.error("Error deleting table:", error);
    }
  };

  return { tables, fetchTables, changeTableStatus, deleteTable, assignTable };
}
