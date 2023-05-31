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
exports.getAllProducts = void 0;
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const products_1 = require("../models/products");
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 6;
        const skip = (page - 1) * limit;
        const isFeatured = req.query.featured === "true";
        const sortType = req.query.sortType || "Price";
        const sortOrder = req.query.sortOrder || "Ascending";
        const categories = typeof req.query.categories === "string"
            ? req.query.categories.split(",")
            : [];
        const minPrice = req.query.minPrice ? Number(req.query.minPrice) : 0;
        const maxPrice = req.query.maxPrice ? Number(req.query.maxPrice) : Infinity;
        let products;
        let filter = {};
        if (categories.length > 0) {
            filter.category = { $in: categories };
        }
        if (minPrice || maxPrice) {
            filter.price = { $gte: minPrice, $lte: maxPrice };
        }
        if (isFeatured) {
            products = yield products_1.ProductModel.find({ featured: true });
        }
        else {
            products = yield products_1.ProductModel.find(filter)
                .skip(skip)
                .limit(limit)
                .sort({ [sortType]: sortOrder === "Ascending" ? 1 : -1 });
        }
        const total = yield products_1.ProductModel.countDocuments();
        if (!products) {
            throw new errors_1.NotFoundError("No products found");
        }
        res
            .status(http_status_codes_1.StatusCodes.OK)
            .json({ msg: `your total product in database is ${total}`, products });
    }
    catch (error) {
        if (error instanceof errors_1.NotFoundError) {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send(error.message);
        }
        else if (error instanceof errors_1.BadRequestError) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send(error.message);
        }
        else {
            res
                .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                .send("Unexpected error occurred");
        }
    }
});
exports.getAllProducts = getAllProducts;
exports.default = exports.getAllProducts;
