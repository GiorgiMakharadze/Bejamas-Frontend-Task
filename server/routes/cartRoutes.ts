import { Router } from "express";
import { addToCart, deleteFromCart } from "../controllers/cartController";

const router = Router();

router.route("/").post(addToCart).delete(deleteFromCart);

export default router;
