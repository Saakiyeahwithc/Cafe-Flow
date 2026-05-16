import router from "express";
import {
  createTable,
  getAllTables,
  getTableById,
  updateTable,
  deleteTable,
  occupyTable,
} from "../controllers/tablesController.js";

const tableRouter = router.Router();

tableRouter.post("/", createTable);
tableRouter.get("/", getAllTables);
tableRouter.get("/:id", getTableById);
tableRouter.put("/:id", updateTable);
tableRouter.delete("/:id", deleteTable);
tableRouter.patch("/:id/occupy", occupyTable);

export default tableRouter;
