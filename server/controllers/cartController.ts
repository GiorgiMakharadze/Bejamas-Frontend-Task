import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors";
import { ProductModel } from "../models/products";
import { Cart } from "../models/cart";

export const addToCart = async (req: Request, res: Response) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      throw new BadRequestError("productId is required");
    }

    const product = await ProductModel.findById(productId);

    if (!product) {
      throw new NotFoundError("Product not found");
    }

    const cartItem = new Cart({
      products: [
        {
          product: product,
          quantity,
        },
      ],
    });

    await cartItem.save();

    res.status(StatusCodes.CREATED).json({
      msg: "Product added to cart",
      cartItem,
    });
  } catch (error) {
    if (error instanceof BadRequestError || error instanceof NotFoundError) {
      res.status(StatusCodes.BAD_REQUEST).json({ msg: error.message });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        msg: "Error adding product to cart",
      });
    }
  }
};

export const deleteFromCart = async (req: Request, res: Response) => {
  try {
    const { itemId } = req.query;

    if (!itemId) {
      throw new BadRequestError("itemId is required");
    }

    const result = await Cart.deleteOne({ _id: itemId });

    if (result.deletedCount === 0) {
      throw new NotFoundError("Item not found in cart");
    }

    res.status(StatusCodes.OK).json({
      msg: "Item deleted from cart",
    });
  } catch (error) {
    if (error instanceof BadRequestError || error instanceof NotFoundError) {
      res.status(StatusCodes.BAD_REQUEST).json({ msg: error.message });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        msg: "Error deleting item from cart",
      });
    }
  }
};
