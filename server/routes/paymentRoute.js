
import express from "express";
import { simulatePayment } from "../controllers/paymentController.js";
import userAuth from "../middlewares/auth.js";

const paymentRouter = express.Router();

paymentRouter.post("/simulate", userAuth, simulatePayment);

export default paymentRouter;
