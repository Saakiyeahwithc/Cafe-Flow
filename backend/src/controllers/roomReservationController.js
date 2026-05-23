import { prisma } from "../utils/prisma.js";

// Assign/Reserve a Room
export const createRoomReservation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { guest_name, phone, guest_count, check_in_date, check_in_time } =
      req.body;

    if (!guest_name || !check_in_date || !check_in_time || !guest_count) {
      return res.status(400).json({
        message:
          "guest_name, guest_count, check_in_date and check_in_time are required",
      });
    }

    const room = await prisma.room.findUnique({
      where: { room_id: Number(id) },
    });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    if (room.status === "Occupied") {
      return res.status(400).json({
        message: `Room is currently ${room.status} and cannot be reserved`,
      });
    }

    const reservation = await prisma.$transaction(async (tx) => {
      // Reuse guest if phone matches, otherwise create new
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

      const newReservation = await tx.roomReservation.create({
        data: {
          guest_count: Number(guest_count),
          check_in_date: new Date(check_in_date),
          check_in_time,
          status: "active",
          type: "reservation",
          guest: { connect: { guest_id: guest.guest_id } },
          room: { connect: { room_id: Number(id) } },
        },
        include: { guest: true, room: true },
      });

      await tx.room.update({
        where: { room_id: Number(id) },
        data: { status: "Reserved" },
      });

      return newReservation;
    });

    return res.status(201).json({
      message: "Room reserved successfully",
      data: reservation,
    });
  } catch (error) {
    next(error);
  }
};

// Get All Reservations
export const getAllReservations = async (req, res, next) => {
  try {
    const reservations = await prisma.roomReservation.findMany({
      include: {
        guest: true,
        room: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return res.status(200).json({
      message: "Reservations fetched successfully",
      data: reservations,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteRoomReservation = async (req, res, next) => {
  try {
    const { id } = req.params;

    const reservation = await prisma.roomReservation.findUnique({
      where: { room_reservation_id: Number(id) },
    });

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    await prisma.$transaction(async (tx) => {
      await tx.roomReservation.delete({
        where: { room_reservation_id: Number(id) },
      });

      await tx.room.update({
        where: { room_id: reservation.room_id },
        data: { status: "Available" },
      });
    });

    return res
      .status(200)
      .json({ message: "Reservation deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const assignRoom = async (req, res, next) => {
  try {
    const { id } = req.params; // room_reservation_id

    const reservation = await prisma.roomReservation.findUnique({
      where: { room_id: Number(id) },
      include: { room: true, guest: true },
    });

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    if (reservation.status === "checked_in") {
      return res.status(400).json({ message: "Guest is already checked in" });
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
      reservation.room.status !== "Available" &&
      reservation.room.status !== "Reserved"
    ) {
      return res.status(400).json({
        message: `Room is currently ${reservation.room.status} and cannot be assigned`,
      });
    }

    const result = await prisma.$transaction(async (tx) => {
      const updatedReservation = await tx.roomReservation.update({
        where: { room_id: Number(id) },
        data: { status: "checked_in" },
        include: { guest: true, room: true },
      });

      await tx.room.update({
        where: { room_id: reservation.room_id },
        data: { status: "Occupied" },
      });

      return updatedReservation;
    });

    return res.status(200).json({
      message: "Guest checked in successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
