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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
require("dotenv/config");
require("express-async-errors");
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const xss_clean_1 = __importDefault(require("xss-clean"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const middleware_1 = require("./middleware/");
const connect_1 = require("./db/connect");
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const cartRoutes_1 = __importDefault(require("./routes/cartRoutes"));
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
const __dirnames = path_1.default.resolve();
//middleware & security
if (process.env.NODE_ENV !== "production") {
    app.use((0, morgan_1.default)("dev"));
}
app.use(express_1.default.json());
app.use(helmet_1.default.contentSecurityPolicy({
    directives: Object.assign(Object.assign({}, helmet_1.default.contentSecurityPolicy.getDefaultDirectives()), { "img-src": ["'self'", "data:", "https://res.cloudinary.com"] }),
}));
app.use((0, cors_1.default)());
app.use((0, xss_clean_1.default)());
app.use((0, express_mongo_sanitize_1.default)());
<<<<<<< HEAD
// app.use(express.static(path.resolve("../build")));
//routes
app.use("/api/v1/products", productRoutes_1.default);
app.use("/api/v1/cart", cartRoutes_1.default);
// app.post("/csp-violation", (req, res) => {
//   console.warn("CSP Violation:", req.body);
//   res.status(204).end();
// });
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirnames, "../build", "index.html"));
// });
=======
app.use(express_1.default.static(path_1.default.resolve("../build")));
//routes
app.use("/api/v1/products", productRoutes_1.default);
app.use("/api/v1/cart", cartRoutes_1.default);
app.post("/csp-violation", (req, res) => {
    console.warn("CSP Violation:", req.body);
    res.status(204).end();
});
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirnames, "../build", "index.html"));
});
>>>>>>> 6c27b98da0d7a80dd2db23c481919fda8f1894b3
// error handling
app.use(middleware_1.notFoundMiddleware);
app.use(middleware_1.errorHandlerMiddleware);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, connect_1.connectDB)(process.env.MONGODB_URL);
        app.listen(port, () => console.log(`Server is listening on port ${port} ...`));
    }
    catch (error) {
        console.log(error);
    }
});
start();
