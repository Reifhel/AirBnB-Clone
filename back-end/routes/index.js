import { Router } from "express";
import BookingsRoutes from "../domains/bookings/routes.js";
import PlacesRoutes from "../domains/places/routes.js";
import UserRoutes from "../domains/users/routes.js";

const router = Router();

router.use("/users", UserRoutes);
router.use("/places", PlacesRoutes);
router.use("/bookings", BookingsRoutes);

export default router;
