import express from "express";
import dotenv from "dotenv";
import pdfRoutes from "./Route/pdf.route.js"
import path from "path"
import { fileURLToPath } from "url";
import { connectdb } from "./Database/database.js";

dotenv.config();

const app = express();
const port = process.env.PORT;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());

app.use("/api/pdf", pdfRoutes)

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use((req, res, next) => {
    console.log(`Request for: ${req.url}`);
    next();
  });

app.listen(port, () => {
  connectdb();
  console.log(`Server ready at http://localhost:${port}`);
});
