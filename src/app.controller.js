import express from "express";
import userRouter from "./modules/user/user.controller.js";
import userSelectionRouter from "./modules/userSelection/userSelection.controller.js";
import connectDB from "./database/connection.js";
export const bootstrap = () => {
  const app = express();
  app.use(express.json());
  connectDB();
  app.use("/api/users", userRouter);
  app.use("/api/user-selections", userSelectionRouter);
  app.get("/test", (req, res) => res.json({ message: "Server is running!" }));
  app.listen(process.env.PORT || 5000, () =>
    console.log("🚀 Server running")
  );
};