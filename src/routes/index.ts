import { Router } from "express";
import userRoute from "../modules/user/routes/";

const routes = Router();

routes.use("/", userRoute);

export default routes;
