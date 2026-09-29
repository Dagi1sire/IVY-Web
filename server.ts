import express from "express";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { apiApp } from "./server/api";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Mount API routes
app.use(apiApp);

// Serve built frontend assets
const distPath = path.join(process.cwd(), "dist");
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
} else {
  app.get("*", (req, res) => {
    res.send("IVY Childcare API is running. Run `npm run build` to build the frontend.");
  });
}

app.listen(PORT, "0.0.0.0", () => {
  console.log(`IVY Childcare server listening on port ${PORT}`);
});
