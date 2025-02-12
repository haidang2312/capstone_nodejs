import express from "express";
import authRouter from "./auth.router.js";
import photoRouter from "./photo.router.js";

const rootRouter = express.Router();
rootRouter.get(`/`, (request, response, next) => {
    response.json("ok");
  });
rootRouter.use("/auth", authRouter);
rootRouter.use("/photo", photoRouter);

export default rootRouter;