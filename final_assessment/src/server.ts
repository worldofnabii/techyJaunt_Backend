import dotenv from "dotenv";
import app from "./app";
import { AppDataSource } from "./database/data-source";

dotenv.config();

const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
  .then(() => {
    console.log(" Database connected successfully!");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error(" Database connection failed");
    console.error(error);
  });