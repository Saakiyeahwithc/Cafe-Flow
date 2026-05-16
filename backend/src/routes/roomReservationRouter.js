import router from "express";
import {
  assignRoom,
  getAllReservations,
  deleteRoomReservation,
  createRoomReservation,
} from "../controllers/roomReservationController.js";

import {
  authenticateToken,
  checkRole,
} from "../middlewares/auth.Middleware.js";

const roomReservationRouter = router.Router();

roomReservationRouter.post(
  "/:id/create",
  authenticateToken,
  checkRole("admin" || "reception"),
  createRoomReservation,
);
roomReservationRouter.get(
  "/",
  authenticateToken,
  checkRole("admin" || "reception"),
  getAllReservations,
);
roomReservationRouter.delete(
  "/:id",
  authenticateToken,
  checkRole("admin" || "reception"),
  deleteRoomReservation,
);
roomReservationRouter.patch(
  "/:id/assign",
  authenticateToken,
  checkRole("admin" || "reception"),
  assignRoom,
);
export default roomReservationRouter;
