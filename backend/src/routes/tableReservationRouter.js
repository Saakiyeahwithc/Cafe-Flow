import router from "express";

import {
  createTableReservation,
  assignTable,
  getAllTableReservations,
  deleteTableReservation,
} from "../controllers/tableReservationController.js";

const tableReservationRouter = router.Router();

tableReservationRouter.post("/:id/create", createTableReservation);
tableReservationRouter.get("/", getAllTableReservations);
tableReservationRouter.patch("/:id/assign", assignTable);
tableReservationRouter.delete("/:id", deleteTableReservation);

export default tableReservationRouter;
