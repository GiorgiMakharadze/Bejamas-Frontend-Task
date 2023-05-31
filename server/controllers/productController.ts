import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors";
import { ProductModel } from "../models/products";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;
    const skip = (page - 1) * limit;
    const isFeatured = req.query.featured === "true";
    const sortType: string = (req.query.sortType as string) || "Price";
    const sortOrder: string = (req.query.sortOrder as string) || "Ascending";
    const categories =
      typeof req.query.categories === "string"
        ? req.query.categories.split(",")
        : [];
    const minPrice = req.query.minPrice ? Number(req.query.minPrice) : 0;
    const maxPrice = req.query.maxPrice ? Number(req.query.maxPrice) : Infinity;

    let products;
    let filter: {
      category?: { $in: string[] };
      price?: { $gte: number; $lte: number };
    } = {};

    if (categories.length > 0) {
      filter.category = { $in: categories };
    }

    if (minPrice || maxPrice) {
      filter.price = { $gte: minPrice, $lte: maxPrice };
    }

    if (isFeatured) {
      products = await ProductModel.find({ featured: true });
    } else {
      products = await ProductModel.find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ [sortType]: sortOrder === "Ascending" ? 1 : -1 });
    }
    const total = await ProductModel.countDocuments();

    if (!products) {
      throw new NotFoundError("No products found");
    }

    res
      .status(StatusCodes.OK)
      .json({ msg: `your total product in database is ${total}`, products });
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(StatusCodes.NOT_FOUND).send(error.message);
    } else if (error instanceof BadRequestError) {
      res.status(StatusCodes.BAD_REQUEST).send(error.message);
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send("Unexpected error occurred");
    }
  }
};

export default getAllProducts;
