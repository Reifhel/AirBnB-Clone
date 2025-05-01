import { Router } from "express";
import PlacesRoutes from "../domains/places/routes.js";
import UserRoutes from "../domains/users/routes.js";

const router = Router();

router.use("/users", UserRoutes);
router.use("/places", PlacesRoutes);

export default router;
