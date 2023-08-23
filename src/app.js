import express from "express";
import path from "path";
import morgan from "morgan";
import cors from "cors";

import customerRoutes from "./routes/customer.routes.js";
import { fileURLToPath } from "url";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "http://localhost:3000/add", "https://clientes-test1.azurewebsites.net": true}));

// routes
app.use(customerRoutes);

// static files
app.use(express.static(path.join(__dirname, "public")));

// starting the server
export default app;
