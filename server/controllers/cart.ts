import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} from "../errors";
import { ProductModel } from "../models/products";

export const getAllCart = async (req: Request, res: Response) => {};
