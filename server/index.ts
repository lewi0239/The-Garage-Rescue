import "dotenv/config";
import express from "express";
import { contactHandler } from "./contact.js";

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(express.json());

app.post("/api/contact", contactHandler);

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
