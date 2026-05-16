import { prisma } from "../utils/prisma.js";

// Assign/Reserve a Table
export const createTableReservation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      guest_name,
      phone,
      guest_count,
      reservation_date,
      reservation_time,
    } = req.body;

    if (!guest_name || !guest_count || !reservation_date || !reservation_time) {
      return res.status(400).json({
        message:
          "guest_name, guest_count, reservation_date and reservation_time are required",
      });
    }

    const table = await prisma.table.findUnique({
      where: { table_id: Number(id) },
    });

    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }

    // Only block if table is currently occupied
    if (table.status === "Occupied") {
      return res.status(400).json({
        message: "Table is currently occupied and cannot be reserved",
      });
    }

    const existingReservation = await prisma.tableReservation.findFirst({
      where: {
        table_id: Number(id),
        reservation_date: new Date(reservation_date),
        reservation_time,
        status: "active",
        type: "reservation",
      },
    });

    if (existingReservation) {
      return res.status(400).json({
        message:
          "This table is already reserved for the selected date and time",
      });
    }

    const reservation = await prisma.$transaction(async (tx) => {
      let guest = phone
        ? await tx.guest.findUnique({ where: { phone } })
        : null;

      if (!guest) {
        guest = await tx.guest.create({
          data: {
            full_name: guest_name,
            phone: phone || null,
          },
        });
      }

      const newReservation = await tx.tableReservation.create({
        data: {
          guest_count: Number(guest_count),
          reservation_date: new Date(reservation_date),
          reservation_time,
          status: "active",
          type: "reservation",
          guest: {
            connect: { guest_id: guest.guest_id },
          },
          table: {
            connect: { table_id: Number(id) },
          },
        },
        include: {
          guest: true,
          table: true,
        },
      });

      return newReservation;
    });

    return res.status(201).json({
      message: "Table reserved successfully",
      data: reservation,
    });
  } catch (error) {
    next(error);
  }
};

// Get All Table Reservations
export const getAllTableReservations = async (req, res, next) => {
  try {
    const reservations = await prisma.tableReservation.findMany({
      include: {
        guest: true,
        table: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return res.status(200).json({
      message: "Table reservations fetched successfully",
      data: reservations,
    });
  } catch (error) {
    next(error);
  }
};

// Get Single Table Reservation
export const getTableReservation = async (req, res, next) => {
  try {
    const { id } = req.params;

    const reservation = await prisma.tableReservation.findUnique({
      where: { table_reservation_id: Number(id) },
      include: {
        guest: true,
        table: true,
        foodOrders: true,
      },
    });

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    return res.status(200).json({
      message: "Reservation fetched successfully",
      data: reservation,
    });
  } catch (error) {
    next(error);
  }
};

// Cancel / Complete a Table Reservation
export const assignTable = async (req, res, next) => {
  try {
    const { id } = req.params; // table_reservation_id

    const reservation = await prisma.tableReservation.findUnique({
      where: { table_reservation_id: Number(id) },
      include: { table: true, guest: true },
    });

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    if (reservation.status === "seated") {
      return res.status(400).json({ message: "Guest is already seated" });
    }

    if (reservation.status === "cancelled") {
      return res
        .status(400)
        .json({ message: "This reservation has been cancelled" });
    }

    if (reservation.status !== "active") {
      return res.status(400).json({
        message: `Reservation status is "${reservation.status}" and cannot be assigned`,
      });
    }

    if (
      reservation.table.status !== "Available" &&
      reservation.table.status !== "Reserved"
    ) {
      return res.status(400).json({
        message: `Table is currently ${reservation.table.status} and cannot be assigned`,
      });
    }

    const result = await prisma.$transaction(async (tx) => {
      const updatedReservation = await tx.tableReservation.update({
        where: { table_reservation_id: Number(id) },
        data: { status: "seated" },
        include: { guest: true, table: true },
      });

      await tx.table.update({
        where: { table_id: reservation.table_id },
        data: {
          status: "Occupied",
        },
      });

      return updatedReservation;
    });

    return res.status(200).json({
      message: "Guest seated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTableReservation = async (req, res, next) => {
  try {
    const { id } = req.params;

    const reservation = await prisma.tableReservation.findUnique({
      where: { table_reservation_id: Number(id) },
    });

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    await prisma.$transaction(async (tx) => {
      await tx.tableReservation.delete({
        where: { table_reservation_id: Number(id) },
      });

      // Free the table back up
      await tx.table.update({
        where: { table_id: reservation.table_id },
        data: { status: "Available" },
      });
    });

    return res.status(200).json({
      message: "Reservation deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
