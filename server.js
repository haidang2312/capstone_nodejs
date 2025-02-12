import express from "express";
import { handleError } from "./src/common/helpers/error.helper.js";
import rootRouter from "./src/routes/root.router.js";
const app = express();
app.use(express.json());
app.use(rootRouter);
app.use(handleError);
app.listen(3069, () => {
  console.log("server online at port 3069");
});
