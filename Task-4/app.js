import express from "express";
import errorHandler from "./src/middlewares/errorHandler.js";

import productRoutes from "./src/routes/productRoutes.js";
import cartRoutes from "./src/routes/cartRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";

const app = express();

app.use(express.json());

app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("E-commerce API Running...");
});

// Error handler middleware (must be last)
app.use(errorHandler);

export default app;
