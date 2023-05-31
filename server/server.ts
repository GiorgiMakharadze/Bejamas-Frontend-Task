import express from "express";
import "dotenv/config";
import "express-async-errors";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import { notFoundMiddleware, errorHandlerMiddleware } from "./middleware/";
import { connectDB } from "./db/connect";
import productsRoute from "./routes/productRoutes";
import cartRoute from "./routes/cartRoutes";

const app = express();
const port = process.env.PORT || 5000;

//middleware & security
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

//routes
app.use("/api/v1/products", productsRoute);
app.use("/api/v1/cart", cartRoute);

// error handling
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL!);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port} ...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
