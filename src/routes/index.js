import { Router } from "express";

const router = Router();

import authentication from "../auth/authenticate.js";

import employeeRoutes from "./employeeRoutes.js";
import customerRoutes from "./customerRoutes.js";
import userRoutes from "./userRoutes.js";

router.use("/employees",authentication, employeeRoutes);
router.use("/customers",authentication, customerRoutes);
router.use("/users", userRoutes);

export default router;
