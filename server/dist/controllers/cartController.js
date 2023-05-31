"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFromCart = exports.addToCart = void 0;
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const products_1 = require("../models/products");
const cart_1 = require("../models/cart");
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId, quantity = 1 } = req.body;
        if (!productId) {
            throw new errors_1.BadRequestError("productId is required");
        }
        const product = yield products_1.ProductModel.findById(productId);
        if (!product) {
            throw new errors_1.NotFoundError("Product not found");
        }
        const cartItem = new cart_1.Cart({
            products: [
                {
                    product: product,
                    quantity,
                },
            ],
        });
        yield cartItem.save();
        res.status(http_status_codes_1.StatusCodes.CREATED).json({
            msg: "Product added to cart",
            cartItem,
        });
    }
    catch (error) {
        if (error instanceof errors_1.BadRequestError || error instanceof errors_1.NotFoundError) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ msg: error.message });
        }
        else {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                msg: "Error adding product to cart",
            });
        }
    }
});
exports.addToCart = addToCart;
const deleteFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { itemId, clearAll } = req.query;
        if (clearAll === "true") {
            const result = yield cart_1.Cart.deleteMany({});
            if (result.deletedCount === 0) {
                throw new errors_1.NotFoundError("No items in the cart to delete");
            }
            return res.status(http_status_codes_1.StatusCodes.OK).json({
                msg: "All items deleted from cart",
            });
        }
        if (!itemId) {
            throw new errors_1.BadRequestError("itemId is required");
        }
        const result = yield cart_1.Cart.deleteOne({ _id: itemId });
        if (result.deletedCount === 0) {
            throw new errors_1.NotFoundError("Item not found in cart");
        }
        res.status(http_status_codes_1.StatusCodes.OK).json({
            msg: "Item deleted from cart",
        });
    }
    catch (error) {
        if (error instanceof errors_1.BadRequestError || error instanceof errors_1.NotFoundError) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ msg: error.message });
        }
        else {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                msg: "Error deleting item from cart",
            });
        }
    }
});
exports.deleteFromCart = deleteFromCart;
