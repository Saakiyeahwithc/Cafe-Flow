// src/controllers/table.controller.js
import { prisma } from "../utils/prisma.js";

const VALID_STATUSES = ["Available", "Occupied", "Reserved"];

// ─── Create Table ─────────────────────────────────────────────────────────────
export const createTable = async (req, res, next) => {
  try {
    const { table_number, capacity, status } = req.body;

    if (!table_number) {
      return res.status(400).json({ message: "table_number is required" });
    }

    if (status && !VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        message: `status must be one of: ${VALID_STATUSES.join(", ")}`,
      });
    }

    const existing = await prisma.table.findUnique({ where: { table_number } });
    if (existing) {
      return res
        .status(409)
        .json({ message: `Table '${table_number}' already exists` });
    }

    const table = await prisma.table.create({
      data: {
        table_number,
        capacity: capacity ? Number(capacity) : 2,
        status: status || "Available",
      },
    });

    return res.status(201).json({
      message: "Table created successfully",
      data: table,
    });
  } catch (error) {
    next(error);
  }
};

// ─── Get All Tables ───────────────────────────────────────────────────────────
export const getAllTables = async (req, res, next) => {
  try {
    const { status } = req.query;

    const filters = {};

    if (status) {
      if (!VALID_STATUSES.includes(status)) {
        return res.status(400).json({
          message: `status must be one of: ${VALID_STATUSES.join(", ")}`,
        });
      }
      filters.status = status;
    }

    const tables = await prisma.table.findMany({
      where: filters,
      include: {
        tableReservations: {
          where: {
            status: "active", // only active reservations
          },
          include: {
            guest: true,
          },
        },
      },
      orderBy: {
        table_number: "asc",
      },
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const updatedTables = tables.map((table) => {
      const todayReservation = table.tableReservations.find((reservation) => {
        const reservationDate = new Date(reservation.reservation_date);
        reservationDate.setHours(0, 0, 0, 0);

        return reservationDate.getTime() === today.getTime();
      });

      return {
        ...table,
        todayReservation,
        status:
          table.status === "Occupied"
            ? "Occupied" // occupied overrides reservation
            : todayReservation
              ? "Reserved"
              : "Available",
      };
    });

    if (updatedTables.length === 0) {
      return res.status(200).json({
        message: "No tables found",
        data: [],
      });
    }

    return res.status(200).json({
      message: "Tables fetched successfully",
      data: updatedTables,
    });
  } catch (error) {
    next(error);
  }
};
// ─── Get Table By ID ──────────────────────────────────────────────────────────
export const getTableById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const table = await prisma.table.findUnique({
      where: { table_id: Number(id) },
      include: {
        food_orders: true,
        billings: true,
      },
    });

    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }

    return res.status(200).json({
      message: "Table fetched successfully",
      data: table,
    });
  } catch (error) {
    next(error);
  }
};

// ─── Update Table ─────────────────────────────────────────────────────────────
// In table.controller.js — update the updateTable function
export const updateTable = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const existing = await prisma.table.findUnique({
      where: { table_id: Number(id) },
    });
    if (!existing) {
      return res.status(404).json({ message: "Table not found" });
    }

    if (status && !VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        message: `status must be one of: ${VALID_STATUSES.join(", ")}`,
      });
    }

    // If freeing the table, close any active reservations in the same transaction
    const table = await prisma.$transaction(async (tx) => {
      if (status === "Available") {
        await tx.tableReservation.updateMany({
          where: {
            table_id: Number(id),
            status: "active",
          },
          data: { status: "completed" }, // or "cancelled" — whatever your schema uses
        });
      }

      return tx.table.update({
        where: { table_id: Number(id) },
        data: { status: status ?? existing.status },
      });
    });

    return res.status(200).json({
      message: "Table updated successfully",
      data: table,
    });
  } catch (error) {
    next(error);
  }
};

// ─── Delete Table ─────────────────────────────────────────────────────────────
export const deleteTable = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existing = await prisma.table.findUnique({
      where: { table_id: Number(id) },
      include: {
        food_orders: true,
        billings: true,
      },
    });

    if (!existing) {
      return res.status(404).json({ message: "Table not found" });
    }

    if (existing.food_orders.length > 0 || existing.billings.length > 0) {
      return res.status(400).json({
        message:
          "Cannot delete table linked to existing food orders or billings.",
      });
    }

    await prisma.table.delete({ where: { table_id: Number(id) } });

    return res.status(200).json({ message: "Table deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const occupyTable = async (req, res, next) => {
  try {
    const { id } = req.params;

    const table = await prisma.table.findUnique({
      where: { table_id: Number(id) },
    });

    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }

    if (table.status === "Occupied") {
      return res.status(400).json({
        message: `Table is currently ${table.status} and cannot be occupied`,
      });
    }

    const result = await prisma.$transaction(async (tx) => {
      await tx.tableReservation.updateMany({
        where: {
          table_id: Number(id),
          status: "active",
        },
        data: { status: "completed" },
      });

      const reservation = await tx.tableReservation.create({
        data: {
          reservation_date: new Date(),
          reservation_time: new Date().toTimeString().slice(0, 5),
          status: "seated",
          type: "walk_in",
          table: { connect: { table_id: Number(id) } },
        },
      });

      await tx.table.update({
        where: { table_id: Number(id) },
        data: { status: "Occupied" },
      });

      return reservation;
    });

    return res.status(200).json({
      message: "Table occupied successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
