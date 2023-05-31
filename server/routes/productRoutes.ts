import { Router } from "express";
import { getAllProducts } from "../controllers/productController";

const router = Router();

router.route("/").get(getAllProducts);

export default router;
