import dotenv from "dotenv";
import mongoose from "mongoose";

const app = require("./app");

dotenv.config();

const PORT = process.env.PORT || 8000;
const MONGO_URI =
  "mongodb+srv://snplmntn:23zmRbgWWd4s7ETo@cluster0.djweamd.mongodb.net/liga?retryWrites=true&w=majority";

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined in your environment variables.");
}

mongoose.connect(MONGO_URI).then(() => console.log("Database Connected"));

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
