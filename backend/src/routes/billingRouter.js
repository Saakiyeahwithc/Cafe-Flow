import router from "express";
import {
  createBilling,
  getAllBillings,
  getBillingById,
} from "../controllers/billingController.js";

const billingRouter = router.Router();

billingRouter.post("/", createBilling);
billingRouter.get("/", getAllBillings);
billingRouter.get("/:id", getBillingById);

export default billingRouter;
